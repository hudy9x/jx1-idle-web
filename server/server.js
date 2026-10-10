const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'server', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

const sessionMap = new Map(); // token -> userId
const users = loadUsers();

// === GLOBAL WORLD STATE (MỘT SERVER DUY NHẤT) ===
const globalPlayers = new Map(); // userId -> player snapshot
const globalMessages = [];
const activeSockets = new Set(); // Set of { socket, userId, buffer }

const globalBoss = {
  name: 'Võ Lâm Thần Thú',
  hp: 1200,
  maxHp: 1200,
  damage: 25,
  lastHitBy: '',
  respawning: false,
};

function generateId(prefix) {
  return `${prefix}_${crypto.randomBytes(6).toString('hex')}`;
}

function ensureDataDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadUsers() {
  ensureDataDir();
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify({}, null, 2));
    return {};
  }
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    return {};
  }
}

function saveUsers() {
  ensureDataDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function sanitizeText(value, fallback = '') {
  const text = typeof value === 'string' ? value.trim() : '';
  return text.slice(0, 32) || fallback;
}

function buildDefaultProfile(userId, username) {
  return {
    userId,
    username,
    level: 1,
    exp: 0,
    gold: 1000,
    hp: 100,
    maxHp: 100,
    mp: 100,
    x: 160,
    y: 180,
    status: 'online',
    wins: 0,
    losses: 0,
    equipment: [],
    characterState: {
      name: username,
      level: 1,
      hp: 100,
      mp: 100,
      gold: 1000,
      exp: 0,
      status: 'online',
    },
  };
}

function pushWorldMessage(text, author = 'Hệ thống') {
  const msg = {
    id: generateId('msg'),
    name: sanitizeText(author, 'Hệ thống'),
    text: String(text || '').slice(0, 160),
    ts: Date.now(),
  };
  globalMessages.push(msg);
  if (globalMessages.length > 50) {
    globalMessages.splice(0, globalMessages.length - 50);
  }
  broadcast({ type: 'chat', message: msg });
  return msg;
}

function getWorldSnapshot() {
  const playersList = Array.from(globalPlayers.values()).filter((p) => p.status !== 'offline');
  return {
    players: playersList,
    messages: globalMessages.slice(-25),
    boss: globalBoss,
    monster: globalBoss, // Alias for backward compatibility
    count: playersList.length,
    timestamp: Date.now(),
  };
}

function updateUserProfile(userId, patch) {
  const user = users[userId];
  if (!user) return null;
  user.profile = {
    ...user.profile,
    ...patch,
    userId,
    username: user.username,
  };
  saveUsers();
  return user.profile;
}

function requireAuth(req) {
  const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  const userId = sessionMap.get(token);
  if (!userId) return null;
  return users[userId] || null;
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  });
  res.end(JSON.stringify(payload));
}

// === NATIVE WEBSOCKET IMPLEMENTATION (ZERO EXTERNAL DEPENDENCY) ===
function encodeWsFrame(str) {
  const payload = Buffer.from(str, 'utf8');
  const len = payload.length;
  let header;
  if (len < 126) {
    header = Buffer.from([0x81, len]);
  } else if (len < 65536) {
    header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 126;
    header.writeUInt16BE(len, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x81;
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(len), 2);
  }
  return Buffer.concat([header, payload]);
}

function parseWsFrames(buffer) {
  const frames = [];
  let offset = 0;
  while (offset + 2 <= buffer.length) {
    const b0 = buffer[offset];
    const b1 = buffer[offset + 1];
    const opcode = b0 & 0x0f;
    const isMasked = (b1 & 0x80) !== 0;
    let len = b1 & 0x7f;
    let headerLen = 2;
    if (len === 126) {
      if (offset + 4 > buffer.length) break;
      len = buffer.readUInt16BE(offset + 2);
      headerLen = 4;
    } else if (len === 127) {
      if (offset + 10 > buffer.length) break;
      len = Number(buffer.readBigUInt64BE(offset + 2));
      headerLen = 10;
    }
    const maskLen = isMasked ? 4 : 0;
    if (offset + headerLen + maskLen + len > buffer.length) break;

    let payload = buffer.slice(offset + headerLen + maskLen, offset + headerLen + maskLen + len);
    if (isMasked) {
      const mask = buffer.slice(offset + headerLen, offset + headerLen + 4);
      payload = Buffer.from(payload);
      for (let i = 0; i < payload.length; i++) {
        payload[i] ^= mask[i % 4];
      }
    }
    frames.push({ opcode, text: payload.toString('utf8') });
    offset += headerLen + maskLen + len;
  }
  return { frames, rest: buffer.slice(offset) };
}

