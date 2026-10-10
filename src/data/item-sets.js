var Z3 = function (A) {
      const n = JX.sets[A.set.kind] || [],
        t = String(A.n).replace(/^\[(Bạch Kim)\]\s*/, "");
      return (
        n.find((e) => e.n === t || e.n === A.n) ||
        n.find((e) => e.grp === A.set.grp && e.d === A.d) ||
        null
      );
    },
    y3 = function (A) {
      if (!A || !A.set) return !1;
      const n = Z3(A);
      return !!n && (!!n.fixed || n.d > 10);
    },
    B8 = function (A) {
      if (A.fac < 0) {
        const e = (o) => (o.req.find((l) => l[0] === 36) || [0, 0])[1],
          a = A.lv || 0,
          i = (JX.sets.gold || []).filter(
            (o) =>
              z1(o) < 0 && !B3.has(o.grp) && (typeof tA != "function" || tA(o)),
          );
        for (const o of [
          i.filter((l) => l.d === A.d && l.k === A.k),
          i.filter((l) => l.d === A.d),
        ])
          if (o.length)
            return o.sort((l, d) => Math.abs(e(l) - a) - Math.abs(e(d) - a))[0];
        return null;
      }
      const n = (JX.sets.gold || []).filter(
        (e) => z1(e) === A.fac && G2.has(e.grp),
      );
      if (!n.length) return null;
      const t = n.filter((e) => To(e.n) === To(A.n));
      for (const e of [t, n]) {
        const a = e.filter((o) => o.d === A.d && o.k === A.k);
        if (a.length) return a[0];
        const i = e.filter((o) => o.d === A.d);
        if (i.length) return i[0];
      }
      return null;
    },
    Gh = function (A) {
      if (!A || !A.set || A.set.kind !== "gold") return !1;
      const n = (A.req || []).find((i) => i[0] === 39),
        t = n ? n[1] : -1;
      if (!B3.has(A.set.grp)) {
        if (t < 0 || G2.has(A.set.grp)) return !1;
      }
      const e = B8({
        n: A.n,
        d: A.d,
        k: A.k,
        fac: t,
        lv: ((A.req || []).find((i) => i[0] === 36) || [0, 0])[1],
      });
      if (!e) return !1;
      const a = typeof X1 == "function" ? X1 : null;
      return a
        ? ((A.n = e.n),
          (A.s = e.s),
          (A.base = e.base.map((i) => i.slice())),
          (A.req = e.req.map((i) => i.slice())),
          (A.lvl = e.lvl),
          (A.d = e.d),
          (A.k = e.k),
          e.ic ? (A.ic = e.ic) : delete A.ic,
          (A.mag = e.mag.map(a).filter(Boolean)),
          (A.ext = (e.ext || []).map(a).filter(Boolean)),
          (A.set.grp = e.grp),
          (A.set.sid = e.sid),
          (A.set.n1 = e.n1),
          (A.set.n2 = e.n2),
          (window.HKMP_CONV = window.HKMP_CONV || []).push(e.n),
          !0)
        : !1;
    },
    Kh = function (A) {
      if (!A || !A.set || typeof jA != "function" || !jA(A)) return !1;
      const n = (f) => ((f.req || []).find((m) => m[0] === 39) || [0, -1])[1],
        t = (f) =>
          ((f.req || []).find((m) => m[0] === 36) || [0, f.lvl || 0])[1],
        e = n(A),
        a = t(A),
        i = A.set.kind === "platina" || A.r === 5 || A.plv != null,
        o = i
          ? (JX.sets.platina || []).filter((f) => f.vng === 2)
          : (JX.sets.gold || []).filter(
              (f) =>
                typeof tA == "function" &&
                tA(f) &&
                !/Hạn Thời|kỳ hạn/i.test(f.n),
            );
      let l = e;
      if (i && l < 0)
        try {
          l =
            typeof window.GONE_FAC == "number"
              ? window.GONE_FAC
              : typeof r < "u" && r && typeof I < "u" && I[r.fac]
                ? I[r.fac].id
                : -1;
        } catch {
          l = -1;
        }
      const d = o.filter((f) => n(f) === l);
      let h = null;
      for (const f of i
        ? [
            d.filter((m) => m.d === A.d && m.k === A.k),
            d.filter((m) => m.d === A.d),
            d,
            o.filter((m) => n(m) < 0 && m.d === A.d),
            o.filter((m) => m.d === A.d),
          ]
        : [
            d.filter((m) => m.d === A.d && m.k === A.k),
            d.filter((m) => m.d === A.d),
            o.filter((m) => n(m) < 0 && m.d === A.d && m.k === A.k),
            o.filter((m) => n(m) < 0 && m.d === A.d),
          ])
        if (f.length) {
          h = f
            .slice()
            .sort((m, w) => Math.abs(t(m) - a) - Math.abs(t(w) - a))[0];
          break;
        }
      if (!h) return !1;
      const g = JSON.stringify(A);
      if (
        ((A.n = h.n),
        (A.s = h.s),
        (A.base = h.base.map((f) => f.slice())),
        (A.req = h.req.map((f) => f.slice())),
        (A.lvl = h.lvl),
        (A.d = h.d),
        (A.k = h.k),
        (A.price = h.price),
        h.ic ? (A.ic = h.ic) : delete A.ic,
        (A.set.grp = h.grp),
        (A.set.sid = h.sid),
        (A.set.n1 = h.n1),
        (A.set.n2 = h.n2),
        i)
      ) {
        if (
          ((A.set.kind = "platina"),
          (A.r = 5),
          (A.plv = A.plv || 0),
          (A.mf = null),
          (A.ps = null),
          (A.ext = []),
          A.plv >= 5 && typeof ms == "function")
        ) {
          const f = A.plv;
          ((A.plv = Math.min(9, f)), ms(A), (A.plv = f));
        }
        ((A.pv3 = 1), typeof la == "function" && la(A));
      } else {
        const f = typeof X1 == "function" ? X1 : null;
        if (!f) return (Object.assign(A, JSON.parse(g)), !1);
        ((A.mag = h.mag.map(f).filter(Boolean)),
          (A.ext = (h.ext || []).map(f).filter(Boolean)));
      }
      if (jA(A)) {
        for (const f of Object.keys(A)) delete A[f];
        return (Object.assign(A, JSON.parse(g)), !1);
      }
      return ((window.GONE_CONV = window.GONE_CONV || []).push(h.n), !0);
    },
    Gn = function (A) {
      if (!A || !A.set) return !1;
      let n = Gh(A);
      if (A.vga !== 1) {
        for (const e of (A.mag || []).concat(A.ext || []))
          e && (e.a === 65 || e.a === 70) && (e.a = e.a === 65 ? 66 : 71);
        ((A.vga = 1), (n = !0));
      }
      if (
        (A.set.kind === "platina" &&
          !A.pv3 &&
          typeof ca == "function" &&
          (ca(A), A.pv3 && (n = !0)),
        A.set.kind === "gold")
      ) {
        const e = x3.get(A.n);
        e &&
          e.grp !== A.set.grp &&
          ((A.set.grp = e.grp),
          (A.set.sid = e.sid),
          (A.set.n1 = e.n1),
          (A.set.n2 = e.n2),
          (n = !0));
      }
      if (A.set.kind === "gold" && $o.has(A.n)) {
        const e = x3.get(A.n),
          a = JX.ge,
          i = (l, d) => {
            const h = a[d];
            if (!h || !l || l.a !== h.a) return !1;
            const [g, f] = h.p[0];
            return (
              g === -1 || (l.p[0] >= Math.min(g, f) && l.p[0] <= Math.max(g, f))
            );
          };
        !(
          (A.mag || []).length === e.mag.length &&
          e.mag.every((l, d) => i(A.mag[d], l)) &&
          JSON.stringify(A.base) === JSON.stringify(e.base)
        ) &&
          typeof X1 == "function" &&
          ((A.base = e.base.map((l) => l.slice())),
          (A.req = e.req.map((l) => l.slice())),
          (A.lvl = e.lvl),
          (A.d = e.d),
          (A.k = e.k),
          e.ic && (A.ic = e.ic),
          (A.mag = e.mag.map(X1).filter(Boolean)),
          (A.ext = (e.ext || []).map(X1).filter(Boolean)),
          (A.set.grp = e.grp),
          (A.set.sid = e.sid),
          (A.set.n1 = e.n1),
          (A.set.n2 = e.n2),
          (n = !0));
      }
      Kh(A) && (n = !0);
      const t = Z3(A);
      if (!t) return n;
      if (A.set.kind === "gold" && typeof X1 == "function") {
        const e = JX.ge,
          a = (i, o) => {
            const l = e[o];
            if (!l || !i || i.a !== l.a) return !1;
            const [d, h] = l.p[0];
            return (
              d === -1 || (i.p[0] >= Math.min(d, h) && i.p[0] <= Math.max(d, h))
            );
          };
        t.mag.every((i) => e[i]) &&
          !(
            (A.mag || []).length === t.mag.length &&
            t.mag.every((i, o) => a(A.mag[o], i))
          ) &&
          ((A.mag = t.mag.map(X1).filter(Boolean)), (n = !0));
      }
      if (
        (t.s != null &&
          A.s !== t.s &&
          A.n.replace(/^\[[^\]]*\]\s*/, "") ===
            t.n.replace(/^\[[^\]]*\]\s*/, "") &&
          ((A.s = t.s), (n = !0)),
        (A.set.n2 > 0 && A.set.n2 < 99) ||
          ((A.set.n1 = t.n1),
          (A.set.n2 = t.n2),
          (A.set.sid = A.set.sid || t.sid),
          (n = !0)),
        (A.mag || []).length < t.mag.length)
      ) {
        const e = () => 5 + Math.floor(Math.random() * 6);
        ((A.mag = t.mag.map((a) => rs(a, e())).filter(Boolean)),
          (A.ext = (t.ext || []).map((a) => rs(a, e())).filter(Boolean)),
          (n = !0));
      }
      return n;
    },
    Ho =
      /^(Hắc thần|Thương Khung Thiên Khởi|Long Tương Chi Lân|Độc Cô Cầu Bại|Thuần Tịnh Chi Giới|Thế Túc Toàn Giới|Thiên Hà Giới|Thiên tử chi giới|Đế hoàng chi giới|Hưng Bang Giới|Trấn Nhạc Giới|Thương Phương Giới|Lãnh Bá Nguyên Mộng|Vũ Liệt Chi)/i,
    Rh =
      /^\s*\[|\((\s*mới\s*|kỳ hạn)\)|[ÄĐẫãệđ´óằð]{4}|^Dương Thần|^(Định Quốc Thanh sa Trường sam|An Bang Cúc hoa Thạch chỉ hoàn|An Bang Điền Hoàng thạch ngọc bội)$/,
    k3 = (s) => (
      (s = String(s || "")),
      Ho.test(s.replace(/^\[[^\]]*\]\s*/, "")) ||
        Rh.test(s.replace(/^\[Bạch Kim\]\s*/, ""))
    ),
    _8 = (s) =>
      !!s &&
      typeof s == "object" &&
      !s.set &&
      (s.d === 3 || s.d === 4 || s.d === 9) &&
      (!!s.vio || s.r === 3),
    SA = (s) =>
      _8(s) ||
      (!!s &&
        typeof s == "object" &&
        !!s.set &&
        s.set.kind !== "platina" &&
        k3(s.n));
  JX.sets.gold && (JX.sets.gold = JX.sets.gold.filter((s) => !k3(s.n)));
  var x3 = new Map(),
    $o = new Set();
  if (
    (JX.sets.gold &&
      (JX.sets.gold = JX.sets.gold.filter((s) =>
        x3.has(s.n) ? ($o.add(s.n), !1) : (x3.set(s.n, s), !0),
      )),
    JX.sets.platina &&
      (JX.sets.platina = JX.sets.platina.filter(
        (s) => !Ho.test(String(s.n || "").replace(/^\[[^\]]*\]\s*/, "")),
      )),
    window.RCP && RCP.shards)
  )
    for (const s of Object.keys(RCP.shards)) k3(s) && delete RCP.shards[s];
  (function () {
    const s = JX.sets.gold,
      A = JX.sets.platina,
      n = JX.ge,
      t = (f, m) => (f.req.find((w) => w[0] === m) || [0, -1])[1],
      e = (f) => String(f).replace(/^\[[^\]]*\]\s*/, "");
    let a = 1e5;
    const i = (f, m) => {
        const w = n[f];
        if (!w) return null;
        if (Math.abs(m - 1) < 0.01) return f;
        const p = w.p.map(([P, v]) =>
          P === -1 && v === -1
            ? [P, v]
            : [Math.round(P * m), Math.round(v * m)],
        );
        return ((n[++a] = { a: w.a, p }), a);
      },
      o = (f) => f.mag.length && f.mag.every((m) => n[m]),
      l = s.filter(o);
    for (const f of s) {
      if (o(f)) continue;
      const m = t(f, 36),
        w = t(f, 39),
        P =
          l
            .filter((_) => _.d === f.d && t(_, 39) === w && t(_, 36) <= m)
            .sort((_, E) => t(E, 36) - t(_, 36))[0] ||
          l.filter((_) => _.d === f.d).sort((_, E) => t(E, 36) - t(_, 36))[0];
      if (!P) continue;
      const v = 1 + Math.max(0, m - t(P, 36)) / 400,
        H = f.mag.length ? f.mag : P.mag.map(() => -1);
      ((f.mag = H.map((_, E) =>
        n[_] ? _ : i(P.mag[E % P.mag.length], v),
      ).filter((_) => _ != null)),
        (!f.ext || !f.ext.length) && (f.ext = (P.ext || []).map(() => -1)),
        (f.ext = (f.ext || [])
          .map((_, E) =>
            n[_]
              ? _
              : P.ext && P.ext.length
                ? i(P.ext[E % P.ext.length], v)
                : null,
          )
          .filter((_) => _ != null)),
        (f.fixed = 1));
    }
    const d = new Set(s.filter((f) => f.fixed).map((f) => f.grp));
    for (const f of s) d.has(f.grp) && (f.fixed = 1);
    for (const f of A) d.has(f.grp) && (f.fixed = 1);
    const h = {};
    for (const f of s) (h[f.grp] = h[f.grp] || []).push(f);
    for (const f in h) {
      const m = h[f],
        w = m.find((p) => p.n2 > 0 && p.n2 < 99);
      for (const p of m)
        (p.n2 > 0 && p.n2 < 99) ||
          ((p.n1 = w ? w.n1 : Math.max(2, Math.round(m.length * 0.4))),
          (p.n2 = w ? w.n2 : Math.max(2, Math.round(m.length * 0.7))),
          (p.sid = p.sid || (w && w.sid) || 1));
    }
    const g = {};
    for (const f of s) g[e(f.n)] = f;
    for (const f of A) {
      const m = g[e(f.n)] || (h[f.grp] || []).find((w) => w.d === f.d);
      if (
        (m &&
          (!f.mag.length || !f.mag.every((w) => n[w])) &&
          ((f.mag = m.mag.map((w) => i(w, 1.15)).filter((w) => w != null)),
          (!f.ext || !f.ext.length || !f.ext.every((w) => n[w])) &&
            (f.ext = (m.ext || [])
              .map((w) => i(w, 1.15))
              .filter((w) => w != null)),
          (f.fixed = 1)),
        !(f.n2 > 0 && f.n2 < 99))
      ) {
        const w = (h[f.grp] || [])[0];
        ((f.n1 = w ? w.n1 : 3),
          (f.n2 = w ? w.n2 : 5),
          (f.sid = f.sid || (w && w.sid) || 1));
      }
    }
  })();
  var G2 = new Set([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
    ]),
    z1 = (s) => (s.req.find((A) => A[0] === 39) || [0, -1])[1],
    B3 = new Set([39, 41, 42, 45, 46, 52]),
    M8 = (s) => !B3.has(s.grp) && (z1(s) < 0 || G2.has(s.grp)),
    To = (s) =>
      String(s || "")
        .replace(/^\[[^\]]*\]\s*/, "")
        .toLowerCase()
        .split(/\s+/)
        .slice(0, 2)
        .join(" ");
