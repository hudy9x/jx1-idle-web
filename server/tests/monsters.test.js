const assert = require('assert');
const { createMonsterWorld, isWalkable, CONFIG } = require('../monsters');

let clock = 1000000;
const world = createMonsterWorld({ now: () => clock });

// Bản đồ không có quái (thành thị, phó bản...) -> null
assert.strictEqual(world.ensureMap('town_37'), null);
assert.strictEqual(world.snapshot('tower_1'), null);

// Map dã ngoại có bộ quái cố định do server sinh ra
const map = world.ensureMap('2');
assert(map, 'zone 2 phải có quái');
const expected = CONFIG.normals + CONFIG.elites + (map.zone.boss != null ? CONFIG.boss : 0);
const snap = world.snapshot('2');
assert.strictEqual(snap.mons.length, expected);
assert(snap.mons.every((m) => m.f === 1));
assert(map.monsters.every((m) => isWalkable(map.grid, m.x, m.y)), 'quái phải đứng trên ô đi được');

// Hai lần lấy snapshot cho thấy cùng một bộ quái (đồng bộ giữa người chơi)
assert.deepStrictEqual(world.snapshot('2').mons.map((m) => m.i), snap.mons.map((m) => m.i));

// AI: quái đuổi theo người chơi gần nhất, luôn đứng trên ô đi được
const target = map.monsters[0];
const player = { userId: 'u1', x: target.x + 200, y: target.y, hp: 100 };
const d0 = Math.hypot(player.x - target.x, player.y - target.y);
for (let i = 0; i < 20; i++) world.tickMap(map, [player], 0.1);
const d1 = Math.hypot(player.x - target.x, player.y - target.y);
assert(d1 < d0, 'quái phải tiến lại gần người chơi');
assert.strictEqual(target.tgt, 'u1');
assert(map.monsters.every((m) => isWalkable(map.grid, m.x, m.y)));

// Sát thương: trừ theo tỉ lệ máu, tích lũy từ nhiều người chơi, chết khi hết máu
const victim = map.monsters[1];
let res = world.hit('2', victim.id, 0.4, 'u1');
assert.strictEqual(res.killed, false);
res = world.hit('2', victim.id, 0.7, 'u2');
assert.strictEqual(res.killed, true);
assert.deepStrictEqual(res.contributors.sort(), ['u1', 'u2']);
assert.strictEqual(world.hit('2', victim.id, 0.5, 'u1'), null, 'quái đã chết không nhận thêm sát thương');
assert.strictEqual(world.snapshot('2').mons.length, expected - 1);

// Hồi sinh sau thời gian chờ -> id mới, máu đầy
clock += CONFIG.respawnMs[victim.cls] - 1;
world.tickMap(map, [], 0.1);
assert.strictEqual(world.snapshot('2').mons.length, expected - 1);
clock += 2;
world.tickMap(map, [], 0.1);
const after = world.snapshot('2');
assert.strictEqual(after.mons.length, expected);
assert(!after.mons.some((m) => m.i === victim.id));

console.log('monsters.test.js OK');