function broadcast(data, excludeWs = null) {
  const frame = encodeWsFrame(typeof data === 'string' ? data : JSON.stringify(data));
  for (const client of activeSockets) {
    if (excludeWs && client.socket === excludeWs) continue;
    try {
      client.socket.write(frame);
    } catch (e) {
      // socket dead
    }
  }
}

function handleWsMessage(client, message) {
  try {
    const data = JSON.parse(message);
    if (!data || !data.type) return;

    if (data.type === 'auth') {
      const userId = data.userId || (data.token && sessionMap.get(data.token));
      if (userId) {
        client.userId = userId;
        const user = users[userId] || {};
        const p = {
          id: userId,
          userId,
          name: data.name || user.username || 'Hiệp Khách',
          level: Number(data.level) || (user.profile && user.profile.level) || 1,
          hp: Number(data.hp) || (user.profile && user.profile.hp) || 100,
          maxHp: Number(data.maxHp) || 100,
          gold: Number(data.gold) || (user.profile && user.profile.gold) || 1000,
          x: Number(data.x) || 160,
          y: Number(data.y) || 180,
          dir: Number(data.dir) || 0,
          moving: !!data.moving,
          act: data.act || 'st',
          fac: data.fac || 'wudang',
          sex: Number(data.sex) || 0,
          look: data.look || null,
          auras: data.auras || [],
          status: 'online',
          lastSeen: Date.now(),
        };
        globalPlayers.set(userId, p);
        pushWorldMessage(`${p.name} đã bước vào thế giới!`, 'Hệ thống');
        broadcast({ type: 'player_joined', player: p });
      }
      client.socket.write(encodeWsFrame(JSON.stringify({ type: 'init', world: getWorldSnapshot() })));
      return;
    }

    if (data.type === 'sync') {
      const userId = client.userId || data.userId;
      if (!userId) return;
      let player = globalPlayers.get(userId);
      if (!player) {
        player = {
          id: userId,
          userId,
          name: sanitizeText(data.name, 'Hiệp Khách'),
          level: Number(data.level) || 1,
          hp: Number(data.hp) || 100,
          maxHp: Number(data.maxHp) || 100,
          gold: Number(data.gold) || 0,
          x: Number(data.x) || 160,
          y: Number(data.y) || 180,
          dir: Number(data.dir) || 0,
          moving: !!data.moving,
          act: data.act || 'st',
          fac: data.fac || 'wudang',
          sex: Number(data.sex) || 0,
          look: data.look || null,
          auras: data.auras || [],
          status: 'online',
          lastSeen: Date.now(),
        };
        globalPlayers.set(userId, player);
      } else {
        if (data.name) player.name = sanitizeText(data.name, player.name);
        if (data.hp !== undefined) player.hp = Number(data.hp);
        if (data.level !== undefined) player.level = Number(data.level);
        if (data.gold !== undefined) player.gold = Number(data.gold);
        if (data.x !== undefined) player.x = Number(data.x);
        if (data.y !== undefined) player.y = Number(data.y);
        if (data.dir !== undefined) player.dir = Number(data.dir);
        if (data.moving !== undefined) player.moving = !!data.moving;
        if (data.act) player.act = String(data.act);
        if (data.fac) player.fac = String(data.fac);
        if (data.sex !== undefined) player.sex = Number(data.sex);
        if (data.look !== undefined) player.look = data.look;
        if (data.auras !== undefined) player.auras = data.auras;
        if (data.status) player.status = String(data.status);
        player.lastSeen = Date.now();
      }

      // Phát sóng vị trí và trang phục tức thì cho các người chơi khác (< 10ms)
      broadcast(
        {
          type: 'player_moved',
          userId: player.userId,
          name: player.name,
          x: player.x,
          y: player.y,
          dir: player.dir,
          moving: player.moving,
          act: player.act,
          fac: player.fac,
          sex: player.sex,
          look: player.look,
          auras: player.auras,
          hp: player.hp,
          maxHp: player.maxHp,
          level: player.level,
        },
        client.socket
      );
      return;
    }

    if (data.type === 'chat') {
      const text = String(data.text || '').trim();
      if (!text) return;
      const player = globalPlayers.get(client.userId);
      const name = player ? player.name : data.name || 'Vô Danh';
      pushWorldMessage(text, name);
      return;
    }

    if (data.type === 'attack_boss') {
      const player = globalPlayers.get(client.userId) || { name: data.name || 'Hiệp Khách', level: 1 };
      if (globalBoss.hp > 0) {
        const damage = Math.max(8, Math.round((player.level || 1) * 7 + Math.random() * 15));
        globalBoss.hp = Math.max(0, globalBoss.hp - damage);
        globalBoss.lastHitBy = player.name;

        if (globalBoss.hp <= 0) {
          pushWorldMessage(`⚔️ ${player.name} đã kết liễu ${globalBoss.name}!`, 'Hệ thống');
          if (!globalBoss.respawning) {
            globalBoss.respawning = true;
            setTimeout(() => {
              globalBoss.hp = globalBoss.maxHp;
              globalBoss.respawning = false;
              pushWorldMessage(`🔥 ${globalBoss.name} đã hồi sinh, hãy mau tới nghênh chiến!`, 'Hệ thống');
              broadcast({ type: 'boss_update', boss: globalBoss });
            }, 6000);
          }
        }
        broadcast({ type: 'boss_update', boss: globalBoss, attacker: player.name, damage });
      }
      return;
    }

    if (data.type === 'attack_player') {
      const attacker = globalPlayers.get(client.userId) || { name: data.name || 'Hiệp Khách', level: 1 };
      const targetUserId = String(data.targetUserId || '');
      const target = globalPlayers.get(targetUserId);
      if (target && target.userId !== client.userId) {
        const damage = Math.max(6, Math.round((attacker.level || 1) * 6 + Math.random() * 12));
        target.hp = Math.max(0, Number(target.hp || 100) - damage);
        target.status = target.hp > 0 ? 'online' : 'trọng thương';
        pushWorldMessage(`⚔️ ${attacker.name} ra chiêu đánh trúng ${target.name} gây ${damage} sát thương!`, 'Hệ thống');
        if (target.hp <= 0) {
          pushWorldMessage(`💀 ${target.name} đã bại trận dưới tay ${attacker.name}!`, 'Hệ thống');
        }
        broadcast({ type: 'pvp_update', attacker: attacker.name, target: target, damage });
      }
      return;
    }

    if (data.type === 'cast_skill') {
      const player = globalPlayers.get(client.userId);
      if (player) {
        broadcast(
          {
            type: 'skill_cast',
            userId: client.userId,
            attackerX: Number(data.attackerX) || player.x,
            attackerY: Number(data.attackerY) || player.y,
            targetX: Number(data.targetX) || (player.x + 100),
            targetY: Number(data.targetY) || player.y,
            targetUserId: data.targetUserId,
            skillId: data.skillId,
            fac: data.fac || player.fac || 'wudang',
          },
          client.socket
        );
      }
      return;
    }
  } catch (err) {
    console.error('WS parse error:', err);
  }
}

