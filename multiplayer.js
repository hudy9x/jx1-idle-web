(function () {
  try {
    localStorage.removeItem('volamidle_token');
    localStorage.removeItem('volamidle_userId');
    localStorage.removeItem('volamidle_name');
  } catch {}

  const state = {
    token: sessionStorage.getItem('volamidle_token') || '',
    userId: sessionStorage.getItem('volamidle_userId') || '',
    username: sessionStorage.getItem('volamidle_name') || '',
    profile: null,
    players: [],
    chat: [],
    boss: null,
    selectedTargetId: '',
    ws: null,
    wsConnected: false,
    minimized: false,
    lastChatMap: new Map(), // userId -> { text, ts }
    autoPvP: false,
    pvpTargetHudEl: null,
  };

  const FACTION_NAMES = {
    shaolin: 'Thiếu Lâm',
    tianwang: 'Thiên Vương',
    tangmen: 'Đường Môn',
    wudu: 'Ngũ Độc',
    emei: 'Nga My',
    cuiyan: 'Thúy Yên',
    gaibang: 'Cái Bang',
    tianren: 'Thiên Nhẫn',
    wudang: 'Võ Đang',
    kunlun: 'Côn Lôn',
  };

  const FACTION_SERIES = {
    shaolin: 0,
    tianwang: 0,
    tangmen: 1,
    wudu: 1,
    emei: 2,
    cuiyan: 2,
    gaibang: 3,
    tianren: 3,
    wudang: 4,
    kunlun: 4,
  };

  const SERIES_INFO = [
    { name: 'Kim', color: '#ffd32a', icon: '🟡' },
    { name: 'Mộc', color: '#2ed573', icon: '🟢' },
    { name: 'Thủy', color: '#1e90ff', icon: '🔵' },
    { name: 'Hỏa', color: '#ff4757', icon: '🔴' },
    { name: 'Thổ', color: '#ffa502', icon: '🟠' },
  ];

  // Quy luật ngũ hành tương khắc của Võ Lâm Truyền Kỳ 1:
  // Kim (0) khắc Mộc (1) | Mộc (1) khắc Thổ (4) | Thổ (4) khắc Thủy (2) | Thủy (2) khắc Hỏa (3) | Hỏa (3) khắc Kim (0)
  const SERIES_COUNTER_MAP = { 0: 1, 1: 4, 4: 2, 2: 3, 3: 0 };

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
    mapBadge: document.getElementById('mpMapBadge'),
    mapBadgeCount: document.getElementById('mpMapBadgeCount'),
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

  function getCurrentMap() {
    if (typeof window.getHeroCurrentMap === 'function') {
      try {
        const m = window.getHeroCurrentMap();
        if (m && (m.mapId || m.mapName)) {
          let mapName = m.mapName;
          if ((!mapName || mapName.startsWith('Bản đồ ')) && typeof window.lookupZoneById === 'function') {
            const found = window.lookupZoneById(m.mapId);
            if (found && found.n) mapName = found.n;
          }
          return {
            mapId: String(m.mapId || m.mapName),
            mapName: mapName || String(m.mapId || 'Võ Lâm'),
          };
        }
      } catch (e) {}
    }
    const znEl = document.getElementById('u20zn');
    if (znEl && znEl.textContent && znEl.textContent.trim()) {
      const name = znEl.textContent.trim();
      let mapId = name;
      if (typeof window.lookupZoneById === 'function') {
        const found = window.lookupZoneById(name);
        if (found && found.id != null) mapId = String(found.id);
      }
      return { mapId, mapName: name };
    }
    return { mapId: 'default', mapName: 'Võ Lâm' };
  }

  function normalizeMapString(s) {
    if (!s) return '';
    return String(s)
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/^(ban do|khu vuc|map)\s*/g, '')
      .replace(/[\s\-_]+/g, '');
  }

  function resolvePlayerMapNames(p) {
    if (!p) return { id: '', name: '', normName: '' };
    const id = p.mapId != null ? String(p.mapId).trim() : '';
    let name = p.mapName ? String(p.mapName).trim() : '';

    if ((!name || name === 'default' || name.startsWith('Bản đồ ')) && id && typeof window.lookupZoneById === 'function') {
      const found = window.lookupZoneById(id);
      if (found && found.n) name = found.n;
    }
    return {
      id,
      name,
      normName: normalizeMapString(name || id),
    };
  }

  function isSameMap(a, b) {
    if (!a || !b) return false;
    const resA = resolvePlayerMapNames(a);
    const resB = resolvePlayerMapNames(b);

    // 0. Kiểm tra nếu cả hai đang ở Thành thị / Biện Kinh
    const isTownA = resA.id === 'town' || resA.id.startsWith('town_') || resA.normName === 'bienkinh' || resA.normName === 'thanhthi';
    const isTownB = resB.id === 'town' || resB.id.startsWith('town_') || resB.normName === 'bienkinh' || resB.normName === 'thanhthi';
    if (isTownA && isTownB) return true;
    if (isTownA !== isTownB) return false;

    // 1. Trùng khớp chính xác mapId (ví dụ "167" === "167", "town" === "town")
    if (resA.id && resB.id && resA.id !== 'default' && resB.id !== 'default' && resA.id === resB.id) {
      return true;
    }

    // 2. Trùng khớp tên bản đồ sau khi chuẩn hóa (ví dụ "Điểm Thương sơn" vs "diem thuong son")
    if (resA.normName && resB.normName && resA.normName !== 'volam' && resB.normName !== 'default' && resA.normName === resB.normName) {
      return true;
    }

    // 3. Tra chéo nếu mapId là tên hoặc mapName là ID
    const normIdA = normalizeMapString(resA.id);
    const normIdB = normalizeMapString(resB.id);
    if (normIdA && resB.normName && normIdA !== 'default' && normIdA === resB.normName) return true;
    if (normIdB && resA.normName && normIdB !== 'default' && normIdB === resA.normName) return true;

    // 4. Nếu 1 bên đang trong giai đoạn khởi tạo ban đầu ('default' / 'volam'), không lọc ẩn ngay nếu người chơi mới xuất hiện
    if ((resA.id === 'default' || !resA.id) && (resA.normName === 'volam' || !resA.normName)) {
      return true;
    }
    if ((resB.id === 'default' || !resB.id) && (resB.normName === 'volam' || !resB.normName)) {
      return true;
    }

    return false;
  }

  function isTownMap(mapObj) {
    if (typeof c !== 'undefined' && c.town) return true;
    const m = mapObj || getCurrentMap();
    if (!m) return false;
    const res = resolvePlayerMapNames(m);
    return (
      res.id === 'town' ||
      res.id === '37' ||
      res.id.startsWith('town_') ||
      res.normName === 'bienkinh' ||
      res.normName === 'thanhthi' ||
      res.name.includes('Biện Kinh')
    );
  }

  function isPlayerOnHeroMap(p) {
    if (!p) return false;
    const heroMap = getCurrentMap();
    return isSameMap(p, heroMap);
  }

  function getHeroSnapshot() {
    const name = getHeroName();
    const levelEl = document.getElementById('lv') || document.getElementById('lvS');
    const hpEl = document.getElementById('hpTxt');
    const goldEl = document.getElementById('gold');
    let heroHp = 100;
    let heroMaxHp = 100;

    if (typeof c !== 'undefined' && Number.isFinite(c.life)) {
      heroHp = Math.max(0, Math.round(c.life));
      if (c.P && Number.isFinite(c.P.life)) {
        heroMaxHp = Math.max(1, Math.round(c.P.life));
      }
    } else if (window.player && Number.isFinite(window.player.hp)) {
      heroHp = Math.max(0, Math.round(window.player.hp));
      heroMaxHp = Math.max(1, Math.round(window.player.maxHp || 100));
    } else {
      const rawHp = hpEl ? hpEl.textContent : '';
      const hpVal = rawHp.includes('/') ? Number.parseFloat(rawHp.split('/')[0]) : Number.parseFloat(rawHp);
      if (Number.isFinite(hpVal)) heroHp = Math.round(hpVal);
    }

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

    const curMap = getCurrentMap();

    return {
      name,
      level: levelEl ? Number.parseInt(levelEl.textContent) || 1 : 1,
      hp: heroHp,
      maxHp: heroMaxHp,
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
      mapId: curMap.mapId,
      mapName: curMap.mapName,
    };
  }

  let mapPopoverEl = null;

  function toggleMapPlayersPopover() {
    if (mapPopoverEl && mapPopoverEl.parentNode) {
      mapPopoverEl.remove();
      mapPopoverEl = null;
      return;
    }

    const curMap = getCurrentMap();
    const mapName = curMap.mapName || 'Bản đồ';
    const sameMapPlayers = state.players.filter((p) => isPlayerOnHeroMap(p));

    const popover = document.createElement('div');
    mapPopoverEl = popover;
    popover.id = 'mpMapPopover';
    popover.style.position = 'fixed';
    popover.style.top = '44px';
    popover.style.left = '50%';
    popover.style.transform = 'translateX(-50%)';
    popover.style.width = '320px';
    popover.style.maxWidth = '92vw';
    popover.style.background = 'rgba(15, 23, 20, 0.96)';
    popover.style.border = '1px solid #2ed573';
    popover.style.borderRadius = '8px';
    popover.style.boxShadow = '0 8px 24px rgba(0,0,0,0.7)';
    popover.style.zIndex = '9999';
    popover.style.padding = '10px 12px';
    popover.style.color = '#dfe6e9';
    popover.style.fontSize = '12px';
    popover.style.fontFamily = 'sans-serif';
    popover.style.userSelect = 'none';

    let html = `
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(46,213,115,0.3);padding-bottom:6px;margin-bottom:8px;">
        <span style="font-weight:bold;color:#2ed573;">🗺️ Hiệp khách tại ${mapName} (${sameMapPlayers.length})</span>
        <button id="mpMapPopoverClose" style="background:none;border:none;color:#a4b0be;font-size:16px;cursor:pointer;line-height:1;padding:0 4px;">✕</button>
      </div>
      <div style="max-height:220px;overflow-y:auto;display:flex;flex-direction:column;gap:5px;">
    `;

    if (!sameMapPlayers.length) {
      html += `<div style="color:#a4b0be;text-align:center;padding:12px 0;">Không có hiệp khách nào khác trên bản đồ này.</div>`;
    } else {
      sameMapPlayers.forEach((p) => {
        const isSelf = p.userId === state.userId;
        const isTarget = state.selectedTargetId === p.userId;
        const facName = FACTION_NAMES[p.fac] || p.fac || 'Võ Đang';
        const facColor = FACTION_COLORS[p.fac] || '#ffd32a';
        const hp = Math.max(0, Math.round(p.hp || 100));
        const maxHp = Math.max(1, Math.round(p.maxHp || 100));
        const hpPercent = Math.min(100, Math.round((hp / maxHp) * 100));

        html += `
          <div class="mp-player-row" data-uid="${p.userId}" style="display:flex;justify-content:space-between;align-items:center;padding:5px 8px;border-radius:4px;background:${isTarget ? 'rgba(255,234,167,0.15)' : 'rgba(255,255,255,0.04)'};border:1px solid ${isTarget ? '#ffeaa7' : 'rgba(255,255,255,0.08)'};cursor:${isSelf ? 'default' : 'pointer'};">
            <div>
              <div style="font-weight:bold;color:${isSelf ? '#55efc4' : '#fff'};">
                ${p.name || 'Hiệp khách'}${isSelf ? ' <small style="color:#7bed9f">(Bạn)</small>' : ''}${isTarget ? ' 🎯' : ''}
              </div>
              <div style="font-size:11px;color:#a4b0be;display:flex;gap:6px;align-items:center;margin-top:2px;">
                <span style="color:${facColor};">${facName}</span>
                <span>·</span>
                <span>Lv.${p.level || 1}</span>
                <span>·</span>
                <span style="color:#ff6b81;">HP ${hp}/${maxHp} (${hpPercent}%)</span>
              </div>
            </div>
            ${!isSelf ? `<button class="btn sm" style="font-size:11px;padding:3px 8px;background:${isTarget ? '#e17055' : '#00b894'};color:#fff;border:none;border-radius:4px;cursor:pointer;">${isTarget ? 'Bỏ chọn' : 'Tỷ thí'}</button>` : ''}
          </div>
        `;
      });
    }

    html += `</div>`;
    popover.innerHTML = html;
    document.body.appendChild(popover);

    const closeBtn = popover.querySelector('#mpMapPopoverClose');
    if (closeBtn) closeBtn.onclick = () => toggleMapPlayersPopover();

    popover.querySelectorAll('.mp-player-row').forEach((row) => {
      const uid = row.dataset.uid;
      if (uid && uid !== state.userId) {
        row.onclick = () => {
          const target = state.players.find((item) => item.userId === uid);
          if (target) {
            if (state.selectedTargetId === uid) {
              clearTarget();
            } else {
              selectTargetPlayer(target, false);
            }
            toggleMapPlayersPopover();
          }
        };
      }
    });
  }

  // Đóng popover khi bấm ra ngoài
  document.addEventListener('click', (e) => {
    if (mapPopoverEl && !mapPopoverEl.contains(e.target) && e.target !== panel.mapBadge && !panel.mapBadge?.contains(e.target)) {
      mapPopoverEl.remove();
      mapPopoverEl = null;
    }
  });

  if (panel.mapBadge) {
    panel.mapBadge.onclick = (e) => {
      e.stopPropagation();
      toggleMapPlayersPopover();
    };
  }

  function updateUi() {
    const heroMap = getCurrentMap();
    const count = state.players.length || 1;
    const sameMapPlayers = state.players.filter((p) => isPlayerOnHeroMap(p));
    const sameMapCount = sameMapPlayers.length || (state.userId ? 1 : 0);

    // Cập nhật số hiệp khách ngay cạnh phần bản đồ (#stageLbl)
    if (panel.mapBadge) {
      panel.mapBadge.style.display = 'inline-flex';
      if (panel.mapBadgeCount) {
        panel.mapBadgeCount.textContent = sameMapCount;
      }
      panel.mapBadge.title = `Bản đồ ${heroMap.mapName || 'hiện tại'}: ${sameMapCount} hiệp khách (Tổng online: ${count})`;
    }

    if (panel.badge) {
      panel.badge.textContent = heroMap.mapName
        ? `${sameMapCount}/${count} ở ${heroMap.mapName}`
        : `${count} online`;
      panel.badge.title = `Tổng cộng ${count} người chơi online (${sameMapCount} người cùng bản đồ ${heroMap.mapName})`;
    }

    if (panel.name && document.activeElement !== panel.name) {
      panel.name.value = state.username;
    }

    // Render Boss (nếu có element)
    if (state.boss) {
      if (panel.bossName) panel.bossName.textContent = state.boss.name || 'Boss Thế Giới';
      const maxHp = state.boss.maxHp || 1000;
      const hp = Math.max(0, state.boss.hp || 0);
      const pct = Math.max(0, Math.min(100, Math.round((hp / maxHp) * 100)));
      if (panel.bossHpTxt) panel.bossHpTxt.textContent = `${hp}/${maxHp} (${pct}%)`;
      if (panel.bossBar) panel.bossBar.style.width = `${pct}%`;
    }

    // Render Players list (nếu còn tồn tại panel)
    if (panel.players) {
      panel.players.innerHTML = '';
      if (!state.players.length) {
        const li = document.createElement('li');
        li.textContent = 'Đang quét hiệp khách...';
        panel.players.appendChild(li);
      } else {
        state.players.forEach((p) => {
          const isSelf = p.userId === state.userId;
          const onMyMap = isSelf || isPlayerOnHeroMap(p);
          const pMap = resolvePlayerMapNames(p);
          const mapDisplay = pMap.name || p.mapName || 'Võ Lâm';
          const li = document.createElement('li');
          li.style.cursor = isSelf ? 'default' : 'pointer';
          li.style.padding = '3px 0';
          li.style.color = state.selectedTargetId === p.userId ? '#ffeaa7' : isSelf ? '#55efc4' : onMyMap ? '#dfe6e9' : '#889096';

          const mark = isSelf ? ' (Bạn)' : state.selectedTargetId === p.userId ? ' 🎯' : '';
          const facName = p.fac ? ` [${p.fac}]` : '';
          const mapBadge = ` · 🗺️ ${mapDisplay}`;
          li.textContent = `${p.name || 'Hiệp Khách'}${mark}${facName} · Lv.${p.level || 1} · HP:${p.hp || 100}${mapBadge}`;

          if (!isSelf) {
            li.title = onMyMap ? 'Bấm để chọn mục tiêu Tỷ thí PvP (Cùng bản đồ)' : `Đang ở ${mapDisplay}`;
            li.addEventListener('click', () => {
              selectTargetPlayer(p, false);
            });
          }
          panel.players.appendChild(li);
        });
      }
    }

    // Render Chat (nếu còn tồn tại panel)
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

  // === ĐỒNG BỘ QUÁI BẢN ĐỒ (SERVER LÀ NGUỒN SỰ THẬT) ===
  // Server quyết định quái nào tồn tại, vị trí, máu và thời điểm hồi sinh. Client chỉ dựng
  // enemy cục bộ (để tái dùng toàn bộ logic chiến đấu/hiển thị) và báo sát thương về server.
  const mon = {
    mapId: '',
    ts: 0, // thời điểm nhận mon_state cuối (performance.now)
    list: [],
    gone: new Map(), // sid -> hạn chót (quái đã chết, tránh dựng lại do state cũ)
    mapCache: { id: '', ts: 0 },
  };

  function handleMonState(data) {
    mon.mapId = String(data.mapId);
    mon.ts = performance.now();
    mon.list = Array.isArray(data.mons) ? data.mons : [];
  }

  function currentMapId() {
    const t = performance.now();
    if (t - mon.mapCache.ts > 250) {
      mon.mapCache = { id: String(getCurrentMap().mapId), ts: t };
    }
    return mon.mapCache.id;
  }

  function monSyncActive() {
    if (!state.wsConnected || !state.ws || state.ws.readyState !== WebSocket.OPEN) return false;
    if (typeof c === 'undefined' || !c || c.quiet) return false;
    if (typeof a2 === 'function' && !a2()) return false;
    if (performance.now() - mon.ts > 3000) return false;
    return mon.mapId === currentMapId();
  }

  function monBuildEnemy(s) {
    if (typeof r0 === 'undefined' || !r0[s.t]) return null;
    const e = zA(s.t, s.l, s.c, s.x, s.y);
    if (s.c === 'normal') {
      e.dens = true;
      e.dmg *= ec;
    } else if (s.c === 'boss') {
      const zone = typeof V0 === 'function' ? V0(r.stage) : null;
      e.n = $e(s.t, zone && zone.n) || e.n;
    }
    e.sid = s.i;
    e.tx = s.x;
    e.ty = s.y;
    e.smv = !!s.m;
    e._rh = e.hp = e.max * s.f;
    e._myDmg = 0;
    return e;
  }

  /** Báo sát thương đã gây lên quái đồng bộ về server (đơn vị: tỉ lệ % máu tối đa của quái). */
  function monFlush() {
    if (typeof c === 'undefined' || !c || !c.enemies) return;
    let hits = null;
    for (const e of c.enemies) {
      if (e.sid == null) continue;
      const hp = Math.max(0, e.hp);
      if (e._rh > hp && e.max > 0) {
        const d = e._rh - hp;
        e._myDmg += d;
        (hits || (hits = [])).push([e.sid, Math.round((d / e.max) * 10000) / 10000]);
      }
      e._rh = hp;
      if (hp <= 0) mon.gone.set(e.sid, performance.now() + 4000);
    }
    if (hits && state.wsConnected && state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({ type: 'mon_hit', hits }));
    }
  }

  /** Đối chiếu c.enemies với danh sách quái server; trả về true nếu đang ở chế độ đồng bộ. */
  function monTick(dt) {
    if (typeof c === 'undefined' || !c || !c.enemies) return false;
    if (!monSyncActive()) {
      if (mon.wasSync) {
        // Rời chế độ đồng bộ: bỏ quái server, để b9() dựng lại quái cục bộ
        mon.wasSync = false;
        c.enemies = c.enemies.filter((e) => e.sid == null);
        c.field = null;
      }
      return false;
    }
    mon.wasSync = true;
    monFlush();
    // Chỉ giữ quái server (còn sống) và quái đặc biệt cục bộ; bỏ quái field cục bộ + xác
    const keep = (e) => !e.dead && (e.sid != null || e.goldBoss || e.sat || e.satG);
    if (!c.enemies.every(keep)) c.enemies = c.enemies.filter(keep);
    const nowMs = performance.now();
    for (const [id, until] of mon.gone) if (until < nowMs) mon.gone.delete(id);

    const serverIds = new Set();
    const bySid = new Map();
    for (const e of c.enemies) if (e.sid != null) bySid.set(e.sid, e);

    for (const s of mon.list) {
      serverIds.add(s.i);
      let e = bySid.get(s.i);
      if (!e) {
        if (mon.gone.has(s.i)) continue;
        e = monBuildEnemy(s);
        if (!e) continue;
        c.enemies.push(e);
        continue;
      }
      if (e.dead || e.hp <= 0) continue;
      e.tx = s.x;
      e.ty = s.y;
      e.smv = !!s.m;
      e.hp = Math.min(e.hp, e.max * s.f);
      e._rh = Math.min(e._rh, e.hp);
    }

    for (const e of c.enemies) {
      if (e.sid == null || e.dead) continue;
      if (!serverIds.has(e.sid)) {
        // Quái đã chết/biến mất trên server (do người chơi khác hạ) -> chết cục bộ
        e.hp = 0;
        e._rh = 0;
        mon.gone.set(e.sid, nowMs + 4000);
        continue;
      }
      const dx = e.tx - e.x;
      const dy = e.ty - e.y;
      if (Math.hypot(dx, dy) > 300) {
        e.x = e.tx;
        e.y = e.ty;
      } else {
        const k = Math.min(1, (dt || 0) * 12);
        e.x += dx * k;
        e.y += dy * k;
      }
    }
    return true;
  }

  window.MPMON = {
    active: monSyncActive,
    tick: monTick,
    flush: monFlush,
    fill: () => monTick(0),
  };

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

          // Trạng thái quái do server quản lý (đồng bộ giữa mọi người chơi cùng bản đồ)
          if (data.type === 'mon_state') {
            handleMonState(data);
            return;
          }

          // 0. Khi có người chơi mới tham gia phòng / server
          if (data.type === 'player_joined') {
            const player = data.player;
            if (!player || player.userId === state.userId) return;

            let p = state.players.find((item) => item.userId === player.userId);
            if (!p) {
              p = {
                userId: player.userId,
                name: player.name,
                x: Number(player.x) || 160,
                y: Number(player.y) || 180,
                targetX: Number(player.x) || 160,
                targetY: Number(player.y) || 180,
                renderX: Number(player.x) || 160,
                renderY: Number(player.y) || 180,
                dir: Number(player.dir) || 0,
                targetDir: Number(player.dir) || 0,
                moving: Boolean(player.moving),
                targetMoving: Boolean(player.moving),
                act: player.act || 'st',
                targetAct: player.act || 'st',
                fac: player.fac || 'wudang',
                sex: player.sex || 0,
                hp: player.hp || 100,
                maxHp: player.maxHp || 100,
                level: player.level || 1,
                look: player.look || null,
                auras: player.auras || [],
                mapId: player.mapId != null ? String(player.mapId) : 'default',
                mapName: player.mapName || 'Võ Lâm',
              };
              state.players.push(p);
            } else {
              p.targetX = Number(player.x) || p.targetX;
              p.targetY = Number(player.y) || p.targetY;
              p.renderX = Number(player.x) || p.renderX;
              p.renderY = Number(player.y) || p.renderY;
              if (player.mapId !== undefined) p.mapId = String(player.mapId);
              if (player.mapName !== undefined) p.mapName = player.mapName;
              if (player.hp !== undefined) p.hp = Number(player.hp);
              if (player.maxHp !== undefined) p.maxHp = Number(player.maxHp);
              if (player.level !== undefined) p.level = player.level;
              if (player.look !== undefined) p.look = player.look;
              if (player.auras !== undefined) p.auras = player.auras;
            }
            updateUi();
            return;
          }

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
                hp: Number(data.hp != null ? data.hp : 100),
                maxHp: Number(data.maxHp || 100),
                level: data.level || 1,
                look: data.look || null,
                auras: data.auras || [],
                mapId: data.mapId != null ? String(data.mapId) : 'default',
                mapName: data.mapName || 'Võ Lâm',
              };
              state.players.push(p);
              updateUi();
            } else {
              const oldMapId = p.mapId;
              if (data.mapId !== undefined) p.mapId = String(data.mapId);
              if (data.mapName !== undefined) p.mapName = data.mapName;
              if (oldMapId && p.mapId && oldMapId !== p.mapId) {
                p.renderX = Number(data.x);
                p.renderY = Number(data.y);
              }

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
              if (data.hp !== undefined) p.hp = Number(data.hp);
              if (data.maxHp !== undefined) p.maxHp = Number(data.maxHp);
              if (data.level !== undefined) p.level = data.level;
              if (data.fac) p.fac = data.fac;
              if (data.sex !== undefined) p.sex = data.sex;
              if (data.look !== undefined) p.look = data.look;
              if (data.auras !== undefined) p.auras = data.auras;
              if (data.mapId !== undefined || data.mapName !== undefined) {
                updateUi();
              }
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
                const oldMapId = local.mapId;
                if (remote.mapId !== undefined) local.mapId = String(remote.mapId);
                if (remote.mapName !== undefined) local.mapName = remote.mapName;
                if (oldMapId && local.mapId && oldMapId !== local.mapId) {
                  local.renderX = Number(remote.x);
                  local.renderY = Number(remote.y);
                }
                local.targetX = Number(remote.x);
                local.targetY = Number(remote.y);
                local.targetDir = Number(remote.dir) || 0;
                local.targetMoving = Boolean(remote.moving);
                local.targetAct = remote.act || (local.targetMoving ? 'run' : 'st');
                local.hp = Number(remote.hp != null ? remote.hp : local.hp);
                if (remote.maxHp !== undefined) local.maxHp = Number(remote.maxHp);
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
                  hp: Number(remote.hp != null ? remote.hp : 100),
                  maxHp: Number(remote.maxHp || 100),
                  look: remote.look || null,
                  auras: remote.auras || [],
                  mapId: remote.mapId != null ? String(remote.mapId) : 'default',
                  mapName: remote.mapName || 'Võ Lâm',
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
              // Đẩy thẳng vào khung chat gốc trong game
              if (window.__nativeChat && typeof window.__nativeChat.pushMsg === 'function') {
                window.__nativeChat.pushMsg({
                  id: data.message.id || ('ws_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6)),
                  userId: data.message.userId || (matchPlayer && matchPlayer.userId) || '',
                  name: data.message.name || 'Hiệp khách',
                  fac: data.message.fac || (matchPlayer && matchPlayer.fac) || '',
                  lvl: data.message.lvl || (matchPlayer && matchPlayer.level) || 0,
                  text: data.message.text || '',
                  ts: data.message.ts || Date.now(),
                  sys: data.message.name === 'Hệ thống',
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
            const targetUserId = data.targetUserId || (data.target && data.target.userId);
            const isMe = targetUserId === state.userId;
            const damage = Number(data.damage) || 0;

            if (data.target) {
              const idx = state.players.findIndex((p) => p.userId === data.target.userId);
              if (idx !== -1) {
                state.players[idx] = { ...state.players[idx], ...data.target };
              }
            }

            if (isMe && (damage > 0 || data.revived)) {
              // BẢN THÂN NGƯỜI CHƠI BỊ ĐÁNH TRÚNG HOẶC HỒI SINH
              if (typeof c !== 'undefined') {
                if (data.targetHp !== undefined) {
                  c.life = Math.max(0, Number(data.targetHp));
                } else if (Number.isFinite(c.life)) {
                  c.life = Math.max(0, c.life - damage);
                }
                c.hurtT = 0.35;
                if (c.P) c.P.hp = c.life;
              }
              if (damage > 0) {
                if (typeof b !== 'undefined') {
                  b.act = 'hurt';
                  b.actT = 0;
                }
                if (window.heroPos) {
                  window.heroPos.act = 'hurt';
                  window.heroPos.actT = 0;
                }
                if (typeof EA === 'function' && typeof b !== 'undefined') {
                  EA(b.x, b.y - 42, `-${damage}${data.isCrit ? '!' : ''}`, '#ff4757', data.isCrit ? 16 : 13);
                }
                if (typeof y === 'function') {
                  y(`⚠️ Bị ${data.attacker || 'Hiệp khách'} tấn công! -${damage} HP`);
                }
                setStatus(`⚠️ Bị ${data.attacker || 'đối thủ'} đánh trúng gây ${damage} sát thương!`, true);
              }

              // Cập nhật thanh máu HUD game
              const hpEl = document.getElementById('hpTxt');
              const hpBar = document.getElementById('hpBar');
              if (typeof c !== 'undefined' && c.P) {
                const maxLife = c.P.life || 100;
                const curLife = Math.max(0, c.life);
                if (hpEl) hpEl.textContent = `${Math.round(curLife)} / ${Math.round(maxLife)}`;
                if (hpBar) hpBar.style.width = `${Math.round((curLife / maxLife) * 100)}%`;
                if (curLife <= 0 && typeof Rw === 'function') {
                  Rw();
                }
              }

              // Lập tức gửi gói sync để đồng bộ ngược lại máy chủ và toàn bộ client khác
              checkAndSendPosition();
            } else if (damage > 0) {
              // ĐỐI THỦ KHÁC BỊ TẤN CÔNG
              const matchPlayer = state.players.find((p) => p.userId === targetUserId);
              if (matchPlayer) {
                matchPlayer.act = 'hurt';
                matchPlayer.targetAct = 'hurt';
                matchPlayer.actT = 0;
                matchPlayer.atT = 0.28;
                if (data.targetHp !== undefined) {
                  matchPlayer.hp = Number(data.targetHp);
                } else if (data.target && data.target.hp !== undefined) {
                  matchPlayer.hp = Number(data.target.hp);
                } else {
                  matchPlayer.hp = Math.max(0, (matchPlayer.hp || 100) - damage);
                }
                if (data.targetMaxHp !== undefined) {
                  matchPlayer.maxHp = Number(data.targetMaxHp);
                } else if (data.target && data.target.maxHp !== undefined) {
                  matchPlayer.maxHp = Number(data.target.maxHp);
                }
                const ox = Number.isFinite(matchPlayer.renderX) ? matchPlayer.renderX : matchPlayer.x || 160;
                const oy = Number.isFinite(matchPlayer.renderY) ? matchPlayer.renderY : matchPlayer.y || 180;
                if (typeof EA === 'function') {
                  const dmgColor = data.isCrit ? '#ffd24a' : (data.isCounter ? '#ff6b81' : '#ffffff');
                  EA(ox, oy - 42, `-${damage}${data.isCrit ? '!' : ''}`, dmgColor, data.isCrit ? 16 : 13);
                }
                if (matchPlayer.hp <= 0) {
                  matchPlayer.act = 'die';
                  matchPlayer.targetAct = 'die';
                }
              }
              if (data.attacker) {
                setStatus(`⚔️ ${data.attacker} gây ${damage} sát thương!`);
              }
            }

            if (data.revived) {
              const revivedPlayer = state.players.find((p) => p.userId === targetUserId);
              if (revivedPlayer) {
                revivedPlayer.hp = Number(data.targetHp != null ? data.targetHp : (data.target && data.target.hp ? data.target.hp : 100));
                if (data.targetMaxHp !== undefined) revivedPlayer.maxHp = Number(data.targetMaxHp);
                revivedPlayer.act = 'st';
                revivedPlayer.targetAct = 'st';
              }
            }

            updateUi();
            updateTargetHud();
          } else if (data.type === 'skill_cast') {
            if (data.userId === state.userId) return;

            const matchPlayer = state.players.find((p) => p.userId === data.userId);

            // Bỏ qua hiệu ứng kỹ năng nếu người chơi tung chiêu đang ở bản đồ khác
            const senderMap = {
              mapId: data.mapId != null ? String(data.mapId) : (matchPlayer && matchPlayer.mapId != null ? String(matchPlayer.mapId) : ''),
              mapName: data.mapName || (matchPlayer && matchPlayer.mapName) || '',
            };
            const heroMap = getCurrentMap();
            if ((senderMap.mapId || senderMap.mapName) && !isSameMap(senderMap, heroMap)) {
              return;
            }

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

            // Kích hoạt chiêu thức võ công từ engine gốc của game
            let nativeFxTriggered = false;
            if (typeof window.triggerGameSkillFx === 'function') {
              try {
                nativeFxTriggered = Boolean(
                  window.triggerGameSkillFx(
                    { x: attackerX, y: attackerY },
                    { x: targetX, y: targetY },
                    data.skillId
                  )
                );
              } catch (err) {
                nativeFxTriggered = false;
              }
            }

            // Chỉ dùng hiệu ứng cầu năng lượng fallback nếu engine gốc của game chưa khả dụng
            if (!nativeFxTriggered) {
              spawnSkillVisual(attackerX, attackerY, targetX, targetY, data.fac || (matchPlayer && matchPlayer.fac));
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
    const currentHero = getHeroName();
    if (state.token && state.userId) {
      if (currentHero && state.username !== currentHero) {
        state.username = currentHero;
        sessionStorage.setItem('volamidle_name', state.username);
      }
      return;
    }

    state.username = currentHero || `ĐạiHiệp_${Math.floor(Math.random() * 899 + 100)}`;
    const uniqueUserKey = `hero_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    let regSuccess = false;

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: uniqueUserKey, password: 'guest_password_123' }),
      });
      const data = await response.json();
      if (response.ok && data.ok) {
        state.token = data.token;
        state.userId = data.userId;
        state.profile = data.profile;
        regSuccess = true;
      }
    } catch (e) {}

    if (!regSuccess) {
      state.token = 'tk_' + Math.random().toString(36).slice(2, 10);
      state.userId = 'user_' + Math.random().toString(36).slice(2, 10);
    }

    sessionStorage.setItem('volamidle_token', state.token);
    sessionStorage.setItem('volamidle_userId', state.userId);
    sessionStorage.setItem('volamidle_name', state.username);
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
          userId: state.userId,
          ...hero,
          status: 'online',
        }),
      });

      if (res.status === 401) {
        state.token = null;
        localStorage.removeItem('volamidle_token');
        await ensureSession();
        return;
      }

      const data = await res.json();
      if (res.ok && data.ok) {
        const world = data.world || data.room;
        if (world) {
          if (Array.isArray(world.players)) {
            const remotePlayers = world.players;
            const activeIds = new Set();
            remotePlayers.forEach((remote) => {
              if (remote.userId === state.userId) return;
              activeIds.add(remote.userId);
              let local = state.players.find((item) => item.userId === remote.userId);
              if (local) {
                local.targetX = Number(remote.x);
                local.targetY = Number(remote.y);
                if (!Number.isFinite(local.renderX)) local.renderX = local.targetX;
                if (!Number.isFinite(local.renderY)) local.renderY = local.targetY;
                local.mapId = remote.mapId != null ? String(remote.mapId) : local.mapId;
                local.mapName = remote.mapName || local.mapName;
                local.hp = remote.hp;
                local.level = remote.level;
                local.fac = remote.fac || local.fac;
                local.sex = remote.sex !== undefined ? remote.sex : local.sex;
                if (remote.look !== undefined) local.look = remote.look;
                if (remote.auras !== undefined) local.auras = remote.auras;
              } else {
                state.players.push({
                  ...remote,
                  targetX: Number(remote.x),
                  targetY: Number(remote.y),
                  renderX: Number(remote.x),
                  renderY: Number(remote.y),
                  mapId: remote.mapId != null ? String(remote.mapId) : 'default',
                  mapName: remote.mapName || 'Võ Lâm',
                });
              }
            });
            state.players = state.players.filter((p) => p.userId === state.userId || activeIds.has(p.userId));
          }
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
  function sendChatMessageDirect(text) {
    if (!text || typeof text !== 'string') return;
    const cleanText = text.trim();
    if (!cleanText) return;

    const hero = getHeroSnapshot();
    const heroName = (window.player && window.player.name) || state.username;

    if (state.wsConnected && state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(JSON.stringify({
        type: 'chat',
        text: cleanText,
        name: heroName,
        fac: hero.fac,
        lvl: hero.level,
        mapId: hero.mapId,
        mapName: hero.mapName,
      }));
    } else {
      fetch('/api/player-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: state.token,
          chat: cleanText,
          ...hero,
        }),
      }).then(() => syncHttp());
    }
  }

  function sendChatMessage() {
    const text = panel.chatInput ? panel.chatInput.value.trim() : '';
    if (!text) return;
    if (panel.chatInput) panel.chatInput.value = '';
    sendChatMessageDirect(text);
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

    let nativeFxTriggered = false;
    if (typeof window.triggerGameSkillFx === 'function') {
      try {
        nativeFxTriggered = Boolean(
          window.triggerGameSkillFx({ x: hero.x, y: hero.y }, { x: targetX, y: targetY }, skillId)
        );
      } catch (err) {
        nativeFxTriggered = false;
      }
    }
    if (!nativeFxTriggered) {
      spawnSkillVisual(hero.x, hero.y, targetX, targetY, hero.fac);
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
          mapId: hero.mapId,
          mapName: hero.mapName,
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

  // === HỆ THỐNG TARGET VÀ KHUNG THÔNG TIN MỤC TIÊU (PVP TARGET HUD) ===
  function createTargetHud() {
    if (state.pvpTargetHudEl) return state.pvpTargetHudEl;
    let el = document.getElementById('pvpTargetHud');
    if (!el) {
      el = document.createElement('div');
      el.id = 'pvpTargetHud';
      el.style.cssText = `
        display: none;
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        background: linear-gradient(180deg, rgba(24, 28, 36, 0.96), rgba(12, 14, 18, 0.98));
        border: 1.5px solid #d4af37;
        border-radius: 8px;
        padding: 7px 14px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.75), inset 0 0 10px rgba(212, 175, 55, 0.2);
        min-width: 290px;
        font-family: 'IBM Plex Mono', monospace, sans-serif;
        color: #fff;
        user-select: none;
      `;
      el.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px;gap:8px;">
          <div style="display:flex;align-items:center;gap:6px;">
            <span id="targetFacBadge" style="background:#ffa502;color:#121212;font-size:10px;font-weight:bold;padding:1px 6px;border-radius:3px;">Thổ</span>
            <strong id="targetName" style="color:#ffeaa7;font-size:12px;text-shadow:0 1px 2px #000;">ĐạiHiệp</strong>
            <span id="targetLevel" style="color:#74b9ff;font-size:11px;">Lv.1</span>
          </div>
          <button id="targetCloseBtn" title="Hủy mục tiêu (Esc)" style="background:none;border:none;color:#a4b0be;font-size:14px;cursor:pointer;padding:0 4px;line-height:1;">✕</button>
        </div>
        <div style="background:#1e272e;height:9px;border-radius:4px;overflow:hidden;border:1px solid #333;margin-bottom:6px;position:relative;">
          <div id="targetHpBar" style="background:linear-gradient(90deg,#ff4757,#ffa502);height:100%;width:100%;transition:width .2s;"></div>
          <span id="targetHpTxt" style="position:absolute;top:-2px;left:0;width:100%;text-align:center;font-size:9px;color:#fff;text-shadow:0 1px 2px #000;font-weight:bold;">100 / 100</span>
        </div>
        <div style="display:flex;gap:6px;">
          <button id="targetAttackBtn" style="flex:1;padding:5px 8px;border:none;border-radius:4px;background:linear-gradient(180deg,#ff4757,#ee5253);color:#fff;font-size:11px;font-weight:bold;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px;box-shadow:0 2px 6px rgba(255,71,87,0.4);">⚔️ Tấn Công PK</button>
          <button id="targetAutoBtn" style="flex:1;padding:5px 8px;border:1px solid #ff9f43;border-radius:4px;background:rgba(255,159,67,0.15);color:#ffd76a;font-size:11px;font-weight:bold;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px;">⚡ Tự Động: Tắt</button>
        </div>
      `;
      document.body.appendChild(el);

      const closeBtn = el.querySelector('#targetCloseBtn');
      if (closeBtn) closeBtn.addEventListener('click', clearTarget);

      const attackBtn = el.querySelector('#targetAttackBtn');
      if (attackBtn) attackBtn.addEventListener('click', () => attackPlayer(state.selectedTargetId, false));

      const autoBtn = el.querySelector('#targetAutoBtn');
      if (autoBtn) autoBtn.addEventListener('click', toggleAutoPvP);
    }
    state.pvpTargetHudEl = el;
    return el;
  }

  function updateTargetHud() {
    const el = createTargetHud();
    if (!el) return;

    if (!state.selectedTargetId) {
      el.style.display = 'none';
      return;
    }

    const target = state.players.find((p) => p.userId === state.selectedTargetId);
    if (!target) {
      el.style.display = 'none';
      return;
    }

    el.style.display = 'block';

    const targetNameEl = el.querySelector('#targetName');
    const targetLevelEl = el.querySelector('#targetLevel');
    const targetFacBadge = el.querySelector('#targetFacBadge');
    const targetHpBar = el.querySelector('#targetHpBar');
    const targetHpTxt = el.querySelector('#targetHpTxt');
    const targetAutoBtn = el.querySelector('#targetAutoBtn');

    if (targetNameEl) targetNameEl.textContent = target.name || 'Hiệp Khách';
    if (targetLevelEl) targetLevelEl.textContent = `Lv.${target.level || 1}`;

    const facKey = String(target.fac || 'wudang').toLowerCase();
    const seriesIdx = FACTION_SERIES[facKey] != null ? FACTION_SERIES[facKey] : 4;
    const seriesData = SERIES_INFO[seriesIdx] || SERIES_INFO[4];

    if (targetFacBadge) {
      targetFacBadge.textContent = `${seriesData.icon} ${FACTION_NAMES[facKey] || 'Võ Đang'} [${seriesData.name}]`;
      targetFacBadge.style.background = seriesData.color;
      targetFacBadge.style.color = '#121212';
    }

    const curHp = Math.max(0, target.hp != null ? target.hp : 100);
    const maxHp = target.maxHp || 100;
    const pct = Math.max(0, Math.min(100, Math.round((curHp / maxHp) * 100)));

    if (targetHpBar) targetHpBar.style.width = `${pct}%`;
    if (targetHpTxt) targetHpTxt.textContent = `${curHp} / ${maxHp} (${pct}%)`;

    const targetAttackBtn = el.querySelector('#targetAttackBtn');
    const inSafeTown = isTownMap() || isTownMap(target);

    if (targetAttackBtn) {
      if (inSafeTown) {
        targetAttackBtn.textContent = '🛡️ Vùng An Toàn (Cấm PK)';
        targetAttackBtn.style.background = 'linear-gradient(180deg, #57606f, #2f3542)';
        targetAttackBtn.style.boxShadow = 'none';
        targetAttackBtn.style.opacity = '0.7';
      } else {
        targetAttackBtn.textContent = '⚔️ Tấn Công PK';
        targetAttackBtn.style.background = 'linear-gradient(180deg, #ff4757, #ee5253)';
        targetAttackBtn.style.boxShadow = '0 2px 6px rgba(255,71,87,0.4)';
        targetAttackBtn.style.opacity = '1';
      }
    }

    if (targetAutoBtn) {
      if (inSafeTown) {
        targetAutoBtn.textContent = '🛡️ Khu An Toàn';
        targetAutoBtn.style.background = 'rgba(116, 125, 140, 0.2)';
        targetAutoBtn.style.borderColor = '#747d8c';
        targetAutoBtn.style.color = '#a4b0be';
      } else if (state.autoPvP) {
        targetAutoBtn.textContent = '⚡ Tự Động: Bật';
        targetAutoBtn.style.background = 'rgba(46, 213, 115, 0.25)';
        targetAutoBtn.style.borderColor = '#2ed573';
        targetAutoBtn.style.color = '#2ed573';
      } else {
        targetAutoBtn.textContent = '⚡ Tự Động: Tắt';
        targetAutoBtn.style.background = 'rgba(255, 159, 67, 0.15)';
        targetAutoBtn.style.borderColor = '#ff9f43';
        targetAutoBtn.style.color = '#ffd76a';
      }
    }
  }

  function toggleAutoPvP() {
    if (isTownMap()) {
      setStatus('🛡️ Biện Kinh là khu vực an toàn, không thể bật Auto PK!', true);
      if (typeof y === 'function') y('Biện Kinh cấm PK!');
      state.autoPvP = false;
      updateTargetHud();
      return;
    }
    state.autoPvP = !state.autoPvP;
    updateTargetHud();
    if (state.autoPvP && state.selectedTargetId) {
      setStatus('⚡ Đã bật chế độ Tự Động Chiến Đấu PK');
      attackPlayer(state.selectedTargetId, true);
    } else {
      clearTimeout(pvpAutoAttackTimer);
      setStatus('Đã tắt Tự Động PK');
    }
  }

  // Tìm người chơi khác tại tọa độ Canvas click
  function findPlayerAt(worldX, worldY, maxDist = 45) {
    if (!state.players || !state.players.length) return null;
    const heroMap = getCurrentMap();
    let best = null;
    let minD = maxDist;

    for (const p of state.players) {
      if (p.userId === state.userId) continue;
      if (!isPlayerOnHeroMap(p)) continue;

      const px = Number.isFinite(p.renderX) ? p.renderX : p.x || 160;
      const py = Number.isFinite(p.renderY) ? p.renderY : p.y || 180;
      const dist = Math.hypot(px - worldX, py - 20 - worldY);
      if (dist < minD) {
        minD = dist;
        best = p;
      }
    }
    return best;
  }

  // Chọn người chơi làm mục tiêu chiến đấu
  function selectTargetPlayer(player, autoAttack = false) {
    if (!player) return;
    const prevId = state.selectedTargetId;
    state.selectedTargetId = player.userId;

    if (typeof c !== 'undefined') {
      c.playerTgt = player;
    }

    const facKey = String(player.fac || 'wudang').toLowerCase();
    const facName = FACTION_NAMES[facKey] || 'Võ Đang';
    const seriesIdx = FACTION_SERIES[facKey] != null ? FACTION_SERIES[facKey] : 4;
    const seriesName = SERIES_INFO[seriesIdx]?.name || 'Hệ Thổ';

    setStatus(`🎯 Mục tiêu PvP: ${player.name} [${facName} - ${seriesName}]`);
    if (typeof y === 'function') {
      y(`🎯 Mục tiêu: ${player.name} · ${facName} (${seriesName})`);
    }

    updateUi();
    updateTargetHud();

    if (autoAttack || state.autoPvP) {
      attackPlayer(player.userId, false);
    }
  }

  // Hủy chọn mục tiêu
  function clearTarget() {
    state.selectedTargetId = '';
    state.autoPvP = false;
    clearTimeout(pvpAutoAttackTimer);
    if (typeof c !== 'undefined') {
      c.playerTgt = null;
      if (c.moveTo && c.moveTo._isPvpTarget) c.moveTo = null;
    }
    setStatus('Đã hủy chọn mục tiêu');
    updateUi();
    updateTargetHud();
  }

  // Đổi mục tiêu người chơi tiếp theo (Phím Tab)
  function cycleNextTarget() {
    const list = state.players.filter((p) => p.userId !== state.userId && isPlayerOnHeroMap(p));
    if (!list.length) {
      setStatus('Không có hiệp khách nào xung quanh', true);
      return;
    }

    const hero = getHeroSnapshot();
    // Sắp xếp theo khoảng cách gần nhất
    list.sort((a, b) => {
      const da = Math.hypot((a.renderX || a.x) - hero.x, (a.renderY || a.y) - hero.y);
      const db = Math.hypot((b.renderX || b.x) - hero.x, (b.renderY || b.y) - hero.y);
      return da - db;
    });

    const curIdx = list.findIndex((p) => p.userId === state.selectedTargetId);
    const nextIdx = (curIdx + 1) % list.length;
    selectTargetPlayer(list[nextIdx], false);
  }

  // === HỆ THỐNG TẤN CÔNG NGƯỜI CHƠI (CLONE TỪ HỆ THỐNG CHIẾN ĐẤU VỚI QUÁI) ===
  let pvpAutoAttackTimer = null;

  function attackPlayer(targetInput, isContinuous = false) {
    const targetId = typeof targetInput === 'string'
      ? targetInput
      : (targetInput && targetInput.userId) || state.selectedTargetId || state.players.find((p) => p.userId !== state.userId)?.userId || '';

    if (!targetId) {
      setStatus('Chưa chọn người chơi nào để PvP', true);
      if (typeof y === 'function') y('Chưa chọn hiệp khách để tỷ thí!');
      return;
    }

    const targetPlayer = state.players.find((p) => p.userId === targetId);
    if (!targetPlayer) {
      setStatus('Không tìm thấy đối thủ trên bản đồ', true);
      clearTarget();
      return;
    }

    if (isTownMap()) {
      setStatus('🛡️ Biện Kinh là khu vực an toàn, không thể tỷ thí PK!', true);
      if (typeof y === 'function') y('Biện Kinh là vùng an toàn, cấm PK!');
      if (typeof EA === 'function' && typeof b !== 'undefined') {
        EA(b.x, b.y - 38, 'Khu an toàn', '#2ed573', 13);
      }
      clearTimeout(pvpAutoAttackTimer);
      state.autoPvP = false;
      updateTargetHud();
      return;
    }

    if (!isPlayerOnHeroMap(targetPlayer)) {
      setStatus(`Mục tiêu đang ở ${targetPlayer.mapName || 'bản đồ khác'}, không thể tỷ thí!`, true);
      return;
    }

    if (isTownMap(targetPlayer)) {
      setStatus(`🛡️ Đối thủ đang ở khu an toàn, không thể tấn công!`, true);
      if (typeof y === 'function') y('Đối thủ đang ở khu an toàn!');
      clearTimeout(pvpAutoAttackTimer);
      state.autoPvP = false;
      updateTargetHud();
      return;
    }

    if (targetPlayer.hp <= 0) {
      setStatus(`${targetPlayer.name} đã trọng thương, không thể tấn công!`);
      if (typeof y === 'function') y(`${targetPlayer.name} đã trọng thương!`);
      clearTimeout(pvpAutoAttackTimer);
      return;
    }

    const hero = getHeroSnapshot();
    const heroX = (typeof b !== 'undefined' && Number.isFinite(b.x)) ? b.x : hero.x;
    const heroY = (typeof b !== 'undefined' && Number.isFinite(b.y)) ? b.y : hero.y;

    const targetX = Number.isFinite(targetPlayer.renderX) ? targetPlayer.renderX : (targetPlayer.x || 160);
    const targetY = Number.isFinite(targetPlayer.renderY) ? targetPlayer.renderY : (targetPlayer.y || 180);

    const dx = targetX - heroX;
    const dy = targetY - heroY;
    const dist = Math.hypot(dx, dy);

    // 1. LẤY KỸ NĂNG HIỆN TẠI CỦA NHÂN VẬT CHÍNH (CLONE TỪ battle.js)
    let skill = null;
    if (typeof c !== 'undefined' && c.P) {
      skill = (c.P.main && c.P.main.id) ? c.P.main : (c.P.basic || null);
      if (!skill && typeof Iw === 'function') {
        skill = Iw(c.P, true);
      }
    }
    if (!skill) {
      skill = {
        id: typeof window.getCurrentHeroSkillId === 'function' ? window.getCurrentHeroSkillId() : 10,
        name: 'Võ Công Cơ Bản',
        rad: 130,
        rate: 1.8,
        parts: { phys: 40 },
      };
    }

    const attackRange = Math.max(65, Number(skill.rad) || 120);

    // 2. NẾU NGOÀI TẦM ĐÁNH -> TỰ ĐỘNG DI CHUYỂN TIẾP CẬN ĐỐI THỦ
    if (dist > attackRange) {
      if (typeof c !== 'undefined') {
        c.moveTo = { x: targetX, y: targetY, hp: Math.max(1, targetPlayer.hp || 100), _isPvpTarget: true };
      }
      if (!isContinuous && typeof y === 'function') {
        y(`Tiếp cận ${targetPlayer.name}...`);
      }
      clearTimeout(pvpAutoAttackTimer);
      pvpAutoAttackTimer = setTimeout(() => {
        if (state.selectedTargetId === targetId) {
          attackPlayer(targetId, true);
        }
      }, 120);
      return;
    }

    // 3. ĐÃ VÀO TẦM ĐÁNH -> DỪNG DI CHUYỂN VÀ XUẤT CHIÊU
    if (typeof c !== 'undefined') {
      if (c.moveTo && c.moveTo._isPvpTarget) c.moveTo = null;
    }

    // Quay mặt 8 hướng chuẩn Võ Lâm
    const dir = ((Math.round(Math.atan2(-dx, dy) / (Math.PI / 4)) % 8) + 8) % 8;
    if (typeof b !== 'undefined') {
      b.face = dx >= 0 ? 1 : -1;
      b.dir = dir;
      b.act = 'at';
      b.actT = 0;
    }
    if (window.heroPos) {
      window.heroPos.dir = dir;
      window.heroPos.act = 'at';
      window.heroPos.actT = 0;
    }

    // 4. HIỆU ỨNG HÌNH ẢNH & ÂM THANH KỸ NĂNG VÕ LÂM
    const heroFac = (window.player && window.player.fac) || hero.fac || 'wudang';
    let nativeFxTriggered = false;
    if (typeof window.triggerGameSkillFx === 'function') {
      try {
        nativeFxTriggered = Boolean(
          window.triggerGameSkillFx({ x: heroX, y: heroY }, { x: targetX, y: targetY }, skill.id)
        );
      } catch (err) {
        nativeFxTriggered = false;
      }
    }
    if (!nativeFxTriggered) {
      spawnSkillVisual(heroX, heroY, targetX, targetY, heroFac);
    }

    if (typeof Rc === 'function' && skill.id) {
      try { Rc(skill.id); } catch (e) {}
    }

    // 5. TÍNH TOÁN SÁT THƯƠNG NGŨ HÀNH CHUẨN VÕ LÂM 1 (CLONE TỪ Hs)
    const attSeries = FACTION_SERIES[String(heroFac).toLowerCase()] ?? 4;
    const tgtFac = String(targetPlayer.fac || 'wudang').toLowerCase();
    const tgtSeries = targetPlayer.series != null ? targetPlayer.series : (FACTION_SERIES[tgtFac] ?? 4);

    // Kiểm tra tương khắc ngũ hành (Kim khắc Mộc khắc Thổ khắc Thủy khắc Hỏa khắc Kim)
    const isCounter = typeof a1 === 'function' ? a1(attSeries, tgtSeries) : (SERIES_COUNTER_MAP[attSeries] === tgtSeries);
    const isCountered = typeof a1 === 'function' ? a1(tgtSeries, attSeries) : (SERIES_COUNTER_MAP[tgtSeries] === attSeries);

    // Tính tỷ lệ trúng đòn (Né tránh vs Chính xác)
    const attackerAR = (typeof c !== 'undefined' && c.P && c.P.ar) ? c.P.ar : (45 + (hero.level || 1) * 11);
    const targetDef = targetPlayer.def != null ? targetPlayer.def : (10 + (targetPlayer.level || 1) * 3.8);
    let isMiss = false;
    if (typeof Qt === 'function') {
      const hitChance = Qt(attackerAR, targetDef, skill.ignore || 0);
      if (Math.random() * 100 >= hitChance) isMiss = true;
    } else if (Math.random() < 0.08) {
      isMiss = true;
    }

    if (isMiss) {
      if (typeof EA === 'function') {
        EA(targetX, targetY - 38, 'Trượt', '#aaa', 12);
      }
      sendPvpHitPacket(targetPlayer, 0, false, false, skill, 'phys');
      scheduleNextPvPAttack(targetId, skill);
      return;
    }

    // Hóa giải (Block 5%)
    if (Math.random() < 0.05) {
      if (typeof EA === 'function') {
        EA(targetX, targetY - 38, 'Hóa giải', '#ccc', 12);
      }
      sendPvpHitPacket(targetPlayer, 0, false, false, skill, 'phys');
      scheduleNextPvPAttack(targetId, skill);
      return;
    }

    // Tỉ lệ chí mạng & trọng kích
    const critRate = (typeof c !== 'undefined' && c.P && c.P.crit) ? c.P.crit : 16;
    const isCrit = Math.random() * 100 < (skill.crit || critRate);
    const isFatal = Math.random() * 100 < 10;

    // Phân tích các thành phần sát thương (parts)
    let rawDmg = 0;
    let mainElem = 'phys';
    const parts = skill.parts || { phys: 38 + (hero.level || 1) * 3 };

    for (const elem in parts) {
      let elemDmg = parts[elem] * (0.85 + Math.random() * 0.3);
      const res = (targetPlayer.res && targetPlayer.res[elem]) || 20;
      elemDmg = (elemDmg * (100 - Math.min(75, res))) / 100;
      if (isCrit && elem === 'phys') elemDmg *= 1.8;
      rawDmg += elemDmg;
      mainElem = elem;
    }

    // Khắc hệ ngũ hành: Khắc (+30%), Bị khắc (-30%)
    if (isCounter) {
      rawDmg *= 1.3;
    } else if (isCountered) {
      rawDmg *= 0.7;
    }

    if (isFatal) rawDmg *= 1.4;

    const finalDamage = Math.max(8, Math.round(rawDmg));

    // 6. ÁP DỤNG TRỪ MÁU VÀ HOẠT ẢNH BỊ THƯƠNG
    targetPlayer.hp = Math.max(0, (targetPlayer.hp || 100) - finalDamage);
    targetPlayer.act = 'hurt';
    targetPlayer.targetAct = 'hurt';
    targetPlayer.actT = 0;
    targetPlayer.atT = 0.28;

    // Số sát thương bay màu hệ ngũ hành (EA)
    const ELEM_COLORS = {
      phys: '#ffffff',
      cold: '#8fd8ff',
      fire: '#ff904a',
      light: '#fffa60',
      poison: '#8fe34a',
    };
    const dmgColor = isCrit ? '#ffd24a' : (ELEM_COLORS[mainElem] || '#ffffff');
    const mark = isCounter ? ' ⚡' : (isCountered ? ' 🛡' : '');

    if (typeof EA === 'function') {
      EA(targetX, targetY - 38, `${finalDamage}${mark}${isCrit ? '!' : ''}`, dmgColor, isCrit ? 16 : 13);
    }

    // 7. GỬI WEBSOCKET LÊN SERVER ĐỒNG BỘ CHO ĐỐI THỦ VÀ TOÀN SERVER
    sendPvpHitPacket(targetPlayer, finalDamage, isCrit, isCounter, skill, mainElem);

    updateTargetHud();

    if (targetPlayer.hp <= 0) {
      targetPlayer.act = 'die';
      targetPlayer.targetAct = 'die';
      setStatus(`🏆 Đã hạ gục ${targetPlayer.name}!`);
      if (typeof y === 'function') y(`🏆 Đã hạ gục ${targetPlayer.name}!`);
      clearTimeout(pvpAutoAttackTimer);
      return;
    }

    scheduleNextPvPAttack(targetId, skill);
  }

  function sendPvpHitPacket(targetPlayer, damage, isCrit, isCounter, skill, elem) {
    const hero = getHeroSnapshot();
    const heroFac = (window.player && window.player.fac) || hero.fac || 'wudang';

    if (state.wsConnected && state.ws && state.ws.readyState === WebSocket.OPEN) {
      state.ws.send(
        JSON.stringify({
          type: 'attack_player',
          targetUserId: targetPlayer.userId,
          damage: damage,
          isCrit: !!isCrit,
          isCounter: !!isCounter,
          element: elem || 'phys',
          skillId: skill.id,
          skillName: skill.name || skill.n || 'Võ Công',
          name: state.username,
        })
      );
      state.ws.send(
        JSON.stringify({
          type: 'cast_skill',
          attackerX: hero.x,
          attackerY: hero.y,
          targetX: targetPlayer.renderX || targetPlayer.x,
          targetY: targetPlayer.renderY || targetPlayer.y,
          targetUserId: targetPlayer.userId,
          skillId: skill.id,
          fac: heroFac,
          mapId: hero.mapId,
          mapName: hero.mapName,
        })
      );
    } else {
      fetch('/api/player-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: state.token,
          action: 'attack-player',
          targetUserId: targetPlayer.userId,
          damage: damage,
          ...hero,
        }),
      }).then(() => syncHttp());
    }
  }

  function scheduleNextPvPAttack(targetId, skill) {
    clearTimeout(pvpAutoAttackTimer);
    if (state.autoPvP && state.selectedTargetId === targetId) {
      const rate = Number(skill.rate) || 1.8;
      const cdMs = Math.max(350, Math.round(1000 / rate));
      pvpAutoAttackTimer = setTimeout(() => {
        if (state.autoPvP && state.selectedTargetId === targetId) {
          attackPlayer(targetId, true);
        }
      }, cdMs);
    }
  }

  // === TÌM KIẾM ĐỐI THỦ VÀ VÒNG LẶP CHIẾN ĐẤU PK ĐỘC LẬP (PVP ENGINE TICK) ===
  function findNearestPvPEnemy() {
    if (isTownMap()) return null; // Biện Kinh là khu vực an toàn, cấm tìm kiếm mục tiêu PK
    if (!state.players || !state.players.length) return null;
    const hero = getHeroSnapshot();
    const heroX = (typeof b !== 'undefined' && Number.isFinite(b.x)) ? b.x : hero.x;
    const heroY = (typeof b !== 'undefined' && Number.isFinite(b.y)) ? b.y : hero.y;

    const enemies = state.players.filter((p) => {
      if (p.userId === state.userId) return false;
      if (!isPlayerOnHeroMap(p)) return false;
      if (isTownMap(p)) return false;
      if (p.hp <= 0 || p.status === 'trọng thương' || p.act === 'die') return false;
      return true;
    });

    if (!enemies.length) return null;

    enemies.sort((a, b) => {
      const da = Math.hypot((a.renderX || a.x) - heroX, (a.renderY || a.y) - heroY);
      const db = Math.hypot((b.renderX || b.x) - heroX, (b.renderY || b.y) - heroY);
      return da - db;
    });

    return enemies[0];
  }

  // Tích hợp trực tiếp vào Game Loop của game (được gọi từ zw() trong battle.js)
  function executePvPCombatTick() {
    // Biện Kinh cấm tuyệt đối mọi hoạt động chiến đấu PK
    if (isTownMap()) {
      if (state.autoPvP) {
        state.autoPvP = false;
        updateTargetHud();
      }
      return false;
    }

    const isPkMode = (typeof r !== 'undefined' && r.mode === 'pk') || state.autoPvP;

    // 1. Kiểm tra mục tiêu hiện tại
    let curTarget = null;
    if (state.selectedTargetId) {
      curTarget = state.players.find((p) => p.userId === state.selectedTargetId);
      if (curTarget && (!isPlayerOnHeroMap(curTarget) || isTownMap(curTarget) || curTarget.hp <= 0)) {
        curTarget = null;
        state.selectedTargetId = '';
        if (typeof c !== 'undefined') c.playerTgt = null;
      }
    }

    // 2. Nếu ở chế độ PK mà chưa có mục tiêu hoặc mục tiêu cũ đã chết -> Tự động tìm kiếm đối thủ gần nhất!
    if (isPkMode && !curTarget) {
      const enemy = findNearestPvPEnemy();
      if (enemy) {
        selectTargetPlayer(enemy, false);
        curTarget = enemy;
      }
    }

    // Nếu không có mục tiêu PvP nào
    if (!curTarget) {
      return false; // Trả về false để hệ thống đánh quái hoạt động
    }

    // 3. Tiến hành kiểm tra vị trí & cự ly tới đối thủ
    const hero = getHeroSnapshot();
    const heroX = (typeof b !== 'undefined' && Number.isFinite(b.x)) ? b.x : hero.x;
    const heroY = (typeof b !== 'undefined' && Number.isFinite(b.y)) ? b.y : hero.y;

    const targetX = Number.isFinite(curTarget.renderX) ? curTarget.renderX : (curTarget.x || 160);
    const targetY = Number.isFinite(curTarget.renderY) ? curTarget.renderY : (curTarget.y || 180);

    const dx = targetX - heroX;
    const dy = targetY - heroY;
    const dist = Math.hypot(dx, dy);

    // Lấy kỹ năng của hero
    let skill = null;
    if (typeof c !== 'undefined' && c.P) {
      skill = (c.P.main && c.P.main.id) ? c.P.main : (c.P.basic || null);
      if (!skill && typeof Iw === 'function') {
        skill = Iw(c.P, true);
      }
    }
    if (!skill) {
      skill = {
        id: typeof window.getCurrentHeroSkillId === 'function' ? window.getCurrentHeroSkillId() : 10,
        name: 'Võ Công Cơ Bản',
        rad: 130,
        rate: 1.8,
        parts: { phys: 40 },
      };
    }

    const attackRange = Math.max(65, Number(skill.rad) || 120);

    // Ngoài tầm đánh -> Tự động chạy bám theo đối thủ (Chase target)
    if (dist > attackRange) {
      if (typeof c !== 'undefined') {
        c.moveTo = { x: targetX, y: targetY, hp: Math.max(1, curTarget.hp || 100), _isPvpTarget: true };
      }
      return 0.05; // Cooldown di chuyển ngắn để bám sát mượt mà
    }

    // Vào tầm đánh -> Dừng di chuyển và tung chiêu
    if (typeof c !== 'undefined' && c.moveTo && c.moveTo._isPvpTarget) {
      c.moveTo = null;
    }

    // Gọi hàm tấn công đối thủ
    attackPlayer(curTarget.userId, true);

    const rate = Number(skill.rate) || 1.8;
    return 1 / rate;
  }

  // Hook kích hoạt khi người chơi chuyển sang chế độ PK
  function onPkModeActivated() {
    if (isTownMap()) {
      setStatus('🛡️ Biện Kinh là khu vực an toàn, không thể kích hoạt PK!', true);
      if (typeof y === 'function') y('Biện Kinh là khu an toàn, cấm PK!');
      state.autoPvP = false;
      updateTargetHud();
      return;
    }
    state.autoPvP = true;
    updateTargetHud();
    const enemy = findNearestPvPEnemy();
    if (enemy) {
      selectTargetPlayer(enemy, true);
      setStatus(`🔥 Chế độ PK: Bắt đầu truy sát ${enemy.name}!`);
    } else {
      setStatus(`🔥 Chế độ PK: Đang lùng sục đối thủ trên bản đồ...`);
    }
  }

  // Quét đối thủ định kỳ khi ở chế độ PK
  setInterval(() => {
    if (typeof r !== 'undefined' && r.mode === 'pk') {
      if (isTownMap()) return; // Vùng an toàn
      const cur = state.selectedTargetId ? state.players.find((p) => p.userId === state.selectedTargetId) : null;
      if (!cur || cur.hp <= 0 || !isPlayerOnHeroMap(cur) || isTownMap(cur)) {
        const nextEnemy = findNearestPvPEnemy();
        if (nextEnemy) {
          selectTargetPlayer(nextEnemy, true);
        }
      }
    }
  }, 1000);

  // === HỆ THỐNG TRỌNG THƯƠNG & VỀ THÀNH DƯỠNG SỨC (BIỆN KINH) ===
  function respawnAtTown() {
    clearTarget();
    clearTimeout(pvpAutoAttackTimer);

    // 1. Phục hồi sinh lực và trạng thái
    if (typeof c !== 'undefined') {
      c.deadT = 0;
      if (c.P && Number.isFinite(c.P.life)) {
        c.life = c.P.life;
        c.mana = c.P.mana || c.mana;
      } else {
        c.life = 1000;
      }
      c.slowT = c.stunT = c.hpDotT = c.hpDot = 0;
      c.hurtT = 0;
    }

    if (typeof b !== 'undefined') {
      b.act = 'st';
      b.actT = 0;
    }
    if (window.heroPos) {
      window.heroPos.act = 'st';
      window.heroPos.actT = 0;
    }

    // 2. Chuyển bản đồ về Biện Kinh (Town)
    if (typeof window.returnToTown === 'function') {
      window.returnToTown(true, 'Về thành dưỡng sức · Hồi phục toàn bộ sinh lực');
    }

    // 3. Cập nhật thanh máu HUD
    const hpEl = document.getElementById('hpTxt');
    const hpBar = document.getElementById('hpBar');
    if (typeof c !== 'undefined' && c.P) {
      const maxLife = c.P.life || 100;
      const curLife = Math.max(0, c.life);
      if (hpEl) hpEl.textContent = `${Math.round(curLife)} / ${Math.round(maxLife)}`;
      if (hpBar) hpBar.style.width = '100%';
    }

    setStatus('🏛️ Đã trở về thành Biện Kinh dưỡng sức và hồi phục sinh lực hoàn toàn!');
    if (typeof y === 'function') {
      y('Đã trở về Biện Kinh dưỡng sức!');
    }

    // 4. Đồng bộ ngay lập tức cho server và các client khác
    checkAndSendPosition();
    updateUi();
    updateTargetHud();
  }
  window.respawnAtTown = respawnAtTown;

  function showDeathDialog() {
    if (typeof J === 'function') {
      const modalHtml = `
        <div style="text-align:center;padding:14px 8px;user-select:none;">
          <div style="font-size:42px;margin-bottom:8px;filter:drop-shadow(0 0 10px rgba(255,71,87,0.6));">☠️</div>
          <h3 style="color:#ff4757;margin:0 0 8px;font-size:22px;letter-spacing:1.5px;font-weight:900;text-shadow:0 0 8px rgba(255,71,87,0.6);">
            HIỆP KHÁCH TRỌNG THƯƠNG
          </h3>
          <p style="color:#f1f2f6;font-size:14px;line-height:1.6;margin:0 0 18px;">
            Sinh lực đã cạn kiệt, không thể tiếp tục chiến đấu!<br>
            Hãy lập tức trở về <b>Biện Kinh</b> để điều dưỡng nội thương, phục hồi sinh lực.
          </p>
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
            <button id="btnReturnTownDeathModal" class="btn" style="background:linear-gradient(135deg, #e74c3c, #c0392b);color:#fff;border:1px solid #ff7675;padding:10px 24px;font-weight:bold;font-size:15px;border-radius:6px;cursor:pointer;box-shadow:0 0 16px rgba(231,76,60,0.5);display:inline-flex;align-items:center;gap:6px;">
              🏛️ Về Thành Dưỡng Sức (Biện Kinh)
            </button>
          </div>
        </div>
      `;
      J(modalHtml, () => {
        const btn = document.getElementById('btnReturnTownDeathModal');
        if (btn) {
          btn.onclick = () => {
            if (typeof t0 === 'function') t0(true);
            respawnAtTown();
          };
        }
      }, true);
    }
  }
  window.showDeathDialog = showDeathDialog;

  // Bắt phím tắt bàn phím tiện lợi
  window.addEventListener('keydown', (e) => {
    // Không bắt phím khi đang nhập tin nhắn chat
    if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      cycleNextTarget();
    } else if (e.key === 'Escape') {
      clearTarget();
    } else if (e.key === 'f' || e.key === 'F') {
      if (state.selectedTargetId) {
        attackPlayer(state.selectedTargetId, false);
      }
    }
  });

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

  // Hook danh sách nhân vật cho hệ thống render của game (chỉ render nhân vật đang ở cùng bản đồ)
  window.othEnts = function () {
    return state.players
      .filter((p) => p.userId !== state.userId && isPlayerOnHeroMap(p))
      .map((p) => ({
        oth: p,
        y: Number.isFinite(p.renderY) ? p.renderY : p.y || 180,
      }));
  };

  // Hook vẽ nhân vật với Nội suy chuyển động mượt mà (Linear Interpolation - LERP)
  window.othDraw = function (ctx, oth, dt) {
    if (!ctx || !oth) return;
    if (!isPlayerOnHeroMap(oth)) return;

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
    mapId: '',
    hp: 0,
    maxHp: 0,
    ts: 0,
  };

  function checkAndSendPosition() {
    if (!state.wsConnected || !state.ws || state.ws.readyState !== WebSocket.OPEN) return;

    const hero = getHeroSnapshot();
    const now = performance.now();
    const movedDist = Math.hypot(hero.x - lastSentState.x, hero.y - lastSentState.y);
    const lookStr = JSON.stringify(hero.look || null);
    const lookChanged = lookStr !== lastSentState.lookStr;
    const mapChanged = String(hero.mapId || '') !== String(lastSentState.mapId || '');
    const hpChanged = Math.abs(hero.hp - (lastSentState.hp || 0)) >= 1 || hero.maxHp !== lastSentState.maxHp;

    const stateChanged =
      movedDist >= 1.5 ||
      hero.dir !== lastSentState.dir ||
      hero.moving !== lastSentState.moving ||
      hero.act !== lastSentState.act ||
      lookChanged ||
      mapChanged ||
      hpChanged;

    const heartbeatDue = now - lastSentState.ts >= 1000;

    if (stateChanged || heartbeatDue) {
      lastSentState.x = hero.x;
      lastSentState.y = hero.y;
      lastSentState.dir = hero.dir;
      lastSentState.moving = hero.moving;
      lastSentState.act = hero.act;
      lastSentState.lookStr = lookStr;
      lastSentState.mapId = hero.mapId;
      lastSentState.hp = hero.hp;
      lastSentState.maxHp = hero.maxHp;
      lastSentState.ts = now;

      state.ws.send(
        JSON.stringify({
          type: 'sync',
          name: hero.name,
          x: hero.x,
          y: hero.y,
          dir: hero.dir,
          moving: hero.moving,
          act: hero.act,
          hp: hero.hp,
          maxHp: hero.maxHp,
          level: hero.level,
          fac: hero.fac,
          sex: hero.sex,
          look: hero.look,
          auras: hero.auras,
          mapId: hero.mapId,
          mapName: hero.mapName,
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
    const curMap = getCurrentMap();

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
          mapId: curMap.mapId,
          mapName: curMap.mapName,
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
    findPlayerAt,
    selectTargetPlayer,
    clearTarget,
    cycleNextTarget,
    toggleAutoPvP,
    updateTargetHud,
    sendChatMessage,
    sendChatMessageDirect,
    executePvPCombatTick,
    findNearestPvPEnemy,
    onPkModeActivated,
    respawnAtTown,
    showDeathDialog,
  };
})();
