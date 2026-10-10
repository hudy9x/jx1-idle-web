'use strict';

/**
 * Server-authoritative monster world.
 *
 * Mỗi bản đồ (zone) có một bộ quái duy nhất do server quản lý: vị trí, máu, AI đuổi theo
 * người chơi, hồi sinh. Tất cả người chơi trong cùng một bản đồ nhìn thấy cùng một bộ quái.
 * Dữ liệu tĩnh (zone, quái, vật cản) được nạp từ chính các file của client (src/data/*)
 * để không phải duplicate dữ liệu.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');

const CONFIG = {
  normals: 8, // số quái thường mỗi map
  elites: 2, // số quái tinh anh mỗi map
  boss: 1, // số boss mỗi map
  respawnMs: { normal: 10000, elite: 25000, boss: 90000 },
  aggroRange: 380,
  leashRange: 900,
  stopDist: 34,
  regenPerSec: 0.04, // hồi máu (tỉ lệ) khi không giao chiến
  regenDelayMs: 6000,
  campCount: 3,
  defaultMapSize: 3072,
  mapPad: 20,
};

function loadBrowserScript(relPath, globalName) {
  const sandbox = {};
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(ROOT, relPath), 'utf8'), sandbox, { filename: relPath });
  return sandbox[globalName];
}

let staticData = null;
function getStaticData() {
  if (staticData) return staticData;
  const JW = loadBrowserScript('src/data/monsters-zones.js', 'JW') || {};
  let JMO = {};
  try {
    JMO = loadBrowserScript('src/data/skills-jmo.js', 'JMO') || {};
  } catch (e) {
    console.warn('[monsters] Không nạp được dữ liệu vật cản:', e.message);
  }
  const zones = new Map();
  const addZone = (z) => {
    if (z && z.id != null && Array.isArray(z.m) && !zones.has(String(z.id))) zones.set(String(z.id), z);
  };
  (JW.zones || []).forEach(addZone);
  Object.values(JW.zalt || {}).forEach((arr) => (arr || []).forEach(addZone));
  staticData = { JW, JMO, zones };
  return staticData;
}

/** Dựng lưới đi được từ dữ liệu vật cản (giống Te() phía client): chỉ giữ vùng liên thông lớn nhất. */
function buildGrid(zoneId, JMO) {
  const n = JMO[String(zoneId)];
  if (!n || !n.obs) {
    const size = CONFIG.defaultMapSize;
    return { gw: 0, gh: 0, cw: 1, ch: 1, w: size, h: size, ok: null };
  }
  const bin = Buffer.from(n.obs, 'base64');
  const total = n.gw * n.gh;
  const free = new Uint8Array(total);
  for (let i = 0; i < total; i++) free[i] = (bin[i >> 3] >> (i & 7)) & 1 ? 0 : 1;

  const comp = new Int32Array(total).fill(-1);
  const queue = new Int32Array(total);
  let best = -1;
  let bestSize = 0;
  let id = 0;
  for (let s = 0; s < total; s++) {
    if (!free[s] || comp[s] >= 0) continue;
    let head = 0;
    let tail = 0;
    queue[tail++] = s;
    comp[s] = id;
    while (head < tail) {
      const p = queue[head++];
      const px = p % n.gw;
      const py = (p / n.gw) | 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const nx = px + dx;
          const ny = py + dy;
          if (nx < 0 || ny < 0 || nx >= n.gw || ny >= n.gh) continue;
          const q = ny * n.gw + nx;
          if (!free[q] || comp[q] >= 0) continue;
          if (dx && dy && (!free[py * n.gw + nx] || !free[ny * n.gw + px])) continue;
          comp[q] = id;
          queue[tail++] = q;
        }
      }
    }
    if (tail > bestSize) {
      bestSize = tail;
      best = id;
    }
    id++;
  }
  const ok = new Uint8Array(total);
  for (let i = 0; i < total; i++) ok[i] = comp[i] === best ? 1 : 0;
  return { gw: n.gw, gh: n.gh, cw: n.cw, ch: n.ch, w: n.w, h: n.h, ok };
}

function isWalkable(grid, x, y) {
  if (x < CONFIG.mapPad || y < CONFIG.mapPad + 30 || x > grid.w - CONFIG.mapPad || y > grid.h - CONFIG.mapPad) {
    return false;
  }
  if (!grid.ok) return true;
  const cx = Math.floor(x / grid.cw);
  const cy = Math.floor(y / grid.ch);
  return cx >= 0 && cy >= 0 && cx < grid.gw && cy < grid.gh && grid.ok[cy * grid.gw + cx] === 1;
}