// === CLEANUP & TICK TIMERS ===
setInterval(() => {
  const now = Date.now();
  let changed = false;

  for (const [userId, player] of globalPlayers.entries()) {
    if (now - player.lastSeen > 20000) {
      // 20s inactive without heartbeat
      globalPlayers.delete(userId);
      changed = true;
    }
  }

  // Periodic world sync broadcast to all active sockets
  if (activeSockets.size > 0) {
    const snapshot = getWorldSnapshot();
    broadcast({ type: 'world_sync', world: snapshot });
  }
}, 1000);

// === HTTP SERVER & STATIC FILES ===
function serveStaticFile(res, urlPath) {
  const normalized = urlPath === '/' ? '/index.html' : urlPath;
  const filePath = path.join(ROOT, normalized);

  if (!filePath.startsWith(ROOT)) {
    sendJson(res, 403, { ok: false, error: 'Forbidden' });
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      sendJson(res, 404, { ok: false, error: 'Not found' });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const mime = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.mp3': 'audio/mpeg',
      '.wav': 'audio/wav',
      '.ogg': 'audio/ogg',
      '.webp': 'image/webp',
    };

    res.writeHead(200, {
      'Content-Type': mime[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(data);
  });
}

function readJsonBody(req, callback) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
    if (body.length > 1e6) req.destroy();
  });
  req.on('end', () => {
    try {
      callback(body ? JSON.parse(body) : {});
    } catch (error) {
      callback({});
    }
  });
}

