var K1 = 10,
    C3 = 0.08,
    L8 = 0.05,
    O3 = 0.04,
    Ro = (s) => 1 + O3 * ((s && s.enh) || 0),
    He = (s) =>
      1 + C3 * ((s && s.enh) || 0) + L8 * ((s && !s.pv3 && s.plv) || 0),
    M0 = { w: 3072, h: 3072, pad: 20 },
    Yo = (s, A) => [
      C(s, M0.pad, M0.w - M0.pad),
      C(A, M0.pad + 30, M0.h - M0.pad),
    ],
    K0 = (s, A) => {
      const n = Yo(s, A);
      return typeof Z0 < "u" && Z0.g ? E3(n[0], n[1]) : n;
    },
    W0 = (s) => S.attr[s] || "#" + s,
    $e = (s, A) =>
      r0[s] && /^Tiểu Boss/i.test(r0[s].n)
        ? `Bá Chủ ${A || ""}`.trim()
        : r0[s]
          ? r0[s].n
          : "",
    Te = function (A) {
      const n =
        !window.NO_OBS &&
        window.JMO &&
        window.JMO[String(A === "town" ? H0.town.id : A)];
      if (((Z0.key = A), (Z0.g = null), !n)) return ((M0.w = M0.h = ug), !1);
      const t = atob(n.obs),
        e = new Uint8Array(t.length);
      for (let m = 0; m < t.length; m++) e[m] = t.charCodeAt(m);
      const a = n.gw * n.gh,
        i = new Uint8Array(a);
      for (let m = 0; m < a; m++) i[m] = (e[m >> 3] >> (m & 7)) & 1 ? 0 : 1;
      const o = new Int32Array(a).fill(-1),
        l = new Int32Array(a);
      let d = -1,
        h = 0,
        g = 0;
      const f = [];
      for (let m = 0; m < a; m++) {
        if (!i[m] || o[m] >= 0) continue;
        let w = 0,
          p = 0;
        for (l[p++] = m, o[m] = g; w < p;) {
          const P = l[w++],
            v = P % n.gw,
            H = (P / n.gw) | 0;
          for (let _ = -1; _ <= 1; _++)
            for (let E = -1; E <= 1; E++) {
              if (!E && !_) continue;
              const $ = v + E,
                O = H + _;
              if ($ < 0 || O < 0 || $ >= n.gw || O >= n.gh) continue;
              const z = O * n.gw + $;
              !i[z] ||
                o[z] >= 0 ||
                (E && _ && (!i[H * n.gw + $] || !i[O * n.gw + v])) ||
                ((o[z] = g), (l[p++] = z));
            }
        }
        (f.push(p), p > h && ((h = p), (d = g)), g++);
      }
      for (let m = 0; m < a; m++) i[m] = o[m] === d ? 1 : 0;
      if (
        ((Z0.g = {
          gw: n.gw,
          gh: n.gh,
          cw: n.cw,
          ch: n.ch,
          w: n.w,
          h: n.h,
          ok: i,
          free: h,
          comp: o,
          isl: f
            .map((m, w) => [w, m])
            .filter((m) => m[1] >= Math.max(300, h * 0.25))
            .sort((m, w) => w[1] - m[1])
            .map((m) => m[0]),
        }),
        (M0.w = n.w),
        (M0.h = n.h),
        typeof c < "u" && c.ground)
      )
        for (const m of c.ground) [m.x, m.y] = K0(m.x, m.y);
      return !0;
    },
    fg = function (A) {
      const n = Z0.g;
      if (!n || !n.isl || n.isl.length < 2) return !1;
      const t = n.isl[((A % n.isl.length) + n.isl.length) % n.isl.length];
      let e = 0,
        a = 0,
        i = 0;
      for (let o = 0; o < n.ok.length; o++)
        ((n.ok[o] = n.comp[o] === t ? 1 : 0),
          n.ok[o] && ((e += o % n.gw), (a += (o / n.gw) | 0), i++));
      return (
        (n.free = i),
        typeof kA < "u" && ((kA.cell = -1), (kA.g = null)),
        E3((e / i + 0.5) * n.cw, (a / i + 0.5) * n.ch)
      );
    },
    V2 = function (A, n) {
      const t = Z0.g;
      if (!t) return !0;
      const e = Math.floor(A / t.cw),
        a = Math.floor(n / t.ch);
      return (
        e >= 0 && a >= 0 && e < t.gw && a < t.gh && t.ok[a * t.gw + e] === 1
      );
    },
    E3 = function (A, n) {
      const t = Z0.g;
      if (!t || _t(A, n)) return [A, n];
      const [e, a] = Vo(C(A, 0, t.w - 1), C(n, 0, t.h - 1));
      for (let i = 1; i < Math.max(t.gw, t.gh); i++) {
        let o = 1e9,
          l = null;
        for (let d = -i; d <= i; d++)
          for (let h = -i; h <= i; h++) {
            if (Math.max(Math.abs(h), Math.abs(d)) !== i) continue;
            const g = (e + h + 0.5) * t.cw,
              f = (a + d + 0.5) * t.ch;
            if (!_t(g, f)) continue;
            const m = (g - A) ** 2 + (f - n) ** 2;
            m < o && ((o = m), (l = [g, f]));
          }
        if (l) return l;
      }
      return [t.w / 2, t.h / 2];
    },
    Rn = function (A, n, t) {
      return !Z0.g || _t(n, t)
        ? ((A.x = n), (A.y = t), !0)
        : _t(n, A.y)
          ? ((A.x = n), !0)
          : _t(A.x, t)
            ? ((A.y = t), !0)
            : !1;
    },
    Fo = function (A, n, t, e) {
      if (!Z0.g) return !0;
      const a = Math.hypot(t - A, e - n),
        i = Math.ceil(a / 8);
      for (let o = 1; o <= i; o++) {
        const l = o / i;
        if (!_t(A + (t - A) * l, n + (e - n) * l)) return !1;
      }
      return !0;
    },
    Yn = function (A, n, t, e) {
      if (!Z0.g) return !0;
      const a = Math.hypot(t - A, e - n),
        i = Math.ceil(a / 10);
      for (let o = 1; o < i; o++) {
        const l = o / i;
        if (!V2(A + (t - A) * l, n + (e - n) * l)) return !1;
      }
      return !0;
    },
    hg = function (A, n, t, e, a = 8e3) {
      const i = Z0.g;
      if (!i) return null;
      const o = C(Math.floor(A / i.cw), 0, i.gw - 1),
        l = C(Math.floor(n / i.ch), 0, i.gh - 1);
      let d = C(Math.floor(t / i.cw), 0, i.gw - 1),
        h = C(Math.floor(e / i.ch), 0, i.gh - 1);
      const g = (E, $) =>
        E >= 0 && $ >= 0 && E < i.gw && $ < i.gh && i.ok[$ * i.gw + E] === 1;
      if (!g(d, h)) {
        const [E, $] = E3(t, e);
        ((d = Math.floor(E / i.cw)), (h = Math.floor($ / i.ch)));
      }
      const f = (E, $) => $ * i.gw + E,
        m = new Map(),
        w = new Map([[f(o, l), 0]]),
        p = (E, $) => Math.hypot((E - d) * i.cw, ($ - h) * i.ch),
        P = [[p(o, l), o, l]],
        v = (E) => {
          P.push(E);
          let $ = P.length - 1;
          for (; $ > 0;) {
            const O = ($ - 1) >> 1;
            if (P[O][0] <= P[$][0]) break;
            (([P[O], P[$]] = [P[$], P[O]]), ($ = O));
          }
        },
        H = () => {
          const E = P[0],
            $ = P.pop();
          if (P.length) {
            P[0] = $;
            let O = 0;
            for (;;) {
              const z = 2 * O + 1,
                R = z + 1;
              let Z = O;
              if (
                (z < P.length && P[z][0] < P[Z][0] && (Z = z),
                R < P.length && P[R][0] < P[Z][0] && (Z = R),
                Z === O)
              )
                break;
              (([P[Z], P[O]] = [P[O], P[Z]]), (O = Z));
            }
          }
          return E;
        };
      let _ = 0;
      for (; P.length && _++ < a;) {
        const [, E, $] = H();
        if (E === d && $ === h) {
          const z = [];
          let R = f(E, $);
          for (; R !== void 0;)
            (z.push({
              x: ((R % i.gw) + 0.5) * i.cw,
              y: (Math.floor(R / i.gw) + 0.5) * i.ch,
            }),
              (R = m.get(R)));
          return z.reverse();
        }
        const O = w.get(f(E, $));
        for (let z = -1; z <= 1; z++)
          for (let R = -1; R <= 1; R++) {
            if (!R && !z) continue;
            const Z = E + R,
              E0 = $ + z;
            if (!g(Z, E0) || (R && z && (!g(E + R, $) || !g(E, $ + z))))
              continue;
            const S0 = O + Math.hypot(R * i.cw, z * i.ch);
            S0 < (w.get(f(Z, E0)) ?? 1e18) &&
              (w.set(f(Z, E0), S0),
              m.set(f(Z, E0), f(E, $)),
              v([S0 + p(Z, E0), Z, E0]));
          }
      }
      return null;
    },
    gg = function (A, n) {
      const t = Z0.g;
      if (!t) return null;
      const e = C(Math.floor(A / t.cw), 0, t.gw - 1),
        a = C(Math.floor(n / t.ch), 0, t.gh - 1),
        i = a * t.gw + e;
      if (kA.g === t && kA.cell === i) return kA.d;
      const o = t.gw * t.gh,
        l = kA.g === t && kA.d ? kA.d : new Int32Array(o);
      l.fill(-1);
      const d = kA.q && kA.q.length === o ? kA.q : (kA.q = new Int32Array(o));
      let h = 0,
        g = 0,
        f = i;
      if (!t.ok[f]) {
        const [m, w] = E3(A, n);
        f =
          C(Math.floor(w / t.ch), 0, t.gh - 1) * t.gw +
          C(Math.floor(m / t.cw), 0, t.gw - 1);
      }
      for (l[f] = 0, d[g++] = f; h < g;) {
        const m = d[h++],
          w = m % t.gw,
          p = (m / t.gw) | 0,
          P = l[m] + 1;
        for (let v = -1; v <= 1; v++)
          for (let H = -1; H <= 1; H++) {
            if (!H && !v) continue;
            const _ = w + H,
              E = p + v;
            if (_ < 0 || E < 0 || _ >= t.gw || E >= t.gh) continue;
            const $ = E * t.gw + _;
            l[$] >= 0 ||
              !t.ok[$] ||
              (H && v && (!t.ok[p * t.gw + _] || !t.ok[E * t.gw + w])) ||
              ((l[$] = P), (d[g++] = $));
          }
      }
      return ((kA.g = t), (kA.cell = i), (kA.d = l), l);
    },
    mg = function (A, n, t, e) {
      const a = Z0.g;
      if (!a) {
        const H = Math.hypot(n - A.x, t - A.y) || 1,
          _ = Math.min(1, e / H);
        ((A.x += (n - A.x) * _), (A.y += (t - A.y) * _));
        return;
      }
      const i = Math.hypot(n - A.x, t - A.y) || 1;
      if (i < 260 && Fo(A.x, A.y, n, t)) {
        const H = Math.min(1, e / i);
        Rn(A, A.x + (n - A.x) * H, A.y + (t - A.y) * H);
        return;
      }
      const o = gg(n, t);
      if (!o) return;
      const l = C(Math.floor(A.x / a.cw), 0, a.gw - 1),
        d = C(Math.floor(A.y / a.ch), 0, a.gh - 1),
        h = o[d * a.gw + l];
      if (h < 0) {
        const H = Math.min(1, e / i);
        Rn(A, A.x + (n - A.x) * H, A.y + (t - A.y) * H);
        return;
      }
      let g = h,
        f = l,
        m = d;
      for (let H = -1; H <= 1; H++)
        for (let _ = -1; _ <= 1; _++) {
          if (!_ && !H) continue;
          const E = l + _,
            $ = d + H;
          if (E < 0 || $ < 0 || E >= a.gw || $ >= a.gh) continue;
          const O = o[$ * a.gw + E];
          O < 0 ||
            O >= g ||
            (_ && H && (!a.ok[d * a.gw + E] || !a.ok[$ * a.gw + l])) ||
            ((g = O), (f = E), (m = $));
        }
      if (f === l && m === d) {
        const H = Math.min(1, e / i);
        Rn(A, A.x + (n - A.x) * H, A.y + (t - A.y) * H);
        return;
      }
      const w = (f + 0.5) * a.cw,
        p = (m + 0.5) * a.ch,
        P = Math.hypot(w - A.x, p - A.y) || 1,
        v = Math.min(1, e / P);
      Rn(A, A.x + (w - A.x) * v, A.y + (p - A.y) * v);
    },
    Ce = function (A, n, t, e) {
      if (!Z0.g) {
        const f = Math.hypot(n - A.x, t - A.y) || 1,
          m = Math.min(1, e / f);
        ((A.x += (n - A.x) * m), (A.y += (t - A.y) * m));
        return;
      }
      if (Fo(A.x, A.y, n, t)) {
        A._pp = null;
        const f = Math.hypot(n - A.x, t - A.y) || 1,
          m = Math.min(1, e / f);
        Rn(A, A.x + (n - A.x) * m, A.y + (t - A.y) * m)
          ? (A._stuck = 0)
          : (A._stuck = (A._stuck || 0) + 1);
        return;
      }
      const [a, i] = Vo(n, t),
        o = a + "," + i;
      (A._pk !== o || (!A._pp && (A._pr = (A._pr || 0) - 1) < 0)) &&
        q8 > 0 &&
        (q8--,
        (A._pp = hg(A.x, A.y, n, t)),
        (A._pk = o),
        (A._pi = 0),
        (A._pr = A._pp ? 0 : 30));
      const l = A._pp;
      if (!l || !l.length) return;
      for (
        ;
        A._pi < l.length - 1 &&
        Math.hypot(l[A._pi].x - A.x, l[A._pi].y - A.y) < 10;
      )
        A._pi++;
      const d = l[Math.min(A._pi, l.length - 1)],
        h = Math.hypot(d.x - A.x, d.y - A.y) || 1,
        g = Math.min(1, e / h);
      Rn(A, A.x + (d.x - A.x) * g, A.y + (d.y - A.y) * g);
    },
    Z0 = { g: null, key: null },
    ug = 3072,
    Vo = (s, A) => {
      const n = Z0.g;
      return [Math.floor(s / n.cw), Math.floor(A / n.ch)];
    },
    Xo = 9,
    _t = (s, A) => V2(s, A) && V2(s - Xo, A) && V2(s + Xo, A),
    kA = { g: null, cell: -1, d: null },
    q8 = 2,
    wg = () => {
      q8 = 2;
    },
    Fn = function (A, n, t, e = 1) {
      n = Tg[n] || n;
      const a = A[n] || (A[n] = [0, 0, 0]);
      for (let i = 0; i < 3; i++) a[i] += (t[i] || 0) * e;
    },
    X2 = function (A, n) {
      for (const t in n) if (n[t] === A) return t;
      return null;
    },
    Vn = function (A, n = r.eq) {
      if (A.leg || (A.set && A.d === 10) || o1(n)) return 3;
      const t = X2(A, n);
      if (!t) return 0;
      if (t === "horse") return 3;
      let e = G8(j0(), A.s) ? 1 : 0;
      for (const a of i6[t] || []) n[a] && G8(n[a].s, A.s) && e++;
      return e;
    },
    Uo = function () {
      const A = I[r.fac];
      return S.start[A.series * 2 + (r.sex || 0)] || S.start[0];
    },
    j0 = function () {
      return I[r.fac] ? I[r.fac].series : 0;
    },
    j8 = function (A) {
      const n = A.weapon;
      return n ? (n.d === 1 ? 7 : n.k === 6 ? 9 : n.k) : 9;
    },
    yn = function (A) {
      const n = c.P;
      return n ? (n.plusSkill || 0) + ((n.skAdd || {})[A] || 0) : 0;
    },
    Jo = function (A, n, t, e) {
      if (
        n === "addphysicsdamage_p" ||
        n === "attackratingenhance_p" ||
        n === "deadlystrikeenhance_p"
      ) {
        const a = A.attr.addphysicsdamage_p
          ? P0(A, "addphysicsdamage_p", 1)[2]
          : -1;
        if ([0, 1, 2, 3, 4, 5, 7, 9].includes(a)) return e === a;
      }
      return !0;
    },
    I0 = function (A) {
      A = A || r.eq;
      const n = {},
        t = r.lvl,
        e = j0(),
        a = S.levelAdd[e],
        i = Uo(),
        o = {},
        l = (q, U = 1) => {
          const G0 = H3(W0(q.a)),
            eA = q.p.map(($A, bt) =>
              $A === -1 ? 0 : bt < 2 && U !== 1 ? $A * U : $A,
            );
          if (G0 === "allskill_v") {
            const $A = Math.round(Math.max(0, q.p[0] || 0)),
              bt = q.p[2] > 0 ? q.p[2] : 0;
            bt ? (o[bt] = (o[bt] || 0) + $A) : Fn(n, G0, [$A, 0, 0]);
            return;
          }
          Fn(n, G0, eA);
        };
      let d = 0;
      for (const q in A) {
        const U = A[q];
        if (!U || !l6(U)) continue;
        const G0 = q === "horse" ? G(n, "fastwalkrun_p") : 0,
          eA = He(U);
        for (const [xe, Be, Dk] of U.base)
          Fn(n, W0(xe), [
            bi(U, (xe === 28 || xe === 29 ? Be : (Be + Dk) / 2) * eA),
            0,
            0,
          ]);
        const $A = Vn(U, A),
          bt = q === "horse" ? 1 : Ro(U),
          pk = (U.vio ? Cg : 1) * bt;
        if (
          ((U.mag || []).forEach((xe, Be) => {
            (Be % 2 === 0 || Math.floor(Be / 2) < $A) && l(xe, pk);
          }),
          U.set)
        ) {
          const xe = B4(U, A);
          (U.ext || []).slice(0, xe).forEach((Be) => l(Be, bt));
        }
        q === "horse" && (d = G(n, "fastwalkrun_p") - G0);
      }
      const h = j8(A),
        g = Math.round(G(n, "allskill_v")),
        f = { A: n, plusSkill: g, skAdd: o },
        m = (q) => r.sk[q] + g + (o[q] || 0);
      for (const q in r.sk) {
        const U = T[q];
        if (!U || !r.sk[q] || NA(U) || (typeof F3 == "function" && !F3(U)))
          continue;
        const G0 = m(q);
        for (const eA in U.attr) {
          if (o6.test(eA)) continue;
          const $A = P0(U, eA, G0);
          $A && Jo(U, eA, $A, h) && Fn(n, eA, $A);
        }
      }
      if (typeof rh == "function")
        for (const [q, U] of rh()) {
          const G0 = T[q];
          if (G0)
            for (const eA in G0.attr) {
              if (o6.test(eA)) continue;
              const $A = P0(G0, eA, U);
              $A && Jo(G0, eA, $A, h) && Fn(n, eA, $A);
            }
        }
      (ZD(n),
        fP(n),
        (f.rebDmg = 1 + hi().dmg),
        (f.dmgMul = f.rebDmg * Wg),
        (f.str = i.str + r.attr.str + G(n, "strength_v")),
        (f.dex = i.dex + r.attr.dex + G(n, "dexterity_v")),
        (f.vit = i.vit + r.attr.vit + G(n, "vitality_v")),
        (f.eng = i.eng + r.attr.eng + G(n, "energy_v")),
        (f.series = e),
        (f.life =
          (i.life +
            (t - 1) * (a.LifePerLevel + ng) +
            (f.vit - i.vit) * a.LifePerVitality +
            G(n, "lifemax_v")) *
          (1 + G(n, "lifemax_p") / 100)),
        (f.mana =
          (i.mana +
            (t - 1) * a.ManaPerLevel +
            (f.eng - i.eng) * a.ManaPerEnergy +
            G(n, "manamax_v")) *
          (1 + G(n, "manamax_p") / 100)),
        (f.life = Math.max(50, f.life)),
        (f.mana = Math.max(20, f.mana)),
        (f.regen =
          1 +
          t * 0.08 +
          G(n, "lifereplenish_v") +
          (f.life * G(n, "lifereplenish_p")) / 1e4),
        (f.manaRegen = 1 + t * 0.05 + G(n, "manareplenish_v") + f.eng * 0.02),
        (f.arBase =
          f.dex * 4 -
          28 +
          G(n, "attackrating_v") +
          G(n, "attackratingenhance_v")),
        (f.arPct = G(n, "attackratingenhance_p") + G(n, "attackrating_p")),
        (f.ar = Math.max(10, f.arBase * (1 + f.arPct / 100))),
        (f.newbie = Q8()),
        f.newbie &&
          ((f.regen += f.life * Wn.life), (f.manaRegen += f.mana * Wn.mana)),
        (f.def =
          Math.max(
            0,
            f.dex / 4 + G(n, "adddefense_v") + G(n, "armordefense_v"),
          ) *
          (1 + G(n, "armordefenseenhance_p") / 100)));
      const w = {
        phys: a.physicres,
        poison: a.poisonres,
        cold: a.coldres,
        fire: a.fireres,
        light: a.lightingres,
      };
      ((f.res = {}),
        (f.resMax =
          $8 +
          G(n, "allresmax_p") +
          T8 * (typeof D0 == "function" ? D0() : 0)));
      const p = C8 * (typeof D0 == "function" ? D0() : 0);
      f.resMaxE = {};
      for (const q of q0)
        f.resMaxE[q] = f.resMax + G(n, Lo[q].replace("res_p", "resmax_p"));
      for (const q of q0)
        f.res[q] = C(
          w[q] + G(n, Lo[q]) + G(n, "allres_p") + p,
          -100,
          f.resMaxE[q],
        );
      const P = A.weapon && l6(A.weapon) ? A.weapon : null,
        v = !!(P && P.d === 1),
        H = G(n, "weapondamagemin_v") || 1,
        _ = G(n, "weapondamagemax_v") || 2,
        E = v ? f.dex / Wh : f.str / Jh;
      ((f.wmin = H + E + G(n, "addphysicsdamage_v")),
        (f.wmax = _ + E + G(n, "addphysicsdamage_v")),
        (f.physPct =
          G(n, "addphysicsdamage_p") + G(n, "weapondamageenhance_p")),
        (f.spellW = 1),
        (f.physStat = 1),
        (f.add = {}));
      for (const q of q0) q !== "phys" && (f.add[q] = G(n, Vh[q]));
      ((f.add.poison *= s6), (f.enh = {}));
      for (const q in qo) f.enh[q] = G(n, qo[q]);
      ((f.coldEnh = f.enh.cold || 0), (f.enh.cold = 0));
      {
        const q = C(f.enh.poison || 0, 0, 90);
        f.enh.poison = q ? 1e4 / (100 - q) - 100 : 0;
      }
      ((f.crit = C(
        G(n, "deadlystrikeenhance_p") + G(n, "deadlystrike_p"),
        0,
        75,
      )),
        (f.aspdP = C(1 + G(n, "attackspeed_v") / 100, 0.5, 3)),
        (f.aspdC = C(0.9 * (1 + G(n, "castspeed_v") / 100), 0.45, 2.7)),
        (f.aspd = f.aspdP),
        (f.leech = G(n, "steallife_p") + G(n, "steallifeenhance_p")),
        (f.manaLeech = G(n, "stealmana_p") + G(n, "stealmanaenhance_p")),
        (f.ignoreDef = G(n, "ignoredefense_p")),
        (f.retMelee = G(n, "meleedamagereturn_v")),
        (f.retMeleeP = G(n, "meleedamagereturn_p")),
        (f.series5 = G(n, "five_elements_enhance_v")),
        (f.res5 = G(n, "five_elements_resist_v")),
        (f.seriesSkill = 0),
        (f.lucky =
          G(n, "lucky_v") + (typeof h2 == "function" ? h2("luck") : 0)),
        (f.speed = 1 + G(n, "fastwalkrun_p") / 100),
        (f.speedFoot = 1 + (G(n, "fastwalkrun_p") - d) / 100),
        (f.manaShield = C(G(n, "manashield_p"), 0, 90)),
        (f.skillEnh = G(n, "skill_enhance")),
        (f.heavy = C(G(n, "enhancehit_rate"), 0, 50)),
        (f.block = C(G(n, "block_rate"), 0, 50)),
        (f.dmgShield = G(n, "dynamicmagicshield_v")),
        (f.sorb = C(G(n, "sorbdamage_p"), 0, 60)),
        (f.anti = {}));
      for (const q of q0)
        f.anti[q] =
          G(n, "anti_allres_p") +
          G(
            n,
            "anti_" +
              (q === "phys" ? "physics" : q === "light" ? "lighting" : q) +
              "res_p",
          );
      ((f.dmg2mana = G(n, "damage2addmana_p")),
        (f.retRangeP = G(n, "rangedamagereturn_p")),
        (f.stunAdd = G(n, "do_stun_p")),
        (f.expPct = G(n, "expenhance_p")),
        (f.stunRed = C(G(n, "stuntimereduce_p"), 0, 80)),
        (f.freezeRed = C(G(n, "freezetimereduce_p"), 0, 80)),
        (f.poisonRed = C(G(n, "poisontimereduce_p"), 0, 80)),
        (f.hitRec = C(G(n, "fasthitrecover_v"), 0, 90)),
        (f.vision = C(G(n, "visionradius_p"), 0, 30)),
        (f.knock = C(G(n, "knockback_p"), 0, 40)),
        (f.antiMax = C(G(n, "anti_maxres_p"), 0, 240)),
        (f.antiStun = C(G(n, "anti_do_stun_p"), 0, 80)),
        (f.stunLong = C(G(n, "anti_stuntimereduce_p"), 0, 200)),
        (f.breakRes = C(G(n, "anti_do_hurt_p"), 0, 60)),
        (f.antiBlock = G(n, "anti_block_rate")),
        (f.antiSorb = C(G(n, "anti_sorbdamage_yan_p"), 0, 60)));
      const $ = ["metal", "wood", "water", "fire", "earth"];
      ((f.me2 = $.map((q) => G(n, "me2" + q + "damage_p"))),
        (f.from = $.map((q) => C(G(n, q + "2medamage_p"), 0, 80))),
        (f.hurtP = C(G(n, "do_hurt_p"), 0, 80)),
        (f.hurtT = G(n, "anti_hitrecover")),
        (f.magAdd = {
          phys: G(n, "addphysicsmagic_v"),
          poison: G(n, "addpoisonmagic_v") * s6,
          cold: G(n, "addcoldmagic_v"),
          fire: G(n, "addfiremagic_v"),
          light: G(n, "addlightingmagic_v"),
        }),
        (f.ranged = v),
        (f.skillBonus = {}));
      for (const q in r.sk) {
        const U = T[q];
        if (!(!U || !r.sk[q])) {
          for (const G0 in U.attr)
            if (G0.startsWith("addskilldamage")) {
              const eA = P0(U, G0, m(q));
              eA &&
                eA[0] &&
                (f.skillBonus[eA[0]] = (f.skillBonus[eA[0]] || 0) + eA[2]);
            }
        }
      }
      f.actives = [];
      const O = [],
        z = E8();
      for (const q in r.sk) {
        const U = T[q];
        if (r.sk[q] && NA(U) && (!h6(U) || (r.mainLock && +r.main == +q))) {
          const G0 = U2(f, U, m(q));
          (O.push(G0),
            ($3(U, z) || (c.ignoreEqt && c.ignoreEqt.has(v1(U)))) &&
              f.actives.push(G0));
        }
      }
      f.basic = Dg(f);
      const R = f.manaRegen + Pg(t);
      for (const q of f.actives) {
        const U = q.costLife ? 0 : q.cost * q.rate;
        ((q.sustain = U > 0 ? Math.min(1, R / U) : 1),
          (q.dps = q.dps * q.sustain));
      }
      const Z = f.actives.concat([f.basic]).sort((q, U) => U.dps - q.dps),
        E0 = new Set(
          r.inv
            .concat(r.eq.weapon ? [r.eq.weapon] : [])
            .filter((q) => q.d <= 1 && f0(q))
            .map(O8),
        ),
        S0 = O.filter((q) => {
          const U = v1(T[q.id]);
          return U === null || E0.has(U);
        }).sort((q, U) => U.dps - q.dps)[0];
      return (
        (f.wantId = S0 && S0.dps > f.basic.dps ? S0.id : 0),
        (f.main =
          (r.mainLock &&
            (r.main === "basic"
              ? f.basic
              : f.actives.find((q) => q.id === r.main))) ||
          Z[0]),
        (f.bestAuto = Z[0]),
        f
      );
    },
    Wo = function (A, n) {
      if (n.tab && typeof c < "u" && c.P) {
        const a =
          U2(c.P, Ig(A.id, n), n.std ? A.L : Math.min(A.L, 20)).parts || {};
        return n.std ? Object.assign({}, a) : { [n.el]: a[n.el] || 0 };
      }
      const t = n.sid ? Zo(A.id, n.sid) : 1,
        e = {};
      return (
        n.k > 0 && (e[n.el] = A.tot * n.k * t),
        n.poison && (e.poison = (e.poison || 0) + A.tot * n.poison * t),
        e
      );
    },
    Zo = function (A, n) {
      const t = typeof c < "u" && c.P;
      if (!t || !t.skillBonus) return 1;
      const e = (t.seriesSkill || 0) + (t.skillEnh || 0);
      return (
        (1 + ((t.skillBonus[n] || 0) + e) / 100) /
        Math.max(0.01, 1 + ((t.skillBonus[A] || 0) + e) / 100)
      );
    },
    A6 = function (A, n, t) {
      const e = z3(A),
        a = R8(A, n),
        i = e && e[3] > 1 ? e[3] * 24 : 0,
        o = e ? Math.max(e[1], t) : t,
        l = !!e && !e[2],
        d = c6(A, n);
      if (d === 1) return { k: "line", n: a, len: o, pierce: l, area: i };
      if (d === 2) {
        const h = P0(A, "skill_param1_v", n),
          g = h && h[0] > 0 ? h[0] : A.p1 || jg[A.id];
        if (g) {
          const f = zg(a, g);
          return {
            k: "fan",
            n: a,
            len: o,
            pierce: l,
            area: i,
            offs: f,
            half: Math.max(0.05, ...f.map(Math.abs)),
          };
        }
        return {
          k: "fan",
          n: a,
          len: o,
          pierce: l,
          area: i,
          half: Math.max(0.18, (a - 1) * 0.13 + 0.1),
        };
      }
      return d === 0
        ? {
            k: "wall",
            n: a,
            len: o,
            pierce: l,
            area: i,
            w: Math.max(30, a * 18),
          }
        : d === 3
          ? { k: "ring", n: a, len: (e && e[1]) || t, pierce: l, area: i }
          : d === 7
            ? { k: "self", n: a, r: i || t + 40 }
            : d >= 4 && d <= 6
              ? { k: "spot", n: a, r: i || 0, scat: a > 1 ? 70 : 0 }
              : { k: "single", n: a };
    },
    n6 = function (A) {
      const n = (t) => (t >= 70 ? 3 : t >= 45 ? 2 : 1);
      switch (A.k) {
        case "line":
          return A.pierce ? 3 : A.area ? n(A.area) : 1;
        case "fan":
        case "wall":
        case "ring":
          return A.pierce
            ? 3
            : Math.max(A.area ? n(A.area) : 1, Math.min(3, A.n));
        case "self":
          return 3;
        case "spot":
          return Math.max(n(A.r), Math.min(3, A.n > 1 ? A.n : 1));
        default:
          return 1;
      }
    },
    pg = function (A, n, t) {
      if (z3(A) && A.form < 8)
        return n6(
          A6(
            A,
            n,
            t || (P0(A, "skill_attackradius", n) || [A.radius || 60])[0] || 60,
          ),
        );
      const e = R8(A, n);
      let a;
      switch (c6(A, n)) {
        case 0:
          a = e > 1 ? 3 : 2;
          break;
        case 1:
          a = 2;
          break;
        case 2:
          a = Math.min(3, 1 + Math.ceil(e / 3));
          break;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          a = 3;
          break;
        default:
          a = 1;
      }
      return a;
    },
    U2 = function (A, n, t) {
      const a = P0(n, "physicsenhance_p", t),
        i =
          (1 +
            ((A.skillBonus[n.id] || 0) + A.seriesSkill + (A.skillEnh || 0)) /
              100) *
          (A.dmgMul || 1),
        o = {};
      if (a) {
        o.phys = ((A.wmin + A.wmax) / 2) * (1 + (a[0] + A.physPct) / 100);
        for (const q in A.add) A.add[q] && (o[q] = (o[q] || 0) + A.add[q]);
      }
      for (const q of q0) {
        const U = P0(n, No[q], t);
        if (!U) continue;
        const G0 =
          q === "poison"
            ? (U[0] * (U[1] || 1)) / Math.max(1, U[2] || 1)
            : U[2]
              ? (U[0] + U[2]) / 2
              : U[0];
        o[q] = (o[q] || 0) + G0 * (1 + (A.enh[q] || 0) / 100);
      }
      if (!a && A.magAdd)
        for (const q of q0)
          A.magAdd[q] &&
            (o[q] = (o[q] || 0) + A.magAdd[q] * (1 + (A.enh[q] || 0) / 100));
      if (!a && Qg) {
        const q = 1 + (A.eng || 0) / 500;
        for (const U in o) o[U] *= q;
      }
      let l = 0;
      for (const q in o) ((o[q] *= i), (l += o[q]));
      const d = (P0(n, "skill_attackradius", t) || [n.radius || 60])[0] || 60,
        h = d * (1 + (A.vision || 0) / 100),
        g = V8[n.id],
        f = g ? Gg(g) : null,
        m = g ? (f ? n6(f) : 1) : pg(n, t, h),
        w = R8(n, t),
        p = Lg(n, t),
        P = (P0(n, "skill_cost_v", t) || [0])[0],
        v = A.crit + (P0(n, "deadlystrike_p", t) || [0])[0],
        H = (P0(n, "attackrating_p", t) || [0])[0] || 0,
        _ = (P0(n, "fatallystrike_p", t) || [0])[0] || 0,
        E = (P0(n, "seriesdamage_p", t) || [0])[0],
        $ = A.ignoreDef + (P0(n, "ignoredefense_p", t) || [0])[0],
        O = (P0(n, "stun_p", t) || [0])[0],
        z = P0(
          n,
          typeof c < "u" && c.mounted && n.attr.skill_mintimepercastonhorse_v
            ? "skill_mintimepercastonhorse_v"
            : "skill_mintimepercast_v",
          t,
        ),
        R = Math.max(Og[n.id] || 0, z ? z[0] : 0) / 18,
        Z = g
          ? Kg(g)
          : Math.min(
              n.phys ? A.aspdP || A.aspd : A.aspdC || A.aspd * 0.9,
              R ? 1 / R : 99,
            ),
        E0 = (q) => {
          const U = P0(n, No[q], t);
          return U && U[1] > 0 ? U[1] / 18 : 0;
        },
        S0 = {
          skLeech: (P0(n, "steallife_p", t) || [0])[0] || 0,
          skMLeech: (P0(n, "stealmana_p", t) || [0])[0] || 0,
          geo: g ? f : z3(n) && n.form < 8 ? A6(n, t, h) : null,
          many: g || null,
          id: n.id,
          n: n.n,
          L: t,
          ext: !!a,
          wpn: v1(n) !== null,
          parts: o,
          tot: l,
          rad: h,
          melee: d <= 120,
          targets: m,
          nMis: w,
          ev: p,
          around: n.form === 7,
          cost: g ? P / g[0] : P,
          costLife: K8(n),
          crit: v,
          series5: E,
          ignore: $,
          stun: O,
          fatal: _,
          ar: H
            ? Math.max(10, (A.arBase || 0) * (1 + ((A.arPct || 0) + H) / 100))
            : 0,
          skAr: H,
          series: n.series >= 0 ? n.series : A.series,
          rate: Z,
          cd: R,
          coldT: E0("cold"),
          poisonT: E0("poison"),
          dps: 0,
          useAR: Rg.has(+n.id),
          phys: !!n.phys,
        };
      if (
        ((S0.dps =
          (l -
            (o.poison || 0) * (1 - u6) +
            (((o.phys || 0) * v) / 100) * (zo - 1)) *
          S3(S0) *
          Z *
          (S0.melee ? W8 : 1) *
          t6(A)),
        (S0.dps *= 1 + Sg(S0)),
        S0.geo && S0.geo.k === "fan" && typeof K4 == "function")
      ) {
        const q = typeof r < "u" && r.closeAtk ? 60 : Math.min(h, 300) * 0.8,
          U = S3(S0),
          G0 = K4(
            S0,
            { r: 21 * (typeof P1 < "u" ? P1 : 1) },
            q,
            Math.max(1, Math.round(1 + (Math.min(4, S0.targets) - 1) * 0.55)),
          );
        G0 > 0 && (S0.dps *= (U + G0) / U);
      }
      return S0;
    },
    Dg = function (A) {
      const t = {
        phys: ((A.wmin + A.wmax) / 2) * (1 + A.physPct / 100) * A.physStat,
      };
      for (const a in A.add) A.add[a] && (t[a] = A.add[a]);
      let e = 0;
      for (const a in t) ((t[a] *= A.dmgMul || 1), (e += t[a]));
      return {
        id: 0,
        n: "Đánh thường",
        basic: !0,
        ext: !0,
        L: 1,
        parts: t,
        tot: e,
        rad: A.ranged ? 320 : [2, 3].includes(j8(r.eq)) ? 100 : 75,
        melee: !A.ranged,
        targets: 1,
        cost: 0,
        crit: A.crit,
        series5: 0,
        ignore: A.ignoreDef,
        stun: 0,
        series: A.series,
        rate: A.aspd,
        dps: e * A.aspd * (A.ranged ? 1 : W8) * t6(A),
        useAR: 1,
        phys: !0,
      };
    },
    t6 = function (A) {
      if (!A || !A.anti) return 1;
      const n = q0.reduce((t, e) => t + (A.anti[e] || 0), 0) / q0.length;
      return (
        (1 + ((A.heavy || 0) / 100) * 0.5) * (1 + (Math.min(n, 35) / 100) * 0.6)
      );
    },
    Pg = function (A) {
      let n = 0;
      for (const t of S.potions)
        t.kind === "mana" &&
          A >= (Kt[t.tier] || 999) &&
          (n = Math.max(n, t.total / Math.max(1, t.dur)));
      return n;
    },
    yk = function (A) {
      if (!A || A.d > 1) return 1;
      const n = A.d + ":" + A.k;
      if (!(n in Q3)) {
        const t = ia(A.d, A.k, 1);
        Q3[n] = t ? Math.max(1, Ie(t)) : 0;
      }
      return Q3[n] ? C(Ie(A) / Q3[n], 1, 20) : 1;
    },
    f0 = function (A) {
      if (!F1(A)) return !1;
      for (const [n, t] of A.req || [])
        if (
          (n === 36 && TA() < t) ||
          (n === 32 && FA("str") < t) ||
          (n === 33 && FA("dex") < t) ||
          (n === 34 && FA("vit") < t) ||
          (n === 35 && FA("eng") < t) ||
          (n === 37 && t >= 0 && I[r.fac] && j0() !== t) ||
          (n === 39 && t >= 0 && I[r.fac] && I[r.fac].id !== t)
        )
          return !1;
      return !0;
    },
    FA = function (A) {
      return Uo()[A] + r.attr[A];
    },
    N0 = function (A) {
      const n = r.lvl,
        t = 8 + 3.2 * n,
        e = 30 + 9 * n,
        a = r.mainLock ? A.main : A.bestAuto || A.main,
        i = a.useAR ? Qt(a.ar || A.ar, t, a.ignore) / 100 : 1,
        o = 1 - Qt(e, A.def) / 100,
        l = q0.reduce((f, m) => f + A.res[m], 0) / q0.length,
        d = (f) => (f ? f.reduce((m, w) => m + (w || 0), 0) / 5 : 0),
        h =
          a.dps *
          i *
          (1 + d(A.me2) / 100) *
          (1 + ((A.hurtP || 0) / 100) * 0.15),
        g =
          A.life /
          Math.max(0.2, 1 - l / 100) /
          Math.max(0.2, 1 - d(A.from) / 100) /
          Math.max(0.3, 1 - o) /
          (1 - (A.block || 0) / 100) /
          (1 - (A.sorb || 0) / 100) /
          (1 - Math.min(I8, (A.dmgShield || 0) / (r.lvl * 3 + 30)));
      return (
        Math.pow(Math.max(1, h), f6) *
        Math.pow(Math.max(1, g), 1 - f6) *
        (1 + vg(A))
      );
    },
    vg = function (A) {
      const n =
        (A.stunRed || 0) * 0.0012 +
        (A.freezeRed || 0) * 0.0012 +
        (A.poisonRed || 0) * 0.001 +
        (A.antiStun || 0) * 0.0012 +
        (A.leech || 0) * 0.008 +
        (A.manaLeech || 0) * 0.003 +
        (A.dmg2mana || 0) * 0.002 +
        Math.min(0.06, (((A.regen || 0) * 2) / Math.max(1, A.life)) * 3) +
        Math.min(0.03, ((A.manaRegen || 0) * 2) / Math.max(1, A.mana || 1)) +
        (A.lucky || 0) * 0.0015 +
        Math.max(0, (A.speedFoot || 1) - 1) * 0.08 +
        (A.hitRec || 0) * 8e-4;
      return Math.min(0.25, Math.max(0, n));
    },
    bg = function (A) {
      const n = I[r.fac] && Fg[r.fac];
      if (!n) return A;
      const t = Math.max(Zn[0], Math.min(Zn[Zn.length - 1], r.lvl | 0));
      let e = 0;
      for (; e < Zn.length - 2 && t > Zn[e + 1];) e++;
      const a = (t - Zn[e]) / (Zn[e + 1] - Zn[e]),
        i = (o, l) => Math.log(o[l]) * (1 - a) + Math.log(o[l + 1]) * a;
      return A * Math.exp(i(Yg, e) - i(n, e));
    },
    Xn = function () {
      const A = I[r.fac];
      if (!A) return 0;
      const n = c.buffAssume;
      ((c.buffAssume = !0), (c.ignoreEqt = null));
      try {
        return yg(A);
      } finally {
        ((c.buffAssume = n), (c.ignoreEqt = null), (c.dirty = !0));
      }
    },
    yg = function (A) {
      let n = 0;
      for (; r.skPts > 0;) {
        const t = N0(I0());
        let e = null,
          a = 0,
          i = -1 / 0;
        for (const o of A.skills) {
          const l = T[o];
          if (!b1(l) || h6(l)) continue;
          const d = r.sk[o] || 0,
            h =
              NA(l) && l.tier !== 90
                ? Math.max(I3(l), Math.min(l.max, TA() + Vg - l.req + 1))
                : I3(l),
            g = Math.max(1, Math.min(20, h - d));
          for (const f of [...new Set([1, Math.min(5, g), g])]) {
            r.sk[o] = d + f;
            const m = (N0(I0()) - t) / f + (NA(l) ? 0 : 1e-6) + l.req * 1e-9;
            (d ? (r.sk[o] = d) : delete r.sk[o],
              m > i && ((i = m), (e = o), (a = f)));
          }
        }
        if (e == null) break;
        if (
          ((a = Math.min(a, r.skPts)),
          typeof na == "function" && !c.sim && na(e),
          (a = Math.min(a, I3(T[e]) - (r.sk[e] || 0))),
          T[e].tier === 90)
        ) {
          (R3(e), J8(T[e]) || n++);
          continue;
        }
        ((r.sk[e] = (r.sk[e] || 0) + a), (r.skPts -= a), (n += a));
      }
      return (n && (c.dirty = !0), n);
    },
    kg = function () {
      return (
        (I[r.fac] &&
          r.inv
            .concat(r.eq.weapon ? [r.eq.weapon] : [])
            .filter(
              (t) =>
                t.d <= 1 &&
                YA(t) &&
                (t.req || []).every(([e, a]) => e !== 36 || TA() >= a) &&
                !(t.req || []).some(
                  ([e, a]) => (e === 37 || e === 39) && a >= 0 && !f0(t),
                ),
            )
            .sort((t, e) => Ie(e) - Ie(t))[0]) ||
        null
      );
    },
    Un = function (A) {
      const n = [];
      for (const [t, e] of A.req || [])
        if (t === 36 && TA() < e)
          n.push(`Cấp ${e} (hiện ${TA()}, thiếu ${e - TA()})`);
        else if (m6[t] && FA(W2[t]) < e) {
          const a = FA(W2[t]);
          n.push(`${m6[t]} ${e} (hiện ${a}, thiếu ${e - a})`);
        } else
          t === 38 && e >= 0 && (r.sex || 0) !== e
            ? n.push(
                `Chỉ dành cho ${e ? "nữ" : "nam"} (nhân vật của bạn là ${r.sex ? "nữ" : "nam"})`,
              )
            : t === 37 && e >= 0 && I[r.fac] && j0() !== e
              ? n.push(`Chỉ hệ ${d0[e]} (bạn hệ ${d0[j0()]})`)
              : t === 39 &&
                e >= 0 &&
                I[r.fac] &&
                I[r.fac].id !== e &&
                n.push(`Chỉ môn phái ${(S.factions[e] || {}).n || e}`);
      return n;
    },
    xg = function (A, n) {
      const t = Object.assign({}, r.eq);
      t[LA(A)] = A;
      const e = I0(r.eq),
        a = Mt;
      Mt = n ? A : null;
      let i;
      try {
        i = I0(t);
      } finally {
        Mt = a;
      }
      const o = N0(e),
        l = N0(i),
        d = (g) => q0.reduce((f, m) => f + g.res[m], 0) / q0.length;
      return {
        why: Bg(A, t, e, i),
        gain: l / Math.max(1, o) - 1,
        dps:
          (i.bestAuto || i.main).dps / Math.max(1, (e.bestAuto || e.main).dps) -
          1,
        life: i.life - e.life,
        def: i.def - e.def,
        res: d(i) - d(e),
        ar: i.ar - e.ar,
      };
    },
    Bg = function (A, n, t, e) {
      const a = r.eq,
        i = LA(A),
        o = [],
        l = a[i];
      for (const d in a) {
        const h = a[d];
        if (!h || d === i || (h.mag || []).length < 2) continue;
        const g = Vn(h, a),
          f = Vn(h, n),
          m = Math.floor(h.mag.length / 2);
        f !== g &&
          o.push(
            `${S8[d]} ${f > g ? "mở thêm" : "đóng bớt"} ${Math.abs(f - g)} dòng ẩn (${f}/${m}) do tương sinh hệ ${d0[A.s] || "—"}`,
          );
      }
      if ((A.mag || []).length > 1 && A.d !== 10) {
        const d = Vn(A, n),
          h = Math.floor(A.mag.length / 2),
          g = l && (l.mag || []).length > 1 ? Vn(l, a) : null;
        o.push(
          `Món này mở ${d}/${h} dòng ẩn${g !== null ? `, món đang mặc mở ${g}/${Math.floor(l.mag.length / 2)}` : ""}`,
        );
      }
      return (
        o1(n) !== o1(a) &&
          o.push(
            o1(n)
              ? "Đủ bộ: mở hết dòng ẩn của mọi trang bị"
              : "Mất đủ bộ: các dòng ẩn bị đóng lại",
          ),
        t.main.id !== e.main.id &&
          o.push(`Chiêu chính đổi: ${t.main.n} → ${e.main.n}`),
        i === "weapon" &&
          o.push(
            `Sát thương vũ khí ${Math.round(t.wmin)}–${Math.round(t.wmax)} → ${Math.round(e.wmin)}–${Math.round(e.wmax)}`,
          ),
        o.length ||
          o.push(
            "Chỉ thay đổi chỉ số thường (phòng thủ, sinh lực, kháng), không đụng tới dòng ẩn hay bộ.",
          ),
        o
      );
    },
    Jn = function (A) {
      const n = {};
      for (const [t, e] of A.req || []) {
        const a = W2[t];
        a && FA(a) < e && (n[a] = e - FA(a));
      }
      return n;
    },
    z8 = function (A = r.attrPts) {
      const n = (i) => ((i.req || []).find((o) => o[0] === 36) || [0, 0])[1],
        t = Object.values(r.eq)
          .filter((i) => i && (i.req || []).some(([o]) => W2[o]))
          .sort((i, o) => n(i) - n(o)),
        e = { str: 0, dex: 0, vit: 0, eng: 0 },
        a = [];
      for (const i of t) {
        const o = {};
        let l = 0;
        for (const [d, h] of i.req) {
          const g = W2[d];
          if (!g) continue;
          const f = h - (FA(g) + e[g]);
          f > 0 && (o[g] = Math.max(o[g] || 0, f));
        }
        for (const d in o) ((e[d] += o[d]), (l += o[d]));
        l && a.push({ it: i, d: o, n: l, lv: n(i) });
      }
      return {
        list: a,
        total: Object.values(e).reduce((i, o) => i + o, 0),
        add: e,
      };
    },
    e6 = function () {
      let A = 0;
      for (const { d: n } of z8().list)
        for (const t in n) {
          const e = Math.min(n[t], r.attrPts);
          e > 0 && ((r.attr[t] += e), (r.attrPts -= e), (A += e));
        }
      return (A && (c.dirty = !0), A);
    },
    Oe = function () {
      let A = e6();
      const n = kg();
      if (n) {
        const t = Jn(n),
          e = Object.values(t).reduce((a, i) => a + i, 0);
        if (e > 0 && e <= r.attrPts + K2 * g6)
          for (const a in t) {
            const i = Math.min(t[a], r.attrPts);
            ((r.attr[a] += i), (r.attrPts -= i), (A += i));
          }
        n !== r.eq.weapon &&
          f0(n) &&
          typeof $1 == "function" &&
          ni(n) > 0 &&
          $1(n, !0);
      }
      for (; r.attrPts > 0;) {
        const t = N0(I0());
        let e = "vit",
          a = -1 / 0;
        for (const i of ["str", "dex", "vit", "eng"]) {
          r.attr[i]++;
          const o = N0(I0()) - t;
          (r.attr[i]--, o > a && ((a = o), (e = i)));
        }
        (r.attr[e]++, r.attrPts--, A++);
      }
      return (A && (c.dirty = !0), A);
    },
    b1 = function (A) {
      return (
        (r.skPts > 0 || (J8(A) && !r.sk[A.id])) &&
        Aa(A) &&
        (r.sk[A.id] || 0) < I3(A) &&
        (typeof n4 != "function" || n4(A))
      );
    },
    I3 = function (A) {
      return typeof xA == "function" && xA(A.id)
        ? A4(A.id)
        : A.tier === 90
          ? 1
          : Math.max(0, Math.min(A.max, TA() - A.req + 1));
    },
    S3 = function (A) {
      const n = Math.min(4, A.targets);
      return A.around ? 1 + (n - 1) * 0.12 : 1 + (n - 1) * 0.55;
    },
    _g = function (A) {
      let n = 0;
      for (const t of A.skills) {
        const e = T[t],
          a = e && !e.enemy && e.attr.addphysicsdamage_p;
        if (!a) continue;
        const i = a[19] || a[a.length - 1];
        Array.isArray(i) && i[2] === A.wcode && (n = Math.max(n, i[0]));
      }
      return n;
    },
    Mg = function (A, n, t) {
      const e = 10 + A * 0.8,
        a = 60 + A;
      return {
        wmin: e,
        wmax: e * 1.3,
        physPct: _g(n),
        physStat: 1 + (a * t * (n.wcode === 7 ? Ag : 1)) / Zh / 100,
        add: {},
        enh: {},
        eng: a * (1 - t),
        seriesSkill: 0,
        skillBonus: {},
        crit: 0,
        aspd: 1,
        ignoreDef: 0,
        series: 0,
        spellW: 1,
      };
    },
    Hg = function (A) {
      let n = 0;
      for (const t of [0, 1]) {
        const e = U2(Mg(Math.max(10, A.req), A.fac, t), A, 20),
          a = e.tot - (e.parts.poison || 0) * (1 - u6),
          i = e.useAR ? (A.fac.wcode === 7 ? Jg : Ug) : 1;
        n = Math.max(n, a * S3(e) * e.rate * (e.melee ? W8 : 1) * i);
      }
      return n;
    },
    $g = function () {
      const A = [];
      for (const n of uA)
        for (const t of n.skills) {
          const e = T[t];
          NA(e) && ((e.fac = n), A.push(e));
        }
      for (const [n, t] of Xg) {
        const a = A.filter((l) => l.req >= n && l.req <= t).map(
            (l) => ((l.norm = 1), [l, Hg(l)]),
          ),
          i = a.map((l) => l[1]).sort((l, d) => l - d),
          o = i[Math.floor(i.length / 2)] || 1;
        for (const [l, d] of a) l.norm = C(o / Math.max(1, d), 0.35, 3);
      }
    },
    kk = function (A, n) {
      const t = Zg[A];
      if (!t || window.NO_FAC_NORM) return 1;
      if (n <= Se[0]) return t[0];
      for (let e = 1; e < Se.length; e++)
        if (n <= Se[e]) {
          const a = (n - Se[e - 1]) / (Se[e] - Se[e - 1]);
          return t[e - 1] + (t[e] - t[e - 1]) * a;
        }
      return t[t.length - 1];
    },
    Tg = {
      lifemax_yan_v: "lifemax_v",
      lifemax_yan_p: "lifemax_p",
      manamax_yan_v: "manamax_v",
      allres_yan_p: "allres_p",
      physicsres_yan_p: "physicsres_p",
      poisonres_yan_p: "poisonres_p",
      coldres_yan_p: "coldres_p",
      fireres_yan_p: "fireres_p",
      lightingres_yan_p: "lightingres_p",
      attackspeed_yan_v: "attackspeed_v",
      castspeed_yan_v: "castspeed_v",
      sorbdamage_yan_p: "sorbdamage_p",
      fasthitrecover_yan_v: "fasthitrecover_v",
      anti_allres_yan_p: "anti_allres_p",
      anti_coldres_yan_p: "anti_coldres_p",
      anti_lightingres_yan_p: "anti_lightingres_p",
      manamax_yan_p: "manamax_p",
      anti_poisonres_yan_p: "anti_poisonres_p",
      anti_fireres_yan_p: "anti_fireres_p",
      anti_physicsres_yan_p: "anti_physicsres_p",
      anti_block_rate_buff: "anti_block_rate",
    },
    Ee = 30,
    Wn = { life: 0.03, mana: 0.05 },
    N3 = 2,
    a6 = () => (Q8() ? 1 + N3 : 1),
    Q8 = () => typeof r < "u" && r && r.fac && r.lvl < Ee && !D0(),
    s6 = 6,
    R1 = new Set([
      "indestructible_b",
      "staminareplenish_v",
      "staminamax_v",
      "pk_punish_weaken",
      "durability_v",
      "item_purple",
    ]);
  (R1.add("anti_enhancehit_rate"),
    R1.add("fatallystrikeres_p"),
    R1.add("returnres_p"),
    R1.add("melee_returnres_p"));
  var G = (s, A, n = 0) => (s[A] ? s[A][n] : 0),
    J2 = { 0: 2, 2: 1, 1: 3, 3: 4, 4: 0 },
    G8 = (s, A) => s >= 0 && A >= 0 && J2[s] === A,
    i6 = {
      helm: ["armor", "amulet"],
      armor: ["ring2", "belt"],
      belt: ["pendant", "cuff"],
      weapon: ["amulet", "armor"],
      boot: ["weapon", "helm"],
      cuff: ["boot", "ring1"],
      amulet: ["belt", "ring2"],
      ring1: ["weapon", "helm"],
      ring2: ["cuff", "pendant"],
      pendant: ["boot", "ring1"],
    },
    K8 = (s) => !!s && s.cost === 2,
    L3 = (s) =>
      s.costLife ? c.life - s.cost >= c.P.life * 0.25 : c.mana >= s.cost,
    r6 = (s) => {
      s.costLife ? (c.life = Math.max(1, c.life - s.cost)) : (c.mana -= s.cost);
    },
    q3 = (s) => {
      const A = (r.sk && r.sk[s]) || 0;
      return A ? A + yn(+s) : 0;
    },
    o6 = /^(skill_|missle_|addskilldamage)/,
    Mt = null,
    l6 = (s) => s === Mt || f0(s),
    Cg = 1.8,
    Og = { 20: 54, 40: 27, 138: 40, 181: 54, 392: 27 },
    R8 = (s, A) => {
      const n = A ? P0(s, "skill_misslenum_v", A) : null;
      return Math.max(1, n ? n[0] : s.childN || 1);
    },
    c6 = (s, A) => {
      const n =
        A && s.attr && s.attr.skill_misslesform_v
          ? P0(s, "skill_misslesform_v", A)
          : null;
      return n ? n[0] : s.form;
    },
    Y1 = {
      302: { n: "Truy Tinh Trục Điện", k: 0.15, el: "poison", max: 8 },
      339: {
        n: "Ngân Đao Xạ Nguyệt",
        col: 1,
        sid: 340,
        k: 0.8,
        el: "phys",
        max: 3,
      },
      336: {
        n: "Băng Tâm Tuyết Liên",
        col: 1,
        sid: 382,
        k: 0.25,
        el: "cold",
        max: 3,
      },
      353: {
        n: "Thiên Canh Độc Thủ",
        sid: 354,
        k: 0.3,
        el: "phys",
        poison: 0.1,
        max: 3,
      },
      362: { n: "Nghiệp Hỏa Phần Thành", sid: 363, k: 1, el: "fire", max: 5 },
      357: { n: "Long Chiến Vu Dã", col: 1, k: 1, el: "fire", max: 2 },
      328: {
        n: "Ngọc Tuyền Tẩy Trần",
        sid: 329,
        self: !0,
        k: 0.35,
        el: "phys",
        max: 3,
      },
      380: {
        n: "Kim Đỉnh Phật Quang",
        sid: 331,
        k: 0.35,
        el: "cold",
        max: 4,
        rays: (s) => C(1 + Math.floor((s - 11) / 3), 1, 4),
      },
      337: {
        n: "Phong Tuyết Băng Thiên",
        sid: 338,
        k: 0.35,
        el: "cold",
        max: 3,
      },
      355: {
        n: "Tinh Không Phá",
        col: 1,
        sid: 383,
        k: 0.35,
        el: "poison",
        max: 3,
      },
      375: { n: "Bình Địa Hám Lôi", col: 1, k: 0.35, el: "light", max: 3 },
      372: {
        n: "Khiếu Phong Tam Liên Kích",
        col: 1,
        sid: 373,
        k: 0.35,
        el: "light",
        max: 3,
      },
    },
    Eg = Array.from({ length: 20 }, (s, A) => [
      4 + 7 * (A + 1),
      0,
      296 + 59 * (A + 1),
    ]);
  for (const s of [163, 215, 368])
    Y1[s] = {
      n: "Thái Cực Kiếm Ý",
      k: 0,
      stun: 30,
      max: 3,
      self: !0,
      fx: "176",
      at16: {
        n: "Huyền Nhất Vô Tượng",
        el: "light",
        max: 3,
        col: 1,
        sid: 162,
        fx: "27",
        self: !1,
        castFx: "176",
        tab: { lightingdamage_v: Eg },
      },
    };
  var Y8 = {
    302: 301,
    339: 340,
    336: 382,
    353: 354,
    362: 363,
    357: 389,
    328: 329,
    380: 331,
    337: 338,
    355: 383,
    375: 387,
    372: 373,
  };
  if (typeof window < "u" && window.SK_EV) {
    for (const A in Y8) {
      const n = Y1[A],
        t = window.SK_EV[Y8[A]];
      n && t && t.a && ((n.sid = Y8[A]), (n.tab = t.a), (n.std = 1));
    }
    const s = window.SK_EV[162];
    if (s && s.a)
      for (const A of [163, 215, 368])
        Y1[A] && Y1[A].at16 && (Y1[A].at16.tab = s.a);
  }
  var Ig = (s, A) =>
      A._sk ||
      (A._sk = Object.assign({}, T[s], {
        id: A.sid || s,
        phys: 0,
        aura: 0,
        attr: Object.assign({}, A.tab),
      })),
    d6 = (s) => {
      const A = s && s.ev && Y1[s.id];
      return A
        ? A.at16 && s.L >= 16
          ? A._16 || (A._16 = Object.assign({}, A, A.at16, { stun: A.stun }))
          : A
        : null;
    },
    Sg = (s) => {
      const A = d6(s);
      return A
        ? ((A.tab
            ? Object.values(Wo(s, A)).reduce((t, e) => t + e, 0) /
              Math.max(1, s.tot)
            : (A.k + (A.poison || 0)) * (A.sid ? Zo(s.id, A.sid) : 1)) *
            (A.chance || 1) *
            Math.min(j3(s, A), 2.2)) /
            S3(s)
        : 0;
    },
    j3 = (s, A) => (A.rays ? A.rays(s.L) : A.max),
    Ng = [
      "skill_startevent",
      "skill_collideevent",
      "skill_flyevent",
      "skill_vanishedevent",
    ],
    F8 = (s) => {
      let A = 0;
      for (const n of Ng) {
        const t = (s.attr || {})[n];
        if (!t) continue;
        const e = t.findIndex((a) => a && a[0] === 1);
        e >= 0 && (A = A ? Math.min(A, e + 1) : e + 1);
      }
      return A;
    },
    Lg = (s, A) => {
      const n = F8(s);
      return !!n && A >= n;
    },
    qg = {
      216: [1, 360, 0, 4],
      66: [0, 300, 0, 4],
      77: [0, 0, 0, 6],
      86: [0, 0, 1, 4],
      61: [1, 496, 0, 1],
      272: [1, 480, 1, 1],
      317: [4, 3e4, 0, 3],
      135: [0, 0, 0, 6],
      136: [1, 640, 0, 1],
      405: [0, 0, 1, 3],
      219: [1, 0, 0, 4],
      404: [0, 0, 0, 0],
      406: [0, 0, 0, 3],
      221: [1, 180, 1, 1],
      222: [1, 280, 0, 1],
      224: [5, 300, 0, 2],
      220: [0, 240, 1, 1],
      225: [0, 0, 0, 1],
      407: [0, 0, 0, 3],
      326: [1, 768, 1, 1],
      327: [1, 576, 0, 1],
      408: [0, 0, 1, 5],
      35: [7, 960, 1, 3],
      116: [1, 450, 1, 1],
      37: [1, 480, 1, 1],
      38: [0, 0, 0, 3],
      67: [5, 576, 1, 1],
      106: [0, 0, 1, 2],
      151: [100, 960, 0, 1],
      96: [0, 0, 0, 1],
      149: [1, 512, 0, 1],
      152: [100, 1024, 1, 1],
      30: [1, 240, 1, 1],
      31: [1, 496, 1, 1],
      32: [1, 496, 1, 1],
      190: [3, 480, 0, 3],
      33: [0, 0, 0, 3],
      34: [1, 496, 1, 2],
      163: [0, 0, 0, 3],
      165: [1, 640, 0, 1],
      68: [1, 384, 1, 1],
      2: [1, 640, 1, 1],
      101: [0, 0, 0, 2],
      191: [1, 512, 1, 1],
      3: [1, 320, 1, 1],
      4: [0, 0, 0, 5],
      142: [1, 512, 0, 1],
      186: [0, 0, 0, 3],
      6: [1, 360, 1, 1],
      7: [1, 416, 0, 2],
      8: [1, 0, 1, 2],
      12: [0, 0, 0, 3],
      9: [0, 0, 1, 2],
      10: [0, 0, 0, 8],
      146: [1, 768, 1, 1],
      147: [1, 480, 0, 1],
      45: [1, 496, 1, 1],
      46: [1, 496, 1, 1],
      47: [1, 496, 1, 1],
      48: [1, 160, 1, 1],
      166: [5, 1600, 1, 1],
      168: [5, 1280, 1, 1],
      54: [1, 240, 1, 1],
      57: [1, 400, 1, 3],
      55: [0, 0, 0, 2],
      56: [1, 288, 1, 1],
      69: [1, 72, 1, 1],
      58: [0, 0, 0, 4],
      169: [1, 192, 0, 1],
      171: [0, 0, 1, 1],
      24: [1, 320, 1, 1],
      25: [1, 320, 0, 1],
      26: [0, 0, 0, 3],
      28: [0, 0, 0, 4],
      29: [1, 320, 1, 1],
      110: [1, 128, 0, 1],
      173: [0, 0, 0, 4],
      175: [1, 192, 0, 1],
      14: [1, 300, 1, 1],
      17: [0, 0, 0, 2],
      15: [1, 480, 1, 1],
      16: [1, 1085, 0, 2],
      18: [0, 4, 1, 2],
      178: [1, 1085, 0, 4],
      181: [0, 12, 1, 2],
    },
    z3 = (s) => (s && qg[s.child]) || null,
    xk = (s) => (s && s.form === 1 ? z3(s) : null),
    jg = {
      128: 3,
      165: 1,
      327: 7,
      336: 2,
      341: 1,
      342: 1,
      408: 7,
      556: 21,
      575: 3,
      581: 2,
      970: 2,
      1031: 2,
      1046: 3,
      1057: 8,
      1064: 4,
      1071: 1,
      1085: 8,
      1086: 6,
      1087: 7,
      1088: 7,
      1099: 4,
      1100: 4,
      1148: 8,
      1160: 1,
    },
    zg = (s, A) =>
      Array.from(
        { length: Math.max(1, s) },
        (n, t) => ((Math.floor(s / 2) - t) * A * Math.PI * 2) / 64,
      ),
    Qg = 2,
    Bk = {
      10: 2,
      20: 2,
      11: 1.1,
      19: 0.9,
      271: 0.6,
      318: 1.95,
      319: 2,
      321: 2,
      29: 1.8,
      30: 1.7,
      34: 1.75,
      31: 2,
      35: 2,
      37: 2,
      40: 1.6,
      32: 2,
      41: 2,
      324: 1.9,
      322: 2,
      323: 2,
      325: 2,
      45: 0.6,
      347: 1.6,
      303: 2,
      47: 0.85,
      50: 0.75,
      54: 0.6,
      343: 2,
      345: 2,
      349: 2,
      58: 0.75,
      249: 0.5,
      341: 0.5,
      339: 0.7,
      63: 2,
      65: 1.15,
      68: 2,
      384: 1.9,
      71: 1.2,
      74: 1.05,
      353: 1.75,
      355: 2,
      80: 0.5,
      85: 0.55,
      82: 0.5,
      385: 0.7,
      88: 0.55,
      91: 0.55,
      328: 0.75,
      380: 0.5,
      99: 1.05,
      102: 0.6,
      113: 0.55,
      108: 1.1,
      336: 1.5,
      337: 0.7,
      119: 0.55,
      122: 0.5,
      125: 0.5,
      128: 0.5,
      357: 0.5,
      135: 1.35,
      145: 2,
      138: 2,
      141: 1.45,
      142: 1.45,
      148: 1.8,
      361: 1.85,
      362: 2,
      153: 0.5,
      155: 0.65,
      158: 0.65,
      164: 0.5,
      165: 0.5,
      267: 0.95,
      365: 0.5,
      368: 0.5,
      162: 0.5,
      169: 0.5,
      179: 0.5,
      172: 0.7,
      176: 0.5,
      182: 0.5,
      372: 0.7,
      375: 0.8,
    },
    V8 = {
      29: [1, 10, "s"],
      30: [2, 10, "s"],
      31: [1, 8, "s"],
      32: [1, 5, "s"],
      34: [1, 10, "s"],
      35: [3, 8, "s"],
      37: [1, 8, "s"],
      41: [4, 4, "s"],
      271: [2, 5, "s"],
      318: [2, 5, "p"],
      322: [1, 5, "w3"],
      323: [5, 3, "p"],
      324: [1, 5, "s"],
      325: [1, 4, "f3"],
    },
    Gg = (s) =>
      s[2] === "p"
        ? { k: "line", n: 1, len: 96, pierce: !0, area: 0 }
        : s[2] === "w3"
          ? { k: "wall", n: 3, len: 72, pierce: !1, area: 0, w: 54 }
          : s[2] === "f3"
            ? { k: "fan", n: 3, len: 72, pierce: !1, area: 0, half: 0.36 }
            : null,
    Kg = (s) => (s[0] * 18) / (s[0] * s[1] + 1),
    Rg = new Set([
      2, 11, 17, 29, 30, 31, 32, 34, 35, 37, 38, 41, 139, 142, 147, 216, 218,
      219, 220, 221, 222, 223, 224, 225, 267, 271, 272, 323, 324, 325, 327, 368,
      404, 405, 406, 407, 408,
    ]),
    Q3 = {},
    Ie = (s) =>
      (s.base || []).reduce(
        (A, [n, t, e]) => A + (n === 28 || n === 29 ? t : 0),
        0,
      ) * He(s),
    X8 = (s, A) => {
      const n = (s.req || []).find((t) => t[0] === 38);
      return !n || n[1] < 0 || n[1] === (A || 0);
    },
    i1 = (s) => X8({ req: s }, r.sex),
    F1 = (s) => i1(s.req),
    f6 = 0.7,
    G3 = (s) =>
      s
        ? `${X(Math.round(s.tot * 0.85))} – ${X(Math.round(s.tot * 1.15))}`
        : "—",
    Zn = [
      10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
      170, 180, 190,
    ],
    Yg = [
      130, 376, 626, 871, 1195, 1711, 3433, 5432, 7235, 8289, 9807, 11292,
      12029, 13018, 14077, 14729, 15396, 16159, 16944,
    ],
    Fg = {
      shaolin: [
        26, 121, 225, 372, 942, 1741, 2340, 2621, 2908, 3586, 4307, 5272, 6572,
        7796, 8338, 8800, 9261, 9722, 10182,
      ],
      tianwang: [
        16, 121, 136, 158, 195, 264, 400, 562, 739, 781, 860, 902, 943, 985,
        1597, 2172, 2257, 2341, 10362,
      ],
      tangmen: [
        42, 177, 318, 469, 662, 1415, 2042, 2829, 3999, 4420, 5786, 5786, 7479,
        9367, 9825, 10283, 10741, 11199, 11658,
      ],
      wudu: [
        22, 201, 336, 445, 549, 2233, 4807, 8077, 11681, 12733, 13559, 14535,
        15269, 16006, 16743, 17482, 18222, 18963, 19704,
      ],
      emei: [
        41, 340, 844, 1153, 1595, 2177, 2995, 4212, 5045, 5937, 6736, 7621,
        8400, 9332, 9973, 10383, 11037, 11452, 11890,
      ],
      cuiyan: [
        12, 409, 678, 1056, 1480, 1646, 2134, 2917, 3794, 4237, 4422, 4666,
        4927, 5163, 5407, 5699, 5935, 6128, 6557,
      ],
      gaibang: [
        15, 220, 406, 589, 1132, 1995, 2784, 2911, 3098, 3821, 4448, 5189, 5963,
        6649, 7390, 8147, 8704, 9289, 9642,
      ],
      tianren: [
        15, 312, 531, 794, 1010, 1058, 1590, 2031, 2126, 2489, 2568, 2725, 2881,
        3038, 3195, 3352, 3510, 3667, 3824,
      ],
      wudang: [
        14, 179, 685, 1692, 1945, 2637, 3837, 4962, 6225, 7277, 8294, 9247,
        9753, 10166, 10547, 10922, 11300, 11679, 12059,
      ],
      kunlun: [
        7, 285, 531, 719, 891, 1597, 6847, 12929, 17293, 18850, 20108, 20820,
        21524, 22220, 22909, 23590, 24264, 24931, 25592,
      ],
    },
    Vg = 10,
    h6 = (s) => !!s && /bẫy/i.test(s.d || ""),
    W2 = { 32: "str", 33: "dex", 34: "vit", 35: "eng" },
    g6 = 10,
    m6 = { 32: "Sức mạnh", 33: "Thân pháp", 34: "Sinh khí", 35: "Nội công" },
    Z2 = (s) => (s >= 0 ? "+" : "") + (s * 100).toFixed(1) + "%",
    U8 = (s) => (s >= 0 ? "+" : "") + Math.round(s),
    J8 = (s) => !!s && s.tier === 90 && !(typeof xA == "function" && xA(s.id)),
    Aa = (s) => !!s && (r.lvl >= s.req || (s.tier === 90 && D0() > 0)),
    Xg = [
      [1, 19],
      [20, 39],
      [40, 59],
      [60, 79],
      [80, 999],
    ],
    W8 = 0.82,
    Ug = 0.75,
    Jg = 0.9,
    u6 = 0.75;
  $g();
  var Se = [
      10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 135, 150, 175, 200,
    ],
    Wg = 1,
    Zg = {
      shaolin: [
        0.99, 1.3, 1.23, 0.89, 1.5, 0.79, 1.1, 1.98, 1.34, 1.15, 1.17, 0.82,
        0.66, 0.48, 0.37, 0.31,
      ],
      tianwang: [
        1.06, 1.32, 1.82, 1.8, 1.47, 2.15, 2.27, 5.73, 5.09, 5.05, 6.63, 2.85,
        2.65, 2.01, 1.6, 0.62,
      ],
      tangmen: [
        0.66, 1.39, 1.91, 1.71, 2.15, 3.39, 1.79, 1.44, 1.59, 1.12, 2.21, 0.74,
        0.53, 0.41, 0.76, 1.43,
      ],
      wudu: [
        1.5, 1.19, 1.99, 1.47, 1.65, 1.77, 1.7, 1.47, 1.96, 1.82, 1.93, 0.99,
        0.31, 0.18, 0.17, 0.72,
      ],
      emei: [
        0.54, 0.36, 0.31, 0.38, 0.2, 0.27, 0.27, 0.26, 0.33, 0.25, 0.21, 0.5,
        0.54, 0.84, 0.69, 1.2,
      ],
      cuiyan: [
        1.25, 1.49, 1.38, 2.02, 0.97, 1.09, 1.41, 1.45, 2.04, 1.53, 1.35, 2.82,
        3.46, 7.14, 6.41, 8,
      ],
      gaibang: [
        1.48, 1.36, 1.81, 1.94, 0.5, 0.72, 1.04, 1.62, 3.54, 3.34, 3.42, 2.69,
        2.52, 2.02, 2.35, 5.63,
      ],
      tianren: [
        0.74, 1.57, 2.02, 1.66, 1.37, 1.3, 1.23, 1.45, 1.34, 1.57, 1.59, 1.16,
        1.29, 1.22, 1.12, 0.59,
      ],
      wudang: [
        0.63, 0.47, 0.17, 0.23, 0.18, 0.21, 0.33, 0.32, 0.27, 0.15, 0.15, 0.25,
        0.25, 0.25, 0.25, 0.12,
      ],
      kunlun: [
        1.69, 1.29, 0.94, 1.09, 1.68, 1.45, 2.53, 1.58, 1.73, 1.59, 1.69, 3.06,
        3.27, 2.99, 2.83, 1.17,
      ],
    },
    na = function (A) {
      const n = T[A];
      !n ||
        !n.book ||
        (r.sk[A] || 0) > 0 ||
        (r.bkOk && r.bkOk[A]) ||
        (V("misc", n.book, -1),
        ((r.bkOk || (r.bkOk = {}))[A] = 1),
        M(
          `📖 Lĩnh ngộ <b style="color:#ffd24a">${D(n.n)}</b> (dùng 1 ${Y3[n.book]})`,
        ));
    },
    K3 = function () {
      const A = Object.values(r.attr).reduce((t, e) => t + e, 0),
        n = Object.keys(r.sk).reduce(
          (t, e) => t + (T[e] && T[e].tier === 90 && !xA(e) ? 0 : r.sk[e]),
          0,
        );
      J(
        `<h3>Tẩy Tủy</h3><p class="desc">Trả lại điểm đã cộng để phân phối lại. Miễn phí, dùng bao nhiêu lần cũng được. Võ công 90 lĩnh ngộ bằng Bí Kíp 90 được giữ nguyên cấp; mọi võ công khác hoàn lại toàn bộ điểm.</p>
    <div class="card stats"><span>Tiềm năng đã cộng</span><span>${A}</span><span>Điểm kỹ năng đã cộng</span><span>${Math.max(0, n)}</span></div>
    <div class="btnrow"><button class="btn" id="ttA" ${A ? "" : "disabled"}>Tẩy tiềm năng</button><button class="btn" id="ttS" ${n > 0 ? "" : "disabled"}>Tẩy kỹ năng</button><button class="btn" id="ttAll" ${A || n > 0 ? "" : "disabled"}>Tẩy cả hai</button></div>`,
        () => {
          ((u("#ttA").onclick = () => Z8(!0, !1)),
            (u("#ttS").onclick = () => Z8(!1, !0)),
            (u("#ttAll").onclick = () => Z8(!0, !0)));
        },
      );
    },
    Z8 = function (A, n) {
      if (A)
        for (const t in r.attr) ((r.attrPts += r.attr[t]), (r.attr[t] = 0));
      if (n) {
        const t = I[r.fac].starter,
          e = r.bkOk || (r.bkOk = {}),
          a = {};
        for (const i in r.sk)
          (T[i] && T[i].book && (e[i] = 1),
            T[i] && T[i].tier === 90 && !xA(i)
              ? (a[i] = r.sk[i])
              : (r.skPts += r.sk[i]));
        ((r.sk = a), (r.main = 0), (r.mainLock = !1), (r.slots = [0, 0, 0, 0]));
      }
      ((c.dirty = !0),
        u0(),
        (c.life = Math.min(c.life, c.P.life)),
        (c.mana = Math.min(c.mana, c.P.mana)),
        O1(),
        MA(),
        t0(!0),
        F(),
        B(),
        i0("learn"),
        M(
          `🌊 Tẩy Tủy: ${[A && "tiềm năng", n && "kỹ năng"].filter(Boolean).join(" + ")} đã hoàn lại (${r.attrPts} tiềm năng, ${r.skPts} điểm kỹ năng).`,
        ));
    },
    R3 = function (A) {
      const n = T[A];
      if (!n || !b1(n)) return !1;
      if ((c.sim || na(A), J8(n) || r.skPts--, n.tier === 90 && !xA(A))) {
        const t = Ne();
        ((r.sk[A] = Math.max(1, t[A] ? t[A].lv : 1)),
          t[A] || (t[A] = { lv: 1, xp: 0 }));
      } else r.sk[A] = (r.sk[A] || 0) + 1;
      return !0;
    },
    A4 = function (A) {
      const n = Ht[A],
        t = T[A];
      if (!n || !t) return 0;
      const e = Math.min(...n.map((a) => r.sk[a] || 0));
      return e < 5 ? 0 : Math.min(t.max, 1 + Math.round(((e - 5) * 19) / 15));
    },
    w6 = function () {
      if (r.sk && !r.br90) {
        r.br90 = 1;
        for (const A in Ht) r.sk[A] > 1 && (r.sk[A] = 1);
      }
      for (const A in Ht) {
        const n = (r.sk && r.sk[A]) || 0;
        if (!n) continue;
        const t = A4(+A);
        n > t && ((r.skPts += n - t), t > 0 ? (r.sk[A] = t) : delete r.sk[A]);
      }
    },
    Am = function (A, n) {
      const t = T[A];
      return !NA(t) || !!(n && n[A]);
    },
    p6 = function (A, n, t) {
      if (!r.fac || !I[r.fac] || !(A > 0)) return;
      const e = Ne();
      for (const a in r.sk) {
        const i = T[a];
        if (!i || i.tier !== 90 || !r.sk[a] || Ht[a] || !Am(a, t)) continue;
        const o = e[a] || (e[a] = { lv: r.sk[a], xp: 0 });
        if (!(o.lv >= i.max)) {
          for (o.xp += A; o.lv < i.max && o.xp >= t4(o.lv);)
            ((o.xp -= t4(o.lv)),
              o.lv++,
              (r.sk[a] = o.lv),
              (c.dirty = !0),
              n ||
                (M(
                  `🔥 Luyện thành <b style="color:#ffd24a">${D(i.n)}</b> cấp ${o.lv}/${i.max}`,
                ),
                y(`${i.n} lên cấp ${o.lv}`)));
          o.lv >= i.max && (o.xp = 0);
        }
      }
    },
    nm = function (A) {
      !A ||
        !(A.L >= r.lvl - 10) ||
        p6(A.cls === "boss" ? 20 : A.cls === "elite" ? 3 : 1, !1, A.hitSk);
    },
    tm = function (A) {
      const n = T[A],
        t = Ne()[A];
      if (!n || n.tier !== 90) return "";
      if (Ht[A]) {
        const e = Ht[A].filter((a) => T[a]);
        return `Không luyện: cộng điểm kỹ năng, tối đa cấp ${A4(A)} (tất cả chiêu hỗ trợ đạt 5 → 1, mỗi lần tất cả +1 → +1, tất cả 20 → 20) · ${e.map((a) => `${T[a].n} ${r.sk[a] || 0}`).join(", ")}`;
      }
      return !t || t.lv >= n.max
        ? t
          ? "Đã luyện tối đa"
          : "Học xong rồi luyện bằng cách đánh quái"
        : `Luyện ${t.xp}/${t4(t.lv)}`;
    },
    Y3 = { bk90: "Bí Kíp 90" };
  (function () {
    for (const A of Object.values(T))
      A && A.learn === "90" && ((A.req = 80), (A.book = "bk90"), (A.tier = 90));
  })();
  var n4 = (s) =>
      !s.book ||
      D0() > 0 ||
      (r.sk[s.id] || 0) > 0 ||
      !!(r.bkOk && r.bkOk[s.id]) ||
      (typeof N == "function" && N("misc", s.book) > 0),
    Ht = {
      332: [93, 89, 86, 92, 282],
      391: [136, 137, 140, 364, 143],
      394: [392, 174, 393, 175, 181, 90],
      390: [67, 70, 64, 73, 356, 72],
      351: [347, 303, 343, 345, 349],
    },
    xA = (s) => !!Ht[s],
    t4 = (s) => Math.round(25 * Math.pow(s, 1.35) + 25),
    Ne = () => r.skL || (r.skL = {}),
    V1 = function (A) {
      return A
        ? NA(A)
          ? "atk"
          : A.aura
            ? Object.keys(A.attr || {}).length || xn[A.id]
              ? "aura"
              : "none"
            : lm(A)
              ? A.enemy
                ? "curse"
                : "buff"
              : "passive"
        : "none";
    },
    $t = function (A, n) {
      let t = 0;
      for (const e in A.attr) {
        if (/^(skill_|missle_|addskill)/.test(e)) continue;
        const a = P0(A, e, n);
        a && a[1] > t && (t = a[1]);
      }
      return t > 0 ? t / rm : 0;
    },
    em = function () {
      return V3()[0] || 0;
    },
    am = function (A) {
      for (const n of V3()) xn[n] && sm(n, A);
    },
    sm = function (A, n) {
      const t = xn[A];
      if (
        !t ||
        !c.P ||
        !c.P.main ||
        c.town ||
        c.deadT > 0 ||
        (a4[A] = (a4[A] || 0) - n) > 0
      )
        return;
      a4[A] = t.every;
      const e = Math.max(1, q3(A)),
        a = x6(A, e);
      if (!(a > 0)) return;
      const i = c.enemies.filter(
        (l) => !l.dead && l.hp > 0 && F0(b, l) <= t.rad,
      );
      if (!i.length) return;
      const o = j0();
      for (const l of i) {
        const d = kn(l),
          h = d
            ? Object.fromEntries(q0.map((f) => [f, l.res[f] + (d.res[f] || 0)]))
            : l.res;
        let g =
          n2(
            a * A0(0.9, 1.1) * (d && d.poison ? 1 + d.poison / 100 : 1),
            t.el,
            o,
            l.series,
            h,
            75,
            c.P.series5 || 0,
          ) * De();
        if (
          (t.el === "poison" &&
            !(l.poison > 0) &&
            typeof st == "function" &&
            st(l, "Độc", "#8fe34a"),
          t.el === "poison")
        ) {
          const f = l.poison > 0 ? l.poisonDmg * l.poison : 0;
          ((l.poisonDmg = (f + g) / Gt), (l.poison = Gt));
        } else l.hp -= g;
      }
    },
    F3 = function (A) {
      const n = V1(A);
      return n === "passive"
        ? !0
        : n === "aura"
          ? B6(A.id)
          : n === "buff"
            ? e4(A.id) || !!c.buffAssume
            : !1;
    },
    D6 = function (A) {
      if (
        (am(A),
        (s4 -= A),
        s4 > 0 || ((s4 = 0.5), !r.fac || !c.P || c.deadT > 0 || c.town))
      )
        return;
      const n = qe(),
        t = Le();
      let e = !1;
      for (const i in t.buff)
        t.buff[i] <= n && t.buff[i] > 0 && ((t.buff[i] = 0), (e = !0));
      const a = c.enemies.some((i) => !i.dead);
      for (const i in r.sk) {
        const o = T[i];
        if (!(r.sk[i] || 0)) continue;
        const d = V1(o);
        if (
          (d !== "buff" && d !== "curse") ||
          (d === "buff" && r.autoBuff === !1) ||
          (d === "curse" && r.autoCurse === !1)
        )
          continue;
        const h = q3(i),
          g = dm(o, h),
          f = $t(o, h),
          m = K8(o),
          w = () => {
            m ? (c.life = Math.max(1, c.life - g)) : (c.mana -= g);
          };
        if (!(m ? c.life < g + c.P.life * 0.3 : c.mana < g + c.P.mana * 0.15)) {
          if (d === "buff") {
            if (e4(i)) continue;
            if (f < 5) {
              if (!(a && c.life < c.P.life * 0.6) || (t.cd[i] || 0) > n)
                continue;
              const p = P0(o, "lifereplenish_v", h);
              (w(),
                t2((p ? p[0] : 0) * f * 2, !1),
                (t.cd[i] = n + 8),
                EA(b.x, b.y - 60, "✚ " + o.n, "#8f8", 12));
              continue;
            }
            (w(),
              (t.buff[i] = n + f),
              (e = !0),
              typeof i0 == "function" && i0("use"));
          } else if (a) {
            const P = c.enemies
              .filter((H) => !H.dead && !((H.curse || {})[i] > n))
              .sort(
                (H, _) =>
                  (_.cls === "boss") - (H.cls === "boss") ||
                  (_.cls === "elite") - (H.cls === "elite") ||
                  Math.hypot(H.x - b.x, H.y - b.y) -
                    Math.hypot(_.x - b.x, _.y - b.y),
              )[0];
            if (
              !P ||
              F0(b, P) > 420 ||
              (P.cls === "normal" &&
                c.enemies.filter((H) => !H.dead).length < 3)
            )
              continue;
            w();
            const v = P.curse || (P.curse = {});
            ((v[i] = n + Math.min(f, 60)),
              typeof r2 == "function" && r2({ id: +i }));
            for (const H of c.enemies)
              H !== P &&
                !H.dead &&
                F0(P, H) < 120 &&
                ((H.curse || (H.curse = {}))[i] = n + Math.min(f, 60));
          }
        }
      }
      e && (c.dirty = !0);
    },
    kn = function (A) {
      const n = A.curse;
      if (!n) return null;
      const t = qe(),
        e = {
          res: {},
          def: 0,
          ar: 0,
          dmg: 0,
          ret: 0,
          slow: 0,
          regen: 0,
          poison: 0,
          crit: 0,
        };
      let a = !1;
      for (const i in n) {
        if (n[i] <= t) continue;
        const o = T[i],
          l = Math.max(1, (A.curseL && A.curseL[i]) || q3(i));
        if (o) {
          a = !0;
          for (const d in o.attr) {
            if (/^(skill_|missle_|addskill)/.test(d)) continue;
            const h = P0(o, d, l);
            if (!h) continue;
            const g = h[0];
            if (d === "allres_p")
              for (const f of q0) e.res[f] = (e.res[f] || 0) + g;
            else if (/res_p$/.test(d)) {
              const f = d.startsWith("physics")
                ? "phys"
                : d.startsWith("lighting")
                  ? "light"
                  : d.replace("res_p", "");
              e.res[f] = (e.res[f] || 0) + g;
            } else
              d === "adddefense_v"
                ? (e.def += g)
                : d === "attackratingenhance_p"
                  ? (e.ar += g)
                  : d === "addphysicsdamage_p"
                    ? (e.dmg += g)
                    : d === "meleedamagereturn_p"
                      ? (e.ret += -g)
                      : d === "fasthitrecover_v"
                        ? (e.slow += -g)
                        : d === "lifereplenish_v"
                          ? (e.regen += g)
                          : d === "poisontimereduce_p"
                            ? (e.poison += -g)
                            : d === "deadlystrikeenhance_p" && (e.crit += g);
          }
        }
      }
      return a ? e : null;
    },
    im = function (A) {
      const n = V1(A),
        t = r.sk[A.id] || 0;
      if (n === "buff") {
        const e = $t(A, Math.max(1, t));
        return e < 5
          ? '<span class="tag buff">Hồi phục</span>'
          : `<span class="tag buff">Bùa lợi ${Math.round(e)}s</span>${t && e4(A.id) ? ` <small class="cp">đang có ${Math.ceil(Le().buff[A.id] - qe())}s</small>` : ""}`;
      }
      return n === "aura" && xn[A.id]
        ? `<span class="tag aura">Vòng sáng độc</span> <small class="dim">mỗi ${String(Math.round(xn[A.id].every * 100) / 100).replace(".", ",")}s phủ độc quái trong ${xn[A.id].rad} · độc ${xn[A.id].tab[Math.min(Math.max(1, t + ((c.P && c.P.plusSkill) || 0)), 30) - 1]} điểm/lần → ~${X(x6(A.id, Math.max(1, t + ((c.P && c.P.plusSkill) || 0))))}/nhịp</small>${t ? (em() === A.id ? ' <small class="cp">● đang bật</small>' : ` <button class="btn sm" data-aura="${A.id}">Bật</button>`) : ""}`
        : n === "aura"
          ? `<span class="tag aura">Vòng sáng</span>${t ? (B6(A.id) ? ` <small class="cp">● đang bật</small> <button class="btn sm" data-aura="${A.id}">Tắt</button>` : ` <button class="btn sm" data-aura="${A.id}">Bật</button>`) : ""}`
          : n === "curse"
            ? `<span class="tag curse">Bùa hại ${Math.round(Math.min(60, $t(A, Math.max(1, t))))}s</span>`
            : n === "passive"
              ? '<span class="tag">Bị động</span>'
              : "";
    },
    P6 = function (A) {
      A.querySelectorAll("[data-aura]").forEach(
        (n) =>
          (n.onclick = (t) => {
            t.stopPropagation();
            const e = n.dataset.aura,
              a = r.auraOff || (r.auraOff = {});
            (a[e] ? delete a[e] : (a[e] = 1),
              (c.dirty = !0),
              u0(),
              B(),
              y(`${a[e] ? "Tắt" : "Bật"} vòng sáng: ${T[e].n}`),
              F());
          }),
      );
    },
    v6 = function () {
      return `<label><input type="checkbox" id="cBuff" ${r.autoBuff === !1 ? "" : "checked"}> Tự thi triển bùa lợi khi hết thời gian (tốn nội lực)</label>
    <label><input type="checkbox" id="cCurse" ${r.autoCurse === !1 ? "" : "checked"}> Tự thi triển bùa hại lên trùm, tinh anh hoặc đám từ 3 quái</label>`;
    },
    b6 = function () {
      const A = u("#cBuff"),
        n = u("#cCurse");
      (A &&
        (A.onchange = () => {
          ((r.autoBuff = A.checked), B());
        }),
        n &&
          (n.onchange = () => {
            ((r.autoCurse = n.checked), B());
          }));
    },
    y6 = function () {
      const A = [];
      Q8() &&
        A.push({
          ic: "img/ep/tanthu.png",
          t: -1,
          n: `Hỗ Trợ Tân Thủ: mỗi giây hồi ${Wn.life * 100}% sinh lực, ${Wn.mana * 100}% nội lực, +${N3 * 100}% kinh nghiệm (đến cấp ${Ee})`,
        });
      for (const e of V3())
        A.push({ ic: T[e].ic, t: -1, n: "Vòng sáng: " + T[e].n });
      const n = qe();
      for (const e in Le().buff)
        Le().buff[e] > n &&
          T[e] &&
          r.sk[e] &&
          A.push({ ic: T[e].ic, t: Le().buff[e] - n, n: T[e].n });
      const t = Date.now();
      for (const e in r.buf || {}) {
        const a = r.buf[e];
        a &&
          a.until > t &&
          qa[e] &&
          A.push({
            ic: fm[e] || "img/ep/fd.png",
            t: (a.until - t) / 1e3,
            n: `${qa[e]} +${e === "luck" ? Math.round(a.p) : Math.round(a.p * 100) + "%"}`,
          });
      }
      return A;
    },
    rm = 18,
    om = [
      1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6,
      6, 6, 6, 6, 7,
    ],
    xn = {
      69: { el: "poison", every: 10 / 18, rad: 180, tab: om, col: "#8fe34a" },
    },
    k6 = (s) => {
      const A = xn[s],
        n = T[s] && T[s].attr && T[s].attr.poisondamage_v;
      return (
        A.sk ||
        (A.sk = Object.assign({}, T[s], {
          aura: 0,
          attr: { poisondamage_v: n || A.tab.map((t) => [t, 60, 10]) },
        }))
      );
    },
    x6 = (s, A) => {
      const n = xn[s],
        t = Math.min(A, (k6(s).attr.poisondamage_v || n.tab).length);
      return (c.P && (U2(c.P, k6(s), t).parts || {})[n.el]) || 0;
    },
    lm = (s) => !!(s.attr && s.attr.skill_cost_v),
    cm = {
      atk: "Tấn công",
      passive: "Bị động",
      buff: "Bùa lợi",
      aura: "Vòng sáng",
      curse: "Bùa hại",
      none: "—",
    },
    dm = (s, A) => (P0(s, "skill_cost_v", A) || [0])[0] || 0,
    Le = () => c.sks || (c.sks = { buff: {}, cd: {} }),
    qe = () => c.clock || 0,
    e4 = (s) => (Le().buff[s] || 0) > qe() && !!r.sk[s],
    V3 = () =>
      Object.keys(r.sk || {})
        .filter(
          (s) =>
            r.sk[s] && T[s] && V1(T[s]) === "aura" && !(r.auraOff || {})[s],
        )
        .map(Number),
    B6 = (s) => V3().includes(+s),
    a4 = {},
    s4 = 0,
    _6 = (s) => !!kn(s),
    fm = {
      tt: "img/ep/tt.png",
      luck: "img/ep/qht.png",
      xp: "img/ep/fd.png",
      drop: "img/ep/mys.png",
    },
    hm = (s) =>
      s < 0
        ? "N/A"
        : s >= 3600
          ? Math.floor(s / 3600) + "h"
          : s >= 60
            ? Math.floor(s / 60) + "m"
            : Math.ceil(s) + "s",
    gm = function (A) {
      const n = Math.min(ea(A), N("misc", A)),
        t = r1.find((e) => e.k === A);
      !n ||
        !t ||
        (V("misc", A, -n),
        (r.knb = (r.knb || 0) + n * t.knb),
        (Y = !0),
        M(
          `🏮 Bán lại ${n} ${t.n} dư cho Kỳ Trân Các: +<b class="gold">${n * t.knb} Kim Nguyên Bảo</b>`,
        ),
        y(`+${n * t.knb} Kim Nguyên Bảo`),
        B(),
        typeof F == "function" && F());
    },
    na = function (A) {
      if (!(N("misc", A) < 1)) {
        if (!At()) {
          y("Cần cấp 80 (hoặc đã chuyển sinh) mới dùng được");
          return;
        }
        if (!g4(A)) {
          y(`Đã dùng tối đa ${VA(A)} cuốn`);
          return;
        }
        (V("misc", A, -1),
          M("📖 " + i4(A)),
          (Y = !0),
          (c.dirty = !0),
          B(),
          typeof F == "function" && F());
      }
    },
    i4 = function (A) {
      {
        const t = Bn(A) + 1;
        r.useN[A] = t;
      }
      if (A === "vlmt")
        return (
          (r.skPts = (r.skPts || 0) + 1),
          (r.bonusSkp = (r.bonusSkp || 0) + 1),
          `Võ Lâm Mật Tịch: +1 điểm kỹ năng (${Bn(A)}/${VA(A)})`
        );
      const n = Mm();
      return (
        (r.attrPts = (r.attrPts || 0) + n),
        (r.bonusAtp = (r.bonusAtp || 0) + n),
        `Tẩy Tủy Kinh: +${n} điểm tiềm năng (${Bn(A)}/${VA(A)})`
      );
    },
    je = function (A, n) {
      return `${A.n}${n > 1 ? " ×" + n : ""}`;
    },
    mm = function (A, n) {
      const t = r1.find((a) => a.k === A);
      if (!t) return !1;
      const e = r.inv.find((a) => a.ktc && a.ktc.k === A && a.ktc.c < J3);
      if (e) {
        const a = Math.min(n, J3 - e.ktc.c);
        ((e.ktc.c += a), (e.n = je(t, e.ktc.c)), (n -= a));
      }
      for (; n > 0;) {
        if (r.inv.length >= INV_MAX) return !1;
        const a = Math.min(n, J3);
        (r.inv.push({
          uid: r.uid++,
          n: je(t, a),
          d: 99,
          k: 0,
          lvl: 1,
          s: -1,
          r: 2,
          ic: t.ic,
          price: 0,
          base: [],
          req: [],
          mag: [],
          ext: [],
          ktc: { k: A, c: a },
        }),
          (n -= a));
      }
      return ((Y = !0), !0);
    },
    M6 = function (A) {
      const n = A && A.ktc && r1.find((a) => a.k === A.ktc.k);
      if (!n || !r.inv.includes(A)) return !1;
      const t = n.k;
      let e = "";
      if (t === "vlmt" || t === "ttk") {
        if (!At())
          return (y("Cần cấp 80 (hoặc đã chuyển sinh) mới dùng được"), !1);
        if (!g4(t)) return (y(`Đã dùng tối đa ${VA(t)} cuốn`), !1);
        e = i4(t);
      } else
        t === "ldt" ||
        t === "ldp" ||
        t === "dgt" ||
        t === "dtbk" ||
        t === "rngua"
          ? (V("misc", t, 1), (e = `Cất 1 ${n.n} vào túi vật phẩm`))
          : t === "mt90"
            ? (V("misc", "bk90", 1),
              (e = "Cất 1 Bí Kíp 90 (lĩnh ngộ ở thẻ Võ công)"))
            : (e = n.use());
      return (
        A.ktc.c--,
        A.ktc.c <= 0
          ? r.inv.splice(r.inv.indexOf(A), 1)
          : (A.n = je(n, A.ktc.c)),
        t === "rngua" && typeof qn == "function" && qn(1),
        M("🏮 " + D(e)),
        (Y = !0),
        (c.dirty = !0),
        B(),
        typeof F == "function" && F(),
        !0
      );
    },
    H6 = function (A, n) {
      if (A === "ldp") return ta();
      if (A === "dgt") return l4();
      const t = () => {
        (t0(!0), (typeof Dn == "function" && Dn() ? u3 : iA)("skill"));
      };
      if (A === "dtbk") {
        (t(), y("Bấm 📕 ở võ công 90 đã học để đại thành cấp 20"));
        return;
      }
      if (A === "mt90") {
        (t(), y("Bấm + ở võ công 90 để lĩnh ngộ (không tốn điểm)"));
        return;
      }
      if (A === "ldt") return (k2(!1), AA());
      if (A === "rngua") return (qn(n), AA());
    },
    um = function (A, n = 1) {
      const t = r1.find((i) => i.k === A);
      if (!t || !sa(t)) return;
      if (A === "mt90" && r.lvl < 80 && !D0()) {
        y("Võ công 90 cần cấp 80");
        return;
      }
      if (A === "ldt" && r.lvl < mA) {
        y(`Dã Tẩu mở từ cấp ${mA}`);
        return;
      }
      const e = aa[A];
      if (e && N("misc", e) >= (A === "rngua" ? n : 1)) return H6(A, n);
      let a = 0;
      for (let i = 0; i < n; i++) {
        let o = r.inv.find((l) => l.ktc && l.ktc.k === A);
        if (!o && (A === "vlmt" || A === "ttk") && N("misc", A) > 0) {
          if (!At()) {
            y("Cần cấp 80 (hoặc đã chuyển sinh) mới dùng được");
            break;
          }
          if (!g4(A)) {
            y(`Đã dùng tối đa ${VA(A)} cuốn`);
            break;
          }
          (V("misc", A, -1), M("🏮 " + D(i4(A))), a++);
          continue;
        }
        if (!o) break;
        if (A === "rngua") {
          (o.ktc.c--,
            o.ktc.c <= 0
              ? r.inv.splice(r.inv.indexOf(o), 1)
              : (o.n = je(t, o.ktc.c)),
            V("misc", "rngua", 1),
            a++);
          continue;
        }
        if (!M6(o) || (a++, e)) break;
      }
      if (!a) return AA();
      if (e) return H6(A, a);
      (a > 1 && y(`Đã dùng ${t.n} ×${a}`), AA());
    },
    $6 = function () {
      document
        .querySelectorAll("#mBody [data-ktcuse]")
        .forEach((A) => (A.onclick = () => um(A.dataset.ktcuse, 1)));
    },
    wm = function (A, n) {
      const t = A && A.ktc && r1.find((e) => e.k === A.ktc.k);
      if (((n = Math.floor(n)), !(!t || !(n > 0) || n >= A.ktc.c))) {
        if (r.inv.length >= INV_MAX) {
          y("Hành trang đầy");
          return;
        }
        ((A.ktc.c -= n),
          (A.n = je(t, A.ktc.c)),
          r.inv.push({
            uid: r.uid++,
            n: je(t, n),
            d: 99,
            k: 0,
            lvl: 1,
            s: -1,
            r: 2,
            ic: t.ic,
            price: 0,
            base: [],
            req: [],
            mag: [],
            ext: [],
            ktc: { k: t.k, c: n },
          }),
          (Y = !0),
          B());
      }
    },
    T6 = function s(A) {
      const n = r1.find((e) => e.k === A.ktc.k) || { n: A.n, d: "" },
        t = A.ktc.c;
      J(
        `<h3>${D(A.n)}</h3><p class="desc">${D(n.d || "")}</p><p class="small">Giá Kỳ Trân Các: <b class="gold">${n.knb || 0} KNB</b> · đang có <b>${t}</b></p>
    <div class="row">Số lượng tách: <input id="kiN" type="number" min="1" max="${Math.max(1, t - 1)}" value="1" style="width:70px"></div>
    <div class="btnrow"><button class="btn" id="kiUse">Dùng 1</button><button class="btn" id="kiSplit" ${t > 1 ? "" : "disabled"}>Tách ra</button><button class="btn" id="kiClose">Đóng</button></div>
    <p class="dim small">Gửi thư / bày bán Chợ: chọn món này như trang bị (tách ra trước nếu chỉ muốn bán một phần).</p>`,
        () => {
          ((u("#kiUse").onclick = () => {
            (M6(A), r.inv.includes(A) ? s(A) : t0(!0));
          }),
            (u("#kiSplit").onclick = () => {
              (wm(A, +u("#kiN").value), t0(!0), typeof F == "function" && F());
            }),
            (u("#kiClose").onclick = () => t0(!0)));
        },
      );
    },
    pm = function (A) {
      if (((A = Math.min(Math.floor(A), r.knb | 0)), !(A > 0))) {
        y("Không đủ Kim Nguyên Bảo");
        return;
      }
      ((r.knb -= A),
        (r.gold += A * X3),
        M(`🏮 Đổi ${A} Kim Nguyên Bảo → <b>${j(A * X3)}</b> lượng`),
        y(`+${j(A * X3)} lượng`),
        B(),
        typeof F == "function" && F());
    },
    r4 = function () {
      const A = r.invX | 0,
        n = s1[A];
      if (n == null) {
        y("Đã mở rộng tối đa");
        return;
      }
      if ((r.knb | 0) < n) {
        y("Không đủ Kim Nguyên Bảo");
        return;
      }
      ((r.knb -= n),
        (r.invX = A + 1),
        (Y = !0),
        M(
          `🎒 Mở rộng hành trang (Rương ${A + 1}): −${n} KNB → <b>${INV_MAX} ô</b>`,
        ),
        y(`Hành trang ${INV_MAX} ô`),
        i0 && i0("learn"),
        B(),
        typeof F == "function" && F());
    },
    _k = function s() {
      J(
        `<h3>🎒 Mở rộng hành trang</h3><div class="u2cards">${Dm()}</div><p class="small dim">Như JX1: Rương 1 / 2 / 3 giá ${s1.join(" / ")} KNB, mỗi rương +${Bt} ô (tối đa ${F2 + Bt * s1.length}).</p>`,
      );
      const A = document.querySelector("#mBody [data-invx]");
      A &&
        (A.onclick = () => {
          (r4(), s());
        });
    },
    Dm = function () {
      const A = r.invX | 0,
        n = s1[A];
      return `<div class="u2card" title="Mở rộng hành trang như JX1"><div class="u2ct">Mở rộng hành trang</div><div class="u2cb"><img src="img/ep/knb.png" alt=""><div><div>${n == null ? "Đã mở đủ 3 rương" : `Rương ${A + 1}: <b>+${Bt} ô</b>`}</div><small class="dim">${INV_MAX}/${F2 + Bt * s1.length} ô · ${s1.map((t, e) => (e < A ? "✓" : "") + t).join(" / ")} KNB</small></div></div><div class="u2cf">${n == null ? "" : `<button class="u2buy" data-invx="1" ${(r.knb | 0) >= n ? "" : "disabled"}>${n} KNB</button>`}</div></div>`;
    },
    o4 = function (A) {
      const n = T[A],
        t = r && I[r.fac];
      return !!(
        n &&
        n.tier === 90 &&
        t &&
        (t.skills || []).some((e) => +e == +A) &&
        (r.sk[A] | 0) >= 1 &&
        (r.sk[A] | 0) < n.max &&
        (typeof Aa != "function" || Aa(n)) &&
        (typeof xA != "function" || !xA(A)) &&
        (!n.book || (r.bkOk && r.bkOk[A]) || (Ne()[A] && Ne()[A].lv >= 1))
      );
    },
    C6 = function (A) {
      const n = T[A];
      if (!n || N("misc", "dtbk") < 1) return;
      if (!o4(A)) {
        y("Phải học võ công 90 này trước mới dùng được Đại Thành Bí Kíp");
        return;
      }
      const t = Ne(),
        e = t[A] || (t[A] = { lv: r.sk[A], xp: 0 });
      if (e.lv >= n.max) {
        y("Đã đại thành");
        return;
      }
      (V("misc", "dtbk", -1),
        (e.lv = n.max),
        (e.xp = 0),
        (r.sk[A] = n.max),
        (c.dirty = !0),
        u0(),
        M(
          `📕 Dùng Đại Thành Bí Kíp: <b style="color:#ffd24a">${D(n.n)}</b> đại thành cấp ${n.max}!`,
        ),
        y(`${n.n} cấp ${n.max}`),
        i0("levelup"),
        B(),
        F());
    },
    Pm = function (A, n = 1, t = !1) {
      const e = r1.find((l) => l.k === A);
      if (!e || !sa(e)) return;
      let a = 0;
      const i = [];
      for (let l = 0; l < n && Tt(e); l++) {
        const d = y1.includes(e.k);
        if (d && !Hm(e.k)) {
          y("Hành trang đầy");
          break;
        }
        (e.knb ? (r.knb -= e.knb) : (r.gold -= e.gold),
          d
            ? (mm(e.k, 1),
              i.push(`Nhận 1 ${e.n} (vào hành trang, bán Chợ được)`))
            : i.push(e.use()),
          a++);
      }
      if (!a)
        return (
          y(
            e.can && !e.can()
              ? At()
                ? `Đã dùng tối đa ${VA(e.k)} cuốn`
                : "Cần cấp 80"
              : e.knb
                ? "Không đủ Kim Nguyên Bảo"
                : "Không đủ ngân lượng",
          ),
          0
        );
      Q().stat.ktc = (Q().stat.ktc || 0) + a;
      const o = i[i.length - 1];
      return (
        M(
          `🏮 Kỳ Trân Các: ${a > 1 ? `mua ${a} × ${D(e.n)} · ` : ""}${D(a > 1 && e.k.startsWith("r") ? i.join(" · ") : o)} (−${e.knb ? e.knb * a + " Kim Nguyên Bảo" : j(e.gold * a) + " lượng"})`,
        ),
        t || y(a > 1 ? `${e.n} ×${a}` : o),
        i0("learn"),
        (c.dirty = !0),
        (Y = !0),
        B(),
        t || AA(),
        a
      );
    },
    AA = function s() {
      const A = c.P ? Math.round(c.P.lucky) : 0;
      J(
        `<h3>🏮 Kỳ Trân Các <small><img src="img/ep/knb.png" alt="" style="height:14px;vertical-align:middle;image-rendering:pixelated"> ${r.knb || 0} Kim Nguyên Bảo · ${j(r.gold)} lượng</small></h3>
    <p class="desc">Giá cố định. Mua bằng <b>Kim Nguyên Bảo</b> (rơi từ trùm 10%, trùm Hoàng Kim / boss tuần 50%); Rương Huyền Tinh và Rương Đá Thuộc Tính mua bằng ngân lượng. Mua là dùng ngay; riêng Võ Lâm Mật Tịch, Tẩy Tủy Kinh, Rương Ngựa vào Hành trang (bán Chợ được), bấm <b>Dùng</b> để dùng.</p>
    ${I6()}${ft() ? `<div class="card small">Đang có: ${ft()}</div>` : ""}
    <div class="shoplist">${r1
      .map((n) => {
        const t = sa(n),
          e = n.can
            ? ` · đã dùng ${Bn(n.k)}/${VA(n.k)}${At() ? "" : " · cần cấp 80"}`
            : "",
          a =
            n.k === "mt90"
              ? N("misc", "bk90")
              : n.k === "dtbk"
                ? N("misc", "dtbk")
                : n.k === "ldp"
                  ? N("misc", "ldp")
                  : n.k === "ldt"
                    ? N("misc", "ldt")
                    : n.k === "dgt"
                      ? N("misc", "dgt")
                      : n.k === "rngua"
                        ? N("misc", "rngua")
                        : n.k === "knb"
                          ? `${U3().n} hôm nay (không giới hạn)`
                          : null;
        return `<div class="shoprow ktc${t ? "" : " bad"}"><img src="${n.ic}" alt="" style="image-rendering:pixelated"><span><b>${D(n.n)}</b><small>${D(n.d)}${e}${a != null ? (n.k === "knb" ? ` · đã đổi ${a}` : ` · có ${a}`) : ""}${t ? "" : " · cần phiên bản 2 (đổi ở thẻ Khác)"}</small></span>
        <span class="btnrow"><button class="btn sm${n.knb ? " knb" : ""}" data-ktc="${n.k}" ${t && Tt(n) ? "" : "disabled"}>${S6(n)}</button>${n.k === "dtbk" || n.k === "ldp" || n.k === "dgt" ? "" : `<button class="btn sm" data-ktc10="${n.k}" ${t && Tt(n, 10) ? "" : "disabled"}>×10</button>`}${n.k === "knb" ? `<button class="btn sm" data-ktc100="knb" ${t && Tt(n, 100) ? "" : "disabled"}>×100</button>` : ""}${E6(n, "btn sm")}</span></div>`;
      })
      .join("")}</div>
    <p class="dim small">May mắn hiện tại: <b>${A}</b> (trang bị + Quế Hoa Tửu). Mỗi điểm: đồ rơi có nhiều dòng / dòng cấp cao hơn, +0,5% tỉ lệ rơi đồ.</p>`,
        () => {
          (document
            .querySelectorAll("#mBody [data-ktc]")
            .forEach((d) => (d.onclick = () => ze(d.dataset.ktc, 1))),
            document
              .querySelectorAll("#mBody [data-ktc10]")
              .forEach((d) => (d.onclick = () => ze(d.dataset.ktc10, 10))),
            $6(),
            document
              .querySelectorAll("#mBody [data-ktc100]")
              .forEach((d) => (d.onclick = () => ze(d.dataset.ktc100, 100))));
          const n = u("#ktcLdp");
          n && (n.onclick = ta);
          const t = u("#ktcMt");
          t &&
            (t.onclick = () => {
              if (r.lvl < 80 && !D0()) {
                y("Võ công 90 cần cấp 80");
                return;
              }
              (t0(!0),
                iA("skill"),
                y("Bấm + ở võ công 90 để lĩnh ngộ (không tốn điểm)"));
            });
          const e = u("#ktcDgt");
          e && (e.onclick = l4);
          const a = u("#ktcDtbk");
          a &&
            (a.onclick = () => {
              (t0(!0),
                iA("skill"),
                y("Bấm 📕 ở võ công 90 đã học để đại thành cấp 20"));
            });
          const i = u("#ktcRngua");
          i &&
            (i.onclick = () => {
              (qn(1), s());
            });
          const o = u("#ktcRngua10");
          o &&
            (o.onclick = () => {
              (qn(10), s());
            });
          const l = u("#ktcLdt");
          l &&
            (l.onclick = () => {
              if (r.lvl < mA) {
                y(`Dã Tẩu mở từ cấp ${mA}`);
                return;
              }
              (k2(!1), s());
            });
        },
      );
    },
    ta = function () {
      if (!r.fac || Kn()) {
        y("Vô Môn Phái: gia nhập môn phái ở cấp " + CA);
        return;
      }
      const A = N("misc", "ldp"),
        n = uA
          .filter((t) => !t.novice)
          .map((t) => {
            const e = Q1(t, r.sex) && t.key !== r.fac,
              a = t.starter && T[t.starter];
            return `<button data-dp="${t.key}" ${e && A ? "" : "disabled"} style="--c:${m0[t.series]}"><img src="${(H0.hero[t.key] || {}).img || ""}" alt=""><b>${D(t.n)}</b><small>${t.key === r.fac ? "Môn phái hiện tại" : Q1(t, r.sex) ? `Hệ ${d0[t.series]} · ${ld(t)}${a ? " · " + D(a.n) : ""}` : "Không nhận giới tính này"}</small></button>`;
          })
          .join("");
      J(
        `<h3>Đổi môn phái <small>${A} Lệnh Bài Đổi Phái</small></h3>
    <p class="desc">Dùng 1 Lệnh Bài Đổi Phái: chuyển sang phái mới (đổi cả hệ ngũ hành nếu khác hệ). <b>Giữ</b> cấp, tiềm năng, trang bị, cấp võ công 90 đã luyện; <b>hoàn lại toàn bộ điểm kỹ năng</b> để học võ công phái mới; nhận chiêu nhập môn + vũ khí phái mới.</p>
    ${A ? "" : '<p class="bad small">Chưa có Lệnh Bài Đổi Phái — mua ở Kỳ Trân Các.</p>'}<div class="facpick">${n}</div>`,
        () => {
          document.querySelectorAll("#mBody [data-dp]").forEach(
            (t) =>
              (t.onclick = async () => {
                const e = I[t.dataset.dp];
                (await ct(
                  `Đổi sang ${e.n}? Toàn bộ điểm kỹ năng được hoàn lại.`,
                  "Đổi phái",
                )) && vm(e.key);
              }),
          );
        },
      );
    },
    vm = function (A) {
      const n = I[A],
        t = I[r.fac];
      if (
        !n ||
        n.novice ||
        A === r.fac ||
        !Q1(n, r.sex) ||
        N("misc", "ldp") < 1
      )
        return;
      if (c.dg || c.tower) {
        y("Ra khỏi phó bản / tháp rồi đổi phái");
        return;
      }
      V("misc", "ldp", -1);
      const e = r.bkOk || (r.bkOk = {});
      for (const l in r.sk)
        (T[l] && T[l].book && (e[l] = 1),
          (r.skPts +=
            T[l] && T[l].tier === 90 && !(typeof xA == "function" && xA(l))
              ? 0
              : r.sk[l]));
      ((r.sk = {}),
        (r.fac = A),
        (r.main = 0),
        (r.mainLock = !1),
        (r.slots = [0, 0, 0, 0]),
        (r.auraOff = {}),
        (c.sks = null),
        n.starter &&
          ((r.sk[n.starter] = 1),
          (r.skPts = Math.max(0, r.skPts - 1)),
          (r.main = n.starter)));
      const a = H8(n),
        i = (l) => pA(a[0], a[1], l, 0);
      let o = null;
      for (
        let l = C(Math.round(r.lvl / 12) + 1, 1, 10);
        l >= 1 && ((o = i(l)), !(o && f0(o)));
        l--
      );
      (o && (r.inv.unshift(o), (Y = !0), f0(o) && $1(o, !0)),
        (c.dirty = !0),
        u0(),
        typeof an == "function" && an(),
        r.autoPts === !0 && Xn(),
        O1(),
        (c.dirty = !0),
        u0(),
        (c.life = Math.min(c.life, c.P.life)),
        (c.mana = Math.min(c.mana, c.P.mana)),
        t0(!0),
        MA(),
        F(),
        B(),
        i0("levelup"),
        (c.banner = {
          t: 2.8,
          text: "Gia nhập " + n.n,
          sub: `Rời ${t ? t.n : ""} · ${r.skPts} điểm kỹ năng chờ phân phối`,
        }),
        M(
          `🏮 Lệnh Bài Đổi Phái: rời <b>${D(t ? t.n : "")}</b>, gia nhập <b style="color:${m0[n.series]}">${D(n.n)}</b> (hệ ${d0[n.series]}). Hoàn lại ${r.skPts} điểm kỹ năng.`,
        ));
    },
    l4 = function () {
      const A = N("misc", "dgt"),
        n = r.sex ? 0 : 1,
        t = r.fac && r.fac in xt,
        e = Object.entries(r.eq)
          .filter(([a, i]) => i && a !== "horse" && !X8(i, n))
          .map(([, a]) => a);
      J(
        `<h3>Đổi giới tính <small>${A} thẻ</small></h3>
    <p class="desc">${r.sex ? "Nữ" : "Nam"} → <b>${n ? "Nữ" : "Nam"}</b>. Giữ cấp, tiềm năng, võ công, trang bị.</p>
    ${t ? `<p class="reqbad">${D(I[r.fac].n)} chỉ nhận ${xt[r.fac] ? "Nữ" : "Nam"}: cần đổi phái trước.</p>` : ""}
    ${e.length ? `<p class="small">Sẽ tháo vào hành trang (chỉ dành cho ${r.sex ? "Nữ" : "Nam"}): ${e.map((a) => D(a.n)).join(", ")}</p>` : ""}
    <div class="btnrow"><button class="btn red" id="dgtGo" ${A && !t ? "" : "disabled"}>Đổi sang ${n ? "Nữ" : "Nam"}</button><button class="btn" id="dgtNo">Đóng</button></div>`,
        () => {
          ((u("#dgtNo").onclick = () => AA()),
            (u("#dgtGo").onclick = () => {
              if (!(!(N("misc", "dgt") > 0) || t)) {
                if (r.inv.length + e.length > INV_MAX) {
                  y("Hành trang không đủ chỗ cho đồ phải tháo");
                  return;
                }
                (V("misc", "dgt", -1), (r.sex = n));
                for (const [a, i] of Object.entries(r.eq))
                  i && e.includes(i) && (delete r.eq[a], r.inv.unshift(i));
                ((Y = !0),
                  (c.dirty = !0),
                  u0(),
                  typeof an == "function" && an(),
                  (c.dirty = !0),
                  u0(),
                  MA(),
                  B(),
                  M(
                    `🎭 Dùng Thẻ Đổi Giới Tính: nhân vật đổi sang <b>${n ? "Nữ" : "Nam"}</b>${e.length ? ` (tháo ${e.length} món)` : ""}.`,
                  ),
                  y(`Đã đổi sang ${n ? "Nữ" : "Nam"}`),
                  i0("levelup"),
                  t0(!0),
                  F());
              }
            }));
        },
      );
    },
    c4 = 10,
    X3 = 8e4,
    d4 = 1e5,
    bm = 1 / 0,
    ym = 10,
    f4 = 5,
    h4 = () => {
      const s = Q(),
        A = Na(new Date());
      return (
        (!s.ldtBuy || s.ldtBuy.d !== A) && (s.ldtBuy = { d: A, n: 0 }),
        s.ldtBuy
      );
    },
    U3 = () => {
      const s = Q(),
        A = Na(new Date());
      return (
        (!s.knbBuy || s.knbBuy.d !== A) && (s.knbBuy = { d: A, n: 0 }),
        s.knbBuy
      );
    },
    km = 15,
    xm = 10,
    Bm = 10,
    _m = { vlmt: 5, ttk: 15 },
    VA = (s) => km + (_m[s] || 15) * (typeof D0 == "function" ? D0() : 0),
    Bn = (s) => (r.useN || (r.useN = {}))[s] | 0,
    At = () => r.lvl >= 80 || D0() > 0,
    g4 = (s) => At() && Bn(s) < VA(s),
    Mm = () =>
      D0() > 0 ? 5 : C(Math.floor((Math.min(r.lvl, 89) - 80) / 2) + 1, 1, 5),
    O6 = (s) => Bn(s) + N("misc", s) < VA(s),
    ea = (s) => Math.max(0, Bn(s) + N("misc", s) - VA(s)),
    r1 = [
      {
        k: "knb",
        n: "Kim Nguyên Bảo",
        ic: "img/ep/knb.png",
        gold: d4,
        d: "Đổi ngân lượng lấy Kim Nguyên Bảo · không giới hạn",
        use: () => (
          (r.knb = (r.knb || 0) + 1),
          U3().n++,
          "Nhận 1 Kim Nguyên Bảo"
        ),
      },
      {
        k: "tt",
        n: "Tiên Thảo Lộ",
        ic: "img/ep/tt.png",
        knb: 2,
        d: "+50% kinh nghiệm trong 60 phút (cộng dồn thời gian)",
        use: () => (
          Ea("tt", 0.5, 60),
          "Tiên Thảo Lộ: +50% kinh nghiệm 60 phút"
        ),
      },
      {
        k: "qht",
        n: "Quế Hoa Tửu",
        ic: "img/ep/qht.png",
        knb: 2,
        d: "+20 may mắn trong 60 phút: đồ rơi nhiều dòng / dòng tốt hơn, +10% tỉ lệ rơi đồ",
        use: () => (
          Ea("luck", 20, 60),
          (c.dirty = !0),
          "Quế Hoa Tửu: +20 may mắn 60 phút"
        ),
      },
      {
        k: "rht",
        n: "Rương Huyền Tinh",
        ic: "img/ep/box2.png",
        gold: 3e4,
        vio: 1,
        d: "2–3 Huyền Tinh Khoáng Thạch, mỗi viên cấp ngẫu nhiên 1–10 (mỗi cấp 10%)",
        use: () => {
          const s = C0(2, 3);
          return `Rương Huyền Tinh: ${xd(s)}`;
        },
      },
      {
        k: "rda",
        n: "Rương Đá Thuộc Tính",
        ic: "img/ep/box3.png",
        gold: 5e4,
        vio: 1,
        d: "1–2 đá thuộc tính (hợp hệ / loại đồ đang mặc)",
        use: () => {
          const s = [te(r.lvl)];
          return (
            Math.random() < 0.3 && s.push(te(r.lvl)),
            "Rương Đá Thuộc Tính: " + s.join(", ")
          );
        },
      },
      {
        k: "mt90",
        n: "Bí Kíp 90",
        ic: "img/ep/mt90.png",
        knb: 5,
        d: "Lĩnh ngộ 1 võ công 90 từ cấp 80 (cấp 1, sau đó luyện)",
        use: () => (V("misc", "bk90", 1), "Nhận 1 Bí Kíp 90"),
      },
      {
        k: "vlmt",
        n: "Võ Lâm Mật Tịch",
        ic: "img/ep/mt90.png",
        knb: xm,
        d: "JX1: từ cấp 80, mỗi cuốn +1 điểm kỹ năng · mỗi nhân vật tối đa 15 cuốn, mỗi lần chuyển sinh +5",
        use: () => (
          V("misc", "vlmt", 1),
          (Y = !0),
          "Nhận 1 Võ Lâm Mật Tịch (vào Hành trang, bấm Dùng)"
        ),
      },
      {
        k: "ttk",
        n: "Tẩy Tủy Kinh",
        ic: "img/ep/dtbk.png",
        knb: Bm,
        d: "JX1: từ cấp 80, mỗi cuốn +1 → 5 điểm tiềm năng (cấp 80 +1, mỗi 2 cấp +1, cấp 88 trở lên +5) · mỗi nhân vật tối đa 15 cuốn, mỗi lần chuyển sinh +15",
        use: () => (
          V("misc", "ttk", 1),
          (Y = !0),
          "Nhận 1 Tẩy Tủy Kinh (vào Hành trang, bấm Dùng)"
        ),
      },
      {
        k: "ldt",
        n: "Lệnh Bài Dã Tẩu",
        ic: "img/ep/ldt.png",
        knb: 5,
        d: "Tối đa 5 / ngày · +20 lượt nhiệm vụ Dã Tẩu trong ngày (dùng ở thẻ Nhiệm vụ › Dã Tẩu, tại đây, hoặc tự dùng khi hết lượt)",
        use: () => (V("misc", "ldt", 1), h4().n++, "Nhận 1 Lệnh Bài Dã Tẩu"),
      },
      {
        k: "ldp",
        n: "Lệnh Bài Đổi Phái",
        ic: "img/ep/ldp.png",
        knb: 20,
        d: "Đổi sang môn phái khác (kể cả khác hệ). Giữ cấp, tiềm năng, trang bị; hoàn lại toàn bộ điểm kỹ năng",
        use: () => (
          V("misc", "ldp", 1),
          "Nhận 1 Lệnh Bài Đổi Phái (dùng ở thẻ Nhân vật hoặc tại đây)"
        ),
      },
      {
        k: "dgt",
        n: "Thẻ Đổi Giới Tính",
        ic: "img/ep/ldp.png",
        knb: ym,
        d: "Đổi Nam ↔ Nữ: đổi ngoại hình; đồ chỉ dành cho giới cũ tự tháo vào hành trang. Giữ cấp, điểm, võ công. Thiếu Lâm / Nga My / Thúy Yên không đổi được",
        use: () => (V("misc", "dgt", 1), "Nhận 1 Thẻ Đổi Giới Tính"),
      },
      {
        k: "rngua",
        n: "Rương Ngựa",
        ic: "img/ep/box2.png",
        knb: 20,
        kx: 1,
        d: "Cất vào túi, bấm Dùng để mở 1 con ngựa (nguồn ngựa duy nhất) · Thường 56% · Tốt 31,5% · Quý 6% · Thần 3% · Danh mã 2% · Bảo mã 1% · Chí tôn 0,5% (Quý trở lên tự khóa; ngựa cấp yêu cầu cao cần Trùng Sinh). Còn rơi từ trùm, phó bản, mốc Dã Tẩu",
        use: () => (
          V("misc", "rngua", 1),
          "Nhận 1 Rương Ngựa (bấm Dùng để mở)"
        ),
      },
      {
        k: "dtbk",
        n: "Đại Thành Bí Kíp",
        ic: "img/ep/dtbk.png",
        knb: 25,
        d: "Đưa 1 võ công 90 đã học lên cấp 20 ngay, không cần luyện (dùng ở thẻ Võ công)",
        use: () => (V("misc", "dtbk", 1), "Nhận 1 Đại Thành Bí Kíp"),
      },
    ];
  for (const s of r1) s.knb && !s.kx && (s.knb *= c4);
