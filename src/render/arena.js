var PA = function (A) {
      if (!A) return null;
      let n = Pc[A];
      return (n || ((n = new Image()), (n.src = A), (Pc[A] = n)), n);
    },
    EA = function (A, n, t, e, a = 12) {
      const i = r.lowFx ? 20 : 60;
      c.quiet ||
        c.txt.length > i ||
        c.txt.push({
          x: A,
          y: n,
          t,
          color: e,
          size: a,
          life: r.lowFx ? 0.6 : 0.9,
        });
    },
    tp = function (A, n, t) {
      c.quiet ||
        c.fx.push({ k: "ring", x: A, y: n, color: t, life: 0.45, max: 0.45 });
    },
    s5 = function (A, n, t) {
      if (c.quiet || c.fx.length > 80) return;
      let e = "phys",
        a = 0;
      for (const i in t.parts) t.parts[i] > a && ((a = t.parts[i]), (e = i));
      c.fx.push({
        k: "line",
        x1: A.x,
        y1: A.y - 20,
        x2: n.x,
        y2: n.y - 14,
        color: So[e],
        life: 0.18,
        max: 0.18,
      });
    },
    r2 = function (A) {
      const n = A && A.id && a0.f && a0.f[A.id],
        t = n && n.pre && a0.c && a0.c[n.pre];
      !t ||
        c.quiet ||
        c.fx.length > Gs ||
        c.fx.push({
          k: "boom",
          s: t,
          x: A.ox != null ? A.ox : b.x,
          y: (A.oy != null ? A.oy : b.y) - 6,
          t: 0,
          life: ot(t),
          dir: 0,
        });
    },
    Rs = function (A, n, t) {
      const e = (t.id && a0.f && a0.f[t.id]) || {},
        a = t.id && a0.m[e.c || a0.s[t.id]];
      if (
        (r2(t),
        e.sub &&
          !c.quiet &&
          !(typeof f5 < "u" && f5.has(+t.id)) &&
          String(e.sub.c) !== String(e.c) &&
          ep(A, n, e.sub),
        !a || c.quiet)
      ) {
        s5(A, n, t);
        return;
      }
      if (c.fx.length > Gs) return;
      const i = A.x,
        o = A.y - 20,
        l = n.x,
        d = n.y - 14,
        h = l - i,
        g = d - o,
        f = Math.hypot(h, g) || 1,
        m = e.form === void 0 ? 1 : e.form,
        w = C(
          t.nMis > 1 ? Math.max(e.num || 1, Math.min(t.nMis, 8)) : e.num || 1,
          1,
          8,
        ),
        p = Math.atan2(g, h),
        P = ($, O, z, R = 0) =>
          c.fx.push({
            k: "boom",
            s: $,
            x: O,
            y: z,
            t: -R,
            life: ot($),
            dir: Pa(h, g),
          }),
        v = ($, O, z = 0) =>
          c.fx.push({
            k: "mis",
            s: a.fly,
            hit: a.hit,
            x1: i,
            y1: o,
            x2: $,
            y2: O,
            t: -z,
            life: Math.min(0.6, Math.hypot($ - i, O - o) / a.spd),
            dir: Pa($ - i, O - o),
          }),
        H = a.hit || a.fly,
        _ = a.fly && a.fly.d === 1 && a.fly.ay > 150,
        E = ($, O, z = 0) => {
          const R = (a.fly.n * a.fly.ms) / 1e3,
            Z = Math.min(0.8, R);
          (c.fx.push({
            k: "boom",
            s: a.fly,
            x: $,
            y: O + 14,
            t: -z,
            life: Z,
            sp: R / Z,
            dir: 0,
          }),
            a.hit && P(a.hit, $, O, z + Z * 0.8));
        };
      if (_ && (m === 6 || m >= 8)) {
        for (let $ = 0; $ < w; $++)
          E(
            l + (w > 1 ? A0(-40, 40) : 0),
            d + (w > 1 ? A0(-26, 26) : 0),
            $ * 0.12,
          );
        return;
      }
      if ((t.melee && !e.meleeFly) || m >= 8) {
        P(H, l, d);
        return;
      }
      if (m === 7) {
        a.fly && a.fly.d === 1 && a.hit
          ? (P(a.fly, i, o + 8), P(a.hit, l, d, 0.12))
          : P(H, i, o + 8);
        return;
      }
      if (m === 6) {
        for (let $ = 0; $ < w; $++)
          P(
            H,
            l + (w > 1 ? A0(-36, 36) : 0),
            d + (w > 1 ? A0(-24, 24) : 0),
            $ * 0.07,
          );
        return;
      }
      if (!a.fly) {
        P(H, l, d);
        return;
      }
      if (m === 3) {
        for (let $ = 0; $ < w; $++) {
          const O = p + ($ / w) * Math.PI * 2;
          v(i + Math.cos(O) * 130, o + Math.sin(O) * 130);
        }
        return;
      }
      if (m === 2) {
        for (let $ = 0; $ < w; $++) {
          const O = p + ($ - (w - 1) / 2) * 0.26;
          v(i + Math.cos(O) * f, o + Math.sin(O) * f);
        }
        return;
      }
      if (m === 1) {
        for (let $ = 0; $ < w; $++) v(l, d, $ * 0.09);
        return;
      }
      if (m === 0) {
        const $ = -g / f,
          O = h / f;
        for (let z = 0; z < w; z++) {
          const R = (z - (w - 1) / 2) * 34;
          v(l + $ * R, d + O * R);
        }
        return;
      }
      for (let $ = 0; $ < w; $++) v(l + A0(-60, 60), d + A0(-40, 40), $ * 0.05);
    },
    ep = function (A, n, t) {
      const e = a0.m[t.c];
      if (!e || c.fx.length > Gs) return;
      const a = C(t.n || 1, 1, 8),
        i = n.x,
        o = n.y - 14,
        l = e.hit || e.fly,
        d = 0.18,
        h = (g, f, m, w, p) =>
          e.fly
            ? c.fx.push({
                k: "mis",
                s: e.fly,
                hit: e.hit,
                x1: g,
                y1: f,
                x2: m,
                y2: w,
                t: -p,
                life: Math.min(0.55, Math.hypot(m - g, w - f) / (e.spd || 360)),
                dir: Pa(m - g, w - f),
              })
            : c.fx.push({
                k: "boom",
                s: l,
                x: m,
                y: w,
                t: -p,
                life: ot(l),
                dir: 0,
              });
      if (t.form === 3) {
        const g = Math.random() * Math.PI;
        for (let f = 0; f < a; f++) {
          const m = g + (f / a) * Math.PI * 2;
          h(i, o, i + Math.cos(m) * 110, o + Math.sin(m) * 70, d);
        }
        return;
      }
      if (t.form === 1) {
        for (let g = 0; g < a; g++)
          h(A.x, A.y - 20, i + A0(-20, 20), o + A0(-14, 14), d + g * 0.06);
        return;
      }
      for (let g = 0; g < a; g++)
        c.fx.push({
          k: "boom",
          s: l,
          x: i + A0(-40, 40),
          y: o + A0(-26, 26),
          t: -(d + g * 0.08),
          life: ot(l),
          dir: 0,
        });
    },
    ap = function (A, n) {
      const t = (A.id && a0.f && a0.f[A.id]) || {},
        e = t.c || a0.s[A.id],
        a = typeof Fs == "function" && Fs(e),
        i = a && a[0] ? a[2] : 0;
      return i > 0
        ? C((Math.hypot(n.x - b.x, (n.y - b.y) * 2) / i / 18) * 1e3, 0, 1500)
        : 120;
    },
    i5 = function (A, n, t) {
      const e = t.sid || (t.fx === "176" ? 371 : hp[n.id]);
      if (e === 301) return !0;
      const a = fp[e];
      if (!a || !a0.m[a[0]] || typeof ya != "function") return !1;
      const i = t.self || t.rays || a[1] === 3;
      if (i) {
        const m = performance.now();
        if (c.ev2Last === n && m - (c.ev2LastT || 0) < 60) return !0;
        ((c.ev2Last = n), (c.ev2LastT = m));
      }
      const o = t.rays ? t.rays(n.L || 1) : a[2],
        l = [a[1], 0, 0, a[3], a[4], 0, o, 0],
        d = i ? { x: b.x, y: b.y + 20 } : { x: A.x, y: A.y + 6 },
        h = (i && A === b && (c.enemies || []).find((m) => !m.dead)) || A,
        g = t.rays
          ? (c.ev2Tg || []).filter((m) => m && !m.dead).slice(0, o)
          : null,
        f = () => {
          if (!c.quiet) {
            if (g) {
              const m = r.lowFx ? Math.min(o, 3) : o,
                w = g[0] ? Vs(g[0].x - d.x, g[0].y - d.y) : 0;
              for (let p = 0; p < m; p++) {
                const P = w + (p * Math.PI * 2) / m,
                  v = En(
                    a[0],
                    d.x + Math.cos(P) * 20,
                    d.y - 20 + Math.sin(P) * 10,
                    P,
                    g.length ? g[p % g.length] : null,
                    _c(l, p, m),
                  );
                v &&
                  ((v.kind = 1),
                  (v.hm = 5),
                  (v.lf = Math.max(v.lf, 36)),
                  (v.cv = !0),
                  (v.ae = !1),
                  (v.spd = Math.max(v.spd, 14)));
              }
              return;
            }
            ya(a[0], a[1], r.lowFx ? Math.min(o, 3) : o, l, d, h, h);
          }
        };
      return (i ? f() : setTimeout(f, ap(n, A)), !0);
    },
    An = function (A, n, t, e, a) {
      if (c.quiet || (a && i5(A, n, a))) return;
      const i = (n.id && a0.f && a0.f[n.id]) || {},
        o = n.id && (a0.m[(a && a.fx) || i.ev2c] || a0.m[i.c || a0.s[n.id]]),
        l =
          o &&
          (o.fly && o.fly.d === 1 && !e
            ? o.fly
            : o.hit && o.hit.ax >= 0
              ? o.hit
              : o.fly || o.hit);
      if (!(!l || c.fx.length > Gs)) {
        if (e && o.fly) {
          c.fx.push({
            k: "mis",
            s: o.fly,
            hit: o.hit,
            x1: e.x,
            y1: e.y - 20,
            x2: A.x,
            y2: A.y - 14,
            t: -0.15,
            life: 0.35,
            dir: Pa(A.x - e.x, A.y - e.y),
          });
          return;
        }
        if (a && a.self) {
          c.fx.push({
            k: "boom",
            s: l,
            x: A.x,
            y: A.y,
            t: -0.1,
            life: ot(l),
            dir: 0,
          });
          return;
        }
        for (let d = 0; d < 2; d++)
          c.fx.push({
            k: "boom",
            s: l,
            x: A.x + A0(-18, 18),
            y: A.y - 14 + A0(-12, 12),
            t: -(0.18 + d * 0.12),
            life: ot(l),
            dir: 0,
          });
      }
    },
    js = function (A, n, t, e, a, i) {
      const o = PA(A.f);
      if (!o || !o.complete || !o.naturalWidth) return !1;
      const l = i
          ? Math.floor((t * 1e3) / A.ms) % A.n
          : Math.min(A.n - 1, Math.floor((t * 1e3) / A.ms)),
        d = A.d > 1 ? Math.round((n * A.d) / 16) % A.d : 0;
      return (
        W.drawImage(
          o,
          l * A.w,
          d * A.h,
          A.w,
          A.h,
          e - A.ax * Qs,
          a - A.ay * Qs,
          A.w * Qs,
          A.h * Qs,
        ),
        !0
      );
    },
    sp = function (A, n) {
      return (
        (A.t += n),
        A.t < 0
          ? !0
          : A.k === "mis" && A.t >= A.life
            ? A.hit
              ? (Object.assign(A, {
                  k: "boom",
                  s: A.hit,
                  x: A.x2,
                  y: A.y2,
                  t: 0,
                  life: ot(A.hit),
                }),
                !0)
              : !1
            : A.t < A.life
      );
    },
    ip = function (A) {
      if (A.t < 0) return !1;
      if (A.k === "mis") {
        const n = C(A.t / A.life, 0, 1);
        return js(
          A.s,
          A.dir,
          A.t,
          A.x1 + (A.x2 - A.x1) * n,
          A.y1 + (A.y2 - A.y1) * n,
          !0,
        );
      }
      return js(A.s, A.dir, A.t * (A.sp || 1), A.x, A.y, !1);
    },
    rt = function () {
      const A = u("#battle"),
        n = { width: A.offsetWidth, height: A.offsetHeight };
      ((d1 = Math.min(2, window.devicePixelRatio || 1) * c5()),
        (aA.width = Math.round(n.width * d1)),
        (aA.height = Math.round(n.height * d1)),
        (k0.w = n.width),
        (k0.h = n.height),
        (k0.top = 58),
        (k0.bot = n.height - 12),
        nn());
    },
    nn = function () {
      [p0.x, p0.y] = vc();
    },
    rp = function (A) {
      const [n, t] = vc(),
        e = Math.min(1, A * 6);
      ((p0.x += (n - p0.x) * e), (p0.y += (t - p0.y) * e));
    },
    op = function (A, n) {
      if (!(n && n.complete && n.naturalWidth)) {
        ((A.fillStyle = "#26301f"),
          A.fillRect(p0.x - 2, p0.y - 2, k0.w + 4, k0.h + 4));
        return;
      }
      if (Z0.g) {
        A.drawImage(n, 0, 0, M0.w, M0.h);
        return;
      }
      const t = bc,
        e = Math.floor(p0.x / t),
        a = Math.floor((p0.x + k0.w) / t),
        i = Math.floor(p0.y / t),
        o = Math.floor((p0.y + k0.h) / t);
      for (let l = e; l <= a; l++)
        for (let d = i; d <= o; d++) {
          const h = l & 1,
            g = d & 1;
          if (!h && !g) {
            A.drawImage(n, l * t, d * t, t, t);
            continue;
          }
          (A.save(),
            A.translate(l * t + (h ? t : 0), d * t + (g ? t : 0)),
            A.scale(h ? -1 : 1, g ? -1 : 1),
            A.drawImage(n, 0, 0, t, t),
            A.restore());
        }
    },
    lp = function (A) {
      if (!A || r.miniMap === !1) return;
      const n = (sA && sA.s) || 92,
        t = (k0.w || 300) - n - ((sA && sA.m) || 8),
        e = (sA && sA.top) || 62,
        mapWidth = (typeof M0 !== "undefined" && M0.w) ? M0.w : 1536,
        a = n / mapWidth;
      (A.save(),
        (A.globalAlpha = 0.9),
        (A.fillStyle = "#000c"),
        A.fillRect(t - 2, e - 2, n + 4, n + 4));
      const i = c.bgImg;
      if (i && i.complete && i.naturalWidth)
        if (Z0.g) A.drawImage(i, t, e, n, n);
        else {
          const h = Math.round(M0.w / bc),
            g = n / h;
          for (let f = 0; f < h; f++)
            for (let m = 0; m < h; m++)
              (A.save(),
                A.translate(
                  t + f * g + (f & 1 ? g : 0),
                  e + m * g + (m & 1 ? g : 0),
                ),
                A.scale(f & 1 ? -1 : 1, m & 1 ? -1 : 1),
                A.drawImage(i, 0, 0, g, g),
                A.restore());
        }
      else ((A.fillStyle = "#26301f"), A.fillRect(t, e, n, n));
      ((A.globalAlpha = 1),
        (A.strokeStyle = "#fff6"),
        (A.lineWidth = 1),
        A.strokeRect(
          t + p0.x * a,
          e + p0.y * a,
          Math.min(n, k0.w * a),
          Math.min(n, k0.h * a),
        ));
      for (const h of (c.town ? [] : (c.ground || [])))
        typeof hA === "function" && hA(h.it) &&
          ((A.fillStyle = (typeof b0 !== "undefined" && b0[h.it.r]) || "#fff"),
          A.fillRect(t + h.x * a - 1, e + h.y * a - 1, 2, 2));
      for (const h of (c.enemies || [])) {
        if (h.dead) continue;
        const g = h.cls === "boss" ? 3.2 : h.cls === "elite" ? 2.4 : 1.8;
        ((A.fillStyle = h.goldBoss
          ? "#ffd24a"
          : h.cls === "boss"
            ? "#ff4a3a"
            : ((typeof m0 !== "undefined" && m0[h.series]) || "#ff4a3a")),
          A.beginPath(),
          A.arc(t + h.x * a, e + h.y * a, g, 0, 7),
          A.fill());
      }
      if (typeof othEnts === "function") {
        try {
          const oths = othEnts();
          for (const ent of oths) {
            const p = ent.oth;
            if (p) {
              const px = Number.isFinite(p.renderX) ? p.renderX : p.x;
              const py = Number.isFinite(p.renderY) ? p.renderY : p.y;
              if (Number.isFinite(px) && Number.isFinite(py)) {
                A.fillStyle = "#2ed573";
                A.beginPath();
                A.arc(t + px * a, e + py * a, 2.2, 0, 7);
                A.fill();
              }
            }
          }
        } catch {}
      }
      c.petPos &&
        ((A.fillStyle = "#9fe36a"),
        A.fillRect(t + c.petPos.x * a - 1.5, e + c.petPos.y * a - 1.5, 3, 3));
      const o = t + (b.x || 0) * a,
        l = e + (b.y || 0) * a,
        d = Math.PI / 2 + (((b.dir || 0)) * Math.PI) / 4;
      ((A.fillStyle = "#fff"),
        (A.strokeStyle = "#000"),
        A.beginPath(),
        A.moveTo(o + Math.cos(d) * 5, l + Math.sin(d) * 5),
        A.lineTo(o + Math.cos(d + 2.5) * 4, l + Math.sin(d + 2.5) * 4),
        A.lineTo(o + Math.cos(d - 2.5) * 4, l + Math.sin(d - 2.5) * 4),
        A.closePath(),
        A.fill(),
        A.stroke(),
        (A.strokeStyle = "#c8a45a"),
        A.strokeRect(t - 2, e - 2, n + 4, n + 4),
        (A.font = '9px "IBM Plex Mono", monospace'),
        (A.textAlign = "center"),
        (A.fillStyle = "#f3d88a"));
      const mapTitle = c.town
        ? (c.curZone && c.curZone.n) || (typeof H0 !== "undefined" && H0.town && H0.town.n) || "Biện Kinh"
        : c.dg
          ? c.dg.kind === "wb"
            ? "Boss tuần"
            : c.dg.d?.n || "Phó bản"
          : c.tower
            ? `Tháp · tầng ${c.tower.floor}`
            : (typeof V0 === "function" ? V0(Math.min(r.stage || 1, typeof l0 !== "undefined" ? l0 : 1)).n : "Luyện công");
      A.fillText(
        mapTitle,
        t + n / 2,
        e + n + 11,
      );
      A.restore();
    },
    r5 = function (A, n, t, e, a, i) {
      if (!A || r.lowFx) return i();
      const o = d1 || 1,
        l = Math.ceil(e * o),
        d = Math.ceil(a * o);
      c2 ||
        ((c2 = document.createElement("canvas")),
        (Ks = document.createElement("canvas")));
      for (const w of [c2, Ks])
        (w.width < l || w.height < d) &&
          ((w.width = Math.max(w.width, l)),
          (w.height = Math.max(w.height, d)));
      const h = c2.getContext("2d");
      (h.setTransform(1, 0, 0, 1, 0, 0),
        (h.globalCompositeOperation = "source-over"),
        h.clearRect(0, 0, l, d),
        h.setTransform(o, 0, 0, o, -n * o, -t * o));
      const g = W;
      W = h;
      let f;
      try {
        f = i();
      } finally {
        W = g;
      }
      if (!f) return f;
      h.setTransform(1, 0, 0, 1, 0, 0);
      const m = Ks.getContext("2d");
      return (
        (m.globalCompositeOperation = "copy"),
        m.drawImage(c2, 0, 0),
        (h.globalCompositeOperation = "multiply"),
        (h.fillStyle = A),
        h.fillRect(0, 0, l, d),
        (h.globalCompositeOperation = "destination-in"),
        h.drawImage(Ks, 0, 0),
        (h.globalCompositeOperation = "source-over"),
        g.drawImage(c2, 0, 0, l, d, n, t, e, a),
        f
      );
    },
    Dc = function (A, n, t) {
      const e = up,
        a = PA(e.f);
      if (!a.complete || !a.naturalWidth) return;
      const i = Math.floor(((c.clock || 0) * 1e3) / e.ms) % e.n,
        o = t;
      W.drawImage(
        a,
        i * e.w,
        0,
        e.w,
        e.h,
        A - e.ax * o,
        n - e.h * o * 0.55,
        e.w * o,
        e.h * o,
      );
    },
    o5 = function (A, n, t, e, a, i, o = 1) {
      if (!A || !A.complete || !A.naturalWidth) return !1;
      const l = A.naturalWidth * a,
        d = A.naturalHeight * a,
        h =
          n &&
          n[2] >= 0 &&
          n[2] <= A.naturalWidth &&
          n[3] >= A.naturalHeight * 0.5 &&
          n[3] <= A.naturalHeight * 1.2,
        g = h ? n[2] * a : l / 2,
        f = h ? n[3] * a : d * 0.95;
      return (
        W.save(),
        (W.globalAlpha = o),
        W.translate(t, e),
        i && W.scale(-1, 1),
        W.drawImage(A, -g, -f, l, d),
        W.restore(),
        !0
      );
    },
    pa = function (A, n) {
      const t = H0.anim && H0.anim[A] && H0.anim[A][n];
      return t ? (t.n * t.ms) / 1e3 : 0;
    },
    o2 = function (A, n, t, e, a, i, o, l = 1) {
      const d = H0.anim && H0.anim[A];
      if (!d) return !1;
      const h = d[n] || d.st;
      if (!h) return !1;
      const g = PA("img/a/" + h.f);
      if (!g.complete || !g.naturalWidth) return !1;
      let f = Math.floor((e * 1e3) / h.ms);
      f = xc[n] ? Math.min(f, h.n - 1) : f % h.n;
      const m = h.d >= 8 ? t : Math.floor((t * h.d) / 8);
      return (
        (W.globalAlpha = l),
        W.drawImage(
          g,
          f * h.w,
          m * h.h,
          h.w,
          h.h,
          a - h.ax * o,
          i - h.ay * o,
          h.w * o,
          h.h * o,
        ),
        (W.globalAlpha = 1),
        h.h * o
      );
    },
    Da = function (A, n) {
      A.act !== n && ((A.act = n), (A.actT = 0));
    },
    l5 = function (A, n, t) {
      ((A.actT = (A.actT || 0) + n),
        (A.act === "at" || A.act === "hurt") &&
          A.actT >= Math.max(0.25, pa(A.animKey, A.act)) &&
          Da(A, t));
    },
    zs = function (A, n, t, e, a, i, o, l, d, h) {
      ba.push({
        x: A,
        y: n,
        text: t,
        col: e,
        size: a,
        hp: i,
        barCol: o,
        sub: l,
        subCol: d,
        dot: h,
      });
    },
    cp = function () {
      if (!ba.length) return;
      ((W.textAlign = "center"), (W.lineJoin = "round"));
      const A = [];
      for (const n of ba.sort((t, e) => e.y - t.y)) {
        ((W.font = `${n.size}px "IBM Plex Mono", monospace`),
          (n.tw = W.measureText(n.text).width),
          (n.w = Math.max(
            n.tw + (n.dot ? 12 : 0),
            n.sub ? W.measureText(n.sub).width : 0,
            44,
          )),
          (n.h = n.size + 4 + (n.hp >= 0 ? 7 : 0) + (n.sub ? n.size + 2 : 0)));
        let t = n.y;
        for (let e = 0; e < 8; e++) {
          const a = A.find(
            (i) =>
              Math.abs(i.x - n.x) < (i.w + n.w) / 2 &&
              t > i.top &&
              t - n.h < i.y,
          );
          if (!a) break;
          t = a.top - 1;
        }
        ((n.py = t),
          (n.top = t - n.h),
          A.push({ x: n.x, w: n.w, y: t, top: n.top }));
      }
      for (const n of ba) {
        const t = n.py,
          e = Math.min(n.w, 56);
        (n.hp >= 0 &&
          ((W.fillStyle = "#000c"),
          W.fillRect(n.x - e / 2 - 1, t - 6, e + 2, 6),
          (W.fillStyle = n.barCol),
          W.fillRect(n.x - e / 2, t - 5, e * C(n.hp, 0, 1), 4)),
          (W.font = `${n.size}px "IBM Plex Mono", monospace`),
          (W.lineWidth = 3),
          (W.strokeStyle = "#000c"));
        const a = t - (n.hp >= 0 ? 8 : 1),
          i = n.x + (n.dot ? 6 : 0);
        if (
          (W.strokeText(n.text, i, a),
          (W.fillStyle = n.col),
          W.fillText(n.text, i, a),
          n.dot)
        ) {
          const o = i - n.tw / 2 - 7,
            l = a - n.size * 0.36;
          (W.beginPath(),
            W.arc(o, l, 4, 0, Math.PI * 2),
            (W.fillStyle = n.dot),
            W.fill(),
            (W.lineWidth = 1.5),
            (W.strokeStyle = "#000d"),
            W.stroke(),
            (W.lineWidth = 3),
            (W.strokeStyle = "#000c"));
        }
        if (n.sub) {
          const o = a - n.size - 2;
          ((W.font = `${n.size - 1}px "IBM Plex Mono", monospace`),
            W.strokeText(n.sub, n.x, o),
            (W.fillStyle = n.subCol || n.col),
            W.fillText(n.sub, n.x, o));
        }
      }
      ba.length = 0;
    },
    Wk = function (A, n, t, e, a, i) {
      ((W.fillStyle = "#000a"),
        W.fillRect(A, n, t, e),
        (W.fillStyle = i),
        W.fillRect(A, n, t * C(a, 0, 1), e));
    },
    dp = function (A) {
      const n = W;
      (n.setTransform(d1, 0, 0, d1, 0, 0),
        n.clearRect(0, 0, k0.w, k0.h),
        rp(A),
        n.setTransform(
          d1,
          0,
          0,
          d1,
          -Math.round(p0.x) * d1,
          -Math.round(p0.y) * d1,
        ));
      const t = c.bgImg;
      (op(n, t), (n.textAlign = "center"));
      for (const a of c.town ? [] : c.ground) {
        const i = a.it.ic ? PA(a.it.ic) : null,
          o = hA(a.it),
          l = c.pickTarget === a,
          d = Math.sin((a.age + a.x) * 3) * 1.5;
        if (
          ((n.fillStyle = "#0008"),
          n.beginPath(),
          n.ellipse(a.x, a.y + 2, 11, 4, 0, 0, 7),
          n.fill(),
          (n.strokeStyle = b0[a.it.r]),
          (n.lineWidth = l ? 2.5 : o ? 1.6 : 0.8),
          (n.globalAlpha = o || l ? 1 : 0.55),
          n.beginPath(),
          n.ellipse(a.x, a.y + 2, 12, 5, 0, 0, 7),
          n.stroke(),
          i && i.complete && i.naturalWidth)
        ) {
          const h = Math.min(26 / i.naturalWidth, 26 / i.naturalHeight);
          n.drawImage(
            i,
            a.x - (i.naturalWidth * h) / 2,
            a.y - i.naturalHeight * h + d,
            i.naturalWidth * h,
            i.naturalHeight * h,
          );
        }
        ((o || l || a.it.r >= 2) &&
          ((n.font = '9px "IBM Plex Mono", monospace'),
          (n.fillStyle = "#000"),
          n.fillText(a.it.n, a.x + 1, a.y - 27),
          (n.fillStyle = b0[a.it.r]),
          n.fillText(a.it.n, a.x, a.y - 28)),
          (n.globalAlpha = 1));
      }
      for (const a of c.corpses) {
        a.actT += A;
        const i = C(1.6 - a.actT, 0, 1),
          o = 1;
        (a.animKey &&
          o2(a.animKey, "die", a.dir || 0, a.actT, a.x, a.y, o * l2, i)) ||
          ((n.globalAlpha = i * 0.5),
          o5(a.img, a.sz, a.x, a.y, o, a.face < 0),
          (n.globalAlpha = 1));
      }
      ((c.corpses = c.corpses.filter((a) => a.actT < 1.6)), ID(n, A), wP(n, A));
      const e = c.enemies
        .filter((a) => !a.dead)
        .concat(
          [{ hero: !0, y: b.y }],
          typeof othEnts == "function" ? othEnts() : [],
          typeof gh == "function" ? gh() : [],
        )
        .sort((a, i) => a.y - i.y);
      for (const a of e) {
        if (a.oth) {
          othDraw(n, a.oth, A);
          continue;
        }
        if (a.ally) {
          Dy(n, a.ally, A);
          continue;
        }
        if (a.hero) {
          ((n.fillStyle = "#0007"),
            n.beginPath(),
            n.ellipse(b.x, b.y, 16, 6, 0, 0, 7),
            n.fill());
          const h = yt();
          b.animKey = h && h.anim;
          const g = b.x - (b.px ?? b.x),
            f = b.y - (b.py ?? b.y);
          if (
            ((b.px = b.x),
            (b.py = b.y),
            (b.moving = Math.hypot(g, f) > 0.4),
            b.moving && b.act !== "at" && (b.dir = On(g, f)),
            l5(
              b,
              c.stunT > 0 ? 0 : c.slowT > 0 ? A * e2 : A,
              b.moving ? "run" : "st",
            ),
            c.deadT > 0
              ? Da(b, "die")
              : b.act !== "at" &&
                b.act !== "hurt" &&
                Da(b, b.moving ? "run" : "st"),
            Cp(n),
            Oc(n, "under", 0),
            c.dashTrail && h && h.anim)
          )
            for (const v of c.dashTrail)
              Nc(
                h.anim,
                "run",
                v.dir || 0,
                0,
                v.x,
                v.y,
                Cn,
                0.45 * (1 - v.t / 0.3),
              );
          const m = kc(c.slowT > 0, c.hpDotT > 0, c.stunT > 0),
            w =
              h &&
              h.anim &&
              r5(m, b.x - 120, b.y - 220, 240, 245, () =>
                Nc(
                  h.anim,
                  b.act || "st",
                  b.dir || 0,
                  b.actT || 0,
                  b.x,
                  b.y,
                  Cn,
                ),
              );
          (Oc(n, "over", w ? Math.min(w, 90) : 60), Op(n, A));
          const p = b.y - (w ? Math.min(w, 90) * 0.9 : 52) - 6,
            P = typeof Di == "function" && Di();
          (zs(
            b.x,
            p,
            `${r.name || (I[r.fac] && I[r.fac].n) || ""}${Bc({ slowT: c.slowT, poison: c.hpDotT, stun: c.stunT })} · Lv${r.lvl}`,
            typeof D2 == "function" ? D2(r.name, r.fac) : va.hero,
            12,
            c.life / Math.max(1, c.P.life),
            "#4fd04f",
            P ? `«${ja(P)}»` : "",
            P ? P2[P[3]].c : "",
          ),
            !w &&
              !(
                h &&
                o5(
                  PA(h.img),
                  h.sz,
                  b.x,
                  b.y,
                  0.9,
                  b.face < 0,
                  c.deadT > 0 ? 0.35 : 1,
                )
              ) &&
              ((n.fillStyle = m0[j0()]),
              n.beginPath(),
              n.arc(b.x, b.y - 20, 14, 0, 7),
              n.fill()),
            c.stunT > 0 && Dc(b.x, b.y - (w ? Math.min(w, 90) * 0.85 : 52), Cn),
            c.hurtT > 0 &&
              ((n.fillStyle = "#f004"),
              n.beginPath(),
              n.arc(b.x, b.y - 24, 20, 0, 7),
              n.fill()));
          continue;
        }
        const i = 1;
        ((n.fillStyle = "#0007"),
          n.beginPath(),
          n.ellipse(a.x, a.y, a.r, a.r * 0.38, 0, 0, 7),
          n.fill(),
          (n.strokeStyle = m0[a.series]),
          (n.lineWidth = a.cls === "normal" ? 1.2 : 2.4),
          n.beginPath(),
          n.ellipse(a.x, a.y, a.r, a.r * 0.38, 0, 0, 7),
          n.stroke(),
          (a.animKey = r0[a.tid].anim),
          l5(
            a,
            a.stun > 0 ? 0 : a.slowT > 0 ? A * e2 : A,
            a.moving ? "run" : "st",
          ),
          a.act !== "at" &&
            a.act !== "hurt" &&
            a.act !== "die" &&
            Da(a, a.moving && !(a.stun > 0) ? "run" : "st"));
        const o = kc(a.slowT > 0, a.poison > 0, a.stun > 0),
          l =
            a.animKey &&
            r5(
              o,
              a.x - (a.cls === "boss" ? 170 : 110),
              a.y - (a.cls === "boss" ? 300 : 200),
              a.cls === "boss" ? 340 : 220,
              a.cls === "boss" ? 330 : 230,
              () =>
                o2(
                  a.animKey,
                  a.act || "st",
                  a.dir || 0,
                  a.actT || 0,
                  a.x,
                  a.y,
                  i * l2,
                  a.hitT > 0 ? 0.75 : 1,
                ),
            );
        (a.curse && Bp(n, a, i * l2),
          a.stFx && _p(n, a, l ? Math.min(l, 110) : 50, i * l2, A),
          !l &&
            !r5(
              o,
              a.x - (a.cls === "boss" ? 170 : 110),
              a.y - (a.cls === "boss" ? 300 : 200),
              a.cls === "boss" ? 340 : 220,
              a.cls === "boss" ? 330 : 230,
              () =>
                o5(a.img, a.sz, a.x, a.y, i, a.face < 0, a.hitT > 0 ? 0.6 : 1),
            ) &&
            ((n.fillStyle = m0[a.series]),
            n.beginPath(),
            n.arc(a.x, a.y - a.r, a.r, 0, 7),
            n.fill()),
          a.stun > 0 &&
            Dc(
              a.x,
              a.y -
                (l
                  ? Math.min(l, 110) * 0.85
                  : a.img && a.img.naturalHeight
                    ? a.img.naturalHeight
                    : a.r * 2),
              i * l2,
            ),
          a.hitT > 0 && (a.hitT -= A));
        const d =
          a.y -
          (l
            ? Math.min(l, 90) * 0.85
            : a.img && a.img.naturalHeight
              ? a.img.naturalHeight * i
              : a.r * 2) -
          8;
        zs(
          a.x,
          d,
          wp(a),
          a.goldBoss ? va.gold : va[a.cls] || va.normal,
          a.cls === "boss" ? 12 : 11,
          a.hp / a.max,
          a.cls === "boss" ? "#ff5030" : "#e03a2a",
          void 0,
          void 0,
          m0[a.series],
        );
      }
      if (
        ((c.fx = c.fx.filter((a) => {
          if (a.k === "jm") {
            const o = Dp(a, A);
            return (o && Pp(a), o);
          }
          if (a.k !== "mis" && a.k !== "boom") return !0;
          const i = sp(a, A);
          return (i && ip(a), i);
        })),
        c.fxQ && c.fxQ.length)
      ) {
        for (const a of c.fxQ) c.fx.push(a);
        c.fxQ.length = 0;
      }
      for (const a of c.fx) {
        if (a.k === "mis" || a.k === "boom" || a.k === "jm") continue;
        a.life -= A;
        const i = C(a.life / a.max, 0, 1);
        ((n.globalAlpha = i),
          (n.strokeStyle = a.color),
          a.k === "line"
            ? ((n.lineWidth = 3),
              n.beginPath(),
              n.moveTo(a.x1, a.y1),
              n.lineTo(a.x2, a.y2),
              n.stroke())
            : ((n.lineWidth = a.r ? 3 : 2),
              n.beginPath(),
              n.arc(a.x, a.y - (a.r ? 0 : 10), 8 + (1 - i) * (a.r || 30), 0, 7),
              n.stroke()));
      }
      ((n.globalAlpha = 1),
        (c.fx = c.fx.filter((a) => a.life > 0)),
        (n.textAlign = "center"),
        cp());
      for (const a of c.txt)
        ((a.life -= A),
          (a.y -= 32 * A),
          (n.globalAlpha = C(a.life / 0.5, 0, 1)),
          (n.font = `${a.size}px "IBM Plex Mono", monospace`),
          (n.fillStyle = "#000"),
          n.fillText(a.t, a.x + 1, a.y + 1),
          (n.fillStyle = a.color),
          n.fillText(a.t, a.x, a.y));
      ((n.globalAlpha = 1),
        (c.txt = c.txt.filter((a) => a.life > 0)),
        (typeof window.onWorldDrawAfterFx == "function" && window.onWorldDrawAfterFx(n, A)),
        n.setTransform(d1, 0, 0, d1, 0, 0),
        typeof md == "function" && md(n),
        typeof lp == "function" && lp(n),
        typeof qP == "function" && qP(n),
        c.banner &&
          c.banner.t > 0 &&
          ((c.banner.t -= A),
          (n.globalAlpha = C(c.banner.t, 0, 1)),
          (n.fillStyle = "#000a"),
          n.fillRect(0, k0.h * 0.36, k0.w, 54),
          (n.font = '20px "IBM Plex Mono", monospace'),
          (n.fillStyle = "#f3d88a"),
          n.fillText(c.banner.text, k0.w / 2, k0.h * 0.36 + 26),
          (n.font = '12px "IBM Plex Mono", monospace'),
          (n.fillStyle = "#d8ccb4"),
          n.fillText(c.banner.sub, k0.w / 2, k0.h * 0.36 + 44),
          (n.globalAlpha = 1)));
    },
    aA,
    W,
    d1 = 1,
    l2 = 1.35,
    Cn = 1.35,
    Pc = {},
    a0 = window.JFX || { m: {}, s: {}, c: {}, f: {} },
    Qs = 1.4,
    Gs = 60,
    Pa = (s, A) =>
      ((Math.round(Math.atan2(-s, A) / (Math.PI / 8)) % 16) + 16) % 16,
    fp = {
      340: [150, 7, 1, 0, 0],
      352: [162, 6, 1, 3, 5],
      354: [164, 0, 1, 5, 4],
      383: [204, 0, 1, 5, 4],
      329: [143, 7, 1, 0, 0],
      331: [144, 3, 4, 1, 9],
      382: [188, 7, 1, 2, 3],
      338: [148, 7, 1, 0, 0],
      389: [195, 7, 1, 0, 0],
      363: [170, 7, 1, 1, 0],
      371: [176, 7, 1, 0, 0],
      162: [27, 6, 1, 0, 0],
      373: [179, 7, 1, 0, 0],
      387: [193, 6, 1, 0, 0],
    },
    hp = {
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
      351: 352,
    },
    ot = (s) => Math.min(1.2, (s.n * s.ms) / 1e3),
    gp = 0.8,
    mp = () =>
      !(typeof ii == "function" && ii()) &&
      !!(
        window.matchMedia &&
        (window.matchMedia("(pointer: coarse)").matches ||
          window.innerWidth < 700)
      ),
    c5 = () => (document.body.classList.contains("mob") ? gp : 1),
    p0 = { x: 0, y: 0 },
    vc = () => [
      C(b.x - k0.w / 2, 0, Math.max(0, M0.w - k0.w)),
      C(b.y - k0.h * 0.55, 0, Math.max(0, M0.h - k0.h)),
    ],
    bc = 1536,
    sA = { s: 92, m: 8, top: 62 },
    Zk = (s, A, n = 120) =>
      s > p0.x - n &&
      s < p0.x + k0.w + n &&
      A > p0.y - n &&
      A < p0.y + k0.h + n,
    yc = {
      cold: "rgb(250,255,0)",
      stun: "rgb(50,30,40)",
      poison: "rgb(50,128,200)",
    },
    up = { f: "fx/st_stun.webp", n: 10, w: 54, h: 47, ax: 25, ay: 72, ms: 110 },
    c2 = null,
    Ks = null,
    kc = (s, A) => (A ? yc.poison : s ? yc.cold : null),
    On = (s, A) =>
      ((Math.round(Math.atan2(-s, A) / (Math.PI / 4)) % 8) + 8) % 8,
    xc = { at: 1, hurt: 1, die: 1 },
    va = {
      boss: "#ffb070",
      elite: "#8fc6ff",
      normal: "#e8dcc8",
      hero: "#fff3c0",
      pet: "#9fe36a",
      gold: "#ffd24a",
    },
    ba = [],
    Bc = (s) => {
      const A = [];
      return (
        s.slowT > 0 && A.push("Băng"),
        s.poison > 0 && A.push("Độc"),
        s.stun > 0 && A.push("Choáng"),
        A.length ? `(${A.join(" ")})` : ""
      );
    },
    wp = (s) =>
      `${s.curse && typeof _6 == "function" && _6(s) ? "☠ " : ""}${s.n}${Bc(s)} · Lv${s.L}`,
    _c = function (A, n, t) {
      const e = A ? A[5] : 0,
        a = A ? A[3] : 0,
        i = A ? A[4] : 0;
      switch (a) {
        case 1:
          return e + i;
        case 2:
          return e + n * i;
        case 3:
          return Math.max(
            0,
            e +
              n * i +
              (Math.random() < 0.5
                ? Math.random() * i
                : (-Math.random() * i) / 2),
          );
        case 4:
          return e + Math.random() * i;
        case 5:
          return t <= 1 ? e : e + Math.abs(n - Math.floor(t / 2)) * i;
      }
      return e;
    },
    En = function (A, n, t, e, a, i, o) {
      const l = a0.m[A];
      if (!l || c.quiet || c.fx.length > Hc) return null;
      const d = Fs(A) || [
        l.fly ? 1 : 0,
        16,
        Math.round((l.spd || 360) / Ys),
        10,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
      ];
      let [h, g, f, m, w, p, P, v, H, _] = d;
      (l.fly || ((h = 0), (g = 1)),
        JA && (JA.life && (g = JA.life), JA.spd && (f = JA.spd)));
      const E = !!(JA && JA.still);
      (E && ((f = 0), (g = Math.min(g || 12, 14)), (t += 14)),
        (g = C(g || 12, 1, 72)));
      const $ = {
        k: "jm",
        life: 1,
        m: l,
        mid: A,
        kind: h,
        lf: g,
        spd: f || 0,
        x: n,
        y: t,
        z: m * (p ? 1 : 0),
        vz: w / 1024,
        za: p / 1024,
        hz: p ? 0 : m,
        loop: !!P,
        cv: !!v,
        ae: !!H,
        cr: 10 + (_ || 1) * 14,
        age: -(i || 0),
        ang: e,
        tgt: a || null,
        hit: !1,
        still: E,
        cx: o && o.cx,
        cy: o && o.cy,
        rad: (o && o.rad) || 0,
        spin: (o && o.spin) || 1,
        sh: (JA && JA.sh) || 0,
        tr: [],
      };
      return (
        (h === 3 || h === 4) &&
          (($.cx = $.cx != null ? $.cx : b.x),
          ($.cy = $.cy != null ? $.cy : b.y),
          ($.rad =
            $.rad || Math.max(30, Math.hypot(n - $.cx, (t - $.cy) * 2)))),
        c.fx.push($),
        $
      );
    },
    Mc = function (A, n, t) {
      const e = A.m.hit;
      !e ||
        c.fx.length > Hc ||
        (c.fxQ || (c.fxQ = [])).push({
          k: "boom",
          s: e,
          x: n,
          y: t,
          t: 0,
          life: ot(e),
          dir: 0,
        });
    },
    pp = function (A) {
      if (A.hm && A.age >= A.hm) {
        if (!A.tgt || A.tgt.dead || A.tgt.hp <= 0) {
          let t = null,
            e = 700;
          for (const a of c.enemies || [])
            if (!a.dead && a.hp > 0) {
              const i = Math.hypot(a.x - A.x, a.y - A.y);
              i < e && ((e = i), (t = a));
            }
          A.tgt = t;
        }
        if (A.tgt) {
          const e =
            ((Vs(A.tgt.x - A.x, A.tgt.y - 14 - A.y) - A.ang + Math.PI * 3) %
              (Math.PI * 2)) -
            Math.PI;
          A.ang += C(e, -0.45, 0.45);
        }
      }
      (A.kind === 0 &&
        yp.has(A.mid) &&
        A.tgt &&
        !A.tgt.dead &&
        ((A.x = A.tgt.x), (A.y = A.tgt.y - 14)),
        A.still && A.tgt && !A.tgt.dead && ((A.x = A.tgt.x), (A.y = A.tgt.y)),
        A.sh && (A.tr.push([A.x, A.y]), A.tr.length > A.sh && A.tr.shift()));
      const n = (t, e) => {
        ((A.x += Math.cos(t) * e), (A.y += (Math.sin(t) * e) / 2));
      };
      switch (A.kind) {
        case 1:
        case 7:
        case 8:
        case 100:
          n(A.ang, A.spd);
          break;
        case 5:
          (A.tgt &&
            !A.tgt.dead &&
            Math.floor(A.age) % 8 === 0 &&
            (A.ang = Vs(A.tgt.x - A.x, A.tgt.y - 14 - A.y)),
            n(A.ang, A.spd));
          break;
        case 2:
          ((A.ang += (Math.random() - 0.5) * 0.9), n(A.ang, A.spd));
          break;
        case 3:
        case 4: {
          ((A.ang += d5 * A.spin),
            A.kind === 4 && (A.rad += (A.spd + 50) * d5));
          const t = A.kind === 3 ? b.x : A.cx,
            e = A.kind === 3 ? b.y : A.cy;
          ((A.x = t + Math.cos(A.ang) * A.rad),
            (A.y = e - 14 + (Math.sin(A.ang) * A.rad) / 2));
          break;
        }
      }
      A.za && ((A.z = Math.max(0, A.z + A.vz)), (A.vz -= A.za));
    },
    Dp = function (A, n) {
      const t = A.age;
      if (((A.age += n * Ys), A.age < 0)) return !0;
      if (Z0.g && A.kind && A.kind !== 3 && A.kind !== 4 && !V2(A.x, A.y + 14))
        return !1;
      for (
        let a = Math.max(0, Math.floor(t)) + 1;
        a <= Math.floor(A.age) && a <= A.lf;
        a++
      )
        pp(A);
      A.tgt &&
        A.tgt.dead &&
        (A.tgt.actT || 0) > 0.35 &&
        !A.hm &&
        ((A.tgt = null), (A.lost = !0));
      const e = A.tgt;
      return e &&
        !A.hit &&
        A.kind &&
        !A.still &&
        !(A.za && A.z > 20) &&
        Math.hypot(A.x - e.x, (A.y - (e.y - 14)) * 2) < A.cr &&
        ((A.hit = !0), Mc(A, e.x, e.y - 14), A.cv)
        ? !1
        : A.age >= A.lf
          ? (!A.hit &&
              !A.hm &&
              !A.lost &&
              (!A.kind ||
                A.still ||
                A.za ||
                (A.ae &&
                  (A.kind === 3 ||
                    A.kind === 4 ||
                    (A.tgt &&
                      Math.hypot(A.x - A.tgt.x, (A.y - A.tgt.y + 14) * 2) <
                        90)))) &&
              Mc(A, A.x, A.y),
            !1)
          : !0;
    },
    Pp = function (A) {
      if (A.age < 0) return;
      const n = A.m.fly;
      if (!n) return;
      const t = n.n,
        e = Math.max(1, Math.round(n.ms / (1e3 / Ys))),
        a = A.loop
          ? Math.floor(A.age / e) % t
          : Math.min(t - 1, Math.floor((t * A.age) / A.lf)),
        i = n.d > 1 ? Pa(Math.cos(A.ang), Math.sin(A.ang) / 2) : 0;
      if (A.sh && A.tr.length) {
        const o = W,
          l = o.globalAlpha;
        (A.tr.forEach((d, h) => {
          ((o.globalAlpha = (l * 0.55 * (h + 1)) / (A.tr.length + 1)),
            js(
              n,
              i,
              ((a + 0.5) * n.ms) / 1e3,
              d[0],
              d[1] - (A.z + A.hz) * $c,
              !1,
            ));
        }),
          (o.globalAlpha = l));
      }
      js(n, i, ((a + 0.5) * n.ms) / 1e3, A.x, A.y - (A.z + A.hz) * $c, !1);
    },
    ya = function (A, n, t, e, a, i, o) {
      const l = a.x,
        d = a.y - 20,
        h = i.x,
        g = i.y - 14,
        f = Vs(h - l, g - d),
        m = e ? e[1] : 0,
        w = e ? e[2] : 0,
        p = Fs(A),
        P = p ? p[0] !== 0 : !!(a0.m[A] || {}).fly,
        v = (_) => _c(e, _, t),
        H = (_, E, $, O) => [_ + Math.cos($) * O, E + (Math.sin($) * O) / 2];
      if (n === 8 && P) {
        for (let _ = 0; _ < t; _++)
          En(A, l, d, f, o, _ * Math.max(3, m || 4), null);
        return;
      }
      if (n >= 8) {
        for (let _ = 0; _ < t; _++)
          En(
            A,
            h + (t > 1 ? A0(-14, 14) : 0),
            g + (t > 1 ? A0(-8, 8) : 0),
            f,
            o,
            _ * Math.max(3, m || 4),
            null,
          );
        return;
      }
      switch (n) {
        case 0: {
          const _ = m || 32,
            E = f + Math.PI / 2,
            [$, O] = P ? [l, d] : [h, g];
          for (let z = 0; z < t; z++) {
            const R = (z - (t - 1) / 2) * _,
              [Z, E0] = H($, O, E, R);
            En(A, Z, E0, w ? f : E, o, v(z));
          }
          return;
        }
        case 1: {
          const _ = m || 24;
          for (let E = 0; E < t; E++) {
            let $, O;
            if (w) {
              const z = E % 2 ? 1 : -1,
                R = Math.ceil(E / 2);
              [$, O] = H(l, d, f + Math.PI / 2, z * R * _);
            } else [$, O] = H(l, d, f, _ * E);
            En(A, $, O, f, o, v(E));
          }
          return;
        }
        case 2: {
          const _ = (m || 2) * d5,
            [E, $] = H(l, d, f, w || 0);
          for (let O = 0; O < t; O++)
            En(A, E, $, f + (O - Math.floor(t / 2)) * _, o, v(O));
          return;
        }
        case 3: {
          for (let _ = 0; _ < t; _++) {
            const E = f + (_ * Math.PI * 2) / t,
              [$, O] = H(l, d, E, w || 20);
            En(A, $, O, E, null, v(_), { cx: l, cy: d + 14 });
          }
          return;
        }
        case 4:
          for (let _ = 0; _ < t; _++)
            En(
              A,
              h + (t > 1 ? A0(-50, 50) : 0),
              g + (t > 1 ? A0(-26, 26) : 0),
              f,
              o,
              v(_) + (e ? 0 : _ * 2),
            );
          return;
        default: {
          const [_, E] = n === 7 ? [l, d + 20] : [h, g],
            $ = Math.min(t, 6),
            O = [];
          for (let R = 0; R < $; R++)
            for (let Z = 0; Z < $; Z++)
              (m === 1 &&
                $ > 2 &&
                (R - ($ - 1) / 2) ** 2 + (Z - ($ - 1) / 2) ** 2 >
                  ($ * $) / 4) ||
                O.push([
                  R * $ + Z,
                  _ + (Z - ($ - 1) / 2) * 32,
                  E + (R - ($ - 1) / 2) * 16,
                ]);
          const z =
            O.length > 20 ? O.sort(() => Math.random() - 0.5).slice(0, 20) : O;
          for (const [R, Z, E0] of z)
            En(
              A,
              Z + ($ > 1 ? A0(-6, 6) : 0),
              E0 + ($ > 1 ? A0(-4, 4) : 0),
              f,
              o,
              v(R),
            );
        }
      }
    },
    Rs = function (A, n, t) {
      let e = (t.id && a0.f && a0.f[t.id]) || {},
        a = a0.g && a0.g[t.id];
      const i = T[t.id],
        o = i && i.child,
        l = o && a0.g && a0.g[o];
      let d = !1;
      a &&
        a[0] === 12 &&
        l &&
        a0.f[o] &&
        a0.f[o].c &&
        ((e = Object.assign({}, a0.f[o], { pre: e.pre })), (a = l), (d = !0));
      const h = e.c || a0.s[t.id],
        g = t.id && a0.m[h];
      if ((r2(t), !g || c.quiet)) {
        s5(A, n, t);
        return;
      }
      const f = a ? a[0] : e.form === void 0 ? 1 : e.form,
        m = C(
          !d && (t.nMis > 1 || (t.nMis === 1 && !(typeof V8 < "u" && V8[t.id])))
            ? Math.max(t.nMis, 1)
            : (a && a[6]) || e.num || 1,
          1,
          16,
        ),
        w = T[t.id],
        p = t.L || 1,
        P = (_) => (w && w.attr && w.attr[_] ? (P0(w, _, p) || [0])[0] : 0);
      JA = window.NO_JMOV
        ? null
        : {
            life: P("missle_lifetime_v"),
            spd: P("missle_speed_v"),
            sh: vp[t.id] || 0,
            still: kp.has(+t.id),
          };
      const v = bp[t.id],
        H = JA && JA.life;
      try {
        ya(h, f, r.lowFx ? Math.min(m, 3) : m, a, A, n, n);
      } finally {
        JA = null;
      }
      if (v && H && P("skill_flyevent")) {
        const _ = { x: n.x, y: n.y + 6 };
        for (let E = 0; E < H; E += v.t)
          setTimeout(
            () => {
              c.quiet || ya(v.mid, v.form, v.n, null, _, n, null);
            },
            (E / Ys) * 1e3,
          );
      }
      (Cc[t.id] &&
        typeof i5 == "function" &&
        n &&
        n.x != null &&
        i5(n, t, { sid: Cc[t.id] }),
        e.sub &&
          !f5.has(+t.id) &&
          String(e.sub.c) !== String(h) &&
          setTimeout(() => {
            c.quiet ||
              ya(
                e.sub.c,
                e.sub.form === 3 ? 3 : 4,
                C(e.sub.n || 1, 1, 8),
                null,
                { x: n.x, y: n.y + 6 },
                n,
                null,
              );
          }, 250));
    },
    Ys = 18,
    Hc = 160,
    d5 = (Math.PI * 2) / 64,
    $c = 0.5,
    Fs = (s) => (a0.k && a0.k[s]) || (typeof Tc < "u" && Tc[s]) || null,
    vp = {
      10: 5,
      11: 5,
      32: 5,
      37: 5,
      40: 5,
      41: 5,
      267: 5,
      271: 2,
      318: 5,
      320: 5,
      322: 5,
      323: 5,
      324: 5,
      325: 5,
      368: 5,
      395: 5,
    };
  (a0.f && a0.f[10] && (a0.f[10].c = 140), a0.s && (a0.s[10] = 140));
