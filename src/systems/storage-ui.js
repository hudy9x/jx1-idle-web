var L = {
      off: un,
      pid: null,
      me: null,
      mem: [],
      snaps: {},
      seen: new Set(),
      lastI: 0,
      lastP: 0,
      busy: !1,
      inv: [],
    },
    ve = 8,
    wx = 0.05,
    dh = 30,
    vy = 3e4,
    fh = 2 * 864e5,
    g8 = () =>
      !L.off &&
      typeof k < "u" &&
      k.user &&
      k.sb &&
      r &&
      r.fac &&
      typeof HA == "function" &&
      HA(),
    fo = (s) =>
      /party|relation .* does not exist|Could not find the (table|function)|snap/i.test(
        String(s && (s.message || s)),
      ),
    wn = (s) => v0(s),
    be = (s) => String(s || "").toLowerCase(),
    Qn = () => be(r && r.name),
    m8 = new Set([15, 16, 93, 89, 86, 92, 282, 332, 159, 171, 173, 178]),
    by = (s) =>
      s
        ? ro(s.snap)
          ? Date.now() - new Date(s.updated).getTime() > fh
            ? "lâu không online"
            : "đang tải…"
          : "chờ đồng đội vào game bản mới"
        : "chưa đồng bộ nhân vật",
    L2 = () => !c.town && !c.tower && !(c.dg && c.dg.kind === "wb"),
    px = () => (c.allies || []).filter((s) => !s.dead),
    yy = 0.15,
    ho = () => {
      if (un || !L2() || !c.allies || !c.allies.length) return 1;
      const s = Math.max(1, r.lvl | 0);
      return (
        1 +
        c.allies.reduce(
          (A, n) => A + (yy * Math.min(s, n.l || 1)) / Math.max(s, n.l || 1),
          0,
        )
      );
    },
    hh = (s) =>
      s.tgtA && !s.tgtA.dead && c.allies && c.allies.includes(s.tgtA) && L2()
        ? s.tgtA
        : null,
    gh = () =>
      L2()
        ? (c.allies || [])
            .filter((s) => !s.dead)
            .map((s) => ({ ally: s, y: s.y }))
        : [],
    ky = [
      "shaolin",
      "tianwang",
      "tangmen",
      "wudu",
      "emei",
      "cuiyan",
      "gaibang",
      "tianren",
      "wudang",
      "kunlun",
      "huashan",
    ],
    mh = (s) => {
      const A = ky.indexOf(s);
      return A < 0 ? 11 : A;
    };
  (setInterval(() => mn(!1), 5e3),
    setInterval(() => {
      if (un) {
        (L.pid || (c.allies && c.allies.length)) &&
          ((L.pid = null), (L.mem = []), (c.allies = []), d3());
        return;
      }
      L.pid &&
        ((!c.allies || (c.allies.some((s) => !s.J) && typeof h0 < "u" && h0)) &&
          lo(),
        d3());
    }, 1e3),
    document.addEventListener("visibilitychange", () => {
      document.hidden || mn(!1);
    }));
  var Dx = () => !u("#modal").classList.contains("hidden") && !!u("#ptMgr"),
    u8 = (s) => ct(s);
  setInterval(() => {
    (Py(), f3());
  }, 1e3);
  var e0 = { msgs: [], last: 0, pid: null, at: 0, unread: 0, off: !1 },
    go = () => Qn(),
    uh = (s) =>
      s.sys
        ? s
        : {
            id: s.id,
            ts: s.ts,
            name: s.name,
            fac: s.fac || "",
            lvl: s.lvl,
            msg: s.msg,
            cid:
              be(s.name) === go()
                ? typeof pe == "function"
                  ? pe()
                  : "me"
                : "p",
            pending: s.pending,
          };
  setInterval(() => N2(!1), 4e3);
  var wh = function () {
      if (document.getElementById("u20menu")) return;
      const A = (a) => {
        const i = document.createElement("div");
        ((i.innerHTML = a), document.body.appendChild(i.firstElementChild));
      };
      (A(
        `<div id="u20menu">${Ph.map(([a, i, o]) => `<button class="u20mi" data-u="${a}" title="${o}" style="background-image:url(img/u2/${i}.png)"><i class="dot"></i></button>`).join("")}</div>`,
      ),
        A(
          '<div id="u20rc"><div id="u20trk" style="display:none"></div><button id="u20mail" title="Hộp thư: quà, đồ gửi, đồ mua ở Chợ"><b id="u20mailN"></b></button><button id="u20stb" title="Mã Trường: bộ sưu tập ngựa"><b id="u20stbN"></b></button><button id="u20tt" title="Trợ Thủ Kiếm Hiệp: tự đánh, thuốc, ưu tiên mục tiêu, nhặt đồ"></button></div>',
        ));
      {
        const a = u("#pwS");
        a &&
          !u("#u20rank") &&
          a.parentNode.insertAdjacentHTML(
            "afterend",
            '<button id="u20rank" title="Bảng xếp hạng">🏆 Hạng</button>',
          );
      }
      (A(
        '<div id="u20zone"><button id="u20zb" title="Bản đồ luyện công"><span id="u20zn"></span> ▾</button><div id="u20zl" class="hidden"></div></div>',
      ),
        A(
          `<div id="u20side">${vh.map(([a, i], o) => `<button class="u20sq" data-s="${o}" data-n="${i}">${a}</button>`).join("")}</div>`,
        ),
        A(
          '<div id="u20r"><button class="u20rb" id="u20gift">Phần<br>thưởng</button><button class="u20rb" id="u20ktc">Kỳ Trân<br>Các</button><button class="u20rb" id="u20mkt">Chợ</button></div>',
        ),
        A(
          '<div id="u20gold"><span><img src="img/ep/knb.png" alt=""><b id="u20knb">0</b></span><span>🪙 <b id="u20g">0</b></span></div>',
        ),
        A(
          `<div id="u20log"><div id="u20lines"></div><div id="u20ct"><button id="u20lt" title="Ẩn / hiện khung thông báo">📜</button>${Ty.map(([a, i]) => `<button data-lt="${a}" class="${a === oA ? "on" : ""}" title="${a === "sys" ? "Thông báo hệ thống" : "Bấm lần nữa để mở khung nhắn tin"}">${a === "chat" ? "🌐 " : a === "party" ? "👥 " : ""}${i}<b class="ctn"></b></button>`).join("")}<span id="u20onl"></span><button id="u20hide" title="Ẩn khung thông báo">−</button></div><form id="u20in" autocomplete="off"><button type="button" id="u20ch" title="Đổi kênh chat">Thế giới</button><input id="u20txt" maxlength="150" placeholder="Nhập tin nhắn… (Enter để chat)"><button type="submit" id="u20go">Gửi</button></form></div>`,
        ),
        A(
          '<div id="u20boss"><div class="t"></div><div class="b"><i></i><span></span></div></div>',
        ));
      const n = document.getElementById("panel"),
        t = document.createElement("div");
      ((t.id = "u20wh"),
        (t.innerHTML = '<span id="u20wt"></span><button id="u20wx">✕</button>'),
        n.prepend(t),
        document
          .querySelectorAll("#u20menu .u20mi")
          .forEach(
            (a) =>
              (a.onclick = () =>
                a.dataset.u === "ride"
                  ? Z4()
                  : a.dataset.u === "team"
                    ? typeof h3 == "function" && h3()
                    : My(a.dataset.u)),
          ),
        (ye = !r || r.u20trk !== !1),
        document
          .querySelectorAll("#u20side .u20sq")
          .forEach((a) => (a.onclick = () => vh[+a.dataset.s][2]())),
        (u("#u20lt").onclick = () => {
          ((r.u20logOff = !r.u20logOff), B(), q2());
        }),
        (u("#u20hide").onclick = () => {
          ((r.u20logOff = !r.u20logOff), B(), q2());
        }),
        (u("#u20ch").onclick = () => {
          (w8(Do() === "p" ? "w" : "p"), u("#u20txt").focus());
        }),
        (u("#u20in").onsubmit = async (a) => {
          a.preventDefault();
          const i = u("#u20txt"),
            o = i.value;
          if (
            (!o.trim() && !(typeof x < "u" && x.att)) ||
            typeof Kr != "function"
          ) {
            i.blur();
            return;
          }
          const l = Do();
          ((x.chan = l),
            oA !== (l === "p" ? "party" : "chat") &&
              !(oA === "all" && l === "w") &&
              ((oA = l === "p" ? "party" : "chat"),
              document
                .querySelectorAll("#u20ct button[data-lt]")
                .forEach((h) => h.classList.toggle("on", h.dataset.lt === oA))),
            (i.value = ""));
          const d = u("#chatTxt");
          (await Kr(o),
            d && d.value && ((i.value = d.value), (d.value = "")),
            (typeof x < "u" && x.att) ||
              (i.placeholder = "Nhập tin nhắn… (Enter để chat)"),
            j2());
        }),
        (u("#u20txt").onkeydown = (a) => {
          a.key === "Escape" && a.target.blur();
        }),
        u("#u20lines").addEventListener("click", (a) => {
          const i = a.target.closest("[data-ci]");
          if (i && typeof Yr == "function") {
            Yr(+i.dataset.ci);
            return;
          }
          const o = a.target.closest("[data-pn]");
          o && typeof gn == "function" && gn(o.dataset.pn);
        }));
      {
        const a = (i) => {
          (i && !document.body.classList.contains("u2m")) ||
            (document.body.classList.toggle("u2kb", i),
            setTimeout(
              () => {
                (window.scrollTo(0, 0),
                  pn(),
                  typeof rt == "function" && typeof aA < "u" && aA && rt());
              },
              i ? 250 : 60,
            ));
        };
        if (
          (u("#u20txt").addEventListener("focus", () => a(!0)),
          u("#u20txt").addEventListener("blur", () =>
            setTimeout(() => {
              document.activeElement !== u("#u20txt") && a(!1);
            }, 120),
          ),
          window.visualViewport)
        ) {
          const i = () => {
            document.body.classList.contains("u2kb") &&
              (window.scrollTo(0, 0), pn());
          };
          (visualViewport.addEventListener("resize", i),
            visualViewport.addEventListener("scroll", i));
        }
      }
      (window.addEventListener("keydown", (a) => {
        a.key !== "Enter" ||
          /INPUT|TEXTAREA|SELECT/.test(a.target.tagName) ||
          !document.body.classList.contains("u20") ||
          !u("#modal").classList.contains("hidden") ||
          (r && r.u20logOff && ((r.u20logOff = !1), q2()),
          a.preventDefault(),
          u("#u20txt").focus());
      }),
        w8(Do()),
        document.querySelectorAll("#u20ct button[data-lt]").forEach(
          (a) =>
            (a.onclick = () => {
              ((oA = a.dataset.lt),
                oA === "party"
                  ? w8("p")
                  : (oA === "chat" || oA === "all") && w8("w"),
                document
                  .querySelectorAll("#u20ct button[data-lt]")
                  .forEach((i) => i.classList.toggle("on", i === a)),
                j2());
            }),
        ),
        q2());
      const e = (a) => () =>
        typeof $0 == "function" && typeof g0 == "function" && g0()
          ? $0(a)
          : y("Bản chơi trên máy không có xếp hạng / chợ / thư");
      ((u("#u20mkt").onclick = e("mkt")),
        (u("#u20mail").onclick = e("mail")),
        (u("#u20stb").onclick = () => w1("horse")),
        (u("#u20tt").onclick = () => {
          (typeof i0 == "function" && i0("click"), P8("basic"));
        }));
      {
        const a = u("#u20rank");
        a && (a.onclick = () => Vy());
      }
      if (
        ((u("#u20zb").onclick = () => {
          (Fy(), g3(u("#u20zone")));
        }),
        (u("#u20wx").onclick = uo),
        (u("#u20gift").onclick = () => Wt(!0)),
        (u("#u20ktc").onclick = () => AA()),
        _y(t, n),
        n.addEventListener("pointerdown", () => {
          u("#modal").classList.contains("hidden") && g3(n);
        }),
        typeof J == "function")
      ) {
        const a = J;
        J = (...i) => {
          const o = a(...i);
          return (g3(u("#modal")), o);
        };
      }
      if (typeof we == "function") {
        const a = we;
        we = (i) => {
          (a(i), i && g3(u("#chatBox")));
        };
      }
      (Dh(), window.addEventListener("resize", Dh), setInterval($y, 250));
    },
    w8 = function (A) {
      (typeof un < "u" && un && (A = "w"), (m3 = A === "p" ? "p" : "w"));
      const n = u("#u20ch");
      n &&
        ((n.textContent = m3 === "p" ? "👥" : "🌐"),
        (n.className = m3 === "p" ? "pt" : ""),
        (n.title =
          (m3 === "p" ? "Kênh Tổ đội" : "Kênh Thế giới") +
          " · bấm để đổi kênh"));
    },
    xy = function () {
      const A = u("#u20stb");
      if (!A || ((A.style.display = r && r.fac ? "" : "none"), !r || !r.fac))
        return;
      typeof d7 == "function" &&
        r.inv.some(O0) &&
        d7() &&
        typeof B == "function" &&
        B();
      const n = typeof $i == "function" ? $i() : 0;
      let t = 0;
      if (typeof Ae == "function") {
        const i = Ae(),
          o = new Set();
        for (const l of r.inv)
          O0(l) &&
            Ln(l) >= 0 &&
            !i.has(cn(l)) &&
            !o.has(cn(l)) &&
            (o.add(cn(l)), t++);
      }
      const e = n + t,
        a = e ? String(e > 99 ? "99+" : e) : "";
      A.dataset.n !== a &&
        ((A.dataset.n = a),
        (u("#u20stbN").textContent = a),
        A.classList.toggle("on", !!e),
        (A.title =
          "Mã Trường: bộ sưu tập ngựa" +
          (n ? ` · ${n} Rương Ngựa chưa mở` : "") +
          (t ? ` · ${t} loài mới chưa cất vào Mã Trường` : "")));
    },
    ph = function () {
      const A = u("#arena"),
        n = u("#u20zone");
      if (!A || !n) return;
      const t = A.getBoundingClientRect(),
        e = t.width / (A.clientWidth || t.width || 1);
      Object.assign(n.style, {
        top: t.top + (sA.top + sA.s + 2) * e + "px",
        right: window.innerWidth - t.right + sA.m * e + "px",
        width: sA.s * e + "px",
      });
    },
    q2 = function () {
      By();
      try {
        (pn(), wo(), po());
      } catch {}
    },
    By = function () {
      const A = !!(r && r.u20logOff);
      document.body.classList.toggle("u20logoff", A);
      {
        const t = u("#u20hide");
        t &&
          ((t.textContent = A ? "+" : "−"),
          (t.title = A
            ? "Hiện khung chat / thông báo"
            : "Ẩn khung chat / thông báo"));
      }
      const n = u("#u20lt");
      n &&
        (n.classList.toggle("on", !A),
        (n.title = A ? "Hiện khung thông báo" : "Ẩn khung thông báo"));
    },
    g3 = function (A) {
      A &&
        document.body.classList.contains("u20") &&
        A.style.setProperty("z-index", String(++Oy), "important");
    },
    _y = function (A, n) {
      let t,
        e,
        a,
        i,
        o = !1;
      (A.addEventListener("pointerdown", (l) => {
        if (l.target.tagName === "BUTTON") return;
        ((o = !0), (t = l.clientX), (e = l.clientY));
        const d = n.getBoundingClientRect();
        ((a = d.left), (i = d.top), A.setPointerCapture(l.pointerId));
      }),
        A.addEventListener("pointermove", (l) => {
          o &&
            ((n.style.left = a + l.clientX - t + "px"),
            (n.style.top = Math.max(0, i + l.clientY - e) + "px"),
            (n.style.transform = "none"));
        }),
        A.addEventListener("pointerup", () => {
          o = !1;
        }));
    },
    Dh = function () {
      const A = bh(),
        n = A && window.innerHeight < 560,
        t = Cy();
      (document.body.classList.toggle("u20", A),
        document.body.classList.toggle("u2s", n),
        document.body.classList.toggle("u2m", t));
      for (const a of [
        "u20menu",
        "u20side",
        "u20r",
        "u20gold",
        "u20log",
        "u20boss",
        "u20rc",
        "u20rank",
      ]) {
        const i = document.getElementById(a);
        i && (i.style.display = A ? "" : "none");
      }
      {
        const a = document.getElementById("u20log");
        a && t && (a.style.display = "");
      }
      if (
        ((u("#u20zone").style.display = A || t ? "" : "none"),
        typeof sA < "u" &&
          (A
            ? ((sA.s = n ? 104 : 150), (sA.top = n ? 2 : 4), (sA.m = n ? 4 : 6))
            : ((sA.s = 92), (sA.top = 62), (sA.m = 8))),
        A)
      ) {
        u("#u20r").style.right = sA.s + sA.m + (n ? 6 : 12) + "px";
        const a = sA.s + sA.top + 2;
        Object.assign(u("#u20zone").style, {
          top: a + "px",
          right: sA.m + "px",
          width: sA.s + "px",
        });
        const i = n && matchMedia("(pointer: coarse)").matches ? 32 : 24;
        ((u("#u20side").style.top = a + i + 4 + "px"),
          (u("#u20rc").style.top = a + i + 4 + "px"));
      }
      t && ph();
      const e = u("#chatBox");
      if (e) {
        const a = A ? document.body : u("#battle");
        e.parentNode !== a && a.appendChild(e);
      }
      (!A &&
        typeof vA < "u" &&
        r &&
        r.fac &&
        (document.body.classList.remove("u20win"),
        (p8 = null),
        (Pt = "sys"),
        F()),
        typeof rt == "function" && typeof aA < "u" && aA && rt(),
        setTimeout(pn, 60));
    },
    pn = function () {
      const A = u("#u20log");
      if (!A) return;
      if (
        (A.scrollLeft && (A.scrollLeft = 0),
        document.body.classList.contains("u2m"))
      ) {
        const t = u("#arena"),
          e = u("#pad");
        if (!t || !e) return;
        const a = t.getBoundingClientRect(),
          i = e.getBoundingClientRect();
        if (document.body.classList.contains("u2kb")) {
          const h = window.visualViewport,
            g = h
              ? Math.max(0, window.innerHeight - h.height - h.offsetTop)
              : 0;
          {
            const f = u("#u20lines");
            f &&
              (f.style.removeProperty("height"),
              f.style.removeProperty("max-height"));
          }
          Object.assign(A.style, {
            left: a.left + "px",
            width: Math.round(a.width) + "px",
            bottom: Math.round(g) + "px",
            top: "auto",
          });
          return;
        }
        Object.assign(A.style, {
          left: a.left + "px",
          width: Math.round(a.width) + "px",
          bottom: Math.round(window.innerHeight - i.top + 2) + "px",
          top: "auto",
        });
        const o = u("#modeSw"),
          l = u("#u20lines");
        let d = a.top + 40;
        if (o) {
          const h = u("#skBuffs"),
            g =
              h && h.offsetParent !== null && h.children.length
                ? h.getBoundingClientRect()
                : null,
            f = Math.round(Math.max(a.top + 44, g ? g.bottom + 4 : 0));
          for (const [w, p] of [
            ["top", f + "px"],
            ["left", a.left + 4 + "px"],
            ["right", "auto"],
            ["bottom", "auto"],
            ["position", "fixed"],
          ])
            o.style.setProperty(w, p, "important");
          const m = f - o.getBoundingClientRect().top;
          (Math.abs(m) > 1 &&
            o.style.setProperty("top", f + m + "px", "important"),
            (d = o.getBoundingClientRect().bottom));
        }
        if (l && !document.body.classList.contains("u20logoff")) {
          const h = i.top - 2 - (A.offsetHeight - l.offsetHeight),
            g =
              Math.max(
                56,
                Math.min(Math.round(h - d - 6), Math.round(a.height * 0.42)),
              ) + "px";
          (l.style.setProperty("max-height", g, "important"),
            l.style.setProperty("height", g, "important"),
            wo(),
            po());
        }
        return;
      }
      if (!document.body.classList.contains("u20")) {
        A.style.width = "";
        return;
      }
      const n = ["#pad", "#modeSw"]
        .map((t) => document.querySelector(t))
        .filter((t) => t && t.offsetParent !== null)
        .map((t) => t.getBoundingClientRect().left)
        .filter((t) => t > 40);
      n.length &&
        A.style.setProperty(
          "width",
          Math.round(Math.max(220, Math.min(470, Math.min(...n) - 8))) + "px",
          "important",
        );
    },
    mo = function (A, n) {
      (n && typeof J0 < "u" && (J0 = n),
        (p8 = A),
        (A === "tt" || A === "more") && (Pt = A === "tt" ? "tt" : "sys"),
        A !== "tt" && u("#u2ttBody") && (u("#t-more").innerHTML = ""),
        iA(A === "tt" ? "more" : A),
        document.body.classList.add("u20win"),
        g3(u("#panel")));
      const t = Ph.find((e) => e[0] === A);
      ((u("#u20wt").textContent = t
        ? t[3]
        : A === "tt"
          ? "Trợ Thủ Kiếm Hiệp"
          : ""),
        document
          .querySelectorAll("#u20menu .u20mi:not([data-u=ride])")
          .forEach((e) => e.classList.toggle("on", e.dataset.u === A)));
    },
    uo = function () {
      ((p8 = null),
        document.body.classList.remove("u20win"),
        document
          .querySelectorAll("#u20menu .u20mi:not([data-u=ride])")
          .forEach((A) => A.classList.remove("on")));
    },
    My = function (A) {
      p8 === A && document.body.classList.contains("u20win") ? uo() : mo(A);
    },
    Px = function () {
      const A = (t, e, a) =>
          `<label><input type="checkbox" id="${t}" ${e ? "checked" : ""}> ${a}</label>`,
        n = typeof X0 == "function" ? X0() : {};
      J(
        `<h3>Trợ Thủ Kiếm Hiệp</h3><div class="u20tt">
    <h4>Chiến đấu</h4>${A("tAuto", !fA(), "Tự đánh (Auto) · phím F")}${A("tRot", r.rot !== !1, "Xoay chiêu ô F1–F4 · phím R")}${A("tClose", !!r.closeAtk, "Đánh tiếp cận (chạy sát quái rồi mới ra chiêu)")}${A("tBoss", !!r.bossFirst, "Ưu tiên đánh boss (trùm / trùm Hoàng Kim trên bản đồ: bỏ quái thường, chạy tới đánh trùm)")}${A("tRide", r.autoRide !== !1, "Tự lên ngựa khi di chuyển, xuống ngựa khi đánh chiêu không dùng trên ngựa · phím M")}${A("tMap", r.autoMap !== !1, "Tự đổi bãi luyện công theo cấp")}
    <h4>Thuốc</h4>${A("tPot", !r.potOff, "Dùng thuốc khi sinh lực / nội lực dưới 50%")}${A("tBuy", r.potBuy !== !1, "Tự mua thuốc khi hết (tối đa 20% ngân lượng)")}
    <h4>Đồ đạc</h4>${A("tEq", !!r.autoEquip, "Tự mặc đồ tốt hơn khi nhặt")}${A("tJunk", r.autoJunk !== !1, "Tự bán đồ thừa")}${A("tPts", r.autoPts === !0, "Tự cộng điểm tiềm năng và võ công")}
    <h4>Nhiệm vụ</h4>${A("tDt", n.auto !== !1, "Dã Tẩu tự trả / nhận")}${A("tLdt", r.autoLdt !== !1, "Tự dùng Lệnh Bài Dã Tẩu khi hết lượt")}</div>`,
        () => {
          const t = (e, a) => {
            const i = u(e);
            i &&
              (i.onchange = () => {
                (a(i.checked), B());
              });
          };
          (t("#tAuto", (e) => d2(e ? "auto" : "manual")),
            t("#tRot", (e) => {
              ((r.rot = e), ai(), (c.dirty = !0));
            }),
            t("#tRide", (e) => {
              r.autoRide = e;
            }),
            t("#tMap", (e) => {
              r.autoMap = e;
            }),
            t("#tClose", (e) => {
              r.closeAtk = e;
            }),
            t("#tBoss", (e) => {
              ((r.bossFirst = e), (r.tgtPri = e ? "hk" : "near"));
            }),
            t("#tPot", (e) => {
              r.potOff = !e;
            }),
            t("#tBuy", (e) => {
              r.potBuy = e;
            }),
            t("#tEq", (e) => {
              r.autoEquip = e;
            }),
            t("#tJunk", (e) => {
              r.autoJunk = e;
            }),
            t("#tPts", (e) => {
              r.autoPts = e;
            }),
            t("#tDt", (e) => {
              X0().auto = e;
            }),
            t("#tLdt", (e) => {
              r.autoLdt = e;
            }));
        },
      );
    },
    j2 = function () {
      const A = u("#u20lines");
      A &&
        (A.__stk ||
          ((A.__stk = 1),
          (A._stick = !0),
          A.addEventListener(
            "scroll",
            () => {
              A.clientHeight &&
                (A._stick = A.scrollHeight - A.scrollTop - A.clientHeight < 12);
            },
            { passive: !0 },
          )),
        A.dataset.lt !== oA && (A._stick = !0),
        (A.dataset.lt = oA),
        Hy(A),
        wo(),
        po());
    },
    wo = function () {
      const A = u("#u20lines");
      A && A._stick !== !1 && (A.scrollTop = A.scrollHeight);
    },
    po = function s() {
      const A = u("#u20lines"),
        n = u("#u20log");
      if (!A || !n) return;
      let t = u("#u20sb");
      t ||
        ((t = document.createElement("div")),
        (t.id = "u20sb"),
        (t.innerHTML = "<i></i>"),
        n.appendChild(t),
        A.addEventListener("scroll", s, { passive: !0 }));
      const e = A.clientHeight,
        a = A.scrollHeight;
      if ((t.classList.toggle("no", a <= e + 2 || !e), a <= e + 2 || !e))
        return;
      Object.assign(t.style, { top: A.offsetTop + "px", height: e + "px" });
      const i = Math.max(14, (e * e) / a);
      Object.assign(t.firstChild.style, {
        height: i + "px",
        top: ((e - i) * A.scrollTop) / (a - e) + "px",
      });
    },
    Hy = function (A) {
      if (oA === "party") {
        const t = typeof e0 < "u" ? e0.msgs.slice(-40).map(uh) : [];
        A.innerHTML = t.length
          ? t.map(t3).join("")
          : `<div style="color:#999">${typeof L < "u" && L.pid ? "Chưa có tin nhắn tổ đội · gõ vào ô chat bên dưới" : "Chưa có tổ đội · mở nút Tổ đội trên thanh menu để mời người chơi"}</div>`;
        return;
      }
      if (oA === "chat") {
        A.innerHTML =
          typeof x < "u" && x.msgs.length
            ? x.msgs
                .filter((t) => !a3(t))
                .slice(-40)
                .map(t3)
                .join("")
            : '<div style="color:#999">Chưa có tin nhắn · gõ vào ô chat bên dưới (Enter)</div>';
        return;
      }
      if (oA === "all") {
        const t = [],
          e = c.logT || [],
          a = typeof Fr == "function" ? Fr : (i) => "";
        ((c.logs || [])
          .slice(0, 40)
          .forEach((i, o) =>
            t.push([
              e[o] || 0,
              `<div class="cl syl"><i>${e[o] ? a(e[o]) : ""}</i> ${i}</div>`,
            ]),
          ),
          typeof x < "u" &&
            x.msgs
              .filter((i) => !a3(i))
              .slice(-40)
              .forEach((i) => t.push([+i.ts || 0, t3(i)])),
          t.sort((i, o) => i[0] - o[0]),
          (A.innerHTML =
            t
              .slice(-60)
              .map((i) => i[1])
              .join("") || '<div style="color:#999">Chưa có tin</div>'));
        return;
      }
      const n = (c.logs || []).slice(0, 40).reverse();
      A.innerHTML = n.map((t) => `<div>${t}</div>`).join("");
    },
    $y = function () {
      if (document.body.classList.contains("u2m") && r && r.fac) {
        (Bh(), ph());
        const a = document.getElementById("tabRide");
        a && a.classList.toggle("on", typeof L < "u" && !!L.pid);
        const i =
          (c.logs || []).length +
          "|" +
          (c.logs || [])[0] +
          "|" +
          (typeof x < "u" ? x.msgs.length : 0);
        i !== D8 && ((D8 = i), j2());
        return;
      }
      if (!document.body.classList.contains("u20") || !r || !r.fac) return;
      (yh(), Bh(), xy());
      {
        const a = typeof g0 == "function" && g0(),
          i = (typeof k < "u" && k.mailN) || 0;
        ((u("#u20mail").style.display = a ? "" : "none"),
          (u("#u20mkt").style.display = a ? "" : "none"));
        const o = u("#u20rank");
        (o && (o.style.display = a ? "block" : "none"),
          (u("#u20mailN").textContent = i ? (i > 9 ? "9+" : i) : ""),
          u("#u20mail").classList.toggle("on", i > 0));
      }
      const A = u("#chatBox");
      A && A.parentNode !== document.body && document.body.appendChild(A);
      for (const a of document.querySelectorAll(
        '#u20menu [data-u="ride"], #tabRide',
      ))
        (a.classList.toggle("on", !!c.mounted),
          a.classList.toggle("off", !Ft()));
      const n =
        (c.logs || []).length +
        "|" +
        (c.logs || [])[0] +
        "|" +
        (typeof x < "u" ? x.msgs.length : 0);
      (n !== D8 && ((D8 = n), j2()),
        (u("#u20g").textContent = j(r.gold)),
        (u("#u20knb").textContent = X(r.knb || 0)));
      const t =
          c.enemies &&
          c.enemies
            .filter(
              (a) =>
                !a.dead &&
                a.cls === "boss" &&
                Math.hypot(a.x - b.x, a.y - b.y) < 700,
            )
            .sort(
              (a, i) =>
                Math.hypot(a.x - b.x, a.y - b.y) -
                Math.hypot(i.x - b.x, i.y - b.y),
            )[0],
        e = u("#u20boss");
      if (t) {
        ((e.style.display = "block"),
          (e.querySelector(".t").textContent = `${t.n} · Lv ${t.L}`));
        const a = Math.max(0, (t.hp / t.max) * 100);
        ((e.querySelector("i").style.width = a + "%"),
          (e.querySelector("span").textContent = a.toFixed(1) + "%"));
      } else e.style.display = "none";
      for (const [a, i] of [
        ["char", "dotChar"],
        ["skill", "dotSkill"],
        ["forge", "dotForge"],
        ["quest", "dotQuest"],
      ]) {
        const o = document.getElementById(i),
          l = document.querySelector(`#u20menu [data-u="${a}"] .dot`);
        o && l && l.classList.toggle("on", o.classList.contains("on"));
      }
    },
    Ph = [
      ["char", "char", "Nhân vật", "Nhân vật"],
      ["inv", "inv", "Hành trang", "Vật phẩm"],
      ["skill", "skill", "Võ công", "Kỹ năng"],
      ["team", "team", "Tổ đội", "Tổ đội"],
      ["forge", "forge", "Lò rèn", "Lò rèn"],
      ["quest", "quest", "Nhiệm vụ · Phó bản", "Chỉ nam nhiệm vụ"],
      ["more", "more", "Hệ thống", "Hệ thống"],
    ],
    vh = [],
    Ty = [
      ["chat", "Thế giới"],
      ["party", "Tổ đội"],
      ["sys", "Hệ thống"],
    ],
    oA = "chat",
    p8 = null,
    bh = () =>
      !!r &&
      window.innerWidth > window.innerHeight &&
      (window.innerWidth >= 900 ||
        (window.innerWidth >= 640 && window.innerHeight <= 520)),
    Cy = () => !!r && !bh(),
    m3 = "w",
    Do = () => m3,
    Oy = 50,
    vx = (s) =>
      /class="xpl"/.test(s)
        ? "fight"
        : /Nhặt được|rơi ra|Tự mua|Hành trang đầy/.test(s)
          ? "loot"
          : /📜|Dã Tẩu|Sát Thủ|Phó bản|🏯|thuyền/i.test(s)
            ? "quest"
            : /Hạ |xuất hiện|trọng thương|Trùm|trốn thoát/.test(s)
              ? "fight"
              : "sys",
    D8 = -1;
  (document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", () => setTimeout(wh, 300))
    : setTimeout(wh, 300),
    setInterval(() => {
      try {
        pn();
      } catch {}
    }, 2e3));
  {
    let s = 0;
    const A = () => {
      s ||
        (s = requestAnimationFrame(() => {
          s = 0;
          try {
            pn();
          } catch {}
        }));
    };
    if (window.ResizeObserver) {
      const n = new ResizeObserver(A),
        t = () => {
          for (const e of ["#arena", "#pad", "#u20log", "#battle"]) {
            const a = document.querySelector(e);
            a && !a.__u20ro && ((a.__u20ro = 1), n.observe(a));
          }
        };
      (t(), setInterval(t, 3e3));
    }
    (new MutationObserver(A).observe(document.body, {
      attributes: !0,
      attributeFilter: ["class"],
    }),
      window.addEventListener("resize", A));
  }
  var u3 = function (A, n) {
      if (_h()) return mo(A, n);
      (n && typeof J0 < "u" && (J0 = n),
        A === "tt" && (Pt = "tt"),
        t0(!0),
        iA(A === "tt" ? "more" : A));
    },
    Ey = function s() {
      const A = u("#u2doll");
      if (!A || typeof lt != "function" || !c.jx) return;
      const n = document.createElement("canvas");
      ((n.width = 600), (n.height = 600));
      const t = n.getContext("2d"),
        e = W;
      W = t;
      let a = !1;
      try {
        a = lt("st", 0, 0, 300, 520, 3, 1);
      } catch {
        a = !1;
      } finally {
        W = e;
      }
      if (!a) {
        setTimeout(() => {
          u("#u2doll") === A && s();
        }, 400);
        return;
      }
      const i = t.getImageData(0, 0, 600, 600).data;
      let o = 600,
        l = 0,
        d = 600,
        h = 0;
      for (let v = 3; v < i.length; v += 16)
        if (i[v] > 20) {
          const H = (v - 3) / 4,
            _ = H % 600,
            E = (H / 600) | 0;
          (_ < o && (o = _),
            _ > l && (l = _),
            E < d && (d = E),
            E > h && (h = E));
        }
      if (l <= o) return;
      const g = l - o + 4,
        f = h - d + 4,
        m = Math.min(236 / g, 284 / f),
        w = g * m,
        p = f * m,
        P = A.getContext("2d");
      (P.clearRect(0, 0, A.width, A.height),
        P.drawImage(n, o - 2, d - 2, g, f, (252 - w) / 2, 296 - p, w, p));
    },
    Iy = function () {
      const A = c.P,
        n = I[r.fac],
        t = Object.values(r.eq).filter((f) => f && !f0(f)),
        e = I0({}),
        a = {
          life: Math.round(A.life - e.life),
          mana: Math.round(A.mana - e.mana),
        },
        i = G1.map(([f, m]) => {
          const [w, p, P, v] = Xy[f];
          return `<div class="u2s slot" data-slot="${f}" style="left:${w}px;top:${p}px;width:${P}px;height:${v}px">${r.eq[f] ? T1(r.eq[f]) : `<span>${m}</span>`}</div>`;
        }).join(""),
        o = Object.keys(C1)
          .map(
            (f) =>
              `<div class="u2a"><span>${C1[f]}</span><b>${Math.round(A[f])}</b><button class="plus" data-a="${f}" ${r.attrPts ? "" : "disabled"}>+</button><button class="minus" data-a="${f}" title="Rút lại 1 điểm" ${r.attr[f] > 0 ? "" : "disabled"}>−</button></div>`,
          )
          .join(""),
        l = [
          [
            "Sinh lực",
            X(A.life) +
              (a.life ? ` <small class="cp">+${X(a.life)}</small>` : ""),
          ],
          [
            "Nội lực",
            X(A.mana) +
              (a.mana ? ` <small class="cp">+${X(a.mana)}</small>` : ""),
          ],
          ["Sát thương VK", `${Math.round(A.wmin)}–${Math.round(A.wmax)}`],
          ["Chính xác", Math.round(A.ar)],
          ["Né tránh", Math.round(A.def)],
          ["Chí mạng", Math.round(A.main.crit) + "%"],
          ["Tốc độ đánh", A.aspd.toFixed(2)],
        ].concat(q0.map((f) => ["Kháng " + Io[f], Math.round(A.res[f]) + "%"])),
        d =
          A.plusSkill || Object.keys(A.skAdd || {}).length
            ? `<div class="u2note cp">Kỹ năng từ trang bị: ${A.plusSkill ? `tất cả +${A.plusSkill}` : ""}${Object.entries(
                A.skAdd || {},
              )
                .map(([f, m]) => ` · ${T[f] ? D(T[f].n) : f} +${m}`)
                .join("")}</div>`
            : "";
      ((u("#t-char").innerHTML = `<div class="u2char">
    <div class="u2dollw"><div class="u2nm">${D(HA() ? r.name : n.n)}${pb() ? `<button class="u2pen" id="bName" title="${HA() ? `Đổi Tên (còn ${s8()}/${a8} lượt)` : "Đặt tên nhân vật"}">✎</button>` : ""}</div><div class="u2doll"><canvas id="u2doll" width="252" height="300"></canvas>${i}</div>
      <div class="u2btns"><button class="btn sm" id="bTitle">Danh hiệu</button><button class="btn sm${r.lvl >= ht && Q().stat.reborn < w2 ? " on" : ""}" id="bReb">Chuyển sinh</button>${N("misc", "ldp") > 0 ? `<button class="btn sm on" id="bDoiPhai">Đổi phái (${N("misc", "ldp")})</button>` : ""}</div></div>
    <div class="u2info"><div class="u2box"><b style="color:${m0[n.series]}">${D(n.n)}</b> · hệ ${d0[n.series]} · Cấp ${r.lvl}${D0() ? ` <small class="cp">CS ${D0()}</small>` : ""}
      <div class="u2kv"><span>Chiêu chính</span><b class="gold">${D(A.main.n)}</b><span>Lực tay trái</span><b class="gold">${G3(A.basic)}</b><span>Lực tay phải</span><b class="gold">${G3(A.main)}</b></div></div>
      <div class="u2h">Tiềm năng <b class="gold">${r.attrPts}</b><span class="sp"></span><button class="btn sm" id="bSugAt">Gợi ý</button><button class="btn sm" id="bTTa">Tẩy Tủy</button></div>
      <div class="u2box">${o}</div>
      <div class="u2h">Chỉ số</div><div class="u2box u2st">${l.map(([f, m]) => `<span>${f}</span><span>${m}</span>`).join("")}</div>${d}</div></div>
    ${t.length ? `<div class="reqbad"><b>⚠ ${t.length} món chưa đủ điều kiện, không được cộng chỉ số:</b><br>${t.map((f) => `${D(f.n)}: ${D(Un(f).join("; "))}`).join("<br>")}</div>` : ""}`),
        (u("#bTTa").onclick = K3),
        document
          .querySelectorAll("#t-char .plus")
          .forEach((f) => (f.onclick = () => Wc(f.dataset.a))),
        document
          .querySelectorAll("#t-char .minus")
          .forEach((f) => (f.onclick = () => Zc(f.dataset.a))),
        (u("#bTitle").onclick = () => Jd()));
      const h = u("#bName");
      (h && (h.onclick = () => E2()), (u("#bReb").onclick = Nd));
      {
        const f = u("#bDoiPhai");
        f && (f.onclick = ta);
      }
      ((u("#bSugAt").onclick = C2),
        document
          .querySelectorAll("#t-char .slot .it")
          .forEach(
            (f) =>
              (f.onclick = () =>
                f.parentNode.dataset.slot === "horse"
                  ? yi()
                  : Ut(Ba(f.dataset.uid), f.parentNode.dataset.slot)),
          ));
      const g = document.querySelector('#t-char .slot[data-slot="horse"]');
      (g && !r.eq.horse && (g.onclick = () => yi()), Ey());
    },
    Sy = function () {
      const A = I[r.fac];
      if (A.novice) return e1.skill();
      const n = {};
      for (const f of A.skills) {
        const m = T[f],
          w = m.tier === 90 ? 90 : m.req;
        (n[w] || (n[w] = [])).push(f);
      }
      const t = Object.keys(n)
          .map(Number)
          .sort((f, m) => f - m),
        e = Math.max(1, ...t.map((f) => n[f].length)),
        a = (f) => (f <= 1 ? "Nhập môn" : `Lv${f}`),
        i = (f) => {
          if (!f) return '<div class="u2k empty"></div>';
          const m = T[f],
            w = r.sk[f] || 0,
            p = w ? yn(f) : 0,
            P = b1(m);
          return `<div class="u2k ${[Aa(m) ? "" : "lock", c.P.main.id === +f ? "main" : "", w ? "on" : ""].join(" ")}" data-id="${f}" title="${D(m.n)}"><img src="${D(m.ic || "")}" alt=""><i>${w ? w + p : ""}</i>${P ? `<button class="plus" data-id="${f}" title="Cộng 1 điểm">+</button>` : ""}${m.tier === 90 && w && w < m.max && N("misc", "dtbk") > 0 && o4(f) ? `<button class="u2dt" data-dt="${f}" title="Dùng Đại Thành Bí Kíp">📕</button>` : ""}</div>`;
        },
        o = c.P && c.P.basic,
        l = r.mainLock && r.main === "basic",
        d = `<div class="u2kc"><div class="u2kh">Cơ bản</div><div class="u2k on${c.P.main === o ? " main" : ""}${l ? " lockm" : ""}" id="u2basic" title="Đánh thường · bấm để ${l ? "bỏ khóa" : "khóa làm chiêu chính"}"><img src="img/s/8.png" alt=""><i>1</i></div>${'<div class="u2k empty"></div>'.repeat(e - 1)}</div>`,
        h = t
          .map(
            (f) =>
              `<div class="u2kc"><div class="u2kh">${a(f)}</div>${Array.from({ length: e }, (m, w) => i(n[f][w])).join("")}</div>`,
          )
          .join("");
      ((u("#t-skill").innerHTML =
        `<div class="u2tabs"><button class="on">${D(A.n)}</button><button id="u2skOpt">› Trợ Thủ Kiếm Hiệp</button></div>
    <div class="u2kg">${d}${h}</div>
    <div class="u2foot"><span class="dim small">Bí Kíp 90 ×${N("misc", "bk90")} · Đại Thành ×${N("misc", "dtbk")}${r.mainLock ? ' · <a id="bAutoMain">bỏ khóa chiêu chính</a>' : ""}</span><span class="sp"></span><button class="btn sm" id="bSugSk">Gợi ý</button><button class="btn sm" id="bTT">Tẩy Tủy</button><span class="u2pts">Điểm kỹ năng còn: <b>${r.skPts}</b></span></div>
    <p class="dim small u2tip">Bấm biểu tượng: xem chi tiết, chọn chiêu chính, rút điểm. Bấm <b class="plusd">+</b> để cộng điểm.</p>`),
        document.querySelectorAll("#t-skill .plus").forEach(
          (f) =>
            (f.onclick = (m) => {
              m.stopPropagation();
              const w = T[f.dataset.id];
              b1(w) && (R3(w.id), i0("learn"), (c.dirty = !0), u0(), In(), B());
            }),
        ),
        document.querySelectorAll("#t-skill [data-dt]").forEach(
          (f) =>
            (f.onclick = (m) => {
              (m.stopPropagation(), C6(+f.dataset.dt));
            }),
        ),
        document
          .querySelectorAll("#t-skill .u2k[data-id]")
          .forEach((f) => (f.onclick = () => y5(+f.dataset.id))),
        (u("#u2basic").onclick = () => {
          (r.mainLock && r.main === "basic"
            ? (r.mainLock = !1)
            : ((r.main = "basic"), (r.mainLock = !0)),
            (c.dirty = !0),
            u0(),
            In(),
            MA(),
            B(),
            y(
              r.mainLock && r.main === "basic"
                ? "Chiêu chính: Đánh thường"
                : "Bỏ khóa đánh thường",
            ));
        }));
      const g = u("#bAutoMain");
      (g &&
        (g.onclick = () => {
          ((r.mainLock = !1), (c.dirty = !0), u0(), In());
        }),
        (u("#bSugSk").onclick = C2),
        (u("#bTT").onclick = K3),
        (u("#u2skOpt").onclick = () => P8("skill")));
    },
    Ny = function (A) {
      A === "vlmt" || A === "ttk"
        ? na(A)
        : A === "rngua"
          ? qn(1)
          : A === "ldt" && (r.lvl < mA ? y(`Dã Tẩu mở từ cấp ${mA}`) : k2(!1));
    },
    Ly = function s(A) {
      const n = Mh.find((a) => a[0] === A);
      if (!n) return;
      const t = N("misc", A),
        e =
          A === "vlmt" || A === "ttk"
            ? `<p class="small">Đã dùng <b>${Bn(A)}/${VA(A)}</b>${At() ? "" : ' · <span class="reqbad">cần cấp 80</span>'}</p>`
            : "";
      J(
        `<h3>${D(x2(A))}</h3><div class="row" style="gap:10px;align-items:center"><img src="${n[1]}" alt="" style="width:40px;height:40px;image-rendering:pixelated"><div><p class="desc">${D(Uy[A] || "")}</p><p class="small">Đang có: <b>${t}</b></p>${e}</div></div>
    <div class="btnrow"><button class="btn" id="miUse" ${t ? "" : "disabled"}>Dùng</button>${A === "rngua" && t > 1 ? `<button class="btn" id="miUse10">Dùng ×${Math.min(10, t)}</button>` : ""}<button class="btn" id="miX">Đóng</button></div>`,
        () => {
          u("#miUse").onclick = () => {
            (Ny(A),
              N("misc", A) > 0 && (A === "vlmt" || A === "ttk") ? s(A) : t0(!0),
              Jt());
          };
          const a = u("#miUse10");
          (a &&
            (a.onclick = () => {
              (qn(10), t0(!0), Jt());
            }),
            (u("#miX").onclick = () => t0(!0)));
        },
      );
    },
    qy = function s() {
      e1.inv();
      const A = u("#t-inv"),
        n = A.querySelector(".invgrid"),
        t = u("#iSort"),
        e = Hh().length;
      n.insertAdjacentHTML("beforeend", Jy());
      for (let w = r.inv.length + e; w < INV_MAX; w++)
        n.insertAdjacentHTML("beforeend", '<span class="it empty"></span>');
      const a = {};
      for (const w of ["bBest", "bDonKho", "bStash", "bSellAll", "bKtcI"])
        a[w] = u("#" + w);
      const i = document.createElement("div");
      ((i.className = "u2bag"),
        (i.innerHTML = `<div class="u2bh"><span>${r.inv.length}/${INV_MAX}</span><button class="u2buy x${ke ? " on" : ""}" id="bInvX" title="Mở rộng rương (như JX1)">Mở rộng</button><span class="sp"></span></div>`),
        i.firstChild.appendChild(t),
        i.appendChild(n));
      const o = [...n.children],
        l = s1.map(() => []);
      o.slice(F2).forEach((w, p) => {
        const P = Math.floor(p / Bt);
        (l[P] && l[P].push(w), w.remove());
      });
      const d = document.createElement("div");
      if (((d.className = "u2rx"), (d.hidden = !ke), ke)) {
        const w = r.invX | 0;
        if (
          (Pn > w && (Pn = Math.min(w, s1.length - 1)),
          (d.innerHTML = `<div class="u2rxt">Mở rộng rương</div><div class="u2rxtab">${s1.map((p, P) => `<button data-rx="${P}" class="${P === Pn ? "on" : ""}${P < w ? "" : " lk"}" title="${P < w ? "Rương " + (P + 1) : "Chưa mở · " + p + " KNB"}">${P + 1}${P < w ? "" : "🔒"}</button>`).join("")}</div>`),
          Pn < w)
        ) {
          const p = document.createElement("div");
          ((p.className = "invgrid"),
            l[Pn].forEach((P) => p.appendChild(P)),
            d.appendChild(p));
        } else
          d.insertAdjacentHTML(
            "beforeend",
            `<div class="u2rxlk">${Pn > w ? `<p class="dim small">Mở Rương ${w + 1} trước.</p>` : `<p>Rương ${Pn + 1}: <b>+${Bt} ô</b></p><button class="btn" id="bRxBuy" ${(r.knb | 0) >= s1[Pn] ? "" : "disabled"}>Mở với ${s1[Pn]} KNB</button><p class="dim small">Có ${X(r.knb || 0)} KNB</p>`}</div>`,
          );
        d.insertAdjacentHTML(
          "beforeend",
          '<button class="btn" id="bRxClose">Đóng lại</button>',
        );
      }
      i.insertAdjacentHTML(
        "beforeend",
        `<div class="u2money"><span>Ng.lượng</span><b>${v8(r.gold)}</b><span>Kim Ng.Bảo</span><b>${X(r.knb || 0)}</b></div><div class="u2act" id="u2invB"></div><div class="u2act" id="u2invB2"></div>`,
      );
      {
        const w = i.querySelector("#bInvX");
        w &&
          (w.onclick = (p) => {
            (p.stopPropagation(), (ke = !ke), s());
          });
      }
      const h = i.querySelector("#u2invB"),
        g = i.querySelector("#u2invB2");
      ((a.bBest.textContent = "⚔ Mặc đồ tốt"),
        (a.bDonKho.textContent = "🧹 Dọn kho"),
        (a.bStash.textContent = "📦 Kho chung"));
      {
        const w = r.inv.filter((p) => !hA(p) && !Ha(p)).length;
        ((a.bSellAll.innerHTML =
          a.bSellAll.disabled || !w
            ? "💰 Bán đồ thừa"
            : `💰 Bán thừa <small>${w}</small>`),
          a.bSellAll.classList.toggle("u2sell", !a.bSellAll.disabled && w > 0));
      }
      (h.append(a.bBest, a.bDonKho, a.bStash),
        g.append(a.bSellAll),
        typeof w0 == "function" &&
          w0() &&
          typeof oe == "function" &&
          h.insertAdjacentHTML(
            "beforeend",
            `<button class="btn sm" id="u2kren">🔨 Kho Rèn <small>${s0().length}</small></button>`,
          ),
        g.insertAdjacentHTML(
          "beforeend",
          '<button class="btn sm" id="u2filt">⚙ Bộ lọc nhặt</button>',
        ));
      const f = document.createElement("div");
      ((f.className = "u2bagrow"),
        f.append(i, d),
        (A.innerHTML = ""),
        A.appendChild(f),
        document.body.classList.toggle("u2rxon", ke),
        d.querySelectorAll("[data-rx]").forEach(
          (w) =>
            (w.onclick = () => {
              ((Pn = +w.dataset.rx), s());
            }),
        ));
      {
        const w = u("#bRxClose");
        w &&
          (w.onclick = () => {
            ((ke = !1), s());
          });
        const p = u("#bRxBuy");
        p &&
          (p.onclick = () => {
            r4();
          });
      }
      ((u("#u2filt").onclick = () => P8("loot")),
        A.querySelectorAll("[data-mi]").forEach(
          (w) =>
            (w.onclick = (p) => {
              (p.stopPropagation(), Ly(w.dataset.mi));
            }),
        ));
      const m = u("#u2kren");
      m && (m.onclick = () => oe("box"));
    },
    jy = function () {
      const A = Wi(),
        n = Object.keys(T0().ore).reduce((m, w) => m + N("ore", w), 0),
        t = Object.keys(T0().ht).reduce((m, w) => m + N("ht", w), 0),
        e = r.inv
          .concat(s0(), Object.values(r.eq))
          .filter((m) => m && typeof le == "function" && le(m)).length,
        a = Object.keys(T0().shard).filter(
          (m) => _A[m] && N("shard", m) >= _A[m],
        ).length,
        i = Object.values(r.eq)
          .filter((m) => m && qt(m))
          .concat(r.inv.filter(qt))
          .filter((m) => !Xe(m)).length,
        o = G1.map(([m]) => r.eq[m]).filter(Boolean),
        l = (
          w0()
            ? [
                ["tl", "Tinh luyện"],
                ["hut", "Lấy"],
                ["phoi", "Chế tạo"],
                ["kham", "Khảm nạm"],
                ["box", "Kho Rèn"],
              ]
            : []
        ).concat([["ht", "Hoàng Kim"]]),
        d = o.length,
        h = o
          .map((m, w) => {
            const p = -Math.PI / 2 + (w * 2 * Math.PI) / Math.max(1, d),
              P = 118 + Math.cos(p) * 92 - 19,
              v = 118 + Math.sin(p) * 92 - 19;
            return `<div class="u2ri" style="left:${P.toFixed(0)}px;top:${v.toFixed(0)}px">${T1(m)}</div>`;
          })
          .join(""),
        g = (m, w, p) =>
          `<div class="${p ? "cp" : ""}">${m}: <b>${w}</b></div>`;
      u("#t-forge").innerHTML =
        `<div class="u2tabs">${l.map(([m, w]) => `<button data-fg="${m}">${w}</button>`).join("")}</div>
    <div class="u2forge"><div class="u2circ"><svg viewBox="0 0 236 236"><g fill="none" stroke="#d9b65a" stroke-width="1.6" opacity=".85"><circle cx="118" cy="118" r="112"/><circle cx="118" cy="118" r="104"/><circle cx="118" cy="118" r="60"/>
      <rect x="44" y="44" width="148" height="148"/><rect x="44" y="44" width="148" height="148" transform="rotate(45 118 118)"/><circle cx="118" cy="118" r="30" stroke-dasharray="4 3"/></g></svg>
      <div class="u2rc"><img src="img/ep/ht.png" alt=""><b>${t}</b><small>Huyền Tinh</small></div>${h}</div>
      <div class="u2ftxt"><div class="u2h">Nguyên liệu</div>
        ${w0() ? g("Huyền Tinh Khoáng Thạch", t) + g("Đá thuộc tính", n) + g("Phôi đồ Tím", e) + g("Kho Rèn", `${s0().length}/${A1}`) : ""}
        ${g("Mảnh Hoàng Kim đủ ghép", a, a > 0)}${g("Thủy Tinh Trắng", N("misc", "wc"))}${g("Thần Bí Khoáng Thạch", N("misc", "mys"))}
        ${A.ench ? '<div class="cp">Có thể khảm nạm</div>' : ""}${A.up ? '<div class="cp">Huyền Tinh thăng cấp được</div>' : ""}
        <div class="u2h">Quy tắc</div><div class="dim small">Cường hóa +1…+${K1}, mỗi cấp +${Math.round(C3 * 100)}% thuộc tính gốc, +${Math.round(O3 * 100)}% các dòng thuộc tính. Bấm món đồ trên vòng pháp trận để rèn riêng (cường hóa, tẩy luyện).</div>
        <div class="u2btns"><button class="btn sm" id="u2fgOpt">Tự động rèn…</button></div></div></div>`;
      const f = { ht: () => zi(), batch: () => yv() };
      (document
        .querySelectorAll("#t-forge [data-fg]")
        .forEach(
          (m) =>
            (m.onclick = () => (f[m.dataset.fg] || (() => oe(m.dataset.fg)))()),
        ),
        (u("#u2fgOpt").onclick = () => P8("other")),
        document.querySelectorAll("#t-forge .u2ri [data-uid]").forEach(
          (m) =>
            (m.onclick = () => {
              const w = Object.values(r.eq).find(
                (p) => p && p.uid === +m.dataset.uid,
              );
              w && M2(w);
            }),
        ));
    },
    zy = function (A) {
      const n = () => H2(),
        t = (a) => () => {
          (uo(), a());
        },
        e = (a, i) => {
          const o = A.querySelector(a);
          o && (o.onclick = i);
        };
      if (
        (A.querySelectorAll("[data-dg]").forEach(
          (a) => (a.onclick = t(() => sr(a.dataset.dg))),
        ),
        e("#wbGo", t(B7)),
        e("#wbClaim", () => {
          (H7(), n());
        }),
        e("#dgOut", () => {
          (c.dg.kind === "wb" ? Ga(!1) : (M("Rời phó bản."), ut()), n());
        }),
        e("#gTower", t(g2)),
        e("#gTowerOut", () => {
          (Ia(!1), n());
        }),
        A.querySelectorAll(".petpick [data-p]").forEach(
          (a) =>
            (a.onclick = () => {
              ($d(+a.dataset.p), n());
            }),
        ),
        J0 === "boat")
      ) {
        (Br(A), e("#boatGo", t(kr)));
        const a = A.querySelector("#boatOut");
        if (a) {
          const i = a.onclick;
          a.onclick = () => {
            (i(), n());
          };
        }
      }
      if (J0 === "horse") {
        const a = u("#mBody");
        ((a.id = "mBodyX"), (A.id = "mBody"));
        try {
          m7(n);
        } finally {
          ((A.id = ""), (a.id = "mBody"));
        }
      }
    },
    Qy = function () {
      if (Zy(J0) || J0 === "act" || J0 === "tm") {
        const l = J0;
        ((J0 = "dt"), l !== "act" && setTimeout(() => w1(l), 0));
      }
      const A = !1;
      A
        ? (u("#t-quest").innerHTML = `<div class="dtabs"></div>${Ak(J0)}`)
        : e1.quest();
      const n = u("#t-quest"),
        t = n.querySelector(".dtabs");
      if (!t) return;
      const e = document.createElement("div");
      for (e.className = "u2qd"; t.nextSibling;) e.appendChild(t.nextSibling);
      const a = ([l, d]) =>
          `<button data-qt="${l}" class="${J0 === l ? "on" : ""}">${d}${l === "boat" && Ua() ? " ●" : ""}</button>`,
        i = document.createElement("div");
      ((i.className = "u2tree"),
        (i.innerHTML = `<div class="u2tg">⊟ Nhiệm vụ</div>${Wy.map(a).join("")}<div class="u2tg">⊟ Phó bản · Hoạt động</div>${$h.map(([l, d]) => `<button data-act="${l}">${d}${l === "boat" && Ua() ? " ●" : ""}</button>`).join("")}<div class="u2tg">⊟ Khác</div><button id="u2gift">Phần thưởng</button>`),
        (n.innerHTML = ""));
      const o = document.createElement("div");
      ((o.className = "u2quest"),
        o.appendChild(i),
        o.appendChild(e),
        n.appendChild(o),
        n.insertAdjacentHTML(
          "beforeend",
          `<div class="u2btns u2qb"><button class="btn sm${ye ? " on" : ""}" id="u2trkB">${ye ? "Hủy theo dõi" : "Theo dõi NV"}</button></div>`,
        ),
        i.querySelectorAll("[data-qt]").forEach(
          (l) =>
            (l.onclick = () => {
              ((J0 = l.dataset.qt), H2());
            }),
        ),
        i
          .querySelectorAll("[data-act]")
          .forEach((l) => (l.onclick = () => w1(l.dataset.act))),
        (u("#u2gift").onclick = () => Wt(!0)),
        (u("#u2trkB").onclick = () => {
          ((ye = !ye), (r.u20trk = ye), B(), H2(), yh());
        }),
        A && zy(e));
    },
    yh = function s() {
      const A = u("#u20trk");
      if (!A) return;
      const n = [];
      if (r.fac && r.lvl >= (typeof mA < "u" ? mA : 20)) {
        const a = X0(),
          i = a.task;
        i &&
          n.push(
            `<div data-q="dt"><b>Dã Tẩu</b> <small>chuỗi ${a.chain || 0}</small><br>${D(se(i))} <span class="${jn(i) ? "cp" : "gold"}">${jn(i) ? "xong" : Li(i)}</span></div>`,
          );
      }
      (c.sat &&
        n.push('<div data-q="st"><b>Sát Thủ</b><br>Truy sát mục tiêu</div>'),
        c.dg &&
          n.push(
            `<div><b>${D(c.dg.kind === "boat" ? "Đi thuyền" : c.dg.d ? c.dg.d.n : "Phó bản")}</b></div>`,
          ));
      const t = !!r.u20trkMin,
        e =
          ye && n.length
            ? `<div class="u2trh" title="Thu gọn / mở rộng">Nhiệm vụ Theo Dấu <b>${t ? "▸" : "▾"}</b></div>${t ? "" : n.join("")}`
            : "";
      if (A.innerHTML !== e) {
        ((A.innerHTML = e),
          (A.style.display = e ? "" : "none"),
          A.querySelectorAll("[data-q]").forEach(
            (i) => (i.onclick = () => mo("quest", i.dataset.q)),
          ));
        const a = A.querySelector(".u2trh");
        a &&
          (a.onclick = () => {
            ((r.u20trkMin = !r.u20trkMin), B(), s());
          });
      }
    },
    Gy = function () {
      const A = (i) => (y1.includes(i) || aa[i] ? m4(i) : null),
        n = {
          ldp: "ktcLdp",
          ldt: "ktcLdt",
          mt90: "ktcMt",
          dgt: "ktcDgt",
          dtbk: "ktcDtbk",
          rngua: "ktcRngua",
        },
        t = !1,
        e = t
          ? []
          : Po[w3][1].map((i) => r1.find((o) => o.k === i)).filter(Boolean),
        a = (i) => {
          const o = sa(i),
            l = A(i.k);
          return `<div class="u2card${o ? "" : " bad"}" title="${D(i.d)}"><div class="u2ct">${D(i.n)}</div><div class="u2cb"><img src="${i.ic}" alt=""><div><div>Giá: <b class="${i.knb ? "gold" : ""}">${S6(i)}</b></div><small class="dim">${i.k === "knb" ? `Không giới hạn · hôm nay đổi ${U3().n}` : i.k === "ldt" ? `Hôm nay ${h4().n}/${f4} · có ${l}` : i.k === "vlmt" || i.k === "ttk" ? `Đã dùng ${Bn(i.k)}/${VA(i.k)} · có ${m4(i.k)}${At() ? "" : " · cần cấp 80"}` : l != null ? `Đang có ${l}` : D(i.d.slice(0, 40))}</small></div></div>
      <div class="u2cf"><button class="u2buy" data-ktc="${i.k}" ${o && Tt(i) ? "" : "disabled"}>Mua</button>${i.k === "vlmt" || i.k === "ttk" || i.k === "dtbk" || i.k === "ldp" || i.k === "dgt" || i.k === "ldt" ? "" : `<button class="u2buy x" data-ktc10="${i.k}" ${o && Tt(i, 10) ? "" : "disabled"}>×10</button>`}${i.k === "knb" ? `<button class="u2buy x" data-ktc100="${i.k}" ${o && Tt(i, 100) ? "" : "disabled"}>×100</button>` : ""}${(i.k === "vlmt" || i.k === "ttk") && typeof ea == "function" && ea(i.k) > 0 ? `<button class="u2buy x on" data-ktcsell="${i.k}" title="Bán lại ${ea(i.k)} cuốn dư (đã dùng + đang có vượt ${VA(i.k)}), ${i.knb} KNB / cuốn">Bán dư ${ea(i.k)}</button>` : ""}${E6(i, "u2buy u")}</div></div>`;
        };
      (J(
        `<h3>Kỳ Trân Các</h3><div class="u2shop"><div class="u2cat">${Po.map(([i], o) => `<button data-kc="${o}" class="${o === w3 ? "on" : ""}">${i}</button>`).join("")}</div>
    <div><div class="u2sh"><img src="img/ep/knb.png" alt=""> <span>Kim Nguyên Bảo:</span> <b class="gold">${r.knb || 0}</b> <span>· Ngân lượng:</span> <b>${v8(r.gold)}</b></div>${t ? "" : I6()}${t ? `<div class="u2tm">${b7().replace('<p class="desc">không', '<p class="desc">Thần Mã không')}</div>` : `<div class="u2cards">${e.map(a).join("")}${w3 === 0 ? `<div class="u2card" title="Đổi Kim Nguyên Bảo ra ngân lượng"><div class="u2ct">Đổi KNB → Lượng</div><div class="u2cb"><img src="img/ep/knb.png" alt=""><div><div>1 KNB = <b>${v8(X3)}</b></div><small class="dim">mua 1 KNB = ${v8(d4)} · đổi lại được 80%</small></div></div><div class="u2cf">${[1, 10, 100].map((i) => `<button class="u2buy x" data-k2g="${i}" ${(r.knb | 0) >= i ? "" : "disabled"}>${i}</button>`).join("")}</div></div>` : ""}</div>`}
    ${t ? "" : `${ft() ? `<div class="small u2buf">Đang có: ${ft()}</div>` : ""}<p class="dim small">Kim Nguyên Bảo rơi từ trùm (10%), trùm Hoàng Kim / boss tuần (50%). Mua là dùng ngay; riêng Võ Lâm Mật Tịch, Tẩy Tủy Kinh, Rương Ngựa vào Hành trang (bán Chợ được), bấm <b>Dùng</b> để dùng. Rê chuột lên vật phẩm để xem công dụng.</p>`}</div></div>`,
        () => {
          (document.querySelectorAll("#mBody [data-kc]").forEach(
            (o) =>
              (o.onclick = () => {
                ((w3 = +o.dataset.kc), AA());
              }),
          ),
            t && y7(() => AA()),
            document
              .querySelectorAll("#mBody [data-ktc]")
              .forEach((o) => (o.onclick = () => ze(o.dataset.ktc, 1))),
            document
              .querySelectorAll("#mBody [data-ktc10]")
              .forEach((o) => (o.onclick = () => ze(o.dataset.ktc10, 10))),
            document
              .querySelectorAll("#mBody [data-ktc100]")
              .forEach((o) => (o.onclick = () => ze(o.dataset.ktc100, 100))),
            $6(),
            document.querySelectorAll("#mBody [data-invx]").forEach(
              (o) =>
                (o.onclick = () => {
                  (r4(), AA());
                }),
            ),
            document.querySelectorAll("#mBody [data-k2g]").forEach(
              (o) =>
                (o.onclick = () => {
                  (pm(+o.dataset.k2g), AA());
                }),
            ),
            document.querySelectorAll("#mBody [data-ktcsell]").forEach(
              (o) =>
                (o.onclick = () => {
                  (gm(o.dataset.ktcsell), AA());
                }),
            ));
          const i = (o, l) => {
            const d = u("#" + o);
            d && (d.onclick = l);
          };
          (i("ktcLdp", ta),
            i("ktcDgt", l4),
            i("ktcDtbk", () => {
              (t0(!0),
                u3("skill"),
                y("Bấm 📕 ở võ công 90 đã học để đại thành cấp 20"));
            }),
            i("ktcMt", () => {
              if (r.lvl < 80 && !D0()) {
                y("Võ công 90 cần cấp 80");
                return;
              }
              (t0(!0),
                u3("skill"),
                y("Bấm + ở võ công 90 để lĩnh ngộ (không tốn điểm)"));
            }),
            i("ktcLdt", () => {
              if (r.lvl < mA) {
                y(`Dã Tẩu mở từ cấp ${mA}`);
                return;
              }
              (k2(!1), AA());
            }),
            i("ktcRngua", () => {
              (qn(1), AA());
            }),
            i("ktcRngua10", () => {
              (qn(10), AA());
            }));
        },
      ),
        u("#modal").classList.add("u2ktc"));
    },
    P8 = function (A) {
      (A && (D1 = A), u3("tt"));
    },
    Ky = function () {
      const A = (i, o, l) =>
          `<label><input type="checkbox" id="${i}" ${o ? "checked" : ""}> ${l}</label>`,
        n = typeof X0 == "function" ? X0() : {};
      let t = "";
      if (
        (D1 === "basic"
          ? (t = `<div class="u2h">Tự đánh</div>${A("tAuto", !fA(), "Tự đánh quái (Auto) · phím F")}${A("tMap", r.autoMap !== !1, "Tự đổi bãi luyện công theo cấp")}${A("tClose", !!r.closeAtk, "Đánh tiếp cận (chạy sát quái rồi mới ra chiêu, cả chiêu tầm xa)")}<label>Ưu tiên mục tiêu: <select id="tPri">${w9.map(([i, o]) => `<option value="${i}" ${sc() === i ? "selected" : ""}>${o}</option>`).join("")}</select></label>${A("tRide", r.autoRide !== !1, "Tự lên ngựa khi di chuyển, xuống ngựa khi đánh chiêu không dùng trên ngựa · phím M")}
    <div class="u2h">Dược phẩm</div>${A("tPot", !r.potOff, `Tự dùng thuốc · đã dùng ${X(r.potUsed || 0)}`)}<div class="u2pot">${[
      ["potHp", "Sinh lực dưới", 50],
      ["potMp", "Nội lực dưới", 50],
      ["potUrg", "Nguy kịch (uống chồng) dưới", 30],
    ]
      .map(
        ([i, o, l]) =>
          `<label>${o} <select data-pk="${i}">${[...Array(18)]
            .map((d, h) => (h + 1) * 5)
            .map(
              (d) =>
                `<option value="${d}" ${(r[i] ?? l) === d ? "selected" : ""}>${d}%</option>`,
            )
            .join("")}</select></label>`,
      )
      .join(
        " ",
      )}</div>${A("tBuy", r.potBuy !== !1, "Tự mua thuốc khi hết (tối đa 20% ngân lượng)")}
    <div class="u2btns">${[0, 1]
      .map((i) => {
        const o = typeof f2 == "function" ? f2(i) : { name: "" };
        return `<button class="btn sm" data-potsl="${i}">${i ? "Nội lực" : "Sinh lực"}: ${D(o.name || "Tự động")} ▾</button>`;
      })
      .join("")}</div>
    <div class="u2h">Trang bị</div>${A("tEq", !!r.autoEquip, "Tự mặc đồ tốt hơn khi nhặt")}${A("tJunk", r.autoJunk !== !1, "Tự bán đồ thừa (yếu hơn đồ đang mặc, vũ khí sai loại; giữ 6 trang sức để hợp Huyền Tinh)")}${A("tWb", r.autoBuy !== !1, "Tự mua vũ khí đúng loại ở Biện Kinh khi mạnh hơn ≥ 25%")}
`)
          : D1 === "skill"
            ? (t = `<div class="u2h">Xoay chiêu</div>${A("tRot", r.rot !== !1, "Xoay chiêu tự động: luân phiên chiêu ở ô F1–F4 (phím R), luôn có 2 chiêu mạnh nhất, bỏ chiêu hết nội lực")}${v6()}
    <div class="u2h">Cộng điểm</div>${A("tPts", r.autoPts === !0, "Tự cộng điểm tiềm năng và võ công")}<div class="u2btns"><button class="btn sm" id="tSug">Gợi ý cộng điểm</button></div>`)
            : D1 === "other" &&
              (t = `<div class="u2h">Lò rèn</div>${A("fgFuse", r.autoFuse !== !1, `Tự hợp Huyền Tinh từ trang sức thừa (3 món → 1, ${j(XA())} lượng; mỗi 30 giây) · có ${wt().length} món`)}
    <div class="u2h">Nhiệm vụ</div>${A("tDt", n.auto !== !1, "Dã Tẩu tự trả / nhận")}${A("tLdt", r.autoLdt !== !1, "Tự dùng Lệnh Bài Dã Tẩu khi hết lượt")}
`),
        D1 === "sys")
      ) {
        (e1.more(),
          xh(),
          u("#t-more").insertAdjacentHTML("afterbegin", tk()),
          kh());
        return;
      }
      if (
        ((u("#t-more").innerHTML = `<div class="u2tabs">${Th()
          .map(
            ([i, o]) =>
              `<button data-tt="${i}" class="${D1 === i ? "on" : ""}">${o}</button>`,
          )
          .join("")}</div><div class="u2tt" id="u2ttBody">${t}</div>`),
        kh(),
        D1 === "loot")
      ) {
        Jt();
        return;
      }
      const e = (i, o) => {
        const l = u(i);
        l &&
          (l.onchange = () => {
            (o(l.checked), B());
          });
      };
      (e("#tAuto", (i) => d2(i ? "auto" : "manual")),
        e("#tRot", (i) => {
          ((r.rot = i), ai(), (c.dirty = !0));
        }),
        e("#tRide", (i) => {
          r.autoRide = i;
        }),
        e("#tMap", (i) => {
          r.autoMap = i;
        }),
        e("#tClose", (i) => {
          r.closeAtk = i;
        }),
        e("#tBoss", (i) => {
          ((r.bossFirst = i), (r.tgtPri = i ? "hk" : "near"));
        }));
      {
        const i = u("#tPri");
        i &&
          (i.onchange = () => {
            ((r.tgtPri = i.value), (r.bossFirst = i.value === "hk"), B());
          });
      }
      (document.querySelectorAll("#t-more [data-pk]").forEach(
        (i) =>
          (i.onchange = () => {
            ((r[i.dataset.pk] = +i.value), B());
          }),
      ),
        e("#tPot", (i) => {
          r.potOff = !i;
        }),
        e("#tBuy", (i) => {
          r.potBuy = i;
        }),
        e("#tEq", (i) => {
          r.autoEquip = i;
        }),
        e("#tWb", (i) => {
          r.autoBuy = i;
        }),
        e("#tJunk", (i) => {
          r.autoJunk = i;
        }),
        e("#tPts", (i) => {
          ((r.autoPts = i), i && (Oe(), Xn(), u0()));
        }),
        e("#tDt", (i) => {
          X0().auto = i;
        }),
        e("#tLdt", (i) => {
          r.autoLdt = i;
        }),
        e("#fgFuse", (i) => {
          ((r.autoFuse = i), i && T2());
        }),
        e("#tGoldMsg", (i) => {
          r.goldMsg = i;
        }),
        e("#tMatMsg", (i) => {
          r.matMsg = i;
        }));
      {
        const i = u("#tLootMsg");
        i &&
          (i.onchange = () => {
            ((r.lootMsg = +i.value), B());
          });
      }
      document
        .querySelectorAll("#t-more [data-potsl]")
        .forEach((i) => (i.onclick = () => oi(+i.dataset.potsl)));
      const a = u("#tSug");
      (a && (a.onclick = C2), b6());
    },
    kh = function () {
      document.querySelectorAll("#t-more [data-tt]").forEach(
        (A) =>
          (A.onclick = () => {
            ((D1 = A.dataset.tt), ti());
          }),
      );
    },
    Ry = function () {
      if ((D1 === "sys" && (D1 = "basic"), Pt === "tt")) return Ky();
      (e1.more(), xh());
      const A = u("#t-more");
    },
    xh = function () {
      const A = u("#t-more");
      for (const t of A.querySelectorAll("h3"))
        if (/^Tự động/.test(t.textContent)) {
          const e = t.nextElementSibling;
          (t.remove(), e && e.remove());
        }
      for (const t of ["#cForge", "#cBuy"]) {
        const e = u(t);
        e && e.closest("label").remove();
      }
      const n = [...A.querySelectorAll("h3")].find((t) =>
        /^Tiện ích/.test(t.textContent),
      );
      n && (n.textContent = "Tiện ích");
    },
    Yy = function () {
      const A = u("#u2ttBody");
      if (!A || !Ch()) return;
      const n = u("#t-inv");
      ((A.innerHTML = ""),
        [...n.children]
          .filter((e) => e.matches("h3, .lootf, #epLoot"))
          .forEach((e) => A.appendChild(e)));
      const t = A.querySelector("h3");
      (t && t.classList.add("u2h"), (n.innerHTML = ""), (Y = !0));
    },
    Bh = function () {
      const A = u("#u20zn");
      if (!A || !r.fac) return;
      const isActuallyTown = c.town && (!c.curZone || c.curZone.id === "town" || c.curZone.id === 37 || (H0.town && c.curZone.id === H0.town.id));
      const n =
        c.tower && typeof on < "u"
          ? `${on.n} · tầng ${c.tower.floor}`
          : c.dg
            ? c.dg.kind === "boat"
              ? "Phong Lăng Độ"
              : c.dg.d
                ? c.dg.d.n
                : "Phó bản"
            : isActuallyTown
              ? (H0.town && H0.town.n) || "Thành thị"
              : c.curZone && c.curZone.n
                ? c.curZone.n
                : (() => {
                    const t = dA(Math.min(r.stage, l0)),
                      e = B0[t],
                      a = Hn[t],
                      i = (r.zalt || {})[t] || 0;
                    return ((a && i && a[i - 1]) || e).n;
                  })();
      A.textContent !== n && (A.textContent = n);
    },
    Fy = function s(A) {
      const n = u("#u20zl");
      if (!A && !n.classList.contains("hidden")) {
        (n.classList.add("hidden"),
          u("#u20zone").style.removeProperty("z-index"));
        return;
      }
      const t = V0(Math.min(r.stage, l0)),
        e = B0.map((o, l) => {
          const d = Ui(l),
            h = dA(Math.min(r.stage, l0)) === l,
            g = Hn[l],
            f = (r.zalt || {})[l] || 0,
            m = (g && f && g[f - 1]) || o,
            w =
              g && d
                ? `<div class="zalt">${[o]
                    .concat(g)
                    .map(
                      (p, P) =>
                        `<button class="chip2${P === f ? " on" : ""}" data-za="${l}:${P}">${D(p.n)}</button>`,
                    )
                    .join("")}</div>`
                : "";
          return `<button class="zrow${h ? " cur" : ""}${d ? "" : " lock"}" data-z="${l}" ${d ? "" : "disabled"}><b>${D(m.n)}</b><span>${Uc(m)} Cấp ${o.lo}–${o.hi}</span></button>${w}`;
        }).join("");
      ((n.innerHTML = `<div class="u2zh"><b>Bản đồ luyện công</b><label><input type="checkbox" id="u20za" ${r.autoMap !== !1 ? "checked" : ""}> Tự đổi theo cấp</label></div>
    <div class="u2zs">Quái hệ: ${Xc(t)}</div><div class="u2zr">${e}</div>`),
        n.classList.remove("hidden"));
      const a = n.querySelector(".zrow.cur");
      a && !A && a.scrollIntoView({ block: "center" });
      const i = (o) => {
        if (c.town && typeof E1 === "function") E1();
        c.town = !1;
        ((r.mode === "quest" || r.mode === "dg") &&
          ((r.mode = "farm"),
          M("⚔ Chọn bãi luyện công: chuyển sang chế độ Luyện công.")),
          (r.autoMap = !1),
          fn(o, "Chọn bãi luyện công"),
          B(),
          F(),
          n.classList.add("hidden"),
          u("#u20zone") && u("#u20zone").style.removeProperty("z-index"));
        Bh();
      };
      (n
        .querySelectorAll(".zrow")
        .forEach((o) => (o.onclick = () => i(+o.dataset.z))),
        n.querySelectorAll("[data-za]").forEach(
          (o) =>
            (o.onclick = () => {
              const [l, d] = o.dataset.za.split(":").map(Number);
              (r.zalt || (r.zalt = {}))[l] = d;
              if (c.town && typeof E1 === "function") E1();
              c.town = !1;
              (r.mode === "quest" || r.mode === "dg") &&
                ((r.mode = "farm"),
                M("⚔ Chọn bãi luyện công: chuyển sang chế độ Luyện công."));
              r.autoMap = !1;
              if (dA(Math.min(r.stage, l0)) === l) {
                r.wave = 1;
                c.enemies = [];
                c.corpses = [];
                c.spawnT = 0.3;
                c.zoneShown = null;
                const targetZone = V0(Math.min(r.stage, l0));
                vn(targetZone);
                c.banner = { t: 2.2, text: targetZone.n, sub: `Cấp ${targetZone.lo}–${targetZone.hi}` };
                M(`🗺 Chọn bãi luyện công: tới <b>${D(targetZone.n)}</b>`);
                Bh();
                B();
                F();
                n.classList.add("hidden");
                u("#u20zone") && u("#u20zone").style.removeProperty("z-index");
              } else {
                i(l);
              }
            }),
        ),
        (u("#u20za").onchange = (o) => {
          ((r.autoMap = o.target.checked), B());
        }));
    },
    Vy = async function s() {
      if (typeof g0 != "function" || !g0())
        return y("Bản chơi trên máy không có bảng xếp hạng");
      const A = d8
        .map(
          ([i, o]) =>
            `<button data-rk="${i}" class="${i === k.rank ? "on" : ""}">${o}</button>`,
        )
        .join("");
      J(
        `<h3>Bảng Xếp Hạng</h3><div class="dtabs" id="rkTabs">${A}</div><div id="rkBody"><p class="dim small">Đang tải…</p></div>`,
        () => {
          document.querySelectorAll("#rkTabs [data-rk]").forEach(
            (i) =>
              (i.onclick = () => {
                ((k.rank = i.dataset.rk), s());
              }),
          );
        },
      );
      try {
        await s3();
      } catch (i) {
        const o = u("#rkBody");
        o && (o.innerHTML = `<p class="reqbad">${D(i.message)}</p>`);
        return;
      }
      const n = u("#rkBody");
      if (!n) return;
      try {
        await Zf(n);
      } catch (i) {
        n.innerHTML = `<p class="reqbad">${D(i.message || i)}</p>`;
        return;
      }
      const t = u("#nrCol");
      t && (t.style.display = "none");
      const e = u("#nrFac");
      (e &&
        (e.onchange = (i) => {
          ((k.rfac = i.target.value), s());
        }),
        n.querySelectorAll("[data-pn]").forEach(
          (i) =>
            (i.onclick = (o) => {
              (o.preventDefault(), gn(i.dataset.pn, () => s()));
            }),
        ));
      const a =
        r &&
        r.name &&
        [...n.querySelectorAll("tr")].findIndex(
          (i) =>
            i.querySelector("[data-pn]") &&
            i.querySelector("[data-pn]").dataset.pn === r.name,
        );
      n.insertAdjacentHTML(
        "afterbegin",
        `<p class="small">Hạng của bạn: <span class="gold" style="font-weight:700">${a > 0 ? "#" + a : "ngoài top 50"}</span>${k.user ? "" : ' <span class="dim">(đăng nhập ở Hệ thống › Tài khoản để có tên trên bảng)</span>'}</p>`,
      );
    },
    _h = () => document.body.classList.contains("u20"),
    Dn = () => _h() || document.body.classList.contains("u2m"),
    e1 = {
      char: _a,
      skill: In,
      inv: Jt,
      forge: Or,
      quest: H2,
      more: ti,
      ktc: AA,
    },
    Pt = "sys",
    D1 = "basic",
    ye = !0,
    v8 = (s) => (
      (s = Math.floor(s)),
      s >= 1e4 ? `${X(Math.floor(s / 1e4))} vạn ${s % 1e4} lượng` : `${s} lượng`
    ),
    z2 = (s) => {
      document.body.dataset.u2t = s;
    },
    Xy = {
      helm: [92, 8, 64, 64],
      amulet: [180, 8, 60, 40],
      cuff: [12, 34, 46, 66],
      armor: [92, 80, 64, 98],
      weapon: [180, 56, 60, 112],
      ring1: [12, 108, 46, 40],
      ring2: [12, 154, 46, 40],
      belt: [92, 186, 64, 34],
      pendant: [12, 200, 46, 66],
      boot: [180, 176, 60, 62],
      horse: [92, 228, 64, 64],
    },
    Mh = [
      ["vlmt", "img/ep/mt90.png"],
      ["ttk", "img/ep/dtbk.png"],
      ["rngua", "img/ep/box2.png"],
      ["ldt", "img/ep/ldt.png"],
    ],
    Uy = {
      vlmt: "Từ cấp 80: +1 điểm kỹ năng / cuốn · mỗi nhân vật tối đa 15 cuốn, mỗi lần chuyển sinh +5",
      ttk: "Từ cấp 80: +1 → 5 điểm tiềm năng / cuốn (cấp 88 trở lên +5) · tối đa 15 cuốn, mỗi lần chuyển sinh +15",
      rngua: "Mở ra 1 con ngựa (Thường → Chí tôn)",
      ldt: "+20 lượt Dã Tẩu trong ngày · tối đa 5 / ngày",
    },
    Hh = () => Mh.filter(([s]) => N("misc", s) > 0),
    Jy = () =>
      Hh()
        .map(
          ([s, A]) =>
            `<button class="it r1 mi" data-mi="${s}" title="${D(x2(s))}"><img src="${A}" alt=""><i>${N("misc", s)}</i></button>`,
        )
        .join(""),
    ke = !1,
    Pn = 0,
    Wy = [
      ["dt", "Dã Tẩu"],
      ["st", "Sát Thủ"],
    ],
    $h = [
      ["dg", "Phó bản"],
      ["boat", "Đi thuyền"],
      ["tower", "Tháp thử thách"],
      ["wb", "Boss tuần"],
      ["horse", "Mã trường"],
      ["pet", "Đồng hành"],
    ],
    Zy = (s) => $h.some((A) => A[0] === s),
    Ak = (s) =>
      s === "boat"
        ? xr()
        : s === "tower"
          ? Id()
          : s === "pet"
            ? Sd()
            : s === "dg"
              ? $7()
              : s === "wb"
                ? T7()
                : s === "horse"
                  ? g7()
                  : e7(),
    Po = [
      ["Tiện ích", ["knb", "tt", "qht", "ldt"]],
      ["Quý hiếm", ["rht", "rda", "mt90", "dtbk", "vlmt", "ttk"]],
      ["Đặc biệt", ["ldp", "dgt"]],
      ["Thú cưỡi", ["rngua"]],
    ],
    w3 = 0,
    nk = [
      ["basic", "Cơ bản"],
      ["skill", "Kỹ năng"],
      ["loot", "Nhặt đồ"],
      ["other", "Khác"],
    ],
    Th = () => nk,
    tk = () =>
      `<div class="u2tabs">${Th()
        .map(
          ([s, A]) =>
            `<button data-tt="${s}" class="${D1 === s ? "on" : ""}">${A}</button>`,
        )
        .join("")}</div>`,
    Ch = () => vA === "more" && Pt === "tt" && D1 === "loot";
  ((_a = () => (Dn() ? (z2("char"), Iy()) : e1.char())),
    (In = () => (Dn() ? (z2("skill"), Sy()) : e1.skill())),
    (Jt = () =>
      Dn() ? (Ch() ? (e1.inv(), Yy()) : (z2("inv"), qy())) : e1.inv()),
    (Or = () => (Dn() ? (z2("forge"), jy()) : e1.forge())),
    (H2 = () => (Dn() ? (z2("quest"), Qy()) : e1.quest())),
    (ti = () => (Dn() ? (z2(Pt === "tt" ? "tt" : "more"), Ry()) : e1.more())),
    (AA = () => (Dn() ? Gy() : e1.ktc())));
  var ek = [
      ["dg", "Phó bản"],
      ["boat", "Đi thuyền"],
      ["tower", "Tháp"],
      ["wb", "Boss tuần"],
      ["horse", "Mã trường"],
      ["pet", "Đồng hành"],
    ],
    Oh = w1;
  w1 = (s) => {
    if (!Dn()) return Oh(s === "boat" ? "dg" : s);
    if (!r.fac) return;
    if (s === "dt" || s === "st") {
      u3("quest", s);
      return;
    }
    if (s === "tm") {
      ((w3 = Po.length - 1), AA());
      return;
    }
    (s && (gA = s), (gA === "tm" || gA === "rec") && (gA = "dg"));
    const A = () =>
      ek
        .map(
          ([n, t]) =>
            `<button data-a="${n}" class="${n === gA ? "on" : ""}">${t}</button>`,
        )
        .join("");
    if (gA !== "boat") {
      Oh();
      const n = u("#actTabs");
      n &&
        ((n.innerHTML = A()),
        n
          .querySelectorAll("button")
          .forEach((t) => (t.onclick = () => w1(t.dataset.a))));
      return;
    }
    J(
      `<h3>Hoạt động</h3><div class="dtabs" id="actTabs">${A()}</div>${xr()}`,
      () => {
        (document
          .querySelectorAll("#actTabs button")
          .forEach((n) => (n.onclick = () => w1(n.dataset.a))),
          Br(u("#mBody")));
      },
    );
  };
  var ak = t0;
  ((t0 = (s) => {
    (ak(s), u("#modal").classList.remove("u2ktc"));
  }),
    document.addEventListener("pointerdown", (s) => {
      const A = u("#u20zone");
      if (A && !A.contains(s.target)) {
        const n = u("#u20zl");
        n &&
          !n.classList.contains("hidden") &&
          (n.classList.add("hidden"), A.style.removeProperty("z-index"));
      }
    }));
  var sk = function (A) {
      try {
        const n = localStorage.getItem(UA(A));
        if (!n) return null;
        let t;
        try {
          t = QA(n);
        } catch {
          t = null;
        }
        if (!t || !t.ok) {
          const a = localStorage.getItem(UA(A) + "_bak");
          try {
            t = a && QA(a);
          } catch {
            t = null;
          }
        }
        const e = t && t.state;
        return e && e.fac ? e : null;
      } catch {
        return null;
      }
    },
    vo = function (A, n, t) {
      const e = h0.res[A];
      if (!e) return -1;
      if (n && n.set && h0.set) {
        const o = n.set,
          l = h0.set[o.kind],
          d = l && l[o.grp + "." + o.sid + "." + n.d + "." + n.k],
          h = d != null && ((h0.tabs[t] || {})[Gc[A]] || {})[d];
        if (h && Object.keys(h).length) return d;
      }
      const a = g5(n),
        i = e[a >= 0 ? a + 2 : 1] ?? e[1];
      return i == null ? -1 : i - 2;
    },
    ik = function (A) {
      if (typeof h0 > "u" || !h0 || !A) return null;
      try {
        const n = A.sex ? "f" : "m",
          t = A.eq || {},
          e = t.weapon,
          a = {
            helm: vo("helm", t.helm, n),
            armor: vo("armor", t.armor, n),
            weapon: vo(e && e.d === 1 ? "range" : "melee", e, n),
            horse: -1,
          };
        a.weapon < 0 && (a.weapon = 0);
        const i = (h0.wnames[n] || [])[a.weapon] || "空手",
          o = h0.assoc[n][i] || h0.assoc[n].空手;
        return { sx: n, rows: a, asc: o ? o[0] : {}, ride: 0 };
      } catch {
        return null;
      }
    },
    p3 = function () {
      ((c0.on = !1), cancelAnimationFrame(c0.raf));
      const A = u("#csel");
      (A && A.remove(), document.removeEventListener("keydown", Eh));
    },
    Eh = function (A) {
      !c0.on ||
        !u("#modal").classList.contains("hidden") ||
        (A.key === "ArrowLeft"
          ? ((c0.sel = (c0.sel + W1 - 1) % W1), (c0.del = -1), y8())
          : A.key === "ArrowRight"
            ? ((c0.sel = (c0.sel + 1) % W1), (c0.del = -1), y8())
            : A.key === "Enter" && b8());
    },
    b8 = function () {
      const A = c0.sel;
      try {
        (localStorage.setItem(Z1, String(A)),
          sessionStorage.setItem("jxidle_in", String(A)));
      } catch {}
      if (r && r.fac && nA === A) {
        p3();
        return;
      }
      ((Tn = !0), location.reload());
    },
    y8 = function s() {
      document
        .querySelectorAll("#csel .cs-slot")
        .forEach((d) => d.classList.toggle("on", +d.dataset.i === c0.sel));
      const A = c0.st[c0.sel],
        n = A && I[A.fac],
        t = u("#csel .cs-panel");
      if (!t) return;
      const e = A && A.rw && A.rw.stat ? A.rw.stat.reborn | 0 : 0,
        a = typeof g0 == "function" && g0(),
        i =
          A && n
            ? `<div class="cs-info"><span>Nhân vật</span><b style="color:${m0[n.series]}">${D(A.name || n.n)}</b><span>Môn phái</span><span>${D(n.n)}</span>
      <span>Đẳng cấp</span><span>${A.lvl | 0 || 1}${e ? ` · CS ${e}` : ""}</span><span>Hệ</span><span style="color:${m0[n.series]}">${d0[n.series]}</span>
      <span>Ngân lượng</span><span>${j(A.gold || 0)}</span><span>Lần chơi cuối</span><span>${A.last ? new Date(A.last).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" }) : "-"}</span></div>`
            : `<div class="cs-info" style="display:block;text-align:center">Ô nhân vật ${c0.sel + 1} đang trống</div>`,
        o = c0.del === c0.sel;
      t.innerHTML = `${i}${o ? `<div class="cs-warn">Xóa vĩnh viễn <b>${D(A.name || n.n)}</b> (cấp ${A.lvl})? Không thể khôi phục.</div>` : ""}
    <div class="cs-btns">${A && n ? (o ? '<button class="red" id="csDelY">Xác nhận xóa</button><button id="csDelN">Hủy</button>' : '<button class="go" id="csGo">Vào Game</button><button class="red" id="csDel">Xóa Nhân Vật</button>') : '<button class="go" id="csNew">Tạo Nhân Vật</button>'}
      ${r && r.fac ? '<button id="csBack">Quay lại</button>' : ""}</div>
    <div class="cs-small">${a ? '<button id="csAcc">🌐 Tài khoản</button>' : '<button id="csImp">📂 Nạp từ file</button>'}</div>`;
      const l = (d, h) => {
        const g = u(d);
        g && (g.onclick = h);
      };
      (l("#csGo", b8),
        l("#csNew", b8),
        l("#csDel", () => {
          ((c0.del = c0.sel), s());
        }),
        l("#csDelN", () => {
          ((c0.del = -1), s());
        }),
        l("#csDelY", () => {
          (p3(), t5(c0.sel));
        }),
        l("#csBack", () => p3()),
        l("#csAcc", () => $0("acc")),
        l("#csImp", () =>
          k5(() => {
            (p3(), k8());
          }),
        ));
    },
    rk = function s(A) {
      if (!c0.on) return;
      c0.raf = requestAnimationFrame(s);
      const n = (A - c0.t0) / 1e3;
      document.querySelectorAll("#csel .cs-slot canvas").forEach((t) => {
        const e = +t.dataset.i,
          a = c0.st[e],
          i = t.getContext("2d");
        if ((i.clearRect(0, 0, t.width, t.height), !a)) return;
        !c0.look[e] && typeof h0 < "u" && h0 && (c0.look[e] = ik(a));
        const o = c0.look[e],
          l = W;
        let d = !1;
        if (o && typeof lt == "function") {
          W = i;
          try {
            d = lt(
              "st",
              0,
              e === c0.sel ? n : 0,
              t.width / 2,
              t.height - 20,
              4.6,
              1,
              null,
              o,
            );
          } catch {
            d = !1;
          } finally {
            W = l;
          }
        }
        if (!d) {
          const h = yt(a.fac, a.sex),
            g = h && h.img ? PA(h.img) : null;
          if (g && g.complete && g.naturalWidth) {
            const f = Math.min(
              (t.width * 0.8) / g.naturalWidth,
              (t.height * 0.85) / g.naturalHeight,
            );
            i.drawImage(
              g,
              (t.width - g.naturalWidth * f) / 2,
              t.height - 18 - g.naturalHeight * f,
              g.naturalWidth * f,
              g.naturalHeight * f,
            );
          }
        }
      });
    },
    k8 = function () {
      if (!u("#cselCss")) {
        const e = document.createElement("style");
        ((e.id = "cselCss"),
          (e.textContent = ok),
          document.head.appendChild(e));
      }
      (p3(),
        t0(!0),
        (c0.st = [...Array(W1).keys()].map(sk)),
        (c0.look = []),
        (c0.del = -1));
      const A = c0.st.map((e, a) => (e ? a : -1)).filter((e) => e >= 0);
      let n = -1;
      try {
        n = +localStorage.getItem(Z1);
      } catch {}
      c0.sel =
        Number.isInteger(n) && c0.st[n] ? n : r && r.fac ? nA : (A[0] ?? 0);
      const t = document.createElement("div");
      ((t.id = "csel"),
        (t.innerHTML = `<div style="text-align:center"><h1>VÕ LÂM IDLE</h1><div class="cs-sub">Chọn nhân vật</div></div>
    <div class="cs-row">${c0.st
      .map((e, a) => {
        const i = e && I[e.fac];
        return `<div class="cs-slot${e ? "" : " empty"}" data-i="${a}"><canvas data-i="${a}" width="300" height="380"></canvas><div class="ped"></div>
        <div class="nm" style="${i ? `color:${m0[i.series]}` : ""}">${e && i ? D(e.name || i.n) : "Trống"}</div><div class="lv">${e && i ? `Cấp ${e.lvl | 0 || 1} · ${D(i.n)}` : "Tạo nhân vật mới"}</div></div>`;
      })
      .join("")}</div>
    <div class="cs-panel"></div>`),
        document.body.appendChild(t),
        t.querySelectorAll(".cs-slot").forEach((e) => {
          ((e.onclick = () => {
            (c0.sel === +e.dataset.i && c0.del < 0) ||
              ((c0.sel = +e.dataset.i), (c0.del = -1), y8());
          }),
            (e.ondblclick = () => {
              ((c0.sel = +e.dataset.i), b8());
            }));
        }),
        (c0.on = !0),
        (c0.t0 = performance.now()),
        y8(),
        (c0.raf = requestAnimationFrame(rk)),
        document.addEventListener("keydown", Eh));
    },
    c0 = { on: !1, sel: 0, del: -1, raf: 0, t0: 0, st: [] },
    ok = `#csel{position:fixed;inset:0;z-index:55;display:flex;flex-direction:column;align-items:center;justify-content:space-between;color:#e8dcc0;
  background:radial-gradient(ellipse at 50% 60%,#0000 30%,#000d 100%),linear-gradient(#000a,#000d),url(img/z/town.jpg) center/cover #120d08;font-family:inherit;overflow:hidden;padding:14px 10px 18px}
#csel h1{margin:6px 0 0;font-size:clamp(22px,5vw,34px);letter-spacing:3px;color:#f3d27a;text-shadow:0 0 12px #c8902a,0 2px 0 #000}
#csel .cs-sub{font-size:12px;color:#bba;letter-spacing:1px;margin-top:2px}
#csel .cs-row{display:flex;gap:clamp(6px,2vw,28px);justify-content:center;align-items:flex-end;width:100%;max-width:820px;flex:1;min-height:0;padding-top:8px}
#csel .cs-slot{flex:1;max-width:240px;display:flex;flex-direction:column;align-items:center;cursor:pointer;position:relative;transition:filter .2s,transform .2s;filter:brightness(.55) saturate(.7)}
#csel .cs-slot.on{filter:none;transform:translateY(-4px)}
#csel .cs-slot canvas{width:100%;max-height:52vh;aspect-ratio:30/38;display:block}
#csel .cs-slot .ped{width:80%;height:22px;margin-top:-14px;border-radius:50%;background:radial-gradient(ellipse,#d9a54a99 0%,#7a521c55 45%,#0000 70%)}
#csel .cs-slot.on .ped{background:radial-gradient(ellipse,#ffe08acc 0%,#d08a2a77 45%,#0000 72%);box-shadow:0 0 24px #f0b04a55}
#csel .cs-slot .nm{margin-top:6px;font-weight:bold;font-size:clamp(12px,3vw,16px);text-align:center;text-shadow:0 1px 2px #000;min-height:1.3em}
#csel .cs-slot .lv{font-size:clamp(10px,2.6vw,13px);color:#cbb88f;text-align:center;min-height:1.2em}
#csel .cs-slot.empty canvas{opacity:.0}
#csel .cs-slot .plus{position:absolute;top:38%;left:50%;transform:translate(-50%,-50%);font-size:clamp(32px,9vw,56px);color:#d9b56a;text-shadow:0 0 10px #000}
#csel .cs-panel{width:100%;max-width:560px;background:linear-gradient(#2a1d10ee,#140d07ee);border:1px solid #8a6a32;border-radius:8px;box-shadow:0 0 0 1px #000,0 6px 24px #000a;padding:10px 12px;margin-top:10px}
#csel .cs-info{display:grid;grid-template-columns:auto 1fr auto 1fr;gap:3px 10px;font-size:13px}
#csel .cs-info span:nth-child(odd){color:#a8946a}
#csel .cs-btns{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:10px}
#csel .cs-btns button{min-width:110px;padding:8px 14px;font-weight:bold;border-radius:5px;border:1px solid #a07a34;background:linear-gradient(#5a3f1c,#2e1f0d);color:#f3dfae;cursor:pointer;font-size:14px}
#csel .cs-btns button.go{background:linear-gradient(#b8862e,#6b4612);color:#fff6d8;border-color:#f0c36a;min-width:150px;font-size:15px}
#csel .cs-btns button.red{background:linear-gradient(#6a2318,#33100b);border-color:#b2493a}
#csel .cs-btns button:disabled{opacity:.45;cursor:default}
#csel .cs-small{display:flex;gap:6px;justify-content:center;margin-top:8px;flex-wrap:wrap}
#csel .cs-small button{background:#0006;border:1px solid #6a5430;color:#cdb98a;border-radius:4px;padding:4px 10px;font-size:12px;cursor:pointer}
#csel .cs-warn{color:#ff9a7a;text-align:center;font-size:13px;margin-top:6px}
@media (max-width:520px){#csel .cs-info{grid-template-columns:auto 1fr}#csel .cs-btns button{min-width:0;flex:1}}`,
    D3 = function () {
      if (!KA)
        try {
          KA = JSON.parse(localStorage.getItem(jh) || "{}") || {};
        } catch {
          KA = {};
        }
      return (
        (KA.fs =
          Number.isInteger(KA.fs) && KA.fs >= 0 && KA.fs < _o.length
            ? KA.fs
            : 1),
        (KA.saver = !!KA.saver),
        (KA.compact = !!KA.compact),
        KA
      );
    },
    bo = function () {
      const A = document.querySelector("meta[name=viewport]");
      if (!A) return;
      const n = navigator.maxTouchPoints > 0 || "ontouchstart" in window,
        t = Math.min(screen.width, screen.height),
        e = matchMedia("(orientation: portrait)").matches,
        a =
          n && e && t >= 600
            ? "width=480, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content"
            : "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content";
      A.content !== a && (A.content = a);
    },
    Ih = function () {
      const A = D3();
      (document.documentElement.style.setProperty("--fs", _o[A.fs]),
        document.body.classList.toggle("saver", A.saver),
        document.body.classList.toggle("compact", A.compact));
    },
    yo = function (A) {
      Object.assign(D3(), A);
      try {
        localStorage.setItem(jh, JSON.stringify(KA));
      } catch {}
      (Ih(), v3());
    },
    vn = function (A) {
      if (A) {
        c.curZone = A;
        if (c.town && A.id !== "town" && A.id !== 37 && (!H0.town || A.id !== H0.town.id)) {
          c.town = !1;
          const tb = document.getElementById("townBar");
          if (tb) tb.classList.add("hidden");
          if (typeof wd !== "undefined") c.tpCd = wd;
        }
        const znEl = document.getElementById("u20zn");
        if (znEl && A.n && znEl.textContent !== A.n) znEl.textContent = A.n;
      }
      (Te(A.id), ([b.x, b.y] = K0(b.x, b.y)));
      for (const n of c.enemies) [n.x, n.y] = K0(n.x, n.y);
      for (const n of c.ground) [n.x, n.y] = K0(n.x, n.y);
      (nn(),
        (c.bgImg = A.bg ? PA(A.bg) : null),
        Vt(A.id),
        Kc(A),
        vA === "log" && F());
    },
    vt = function () {
      vA === "log" && F();
    },
    Sh = function () {
      (r.lvl === Ee &&
        !D0() &&
        M("🌱 Đạt cấp " + Ee + ": hết <b>Hỗ Trợ Tân Thủ</b>."),
        typeof ge == "function" && ge(),
        Kn() &&
          r.lvl >= CA &&
          !c.quiet &&
          (y("Đạt cấp " + CA + ": gia nhập môn phái!"),
          u("#modal").classList.contains("hidden") && B5()),
        r.autoPts === !0 && (Oe(), Xn()),
        an(),
        c.quiet ||
          (_f(),
          Ma(),
          MA(),
          Nn(),
          Gd.some((A) => A[0] === r.lvl) &&
            y(`Đạt mốc cấp ${r.lvl}: nhận quà ở nút 🎁`)));
    },
    Nh = function () {
      return [b, c.petPos].concat(c.enemies).filter(Boolean);
    },
    lk = function (A) {
      Q2 += A;
      let n = 0;
      for (; Q2 >= x8 && n < zh;) {
        for (const t of Nh()) ((t._px = t.x), (t._py = t.y));
        (Ul(x8), (Q2 -= x8), n++);
      }
      n === zh && (Q2 = 0);
    },
    ck = function (A) {
      const n = Q2 / x8,
        t = Nh().filter(
          (e) => e._px !== void 0 && Math.hypot(e.x - e._px, e.y - e._py) < wk,
        );
      for (const e of t)
        ((e._cx = e.x),
          (e._cy = e.y),
          (e.x = e._px + (e.x - e._px) * n),
          (e.y = e._py + (e.y - e._py) * n));
      try {
        dp(A);
      } finally {
        for (const e of t) ((e.x = e._cx), (e.y = e._cy));
      }
    },
    P3 = function (A, n) {
      try {
        (n(), (b3 = Math.max(0, b3 - 0.02)));
      } catch (t) {
        b3++;
        const e = A + ": " + (t && t.message);
        (e !== Qh && ((Qh = e), console.error("[loi vong lap]", A, t)),
          b3 > 30 &&
            ((b3 = 0),
            (c.fx = []),
            (c.txt = []),
            (c.enemies = []),
            (c.spawnT = 0.5),
            (c.deadT = 0),
            (Q2 = 0),
            (c.quiet = !1),
            t0(!0)));
      }
    },
    dk = function s(A) {
      const n = Math.min(0.25, (A - ko) / 1e3);
      ((ko = A),
        P3("tay cam", gD),
        r.fac &&
          !document.hidden &&
          !window.NET_GATE &&
          (P3("mo phong", () => lk(n)),
          (!D3().saver || (qh = !qh)) && P3("ve", () => ck(n))),
        (Bo += n),
        Bo > 0.1 &&
          r.fac &&
          ((Bo = 0),
          P3("giao dien", () => {
            (tD(),
              wD(),
              c.logDirty && vA === "log" && ((c.logDirty = !1), Jp()),
              Y && vA === "inv" && Jt());
          })),
        (xo += n),
        xo > 10 &&
          r.fac &&
          P3("luu", () => {
            ((xo = 0), di(), rn(), Nn(), C7());
            const t = c.activeT || 0;
            (t > 30 && (r.kps = c.kills / t), B());
          }),
        requestAnimationFrame(s));
    },
    Lh = function (A) {
      if (!A) return;
      const n = Math.floor(A.secs / 3600),
        t = Math.floor((A.secs % 3600) / 60);
      J(
        `<h3>Chào mừng trở lại!</h3><p class="desc">Vắng mặt ${n ? n + " giờ " : ""}${t} phút, nhân vật vẫn luyện công tại ${D(V0(Math.min(r.stage, l0)).n)}.</p>
    <div class="card stats"><span>Quái bị hạ</span><span>${X(A.kills)}</span><span>Kinh nghiệm</span><span>${X(A.xp)}</span>
    <span>Ngân lượng</span><span>${j(A.gold)}</span><span>Cấp</span><span>${A.lv0} → ${A.lv1}</span><span>Vật phẩm</span><span>${A.got}${A.sold ? ` (+${A.sold} bán)` : ""}</span>
    <span>Rương tu luyện</span><span>${A.chests || 0} / 3 mốc (1 · 4 · 8 giờ)</span></div>
    ${A.chests ? '<p class="desc">Quà các mốc đã vào túi — xem nhật ký Giang hồ.</p>' : ""}
    <div class="btnrow"><button class="btn" id="offOk">Nhận</button></div>`,
        () => {
          u("#offOk").onclick = () => t0();
        },
      );
    },
    v3 = function () {
      document.body.classList.toggle("mob", mp());
      const A = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight;
      (A > 0 &&
        document.documentElement.style.setProperty(
          "--app-h",
          Math.round(A) + "px",
        ),
        aA && rt());
    },
    fk = function (A) {
      if ((yo({ compact: A }), !A && r.fac && F(), typeof pn == "function"))
        try {
          pn();
        } catch {}
    },
    hk = function () {
      const A = j9();
      ((nA = A.slot), A.menu && (r = Ss()));
      const n = A.menu ? !1 : Q9();
      ((aA = u("#arena")),
        (W = aA.getContext("2d")),
        u("#tabs").addEventListener("click", (a) => {
          if (a.target.closest("#tabRide")) {
            typeof h3 == "function" && h3();
            return;
          }
          const i = a.target.closest("button[data-t]");
          if (i) {
            if (
              (i.dataset.t === "more" && typeof Pt < "u" && (Pt = "sys"),
              document.body.classList.contains("u2m") &&
                i.dataset.t === vA &&
                i.dataset.t !== "log")
            ) {
              iA("log");
              return;
            }
            iA(i.dataset.t);
          }
        }),
        (u("#mClose").onclick = () => t0()),
        (u("#giftBtn").onclick = () => {
          r.fac && (i0("click"), Wt(!0));
        }),
        (u("#actBtn").onclick = () => {
          r.fac && (i0("click"), Ja("act"));
        }),
        (u("#modal").onclick = (a) => {
          a.target.id === "modal" && t0();
        }),
        window.addEventListener("resize", v3),
        window.addEventListener("orientationchange", v3),
        window.visualViewport &&
          window.visualViewport.addEventListener("resize", v3),
        (u("#compactBtn").onclick = () =>
          fk(!document.body.classList.contains("compact"))),
        Ih(),
        v3(),
        pD());
      const t = () => {
        D5();
        const a = V0(Math.min(r.stage, l0));
        (Kc(a),
          o0.music && WA().music && o0.music.paused
            ? o0.music.play().catch(() => {})
            : !o0.music && r.fac && Vt(c.town ? H0.town.id : a.id));
      };
      if (
        (document.addEventListener("pointerdown", t, !0),
        document.addEventListener("keydown", t, !0),
        rt(),
        ([b.x, b.y] = K0(M0.w / 2, M0.h / 2)),
        nn(),
        Um(),
        A.menu)
      )
        k8();
      else if (r.fac) {
        try {
          sessionStorage.setItem("jxidle_in", String(nA));
        } catch {}
        if (
          (delete r.jxLook,
          delete r.lookFx,
          u0(),
          (c.life = c.P.life),
          (c.mana = c.P.mana),
          n && (u0(), Lh(gc())),
          typeof Yt < "u" &&
            Yt > 1 &&
            M(
              `<b style="color:#ffd24a">🎉 Sự kiện toàn máy chủ: x${Yt} kinh nghiệm!</b>`,
            ),
          iA("log"),
          M("Tiếp tục hành tẩu giang hồ…"),
          r.eqRebuildMsg)
        ) {
          const [a, i] = r.eqRebuildMsg;
          (M(
            `Đồ Hoàng Kim / Bạch Kim không còn trong game (theo bảng gốc VNG) — thu hồi <b>${a}</b> món, hoàn <b class="up">${j(i)}</b> lượng`,
          ),
            y(`Thu hồi ${a} món, hoàn ${j(i)} lượng`),
            delete r.eqRebuildMsg,
            B());
        }
        if (
          (r.pjMsg &&
            (M(
              `<span class="bad">Đã xóa ${r.pjMsg} món trang sức Tím (dây chuyền / nhẫn / ngọc bội): loại đồ này không chế tạo được trong game.</span>`,
            ),
            delete r.pjMsg),
          r.banMsg &&
            (M(
              `Hoàng Kim biến thể ([Cực phẩm], [Hoàn Mỹ], [Tinh Xảo]…), Dương Thần và đồ sự kiện (Hắc Thần, Thương Khung, Long Tương…) đã xóa khỏi game: thu hồi <b>${r.banMsg}</b> món`,
            ),
            delete r.banMsg,
            B()),
          r.horseEnhBack &&
            (M(
              `Ngựa không còn cường hóa: ngựa đã cường hóa về +0, hoàn lại <b class="up">${j(r.horseEnhBack)}</b> lượng`,
            ),
            y(`Hoàn ${j(r.horseEnhBack)} lượng cường hóa ngựa`),
            delete r.horseEnhBack,
            B()),
          window.__tampered &&
            (M(
              '<span class="dim">Dữ liệu lưu không khớp chữ ký (đã chỉnh sửa ngoài game): dùng bản sao lưu gần nhất nếu có.</span>',
            ),
            y("Phát hiện chỉnh sửa file lưu")),
          di(),
          Nn(),
          C7(),
          typeof ge == "function" &&
            (wf(), r.mode !== "quest" && r.autoMap !== !1 && ge()),
          r.resumeTower)
        ) {
          const a = r.resumeTower | 0;
          (delete r.resumeTower,
            setTimeout(() => {
              typeof g2 == "function" &&
                !c.dg &&
                !c.tower &&
                (g2(),
                c.tower &&
                  a > 0 &&
                  ((c.tower.floor = a),
                  (c.banner = {
                    t: 2,
                    text: `${on.n} · tầng ${a}`,
                    sub: "Tiếp tục sau khi cập nhật",
                  })),
                M(`🗼 Cập nhật xong: vào lại Tháp tầng ${a}.`));
            }, 1200));
        }
        {
          let a = 0,
            i = 0;
          for (const o of r.inv.concat(
            Object.values(r.eq || {}),
            r.epBox || [],
          )) {
            const l = Yu(o);
            l && ((a += l), i++);
          }
          a &&
            ((c.dirty = !0),
            M(
              `Sửa ${i} món Tím bị trùng dòng: gỡ ${a} dòng từ dòng trùng đầu tiên trở đi, trả lại đá thuộc tính để khảm lại.`,
            ));
        }
        if (
          (window.HKMP_CONV &&
            window.HKMP_CONV.length &&
            (M(
              `Hoàng Kim Môn Phái chỉ còn các bộ theo cẩm nang JX1: đổi ${window.HKMP_CONV.length} món bộ đã bỏ (Thiên Quang, Kim Quang, HKMP cấp 120, đồ đôi / Vinh Diệu…) sang món cùng vị trí: ${window.HKMP_CONV.slice(0, 6).map(D).join(", ")}${window.HKMP_CONV.length > 6 ? "…" : ""}`,
            ),
            (window.HKMP_CONV = null),
            (c.dirty = !0)),
          window.GONE_CONV && window.GONE_CONV.length)
        ) {
          const a = window.GONE_CONV;
          (M(
            `Đồ Hoàng Kim / Bạch Kim không theo bảng gốc VNG: đổi <b>${a.length}</b> món sang món cùng môn phái, cùng vị trí (giữ cường hóa / cấp Bạch Kim): ${D([...new Set(a)].slice(0, 6).join(", "))}${a.length > 6 ? "…" : ""}`,
          ),
            y(`Đổi ${a.length} món sang bảng mới`),
            (window.GONE_CONV = []));
        }
        if (window.SET_PURGED) {
          const a = window.SET_PURGED.reduce((i, o) => i + o, 0);
          ((window.SET_PURGED = null),
            M(
              `Đã xóa ${a} món thuộc bộ không còn trong game (Đằng Long, Tinh Sương…).`,
            ));
        }
      } else {
        try {
          sessionStorage.setItem("jxidle_in", String(nA));
        } catch {}
        ed();
      }
      (document.addEventListener("visibilitychange", () => {
        (document.hidden
          ? r.fac && B()
          : r.fac &&
            !window.NET_GATE &&
            Date.now() - r.last > 6e4 &&
            ((c.dirty = !0), u0(), Lh(gc()), F()),
          (ko = performance.now()));
      }),
        window.addEventListener("pagehide", () => {
          r.fac && B();
        }),
        window.addEventListener("keydown", (a) => {
          a.key === "Escape" &&
            !u("#modal").classList.contains("hidden") &&
            t0();
        }));
      const e = () => {
        if (typeof qf == "function")
          try {
            qf();
          } catch {}
        if (typeof Ah == "function")
          try {
            Ah();
          } catch {}
      };
      (fetch("ver.json?t=" + Date.now(), { cache: "no-store" })
        .then((a) => (a.ok ? a.json() : null))
        .then((a) => {
          (a && +a.xp > 0 && typeof Yt < "u" && (Yt = +a.xp),
            a && a.bt ? mk(a) : e());
        })
        .catch(e),
        requestAnimationFrame(dk));
    },
    gk = function () {
      fetch("ver.json?t=" + Date.now(), { cache: "no-store" })
        .then((A) => (A.ok ? A.json() : null))
        .then((A) => {
          if (A && A.bt && !window.MAINT) {
            try {
              B();
            } catch {}
            location.reload();
            return;
          }
          if (!(!A || !(+A.v > Mo)) && !(typeof c < "u" && c.dg)) {
            typeof c < "u" &&
              c.tower &&
              r &&
              r.fac &&
              (r.resumeTower = c.tower.floor);
            try {
              B();
            } catch {}
            (typeof y == "function" && y("Có bản cập nhật mới — đang tải lại…"),
              setTimeout(() => location.reload(), 3e3));
          }
        })
        .catch(() => {});
    },
    mk = function (A) {
      ((window.MAINT = !0), typeof k < "u" && (k.holdUntil = 9e15));
      let n = document.getElementById("maint");
      (n ||
        ((n = document.createElement("div")),
        (n.id = "maint"),
        document.body.appendChild(n)),
        (n.style.cssText =
          "position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse,#2a1d10f2,#0b0805fa);color:#efe1bd;text-align:center;padding:20px;font-family:inherit"),
        (n.innerHTML = `<div style="max-width:440px;border:1px solid #8a6a32;border-radius:10px;padding:22px 18px;background:#1a120acc;box-shadow:0 0 30px #000">
    <div style="font-size:42px">🛠</div><h2 style="color:#f3d27a;margin:8px 0">Máy chủ đang bảo trì</h2>
    <p style="font-size:14px;line-height:1.5">${typeof A.msg == "string" ? D(A.msg) : "Đang dọn dẹp và nâng cấp máy chủ. Nhân vật của bạn vẫn an toàn (đã lưu trong máy)."}</p>
    <p style="font-size:12px;color:#b9a77d">Game tự vào lại khi bảo trì xong — không cần tải lại trang.</p></div>`),
        clearInterval(window.maintT),
        (window.maintT = setInterval(
          () =>
            fetch("ver.json?t=" + Date.now(), { cache: "no-store" })
              .then((t) => (t.ok ? t.json() : null))
              .then((t) => {
                t && !t.bt && location.reload();
              })
              .catch(() => {}),
          6e4,
        )));
    },
    ko = performance.now(),
    xo = 0,
    Bo = 0,
    qh = !1,
    jh = "jxidle_ui",
    _o = [0.9, 1, 1.15, 1.3],
    uk = ["Nhỏ", "Vừa", "Lớn", "Rất lớn"],
    KA = null;
  (bo(),
    window.addEventListener("orientationchange", () => setTimeout(bo, 50)),
    window.addEventListener("resize", bo));
