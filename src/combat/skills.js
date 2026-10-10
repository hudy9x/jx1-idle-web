var J3 = 999,
    Hm = (s) =>
      r.inv.length < INV_MAX ||
      r.inv.some((A) => A.ktc && A.ktc.k === s && A.ktc.c < J3),
    y1 = ["vlmt", "ttk", "rngua"],
    $m = (s) =>
      r.inv.reduce((A, n) => A + (n.ktc && n.ktc.k === s ? n.ktc.c : 0), 0),
    aa = {
      ldp: "ldp",
      dgt: "dgt",
      dtbk: "dtbk",
      mt90: "bk90",
      ldt: "ldt",
      rngua: "rngua",
    },
    m4 = (s) =>
      $m(s) +
      (aa[s]
        ? N("misc", aa[s])
        : s === "vlmt" || s === "ttk"
          ? N("misc", s)
          : 0),
    ze = (s, A) => Pm(s, A),
    E6 = (s, A) => {
      if (!y1.includes(s.k) && !aa[s.k]) return "";
      const n = m4(s.k);
      return `<button class="${A}" data-ktcuse="${s.k}" ${sa(s) && n > 0 ? "" : "disabled"} title="${n > 0 ? `Dùng 1 (đang có ${n})` : "Chưa có, bấm Mua trước"}">Dùng</button>`;
    },
    I6 = () => "",
    sa = (s) => !s.vio || w0(),
    S6 = (s) => (s.knb ? `${s.knb} KNB` : j(s.gold)),
    Tt = (s, A = 1) =>
      (s.knb ? (r.knb || 0) >= s.knb * A : r.gold >= s.gold * A) &&
      (s.k !== "knb" || U3().n + A <= bm) &&
      (s.k !== "ldt" || h4().n + A <= f4) &&
      (!s.can || s.can()),
    Tm = function (A) {
      const n =
          A < 110 ? C(Math.floor(A / 10) * 10, 10, 90) : A < 119 ? 110 : 119,
        t = S.drop["npcdroprate" + n + ".ini"] || S.drop["npcdroprate.ini"];
      return (
        t &&
          t.key == null &&
          (t.key = S.drop["npcdroprate" + n + ".ini"] ? n : 0),
        t
      );
    },
    u4 = function (A, n) {
      const t = n.main,
        e = t.MinItemLevelScale || 20,
        a = t.MaxItemLevelScale || 10,
        i = Wm[n.key];
      let o = Math.min(Math.floor(A / a), t.MaxItemLevel || 10),
        l = Math.max(Math.floor(A / e), i || t.MinItemLevel || 1);
      return (
        o < l && ([l, o] = [o, l]),
        C(l + (o > l ? Math.floor(Math.random() * (o - l)) : 0), 1, 10)
      );
    },
    ia = function (A, n, t) {
      const e = S.items[A];
      if (!e) return null;
      let a = e.list.filter((o) => o.k === n);
      if (!a.length) return null;
      const i = a.filter((o) => i1(o.req));
      return (
        i.length && (a = i),
        a.reduce((o, l) => (Math.abs(l.lvl - t) < Math.abs(o.lvl - t) ? l : o))
      );
    },
    Cm = function (A, n, t) {
      const e = Math.abs(A) <= Math.abs(n) ? A : n;
      return Math.round(
        e + ((e === A ? n : A) - e) * Math.pow(Math.random(), t),
      );
    },
    N6 = function (A, n, t, e, a = 0, i = 1) {
      const o = n % 2 === 0 ? 1 : 0,
        l = Math.floor(Math.random() * 100) / (1 + (a * 20) / 100),
        d = S.affix.filter(
          (f) =>
            f.pre === o &&
            (f.s < 0 || f.s === A.s) &&
            f.lvl <= t &&
            (f.w[A.d] || 0) > l &&
            !e.has(f.a),
        );
      if (!d.length) return null;
      const h = _0(d);
      e.add(h.a);
      const g = h.p.map(([f, m]) =>
        f === -1 && m === -1
          ? -1
          : i > 1
            ? Cm(f, m, i)
            : C0(Math.min(f, m), Math.max(f, m)),
      );
      return { a: h.a, p: g, n: h.n, pre: o };
    },
    Om = function (A, n, t = 0, e = 1) {
      const a = [],
        i = new Set();
      for (let o = 0; o < n.length; o++) {
        const l = N6(A, o, n[o], i, t, e);
        if (!l) break;
        a.push(l);
      }
      return a;
    },
    L6 = function (A, n = 1) {
      const t =
        Math.random() * 100 -
        (A === "boss" ? 35 : A === "elite" ? 12 : 0) -
        (c.P ? c.P.lucky : 0) * 0.5 -
        Math.min(n, 200) * 0.05;
      return t < 3 ? C0(5, 6) : t < 15 ? C0(3, 4) : t < 50 ? C0(1, 2) : 0;
    },
    Em = function (A) {
      return A >= 1 ? 1 : 0;
    },
    Qe = function (A, n) {
      const t = S.items[A];
      if (!t) return n;
      const e = t.list.filter((i) => i.k === n);
      if (!e.length || e.some((i) => i1(i.req))) return n;
      const a = [...new Set(t.list.filter((i) => i1(i.req)).map((i) => i.k))];
      return a.length ? _0(a) : n;
    },
    pA = function (A, n, t, e, a) {
      const i = ia(A, n, t);
      if (!i) return null;
      const o = {
        uid: r.uid++,
        d: A,
        k: n,
        p: i.p,
        n: i.n,
        ic: i.ic || "",
        lvl: i.lvl,
        s: i.s >= 0 ? i.s : a >= 0 && a <= 4 ? a : nu(),
        base: i.base.map((l) => l.slice()),
        req: i.req.map((l) => l.slice()),
        price: i.price,
      };
      return (
        (o.mag = Om(o, Au(e, i.lvl), c.P ? c.P.lucky : 0, Zm)),
        (o.r = Em(o.mag.length)),
        o
      );
    },
    q6 = function (A) {
      const n = Tm(A.L),
        t = n.items.filter((l) => l[0] === 0 && l[1] <= 9),
        e = A.tr ? C(A.tr / 2, 0.5, 2) : 1,
        a = ra(),
        i =
          A.cls === "boss"
            ? 3 +
              (Math.random() < a - 1 ? 1 : 0) +
              (A.tr > 8 ? Math.floor((A.tr - 8) / 8) : 0)
            : A.cls === "elite"
              ? Math.random() < 0.5 * a * e
                ? 1
                : 0
              : Math.random() < tu * a * $s(A) * e
                ? 1
                : 0,
        o = [];
      for (let l = 0; l < i * (A.bonusDrop || 1); l++) {
        const d = _e(t, (w) => w[3]);
        if (!d) continue;
        let [h, g] = [d[1], d[2]];
        const f = I[r.fac];
        (h <= 1 && f && !f.novice && Math.random() < Jm && ([h, g] = Oo()),
          (g = Qe(h, g)));
        let m = pA(h, g, u4(A.L, n), L6(A.cls, A.L), A.series);
        for (let w = 0; m && !F1(m) && w < 6; w++)
          m = pA(h, g, u4(A.L, n), L6(A.cls, A.L), A.series);
        m && F1(m) && o.push(m);
      }
      if (
        typeof w0 == "function" &&
        w0() &&
        Math.random() <
          (J6[A.cls] ?? J6.normal) * a * $s(A) * (A.bonusDrop || 1)
      ) {
        const l = t.filter((g) => U1.includes(g[1])),
          d = l.length ? _e(l, (g) => g[3]) : null,
          h = d && pA(d[1], d[2], u4(A.L, n), C0(0, 2), A.series);
        h && o.push(h);
      }
      return o;
    },
    j6 = function (A) {
      A = Math.max(1, A | 0);
      const t = [
          [10, 40, 0],
          [20, 120, 10],
          [30, 240, 20],
          [40, 360, 30],
          [50, 480, 40],
          [60, 600, 50],
          [70, 720, 60],
          [80, 800, 70],
          [90, 900, 80],
          [100, 1e3, 90],
        ].find((a) => A <= a[0]),
        e = t ? t[1] + 5 * (A - t[2]) : 1e3 + 5 * (A - 90);
      return Math.floor(A < 50 ? e : e * 1.5);
    },
    Im = function (A) {
      let n = 0;
      const t = A.L >= 119 ? 0.5 : 1;
      for (let e = 0; e < (eu[A.cls] || 1); e++)
        Math.random() < W6 && (n += Z6(A) * t);
      return Math.round(n);
    },
    z6 = function (A) {
      let n = 0;
      for (const [t, e, a] of A.base || [])
        (t === 28 || t === 29 || t === 30) && (n += (e + a) / 2);
      return n;
    },
    Sm = function (A) {
      const n = A.d + ":" + A.k;
      if (P4[n] !== void 0) return P4[n];
      const t = S.items[A.d];
      let e = 0;
      if (t) for (const a of t.list) a.k === A.k && (e = Math.max(e, z6(a)));
      return (P4[n] = e);
    },
    Nm = function (A) {
      let n = 0;
      for (const e of (A.mag || []).concat(A.ext || [])) {
        const a = W0(e.a);
        if (typeof R1 < "u" && R1.has(a)) continue;
        const i = ts[e.a],
          o = Math.abs((e.p || [])[0] || 0);
        n += i ? Math.min(1.5, o / i) : 0.3;
      }
      const t = Sm(A);
      return (t > 0 && (n += (z6(A) / t) * He(A)), n);
    },
    y0 = function (A) {
      if (A.pack || A.ktc) return 1;
      if (A.d === 10)
        return Math.round(
          ((A.price || 100) / 10) * (1 + (A.mag || []).length * 0.8),
        );
      const n = A.set
        ? A.set.kind === "platina"
          ? 2 * (1 + 0.3 * (A.plv || 0))
          : 1
        : A.vio
          ? 1.5
          : 1;
      return Math.max(
        1,
        Math.round(
          au * Math.pow(Nm(A) + 0.05, su) * n * (1 + 0.15 * (A.enh || 0)),
        ),
      );
    },
    L0 = function (A) {
      let n = A.lvl * 10;
      for (const [t, e, a] of A.base)
        (t === 28 || t === 29 || t === 30) && (n += (e + a) / 2);
      for (const t of A.mag.concat(A.ext || [])) {
        const e = W0(t.a);
        (typeof R1 < "u" && R1.has(e)) ||
          (n += 15 + Math.min(200, Math.abs(t.p[0])) * 0.6);
      }
      return n * He(A);
    },
    LA = function (A) {
      const n = wA[A.d];
      return n === "ring"
        ? r.eq.ring1
          ? r.eq.ring2 && L0(r.eq.ring1) <= L0(r.eq.ring2)
            ? "ring1"
            : "ring2"
          : "ring1"
        : n;
    },
    W3 = function (A) {
      const n = W0(A.a),
        t = A.p.map((a) => (a === -1 ? 0 : a));
      let e;
      return (
        (e = RA(n, t).split("<enter>")[0]),
        typeof R1 < "u" && R1.has(n) && (e += " · không tác dụng trong game"),
        e
      );
    },
    Lm = function (A, n) {
      return A === 36
        ? TA() >= n
        : A === 32
          ? FA("str") >= n
          : A === 33
            ? FA("dex") >= n
            : A === 34
              ? FA("vit") >= n
              : A === 35
                ? FA("eng") >= n
                : A === 37
                  ? n < 0 || !I[r.fac] || j0() === n
                  : A === 38
                    ? n < 0 || (r.sex || 0) === n
                    : A === 39
                      ? n < 0 || !I[r.fac] || I[r.fac].id === n
                      : A === 46
                        ? D0() >= n
                        : !0;
    },
    qm = function (A, n) {
      return A === 37
        ? "Thuộc tính ngũ hành: " + (d0[n] || n)
        : A === 38
          ? "Giới tính: " + (n ? "Nữ" : "Nam")
          : A === 39
            ? "Môn phái: " +
              ((S.factions.find((t) => t.id === n) || S.factions[n] || {}).n ||
                n)
            : RA(Al[A], [n, 0, 0]);
    },
    Z3 = function (A) {
      const n = A.set && S.sets[A.set.kind];
      if (n && A.set.kind === "platina") {
        const t = n.find((e) => e.vng === 2 && e.n === A.n);
        if (t) return t;
      }
      return n
        ? n.find(
            (t) =>
              t.grp === A.set.grp &&
              t.d === A.d &&
              t.k === A.k &&
              k1(t.n) === k1(A.n),
          ) || n.find((t) => k1(t.n) === k1(A.n))
        : null;
    },
    Q6 = function (A, n, t, e) {
      const a = n.p[0];
      if (a == null || a === -1 || W0(n.a) === "allskill_v") return null;
      if (n.ml && typeof z0 < "u" && z0[n.ml]) return z0[n.ml].p[0];
      if (A.set) {
        const o = Z3(A);
        if (o && o.vng === 2)
          return e ? null : typeof kl == "function" ? kl(o, t, A.plv) : null;
        const l = o && (e ? o.ext : o.mag)[t],
          d = l != null && S.ge[l];
        return d && d.a === n.a ? d.p[0] : null;
      }
      if (A.d === 10 || A.thanma) return null;
      let i = null;
      for (const o of S.affix)
        if (
          o.a === n.a &&
          o.pre === n.pre &&
          (o.s < 0 || o.s === A.s) &&
          o.lvl <= (A.lvl || 10)
        ) {
          const [l, d] = o.p[0],
            h = Math.min(l, d),
            g = Math.max(l, d);
          a >= h &&
            a <= g &&
            (!i || o.lvl > i.lvl) &&
            (i = { lvl: o.lvl, r: [h, g] });
        }
      return i && i.r;
    },
    jm = function (A) {
      const n = [],
        t = He(A),
        e =
          S.items[A.d] &&
          S.items[A.d].list.find((g) => g.k === A.k && g.lvl === A.lvl),
        a = A.d === 10 ? 1 : Ro(A),
        i = (g) =>
          a === 1 || W0(g.a) === "allskill_v"
            ? W3(g)
            : W3(
                Object.assign({}, g, {
                  p: g.p.map((f, m) =>
                    f === -1 || m > 1 ? f : Math.round(f * a),
                  ),
                }),
              );
      (A.s >= 0 &&
        A.s < 5 &&
        n.push(["b", "Ngũ hành thuộc tính: " + d0[A.s], m0[A.s]]),
        e && e.d && n.push(["b in", e.d]));
      const o = (g) => (A.d === 10 && typeof bi == "function" ? bi(A, g) : g);
      for (const [g, f, m] of A.base) {
        const w = W0(g);
        if (w === "item_purple" || g === 167 || w === "staminamax_v") continue;
        if (w === "durability_v") {
          n.push(["b", `Độ bền ${m} / ${m}`]);
          continue;
        }
        const p = Math.round(
          g === 28 || g === 29 ? f * t : o(((f + m) / 2) * t),
        );
        n.push(["b", RA(w, [p, 0, p])]);
      }
      for (const [g, f] of A.req)
        !Al[g] ||
          ((g === 37 || g === 38 || g === 39) && f < 0) ||
          (g !== 37 && g !== 38 && g !== 39 && !(f > 0)) ||
          n.push([Lm(g, f) ? "b" : "rq", qm(g, f)]);
      const l = A.d === 10 ? 3 : typeof Vn == "function" ? Vn(A) : 0;
      A.mag.forEach((g, f) => {
        const m = f % 2 === 0 || f >> 1 < l;
        n.push([m ? "m" : "h", i(g) + nl(Q6(A, g, f), a)]);
      });
      const d = [];
      if (
        (A.plv != null && A.pv3
          ? d.push([
              "h on",
              `Bạch Kim +${A.plv}/10: dòng thuộc tính tăng theo cấp${(A.plv || 0) < 5 ? " · từ +5 mở 2 dòng Bạch Kim" : ""}`,
            ])
          : A.plv &&
            d.push([
              "h on",
              `Bạch Kim +${A.plv}: thuộc tính gốc +${Math.round(A.plv * L8 * 100)}%`,
            ]),
        A.enh &&
          d.push([
            "h on",
            `Cường hóa +${A.enh}: thuộc tính gốc +${Math.round((t - 1) * 100)}%, các dòng thuộc tính +${Math.round((a - 1) * 100)}%`,
          ]),
        A.thanma &&
          d.push(["r", "Thần mã: không phạt né tránh, thần lực luôn hiệu lực"]),
        A.d === 10 &&
          typeof R0 == "function" &&
          d.push([
            "h on",
            `Thuần dưỡng cấp ${R0(A)}/${N1}: chỉ số ngựa +${Math.round(R0(A) * xi * 100)}%, phạt né −${Math.min(100, Math.round(R0(A) * Bi * 100))}%`,
          ]),
        Math.floor((A.mag || []).length / 2) &&
          !A.leg &&
          A.d !== 10 &&
          A.s >= 0 &&
          typeof J2 < "u")
      ) {
        const g = +Object.keys(J2).find((w) => J2[w] === A.s),
          f = X2(A, r.eq) || LA(A),
          m = typeof o1 == "function" && o1(r.eq);
        (d.push([
          "r",
          `Kích hoạt thuộc tính ẩn:${A.set ? " (đủ bộ tự kích hết)" : ""}`,
        ]),
          d.push([m || j0() === g ? "h on" : "h", `  Nhân vật: hệ ${d0[g]}`]));
        for (const w of i6[f] || [])
          d.push([
            m || (r.eq[w] && r.eq[w].s === g) ? "h on" : "h",
            `  ${S8[w]}: hệ ${d0[g]}`,
          ]);
      }
      if (A.set) {
        const g = typeof B4 == "function" ? B4(A, r.eq) : 0,
          f = (typeof ls == "function" && ls(r.eq)[A.set.grp]) || 0;
        ((A.ext || []).forEach((m, w) =>
          d.push([
            w < g ? "m" : "h",
            i(m) +
              nl(Q6(A, m, w, !0), a) +
              (w < g
                ? ""
                : A.set.kind === "platina"
                  ? " (khi mặc)"
                  : ` (mặc ${A.set.n1 * (w + 1)} món cùng bộ)`),
          ]),
        ),
          d.push([
            "r",
            `Bộ ${A.set.kind === "gold" ? "Hoàng Kim" : "Bạch Kim"}: đang mặc ${f} món · đủ ${A.set.n2} món mở hết dòng ẩn mọi trang bị`,
          ]));
        for (const m of yu(A))
          d.push([
            "r",
            `  ${Object.values(r.eq).some((w) => w && w.set && k1(w.n) === k1(m.n)) ? "✔" : "·"} ${m.n}`,
          ]);
      }
      return (d.length && (n.push(["sep", ""]), n.push(...d)), n);
    },
    G6 = function (A) {
      if (!A || !A.set) return null;
      const n = k1(A.n),
        t = du.find(([e]) => n.startsWith(e));
      return t
        ? t[0]
        : A.n.includes("Tống Kim")
          ? "Tống Kim"
          : Re(A) >= 0
            ? "Môn phái"
            : "Bộ chung";
    },
    w4 = function () {
      if (v4) return v4;
      const A = new Map(),
        n = {};
      for (const e of S.sets.gold) {
        if (typeof tA == "function" && !tA(e)) continue;
        const a = (e.req.find((l) => l[0] === 36) || [0, 0])[1];
        if ((e.req.find((l) => l[0] === 39) || [0, -1])[1] >= 0) {
          n[e.grp] = a >= 120 ? "MP120" : "MP80";
          continue;
        }
        const o = A.get(e.grp) || { names: [], lv: 999 };
        (o.names.push(k1(e.n)), (o.lv = Math.min(o.lv, a)), A.set(e.grp, o));
      }
      const t = [];
      for (const [e, a] of A) {
        const i = a.names.map((g) => g.split(" "));
        let o = 0;
        for (; i.every((g) => g[o] && g[o] === i[0][o]);) o++;
        const l = fu[e] || i[0].slice(0, Math.max(o, 2)).join(" "),
          d = "G:" + l;
        n[e] = d;
        const h = t.find((g) => g.k === d);
        h ? (h.lv = Math.min(h.lv, a.lv)) : t.push({ k: d, n: l, lv: a.lv });
      }
      return (
        t.sort((e, a) => e.lv - a.lv || e.n.localeCompare(a.n)),
        t.push(
          { k: "MP80", n: "Môn phái", lv: 80 },
          { k: "MP120", n: "Môn phái", lv: 120 },
        ),
        (tl = n),
        (v4 = t),
        t
      );
    },
    Mk = function (A) {
      return !A || !A.set
        ? null
        : (w4(),
          tl[A.set.grp] ||
            (Re(A) >= 0
              ? ((A.req || []).find((n) => n[0] === 36) || [0, 0])[1] >= 120
                ? "MP120"
                : "MP80"
              : null));
    },
    Ge = function (A) {
      if (!A || !A.set) return !1;
      if (A.lock) return !0;
      const n = r.lootF;
      if (!n || !A.set || A.set.kind !== "gold") return !0;
      const t = ((A.req || []).find((e) => e[0] === 39) || [0, -1])[1];
      return t < 0
        ? n.hkBc !== !1
        : !Array.isArray(n.hkMp) || n.hkMp.includes(t);
    },
    qA = function () {
      const A = r.lootF || (r.lootF = oa());
      if (A.v434 !== 1) {
        const n = oa();
        for (const t of [
          "thrN",
          "keepSpecial",
          "keepVal",
          "mode",
          "smartUp",
          "custom",
          "minRar",
          "minLvl",
          "groups",
          "series",
          "minMag",
          "slots",
          "wear",
          "accrue",
          "facW",
          "keepRare",
          "setOnly",
          "setMine",
          "pickAll",
        ])
          A[t] = n[t];
        for (const t of ["lm", "sellNow", "v427", "v428", "v430"]) delete A[t];
        A.v434 = 1;
      }
      if (
        (A.v427 !== 1 &&
          ((A.thrN = 2),
          (A.keepSpecial = !0),
          (A.keepVal = 0),
          (A.hkBc = !0),
          (A.hkMp = null),
          (A.v427 = 1)),
        A.setV !== 2)
      ) {
        const n = A.setKeep || [],
          t = w4(),
          e = [];
        (n.includes("Bộ chung") &&
          t.filter((a) => a.k.startsWith("G:")).forEach((a) => e.push(a.k)),
          n.includes("Môn phái") && e.push("MP80", "MP120"),
          (A.setKeep = e),
          (A.setV = 2));
      }
      if (
        (A.mode === void 0 && (A.mode = "smart"),
        A.smartUp === void 0 &&
          ((A.smartUp = A.mode !== "custom"),
          (A.custom = A.mode === "custom"),
          A.mode !== "custom" && (A.keepRare = !0)),
        A.pickAll === void 0 ||
          A.setKeep === void 0 ||
          A.keepRare === void 0 ||
          A.ep === void 0)
      ) {
        const n = oa();
        for (const t in n) A[t] === void 0 && (A[t] = n[t]);
        (r.epAuto === !1 && (A.ep.white = !1),
          r.epAutoJ === !1 && (A.ep.jew = !1),
          delete r.epAuto,
          delete r.epAutoJ);
      }
      return A;
    },
    zm = function (A) {
      const n = A.groups.join(",");
      return (
        n !== es &&
          ((es = n),
          (el = A.groups.length
            ? new Set(
                A.groups
                  .flatMap((t) => (Ke[t] || [0, []])[1])
                  .map((t) => Me[t])
                  .filter((t) => t !== void 0),
              )
            : null)),
        el
      );
    },
    As = function (A) {
      const n = qA().ep;
      return !n ||
        typeof w0 != "function" ||
        !w0() ||
        !A ||
        A.set ||
        A.vio ||
        A.thanma ||
        !(A.d >= 0 && A.d <= 9)
        ? ""
        : n.jew &&
            U1.includes(A.d) &&
            (A.r || 0) <= 2 &&
            !(typeof IA == "function" && IA(A))
          ? "jew"
          : n.white && (A.r || 0) === 0 && !(A.mag || []).length
            ? "white"
            : n.blue &&
                (A.r === 1 || A.r === 2) &&
                (A.mag || []).some(
                  (t) => Lt(t.a).length && xs(t) >= (n.blueLv || 1),
                )
              ? "blue"
              : "";
    },
    K6 = function (A) {
      if (!F1(A)) return !1;
      for (const [t, e] of A.req || [])
        if (
          (t === 36 && e > TA() + 10) ||
          ((t === 37 || t === 39) &&
            e >= 0 &&
            I[r.fac] &&
            (t === 37 ? j0() !== e : I[r.fac].id !== e))
        )
          return !1;
      const n = I[r.fac];
      return !(wA[A.d] === "weapon" && n && !YA(A));
    },
    R6 = function (A) {
      if (!A || !r.fac || !(A.d >= 0 && A.d <= 10)) return -1;
      const n =
        Object.values(r.eq)
          .map((e) =>
            e ? e.uid + "." + (e.enh || 0) + "." + (e.mag || []).length : 0,
          )
          .join(",") +
        "|" +
        r.lvl +
        "|" +
        r.fac;
      if (n !== b4) {
        ((b4 = n), (as = {}));
        try {
          ss = Math.max(1, N0(I0(r.eq)));
        } catch {
          ss = 1;
        }
      }
      if (A.uid in as) return as[A.uid];
      let t = -1;
      if (K6(A))
        try {
          const e = Object.assign({}, r.eq);
          ((e[LA(A)] = A), (t = N0(I0(e)) / ss - 1));
        } catch {
          t = -1;
        }
      return (as[A.uid] = t);
    },
    ns = function (A) {
      if (!A || !r.fac || !(A.d >= 0 && A.d <= 9)) return null;
      const n = r.eq[LA(A)],
        t = (n && n.enh) || 0;
      if (t <= (A.enh || 0)) return null;
      R6(A);
      const e = b4 + "#" + A.uid;
      if (e in y4) return y4[e];
      let a = null;
      if (K6(A))
        try {
          const i = Object.assign({}, A, { enh: t }),
            o = Object.assign({}, r.eq);
          o[LA(A)] = i;
          const l = N0(I0(o)) / ss - 1;
          l > 0.005 && (a = { enh: t, gain: l });
        } catch {
          a = null;
        }
      return (y4[e] = a);
    },
    Qm = function (A) {
      if (A.lock || A.set) return !0;
      const n =
        r.inv.length +
        ":" +
        r.uid +
        ":" +
        r.lvl +
        ":" +
        Object.values(r.eq)
          .map((e) => e && e.uid + "." + (e.enh || 0))
          .join(",");
      if (n !== al) {
        ((al = n), (is = {}));
        for (const e of r.inv)
          if (!e.lock && !e.set && (_n(e) || k4(e))) {
            const a = LA(e);
            (is[a] || (is[a] = [])).push(L0(e));
          }
      }
      const t = L0(A);
      return (is[LA(A)] || []).filter((e) => e > t).length < gu;
    },
    Gm = function () {
      const A = c.P && c.P.main,
        n = A && A.id && T[A.id];
      return n ? !!n.phys : null;
    },
    Km = function () {
      const A = Gm(),
        n = I[r.fac] ? j0() : -1,
        t = A + ":" + n;
      if (t !== il) {
        ((il = t), (x4 = new Map()));
        for (const [e, a] of lu)
          (A === !0 && wu.test(e)) ||
            (A === !1 && uu.test(e)) ||
            (A === !1 && sl.includes(e) && n >= 0 && e !== sl[n]) ||
            (Me[e] !== void 0 && x4.set(Me[e], +a || 0));
      }
      return x4;
    },
    Hk = function (A) {
      const n = Km(),
        t = pu(A);
      let e = 0;
      for (const a of A.mag || []) {
        const i = n.get(a.a);
        i !== void 0 && ((a.p && a.p[0]) | 0) >= Math.floor(i * t) && e++;
      }
      return e;
    },
    hA = function (A) {
      if (typeof U0 == "function" && U0(A)) return !0;
      const n = qA();
      if (A.set && !Ge(A)) return !1;
      if ((n.keepRare && hu(A)) || (n.smartUp && (_n(A) || k4(A)) && Qm(A)))
        return !0;
      if (
        !n.custom ||
        A.r < n.minRar ||
        A.lvl < n.minLvl ||
        (A.mag || []).length < (n.minMag || 0) ||
        (n.series.length && !n.series.includes(A.s)) ||
        (n.slots.length && !n.slots.includes(wA[A.d]))
      )
        return !1;
      if (n.wear) {
        if (!F1(A)) return !1;
        for (const [e, a] of A.req || [])
          if (
            (e === 36 && a > TA() + 5) ||
            ((e === 37 || e === 39) &&
              a >= 0 &&
              I[r.fac] &&
              (e === 37 ? j0() !== a : I[r.fac].id !== a))
          )
            return !1;
      }
      if (
        (n.accrue && A.s >= 0 && A.d !== 10 && I[r.fac] && !G8(j0(), A.s)) ||
        (n.facW && wA[A.d] === "weapon" && I[r.fac] && !YA(A))
      )
        return !1;
      const t = zm(n);
      return !(t && !A.mag.some((e) => t.has(e.a)));
    },
    Rm = function (A, n) {
      Object.assign(A, {
        smartUp: !0,
        keepRare: !0,
        pickAll: !0,
        keepSpecial: !0,
        custom: n === "all",
        minRar: n === "all" ? 0 : 1,
        minLvl: 1,
        minMag: 0,
        groups: [],
        series: [],
        slots: [],
        wear: !1,
        facW: !1,
        accrue: !1,
      });
    },
    p4 = function () {
      const A = r.lootP || (r.lootP = [null, null, null]);
      for (; A.length < 3;) A.push(null);
      return A;
    },
    Ym = function (A) {
      const n = qA();
      p4()[A] = JSON.parse(JSON.stringify(n));
    },
    Y6 = function (A) {
      const { auto: n, pickAll: t } = qA();
      ((r.lootF = Object.assign(oa(), JSON.parse(JSON.stringify(A)), {
        auto: n,
        pickAll: t,
      })),
        (es = null));
    },
    D4 = function (A, n) {
      const t = A0(0, Math.PI * 2),
        e = A0(10, 26),
        [a, i] = K0(n.x + Math.cos(t) * e, n.y + Math.sin(t) * e);
      if (
        (c.ground.push({ it: A, x: a, y: i, age: 0 }), c.ground.length > iu)
      ) {
        let o = c.ground.findIndex((d) => !d.it.set && !d.it.vio && !d.it.plv);
        o < 0 && (o = 0);
        const l = c.ground.splice(o, 1)[0];
        r.gold += y0(l.it);
      }
      (c.quiet ||
        i0(
          A.d <= 1
            ? "dropWeapon"
            : A.d === 2 || A.d === 7
              ? "dropCloth"
              : "dropOther",
        ),
        A.r >= 2 &&
          !c.quiet &&
          M(`Rơi xuống đất: <span style="color:${b0[A.r]}">${D(A.n)}</span>`));
    },
    F6 = function (A, n) {
      let t = null;
      for (const e of r.inv)
        !(e.set && Ge(e)) &&
          !e.vio &&
          !e.plv &&
          !e.lock &&
          !e.thanma &&
          !e.pack &&
          !e.ktc &&
          !U0(e) &&
          (!t || L0(e) < L0(t)) &&
          (t = e);
      return !t || (!n && L0(t) >= L0(A))
        ? !1
        : ((r.gold += y0(t)), r.inv.splice(r.inv.indexOf(t), 1), (Y = !0), !0);
    },
    Fm = function (A) {
      const n = ol();
      if (!n.length) return 0;
      let t = 0;
      for (const e of n) t += y0(e);
      return (
        (r.gold += t),
        (r.inv = r.inv.filter((e) => !n.includes(e))),
        (Y = !0),
        !A &&
          !c.quiet &&
          M(
            `<span class="dim">Hành trang đầy: bán ${n.length} món không khớp bộ lọc (+${j(t)} lượng)</span>`,
          ),
        n.length
      );
    },
    Vm = function () {
      let A = null,
        n = 600;
      for (const t of c.ground) {
        const e = Math.hypot(t.x - b.x, t.y - b.y);
        e < n && ((n = e), (A = t));
      }
      if (!A) {
        y("Không có đồ gần để nhặt");
        return;
      }
      ((c.pickTarget = A), (c.moveTo = null));
    },
    V6 = function (A, n) {
      const t = c.ground.indexOf(A);
      return t < 0
        ? !1
        : ((r.inv.length >= INV_MAX || s0().length >= A1) &&
            typeof Wa == "function" &&
            Wa(5),
          r.inv.length >= INV_MAX && qA().pickAll && Fm(),
          !(As(A.it) && qA().ep.dest !== "inv" && !hA(A.it)) &&
          r.inv.length >= INV_MAX &&
          !F6(A.it, typeof U0 == "function" && U0(A.it))
            ? (n || y("Hành trang đầy"), !1)
            : (c.ground.splice(t, 1),
              tn(A.it, n, !0, c.pickTarget === A),
              sn("picked"),
              c.pickTarget === A && (c.pickTarget = null),
              !0));
    },
    Xm = function (A) {
      for (const a of c.ground) a.age += A;
      let n =
        c.pickTarget && c.ground.includes(c.pickTarget) ? c.pickTarget : null;
      const t = c.enemies.some((a) => !a.dead && (!a.home || a.aggro));
      if (!n && qA().auto && !(typeof S1 == "function" && S1())) {
        let a = null,
          i = 1e9;
        const o = qA(),
          l = o.pickAll,
          d = r.inv.length >= INV_MAX && !(l && ol().length),
          h = d
            ? Math.min(...r.inv.filter((g) => !g.set && !g.lock).map(L0), 1 / 0)
            : -1 / 0;
        for (const g of c.ground) {
          if (
            g.age < 0.4 ||
            (t && Math.hypot(g.x - b.x, g.y - b.y) > vu) ||
            !(l || hA(g.it) || As(g.it)) ||
            (d && L0(g.it) <= h && !U0(g.it))
          )
            continue;
          const f = Math.hypot(g.x - b.x, g.y - b.y);
          f < i && ((i = f), (a = g));
        }
        n = a;
      }
      if (!n) return !1;
      const e = Math.hypot(n.x - b.x, n.y - b.y);
      if (e <= ru)
        return V6(n, !0)
          ? !0
          : ((n.age = -120),
            c.pickTarget === n && (c.pickTarget = null),
            (!c.fullNote || Date.now() - c.fullNote > 6e4) &&
              ((c.fullNote = Date.now()),
              M(
                '<span class="dim">Hành trang đầy: bỏ qua đồ dưới đất (bán / cất bớt để nhặt tiếp).</span>',
              )),
            !1);
      if (n !== c.pkStuck) ((c.pkStuck = n), (c.pkBest = e), (c.pkT = 0));
      else if (e < c.pkBest - 10) ((c.pkBest = e), (c.pkT = 0));
      else if ((c.pkT += A) > 3)
        return (
          (n.age = -60),
          c.pickTarget === n && (c.pickTarget = null),
          (c.pkStuck = null),
          !1
        );
      return (
        Ce(b, n.x, n.y, 170 * i2() * A),
        (b.face = n.x >= b.x ? 1 : -1),
        !0
      );
    },
    X6 = function (A, n) {
      let t = null,
        e = 30;
      for (const a of c.ground) {
        const i = Math.hypot(a.x - A, a.y - (n + 6));
        i < e && ((e = i), (t = a));
      }
      return t;
    },
    U6 = function () {
      r.ground = c.ground.map((A) => ({ it: A.it, wx: A.x, wy: A.y }));
    },
    Um = function () {
      c.ground = (r.ground || [])
        .filter((A) => A && A.it)
        .map((A) => {
          const [n, t] = K0(A.wx ?? M0.w / 2, A.wy ?? M0.h / 2);
          return { it: A.it, x: n, y: t, age: 1 };
        });
    },
    Jm = 0.5,
    Wm = {
      10: 1,
      20: 2,
      30: 3,
      40: 4,
      50: 5,
      60: 6,
      70: 7,
      80: 7,
      90: 7,
      110: 8,
      119: 10,
    },
    Zm = 1,
    Au = (s, A) => Array.from({ length: s }, () => C(A, 1, 10)),
    nu = () => C0(0, 4),
    tu = 0.08,
    ra = () =>
      (1 + (typeof h2 == "function" ? h2("drop") : 0)) *
      (1 + 0.1 * D0()) *
      (1 + Math.min(100, Math.max(0, c.P ? c.P.lucky : 0)) * 0.005),
    J6 = { normal: 0.04, elite: 0.35, boss: 1 },
    W6 = 0.1,
    eu = { normal: 1, elite: 2, boss: 5 },
    Z6 = (s) => j6(s.L) * (ua[s.cls] || ua.normal).xp,
    au = 1540,
    su = 2.4,
    ts = (() => {
      const s = {},
        A = (n, t) => {
          const e = Math.max(Math.abs(t[0] || 0), Math.abs(t[1] || 0));
          e > 0 &&
            e !== 1 &&
            !(t[0] === -1 && t[1] === -1) &&
            (s[n] = Math.max(s[n] || 0, e));
        };
      for (const n of S.affixLevel) A(n.a, n.p[0]);
      for (const n in S.ge) A(S.ge[n].a, S.ge[n].p[0]);
      return s;
    })(),
    P4 = {},
    Al = {
      32: "requirestr",
      33: "requiredex",
      34: "requirevit",
      35: "requireeng",
      36: "requirelevel",
      37: "requireseries",
      38: "requiresex",
      39: "requiremenpai",
      46: "require_translife",
    },
    nl = (s, A) => {
      if (!s) return "";
      let [n, t] = s;
      return n === t
        ? ""
        : (A !== 1 && ((n = Math.round(n * A)), (t = Math.round(t * A))),
          ` [${Math.min(n, t)} ~ ${Math.max(n, t)}]`);
    },
    iu = 40,
    ru = 26,
    Ke = [
      ["Sinh lực", ["lifemax_v", "lifemax_p", "lifereplenish_v"]],
      ["Nội lực", ["manamax_v", "manamax_p", "manareplenish_v"]],
      [
        "Sát thương",
        [
          "addphysicsdamage_v",
          "addphysicsdamage_p",
          "addfiredamage_v",
          "addcolddamage_v",
          "addlightingdamage_v",
          "addpoisondamage_v",
        ],
      ],
      [
        "Kháng",
        [
          "physicsres_p",
          "poisonres_p",
          "coldres_p",
          "fireres_p",
          "lightingres_p",
          "allres_p",
        ],
      ],
      ["Chỉ số", ["strength_v", "dexterity_v", "vitality_v", "energy_v"]],
      ["Kỹ năng", ["allskill_v"]],
      ["Tốc độ", ["attackspeed_v", "castspeed_v", "fastwalkrun_p"]],
      ["Hút máu / nội", ["steallifeenhance_p", "stealmanaenhance_p"]],
      ["Chính xác / né", ["attackratingenhance_v", "adddefense_v"]],
      [
        "Sát thương nội công",
        [
          "metalskill_v",
          "earthskill_v",
          "woodskill_v",
          "waterskill_v",
          "fireskill_v",
        ],
      ],
    ],
    ou = [
      ["weapon", "Vũ khí"],
      ["armor", "Áo"],
      ["helm", "Mũ"],
      ["belt", "Đai"],
      ["boot", "Giày"],
      ["cuff", "Hộ uyển"],
      ["amulet", "Dây chuyền"],
      ["ring", "Nhẫn"],
      ["pendant", "Ngọc bội"],
      ["horse", "Ngựa"],
    ],
    lu = [
      ["earthskill_v", 40],
      ["woodskill_v", 120],
      ["waterskill_v", 120],
      ["fireskill_v", 120],
      ["metalskill_v", 150],
      ["addpoisondamage_v", 35],
      ["addcolddamage_v", 50],
      ["addfiredamage_v", 90],
      ["addlightingdamage_v", 50],
      ["addphysicsdamage_v", 35],
      ["addphysicsdamage_p", 35],
      ["life_v", 150],
      ["mana_v", 150],
      ["staminamax_v", 180],
      ["lifereplenish_v", 4],
      ["staminareplenish_v", 9],
      ["manareplenish_v", 2],
      ["steallifeenhance_p", 0],
      ["stealmanaenhance_p", 0],
      ["dexterity_v", 18],
      ["strength_v", 18],
      ["vitality_v", 18],
      ["physicsres_p", 19],
      ["poisonres_p", 19],
      ["coldres_p", 19],
      ["fireres_p", 19],
      ["lightingres_p", 19],
      ["allres_p", 0],
      ["fastwalkrun_p", 35],
      ["lucky_v", 5],
      ["stuntimereduce_p", 19],
      ["poisontimereduce_p", 19],
      ["fasthitrecover_v", 12],
      ["freezetimereduce_p", 19],
      ["anti_stuntimereduce_p", 9],
      ["water2medamage_p", 9],
      ["anti_do_stun_p", 9],
      ["coldenhance_p", 9],
      ["allskill_v", 0],
      ["attackspeed_v", 19],
      ["castspeed_v", 0],
      ["meleedamagereturn_v", 9],
      ["rangedamagereturn_v", 0],
      ["damage2addmana_p", 9],
      ["expenhance_p", 14],
    ],
    oa = () => ({
      thrN: 2,
      keepSpecial: !0,
      keepVal: 0,
      mode: "smart",
      smartUp: !0,
      custom: !1,
      minRar: 1,
      minLvl: 1,
      groups: [],
      series: [],
      auto: !0,
      minMag: 0,
      slots: [],
      wear: !1,
      accrue: !1,
      facW: !1,
      keepRare: !0,
      setOnly: !1,
      setKeep: [],
      setMine: !1,
      pickAll: !0,
      ep: { white: !0, jew: !0, blue: !0, blueLv: 5, dest: "box" },
    }),
    cu = [
      ["Thanh Câu", 50],
      ["Vân Lộc", 80],
      ["Môn phái", 99],
      ["Thương Lang", 100],
      ["Tống Kim", 120],
      ["Tử Mãng", 120],
      ["Kim Ô", 120],
      ["Bạch Hổ", 120],
      ["Xích Lân", 120],
      ["Minh Phượng", 120],
      ["Huyền Viên", 120],
      ["Tinh Sương", 120],
      ["Đằng Long", 180],
      ["Bộ chung", 0],
    ],
    du = cu.filter(([s]) => !["Môn phái", "Tống Kim", "Bộ chung"].includes(s)),
    Re = (s) => ((s.req || []).find((A) => A[0] === 39) || [0, -1])[1],
    fu = {
      29: "Vô Danh",
      41: "Tuệ Thanh",
      42: "Vinh Diệu",
      44: "Càn Khôn",
      45: "Chấp Tử",
      46: "Minh Nguyệt",
      52: "Như Ý",
    },
    v4 = null,
    tl = null,
    $k = (s) => {
      const A = w4().find((n) => n.k === s);
      return A ? A.n : s;
    },
    es = null,
    el = null,
    hu = (s) =>
      !!(
        (s.set && Ge(s)) ||
        s.vio ||
        s.plv ||
        (s.d === 10 && (s.r >= 3 || s.rareH))
      ),
    b4 = "",
    as = {},
    ss = 1,
    _n = (s) => R6(s) > 0.005,
    y4 = {},
    k4 = (s) => !_n(s) && !!ns(s),
    gu = 2,
    is = null,
    al = "",
    mu = new Set(
      [
        "steallifeenhance_p",
        "stealmanaenhance_p",
        "steallife_p",
        "stealmana_p",
        "allskill_v",
        "indestructible_b",
        "ignoredefense_p",
      ]
        .map((s) => Me[s])
        .filter((s) => s !== void 0),
    ),
    uu =
      /^(addphysicsdamage_[vp]|addpoisondamage_v|addcolddamage_v|addfiredamage_v|addlightingdamage_v|attackspeed_v)$/,
    wu =
      /^(castspeed_v|metalskill_v|woodskill_v|waterskill_v|fireskill_v|earthskill_v)$/,
    sl = [
      "metalskill_v",
      "woodskill_v",
      "waterskill_v",
      "fireskill_v",
      "earthskill_v",
    ],
    il = null,
    x4 = null,
    pu = (s) => C(0.4 + 0.06 * (s.lvl || 1), 0.46, 1),
    Tk = (s) => (s.mag || []).some((A) => mu.has(A.a)),
    Ck = (s) =>
      String(S.attrDesc[s] || s)
        .replace(/#d\d[+~-]?/g, "")
        .replace(/#l\d/g, "")
        .replace(/:\s*(điểm|cấp|%)?.*$/, "")
        .replace(/\s+/g, " ")
        .trim() + (/_p$/.test(s) && !/%/.test(s) ? " (%)" : ""),
    Du = [
      [
        "smart",
        "Thông minh",
        "Giữ đồ nâng cấp (2 món tốt nhất mỗi ô) và đồ quý",
      ],
      ["all", "Nhặt hết", "Giữ mọi món, chỉ bán khi túi đầy"],
    ],
    Pu = (s) =>
      s.custom && (s.minRar || 0) === 0 ? "all" : s.custom ? "" : "smart",
    rl = [
      ["Mặc định", { smartUp: !0, custom: !1 }],
      ["Tím / Hoàng Kim", { smartUp: !0, custom: !0, minRar: 3 }],
      ["Hợp phái", { smartUp: !0, custom: !0, wear: !0, facW: !0, accrue: !0 }],
      ["Nhặt hết", { smartUp: !0, custom: !0, minRar: 0, minLvl: 1 }],
    ],
    ol = () =>
      r.inv.filter((s) => !hA(s) && !Ha(s) && !Object.values(r.eq).includes(s)),
    vu = 220;
  window.RCP = {
    recipes: {
      violet_fuse: {
        id: "violet_fuse",
        kind: "violet_fuse",
        inputs: [{ name_key: "Trang bị", qty: 3, detail: [3, 4, 9] }],
        level_div: [10, 5],
        cost: { luong: 1e3, src: "community" },
        src: "official",
        ref: "SRC/KPlayer.cpp:8165 CPA_FUSION",
      },
      violet_up: {
        id: "violet_up",
        kind: "violet_up",
        inputs: [{ name_key: "Huyền Tinh Khoáng Thạch", qty: 3 }],
        fail: [2, 11],
        src: "official",
        ref: "SRC/KPlayer.cpp:8178 CPA_CRYOLITE",
      },
      ore_up: {
        id: "ore_up",
        kind: "ore_up",
        inputs: [{ name_key: "Khoáng thạch", qty: 1 }],
        fail: [2, 11],
        src: "official",
        ref: "SRC/KPlayer.cpp:8201 CPA_PROPMINE",
      },
      enchase: {
        id: "enchase",
        kind: "enchase",
        inputs: [
          { name_key: "Trang bị trắng", qty: 1 },
          { name_key: "Huyền Tinh Khoáng Thạch", qty: 1 },
          { name_key: "Khoáng thạch", qty: 1 },
        ],
        fail_pct: 5,
        slots: 6,
        level_add: "(cap_huyen_tinh + cap_khoang)/2",
        src: "official",
        ref: "SRC/KPlayer.cpp:8312 ECA_ENCHASE",
      },
      "platina_make:0": {
        id: "platina_make:0",
        kind: "platina_make",
        inputs: [
          { name_key: "Hoàng Kim giống nhau", qty: 2 },
          { name_key: "Thủy Tinh Trắng", qty: 1 },
          { name_key: "Thần bí khoáng thạch", qty: 1 },
        ],
        cost: { van: 1e3 },
        rate: 25,
        src: "community",
        ref: "CLAUDE.md",
      },
      "platina_up:1": {
        id: "platina_up:1",
        kind: "platina_up",
        level: 1,
        inputs: [
          { name_key: "Thủy Tinh Trắng", qty: 1 },
          { name_key: "Thần bí khoáng thạch", qty: 1 },
        ],
        cost: { van: 1e3 },
        rate: 90,
        src: "community",
        ref: "CLAUDE.md",
      },
      "platina_up:2": {
        id: "platina_up:2",
        kind: "platina_up",
        level: 2,
        inputs: [
          { name_key: "Thủy Tinh Trắng", qty: 2 },
          { name_key: "Thần bí khoáng thạch", qty: 4 },
        ],
        cost: { van: 4e3 },
        rate: 80,
        src: "community",
        ref: "CLAUDE.md",
      },
      "platina_up:3": {
        id: "platina_up:3",
        kind: "platina_up",
        level: 3,
        inputs: [
          { name_key: "Thủy Tinh Trắng", qty: 2 },
          { name_key: "Thần bí khoáng thạch", qty: 4 },
        ],
        cost: { van: 4e3 },
        rate: 70,
        src: "community",
        ref: "CLAUDE.md",
      },
      "platina_up:4": {
        id: "platina_up:4",
        kind: "platina_up",
        level: 4,
        inputs: [
          { name_key: "Thủy Tinh Trắng", qty: 4 },
          { name_key: "Thần bí khoáng thạch", qty: 8 },
        ],
        cost: { van: 8e3 },
        rate: 60,
        src: "community",
        ref: "CLAUDE.md",
      },
      "platina_up:5": {
        id: "platina_up:5",
        kind: "platina_up",
        level: 5,
        inputs: [
          { name_key: "Thủy Tinh Trắng", qty: 5 },
          { name_key: "Thần bí khoáng thạch", qty: 8 },
        ],
        cost: { van: 8e3 },
        rate: 50,
        src: "community",
        ref: "CLAUDE.md",
      },
      "platina_up:6": {
        id: "platina_up:6",
        kind: "platina_up",
        level: 6,
        inputs: [
          { name_key: "Thủy Tinh Trắng", qty: 6 },
          { name_key: "Thần bí khoáng thạch", qty: 12 },
        ],
        cost: { van: 12e3 },
        rate: 95,
        src: "community",
        ref: "CLAUDE.md",
      },
      "platina_up:7": {
        id: "platina_up:7",
        kind: "platina_up",
        level: 7,
        inputs: [
          { name_key: "Thủy Tinh Trắng", qty: 7 },
          { name_key: "Thần bí khoáng thạch", qty: 12 },
        ],
        cost: { van: 12e3 },
        rate: 90,
        src: "community",
        ref: "CLAUDE.md",
      },
      "platina_up:8": {
        id: "platina_up:8",
        kind: "platina_up",
        level: 8,
        inputs: [
          { name_key: "Thủy Tinh Trắng", qty: 8 },
          { name_key: "Thần bí khoáng thạch", qty: 16 },
        ],
        cost: { van: 16e3 },
        rate: 85,
        src: "community",
        ref: "CLAUDE.md",
      },
      "platina_up:9": {
        id: "platina_up:9",
        kind: "platina_up",
        level: 9,
        inputs: [
          { name_key: "Thủy Tinh Trắng", qty: 9 },
          { name_key: "Thần bí khoáng thạch", qty: 16 },
        ],
        cost: { van: 16e3 },
        rate: 80,
        src: "community",
        ref: "CLAUDE.md",
      },
      "platina_up:10": {
        id: "platina_up:10",
        kind: "platina_up",
        level: 10,
        inputs: [
          { name_key: "Thủy Tinh Trắng", qty: 10 },
          { name_key: "Thần bí khoáng thạch", qty: 20 },
        ],
        cost: { van: 2e4 },
        rate: 75,
        src: "community",
        ref: "CLAUDE.md",
      },
    },
    shards: {
      "Bắc Kinh chi Mộng": 9,
      "Ngũ Sắc Ngọc Bội": 9,
      "Nhã Điển Chi Hồn": 9,
      "Bôn Lôi Toàn Long thương": 9,
      "Phục Ma Tử Kim Côn": 9,
      "Tứ Không Giáng Ma Giới đao": 9,
      "Đại Nhãn Thần Chùy": 9,
      "Bôn Lôi Toàn Long Thương": 9,
      "Lượng Ngân Bảo Đao": 9,
      "Vô Gian ỷ Thiên Kiếm": 9,
      "Tê Hoàng Phụng Nghĩa Đao": 9,
      "Bích Hải Uyên Ương Liên Hoàn đao": 9,
      "Minh ảo Tà Sát Độc Nhận": 9,
      "Hoa Vũ Mạn Thiên": 9,
      "Phi Tinh Đoạt Hồn": 9,
      "Lục Ngọc Trượng": 9,
      "U Minh Thương": 9,
      "Chân Vũ Kiếm": 9,
      "Thiên Niên Hàn Thiết": 9,
      "Trích Tinh hoàn": 6,
      "Đường Nghê giáp": 6,
      "Lục Phỉ Thúy Hộ Thân phù": 6,
      "Bạch Kim yêu đái": 6,
      "Thiên Tàm Hộ Uyển": 6,
      "Thiên Tàm Ngoa": 6,
      "Băng Tinh Thạch Hạng Liên": 6,
      "Cúc Hoa Thạch Chỉ hoàn": 6,
      "Điền Hoàng Thạch Ngọc Bội": 6,
      "Huyết Thạch Giới Chỉ": 6,
      "Hiệp Cốt Tình ý Kết": 6,
      "Cân Quốc Nghê Thường": 6,
      "Ô Sa Phát Quán": 6,
      "Kim Ti Chính Hồng Cà Sa": 6,
      "Huyền Vũ Hoàng Kim Khải": 6,
      "Tẩy Tượng Ngọc Khấu": 6,
      "Hồng Truy Nhuyễn Tháp hài": 6,
      "Thanh Tâm Hướng Thiện Châu": 6,
      "Bích Hải Hồng Lăng Ba": 6,
      "U Lung Kim Xà Phát đái": 6,
      "U Lung Mặc Thù Nhuyễn Lý": 6,
      "Chú Phược Diệt Lôi Cảnh Phù": 6,
      "Địa Phách Hắc Diệm Xung Thiên Liên": 6,
      "Đồng Cừu Giáng Long Cái Y": 6,
      "Đồng Cừu Kháng Long Hộ Uyển": 6,
      "Ma Hoàng Kim Giáp Khôi": 6,
      "Ma Hoàng án Xuất Hổ Hạng Khuyên": 6,
      "Ma Thị sơn  Hải Phi Hồng Lý": 6,
      "Lăng Nhạc Vô Cực Huyền Ngọc Bội": 6,
      "Cập Phong Tam Thanh Phù": 6,
      "Lôi Khung Thiên Địa Hộ phù": 6,
      "Vụ ảo Bắc Minh Đạo quán": 6,
      "Hiệp Cốt Thiết Huyết Sam": 4,
      "Hiệp Cốt Đa Tình Hoàn": 4,
      "Hiệp Cốt Đan Tâm Giới": 4,
      "Nhu Tình Thục Nữ Hạng Liên": 4,
      "Nhu Tình  Phụng Nghi Giới Chỉ": 4,
      "Nhu Tình  Tuệ Tâm Ngọc Bội": 4,
      "Định Quốc Thanh Sa Trường Sam": 4,
      "Định Quốc Xích Quyên Nhuyễn Ngoa": 4,
      "Định Quốc Tử Đằng Hộ uyển": 4,
      "Định Quốc Ngân Tàm Yêu đái": 4,
      "Băng Hàn Đàn Chỉ Phi Đao": 9,
      "Thiên Ngoa Định Tâm Ngưng Thần Phù": 6,
      "Lôi Khung Hàn Tùng Băng Bách Quán": 6,
      "Phục Ma Phổ Độ Tăng Hài": 6,
      "Tứ Không Nhuyễn Bì Hộ Uyển": 6,
      "Hãm Thiên Thừa Long Chiến Ngoa": 6,
      "Ngự Long Chiến Thần Qua Trụy": 6,
      "Vô Gian Cầm Vận Hộ Uyển": 6,
      "Vô Trần Phật Quang Chỉ Hoàn": 6,
      "Thê Hoàng Băng Tuy Cẩm Uyển": 6,
      "Vụ Hoán U Cổ ám Y": 6,
      "Chú Phọc Phá Giáp Đầu Hoàn": 6,
      "Băng Hàn Huyền Y Thúc Giáp": 6,
      "Sâm Hoang Tinh Vân Phi Lữ": 6,
      "Địa Phách Ngũ Hành Liên Hoàn Quán": 6,
      "Địch Khái Cẩu Tích Bì Hộ Uyển": 6,
      "Ma Sát Tàn Dương ánh Huyết Giáp": 6,
      "Ma Thị Liệt Hỏa Quán Miện": 6,
      "Sương Tinh Thiên Thanh Băng Tinh Thủ": 6,
      "Vụ Hoan Tùng Phong Tuyết ảnh Ngoa": 6,
      "Huyền Thiết Phát Đái": 6,
      "Phục Ma Ô Kim Nhuyễn Thao": 6,
      "Tứ Không Hộ Pháp Yêu Đái": 6,
      "Hãm Thiên Uy Vũ Thúc Yêu Hoàn": 6,
      "Tục Nghiệp Bạch Hổ Vô Song Khấu": 6,
      "Ngự Long Long Thiên Môn Thúc Yêu Hoàn": 6,
      "Vô Gian Phất Vân Ty Đái": 6,
      "Vô Ma Ma Ni Quán": 6,
      "Vô Trần Ngọc Nữ Tố Tâm Quán": 6,
      "Bích Hải Hồng Linh Kim Ty Đái": 6,
      "U Lung Thanh Ngô Triền Yêu": 6,
      "Vụ Hoán Hủ Cốt Hộ Uyển": 6,
      "Chú Phọc Xuyên Tâm Độc Uyển": 6,
      "Băng Hàn Tâm Tiễn Yêu Khấu": 6,
      "Thiên Ngoa Sâm La Thúc Yêu": 6,
      "Sâm Hoang Hồn Giảo Yêu Thúc": 6,
      "Địa Phách Khấu Tâm Trọc": 6,
      "Đồng Cừu Tiềm Long Yêu Đái": 6,
      "Địch Khái Phục Mãng Yêu Đái": 6,
      "Ma Hoàng Khê Cốc Thúc Yêu Đái": 6,
      "Ma Thị Huyết Ngọc Thất Sát Bội": 6,
      "Ma Sát Xích Ký Tỏa Yêu Khấu": 6,
      "Lăng Nhạc Nộ Lôi Pháp Giới": 6,
      "Cập Phong Huyền Ty Tam Đoạn Cẩm": 6,
      "Sương Tinh Thanh Phong Lữ Đái": 6,
      "Lôi Khung Phong Tuyết Thanh Cẩm Đái": 6,
      "Vụ Hoan Thanh ảnh Huyền Ngọc Bội": 6,
      "Hồng ảnh Trầm Viên Vãn Túy": 6,
      "Hồng ảnh Kiếm Qua Tây Phương": 6,
      "Hồng ảnh Mục Túc Tương Vong": 6,
      "Hồng ảnh Hồng Tụ Chiêu": 6,
      "Mộng Long Tử Kim Bát Nhã Giới": 6,
      "Tứ Không Đạt Ma Tăng Hài": 6,
      "Kế Nghiệp Chu Tước Lăng Vân Ngoa": 6,
      "Ngự Long Tấn Phong Phát Cơ": 6,
      "Vô Gian Thanh Phong Nhuyễn Kịch": 6,
      "Vô Yểm Thu Thủy Lưu Quang Đái": 6,
      "Vô Trần Tịnh ảnh Lưu Tô": 6,
      "Thê Hoàng Tuệ Tâm Trường Sinh Khấu": 6,
      "Bích Hải Hoàn Châu Tuyên Thanh Cân": 6,
      "Ô Lung Xích Hạt Bí Trang": 6,
      "Minh Hoan Song Hoàn Xà Khấu": 6,
      "Chú Phọc Thực Cốt Ngọc Bội": 6,
      "Băng Hàn Nguyệt ảnh Ngoa": 6,
      "Thiên Quang Địa Hành Thiên Lý Ngoa": 6,
      "Sâm Hoang Kim Tiền Liên Hoàn Giáp": 6,
      "Địa Phách Phong Hàn Thúc Yêu": 6,
      "Đồng Cừu Ngự Long Ngọc Bội": 6,
      "Địch Khái Cửu Đại Cái Y": 6,
      "Ma Sát Cử Hỏa Liêu Thiên Hoàn": 6,
      "Ma Thị Lệ Ma Phệ Tâm Đái": 6,
      "Ma Hoàng Dung Kim Đoạn Nhật Giới": 6,
      "Lăng Nhạc Vô Ngã Thúc Đái": 6,
      "Cập Phong Thúy Ngọc Huyền Hoàng Uyển": 6,
      "Sương Tinh Lưu Tinh Cản Nguyệt Khấu": 6,
      "Lôi Khung Linh Ngọc Uẩn Lôi Uyển": 6,
      "Vụ Hoan Thái Uyên Chân Võ Liên": 6,
      "Bích Hải Hoàn Châu Vũ Liêm": 9,
      "Bích Hải Tiêm Tế Chỉ Hoàn": 9,
      "Băng Hàn Huyền Thiên Băng Hỏa Bội": 9,
      "Địch Khái Thảo Gian Thạch Giới": 9,
      "Địch Khái Cửu Đái Cái Y": 9,
      "Địa Phách Địa Hành Thiên Lý Ngoa": 9,
      "Địa Phách Tích Lịch Lôi Hỏa Giới": 9,
      "Động Sát Bạch Kim Điêu Long Giới": 9,
      "Động Sát Bạch Kim Tú Phụng Giới": 9,
      "Động Sát Bạch Ngọc Càn Khôn Bội": 9,
      "Động Sát Phỉ Thuý Ngọc Hạng Khuyên": 9,
      "Phục Ma Phật Tâm Nhuyễn Khấu": 9,
      "Phục Ma Huyền Hoàng Cà Sa": 9,
      "Hám Thiên Hổ Đầu Cẩn Thúc Uyển": 9,
      "Hám Thiên Vũ Thần Tương Kim Giáp": 9,
      "Cập Phong Thuý Ngọc Huyền Hoàn Bội": 9,
      "Cập Phong Thanh Tùng Pháp Giới": 9,
      "Kế Nghiệp Hỏa Vân Kỳ Lân Thủ": 9,
      "Lôi Khung Cửu Thiên Dẫn Lôi Giới": 9,
      "Lôi Khung Linh Ngọc Uẩn Lôi": 9,
      "Lăng Nhạc Nộ Lôi Thúc Yêu": 9,
      "Lăng Nhạc Thiên Địa Huyền Hoàng Giới": 9,
      "Lăng Nhạc Vô Ngã Đạo Bào": 9,
      "Mộng Long Đạt Ma Tăng Hài": 9,
      "Mộng Long Phật Pháp Huyền Bội": 9,
      "Minh ảo Độc Hạt Chỉ Hoàn": 9,
      "Minh ảo Song Hoàn Xà Hài": 9,
      "Ma Hoàng Đăng Đạp Ngoa": 9,
      "Ma Hoàng Huyết Y Thú Trọc": 9,
      "Ma Sát Cử Hỏa Liêu Thiên Uyển": 9,
      "Ma Sát Vân Long Thổ Châu Giới": 9,
      "Ma Thị Lệ Ma Phệ Tâm Liên": 9,
      "Ma Thị Nghiệp Hỏa U Minh Giới": 9,
      "Tê Hoàng Thúy Ngọc Chỉ Hoàn": 9,
      "Tê Hoàng Tuệ Tâm Khinh Sa Y": 9,
      "Sâm Hoang Huyền Thiết Tương Ngọc Bội": 9,
      "Sương Tinh Ngạo Sương Đạo Bào": 9,
      "Sương Tinh Phong Bạo Chỉ Hoàn": 9,
      "Tứ Không Giới Luật Pháp Giới": 9,
      "Tứ Không Tử Kim Cà Sa": 9,
      "Thiên Quang Phong Bạo Hàn Thiết Trọc": 9,
      "Thiên Quang Thúc Thiên Phược Địa Hoàn": 9,
      "Đồng Cừu Phi Long Đầu Hoàn": 9,
      "Đồng Cừu Kiến Long Ban Chỉ": 9,
      "Vô Trần Từ Bi Ngọc Ban Chỉ": 9,
      "Vô Trần Phật Tâm Từ Hữu Yêu Phối": 9,
      "Vô Gian Bạch Ngọc Ban Chỉ": 9,
      "Vô Gian Thanh Phong Tri Y": 9,
      "Vô Yểm Băng Tinh Chỉ Hoàn": 9,
      "Vô Yểm Tử Khâm Cà Sa": 9,
      "Vụ ảo Ki Bán Phù Chú": 9,
      "Vụ ảo Thúc Tâm Chỉ Hoàn": 9,
      "U Lung Xích Hạt Bí Trang": 9,
      "U Lung Ngân Thiềm Hộ Thủ": 9,
      "Ngự Long Tuyệt Mệnh Chỉ Hoàn": 9,
      "Ngự Long Tấn Phong Hộ Uyển": 9,
      "Chú Phược Băng Hỏa Thực Cốt Ngoa": 9,
      "Chú Phược U Hoan Chỉ Hoàn": 9,
    },
  };
  var rs = function (A, n) {
      const t = S.ge[A];
      return t
        ? {
            a: t.a,
            p: t.p.map(([e, a]) =>
              e === -1 && a === -1 ? -1 : Math.round(e + ((a - e) * n) / 10),
            ),
            pre: 1,
          }
        : null;
    },
    X1 = function (A) {
      const n = S.ge[A];
      return n
        ? {
            a: n.a,
            p: n.p.map(([t, e]) =>
              t === -1 && e === -1
                ? -1
                : Math.min(t, e) +
                  Math.floor(Math.random() * (Math.abs(e - t) + 1)),
            ),
            pre: 1,
          }
        : null;
    },
    Ye = function (A, n, t) {
      const e = Math.min(6, t | 0),
        a = () =>
          C(Math.round(e + (10 - e) * Math.pow(Math.random(), $u)), 0, 10),
        i = {
          uid: r.uid++,
          d: n.d,
          k: n.k,
          n: A === "platina" ? dl(n.n) : n.n,
          ic: n.ic || "",
          lvl: n.lvl,
          s: n.s,
          price: n.price,
          base: n.base.map((l) => l.slice()),
          req: n.req.map((l) => l.slice()),
          r: A === "gold" ? 4 : 5,
          set: {
            kind: A,
            grp: n.grp,
            n1: n.n1 || 99,
            n2: n.n2 || 99,
            sid: n.sid,
          },
        },
        o = A === "gold" ? X1 : (l) => rs(l, a());
      return (
        (i.mag = n.mag.map(o).filter(Boolean)),
        (i.ext = n.ext.map(o).filter(Boolean)),
        i
      );
    },
    os = function (A, n) {
      const t = fl(A);
      if (_4() < 3) return t === "Bộ chung" || t === "Môn phái";
      const e = Bu[t];
      return !e || (n >= e[0] && n < e[1]);
    },
    bu = function (A) {
      const n =
        (A.cls === "boss"
          ? 0.02 + dA(Math.min(r.stage, l0)) * 0.0015
          : A.cls === "elite"
            ? 0.003
            : 15e-5 * $s(A)) *
        ra() *
        Fe("drop") *
        Tu;
      if (Math.random() >= n) return null;
      const t = "gold",
        e = Math.max(r.lvl, A.L) + 10,
        a = I[r.fac] ? I[r.fac].id : -1,
        i = (h, g) => (h.req.find((f) => f[0] === g) || [0, -1])[1],
        o = Math.max(r.lvl, A.L);
      let l = S.sets[t].filter(
        (h) => i(h, 36) <= e && i1(h.req) && tA(h) && os(h, o),
      );
      if (t === "gold") {
        const h = (w) => i(w, 39) >= 0 || i(w, 36) >= 90,
          g = l.filter(h),
          f = l.filter((w) => !h(w)),
          m =
            A.cls === "boss"
              ? M4.boss
              : A.cls === "elite"
                ? M4.elite
                : M4.normal;
        l = g.length && (!f.length || Math.random() < m) ? g : f;
      }
      if (t === "gold") {
        const h = l.filter((f) => i(f, 39) >= 0),
          g = l.filter((f) => i(f, 39) < 0);
        l = h.length && (!g.length || Math.random() < Ou) ? h : g;
      }
      const d = l.filter((h) => i(h, 39) === a);
      return (
        d.length && Math.random() < Cu && (l = d),
        l.length
          ? Ye(t, _0(l), c.P ? Math.min(10, Math.floor(c.P.lucky / 10)) : 0)
          : null
      );
    },
    ls = function (A) {
      const n = {};
      for (const t in A) {
        const e = A[t];
        !e ||
          !e.set ||
          t === "horse" ||
          (t === "ring1" &&
            A.ring2 &&
            A.ring2.set &&
            A.ring2.set.grp === e.set.grp &&
            A.ring2.set.sid === e.set.sid) ||
          (n[e.set.grp] = (n[e.set.grp] || 0) + 1);
      }
      return n;
    },
    o1 = function (A) {
      const n = ls(A);
      for (const t in A) {
        const e = A[t];
        if (e && e.set && n[e.set.grp] >= e.set.n2) return !0;
      }
      return !1;
    },
    B4 = function (A, n) {
      const t = X2(A, n);
      return t
        ? A.set.kind === "platina"
          ? (A.ext || []).length
          : t === "horse" || o1(n)
            ? cl
            : Math.min(
                cl,
                Math.floor((ls(n)[A.set.grp] || 0) / Math.max(1, A.set.n1)),
              )
        : 0;
    },
    yu = function (A) {
      const n = new Set();
      return S.sets[A.set.kind].filter(
        (t) =>
          t.grp === A.set.grp &&
          !/Hạn Thời/i.test(t.n) &&
          !n.has(t.n) &&
          n.add(t.n),
      );
    },
    ll = { 65: 66, 70: 71 };
  for (const s in S.ge) {
    const A = S.ge[s];
    if (
      A &&
      ll[A.a] != null &&
      !A.afx &&
      ((A.a = ll[A.a]), (A.afx = 1), typeof ts < "u")
    ) {
      const n = Math.max(Math.abs(A.p[0][0] || 0), Math.abs(A.p[0][1] || 0));
      n > 1 && (ts[A.a] = Math.max(ts[A.a] || 0, n));
    }
  }
  var cl = 2,
    ku = "[Bạch Kim] ",
    k1 = (s) => String(s || "").replace(/^\[[^\]]*\]\s*/, ""),
    dl = (s) => (/^\[/.test(s) ? s : ku + s),
    Ok = {
      1: {
        n: "Phiên bản 1 · Sơ khai",
        d: "Hoàng Kim chung (An Bang, Định Quốc, Hiệp Cốt, Nhu Tình, Kim Phong, Thiên Hoàng, Động Sát…) và Hoàng Kim môn phái. Không có đồ Tím, không có Bạch Kim.",
      },
      2: {
        n: "Phiên bản 2 · Đồ Tím",
        d: "Như phiên bản 1, thêm hệ thống đồ Tím: Huyền Tinh, khoáng thạch rơi ra; hợp, khảm, tách đồ Tím.",
      },
      3: {
        n: "Phiên bản 3 · Lộ trình Hoàng Kim",
        d: "Như phiên bản 2, đồ Hoàng Kim rơi theo lộ trình cấp của JX1: Thanh Câu (50) → Vân Lộc (80) → Thương Lang (100) → Tử Mãng, Kim Ô, Bạch Hổ, Xích Lân, Minh Phượng, Huyền Viên, Tinh Sương, Tống Kim (120) → Đằng Long (180); thêm Bạch Kim.",
      },
    },
    _4 = () => 3,
    w0 = () => _4() >= 2,
    cs = () => !0,
    xu = { drop: 0.05, shard: 0.15, grant: 0.1 },
    Fe = (s) => (_4() >= 3 ? xu[s] : 1),
    Bu = {
      "Thanh Câu": [50, 80],
      "Vân Lộc": [80, 100],
      "Thương Lang": [100, 120],
      "Tử Mãng": [120, 180],
      "Kim Ô": [120, 180],
      "Bạch Hổ": [120, 180],
      "Xích Lân": [120, 180],
      "Minh Phượng": [120, 180],
      "Huyền Viên": [120, 180],
      "Tinh Sương": [120, 180],
      "Tống Kim": [120, 999],
      "Đằng Long": [180, 999],
    },
    fl = (s) => s.fam || (s.fam = G6({ set: 1, n: s.n, req: s.req })),
    hl = ["Bộ chung", "Môn phái"],
    tA = (s) => {
      const A = (s.req.find((n) => n[0] === 39) || [0, -1])[1];
      return (
        s.d <= 10 &&
        s.mag.length > 0 &&
        !s.fixed &&
        (A < 0 || uA.some((n) => n.id === A)) &&
        hl.includes(fl(s)) &&
        (typeof M8 != "function" || M8(s))
      );
    },
    _u = (s) => String(s || "").replace(/^(\[[^\]]*\]\s*)+/, ""),
    Mu = (s) =>
      !!(
        s.set &&
        s.set.kind === "platina" &&
        typeof _1 < "u" &&
        (_1.has(_u(s.n)) ||
          S.sets.platina.some((A) => A.vng === 2 && A.n === s.n))
      ),
    gl = null,
    Hu = (s) =>
      (
        gl || (gl = new Set(S.sets.gold.filter((A) => tA(A)).map((A) => A.n)))
      ).has(s),
    jA = (s) =>
      !!s &&
      (s.r === 5 || s.plv != null || (s.set && s.set.kind === "platina")
        ? !Mu(s)
        : !!(s.set && (!hl.includes(G6(s)) || !Hu(s.n)))),
    ds = (s) => {
      if (!s || typeof s != "object" || !s.set)
        return typeof SA == "function" && SA(s);
      let A;
      try {
        ((A = JSON.parse(JSON.stringify(s))), typeof Gn == "function" && Gn(A));
      } catch {
        A = s;
      }
      return (typeof SA == "function" && SA(A)) || jA(A);
    },
    $u = 2.5,
    Tu = 0.2,
    Cu = 0.2,
    Ou = 0.05,
    Eu = 0.05,
    Iu = 0.1,
    M4 = { boss: 0.25, elite: 0.12, normal: 0.06 },
    V = function (A, n, t = 1) {
      const e = T0()[A];
      ((e[n] = (e[n] || 0) + t), e[n] <= 0 && delete e[n]);
    },
    Su = function (A, n) {
      let t = I4[A],
        e = I4[n];
      if (t == null || e == null) return 1;
      t > e && ([t, e] = [e, t]);
      const a = rw[t][e - t];
      return (a ?? 100) / 100;
    },
    Nu = function (A, n) {
      const t = ws(A);
      if (!t) return 0;
      const e = (a) => (n && Number.isFinite(n[a]) ? n[a] : 0);
      for (let a = t[0]; a <= t[1]; a++)
        if (
          z0[a].p.every(
            ([i, o], l) => i < 0 || o < 0 || (i <= e(l) && e(l) <= o),
          )
        )
          return a;
      return e(0) > z0[t[1]].p[0][1] ? t[1] : t[0];
    },
    Lu = function (A, n, t, e) {
      const a = [];
      if (
        (A.forEach((o, l) => {
          o > 0 &&
            z0[o] &&
            a.push({
              v: (Tl(o, n, t) * dw(o, e) * (Ml[l] != null ? Ml[l] : 100)) / 100,
              a: z0[o].id,
              l: z0[o].lvl,
            });
        }),
        a.length <= 1)
      )
        return a.length ? a[0].v : 0;
      let i = 0;
      for (let o = 0; o < a.length - 1; o++)
        for (let l = o + 1; l < a.length; l++)
          i +=
            ((((a[o].v + a[l].v) * (Su(a[o].a, a[l].a) - 1) * a[o].l) / 10) *
              a[l].l) /
            10;
      return a.reduce((o, l) => o + l.v, i);
    },
    H4 = function (A, n, t) {
      const e = us[t] || 0,
        a = ew[(A.lvl | 0) - 1],
        i = a
          ? (n.some((l) => l > 0 && z0[l] && z0[l].id >= 168 && z0[l].id <= 172)
              ? a[1]
              : a[0]) / 100
          : 1,
        o = (Hl[A.d + ":" + A.k] != null ? Hl[A.d + ":" + A.k] : 100) / 100;
      return e + i * o * Lu(n, A.d, A.k, A.s);
    },
    Mn = function (A, n, t) {
      const e = n.length,
        a = new Array(e).fill(0);
      if (!(A > 0) || !e) return { sel: -1, probs: a, sum: 0 };
      const i = n.map((m, w) => w).sort((m, w) => n[m] - n[w] || m - w),
        o = i.map((m) => n[m]),
        l = new Array(e).fill(0),
        d = o.findIndex((m) => m > A);
      if (d < 0) l[e - 1] = 1;
      else if (d > 0) {
        const m = d > 1 ? o[d - 1] * Ds + o[d - 2] * (1 - Ds) : o[0],
          w = d < e - 1 ? o[d] * Ps + o[d + 1] * (1 - Ps) : o[e - 1],
          p = (w - A) / (w - m),
          P = 1 - p;
        (d > 1 ? ((l[d - 1] = p * Ds), (l[d - 2] = p * (1 - Ds))) : (l[0] = p),
          d < e - 1
            ? ((l[d] = P * Ps), (l[d + 1] = P * (1 - Ps)))
            : (l[e - 1] = P));
      }
      let h = 0,
        g = -1;
      const f = t ?? Ct();
      for (let m = 0; m < e; m++)
        ((h += l[m]), g < 0 && h > 0 && f <= h && (g = i[m]), (a[i[m]] = l[m]));
      return { sel: g, probs: a, sum: h };
    },
    ml = function (A, n) {
      const t = [
        [0, 1],
        [0.5, 0.9],
        [1, 0.8],
        [1.5, 0.7],
        [2, 0.6],
      ];
      let e = 0;
      for (let a = t.length - 1; a >= 0; a--) {
        const i = n - A * t[a][0];
        i > 0 && ((e += i * t[a][1]), (n -= i));
      }
      return e;
    },
    fs = function () {
      const A = { wc: 0, mys: 0, fd: 0 };
      if (St.on) for (const n in A) A[n] = C(St[n] | 0, 0, ys(n));
      return A;
    },
    ul = function (A) {
      A &&
        (A.wc && V("misc", "wc", -A.wc),
        A.mys && V("misc", "mys", -A.mys),
        A.fd && (Q().fd -= A.fd * bs));
    },
    l1 = function (A) {
      let n = r.inv.indexOf(A);
      return n >= 0
        ? (r.inv.splice(n, 1), !0)
        : ((n = s0().indexOf(A)), n >= 0 ? (s0().splice(n, 1), !0) : !1);
    },
    Ve = function (A) {
      const n = [];
      for (const t of U1) {
        const e = A.find((a) => a.d === t && !n.includes(a));
        if (!e) return [];
        n.push(e);
      }
      return n;
    },
    wl = function (A) {
      return !A || A.length !== 3 || new Set(A).size !== 3 || !A.every(N4)
        ? "Cần 1 nhẫn + 1 dây chuyền + 1 ngọc bội thường (chưa mặc, chưa khóa)"
        : A.map((n) => n.d)
              .sort((n, t) => n - t)
              .join() !== "3,4,9"
          ? "Cần đúng 1 nhẫn + 1 dây chuyền + 1 ngọc bội"
          : "";
    },
    hs = function (A) {
      if (!w0()) return { ok: !1, msg: "Chưa mở" };
      const n = wl(A);
      if (n) return { ok: !1, msg: n };
      if (r.gold < XA()) return { ok: !1, msg: "Không đủ ngân lượng" };
      const t = Mn(
        A.reduce((a, i) => a + Il(i), 0),
        cA.slice(1),
      );
      r.gold -= XA();
      for (const a of A) l1(a);
      if (t.sel < 0)
        return {
          ok: !1,
          lost: !0,
          msg: "Luyện Huyền Tinh thất bại, mất nguyên liệu",
        };
      const e = t.sel + 1;
      return (
        V("ht", e),
        { ok: !0, lvl: e, msg: `Hợp thành Huyền Tinh Khoáng Thạch cấp ${e}` }
      );
    },
    pl = function (A) {
      return A >= DA
        ? { ok: !1, msg: "Đã tối đa" }
        : N("ht", A) < 3
          ? { ok: !1, msg: "Cần 3 viên cùng cấp" }
          : r.gold < lA.up
            ? { ok: !1, msg: "Không đủ ngân lượng" }
            : ((r.gold -= lA.up),
              Ct() < Nt(A)
                ? (V("ht", A, -3),
                  V("ht", A + 1),
                  {
                    ok: !0,
                    lvl: A + 1,
                    msg: `Thăng cấp thành công: Huyền Tinh cấp ${A + 1}`,
                  })
                : (V("ht", A, -1),
                  {
                    ok: !1,
                    lost: !0,
                    msg: `Thăng cấp thất bại (${et(Nt(A))} thành công), mất 1 viên Huyền Tinh`,
                  }));
    },
    qu = function (A) {
      const n = BA(A);
      return n.lvl >= Ue
        ? { ok: !1, msg: "Đã tối đa" }
        : N("ore", A) < 3
          ? { ok: !1, msg: "Cần 3 viên cùng loại, cùng cấp" }
          : r.gold < lA.up
            ? { ok: !1, msg: "Không đủ ngân lượng" }
            : ((r.gold -= lA.up),
              Ct() < Nt(n.lvl)
                ? (V("ore", A, -3),
                  V("ore", Je(n.place, n.a, n.lvl + 1, n.s)),
                  { ok: !0, msg: `${nt(A)} lên cấp ${n.lvl + 1}` })
                : (V("ore", A, -1),
                  {
                    ok: !1,
                    lost: !0,
                    msg: `Thăng cấp ${nt(A)} thất bại (${et(Nt(n.lvl))}), mất 1 viên`,
                  }));
    },
    Dl = function (A, n, t, e) {
      const a = (A.mag || [])[n];
      if (!a) return { err: "Dòng không tồn tại" };
      if (!L4(A, n)) return { err: "Dòng này không lấy được thành đá" };
      const i = ps(a),
        o = z0[i].base + (cA[t] || 0),
        l = o + ml(o, Ol(e));
      return Object.assign({ j: i, src: l }, Mn(l, cA.slice(1), 2));
    },
    Pl = function (A, n, t, e, a) {
      if (!Sl(A))
        return {
          ok: !1,
          msg: "Chỉ lấy được đồ thường có dòng (chưa khóa, không phải đồ bộ / Tím / đang mặc)",
        };
      if (!Nl(A, n).includes(t))
        return { ok: !1, msg: "Chỉ lấy được đúng vị trí dòng trên trang bị" };
      const i = A.mag[n];
      if (!i) return { ok: !1, msg: "Dòng không tồn tại" };
      if (
        ((e =
          e ||
          Object.keys(T0().ht)
            .map(Number)
            .filter((g) => N("ht", g) > 0)
            .sort((g, f) => g - f)[0]),
        !e || N("ht", e) < 1)
      )
        return { ok: !1, msg: "Cần 1 Huyền Tinh Khoáng Thạch" };
      if (r.gold < ks(A)) return { ok: !1, msg: "Không đủ ngân lượng" };
      a = a || fs();
      const o = Dl(A, n, e, a);
      if (o.err) return { ok: !1, msg: o.err };
      const l = Mn(o.src, cA.slice(1));
      if (((r.gold -= ks(A)), V("ht", e, -1), ul(a), l1(A), l.sel < 0))
        return { ok: !1, lost: !0, msg: `Lấy thuộc tính thất bại: ${A.n} mất` };
      const d = l.sel + 1,
        h = Je(t, i.a, d, t % 2 ? A.s : -1);
      return (
        V("ore", h),
        {
          ok: !0,
          lvl: d,
          msg: `Lấy thuộc tính: ${(Lt(i.a)[0] || {}).n || W0(i.a)} → ${nt(h)} cấp ${d}`,
        }
      );
    },
    ju = function (A) {
      const n = Mn(cA[C(A, 1, DA)], us.slice(1, q4 + 1));
      return n.sel < 0 ? 1 : n.sel + 1;
    },
    vl = function (A, n) {
      if (!ww(A))
        return {
          ok: !1,
          msg: "Chỉ chế tạo từ trang bị trắng / xanh (không phải trang sức, chưa khóa, không phải đồ bộ / Tím)",
        };
      if (!n || N("ht", n) < 1)
        return { ok: !1, msg: "Cần 1 Huyền Tinh Khoáng Thạch" };
      if (r.gold < lA.phoi)
        return { ok: !1, msg: "Không đủ ngân lượng (10.000)" };
      const t = Mn(cA[n], us.slice(1, q4 + 1));
      if (((r.gold -= lA.phoi), V("ht", n, -1), t.sel < 0))
        return (
          l1(A),
          (c.dirty = !0),
          {
            ok: !1,
            lost: !0,
            msg: `Chế tạo thất bại (Huyền Tinh cấp ${n} không đủ giá trị): mất ${A.n} và Huyền Tinh`,
          }
        );
      const e = t.sel + 1;
      return (
        (A.mag = []),
        (A.vio = 1),
        (A.r = 3),
        (A.vslots = e),
        delete A.leg,
        (c.dirty = !0),
        {
          ok: !0,
          n: e,
          msg: `Chế tạo phôi Huyền Tinh: ${A.n} · ${e} dòng trống`,
        }
      );
    },
    $4 = function (A, n, t) {
      if (!at(A)) return "Món không còn trong hành trang";
      if (!A || A.set || !(A.d >= 0 && A.d <= 9))
        return "Món này không khảm được";
      if (!A.vio)
        return "Phải chế tạo phôi Huyền Tinh (trang bị Tím trống) trước";
      const e = BA(t),
        a = (A.mag || []).length;
      return a >= B1(A)
        ? `Đã đủ ${B1(A)} dòng`
        : e.place !== a
          ? `Đá này ứng dòng ${e.place + 1}, món đang cần dòng ${a + 1}`
          : N("ht", n) < 1
            ? "Không có Huyền Tinh cấp này"
            : N("ore", t) < 1
              ? "Không có đá này"
              : ws(e.a)
                ? e.place % 2 && e.s >= 0 && e.s !== A.s
                  ? `Đá hệ ${d0[e.s]}, món hệ ${d0[A.s]} (dòng ẩn phải đúng hệ)`
                  : da(e.a, A.d, A.k)
                    ? It(e.a, A.s)
                      ? (A.mag || []).some((i) => i.a === e.a)
                        ? `Món đã có dòng ${(Lt(e.a)[0] || {}).n || W0(e.a)}`
                        : r.gold < lA.kham
                          ? "Không đủ ngân lượng (10.000)"
                          : ""
                      : `Thuộc tính này không hợp hệ ${d0[A.s] || "—"}`
                    : "Thuộc tính này không gắn được vào loại trang bị này"
                : "Đá không hợp lệ";
    },
    T4 = function (A, n, t, e) {
      const a = BA(t),
        i = ws(a.a),
        o = Cl(A),
        l = Math.max(0, B1(A) - o.length),
        d = H4(A, o, l),
        h = [],
        g = [];
      for (let v = i[0]; v <= i[1]; v++)
        (h.push(v), g.push(H4(A, o.concat([v]), l - 1)));
      const f = g.some((v) => d < v) ? g.concat([d]) : g.slice(),
        m = cA[n] + cA[C(a.lvl, 1, Ue)],
        w = d + m + ml(m, Ol(e)),
        p = Mn(w, f, 2),
        P = p.probs.slice(0, h.length);
      return {
        js: h,
        vals: f,
        probs: P,
        fail: Math.max(0, 1 - P.reduce((v, H) => v + H, 0)),
        src: w,
        eqVal: d,
      };
    },
    zu = function (A, n, t) {
      return $4(A, n, t) || T4(A, n, t, null);
    },
    C4 = function (A, n, t, e) {
      const a = $4(A, n, t);
      if (a) return { ok: !1, msg: a };
      e = e || fs();
      const i = T4(A, n, t, e),
        o = Mn(i.src, i.vals),
        l = BA(t);
      if (
        (V("ht", n, -1),
        V("ore", t, -1),
        ul(e),
        (r.gold -= lA.kham),
        o.sel < 0 || o.sel >= i.js.length)
      )
        return {
          ok: !1,
          lost: !0,
          msg: `Khảm thất bại (${et(1 - i.fail)} thành công): mất Huyền Tinh và ${nt(t)}${El(e) ? ", phụ liệu" : ""}`,
        };
      const d = i.js[o.sel],
        h = A.mag.length,
        g = (Lt(l.a)[0] || {}).n || W0(l.a);
      return (
        A.mag.push({
          a: l.a,
          p: pw(d),
          n: g,
          pre: h % 2 === 0 ? 1 : 0,
          vlv: l.lvl,
          vs: l.s,
          ml: d,
        }),
        (A.vio = 1),
        (A.r = 3),
        typeof IA == "function" &&
          r.autoEquip &&
          r.inv.includes(A) &&
          IA(A) &&
          $1(A, !0),
        { ok: !0, msg: `Khảm dòng ${h + 1}: ${g} cấp ${z0[d].lvl}` }
      );
    },
    Qu = function (A, n, t, e) {
      const a = $4(A, n, t);
      if (a) return { err: a };
      const i = T4(A, n, t, e === void 0 ? fs() : e);
      let o = -1;
      i.probs.forEach((f, m) => {
        (o < 0 || f > i.probs[o]) && (o = m);
      });
      const l = i.js[o],
        d = A.mag.length,
        h = z0[l],
        g = A.mag.concat([
          {
            a: h.id,
            p: h.p.map(([f, m]) =>
              f === -1 && m === -1 ? -1 : Math.round((f + m) / 2),
            ),
            pre: d % 2 === 0 ? 1 : 0,
          },
        ]);
      return Object.assign(i, {
        ht: n,
        key: t,
        best: o,
        txt: Dw(l),
        gain: typeof mr == "function" ? mr(A, g) : 0,
      });
    },
    O4 = function (A, n) {
      if (!ql(A)) return [];
      const t = A.mag.length,
        e = Object.keys(T0().ht)
          .map(Number)
          .filter((o) => N("ht", o) > 0)
          .sort((o, l) => l - o),
        a = [],
        i = n && N("ht", n) > 0 ? n : e[0];
      if (!i) return [];
      for (const o of Object.keys(T0().ore)) {
        if (BA(o).place !== t) continue;
        const l = Qu(A, i, o);
        l.err || a.push(l);
      }
      return a.sort((o, l) => l.gain - o.gain || o.fail - l.fail);
    },
    Gu = function (A) {
      let n = 0,
        t = 0;
      for (; ql(A);) {
        const e = O4(A)[0];
        if (!e) break;
        const a = C4(A, e.ht, e.key, { wc: 0, mys: 0, fd: 0 });
        if (a.ok) n++;
        else if (a.lost) t++;
        else break;
      }
      return {
        ok: n > 0,
        msg:
          n || t
            ? `Khảm ${n} dòng${t ? `, ${t} lần thất bại` : ""} · ${(A.mag || []).length}/${B1(A)} dòng`
            : "Không đủ Huyền Tinh / đá hợp dòng kế tiếp",
      };
    },
    Ku = function () {
      return { ok: !1, msg: "Lò Rèn không còn tách dòng đồ Tím" };
    },
    Ru = function (A) {
      if (!jl(A))
        return {
          ok: !1,
          msg:
            A && A.lock
              ? "Món đã khóa: mở khóa trước khi bán"
              : "Chỉ bán được phôi Tím chưa khảm (không đang mặc)",
        };
      const n = y0(A);
      return (
        l1(A),
        (r.gold += n),
        (c.dirty = !0),
        (Y = !0),
        { ok: !0, sold: !0, msg: `Bán ${A.n}: +${j(n)} lượng` }
      );
    },
    Yu = function (A, n = !0) {
      if (!A || !A.vio || !(A.mag || []).length) return 0;
      const t = new Set();
      let e = -1;
      for (let i = 0; i < A.mag.length; i++) {
        if (t.has(A.mag[i].a)) {
          e = i;
          break;
        }
        t.add(A.mag[i].a);
      }
      if (e < 0) return 0;
      const a = A.mag.splice(e);
      return (
        n &&
          a.forEach((i, o) => {
            const l = e + o;
            V(
              "ore",
              Je(l, i.a, i.vlv || 1, i.vs != null ? i.vs : l % 2 ? A.s : -1),
            );
          }),
        A.vslots || (A.vslots = x1),
        a.length
      );
    },
    Fu = function (A) {
      const n = [];
      if (!w0()) return null;
      if (Math.random() < _s("ore", A)) {
        const t = typeof $2 == "function" && Ct() < 0.7 ? $2()[0] : null,
          e = t ? t.mag.length : Ot(0, x1 - 1),
          a = Object.values(r.eq).filter((f) => f && f.d <= 9),
          i = t || (a.length ? _0(a) : null),
          o = new Set(t ? t.mag.map((f) => f.a) : []),
          l = i
            ? S.affixLevel
                .filter(
                  (f) =>
                    f.lvl === 1 &&
                    f.pre === (e % 2 === 0 ? 1 : 0) &&
                    It(f.a, i.s) &&
                    da(f.a, i.d, i.k) &&
                    !o.has(f.a),
                )
                .map((f) => f.a)
            : [],
          d = C(Math.floor(A.L / 12) + Ot(0, 1), 1, Ue),
          h =
            t && l.length
              ? Vu(t, e, [...new Set(l)], d)
              : l.length
                ? _0([...new Set(l)])
                : _0(zl(e)),
          g = Je(e, h, d, e % 2 ? (i ? i.s : Ot(0, 4)) : -1);
        (V("ore", g), n.push(`${nt(g)} cấp ${d}`));
      }
      if (Math.random() < _s("ht", A)) {
        const t = C(Math.floor(A.L / 15) + 1, 1, DA);
        (V("ht", t), n.push(`Huyền Tinh Khoáng Thạch cấp ${t}`));
      }
      if (Math.random() < (Pw[A.cls] || 0) * ra())
        if (
          r.inv.concat(s0()).filter((t) => t.vio && !(t.mag || []).length)
            .length >= 4
        ) {
          const t = C(Math.floor(A.L / 15) + 1, 1, DA);
          (V("ht", t), n.push(`Huyền Tinh Khoáng Thạch cấp ${t}`));
        } else {
          const t = Xu(A.L);
          t &&
            ((s0().length < (typeof A1 == "number" ? A1 : 120) ||
            r.inv.length >= INV_MAX
              ? s0()
              : r.inv
            ).push(t),
            (Y = !0),
            n.push(`Phôi Tím ${t.n} (${t.vslots} dòng)`));
        }
      return n.length ? n.join(", ") : null;
    },
    Vu = function (A, n, t, e) {
      const a = Object.keys(T0().ht).map(Number),
        i = a.length ? Math.max(...a) : e,
        o = LA(A),
        l = Object.assign({}, r.eq, { [o]: A });
      let d = _0(t),
        h = -1;
      const g = Mt;
      Mt = A;
      try {
        for (const f of t.sort(() => Ct() - 0.5).slice(0, 12)) {
          const m = Lt(f);
          if (!m.length) continue;
          const w = m[C(Math.floor((i + e) / 2), 1, m.length) - 1];
          if (!It(w.a, A.s) || !da(w.a, A.d, A.k)) continue;
          A.mag.push({
            a: w.a,
            p: w.p.map(([P, v]) => (P === -1 && v === -1 ? -1 : (P + v) / 2)),
            pre: n % 2 === 0 ? 1 : 0,
          });
          const p = N0(I0(l));
          (A.mag.pop(), p > h && ((h = p), (d = f)));
        }
      } finally {
        Mt = g;
      }
      return d;
    },
    Xu = function (A) {
      const n = C(Math.round(A / 12), 1, 10),
        t = I[r.fac];
      let e = null;
      for (let a = 0; a < 6 && (!e || !f0(e)); a++) {
        if (((e = null), t && !t.novice && Ct() < 0.25)) {
          const i = Oo();
          e = pA(i[0], i[1], n, 0);
        }
        if (!e) {
          const i = Bs[Ot(2, Bs.length - 1)];
          e = pA(i, Qe(i, 0), n, 0);
        }
      }
      return e
        ? ((e.mag = []),
          (e.vio = 1),
          (e.r = 3),
          (e.vslots = ju(C(Math.floor(A / 25) + 1, 1, 6))),
          delete e.leg,
          (c.dirty = !0),
          e)
        : null;
    },
    Uu = function (A, n) {
      const t =
        typeof c < "u" && c.tower ? Math.min(2, 1 + c.tower.floor / 40) : 1;
      if (!n && Math.random() >= _s("shard", A) * Fe("shard") * t) return null;
      const e = Math.max(r.lvl, A.L) + 10,
        a = I[r.fac] ? I[r.fac].id : -1;
      let i = [...ha.values()].filter(
        (h) =>
          OA(h, 36) <= e && i1(h.req) && tA(h) && os(h, Math.max(r.lvl, A.L)),
      );
      const o = i,
        l = [];
      if (i.some((h) => OA(h, 39) >= 0) && Math.random() >= Iu) {
        const h = o.filter((g) => OA(g, 39) < 0);
        h.length && (i = h);
      }
      if (!i.length) return null;
      const d = _0(
        l.length && i === l
          ? l.sort((h, g) => N("shard", g.n) - N("shard", h.n)).slice(0, 2)
          : i,
      );
      return (V("shard", d.n), `Mảnh ${d.n} (${N("shard", d.n)}/${_A[d.n]})`);
    },
    Ju = function (A, n) {
      return {
        uid: r.uid++,
        n: `Gói Mảnh ${A} ×${n}`,
        d: 99,
        k: 0,
        lvl: 1,
        s: -1,
        r: 2,
        ic: vw,
        price: 0,
        base: [],
        req: [],
        mag: [],
        ext: [],
        pack: { k: "shard", n: A, c: n },
      };
    },
    Wu = function (A, n) {
      const t = N("shard", A);
      return (
        (n = Math.min(t, Math.floor(n || t))),
        n < 1
          ? { ok: !1, msg: "Không có mảnh" }
          : r.inv.length >= INV_MAX
            ? { ok: !1, msg: "Hành trang đầy" }
            : (V("shard", A, -n),
              r.inv.push(Ju(A, n)),
              (Y = !0),
              B(),
              {
                ok: !0,
                msg: `Đóng gói ${n} Mảnh ${A} vào hành trang (gửi thư / bày bán Chợ được)`,
              })
      );
    },
    Zu = function (A) {
      if (!A || !A.pack || !r.inv.includes(A))
        return { ok: !1, msg: "Không tìm thấy gói" };
      const n = A.pack,
        t = Math.max(0, Math.min(999, n.c | 0));
      return n.k !== "shard" || !_A[n.n] || !t
        ? { ok: !1, msg: "Gói không hợp lệ" }
        : (r.inv.splice(r.inv.indexOf(A), 1),
          V("shard", n.n, t),
          (Y = !0),
          B(),
          {
            ok: !0,
            msg: `Mở gói: +${t} Mảnh ${n.n} (${N("shard", n.n)}/${_A[n.n]})`,
          });
    },
    bl = function (A) {
      const n = A.pack || {};
      J(
        `<h3>${D(A.n)}</h3><p class="desc">Gói ${n.c} <b>Mảnh ${D(n.n)}</b> (ghép ${_A[n.n] || "?"} mảnh = 1 món). Gửi thư hoặc bày bán ở Chợ như đồ thường; mở gói để nhận lại mảnh.</p>
    <p class="small">Đang có: ${N("shard", n.n)} mảnh này</p>
    <div class="btnrow"><button class="btn" id="pkOpen">Mở gói</button><button class="btn" id="pkClose">Đóng</button></div>`,
        () => {
          ((u("#pkOpen").onclick = () => {
            const t = Zu(A);
            (y(t.msg),
              t.ok && M("📦 " + D(t.msg)),
              t0(!0),
              typeof F == "function" && F());
          }),
            (u("#pkClose").onclick = () => t0(!0)));
        },
      );
    },
    yl = function (A) {
      const n = _A[A],
        t = ha.get(A);
      if (!n || !t || !tA(t)) return { ok: !1, msg: "Mảnh không hợp lệ" };
      if (N("shard", A) < n) return { ok: !1, msg: `Cần ${n} mảnh` };
      if (r.inv.length >= INV_MAX) return { ok: !1, msg: "Hành trang đầy" };
      V("shard", A, -n);
      const e = Ye("gold", t, 0);
      return (r.inv.push(e), { ok: !0, item: e, msg: `Ghép thành ${e.n}` });
    },
    gs = function (A) {
      const n = _1.get(A) || [],
        t = (a) => (a.n.match(/^\[([^\]]*)\]/) || [])[1] || "",
        e = n.filter(
          (a) =>
            /^[\p{L}\p{N}\s\[\]'·-]+$/u.test(a.n) &&
            !/[一-鿿]/.test(a.n) &&
            !/Hạn Thời/i.test(a.n),
        );
      for (const a of xw) {
        const i = e.find((o) => t(o) === a);
        if (i) return i;
      }
      return e[0] || n[0] || null;
    },
    Aw = function (A, n, t, e) {
      const a = S.ge[A];
      if (!a) return null;
      const i = S.ge[n],
        o = i && i.a === a.a ? i : a;
      return {
        a: a.a,
        pre: 1,
        p: a.p.map(([l, d], h) => {
          if (l === -1 && d === -1) return -1;
          const [g, f] = o.p[h],
            m = l + (g - l) * t,
            w = d + (f - d) * t;
          return Math.round(m + (w - m) * e);
        }),
      };
    },
    kl = function (A, n, t) {
      const e = S.ge[A.mag[n]],
        a = S.ge[A.mag10[n]];
      if (!e) return null;
      const i = Math.min(1, (t || 0) / ga),
        o = a && a.a === e.a ? a.p[0] : e.p[0];
      return [
        Math.round(e.p[0][0] + (o[0] - e.p[0][0]) * i),
        Math.round(e.p[0][1] + (o[1] - e.p[0][1]) * i),
      ];
    },
    la = function (A) {
      const n = Gl(A);
      if (!n) return;
      const t = Math.min(1, (A.plv || 0) / ga);
      ((!A.mf || A.mf.length !== n.mag.length) &&
        (A.mf = n.mag.map(() => Math.random())),
        (A.mag = n.mag
          .map((e, a) => Aw(e, n.mag10[a], t, A.mf[a]))
          .filter(Boolean)),
        (A.ext = (A.ps || [])
          .filter((e) => e != null)
          .map((e) => rs(e, 10))
          .filter(Boolean)));
    },
    ms = function (A) {
      const n = Gl(A),
        t = A.plv || 0;
      !n ||
        t < 5 ||
        t > 9 ||
        ((A.ps = A.ps || [null, null]),
        n.rate.forEach((e, a) => {
          const i = e && e[t - 5];
          if (!i) return;
          let o = Math.random() * 100;
          A.ps[a] = null;
          for (const [l, d] of i) {
            if (o < l) {
              A.ps[a] = d;
              break;
            }
            o -= l;
          }
        }));
    },
    ca = function (A) {
      if (!A || !A.set || A.set.kind !== "platina" || A.pv3) return;
      const n = [..._1.keys()].find(
        (e) =>
          k1(A.n) === e || k1(A.n) === k1(((S.platVng || {})[e] || {}).n || ""),
      );
      if (!n) return;
      const t = _1.get(n)[0];
      if (!(!t || t.vng !== 2)) {
        if (
          ((A.n = t.n),
          (A.base = t.base.map((e) => e.slice())),
          (A.req = t.req.map((e) => e.slice())),
          (A.s = t.s),
          (A.mf = null),
          (A.ps = null),
          (A.plv || 0) >= 5)
        ) {
          const e = A.plv;
          ((A.plv = Math.min(9, e)), ms(A), (A.plv = e));
        }
        ((A.pv3 = 1), la(A));
      }
    },
    Ek = function (A) {
      const n = r.inv.filter((t) => t !== A && t.n === A.n && kw(t));
      return n.length ? n.sort((t, e) => L0(t) - L0(e))[0] : null;
    },
    Xe = function (A) {
      return cs()
        ? qt(A)
          ? (A.enh || 0) < ma
            ? `Cần cường hóa +${ma} (đang +${A.enh || 0})`
            : N("misc", "mys") < A2
              ? `Thiếu Thần Bí Khoáng Thạch (cần ${A2})`
              : N("ht", jt) < 1
                ? `Thiếu Huyền Tinh cấp ${jt}`
                : r.gold < c1
                  ? `Cần ${j(c1)} lượng`
                  : ""
          : "Không phải Hoàng Kim chế được Bạch Kim"
        : "Chưa mở";
    },
    xl = function (A) {
      const n = Xe(A);
      if (n) return { ok: !1, msg: n };
      ((r.gold -= c1), V("misc", "mys", -A2), V("ht", jt, -1));
      const t = Ye("platina", gs(A.n), 10);
      ((t.plv = 0),
        (t.pv2 = 1),
        (t.pv3 = 1),
        (t.enh = 0),
        A.lock && (t.lock = !0),
        la(t));
      const e = X2(A, r.eq);
      return (
        e ? (r.eq[e] = t) : r.inv.splice(r.inv.indexOf(A), 1, t),
        typeof vi == "function" && vi(t),
        {
          ok: !0,
          item: t,
          msg: `Chế thành ${t.n}${e ? " (đã mặc)" : ""}${typeof f0 == "function" && !f0(t) ? ` · cần cấp ${Ms} mới có tác dụng` : ""}`,
        }
      );
    },
    nw = function (A, n) {
      if (!at(A) || !A.set || A.set.kind !== "platina")
        return { ok: !1, msg: "Chỉ thăng cấp đồ Bạch Kim đang có" };
      const t = A.plv || 0;
      if (t >= ga) return { ok: !1, msg: "Đã tối đa +10" };
      if (((n = n == null ? Math.min(j4(A), N("misc", "mys")) : n | 0), n <= 0))
        return { ok: !1, msg: "Chưa bỏ Thần Bí Khoáng Thạch" };
      if (n > N("misc", "mys"))
        return { ok: !1, msg: "Không đủ Thần Bí Khoáng Thạch" };
      if (r.gold < c1) return { ok: !1, msg: `Cần ${j(c1)} lượng` };
      const e = Kl(A, n);
      if (((r.gold -= c1), V("misc", "mys", -n), Math.random() >= e))
        return {
          ok: !1,
          lost: !0,
          msg: `Thăng cấp thất bại (tỉ lệ ${Math.round(e * 100)}%): mất ${n} Thần Bí Khoáng Thạch + ${j(c1)} lượng, giữ +${t}`,
        };
      ((A.plv = t + 1), A.pv3 || ca(A));
      const a = (A.ps || []).filter((o) => o != null).length;
      (ms(A), la(A));
      const i = (A.ps || []).filter((o) => o != null).length;
      return {
        ok: !0,
        msg: `Thăng cấp thành công: ${A.n} +${A.plv}${A.plv >= 5 && A.plv <= 9 ? ` · dòng Bạch Kim: ${i ? A.ext.map((o) => (typeof W3 == "function" ? W3(o).replace(/<[^>]+>/g, "") : "")).join(", ") : "chưa mở"}` : ""}${!a && i ? " (mở dòng mới!)" : ""}`,
      };
    },
    Bl = function () {
      const A = Math.random(),
        n = A < 0.1 ? 5 : A < 0.4 ? 2 : 1;
      return (V("misc", "mys", n), n);
    },
    tw = function (A) {
      if (!cs() || (A.L < 60 && A.cls !== "boss")) return null;
      const n = [];
      if (
        (Math.random() < _s("wc", A) &&
          (V("misc", "wc", 1), n.push("1 Thủy Tinh Trắng")),
        A.goldBoss)
      ) {
        const t = Math.random(),
          e = t < 0.15 ? 3 : t < 0.5 ? 2 : 1;
        (V("misc", "mys", e), n.push(`${e} Thần Bí Khoáng Thạch`));
      }
      return n.length ? n.join(", ") : null;
    },
    _l = window.RCP.recipes,
    x1 = 6,
    DA = 10,
    Ue = 10,
    Ct = Math.random,
    Ot = (s, A) => s + Math.floor(Ct() * (A - s + 1)),
    T0 = () => {
      const s = r.mats || (r.mats = {});
      for (const A of ["ht", "ore", "shard", "misc"]) s[A] = s[A] || {};
      return s;
    },
    Je = (s, A, n, t = -1) =>
      `${s}:${A}:${n}` + (t >= 0 && s % 2 ? `:${t}` : ""),
    BA = (s) => {
      const [A, n, t, e] = s.split(":").map(Number);
      return { place: A, a: n, lvl: t, s: Number.isFinite(e) ? e : -1 };
    },
    Et = [
      "Huyền Thiết Khoáng",
      "Khổng Tước Thạch",
      "Mật Ngân Khoáng",
      "Phù Dung Thạch",
      "Chu Sa Khoáng",
      "Chung Nhũ Thạch",
    ],
    nt = (s) => {
      const A = BA(s);
      return Et[A.place] + (A.s >= 0 ? ` (${d0[A.s]})` : "");
    },
    lA = { fuse: 1e3, up: 5e3, hut: 5e3, phoi: 1e4, kham: 1e4 },
    B1 = (s) => (s && s.vslots) || x1,
    N = (s, A) => T0()[s][A] || 0,
    cA = [
      0, 1e4, 5e4, 225e3, 9e5, 33e5, 11314e3, 3677e4, 12607e4, 46225e4, 1849e6,
    ],
    E4 = [5e4, 1e5, 12e4, 15e4, 18e4, 24e4, 5e5],
    us = [0, 5e4, 2e5, 3e5, 5e5, 1e6, 3e6],
    ew = [
      [70, 120],
      [71, 120],
      [72, 120],
      [73, 118],
      [74, 115],
      [75, 112],
      [77, 109],
      [80, 106],
      [90, 103],
      [100, 100],
    ],
    Ml = [100, 100, 100, 60, 100, 35],
    Hl = (() => {
      const s = {};
      return (
        "5:0:85 5:1:100 5:2:45 5:3:50 6:0:85 6:1:100 7:0:75 7:1:45 7:2:90 7:3:100 7:4:90 7:5:80 7:6:55 7:7:40 7:8:35 7:9:45 7:10:40 7:11:35 7:12:50 7:13:40 8:0:60 8:1:100 2:0:65 2:1:40 2:2:85 2:3:95 2:4:100 2:5:55 2:6:50 2:7:35 2:8:25 2:9:50 2:10:35 2:11:50 2:12:30 2:13:25 2:14:65 2:15:40 2:16:85 2:17:95 2:18:100 2:19:55 2:20:50 2:21:35 2:22:25 2:23:50 2:24:35 2:25:50 2:26:30 2:27:25"
          .split(" ")
          .forEach((A) => {
            const [n, t, e] = A.split(":").map(Number);
            s[n + ":" + t] = e;
          }),
        s
      );
    })(),
    We = { wc: 5e7, mys: 1e8, fd: 6e5 },
    $l = [
      126, 166, 115, 58, 43, 150, 111, 117, 113, 112, 139, 114, 136, 137, 85,
      89, 93, 88, 92, 96, 97, 121, 125, 123, 122, 124, 134, 104, 101, 105, 102,
      103, 99, 110, 135, 106, 98, 108, 140, 142, 141, 143, 144, 168, 169, 170,
      171, 172, 116,
    ],
    aw =
      "1,5,10,-1,-1,6,6,300,100,50,50,150,150,50,60,60,60,0,0,0,0,0,0,0,0,0,0,80,65,100,30,30|2,11,20,-1,-1,6,6,300,300,100,100,400,400,60,120,120,120,0,0,0,0,0,0,0,0,0,0,80,65,100,30,30|3,21,30,-1,-1,6,6,400,500,300,300,800,800,70,240,240,240,0,0,0,0,0,0,0,0,0,0,80,65,100,30,30|4,31,40,-1,-1,6,6,400,1000,500,500,1500,1500,80,500,500,500,0,0,0,0,0,0,0,0,0,0,80,65,100,30,30|5,41,50,-1,-1,6,6,500,3000,1000,1000,4000,4000,100,800,800,800,0,0,0,0,0,0,0,0,0,0,80,65,100,30,30|6,51,60,-1,-1,6,6,500,5000,3000,3000,6000,6000,120,1200,1200,1200,0,0,0,0,0,0,0,0,0,0,80,65,100,30,30|7,61,70,-1,-1,6,6,600,8000,5000,5000,10000,10000,200,3000,3000,3000,0,0,0,0,0,0,0,0,0,0,80,65,100,30,30|8,71,80,-1,-1,6,6,800,12000,8000,8000,16000,16000,300,5000,5000,5000,0,0,0,0,0,0,0,0,0,0,80,65,100,30,30|9,81,90,-1,-1,6,6,1500,20000,15000,15000,24000,24000,600,8000,8000,8000,0,0,0,0,0,0,0,0,0,0,80,65,100,30,30|10,91,100,-1,-1,6,6,3000,40000,30000,30000,45000,45000,1000,15000,15000,15000,0,0,0,0,0,0,0,0,0,0,80,65,100,30,30|1,10,30,-1,-1,0,0,300,60,30,30,60,60,30,30,30,30,0,0,0,0,0,0,0,0,0,0,80,60,100,30,30|2,31,60,-1,-1,0,0,300,120,50,50,120,120,40,40,40,40,0,0,0,0,0,0,0,0,0,0,80,60,100,30,30|3,61,90,-1,-1,0,0,400,240,100,100,240,240,50,50,50,50,0,0,0,0,0,0,0,0,0,0,80,60,100,30,30|4,91,120,-1,-1,0,0,400,500,240,240,500,500,80,80,80,80,0,0,0,0,0,0,0,0,0,0,80,60,100,30,30|5,121,150,-1,-1,0,0,500,800,450,450,800,800,100,100,100,100,0,0,0,0,0,0,0,0,0,0,80,60,100,30,30|6,151,180,-1,-1,0,0,500,1200,800,800,1200,1200,150,150,150,150,0,0,0,0,0,0,0,0,0,0,80,60,100,30,30|7,181,210,-1,-1,0,0,600,3000,1200,1200,3000,3000,100,100,100,100,0,0,0,0,0,0,0,0,0,0,80,60,100,30,30|8,211,240,-1,-1,0,0,800,5000,2400,2400,5000,5000,300,300,300,300,0,0,0,0,0,0,0,0,0,0,80,60,100,30,30|9,241,270,-1,-1,0,0,1500,8000,4500,4500,8000,8000,500,500,500,500,0,0,0,0,0,0,0,0,0,0,80,60,100,30,30|10,271,300,-1,-1,0,0,3000,15000,8000,8000,15000,15000,1000,1000,1000,1000,0,0,0,0,0,0,0,0,0,0,80,60,100,30,30|1,10,10,-1,-1,0,0,1000,1000,1000,1000,1000,200,200,500,500,500,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40|2,10,10,-1,-1,0,0,1000,1000,1000,1000,1000,200,200,500,500,500,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40|3,10,10,-1,-1,0,0,1000,1000,1000,1000,1000,200,200,500,500,500,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40|4,20,20,-1,-1,0,0,3000,30000,20000,20000,2000,500,500,1000,1000,1000,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40|5,20,20,-1,-1,0,0,3000,30000,20000,20000,2000,500,500,1000,1000,1000,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40|6,20,20,-1,-1,0,0,3000,30000,20000,20000,2000,500,500,1000,1000,1000,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40|7,30,30,-1,-1,0,0,8000,50000,35000,40000,40000,1000,1000,12000,12000,50000,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40|8,30,30,-1,-1,0,0,8000,50000,35000,40000,40000,1000,1000,12000,12000,50000,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40|9,30,30,-1,-1,0,0,8000,50000,35000,40000,40000,1000,1000,12000,12000,50000,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40|10,30,30,-1,-1,0,0,8000,50000,35000,40000,40000,1000,1000,12000,12000,50000,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40|1,1,1,-1,-1,0,0,20000,10000,10000,10000,10000,100000,10000,10000,10000,10000,0,0,0,0,0,0,0,0,0,0,50,40,100,30,30|2,1,1,-1,-1,0,0,20000,10000,10000,10000,10000,100000,10000,10000,10000,10000,0,0,0,0,0,0,0,0,0,0,50,40,100,30,30|3,1,1,-1,-1,0,0,20000,10000,10000,10000,10000,100000,10000,10000,10000,10000,0,0,0,0,0,0,0,0,0,0,50,40,100,30,30|4,1,1,-1,-1,0,0,20000,10000,10000,10000,10000,100000,10000,10000,10000,10000,0,0,0,0,0,0,0,0,0,0,50,40,100,30,30|5,1,1,-1,-1,0,0,20000,10000,10000,10000,10000,100000,10000,10000,10000,10000,0,0,0,0,0,0,0,0,0,0,50,40,100,30,30|6,1,1,-1,-1,0,0,20000,10000,10000,10000,10000,100000,10000,10000,10000,10000,0,0,0,0,0,0,0,0,0,0,50,40,100,30,30|7,1,1,-1,-1,0,0,20000,10000,10000,10000,10000,100000,10000,10000,10000,10000,0,0,0,0,0,0,0,0,0,0,50,40,100,30,30|8,1,1,-1,-1,0,0,20000,10000,10000,10000,10000,100000,10000,10000,10000,10000,0,0,0,0,0,0,0,0,0,0,50,40,100,30,30|9,1,1,-1,-1,0,0,20000,10000,10000,10000,10000,100000,10000,10000,10000,10000,0,0,0,0,0,0,0,0,0,0,50,40,100,30,30|10,1,1,-1,-1,0,0,20000,10000,10000,10000,10000,100000,10000,10000,10000,10000,0,0,0,0,0,0,0,0,0,0,50,40,100,30,30|1,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|2,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|3,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|4,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|5,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|6,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|7,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|8,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|9,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|10,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|1,20,30,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|2,30,40,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|3,40,50,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|4,50,60,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|5,60,70,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|6,70,85,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|7,85,110,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|8,110,150,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|9,150,200,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|10,200,250,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|1,10,15,-1,-1,0,0,200,0,0,0,0,0,0,0,0,0,0,0,0,0,50,0,0,0,0,0,60,50,100,60,70|2,16,18,-1,-1,0,0,300,0,0,0,0,0,0,0,0,0,0,0,0,0,150,0,0,0,0,0,60,50,100,60,70|3,19,21,-1,-1,0,0,500,0,0,0,0,0,0,0,0,0,0,0,0,0,450,0,0,0,0,0,60,50,100,60,70|4,22,24,-1,-1,0,0,1000,0,0,0,0,0,0,0,0,0,0,0,0,0,1000,0,0,0,0,0,60,50,100,60,70|4,25,27,-1,-1,0,0,2000,0,0,0,0,0,0,0,0,0,0,0,0,0,3000,0,0,0,0,0,60,50,100,60,70|6,28,30,-1,-1,0,0,3500,0,0,0,0,0,0,0,0,0,0,0,0,0,6000,0,0,0,0,0,60,50,100,60,70|5,31,33,-1,-1,0,0,5000,0,0,0,0,0,0,0,0,0,0,0,0,0,12000,0,0,0,0,0,60,50,100,60,70|8,34,36,-1,-1,0,0,8000,0,0,0,0,0,0,0,0,0,0,0,0,0,24000,0,0,0,0,0,60,50,100,60,70|9,37,39,-1,-1,0,0,12000,0,0,0,0,0,0,0,0,0,0,0,0,0,35000,0,0,0,0,0,60,50,100,60,70|10,40,40,-1,-1,0,0,18000,0,0,0,0,0,0,0,0,0,0,0,0,0,60000,0,0,0,0,0,60,100,100,90,70|1,1,2,-1,-1,0,0,3000,0,0,0,0,0,0,0,0,0,100,0,0,0,0,0,0,0,0,0,60,100,90,100,70|2,3,4,-1,-1,0,0,3000,0,0,0,0,0,0,0,0,0,300,0,0,0,0,0,0,0,0,0,60,100,90,100,70|3,5,6,-1,-1,0,0,4000,0,0,0,0,0,0,0,0,0,500,0,0,0,0,0,0,0,0,0,60,100,90,100,70|4,7,8,-1,-1,0,0,4000,0,0,0,0,0,0,0,0,0,1000,0,0,0,0,0,0,0,0,0,60,100,90,100,70|5,9,10,-1,-1,0,0,5000,0,0,0,0,0,0,0,0,0,2400,0,0,0,0,0,0,0,0,0,60,100,90,100,70|6,11,12,-1,-1,0,0,5000,0,0,0,0,0,0,0,0,0,4500,0,0,0,0,0,0,0,0,0,60,100,90,100,70|7,13,14,-1,-1,0,0,6000,0,0,0,0,0,0,0,0,0,8000,0,0,0,0,0,0,0,0,0,60,100,90,100,70|8,15,16,-1,-1,0,0,8000,0,0,0,0,0,0,0,0,0,15000,0,0,0,0,0,0,0,0,0,60,100,90,100,70|9,17,18,-1,-1,0,0,12000,0,0,0,0,0,0,0,0,0,30000,0,0,0,0,0,0,0,0,0,60,100,90,100,70|10,19,20,-1,-1,0,0,24000,0,0,0,0,0,0,0,0,0,50000,0,0,0,0,0,0,0,0,0,60,100,90,100,70|1,20,20,-1,-1,0,0,3000,0,0,0,0,0,0,0,0,0,300,0,0,0,0,0,0,0,0,0,60,100,90,100,70|2,20,20,-1,-1,0,0,3000,0,0,0,0,0,0,0,0,0,300,0,0,0,0,0,0,0,0,0,60,100,90,100,70|3,20,20,-1,-1,0,0,3000,0,0,0,0,0,0,0,0,0,300,0,0,0,0,0,0,0,0,0,60,100,90,100,70|4,30,30,-1,-1,0,0,8000,0,0,0,0,0,0,0,0,0,1000,0,0,0,0,0,0,0,0,0,60,100,90,100,70|5,30,30,-1,-1,0,0,8000,0,0,0,0,0,0,0,0,0,1000,0,0,0,0,0,0,0,0,0,60,100,90,100,70|6,30,30,-1,-1,0,0,8000,0,0,0,0,0,0,0,0,0,1000,0,0,0,0,0,0,0,0,0,60,100,90,100,70|7,40,40,-1,-1,0,0,20000,0,0,0,0,0,0,0,0,0,60000,0,0,0,0,0,0,0,0,0,60,100,90,100,70|8,40,40,-1,-1,0,0,20000,0,0,0,0,0,0,0,0,0,60000,0,0,0,0,0,0,0,0,0,60,100,90,100,70|9,40,40,-1,-1,0,0,20000,0,0,0,0,0,0,0,0,0,60000,0,0,0,0,0,0,0,0,0,60,100,90,100,70|10,40,40,-1,-1,0,0,20000,0,0,0,0,0,0,0,0,0,60000,0,0,0,0,0,0,0,0,0,60,100,90,100,70|1,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|2,2,2,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|3,3,3,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|4,4,4,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|5,5,5,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|6,6,6,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|7,6,6,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|8,6,6,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|9,6,6,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|10,6,6,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|1,1,1,-1,-1,0,0,1000000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|2,1,1,-1,-1,0,0,1000000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|3,1,1,-1,-1,0,0,1000000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|4,1,1,-1,-1,0,0,1000000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|5,1,1,-1,-1,0,0,1000000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|6,2,2,-1,-1,0,0,5000000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|7,2,2,-1,-1,0,0,5000000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|8,2,2,-1,-1,0,0,5000000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|9,2,2,-1,-1,0,0,5000000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|10,2,2,-1,-1,0,0,5000000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|1,1,3,-1,-1,0,0,2000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,90,100,40,40,50|2,4,6,-1,-1,0,0,5000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,90,100,40,40,50|3,7,9,-1,-1,0,0,20000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,90,100,40,40,50|4,10,12,-1,-1,0,0,30000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,90,100,40,40,50|5,13,14,-1,-1,0,0,50000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,90,100,40,40,50|6,15,16,-1,-1,0,0,80000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,90,100,40,40,50|7,17,17,-1,-1,0,0,150000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,90,100,40,40,50|8,18,18,-1,-1,0,0,240000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,90,100,40,40,50|9,19,19,-1,-1,0,0,300000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,90,100,40,40,50|10,20,20,-1,-1,0,0,400000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,90,100,40,40,50|1,1,1,-1,-1,0,0,3000,5000,5000,5000,12000,12000,500,5000,5000,5000,0,0,0,0,0,0,0,0,0,0,60,60,100,50,50|2,2,2,-1,-1,0,0,10000,12000,12000,12000,30000,30000,800,8000,8000,8000,0,0,0,0,0,0,0,0,0,0,60,60,100,50,50|3,3,3,-1,-1,0,0,15000,20000,20000,20000,100000,100000,1200,15000,15000,15000,0,0,0,0,0,0,0,0,0,0,60,60,100,50,50|4,4,4,-1,-1,0,0,30000,40000,40000,40000,200000,200000,1800,30000,30000,30000,0,0,0,0,0,0,0,0,0,0,60,60,100,50,50|5,5,5,-1,-1,0,0,40000,60000,60000,60000,300000,300000,2400,45000,45000,45000,0,0,0,0,0,0,0,0,0,0,60,60,100,50,50|6,6,6,-1,-1,0,0,50000,80000,80000,80000,350000,350000,3200,50000,50000,50000,0,0,0,0,0,0,0,0,0,0,60,60,100,50,50|7,7,7,-1,-1,0,0,80000,100000,100000,100000,400000,400000,4000,60000,60000,60000,0,0,0,0,0,0,0,0,0,0,60,60,100,50,50|8,8,8,-1,-1,0,0,100000,120000,120000,120000,450000,450000,5000,70000,70000,70000,0,0,0,0,0,0,0,0,0,0,60,60,100,50,50|9,9,9,-1,-1,0,0,120000,140000,140000,140000,500000,500000,6500,80000,80000,80000,0,0,0,0,0,0,0,0,0,0,60,60,100,50,50|10,10,10,-1,-1,0,0,150000,300000,300000,300000,800000,800000,9000,150000,150000,150000,0,0,0,0,0,0,0,0,0,0,60,60,100,50,50|1,1,1,-1,-1,0,0,3000,8000,8000,8000,5000,600,600,800,800,800,0,0,0,0,0,0,0,0,0,0,80,80,100,50,50|2,2,2,-1,-1,0,0,10000,18000,18000,18000,10000,1000,1000,1800,1800,1800,0,0,0,0,0,0,0,0,0,0,80,80,100,50,50|3,3,3,-1,-1,0,0,15000,40000,40000,40000,15000,1500,1500,4000,4000,4000,0,0,0,0,0,0,0,0,0,0,80,80,100,50,50|4,4,4,-1,-1,0,0,30000,90000,90000,90000,24000,2200,2200,9000,9000,9000,0,0,0,0,0,0,0,0,0,0,80,80,100,50,50|5,5,5,-1,-1,0,0,40000,150000,150000,150000,35000,2800,2800,15000,15000,15000,0,0,0,0,0,0,0,0,0,0,80,80,100,50,50|6,6,6,-1,-1,0,0,50000,180000,180000,180000,40000,3600,3600,18000,18000,18000,0,0,0,0,0,0,0,0,0,0,80,80,100,50,50|7,7,7,-1,-1,0,0,80000,200000,200000,200000,45000,4800,4800,20000,20000,20000,0,0,0,0,0,0,0,0,0,0,80,80,100,50,50|8,8,8,-1,-1,0,0,100000,220000,220000,220000,50000,6000,6000,22000,22000,22000,0,0,0,0,0,0,0,0,0,0,80,80,100,50,50|9,9,9,-1,-1,0,0,120000,240000,240000,240000,55000,8000,8000,24000,24000,24000,0,0,0,0,0,0,0,0,0,0,80,80,100,50,50|10,10,10,-1,-1,0,0,150000,500000,500000,500000,100000,12000,12000,50000,50000,50000,0,0,0,0,0,0,0,0,0,0,80,80,100,50,50|1,5,20,-1,-1,0,0,300,80,50,50,80,80,30,50,50,50,80,0,0,0,80,100,80,100,0,0,100,100,100,100,100|2,20,40,-1,-1,0,0,300,100,80,80,100,100,40,80,80,80,100,0,0,0,100,150,100,150,0,0,100,100,100,100,100|3,40,60,-1,-1,0,0,400,150,120,120,150,150,50,120,120,120,150,0,0,0,150,200,150,200,0,0,100,100,100,100,100|4,60,80,-1,-1,0,0,500,200,160,160,200,200,60,160,160,160,200,0,0,0,200,300,200,300,0,0,100,100,100,100,100|5,80,100,-1,-1,0,0,800,300,200,200,300,300,80,200,200,200,300,0,0,0,400,500,400,500,0,0,100,100,100,100,100|6,100,120,-1,-1,0,0,1200,800,600,600,800,800,120,500,500,500,800,0,0,0,1000,1200,1000,1500,0,0,100,100,100,100,100|7,120,140,-1,-1,0,0,3000,2400,1500,1500,2400,2400,300,1000,1000,1000,2000,0,0,0,2000,3000,2000,3000,0,0,100,100,100,100,100|8,140,160,-1,-1,0,0,5000,5000,3000,3000,5000,5000,500,2400,2400,2400,4500,0,0,0,4500,6000,4500,6000,0,0,100,100,100,100,100|9,160,180,-1,-1,0,0,9000,8000,6000,6000,8000,8000,1000,5000,5000,5000,7500,0,0,0,7500,10000,7500,10000,0,0,100,100,100,100,100|10,180,200,-1,-1,0,0,15000,12000,10000,10000,12000,12000,1800,10000,10000,10000,15000,0,0,0,18000,30000,18000,30000,0,0,100,100,100,100,100|1,5,20,-1,-1,0,0,300,80,80,80,80,30,30,50,50,50,80,0,0,0,80,100,80,100,0,0,100,100,100,100,100|2,20,40,-1,-1,0,0,300,100,100,100,100,40,40,80,80,80,100,0,0,0,100,150,100,150,0,0,100,100,100,100,100|3,40,60,-1,-1,0,0,400,150,150,150,150,50,50,120,120,120,150,0,0,0,150,200,150,200,0,0,100,100,100,100,100|4,60,80,-1,-1,0,0,500,200,200,200,200,60,60,160,160,160,200,0,0,0,200,300,200,300,0,0,100,100,100,100,100|5,80,100,-1,-1,0,0,800,300,300,300,300,80,80,200,200,200,300,0,0,0,300,500,300,500,0,0,100,100,100,100,100|6,100,120,-1,-1,0,0,1200,900,900,900,900,150,150,600,600,600,900,0,0,0,900,1000,900,1000,0,0,100,100,100,100,100|7,120,140,-1,-1,0,0,3000,1800,1800,1800,1800,300,300,1500,1500,1500,1800,0,0,0,1800,2400,1800,2400,0,0,100,100,100,100,100|8,140,160,-1,-1,0,0,5000,3500,3500,3500,3500,500,500,3000,3000,3000,3500,0,0,0,3500,4500,3500,4500,0,0,100,100,100,100,100|9,160,180,-1,-1,0,0,9000,6000,6000,6000,6000,1000,1000,5000,5000,5000,6000,0,0,0,6000,9000,6000,9000,0,0,100,100,100,100,100|10,180,200,-1,-1,0,0,15000,9000,9000,9000,9000,3000,3000,8000,8000,8000,9000,0,0,0,12000,15000,12000,15000,0,0,100,100,100,100,100|1,5,20,-1,-1,0,0,200,50,50,50,50,50,50,50,50,50,50,0,0,0,50,50,50,50,0,0,100,100,100,100,100|2,20,40,-1,-1,0,0,200,80,80,80,80,80,80,80,80,80,80,0,0,0,80,80,80,80,0,0,100,100,100,100,100|3,40,60,-1,-1,0,0,300,100,100,100,100,100,100,100,100,100,100,0,0,0,100,120,100,120,0,0,100,100,100,100,100|4,60,80,-1,-1,0,0,400,120,120,120,120,120,120,120,120,120,120,0,0,0,120,150,120,150,0,0,100,100,100,100,100|5,80,100,-1,-1,0,0,600,160,160,160,160,160,160,160,160,160,160,0,0,0,160,240,160,240,0,0,100,100,100,100,100|6,100,120,-1,-1,0,0,1000,300,300,300,300,300,300,300,300,300,300,0,0,0,300,450,300,450,0,0,100,100,100,100,100|7,120,140,-1,-1,0,0,2000,500,500,500,500,500,500,500,500,500,500,0,0,0,600,900,600,900,0,0,100,100,100,100,100|8,140,160,-1,-1,0,0,3500,1000,1000,1000,1000,1000,1000,1000,1000,1000,1000,0,0,0,1200,1500,1200,1500,0,0,100,100,100,100,100|9,160,180,-1,-1,0,0,7000,3000,3000,3000,3000,3000,3000,3000,3000,3000,3000,0,0,0,3000,4500,3000,4500,0,0,100,100,100,100,100|10,180,200,-1,-1,0,0,12000,8000,8000,8000,8000,8000,8000,8000,8000,8000,8000,0,0,0,10000,12000,10000,12000,0,0,100,100,100,100,100|1,1,1,-1,-1,0,0,400,0,0,0,0,0,0,0,0,0,300,0,0,0,300,400,300,400,0,0,60,100,100,80,60|2,1,1,-1,-1,0,0,400,0,0,0,0,0,0,0,0,0,300,0,0,0,300,400,300,400,0,0,60,100,100,80,60|3,2,2,-1,-1,0,0,500,0,0,0,0,0,0,0,0,0,500,0,0,0,500,650,500,650,0,0,60,100,100,80,60|4,2,2,-1,-1,0,0,500,0,0,0,0,0,0,0,0,0,500,0,0,0,500,650,500,650,0,0,60,100,100,80,60|5,3,3,-1,-1,0,0,1000,0,0,0,0,0,0,0,0,0,1000,0,0,0,1000,1200,1000,1200,0,0,60,100,100,80,60|6,3,3,-1,-1,0,0,1000,0,0,0,0,0,0,0,0,0,1000,0,0,0,1000,1200,1000,1200,0,0,60,100,100,80,60|7,4,4,-1,-1,0,0,3000,0,0,0,0,0,0,0,0,0,3000,0,0,0,3000,3500,3000,3500,0,0,60,100,100,80,60|8,4,4,-1,-1,0,0,3000,0,0,0,0,0,0,0,0,0,3000,0,0,0,3000,3500,3000,3500,0,0,60,100,100,80,60|9,5,5,-1,-1,0,0,6000,0,0,0,0,0,0,0,0,0,6000,0,0,0,6000,8000,6000,8000,0,0,60,100,100,80,60|10,6,6,-1,-1,0,0,12000,0,0,0,0,0,0,0,0,0,12000,0,0,0,12000,15000,12000,15000,0,0,60,100,100,80,60|1,1,1,-1,-1,0,0,3000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,100,100,80,80|2,1,1,-1,-1,0,0,3000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,100,100,80,80|3,2,2,-1,-1,0,0,8000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,100,100,80,80|4,2,2,-1,-1,0,0,8000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,100,100,80,80|5,2,2,-1,-1,0,0,8000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,100,100,80,80|6,3,3,-1,-1,0,0,15000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,100,100,80,80|7,3,3,-1,-1,0,0,15000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,100,100,80,80|8,4,4,-1,-1,0,0,30000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,100,100,80,80|9,4,4,-1,-1,0,0,30000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,100,100,80,80|10,4,4,-1,-1,0,0,30000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,100,100,80,80|1,1,1,-1,-1,0,0,300,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|2,1,1,-1,-1,0,0,300,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|3,2,2,-1,-1,0,0,500,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|2,3,3,-1,-1,0,0,800,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|5,4,4,-1,-1,0,0,1200,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|6,5,5,-1,-1,0,0,1800,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|7,6,6,-1,-1,0,0,3000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|8,7,7,-1,-1,0,0,5000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|9,8,8,-1,-1,0,0,8000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|10,9,9,-1,-1,0,0,15000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,100,100,100,100|1,1,2,-1,-1,0,0,300,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|2,3,4,-1,-1,0,0,300,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|3,5,6,-1,-1,0,0,500,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|4,7,8,-1,-1,0,0,800,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|5,9,10,-1,-1,0,0,1200,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|6,11,12,-1,-1,0,0,1800,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|7,13,14,-1,-1,0,0,3000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|8,15,16,-1,-1,0,0,5000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|9,17,18,-1,-1,0,0,8000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|10,19,20,-1,-1,0,0,15000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|1,1,5,-1,-1,0,0,500,100,100,100,100,100,50,100,100,150,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|2,6,10,-1,-1,0,0,1000,300,300,300,300,300,80,300,300,450,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|3,11,15,-1,-1,0,0,1500,600,600,600,600,600,100,600,600,900,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|4,16,20,-1,-1,0,0,3000,1200,1200,1200,1200,1200,120,1200,1200,1800,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|5,21,25,-1,-1,0,0,6000,3000,3000,3000,3000,3000,160,3000,3000,4500,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|6,26,30,-1,-1,0,0,8000,8000,8000,6000,6000,6000,200,6000,6000,12000,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|7,31,35,-1,-1,0,0,10000,24000,24000,12000,12000,12000,300,12000,12000,32000,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|8,36,40,-1,-1,0,0,15000,54000,54000,30000,30000,30000,500,30000,30000,64000,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|9,41,45,-1,-1,0,0,24000,120000,120000,65000,65000,65000,1500,65000,65000,150000,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|10,46,50,-1,-1,0,0,35000,240000,240000,100000,100000,100000,3000,100000,100000,300000,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|1,1,5,-1,-1,0,0,300,120,120,100,120,120,50,100,100,100,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|2,6,10,-1,-1,0,0,800,240,240,200,240,240,80,200,200,200,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|3,11,15,-1,-1,0,0,1200,500,500,450,500,500,100,450,450,450,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|4,16,20,-1,-1,0,0,2400,800,800,7500,800,800,120,7500,7500,7500,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|5,21,25,-1,-1,0,0,4500,1500,1500,1200,1500,1500,160,1200,1200,1200,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|6,26,30,-1,-1,0,0,6500,3000,3000,2400,3000,3000,200,2400,2400,2400,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|7,31,35,-1,-1,0,0,9000,6000,6000,5000,6000,6000,300,5000,5000,5000,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|8,36,40,-1,-1,0,0,12000,10000,10000,9000,10000,10000,500,8000,8000,8000,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|9,41,45,-1,-1,0,0,20000,24000,24000,18000,24000,24000,1500,15000,15000,15000,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|10,46,50,-1,-1,0,0,30000,60000,60000,50000,60000,60000,4500,30000,30000,30000,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|1,1,19,-1,-1,0,0,500,500,150,100,300,300,50,50,50,50,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|2,20,29,-1,-1,0,0,1000,1600,400,300,800,800,80,80,80,80,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|3,30,39,-1,-1,0,0,3000,3000,800,600,1500,1500,100,100,100,100,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|4,40,49,-1,-1,0,0,5000,6000,1500,1200,3000,3000,200,200,200,200,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|5,50,59,-1,-1,0,0,9000,18000,4500,3000,9000,9000,300,300,300,300,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|6,60,69,-1,-1,0,0,18000,36000,9000,5000,18000,18000,500,500,500,500,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|7,70,79,-1,-1,0,0,30000,80000,20000,18000,45000,45000,1000,1000,1000,1000,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|8,80,89,-1,-1,0,0,50000,160000,40000,24000,80000,80000,3000,3000,3000,3000,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|9,90,99,-1,-1,0,0,80000,350000,90000,80000,180000,180000,5000,5000,5000,5000,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|10,100,100,-1,-1,0,0,120000,800000,240000,180000,500000,500000,10000,10000,10000,10000,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|1,1,10,-1,-1,0,0,300,80,80,80,80,80,80,80,80,80,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|2,10,20,-1,-1,0,0,500,150,150,150,150,150,150,150,150,150,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|3,20,30,-1,-1,0,0,600,200,200,200,200,200,200,200,200,200,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|4,30,40,-1,-1,0,0,800,300,300,300,300,300,300,300,300,300,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|5,40,50,-1,-1,0,0,1000,400,400,400,400,400,400,400,400,400,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|6,50,60,-1,-1,0,0,1500,500,500,500,500,500,500,500,500,500,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|7,60,70,-1,-1,0,0,3000,600,600,600,600,600,600,600,600,600,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|8,70,80,-1,-1,0,0,5000,800,800,800,800,800,800,800,800,800,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|9,80,90,-1,-1,0,0,8000,2000,2000,2000,2000,2000,2000,2000,2000,2000,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|10,90,100,-1,-1,0,0,15000,5000,5000,5000,5000,5000,5000,5000,5000,5000,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|1,1,10,-1,-1,0,0,300,80,80,80,80,80,80,80,80,80,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|2,10,20,-1,-1,0,0,500,150,150,150,150,150,150,150,150,150,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|3,20,30,-1,-1,0,0,600,200,200,200,200,200,200,200,200,200,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|4,30,40,-1,-1,0,0,800,300,300,300,300,300,300,300,300,300,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|5,40,50,-1,-1,0,0,1000,400,400,400,400,400,400,400,400,400,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|6,50,60,-1,-1,0,0,1500,500,500,500,500,500,500,500,500,500,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|7,60,70,-1,-1,0,0,3000,600,600,600,600,600,600,600,600,600,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|8,70,80,-1,-1,0,0,5000,800,800,800,800,800,800,800,800,800,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|9,80,90,-1,-1,0,0,8000,2000,2000,2000,2000,2000,2000,2000,2000,2000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|10,90,100,-1,-1,0,0,15000,5000,5000,5000,5000,5000,5000,5000,5000,5000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|1,1,1,-1,-1,0,0,200,0,0,0,0,0,0,0,0,0,50,0,0,0,50,60,50,60,0,0,100,100,100,100,100|2,2,2,-1,-1,0,0,200,0,0,0,0,0,0,0,0,0,80,0,0,0,80,100,80,100,0,0,100,100,100,100,100|3,3,3,-1,-1,0,0,200,0,0,0,0,0,0,0,0,0,120,0,0,0,120,150,120,150,0,0,100,100,100,100,100|4,4,4,-1,-1,0,0,300,0,0,0,0,0,0,0,0,0,160,0,0,0,160,240,160,240,0,0,100,100,100,100,100|5,5,5,-1,-1,0,0,400,0,0,0,0,0,0,0,0,0,200,0,0,0,200,300,200,300,0,0,100,100,100,100,100|6,6,6,-1,-1,0,0,500,0,0,0,0,0,0,0,0,0,300,0,0,0,300,450,300,450,0,0,100,100,100,100,100|7,7,7,-1,-1,0,0,700,0,0,0,0,0,0,0,0,0,500,0,0,0,500,600,500,600,0,0,100,100,100,100,100|8,8,8,-1,-1,0,0,1000,0,0,0,0,0,0,0,0,0,800,0,0,0,800,1000,800,1000,0,0,100,100,100,100,100|9,9,9,-1,-1,0,0,1500,0,0,0,0,0,0,0,0,0,1500,0,0,0,1500,2000,1500,2000,0,0,100,100,100,100,100|10,10,10,-1,-1,0,0,3000,0,0,0,0,0,0,0,0,0,3000,0,0,0,3000,4500,3000,4500,0,0,100,100,100,100,100|1,1,3,-1,-1,0,0,800,0,0,0,0,0,0,0,0,0,600,0,0,0,600,1000,800,1000,0,0,0,0,0,100,0|2,4,6,-1,-1,0,0,1200,0,0,0,0,0,0,0,0,0,1500,0,0,0,1500,5000,1800,5000,0,0,0,0,0,100,0|3,7,9,-1,-1,0,0,2000,0,0,0,0,0,0,0,0,0,3000,0,0,0,3000,15000,6000,15000,0,0,0,0,0,100,0|4,10,12,-1,-1,0,0,3000,0,0,0,0,0,0,0,0,0,10000,0,0,0,10000,50000,18000,50000,0,0,0,0,0,100,0|5,13,15,-1,-1,0,0,4000,0,0,0,0,0,0,0,0,0,24000,0,0,0,24000,120000,45000,120000,0,0,0,0,0,100,0|6,16,18,-1,-1,0,0,6000,0,0,0,0,0,0,0,0,0,65000,0,0,0,65000,300000,90000,300000,0,0,0,0,0,100,0|7,19,21,-1,-1,0,0,9000,0,0,0,0,0,0,0,0,0,150000,0,0,0,150000,500000,220000,500000,0,0,0,0,0,100,0|8,22,23,-1,-1,0,0,15000,0,0,0,0,0,0,0,0,0,200000,0,0,0,200000,600000,300000,600000,0,0,0,0,0,100,0|9,24,24,-1,-1,0,0,30000,0,0,0,0,0,0,0,0,0,250000,0,0,0,250000,800000,360000,800000,0,0,0,0,0,100,0|10,25,25,-1,-1,0,0,50000,0,0,0,0,0,0,0,0,0,300000,0,0,0,300000,1000000,450000,1000000,0,0,0,0,0,100,0|1,1,3,-1,-1,0,0,200,30,30,30,30,30,30,30,30,30,30,0,0,0,30,50,30,50,0,0,100,0,0,0,0|2,4,6,-1,-1,0,0,200,50,50,50,50,50,50,50,50,50,50,0,0,0,50,80,50,80,0,0,100,0,0,0,0|3,7,9,-1,-1,0,0,300,80,80,80,80,80,80,80,80,80,80,0,0,0,80,120,80,120,0,0,100,0,0,0,0|4,10,12,-1,-1,0,0,400,120,120,120,120,120,120,120,120,120,120,0,0,0,120,180,120,180,0,0,100,0,0,0,0|5,13,15,-1,-1,0,0,500,160,160,160,160,160,160,160,160,160,160,0,0,0,160,240,160,240,0,0,100,0,0,0,0|6,16,18,-1,-1,0,0,800,240,240,240,240,240,240,240,240,240,240,0,0,0,240,360,240,360,0,0,100,0,0,0,0|7,19,21,-1,-1,0,0,1200,500,500,500,500,500,500,500,500,500,500,0,0,0,500,650,500,650,0,0,100,0,0,0,0|8,22,23,-1,-1,0,0,1800,900,900,900,900,900,900,900,900,900,900,0,0,0,900,1200,900,1200,0,0,100,0,0,0,0|9,24,24,-1,-1,0,0,3500,2400,2400,2400,2400,2400,2400,2400,2400,2400,2400,0,0,0,2400,3500,2400,3500,0,0,100,0,0,0,0|10,25,25,-1,-1,0,0,6000,8000,8000,8000,8000,8000,8000,8000,8000,8000,8000,0,0,0,8000,9000,8000,9000,0,0,100,0,0,0,0|1,1,3,-1,-1,0,0,200,50,50,50,30,30,30,30,30,30,30,0,0,0,30,50,30,80,0,0,0,0,0,0,100|2,4,6,-1,-1,0,0,300,80,80,80,50,50,50,50,50,50,50,0,0,0,50,80,50,150,0,0,0,0,0,0,100|3,7,9,-1,-1,0,0,500,240,240,240,150,150,150,150,150,150,150,0,0,0,120,240,150,600,0,0,0,0,0,0,100|4,10,12,-1,-1,0,0,800,800,800,800,500,500,500,500,500,500,500,0,0,0,450,800,500,1200,0,0,0,0,0,0,100|5,13,15,-1,-1,0,0,1200,1500,1500,1500,1000,1000,1000,1000,1000,1000,1000,0,0,0,900,1500,1000,2000,0,0,0,0,0,0,100|6,16,18,-1,-1,0,0,2000,5000,5000,5000,3000,3000,3000,3000,3000,3000,3000,0,0,0,2400,5000,3000,6500,0,0,0,0,0,0,100|7,19,21,-1,-1,0,0,3000,12000,12000,12000,8000,8000,8000,8000,8000,8000,8000,0,0,0,6500,12000,8000,18000,0,0,0,0,0,0,100|8,22,23,-1,-1,0,0,6000,18000,18000,18000,12000,12000,12000,12000,12000,12000,12000,0,0,0,10000,18000,12000,30000,0,0,0,0,0,0,100|9,24,24,-1,-1,0,0,12000,24000,24000,24000,18000,18000,18000,18000,18000,18000,18000,0,0,0,15000,24000,18000,45000,0,0,0,0,0,0,100|10,25,25,-1,-1,0,0,24000,40000,40000,40000,30000,30000,30000,30000,30000,30000,30000,0,0,0,24000,40000,30000,60000,0,0,0,0,0,0,100|1,1,3,-1,-1,0,0,200,60,60,60,50,50,50,50,50,50,50,0,0,0,30,60,60,80,0,0,0,0,100,0,0|2,4,6,-1,-1,0,0,300,120,120,120,80,80,80,80,80,80,80,0,0,0,60,120,120,150,0,0,0,0,100,0,0|3,7,9,-1,-1,0,0,500,300,300,300,240,240,240,240,240,240,240,0,0,0,150,300,300,600,0,0,0,0,100,0,0|4,10,12,-1,-1,0,0,800,800,800,800,800,800,800,800,800,800,800,0,0,0,600,800,800,1200,0,0,0,0,100,0,0|5,13,15,-1,-1,0,0,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,1500,0,0,0,1200,1500,1500,2000,0,0,0,0,100,0,0|6,16,18,-1,-1,0,0,2400,5000,5000,5000,5000,5000,5000,5000,5000,5000,5000,0,0,0,3000,5000,5000,6500,0,0,0,0,100,0,0|7,19,21,-1,-1,0,0,3500,12000,12000,12000,12000,12000,12000,12000,12000,12000,12000,0,0,0,8000,12000,12000,18000,0,0,0,0,100,0,0|8,22,23,-1,-1,0,0,7500,24000,24000,24000,18000,18000,18000,18000,18000,18000,18000,0,0,0,12000,24000,24000,30000,0,0,0,0,100,0,0|9,24,24,-1,-1,0,0,15000,35000,35000,35000,24000,24000,24000,24000,24000,24000,24000,0,0,0,18000,35000,35000,45000,0,0,0,0,100,0,0|10,25,25,-1,-1,0,0,30000,50000,50000,50000,40000,40000,40000,40000,40000,40000,40000,0,0,0,30000,50000,50000,60000,0,0,0,0,100,0,0|1,1,5,-1,-1,0,0,200,80,80,80,80,80,80,80,80,80,80,0,0,0,80,80,80,80,0,0,0,100,0,0,0|2,6,8,-1,-1,0,0,300,150,150,150,150,150,150,150,150,150,150,0,0,0,150,150,150,150,0,0,0,100,0,0,0|3,9,11,-1,-1,0,0,500,600,600,600,600,600,600,600,600,600,600,0,0,0,600,600,600,600,0,0,0,100,0,0,0|4,12,14,-1,-1,0,0,800,1200,1200,1200,1200,1200,1200,1200,1200,1200,1200,0,0,0,1200,1200,1200,1200,0,0,0,100,0,0,0|5,15,17,-1,-1,0,0,1500,2200,2200,2200,2000,2000,2000,2000,2000,2000,2000,0,0,0,2000,2400,2000,2200,0,0,0,100,0,0,0|6,18,20,-1,-1,0,0,2400,7000,7000,7000,6500,6500,6500,6500,6500,6500,6500,0,0,0,6500,7500,6500,7000,0,0,0,100,0,0,0|7,21,23,-1,-1,0,0,3500,18000,18000,18000,18000,18000,18000,18000,18000,18000,18000,0,0,0,18000,18000,18000,18000,0,0,0,100,0,0,0|8,24,26,-1,-1,0,0,7500,32000,32000,32000,30000,30000,30000,30000,30000,30000,30000,0,0,0,30000,35000,30000,32000,0,0,0,100,0,0,0|9,27,29,-1,-1,0,0,15000,48000,48000,48000,45000,45000,45000,45000,45000,45000,45000,0,0,0,45000,50000,45000,48000,0,0,0,100,0,0,0|10,30,30,-1,-1,0,0,30000,70000,70000,70000,60000,60000,60000,60000,60000,60000,60000,0,0,0,60000,80000,60000,70000,0,0,0,100,0,0,0|1,1,2,-1,-1,0,0,300,30,30,30,30,30,30,30,30,30,30,0,0,0,30,30,30,30,0,0,0,0,100,0,0|2,3,4,-1,-1,0,0,400,60,60,60,40,40,40,40,40,40,40,0,0,0,40,60,40,60,0,0,0,0,100,0,0|3,5,6,-1,-1,0,0,500,80,80,80,50,50,50,50,50,50,50,0,0,0,50,80,50,80,0,0,0,0,100,0,0|4,7,8,-1,-1,0,0,800,120,120,120,80,80,80,80,80,80,80,0,0,0,80,120,80,120,0,0,0,0,100,0,0|5,9,10,-1,-1,0,0,1200,240,240,240,120,120,120,120,120,120,120,0,0,0,120,240,120,240,0,0,0,0,100,0,0|6,11,12,-1,-1,0,0,2400,500,500,500,300,300,300,300,300,300,300,0,0,0,300,500,300,500,0,0,0,0,100,0,0|7,13,14,-1,-1,0,0,3500,1500,1500,1500,900,900,900,900,900,900,900,0,0,0,900,1500,900,1500,0,0,0,0,100,0,0|8,15,16,-1,-1,0,0,5000,4500,4500,4500,3000,3000,3000,3000,3000,3000,3000,0,0,0,3000,4500,3000,4500,0,0,0,0,100,0,0|9,17,18,-1,-1,0,0,8000,8000,8000,8000,5000,5000,5000,5000,5000,5000,5000,0,0,0,5000,8000,5000,8000,0,0,0,0,100,0,0|10,19,20,-1,-1,0,0,12000,15000,15000,15000,10000,10000,10000,10000,10000,10000,10000,0,0,0,10000,15000,10000,15000,0,0,0,0,100,0,0|1,20,20,-1,-1,0,0,300,100,100,100,100,100,100,100,100,100,100,0,0,0,100,100,100,100,0,0,0,0,100,0,0|2,20,20,-1,-1,0,0,300,100,100,100,100,100,100,100,100,100,100,0,0,0,100,100,100,100,0,0,0,0,100,0,0|3,20,20,-1,-1,0,0,300,100,100,100,100,100,100,100,100,100,100,0,0,0,100,100,100,100,0,0,0,0,100,0,0|4,20,20,-1,-1,0,0,300,100,100,100,100,100,100,100,100,100,100,0,0,0,100,100,100,100,0,0,0,0,100,0,0|5,30,30,-1,-1,0,0,1000,1200,1200,1200,800,800,800,800,800,800,900,0,0,0,1200,3000,1200,3000,0,0,0,0,100,0,0|6,30,30,-1,-1,0,0,1000,1200,1200,1200,800,800,800,800,800,800,900,0,0,0,1200,3000,1200,3000,0,0,0,0,100,0,0|7,30,30,-1,-1,0,0,1000,1200,1200,1200,800,800,800,800,800,800,900,0,0,0,1200,3000,1200,3000,0,0,0,0,100,0,0|8,40,40,-1,-1,0,0,6000,12000,12000,12000,8000,8000,8000,8000,8000,8000,12000,0,0,0,12000,20000,12000,20000,0,0,0,0,100,0,0|9,40,40,-1,-1,0,0,6000,12000,12000,12000,8000,8000,8000,8000,8000,8000,12000,0,0,0,12000,20000,12000,20000,0,0,0,0,100,0,0|10,40,40,-1,-1,0,0,6000,12000,12000,12000,8000,8000,8000,8000,8000,8000,12000,0,0,0,12000,20000,12000,20000,0,0,0,0,100,0,0|1,1,1,-1,-1,0,0,1000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|2,2,2,-1,-1,0,0,2000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|3,3,3,-1,-1,0,0,3000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|4,4,4,-1,-1,0,0,5000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|5,5,5,-1,-1,0,0,8000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|6,6,6,-1,-1,0,0,12000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|7,7,7,-1,-1,0,0,20000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|8,8,8,-1,-1,0,0,30000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|9,9,9,-1,-1,0,0,45000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|10,10,10,-1,-1,0,0,100000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|1,20,20,-1,-1,0,0,300,100,100,100,100,100,100,100,100,100,100,0,0,0,100,100,100,100,0,0,0,0,0,100,0|2,20,20,-1,-1,0,0,300,100,100,100,100,100,100,100,100,100,100,0,0,0,100,100,100,100,0,0,0,0,0,100,0|3,20,20,-1,-1,0,0,300,100,100,100,100,100,100,100,100,100,100,0,0,0,100,100,100,100,0,0,0,0,0,100,0|4,30,30,-1,-1,0,0,300,100,100,100,100,100,100,100,100,100,100,0,0,0,100,100,100,100,0,0,0,0,0,100,0|5,30,30,-1,-1,0,0,1000,1000,1000,1000,900,900,900,900,900,900,900,0,0,0,900,1000,900,1000,0,0,0,0,0,100,0|6,30,30,-1,-1,0,0,1000,1000,1000,1000,900,900,900,900,900,900,900,0,0,0,900,1000,900,1000,0,0,0,0,0,100,0|7,40,40,-1,-1,0,0,1000,1000,1000,1000,900,900,900,900,900,900,900,0,0,0,900,1000,900,1000,0,0,0,0,0,100,0|8,40,40,-1,-1,0,0,6000,15000,15000,15000,12000,12000,12000,12000,12000,12000,12000,0,0,0,12000,15000,12000,15000,0,0,0,0,0,100,0|9,40,40,-1,-1,0,0,6000,15000,15000,15000,12000,12000,12000,12000,12000,12000,12000,0,0,0,12000,15000,12000,15000,0,0,0,0,0,100,0|10,40,40,-1,-1,0,0,6000,15000,15000,15000,12000,12000,12000,12000,12000,12000,12000,0,0,0,12000,15000,12000,15000,0,0,0,0,0,100,0|1,1,2,-1,-1,0,0,300,0,0,0,0,0,0,0,0,0,30,0,0,0,30,30,30,30,0,0,0,0,0,100,0|2,3,4,-1,-1,0,0,400,0,0,0,0,0,0,0,0,0,40,0,0,0,40,60,40,60,0,0,0,0,0,100,0|3,5,6,-1,-1,0,0,500,0,0,0,0,0,0,0,0,0,50,0,0,0,50,80,50,80,0,0,0,0,0,100,0|4,7,8,-1,-1,0,0,800,0,0,0,0,0,0,0,0,0,80,0,0,0,80,120,80,120,0,0,0,0,0,100,0|5,9,10,-1,-1,0,0,1200,0,0,0,0,0,0,0,0,0,120,0,0,0,120,240,120,240,0,0,0,0,0,100,0|6,11,12,-1,-1,0,0,2400,0,0,0,0,0,0,0,0,0,300,0,0,0,300,500,300,500,0,0,0,0,0,100,0|7,13,14,-1,-1,0,0,3500,0,0,0,0,0,0,0,0,0,900,0,0,0,900,1500,900,1500,0,0,0,0,0,100,0|8,15,16,-1,-1,0,0,5000,0,0,0,0,0,0,0,0,0,3000,0,0,0,3000,4500,3000,4500,0,0,0,0,0,100,0|9,17,18,-1,-1,0,0,8000,0,0,0,0,0,0,0,0,0,5000,0,0,0,5000,8000,5000,8000,0,0,0,0,0,100,0|10,19,20,-1,-1,0,0,12000,0,0,0,0,0,0,0,0,0,10000,0,0,0,10000,15000,10000,15000,0,0,0,0,0,100,0|1,20,20,-1,-1,0,0,300,100,100,100,100,100,100,100,100,100,100,0,0,0,100,100,100,100,0,0,0,0,0,0,100|2,20,20,-1,-1,0,0,300,100,100,100,100,100,100,100,100,100,100,0,0,0,100,100,100,100,0,0,0,0,0,0,100|3,20,20,-1,-1,0,0,300,100,100,100,100,100,100,100,100,100,100,0,0,0,100,100,100,100,0,0,0,0,0,0,100|4,20,20,-1,-1,0,0,300,100,100,100,100,100,100,100,100,100,100,0,0,0,100,100,100,100,0,0,0,0,0,0,100|5,30,30,-1,-1,0,0,1000,1200,1200,1200,800,800,800,800,800,800,900,0,0,0,900,1000,900,1000,0,0,0,0,0,0,100|6,30,30,-1,-1,0,0,1000,1200,1200,1200,800,800,800,800,800,800,900,0,0,0,900,1000,900,1000,0,0,0,0,0,0,100|7,40,40,-1,-1,0,0,1000,1200,1200,1200,800,800,800,800,800,800,900,0,0,0,900,1000,900,1000,0,0,0,0,0,0,100|8,40,40,-1,-1,0,0,6000,12000,12000,12000,8000,8000,8000,8000,8000,8000,12000,0,0,0,12000,15000,12000,15000,0,0,0,0,0,0,100|9,40,40,-1,-1,0,0,6000,12000,12000,12000,8000,8000,8000,8000,8000,8000,12000,0,0,0,12000,15000,12000,15000,0,0,0,0,0,0,100|10,40,40,-1,-1,0,0,6000,12000,12000,12000,8000,8000,8000,8000,8000,8000,12000,0,0,0,12000,15000,12000,15000,0,0,0,0,0,0,100|1,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|2,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|3,2,2,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|4,2,2,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|5,3,3,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|6,3,3,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|7,4,4,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|8,4,4,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|9,5,5,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|10,5,5,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|1,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|2,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|3,2,2,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|4,2,2,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|5,3,3,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|6,3,3,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|7,4,4,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|8,4,4,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|9,5,5,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|10,5,5,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|1,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|2,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|3,2,2,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|4,2,2,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|5,3,3,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|6,3,3,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|7,4,4,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|8,4,4,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|9,5,5,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|10,5,5,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|1,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|2,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|3,2,2,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|4,2,2,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|5,3,3,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|6,3,3,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|7,4,4,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|8,4,4,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|9,5,5,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|10,5,5,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|1,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|2,1,1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|3,2,2,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|4,2,2,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|5,3,3,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|6,3,3,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|7,4,4,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|8,4,4,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|9,5,5,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|10,5,5,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|1,1,20,-1,-1,0,0,150,300,300,300,150,200,150,150,150,150,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|2,21,40,-1,-1,0,0,300,500,500,500,300,300,300,300,300,300,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|3,41,60,-1,-1,0,0,450,900,900,900,450,600,450,450,450,450,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|4,61,80,-1,-1,0,0,750,1500,1500,1500,750,1000,750,750,750,750,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|5,81,100,-1,-1,0,0,1500,3000,3000,3000,1500,2000,1500,1500,1500,1500,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|6,101,120,-1,-1,0,0,3000,6000,6000,6000,3000,4000,3000,3000,3000,3000,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|7,121,140,-1,-1,0,0,4500,9000,9000,9000,4500,6000,4500,4500,4500,4500,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|8,141,160,-1,-1,0,0,7500,15000,15000,15000,7500,10000,7500,7500,7500,7500,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|9,161,180,-1,-1,0,0,12000,24000,24000,24000,12000,16000,12000,12000,12000,12000,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|10,181,200,-1,-1,0,0,15000,30000,30000,30000,15000,20000,15000,15000,15000,15000,0,0,0,0,0,0,0,0,0,0,100,0,0,0,0|1,1,20,-1,-1,0,0,500,1000,1000,1000,500,600,500,500,500,500,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|2,21,40,-1,-1,0,0,1500,3000,3000,3000,1500,1800,1500,1500,1500,1500,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|3,41,60,-1,-1,0,0,4500,9000,9000,9000,4500,6000,4500,4500,4500,4500,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|4,61,80,-1,-1,0,0,7500,15000,15000,15000,7500,9000,7500,7500,7500,7500,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|5,81,100,-1,-1,0,0,20000,40000,40000,40000,20000,30000,20000,20000,20000,20000,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|6,101,120,-1,-1,0,0,45000,80000,80000,80000,40000,60000,40000,40000,40000,40000,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|7,121,140,-1,-1,0,0,90000,150000,150000,150000,90000,120000,90000,90000,90000,90000,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|8,141,160,-1,-1,0,0,175000,320000,320000,320000,160000,240000,160000,160000,160000,160000,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|9,161,180,-1,-1,0,0,240000,450000,450000,450000,240000,320000,240000,240000,240000,240000,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|10,181,200,-1,-1,0,0,300000,600000,600000,600000,300000,450000,300000,300000,300000,300000,0,0,0,0,0,0,0,0,0,0,0,0,100,0,0|1,1,20,-1,-1,0,0,600,1200,1200,1200,600,600,600,600,600,600,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|2,21,40,-1,-1,0,0,1200,2400,2400,2400,1200,1800,1200,1200,1200,1200,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|3,41,60,-1,-1,0,0,3000,6500,6500,6500,3000,4000,3000,3000,3000,3000,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|4,61,80,-1,-1,0,0,6000,12000,12000,12000,6000,8000,6000,6000,6000,6000,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|5,81,100,-1,-1,0,0,15000,30000,30000,30000,15000,20000,15000,15000,15000,15000,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|6,101,120,-1,-1,0,0,30000,65000,65000,65000,30000,50000,30000,30000,30000,30000,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|7,121,140,-1,-1,0,0,60000,120000,120000,120000,60000,90000,60000,60000,60000,60000,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|8,141,160,-1,-1,0,0,120000,240000,240000,240000,120000,180000,120000,120000,120000,120000,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|9,161,180,-1,-1,0,0,200000,400000,400000,400000,200000,300000,200000,200000,200000,200000,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|10,181,200,-1,-1,0,0,240000,500000,500000,500000,240000,400000,240000,240000,240000,240000,0,0,0,0,0,0,0,0,0,0,0,0,0,100,0|1,1,20,-1,-1,0,0,600,1200,1200,1200,600,600,600,600,600,600,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|2,21,40,-1,-1,0,0,1200,2400,2400,2400,1200,1800,1200,1200,1200,1200,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|3,41,60,-1,-1,0,0,3000,6500,6500,6500,3000,4000,3000,3000,3000,3000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|4,61,80,-1,-1,0,0,6000,12000,12000,12000,6000,8000,6000,6000,6000,6000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|5,81,100,-1,-1,0,0,15000,30000,30000,30000,15000,20000,15000,15000,15000,15000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|6,101,120,-1,-1,0,0,30000,65000,65000,65000,30000,50000,30000,30000,30000,30000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|7,121,140,-1,-1,0,0,60000,120000,120000,120000,60000,90000,60000,60000,60000,60000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|8,141,160,-1,-1,0,0,120000,240000,240000,240000,120000,180000,120000,120000,120000,120000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|9,161,180,-1,-1,0,0,200000,400000,400000,400000,200000,300000,200000,200000,200000,200000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|10,181,200,-1,-1,0,0,240000,500000,500000,500000,240000,400000,240000,240000,240000,240000,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100|1,1,5,-1,-1,0,0,300,600,600,600,300,500,300,300,300,300,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|2,6,10,-1,-1,0,0,600,1200,1200,1200,600,900,600,600,600,600,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|3,11,15,-1,-1,0,0,1500,3000,3000,3000,1500,2400,1500,1500,1500,1500,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|4,16,20,-1,-1,0,0,3000,6000,6000,6000,3000,4500,3000,3000,3000,3000,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|5,21,25,-1,-1,0,0,7500,15000,15000,15000,7500,9000,7500,7500,7500,7500,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|6,26,30,-1,-1,0,0,15000,30000,30000,30000,15000,24000,15000,15000,15000,15000,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|7,31,35,-1,-1,0,0,30000,60000,60000,60000,30000,50000,30000,30000,30000,30000,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|8,36,40,-1,-1,0,0,60000,120000,120000,120000,60000,90000,60000,60000,60000,60000,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|9,41,45,-1,-1,0,0,90000,200000,200000,200000,90000,120000,90000,90000,90000,90000,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|10,46,50,-1,-1,0,0,120000,240000,240000,240000,120000,150000,120000,120000,120000,120000,0,0,0,0,0,0,0,0,0,0,0,100,0,0,0|1,10,10,-1,-1,0,0,1000,1000,1000,1000,1000,200,200,500,500,500,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40|2,10,10,-1,-1,0,0,1000,1000,1000,1000,1000,200,200,500,500,500,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40|3,10,10,-1,-1,0,0,1000,1000,1000,1000,1000,200,200,500,500,500,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40|4,10,10,-1,-1,0,0,3000,30000,20000,20000,2000,500,500,1000,1000,1000,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40|5,10,10,-1,-1,0,0,3000,30000,20000,20000,2000,500,500,1000,1000,1000,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40|6,20,20,-1,-1,0,0,3000,30000,20000,20000,2000,500,500,1000,1000,1000,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40|7,20,20,-1,-1,0,0,8000,50000,35000,40000,40000,1000,1000,12000,12000,50000,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40|8,20,20,-1,-1,0,0,8000,50000,35000,40000,40000,1000,1000,12000,12000,50000,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40|9,20,20,-1,-1,0,0,8000,50000,35000,40000,40000,1000,1000,12000,12000,50000,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40|10,20,20,-1,-1,0,0,8000,50000,35000,40000,40000,1000,1000,12000,12000,50000,0,0,0,0,0,0,0,0,0,0,100,65,100,40,40",
    sw = [
      126, 166, 115, 58, 43, 150, 111, 117, 113, 112, 139, 114, 136, 137, 85,
      89, 93, 88, 92, 96, 97, 121, 125, 123, 122, 124, 134, 104, 101, 105, 102,
      103, 99, 110, 135, 106, 98, 108, 140, 142, 141, 143, 144, 168, 169, 170,
      171, 172,
    ],
    iw =
      "100,105,120,110,100,100,100,100,100,100,100,100,120,120,105,105,100,100,100,100,100,150,105,150,100,100,100,100,100,100,105,100,105,105,100,100,100,100,100,100,100,100,100,100,100,100,100,100;100,105,120,100,100,100,100,100,100,100,100,105,105,105,105,100,100,100,100,100,110,105,120,100,100,100,100,100,100,105,100,105,105,100,100,100,100,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,100,100,120,120,110,105,100,100,100,100,100,800,240,1000,100,100,100,100,100,100,105,100,102,105,100,100,100,100,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,100,102,100,102,100,100,100,100,100,100,102,100,120,100,100,100,100,100,100,100,100,102,102,100,102,102,102,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,130,105,100,150,100,100,100,100,100,100,100,100,100,300,200,300,350,350,105,150,100,150,105,105,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,130,105,100,150,100,100,100,100,100,100,100,100,100,300,200,300,350,350,105,110,100,150,105,105,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100;100,100,110,110,102,101,100,100,100,100,100,110,102,120,100,100,100,100,100,100,100,100,100,102,100,102,100,100,100,100,100,100,100,110,110,110,110,110;100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100;100,100,105,100,100,100,100,100,100,150,120,150,100,100,100,105,105,105,105,105,102,105,100,105,102,102,100,100,100,100,100,100,100,100,100,100;100,102,102,100,100,100,100,100,300,120,150,100,100,100,105,105,105,105,105,102,105,100,105,102,102,100,100,100,100,100,100,100,100,100,100;100,120,100,120,100,100,102,110,105,105,100,100,100,120,150,150,150,150,102,105,100,110,105,105,100,100,100,100,100,110,110,110,110,110;100,100,105,100,100,100,102,100,102,100,100,100,102,105,105,105,105,100,100,100,102,100,100,100,100,100,100,100,102,102,102,102,102;100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,100,100,110,130,130,130,130,102,105,100,105,102,102,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,120,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,100,110,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,120,100,102,105,100,100,100,100,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,150,102,100,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,105,100,100,100,100;100,100,100,100,100,100,100,100,105,100,100,100,100,100,100,100,100,105,100;100,100,100,200,100,100,100,100,100,100,100,100,100,100,105,100,100,100;100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,100,105;100,100,100,100,100,100,100,100,100,100,100,100,102,100,100,100;100,100,100,100,100,100,100,100,100,100,100,105,100,100,100;100,100,100,100,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,100,100,110,100,100;100,100,100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,100,120,100;100,100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100,100;100,100,100,100,100,100,100,100;100,100,100,100,100,100,100;100,100,100,100,100,100;100,100,100,100,100;100,100,100,100;100,100,100;100,100;100",
    z0 = (() => {
      const s = [null];
      return (
        aw.split("|").forEach((A, n) => {
          const t = A.split(",").map(Number);
          s.push({
            j: n + 1,
            id: $l[Math.floor(n / 10)],
            lvl: t[0],
            p: [
              [t[1], t[2]],
              [t[3], t[4]],
              [t[5], t[6]],
            ],
            base: t[7] * 1e3,
            eq: t.slice(8, 27).map((e) => e * 1e3),
            se: t.slice(27, 32),
          });
        }),
        s
      );
    })(),
    tt = {};
  $l.forEach((s, A) => {
    tt[s] = A * 10 + 1;
  });
  var ws = (s) => (tt[s] != null ? [tt[s], tt[s] + 9] : null),
    rw = iw
      .split(";")
      .map((s) => s.split(",").map((A) => (A === "" ? 100 : +A))),
    I4 = {};
  sw.forEach((s, A) => {
    I4[s] = A;
  });
  var ow = [0, 6, 9, 10, 11, 13, 14, 15, 16, 17],
    lw = [6, 3, 1, 1, 2, 1, 1, 1, 1, 2],
    cw = (s, A) =>
      s >= 0 && s <= 9 && A >= 0 ? ow[s] + (A < lw[s] ? A : 0) : -1,
    Tl = (s, A, n) => {
      const t = cw(A, n);
      return t < 0 || !z0[s] ? 0 : z0[s].eq[t];
    },
    dw = (s, A) => (A >= 0 && A <= 4 ? z0[s].se[A] / 100 : 1),
    da = (s, A, n) => tt[s] != null && Tl(tt[s], A, n) !== 0,
    It = (s, A) => tt[s] != null && A >= 0 && A <= 4 && z0[tt[s]].se[A] !== 0,
    ps = (s) =>
      s && s.ml && z0[s.ml] && z0[s.ml].id === s.a
        ? s.ml
        : s
          ? Nu(s.a, s.p)
          : 0,
    S4 = (s) => {
      const A = ps(s);
      return A ? z0[A].lvl : 0;
    },
    Cl = (s) => (s.mag || []).map(ps),
    fw = (s) => H4(s, Cl(s), Math.max(0, B1(s) - (s.mag || []).length)),
    Ds = 0.95,
    Ps = 0.95,
    et = (s) =>
      (s * 100 >= 99.95
        ? "100"
        : s * 100 >= 10
          ? (s * 100).toFixed(1)
          : (s * 100).toFixed(2).replace(/0$/, "")) + "%",
    vs = (s, A) =>
      s
        .map((n, t) => [t, n])
        .filter(([, n]) => n >= 5e-4)
        .map(([n, t]) => `${A(n)} <b>${et(t)}</b>`)
        .join(" · "),
    bs = 5,
    St = { on: !1, wc: 0, mys: 0, fd: 0 },
    ys = (s) =>
      s === "fd"
        ? Math.floor(((typeof Q == "function" && Q().fd) || 0) / bs)
        : N("misc", s),
    hw = () => ["wc", "mys", "fd"].some((s) => ys(s) > 0),
    Ol = (s) => (s ? s.wc * We.wc + s.mys * We.mys + s.fd * We.fd : 0),
    El = (s) => (s ? s.wc + s.mys + s.fd : 0),
    U1 = [3, 4, 9],
    gw = { 3: "nhẫn", 4: "dây chuyền", 9: "ngọc bội" },
    XA = () => lA.fuse,
    s0 = () => r.epBox || (r.epBox = []),
    Ze = (s) => !!s && (r.inv.includes(s) || s0().includes(s)),
    at = (s) => Ze(s) || (!!s && Object.values(r.eq).includes(s)),
    N4 = (s) =>
      Ze(s) &&
      U1.includes(s.d) &&
      !s.set &&
      !s.vio &&
      !s.lock &&
      !s.thanma &&
      !Object.values(r.eq).includes(s),
    Il = (s) =>
      E4[Math.min(6, (s.mag || []).filter((A) => A && A.a > 0).length)],
    mw = (s) => {
      const A = s.reduce((n, t) => n + Il(t), 0);
      return Object.assign({ src: A }, Mn(A, cA.slice(1), 2));
    },
    Nt = (s) =>
      s >= 1 && s < Ue
        ? Math.min(1, (3 * cA[s]) / 3 / (cA[s + 1] - ((3 * cA[s]) / 3) * 2))
        : 0,
    Sl = (s) =>
      w0() &&
      Ze(s) &&
      !s.set &&
      !s.vio &&
      !s.lock &&
      !s.thanma &&
      s.d >= 0 &&
      s.d <= 9 &&
      (s.mag || []).length > 0 &&
      !Object.values(r.eq).includes(s),
    ks = () => lA.hut,
    xs = (s) => Math.max(1, S4(s)),
    Nl = (s, A) => (A < x1 ? [A] : []),
    L4 = (s, A) => {
      const n = (s.mag || [])[A];
      return !n || A >= x1 || !ws(n.a)
        ? !1
        : A % 2
          ? It(n.a, s.s)
          : [0, 1, 2, 3, 4].some((t) => It(n.a, t));
    },
    q4 = 6,
    Ll = (s) => Mn(cA[s] || 0, us.slice(1, q4 + 1), 2),
    uw = (s) =>
      Ll(s)
        .probs.map((A, n) => [n + 1, Math.round(A * 1e3) / 10])
        .filter((A) => A[1] > 0)
        .sort((A, n) => n[1] - A[1]),
    Bs = [0, 1, 2, 5, 6, 7, 8],
    ww = (s) =>
      w0() &&
      Ze(s) &&
      !s.set &&
      !s.vio &&
      !s.lock &&
      !s.thanma &&
      Bs.includes(s.d) &&
      (s.r || 0) <= 2 &&
      !Object.values(r.eq).includes(s),
    Ik = (s) => (s.d === 0 ? lg[s.k] : s.d === 1 ? cg[s.k] : dg[wA[s.d]]),
    Lt = (s) =>
      S.affixLevel.filter((A) => A.a === s).sort((A, n) => A.lvl - n.lvl),
    pw = (s) =>
      z0[s].p.map(([n, t]) =>
        n === -1 && t === -1 ? -1 : Ot(Math.min(n, t), Math.max(n, t)),
      ),
    ql = (s) =>
      w0() &&
      !!s &&
      !s.set &&
      s.d >= 0 &&
      s.d <= 9 &&
      !!s.vio &&
      (s.mag || []).length < B1(s),
    Dw = (s) => {
      const A = z0[s],
        n = W0(A.id),
        t = RA(
          n,
          A.p.map(([a]) => (a === -1 ? 0 : a)),
        ),
        e = RA(
          n,
          A.p.map(([a, i]) => (i === -1 ? 0 : i)),
        );
      return t === e ? t : `${t} ~ ${A.p[0][1]}`;
    },
    jl = (s) => !!s && s.vio && !(s.mag || []).length && Ze(s) && !s.lock,
    zl = (s) => [
      ...new Set(
        S.affixLevel
          .filter((A) => A.pre === (s % 2 === 0 ? 1 : 0) && A.lvl === 1)
          .map((A) => A.a),
      ),
    ],
    fa = {
      ore: { boss: 0.3, elite: 0.045, normal: 0.0045 },
      ht: { boss: 0.65, elite: 0.12, normal: 0.015 },
      shard: { boss: 0.06, elite: 0.009, normal: 3e-4 },
      wc: { boss: 0.01, elite: 0.00125, normal: 1e-4 },
      mys: { boss: 0.006, elite: 8e-4, normal: 5e-5 },
    },
    _s = (s, A) =>
      (fa[s][A.cls] ?? fa[s].normal) *
      ra() *
      $s(A) *
      ((s === "ore" || s === "ht") && typeof uf == "function" ? uf() : 1),
    Pw = { boss: 0, elite: 0, normal: 0 };
  (function () {
    const s = window.RCP && window.RCP.shards;
    if (!s) return;
    const A = (e, a) => (e.req.find((i) => i[0] === a) || [0, -1])[1],
      n = {};
    for (const e of S.sets.gold)
      if (A(e, 39) >= 0 && s[e.n]) {
        const a = n[e.d] || (n[e.d] = {});
        a[s[e.n]] = (a[s[e.n]] || 0) + 1;
      }
    const t = (e) => {
      const a = n[e];
      return a ? +Object.keys(a).sort((i, o) => a[o] - a[i] || o - i)[0] : 9;
    };
    for (const e of S.sets.gold)
      A(e, 39) >= 0 &&
        !s[e.n] &&
        typeof tA == "function" &&
        tA(e) &&
        (s[e.n] = t(e.d));
  })();
  var _A = window.RCP.shards,
    ha = (() => {
      const s = new Map();
      for (const A of S.sets.gold)
        _A[A.n] && !A.fixed && !s.has(A.n) && s.set(A.n, A);
      return s;
    })(),
    OA = (s, A) => (s.req.find((n) => n[0] === A) || [0, -1])[1],
    vw = "img/ep/box2.png",
    Sk = _l["platina_make:0"],
    Nk = [...Array(10)].map((s, A) => _l["platina_up:" + (A + 1)]),
    bw = 0.03,
    Ql = 1e4,
    ga = 10,
    Lk = (s) => Math.round(s * Ql * bw),
    yw = new Set([
      "Phục Ma Tử Kim Côn",
      "Tứ Không Giáng Ma Giới Đao",
      "Tứ Không Hộ pháp Yêu Đái",
      "Hám Thiên Kim Hoàn Đại Nhãn Thần Chùy",
      "Hám Thiên Thừa Long Chiến Ngoa",
      "Kế Nghiệp Bạch Hổ Vô Song khấu",
      "Kế Nghiệp Bôn Lôi Toàn Long thương",
      "Ngự Long Lượng Ngân Bảo Đao",
      "Ngự Long Thiên Môn Thúc Yêu Hoàn",
      "Băng Hàn Đơn Chỉ Phi Đao",
      "Băng Hàn Tâm Tiễn Yêu Khấu",
      "Sâm Hoang Phi Tinh Đoạt Hồn",
      "Thiên Quang Định Tâm Ngưng Thần Phù",
      "Thiên Quang Hoa Vũ Mạn Thiên",
      "Minh ảo Hủ Cốt Hộ Uyển",
      "Minh ảo Tà Sát Độc Nhận",
      "U Lung Kim Xà Phát Đái",
      "U Lung Mặc Thù Nhuyễn Lý",
      "Vô Gian Phất Vân Ti Đái",
      "Vô Gian ỷ Thiên Kiếm",
      "Vô Ma Hồng Truy Nhuyễn Tháp Hài",
      "Vô Ma Tẩy Tượng Ngọc Khấu",
      "Bích Hải Uyên Ương Liên Hoàn Đao",
      "Tê Hoàng Phong Tuyết Bạch Vân Thúc Đái",
      "Tê Hoàng Phụng Nghi Đao",
      "Tê Hoàng Băng Tung Cẩm Uyển",
      "Địch Khái Cẩu Tích Bì Hộ Uyển",
      "Địch Khái Lục Ngọc Trượng",
      "Đồng Cừu Giáng Long Cái Y",
      "Đồng Cừu Kháng Long Hộ Uyển",
      "Ma Sát Quỷ Cốc U Minh Thương",
      "Ma Sát Tàn Dương ảnh Huyết Giáp",
      "Ma Thị Sơn Hải Phi Hồng Lý",
      "Cập Phong Chân Vũ Kiếm",
      "Cập Phong Tam Thanh Phù",
      "Cập Phong Huyền Ti Tam Đoạn Cẩm",
      "Lăng Nhạc Vô Cực Huyền Ngọc Bội",
      "Lăng Nhạc Nộ Lôi Giới",
      "Lôi Khung Thiên Địa Hộ Phù",
      "Sương Tinh Thanh Phong Lũ Đái",
      "Sương Tinh Thiên Niên Hàn Thiết",
    ]),
    _1 = (() => {
      const s = new Map(),
        A = new Set(S.sets.gold.filter((i) => i.fixed).map((i) => i.n)),
        n = new Set(
          S.sets.gold
            .filter((i) => typeof tA != "function" || tA(i))
            .map((i) => i.n),
        );
      for (const i of S.sets.platina) {
        if (i.fixed || A.has(i.n.replace(/^\[[^\]]*\]\s*/, ""))) continue;
        const o = i.n.replace(/^\[[^\]]*\]\s*/, "");
        n.has(o) && (s.get(o) || s.set(o, []).get(o)).push(i);
      }
      const t = new Set([...s.values()].flat()),
        e = (i) =>
          !/[一-鿿]/.test(i.n) && !/Hạn Thời|kỳ hạn/i.test(i.n) && !i.fixed,
        a = (i) =>
          new Set(
            i
              .toLowerCase()
              .replace(/^\[[^\]]*\]\s*/, "")
              .split(/\s+/),
          );
      for (const i of S.sets.gold) {
        if (!n.has(i.n) || s.has(i.n)) continue;
        const o = a(i.n),
          l = S.sets.platina
            .filter((d) => d.grp === i.grp && d.d === i.d && e(d) && !t.has(d))
            .map((d) => [d, [...a(d.n)].filter((h) => o.has(h)).length])
            .sort((d, h) => h[1] - d[1]);
        l.length && l[0][1] >= 2 && (s.set(i.n, [l[0][0]]), t.add(l[0][0]));
      }
      for (const i of [...s.keys()]) yw.has(i) || s.delete(i);
      return s;
    })(),
    qt = (s) => at(s) && s.set && s.set.kind === "gold" && _1.has(s.n),
    kw = (s) =>
      Ze(s) &&
      s.set &&
      s.set.kind === "gold" &&
      !s.lock &&
      !Object.values(r.eq).includes(s),
    xw = ["Thiên Tứ", "Hoàn Mỹ", "Cực phẩm", "Tinh Chế", "Tinh Xảo"];
  (() => {
    const s = S.platVng || {};
    for (const [A] of _1) {
      const n = s[A],
        t = gs(A);
      if (!n || !t) continue;
      const e = {
        n: n.n,
        d: n.d,
        k: n.k,
        s: n.s,
        price: n.price,
        lvl: n.lvl,
        base: n.base,
        req: n.req,
        mag: n.mag,
        mag10: n.mag10,
        ext: [],
        rate: n.rate,
        grp: t.grp,
        n1: t.n1,
        n2: t.n2,
        sid: t.sid,
        ic: t.ic,
        vng: 2,
      };
      (S.sets.platina.push(e), _1.set(A, [e]));
    }
  })();