const server = http.createServer((req, res) => {
  const { method, url } = req;
  const parsed = new URL(url, `http://${req.headers.host}`);
  const pathname = parsed.pathname;

  if (method === 'OPTIONS') {
    sendJson(res, 200, { ok: true });
    return;
  }

  // === REST ENDPOINTS (SINGLE SERVER) ===
  if (pathname === '/api/health') {
    sendJson(res, 200, {
      ok: true,
      app: 'volamidle-online',
      serverType: 'single-world',
      timestamp: Date.now(),
      players: globalPlayers.size,
      online: globalPlayers.size,
      activeSockets: activeSockets.size,
    });
    return;
  }

  if (pathname === '/api/world-state' || pathname === '/api/room-state') {
    sendJson(res, 200, {
      ok: true,
      ...getWorldSnapshot(),
    });
    return;
  }

  if (pathname === '/api/rooms') {
    // Return single global world as 1 server entry for backward compatibility
    sendJson(res, 200, {
      rooms: [
        {
          id: 'server-volam-01',
          name: 'Máy Chủ Võ Lâm',
          count: globalPlayers.size,
          createdAt: Date.now(),
        },
      ],
    });
    return;
  }

  if (pathname === '/api/leaderboard') {
    const list = Object.values(users)
      .map((user) => ({
        userId: user.userId,
        username: user.username,
        level: user.profile.level,
        gold: user.profile.gold,
        wins: user.profile.wins,
        losses: user.profile.losses,
      }))
      .sort((a, b) => b.level - a.level)
      .slice(0, 20);

    sendJson(res, 200, { leaderboard: list });
    return;
  }

  if (pathname === '/api/register') {
    if (method !== 'POST') {
      sendJson(res, 405, { ok: false, error: 'Method not allowed' });
      return;
    }

    readJsonBody(req, (body) => {
      const username = sanitizeText(body.username, '');
      const password = String(body.password || '').trim();

      if (!username || !password) {
        sendJson(res, 400, { ok: false, error: 'username and password are required' });
        return;
      }

      const existing = Object.values(users).find((u) => u.username.toLowerCase() === username.toLowerCase());
      if (existing) {
        sendJson(res, 409, { ok: false, error: 'username already exists' });
        return;
      }

      const userId = generateId('user');
      const profile = buildDefaultProfile(userId, username);
      users[userId] = {
        userId,
        username,
        password,
        profile,
        createdAt: Date.now(),
      };
      saveUsers();

      const token = generateId('token');
      sessionMap.set(token, userId);
      sendJson(res, 201, { ok: true, userId, username, token, profile });
    });
    return;
  }

  if (pathname === '/api/login') {
    if (method !== 'POST') {
      sendJson(res, 405, { ok: false, error: 'Method not allowed' });
      return;
    }

    readJsonBody(req, (body) => {
      const username = sanitizeText(body.username, '');
      const password = String(body.password || '').trim();

      const user = Object.values(users).find(
        (item) => item.username.toLowerCase() === username.toLowerCase() && item.password === password,
      );

      if (!user) {
        sendJson(res, 401, { ok: false, error: 'invalid credentials' });
        return;
      }

      const token = generateId('token');
      sessionMap.set(token, user.userId);
      sendJson(res, 200, { ok: true, userId: user.userId, username: user.username, token, profile: user.profile });
    });
    return;
  }

  if (pathname.startsWith('/api/profile/')) {
    const userId = pathname.split('/').pop();
    const user = requireAuth(req);

    if (!user) {
      sendJson(res, 401, { ok: false, error: 'Unauthorized' });
      return;
    }

    if (method === 'GET') {
      const targetUser = users[userId];
      if (!targetUser) {
        sendJson(res, 404, { ok: false, error: 'user not found' });
        return;
      }
      sendJson(res, 200, { ok: true, user: { userId: targetUser.userId, username: targetUser.username, profile: targetUser.profile } });
      return;
    }

    if (method === 'PUT' || method === 'POST') {
      readJsonBody(req, (body) => {
        const profile = updateUserProfile(userId, body || {});
        sendJson(res, 200, { ok: true, profile });
      });
      return;
    }
    sendJson(res, 405, { ok: false, error: 'Method not allowed' });
    return;
  }

  if (pathname === '/api/character/save' || pathname === '/api/player-state/save') {
    if (method !== 'POST') {
      sendJson(res, 405, { ok: false, error: 'Method not allowed' });
      return;
    }
    const user = requireAuth(req);
    if (!user) {
      sendJson(res, 401, { ok: false, error: 'Unauthorized' });
      return;
    }

    readJsonBody(req, (body) => {
      const character = body.character || {};
      const equipment = body.equipment || user.profile.equipment || [];
      const profile = updateUserProfile(user.userId, {
        ...user.profile,
        name: sanitizeText(character.name || user.username),
        level: Number(character.level) || user.profile.level,
        hp: Number(character.hp) || user.profile.hp,
        gold: Number(character.gold) || user.profile.gold,
        equipment,
      });
      sendJson(res, 200, { ok: true, profile, character, equipment });
    });
    return;
  }

  if (pathname === '/api/character/load' || pathname === '/api/player-state/load') {
    const user = requireAuth(req);
    if (!user) {
      sendJson(res, 401, { ok: false, error: 'Unauthorized' });
      return;
    }
    sendJson(res, 200, { ok: true, profile: user.profile, character: user.profile.characterState, equipment: user.profile.equipment });
    return;
  }

  // === HTTP PLAYER SYNC (FALLBACK NẾU KHÔNG DÙNG WEBSOCKET) ===
  if (pathname === '/api/player-sync') {
    if (method !== 'POST') {
      sendJson(res, 405, { ok: false, error: 'Method not allowed' });
      return;
    }

    readJsonBody(req, (body) => {
      const token = String(body.token || '').replace(/^Bearer\s+/i, '');
      const user = sessionMap.has(token) ? users[sessionMap.get(token)] : null;
      if (!user) {
        sendJson(res, 401, { ok: false, error: 'Unauthorized' });
        return;
      }

      const userId = user.userId;
      let player = globalPlayers.get(userId);
      if (!player) {
        player = {
          id: userId,
          userId,
          name: sanitizeText(body.name || user.username, user.username),
          hp: Number.isFinite(Number(body.hp)) ? Number(body.hp) : 100,
          maxHp: 100,
          level: Number.isFinite(Number(body.level)) ? Number(body.level) : 1,
          gold: Number.isFinite(Number(body.gold)) ? Number(body.gold) : 1000,
          x: Number.isFinite(Number(body.x)) ? Number(body.x) : 160,
          y: Number.isFinite(Number(body.y)) ? Number(body.y) : 180,
          dir: Number(body.dir) || 0,
          moving: !!body.moving,
          act: body.act || 'st',
          fac: body.fac || 'wudang',
          sex: Number(body.sex) || 0,
          look: body.look || null,
          auras: body.auras || [],
          status: 'online',
          lastSeen: Date.now(),
        };
        globalPlayers.set(userId, player);
      } else {
        if (body.name) player.name = sanitizeText(body.name, player.name);
        if (body.hp !== undefined) player.hp = Number(body.hp);
        if (body.level !== undefined) player.level = Number(body.level);
        if (body.gold !== undefined) player.gold = Number(body.gold);
        if (body.x !== undefined) player.x = Number(body.x);
        if (body.y !== undefined) player.y = Number(body.y);
        if (body.dir !== undefined) player.dir = Number(body.dir);
        if (body.moving !== undefined) player.moving = !!body.moving;
        if (body.act) player.act = String(body.act);
        if (body.fac) player.fac = String(body.fac);
        if (body.sex !== undefined) player.sex = Number(body.sex);
        if (body.look !== undefined) player.look = body.look;
        if (body.auras !== undefined) player.auras = body.auras;
        player.lastSeen = Date.now();
      }

      const chatText = sanitizeText(String(body.chat || ''), '');
      if (chatText) {
        pushWorldMessage(chatText, player.name);
      }

      const action = String(body.action || '').toLowerCase();
      if (action === 'attack-monster' || action === 'attack-boss') {
        const damage = Math.max(8, Math.round((player.level || 1) * 7 + Math.random() * 14));
        globalBoss.hp = Math.max(0, globalBoss.hp - damage);
        globalBoss.lastHitBy = player.name;
        pushWorldMessage(`${player.name} xuất chiêu gây ${damage} sát thương lên ${globalBoss.name}!`, 'Hệ thống');

        if (globalBoss.hp <= 0) {
          pushWorldMessage(`🏆 ${player.name} đã tiêu diệt ${globalBoss.name}!`, 'Hệ thống');
          globalBoss.hp = globalBoss.maxHp;
        }
      }

      if (action === 'attack-player') {
        const targetUserId = String(body.targetUserId || '');
        const target = globalPlayers.get(targetUserId);
        if (target && target.userId !== userId) {
          const damage = Math.max(6, Math.round((player.level || 1) * 6 + Math.random() * 12));
          target.hp = Math.max(0, Number(target.hp || 100) - damage);
          pushWorldMessage(`⚔️ ${player.name} tấn công ${target.name} gây ${damage} sát thương!`, 'Hệ thống');
        }
      }

      const world = getWorldSnapshot();
      sendJson(res, 200, {
        ok: true,
        profile: user.profile,
        players: world.players,
        world,
        room: world, // alias for backwards compatibility
      });
    });
    return;
  }

  // Phục vụ file tĩnh
  serveStaticFile(res, pathname);
});

