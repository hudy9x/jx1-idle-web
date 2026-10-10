var _e = function (A, n) {
      let t = 0;
      for (const a of A) t += n(a);
      let e = Math.random() * t;
      for (const a of A) if (((e -= n(a)), e <= 0)) return a;
      return A[A.length - 1];
    },
    Yh = function (A) {
      const n = Math.round(A[0] || 0),
        t = A[2] || 0;
      if (!(t > 0)) return `Tất cả kỹ năng: +${n} cấp`;
      const e = (typeof T < "u" && T[t]) || S.skills[t],
        a = typeof r < "u" && r && typeof I < "u" ? I[r.fac] : null,
        i = !a || (a.skills || []).some((o) => +o == +t);
      return `Kỹ năng ${e ? e.n : "#" + t}: +${n} cấp${i ? "" : " (không thuộc môn phái)"}`;
    },
    RA = function (A, n) {
      if (((A = H3(A)), A === "allskill_v")) return Yh(n);
      const t = S.attrDesc[A];
      return t
        ? t
            .replace(/#([a-zA-Z])([123A])([-+~%]?)/g, (e, a, i, o) => {
              const l =
                i === "A" ? Math.floor((n[0] || 0) / 256) : n[+i - 1] || 0;
              return a === "l"
                ? S.skills[l]
                  ? S.skills[l].n
                  : "#" + l
                : (o === "+" && l > 0 ? "+" : o === "~" && l > 0 ? "-" : "") +
                    l;
            })
            .replace(/#[a-zA-Z][123A][-+~]?/g, "")
            .replace(/Kỹ năng (\d+)/, (e, a) =>
              S.skills[a] ? "Kỹ năng " + S.skills[a].n : e,
            )
        : A + ": " + n.filter((e) => e).join(" / ");
    },
    yt = function (A = r && r.fac, n = r && r.sex) {
      if (H0.hero[A]) return H0.hero[A];
      const t = I[A];
      if (!t) return null;
      const e = uA.filter((i) => i.series === t.series),
        a =
          e.find((i) => Q1(i, n) && i.key in xt) ||
          e.find((i) => Q1(i, n)) ||
          e[0];
      return n && !e.some((i) => xt[i.key] === 1)
        ? H0.hero.emei
        : H0.hero[a.key];
    },
    Co = function () {
      const A =
        r.mainLock && r.main && r.main !== "basic"
          ? r.main
          : typeof c < "u" && c.P && c.P.wantId;
      return v1(T[A]);
    },
    YA = function (A) {
      const n = Co();
      if (n !== null) return O8(A) === n;
      const t = I[r.fac];
      return !t || t.wcode < 0 || j8({ weapon: A }) === t.wcode;
    },
    H8 = function (A) {
      const n = v1(T[A.starter]);
      if (n !== null)
        return n === -1 ? [0, 6] : n >= 100 ? [1, n - 100] : [0, n];
      const t = A.wcode >= 0 ? A.wcode : 0;
      return t === 7 ? [1, 0] : [0, t === 9 ? 6 : t];
    },
    Oo = function () {
      const A = Co();
      if (A !== null)
        return A === -1 ? [0, 6] : A >= 100 ? [1, A - 100] : [0, A];
      const n = I[r.fac],
        t = n && n.wcode >= 0 ? n.wcode : 0;
      return t === 7 ? [1, C0(0, 2)] : [0, t === 9 ? 6 : t];
    },
    _3 = function (A) {
      const n = r0[A];
      if (!n) return 0;
      if (n.s !== void 0) return n.s;
      if (n._s !== void 0) return n._s;
      const t = n.rmax || [],
        e = Math.max(...t),
        a = t.map((i, o) => (i === e ? o : -1)).filter((i) => i >= 0);
      return (n._s = a.length === 1 ? rg[a[0]] : Math.abs(+A || 0) % 5);
    },
    Eo = function (A) {
      const n = [0, 0, 0, 0, 0];
      for (const t of A.m) n[_3(t)]++;
      return n;
    },
    S = window.JX,
    H0 = window.JW,
    u = (s) => document.querySelector(s),
    A0 = (s, A) => s + Math.random() * (A - s),
    C0 = (s, A) => Math.floor(s + Math.random() * (A - s + 1)),
    _0 = (s) => s[Math.floor(Math.random() * s.length)],
    C = (s, A, n) => Math.max(A, Math.min(n, s)),
    P1 = 0.81,
    Fh = (s, A, n, t) => Math.hypot(n - s, (t - A) * 2) / P1,
    F0 = (s, A) => Fh(s.x, s.y, A.x, A.y),
    j = (s) => {
      if (((s = Math.round(+s || 0)), Math.abs(s) < 1e4))
        return s.toLocaleString("vi-VN");
      const n = s / 1e4;
      return (
        (Math.abs(n) < 100
          ? (Math.round(n * 10) / 10).toLocaleString("vi-VN")
          : Math.round(n).toLocaleString("vi-VN")) + " vạn"
      );
    },
    X = (s) => {
      s = Math.round(s);
      const A = Math.abs(s);
      return A < 1e4
        ? "" + s
        : A < 1e6
          ? (s / 1e3).toFixed(A < 1e5 ? 1 : 0) + "k"
          : A < 1e9
            ? (s / 1e6).toFixed(2) + "M"
            : (s / 1e9).toFixed(2) + "B";
    },
    D = (s) =>
      String(s).replace(
        /[&<>"]/g,
        (A) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[A],
      ),
    d0 = S.series,
    m0 = ["#f3d35b", "#6fd46a", "#5fb8ff", "#ff6a3a", "#c8965a"],
    kt = { 0: 1, 1: 4, 4: 2, 2: 3, 3: 0 },
    a1 = (s, A) => s >= 0 && A >= 0 && kt[s] === A,
    q0 = ["phys", "poison", "cold", "fire", "light"],
    Io = {
      phys: "Vật lý",
      poison: "Độc",
      cold: "Băng",
      fire: "Hỏa",
      light: "Lôi",
    },
    So = {
      phys: "#f0e6d0",
      poison: "#8fe34a",
      cold: "#7fd0ff",
      fire: "#ff7a2a",
      light: "#d9b6ff",
    },
    No = {
      phys: "physicsdamage_v",
      poison: "poisondamage_v",
      cold: "colddamage_v",
      fire: "firedamage_v",
      light: "lightingdamage_v",
    },
    Vh = {
      phys: "addphysicsdamage_v",
      poison: "addpoisondamage_v",
      cold: "addcolddamage_v",
      fire: "addfiredamage_v",
      light: "addlightingdamage_v",
    },
    Lo = {
      phys: "physicsres_p",
      poison: "poisonres_p",
      cold: "coldres_p",
      fire: "fireres_p",
      light: "lightingres_p",
    },
    qo = {
      poison: "poisonenhance_p",
      cold: "coldenhance_p",
      fire: "fireenhance_p",
      light: "lightingenhance_p",
    },
    Xh = 95,
    $8 = 75,
    T8 = 2,
    C8 = 2,
    jo = 95,
    Uh = 40,
    zo = 2,
    Jh = 5,
    Wh = 5,
    Pk = 4,
    vk = 1,
    Zh = 1,
    Ag = 1,
    ng = 0,
    K2 = 5,
    Qo = 1,
    R2 = Math.min(200, S.exp.length),
    bk = 200,
    Y2 = () => R2,
    D0 = () =>
      typeof r < "u" && r && r.rw && r.rw.stat
        ? Math.min(10, r.rw.stat.reborn || 0)
        : 0,
    M3 = 200,
    TA = () => r.lvl + M3 * D0(),
    Me = Object.fromEntries(S.attr.map((s, A) => [s, A])),
    tg = {
      metalskill_v: "addphysicsmagic_v",
      earthskill_v: "addpoisonmagic_v",
      woodskill_v: "addcoldmagic_v",
      waterskill_v: "addfiremagic_v",
      fireskill_v: "addlightingmagic_v",
    },
    H3 = (s) => tg[s] || s,
    uA = S.factions.filter((s) => s.skills && s.skills.length),
    I = Object.fromEntries(uA.map((s) => [s.key, s])),
    CA = 10;
  for (let s = 0; s < 5; s++)
    I["vo" + s] = {
      key: "vo" + s,
      n: "Vô Môn Phái",
      series: s,
      skills: [],
      wcode: -1,
      id: -1,
      novice: !0,
    };
  var Kn = () => !!(r && I[r.fac] && I[r.fac].novice),
    xt = { shaolin: 0, emei: 1, cuiyan: 1 },
    Q1 = (s, A) => !(s.key in xt) || xt[s.key] === (A || 0),
    T = S.skills;
  if (window.SK_STD)
    for (const s in window.SK_STD) {
      const A = T[s],
        n = window.SK_STD[s];
      if (!A || !n) continue;
      const t = n.m || {};
      ((A.attr = n.a || {}),
        t.req > 0 && (A.req = t.req),
        t.max > 0 && (A.max = t.max),
        t.radius > 0 && (A.radius = t.radius),
        t.form != null && (A.form = t.form),
        t.childN > 0 && (A.childN = t.childN),
        t.eqt != null && (A.eqt = t.eqt),
        (A.p1 = t.p1 || 0));
    }
  {
    const s = (t, e) => {
        let a = 1;
        for (; a < t.length - 1 && e > t[a][0];) a++;
        const [i, o] = t[a - 1],
          [l, d] = t[a];
        return Math.floor(l === i ? d : ((d - o) * (e - i)) / (l - i) + o);
      },
      A = T[150],
      n = [
        [1, 26],
        [30, 102],
        [33, 109],
        [35, 134],
        [38, 138],
        [41, 145],
        [42, 163],
        [43, 165],
      ];
    A &&
      A.attr &&
      (A.attr.attackspeed_v = Array.from(
        { length: Math.max(30, (A.attr.adddefense_v || []).length) },
        (t, e) => [s(n, e + 1), 0, 0],
      ));
  }
  for (const s of uA) {
    const A = s.skills
      .map((e) => T[e])
      .filter(
        (e) =>
          e &&
          e.enemy &&
          [
            "physicsenhance_p",
            "physicsdamage_v",
            "poisondamage_v",
            "colddamage_v",
            "firedamage_v",
            "lightingdamage_v",
          ].some((a) => e.attr[a]),
      )
      .sort((e, a) => e.req - a.req || e.id - a.id);
    A.length && (s.starter = A[0].id);
    const n = s.skills
        .map((e) => T[e])
        .filter((e) => e && !e.enemy && e.attr.addphysicsdamage_p)
        .sort((e, a) => e.req - a.req || e.id - a.id)[0],
      t = n && n.attr.addphysicsdamage_p[0];
    s.wcode =
      Array.isArray(t) && [0, 1, 2, 3, 4, 5, 7, 9].includes(t[2]) ? t[2] : -1;
  }
  var Go = {
      "-1": "Tay không",
      0: "Kiếm",
      1: "Đao",
      2: "Côn",
      3: "Thương",
      4: "Song Chùy",
      5: "Song Đao",
      100: "Phi Tiêu",
      101: "Phi Đao",
      102: "Tụ Tiễn",
    },
    O8 = (s) => (s ? (s.d === 1 ? 100 + s.k : s.k === 6 ? -1 : s.k) : -1),
    E8 = () => O8(r.eq && r.eq.weapon),
    v1 = (s) =>
      s && s.eqt != null && s.eqt !== -2 && s.attr && s.attr.physicsenhance_p
        ? s.eqt
        : null,
    $3 = (s, A = E8()) => v1(s) === null || v1(s) === A,
    eg = /^(skill_|missle_)/,
    ag = 10,
    P0 = (s, A, n) => {
      const t = s.attr[A];
      if (!t) return null;
      const e = t.length,
        a = t[e - 1],
        i = (h) => (Array.isArray(h) ? h : [h, 0, 0]);
      if (n <= e || e < 2 || eg.test(A)) return i(t[C(n, 1, e) - 1]);
      const o = Math.min(ag, n - e),
        l = i(t[e - 2]);
      return i(a).map((h, g) =>
        g === 1 && A.startsWith("poison") ? h : h + (h - l[g]) * o,
      );
    },
    sg = [
      "physicsenhance_p",
      "physicsdamage_v",
      "poisondamage_v",
      "colddamage_v",
      "firedamage_v",
      "lightingdamage_v",
    ],
    NA = (s) => !!(s && s.enemy && !s.aura && sg.some((A) => s.attr[A])),
    B0 = H0.zones,
    r0 = H0.mon;
  for (const s in H0.anim || {})
    for (const A in H0.anim[s]) {
      const n = H0.anim[s][A];
      n &&
        (n.ax < 0 || n.ay < 0 || n.ax > n.w || n.ay > n.h * 1.2) &&
        ((n.ax = n.w / 2), (n.ay = n.h - 2));
    }
  var bn = 10,
    T3 = 4,
    ig = ["phys", "poison", "cold", "fire", "light"],
    rg = [3, 0, 4, 2, 1],
    og = [1, 4, 3, 0, 2],
    l0 = B0.length * bn,
    I8 = 0.35,
    G1 = [
      ["weapon", "Vũ khí"],
      ["armor", "Áo"],
      ["helm", "Mũ"],
      ["belt", "Đai lưng"],
      ["boot", "Giày"],
      ["cuff", "Hộ uyển"],
      ["amulet", "Dây chuyền"],
      ["ring1", "Nhẫn 1"],
      ["ring2", "Nhẫn 2"],
      ["pendant", "Ngọc bội"],
      ["horse", "Ngựa"],
    ],
    S8 = Object.fromEntries(G1),
    wA = [
      "weapon",
      "weapon",
      "armor",
      "ring",
      "amulet",
      "boot",
      "belt",
      "helm",
      "cuff",
      "pendant",
      "horse",
    ],
    lg = ["sword", "blade", "wand", "spear", "hammer", "dualblades"],
    cg = ["darts", "knife", "crossbow"],
    dg = {
      armor: "armor",
      ring: "ring",
      amulet: "necklace",
      boot: "boot",
      belt: "belt",
      helm: "helm",
      cuff: "cuff",
      pendant: "pendant",
    },
    N8 = ["Thường", "Xanh", "Hiếm", "Tím", "Hoàng Kim", "Bạch Kim"],
    b0 = ["#e8e0d0", "#6aa8ff", "#ff9a3c", "#c77bff", "#ffcc00", "#9fe8ff"],
    F2 = 60,
    Bt = 60,
    s1 = [100, 200, 500],
    Ko = (s) => F2 + Bt * Math.min(s1.length, (s && s.invX) | 0);
  Object.defineProperty(globalThis, "INV_MAX", {
    configurable: !0,
    get: () => {
      try {
        return Ko(r);
      } catch {
        return F2;
      }
    },
  });
