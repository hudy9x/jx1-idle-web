'use strict';

/**
 * Lưu trữ save nhân vật ở backend (thay cho bảng `saves` trên Supabase).
 *
 * - Mỗi chủ sở hữu (owner = id tài khoản) có một file JSON: server/data/saves/<owner>.json
 *   chứa các slot { slot, name, lvl, fac, data, updated }.
 * - Ghi file theo kiểu atomic (ghi file tạm rồi rename) và tuần tự hóa theo owner.
 * - Danh tính được xác thực bằng access token của tài khoản (xem createTokenVerifier).
 */

const fs = require('fs');
const path = require('path');

const MAX_BODY_BYTES = 8 * 1024 * 1024;
const MAX_SLOT = 99;
const OWNER_RE = /^[A-Za-z0-9_-]{8,64}$/;

function createSaveStore(dir) {
  fs.mkdirSync(dir, { recursive: true });
  const cache = new Map(); // owner -> { slot -> record }
  const queues = new Map(); // owner -> Promise (tuần tự hóa ghi)

  function fileOf(owner) {
    if (!OWNER_RE.test(owner)) throw new Error('Owner không hợp lệ');
    return path.join(dir, `${owner}.json`);
  }

  function load(owner) {
    if (cache.has(owner)) return cache.get(owner);
    let slots = {};
    try {
      const parsed = JSON.parse(fs.readFileSync(fileOf(owner), 'utf8'));
      if (parsed && typeof parsed === 'object') slots = parsed;
    } catch (e) {
      if (e.code !== 'ENOENT') console.error('[saves] đọc lỗi', owner, e.message);
    }
    cache.set(owner, slots);
    return slots;
  }

  function persist(owner) {
    const file = fileOf(owner);
    const json = JSON.stringify(load(owner));
    const run = (queues.get(owner) || Promise.resolve()).then(async () => {
      const tmp = `${file}.${process.pid}.tmp`;
      await fs.promises.writeFile(tmp, json);
      await fs.promises.rename(tmp, file);
    });
    queues.set(owner, run.catch(() => {}));
    return run;
  }

  return {
    list(owner, withData = false) {
      return Object.values(load(owner))
        .sort((a, b) => a.slot - b.slot)
        .map((r) => (withData ? r : { slot: r.slot, name: r.name, lvl: r.lvl, fac: r.fac, updated: r.updated }));
    },
    get(owner, slot) {
      return load(owner)[slot] || null;
    },
    async put(owner, slot, record) {
      load(owner)[slot] = { ...record, slot };
      await persist(owner);
    },
    async remove(owner, slot) {
      const slots = load(owner);
      if (!(slot in slots)) return false;
      delete slots[slot];
      await persist(owner);
      return true;
    },
  };
}

/** Xác thực access token qua dịch vụ auth hiện tại (Supabase GoTrue) -> trả về user id. */
function createTokenVerifier({ url, apiKey, fetchImpl = globalThis.fetch, ttlMs = 5 * 60 * 1000 }) {
  const cache = new Map(); // token -> { id, exp }
  return async function verify(token) {
    if (!token) return null;
    const hit = cache.get(token);
    if (hit && hit.exp > Date.now()) return hit.id;
    try {
      const res = await fetchImpl(`${url}/auth/v1/user`, {
        headers: { apikey: apiKey, Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return null;
      const user = await res.json();
      if (!user || !user.id) return null;
      cache.set(token, { id: String(user.id), exp: Date.now() + ttlMs });
      if (cache.size > 2000) cache.delete(cache.keys().next().value);
      return String(user.id);
    } catch (e) {
      return null;
    }
  };
}

function parseSlot(raw) {
  const n = Number(raw);
  return Number.isInteger(n) && n >= 0 && n <= MAX_SLOT ? n : null;
}

/**
 * Xử lý /api/saves[/:slot]. Trả về true nếu request thuộc về module này.
 * sendJson(res, status, payload) và readBody(req, cb(body|null)) do server truyền vào.
 */
function handleSavesRequest({ req, res, pathname, parsedUrl, store, verify, sendJson, readBody }) {
  const m = /^\/api\/saves(?:\/(\d+))?\/?$/.exec(pathname);
  if (!m) return false;

  const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  const method = req.method;

  verify(token).then((owner) => {
    if (!owner) return sendJson(res, 401, { ok: false, error: 'Chưa đăng nhập' });
    const slot = m[1] != null ? parseSlot(m[1]) : null;
    if (m[1] != null && slot == null) return sendJson(res, 400, { ok: false, error: 'Slot không hợp lệ' });

    if (method === 'GET' && slot == null) {
      return sendJson(res, 200, { ok: true, saves: store.list(owner, parsedUrl.searchParams.get('full') === '1') });
    }
    if (method === 'GET') {
      const rec = store.get(owner, slot);
      return rec ? sendJson(res, 200, { ok: true, save: rec }) : sendJson(res, 404, { ok: false, error: 'Không có save' });
    }
    if (method === 'DELETE' && slot != null) {
      return store.remove(owner, slot).then((removed) => sendJson(res, 200, { ok: true, removed }));
    }
    if (method === 'PUT' && slot != null) {
      return readBody(req, (body) => {
        if (!body || typeof body.data !== 'string' || !body.data) {
          return sendJson(res, 400, { ok: false, error: 'Thiếu dữ liệu save' });
        }
        const record = {
          name: String(body.name || '').slice(0, 64),
          lvl: Number(body.lvl) | 0,
          fac: String(body.fac || '').slice(0, 32),
          data: body.data,
          updated: new Date().toISOString(),
        };
        store
          .put(owner, slot, record)
          .then(() => sendJson(res, 200, { ok: true, updated: record.updated }))
          .catch((e) => sendJson(res, 500, { ok: false, error: e.message }));
      }, MAX_BODY_BYTES);
    }
    return sendJson(res, 405, { ok: false, error: 'Method not allowed' });
  }).catch((e) => sendJson(res, 500, { ok: false, error: e.message }));

  return true;
}

module.exports = { createSaveStore, createTokenVerifier, handleSavesRequest, MAX_BODY_BYTES };
