var Gl = (s) =>
      s && s.set && s.set.kind === "platina"
        ? S.sets.platina.find((A) => A.vng === 2 && A.n === s.n)
        : null,
    qk = (s) =>
      r.inv.some(
        (A) =>
          A !== s && A.n === s.n && A.set && A.set.kind === "gold" && A.lock,
      ),
    Ms = 120,
    c1 = 1e3 * Ql,
    ma = 10,
    jt = 8,
    A2 = 2,
    Bw = [2, 3, 4, 5, 6, 8, 15, 25, 40, 60],
    j4 = (s) => {
      const A = Bw[Math.min(ga - 1, s.plv || 0)];
      return Re(s) >= 0 ? A : Math.max(1, Math.round((A * 2) / 3));
    },
    Kl = (s, A) => Math.min(1, (A | 0) / j4(s)),
    jk = (s) => xl(s),
    _w = (s) => [Fu(s), Uu(s), tw(s)].filter(Boolean),
    zt = function (A) {
      if (A > l0) return R2;
      const n = V0(A),
        t = Math.round(n.lo + ((Yw(A) - 1) * (n.hi - n.lo)) / (bn - 1));
      return n.lo >= 160 ? Math.min(Y2(), t) : t;
    },
    Mw = function (A) {
      return A > 100
        ? 26240 + (A - 100) * 340
        : Rl(A, Ac, 0) * C(1 + (3 * (A - 40)) / 30, 1, 4);
    },
    Rl = function (A, n, t) {
      if (A > 100) {
        const [e, a, i, o] = n[n.length - 1];
        return Math.floor(a + i * (e - o)) + t * (A - 100);
      }
      for (const [e, a, i, o] of n)
        if (A <= e) return Math.floor(a + i * (Math.max(1, A) - o));
      return 0;
    },
    Hw = function (A, n) {
      const t = ua[n];
      return {
        hp: Mw(A) * Ww * X4(A) * t.hp,
        dmg: (2 + 1 * A + 0.006 * A * A) * t.dmg * V4(Jw, A),
        ar: 30 + A * 9,
        def: 8 + A * 3.2,
      };
    },
    Yl = function (A) {
      return j6(A);
    },
    zk = function (A) {
      return (
        (A > 100
          ? 26240 + (A - 100) * 340
          : Rl(A, Ac, 0) * C(1 + (3 * (A - 40)) / 30, 1, 4)) * X4(A)
      );
    },
    $w = function () {
      const [A, n] = e9;
      return 1 + (t9 - 1) * C((r.lvl - A) / (n - A), 0, 1);
    },
    Fl = function (A) {
      const n = (r0[A] && r0[A].sk) || [],
        t =
          n.find((e) => e !== 53 && e !== 101 && U4[e]) ||
          n.find((e) => U4[e]) ||
          53;
      return Math.min(s9, U4[t] || 75);
    },
    zA = function (A, n, t, e, a) {
      const i = r0[A],
        o = V0(r.stage),
        l = Hw(n, t),
        d = F4(),
        h = j5();
      ((l.hp *= d.hp * h.hp), (l.dmg *= d.dmg * h.dmg));
      const g = t !== "boss" && n >= r9 && o9(o) < 5 ? C0(0, 4) : _3(A),
        f =
          Array.isArray(i.rmax) && i.rmax.length === 5
            ? i.rmax
            : q0.map((w, p) => (p === og[g] ? 90 : p === i9[g] ? 60 : 75)),
        m = {};
      return (
        q0.forEach((w, p) => {
          const P = f[p] || 75,
            v = P > 75 ? 10 : P < 75 ? -10 : 0;
          m[w] = C(n * 0.35 + (t === "boss" ? 10 : 0) + v, -20, P);
        }),
        {
          id: Math.random(),
          tid: A,
          n: i.n,
          img: i.img ? PA(i.img) : null,
          sz: i.sz,
          L: n,
          cls: t,
          series: g,
          res: m,
          hp: l.hp,
          max: l.hp,
          dmg: l.dmg,
          ar: l.ar,
          def: l.def,
          x: e,
          y: a,
          r: ua[t].r,
          spd: (30 + (i.run || 6) * 4) * (t === "boss" ? 0.7 : 1),
          atkCd: A0(0.5, 1.5),
          cd: 1.2 + (18 / Math.max(8, i.spd || 18)) * 0.5,
          reach: Fl(A),
          ranged: Fl(A) > 120,
          born: c.clock || 0,
          tr: i.tr,
          hr: i.hr || 0,
          vis: i.vis || 0,
          lr: i.lr || null,
          stun: 0,
          slowT: 0,
          poison: 0,
          poisonDmg: 0,
          hitT: 0,
          face: 1,
        }
      );
    },
    z4 = function () {
      ((c.enemies = []), (c.stall = 0));
      const A = V0(r.stage),
        n = zt(r.stage),
        t = (o, l) => {
          const d = A0(0, Math.PI * 2),
            h = A0(o, l);
          return K0(b.x + Math.cos(d) * h, b.y + Math.sin(d) * h);
        },
        e = () => (c.sp = t(140, 300))[0],
        a = () => c.sp[1],
        i = (o) => {
          const l = zA(_0(A.m), n, o, e(), a());
          (o === "normal" && ((l.dens = !0), (l.dmg *= ec)), c.enemies.push(l));
        };
      if (r.wave === T3 && qv()) {
        const o = t(220, 260),
          l = zA(A.boss, n + 1, "boss", o[0], o[1]);
        ((l.n = $e(A.boss, A.n)), c.enemies.push(l), i("elite"));
        for (let d = 0; d < W4()[3]; d++) i("normal");
        M(`<b class="boss">${D($e(A.boss, A.n))}</b> xuất hiện!`);
      } else {
        const o = W4(),
          l = C0(o[1], o[2]),
          d = r.wave === T3 ? 1 + (Math.random() < 0.4 ? 1 : 0) : 0;
        for (let h = 0; h < l; h++) i(h < d ? "elite" : "normal");
      }
      A.id !== c.zoneShown &&
        ((c.zoneShown = A.id),
        (c.banner = { t: 2.4, text: A.n, sub: `Cấp ${A.lo}–${A.hi}` }),
        typeof vn == "function" && vn(A));
    },
    Qt = function (A, n, t = 0) {
      const e = (n * (100 - Math.min(t, 100))) / 100;
      let a = A + e === 0 ? 50 : (A * 100) / (A + e);
      return (a > jo + 4 && (a = jo), Math.max(Uh, a));
    },
    n2 = function (A, n, t, e, a, i, o) {
      let l = a[n];
      return (
        a1(t, e) ? (l -= o) : a1(e, t) && (l += o),
        (l = C(l, -i, Math.min(i, Xh))),
        (A * (100 - l)) / 100
      );
    },
    Hs = function (A, n) {
      ((n.aggro = !0),
        A &&
          A.id &&
          T[A.id] &&
          T[A.id].tier === 90 &&
          ((n.hitSk || (n.hitSk = {}))[A.id] = 1));
      const t = typeof kn == "function" ? kn(n) : null;
      if (
        A.useAR &&
        Math.random() * 100 >=
          Qt(A.ar || c.P.ar, Math.max(0, n.def + (t ? t.def : 0)), A.ignore)
      )
        return (EA(n.x, n.y - n.r - 8, "Trượt", "#aaa", 11), 0);
      A.ev2 || h5(A, n);
      const e = Math.random() * 100 < A.crit,
        a =
          (c.P.heavy > 0 || A.fatal > 0) &&
          Math.random() * 100 < (c.P.heavy || 0) + (A.ev2 ? 0 : A.fatal || 0);
      let i = 0,
        o = "phys",
        l = 0;
      const d = n.cls === "boss" || n.cls === "elite";
      if (
        d &&
        Math.random() * 100 < (n.cls === "boss" ? 6 : 3) - (c.P.antiBlock || 0)
      )
        return (EA(n.x, n.y - n.r - 8, "Hóa giải", "#ccc", 11), 0);
      const h = n.resBrkT > 0 ? 10 : 0,
        g = c.P.anti,
        f =
          (g && q0.some((O) => g[O])) || h
            ? Object.fromEntries(
                q0.map((O) => [O, n.res[O] - ((g && g[O]) || 0) - h]),
              )
            : n.res,
        m = t
          ? Object.fromEntries(q0.map((O) => [O, f[O] + (t.res[O] || 0)]))
          : f,
        w = c.P.antiMax ? Math.max(0, 75 - c.P.antiMax / 4) : 75;
      for (const O in A.parts) {
        let z = A.parts[O] * A0(0.85, 1.15);
        if (O === "poison") {
          const R = n.poison > 0 ? n.poisonDmg * n.poison : 0;
          n.poison > 0 || st(n, "Độc", "#8fe34a");
          const Z = A.poisonT || Gt;
          ((n.poisonDmg =
            (R +
              n2(
                z * (t && t.poison ? 1 + t.poison / 100 : 1),
                "poison",
                A.series,
                n.series,
                m,
                w,
                A.series5,
              ) *
                De()) /
            Math.max(Z, n.poison > 0 ? n.poison : 0)),
            (n.poison = Math.max(Z, n.poison > 0 ? n.poison : 0)));
          continue;
        }
        ((z = n2(z, O, A.series, n.series, m, w, A.series5)),
          e && O === "phys" && (z *= zo),
          (i += z),
          z > l && ((l = z), (o = O)));
      }
      (a1(A.series, n.series) && (i += c.P.series5),
        a && (i *= 1.5),
        d && c.P.antiSorb && (i *= 1 + c.P.antiSorb / 100));
      const p = a1(A.series, n.series),
        P = a1(n.series, A.series);
      (p ? (i *= 1 + it) : P && (i *= 1 - it),
        c.P.me2 && c.P.me2[n.series] && (i *= 1 + c.P.me2[n.series] / 100),
        A.parts.cold && !(n.slowT > 0) && st(n, "Băng", "#8fd8ff"),
        A.parts.cold &&
          !(n.slowT > 0) &&
          (n.slowT = (A.coldT || Y4) + (c.P.coldEnh || 0) / 18));
      const v = 1 + (c.P.stunLong || 0) / 100;
      if (
        (A.parts.light &&
          Math.random() < Wl &&
          (n.stun = Math.max(n.stun, Zl * v)),
        (i = Math.max(1, i * De())),
        (n.hp -= i),
        (n.hitT = 0.12),
        n.act !== "at" &&
          ((n.act = "hurt"), (n.actT = 0), Ai(r0[n.tid].anim, "hurt", 0.3)),
        (A.stun || c.P.stunAdd) &&
          Math.random() * 100 < (A.stun || 0) + (c.P.stunAdd || 0) &&
          (n.stun > 0 || st(n, "Choáng", "#ffd24a"),
          (n.stun = Math.max(n.stun, 0.8 * v))),
        c.P.knock && n.cls !== "boss" && Math.random() * 100 < c.P.knock)
      ) {
        const O = n.x - b.x,
          z = n.y - b.y,
          R = Math.hypot(O, z) || 1;
        ((n.x += (O / R) * 40),
          (n.y += (z / R) * 40),
          (n.stun = Math.max(n.stun, 0.25)),
          (n.atkCd = Math.max(n.atkCd || 0, 0.3)));
      }
      (c.P.breakRes && Math.random() * 100 < c.P.breakRes && (n.resBrkT = 3),
        c.P.hurtP &&
          Math.random() * 100 < c.P.hurtP &&
          (n.atkCd = Math.max(n.atkCd || 0, 0.25 + (c.P.hurtT || 0) / 18)));
      const H = A.basic || A.wpn,
        _ = ((H && c.P.leech) || 0) + (A.ev2 ? 0 : A.skLeech || 0),
        E = ((H && c.P.manaLeech) || 0) + (A.ev2 ? 0 : A.skMLeech || 0);
      (_ && t2((i * _) / 100, !0),
        E && (c.mana = Math.min(c.P.mana, c.mana + (i * E) / 100)));
      const $ = p ? " ⚡" : P ? " 🛡" : "";
      return (
        EA(
          n.x,
          n.y - n.r - 6,
          X(i) + $ + (a ? "!" : ""),
          e || a ? "#ffe14a" : So[o],
          e || a ? 16 : 12,
        ),
        i
      );
    },
    st = function () {},
    Tw = function (A) {
      const n = typeof kn == "function" ? kn(A) : null;
      if (
        Math.random() * 100 >=
        Qt(A.ar * (n ? Math.max(0.1, 1 + n.ar / 100) : 1), c.P.def)
      ) {
        EA(b.x, b.y - 30, "Né", "#9cf", 11);
        return;
      }
      if (c.P.block && Math.random() * 100 < c.P.block) {
        EA(b.x, b.y - 30, "Hóa giải", "#9cf", 11);
        return;
      }
      const t = ig[A.series] || "phys";
      let e = A.dmg * A0(0.8, 1.2) * (n ? Math.max(0.1, 1 + n.dmg / 100) : 1);
      if (
        ((e = n2(
          e,
          t,
          A.series,
          c.P.series,
          c.P.res,
          (c.P.resMaxE && c.P.resMaxE[t]) || c.P.resMax || $8,
          10,
        )),
        a1(A.series, c.P.series)
          ? ((e *= 1 + it), c.P.res5 && (e = Math.max(1, e - c.P.res5)))
          : a1(c.P.series, A.series) && (e *= 1 - it),
        c.P.dmgShield && (e -= Math.min(c.P.dmgShield, e * I8)),
        t === "cold" && !(c.slowT > 0) && st(null, "Băng", "#8fd8ff"),
        t === "cold" &&
          (c.slowT = Math.max(
            c.slowT || 0,
            Y4 * (1 - (c.P.freezeRed || 0) / 100),
          )),
        t === "light" &&
          Math.random() < (Fw[A.cls] || 0) &&
          !(Math.random() * 100 < (c.P.antiStun || 0)))
      ) {
        const a = Vw * (1 - (c.P.stunRed || 0) / 100);
        a > 0.05 &&
          ((c.stunT = Math.max(c.stunT || 0, a)),
          st(null, "Choáng", "#ffd24a"));
      }
      if (
        (t === "poison" && !(c.hpDotT > 0) && st(null, "Độc", "#8fe34a"),
        t === "poison")
      ) {
        const a = Gt * (1 - (c.P.poisonRed || 0) / 100),
          i = e * 0.4;
        ((e -= i),
          a > 0.05 &&
            ((c.hpDot = (c.hpDot || 0) + (i * a) / Gt),
            (c.hpDotT = Math.max(c.hpDotT || 0, a))));
      }
      if (
        (c.P.sorb && (e *= 1 - c.P.sorb / 100),
        c.P.from && c.P.from[A.series] && (e *= 1 - c.P.from[A.series] / 100),
        c.P.dmg2mana &&
          (c.mana = Math.min(c.P.mana, c.mana + (e * c.P.dmg2mana) / 100)),
        n && n.ret && !A.ranged && (A.hp -= ((e * n.ret) / 100) * De()),
        c.P.manaShield > 0 && c.mana > 0)
      ) {
        const a = Math.min(c.mana, (e * c.P.manaShield) / 100);
        ((c.mana -= a), (e -= a));
      }
      if (
        ((c.life -= e),
        (c.hurtT = 0.25),
        b.act !== "at" &&
          Math.random() < 0.3 &&
          ((b.act = "hurt"),
          (b.actT = 0),
          (c.atkT = Math.max(
            c.atkT || 0,
            0.25 * (1 - (c.P.hitRec || 0) / 100),
          ))),
        c.P.retMelee || c.P.retMeleeP || c.P.retRangeP)
      ) {
        const a = A.ranged
          ? (e * (c.P.retRangeP || 0)) / 100
          : c.P.retMelee + (e * c.P.retMeleeP) / 100;
        a > 0 && (A.hp -= a * De());
      }
      EA(b.x + A0(-10, 10), b.y - 36, "-" + X(e), "#ff6a5a", 12);
    },
    t2 = function (A, n) {
      const t = c.life;
      ((c.life = Math.min(c.P.life, c.life + A)),
        !n &&
          c.life - t > 1 &&
          EA(b.x, b.y - 44, "+" + X(c.life - t), "#7f7", 11));
    },
    Q4 = function (A) {
      let n = null;
      for (const t of S.potions)
        t.kind === A &&
          r.lvl >= (Kt[t.tier] || 999) &&
          Rt(t) <= r.gold &&
          (!n || t.tier > n.tier) &&
          (n = t);
      return n;
    },
    Cw = function (A) {
      c.hot = c.hot || { life: 0, mana: 0, lifeT: 0, manaT: 0 };
      const n = c.hot,
        t = c.P;
      for (const o of ["life", "mana"])
        if (n[o + "T"] > 0) {
          const l = Math.min(A, n[o + "T"]);
          ((n[o + "T"] -= A),
            o === "life"
              ? (c.life = Math.min(t.life, c.life + n.life * l))
              : (c.mana = Math.min(t.mana, c.mana + n.mana * l)));
        }
      if (((c.potCd = c.potCd || { life: 0, mana: 0 }), r.potBuy !== !1))
        for (const o of [0, 1]) Ow(o);
      if (r.potOff) return;
      const e = (o, l) => C((r[o] ?? l) / 100, 0.05, 0.95),
        a = c.life < t.life * e("potHp", 50),
        i =
          c.mana < t.mana * e("potMp", 50) ||
          (t.main.cost > 0 && !t.main.costLife && c.mana < t.main.cost * 2);
      for (const [o, l] of [
        ["life", a],
        ["mana", i],
      ]) {
        const d = o === "life" && c.life < t.life * e("potUrg", 30);
        if (!l || c.potCd[o] > 0 || (n[o + "T"] > 0 && !d)) continue;
        const h = typeof N5 == "function" ? N5(o === "life" ? 0 : 1) : null,
          g = h ? null : Pd(o),
          f = h ? h.p : g || Q4(o);
        f && (Vl(o, f, h ? h.free : !!g), (c.potCd[o] = si));
      }
    },
    Ow = function (A) {
      const n = A ? "mana" : "life",
        t = typeof ci == "function" ? ci(A) : null;
      if (t ? (h1(t.kind)[t.tier] || 0) > 0 : Dd(n) > 0) return;
      let e = t && li(t) ? t : null;
      if (!e)
        for (const o of S.potions)
          o.kind === n &&
            r.lvl >= (Kt[o.tier] || 999) &&
            Rt(o) * Sn <= r.gold * 0.2 &&
            (!e || o.tier > e.tier) &&
            (e = o);
      if (!e) return;
      const a = Rt(e) * Sn;
      if (a > r.gold * 0.2) return;
      r.gold -= a;
      const i = h1(e.kind);
      ((i[e.tier] = (i[e.tier] || 0) + Sn),
        M(`Tự mua ${Sn} ${e.n} (-${j(a)} lượng)`));
    },
    Vl = function (A, n, t) {
      c.hot = c.hot || { life: 0, mana: 0, lifeT: 0, manaT: 0 };
      const e = c.hot;
      (t || (r.gold -= Rt(n)), (r.potUsed = (r.potUsed || 0) + 1), sn("pots"));
      const a = (i, o, l) => {
        const d = e[i + "T"] > 0 ? e[i] * e[i + "T"] : 0;
        ((e[i + "T"] = l), (e[i] = (d + o) / l));
      };
      n.kind === "both"
        ? (a("life", n.total, n.dur), a("mana", n.mtotal, n.mdur))
        : a(A, n.total, n.dur);
    },
    G4 = function (A) {
      const n = c.P ? c.P.series : -1;
      let t = null,
        e = 1e9;
      for (const a of A) {
        let i = F0(b, a) * (typeof Ka == "function" && Ka(a) ? 0.85 : 1);
        (Z0.g && !Yn(b.x, b.y, a.x, a.y) && (i = i * 2.5 + 200),
          i < e && ((e = i), (t = a)));
      }
      return t;
    },
    Ew = function (A) {
      if (r.rot === !1 || window.NO_ROT || (r.mainLock && r.main === "basic"))
        return [];
      const n = (r.slots || []).filter((e) => e > 0),
        t = A.actives.filter((e) => n.includes(e.id));
      return t.length < 2
        ? []
        : n.map((e) => t.find((a) => a.id === e)).filter(Boolean);
    },
    Iw = function (A, n) {
      const t =
        Is() && !Es(T[A.main.id], !!c.mounted) ? !c.mounted : !!c.mounted;
      c.rotNext = null;
      const e = n ? [] : Ew(A).filter((o) => Es(T[o.id], t)),
        a = (o) => !o.cd || ((c.skCd || {})[o.id] || 0) <= (c.clock || 0);
      if (e.length < 2) {
        if (a(A.main)) return L3(A.main) ? A.main : null;
        const o = A.actives
          .filter((l) => l !== A.main && a(l) && L3(l) && Es(T[l.id], t))
          .sort((l, d) => d.dps - l.dps)[0];
        return o && o.dps > A.basic.dps ? o : A.basic;
      }
      const i = e.length;
      c.rotI = (c.rotI || 0) % i;
      for (let o = 0; o < i; o++) {
        const l = e[(c.rotI + o) % i];
        if (a(l) && L3(l)) return ((c.rotNext = (c.rotI + o + 1) % i), l);
      }
      return e.some(a) ? null : A.basic;
    },
    K4 = function (A, n, t, e) {
      const a = A && A.geo;
      if (!a || !g9.has(+A.id) || a.k !== "fan" || !(a.n > 1) || !n) return 0;
      const i = (n.r || 12) / P1,
        o = Math.max(1, t + i);
      let l = 0;
      const d =
        a.offs ||
        Array.from(
          { length: a.n },
          (g, f) => -a.half + (f * 2 * a.half) / (a.n - 1),
        );
      for (const g of d)
        Math.cos(g) > 0 && Math.abs(Math.sin(g)) * o <= i && l++;
      const h = a.pierce ? a.n - 1 : a.n - e;
      return Math.max(0, Math.min(Math.min(m9, l) - 1, h));
    },
    Sw = function (A, n, t) {
      const e = (O) => ({ x: O.x / P1, y: (O.y * 2) / P1 }),
        a = (O) => (O.r || 12) / P1,
        i = e(b),
        o = e(n),
        l = A.geo,
        d = o.x - i.x,
        h = o.y - i.y,
        g = Math.hypot(d, h) || 1,
        f = d / g,
        m = h / g,
        w = t
          .filter((O) => O !== n && !O.dead)
          .map((O) => ({ e: O, p: e(O), r: a(O) })),
        p = (O, z, R) => Yn(O * P1, (z * P1) / 2, R.e.x, R.e.y),
        P = (O, z, R) =>
          w.filter(
            (Z) => Math.hypot(Z.p.x - O, Z.p.y - z) <= R + Z.r && p(O, z, Z),
          ),
        v = (O, z, R) =>
          O.sort(
            (Z, E0) =>
              Math.hypot(Z.p.x - z, Z.p.y - R) -
              Math.hypot(E0.p.x - z, E0.p.y - R),
          ),
        H = (O) => (O.p.x - i.x) * f + (O.p.y - i.y) * m,
        _ = (O) => Math.abs((O.p.x - i.x) * m - (O.p.y - i.y) * f);
      let E = [];
      const $ = Math.min(A.rad || 400, g + h9) + 40;
      switch (l.k) {
        case "line":
        case "wall": {
          const O = Math.min(Math.max(l.len, g), $),
            z = (l.k === "wall" ? l.w : 26) + l.area,
            R = w.filter((Z) => {
              const E0 = H(Z);
              return E0 >= 0 && E0 <= O && _(Z) <= z + Z.r && p(i.x, i.y, Z);
            });
          ((E = l.pierce
            ? R
            : l.k === "wall"
              ? v(R, i.x, i.y).slice(0, l.n - 1)
              : []),
            !l.pierce && l.area && (E = E.concat(P(o.x, o.y, l.area))));
          break;
        }
        case "fan":
        case "ring": {
          const O = Math.min(Math.max(l.len, l.k === "ring" ? 0 : g), $),
            z = w.filter((R) => {
              const Z = Math.hypot(R.p.x - i.x, R.p.y - i.y);
              if (Z > O + R.r) return !1;
              if (l.k === "fan") {
                const E0 = H(R) / (Z || 1);
                if (Math.acos(C(E0, -1, 1)) > l.half) return !1;
              }
              return p(i.x, i.y, R);
            });
          ((E = l.pierce ? z : v(z, i.x, i.y).slice(0, l.n - 1)),
            !l.pierce && l.area && (E = E.concat(P(o.x, o.y, l.area))));
          break;
        }
        case "self":
          E = P(i.x, i.y, l.r);
          break;
        case "spot": {
          l.r
            ? (E = P(o.x, o.y, l.r + l.scat))
            : l.n > 1 &&
              (E = v(P(o.x, o.y, l.scat), o.x, o.y).slice(0, l.n - 1));
          break;
        }
        default:
          E = [];
      }
      return [...new Set(E.map((O) => O.e))];
    },
    Nw = function (A, n, t, e) {
      const a = d6(A);
      if (!a) return;
      const i = a.rays || a.self ? b : n,
        o = a.rays ? Math.max(280, (A.rad || 0) + 40) : a.self ? 170 : 150,
        l =
          a.col && e
            ? e.filter((h) => !h.dead && h.hp > 0).slice(0, j3(A, a))
            : t
                .filter(
                  (h) => !h.dead && F0(i, h) < o && Yn(i.x, i.y, h.x, h.y),
                )
                .sort((h, g) => F0(i, h) - F0(i, g))
                .slice(0, j3(A, a));
      let d = !1;
      (a.self &&
        typeof An == "function" &&
        (a.noFx || An(b, A, a.n, null, a), (d = !0)),
        a.rays &&
          typeof An == "function" &&
          ((c.ev2Tg = l), An(n, A, null, b, a), (c.ev2Tg = null)),
        a.castFx &&
          typeof An == "function" &&
          An(b, A, null, null, { self: !0, fx: a.castFx }));
      for (const h of l) {
        if (a.chance && Math.random() >= a.chance) continue;
        const g = Wo(A, a),
          f = Object.assign({}, A, {
            parts: g,
            stun: a.stun || 0,
            useAR: !1,
            ev2: !0,
            crit: a.el === "phys" ? A.crit : 0,
          });
        (Pi(Hs(f, h), f),
          typeof An == "function" &&
            !a.self &&
            !d &&
            An(
              h,
              A,
              a.rays ? `${a.n} ×${j3(A, a)}` : a.n,
              a.rays ? b : null,
              a,
            ),
          (d = !0));
      }
      !d &&
        !a.chance &&
        !a.rays &&
        typeof An == "function" &&
        An(n, A, a.n, null, a);
    },
    Lw = function (A, n, t) {
      if (!r.sk[wa] || c.dash || c.town) return 0;
      const e = A.actives.find((d) => d.id === wa);
      if (
        !e ||
        ((c.skCd || {})[wa] || 0) > (c.clock || 0) ||
        !L3(e) ||
        t < 40 ||
        t > u9 ||
        !Yn(b.x, b.y, n.x, n.y)
      )
        return 0;
      (r6(e), ((c.skCd = c.skCd || {})[wa] = (c.clock || 0) + (e.cd || 2)));
      const a = n.x - b.x,
        i = n.y - b.y,
        o = Math.hypot(a, i) || 1,
        l = (n.r || 12) + 14;
      return (
        (c.dash = {
          x0: b.x,
          y0: b.y,
          x1: n.x - (a / o) * l,
          y1: n.y - (i / o) * l,
          t: 0,
          tg: n,
          a: e,
        }),
        (b.face = a >= 0 ? 1 : -1),
        (b.dir = On(a, i)),
        (b.act = "run"),
        (b.actT = 0),
        (c.moveTo = null),
        ac + 0.12
      );
    },
    qw = function (A) {
      const n = c.dash;
      if (!n) return !1;
      n.t += A;
      const t = Math.min(1, n.t / ac);
      if (
        ((c.dashTrail = c.dashTrail || []).push({
          x: b.x,
          y: b.y,
          dir: b.dir,
          t: 0,
        }),
        (b.x = n.x0 + (n.x1 - n.x0) * t),
        (b.y = n.y0 + (n.y1 - n.y0) * t),
        t >= 1)
      ) {
        c.dash = null;
        const e = n.tg;
        (e && !e.dead && e.hp > 0 && Pi(Hs(n.a, e), n.a),
          (b.act = "at"),
          (b.actT = 0),
          n.a.id && Rc(n.a.id));
      }
      return !0;
    },
    jw = function (A) {
      const n = !S1(),
        t = c.clock || 0,
        e = c.tgtBan || (c.tgtBan = new Map());
      let a = A;
      if (n && r.mode === "quest" && typeof Ka == "function") {
        const f = A.filter(Ka);
        f.length && (a = f);
      }
      const i = sc();
      if (n && i !== "near")
        if (i === "lowhp") {
          const f = a.filter((m) => F0(b, m) < 520);
          if (f.length) {
            const m = Math.min(...f.map((w) => w.hp / (w.max || w.hp || 1)));
            a = f.filter((w) => w.hp / (w.max || w.hp || 1) <= m + 0.08);
          }
        } else {
          const f = p9[i],
            m = Math.max(...a.map(f));
          m > 0 && (a = a.filter((w) => f(w) === m));
        }
      const o = a.filter((f) => !(e.get(f) > t)),
        l = o.length ? o : a,
        d = c.tgt,
        h = G4(l);
      if (d && !d.dead && d.hp > 0 && l.includes(d)) {
        const f = F0(b, d);
        if (
          (f < (c.tgtD ?? 1e9) - 25 && ((c.tgtD = f), (c.tgtHitT = t)),
          t - (c.tgtHitT ?? t) > 5 && l.length > 1)
        )
          e.set(d, t + 8);
        else if (!h || h === d || F0(b, h) > F0(b, d) * 0.5 - 40) return d;
      }
      const g =
        (d && l.includes(d) && e.get(d) > t && G4(l.filter((f) => f !== d))) ||
        h;
      if (
        g !== c.tgt &&
        ((c.tgt = g),
        (c.tgtHitT = t),
        (c.tgtD = g ? F0(b, g) : 1e9),
        e.size > 50)
      )
        for (const [f, m] of e) (m <= t || f.dead) && e.delete(f);
      return g;
    },
    zw = function () {
      const A = c.P;
      // Ưu tiên tìm kiếm và tấn công người chơi nếu ở chế độ PK hoặc đã chọn mục tiêu người chơi
      if (r.mode === "pk" || (c.playerTgt && c.playerTgt.hp > 0)) {
        if (typeof window.__volamidleOnline?.executePvPCombatTick === "function") {
          const pvpRes = window.__volamidleOnline.executePvPCombatTick();
          if (pvpRes !== false) {
            return typeof pvpRes === "number" ? pvpRes : 0.25;
          }
        }
      }
      const n = M1();
      if (!n.length) return 0.3;
      const t = fA() && c.manTgt && n.includes(c.manTgt) ? c.manTgt : jw(n);
      let e = Iw(A, t.cls === "boss" || t.cls === "elite" || !!t.goldBoss);
      if (!e) return 0.25;
      e.id === wa && (e = A.basic);
      const a = F0(b, t) - t.r / P1;
      {
        const g = Lw(A, t, a);
        if (g) return g;
      }
      if (a > e.rad + 300 && Is()) s2(!0, !0);
      else if (a <= e.rad + 60) {
        const g = I9(e);
        if (g === !0) return 0.25;
        g === null && (e = A.basic);
      }
      const i = r.closeAtk && !S1() ? Math.min(e.rad, 70) : e.rad;
      if (a > i || !Yn(b.x, b.y, t.x, t.y))
        return (
          (c.moveTo = S1() && !(fA() && c.manTgt === t) ? null : t),
          0.05
        );
      ((c.moveTo = null),
        (c.tgtHitT = c.clock || 0),
        (c.tgtD = 0),
        r6(e),
        e.cd && ((c.skCd = c.skCd || {})[e.id] = (c.clock || 0) + e.cd),
        c.rotNext != null && ((c.rotI = c.rotNext), (c.rotNext = null)));
      const o = e.around ? b : t,
        l = e.around ? e.rad + 40 : 110,
        d = e.geo
          ? Sw(e, t, n)
          : n
              .filter(
                (g) =>
                  g !== t &&
                  F0(o, g) < (e.targets > 1 ? l : 0) &&
                  Yn(o.x, o.y, g.x, g.y),
              )
              .slice(0, e.targets - 1);
      d.unshift(t);
      const h = typeof a0 < "u" && a0.f[e.id] && a0.f[e.id].meleeFly;
      for (const g of d) Pi(Hs(e, g), e);
      {
        const g = K4(e, t, a, d.length);
        for (let f = 0; f < g && !t.dead && t.hp > 0; f++) Pi(Hs(e, t), e);
      }
      return (
        Rs(b, t, e),
        (typeof window.onHeroSkillCast == "function" && window.onHeroSkillCast(b, t, e)),
        e.ev && Nw(e, t, n, d),
        (b.face = t.x >= b.x ? 1 : -1),
        (b.dir = On(t.x - b.x, t.y - b.y)),
        (b.act = "at"),
        (b.actT = 0),
        e.id ? Rc(e.id) : Ai(yt() && yt().anim, "at", 0.4),
        1 / e.rate
      );
    },
    Xl = function (A, n) {
      if ((A.resBrkT > 0 && (A.resBrkT -= n), A.curse)) {
        const o = kn(A);
        o && o.regen < 0 && (A.hp += o.regen * 2 * n);
      }
      {
        const o = c.clock || 0;
        if (A._lh != null && A.hp < A._lh)
          ((A._lt = o),
            A.hr &&
              Math.random() < 0.3 &&
              (A.atkCd = Math.max(A.atkCd, Math.min(0.6, (A.hr / 100) * 0.4))));
        else if (A.lr && A.hp < A.max && o - (A._lt || 0) > 5) {
          const l = C((A.lr[0] + A.lr[1] * A.L) / (100 * A.L + 100), 0, 0.03);
          l > 0 && (A.hp = Math.min(A.max, A.hp + A.max * l * n));
        }
        A._lh = A.hp;
      }
      if (A.stun > 0) {
        A.stun -= n;
        return;
      }
      const t = A.slowT > 0 ? ((A.slowT -= n), e2) : 1;
      if (
        (A.poison > 0 && ((A.poison -= n), (A.hp -= A.poisonDmg * n)),
        A.home && y9(A, n))
      )
        return;
      const e = (typeof hh == "function" && hh(A)) || b,
        a = F0(A, e),
        i = A.ranged
          ? A.reach || 200
          : Math.max((A.r + 24) / P1, Math.min(A.reach || 0, 90));
      ((A.face = e.x >= A.x ? 1 : -1),
        (A.dir = On(e.x - A.x, e.y - A.y)),
        (A.seeT = (A.seeT || 0) - n) <= 0 &&
          ((A.seeT = 0.25), (A.see = a > i + 4 || Yn(A.x, A.y, e.x, e.y))),
        (A.moving = A.sid != null ? !!A.smv : a > i || !A.see),
        A.moving && A.sid == null && mg(A, e.x, e.y, A.spd * t * n),
        A.home && k9(A),
        (A.atkCd -= n * t),
        a <= i + 4 &&
          A.see &&
          A.atkCd <= 0 &&
          ((A.atkCd =
            A.cd *
            (A.curse && typeof kn == "function"
              ? 1 + ((kn(A) || {}).slow || 0) / 100
              : 1)),
          e === b ? Tw(A) : py(e, A),
          (A.act = "at"),
          (A.actT = 0),
          Ai(A.animKey || r0[A.tid].anim, "at", 0.35),
          A.ranged && s5(A, e, { parts: { phys: 1 } })));
    },
    Ul = function (A) {
      (wg(),
        sP(A),
        (c.sweepT = (c.sweepT || 0) + A) > 30 &&
          ((c.sweepT = 0),
          an(),
          typeof T2 == "function" && T2(),
          typeof Wa == "function" && Wa(),
          Fc(),
          kf(),
          Er(),
          _f()),
        c.dirty && u0());
      const n = c.P;
      if (c.deadT > 0) {
        ((c.deadT -= A),
          c.deadT <= 0 &&
            ((c.life = n.life), (c.mana = n.mana), (r.wave = 1), a2() || z4()));
        return;
      }
      if (
        ((c.life = Math.min(n.life, c.life + n.regen * A)),
        (c.mana = Math.min(n.mana, c.mana + n.manaRegen * A)),
        Cw(A),
        E9(A),
        c.hpDotT > 0)
      ) {
        const e = Math.min(A, c.hpDotT) / c.hpDotT;
        ((c.life -= c.hpDot * e), (c.hpDot -= c.hpDot * e), (c.hpDotT -= A));
      }
      if (
        (c.slowT > 0 && (c.slowT -= A),
        c.stunT > 0 && (c.stunT -= A),
        c.hurtT > 0 && (c.hurtT -= A),
        c.tpCd > 0 && (c.tpCd -= A),
        c.potCd &&
          ((c.potCd.life = Math.max(0, c.potCd.life - A)),
          (c.potCd.mana = Math.max(0, c.potCd.mana - A))),
        xD(A),
        OD(A),
        typeof ih == "function" && ih(A),
        tv(A),
        typeof D6 == "function" && D6(A),
        typeof othTick == "function" && othTick(A),
        c.town)
      ) {
        uD(A);
        return;
      }
      (IP(A), (c.activeT = (c.activeT || 0) + A));
      const t = Xm(A);
      if (
        ((window.MPMON && window.MPMON.tick(A)) || (a2() && b9(A)),
        !c.enemies.length)
      ) {
        if (a2()) return;
        if (t && c.lootWait < 8) {
          c.lootWait += A;
          return;
        }
        if (c.spawnT > 0) {
          c.spawnT -= A;
          return;
        }
        ((c.lootWait = 0), c.dg ? EP() : c.tower ? MD() : (z4(), _d() && Md()));
        return;
      }
      if (c.dashTrail) {
        for (const e of c.dashTrail) e.t += A;
        ((c.dashTrail = c.dashTrail.filter((e) => e.t < 0.3)),
          c.dashTrail.length || (c.dashTrail = null));
      }
      if (qw(A)) {
        for (const e of M1()) Xl(e, A);
        Jl();
        return;
      }
      const hasPvpTarget = (c.playerTgt && c.playerTgt.hp > 0) || (r.mode === "pk" && !c.town);
      (S1() && dd(A),
        (t && c.pickTarget) ||
          (!hasPvpTarget && fA() && !(c.manTgt && !c.manTgt.dead && c.manTgt.hp > 0)
            ? (c.manTgt = null)
            : (S1() && !(fA() && c.manTgt) && !c.moveTo?._isPvpTarget) ||
              (fA() &&
              c.manTgt &&
              !hasPvpTarget &&
              c.moveTo === c.manTgt &&
              !K.target &&
              !K.active
                ? c.stunT > 0 ||
                  Ce(
                    b,
                    c.manTgt.x,
                    c.manTgt.y,
                    150 * i2() * (c.slowT > 0 ? e2 : 1) * A,
                  )
                : c.moveTo &&
                  (c.moveTo.hp > 0 || c.moveTo._isPvpTarget) &&
                  !t &&
                  (c.stunT > 0 ||
                    Ce(
                      b,
                      c.moveTo.x,
                      c.moveTo.y,
                      150 * i2() * (c.slowT > 0 ? e2 : 1) * A,
                    ))),
          !(c.stunT > 0) &&
            !(fA() && !c.manTgt && !hasPvpTarget) &&
            ((c.atkT -= A * (c.slowT > 0 ? e2 : 1)),
            c.atkT <= 0 && (c.atkT = zw()))));
      for (const e of M1()) Xl(e, A);
      (Jl(), (c.stall += A), c.stall > 45 && Qw(), c.life <= 0 && Rw());
    },
    Qw = function () {
      if (((c.stall = 0), c.dg)) return;
      if (c.tower) {
        const n = M1().reduce((e, a) => e + Math.max(0, a.hp), 0),
          t = M1().reduce((e, a) => e + (a.max || 0), 0) || 1;
        if (c.stallHp == null || c.stallHp - n > t * 0.01) {
          c.stallHp = n;
          return;
        }
        (M(
          '<span class="bad">🗼 45 giây không gây được sát thương đáng kể (quái hồi máu nhanh hơn) — rời tháp.</span>',
        ),
          (c.stallHp = null),
          Ia(!1));
        return;
      }
      if (a2()) return;
      (c.enemies.some((n) => !n.dead && n.cls === "boss") || r.wave === T3
        ? (c.enemies.some((n) => n.goldBoss && !n.dead) && (Q().gbT = qd),
          M('<span class="dim">Đánh mãi không hạ được, gọi quái mới.</span>'),
          (r.wave = 1),
          (c.round = (c.round || 0) + 1),
          typeof vt == "function" && vt())
        : M('<span class="dim">Đợt quái kéo dài quá lâu, gọi đợt mới.</span>'),
        z4());
    },
    Jl = function () {
      (window.MPMON && window.MPMON.flush(),
        c.enemies.forEach(
          (A) =>
            A.hp <= 0 &&
            !A.dead &&
            ((A.dead = !0),
            // Quái đồng bộ từ server: chỉ người đã gây sát thương mới nhận thưởng
            (A.sid != null && !(A._myDmg > 0)) || Gw(A),
            Ai(r0[A.tid].anim, "die", 0.5),
            c.quiet || ((A.act = "die"), (A.actT = 0), c.corpses.push(A))),
        ));
      !a2() &&
        c.enemies.length &&
        c.enemies.every((A) => A.dead) &&
        ((c.enemies = []), Kw());
    },
    Gw = function (A) {
      (c.kills++,
        (r.totalKills = (r.totalKills || 0) + 1),
        (c.stall = 0),
        x9());
      const n = A.L - r.lvl,
        t = n < -10 ? 0.2 : n < -5 ? 0.6 : 1,
        e = R4(
          Yl(A.L) *
            tc(r.lvl, A.L) *
            (typeof ho == "function" ? ho() : 1) *
            ua[A.cls].xp *
            a6() *
            t *
            F4().rew,
        ),
        a = c.tower ? 0 : Math.round(Im(A) * F4().rew);
      ((r.gold += a),
        e >= 1 &&
          M(
            `<span class="xpl">Nhận được <b>${Math.round(e).toLocaleString("vi-VN")}</b> điểm kinh nghiệm</span>`,
          ),
        a > 0 && A.cls !== "boss" && r.goldMsg,
        a > 0 &&
          A.cls !== "boss" &&
          r.goldMsg !== !1 &&
          M(`<span class="gdl">Nhặt được <b>${j(a)}</b> lượng</span>`),
        tp(A.x, A.y, m0[A.series]));
      for (const o of q6(A)) D4(o, A);
      for (const o of _w(A))
        r.matMsg !== !1 && M(`Nhặt được <b style="color:#7fd0ff">${D(o)}</b>`);
      const i = bu(A);
      (i && (D4(i, A), M(`<b style="color:${b0[i.r]}">${D(i.n)}</b> rơi ra!`)),
        A.cls === "boss" &&
          M(
            `Hạ <b class="boss">${D(A.n)}</b>${a > 0 ? ` (+${j(a)} lượng)` : ""}`,
          ),
        LD(A),
        iP(A, a),
        uP(A),
        nv(A),
        nm(A));
    },
    R4 = function (A) {
      const n = Y2();
      if (r.lvl >= n) return 0;
      const t =
        A *
        Yt *
        (1 + (r.tanthuXp && !(D0() > 0) ? +r.tanthuXp : 0)) *
        (1 + hi().xp + (c.P && c.P.expPct ? c.P.expPct / 100 : 0)) *
        (1 + h2("xp")) *
        (1 + h2("tt"));
      for (r.xp += t; r.lvl < n && r.xp >= S.exp[r.lvl - 1];)
        ((r.xp -= S.exp[r.lvl - 1]),
          r.lvl++,
          (r.attrPts += K2),
          (r.skPts += Qo),
          (c.dirty = !0),
          i0("levelup"),
          M(
            `<b class="up">Lên cấp ${r.lvl}!</b> +${K2} tiềm năng, +${Qo} kỹ năng`,
          ),
          typeof Sh == "function" && Sh());
      return t;
    },
    Kw = function () {
      if (c.dg) {
        SP();
        return;
      }
      if (c.tower) {
        HD();
        return;
      }
      if (
        (t2(c.P.life * 0.15, !0),
        (c.mana = Math.min(c.P.mana, c.mana + c.P.mana * 0.2)),
        r.wave < T3)
      ) {
        (r.wave++, (c.spawnT = 1.2 / P7()));
        return;
      }
      ((r.wave = 1),
        (c.round = (c.round || 0) + 1),
        sn("stages"),
        typeof vt == "function" && vt());
    },
    Rw = function () {
      if (
        (c.enemies.some((A) => A.goldBoss && !A.dead) && (Q().gbT = qd),
        (c.deadT = 999999), // Tạm dừng đếm lùi hồi sinh tự động tại chỗ trong khi chờ chọn
        (c.life = 0),
        (c.enemies = []),
        rP(),
        (c.slowT = c.stunT = c.hpDotT = c.hpDot = 0),
        M('<span class="bad">Bạn đã trọng thương.</span>'),
        c.dg)
      ) {
        _7("Gục ngã");
        return;
      }
      if (c.tower) {
        Ia(!0);
        return;
      }
      typeof vt == "function" && vt();

      // Hiển thị dialog "Về Thành Dưỡng Sức"
      if (typeof window.showDeathDialog === "function") {
        window.showDeathDialog();
      } else if (typeof J === "function") {
        const modalHtml = `
          <div style="text-align:center;padding:12px 6px;">
            <div style="font-size:36px;margin-bottom:6px;">☠️</div>
            <h3 style="color:#ff4757;margin:0 0 8px;font-size:20px;letter-spacing:1px;">HIỆP KHÁCH TRỌNG THƯƠNG</h3>
            <p style="color:#dcdde1;font-size:14px;line-height:1.5;margin:0 0 16px;">
              Sinh lực đã cạn kiệt, không thể tiếp tục chiến đấu.<br>
              Hãy trở về thành thị an toàn để điều tức, hồi phục sinh lực và chỉnh đốn trang bị!
            </p>
            <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
              <button id="btnReturnTownDeath" class="btn" style="background:linear-gradient(135deg, #c0392b, #8e1b1b);color:#fff;border:1px solid #ff7675;padding:9px 20px;font-weight:bold;font-size:14px;border-radius:6px;cursor:pointer;box-shadow:0 0 12px rgba(231,76,60,0.4);">
                🏛️ Về Thành Dưỡng Sức (Biện Kinh)
              </button>
            </div>
          </div>
        `;
        J(modalHtml, () => {
          const btn = document.getElementById("btnReturnTownDeath");
          if (btn) {
            btn.onclick = () => {
              if (typeof t0 === "function") t0(true);
              if (typeof window.respawnAtTown === "function") {
                window.respawnAtTown();
              } else {
                c.deadT = 0;
                if (c.P) {
                  c.life = c.P.life;
                  c.mana = c.P.mana;
                }
                if (typeof window.returnToTown === "function") {
                  window.returnToTown(true, "Về thành dưỡng sức · Hồi phục hoàn toàn");
                }
              }
            };
          }
        }, true);
      }
    },
    u0 = function () {
      typeof w6 == "function" && w6();
      const A = c.P ? c.life / c.P.life : 1,
        n = c.P ? c.mana / c.P.mana : 1;
      ((c.P = I0()),
        (c.life = Math.min(c.P.life, c.P.life * A)),
        (c.mana = Math.min(c.P.mana, c.P.mana * n)),
        (c.power = typeof k < "u" && k.ban ? 0 : bg(N0(c.P))),
        (c.dirty = !1));
      const t = E8();
      if (
        (c.padEqt !== t &&
          ((c.padEqt = t),
          typeof MA == "function" && document.querySelector("#pad") && MA()),
        typeof Sc == "function" && (c.look = Sc()),
        typeof u5 == "function")
      ) {
        const e = c.jx && c.jx.key;
        ((c.jx = Zs() ? u5() : null), c.jx && c.jx.key !== e && qc());
      }
    },
    Qk = function (A, n = 0.05) {
      const t = c.quiet;
      c.quiet = !0;
      for (let e = 0; e < A; e += n) Ul(n);
      c.quiet = t;
    },
    c = {
      corpses: [],
      lootWait: 0,
      ground: [],
      pickTarget: null,
      enemies: [],
      P: null,
      life: 1,
      mana: 1,
      atkT: 0,
      deadT: 0,
      spawnT: 0,
      kills: 0,
      t0: Date.now(),
      logs: [],
      fx: [],
      txt: [],
      dirty: !0,
      stall: 0,
      farm: 0,
    },
    k0 = { w: 400, h: 520, top: 70, bot: 470 },
    b = { x: 768, y: 768, face: 1 },
    dA = (s) => Math.min(B0.length - 1, Math.floor((s - 1) / bn)),
    Hn = H0.zalt || {},
    V0 = (s) => {
      const A = dA(s),
        n = r && r.zalt && r.zalt[A];
      return (n && Hn[A] && Hn[A][n - 1]) || B0[A];
    },
    Yw = (s) => ((s - 1) % bn) + 1,
    Gt = 3,
    it = 0.1,
    Y4 = 1.5,
    e2 = 0.5,
    Wl = 0,
    Zl = 0.5,
    Fw = { boss: 0.1, elite: 0.05 },
    Vw = 0.6,
    ua = {
      normal: { hp: 1, dmg: 1, xp: 1, r: 17 },
      elite: { hp: 2.5, dmg: 1.3, xp: 3, r: 21 },
      boss: { hp: 14, dmg: 1.7, xp: 20, r: 30 },
    },
    Xw = [
      {
        n: "Dễ",
        hp: 0.75,
        dmg: 0.7,
        rew: 0.8,
        d: "Quái yếu hơn (máu −25%, sát thương −30%), thưởng −20%",
      },
      { n: "Thường", hp: 1, dmg: 1, rew: 1, d: "Cân bằng chuẩn" },
      {
        n: "Khó",
        hp: 1.4,
        dmg: 1.35,
        rew: 1.25,
        d: "Quái mạnh hơn (máu +40%, sát thương +35%), thưởng +25%",
      },
    ],
    F4 = () => Xw[1],
    Uw = [
      [1, 1],
      [10, 1.1],
      [30, 1.8],
      [60, 3.5],
      [90, 12],
      [120, 20],
      [150, 28],
      [200, 40],
    ],
    Jw = [
      [1, 1],
      [30, 1.3],
      [60, 1.45],
      [90, 1.7],
      [120, 2.2],
      [200, 2.8],
    ],
    Gk = (s) => Math.pow(V4(Uw, s), 0.4),
    V4 = (s, A) => {
      for (let n = 1; n < s.length; n++)
        if (A <= s[n][0]) {
          const [t, e] = s[n - 1],
            [a, i] = s[n];
          return e + ((i - e) * (A - t)) / (a - t);
        }
      return s[s.length - 1][1];
    },
    Ac = [
      [10, 50, 3, 0],
      [20, 122, 8, 10],
      [30, 270, 30, 20],
      [40, 900, 35, 30],
      [50, 1450, 60, 40],
      [60, 2100, 48, 50],
      [70, 2950, 54, 60],
      [80, 3500, 58, 70],
      [90, 5050, 11, 80],
      [100, 6450, 11, 90],
    ],
    Kk = [
      [10, 10, 3, 0],
      [20, 50, 4, 10],
      [30, 100, 5, 20],
      [40, 250, 5, 30],
      [50, 400, 5, 40],
      [60, 500, 5, 50],
      [70, 600, 5, 60],
      [80, 700, 5, 70],
      [90, 800, 5, 80],
      [100, 900, 5, 90],
    ],
    Rk = [
      [10, 10, 0, 0],
      [20, 50, 3, 10],
      [30, 100, 5, 20],
      [40, 150, 5, 30],
      [50, 200, 5, 40],
      [60, 300, 5, 50],
      [70, 400, 5, 60],
      [80, 500, 5, 70],
      [90, 600, 5, 80],
      [100, 800, 10, 90],
    ],
    Yk = [
      [10, 3, 0.3, 0],
      [20, 8, 0.3, 10],
      [30, 13, 0.4, 20],
      [40, 20, 0.5, 30],
      [50, 29, 0.5, 40],
      [60, 39, 0.6, 50],
      [70, 50, 0.7, 60],
      [80, 65, 0.8, 70],
      [90, 85, 0.9, 80],
      [100, 112, 1, 90],
    ],
    Ww = 1,
    Zw = [
      [1, 0.2],
      [10, 0.2],
      [30, 0.24],
      [60, 0.2],
      [90, 0.19],
      [120, 0.15],
      [150, 0.17],
      [200, 0.17],
    ],
    X4 = (s) => V4(Zw, s),
    Fk = 25,
    nc = 30,
    A9 = 6,
    n9 = 1,
    Vk = (s) => (s <= nc ? 1 : 1 + A9 * Math.pow((s - nc) / 120, n9)),
    tc = (s, A) => {
      const n = s - A;
      return n <= 5 ? 1 : n <= 15 ? (295 - 19 * n) / 200 : 1 / 20;
    },
    t9 = 14,
    e9 = [40, 70],
    Xk = 0.4,
    a9 = (s) => 1,
    Uk = (s) => a9(s) / $w(),
    U4 = {
      1: 100,
      2: 320,
      53: 75,
      102: 360,
      122: 300,
      153: 400,
      164: 470,
      165: 400,
      196: 180,
      197: 180,
      198: 180,
      200: 180,
      201: 180,
      233: 270,
      234: 180,
      235: 450,
      236: 360,
      237: 300,
      238: 72,
      239: 400,
      240: 320,
      241: 180,
      242: 72,
    },
    s9 = 320,
    i9 = [3, 0, 4, 2, 1],
    r9 = 70,
    o9 = (s) =>
      s
        ? (s._serN == null &&
            (s._serN = new Set(
              (s.m || []).filter((A) => r0[A]).map((A) => _3(A)),
            ).size),
          s._serN)
        : 5,
    l9 = 6,
    c9 = 8,
    d9 = 4,
    J4 = 1,
    ec = 0.75,
    f9 = [
      [5, 2, 3, 1],
      [10, 3, 4, 1],
      [20, 4, 5, 2],
      [30, 5, 6, 3],
      [45, 5, 7, 3],
      [999, l9, c9, d9],
    ],
    W4 = () => f9.find((s) => (r.lvl | 0) <= s[0]),
    $s = (s) => (s && s.dens ? J4 : 1),
    Kt = [0, 1, 1, 1, 1, 1],
    Rt = (s) => Math.round(s.price * (1 + r.lvl / 25)),
    M1 = () => c.enemies.filter((s) => s.hp > 0),
    h9 = 160,
    g9 = new Set([336, 341, 342, 128, 165]),
    m9 = 99,
    wa = 40,
    u9 = 200,
    ac = 0.18,
    w9 = [
      ["near", "Gần nhất"],
      ["hk", "Boss Hoàng Kim"],
    ],
    sc = () =>
      r.tgtPri === "near" ? "near" : r.tgtPri || r.bossFirst ? "hk" : "near",
    ic = (s) => s.cls === "boss" || !!s.goldBoss,
    p9 = {
      hk: (s) => (s.goldBoss ? 2 : s.cls === "boss" ? 1 : 0),
      boss: (s) => (ic(s) ? 2 : s.cls === "elite" ? 1 : 0),
      elite: (s) => (ic(s) || s.cls === "elite" ? 1 : 0),
      series: (s) => (a1(j0(), s.series) ? 1 : 0),
    },
    Yt = 100,
    D9 = function (A, n) {
      const t = c.bgImg;
      if (!t || !t.complete || !t.naturalWidth) return !1;
      if ($n.key !== t.src)
        try {
          const l = Math.ceil(t.naturalWidth / 16),
            d = Math.ceil(t.naturalHeight / 16),
            h = document.createElement("canvas");
          ((h.width = l), (h.height = d));
          const g = h.getContext("2d");
          (g.drawImage(t, 0, 0, l, d),
            ($n.d = g.getImageData(0, 0, l, d)),
            ($n.key = t.src),
            ($n.k = l / M0.w));
        } catch {
          (($n.key = t.src), ($n.d = null));
        }
      const e = $n.d;
      if (!e) return !1;
      const a = Math.floor(A * $n.k),
        i = Math.floor(n * $n.k);
      if (a < 0 || i < 0 || a >= e.width || i >= e.height) return !0;
      const o = (i * e.width + a) * 4;
      return e.data[o] + e.data[o + 1] + e.data[o + 2] < 75;
    },
    P9 = function (A, n, t) {
      const e = [],
        a = Z0.g;
      for (let i = 0; i < A * 60 && e.length < A; i++) {
        let o, l;
        if (a) {
          const d = C0(0, a.gw * a.gh - 1);
          if (
            !a.ok[d] ||
            ((o = ((d % a.gw) + 0.5) * a.cw),
            (l = (Math.floor(d / a.gw) + 0.5) * a.ch),
            !_t(o, l))
          )
            continue;
        } else ((o = A0(150, M0.w - 150)), (l = A0(150, M0.h - 150)));
        e.some((d) => Math.hypot(d[0] - o, d[1] - l) < n) ||
          D9(o, l) ||
          (t && Math.hypot(t[0] - o, t[1] - l) < 220) ||
          e.push([o, l]);
      }
      return e;
    },
    v9 = function () {
      const A = V0(Math.min(r.stage, l0)),
        n = W4(),
        t = P9(M9 + 1, H9, [b.x, b.y]),
        e = [],
        a = new Set();
      for (; a.size < Math.min(4, t.length - 1);) a.add(C0(1, t.length - 1));
      const i = A.m.slice().sort(() => Math.random() - 0.5);
      (t.forEach(([l, d], h) => {
        if (h === 0) {
          e.push({ x: l, y: d, cls: "boss", tid: A.boss, t: _9 });
          return;
        }
        const g =
            (A.lo || 0) >= O9
              ? C0(5, 7)
              : Math.max(2, Math.round(C0(n[1], n[2]) / 2)),
          f = C0(0, i.length - 1);
        for (let m = 0; m < g; m++) {
          const w = i[(f + m) % i.length],
            [p, P] = K0(l + A0(-Ts, Ts), d + A0(-Ts, Ts) * 0.6);
          e.push({
            x: p,
            y: P,
            cls:
              m === 0 && (a.has(h) || Math.random() < 0.25)
                ? "elite"
                : "normal",
            tid: w,
            t: 0,
          });
        }
      }),
        (c.field = { key: lc(), pts: e, kills: 0 }),
        (c.enemies = c.enemies.filter(
          (l) => (l.goldBoss || l.sat || l.satG) && !l.dead,
        )));
      for (const l of c.field.pts) l.t <= 0 && rc(l);
      const o = A;
      o.id !== c.zoneShown &&
        ((c.zoneShown = o.id),
        (c.banner = { t: 2.4, text: o.n, sub: `Cấp ${o.lo}–${o.hi}` }),
        typeof vn == "function" && vn(o));
    },
    rc = function (A) {
      const n = zt(r.stage) + (A.cls === "boss" ? 1 : 0),
        t = zA(A.tid, n, A.cls, A.x, A.y);
      (A.cls === "normal" && ((t.dens = !0), (t.dmg *= ec)),
        (t.home = A),
        (t.aggro = !1),
        (t.wT = A0(0, 3)),
        (A.e = t),
        (A.t = 0),
        c.enemies.push(t),
        A.cls === "boss" &&
          ((t.n = $e(A.tid, V0(Math.min(r.stage, l0)).n)),
          M(`<b class="boss">${D(t.n)}</b> xuất hiện!`)));
    },
    b9 = function (A) {
      const n = c.field;
      if (
        !n ||
        n.key !== lc() ||
        (!c.enemies.length && n.pts.some((t) => t.e && !t.e.dead))
      ) {
        v9();
        return;
      }
      for (const t of n.pts) {
        if (
          (t.e &&
            t.e.dead &&
            ((t.e = null), (t.t = t.cls === "boss" ? oc : B9 / P7())),
          !t.e && t.cls === "boss" && t.t > 20)
        ) {
          const e = r.dt && r.dt.task;
          e &&
            e.t === "boss" &&
            e.tid === t.tid &&
            e.have < e.need &&
            (t.t = 20);
        }
        if (!t.e && (t.t -= A) <= 0) {
          if (Math.hypot(b.x - t.x, b.y - t.y) < 90) {
            t.t = 1;
            continue;
          }
          rc(t);
        }
      }
      ((c.enemies.length > 80 || c.enemies.some((t) => t.dead)) &&
        (c.enemies = c.enemies.filter((t) => !t.dead)),
        _d() && Md());
    },
    y9 = function (A, n) {
      const t = A.home,
        e = F0(b, A);
      if (
        ((A.agT = (A.agT || 0) - n) <= 0 &&
          ((A.agT = 0.4),
          e < (A.vis || $9) &&
            c.life > 0 &&
            Yn(A.x, A.y, b.x, b.y) &&
            (A.aggro = !0)),
        A.aggro)
      )
        return !1;
      if (A.backT > 0)
        return (
          (A.backT -= n),
          (A.moving = !0),
          Ce(A, t.x, t.y, A.spd * 1.6 * n),
          Math.hypot(t.x - A.x, t.y - A.y) < 12 && (A.backT = 0),
          !0
        );
      (A.wT -= n) <= 0 &&
        ((A.wT = A0(2, 5)),
        (A.wx = t.x + A0(-Cs, Cs)),
        (A.wy = t.y + A0(-Cs, Cs) * 0.6));
      const a = A.wx != null ? Math.hypot(A.wx - A.x, A.wy - A.y) : 0;
      return (
        (A.moving = a > 4),
        A.moving &&
          (Rn(
            A,
            A.x + ((A.wx - A.x) / a) * Math.min(a, A.spd * 0.4 * n),
            A.y + ((A.wy - A.y) / a) * Math.min(a, A.spd * 0.4 * n),
          ),
          (A.face = A.wx >= A.x ? 1 : -1),
          (A.dir = On(A.wx - A.x, A.wy - A.y))),
        !0
      );
    },
    k9 = function (A) {
      const n = A.home;
      !n ||
        !A.aggro ||
        A.cls === "boss" ||
        (F0(n, A) > T9 &&
          F0(b, A) > 200 &&
          ((A.aggro = !1),
          (A.backT = 6),
          (A.hp = A.max),
          (A.poison = 0),
          (A.slowT = 0)));
    },
    x9 = function () {
      const A = c.field;
      !A ||
        !a2() ||
        ++A.kills % C9 ||
        ((c.round = (c.round || 0) + 1),
        sn("stages"),
        typeof vt == "function" && vt());
    },
    B9 = 20,
    oc = 180,
    _9 = 60,
    M9 = 14,
    H9 = 300,
    Ts = 60,
    Cs = 50,
    $9 = 400,
    T9 = 700,
    C9 = 24,
    a2 = () => !c.dg && !c.tower && !c.town && !window.NO_FIELD,
    lc = () => `${Z0.key}|${V0(Math.min(r.stage, l0)).id}|${r.diff}|${D0()}`,
    $n = { key: null, d: null },
    O9 = 60,
    s2 = function (A, n) {
      return (
        (A = !!A && Ft()),
        !!c.mounted === A || (c.rideCd || 0) > 0
          ? !1
          : ((c.mounted = A),
            (c.rideCd = N9),
            (c.dirty = !0),
            Os(),
            !n && typeof i0 == "function" && i0("use"),
            !0)
      );
    },
    Z4 = function () {
      if (!Ft()) {
        y(
          r.eq.horse
            ? "Chưa đủ điều kiện cưỡi ngựa này"
            : "Chưa có ngựa: mặc ngựa ở ô Ngựa (thẻ Nhân vật)",
        );
        return;
      }
      ((c.rideCd = 0), s2(!c.mounted));
    },
    E9 = function (A) {
      if (
        (c.rideCd > 0 && (c.rideCd -= A),
        c.rideCan !== Ft() && ((c.rideCan = Ft()), Os()),
        !Ft())
      ) {
        c.mounted && ((c.mounted = !1), (c.dirty = !0), Os());
        return;
      }
      if (!Is() || c.deadT > 0) return;
      const n = c.enemies.some(
        (t) => !t.dead && (!t.home || t.aggro) && F0(b, t) < 400,
      );
      !c.mounted && !n && (b.moving || c.town) && s2(!0, !0);
    },
    I9 = function (A) {
      const n = T[A.id];
      return !n || Es(n) ? !1 : Is() ? (s2(!c.mounted, !0), !0) : null;
    },
    Os = function () {
      const A = typeof u == "function" && u("#rideBtn");
      A &&
        ((A.style.display = Ft() ? "" : "none"),
        (A.innerHTML =
          (c.mounted ? "Xuống ngựa" : "Lên ngựa") + " <small>(M)</small>"),
        A.classList.toggle("on", !!c.mounted));
    },
    S9 = {
      10: 1,
      11: 1,
      271: 1,
      318: 1,
      319: 1,
      29: 1,
      30: 1,
      31: 1,
      35: 1,
      41: 1,
      324: 1,
      323: 1,
      325: 1,
      347: 1,
      303: 1,
      47: 1,
      50: 1,
      54: 1,
      343: 1,
      345: 1,
      349: 1,
      249: 1,
      341: 1,
      339: 1,
      342: 1,
      351: 1,
      68: 1,
      71: 1,
      353: 1,
      85: 1,
      82: 1,
      385: 1,
      88: 1,
      91: 1,
      328: 1,
      380: 1,
      102: 1,
      105: 1,
      113: 1,
      108: 1,
      111: 1,
      336: 1,
      337: 1,
      122: 1,
      125: 1,
      128: 1,
      357: 1,
      359: 1,
      145: 1,
      138: 1,
      148: 1,
      362: 1,
      155: 1,
      158: 1,
      164: 1,
      165: 1,
      267: 1,
      365: 1,
      368: 1,
      179: 1,
      172: 1,
      176: 1,
      182: 1,
      372: 1,
      375: 1,
    },
    N9 = 0.6,
    L9 = (s) => (s && S9[s.id]) || 0,
    Es = (s, A = !!c.mounted) => {
      const n = L9(s);
      return n === 1 ? !A : n === 2 ? A : !0;
    },
    Ft = () => !!(r && r.eq && r.eq.horse && f0(r.eq.horse)),
    Is = () => r.autoRide !== !1 && !(typeof S1 == "function" && S1()),
    i2 = () => (c.P ? (c.mounted ? c.P.speed : c.P.speedFoot || c.P.speed) : 1),
    Ss = function () {
      return {
        v: e5,
        name: "Tân thủ",
        fac: null,
        sex: 0,
        lvl: 1,
        xp: 0,
        gold: 0,
        attrPts: 0,
        attr: { str: 0, dex: 0, vit: 0, eng: 0 },
        knbV: 2,
        skPts: 1,
        sk: {},
        main: 0,
        eq: {},
        inv: [],
        stage: 1,
        maxStage: 1,
        wave: 1,
        uid: 1,
        autoSell: 0,
        kps: 0.2,
        totalKills: 0,
        autoEquip: !0,
        autoPts: !1,
        diff: 1,
        autoForge: !0,
        autoBuy: !0,
        tut: 0,
        hints: {},
        bakAt: 0,
        potOff: !1,
        potUsed: 0,
        potStock: { life: {}, mana: {} },
        ctrl: "auto",
        joy: "fixed",
        slots: [0, 0, 0, 0],
        snd: { on: !0, vol: 0.7, music: !0, mvol: 0.4 },
        lootF: { minRar: 1, minLvl: 1, groups: [], series: [], auto: !0 },
        ground: [],
        mats: { ht: {}, ore: {}, shard: {}, misc: {} },
        last: Date.now(),
      };
    },
    cc = function (A) {
      let n = 3735928559,
        t = 1103547991;
      const e = V9 + A;
      for (let a = 0; a < e.length; a++) {
        const i = e.charCodeAt(a);
        ((n = Math.imul(n ^ i, 2654435761)),
          (t = Math.imul(t ^ i, 1597334677)));
      }
      return (
        (n =
          Math.imul(n ^ (n >>> 16), 2246822507) ^
          Math.imul(t ^ (t >>> 13), 3266489909)),
        (t =
          Math.imul(t ^ (t >>> 16), 2246822507) ^
          Math.imul(n ^ (n >>> 13), 3266489909)),
        (4294967296 * (2097151 & t) + (n >>> 0)).toString(36)
      );
    },
    J1 = function (A) {
      const n = JSON.stringify(A);
      return JSON.stringify({ d: n, h: cc(n) });
    },
    QA = function (A) {
      const n = JSON.parse(A);
      return n && typeof n.d == "string" && typeof n.h == "string"
        ? { state: JSON.parse(n.d), ok: cc(n.d) === n.h }
        : { state: n, ok: !0, legacy: !0 };
    },
    B = function () {
      if (!(Tn || !r || !r.fac)) {
        ((r.last = Date.now()), typeof U6 == "function" && c.ground && U6());
        try {
          const A = a5(),
            n = localStorage.getItem(A);
          if (n)
            try {
              QA(n).ok && localStorage.setItem(A + "_bak", n);
            } catch {}
          (localStorage.setItem(A, J1(r)),
            localStorage.setItem(Z1, String(nA)));
        } catch {}
        if (typeof window.saveHeroCloudRealtime === "function") {
          if (!window._rtSaveTimer) {
            window._rtSaveTimer = setTimeout(() => {
              window._rtSaveTimer = null;
              try {
                window.saveHeroCloudRealtime();
              } catch {}
            }, 800);
          }
        }
      }
    },
    A5 = function (A) {
      if (!A || !A.vio || !Array.isArray(A.mag)) return !1;
      const n = new Set(),
        t = A.mag.length;
      return (
        (A.mag = A.mag.filter((e) => e && !n.has(e.a) && n.add(e.a))),
        A.mag.forEach((e, a) => {
          e.pre = a % 2 === 0 ? 1 : 0;
        }),
        A.mag.length < t
      );
    },
    q9 = function (A) {
      const n = (o, l) => (l ? (mc.alt[o] || [])[l - 1] : mc.base[o]),
        t = (o) => [B0[o]].concat((typeof Hn < "u" && Hn[o]) || []),
        e = (o, l) => {
          const d = t(o).findIndex((h) => h && h.id === l);
          return d < 0 ? 0 : d;
        },
        a = A.dt && A.dt.task,
        i = !A.zmap2;
      if (((A.zmap2 = 1), i)) {
        if (A.zalt && typeof A.zalt == "object")
          for (const o in A.zalt) {
            const l = A.zalt[o] | 0;
            A.zalt[o] = l && B0[+o] ? e(+o, n(+o, l)) : 0;
          }
        a && a.zi != null && B0[a.zi] && (a.za = e(a.zi, n(a.zi, a.za | 0)));
      }
      if (a && a.zi != null && B0[a.zi]) {
        const o = t(a.zi)[a.za | 0] || B0[a.zi];
        (t(a.zi)[a.za | 0] || (a.za = 0),
          (a.zn = o.n),
          a.t === "boss" && a.tid !== o.boss
            ? (a.tid = o.boss)
            : a.t === "killm" &&
              !o.m.includes(a.tid) &&
              (a.tid = o.m.find((l) => r0[l]) || a.tid));
      }
    },
    n5 = function (A) {
      const n = Object.assign(Ss(), A);
      if (
        ((n.attr = Object.assign(
          { str: 0, dex: 0, vit: 0, eng: 0 },
          A.attr || {},
        )),
        A.knbV === 1 && (n.knb = Math.floor((n.knb | 0) / 10)),
        (n.knbV = 2),
        typeof ca == "function")
      ) {
        const a = r;
        r = n;
        try {
          for (const i of [...(n.inv || []), ...Object.values(n.eq || {})])
            ca(i);
        } catch {
        } finally {
          r = a;
        }
      }
      (n.mig73 || ((n.mig73 = 1), (n.autoForge = !0)),
        n.fac && !I[n.fac] && (n.fac = null));
      for (const a in n.sk)
        T[a] ||
          (((a >= 708 && a <= 717) || (a >= 1055 && a <= 1109)) &&
            (n.skPts = (n.skPts || 0) + (n.sk[a] | 0)),
          delete n.sk[a]);
      {
        const a = (A.mats || {}).misc || {},
          i = (a.bk120 | 0) + (a.bk150 | 0);
        i && ((a.bk90 = (a.bk90 | 0) + i), delete a.bk120, delete a.bk150);
      }
      if (!n.sk9Free) {
        n.sk9Free = 1;
        for (const a in n.sk)
          T[a] &&
            T[a].tier === 90 &&
            !(typeof xA == "function" && xA(a)) &&
            n.sk[a] > 0 &&
            (n.skPts = (n.skPts || 0) + 1);
      }
      ((n.stage = C(n.stage | 0 || 1, 1, l0 + 400)),
        delete n.push,
        (n.snd = Object.assign(
          { on: !0, vol: 0.7, music: !0, mvol: 0.4 },
          A.snd && "vol" in A.snd ? A.snd : {},
        )),
        (n.lootF = Object.assign(
          { minRar: 1, minLvl: 1, groups: [], series: [], auto: !0 },
          A.lootF || {},
        )),
        A.autoSell && !A.lootF && (n.lootF.minRar = A.autoSell));
      for (const a of n.inv.concat(
        Object.values(n.eq),
        (n.ground || []).map((i) => i && i.it),
      ))
        a && (a.mag || []).some((i) => i.pre === void 0) && (a.leg = !0);
      for (const a of n.inv.concat(Object.values(n.eq), n.epBox || [])) A5(a);
      (A.autoPtsOff || ((n.autoPts = !1), (n.autoPtsOff = 1)),
        (n.mats = {
          ht: Object.assign({}, (A.mats || {}).ht),
          ore: Object.assign({}, (A.mats || {}).ore),
          shard: Object.assign({}, (A.mats || {}).shard),
          misc: Object.assign({}, (A.mats || {}).misc),
        }),
        (n.rw = A.rw && typeof A.rw == "object" ? A.rw : {}),
        (n.lvl = C(Math.floor(+n.lvl) || 1, 1, R2)),
        (n.xp = Math.max(0, +n.xp || 0)),
        (n.gold = Number.isFinite(+n.gold) ? Math.max(0, +n.gold) : 0),
        (n.skPts = Math.max(0, Math.floor(+n.skPts) || 0)),
        (n.attrPts = Math.max(0, Math.floor(+n.attrPts) || 0)),
        (n.inv = (Array.isArray(n.inv) ? n.inv : [])
          .filter(
            (a) =>
              a &&
              typeof a == "object" &&
              Array.isArray(a.base) &&
              Array.isArray(a.mag),
          )
          .slice(0, Ko(n))));
      let t = 0;
      for (const a of n.inv.concat(Object.values(n.eq || {}), n.stable || []))
        a && a.uid > t && (t = a.uid);
      n.uid = Math.max(+n.uid || 1, t + 1);
      {
        const a = new Set();
        n.inv = n.inv.filter(
          (i) => (a.has(i.uid) && (i.uid = n.uid++), a.add(i.uid), !0),
        );
      }
      ((n.diff = [0, 1, 2].includes(+A.diff) ? +A.diff : 1),
        (n.hints = A.hints && typeof A.hints == "object" ? A.hints : {}),
        n.fac && !A.sexSet && (n.sex = F9.includes(n.fac) ? 1 : 0),
        n.fac && (n.sexSet = 1));
      const e = (a) => n.eq[a] && !X8(n.eq[a], n.sex);
      for (const a of Object.keys(n.eq || {}))
        !n.eq[a] || typeof n.eq[a] != "object"
          ? delete n.eq[a]
          : e(a) &&
            (n.inv.length < INV_MAX && n.inv.push(n.eq[a]), delete n.eq[a]);
      for (const a of n.inv.concat(
        Object.values(n.eq || {}),
        (n.ground || []).map((i) => i && i.it),
      ))
        a && a.set && /[\u3400-\u9fff]/.test(a.n) && (a.n = setNameVi(a.n));
      {
        const a =
          n.inv.length +
          Object.keys(n.eq || {}).length +
          (n.ground || []).length;
        n.inv = n.inv.filter((o) => !y3(o));
        for (const o of Object.keys(n.eq || {})) y3(n.eq[o]) && delete n.eq[o];
        n.ground = (n.ground || []).filter((o) => !(o && y3(o.it)));
        const i =
          a - (n.inv.length + Object.keys(n.eq || {}).length + n.ground.length);
        i > 0 && (window.SET_PURGED = window.SET_PURGED || []).push(i);
        try {
          window.GONE_FAC = typeof I < "u" && I[n.fac] ? I[n.fac].id : -1;
        } catch {
          window.GONE_FAC = -1;
        }
        for (const o of n.inv.concat(
          Object.values(n.eq || {}),
          n.ground.map((l) => l && l.it),
        ))
          Gn(o);
        for (const o of n.epBox || []) Gn(o);
        delete window.GONE_FAC;
        {
          const o = n.mats && n.mats.shard;
          if (o && typeof B8 == "function")
            for (const l of Object.keys(o)) {
              const d = (JX.sets.gold || []).find((m) => m.n === l);
              if (!d || (!B3.has(d.grp) && (z1(d) < 0 || G2.has(d.grp))))
                continue;
              let h = B8({ n: d.n, d: d.d, k: d.k, fac: z1(d) });
              const g = (window.RCP && RCP.shards) || {},
                f = (m) => M8(m) && (z1(m) >= 0 ? G2.has(m.grp) : tA(m));
              ((!h || !g[h.n]) &&
                (h =
                  (JX.sets.gold || []).find(
                    (m) =>
                      z1(m) === z1(d) &&
                      f(m) &&
                      g[m.n] &&
                      (!h || m.grp === h.grp),
                  ) ||
                  (JX.sets.gold || []).find(
                    (m) => z1(m) === z1(d) && f(m) && g[m.n],
                  )),
                h && (o[h.n] = (o[h.n] || 0) + o[l]),
                delete o[l]);
            }
        }
      }
      for (const a of n.inv.concat(
        Object.values(n.eq || {}),
        (n.ground || []).map((i) => i && i.it),
      ))
        a &&
          a.set &&
          a.set.kind === "platina" &&
          !/^\[/.test(a.n) &&
          (a.n = "[Bạch Kim] " + a.n);
      for (const a in n.sk)
        T[a] && T[a].book && ((n.bkOk || (n.bkOk = {}))[a] = 1);
      for (const a of n.inv.concat(Object.values(n.eq || {})))
        a && a.d === 10 && a.r === 3 && !a.vio && ((a.r = 2), (a.rareH = 1));
      for (const a of n.inv.concat(Object.values(n.eq || {}), n.epBox || []))
        a &&
          a.r === 2 &&
          !a.rareH &&
          a.d !== 10 &&
          (a.r = (a.mag || []).length ? 1 : 0);
      if (!n.sk9m) {
        n.skL = n.skL || {};
        for (const i in n.sk) {
          const o = T[i];
          o &&
            o.tier === 90 &&
            n.sk[i] > 0 &&
            ((n.skL[i] = { lv: n.sk[i], xp: 0 }),
            (n.skPts = (n.skPts || 0) + n.sk[i] - 1));
        }
        const a =
          (n.lvl || 1) + M3 * ((n.rw && n.rw.stat && n.rw.stat.reborn) || 0);
        for (const i in n.sk) {
          const o = T[i];
          if (!o || o.tier === 90) continue;
          const l = Math.max(1, Math.min(o.max, a - o.req + 1));
          n.sk[i] > l &&
            ((n.skPts = (n.skPts || 0) + n.sk[i] - l), (n.sk[i] = l));
        }
        n.sk9m = 1;
      }
      if ((n.eqRebuild | 0) < 2 && typeof jA == "function") {
        let a = 0,
          i = 0;
        const o = n.lvl || 1,
          l = (h) => {
            let g = typeof y0 == "function" ? y0(h) : 0;
            for (let f = 0; f < (h.enh || 0); f++)
              g +=
                (0.2 *
                  (1e3 + (h.lvl || 0) * 1e3 + (h.r || 0) * 2e3) *
                  Math.pow(1.8, f) *
                  (1 + o / 10)) /
                Math.max(0.35, 1 - 0.07 * f);
            return g;
          },
          d = (h) => (jA(h) ? ((a += l(h)), i++, !1) : !0);
        ((n.inv = (n.inv || []).filter(d)),
          (n.epBox = (n.epBox || []).filter(d)));
        for (const h in n.eq || {}) n.eq[h] && !d(n.eq[h]) && delete n.eq[h];
        if (n.mats && n.mats.shard && typeof ha < "u")
          for (const h in n.mats.shard) {
            const g = ha.get(h);
            (!g || !tA(g)) && delete n.mats.shard[h];
          }
        ((a = Math.min(5e8, Math.round(a))),
          a > 0 && (n.gold = (n.gold || 0) + a),
          i && (n.eqRebuildMsg = [i, a]),
          (n.eqRebuild = 2));
      }
      if (!n.horseEnhFix) {
        let a = 0;
        for (const i of (n.inv || []).concat(
          Object.values(n.eq || {}),
          n.epBox || [],
          n.stable || [],
        ))
          if (!(!i || i.d !== 10 || !(i.enh > 0))) {
            for (let o = 0; o < i.enh; o++)
              a +=
                ((1e3 + (i.lvl || 0) * 1e3 + (i.r || 0) * 2e3) *
                  Math.pow(1.8, o) *
                  (1 + (n.lvl || 1) / 10)) /
                Math.max(0.35, 1 - 0.07 * o);
            delete i.enh;
          }
        ((a = Math.round(a)),
          a > 0 && ((n.gold = (n.gold || 0) + a), (n.horseEnhBack = a)),
          (n.horseEnhFix = 1));
      }
      if (typeof SA == "function") {
        let a = 0,
          i = 0;
        const o = (l) =>
          SA(l) ? (typeof _8 == "function" && _8(l) ? i++ : a++, !1) : !0;
        ((n.inv = (n.inv || []).filter(o)),
          (n.epBox = (n.epBox || []).filter(o)),
          Array.isArray(n.stable) && (n.stable = n.stable.filter(o)));
        for (const l in n.eq || {}) n.eq[l] && !o(n.eq[l]) && delete n.eq[l];
        if (n.mats && n.mats.shard)
          for (const l in n.mats.shard) k3(l) && delete n.mats.shard[l];
        (a && (n.banMsg = a), i && (n.pjMsg = (n.pjMsg || 0) + i));
      }
      return (q9(n), (n.v = e5), n);
    },
    Ns = function (A) {
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
        return !e || !e.fac
          ? null
          : {
              fac: e.fac,
              lvl: e.lvl | 0 || 1,
              stage: e.stage | 0 || 1,
              last: e.last || 0,
              name: e.name || "",
              sex: e.sex | 0,
            };
      } catch {
        return null;
      }
    },
    j9 = function () {
      let A = null;
      try {
        A = localStorage.getItem(Z1);
      } catch {}
      const n = [...Array(W1).keys()].filter((a) => Ns(a));
      if (A === "menu") return { slot: n[0] ?? 0, menu: n.length > 0 };
      let t = null;
      try {
        t = sessionStorage.getItem("jxidle_in");
      } catch {}
      const e = +A;
      return A !== null && Number.isInteger(e) && e >= 0 && e < W1
        ? { slot: e, menu: t === null && n.length > 0 }
        : n.length > 0
          ? { slot: n[0], menu: !0 }
          : { slot: n[0] ?? 0, menu: !1 };
    },
    t5 = async function (A) {
      if (typeof g0 == "function" && g0() && k.user)
        try {
          await v0((n) =>
            n.from("saves").delete().eq("owner", k.user.id).eq("slot", A),
          );
        } catch (n) {
          y("Không xóa được trên đám mây: " + n.message);
          return;
        }
      Tn = !0;
      try {
        (localStorage.removeItem(UA(A)),
          localStorage.removeItem(UA(A) + "_bak"),
          localStorage.setItem(Z1, "menu"));
      } catch {}
      location.reload();
    },
    z9 = async function () {
      if ((B(), typeof g0 == "function" && g0() && k.user && r && r.fac))
        try {
          await rA();
        } catch {}
      Tn = !0;
      try {
        localStorage.setItem(Z1, "menu");
      } catch {}
      location.reload();
    },
    Q9 = function () {
      try {
        const A = localStorage.getItem(a5());
        if (A) {
          let n = QA(A);
          if (!n.ok) {
            const t = localStorage.getItem(a5() + "_bak");
            let e = null;
            try {
              e = t && QA(t);
            } catch {}
            (e && e.ok ? (n = e) : (n.state.tampered = 1),
              (window.__tampered = !0));
          }
          return ((r = n5(n.state)), !0);
        }
      } catch (A) {
        console.warn("Khong doc duoc file luu, tao moi", A);
      }
      return ((r = Ss()), !1);
    },
    G9 = function () {
      return (
        B(),
        JSON.stringify({
          game: "jxidle",
          v: e5,
          exported: Date.now(),
          fac: r.fac,
          lvl: r.lvl,
          data: J1(r),
        })
      );
    },
    dc = function () {
      const A = new Date(),
        n = (t) => String(t).padStart(2, "0");
      return `jxidle_${r.fac}_cap${r.lvl}_${A.getFullYear()}${n(A.getMonth() + 1)}${n(A.getDate())}_${n(A.getHours())}${n(A.getMinutes())}.jxsave`;
    },
    K9 = function () {
      if (!r.fac) return !1;
      const A = new Blob([G9()], { type: "application/json" }),
        n = document.createElement("a");
      return (
        (r.bakAt = Date.now()),
        B(),
        (n.href = URL.createObjectURL(A)),
        (n.download = dc()),
        document.body.appendChild(n),
        n.click(),
        setTimeout(() => {
          (URL.revokeObjectURL(n.href), n.remove());
        }, 1500),
        !0
      );
    },
    fc = function (A) {
      if (
        ((A = String(A || "")
          .trim()
          .replace(/^\uFEFF/, "")),
        !A)
      )
        throw new Error("File rỗng");
      let n;
      if (A[0] === "{") {
        const a = JSON.parse(A);
        if (a && a.game === "jxidle" && typeof a.data == "string") n = a.data;
        else if (a && typeof a.d == "string" && typeof a.h == "string") n = A;
        else throw new Error("Không phải file lưu của game");
      } else n = decodeURIComponent(escape(atob(A)));
      const t = QA(n);
      if (!t.ok) throw new Error("File đã bị chỉnh sửa (sai chữ ký)");
      const e = t.state;
      if (!e || typeof e != "object" || !e.fac || !I[e.fac] || !("lvl" in e))
        throw new Error("File không có nhân vật hợp lệ");
      return e;
    },
    hc = function (A, n) {
      const t = n5(n);
      ((t.last = Date.now()), (Tn = !0));
      try {
        const e = UA(A),
          a = localStorage.getItem(e);
        (a && localStorage.setItem(e + "_bak", a),
          localStorage.setItem(e, J1(t)),
          localStorage.setItem(Z1, String(A)));
      } catch {
        throw (
          (Tn = !1),
          new Error("Không ghi được (bộ nhớ trình duyệt đầy hoặc bị chặn)")
        );
      }
      return t;
    },
    R9 = function () {
      return (B(), btoa(unescape(encodeURIComponent(J1(r)))));
    },
    Jk = function (A) {
      const n = QA(decodeURIComponent(escape(atob(A.trim()))));
      if (!n.ok) throw new Error("Mã đã bị chỉnh sửa");
      const t = n.state;
      if (!t || typeof t != "object" || !("lvl" in t))
        throw new Error("Mã không hợp lệ");
      ((r = n5(t)), B(), (c.dirty = !0));
    },
    gc = function () {
      const A = Date.now(),
        n = (A - r.last) / 1e3;
      if (!(n >= 60) || !r.fac) return null;
      const t = (r.offDay =
          r.offDay && A - r.offDay.t0 < 864e5 && r.offDay.t0 <= A
            ? r.offDay
            : { t0: A, secs: 0 }),
        e = Math.min(Y9, n, Math.max(0, J9 - t.secs));
      if (e < 60) return null;
      t.secs += e;
      const a = e,
        i = Math.min(a, uc) + X9 * Math.max(0, a - uc),
        o = Math.floor(i * C(r.kps || 0.1, 0.02, 3) * U9);
      if (!o) return null;
      const l = zt(r.stage),
        d = r.lvl,
        h = Yl(l) * o * tc(r.lvl, l),
        g = Math.round(
          W6 * Z6({ L: l, cls: "normal" }) * (l >= 119 ? 0.5 : 1) * o * J4,
        );
      (R4(h * a6()),
        (r.gold += g),
        l >= r.lvl - 10 &&
          p6(o, !0, c.P && c.P.main ? { [c.P.main.id]: 1 } : null));
      let f = 0,
        m = 0;
      const w = Math.min(30, Math.floor(o * 0.08 * J4));
      for (let P = 0; P < w; P++) {
        const v = q6({
          L: l,
          cls: Math.random() < 0.15 ? "elite" : "normal",
          bonusDrop: 1,
        })[0];
        v && (tn(v, !0) ? f++ : m++);
      }
      (an(), typeof T2 == "function" && T2(), Fc(), kf(), Er());
      const p = BD(a);
      return {
        secs: a,
        kills: o,
        xp: h,
        gold: g,
        lv0: d,
        lv1: r.lvl,
        got: f,
        sold: m,
        chests: p,
      };
    },
    e5 = 1,
    Y9 = 8 * 3600,
    W1 = 3,
    Z1 = "jxidle_slot",
    nA = 0,
    Tn = !1,
    UA = (s) => (s === 0 ? "jxidle" : "jxidle_" + (s + 1)),
    a5 = () => UA(nA),
    r,
    F9 = ["emei", "cuiyan"],
    V9 = "jx-idle-v1:",
    mc = {
      base: [
        2, 3, 7, 19, 21, 41, 90, 70, 92, 56, 122, 140, 224, 319, 320, 322, 336,
        340, 201, 205,
      ],
      alt: {
        1: [195],
        2: [43, 179],
        3: [193, 74, 145],
        4: [167],
        6: [68, 342, 341],
        8: [123],
        9: [93, 75],
      },
    },
    uc = 8 * 3600,
    X9 = 1,
    U9 = 0.7,
    J9 = 12 * 3600,
    wc = function () {
      const A = String(new Error().stack || "")
          .split(
            `
`,
          )
          .slice(3),
        n = location.origin;
      for (const t of A)
        if (!t.includes("guard.js") && t.includes(n)) return !0;
      return !1;
    },
    Ls = function (A, n) {
      const t = Date.now(),
        e = A + ":" + (n.k || "");
      (GA.sent[e] && t - GA.sent[e] < 10 * 6e4) ||
        ((GA.sent[e] = t),
        GA.q.push({
          kind: A,
          info: Object.assign(
            {
              lv: r && r.lvl,
              cs: r && r.rw && r.rw.stat ? r.rw.stat.reborn | 0 : 0,
              v: typeof Mo < "u" ? Mo : 0,
            },
            n,
          ),
        }),
        pc());
    },
    pc = async function () {
      if (!GA.q.length || typeof k > "u" || !k.user || typeof v0 != "function")
        return;
      const A = GA.q
        .splice(0, 20)
        .map((n) => ({
          owner: k.user.id,
          name: String((r && r.name) || "").slice(0, 30),
          kind: n.kind,
          info: n.info,
        }));
      try {
        await v0((n) => n.from("flags").insert(A));
      } catch {}
    },
    W9 = function () {
      if (!(typeof r > "u" || !r || r.__guard === r)) {
        for (const A of np) {
          let n = r[A];
          try {
            Object.defineProperty(r, A, {
              configurable: !0,
              enumerable: !0,
              get: () => n,
              set: (t) => {
                const e = n;
                n = t;
                const a = (+t || 0) - (+e || 0);
                a > 0 &&
                  ((A === "gold" && a < 5e4) ||
                    wc() ||
                    Ls("console", { k: A, from: e, to: t }));
              },
            });
          } catch {}
        }
        (Object.defineProperty(r, "__guard", {
          configurable: !0,
          enumerable: !1,
          value: r,
        }),
          (GA.base = null));
      }
    },
    Z9 = function () {
      if (
        typeof r > "u" ||
        !r ||
        !r.rw ||
        !r.rw.stat ||
        typeof r.rw.stat != "object"
      )
        return;
      const A = r.rw.stat;
      if (A.__guard === A) {
        GA.base = qs.map((n) => +A[n] || 0);
        return;
      }
      GA.base &&
        qs.forEach((n, t) => {
          (+A[n] || 0) - GA.base[t] > (n === "towerBest" ? 20 : 200) &&
            Ls("console", { k: n, from: GA.base[t], to: +A[n] || 0, swap: 1 });
        });
      for (const n of qs) {
        let t = A[n];
        try {
          Object.defineProperty(A, n, {
            configurable: !0,
            enumerable: !0,
            get: () => t,
            set: (e) => {
              const a = t;
              ((t = e),
                (+e || 0) - (+a || 0) > 0 &&
                  (wc() || Ls("console", { k: n, from: a, to: e })));
            },
          });
        } catch {}
      }
      (Object.defineProperty(A, "__guard", {
        configurable: !0,
        enumerable: !1,
        value: A,
      }),
        (GA.base = qs.map((n) => +A[n] || 0)));
    },
    Ap = function () {
      if (GA.f12 || matchMedia("(pointer: coarse)").matches) return;
      const A = window.outerWidth - window.innerWidth,
        n = window.outerHeight - window.innerHeight;
      (A > 200 || n > 260) &&
        ((GA.f12 = !0), Ls("f12", { k: "f12", w: A, h: n }));
    },
    np = ["gold", "knb", "lvl", "attrPts", "skPts"],
    GA = { sent: {}, q: [], f12: !1 },
    qs = ["towerBest", "bosses"];
  setInterval(() => {
    (W9(), Z9(), Ap(), pc());
  }, 2e3);
