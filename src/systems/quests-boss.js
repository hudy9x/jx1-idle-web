var Db = function () {
      if (u("#chatBox")) return;
      const A = document.createElement("div");
      ((A.id = "chatBox"),
        (A.innerHTML = `<div id="chatHead"><button type="button" class="cch on" data-cc="w">🌐 Thế giới</button><button type="button" class="cch" data-cc="p">👥 Tổ đội<b id="chatPN"></b></button><small id="chatOn"></small><button type="button" id="chatX" title="Thu gọn khung chat">−</button></div>
    <div id="chatLines"></div>
    <form id="chatIn" autocomplete="off"><span id="chatAtt"></span><input id="chatTxt" maxlength="${r8}" placeholder="Nhập tin nhắn…"><button class="btn sm">Gửi</button></form>
    <button id="chatBtn" title="Chat thế giới">💬<b id="chatN"></b></button>`),
        u("#battle").appendChild(A),
        (u("#chatLines").onclick = (n) => {
          const t = n.target.closest("[data-ci]");
          if (t) {
            Yr(+t.dataset.ci);
            return;
          }
          const e = n.target.closest("[data-pn]");
          e && x.open && typeof gn == "function" && gn(e.dataset.pn);
        }),
        (u("#chatBtn").onclick = () => we(!0)),
        (u("#chatX").onclick = () => we(!1)),
        A.querySelectorAll("[data-cc]").forEach(
          (n) => (n.onclick = () => Pb(n.dataset.cc)),
        ),
        (u("#chatIn").onsubmit = (n) => {
          (n.preventDefault(), Kr(u("#chatTxt").value));
        }));
    },
    Pb = function (A) {
      (typeof un < "u" && un && (A = "w"),
        (x.chan = A === "p" ? "p" : "w"),
        document
          .querySelectorAll("#chatHead [data-cc]")
          .forEach((n) => n.classList.toggle("on", n.dataset.cc === x.chan)),
        (x.lastH = null),
        x.chan === "p" && typeof e0 < "u" && ((e0.unread = 0), N2(!0)),
        x.chan === "w" && ((x.unread = 0), e3(!0)),
        yA());
    },
    we = function (A) {
      ((x.open = A),
        u("#chatBox").classList.toggle("open", A),
        A && x.chan === "p" && typeof e0 < "u" && ((e0.unread = 0), N2(!0)),
        A &&
          (x.chan === "w" && (x.unread = 0),
          e3(!0),
          setTimeout(() => {
            const n = u("#chatTxt");
            n && !matchMedia("(pointer:coarse)").matches && n.focus();
          }, 0)),
        yA());
    },
    t3 = function (A) {
      const isMe = !!(A.cid && (A.cid === pe() || (typeof k !== "undefined" && k.user && A.cid === k.user.id)));
      const content = A.msg || A.text || "";
      return A.sys
        ? `<div class="cl sys">${D(content)}</div>`
        : `<div class="cl${isMe ? " me" : ""}${A.pending ? " pend" : ""}"><i>${Fr(A.ts)}</i> <b data-pn="${D(A.name)}"${(() => {
            const t = uA.find((e) => e.n === A.fac);
            return typeof D2 == "function"
              ? ` style="color:${D2(A.name, t ? t.key : "")}${wi(A.name) ? ";font-weight:bold" : ""}"`
              : "";
          })()}>${D(A.name)}</b>${A.lvl ? `<small> ${D(A.fac || "")} ${A.lvl}</small>` : ""}: ${bb(A)}</div>`;
    },
    yA = function () {
      x.rq ||
        (x.rq = requestAnimationFrame(() => {
          ((x.rq = 0), vb());
        }));
    },
    vb = function () {
      const A = u("#chatBox");
      if (!A) return;
      const n = x.chan === "p" && typeof e0 < "u";
      {
        const h = u("#chatTxt"),
          g = Rf()
            ? n
              ? L.pid
                ? "Nhắn cho tổ đội…"
                : "Chưa có tổ đội · bấm 👥 để mời"
              : "Nhập tin nhắn…"
            : "🔒 Đăng nhập tài khoản để chat";
        h && h.placeholder !== g && (h.placeholder = g);
      }
      const t = n
          ? e0.msgs.map(uh)
          : x.msgs.filter((h) => !Kf(h.msg) && !a3(h)),
        e = x.open ? t : t.slice(-4),
        a =
          x.state === "off"
            ? '<div class="cl sys">Chat chưa bật (điền js/chatcfg.js)</div>'
            : x.state === "load"
              ? '<div class="cl sys">Đang kết nối…</div>'
              : x.state === "err"
                ? `<div class="cl sys">Không kết nối được chat${x.err ? ": " + D(x.err) : ""}</div>`
                : "",
        i = u("#chatLines"),
        o = i.scrollTop + i.clientHeight >= i.scrollHeight - 30,
        l = n
          ? L.pid
            ? e0.off
              ? '<div class="cl sys">Máy chủ chưa bật chat Tổ đội (chạy lại TO_DOI.sql).</div>'
              : e0.msgs.length
                ? ""
                : `<div class="cl sys">Kênh tổ đội (${L.mem.length}/${ve}): ${L.mem.map((h) => D(h.name)).join(", ")}</div>`
            : '<div class="cl sys">Bạn chưa có tổ đội. Bấm 👥 để mời người chơi, hoặc bấm tên trên kênh Thế giới → 👥 Mời tổ đội.</div>'
          : "",
        d = n
          ? l + e.map(t3).join("")
          : (x.open || !x.msgs.length ? a : "") + e.map(t3).join("");
      (d !== x.lastH &&
        ((x.lastH = d),
        (i.innerHTML = d),
        (o || !x.open) && (i.scrollTop = i.scrollHeight)),
        (u("#chatOn").textContent =
          x.state === "ok" && !x.subOk
            ? " · đang nối…"
            : x.online > 0
              ? ` · ${x.online} online`
              : ""));
      {
        const h = document.getElementById("u20onl");
        h &&
          ((h.textContent = x.online > 0 ? `${x.online} online` : ""),
          (h.title = x.online > 0 ? `${x.online} người đang online` : ""));
      }
      {
        const h = typeof e0 < "u" ? e0.unread : 0,
          g = x.unread + h;
        u("#chatN").textContent = g ? (g > 9 ? "9+" : g) : "";
        const f = u("#chatPN");
        f && (f.textContent = h ? (h > 9 ? "9+" : h) : "");
      }
      A.classList.toggle(
        "quiet",
        !x.open && !x.msgs.length && x.state === "off",
      );
      {
        const h = typeof e0 < "u" ? e0.unread : 0,
          g = (f, m) => {
            const w = document.querySelector(`#u20ct [data-lt="${f}"] .ctn`);
            w && (w.textContent = m ? (m > 9 ? "9+" : m) : "");
          };
        (g("chat", x.unread), g("party", h));
        typeof j2 === "function" && j2();
      }
    },
    Gr = function (A) {
      if (!A) return;
      if (A.id && x.msgs.some((n) => n.id === A.id)) return;
      if (typeof a3 === "function" && a3(A)) return;
      const isMe = !!(A.cid && (A.cid === pe() || (typeof k !== "undefined" && k.user && A.cid === k.user.id)));
      if (isMe) {
        const n = x.msgs.findIndex((t) => t.pending && (t.msg === A.msg || t.msg === A.text));
        if (n >= 0) {
          ((x.msgs[n] = A), yA());
          return;
        }
      }
      (x.msgs.push(A),
        x.msgs.length > xb && x.msgs.shift(),
        !x.open && !A.sys && !isMe && x.unread++,
        yA());
    },
    Kr = async function (A) {
      if (
        ((A = String(A || "")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, r8)),
        !A && x.att && (A = `[${x.att.n}]`),
        !A)
      )
        return;
      if (Kf(A)) return y("Không gửi được tin dạng câu lệnh / mã lệnh");

      if (x.chan === "p" && typeof ch == "function") {
        (x.att &&
          (A = A.includes(`[${x.att.n}]`)
            ? A
            : (A + ` [${x.att.n}]`).slice(0, r8)),
          (u("#chatTxt").value = ""),
          i8(null),
          (await ch(A)) || (u("#chatTxt").value = A));
        return;
      }
      if (Qf > 0 && Date.now() - x.last < Qf)
        return y(
          `Chờ ${Math.ceil((Qf - (Date.now() - x.last)) / 1e3)} giây nữa mới gửi được`,
        );
      ((x.last = Date.now()), (u("#chatTxt").value = ""));
      const n = {
          cid: (k && k.user && k.user.id) || pe(),
          name: Gf(),
          fac: I[r.fac] ? I[r.fac].n : "",
          lvl: r.lvl | 0,
          msg: A,
          text: A,
          ts: Date.now(),
        },
        t = x.att;
      if (t) {
        n.item = t;
        const o = `[${t.n}]`;
        A.includes(o) ||
          (n.msg = (A === o ? "" : A.slice(0, r8 - o.length - 1) + " ") + o);
        n.text = n.msg;
      }
      const e = Object.assign(
        { id: "tmp" + Date.now(), pending: !0 },
        n,
      );
      (x.msgs.push(e), i8(null), yA());

      // 1. Thử gửi qua WebSocket multiplayer nếu kết nối đang mở
      const mp = window.__volamidleOnline;
      if (mp && mp.state && mp.state.ws && mp.state.ws.readyState === WebSocket.OPEN) {
        try {
          mp.state.ws.send(JSON.stringify({
            type: 'chat',
            text: n.msg,
            msg: n.msg,
            name: n.name,
            fac: n.fac,
            lvl: n.lvl,
            cid: n.cid,
            item: n.item || null,
          }));
          setTimeout(() => {
            e.pending = !1;
            yA();
          }, 200);
          return;
        } catch (err) {}
      }

      // 2. Gửi qua HTTP endpoint /api/chat của server nội bộ
      try {
        let token = "";
        try {
          token = sessionStorage.getItem("volamidle_token") || localStorage.getItem("volamidle_token") || "";
        } catch {}
        const apiBase = window.SERVER_API_BASE || window.SAVES_API_BASE || "";
        const res = await fetch(apiBase + "/api/chat", {
          method: "POST",
          headers: Object.assign(
            { "Content-Type": "application/json" },
            token ? { Authorization: "Bearer " + token } : {}
          ),
          body: JSON.stringify(n),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json.ok) {
          ((x.msgs = x.msgs.filter((o) => o !== e)),
            yA(),
            t && i8(t),
            y("Gửi lỗi: " + ((json && json.error) || ("HTTP " + res.status))),
            (u("#chatTxt").value = A));
          return;
        }
        if (json.message) {
          const o = x.msgs.indexOf(e);
          (o >= 0
            ? (x.msgs[o] = json.message)
            : Gr(json.message),
            yA());
        }
      } catch (err) {
        ((x.msgs = x.msgs.filter((o) => o !== e)),
          yA(),
          t && i8(t),
          y("Lỗi kết nối máy chủ chat"),
          (u("#chatTxt").value = A));
      }
    },
    Lf = function () {
      return Promise.resolve();
    },
    qf = async function s() {
      if (typeof g0 == "function" && !g0()) {
        document.body.classList.add("nochat");
        return;
      }
      Db();
      ((x.state = "load"), yA());
      try {
        // Tải lịch sử chat từ server nội bộ
        const apiBase = window.SERVER_API_BASE || window.SAVES_API_BASE || "";
        const res = await fetch(apiBase + "/api/chat?limit=50").catch(() => null);
        if (res && res.ok) {
          const json = await res.json().catch(() => null);
          if (json && json.ok && Array.isArray(json.messages)) {
            x.msgs = json.messages
              .map((m) => ({
                id: m.id,
                cid: m.cid || m.userId || "",
                name: m.name || "Vô danh",
                fac: m.fac || "",
                lvl: m.lvl || m.level || 0,
                msg: m.msg || m.text || "",
                text: m.text || m.msg || "",
                item: m.item || null,
                ts: m.ts || Date.now(),
                sys: !!m.sys || m.name === "Hệ thống",
              }))
              .filter((e) => !a3(e));
            if (json.online) x.online = json.online;
          }
        }
        ((x.state = "ok"),
          (x.subOk = !0),
          (x.err = ""),
          yA(),
          setTimeout(() => e3(!0), 3e3),
          x.polling ||
            ((x.polling = !0),
            setInterval(e3, 5e3),
            document.addEventListener("visibilitychange", () => {
              !document.hidden && Date.now() - (x.polled || 0) > 3e4 && e3(!0);
            })));
      } catch (n) {
        ((x.state = "ok"), (x.subOk = !0), yA());
      }
    },
    jf = function s(A, n = 0) {
      if (!(n > 4 || A == null)) {
        if (typeof A == "number") return Number.isFinite(A) ? A : void 0;
        if (typeof A == "boolean") return A;
        if (typeof A == "string") return A.slice(0, 60);
        if (Array.isArray(A))
          return A.slice(0, 24)
            .map((t) => s(t, n + 1))
            .filter((t) => t !== void 0);
        if (typeof A == "object") {
          const t = {};
          let e = 0;
          for (const a in A) {
            if (Mb.has(a) || ++e > 30 || !/^\w{1,12}$/.test(a)) continue;
            const i = s(A[a], n + 1);
            i !== void 0 && (t[a] = i);
          }
          return t;
        }
      }
    },
    Rr = function (A) {
      if (
        !A ||
        typeof A != "object" ||
        !S.items[A.d] ||
        typeof A.n != "string" ||
        !A.n ||
        ((A = jf(A)),
        (A.r = C(Math.round(+A.r || 0), 0, b0.length - 1)),
        (A.lvl = C(Math.round(+A.lvl || 1), 1, 99)),
        (typeof A.ic != "string" ||
          !/^img\/[\w\/.-]+\.(png|webp|jpg)$/.test(A.ic) ||
          A.ic.includes("..")) &&
          delete A.ic,
        Array.isArray(A.mag) || (A.mag = []),
        typeof ds == "function"
          ? ds(A)
          : (typeof SA == "function" && SA(A)) ||
            (typeof jA == "function" && jA(A)))
      )
        return null;
      if (typeof en == "function")
        try {
          en(A);
        } catch {
          return null;
        }
      return A;
    },
    i8 = function s(A) {
      const n = A && A.uid;
      ((x.att = A ? Rr(jf(A)) : null), x.att && n != null && (x.att.uid = n));
      const t = u("#chatAtt");
      if (!t) return;
      t.innerHTML = x.att
        ? `<b style="color:${b0[x.att.r]}">[${D(x.att.n)}]</b><button type="button" title="Bỏ đính kèm">✕</button>`
        : "";
      const e = t.querySelector("button");
      e && (e.onclick = () => s(null));
    },
    bb = function (A) {
      const n =
        A.item && typeof A.item == "object"
          ? (o8.has(A.item) ||
              o8.set(A.item, Rr(JSON.parse(JSON.stringify(A.item)))),
            o8.get(A.item))
          : null;
      let t = D(A.msg || A.text || "");
      if (n) {
        const e = D(`[${n.n}]`),
          a = `<a class="chit" data-ci="${+A.id || 0}" style="color:${b0[n.r]}">${e}</a>`;
        t = t.includes(e) ? t.replace(e, a) : t + " " + a;
      }
      return t;
    },
    Yr = function (A) {
      const n = x.msgs.find((a) => +a.id === A),
        t = n && Rr(n.item);
      if (!t) return;
      let e = "";
      try {
        e = en(t);
      } catch {
        e = `<h4 style="color:${b0[t.r]}">${D(t.n)}</h4><p class="dim">Không đọc được chi tiết món đồ.</p>`;
      }
      J(
        `<h3>Đồ của ${D(n.name)} <small>${D(n.fac || "")} ${n.lvl || ""}</small></h3>${e}`,
      );
    },
    yb = function (A) {
      if (document.body.classList.contains("nochat"))
        return y("Bản chơi trên máy không có chat");
      if (!u("#chatBox")) return y("Chat chưa bật");
      (t0(!0), i8(A));
      const n = document.getElementById("u20txt");
      (n &&
      (document.body.classList.contains("u2m") ||
        document.body.classList.contains("u20"))
        ? (r && ((r.u20logOff = !1), typeof q2 == "function" && q2()),
          (n.placeholder = `📎 [${x.att ? x.att.n : ""}] · gõ lời nhắn rồi Gửi`),
          n.focus())
        : we(!0),
        y("Đã đính kèm vào chat · gõ thêm lời nhắn rồi bấm Gửi"));
    },
    zf = async function s() {
      if (!Xr) {
        x.subOk = !0;
        return;
      }
      if (!x.sb || x.subBusy) return;
      x.subBusy = !0;
      const A = x.ch;
      if (((x.ch = null), clearTimeout(x.reT), A))
        try {
          await x.sb.removeChannel(A);
        } catch {}
      x.subBusy = !1;
      const n = (x.ch = x.sb.channel("the-gioi", {
          config: { presence: { key: pe() } },
        })),
        t = () => {
          x.ch === n &&
            ((x.online = Object.keys(n.presenceState()).length), yA());
        };
      n.on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat" },
        (e) => Gr(e.new),
      )
        .on("presence", { event: "sync" }, t)
        .on("presence", { event: "join" }, t)
        .on("presence", { event: "leave" }, t)
        .subscribe(async (e) => {
          if (x.ch === n)
            if (e === "SUBSCRIBED") {
              ((x.subOk = !0),
                (x.reN = 0),
                (x.state = "ok"),
                (x.err = ""),
                yA());
              try {
                await n.track({ name: Gf(), lvl: r.lvl | 0 });
              } catch {}
              t();
            } else
              (e === "CHANNEL_ERROR" || e === "TIMED_OUT" || e === "CLOSED") &&
                ((x.subOk = !1),
                clearTimeout(x.reT),
                (x.reN = (x.reN || 0) + 1),
                (x.reT = setTimeout(
                  s,
                  Math.min(12e4, 3e3 * 2 ** Math.min(6, x.reN - 1)) +
                    Math.random() * 3e3,
                )));
        });
    },
    kb = function () {
      const A = Date.now(),
        n = typeof oA < "u" ? oA : "chat";
      return !(
        x.open ||
        (document.getElementById("u20log") &&
          !document.body.classList.contains("u20logoff") &&
          (n === "chat" || n === "all"))
      ) || A - (x.act || 0) > 12e4
        ? 9e4
        : /^(u20txt|chatTxt)$/.test((document.activeElement || {}).id || "") ||
            A - (x.last || 0) < 6e4
          ? 5e3
          : 15e3;
    },
    e3 = async function (A) {
      if (document.hidden) return;
      // Cập nhật số người online từ multiplayer nếu có
      if (window.__volamidleOnline && window.__volamidleOnline.state) {
        const plCount = (window.__volamidleOnline.state.players || []).length + 1;
        if (plCount > 0) {
          x.online = plCount;
          yA();
        }
      }
      const t = kb();
      if (!(A !== !0 && Date.now() - (x.polled || 0) < t)) {
        x.polled = Date.now();
        try {
          const apiBase = window.SERVER_API_BASE || window.SAVES_API_BASE || "";
          const lastId = x.msgs.length ? x.msgs[x.msgs.length - 1].id : "";
          const url = apiBase + "/api/chat?limit=50" + (lastId ? "&after=" + encodeURIComponent(lastId) : "");
          const res = await fetch(url).catch(() => null);
          if (res && res.ok) {
            const json = await res.json().catch(() => null);
            if (json && json.ok) {
              if (Array.isArray(json.messages)) {
                json.messages.forEach((m) =>
                  Gr({
                    id: m.id,
                    cid: m.cid || m.userId || "",
                    name: m.name || "Vô danh",
                    fac: m.fac || "",
                    lvl: m.lvl || m.level || 0,
                    msg: m.msg || m.text || "",
                    text: m.text || m.msg || "",
                    item: m.item || null,
                    ts: m.ts || Date.now(),
                    sys: !!m.sys || m.name === "Hệ thống",
                  }),
                );
              }
              if (json.online) {
                x.online = json.online;
                yA();
              }
            }
          }
        } catch {}
      }
    },
    x = {
      sb: null,
      ch: null,
      msgs: [],
      open: !1,
      unread: 0,
      online: 0,
      state: "off",
      last: 0,
      err: "",
      chan: "w",
    },
    r8 = 150,
    xb = 80,
    Qf = 0,
    pe = () => {
      try {
        let s = sessionStorage.getItem("volamidle_userId") || localStorage.getItem("jxidle_cid");
        return (
          s ||
            ((s =
              Math.random().toString(36).slice(2, 12) +
              Date.now().toString(36)),
            sessionStorage.setItem("volamidle_userId", s),
            localStorage.setItem("jxidle_cid", s)),
          s
        );
      } catch {
        return "anon" + Math.random().toString(36).slice(2, 10);
      }
    },
    Gf = () =>
      String((r && (r.name || (I[r.fac] && I[r.fac].n))) || "Vô danh").slice(
        0,
        20,
      ),
    Fr = (s) => {
      const A = new Date(s);
      return `${String(A.getHours()).padStart(2, "0")}:${String(A.getMinutes()).padStart(2, "0")}`;
    },
    Bb =
      /^\s*[\/／]|(?<![A-Za-z0-9])[SR]\s*\.\s*[a-z_]{2,}\s*(\[|=|\.|\()|\w\s*=>\s*[\{\w(]|\bconsole\b|localStorage|sessionStorage|\.forEach\s*\(|\bfunction\s*\(|\bdocument\s*\.|\bwindow\s*\.|\beval\s*\(|Object\s*\.\s*(keys|assign|values)/i,
    Kf = (s) => Bb.test(String(s || "")),
    _b = /[\[\]【】()]|^\s*(bot|gm|admin|hệ thống|he thong)(\s|$)/i,
    Vr = () => Vr.s || (Vr.s = new Set(Object.values(I).map((s) => s.n))),
    a3 = (s) => false,
    Rf = () =>
      typeof k < "u" && !!(k.user && k.user.id && !k.user.is_anonymous),
    Mb = new Set(["uid", "lock", "price", "dtk"]),
    o8 = new WeakMap();
  if (typeof Ut == "function") {
    const s = Ut;
    Ut = (A, n) => {
      if (
        (s(A, n), document.body.classList.contains("nochat") || !u("#chatBox"))
      )
        return;
      const t = document.querySelector("#mBody .btnrow");
      if (!t || !A) return;
      const e = document.createElement("button");
      ((e.className = "btn"),
        (e.textContent = "💬 Khoe lên chat"),
        (e.onclick = () => yb(A)),
        t.appendChild(e));
    };
  }
  window.__nativeChat = {
    pushMsg: (msg) => {
      try {
        if (!msg) return;
        const formatted = {
          id: msg.id || 'ws_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
          cid: msg.cid || msg.userId || 'remote',
          name: msg.name || 'Vô danh',
          fac: msg.fac || '',
          lvl: msg.lvl || msg.level || 0,
          msg: msg.msg || msg.text || '',
          text: msg.text || msg.msg || '',
          item: msg.item || null,
          ts: msg.ts || Date.now(),
          sys: msg.sys !== undefined ? !!msg.sys : msg.name === 'Hệ thống',
        };
        Gr(formatted);
      } catch (err) {}
    },
    loadHistory: (messages) => {
      try {
        if (!Array.isArray(messages)) return;
        messages.forEach((m) => window.__nativeChat.pushMsg(m));
      } catch (err) {}
    },
    setOnlineCount: (count) => {
      try {
        if (typeof count === 'number' && count >= 0) {
          x.online = count;
          yA();
        }
      } catch (err) {}
    },
    sendMsg: async (text) => {
      try {
        if (typeof Kr === 'function') {
          return await Kr(text);
        }
      } catch (err) {}
    },
  };
  var Xr = !1;
  ["pointerdown", "keydown", "wheel", "touchstart"].forEach((s) =>
    window.addEventListener(
      s,
      () => {
        x.act = Date.now();
      },
      { passive: !0, capture: !0 },
    ),
  );
  var hx = async function (A) {
      const n = location.origin + "/sb";
      if (!(
        /^https:/.test(location.protocol) &&
        !/^(localhost|127\.)/.test(location.hostname)
      ))
        return A.url;
      let e = "";
      try {
        e = localStorage.getItem(nh) || "";
      } catch {}
      const a = (l, d) =>
          Promise.race([
            fetch(l + "/auth/v1/health", {
              headers: { apikey: A.key },
              cache: "no-store",
            }).then(
              (h) => h.ok && /json/.test(h.headers.get("content-type") || ""),
            ),
            new Promise((h) => setTimeout(() => h(!1), d)),
          ]).catch(() => !1),
        i = (l) => {
          try {
            localStorage.setItem(nh, l);
          } catch {}
        },
        o =
          e === "p"
            ? [
                [n, 6e3, "p"],
                [A.url, 4e3, "d"],
              ]
            : [
                [A.url, 4e3, "d"],
                [n, 6e3, "p"],
              ];
      for (const [l, d, h] of o) if (await a(l, d)) return (i(h), l);
      return A.url;
    },
    loadServerSession = function () {
      try {
        const raw = sessionStorage.getItem("volamidle_server_session");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && parsed.access_token && parsed.user) return parsed;
        }
      } catch (e) {}
      try {
        const token = sessionStorage.getItem("volamidle_token");
        const userId = sessionStorage.getItem("volamidle_userId");
        const uname = sessionStorage.getItem("volamidle_name");
        if (token && userId && uname) {
          return {
            access_token: token,
            token_type: "bearer",
            user: {
              id: userId,
              email: uname + Zr,
              username: uname,
              user_metadata: { username: uname },
            },
          };
        }
      } catch (e) {}
      return null;
    },
    saveServerSession = function (session) {
      try {
        if (session) {
          const s = JSON.stringify(session);
          sessionStorage.setItem("volamidle_server_session", s);
          sessionStorage.setItem("volamidle_token", session.access_token);
          sessionStorage.setItem("volamidle_userId", session.user.id);
          sessionStorage.setItem("volamidle_name", session.user.username);
          if (window.VolamMultiplayer && window.VolamMultiplayer.state) {
            window.VolamMultiplayer.state.token = session.access_token;
            window.VolamMultiplayer.state.userId = session.user.id;
            window.VolamMultiplayer.state.username = session.user.username;
          }
        } else {
          sessionStorage.removeItem("volamidle_server_session");
          sessionStorage.removeItem("volamidle_token");
          sessionStorage.removeItem("volamidle_userId");
          sessionStorage.removeItem("volamidle_name");
          if (window.VolamMultiplayer && window.VolamMultiplayer.state) {
            window.VolamMultiplayer.state.token = "";
            window.VolamMultiplayer.state.userId = "";
          }
        }
      } catch (e) {}
    },
    authListeners = new Set(),
    notifyAuthChange = function (event, session) {
      for (const cb of authListeners) {
        try { cb(event, session); } catch (e) {}
      }
    },
    serverLogin = async function (username, password) {
      const apiBase = window.SERVER_API_BASE || window.SAVES_API_BASE || "";
      const res = await fetch(apiBase + "/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      let data = null;
      try {
        data = await res.json();
      } catch (e) {}
      if (!res.ok || !data || !data.ok) {
        const msg = (data && data.error) || (res.status === 401 ? "Sai mật khẩu" : "Lỗi đăng nhập (" + res.status + ")");
        return { data: { session: null, user: null }, error: new Error(msg) };
      }
      const user = {
        id: data.userId,
        email: data.username + Zr,
        username: data.username,
        user_metadata: { username: data.username },
        profile: data.profile || null,
      };
      const session = {
        access_token: data.token,
        token_type: "bearer",
        user,
      };
      saveServerSession(session);
      k.user = user;
      notifyAuthChange("SIGNED_IN", session);
      return { data: { session, user }, error: null };
    },
    serverAuth = {
      async getSession() {
        const s = loadServerSession();
        return { data: { session: s }, error: null };
      },
      async getUser() {
        const s = loadServerSession();
        return { data: { user: s ? s.user : null }, error: null };
      },
      async signInWithPassword({ email, password, username }) {
        const uname = username || (email ? email.replace(Zr, "") : "");
        return await serverLogin(uname, password);
      },
      async signUp({ email, password, username }) {
        const uname = username || (email ? email.replace(Zr, "") : "");
        return await serverLogin(uname, password);
      },
      async signOut() {
        saveServerSession(null);
        k.user = null;
        notifyAuthChange("SIGNED_OUT", null);
        return { error: null };
      },
      async refreshSession() {
        const s = loadServerSession();
        return { data: { session: s }, error: null };
      },
      onAuthStateChange(cb) {
        authListeners.add(cb);
        return {
          data: {
            subscription: {
              unsubscribe: () => authListeners.delete(cb),
            },
          },
        };
      },
    },
    s3 = function () {
      return k.sb
        ? Promise.resolve(k.sb)
        : (k.sbP ||
            (k.sbP = (async () => {
              const t0 = {
                from: () => ({
                  select: () => ({
                    order: () => ({ limit: () => Promise.resolve({ data: [] }) }),
                    eq: () => ({ single: () => Promise.resolve({ data: null, error: null }), maybeSingle: () => Promise.resolve({ data: null, error: null }) }),
                  }),
                  insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
                  upsert: () => Promise.resolve({ data: null, error: null }),
                  delete: () => ({ eq: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }) }),
                }),
                channel: () => ({ on: function () { return this; }, subscribe: () => ({}) }),
                removeChannel: () => Promise.resolve(),
                rpc: () => Promise.resolve({ data: null }),
              };
              // Bảng `saves` được chuyển sang backend (src/systems/saves-backend.js)
              const t = window.SavesBackend ? window.SavesBackend.wrap(t0) : t0;
              t.auth = serverAuth;
              const cur = loadServerSession();
              k.user = cur ? cur.user : null;
              t.auth.onAuthStateChange((e, a) => {
                if (a && a.user) k.user = a.user;
                else if (e === "SIGNED_OUT") {
                  const i = !!k.user;
                  ((k.user = null),
                    i &&
                      !k.loggingOut &&
                      r &&
                      r.fac &&
                      setTimeout(() => Wf(), 0));
                }
                r3();
              });
              k.sb = t;
              return t;
            })().catch((A) => {
              throw ((k.sbP = null), A);
            })));
    },
    Hb = function (A) {
      Jb(A) &&
        ((k.failN = Math.min(6, (k.failN || 0) + 1)),
        (k.holdUntil =
          Date.now() +
          Math.min(6e5, 3e4 * 2 ** (k.failN - 1)) *
            (0.8 + Math.random() * 0.4)));
    },
    Yf = async function (A, n, t) {
      n = String(n || "").trim();
      t = String(t || "").trim();
      if (!n) throw new Error("Vui lòng nhập tên tài khoản");
      if (!t) throw new Error("Vui lòng nhập mật khẩu");

      const e = await Promise.race([
        serverLogin(n, t),
        new Promise((a, i) =>
          setTimeout(
            () =>
              i(
                new Error("Máy chủ không phản hồi — kiểm tra mạng rồi bấm lại"),
              ),
            15000,
          ),
        ),
      ]);
      if (e.error) throw e.error;
      if (!e.data || !e.data.session)
        throw new Error("Không thể đăng nhập máy chủ");
      ((k.user = e.data.session.user), Pe());
    },
    $b = function () {
      const A = {};
      for (const [n, t] of Object.entries(r.eq || {})) t && (A[n] = t);
      return A;
    },
    hn = async function (A) {
      if (!k.user) throw new Error("Chưa đăng nhập");
      if (!r || !r.fac) throw new Error("Chưa có nhân vật");
      if (!HA()) throw (A || E2(), new Error("Cần đặt tên nhân vật trước"));
      if (S2(r)) throw new Error("Nhân vật thuộc tài khoản khác");
      const n = Q().stat || {},
        t = {
          owner: k.user.id,
          slot: nA,
          name: r.name,
          fac: r.fac,
          sex: r.sex | 0,
          lvl: r.lvl | 0,
          reborn: Math.min(10, n.reborn | 0),
          power: Math.round(c.power || 0),
          tower: n.towerBest | 0,
          bosses: n.bosses | 0,
          gear: $b(),
          updated: new Date().toISOString(),
        };
      if (
        (k.snapOk !== !1 || Date.now() - (k.snapNo || 0) > 3e5) &&
        typeof sh == "function"
      ) {
        const a = sh();
        a && (t.snap = a);
      }
      const e = JSON.stringify(Object.assign({}, t, { updated: 0 }));
      if (A && e === k.charSig && Date.now() - (k.charSent || 0) < 30 * 6e4) {
        k.lastChar = Date.now();
        return;
      }
      try {
        await v0((a) => a.from("chars").upsert(t));
      } catch (a) {
        if (!t.snap || !/snap/i.test(String(a && a.message))) throw a;
        ((k.snapOk = !1),
          (k.snapNo = Date.now()),
          delete t.snap,
          await v0((i) => i.from("chars").upsert(t)));
      }
      ((k.lastChar = k.charSent = Date.now()),
        (k.charSig = e),
        Tb().catch(() => {}));
    },
    De = function () {
      if (typeof k > "u" || !k.user) return 1;
      if (k.cheatU !== k.user.id) {
        k.cheatU = k.user.id;
        try {
          k.cheat = localStorage.getItem(to) === k.user.id;
        } catch {
          k.cheat = !1;
        }
      }
      return k.ban ? 0 : k.cheat ? 0.01 : 1;
    },
    Tb = async function () {
      if (k.user && k.banU !== k.user.id) {
        try {
          const e = await v0((a) => a.rpc("jx_am_banned"));
          ((k.banU = k.user.id), (k.ban = !!(e && e.data)));
        } catch {}
        k.ban && Cb();
      }
      if (!k.user || !(c.power > 20)) return;
      De();
      const A = await v0((e) =>
          e
            .from("chars")
            .select("power")
            .eq("owner", k.user.id)
            .eq("slot", nA)
            .maybeSingle(),
        ),
        n = A && A.data;
      if (!n || n.power == null) return;
      const t = (n.power | 0) === 1;
      if (t !== !!k.cheat) {
        ((k.cheat = t), (k.cheatU = k.user.id));
        try {
          t ? localStorage.setItem(to, k.user.id) : localStorage.removeItem(to);
        } catch {}
        t &&
          typeof M == "function" &&
          M(
            '<span class="bad">⚠ Tài khoản bị ghi nhận dùng console: sát thương giảm 99%.</span>',
          );
      }
    },
    Cb = function () {
      if (typeof r > "u" || !r || !k.user) return;
      const A = "jxBanWiped_" + k.user.id + "_" + nA;
      let n = !1;
      try {
        n =
          localStorage.getItem(A) === "1" &&
          r.lvl <= 1 &&
          !(r.gold > 0) &&
          !(r.inv && r.inv.length);
      } catch {}
      if (!n) {
        const t = r.name,
          e = r.sex | 0,
          a = r.netOwner,
          i = (I[r.fac] && I[r.fac].series) | 0;
        ((r = Ss()),
          typeof x5 == "function"
            ? x5(t, e, i)
            : ((r.name = t), (r.sex = e), (r.fac = "vo" + i)),
          a && (r.netOwner = a));
        try {
          (localStorage.removeItem(n1), localStorage.setItem(A, "1"));
        } catch {}
        ((c.enemies = []),
          (c.dirty = !0),

          
          typeof u0 == "function" && u0(),
          typeof B == "function" && B(),
          typeof F == "function" && F());
      }
      ((c.power = 0),
        typeof M == "function" &&
          M(
            '<span class="bad">⛔ Tài khoản bị khóa vì dùng console: đồ, tiền, cấp đã bị xóa · lực tay 0 · không thể treo chợ / gửi thư.</span>',
          ));
    },
    i3 = function (A) {
      try {
        const n = JSON.parse(A);
        if (n && n.v === 2 && typeof n.d == "string") return { d: n.d, k: n.k };
      } catch {}
      return { d: A, k: null };
    },
    rA = async function () {
      if (!k.user) throw new Error("Chưa đăng nhập");
      if (!r || !r.fac) throw new Error("Chưa có nhân vật");
      if (S2(r)) throw new Error("Nhân vật thuộc tài khoản khác");
      const A = new Date(),
        n = r.cloudAt;
      ((r.cloudAt = A.getTime()), (r.netOwner = k.user.id));
      try {
        await v0((t) =>
          t
            .from("saves")
            .upsert({
              owner: k.user.id,
              slot: nA,
              name: r.name || "",
              lvl: r.lvl | 0,
              fac: r.fac,
              data: th(J1(r), eh()),
              updated: A.toISOString(),
            }),
        );
      } catch (t) {
        throw ((r.cloudAt = n), t);
      }
      ((k.upSig = no()), B(), (k.lastUp = Date.now()));
    },
    Ob = async function (A, n) {
      const t = new Date();
      n.cloudAt = t.getTime();
      try {
        localStorage.setItem(UA(A), J1(n));
      } catch {}
      await v0((e) =>
        e
          .from("saves")
          .upsert({
            owner: k.user.id,
            slot: A,
            name: n.name || "",
            lvl: n.lvl | 0,
            fac: n.fac,
            data: th(J1(n), eh()),
            updated: t.toISOString(),
          }),
      );
    },
    Ur = function (A) {
      if (!A) return !1;
      try {
        const n = QA(A);
        if (!n.ok) return !1;
        const t = q1().st,
          e = +n.state.at || 0,
          a = +t.at || 0;
        if (e || a ? e <= a : (n.state.rev | 0) <= (t.rev | 0)) return !1;
        const i = localStorage.getItem(n1);
        return (
          i && localStorage.setItem(n1 + "_bak", i),
          localStorage.setItem(n1, A),
          !0
        );
      } catch {
        return !1;
      }
    },
    Eb = function () {
      try {
        const A = localStorage.getItem("jxidle_lastuser");
        if (A && A !== k.user.id) {
          const n = localStorage.getItem(n1);
          (n && localStorage.setItem(n1 + "_" + A, n),
            localStorage.removeItem(n1));
        }
        localStorage.setItem("jxidle_lastuser", k.user.id);
      } catch {}
    },
    Ff = async function () {
      if (!k.user) return !1;
      Eb();
      const A = await v0((a) =>
          a.from("saves").select("slot,updated").order("slot"),
        ),
        n = A.data || [];
      let t = !1;
      for (let a = 0; a < W1; a++) {
        const i = n.find((f) => f.slot === a),
          o = i ? Date.parse(i.updated) : 0;
        if (a === nA && r && r.fac) continue;
        const l = Wb(a);
        if (!i) {
          if (l && l.netOwner === k.user.id) await Ob(a, l);
          else if (l)
            try {
              const f = UA(a);
              (localStorage.setItem(f + "_bak", localStorage.getItem(f)),
                localStorage.removeItem(f),
                (t = !0));
            } catch {}
          continue;
        }
        if (!ao(l, o) && !S2(l)) continue;
        const d = await v0((f) =>
            f.from("saves").select("data").eq("slot", a).single(),
          ),
          h = i3(d.data.data),
          g = eo(h.d);
        if (
          ((g.cloudAt = o),
          (g.netOwner = k.user.id),
          !(l && !S2(l) && l8(g) < l8(l)))
        )
          try {
            const f = UA(a),
              m = localStorage.getItem(f);
            (m && localStorage.setItem(f + "_bak", m),
              localStorage.setItem(f, J1(g)),
              (t = !0));
          } catch {}
      }
      const e = n
        .slice()
        .sort((a, i) => Date.parse(i.updated) - Date.parse(a.updated))[0];
      if (e) {
        const a = await v0((i) =>
          i.from("saves").select("data").eq("slot", e.slot).single(),
        );
        Ur(i3(a.data.data).k) && (t = !0);
      }
      return t;
    },
    Vf = async function () {
      if (!k.user || !r || !r.fac) return;
      const A = await v0((e) =>
          e
            .from("saves")
            .select("slot,name,lvl,fac,updated")
            .eq("slot", nA)
            .maybeSingle(),
        ),
        n = A.data;
      if (!n) {
        if (r.netOwner === k.user.id) {
          await rA();
          return;
        }
        Tn = !0;
        try {
          const e = UA(nA);
          (localStorage.setItem(e + "_bak", localStorage.getItem(e)),
            localStorage.removeItem(e),
            localStorage.setItem(Z1, "menu"));
        } catch {}
        (y(
          "Nhân vật chỉ có trên máy này, không có trên đám mây: không dùng được",
        ),
          setTimeout(() => location.reload(), 1500));
        return;
      }
      const t = Date.parse(n.updated);
      if (r.netOwner && !S2(r) && ao(r, t)) {
        let e = !1;
        try {
          const a = await v0((i) =>
            i.from("saves").select("data").eq("slot", nA).single(),
          );
          e = l8(eo(i3(a.data.data).d)) < l8(r);
        } catch {}
        if (e) {
          r.cloudAt = Math.max(r.cloudAt || 0, t);
          try {
            await rA();
          } catch {}
          return;
        }
      }
      !r.netOwner || S2(r) || ao(r, t)
        ? (y("Đang tải nhân vật từ đám mây…"), await Xf(nA, t))
        : (r.last || 0) > t + 5e3 && (await rA());
    },
    Xf = async function (A, n) {
      const t = await v0((i) =>
          i.from("saves").select("data,updated").eq("slot", A).single(),
        ),
        e = i3(t.data.data),
        a = eo(e.d);
      ((a.cloudAt = n || Date.parse(t.data.updated)),
        (a.netOwner = k.user.id),
        Ur(e.k),
        hc(A, a),
        location.reload());
    },
    Ib = async function () {
      return (
        (
          await v0((n) =>
            n.from("saves").select("slot,name,lvl,fac,updated").order("slot"),
          )
        ).data || []
      );
    },
    Sb = async function (A) {
      await Xf(A);
    },
    Jr = function (A) {
      if (
        ((window.NET_GATE = !0),
        document.body.classList.add("ngate-on"),
        !document.getElementById("ngateCss"))
      ) {
        const e = document.createElement("style");
        e.id = "ngateCss";
        const a = Math.random() < 0.5 ? "bg20a" : "bg20b";
        ((e.textContent = `body.ngate-on #modal{position:fixed!important;inset:0;z-index:9000!important;background:radial-gradient(ellipse at 50% 55%,#0000 35%,#000b 100%),url(img/u2/login/${a}.jpg) center/cover #0b1418!important;display:flex!important;flex-direction:column;align-items:center;justify-content:center}
body.ngate-on #modal.hidden{display:none!important}body.ngate-on #modal .mx{display:none!important}
body.ngate-on #modal::before{content:'VÕ LÂM IDLE';font-size:clamp(28px,6vw,46px);letter-spacing:5px;color:#f3d27a;text-shadow:0 0 16px #c8902a,0 0 4px #000,0 3px 0 #000;margin-bottom:6px;font-weight:bold;font-family:serif}
body.ngate-on #modal .mbox{max-width:none!important;width:min(440px,94vw)!important;background:none!important;border:0!important;outline:0!important;box-shadow:none!important;padding:0!important;overflow:visible!important;zoom:1}
body.ngate-on #modal .mbox::before,body.ngate-on #modal .mbox::after{display:none!important}
body.ngate-on #csel{display:none}
.ng2{container-type:inline-size;position:relative;width:100%;aspect-ratio:308/197;background:url(img/u2/login/panel.png) 0 0/100% 100% no-repeat;image-rendering:auto;filter:drop-shadow(0 8px 24px #000c)}
.ng2>*{position:absolute;box-sizing:border-box}
.ng2 .t{display:flex;align-items:center;justify-content:center;color:#f2ecd0;font-weight:bold;font-size:4.6cqw;text-shadow:0 0 3px #000,0 1px 1px #000;white-space:nowrap}
.ng2 .l{display:flex;align-items:center;justify-content:flex-end;padding-right:1.2cqw;color:#fff;font-weight:bold;font-size:3.3cqw;text-shadow:-1px 0 #000,1px 0 #000,0 -1px #000,0 1px #000;white-space:nowrap}
.ng2 input{background:transparent;border:0;outline:0;color:#f6e7b8;font:bold 4.2cqw/1 inherit;font-family:inherit;padding:0 1.6cqw;margin:0;border-radius:0}
.ng2 input:focus{box-shadow:inset 0 0 0 1px #e3ffd4}
.ng2 .cb{cursor:pointer;background:transparent!important;border:0!important;padding:0!important;box-shadow:none!important;min-height:0!important}.ng2 .cb.on{background:url(img/u2/login/tick.png) 20% 30%/150% auto no-repeat!important}
.ng2 .cl{display:flex;align-items:center;color:#fff;font-weight:bold;font-size:3.6cqw;text-shadow:-1px 0 #000,1px 0 #000,0 -1px #000,0 1px #000;cursor:pointer;white-space:nowrap;padding-left:.8cqw;user-select:none}
.ng2 .b{display:flex;align-items:center;justify-content:center;border:0!important;border-radius:0!important;box-shadow:none!important;min-height:0!important;background:#000;color:#ffe23a;font-weight:bold;font-size:4.6cqw;text-shadow:0 1px 0 #000;cursor:pointer;padding:0}
.ng2 .b:hover{background:radial-gradient(ellipse 60% 70% at 50% 50%,#3fb2e2 0%,#1a6f95 45%,#06222e 80%,#000 100%);color:#fff7c0}
.ng2 .b:active,.ng2 .b[disabled]{background:radial-gradient(ellipse 60% 70% at 50% 50%,#8a8a8a 0%,#3c3c3c 55%,#000 100%);color:#d8d8d8}
.ng2x{margin-top:10px;text-align:center;color:#f3ead2;font-size:12px;text-shadow:0 1px 2px #000,0 0 4px #000}.ng2x .reqbad{margin:6px 0}`),
          document.head.appendChild(e));
      }
      const n = A
          ? `<p class="reqbad">${D(A)}</p><div class="btnrow" style="justify-content:center"><button class="btn sm" id="ngRetry">Thử kết nối lại</button></div>`
          : "",
        t = ah();
      J(
        `<div class="ng2">
      <div class="t" style="${j1(0, 5, 308, 22)}">Xác nhận tên tài khoản</div>
      <label class="l" for="ngU" style="${j1(6, 53, 68, 24)}">Tài khoản:</label><input id="ngU" style="${j1(74, 55, 210, 20)}" maxlength="64" autocomplete="username" autocapitalize="off" spellcheck="false" value="${D(t)}">
      <label class="l" for="ngP" style="${j1(6, 91, 68, 24)}">Mật mã:</label><input id="ngP" style="${j1(74, 93, 210, 20)}" type="password" maxlength="64" autocomplete="current-password">
      <button type="button" class="cb" id="ngShow" style="${j1(73, 123, 18, 20)}" aria-label="Hiện mật mã"></button><span class="cl" data-cb="ngShow" style="${j1(91, 123, 80, 20)}">Hiện mật mã</span>
      <button type="button" class="cb${t ? " on" : ""}" id="ngRem" style="${j1(173, 123, 18, 20)}" aria-label="Nhớ tài khoản"></button><span class="cl" data-cb="ngRem" style="${j1(191, 123, 110, 20)}">Nhớ tài khoản</span>
      <button type="button" class="b" id="ngIn" style="${j1(7, 167, 144, 23)}">Đăng nhập</button>
      <button type="button" class="b" id="ngUp" style="${j1(157, 167, 144, 23)}">Đăng ký</button>
    </div>
    <div class="ng2x">Một tài khoản dùng cho 3 nhân vật. Có thể nhập tài khoản và mật mã bất kỳ.<br>Nếu chưa có trong hệ thống sẽ tự động tạo mới tài khoản.${n}</div>`,
        () => {
          const e = (o) =>
            t1(
              u(o === "up" ? "#ngUp" : "#ngIn"),
              async () => (
                await Yf(o, u("#ngU").value, u("#ngP").value),
                ah(
                  u("#ngRem").classList.contains("on")
                    ? String(u("#ngU").value || "")
                        .trim()
                    : null,
                ),
                Nb()
              ),
            );
          ((u("#ngIn").onclick = () => e("in")),
            (u("#ngUp").onclick = () => e("up")),
            (u("#ngP").onkeydown = (o) => {
              o.key === "Enter" && e("in");
            }),
            (u("#ngU").onkeydown = (o) => {
              o.key === "Enter" && u("#ngP").focus();
            }));
          const a = (o) => {
            const l = u("#" + o);
            (l.classList.toggle("on"),
              o === "ngShow" &&
                (u("#ngP").type = l.classList.contains("on")
                  ? "text"
                  : "password"));
          };
          ((u("#ngShow").onclick = () => a("ngShow")),
            (u("#ngRem").onclick = () => a("ngRem")),
            document
              .querySelectorAll(".ng2 [data-cb]")
              .forEach((o) => (o.onclick = () => a(o.dataset.cb))),
            setTimeout(() => {
              try {
                u(t ? "#ngP" : "#ngU").focus();
              } catch {}
            }, 50));
          const i = u("#ngRetry");
          i && (i.onclick = () => location.reload());
        },
        !0,
      );
    },
    Nb = async function () {
      ((window.NET_GATE = !1), document.body.classList.remove("ngate-on"));
      const A = await Ff();
      if (!r || !r.fac) {
        const n = [...Array(W1).keys()].filter((t) => Ns(t));
        if (n.length) {
          try {
            localStorage.setItem(Z1, n.length > 1 ? "menu" : String(n[0]));
          } catch {}
          location.reload();
          return;
        }
        (t0(!0), ed());
        return;
      }
      (t0(!0),
        y("Đã đăng nhập: " + Ao()),
        hn(!0).catch(() => {}),
        Vf().catch(() => {}),
        Pe());
    },
    Pe = async function () {
      if (!k.user) {
        ((k.mailN = 0), r3());
        return;
      }
      if (!I2()) {
        try {
          const A = await v0((n) =>
            n.from("mail").select("id", { count: "exact", head: !0 }),
          );
          k.mailN = A.count || 0;
        } catch {}
        r3();
      }
    },
    Lb = function (A) {
      if (
        !A ||
        typeof A != "object" ||
        !Array.isArray(A.base) ||
        !Array.isArray(A.mag)
      )
        return null;
      const n = JSON.parse(JSON.stringify(A));
      return (
        (n.uid = r.uid++),
        delete n.lock,
        typeof A5 == "function" && A5(n),
        typeof Gn == "function" && Gn(n),
        n
      );
    },
    Uf = async function (A, n) {
      if (c3.includes("mail")) throw new Error("Hộp thư đang tạm đóng");
      if (A.item && r.inv.length >= INV_MAX) throw new Error("Hành trang đầy");
      const t = await v0((i) => i.rpc("claim_mail", { mid: A.id })),
        e = t.data || A,
        a = [];
      if (e.item) {
        const i = Lb(e.item);
        if ((i && (i.lock = !0), i && typeof SA == "function" && SA(i)))
          a.push(`${i.n} (đồ đã xóa khỏi game)`);
        else if (i && typeof jA == "function" && jA(i)) {
          const o = y0(i);
          ((r.gold += o),
            a.push(`${i.n} → ${j(o)} lượng (đồ đã bỏ khỏi game)`));
        } else i && (r.inv.push(i), a.push(i.n), (Y = !0));
      }
      return (
        e.gold > 0 && ((r.gold += +e.gold), a.push(j(+e.gold) + " lượng")),
        e.knb > 0 &&
          ((r.knb = (r.knb | 0) + (e.knb | 0)), a.push((e.knb | 0) + " KNB")),
        B(),
        n || M(`📨 Nhận thư từ <b>${D(e.from_name)}</b>: ${D(a.join(", "))}`),
        await rA().catch(() => {}),
        a
      );
    },
    qb = async function (A, n, t, e) {
      if (k.ban) throw new Error("Tài khoản bị khóa giao dịch (dùng console)");
      if (c3.includes("mail")) throw new Error("Hộp thư đang tạm đóng");
      if (
        ((A = String(A || "").trim()),
        (t = Math.max(0, Math.floor(+t || 0))),
        !A)
      )
        throw new Error("Nhập tên người nhận");
      if (!n && !t) throw new Error("Chọn món đồ hoặc nhập số lượng");
      if (n && n.ktc && typeof y1 < "u" && !y1.includes(n.ktc.k))
        throw new Error(
          "Thư chỉ gửi được Võ Lâm Mật Tịch, Tẩy Tủy Kinh, Rương Ngựa của Kỳ Trân Các",
        );
      if (t > r.gold) throw new Error("Không đủ ngân lượng");
      if (n && (n.lock || !r.inv.includes(n)))
        throw new Error("Món không gửi được (đang khóa / đang mặc)");
      (await zn(),
        await rA(),
        await v0((a) =>
          a
            .from("mail")
            .insert({
              to_name: A,
              from_name: r.name,
              from_owner: k.user.id,
              kind: "gift",
              item: n || null,
              gold: t,
              note: String(e || "").slice(0, 100),
            }),
        ));
      {
        const a = n ? r.inv.indexOf(n) : -1;
        (n && a >= 0 && r.inv.splice(a, 1), (r.gold -= t), (Y = !0), B());
      }
      (M(
        `📨 Gửi <b>${D(A)}</b>: ${D([n && n.n, t && j(t) + " lượng"].filter(Boolean).join(", "))}`,
      ),
        rA().catch(() => {}));
    },
    jb = async function (A) {
      if (
        ((A = String(A || "")
          .trim()
          .toUpperCase()),
        !A)
      )
        throw new Error("Nhập giftcode");
      if (!/^[A-Z0-9_-]{3,32}$/.test(A))
        throw new Error("Giftcode không hợp lệ");
      if (!k.user) throw new Error("Cần đăng nhập tài khoản để nhập giftcode");
      await hn().catch(() => {});
      const n = await v0((i) => i.rpc("jx_redeem", { c: A, cname: r.name })),
        t = (n && n.data) || {};
      if (t.err) throw new Error(t.err);
      const e = t.reward || {},
        a = [];
      return (
        +e.knb > 0 && a.push(`${+e.knb} KNB`),
        +e.gold > 0 && a.push(j(+e.gold) + " lượng"),
        +e.xpbuff > 0 &&
          ((r.tanthuXp = Math.max(+r.tanthuXp || 0, +e.xpbuff)),
          B(),
          M(
            `🌱 Giftcode <b>${D(A)}</b>: <b style="color:#7fe08a">+${Math.round(+e.xpbuff * 100)}% kinh nghiệm</b> đến khi chuyển sinh lần 1 (nhân vật ${D(r.name)})`,
          )),
        M(`🎟 Giftcode <b>${D(A)}</b>: quà (${a.join(", ")}) đã gửi vào Thư`),
        Pe(),
        { note: t.note || "", out: a }
      );
    },
    zb = async function () {
      let A = -1;
      try {
        if (typeof g0 == "function" && g0() && !window.MAINT) {
          const n = await v0((t) => t.rpc("jx_gift_open"));
          A = Number.isFinite(+n.data) ? +n.data : -1;
        }
      } catch {
        A = -1;
      }
      if (A === 0) {
        J(
          '<h3>🎟 Giftcode</h3><div class="card" style="text-align:center;padding:18px 10px"><div style="font-size:30px">🎁</div><p>Hiện tại server <b>chưa có giftcode nào</b>.</p><p class="small dim">Theo dõi kênh Thế giới / thông báo để nhận giftcode khi có sự kiện.</p></div>',
        );
        return;
      }
      J(
        `<h3>🎟 Nhập Giftcode</h3>
    <p class="small dim">Mỗi tài khoản nhập mỗi code 1 lần. Quà gửi qua <b>Thư</b> từ Hệ Thống cho nhân vật đang chơi (<b>${D(r.name || "")}</b>).</p>
    <div class="btnrow"><input id="gcIn" maxlength="32" placeholder="VD: VOLAM2026" style="flex:1;text-transform:uppercase" autocomplete="off"><button class="btn" id="gcOk">Nhận quà</button></div>
    <div id="gcMsg" class="small" style="min-height:1.5em;margin-top:6px"></div>`,
        () => {
          const n = u("#gcIn"),
            t = u("#gcOk"),
            e = u("#gcMsg");
          n.focus();
          const a = async () => {
            if (!t.disabled) {
              ((t.disabled = !0),
                (e.innerHTML = '<span class="dim">Đang kiểm tra…</span>'));
              try {
                const i = await jb(n.value);
                ((e.innerHTML = `<span class="cp">✔ Quà (${i.out.join(", ") || "—"}) đã gửi vào Thư.</span> <button class="btn sm" id="gcMail">Mở Thư</button>`),
                  i0("levelup"),
                  (n.value = ""));
                const o = u("#gcMail");
                o && (o.onclick = () => $0("mail"));
              } catch (i) {
                ((e.innerHTML = `<span class="cn">✖ ${D(i.message || String(i))}</span>`),
                  i0("use"));
              }
              t.disabled = !1;
            }
          };
          ((t.onclick = a),
            (n.onkeydown = (i) => {
              i.key === "Enter" && a();
            }));
        },
      );
    },
    Qb = async function (A, n, t) {
      if (k.ban) throw new Error("Tài khoản bị khóa giao dịch (dùng console)");
      if (c3.includes("mkt")) throw new Error("Chợ đang tạm đóng");
      if (((n = Math.floor(+n || 0)), n < 1)) throw new Error("Nhập giá bán");
      if (!A || A.lock || !r.inv.includes(A))
        throw new Error("Món không bán được (đang khóa / đang mặc)");
      if (A.ktc && typeof y1 < "u" && !y1.includes(A.ktc.k))
        throw new Error(
          "Chợ chỉ nhận Võ Lâm Mật Tịch, Tẩy Tủy Kinh, Rương Ngựa của Kỳ Trân Các",
        );
      (await zn(), await rA());
      const e = () =>
        v0((a) =>
          a
            .from("market")
            .insert(
              Object.assign(
                {
                  seller: k.user.id,
                  seller_name: r.name,
                  item: A,
                  iname: String(A.n).slice(0, 80),
                  price: n,
                },
                t === "knb" ? { cur: "knb" } : {},
              ),
            ),
        );
      try {
        try {
          await e();
        } catch (a) {
          if (!/row-level security/i.test(String(a && a.message))) throw a;
          let i = null;
          try {
            const o = await k.sb.auth.refreshSession();
            i = o && o.data && o.data.session ? o.data.session.user.id : null;
          } catch {}
          if (!i)
            throw new Error(
              "Phiên đăng nhập đã hết hạn — đăng xuất rồi đăng nhập lại để bày bán",
            );
          if (i !== k.user.id)
            throw new Error(
              "Trình duyệt đang đăng nhập tài khoản khác — tải lại trang (F5)",
            );
          ((k.lastChar = 0), await hn());
          try {
            await e();
          } catch (o) {
            throw new Error(
              `Máy chủ từ chối (nhân vật ${r.name}, tài khoản ${String(i).slice(0, 8)}): ${o.message}`,
            );
          }
        }
      } catch (a) {
        throw a;
      }
      {
        const a = r.inv.indexOf(A);
        (a >= 0 && r.inv.splice(a, 1), (Y = !0), B());
      }
      (M(
        `🏪 Bày bán <b>${D(A.n)}</b> giá ${c8({ price: n, cur: t })} · bày 2 giờ, hết hạn tự về Thư`,
      ),
        rA().catch(() => {}));
    },
    Gb = async function (A) {
      if (c3.includes("mkt")) throw new Error("Chợ đang tạm đóng");
      const n = o3(A);
      if (!so(A)) throw new Error(n ? "Không đủ KNB" : "Không đủ ngân lượng");
      await zn();
      const t = (e) => {
        n ? (r.knb = (r.knb | 0) + e) : (r.gold += e);
      };
      (t(-A.price), B());
      try {
        await rA();
      } catch (e) {
        throw (
          t(A.price),
          B(),
          new Error(
            "Không lưu được nhân vật lên máy chủ, chưa mua: " + e.message,
          )
        );
      }
      try {
        await v0((e) => e.rpc("market_buy", { lid: A.id, buyer: r.name }));
      } catch (e) {
        throw (t(A.price), B(), rA().catch(() => {}), e);
      }
      (M(
        `🏪 Mua <b>${D(A.iname)}</b> của ${D(A.seller_name)} giá ${c8(A)} (món đã vào Thư)`,
      ),
        Pe(),
        rA().catch(() => {}));
    },
    r3 = function () {
      const A = u("#netBtn");
      A &&
        (A.classList.toggle("on", k.mailN > 0),
        (A.dataset.n = k.mailN > 9 ? "9+" : k.mailN || ""));
    },
    Wr = function (A, n, t) {
      J(
        `${en(A)}${n || ""}<div class="btnrow"><button class="btn" id="niBack">Quay lại</button></div>`,
        () => {
          u("#niBack").onclick = t;
        },
      );
    },
    Jf = async function () {
      if (k.user || !k.sb) return !!k.user;
      try {
        const { data: A } = await k.sb.auth.getSession();
        k.user = A && A.session ? A.session.user : null;
      } catch {}
      return !!k.user;
    },
    Wf = async function () {
      (await Jf()) ||
        Jr(
          "Phiên đăng nhập đã hết — đăng nhập lại để tiếp tục lưu nhân vật lên đám mây.",
        );
    },
    $0 = async function s(A, n) {
      if ((A && (k.tab = A), k.sb && (await Jf()), !g0()))
        return J(
          '<h3>🌐 Giang hồ online</h3><p class="desc">Chưa cấu hình máy chủ (js/chatcfg.js).</p>',
        );
      const t = [
          ["acc", "Tài khoản"],
          ["rank", "Xếp hạng"],
          ["mail", `Thư${k.mailN ? ` (${k.mailN})` : ""}`],
          ["mkt", "Chợ"],
        ],
        e = `<h3>🌐 Giang hồ online <small>${k.user ? D(Ao()) : "chưa đăng nhập"}</small></h3><div class="dtabs" id="netTabs">${t.map(([o, l]) => `<button data-nt="${o}" class="${o === k.tab ? "on" : ""}">${l}</button>`).join("")}</div>${n ? `<p class="cn small">${D(n)}</p>` : ""}${r && r.fac ? "" : '<div class="btnrow"><button class="btn sm" id="netSlot">← Chọn nhân vật</button></div>'}`;
      J(
        e + '<div id="netBody"><p class="dim small">Đang tải…</p></div>',
        () => {
          document
            .querySelectorAll("#netTabs [data-nt]")
            .forEach((l) => (l.onclick = () => s(l.dataset.nt)));
          const o = u("#netSlot");
          o && (o.onclick = () => k8());
        },
        !(r && r.fac),
      );
      try {
        await s3();
      } catch (o) {
        u("#netBody").innerHTML = `<p class="reqbad">${D(o.message)}</p>`;
        return;
      }
      const a = u("#netBody");
      if (!a) return;
      const i = !k.user && k.tab !== "rank";
      if (!i && c3.includes(k.tab)) {
        a.innerHTML = `<div class="card"><b>⛔ Tạm đóng</b><p class="desc">${k.tab === "mkt" ? "Chợ" : "Hộp thư"} đang tạm đóng để bảo trì. Đồ và ngân lượng trong ${k.tab === "mkt" ? "Chợ" : "thư"} vẫn được giữ nguyên.</p></div>`;
        return;
      }
      try {
        await { acc: Kb, rank: Zf, mail: Rb, mkt: Fb }[i ? "acc" : k.tab](a);
      } catch (o) {
        a.innerHTML = `<p class="reqbad">${D(o.message || o)}</p>`;
      }
    },
    Kb = async function (A) {
      if (!k.user) {
        A.innerHTML = `<div class="card"><b>Đăng nhập / Đăng ký</b><p class="dim small">Một tài khoản dùng cho cả 3 nhân vật: lưu đám mây, bảng xếp hạng, gửi thư, Chợ. Không cần email.</p>
      <div class="row">Tên đăng nhập <input id="naU" maxlength="64" autocomplete="username" placeholder="tên tài khoản bất kỳ"></div>
      <div class="row">Mật khẩu <input id="naP" type="password" maxlength="64" autocomplete="current-password" placeholder="mật khẩu"></div>
      <div class="btnrow"><button class="btn" id="naIn">Đăng nhập</button><button class="btn" id="naUp">Đăng ký mới</button></div>
      <p class="dim small">Có thể nhập tài khoản và mật mã bất kỳ. Nếu chưa có sẽ tự động tạo mới.</p></div>`;
        const i = (o) =>
          t1(
            u(o === "up" ? "#naUp" : "#naIn"),
            () => Yf(o, u("#naU").value, u("#naP").value),
            () => {
              (y(o === "up" ? "Đã tạo tài khoản" : "Đã đăng nhập"), $0("acc"));
            },
          );
        ((u("#naIn").onclick = () => i("in")),
          (u("#naUp").onclick = () => i("up")));
        return;
      }
      const n = await Ib(),
        t = (i) => (i ? new Date(i).toLocaleString("vi-VN") : "—");
      ((A.innerHTML = `<div class="card"><b>Tài khoản ${D(Ao())}</b> <button class="btn sm" id="naOut">Đăng xuất</button>
      ${
        r.fac
          ? `<p class="small">Nhân vật đang chơi: <b>${D(HA() ? r.name : "(chưa đặt tên)")}</b> · ${D(io(r.fac))} cấp ${r.lvl} · slot ${nA + 1}</p>
      <div class="btnrow"><button class="btn sm" id="naSync">Cập nhật lên bảng xếp hạng</button>${HA() ? "" : '<button class="btn sm on" id="naName">✏ Đặt tên</button>'}</div>`
          : ""
      }</div>
    <div class="card"><b>☁ Lưu đám mây</b> <small class="dim">mỗi slot 1 bản, chơi tiếp trên máy khác</small>
      ${
        r.fac
          ? `<div class="btnrow"><button class="btn sm" id="naUp">Tải lên ngay (slot ${nA + 1})</button></div>
      <p class="dim small">Nhân vật chỉ lưu trên đám mây: tự lưu lên mỗi 2 phút và khi rời trang; vào game luôn lấy bản đám mây.</p>`
          : ""
      }
      <table class="dktbl small"><tr><th>Slot</th><th>Nhân vật</th><th>Lưu lúc</th><th></th></tr>
      ${[0, 1, 2]
        .map((i) => {
          const o = n.find((l) => l.slot === i);
          return `<tr><td>${i + 1}</td><td>${o ? `${D(o.name || "")} · ${D(io(o.fac))} ${o.lvl}` : '<span class="dim">trống</span>'}</td><td>${o ? t(o.updated) : ""}</td><td>${o ? `<button class="btn sm" data-cl="${i}">Tải về</button>` : ""}</td></tr>`;
        })
        .join("")}</table>
      <p class="dim small">Tải về: thay nhân vật slot đó trên máy này bằng bản đám mây (bản cũ giữ 1 bản sao lưu). Bình thường game tự đồng bộ, không cần bấm.</p></div>`),
        (u("#naOut").onclick = () =>
          t1(
            u("#naOut"),
            async () => {
              (r && r.fac && (await rA().catch(() => {})),
                (k.loggingOut = !0),
                await k.sb.auth.signOut(),
                (k.loggingOut = !1),
                (k.user = null),
                (k.mailN = 0),
                r3());
            },
            () => location.reload(),
          )));
      const e = (i, o) => {
        const l = u(i);
        l && (l.onclick = o);
      };
      (e("#naSync", () =>
        t1(
          u("#naSync"),
          () => hn(),
          () => y("Đã cập nhật"),
        ),
      ),
        e("#naName", () => E2(() => $0("acc"))),
        e("#naUp", () =>
          t1(
            u("#naUp"),
            () => rA(),
            () => {
              (y("Đã lưu lên đám mây"), $0("acc"));
            },
          ),
        ));
      const a = u("#naAuto");
      (a &&
        (a.onchange = () => {
          ((r.cloudAuto = a.checked), B());
        }),
        A.querySelectorAll("[data-cl]").forEach(
          (i) => (i.onclick = () => t1(i, () => Sb(+i.dataset.cl))),
        ));
    },
    Zf = async function (A) {
      d8.some((o) => o[0] === k.rank) || (k.rank = "lvl");
      const n = k.rank,
        t = await v0((o) => {
          let l = o
            .from("chars")
            .select("name,fac,lvl,reborn,power,tower,bosses");
          return (
            k.rfac && (l = l.eq("fac", k.rfac)),
            (l =
              n === "lvl"
                ? l
                    .order("reborn", { ascending: !1 })
                    .order("lvl", { ascending: !1 })
                    .order("power", { ascending: !1 })
                : l.order(n, { ascending: !1 })),
            l.limit(n === "lvl" ? 100 : 50)
          );
        }),
        e = (o) => Math.min(ey, Math.max(0, o.reborn | 0));
      let a = t.data || [];
      n === "lvl" &&
        (a = a
          .map((o, l) => [o, l])
          .sort(
            (o, l) =>
              e(l[0]) - e(o[0]) ||
              (l[0].lvl | 0) - (o[0].lvl | 0) ||
              o[1] - l[1],
          )
          .map((o) => o[0])
          .slice(0, 50));
      const i = (o) =>
        n === "lvl"
          ? `${e(o) ? `<small class="cp">CS${e(o)}</small> ` : ""}${o.lvl}`
          : X(o[n] || 0);
      ((A.innerHTML = `<div class="row"><select id="nrCol">${d8.map(([o, l]) => `<option value="${o}" ${o === n ? "selected" : ""}>${l}</option>`).join("")}</select>
      <select id="nrFac"><option value="">Mọi phái</option>${uA
        .filter((o) => !o.novice)
        .map(
          (o) =>
            `<option value="${o.key}" ${o.key === k.rfac ? "selected" : ""}>${D(o.n)}</option>`,
        )
        .join("")}</select></div>
    <table class="dktbl small"><tr><th>#</th><th>Nhân vật</th><th>Phái</th><th>${d8.find((o) => o[0] === n)[1]}</th></tr>
    ${a.map((o, l) => `<tr${r && o.name === r.name ? ' style="background:#2a2410"' : ""}><td>${l + 1}</td><td><a href="#" data-pn="${D(o.name)}" style="color:${typeof D2 == "function" ? D2(o.name, o.fac) : "#ffd76a"}">${D(o.name)}</a></td><td>${D(io(o.fac))}</td><td>${i(o)}</td></tr>`).join("") || '<tr><td colspan="4" class="dim">Chưa có ai</td></tr>'}</table>
    <p class="dim small">Bấm tên để xem trang bị. Nhân vật của bạn tự cập nhật khi đã đăng nhập.</p>`),
        (u("#nrCol").onchange = (o) => {
          ((k.rank = o.target.value), $0("rank"));
        }),
        (u("#nrFac").onchange = (o) => {
          ((k.rfac = o.target.value), $0("rank"));
        }),
        A.querySelectorAll("[data-pn]").forEach(
          (o) =>
            (o.onclick = (l) => {
              (l.preventDefault(), gn(o.dataset.pn, () => $0("rank")));
            }),
        ));
    },
    gn = async function s(A, n) {
      ((n = n || (() => t0())),
        J(`<h3>${D(A)}</h3><p class="dim small">Đang tải…</p>`));
      let t;
      try {
        t = await v0((l) =>
          l
            .from("chars")
            .select("name,fac,sex,lvl,reborn,power,tower,bosses,gear,updated")
            .ilike(
              "name",
              String(A).replace(/[\\%_]/g, (d) => "\\" + d),
            )
            .limit(1)
            .maybeSingle(),
        );
      } catch (l) {
        return J(`<h3>${D(A)}</h3><p class="reqbad">${D(l.message)}</p>`);
      }
      const e = t.data;
      if (!e)
        return J(
          `<h3>${D(A)}</h3><p class="desc">Nhân vật này chưa liên kết tài khoản online nên chưa xem được trang bị.</p><div class="btnrow"><button class="btn" id="pfB">Quay lại</button></div>`,
          () => {
            u("#pfB").onclick = n;
          },
        );
      const a = e.gear || {},
        i = I[e.fac],
        o = G1.map(
          ([l, d]) =>
            `<div class="pfs"><small class="dim">${d}</small>${a[l] ? l3(a[l]).replace("data-uid=", `data-pk="${l}" data-x=`) : '<div class="it"></div>'}</div>`,
        ).join("");
      J(
        `<h3${typeof wi == "function" && wi(e.name) ? ' style="color:#ff3b3b"' : ""}>${D(e.name)} <small>${D(i ? i.n : "")} · cấp ${e.lvl}${e.reborn ? ` · chuyển sinh ${e.reborn}` : ""}</small></h3>
    <p class="small">Tháp tầng <b>${e.tower || 0}</b> · Trùm đã hạ <b>${X(e.bosses || 0)}</b> <small class="dim">· cập nhật ${new Date(e.updated).toLocaleString("vi-VN")}</small></p>
    <div class="pfgrid">${o}</div>
    <div class="btnrow">${r && r.fac && e.name !== r.name ? '<button class="btn" id="pfParty">👥 Mời tổ đội</button><button class="btn" id="pfMail">📨 Gửi thư</button>' : ""}<button class="btn" id="pfB">Quay lại</button></div>`,
        () => {
          (document
            .querySelectorAll("#mBody [data-pk]")
            .forEach(
              (h) => (h.onclick = () => Wr(a[h.dataset.pk], "", () => s(A, n))),
            ),
            (u("#pfB").onclick = n));
          const l = u("#pfMail");
          l &&
            (l.onclick = () => {
              ((k.mailTo = e.name), $0("mail"));
            });
          const d = u("#pfParty");
          d &&
            (d.onclick = () => {
              typeof oo == "function" && oo(e.name);
            });
        },
      );
    },
    Rb = async function (A) {
      const n = await v0((l) =>
          l.from("mail").select("*").order("id", { ascending: !1 }).limit(50),
        ),
        t = n.data || [];
      ((k.mailN = t.length), r3());
      const e = r.fac
        ? r.inv.filter(
            (l) => !(l.ktc && typeof y1 < "u" && !y1.includes(l.ktc.k)),
          )
        : [];
      ((A.innerHTML = `<div class="card"><b>📥 Hộp thư</b> ${t.length ? '<button class="btn sm" id="nmAll">Nhận tất cả</button>' : ""}
      ${
        t
          .map(
            (
              l,
            ) => `<div class="nmrow">${l.item ? l3(l.item).replace("data-uid=", `data-mi="${l.id}" data-x=`) : '<span class="nmg">💰</span>'}<span><b>${D(l.from_name)}</b> <small class="dim">${new Date(l.created).toLocaleString("vi-VN")}</small><br>
        ${l.item ? `<span style="color:${b0[l.item.r] || "#ddd"}">${D(l.item.n)}</span>` : ""}${l.gold > 0 ? ` <span class="cp">+${j(l.gold)} lượng</span>` : ""}${l.knb > 0 ? ` <span class="gold">+${l.knb} KNB</span>` : ""}${l.note ? `<br><small class="dim">${D(l.note)}</small>` : ""}</span>
        <button class="btn sm" data-take="${l.id}" ${r.fac ? "" : "disabled"}>Nhận</button>${l.kind === "gift" ? ` <button class="btn sm" data-rej="${l.id}" ${r.fac ? "" : "disabled"}>Hủy</button>` : ""}</div>`,
          )
          .join("") || '<p class="dim small">Không có thư.</p>'
      }</div>
    ${
      r.fac
        ? `<div class="card"><b>📤 Gửi thư</b> <small class="dim">từ ${D(HA() ? r.name : "(chưa đặt tên)")}</small>
      <div class="row">Gửi cho <input id="nmTo" maxlength="14" placeholder="Tên nhân vật" value="${D(k.mailTo || "")}"></div>
      <div class="row">Ngân lượng <input id="nmGold" type="number" min="0" placeholder="0"> <small class="dim">có ${j(r.gold)}</small></div>
      <div class="row">Lời nhắn <input id="nmNote" maxlength="100" placeholder="(không bắt buộc)"></div>
      <div class="small">Kèm món đồ (chạm để chọn, chạm lại để bỏ):</div>
      <div class="invgrid" id="nmInv">${e.map((l) => l3(l).replace('class="it', `${l.lock ? 'style="opacity:.4" title="Đang khóa 🔒" ' : ""}class="it${k.sel === l.uid ? " ep-on" : ""}`)).join("") || '<small class="dim">Hành trang trống</small>'}</div>
      <small class="dim">Món mờ = đang khóa 🔒: mở khóa trong Hành trang mới gửi được.</small>
      <div id="nmPick"></div>
      <div class="btnrow"><button class="btn" id="nmSend">Gửi</button></div></div>`
        : ""
    }`),
        A.querySelectorAll("[data-mi]").forEach(
          (l) =>
            (l.onclick = () => {
              const d = t.find((h) => h.id === +l.dataset.mi);
              Wr(d.item, "", () => $0("mail"));
            }),
        ),
        A.querySelectorAll("[data-rej]").forEach(
          (l) =>
            (l.onclick = async () => {
              const d = t.find((h) => h.id === +l.dataset.rej);
              d &&
                (d.kind !== "gift" ||
                  !(await ct(
                    `Không nhận thư của ${d.from_name}? Thư sẽ được trả lại cho người gửi.`,
                    "Trả lại",
                  )) ||
                  t1(
                    l,
                    () => v0((h) => h.rpc("reject_mail", { mid: d.id })),
                    () => {
                      (y("Đã trả lại thư"), $0("mail"));
                    },
                  ));
            }),
        ),
        A.querySelectorAll("[data-take]").forEach(
          (l) =>
            (l.onclick = () =>
              t1(
                l,
                () => Uf(t.find((d) => d.id === +l.dataset.take)),
                (d) => {
                  (y("Đã nhận: " + d.join(", ")), F(), $0("mail"));
                },
              )),
        ));
      const a = u("#nmAll");
      if (
        (a &&
          (a.onclick = () =>
            t1(
              a,
              async () => {
                let l = 0;
                for (const d of t)
                  try {
                    (await Uf(d, !1), l++);
                  } catch (h) {
                    y(h.message);
                    break;
                  }
                return l;
              },
              (l) => {
                (y(`Đã nhận ${l} thư`), F(), $0("mail"));
              },
            )),
        !r.fac)
      )
        return;
      const i = () => {
        k.mailTo = u("#nmTo").value;
      };
      A.querySelectorAll("#nmInv [data-uid]").forEach(
        (l) =>
          (l.onclick = () => {
            const d = +l.dataset.uid,
              h = r.inv.find((g) => g.uid === d);
            if (h) {
              if (h.lock) {
                y("Món đang khóa 🔒 — mở khóa trong Hành trang rồi gửi");
                return;
              }
              ((k.sel = k.sel === d ? null : d),
                A.querySelectorAll("#nmInv [data-uid]").forEach((g) =>
                  g.classList.toggle(
                    "ep-on",
                    k.sel != null && +g.dataset.uid === k.sel,
                  ),
                ),
                o());
            }
          }),
      );
      const o = () => {
        const l = k.sel != null ? r.inv.find((h) => h.uid === k.sel) : null,
          d = u("#nmPick");
        d &&
          (d.innerHTML = l
            ? `<div class="small">✓ Đang chọn: <b style="color:${b0[l.r] || "#ddd"}">${D(l.n)}</b>${l.enh ? " +" + l.enh : ""}</div><div class="card">${en(l)}</div>`
            : '<p class="dim small">Chạm món để xem thông tin.</p>');
      };
      (o(),
        (u("#nmSend").onclick = async () => {
          i();
          const l = k.sel != null ? r.inv.find((d) => d.uid === k.sel) : null;
          (l &&
            !(await ct(
              `Gửi ${l.n}${l.enh ? " +" + l.enh : ""} cho ${u("#nmTo").value.trim() || "?"}?`,
              "Gửi",
            ))) ||
            t1(
              u("#nmSend"),
              () =>
                qb(u("#nmTo").value, l, u("#nmGold").value, u("#nmNote").value),
              () => {
                (y("Đã gửi"), (k.sel = null), F(), $0("mail"));
              },
            );
        }));
    },
    Yb = function (A) {
      return A
        ? A.set
          ? A.set.kind === "platina"
            ? "bk"
            : Re(A) >= 0
              ? "hkmp"
              : "hk"
          : ["trang", "xanh", "hiem", "tim", "hk", "bk"][A.r | 0] || "trang"
        : "";
    },
    Fb = async function (A) {
      const t = `<div class="seg" id="nkSub">${[
          ["buy", "Mua"],
          ["sell", "Bày bán"],
          ["mine", "Hàng của tôi"],
        ]
          .map(
            ([m, w]) =>
              `<button class="btn sm${k.mkt === m ? " on" : ""}" data-nk="${m}">${w}</button>`,
          )
          .join("")}</div>`,
        e = () =>
          A.querySelectorAll("[data-nk]").forEach(
            (m) =>
              (m.onclick = () => {
                ((k.mkt = m.dataset.nk), (k.sel = null), $0("mkt"));
              }),
          );
      if (k.mkt === "sell") {
        const m = r.fac
            ? r.inv.filter(
                (P) =>
                  !P.lock &&
                  !(P.ktc && typeof y1 < "u" && !y1.includes(P.ktc.k)),
              )
            : [],
          w = k.sel ? m.find((P) => P.uid === k.sel) : null;
        ((A.innerHTML = `${t}<p class="dim small">Bày tối đa 10 món. Bán được: nhận ${100 - Vb * 100}% giá vào Thư. Gỡ hàng: món về Thư.</p>
      <div class="invgrid" id="nkInv">${m.map((P) => l3(P).replace('class="it', `class="it${k.sel === P.uid ? " ep-on" : ""}`)).join("") || '<small class="dim">Hành trang trống (món khóa 🔒 không bày được)</small>'}</div>
      ${w ? `<div class="card">${en(w)}<div class="row">Giá <input id="nkPrice" type="number" min="1" placeholder="số tiền"> <select id="nkCur"><option value="gold" ${k.cur !== "knb" ? "selected" : ""}>lượng</option><option value="knb" ${k.cur === "knb" ? "selected" : ""}>KNB</option></select> <small class="dim">giá bán NPC ${X(y0(w))} lượng</small> <small class="dim">Bày 2 giờ, hết hạn tự trả về Thư.</small></div><div class="btnrow"><button class="btn" id="nkGo">Bày bán</button></div></div>` : '<p class="dim small">Chạm món muốn bán.</p>'}`),
          e(),
          A.querySelectorAll("#nkInv [data-uid]").forEach(
            (P) =>
              (P.onclick = () => {
                ((k.sel = k.sel === +P.dataset.uid ? null : +P.dataset.uid),
                  $0("mkt"));
              }),
          ));
        const p = u("#nkGo");
        p &&
          (p.onclick = () =>
            t1(
              p,
              () => Qb(w, u("#nkPrice").value, (k.cur = u("#nkCur").value)),
              () => {
                (y("Đã bày bán"), (k.sel = null), F(), $0("mkt"));
              },
            ));
        return;
      }
      const a = k.mkt === "mine";
      try {
        await k.sb.rpc("market_expire");
      } catch {}
      let o = (
        (
          await v0((m) => {
            let w = m
              .from("market")
              .select("*")
              .order("id", { ascending: !1 })
              .limit(a ? 50 : 200);
            return (a && (w = w.eq("seller", k.user.id)), w);
          })
        ).data || []
      ).filter(
        (m) => m && m.item && (a || typeof ds != "function" || !ds(m.item)),
      );
      const l = k.q.trim().toLowerCase(),
        d =
          k.mf ||
          (k.mf = {
            slot: "",
            rar: "",
            fit: !1,
            can: !1,
            sort: "new",
            cur: "",
          });
      if (!a) {
        (l &&
          (o = o.filter(
            (w) =>
              w.iname.toLowerCase().includes(l) ||
              w.seller_name.toLowerCase().includes(l),
          )),
          d.slot &&
            (o = o.filter((w) => {
              const p = wA[w.item.d];
              return d.slot === "other" ? !p : p === d.slot;
            })),
          d.rar && (o = o.filter((w) => Yb(w.item) === d.rar)),
          d.fit &&
            r.fac &&
            (o = o.filter((w) => {
              const p = w.item;
              try {
                if (
                  (typeof f0 == "function" && !f0(p)) ||
                  (wA[p.d] === "weapon" && typeof YA == "function" && !YA(p))
                )
                  return !1;
                const P = Re(p);
                return P < 0 || !I[r.fac] || P === I[r.fac].id;
              } catch {
                return !0;
              }
            })),
          d.cur && (o = o.filter((w) => (o3(w) ? "knb" : "gold") === d.cur)),
          d.can && (o = o.filter((w) => so(w))));
        const m = (w) => w.price * (o3(w) ? d4 : 1);
        d.sort === "lo"
          ? o.sort((w, p) => m(w) - m(p))
          : d.sort === "hi" && o.sort((w, p) => m(p) - m(w));
      }
      const h = (m, w, p) =>
          `<option value="${m}" ${m === w ? "selected" : ""}>${p}</option>`,
        g = a
          ? ""
          : `<div class="row"><input id="nkQ" placeholder="Tìm tên món / người bán" value="${D(k.q)}"></div>
    <div class="row mktf"><select id="nkSlot">${h("", d.slot, "Mọi loại")}${ay.map(([m, w]) => h(m, d.slot, w)).join("")}${h("other", d.slot, "Khác")}</select>
      <select id="nkRar">${h("", d.rar, "Mọi phẩm chất")}${sy.map(([m, w]) => h(m, d.rar, w)).join("")}</select>
      <select id="nkCur2">${h("", d.cur, "Mọi loại tiền")}${h("gold", d.cur, "Lượng")}${h("knb", d.cur, "KNB")}</select>
      <select id="nkSort">${h("new", d.sort, "Mới nhất")}${h("lo", d.sort, "Giá thấp → cao")}${h("hi", d.sort, "Giá cao → thấp")}</select></div>
    <div class="row mktf"><label><input type="checkbox" id="nkFit" ${d.fit ? "checked" : ""}> Hợp với tôi (đủ cấp, đúng phái / vũ khí)</label> <label><input type="checkbox" id="nkCan" ${d.can ? "checked" : ""}> Đủ tiền mua</label> <small class="dim">${o.length} món</small></div>`;
      ((A.innerHTML = `${t}${g}
    ${
      o
        .map(
          (
            m,
          ) => `<div class="nmrow">${l3(m.item).replace("data-uid=", `data-li="${m.id}" data-x=`)}<span><span style="color:${b0[m.item.r] || "#ddd"}">${D(m.iname)}</span><br><small class="dim">${D(m.seller_name)} · ${ty(m)}</small></span>
      <span class="cp">${c8(m)}</span>${a ? `<button class="btn sm red" data-cx="${m.id}">Gỡ</button>` : m.seller === k.user.id ? '<small class="dim">của bạn</small>' : `<button class="btn sm" data-buy="${m.id}" ${r.fac && so(m) ? "" : "disabled"}>Mua</button>`}</div>`,
        )
        .join("") || '<p class="dim small">Chưa có món nào.</p>'
    }
    ${a ? "" : `<p class="dim small">Bạn có ${r.fac ? j(r.gold) : 0} lượng · ${r.fac ? X(r.knb | 0) : 0} KNB. Món mua được gửi vào Thư.</p>`}`),
        e());
      const f = u("#nkQ");
      f &&
        (f.onchange = () => {
          ((k.q = f.value), $0("mkt"));
        });
      for (const [m, w] of [
        ["#nkSlot", "slot"],
        ["#nkRar", "rar"],
        ["#nkSort", "sort"],
        ["#nkCur2", "cur"],
      ]) {
        const p = u(m);
        p &&
          (p.onchange = () => {
            ((d[w] = p.value), $0("mkt"));
          });
      }
      for (const [m, w] of [
        ["#nkFit", "fit"],
        ["#nkCan", "can"],
      ]) {
        const p = u(m);
        p &&
          (p.onchange = () => {
            ((d[w] = p.checked), $0("mkt"));
          });
      }
      (A.querySelectorAll("[data-li]").forEach(
        (m) =>
          (m.onclick = () => {
            const w = o.find((p) => p.id === +m.dataset.li);
            Wr(
              w.item,
              `<p class="small">Người bán <b>${D(w.seller_name)}</b> · giá <b class="cp">${c8(w)}</b></p>`,
              () => $0("mkt"),
            );
          }),
      ),
        A.querySelectorAll("[data-buy]").forEach(
          (m) =>
            (m.onclick = () =>
              t1(
                m,
                () => Gb(o.find((w) => w.id === +m.dataset.buy)),
                () => {
                  (y("Đã mua — món trong Thư"), F(), $0("mkt"));
                },
              )),
        ),
        A.querySelectorAll("[data-cx]").forEach(
          (m) =>
            (m.onclick = () =>
              t1(
                m,
                () => v0((w) => w.rpc("market_cancel", { lid: +m.dataset.cx })),
                () => {
                  (y("Đã gỡ — món về Thư"), Pe(), $0("mkt"));
                },
              )),
        ));
    },
    Ah = async function () {
      if (!g0()) return;
      const A = u("#giftBtn");
      if (A && !u("#netBtn")) {
        const n = document.createElement("button");
        ((n.id = "netBtn"),
          (n.title = "Giang hồ online: tài khoản, xếp hạng, thư, chợ"),
          (n.textContent = "🌐"),
          A.parentNode.insertBefore(n, A),
          (n.onclick = () => {
            (typeof i0 == "function" && i0("click"), $0());
          }));
      }
      try {
        await s3();
      } catch (n) {
        Jr("Không kết nối được máy chủ: " + (n.message || n));
        return;
      }
      if (!k.user) {
        Jr();
        return;
      }
      (Ff()
        .then((n) => {
          n && (!r || !r.fac) && location.reload();
        })
        .catch(() => {}),
        Pe(),
        Vf().catch(() => {}),
        document.addEventListener("visibilitychange", () => {
          document.hidden &&
            k.user &&
            r &&
            r.fac &&
            !I2() &&
            Date.now() - k.lastUp > 6e4 &&
            no() !== k.upSig &&
            rA().catch(() => {});
        }),
        setInterval(async () => {
          if (
            !k.user &&
            r &&
            r.fac &&
            !document.hidden &&
            !I2() &&
            u("#modal").classList.contains("hidden")
          ) {
            Wf();
            return;
          }
          if (!(!k.user || !r || !r.fac || document.hidden || I2())) {
            try {
              (HA() && Date.now() - k.lastChar > 10 * 6e4 && (await hn(!0)),
                Date.now() - k.lastUp > 8 * 6e4 &&
                  no() !== k.upSig &&
                  (await rA()));
            } catch {}
            Date.now() - (k.mailT || 0) > 5 * 6e4 &&
              ((k.mailT = Date.now()), Pe());
          }
        }, 6e4));
    },
    k = {
      sb: null,
      user: null,
      tab: "acc",
      mkt: "buy",
      rank: "lvl",
      rfac: "",
      mailN: 0,
      lastChar: 0,
      lastUp: 0,
      sel: null,
      q: "",
    },
    Zr = "@volamidle.game",
    Vb = 0.05,
    Xb = /[?&]offline_test=1\b/.test(location.search),
    g0 = () => !Xb,
    Ao = () =>
      (k.user && k.user.username) ||
      (k.user && k.user.email ? k.user.email.replace(Zr, "") : ""),
    Ub = (s) => {
      const A =
        (s && (s.message || s.error_description)) || String(s || "Lỗi mạng");
      return /chars_name|duplicate key/i.test(A)
        ? "Tên nhân vật đã có người dùng — hãy đổi tên (thẻ Nhân vật ✏)"
        : /Invalid login/i.test(A)
          ? "Sai tên đăng nhập hoặc mật khẩu"
          : /already registered|already exists/i.test(A)
            ? "Tên đăng nhập đã có người dùng"
            : A;
    },
    nh = "jxidle_sbvia",
    Jb = (s) =>
      /timeout|timed out|fetch|network|503|502|504|520|522|524|544|too many|overload|connection|failed to/i.test(
        String((s && (s.message || s.code || s.status)) || s),
      ),
    I2 = () => Date.now() < (k.holdUntil || 0),
    no = () =>
      r
        ? [
            r.lvl,
            Math.floor(r.xp || 0),
            r.gold,
            r.knb | 0,
            (r.inv || []).length,
            r.uid,
            (r.rw && r.rw.stat && r.rw.stat.towerBest) | 0,
          ].join("|")
        : "",
    v0 = async (s) => {
      if (window.MAINT) throw new Error("Máy chủ đang bảo trì");
      try {
        const A = await s3(),
          n = await s(A);
        if (n && n.error) throw n.error;
        return ((k.failN = 0), (k.holdUntil = 0), n);
      } catch (A) {
        throw (Hb(A), new Error(Ub(A)));
      }
    },
    to = "jxCheat",
    zn = async () => {
      Date.now() - k.lastChar > 6e4 && (await hn());
    },
    th = (s, A) => JSON.stringify({ v: 2, d: s, k: A || null }),
    eh = () => {
      try {
        return localStorage.getItem(n1);
      } catch {
        return null;
      }
    },
    Wb = (s) => {
      try {
        const A = localStorage.getItem(UA(s)),
          n = A && QA(A);
        return n && n.ok && n.state && n.state.fac ? n.state : null;
      } catch {
        return null;
      }
    },
    eo = (s) => fc(JSON.stringify({ game: "jxidle", data: s })),
    S2 = (s) => !!(s && s.netOwner && k.user && s.netOwner !== k.user.id),
    l8 = (s) =>
      s ? ((s.rw && s.rw.stat && s.rw.stat.reborn) | 0) * 200 + (s.lvl | 0) : 0,
    ao = (s, A) => !s || !s.cloudAt || A > s.cloudAt + 5e3,
    j1 = (s, A, n, t) =>
      `left:${s / 3.08}%;top:${A / 1.97}%;width:${n / 3.08}%;height:${t / 1.97}%`,
    ah = (s) => {
      try {
        if (s === void 0) return localStorage.getItem("jx_lu") || "";
        s ? localStorage.setItem("jx_lu", s) : localStorage.removeItem("jx_lu");
      } catch {
        return "";
      }
      return "";
    },
    Zb = 5e6,
    Ay = 5e7,
    gx = 3,
    o3 = (s) => s && s.cur === "knb",
    c8 = (s) => (o3(s) ? `${X(s.price)} KNB` : `${j(s.price)} lượng`),
    so = (s) => (o3(s) ? (r.knb | 0) >= s.price : r.gold >= s.price),
    mx = (s) => !!s && ((s.r | 0) >= 4 || !!s.set),
    ux = (s) => (s.set && Re(s) >= 0 ? Ay : Zb),
    io = (s) => (I[s] ? I[s].n : s || ""),
    l3 = (s) =>
      T1(s)
        .replace(" bad", "")
        .replace(/ title="[^"]*"/, ""),
    c3 = [],
    ny = 2 * 36e5,
    ty = (s) => {
      const A = Math.max(
        0,
        Math.round((new Date(s.created).getTime() + ny - Date.now()) / 6e4),
      );
      return A >= 60
        ? `còn ${Math.floor(A / 60)} giờ ${A % 60} phút`
        : `còn ${A} phút`;
    },
    t1 = async (s, A, n) => {
      s && (s.disabled = !0);
      try {
        const t = await A();
        n && n(t);
      } catch (t) {
        (y(t.message || String(t)), s && (s.disabled = !1));
      }
    },
    ey = 10,
    d8 = [
      ["lvl", "Cấp"],
      ["tower", "Tháp"],
      ["bosses", "Trùm đã hạ"],
    ],
    ay = [
      ["weapon", "Vũ khí"],
      ["armor", "Áo"],
      ["helm", "Mũ"],
      ["belt", "Đai lưng"],
      ["boot", "Giày"],
      ["cuff", "Hộ uyển"],
      ["amulet", "Dây chuyền"],
      ["ring", "Nhẫn"],
      ["pendant", "Ngọc bội"],
      ["horse", "Ngựa"],
    ],
    sy = [
      ["hkmp", "Hoàng Kim Môn Phái"],
      ["hk", "Hoàng Kim bộ chung"],
      ["bk", "Bạch Kim"],
      ["tim", "Tím"],
      ["hiem", "Hiếm"],
      ["xanh", "Xanh"],
      ["trang", "Thường"],
    ],
    sh = function () {
      const A = c.P;
      if (!A || !r.fac) return null;
      const n = (r.mainLock ? A.main : A.bestAuto || A.main) || {},
        t = n.parts || {};
      let e = "phys",
        a = -1;
      for (const o in t) t[o] > a && ((a = t[o]), (e = o));
      const i = q0.reduce((o, l) => o + (A.res[l] || 0), 0) / q0.length;
      return {
        v: 1,
        f: r.fac,
        sx: r.sex ? 1 : 0,
        l: r.lvl | 0,
        hp: Math.round(A.life),
        def: Math.round(A.def),
        res: Math.round(i),
        dps: Math.round(n.dps || 0),
        mel: n.melee === !1 ? 0 : 1,
        se: A.series | 0,
        el: e,
        sk: n.n ? String(n.n).slice(0, 24) : "",
        j: c.jx
          ? {
              sx: c.jx.sx,
              r: Object.assign({}, c.jx.rows, {
                horse:
                  r.eq && r.eq.horse && typeof m5 == "function"
                    ? m5(r.eq.horse)
                    : -1,
              }),
              ride: r.eq && r.eq.horse ? 1 : 0,
            }
          : null,
        id: n.id | 0,
        L: n.L | 0,
        nm: n.nMis | 0,
        rt: Math.round((n.rate || 1) * 100) / 100,
        pf: iy(t),
        stn: Math.round(n.stun || 0),
        ct: Math.round((n.coldT || 0) * 10) / 10,
        ...ry(),
      };
    },
    iy = function (A) {
      const n = Object.values(A).reduce((e, a) => e + (a > 0 ? a : 0), 0) || 1,
        t = {};
      for (const e in A)
        A[e] > 0 && (t[e] = Math.round((A[e] / n) * 100) / 100);
      return t;
    },
    ry = function () {
      const A = [],
        n = [];
      let t = null;
      if (typeof V1 != "function") return { bf: A, cu: n, hl: t };
      for (const e in r.sk || {}) {
        const a = T[e];
        if (!a || !r.sk[e]) continue;
        const i = V1(a),
          o = q3(e);
        if (i === "aura" && !(r.auraOff || {})[e])
          m8.has(+e) && A.push([+e, o]);
        else if (i === "buff") {
          if (!m8.has(+e)) continue;
          const l = $t(a, o);
          if (l >= 5) A.push([+e, o]);
          else {
            const d = P0(a, "lifereplenish_v", o);
            d && d[0] > 0 && (t = [+e, Math.round(d[0] * l * 2)]);
          }
        } else
          i === "curse" && n.push([+e, o, Math.round(Math.min(60, $t(a, o)))]);
      }
      return { bf: A.slice(0, 10), cu: n.slice(0, 4), hl: t };
    },
    ro = function (A) {
      return !!(
        A &&
        A.v === 1 &&
        I[A.f] &&
        Number.isFinite(+A.hp) &&
        Number.isFinite(+A.dps) &&
        +A.hp > 0
      );
    },
    mn = async function (A) {
      if (!g8() || L.busy || document.hidden) return;
      L.nm !== Qn() &&
        ((L.nm = Qn()),
        (L.pid = null),
        (L.me = null),
        (L.mem = []),
        (L.snaps = {}),
        (L.inv = []),
        (L.closed = !1),
        (c.allies = []),
        (A = !0),
        d3(),
        co());
      const n = Date.now();
      if (!(!A && !L.dirty && n - (L.lastP || 0) < (L.wait ? 2e4 : vy))) {
        ((L.busy = !0), (L.lastP = n), (L.dirty = !1));
        try {
          await oy();
        } catch (t) {
          fo(t) && (L.off = !0);
        } finally {
          L.busy = !1;
        }
      }
    },
    oy = async function () {
      const A = !!L.pid && (L.wait || Date.now() - (L.snapAt || 0) > 6e4),
        t =
          (await wn((i) => i.rpc("party_state", { p_me: r.name, p_full: A })))
            .data || {};
      for (const i of t.inv || [])
        L.seen.has(i.id) ||
          (L.seen.add(i.id),
          r.ptRefuse
            ? (wn((o) => o.rpc("party_answer", { p_id: i.id, p_ok: !1 })).catch(
                () => {},
              ),
              M(
                `<span class="dim">👥 Tự từ chối lời mời tổ đội của ${D(i.from_name)}.</span>`,
              ))
            : L.inv.push(i));
      co();
      const e = L.mem.map((i) => i.name);
      if (!t.pid) {
        (L.pid &&
          M('<span class="dim">👥 Tổ đội đã giải tán / bạn đã rời tổ.</span>'),
          (L.pid = null),
          (L.me = null),
          (L.mem = []),
          (L.wait = !1),
          lo(),
          d3());
        return;
      }
      (t.pid !== L.pid && (L.snaps = {}),
        (L.pid = t.pid),
        (L.closed = !!t.closed),
        (L.mem = (t.mem || [])
          .slice(0, ve)
          .map((i) => ({
            owner: be(i.name),
            uid: i.owner,
            name: i.name,
            leader: !!i.leader,
            at: i.at,
          }))),
        (L.me = L.mem.find((i) => i.owner === Qn()) || { leader: !!t.leader }));
      const a = {};
      for (const i of t.mem || []) {
        const o = be(i.name);
        if (o === Qn()) continue;
        const l = L.snaps[o] || {};
        a[o] = {
          name: i.name,
          lvl: i.lvl,
          fac: i.fac,
          updated: i.updated,
          snap: A ? i.snap : l.snap,
        };
      }
      ((L.snaps = a), A && (L.snapAt = Date.now()));
      for (const i of L.mem)
        i.owner !== Qn() &&
          !e.includes(i.name) &&
          e.length &&
          (M(`👥 <b>${D(i.name)}</b> đã vào tổ đội.`),
          lh(`${i.name} đã vào tổ đội`));
      for (const i of e)
        L.mem.some((o) => o.name === i) ||
          (M(`<span class="dim">👥 ${D(i)} đã rời tổ đội.</span>`),
          lh(`${i} đã rời tổ đội`));
      (L.mem.length > 1 &&
        Date.now() - (L.mySnap || 0) > 12e4 &&
        typeof hn == "function" &&
        ((L.mySnap = Date.now()), (k.lastChar = 0), hn(!0).catch(() => {})),
        (L.wait = L.mem.some(
          (i) =>
            i.owner !== Qn() && !ro(L.snaps[i.owner] && L.snaps[i.owner].snap),
        )),
        L.wait && !A && (L.dirty = !0),
        +t.chat > (e0.last || 0) &&
          typeof N2 == "function" &&
          ((e0.at = 0), setTimeout(() => N2(!0), 0)),
        lo(),
        d3());
    },
    oo = async function (A) {
      if (un) {
        y("Tính năng Tổ đội đang tạm đóng");
        return;
      }
      if (!g8()) {
        y(
          L.off
            ? "Máy chủ chưa bật Tổ đội (TO_DOI.sql)"
            : "Cần đăng nhập Giang hồ online",
        );
        return;
      }
      try {
        (typeof zn == "function" && (await zn()),
          await wn((n) => n.rpc("party_invite", { p_from: r.name, p_to: A })),
          y(`Đã mời ${A} vào tổ đội — chờ đồng ý`),
          M(
            `👥 Đã gửi lời mời tổ đội tới <b>${D(A)}</b> (hết hạn sau 5 phút).`,
          ),
          (L.dirty = !0),
          setTimeout(() => mn(!0), 25e3));
      } catch (n) {
        fo(n)
          ? ((L.off = !0), y("Máy chủ chưa bật Tổ đội (TO_DOI.sql)"))
          : y(n.message);
      }
    },
    f8 = async function (A, n) {
      ((L.inv = L.inv.filter((t) => t.id !== A.id)), co());
      try {
        const t = await wn((e) =>
          e.rpc("party_answer", { p_id: A.id, p_ok: n }),
        );
        (n && t.data === "ok"
          ? (y(`Đã vào tổ đội của ${A.from_name}`),
            M(`👥 Vào tổ đội cùng <b>${D(A.from_name)}</b>.`))
          : n && y("Lời mời đã hết hạn"),
          await mn(!0));
      } catch (t) {
        y(t.message);
      }
    },
    ly = async function () {
      try {
        (await wn((A) => A.rpc("party_leave", { p_me: r.name })),
          y("Đã rời tổ đội"),
          await mn(!0));
      } catch (A) {
        y(A.message);
      }
    },
    cy = async function (A) {
      try {
        (await wn((n) => n.rpc("party_kick", { p_me: r.name, p_name: A.name })),
          y(`Đã mời ${A.name} ra khỏi tổ`),
          await mn(!0));
      } catch (n) {
        y(n.message);
      }
    },
    dy = async function (A) {
      try {
        (await wn((n) =>
          n.rpc("party_appoint", { p_me: r.name, p_name: A.name }),
        ),
          y(`${A.name} làm đội trưởng`),
          M(`👥 Bổ nhiệm <b>${D(A.name)}</b> làm đội trưởng.`),
          await mn(!0));
      } catch (n) {
        y(n.message);
      }
    },
    fy = async function () {
      try {
        (await wn((A) => A.rpc("party_disband", { p_me: r.name })),
          y("Đã giải tán tổ đội"),
          await mn(!0));
      } catch (A) {
        y(A.message);
      }
    },
    hy = async function (A) {
      try {
        (await wn((n) => n.rpc("party_close", { p_me: r.name, p_closed: !!A })),
          (L.closed = !!A),
          y(A ? "Đã đóng tổ: không nhận thêm người" : "Đã mở tổ"),
          await mn(!0));
      } catch (n) {
        y(n.message);
      }
    },
    lo = function () {
      const A = c.allies || [],
        n = [];
      for (const t of L.mem) {
        if (typeof k > "u" || !k.user || t.owner === Qn()) continue;
        const e = L.snaps[t.owner];
        if (
          !e ||
          !ro(e.snap) ||
          Date.now() - new Date(e.updated).getTime() > fh
        )
          continue;
        const a = e.snap,
          i = A.find((d) => d.owner === t.owner) || {
            owner: t.owner,
            x: b.x - 40,
            y: b.y + 20,
            t: 0,
            atkT: Math.random(),
            dir: 0,
          },
          o = C(+a.hp, 1, 1e9),
          l = (d) =>
            Array.isArray(d)
              ? d
                  .filter((h) => Array.isArray(h) && T[h[0]])
                  .map((h) => h.map((g) => +g || 0))
              : [];
        (Object.assign(i, {
          id: T[a.id] ? +a.id : gy(a.f),
          L: C(+a.L | 0, 1, 60),
          nm: C(+a.nm | 0, 0, 16),
          rt: C(+a.rt || 1, 0.3, 5),
          pf: a.pf && typeof a.pf == "object" ? a.pf : {},
          stn: C(+a.stn || 0, 0, 100),
          ct: C(+a.ct || 0, 0, 10),
          bf: l(a.bf).slice(0, 10),
          cu: l(a.cu).slice(0, 4),
          hl:
            Array.isArray(a.hl) && T[a.hl[0]] && m8.has(+a.hl[0])
              ? [+a.hl[0], C(+a.hl[1] || 0, 0, 1e7)]
              : null,
        }),
          Object.assign(i, {
            n: e.name,
            f: a.f,
            s: a.sx,
            l: C(+a.l | 0, 1, 999),
            hpMax: o,
            def: Math.max(0, +a.def || 0),
            res: C(+a.res || 0, 0, 95),
            dps: C(+a.dps || 0, 0, 1e9),
            mel: a.mel !== 0,
            se: C(+a.se | 0, 0, 4),
            el: ["phys", "cold", "fire", "light", "poison"].includes(a.el)
              ? a.el
              : "phys",
            J: my(a.j),
          }),
          a.L || (i.L = Math.min(20, Math.max(1, Math.floor((i.l - 80) / 3)))),
          i.J && (i.J.mg = !!(T[i.id] && !T[i.id].phys)),
          i.hp == null && (i.hp = o),
          (i.hp = Math.min(i.hp, o)),
          n.push(i));
      }
      c.allies = n;
    },
    gy = function (A) {
      const n = I[A];
      if (!n) return 0;
      let t = 0,
        e = -1;
      for (const a of n.skills) {
        const i = T[a];
        i &&
          i.enemy &&
          !i.aura &&
          (i.tier || i.req || 0) > e &&
          ((e = i.tier || i.req || 0), (t = a));
      }
      return t;
    },
    my = function (A) {
      if (
        !A ||
        typeof h0 > "u" ||
        !h0 ||
        (A.sx !== "m" && A.sx !== "f") ||
        !A.r
      )
        return null;
      const n = (l) => (Number.isInteger(l) ? l : -1),
        t = {
          helm: n(A.r.helm),
          armor: n(A.r.armor),
          weapon: Math.max(0, n(A.r.weapon)),
          horse: n(A.r.horse),
        },
        e = (h0.wnames[A.sx] || [])[t.weapon] || "空手",
        a = h0.assoc[A.sx] || {},
        i = a[e] || a.空手;
      if (!i) return null;
      const o = t.horse >= 0 && A.ride && i[1] ? 1 : 0;
      return (
        o || (t.horse = -1),
        { sx: A.sx, rows: t, asc: i[o] || i[0], ride: o }
      );
    },
    ih = function (A) {
      const n = c.allies;
      if (!n || !n.length || !L2()) return;
      const t = M1();
      {
        const e =
          L2() +
          ":" +
          n
            .filter((a) => !a.dead)
            .map((a) => a.owner)
            .join(",");
        e !== L.bk && ((L.bk = e), (c.dirty = !0));
      }
      n.forEach((e, a) => {
        if (((e.t += A), e.dead)) {
          ((e.resp -= A),
            e.resp <= 0 &&
              ((e.dead = !1),
              (e.hp = e.hpMax),
              (e.x = b.x - 40),
              (e.y = b.y + 20),
              c.quiet || M(`<span class="dim">👥 ${D(e.n)} hồi sinh.</span>`)));
          return;
        }
        const i = t.filter((m) => F0(b, m) < Vd);
        i.length || (e.hp = Math.min(e.hpMax, e.hp + e.hpMax * 0.03 * A));
        const o = i.sort(
            (m, w) =>
              Math.hypot(m.x - e.x, m.y - e.y) -
              Math.hypot(w.x - e.x, w.y - e.y),
          )[0],
          l = (a / Math.max(1, n.length)) * Math.PI * 2,
          d = { x: b.x + Math.cos(l) * 46, y: b.y + Math.sin(l) * 22 },
          h = o || d,
          g = o ? (e.mel ? o.r + 18 : 260) : 8,
          f = Math.hypot(h.x - e.x, h.y - e.y);
        if (((e.mv = f > g), e.mv)) {
          const m =
              150 *
              (typeof i2 == "function" ? i2() : 1.3) *
              1.15 *
              (e.J && e.J.ride ? 1.25 : 1) *
              A,
            w = e.x,
            p = e.y;
          if (
            (typeof Ce == "function" && !(e.free > 0) && Ce(e, h.x, h.y, m),
            Math.hypot(e.x - w, e.y - p) < 0.05)
          ) {
            const P = Math.min(1, m / f);
            ((e.x += (h.x - e.x) * P), (e.y += (h.y - e.y) * P), (e.free = 1));
          } else e.free > 0 && (e.free -= A);
          Math.hypot(e.x - w, e.y - p) > 0.5 && (e.dir = On(e.x - w, e.y - p));
        }
        if (
          (Math.hypot(b.x - e.x, b.y - e.y) > 600 && ((e.x = d.x), (e.y = d.y)),
          (e.atkT -= A),
          wy(e, t, A),
          o && !e.mv && e.atkT <= 0)
        ) {
          const m = C(1 / (e.rt || 1), 0.35, 2);
          ((e.atkT = m),
            (e.dir = On(o.x - e.x, o.y - e.y)),
            (e.atD = C(
              (typeof pa == "function" && e.gk && pa(e.gk, "at")) || 0.45,
              0.25,
              Math.max(0.3, m * 0.95),
            )),
            (e.atT = e.atD),
            (e.hurtT = 0));
          let w = e.dps * m * A0(0.85, 1.15),
            p = 0;
          const P = Object.keys(e.pf).length ? e.pf : { [e.el]: 1 };
          for (const v in P) {
            let H = w * P[v];
            if (v === "poison") {
              uy(o, n2(H, "poison", e.se, o.series, o.res, 75, 0));
              continue;
            }
            p += n2(H, v, e.se, o.series, o.res, 75, 0);
          }
          if (
            (a1(e.se, o.series)
              ? (p *= 1 + it)
              : a1(o.series, e.se) && (p *= 1 - it),
            (p = Math.max(1, p)),
            (o.hp -= p),
            (o.hitT = 0.1),
            (o.aggro = !0),
            (!o.tgtA || Math.random() < 0.35) && (o.tgtA = e),
            P.cold && !(o.slowT > 0) && (o.slowT = e.ct || Y4),
            P.light &&
              Math.random() < Wl &&
              (o.stun = Math.max(o.stun || 0, Zl)),
            e.stn &&
              Math.random() * 100 < e.stn &&
              (o.stun = Math.max(o.stun || 0, 0.8)),
            e.id && typeof h5 == "function" && h5({ id: e.id }, o),
            !c.quiet &&
              (EA(o.x, o.y - o.r - 6, X(p), "#8fe36a", 11),
              e.id && typeof Rs == "function"))
          )
            try {
              Rs(e, o, {
                id: e.id,
                L: e.L,
                nMis: e.nm,
                parts: P,
                ox: e.x,
                oy: e.y,
              });
            } catch {}
        }
        (e.atT > 0 && (e.atT -= A), e.hurtT > 0 && (e.hurtT -= A));
      });
    },
    uy = function (A, n) {
      const t = A.poison > 0 ? A.poisonDmg * A.poison : 0;
      ((A.poisonDmg = (t + n) / Math.max(Gt, A.poison > 0 ? A.poison : 0)),
        (A.poison = Math.max(Gt, A.poison > 0 ? A.poison : 0)));
    },
    wy = function (A, n, t) {
      if ((A.supT = (A.supT || 0) - t) > 0) return;
      A.supT = 0.5;
      const e = qe(),
        a = n.length > 0;
      if (A.hl && a && (A.hlCd || 0) <= e) {
        const i = [{ me: !0, hp: c.life, max: c.P.life }]
          .concat(
            (c.allies || [])
              .filter((o) => !o.dead)
              .map((o) => ({ x: o, hp: o.hp, max: o.hpMax })),
          )
          .filter((o) => o.hp < o.max * 0.6);
        if (i.length) {
          A.hlCd = e + 8;
          for (const o of i)
            o.me
              ? t2(A.hl[1], !0)
              : (o.x.hp = Math.min(o.x.hpMax, o.x.hp + A.hl[1]));
          c.quiet || EA(A.x, A.y - 60, "✚ " + T[A.hl[0]].n, "#8f8", 11);
        }
      }
      if (!(!a || !A.cu || !A.cu.length))
        for (const [i, o, l] of A.cu) {
          const h = n
            .filter((f) => !((f.curse || {})[i] > e))
            .sort(
              (f, m) =>
                (m.cls === "boss") - (f.cls === "boss") ||
                (m.cls === "elite") - (f.cls === "elite") ||
                Math.hypot(f.x - A.x, f.y - A.y) -
                  Math.hypot(m.x - A.x, m.y - A.y),
            )[0];
          if (
            !h ||
            Math.hypot(h.x - A.x, h.y - A.y) > 420 ||
            (h.cls === "normal" && n.length < 3)
          )
            continue;
          const g = (f) => {
            (((f.curse || (f.curse = {}))[i] = e + Math.max(3, l || 10)),
              ((f.curseL || (f.curseL = {}))[i] = o));
          };
          g(h);
          for (const f of n)
            f !== h && Math.hypot(f.x - h.x, f.y - h.y) < 120 && g(f);
          !c.quiet &&
            typeof r2 == "function" &&
            r2({ id: i, ox: A.x, oy: A.y });
          break;
        }
    },
    rh = function () {
      if (!L2() || !c.allies) return [];
      const A = {};
      for (const n of c.allies)
        if (!n.dead)
          for (const [t, e] of n.bf || [])
            m8.has(+t) &&
              !(r.sk && r.sk[t]) &&
              (!A[t] || A[t] < e) &&
              (A[t] = e);
      return Object.entries(A).map(([n, t]) => [+n, t]);
    },
    py = function (A, n) {
      if (Math.random() * 100 >= Qt(n.ar, A.def)) {
        c.quiet || EA(A.x, A.y - 30, "Né", "#9cf", 10);
        return;
      }
      let t = n.dmg * A0(0.8, 1.2) * (1 - Math.min(75, A.res) / 100);
      if (
        (a1(n.series, A.se)
          ? (t *= 1 + it)
          : a1(A.se, n.series) && (t *= 1 - it),
        (A.hp -= t),
        c.quiet || EA(A.x + A0(-8, 8), A.y - 34, "-" + X(t), "#ff8a7a", 10),
        !(A.atT > 0) && Math.random() < 0.3 && (A.hurtT = 0.25),
        A.hp <= 0)
      ) {
        ((A.hp = 0), (A.dead = !0), (A.resp = dh));
        for (const e of c.enemies) e.tgtA === A && (e.tgtA = null);
        c.quiet ||
          M(
            `<span class="dim">👥 ${D(A.n)} trọng thương, hồi sinh sau ${dh} giây.</span>`,
          );
      }
    },
    Dy = function (A, n, t) {
      ((A.fillStyle = "#0007"),
        A.beginPath(),
        A.ellipse(n.x, n.y, 16, 6, 0, 0, 7),
        A.fill());
      const e = n.atT > 0 ? "at" : n.hurtT > 0 ? "hurt" : n.mv ? "run" : "st",
        a =
          e === "at"
            ? (n.atD || 0.45) - n.atT
            : e === "hurt"
              ? 0.25 - n.hurtT
              : n.t,
        i = yt(n.f, n.s);
      n.gk = i && i.anim;
      let o = !1;
      (n.J &&
        typeof lt == "function" &&
        ((o = lt(e, n.dir || 0, a, n.x, n.y, Cn, 1, n.gk, n.J)),
        !o &&
          e !== "st" &&
          (o = lt(
            n.mv ? "run" : "st",
            n.dir || 0,
            n.t,
            n.x,
            n.y,
            Cn,
            1,
            n.gk,
            n.J,
          ))),
        !o &&
          i &&
          i.anim &&
          (o =
            o2(i.anim, e, n.dir || 0, a, n.x, n.y, Cn) ||
            o2(i.anim, "st", n.dir || 0, n.t, n.x, n.y, Cn)),
        o ||
          ((A.fillStyle = m0[I[n.f].series]),
          A.beginPath(),
          A.arc(n.x, n.y - 20, 12, 0, 7),
          A.fill()),
        zs(
          n.x,
          n.y - (o ? Math.min(o, 90) * 0.9 : 52) - 6,
          `${n.n} · Lv${n.l}`,
          "#7fe36a",
          11,
          n.hp / n.hpMax,
          "#5fd35a",
        ));
    },
    oh = function (A) {
      const n = A.owner === Qn(),
        t = (c.allies || []).find((o) => o.owner === A.owner),
        e = L.snaps[A.owner],
        a = n
          ? c.P
            ? c.life / c.P.life
            : 1
          : t
            ? t.dead
              ? 0
              : t.hp / t.hpMax
            : 0,
        i = n
          ? ""
          : t
            ? t.dead
              ? `hồi sinh ${Math.ceil(t.resp)}s`
              : ""
            : by(e);
      return {
        me: n,
        a: t,
        c: e,
        hp: C(a, 0, 1),
        st: i,
        fac: n ? r.fac : e && e.fac,
        lv: n ? r.lvl : e ? e.lvl : "?",
      };
    },
    d3 = function s() {
      let A = document.getElementById("ptBox");
      if (!L.pid || !L.mem.length) {
        A && A.remove();
        return;
      }
      A ||
        ((A = document.createElement("div")),
        (A.id = "ptBox"),
        document.body.appendChild(A),
        (A.onclick = (e) => {
          const a = e.target.closest("[data-ptn]");
          if (e.target.closest(".ptsh")) {
            ((r.ptHide = !r.ptHide), s());
            return;
          }
          a && typeof gn == "function" && gn(a.dataset.ptn);
        }));
      const n = !!r.ptHide,
        t =
          `<div class="pth"><button class="ptsh${n ? " off" : ""}" title="${n ? "Hiện" : "Ẩn"} khung tổ đội"></button><span>Tổ đội ${L.mem.length}/${ve}${L.closed ? " 🔒" : ""}</span></div>` +
          (n
            ? ""
            : L.mem
                .map((e) => {
                  const a = oh(e);
                  return `<div class="ptf${a.me ? " me" : ""}${a.a && a.a.dead ? " dead" : ""}" data-ptn="${D(e.name)}" title="${D(e.name)} · Lv${a.lv}"><i class="fi" style="background-position:${(mh(a.fac) * 100) / 11}% 0"></i>${e.leader ? '<i class="fl"></i>' : ""}
        <span class="nm">${D(e.name)}</span><small class="lv">${a.lv}</small><em class="lf"><u style="width:${Math.round(a.hp * 100)}%"></u></em>${a.st ? `<small class="st">${D(a.st)}</small>` : ""}</div>`;
                })
                .join(""));
      t !== L.boxH && ((L.boxH = t), (A.innerHTML = t));
    },
    co = function () {
      typeof f3 == "function" && f3();
      let A = document.getElementById("ptInv");
      L.inv = L.inv.filter(
        (t) => Date.now() - new Date(t.created).getTime() < 5 * 6e4,
      );
      const n = L.inv[0];
      if (!n) {
        A && A.remove();
        return;
      }
      if (
        (A ||
          ((A = document.createElement("div")),
          (A.id = "ptInv"),
          document.body.appendChild(A)),
        (A.innerHTML = `<div>👥 <b>${D(n.from_name)}</b> mời bạn vào tổ đội</div><div class="btnrow"><button class="btn sm" id="ptY">Đồng ý</button><button class="btn sm" id="ptN">Từ chối</button></div>`),
        (u("#ptY").onclick = () => f8(n, !0)),
        (u("#ptN").onclick = () => f8(n, !1)),
        typeof i0 == "function")
      )
        try {
          i0("learn");
        } catch {}
    },
    Py = function () {
      const A = u("#giftBtn");
      if (!A || u("#ptBtn")) return;
      const n = document.createElement("button");
      ((n.id = "ptBtn"),
        (n.title = "Tổ đội"),
        (n.textContent = "👥"),
        A.parentNode.insertBefore(n, A),
        (n.onclick = () => {
          (typeof i0 == "function" && i0("click"), h3());
        }),
        f3());
    },
    f3 = function () {
      const A = L.inv.length,
        n = typeof g0 != "function" || g0();
      for (const e of [u("#ptBtn"), u("#u20pt")])
        e &&
          (e.classList.toggle("on", A > 0),
          (e.dataset.n = A || ""),
          e.classList.toggle("in", !!L.pid),
          (e.style.display = n ? "" : "none"));
      {
        const e = u("#tabRide");
        e && e.classList.toggle("inv", A > 0);
      }
      const t = document.querySelector('#u20menu [data-u="team"]');
      if (t) {
        const e = t.querySelector(".dot");
        (e && e.classList.toggle("on", A > 0),
          (t.title = L.pid ? `Tổ đội (${L.mem.length}/${ve})` : "Tổ đội"),
          t.classList.toggle("pt", !!L.pid));
      }
    },
    h3 = function s() {
      if (un) {
        y("Tính năng Tổ đội đang tạm đóng");
        return;
      }
      const A = !!(L.me && L.me.leader),
        n = L.mem.length,
        t = g8(),
        e = (m) => (typeof I < "u" && I[m] && I[m].n) || "",
        a = t
          ? ""
          : `<div class="ptmsg">${L.off ? "⚠ Máy chủ chưa bật Tổ đội." : "🌐 Cần đăng nhập Giang hồ online để lập tổ đội."}</div>`,
        i = L.inv.length
          ? '<div class="pth2">📨 Lời mời đang chờ</div>' +
            L.inv
              .map(
                (m) =>
                  `<div class="ptm"><span class="nm"><b>${D(m.from_name)}</b> mời bạn vào tổ</span><button class="btn sm on" data-pty="${m.id}">Đồng ý</button><button class="btn sm" data-ptn2="${m.id}">Từ chối</button></div>`,
              )
              .join("")
          : "",
        o = n
          ? L.mem
              .map((m) => {
                const w = oh(m),
                  p = e(w.fac);
                return `<div class="ptm${w.me ? " me" : ""}"><i class="fi" style="background-position:${(mh(w.fac) * 100) / 11}% 0"></i><span class="nm">${m.leader ? '<b class="ld" title="Đội trưởng">★</b> ' : ""}${D(m.name)} ${w.me ? '<small class="dim">(bạn)</small>' : w.st ? `<small class="dim">${D(w.st)}</small>` : ""}<br><small>Lv${w.lv}${p ? " · " + D(p) : ""}</small><i style="width:${Math.round(w.hp * 100)}%"></i></span>
        ${w.me ? "" : `<button class="btn sm" data-ptv="${D(m.name)}">Xem</button>`}${A && !w.me ? `<button class="btn sm" data-ptap="${D(m.owner)}" title="Chuyển đội trưởng">Bổ nhiệm</button><button class="btn sm" data-ptk2="${D(m.owner)}">Mời ra</button>` : ""}</div>`;
              })
              .join("")
          : `<div class="ptmsg dim">Nhân vật <b>${D(r.name || "")}</b> chưa có tổ đội. Mời người chơi bằng tên bên dưới, hoặc bấm tên trên kênh chat → <b>👥 Mời tổ đội</b>.</div>`,
        d =
          t && n < ve && (!n || A) && !L.closed
            ? '<div class="ptadd"><input id="ptName" maxlength="20" placeholder="Tên nhân vật cần mời"><button class="btn sm on" id="ptGo">Mời</button></div>'
            : n && !A
              ? '<div class="ptmsg dim">Chỉ đội trưởng mới mời được người vào tổ.</div>'
              : n && L.closed
                ? '<div class="ptmsg dim">🔒 Tổ đang đóng — mở tổ để mời thêm.</div>'
                : "",
        h = ho(),
        g =
          n > 1
            ? `<div class="ptmsg">📈 Kinh nghiệm <b>+${Math.round((h - 1) * 100)}%</b> (mỗi đồng đội +15%, chênh cấp nhận ít hơn) · bùa lợi của đồng đội cộng cho cả tổ</div>`
            : "",
        f =
          (A && n
            ? `<button class="btn sm" id="ptClose">${L.closed ? "🔓 Mở tổ" : "🔒 Đóng tổ"}</button><button class="btn sm" id="ptDis">Giải tán</button>`
            : "") +
          (n ? '<button class="btn sm" id="ptLeave">Rời tổ đội</button>' : "") +
          '<button class="btn sm" id="ptRef">Làm mới</button>';
      J(
        `<div id="ptMgr"><h3>👥 Tổ đội ${n ? `<small>${n}/${ve}${L.closed ? " · đang đóng" : ""}</small>` : ""}</h3>${a}${i}<div class="pth2">Thành viên</div>${o}${g}${d}
    <div class="btnrow">${f}</div>
    <label class="ptchk"><input type="checkbox" id="ptRefuse"${r.ptRefuse ? " checked" : ""}> Tự từ chối lời mời tổ đội</label>
    <div class="dim ptnote">Tổ đội theo nhân vật · tối đa ${ve} người · lời mời hết hạn sau 5 phút · đồng đội không vào Thông Thiên Tháp / Boss tuần.</div></div>`,
        () => {
          const m = (v) => u("#ptMgr").querySelectorAll(v),
            w = (v) => L.mem.find((H) => H.owner === v);
          (m("[data-pty]").forEach(
            (v) =>
              (v.onclick = async () => {
                const H = L.inv.find((_) => String(_.id) === v.dataset.pty);
                H && (await f8(H, !0), s());
              }),
          ),
            m("[data-ptn2]").forEach(
              (v) =>
                (v.onclick = async () => {
                  const H = L.inv.find((_) => String(_.id) === v.dataset.ptn2);
                  H && (await f8(H, !1), s());
                }),
            ),
            m("[data-ptv]").forEach(
              (v) =>
                (v.onclick = () => {
                  typeof gn == "function" && gn(v.dataset.ptv);
                }),
            ),
            m("[data-ptk2]").forEach(
              (v) =>
                (v.onclick = async () => {
                  const H = w(v.dataset.ptk2);
                  H &&
                    (await u8(`Mời ${H.name} ra khỏi tổ đội?`)) &&
                    (await cy(H), s());
                }),
            ),
            m("[data-ptap]").forEach(
              (v) =>
                (v.onclick = async () => {
                  const H = w(v.dataset.ptap);
                  H &&
                    (await u8(`Bổ nhiệm ${H.name} làm đội trưởng?`)) &&
                    (await dy(H), s());
                }),
            ));
          const p = u("#ptGo");
          if (p) {
            const v = async () => {
              const H = (u("#ptName").value || "").trim();
              if (H) {
                if (r.name && H.toLowerCase() === r.name.toLowerCase()) {
                  y("Không tự mời chính mình");
                  return;
                }
                (await oo(H), s());
              }
            };
            ((p.onclick = v),
              (u("#ptName").onkeydown = (H) => {
                H.key === "Enter" && v();
              }));
          }
          const P = (v, H) => {
            const _ = u(v);
            _ && (_.onclick = H);
          };
          (P("#ptLeave", async () => {
            (await u8("Rời tổ đội?")) && (await ly(), s());
          }),
            P("#ptDis", async () => {
              (await u8("Giải tán tổ đội? Mọi thành viên sẽ rời tổ.")) &&
                (await fy(), s());
            }),
            P("#ptClose", async () => {
              (await hy(!L.closed), s());
            }),
            P("#ptRef", async () => {
              (await mn(!0), s());
            }),
            (u("#ptRefuse").onchange = (v) => {
              ((r.ptRefuse = !!v.target.checked),
                typeof B == "function" && B(),
                y(
                  r.ptRefuse
                    ? "Sẽ tự từ chối lời mời tổ đội"
                    : "Nhận lời mời tổ đội",
                ));
            }));
        },
      );
    },
    lh = function (A) {
      (e0.msgs.push({
        id: "sys" + Date.now() + Math.random(),
        sys: !0,
        msg: A,
        ts: Date.now(),
      }),
        e0.msgs.length > 80 && e0.msgs.shift(),
        h8());
    },
    h8 = function () {
      (typeof yA == "function" && yA(),
        typeof j2 == "function" && typeof oA < "u" && oA === "party" && j2(),
        f3());
    },
    N2 = async function (A) {
      if (!L.pid || !g8() || e0.off || e0.busy) return;
      e0.pid !== L.pid &&
        ((e0.pid = L.pid), (e0.msgs = []), (e0.last = 0), (e0.unread = 0));
      const n =
        (typeof x < "u" && x.open && x.chan === "p") ||
        (typeof oA < "u" && oA === "party");
      if (!document.hidden && !(!A && (!n || Date.now() - e0.at < 8e3))) {
        ((e0.at = Date.now()), (e0.busy = !0));
        try {
          let t = k.sb
            .from("party_chat")
            .select("id,owner,name,fac,lvl,msg,ts")
            .eq("pid", L.pid)
            .order("id", { ascending: !!e0.last })
            .limit(40);
          e0.last && (t = t.gt("id", e0.last));
          const e = await t;
          if (e.error) throw e.error;
          let a = e.data || [];
          e0.last || (a = a.reverse());
          for (const i of a) {
            e0.last = Math.max(e0.last, +i.id);
            const o = e0.msgs.findIndex(
              (l) => l.pending && be(l.name) === be(i.name) && l.msg === i.msg,
            );
            o >= 0
              ? (e0.msgs[o] = i)
              : e0.msgs.some((l) => l.id === i.id) ||
                (e0.msgs.push(i),
                be(i.name) !== go() &&
                  !(x.open && x.chan === "p") &&
                  e0.unread++);
          }
          (e0.msgs.length > 80 && e0.msgs.splice(0, e0.msgs.length - 80),
            a.length && h8());
        } catch (t) {
          (fo(t) || /party_chat/.test(String(t && t.message))) && (e0.off = !0);
        } finally {
          e0.busy = !1;
        }
      }
    },
    ch = async function (A) {
      if (!L.pid)
        return (y("Bạn chưa có tổ đội · bấm 👥 để mời người chơi"), !1);
      if (e0.off)
        return (y("Máy chủ chưa bật chat Tổ đội (chạy lại TO_DOI.sql)"), !1);
      if (Date.now() - (e0.sent || 0) < 2500)
        return (y("Gửi chậm lại một chút"), !1);
      e0.sent = Date.now();
      const n = I[r.fac] ? I[r.fac].n : "",
        t = {
          id: "tmp" + Date.now(),
          owner: go(),
          name: r.name,
          fac: n,
          lvl: r.lvl | 0,
          msg: A,
          ts: new Date().toISOString(),
          pending: !0,
        };
      (e0.msgs.push(t), h8());
      try {
        return (
          typeof zn == "function" && (await zn()),
          await wn((e) =>
            e.rpc("party_say", {
              p_name: r.name,
              p_fac: n,
              p_lvl: r.lvl | 0,
              p_msg: A,
            }),
          ),
          (e0.at = 0),
          await N2(!0),
          !0
        );
      } catch (e) {
        return (
          (e0.msgs = e0.msgs.filter((a) => a !== t)),
          h8(),
          /party_say|Could not find the function/i.test(String(e && e.message))
            ? ((e0.off = !0),
              y("Máy chủ chưa bật chat Tổ đội (chạy lại TO_DOI.sql)"))
            : y(e.message || "Gửi lỗi"),
          !1
        );
      }
    },
    un = !0;
  un && document.documentElement.classList.add("ptclosed");

  window.saveHeroCloudRealtime = function () {
    if (!k.user || !r || !r.fac || I2()) return;
    if (typeof rA === "function") {
      rA().catch(() => {});
    }
  };
