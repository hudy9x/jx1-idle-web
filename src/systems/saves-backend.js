/**
 * Chuyển bảng `saves` từ Supabase sang backend của game (/api/saves).
 *
 * Game vẫn dùng Supabase cho đăng nhập (và chat/chợ/thư...), nhưng mọi thao tác trên
 * `client.from("saves")` được chuyển hướng tới backend. Backend xác thực bằng access token
 * Supabase của người dùng nên owner luôn lấy từ token, không tin giá trị client gửi lên.
 *
 * Hỗ trợ đúng các kiểu gọi mà game đang dùng:
 *   upsert(row) · select(cols).order("slot") · select(cols).eq("slot", n).single()/maybeSingle()
 *   select("data").eq("owner", id) · delete().eq("owner", id).eq("slot", n)
 */
(function () {
  const API = (window.SAVES_API_BASE || "") + "/api/saves";

  function err(message, status) {
    return { message, status };
  }

  async function call(client, method, slot, body, query) {
    let token = "";
    try {
      const { data } = await client.auth.getSession();
      token = (data && data.session && data.session.access_token) || "";
    } catch {}
    if (!token) {
      try {
        token = sessionStorage.getItem("volamidle_token") || "";
      } catch {}
    }
    const res = await fetch(API + (slot != null ? "/" + slot : "") + (query || ""), {
      method,
      headers: Object.assign(
        { Authorization: "Bearer " + token },
        body ? { "Content-Type": "application/json" } : {},
      ),
      body: body ? JSON.stringify(body) : undefined,
    });
    let json = null;
    try {
      json = await res.json();
    } catch {}
    return { status: res.status, json: json || {} };
  }

  function pick(row, cols) {
    if (!cols || cols === "*") return row;
    const out = {};
    for (const c of cols.split(",").map((s) => s.trim())) if (c) out[c] = row[c];
    return out;
  }

  function builder(client) {
    const q = { op: null, row: null, cols: "*", eq: {}, order: null, single: 0 };
    const b = {
      upsert(row) {
        q.op = "upsert";
        q.row = row;
        return b;
      },
      select(cols) {
        q.op = q.op || "select";
        q.cols = cols || "*";
        return b;
      },
      delete() {
        q.op = "delete";
        return b;
      },
      eq(col, val) {
        q.eq[col] = val;
        return b;
      },
      order(col) {
        q.order = col;
        return b;
      },
      single() {
        q.single = 1;
        return b;
      },
      maybeSingle() {
        q.single = 2;
        return b;
      },
      then(resolve, reject) {
        run().then(resolve, reject);
      },
    };

    async function run() {
      try {
        if (q.op === "upsert") {
          const r = q.row || {};
          // Ưu tiên lưu realtime qua WebSocket nếu online multiplayer đang mở
          const mp = window.__volamidleOnline;
          if (mp && typeof mp.saveCharacterRealtime === "function") {
            const res = await mp.saveCharacterRealtime(r.slot | 0, r.data, {
              name: r.name,
              lvl: r.lvl,
              fac: r.fac,
            });
            if (res && res.ok) return { data: null, error: null };
            // Nếu socket thất bại, tiếp tục fallback qua HTTP call
          }

          const { status, json } = await call(client, "PUT", r.slot | 0, {
            name: r.name,
            lvl: r.lvl,
            fac: r.fac,
            data: r.data,
          });
          return status === 200 ? { data: null, error: null } : { data: null, error: err(json.error || "Lỗi lưu save", status) };
        }
        if (q.op === "delete") {
          const { status, json } = await call(client, "DELETE", q.eq.slot | 0);
          return status === 200 ? { data: null, error: null } : { data: null, error: err(json.error || "Lỗi xóa save", status) };
        }
        // select
        if (q.eq.slot != null) {
          const { status, json } = await call(client, "GET", q.eq.slot | 0);
          if (status === 404) {
            return q.single === 2 ? { data: null, error: null } : { data: null, error: err("Không có save", 406) };
          }
          if (status !== 200) return { data: null, error: err(json.error || "Lỗi tải save", status) };
          const row = pick(json.save, q.cols);
          return { data: q.single ? row : [row], error: null };
        }
        const full = /\bdata\b|\*/.test(q.cols);
        const { status, json } = await call(client, "GET", null, null, full ? "?full=1" : "");
        if (status !== 200) return { data: null, error: err(json.error || "Lỗi tải danh sách save", status) };
        let rows = (json.saves || []).map((r) => pick(r, q.cols));
        if (q.order) rows = rows.sort((a, c) => (a[q.order] > c[q.order] ? 1 : a[q.order] < c[q.order] ? -1 : 0));
        return { data: rows, error: null };
      } catch (e) {
        return { data: null, error: { message: String((e && e.message) || e) } };
      }
    }
    return b;
  }

  window.SavesBackend = {
    wrap(client) {
      return new Proxy(client, {
        get(target, prop) {
          if (prop === "from") {
            return (table) => (table === "saves" ? builder(target) : target.from(table));
          }
          const v = Reflect.get(target, prop, target);
          return typeof v === "function" ? v.bind(target) : v;
        },
      });
    },
  };
})();
