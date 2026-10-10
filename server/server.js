const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const { createMonsterWorld } = require('./monsters');
const { createSaveStore, handleSavesRequest } = require('./saves');

const PORT = process.env.PORT || 3000;
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'server', 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');

function loadSessions() {
  ensureDataDir();
  if (!fs.existsSync(SESSIONS_FILE)) {
    return new Map();
  }
  try {
    const raw = fs.readFileSync(SESSIONS_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    const map = new Map();
    if (parsed && typeof parsed === 'object') {
      for (const [k, v] of Object.entries(parsed)) {
        map.set(k, v);
      }
    }
    return map;
  } catch (error) {
    return new Map();
  }
}

function saveSessions() {
  ensureDataDir();
  const obj = {};
  for (const [k, v] of sessionMap.entries()) {
    obj[k] = v;
  }
  fs.writeFileSync(SESSIONS_FILE, JSON.stringify(obj, null, 2));
}

const sessionMap = loadSessions(); // token -> userId
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

// === QUÁI TRÊN BẢN ĐỒ (SERVER LÀ NGUỒN SỰ THẬT) ===
const monsterWorld = createMonsterWorld();
const MONSTER_TICK_MS = 100;

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

function isTownSafeZone(mapId, mapName) {
  const id = String(mapId || '').toLowerCase().trim();
  const name = String(mapName || '').toLowerCase().trim();
  return (
    id === 'town' ||
    id === '37' ||
    id.startsWith('town_') ||
    name.includes('biện kinh') ||
    name.includes('bien kinh') ||
    name.includes('thành thị') ||
    name.includes('thanh thi')
  );
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

function pushWorldMessage(text, author = 'Hệ thống', extra = {}) {
  const cleanText = String(text || '').slice(0, 200);
  const msg = {
    id: extra.id || generateId('msg'),
    cid: extra.cid || extra.userId || '',
    userId: extra.userId || extra.cid || '',
    name: sanitizeText(author, 'Hệ thống'),
    fac: sanitizeText(extra.fac || '', ''),
    lvl: Number(extra.lvl || extra.level) || 0,
    text: cleanText,
    msg: cleanText,
    item: extra.item || null,
    ts: extra.ts || Date.now(),
    sys: extra.sys !== undefined ? !!extra.sys : author === 'Hệ thống',
  };
  globalMessages.push(msg);
  if (globalMessages.length > 80) {
    globalMessages.splice(0, globalMessages.length - 80);
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
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
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
          mapId: data.mapId != null ? String(data.mapId) : 'default',
          mapName: sanitizeText(data.mapName, 'Võ Lâm'),
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
          mapId: data.mapId != null ? String(data.mapId) : 'default',
          mapName: sanitizeText(data.mapName, 'Võ Lâm'),
          status: 'online',
          lastSeen: Date.now(),
        };
        globalPlayers.set(userId, player);
      } else {
        if (data.name) player.name = sanitizeText(data.name, player.name);
        if (data.hp !== undefined) player.hp = Number(data.hp);
        if (data.maxHp !== undefined) player.maxHp = Number(data.maxHp);
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
        if (data.mapId !== undefined) player.mapId = String(data.mapId);
        if (data.mapName !== undefined) player.mapName = sanitizeText(data.mapName, player.mapName || 'Võ Lâm');
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
          mapId: player.mapId,
          mapName: player.mapName,
          hp: player.hp,
          maxHp: player.maxHp,
          level: player.level,
        },
        client.socket
      );
      return;
    }

    if (data.type === 'chat') {
      const text = String(data.text || data.msg || '').trim();
      if (!text) return;
      const player = globalPlayers.get(client.userId);
      const name = player ? player.name : data.name || 'Vô Danh';
      const fac = player ? player.fac : data.fac || '';
      const lvl = player ? player.level : Number(data.lvl || data.level) || 0;
      pushWorldMessage(text, name, {
        cid: client.userId || data.cid || '',
        userId: client.userId || data.userId || '',
        fac,
        lvl,
        item: data.item || null,
      });
      return;
    }

    if (data.type === 'mon_hit') {
      const player = globalPlayers.get(client.userId);
      if (!player || player.status === 'offline' || !Array.isArray(data.hits)) return;
      const mapId = String(player.mapId);
      for (const entry of data.hits.slice(0, 32)) {
        if (!Array.isArray(entry)) continue;
        const result = monsterWorld.hit(mapId, entry[0], entry[1], client.userId);
        if (result && result.killed && result.monster.cls === 'boss') {
          pushWorldMessage(`⚔️ ${player.name} đã hạ boss ${result.zone.n}!`, 'Hệ thống');
        }
      }
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

      // Kiểm tra khu vực an toàn Biện Kinh (Cấm PK)
      if (
        isTownSafeZone(attacker.mapId, attacker.mapName) ||
        (target && isTownSafeZone(target.mapId, target.mapName))
      ) {
        return;
      }

      if (target && target.userId !== client.userId) {
        let damage = Number(data.damage);
        if (!Number.isFinite(damage) || damage <= 0) {
          damage = Math.max(6, Math.round((attacker.level || 1) * 6 + Math.random() * 12));
        }
        damage = Math.round(damage);
        target.hp = Math.max(0, Number(target.hp != null ? target.hp : (target.maxHp || 100)) - damage);
        target.status = target.hp > 0 ? 'online' : 'trọng thương';

        const critText = data.isCrit ? ' [Chí mạng]' : '';
        const counterText = data.isCounter ? ' ⚡[Khắc hệ]' : '';
        const skillName = data.skillName ? ` [${data.skillName}]` : '';
        pushWorldMessage(`⚔️ ${attacker.name} tung${skillName} đánh trúng ${target.name} gây ${damage} sát thương${critText}${counterText}!`, 'Hệ thống');

        if (target.hp <= 0) {
          pushWorldMessage(`💀 ${target.name} đã bại trận dưới tay ${attacker.name}!`, 'Hệ thống');
          // Tự động hồi sinh sau 8 giây
          setTimeout(() => {
            const curTgt = globalPlayers.get(targetUserId);
            if (curTgt && curTgt.hp <= 0) {
              curTgt.hp = curTgt.maxHp || 100;
              curTgt.status = 'online';
              broadcast({
                type: 'pvp_update',
                target: curTgt,
                targetUserId,
                targetHp: curTgt.hp,
                targetMaxHp: curTgt.maxHp || 100,
                damage: 0,
                revived: true,
              });
            }
          }, 8000);
        }

        broadcast({
          type: 'pvp_update',
          attacker: attacker.name,
          attackerUserId: client.userId,
          target: target,
          targetUserId: target.userId,
          targetHp: target.hp,
          targetMaxHp: target.maxHp || 100,
          damage,
          isCrit: !!data.isCrit,
          isCounter: !!data.isCounter,
          element: data.element || 'phys',
          skillId: data.skillId,
        });
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
            mapId: data.mapId != null ? String(data.mapId) : player.mapId,
            mapName: data.mapName || player.mapName,
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

  if (!filePath.startsWith(ROOT) || /^\/(server|\.git)(\/|$)/i.test(normalized)) {
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

function readJsonBody(req, callback, maxBytes = 1e6) {
  let body = '';
  let tooBig = false;
  req.on('data', (chunk) => {
    if (tooBig) return;
    body += chunk.toString();
    if (body.length > maxBytes) {
      tooBig = true;
      body = '';
    }
  });
  req.on('end', () => {
    try {
      callback(tooBig ? null : body ? JSON.parse(body) : {});
    } catch (error) {
      callback({});
    }
  });
}

const saveStore = createSaveStore(path.join(DATA_DIR, 'saves'));

const verifySaveToken = async (token) => {
  if (!token) return null;
  if (process.env.SAVES_DEV_AUTH === '1' && String(token).startsWith('dev:')) {
    return String(token).slice(4);
  }
  return sessionMap.get(token) || null;
};

const server = http.createServer((req, res) => {
  const { method, url } = req;
  const parsed = new URL(url, `http://${req.headers.host}`);
  const pathname = parsed.pathname;

  if (method === 'OPTIONS') {
    sendJson(res, 200, { ok: true });
    return;
  }

  // === SAVE NHÂN VẬT (DB Ở BACKEND) ===
  if (
    handleSavesRequest({
      req,
      res,
      pathname,
      parsedUrl: parsed,
      store: saveStore,
      verify: verifySaveToken,
      sendJson,
      readBody: readJsonBody,
    })
  ) {
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

  // === KÊNH CHAT THẾ GIỚI NỘI BỘ ===
  if (pathname === '/api/chat') {
    if (method === 'GET') {
      const limit = Math.min(100, Math.max(1, Number(parsed.searchParams.get('limit')) || 50));
      const after = parsed.searchParams.get('after');
      let msgs = globalMessages;
      if (after) {
        const idx = msgs.findIndex((m) => String(m.id) === String(after));
        if (idx >= 0) msgs = msgs.slice(idx + 1);
      }
      sendJson(res, 200, {
        ok: true,
        messages: msgs.slice(-limit),
        online: Math.max(1, activeSockets.size || globalPlayers.size),
      });
      return;
    }

    if (method === 'POST') {
      readJsonBody(req, (body) => {
        const text = String((body && (body.text || body.msg)) || '').trim().slice(0, 200);
        if (!text) {
          sendJson(res, 400, { ok: false, error: 'Tin nhắn không được để trống' });
          return;
        }

        const user = requireAuth(req);
        let author = (body && body.name) || (user && user.username) || 'Hiệp Khách';
        let cid = (user && user.userId) || (body && (body.cid || body.userId)) || '';
        let fac = (body && body.fac) || '';
        let lvl = Number(body && (body.lvl || body.level)) || 0;

        if (cid && globalPlayers.has(cid)) {
          const p = globalPlayers.get(cid);
          author = p.name || author;
          fac = p.fac || fac;
          lvl = p.level || lvl;
        }

        const msg = pushWorldMessage(text, author, {
          cid,
          userId: cid,
          fac,
          lvl,
          item: (body && body.item) || null,
        });

        sendJson(res, 200, { ok: true, message: msg });
      });
      return;
    }

    sendJson(res, 405, { ok: false, error: 'Method not allowed' });
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
      const username = String((body && body.username) || '').trim().slice(0, 64);
      const password = String((body && body.password) || '').slice(0, 128);

      if (!username) {
        sendJson(res, 400, { ok: false, error: 'Vui lòng nhập tên tài khoản' });
        return;
      }

      const existing = Object.values(users).find((u) => u.username.toLowerCase() === username.toLowerCase());
      if (existing) {
        if (existing.password && existing.password !== password) {
          sendJson(res, 409, { ok: false, error: 'Tên tài khoản đã tồn tại với mật khẩu khác' });
          return;
        }
        const token = generateId('token');
        sessionMap.set(token, existing.userId);
        saveSessions();
        sendJson(res, 200, { ok: true, userId: existing.userId, username: existing.username, token, profile: existing.profile });
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
      saveSessions();
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
      const username = String((body && body.username) || '').trim().slice(0, 64);
      const password = String((body && body.password) || '').slice(0, 128);

      if (!username) {
        sendJson(res, 400, { ok: false, error: 'Vui lòng nhập tên tài khoản' });
        return;
      }

      const existing = Object.values(users).find(
        (item) => item.username.toLowerCase() === username.toLowerCase(),
      );

      // 1. Nếu đã có username trong DB -> kiểm tra mật khẩu rồi đăng nhập
      if (existing) {
        if (existing.password && existing.password !== password) {
          sendJson(res, 401, { ok: false, error: 'Sai mật khẩu' });
          return;
        }

        const token = generateId('token');
        sessionMap.set(token, existing.userId);
        saveSessions();
        sendJson(res, 200, {
          ok: true,
          userId: existing.userId,
          username: existing.username,
          token,
          profile: existing.profile,
        });
        return;
      }

      // 2. Chưa có username trong DB -> tự động tạo mới và đăng nhập
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
      saveSessions();
      sendJson(res, 200, {
        ok: true,
        userId,
        username,
        token,
        profile,
        isNew: true,
      });
    });
    return;
  }

  if (pathname === '/api/auth/me' || pathname === '/api/me') {
    const user = requireAuth(req);
    if (!user) {
      sendJson(res, 401, { ok: false, error: 'Unauthorized' });
      return;
    }
    sendJson(res, 200, { ok: true, userId: user.userId, username: user.username, profile: user.profile });
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
      let user = sessionMap.has(token) ? users[sessionMap.get(token)] : null;
      if (!user && body.userId && users[body.userId]) {
        user = users[body.userId];
        if (token) sessionMap.set(token, user.userId);
      }
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
          maxHp: Number.isFinite(Number(body.maxHp)) ? Number(body.maxHp) : 100,
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
          mapId: body.mapId != null ? String(body.mapId) : 'default',
          mapName: sanitizeText(body.mapName, 'Võ Lâm'),
          status: 'online',
          lastSeen: Date.now(),
        };
        globalPlayers.set(userId, player);
      } else {
        if (body.name) player.name = sanitizeText(body.name, player.name);
        if (body.hp !== undefined) player.hp = Number(body.hp);
        if (body.maxHp !== undefined) player.maxHp = Number(body.maxHp);
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
        if (body.mapId !== undefined) player.mapId = String(body.mapId);
        if (body.mapName !== undefined) player.mapName = sanitizeText(body.mapName, player.mapName || 'Võ Lâm');
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
        if (
          target &&
          target.userId !== userId &&
          !isTownSafeZone(player.mapId, player.mapName) &&
          !isTownSafeZone(target.mapId, target.mapName)
        ) {
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

function monsterTick() {
  const byMap = new Map(); // mapId -> [player]
  for (const p of globalPlayers.values()) {
    if (p.status === 'offline') continue;
    const key = String(p.mapId);
    if (!byMap.has(key)) byMap.set(key, []);
    byMap.get(key).push(p);
  }
  for (const [mapId, players] of byMap) {
    const map = monsterWorld.ensureMap(mapId);
    if (!map) continue;
    monsterWorld.tickMap(map, players, MONSTER_TICK_MS / 1000);
    const frame = encodeWsFrame(JSON.stringify(monsterWorld.snapshot(mapId)));
    for (const client of activeSockets) {
      const p = client.userId && globalPlayers.get(client.userId);
      if (!p || String(p.mapId) !== mapId || p.status === 'offline') continue;
      try {
        client.socket.write(frame);
      } catch (e) {
        // socket dead
      }
    }
  }
}
setInterval(() => {
  try {
    monsterTick();
  } catch (e) {
    console.error('[monsters] tick error:', e);
  }
}, MONSTER_TICK_MS);

server.listen(PORT, () => {
  console.log(`[Volamidle Single-World Server] running at http://localhost:${PORT}`);
  console.log(`WebSocket ready on ws://localhost:${PORT}/`);
});