function randomWalkable(grid, rng, cx, cy, minR, maxR) {
  for (let i = 0; i < 40; i++) {
    let x;
    let y;
    if (cx == null) {
      x = rng() * grid.w;
      y = rng() * grid.h;
    } else {
      const a = rng() * Math.PI * 2;
      const r = minR + rng() * (maxR - minR);
      x = cx + Math.cos(a) * r;
      y = cy + Math.sin(a) * r;
    }
    if (isWalkable(grid, x, y)) return [x, y];
  }
  return cx == null ? [grid.w / 2, grid.h / 2] : [cx, cy];
}

function createMonsterWorld(options = {}) {
  const rng = options.rng || Math.random;
  const now = options.now || Date.now;
  const maps = new Map(); // mapId -> map state | null (không có quái)
  let nextId = 1;

  function monsterSpeed(tid, cls) {
    const { JW } = getStaticData();
    const def = (JW.mon && JW.mon[tid]) || {};
    return (30 + (def.run || 6) * 4) * (cls === 'boss' ? 0.7 : 1);
  }

  function placeMonster(map, m) {
    const camp = map.camps[m.slot % map.camps.length];
    const [x, y] = randomWalkable(map.grid, rng, camp[0], camp[1], 40, 240);
    m.x = m.hx = x;
    m.y = m.hy = y;
  }

  function makeMonster(map, slot, cls) {
    const zone = map.zone;
    const pool = zone.m.filter(Boolean);
    const lo = zone.lo || 1;
    const hi = zone.hi || lo;
    const tid = cls === 'boss' ? zone.boss : pool[Math.floor(rng() * pool.length)];
    const level = cls === 'boss' ? hi + 1 : Math.round(lo + rng() * (hi - lo));
    const m = {
      slot,
      id: nextId++,
      tid,
      L: level,
      cls,
      x: 0,
      y: 0,
      hx: 0,
      hy: 0,
      frac: 1,
      dead: false,
      respawnAt: 0,
      spd: monsterSpeed(tid, cls),
      tgt: '',
      moving: false,
      face: 1,
      lastCombat: 0,
      contrib: new Set(),
      wanderT: 0,
      wx: 0,
      wy: 0,
      side: rng() < 0.5 ? 1 : -1,
    };
    placeMonster(map, m);
    return m;
  }

  function ensureMap(mapId) {
    const key = String(mapId);
    if (maps.has(key)) return maps.get(key);
    const { zones, JMO } = getStaticData();
    const zone = zones.get(key);
    if (!zone || !zone.m.length) {
      maps.set(key, null);
      return null;
    }
    const grid = buildGrid(zone.id, JMO);
    const map = { id: key, zone, grid, camps: [], monsters: [] };
    for (let i = 0; i < CONFIG.campCount; i++) {
      // Camp nằm quanh trung tâm bản đồ để người chơi dễ gặp nhau
      map.camps.push(randomWalkable(grid, rng, grid.w / 2, grid.h / 2, 0, Math.min(grid.w, grid.h) * 0.3));
    }
    let slot = 0;
    for (let i = 0; i < CONFIG.normals; i++) map.monsters.push(makeMonster(map, slot++, 'normal'));
    for (let i = 0; i < CONFIG.elites; i++) map.monsters.push(makeMonster(map, slot++, 'elite'));
    if (zone.boss != null) for (let i = 0; i < CONFIG.boss; i++) map.monsters.push(makeMonster(map, slot++, 'boss'));
    maps.set(key, map);
    return map;
  }

  function respawn(map, index) {
    const old = map.monsters[index];
    const fresh = makeMonster(map, old.slot, old.cls);
    map.monsters[index] = fresh;
    return fresh;
  }

  function tryStep(map, m, tx, ty, dist) {
    const dx = tx - m.x;
    const dy = ty - m.y;
    const len = Math.hypot(dx, dy) || 1;
    const step = Math.min(dist, len);
    const base = Math.atan2(dy, dx);
    const offsets = [0, 0.6 * m.side, -0.6 * m.side, 1.2 * m.side, -1.2 * m.side, 1.9 * m.side];
    for (const off of offsets) {
      const a = base + off;
      const nx = m.x + Math.cos(a) * step;
      const ny = m.y + Math.sin(a) * step;
      if (isWalkable(map.grid, nx, ny)) {
        m.x = nx;
        m.y = ny;
        if (Math.abs(Math.cos(a)) > 0.2) m.face = Math.cos(a) >= 0 ? 1 : -1;
        return true;
      }
    }
    return false;
  }

  function tickMonster(map, m, players, dt, t) {
    // Xác định mục tiêu
    let target = null;
    if (m.tgt) {
      target = players.find((p) => p.userId === m.tgt) || null;
      if (target && Math.hypot(target.x - m.hx, target.y - m.hy) > CONFIG.leashRange) target = null;
    }
    if (!target) {
      m.tgt = '';
      let bestD = CONFIG.aggroRange;
      for (const p of players) {
        const d = Math.hypot(p.x - m.x, p.y - m.y);
        if (d < bestD && Math.hypot(p.x - m.hx, p.y - m.hy) <= CONFIG.leashRange) {
          bestD = d;
          target = p;
        }
      }
      if (target) m.tgt = target.userId;
    }

    let moved = false;
    const before = [m.x, m.y];
    if (target) {
      m.lastCombat = t;
      if (Math.hypot(target.x - m.x, target.y - m.y) > CONFIG.stopDist) {
        moved = tryStep(map, m, target.x, target.y, m.spd * dt);
      } else {
        m.face = target.x >= m.x ? 1 : -1;
      }
    } else {
      const homeD = Math.hypot(m.hx - m.x, m.hy - m.y);
      if (homeD > 25) {
        moved = tryStep(map, m, m.hx, m.hy, m.spd * 1.5 * dt);
      } else {
        // đi lang thang nhẹ quanh nơi sinh
        m.wanderT -= dt;
        if (m.wanderT <= 0) {
          m.wanderT = 3 + rng() * 5;
          if (rng() < 0.5) {
            const [wx, wy] = randomWalkable(map.grid, rng, m.hx, m.hy, 10, 70);
            m.wx = wx;
            m.wy = wy;
          } else {
            m.wx = m.x;
            m.wy = m.y;
          }
        }
        if (Math.hypot(m.wx - m.x, m.wy - m.y) > 4) moved = tryStep(map, m, m.wx, m.wy, m.spd * 0.35 * dt);
      }
      if (m.frac < 1 && t - m.lastCombat > CONFIG.regenDelayMs) {
        m.frac = Math.min(1, m.frac + CONFIG.regenPerSec * dt);
        if (m.frac >= 1) m.contrib.clear();
      }
    }
    m.moving = moved && Math.hypot(m.x - before[0], m.y - before[1]) > 0.05;
  }

  /** Cập nhật AI + hồi sinh cho một bản đồ. players: [{userId,x,y}] đang ở bản đồ đó. */
  function tickMap(map, players, dt) {
    const t = now();
    const alive = players.filter((p) => p.hp == null || p.hp > 0);
    for (let i = 0; i < map.monsters.length; i++) {
      let m = map.monsters[i];
      if (m.dead) {
        if (t >= m.respawnAt) m = respawn(map, i);
        else continue;
      }
      tickMonster(map, m, alive, dt, t);
    }
  }

  /** Người chơi gây sát thương (frac = phần trăm máu tối đa của quái, 0..1). */
  function hit(mapId, monId, frac, userId) {
    const map = ensureMap(mapId);
    if (!map) return null;
    const m = map.monsters.find((x) => x.id === Number(monId));
    if (!m || m.dead) return null;
    const f = Math.min(1, Math.max(0, Number(frac) || 0));
    if (f <= 0) return null;
    m.frac -= f;
    m.lastCombat = now();
    m.contrib.add(userId);
    if (!m.tgt) m.tgt = userId;
    if (m.frac > 0) return { killed: false, monster: m };
    m.frac = 0;
    m.dead = true;
    m.moving = false;
    m.tgt = '';
    m.respawnAt = now() + CONFIG.respawnMs[m.cls];
    return { killed: true, monster: m, killer: userId, contributors: Array.from(m.contrib), zone: map.zone };
  }

  function snapshot(mapId) {
    const map = ensureMap(mapId);
    if (!map) return null;
    return {
      type: 'mon_state',
      mapId: map.id,
      ts: now(),
      mons: map.monsters
        .filter((m) => !m.dead)
        .map((m) => ({
          i: m.id,
          t: m.tid,
          l: m.L,
          c: m.cls,
          x: Math.round(m.x),
          y: Math.round(m.y),
          f: Math.round(m.frac * 1000) / 1000,
          m: m.moving ? 1 : 0,
          d: m.face,
          g: m.tgt || '',
        })),
    };
  }

  return { ensureMap, tickMap, hit, snapshot, config: CONFIG };
}

module.exports = { createMonsterWorld, CONFIG, buildGrid, isWalkable };
