const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const http = require('http');
const { createSaveStore, createTokenVerifier, handleSavesRequest } = require('../saves');

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'saves-'));
const store = createSaveStore(dir);
const verify = async (t) => (t.startsWith('tok-') ? 'user-' + t.slice(4) + '-00000000' : null);

function sendJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}
function readBody(req, cb, max) {
  let b = '';
  req.on('data', (c) => (b += c));
  req.on('end', () => cb(b.length > max ? null : JSON.parse(b || '{}')));
}

const server = http.createServer((req, res) => {
  const parsed = new URL(req.url, 'http://x');
  if (!handleSavesRequest({ req, res, pathname: parsed.pathname, parsedUrl: parsed, store, verify, sendJson, readBody })) {
    sendJson(res, 404, {});
  }
});

function request(port, method, url, token, body) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      { port, method, path: url, headers: Object.assign({}, token ? { Authorization: 'Bearer ' + token } : {}, { 'Content-Type': 'application/json' }) },
      (res) => {
        let b = '';
        res.on('data', (c) => (b += c));
        res.on('end', () => resolve({ status: res.statusCode, json: JSON.parse(b) }));
      },
    );
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

server.listen(0, async () => {
  const port = server.address().port;
  try {
    assert.strictEqual((await request(port, 'GET', '/api/saves')).status, 401);
    assert.strictEqual((await request(port, 'GET', '/api/saves', 'bad')).status, 401);

    const big = 'x'.repeat(2 * 1024 * 1024); // vượt giới hạn 1MB cũ
    let r = await request(port, 'PUT', '/api/saves/0', 'tok-a', { name: 'A', lvl: 5, fac: 'wudang', data: big });
    assert.strictEqual(r.status, 200);
    await request(port, 'PUT', '/api/saves/1', 'tok-a', { name: 'B', lvl: 9, fac: 'emei', data: 'abc' });
    assert.strictEqual((await request(port, 'PUT', '/api/saves/2', 'tok-a', { name: 'no data' })).status, 400);
    assert.strictEqual((await request(port, 'PUT', '/api/saves/abc', 'tok-a', { data: '1' })).status, 404);

    r = await request(port, 'GET', '/api/saves', 'tok-a');
    assert.deepStrictEqual(r.json.saves.map((s) => [s.slot, s.name, s.lvl]), [[0, 'A', 5], [1, 'B', 9]]);
    assert(!('data' in r.json.saves[0]), 'danh sách không kèm data');
    r = await request(port, 'GET', '/api/saves?full=1', 'tok-a');
    assert.strictEqual(r.json.saves[1].data, 'abc');
    r = await request(port, 'GET', '/api/saves/0', 'tok-a');
    assert.strictEqual(r.json.save.data.length, big.length);

    // Cô lập theo owner
    r = await request(port, 'GET', '/api/saves', 'tok-b');
    assert.deepStrictEqual(r.json.saves, []);
    assert.strictEqual((await request(port, 'GET', '/api/saves/0', 'tok-b')).status, 404);

    // Bền vững: store mới đọc lại từ đĩa
    const store2 = createSaveStore(dir);
    assert.strictEqual(store2.get('user-a-00000000', 1).name, 'B');

    r = await request(port, 'DELETE', '/api/saves/1', 'tok-a');
    assert.strictEqual(r.json.removed, true);
    assert.strictEqual((await request(port, 'GET', '/api/saves/1', 'tok-a')).status, 404);

    // Verifier: token hợp lệ được cache, token sai bị từ chối
    let calls = 0;
    const v = createTokenVerifier({
      url: 'http://auth',
      apiKey: 'k',
      fetchImpl: async (u, o) => {
        calls++;
        return o.headers.Authorization === 'Bearer good'
          ? { ok: true, json: async () => ({ id: 'uuid-1' }) }
          : { ok: false };
      },
    });
    assert.strictEqual(await v('good'), 'uuid-1');
    assert.strictEqual(await v('good'), 'uuid-1');
    assert.strictEqual(calls, 1);
    assert.strictEqual(await v('nope'), null);

    console.log('saves.test.js OK');
    server.close();
    fs.rmSync(dir, { recursive: true, force: true });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
});
