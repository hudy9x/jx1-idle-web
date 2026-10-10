(function () {
  const state = {
    token: localStorage.getItem('volamidle_token') || '',
    userId: localStorage.getItem('volamidle_userId') || '',
    username: localStorage.getItem('volamidle_name') || `ĐạiHiệp_${Math.floor(Math.random() * 899 + 100)}`,
    profile: null,
    players: [],
    chat: [],
    boss: null,
    selectedTargetId: '',
    ws: null,
    wsConnected: false,
    minimized: false,
    lastChatMap: new Map(), // userId -> { text, ts }
    skillFx: [], // Các hiệu ứng chưởng lực/kiếm khí đang bay
  };

  const FACTION_COLORS = {
    shaolin: '#ffd32a', // Kim
    tianwang: '#ffd32a',
    tangmen: '#2ed573', // Mộc
    wudu: '#2ed573',
    emei: '#1e90ff',    // Thủy
    cuiyan: '#1e90ff',
    gaibang: '#ff4757', // Hỏa
    tianren: '#ff4757',
    wudang: '#ffa502',  // Thổ
    kunlun: '#ffa502',
  };

  const FACTIONS = [
    'shaolin',
    'tianwang',
    'tangmen',
    'wudu',
    'emei',
    'cuiyan',
    'gaibang',
    'tianren',
    'wudang',
    'kunlun',
  ];

  let lastFxFrameTs = 0;
  function spawnSkillVisual(attackerX, attackerY, targetX, targetY, fac) {
    const facKey = String(fac || 'wudang').toLowerCase();
    const color = FACTION_COLORS[facKey] || '#ffd32a';
    const ax = Number(attackerX) || 160;
    const ay = Number(attackerY) || 180;
    let tx = Number(targetX) || (ax + 120);
    let ty = Number(targetY) || ay;
    const dist = Math.hypot(tx - ax, ty - ay);
    if (dist < 10) {
      tx = ax + 80;
    }
    const speed = Math.max(3.5, Math.min(6.0, 360 / Math.max(40, dist)));
    state.skillFx.push({
      x1: ax,
      y1: ay - 20,
      x2: tx,
      y2: ty - 14,
      progress: 0,
      speed,
      color,
      exploded: false,
      blastRadius: 6,
      blastAlpha: 1,
      particles: [],
    });
  }

  function drawSkillEffects(ctx, dt) {
    if (!ctx || !state.skillFx || !state.skillFx.length) return;
    const now = performance.now();
    const isNewFrame = now - lastFxFrameTs >= 8;
    if (isNewFrame) lastFxFrameTs = now;
    const frameDt = Math.min(0.06, dt || 0.016);

    for (let i = state.skillFx.length - 1; i >= 0; i--) {
      const fx = state.skillFx[i];
      ctx.save();

      if (!fx.exploded) {
        if (isNewFrame) fx.progress += frameDt * (fx.speed || 4.2);
        const t = Math.min(1, fx.progress);
        const curX = fx.x1 + (fx.x2 - fx.x1) * t;
        const curY = fx.y1 + (fx.y2 - fx.y1) * t;

        const angle = Math.atan2(fx.y2 - fx.y1, fx.x2 - fx.x1);
        const trailLen = 34;
        const backX = curX - Math.cos(angle) * trailLen;
        const backY = curY - Math.sin(angle) * trailLen;

        // Vệt đuôi chưởng lực tỏa sáng phát quang theo ngũ hành
        const grad = ctx.createLinearGradient(backX, backY, curX, curY);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(0.4, fx.color);
        grad.addColorStop(1, '#ffffff');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.shadowColor = fx.color;
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.moveTo(backX, backY);
        ctx.lineTo(curX, curY);
        ctx.stroke();

        // Lõi chưởng lực trắng sáng
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(curX - Math.cos(angle) * 16, curY - Math.sin(angle) * 16);
        ctx.lineTo(curX, curY);
        ctx.stroke();

        // Đầu cầu năng lượng phát sáng
        ctx.fillStyle = fx.color;
        ctx.beginPath();
        ctx.arc(curX, curY, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(curX, curY, 4, 0, Math.PI * 2);
        ctx.fill();

        if (fx.progress >= 1 && isNewFrame) {
          fx.exploded = true;
          fx.blastRadius = 6;
          fx.blastAlpha = 1;
          fx.particles = [];
          for (let p = 0; p < 10; p++) {
            const a = (p * Math.PI * 2) / 10 + Math.random() * 0.35;
            const spd = 45 + Math.random() * 70;
            fx.particles.push({
              x: fx.x2,
              y: fx.y2,
              vx: Math.cos(a) * spd,
              vy: Math.sin(a) * spd,
              life: 0.36,
            });
          }
        }
      } else {
        // Vụ nổ va chạm bung tỏa
        if (isNewFrame) {
          fx.blastRadius += frameDt * 100;
          fx.blastAlpha = Math.max(0, fx.blastAlpha - frameDt * 2.8);
        }

        ctx.shadowColor = fx.color;
        ctx.shadowBlur = 20;
        ctx.strokeStyle = fx.color;
        ctx.lineWidth = Math.max(1, 3.8 * fx.blastAlpha);
        ctx.globalAlpha = fx.blastAlpha;

        // Vòng nổ tròn
        ctx.beginPath();
        ctx.arc(fx.x2, fx.y2, fx.blastRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Gợn sóng nổ hình elip dưới chân (2.5D mặt đất)
        ctx.beginPath();
        ctx.ellipse(fx.x2, fx.y2 + 4, fx.blastRadius * 1.2, fx.blastRadius * 0.45, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Các tia lửa năng lượng bung ra
        ctx.fillStyle = '#ffffff';
        for (const pt of fx.particles) {
          if (isNewFrame) {
            pt.x += pt.vx * frameDt;
            pt.y += pt.vy * frameDt;
            pt.life -= frameDt;
          }
          if (pt.life > 0) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, Math.max(1, pt.life * 6.5), 0, Math.PI * 2);
            ctx.fill();
          }
        }

        if (fx.blastAlpha <= 0.05 && isNewFrame) {
          state.skillFx.splice(i, 1);
        }
      }

      ctx.restore();
    }
  }

  // Hook render hiệu ứng chưởng vào canvas thế giới (chạy mỗi frame từ engine game)
  window.onWorldDrawAfterFx = function (ctx, dt) {
    drawSkillEffects(ctx, dt);
  };

  // Image cache
  const imgCache = new Map();
  function getCachedImage(src) {
    let img = imgCache.get(src);
    if (!img) {
      img = new Image();
      img.src = src;
      imgCache.set(src, img);
    }
    return img;
  }

  // Preload common character sprites
  FACTIONS.forEach((f) => {
    getCachedImage(`img/pl/${f}.png`);
    getCachedImage(`img/a/pl_${f}_st.webp`);
    getCachedImage(`img/a/pl_${f}_run.webp`);
  });

  const panel = {
    root: document.getElementById('mpPanel'),
    content: document.getElementById('mpContent'),
    toggle: document.getElementById('mpToggle'),
    badge: document.getElementById('mpBadge'),
    name: document.getElementById('mpName'),
    status: document.getElementById('mpStatus'),
    bossBox: document.getElementById('mpBossBox'),
    bossName: document.getElementById('mpBossName'),
    bossHpTxt: document.getElementById('mpBossHpTxt'),
    bossBar: document.getElementById('mpBossBar'),
    bossAttack: document.getElementById('mpBossAttack'),
    pvpAttack: document.getElementById('mpPvpAttack'),
    players: document.getElementById('mpPlayers'),
    chat: document.getElementById('mpChat'),
    chatInput: document.getElementById('mpChatInput'),
    chatSend: document.getElementById('mpChatSend'),
  };

  function setStatus(message, isError) {
    if (!panel.status) return;
    panel.status.textContent = message;
    panel.status.style.color = isError ? '#ff7675' : '#55efc4';
  }

  function getHeroName() {
    const heroEl = document.getElementById('heroName');
    if (heroEl && heroEl.textContent && heroEl.textContent.trim() && heroEl.textContent !== 'Võ Lâm Idle') {
      return heroEl.textContent.trim();
    }
    if (window.player && window.player.name) {
      return window.player.name;
    }
    return state.username;
  }

  function getHeroSnapshot() {
    const name = getHeroName();
    const levelEl = document.getElementById('lv') || document.getElementById('lvS');
    const hpEl = document.getElementById('hpTxt');
    const goldEl = document.getElementById('gold');
    const rawHp = hpEl ? hpEl.textContent : '';
    const hpVal = rawHp.includes('/') ? Number.parseFloat(rawHp.split('/')[0]) : Number.parseFloat(rawHp);

    let x = 160;
    let y = 180;
    let dir = 0;
    let moving = false;
    let act = 'st';

    if (window.heroPos && Number.isFinite(window.heroPos.x) && Number.isFinite(window.heroPos.y)) {
      x = Math.round(window.heroPos.x);
      y = Math.round(window.heroPos.y);
      dir = Number(window.heroPos.dir) || 0;
      moving = Boolean(window.heroPos.moving);
      act = window.heroPos.act || (moving ? 'run' : 'st');
    }

    let fac = 'wudang';
    let sex = 0;
    let look = null;
    let auras = [];
    if (window.player) {
      if (window.player.fac) fac = window.player.fac;
      if (window.player.sex != null) sex = Number(window.player.sex) || 0;
    }

    if (typeof window.getHeroLookData === 'function') {
      try {
        const lookData = window.getHeroLookData();
        if (lookData) {
          if (lookData.look) look = lookData.look;
          if (Array.isArray(lookData.auras)) auras = lookData.auras;
        }
      } catch (e) {}
    }

    if (typeof fac === 'string' && fac.startsWith('vo')) {
      fac = sex === 1 ? 'emei' : 'wudang';
    }
    if (!FACTIONS.includes(fac)) {
      fac = sex === 1 ? 'emei' : 'wudang';
    }

    return {
      name,
      level: levelEl ? Number.parseInt(levelEl.textContent) || 1 : 1,
      hp: Number.isFinite(hpVal) ? hpVal : 100,
      maxHp: 100,
      gold: goldEl ? Number.parseInt(goldEl.textContent.replace(/[^0-9]/g, '')) || 0 : 0,
      x,
      y,
      dir,
      moving,
      act,
      fac,
      sex,
      look,
      auras,
    };
  }

  function updateUi() {
    const count = state.players.length || 1;
    if (panel.badge) {
      panel.badge.textContent = `${count} online`;
    }

    if (panel.name && document.activeElement !== panel.name) {
      panel.name.value = state.username;
    }

    // Render Boss
    if (state.boss) {
      if (panel.bossName) panel.bossName.textContent = state.boss.name || 'Boss Thế Giới';
      const maxHp = state.boss.maxHp || 1000;
      const hp = Math.max(0, state.boss.hp || 0);
      const pct = Math.max(0, Math.min(100, Math.round((hp / maxHp) * 100)));
      if (panel.bossHpTxt) panel.bossHpTxt.textContent = `${hp}/${maxHp} (${pct}%)`;
      if (panel.bossBar) panel.bossBar.style.width = `${pct}%`;
    }

    // Render Players list
    if (panel.players) {
      panel.players.innerHTML = '';
      if (!state.players.length) {
        const li = document.createElement('li');
        li.textContent = 'Đang quét hiệp khách...';
        panel.players.appendChild(li);
      } else {
        state.players.forEach((p) => {
          const isSelf = p.userId === state.userId;
          const li = document.createElement('li');
          li.style.cursor = isSelf ? 'default' : 'pointer';
          li.style.padding = '3px 0';
          li.style.color = state.selectedTargetId === p.userId ? '#ffeaa7' : isSelf ? '#55efc4' : '#dfe6e9';

          const mark = isSelf ? ' (Bạn)' : state.selectedTargetId === p.userId ? ' 🎯' : '';
          const facName = p.fac ? ` [${p.fac}]` : '';
          li.textContent = `${p.name || 'Hiệp Khách'}${mark}${facName} · Lv.${p.level || 1} · HP:${p.hp || 100}`;

          if (!isSelf) {
            li.title = 'Bấm để chọn mục tiêu Tỷ thí PvP';
            li.addEventListener('click', () => {
              state.selectedTargetId = p.userId;
              setStatus(`Mục tiêu PvP: ${p.name}`);
              updateUi();
            });
          }
          panel.players.appendChild(li);
        });
      }
    }

    // Render Chat
    if (panel.chat) {
      panel.chat.innerHTML = '';
      if (!state.chat.length) {
        const li = document.createElement('li');
        li.textContent = 'Chưa có tin nhắn nào.';
        panel.chat.appendChild(li);
      } else {
        state.chat.slice(-12).forEach((msg) => {
          const li = document.createElement('li');
          li.style.marginBottom = '2px';
          li.style.wordBreak = 'break-word';
          const isSys = msg.name === 'Hệ thống';
          li.innerHTML = `<b style="color:${isSys ? '#fab1a0' : '#74b9ff'}">${msg.name}:</b> <span>${msg.text}</span>`;
          panel.chat.appendChild(li);
        });
        panel.chat.scrollTop = panel.chat.scrollHeight;
      }
    }
  }

  // === WEBSOCKET CONNECTION & FAST SYNC ===
  function connectWebSocket() {
    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = location.host || 'localhost:3000';
    const wsUrl = `${protocol}//${host}/ws`;

    try {
      const ws = new WebSocket(wsUrl);
      state.ws = ws;

      ws.onopen = () => {
        state.wsConnected = true;
        setStatus('🟢 Kết nối Server chung thành công');
        const hero = getHeroSnapshot();
        ws.send(
          JSON.stringify({
            type: 'auth',
            token: state.token,
            userId: state.userId,
            name: state.username,
            ...hero,
          })
        );
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (!data || !data.type) return;

          // 1. Nhận cập nhật di chuyển tức thì từ người chơi khác (< 10ms)
          if (data.type === 'player_moved') {
            if (data.userId === state.userId) return;

            let p = state.players.find((item) => item.userId === data.userId);
            if (!p) {
              p = {
                userId: data.userId,
                name: data.name,
                x: Number(data.x),
                y: Number(data.y),
                targetX: Number(data.x),
                targetY: Number(data.y),
                renderX: Number(data.x),
                renderY: Number(data.y),
                dir: Number(data.dir) || 0,
                targetDir: Number(data.dir) || 0,
                moving: Boolean(data.moving),
                targetMoving: Boolean(data.moving),
                act: data.act || 'st',
                targetAct: data.act || 'st',
                fac: data.fac || 'wudang',
                sex: data.sex || 0,
                hp: data.hp || 100,
                maxHp: data.maxHp || 100,
                level: data.level || 1,
                look: data.look || null,
                auras: data.auras || [],
              };
              state.players.push(p);
              updateUi();
            } else {
              p.targetX = Number(data.x);
              p.targetY = Number(data.y);
              if (!Number.isFinite(p.renderX)) {
                p.renderX = p.targetX;
                p.renderY = p.targetY;
              }
              p.targetDir = Number(data.dir) || 0;
              p.targetMoving = Boolean(data.moving);
              p.targetAct = data.act || (p.targetMoving ? 'run' : 'st');
              if (data.name) p.name = data.name;
              if (data.hp !== undefined) p.hp = data.hp;
              if (data.level !== undefined) p.level = data.level;
              if (data.fac) p.fac = data.fac;
              if (data.sex !== undefined) p.sex = data.sex;
              if (data.look !== undefined) p.look = data.look;
              if (data.auras !== undefined) p.auras = data.auras;
            }
            return;
          }

          // 2. Đồng bộ tổng thể từ server
          if (data.type === 'init' || data.type === 'world_sync') {
            const world = data.world || {};
            const remotePlayers = world.players || [];
            const activeIds = new Set();

            remotePlayers.forEach((remote) => {
              if (remote.userId === state.userId) return;
              activeIds.add(remote.userId);

              let local = state.players.find((item) => item.userId === remote.userId);
              if (local) {
                local.targetX = Number(remote.x);
                local.targetY = Number(remote.y);
                local.targetDir = Number(remote.dir) || 0;
                local.targetMoving = Boolean(remote.moving);
                local.targetAct = remote.act || (local.targetMoving ? 'run' : 'st');
                local.hp = remote.hp;
                local.level = remote.level;
                local.fac = remote.fac || local.fac;
                local.sex = remote.sex !== undefined ? remote.sex : local.sex;
                if (remote.look !== undefined) local.look = remote.look;
                if (remote.auras !== undefined) local.auras = remote.auras;
                if (!Number.isFinite(local.renderX)) {
                  local.renderX = local.targetX;
                  local.renderY = local.targetY;
                }
              } else {
                state.players.push({
                  ...remote,
                  look: remote.look || null,
                  auras: remote.auras || [],
                  targetX: Number(remote.x),
                  targetY: Number(remote.y),
                  renderX: Number(remote.x),
                  renderY: Number(remote.y),
                  targetDir: Number(remote.dir) || 0,
                  targetMoving: Boolean(remote.moving),
                  targetAct: remote.act || 'st',
                });
              }
            });

            // Loại bỏ người chơi đã offline
            state.players = state.players.filter(
              (p) => p.userId === state.userId || activeIds.has(p.userId)
            );

            if (world.messages) state.chat = world.messages;
            if (world.boss || world.monster) state.boss = world.boss || world.monster;
            updateUi();
            return;
          }

          if (data.type === 'chat') {
            if (data.message) {
              state.chat.push(data.message);
              if (state.chat.length > 50) state.chat.shift();
              const matchPlayer = state.players.find((p) => p.name === data.message.name);
              if (matchPlayer) {
                state.lastChatMap.set(matchPlayer.userId, {
                  text: data.message.text,
                  ts: Date.now(),
                });
              }
              updateUi();
            }
          } else if (data.type === 'boss_update') {
            state.boss = data.boss;
            if (data.attacker && data.damage) {
              setStatus(`${data.attacker} gây ${data.damage} sát thương lên Boss!`);
            }
            updateUi();
          } else if (data.type === 'pvp_update') {
            if (data.target) {
              const idx = state.players.findIndex((p) => p.userId === data.target.userId);
              if (idx !== -1) state.players[idx] = data.target;
            }
            if (data.attacker && data.damage) {
              setStatus(`⚔️ ${data.attacker} gây ${data.damage} sát thương lên đối thủ!`);
            }
            updateUi();
          } else if (data.type === 'skill_cast') {
            if (data.userId === state.userId) return;

            const matchPlayer = state.players.find((p) => p.userId === data.userId);
            const attackerX = matchPlayer ? (matchPlayer.renderX || matchPlayer.x) : Number(data.attackerX || 160);
            const attackerY = matchPlayer ? (matchPlayer.renderY || matchPlayer.y) : Number(data.attackerY || 180);
            const targetX = Number(data.targetX) || (attackerX + 120);
            const targetY = Number(data.targetY) || attackerY;

            if (matchPlayer) {
              matchPlayer.act = 'at';
              matchPlayer.targetAct = 'at';
              matchPlayer.atT = 0.55;
              matchPlayer.actT = 0;
              const dx = targetX - attackerX;
              const dy = targetY - attackerY;
              matchPlayer.dir = ((Math.round(Math.atan2(-dx, dy) / (Math.PI / 4)) % 8) + 8) % 8;
              matchPlayer.targetDir = matchPlayer.dir;
            }

            // Kích hoạt chưởng lực bay và nổ trực tiếp trên màn hình
            spawnSkillVisual(attackerX, attackerY, targetX, targetY, data.fac || (matchPlayer && matchPlayer.fac));

            if (typeof window.triggerGameSkillFx === 'function') {
              window.triggerGameSkillFx(
                { x: attackerX, y: attackerY },
                { x: targetX, y: targetY },
                data.skillId
              );
            }
          }
        } catch (e) {
          console.warn('WS message parse error:', e);
        }
      };

      ws.onclose = () => {
        state.wsConnected = false;
        setStatus('🟡 Mất kết nối WebSocket, chuyển sang HTTP...', true);
        setTimeout(connectWebSocket, 5000);
      };

      ws.onerror = () => {
        state.wsConnected = false;
        ws.close();
      };
    } catch (e) {
      state.wsConnected = false;
      setStatus('🟡 Không thể mở WebSocket, dùng HTTP...', true);
      setTimeout(connectWebSocket, 5000);
    }
  }

  // === SESSION & HTTP SYNC FALLBACK ===
  async function ensureSession() {
    if (state.token && state.userId) return;

    state.username = getHeroName();
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: state.username, password: 'guest_password_123' }),
    });

    const data = await response.json();
    if (!response.ok || !data.ok) {
      const loginRes = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: state.username, password: 'guest_password_123' }),
      });
      const loginData = await loginRes.json();
      if (loginRes.ok && loginData.ok) {
        state.token = loginData.token;
        state.userId = loginData.userId;
        state.profile = loginData.profile;
      } else {
        throw new Error(data.error || 'Đăng nhập thất bại');
      }
    } else {
      state.token = data.token;
      state.userId = data.userId;
      state.profile = data.profile;
    }

    localStorage.setItem('volamidle_token', state.token);
    localStorage.setItem('volamidle_userId', state.userId);
    localStorage.setItem('volamidle_name', state.username);
  }

  async function syncHttp() {
    if (!state.token) return;
    const hero = getHeroSnapshot();

    try {
      const res = await fetch('/api/player-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: state.token,
          ...hero,
          status: 'online',
        }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        const world = data.world || data.room;
        if (world) {
          state.players = world.players || state.players;
          state.chat = world.messages || state.chat;
          state.boss = world.boss || world.monster || state.boss;
        }
        updateUi();
      }
    } catch (e) {
      // offline/silent
    }
  }

  // === ACTIONS ===
  function sendChatMessage() {
    const text = panel.chatInput ? panel.chatInput.value.trim() : '';
    if (!text) return;

    if (panel.chatInput) panel.chatInput.value = '';

    if (state.wsConnected && state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({ type: 'chat', text, name: state.username }));
    } else {
      const hero = getHeroSnapshot();
      fetch('/api/player-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: state.token,
          chat: text,
          ...hero,
        }),
      }).then(() => syncHttp());
    }
  }

  function attackBoss() {
    const hero = getHeroSnapshot();
    const skillId = typeof window.getCurrentHeroSkillId === 'function' ? window.getCurrentHeroSkillId() : 10;
    const dirAngle = ((hero.dir || 0) * Math.PI) / 4 - Math.PI / 2;
    const targetX = hero.x + Math.round(Math.cos(dirAngle) * 170);
    const targetY = hero.y + Math.round(Math.sin(dirAngle) * 170);

    if (window.heroPos) {
      window.heroPos.act = 'at';
      window.heroPos.actT = 0;
    }

    spawnSkillVisual(hero.x, hero.y, targetX, targetY, hero.fac);

    if (typeof window.triggerGameSkillFx === 'function') {
      window.triggerGameSkillFx({ x: hero.x, y: hero.y }, { x: targetX, y: targetY }, skillId);
    }

    if (state.wsConnected && state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({ type: 'attack_boss', name: state.username }));
      state.ws.send(
        JSON.stringify({
          type: 'cast_skill',
          attackerX: hero.x,
          attackerY: hero.y,
          targetX,
          targetY,
          skillId,
          fac: hero.fac,
        })
      );
    } else {
      fetch('/api/player-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: state.token,
          action: 'attack-boss',
          ...hero,
        }),
      }).then(() => syncHttp());
    }
  }

  function attackPlayer() {
    const targetId =
      state.selectedTargetId || state.players.find((p) => p.userId !== state.userId)?.userId || '';

    if (!targetId) {
      setStatus('Chưa chọn người chơi nào để PvP', true);
      return;
    }

    const targetPlayer = state.players.find((p) => p.userId === targetId);
    const hero = getHeroSnapshot();

    let targetX = targetPlayer ? (targetPlayer.renderX || targetPlayer.x) : 0;
    let targetY = targetPlayer ? (targetPlayer.renderY || targetPlayer.y) : 0;

    if (!targetX || !targetY) {
      const dirAngle = ((hero.dir || 0) * Math.PI) / 4 - Math.PI / 2;
      targetX = hero.x + Math.round(Math.cos(dirAngle) * 160);
      targetY = hero.y + Math.round(Math.sin(dirAngle) * 160);
    }

    const skillId = typeof window.getCurrentHeroSkillId === 'function' ? window.getCurrentHeroSkillId() : 10;

    if (window.heroPos) {
      window.heroPos.act = 'at';
      window.heroPos.actT = 0;
    }

    spawnSkillVisual(hero.x, hero.y, targetX, targetY, hero.fac);

    if (typeof window.triggerGameSkillFx === 'function') {
      window.triggerGameSkillFx({ x: hero.x, y: hero.y }, { x: targetX, y: targetY }, skillId);
    }

    if (state.wsConnected && state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(
        JSON.stringify({
          type: 'attack_player',
          targetUserId: targetId,
          name: state.username,
        })
      );
      state.ws.send(
        JSON.stringify({
          type: 'cast_skill',
          attackerX: hero.x,
          attackerY: hero.y,
          targetX,
          targetY,
          targetUserId: targetId,
          skillId,
          fac: hero.fac,
        })
      );
    } else {
      fetch('/api/player-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: state.token,
          action: 'attack-player',
          targetUserId: targetId,
          ...hero,
        }),
      }).then(() => syncHttp());
    }
  }

  // === VẼ HOẠT ẢNH NHÂN VẬT THỰC (ANIMATED SPRITE) ===
  function drawHeroSprite(ctx, entity) {
    const x = Math.round(Number.isFinite(entity.x) ? entity.x : 160);
    const y = Math.round(Number.isFinite(entity.y) ? entity.y : 180);

    let fac = entity.f || entity.fac || 'wudang';
    if (typeof fac === 'string' && fac.startsWith('vo')) {
      fac = entity.s === 1 ? 'emei' : 'wudang';
    }
    if (!FACTIONS.includes(fac)) {
      fac = entity.s === 1 ? 'emei' : 'wudang';
    }

    const heroDef = (window.JW && window.JW.hero && window.JW.hero[fac]) || {
      img: `img/pl/${fac}.png`,
      anim: `pl_${fac}`,
      sz: [64, 47, 32, 45],
    };

    const animKey = heroDef.anim || `pl_${fac}`;
    const animGroup = window.JW && window.JW.anim && window.JW.anim[animKey];

    const act = entity.atT > 0 ? 'at' : entity.mv ? 'run' : 'st';
    const spec = animGroup && (animGroup[act] || animGroup.st);

    let drawn = false;

    if (spec && spec.f) {
      const spriteImg = getCachedImage(`img/a/${spec.f}`);
      if (spriteImg.complete && spriteImg.naturalWidth > 0) {
        const ms = spec.ms || 140;
        const totalFrames = spec.n || 8;
        const dirs = spec.d || 8;
        const now = performance.now();
        const frame = Math.floor(now / ms) % totalFrames;
        const dir = Math.abs(entity.dir || 0) % dirs;

        const w = spec.w;
        const h = spec.h;
        const ax = spec.ax || Math.round(w / 2);
        const ay = spec.ay || h - 2;

        ctx.drawImage(
          spriteImg,
          frame * w,
          dir * h,
          w,
          h,
          x - ax,
          y - ay,
          w,
          h
        );
        drawn = true;
      }
    }

    if (!drawn && heroDef.img) {
      const staticImg = getCachedImage(heroDef.img);
      if (staticImg.complete && staticImg.naturalWidth > 0) {
        const sz = heroDef.sz || [64, 47, 32, 45];
        const w = sz[0];
        const h = sz[1];
        const ax = sz[2] || Math.round(w / 2);
        const ay = sz[3] || h - 2;
        ctx.drawImage(staticImg, x - ax, y - ay, w, h);
        drawn = true;
      }
    }

    return drawn;
  }

  // Hook danh sách nhân vật cho hệ thống render của game
  window.othEnts = function () {
    return state.players
      .filter((p) => p.userId !== state.userId)
      .map((p) => ({
        oth: p,
        y: Number.isFinite(p.renderY) ? p.renderY : p.y || 180,
      }));
  };

  // Hook vẽ nhân vật với Nội suy chuyển động mượt mà (Linear Interpolation - LERP)
  window.othDraw = function (ctx, oth, dt) {
    if (!ctx || !oth) return;

    // === NỘI SUY TỌA ĐỘ MƯỢT MÀ (CHỐNG CHẠY 1 CHỖ & CHỐNG TELEPORT) ===
    const targetX = Number.isFinite(oth.targetX) ? oth.targetX : oth.x || 160;
    const targetY = Number.isFinite(oth.targetY) ? oth.targetY : oth.y || 180;

    if (!Number.isFinite(oth.renderX)) oth.renderX = targetX;
    if (!Number.isFinite(oth.renderY)) oth.renderY = targetY;

    const dx = targetX - oth.renderX;
    const dy = targetY - oth.renderY;
    const dist = Math.hypot(dx, dy);

    const frameDt = Math.min(0.08, dt || 0.016);

    if (dist > 350) {
      // Khoảng cách quá xa (chuyển bãi / respawn) -> snap tức thì
      oth.renderX = targetX;
      oth.renderY = targetY;
      oth.moving = Boolean(oth.targetMoving);
      oth.act = oth.targetAct || (oth.moving ? 'run' : 'st');
    } else if (dist > 1.5) {
      // Đang di chuyển: Lướt mượt mà tới tọa độ đích với tốc độ thích ứng
      const lerpSpeed = Math.min(1, frameDt * 18);
      oth.renderX += dx * lerpSpeed;
      oth.renderY += dy * lerpSpeed;
      oth.moving = true;
      oth.act = 'run';
    } else {
      // Đã tới đích: Dừng lại và chuyển sang tư thế đứng
      oth.renderX = targetX;
      oth.renderY = targetY;
      oth.moving = Boolean(oth.targetMoving);
      oth.act = oth.targetAct || (oth.moving ? 'run' : 'st');
    }

    if (oth.atT > 0) {
      oth.atT -= frameDt;
      oth.actT = (oth.actT || 0) + frameDt;
      oth.act = 'at';
    } else {
      oth.actT = 0;
    }

    const x = Math.round(oth.renderX);
    const y = Math.round(oth.renderY);

    const renderPayload = {
      userId: oth.userId,
      name: oth.name,
      level: oth.level,
      hp: oth.hp,
      maxHp: oth.maxHp,
      x: x,
      y: y,
      dir: Number(oth.targetDir !== undefined ? oth.targetDir : oth.dir) || 0,
      moving: Boolean(oth.moving),
      act: oth.act || (oth.moving ? 'run' : 'st'),
      actT: oth.actT || 0,
      fac: oth.fac || 'wudang',
      sex: Number(oth.sex) || 0,
      look: oth.look || null,
      auras: oth.auras || [],
    };

    // 1. Ưu tiên engine render của game gốc (vũ khí, ngựa, áo, mũ, giới tính, hiệu ứng vòng sáng)
    let nativeRendered = false;
    if (typeof window.renderMultiplayerPlayer === 'function') {
      try {
        nativeRendered = Boolean(window.renderMultiplayerPlayer(ctx, renderPayload, frameDt));
      } catch (err) {
        nativeRendered = false;
      }
    }

    // 2. Dự phòng khi engine game đang khởi động
    if (!nativeRendered) {
      ctx.save();
      // Bóng đổ
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.beginPath();
      ctx.ellipse(x, y, 16, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Sprite dự phòng
      drawHeroSprite(ctx, renderPayload);

      // Tên nhân vật & HP bar dự phòng
      ctx.font = 'bold 11px "IBM Plex Mono", monospace, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = state.selectedTargetId === oth.userId ? '#ff6b81' : '#7bed9f';
      ctx.fillText(`${oth.name || 'Hiệp Khách'} · Lv.${oth.level || 1}`, x, y - 48);

      const hpPct = Math.max(0, Math.min(1, (oth.hp || 100) / (oth.maxHp || 100)));
      const barW = 38;
      const barH = 4;
      ctx.fillStyle = '#2d3436';
      ctx.fillRect(x - barW / 2, y - 44, barW, barH);
      ctx.fillStyle = hpPct > 0.5 ? '#2ed573' : '#ff4757';
      ctx.fillRect(x - barW / 2, y - 44, barW * hpPct, barH);
      ctx.restore();
    }

    // 3. Vòng tròn chọn mục tiêu PvP
    if (state.selectedTargetId === oth.userId) {
      ctx.save();
      ctx.strokeStyle = '#ff4757';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(x, y, 22, 9, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // 7. Bong bóng chat
    const chatInfo = state.lastChatMap.get(oth.userId);
    if (chatInfo && Date.now() - chatInfo.ts < 6000) {
      ctx.font = '11px sans-serif';
      const text = chatInfo.text.length > 20 ? chatInfo.text.slice(0, 20) + '...' : chatInfo.text;
      const tw = ctx.measureText(text).width;
      const pw = tw + 14;
      const ph = 18;
      const bx = x - pw / 2;
      const by = y - 72;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
      ctx.strokeStyle = '#ffd76a';
      ctx.lineWidth = 1;
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(bx, by, pw, ph, 4);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(bx, by, pw, ph);
        ctx.strokeRect(bx, by, pw, ph);
      }

      ctx.fillStyle = '#ffffff';
      ctx.fillText(text, x, by + 13);
    }

    // 8. Dự phòng hiển thị chưởng lực nếu hook toàn cục chưa chạy trong frame
    if (performance.now() - lastFxFrameTs >= 12) {
      drawSkillEffects(ctx, frameDt);
    }

    ctx.restore();
  };

  // === INIT & EVENT LISTENERS ===
  if (panel.toggle) {
    panel.toggle.addEventListener('click', () => {
      state.minimized = !state.minimized;
      if (panel.content) panel.content.style.display = state.minimized ? 'none' : 'block';
      panel.toggle.textContent = state.minimized ? '+' : '−';
    });
  }

  if (panel.name) {
    panel.name.addEventListener('change', () => {
      const val = panel.name.value.trim();
      if (val) {
        state.username = val;
        localStorage.setItem('volamidle_name', val);
        if (state.wsConnected && state.ws) {
          const hero = getHeroSnapshot();
          state.ws.send(JSON.stringify({ type: 'sync', name: val, ...hero }));
        }
      }
    });
  }

  if (panel.chatSend) panel.chatSend.addEventListener('click', sendChatMessage);
  if (panel.chatInput) {
    panel.chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });
  }
  if (panel.bossAttack) panel.bossAttack.addEventListener('click', attackBoss);
  if (panel.pvpAttack) panel.pvpAttack.addEventListener('click', attackPlayer);

  // === VÒNG LẶP GỬI VỊ TRÍ TẦN SỐ CAO (20Hz - 50ms) CÓ THÍCH ỨNG ===
  let lastSentState = {
    x: 0,
    y: 0,
    dir: 0,
    moving: false,
    act: '',
    lookStr: '',
    ts: 0,
  };

  function checkAndSendPosition() {
    if (!state.wsConnected || !state.ws || state.ws.readyState !== WebSocket.OPEN) return;

    const hero = getHeroSnapshot();
    const now = performance.now();
    const movedDist = Math.hypot(hero.x - lastSentState.x, hero.y - lastSentState.y);
    const lookStr = JSON.stringify(hero.look || null);
    const lookChanged = lookStr !== lastSentState.lookStr;

    const stateChanged =
      movedDist >= 1.5 ||
      hero.dir !== lastSentState.dir ||
      hero.moving !== lastSentState.moving ||
      hero.act !== lastSentState.act ||
      lookChanged;

    const heartbeatDue = now - lastSentState.ts >= 1000;

    if (stateChanged || heartbeatDue) {
      lastSentState.x = hero.x;
      lastSentState.y = hero.y;
      lastSentState.dir = hero.dir;
      lastSentState.moving = hero.moving;
      lastSentState.act = hero.act;
      lastSentState.lookStr = lookStr;
      lastSentState.ts = now;

      state.ws.send(
        JSON.stringify({
          type: 'sync',
          x: hero.x,
          y: hero.y,
          dir: hero.dir,
          moving: hero.moving,
          act: hero.act,
          hp: hero.hp,
          level: hero.level,
          fac: hero.fac,
          sex: hero.sex,
          look: hero.look,
          auras: hero.auras,
        })
      );
    }
  }

  // === HOOK BẮT SỰ KIỆN TUNG CHIÊU TỰ ĐỘNG CỦA NHÂN VẬT CHÍNH ===
  let lastHeroCastTime = 0;
  window.onHeroSkillCast = function (attacker, target, skill) {
    const now = performance.now();
    if (now - lastHeroCastTime < 240) return;
    lastHeroCastTime = now;

    const skillId = (skill && skill.id) || (typeof window.getCurrentHeroSkillId === 'function' ? window.getCurrentHeroSkillId() : 10);
    const ax = attacker && Number.isFinite(attacker.x) ? Math.round(attacker.x) : (window.heroPos ? Math.round(window.heroPos.x) : 160);
    const ay = attacker && Number.isFinite(attacker.y) ? Math.round(attacker.y) : (window.heroPos ? Math.round(window.heroPos.y) : 180);
    const tx = target && Number.isFinite(target.x) ? Math.round(target.x) : (ax + (attacker && attacker.face < 0 ? -120 : 120));
    const ty = target && Number.isFinite(target.y) ? Math.round(target.y) : ay;
    const heroFac = (window.player && window.player.fac) || 'wudang';

    if (state.wsConnected && state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(
        JSON.stringify({
          type: 'cast_skill',
          attackerX: ax,
          attackerY: ay,
          targetX: tx,
          targetY: ty,
          skillId,
          fac: heroFac,
        })
      );
    }
  };

  (async function init() {
    try {
      await ensureSession();
      connectWebSocket();
      syncHttp();
    } catch (e) {
      console.error('Multiplayer init error:', e);
      setStatus('Lỗi khởi tạo kết nối', true);
    }

    // Gửi tọa độ 20Hz (mỗi 50ms khi di chuyển)
    setInterval(checkAndSendPosition, 50);

    // Heartbeat HTTP dự phòng khi mất WebSocket
    setInterval(() => {
      if (!state.wsConnected && state.token) {
        syncHttp();
      }
    }, 1200);
  })();

  window.__volamidleOnline = {
    state,
    attackBoss,
    attackPlayer,
    sendChatMessage,
  };
})();