// === WEBSOCKET UPGRADE HANDLER ===
server.on('upgrade', (req, socket) => {
  const key = req.headers['sec-websocket-key'];
  if (!key) {
    socket.destroy();
    return;
  }

  const accept = crypto.createHash('sha1').update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
  socket.write(
    'HTTP/1.1 101 Switching Protocols\r\n' +
    'Upgrade: websocket\r\n' +
    'Connection: Upgrade\r\n' +
    `Sec-WebSocket-Accept: ${accept}\r\n\r\n`
  );

  const client = { socket, userId: null, buffer: Buffer.alloc(0) };
  activeSockets.add(client);

  socket.on('data', (chunk) => {
    client.buffer = Buffer.concat([client.buffer, chunk]);
    const { frames, rest } = parseWsFrames(client.buffer);
    client.buffer = rest;

    for (const frame of frames) {
      if (frame.opcode === 0x8) {
        // Close frame
        socket.end();
        break;
      } else if (frame.opcode === 0x9) {
        // Ping -> Pong
        socket.write(Buffer.from([0x8a, 0x00]));
      } else if (frame.opcode === 0x1) {
        // Text message
        handleWsMessage(client, frame.text);
      }
    }
  });

  socket.on('close', () => {
    activeSockets.delete(client);
    if (client.userId) {
      const p = globalPlayers.get(client.userId);
      if (p) {
        p.status = 'offline';
        setTimeout(() => {
          if (p.status === 'offline') {
            globalPlayers.delete(client.userId);
            broadcast({ type: 'player_left', userId: client.userId });
          }
        }, 8000);
      }
    }
  });

  socket.on('error', () => {
    activeSockets.delete(client);
  });
});

server.listen(PORT, () => {
  console.log(`[Volamidle Single-World Server] running at http://localhost:${PORT}`);
  console.log(`WebSocket ready on ws://localhost:${PORT}/`);
});
