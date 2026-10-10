var I5 = (s, A) => (s.s >= 0 ? s.s : s._s === void 0 ? (s._s = A.s) : s._s),
    S5 = function () {
      return (
        Array.isArray(r.potSlot) || (r.potSlot = ["auto", "auto"]),
        r.potSlot
      );
    },
    N5 = function (A) {
      const n = q5[A],
        t = ci(A);
      if (t) {
        const i = h1(t.kind);
        if ((i[t.tier] || 0) > 0) return (i[t.tier]--, { p: t, free: !0 });
        if (li(t) && Rt(t) <= r.gold) return { p: t, free: !1 };
      }
      const e = Pd(n),
        a = e || Q4(n);
      return a ? { p: a, free: !!e } : null;
    },
    f2 = function (A) {
      const n = ci(A),
        t = q5[A];
      if (n) return { ic: n.ic, n: h1(n.kind)[n.tier] || 0, name: n.n };
      const e = h1(t),
        a = Math.max(
          0,
          ...Object.keys(e)
            .filter((o) => e[o] > 0)
            .map(Number),
        ),
        i =
          (a && S.potions.find((o) => o.kind === t && o.tier === a)) ||
          Q4(t) ||
          S.potions.find((o) => o.kind === t);
      return {
        ic: i ? i.ic : "",
        n: Dd(t),
        name: "Tự động: " + (i ? i.n : ""),
      };
    },
    oi = function (A) {
      const n = q5[A],
        t = S5()[A],
        e = S.potions
          .filter((i) => i.kind === n || i.kind === "both")
          .sort(
            (i, o) =>
              (i.kind === "both") - (o.kind === "both") || i.tier - o.tier,
          ),
        a = (i) => {
          const o = li(i),
            l = h1(i.kind)[i.tier] || 0;
          return `<button class="shoprow${o ? "" : " bad"}${t === L5(i) ? " own" : ""}" data-pk="${L5(i)}" ${o ? "" : "disabled"}><img src="${D(i.ic)}" alt=""><span><b>${D(i.n)}</b><small>Hồi ${X(i.total)} ${i.kind === "mana" ? "nội lực" : "sinh lực"}${i.kind === "both" ? ` + ${X(i.mtotal)} nội lực` : ""} · ${o ? `${j(Rt(i))} lượng / bình · trong túi ${l}` : `cần cấp ${Kt[i.tier]}`}</small></span></button>`;
        };
      J(
        `<h3>Ô ${A + 1}: chọn thuốc</h3>
    <div class="shoplist"><button class="shoprow${t === "auto" ? " own" : ""}" data-pk="auto"><img src="${D((e.filter((i) => i.kind === n && li(i)).pop() || e[0]).ic)}" alt=""><span><b>Tự động</b><small>Thuốc ${n === "life" ? "sinh lực" : "nội lực"} tốt nhất mua được</small></span></button>${e.map(a).join("")}</div>`,
        () => {
          document.querySelectorAll("#mBody [data-pk]").forEach(
            (i) =>
              (i.onclick = () => {
                ((S5()[A] = i.dataset.pk),
                  (c.dirty = !0),
                  B(),
                  t0(!0),
                  typeof vA < "u" && vA === "more" && F(),
                  y(
                    `Ô ${A + 1}: ${i.dataset.pk === "auto" ? "Tự động" : kd(i.dataset.pk).n}`,
                  ));
                const o = u(A ? "#bMp" : "#bHp");
                o && (o._k = "");
              }),
          );
        },
      );
    },
    yd = [
      {
        n: "Thừa Tiên Mật (tiểu)",
        kind: "both",
        total: 100,
        dur: 5.6,
        mtotal: 60,
        mdur: 5.6,
        price: 80,
        tier: 1,
        ic: "img/i/potb1.png",
      },
      {
        n: "Thừa Tiên Mật (trung)",
        kind: "both",
        total: 250,
        dur: 5.6,
        mtotal: 150,
        mdur: 13.9,
        price: 150,
        tier: 2,
        ic: "img/i/potb1.png",
      },
      {
        n: "Thừa Tiên Mật (đại)",
        kind: "both",
        total: 500,
        dur: 11.1,
        mtotal: 300,
        mdur: 11.1,
        price: 750,
        tier: 3,
        ic: "img/i/potb3.png",
      },
      {
        n: "Thất Xảo Bổ Tâm Đan",
        kind: "both",
        total: 1e3,
        dur: 11.1,
        mtotal: 600,
        mdur: 11.1,
        price: 1500,
        tier: 4,
        ic: "img/i/potb3.png",
      },
      {
        n: "Ngũ Hoa Ngọc Lộ Hoàn",
        kind: "both",
        total: 5e3,
        dur: 5.6,
        mtotal: 5e3,
        mdur: 5.6,
        price: 3e3,
        tier: 5,
        ic: "img/i/potb5.png",
      },
    ];
  if (
    (S.potions.some((s) => s.kind === "both") || S.potions.push(...yd),
    S.shops &&
      S.shops.med &&
      !S.shops.med.items.some((s) => s.g === 1 && s.d === 2))
  )
    for (const s of yd)
      S.shops.med.items.push({ g: 1, d: 2, k: 0, lvl: s.tier, price: s.price });
  var L5 = (s) => s.kind + ":" + s.tier,
    kd = (s) => S.potions.find((A) => L5(A) === s) || null,
    li = (s) => r.lvl >= (Kt[s.tier] || 999),
    q5 = ["life", "mana"],
    ci = (s) => {
      const A = S5()[s];
      return A && A !== "auto" ? kd(A) : null;
    },
    Q = function () {
      const A = r.rw || (r.rw = {});
      (!A.stat || typeof A.stat != "object") && (A.stat = {});
      for (const [n, t] of Object.entries(QD)) n in A.stat || (A.stat[n] = t);
      return (
        (A.login = Object.assign(
          { last: "", streak: 0, total: 0, got: {}, claimed: !0 },
          A.login || {},
        )),
        A.towerRst !== 1 &&
          ((A.stat.towerBest = 0), (A.towerRst = 1), delete r.resumeTower),
        (A.ach = A.ach || {}),
        (A.title = A.title || ""),
        (A.fd = A.fd || 0),
        A.gbT == null && (A.gbT = Ld),
        (A.pet = A.pet || null),
        A
      );
    },
    yD = function () {
      return C0(1, DA);
    },
    xd = function (A) {
      const n = {};
      for (let t = 0; t < A; t++) {
        const e = yD();
        ((n[e] = (n[e] || 0) + 1), V("ht", e, 1));
      }
      return Object.keys(n)
        .sort((t, e) => e - t)
        .map((t) => `${n[t]} Huyền Tinh cấp ${t}`)
        .join(", ");
    },
    Q0 = function (A, n) {
      const t = [];
      if (A.gold) {
        const e = Math.round(A.gold * (1 + r.lvl / 10));
        ((r.gold += e), t.push(`${j(e)} lượng`));
      }
      if (A.pot) {
        const e = jd(A.pot.tier),
          a = h1(A.pot.kind),
          i = S.potions.find((o) => o.kind === A.pot.kind && o.tier === e);
        ((a[e] = (a[e] || 0) + A.pot.n),
          t.push(`${A.pot.n} ${i ? i.n : "bình thuốc"}`));
      }
      if (A.ht && A.htr) t.push(xd(A.ht));
      else if (A.ht) {
        const e = C(Math.floor(r.lvl / 15) + 1, 1, DA);
        (V("ht", e, A.ht), t.push(`${A.ht} Huyền Tinh cấp ${e}`));
      }
      if ((A.fd && ((Q().fd += A.fd), t.push(`${A.fd} Phúc Duyên`)), A.knb)) {
        const e = A.knb * c4;
        ((r.knb = (r.knb || 0) + e), t.push(`${e} Kim Nguyên Bảo`));
      }
      if (A.item) {
        const e = (() => {
          const a = C0(0, 9);
          return pA(a, Qe(a, 0), C(Math.round(r.lvl / 12) + 1, 1, 10), A.item);
        })();
        e && (tn(e, !0, !0, !0), t.push(D(e.n)));
      }
      if (
        A.set &&
        !A.common &&
        Fe("grant") < 1 &&
        Math.random() >= Fe("grant") * Ud
      ) {
        const e = C(Math.floor(r.lvl / 15) + 1, 1, DA);
        (V("ht", e, 2), t.push(`2 Huyền Tinh cấp ${e}`));
      } else if (A.set) {
        const e = Oa(A.common);
        e &&
          (tn(e, !0, !0, !0),
          t.push(`<b style="color:${b0[e.r]}">${D(e.n)}</b>`));
      }
      if (
        (A.pts && ((r.attrPts += A.pts), t.push(`${A.pts} điểm tiềm năng`)),
        A.buff)
      )
        for (const e in A.buff) {
          const [a, i] = A.buff[e];
          (Ea(e, a, i), t.push(zd(e, a, i)));
        }
      if (
        (A.skp &&
          ((r.skPts = (r.skPts || 0) + A.skp), t.push(`${A.skp} điểm kỹ năng`)),
        A.xp && r.lvl < Y2())
      ) {
        const e = r.lvl;
        (R4((S.exp[r.lvl - 1] * A.xp) / Yt),
          t.push(
            r.lvl > e
              ? `kinh nghiệm (lên cấp ${r.lvl})`
              : `${Math.round(A.xp * 1e3) / 10}% kinh nghiệm`,
          ));
      }
      if (A.misc)
        for (const e in A.misc)
          A.misc[e] > 0 &&
            (V("misc", e, A.misc[e]),
            t.push(`<b style="color:#ffd24a">${A.misc[e]} ${x2(e)}</b>`));
      return (
        t.length &&
          !c.batch &&
          (M(`🎁 ${D(n)}: ${t.join(", ")}`), c.quiet || i0("learn"), B()),
        t
      );
    },
    Oa = function (A, n) {
      const t = I[r.fac] ? I[r.fac].id : -1,
        e = r.lvl + 15,
        a = (l, d) => (l.req.find((h) => h[0] === d) || [0, -1])[1],
        i = S.sets.gold.filter((l) => i1(l.req) && tA(l) && os(l, r.lvl));
      if (A) {
        const l = S.sets.gold.filter(
            (f) => i1(f.req) && tA(f) && a(f, 39) < 0 && GD.test(f.n),
          ),
          d = l.filter((f) => a(f, 36) <= e && os(f, r.lvl)),
          h = l.filter((f) => a(f, 36) <= e),
          g = d.length ? d : h.length ? h : l;
        return g.length ? Ye("gold", _0(g), 5) : null;
      }
      if (!n && Math.random() >= Eu) {
        const l = i.filter((d) => a(d, 39) < 0 && a(d, 36) <= e);
        if (l.length) return Ye("gold", _0(l), 5);
      }
      let o = i.filter((l) => a(l, 39) === t && a(l, 36) <= e);
      return (
        o.length || (o = i.filter((l) => a(l, 36) <= e)),
        o.length || (o = i.filter((l) => a(l, 39) === t)),
        o.length ? Ye("gold", _0(o), 5) : null
      );
    },
    di = function () {
      if (!r || !r.fac) return;
      const A = Q().login,
        n = Zt();
      if (A.last === n) return;
      const t = new Date();
      (t.setDate(t.getDate() - 1),
        (A.streak = A.last === Na(t) ? A.streak + 1 : 1),
        (A.last = n),
        A.total++,
        (A.claimed = !1),
        Q().dq && delete Q().dq,
        Nn());
    },
    kD = function () {
      const A = Q().login;
      if (A.claimed) return;
      ((A.claimed = !0),
        Q0(Qd[(A.streak - 1) % 7], `Điểm danh ngày ${A.streak}`));
      const n = RD(A.total);
      (n &&
        !A.got[A.total] &&
        ((A.got[A.total] = 1), Q0(n, `Điểm danh ${A.total} ngày`)),
        rn());
    },
    fi = function () {
      const A = Q().lvGot || {};
      return z5().filter(([n]) => r.lvl >= n && !A[La(n)]);
    },
    Bd = function (A) {
      const n = Q(),
        t = z5().find((e) => e[0] === A);
      ((n.lvGot = n.lvGot || {}),
        !(!t || r.lvl < A || n.lvGot[La(A)]) &&
          ((n.lvGot[La(A)] = 1),
          Q0(t[1], `Mốc cấp ${A}${D0() ? ` (chuyển sinh ${D0()})` : ""}`),
          rn(),
          m2()));
    },
    h2 = function (A) {
      const n = r && r.buf && r.buf[A];
      return n && n.until > Date.now() ? n.p : 0;
    },
    Ea = function (A, n, t) {
      const e = VD(),
        a = Date.now(),
        i = e[A];
      i && i.until > a
        ? (e[A] =
            n >= i.p
              ? { p: n, until: i.until + t * 6e4 }
              : { p: i.p, until: i.until + (t * 6e4 * n) / i.p })
        : (e[A] = { p: n, until: a + t * 6e4 });
    },
    ft = function () {
      const A = Date.now(),
        n = [];
      for (const t in qa) {
        const e = r.buf && r.buf[t];
        if (!e || e.until <= A) continue;
        const a = Math.round((e.until - A) / 1e3);
        n.push(
          `${FD[t]} ${qa[t]} +${t === "luck" ? Math.round(e.p) : Math.round(e.p * 100) + "%"} <small class="dim">${Math.floor(a / 60)}:${String(a % 60).padStart(2, "0")}</small>`,
        );
      }
      return n.join(" · ");
    },
    sn = function (A, n = 1) {
      r && r.fac && A === "picked" && (Q().stat.picked += n);
    },
    rn = function () {
      if (!r || !r.fac) return;
      const A = Q();
      for (const [n, t, e, a] of mi)
        !A.ach[n] &&
          e() &&
          ((A.ach[n] = 1),
          Q0(a, `Thành tựu «${t}»`),
          c.quiet || y(`Thành tựu: ${t}`),
          Nn());
      typeof F5 == "function" && F5();
    },
    xD = function (A) {
      r.fac && !c.town && !c.tower && !c.dg && (Q().gbT -= A);
    },
    _d = function () {
      return !c.tower && !c.dg && Q().gbT <= 0;
    },
    Md = function () {
      const A = V0(Math.min(r.stage, l0)),
        n = Math.min(zt(r.stage), r.lvl) + 2,
        [t, e] = K0(b.x + 240, b.y - 120),
        a = zA(A.boss, n, "boss", t, e);
      ((a.hp = a.max = a.max * 2),
        (a.dmg *= 1.15),
        (a.goldBoss = !0),
        (a.n = "Trùm Hoàng Kim · " + $e(A.boss, A.n)),
        c.enemies.push(a),
        (Q().gbT = Ld),
        (c.banner = {
          t: 2.5,
          text: "Trùm Hoàng Kim xuất hiện!",
          sub: "Hạ để nhận đồ Hoàng Kim",
        }),
        M('<b style="color:#ffb52e">Trùm Hoàng Kim xuất hiện!</b>'));
    },
    BD = function (A) {
      let n = 0;
      return (
        A >= 3600 &&
          (Q0(
            { ht: 2, pot: { kind: "life", tier: 2, n: 5 } },
            "Tu luyện 1 giờ",
          ),
          n++),
        A >= 4 * 3600 &&
          (Q0({ fd: 10, buff: { xp: [0.3, 30] } }, "Tu luyện 4 giờ"), n++),
        A >= 8 * 3600 - 60 && (Q0({ set: 1, fd: 20 }, "Tu luyện 8 giờ"), n++),
        n
      );
    },
    g2 = function () {
      if (c.dg) {
        y("Đang ở phó bản");
        return;
      }
      if ((c.town && E1(), c.deadT > 0)) {
        y("Đang trọng thương, chờ hồi phục");
        return;
      }
      (typeof Xi == "function" && Xi(),
        (c.tower = { floor: Math.max(1, Q().stat.towerBest - 4) }),
        (c.enemies = []),
        (c.corpses = []),
        (c.spawnT = 1.2),
        (c.stall = 0),
        (c.life = c.P.life),
        (c.mana = c.P.mana),
        _D(),
        (c.banner = {
          t: 2,
          text: `${on.n} · tầng ${c.tower.floor}`,
          sub: "Qua tầng không hồi sinh lực · gục ngã là rời tháp",
        }),
        t0(!0),
        M(`🗼 Dịch chuyển vào <b>${on.n}</b>, tầng ${c.tower.floor}.`));
    },
    _D = function () {
      !window.JMO ||
        !window.JMO[String(on.id)] ||
        ((c.zoneShown = "tower"),
        Te(on.id),
        ([b.x, b.y] = K0(M0.w / 2, M0.h / 2)),
        nn(),
        (c.bgImg = PA(`img/z/${on.id}.jpg`)),
        Vt(on.mus || on.id));
    },
    Hd = function (A) {
      if (
        !(
          r.mode !== "tower" ||
          !r.fac ||
          c.tower ||
          c.dg ||
          c.deadT > 0 ||
          c.sat
        ) &&
        ((c.towerPilotT = (c.towerPilotT || 0) - A), !(c.towerPilotT > 0))
      ) {
        if (((c.towerPilotT = 4), !gi(p2))) {
          ((r.mode = "farm"), y(`Leo Tháp cần cấp ${p2}`));
          return;
        }
        (c.town && E1(), g2());
      }
    },
    MD = function () {
      const A = c.tower.floor,
        n = Rd(A),
        t = B0[Math.min(B0.length - 1, Math.floor(A / 3))],
        e = A % 5 === 0;
      ((c.enemies = []), (c.stall = 0), (c.stallHp = null));
      const a = e ? 1 : 3 + (A % 3),
        i = WD(A);
      for (let o = 0; o < a; o++) {
        const [l, d] = K0(b.x + A0(-260, 260), b.y + A0(-220, 220)),
          h = zA(e ? t.boss : _0(t.m), n, e ? "boss" : "elite", l, d);
        ((h.hp = h.max = Math.round(h.max * i.hp)),
          (h.dmg *= i.dmg),
          c.enemies.push(h));
      }
    },
    HD = function () {
      const A = Q(),
        n = c.tower.floor;
      if (n > A.stat.towerBest)
        if (((A.stat.towerBest = n), n % 5 === 0)) {
          const t = c.batch;
          c.batch = !0;
          const e = Q0({ fd: 10 }, "") || [],
            a = $D();
          ((c.batch = t), a && e.push(`<b style="color:#ffd24a">${a}</b>`));
          const i = Oa(!1);
          (i &&
            (tn(i, !0, !0, !0),
            e.push(`<b style="color:${b0[i.r]}">${D(i.n)}</b>`)),
            e.push(`<b style="color:#9fe8ff">${Bl()} Thần Bí Khoáng Thạch</b>`),
            M(`🎁 Tháp tầng ${n}: ${e.join(", ")}`),
            B());
        } else Q0({ ht: 1, htr: 1, fd: 2 }, `Tháp tầng ${n}`);
      else
        n % 5 === 0 &&
          M(
            `🎁 Tháp tầng ${n}: <b style="color:#9fe8ff">${Bl()} Thần Bí Khoáng Thạch</b>`,
          );
      (sn("tower"),
        rn(),
        c.tower.floor++,
        (c.spawnT = 1.5),
        (c.banner = {
          t: 1.5,
          text: `Tầng ${c.tower.floor}`,
          sub: `Quái cấp ${Rd(c.tower.floor)}${Q5(c.tower.floor) ? ` · quái mạnh thêm ${+(Q5(c.tower.floor) * 100).toFixed(2)}%` : ""}`,
        }));
    },
    $D = function () {
      const A = [...ha.values()].filter((t) => OA(t, 39) >= 0 && tA(t));
      if (!A.length) return null;
      const n = _0(A);
      return (V("shard", n.n), `Mảnh ${n.n} (${N("shard", n.n)}/${_A[n.n]})`);
    },
    Ia = function (A) {
      if (c.tower) {
        if (
          (M(
            `${A ? "Gục ở" : "Rời"} tháp thử thách tầng ${c.tower.floor}. Kỷ lục: ${Q().stat.towerBest}`,
          ),
          A &&
            r.mode === "tower" &&
            ((r.mode = "farm"),
            (c.dgPilotT = 0),
            M("⚔ Gục ngã trong Tháp: chuyển sang chế độ <b>Luyện Công</b>."),
            y("Gục ở Tháp — chuyển sang Luyện Công"),
            (c.afterTowerMap = !0)),
          (c.tower = null),
          (c.enemies = []),
          (c.corpses = []),
          (r.wave = 1),
          (c.spawnT = 0.5),
          (c.zoneShown = null),
          (c.field = null),
          typeof vn == "function")
        ) {
          const n = V0(Math.min(r.stage, l0));
          ((c.zoneShown = n.id), vn(n));
        }
        c.afterTowerMap &&
          ((c.afterTowerMap = !1),
          typeof ge == "function" && r.autoMap !== !1 && ge());
      }
    },
    j5 = function () {
      const A = (r && r.rw && r.rw.stat && r.rw.stat.reborn) || 0;
      return { hp: 1 + Yd * A, dmg: 1 + Fd * A };
    },
    hi = function () {
      const A = (r.rw && r.rw.stat && r.rw.stat.reborn) || 0;
      return { xp: -0.1 * Math.min(5, A), dmg: 0.1 * A };
    },
    TD = async function () {
      const A = Q();
      if (r.lvl < ht || A.stat.reborn >= w2) return;
      (await ct(
        "Chuyển sinh: về cấp 1, giữ trang bị. Toàn bộ điểm tiềm năng và kỹ năng cũ bị tẩy (giữ nguyên võ công 90 đã luyện), nhận điểm thưởng chuyển sinh. Quái mạnh hơn. Tiếp tục?",
      ),
        A.stat.reborn++,
        delete r.tanthuXp);
      const n = A.stat.reborn,
        t = I[r.fac].starter,
        e = r.bkOk || (r.bkOk = {});
      for (const i in r.sk) T[i] && T[i].book && (e[i] = 1);
      ((r.lvl = 1),
        (r.xp = 0),
        (r.attr = { str: 0, dex: 0, vit: 0, eng: 0 }),
        (r.attrPts = G5 + (r.bonusAtp || 0)));
      const a = {};
      for (const i in r.sk)
        T[i] &&
          T[i].tier === 90 &&
          r.sk[i] > 0 &&
          !(typeof xA == "function" && xA(i)) &&
          (a[i] = r.sk[i]);
      ((r.sk = Object.assign({}, a)),
        (r.skPts = K5 + (r.bonusSkp || 0)),
        t && ((r.sk[t] = 1), (r.main = t)),
        (r.mainLock = !1),
        (r.slots = [0, 0, 0, 0]),
        (r.stage = 1),
        (r.wave = 1),
        (c.tower = null),
        (c.enemies = []),
        (c.dirty = !0),
        (c.zoneShown = null),
        M(
          `<b class="up">Chuyển sinh lần ${n}!</b> Tẩy toàn bộ điểm cũ (giữ võ công 90${
            Object.keys(a).length
              ? ": " +
                Object.keys(a)
                  .map((i) => T[i].n + " " + a[i])
                  .join(", ")
              : ""
          }), nhận ${G5} tiềm năng + ${K5} điểm kỹ năng · −${n * 10}% kinh nghiệm, +${n * 10}% sát thương · quái +${Math.round(Yd * n * 100)}% máu, +${Math.round(Fd * n * 100)}% sát thương`,
        ),
        r.autoPts === !0
          ? (Oe(), Xn())
          : z8().total &&
            y("Bấm Gợi ý ở thẻ Nhân vật: cộng đủ điểm cho bộ đồ đang mặc"),
        typeof O1 == "function" && (O1(), MA()),
        rn(),
        t0(!0),
        F(),
        B());
    },
    CD = function () {
      const A = B0.slice(0, dA(Math.min(r.maxStage, l0)) + 1);
      return [...new Set(A.flatMap((n) => n.m))]
        .filter((n) => r0[n] && r0[n].anim)
        .slice(0, 12);
    },
    $d = function (A) {
      const n = Q().pet;
      ((Q().pet = { tid: A, lvl: n ? n.lvl : 1, xp: n ? n.xp : 0 }),
        (c.petPos = null),
        y("Đồng hành: " + r0[A].n),
        B(),
        u("#actTabs") && w1());
    },
    Td = function (A) {
      return (
        (6 + A.lvl * 5) * (1 + A.lvl * 0.04) * (1 + hi().dmg) * De() * X4(r.lvl)
      );
    },
    OD = function (A) {
      const n = r.rw && r.rw.pet;
      if (n && !r0[n.tid]) {
        const l = B0[C(Math.floor((r.stage || 0) / bn), 0, B0.length - 1)],
          d = l && l.m && l.m.find((h) => r0[h]);
        d != null && (n.tid = d);
      }
      if (!n || c.town || !r0[n.tid]) {
        c.petPos = null;
        return;
      }
      const t =
          c.petPos ||
          (c.petPos = {
            x: b.x - 30,
            y: b.y + 10,
            t: 0,
            act: "st",
            actT: 0,
            dir: 0,
          }),
        e = M1()
          .filter((l) => F0(b, l) < Vd)
          .sort((l, d) => F0(b, l) - F0(b, d))[0],
        a = e || { x: b.x - 36, y: b.y + 12 },
        i = Math.hypot(a.x - t.x, a.y - t.y),
        o = e ? e.r + 14 : 10;
      if (((t.moving = i > o), t.moving)) {
        const l = Math.min(1, (170 * A) / i);
        ((t.dir = On(a.x - t.x, a.y - t.y)),
          (t.x += (a.x - t.x) * l),
          (t.y += (a.y - t.y) * l));
      }
      if (
        (Math.hypot(b.x - t.x, b.y - t.y) > 500 &&
          ((t.x = b.x - 30), (t.y = b.y + 10)),
        (t.t -= A),
        e && !t.moving && t.t <= 0)
      ) {
        t.t = 1.2;
        const l = Td(n);
        ((e.hp -= l),
          (e.hitT = 0.1),
          (t.act = "at"),
          (t.actT = 0),
          (t.dir = On(e.x - t.x, e.y - t.y)),
          EA(e.x, e.y - 30, X(l), "#9fe36a", 11));
      }
    },
    ED = function (A) {
      const n = r.rw && r.rw.pet;
      if (!n) return;
      n.xp += A;
      const t = 20 + n.lvl * 12;
      n.xp >= t &&
        ((n.xp -= t),
        n.lvl++,
        M(`Đồng hành ${D(r0[n.tid].n)} lên cấp ${n.lvl}`));
    },
    ID = function (A, n) {
      const t = r.rw && r.rw.pet,
        e = c.petPos;
      !t ||
        !e ||
        !r0[t.tid] ||
        ((e.animKey = r0[t.tid].anim),
        l5(e, n, e.moving ? "run" : "st"),
        e.act !== "at" && Da(e, e.moving ? "run" : "st"),
        (A.fillStyle = "#0007"),
        A.beginPath(),
        A.ellipse(e.x, e.y, 10, 4, 0, 0, 7),
        A.fill(),
        o2(
          e.animKey,
          e.act || "st",
          e.dir || 0,
          e.actT || 0,
          e.x,
          e.y,
          0.75 * l2,
        ),
        zs(e.x, e.y - 42, `${r0[t.tid].n} · Lv${t.lvl}`, va.pet, 10, -1));
    },
    Sa = function () {
      const A = new Date().getMonth() + 1;
      return A === 1 || A === 2
        ? { n: "Tết Nguyên Đán", token: "Bánh Chưng", col: "#ff5a4a" }
        : A === 9 || A === 10
          ? { n: "Tết Trung Thu", token: "Bánh Trung Thu", col: "#ffd24a" }
          : A === 12
            ? { n: "Giáng Sinh", token: "Chuông Bạc", col: "#9fe3ff" }
            : { n: "Hội Võ Lâm", token: "Lệnh Bài Võ Lâm", col: "#c8a2ff" };
    },
    SD = function (A) {
      const [n, t] = R5[A],
        e = Q().stat;
      if (e.tokens < n) {
        y(`Cần ${n} ${Sa().token}`);
        return;
      }
      ((e.tokens -= n), Q0(t, Sa().n), m2());
    },
    ND = function (A) {
      const n = Q();
      if (((A = Math.min(A, Math.floor(n.fd / ZA))), A < 1)) {
        y(`Cần ${ZA} điểm Phúc Duyên`);
        return;
      }
      if (A === 1) {
        Cd();
        return;
      }
      const t = r.gold,
        e = {},
        a = [],
        i = r.inv.length;
      c.batch = !0;
      try {
        for (let g = 0; g < A; g++) {
          ((n.fd -= ZA), n.stat.chests++);
          for (const f of Q0(_e(ui(), (m) => m[0])[1], "Rương Phúc Duyên")) {
            if (/lượng$/.test(f)) continue;
            const m = f.match(/^(.+?) \+\S+(?: may mắn)? trong (\d+) phút$/);
            if (m) {
              const p = m[1] + " (phút)";
              e[p] = (e[p] || 0) + +m[2];
              continue;
            }
            if (
              /^<b|^[^\d]/.test(f) &&
              !/^\d+ (Kim Sáng|Ngưng Thần|Phúc Duyên|điểm)/.test(f)
            ) {
              a.push(f);
              continue;
            }
            const w = f.match(/^(\d+) (.+)$/);
            w ? (e[w[2]] = (e[w[2]] || 0) + +w[1]) : (e[f] = (e[f] || 0) + 1);
          }
        }
      } finally {
        c.batch = !1;
      }
      const o = r.gold - t,
        l = a.filter((g) => g.startsWith("<b")),
        d = [o > 0 ? `${j(o)} lượng` : ""]
          .concat(Object.entries(e).map(([g, f]) => `${f} ${g}`))
          .filter(Boolean);
      (a.length &&
        d.push(
          `${a.length} món đồ${l.length ? ` (${l.length} Hoàng Kim)` : ""}`,
        ),
        M(
          `🎁 Mở ${A} rương Phúc Duyên: ${d.join(", ")}${l.length ? " · " + l.join(", ") : ""}`,
        ),
        i0("learn"),
        rn(),
        B(),
        m2());
      const h = a.length - (r.inv.length - i);
      J(
        `<h3>Mở ${A} rương Phúc Duyên</h3><div class="card stats">${o > 0 ? `<span>Ngân lượng</span><span>+${j(o)}</span>` : ""}${Object.entries(
          e,
        )
          .map(([g, f]) => `<span>${D(g)}</span><span>+${f}</span>`)
          .join(
            "",
          )}<span>Trang bị</span><span>${a.length}${l.length ? ` (${l.length} Hoàng Kim)` : ""}</span></div>
    ${a.length ? `<div class="sl">${a.map((g) => `<div>${g}</div>`).join("")}</div>` : ""}${h > 0 ? `<p class="dim small">${h} món không vào được hành trang (đầy hoặc đồ thừa) đã được bán.</p>` : ""}
    <p class="desc">Còn ${n.fd} Phúc Duyên.</p><div class="btnrow"><button class="btn" id="cBack">Quay lại</button></div>`,
        () => {
          u("#cBack").onclick = () => {
            ((g1 = "chest"), Wt());
          };
        },
      );
    },
    Cd = function () {
      const A = Q();
      if (A.fd < ZA) {
        y(`Cần ${ZA} điểm Phúc Duyên`);
        return;
      }
      ((A.fd -= ZA), A.stat.chests++);
      const n = Q0(_e(ui(), (t) => t[0])[1], "Rương Phúc Duyên");
      (y("Rương Phúc Duyên: " + n.join(", ").replace(/<[^>]+>/g, "")), m2());
    },
    LD = function (A) {
      if (!r.fac) return;
      const n = Q();
      if (
        (n.stat.kills++,
        sn("kills"),
        A.cls === "boss" && (n.stat.bosses++, sn("bosses")),
        A.goldBoss &&
          (n.stat.goldBoss++, Q0({ set: 1, fd: 10 }, "Hạ Trùm Hoàng Kim")),
        Math.random() < 0.05)
      ) {
        n.stat.tokens++;
        const t = Sa();
        r.matMsg !== !1 &&
          M(`Nhặt được <b style="color:${t.col}">${D(t.token)}</b>`);
      }
      (ED(A.cls === "boss" ? 10 : A.cls === "elite" ? 3 : 1),
        (n.stat.kills % 25 === 0 || A.cls === "boss") && rn());
    },
    Od = function () {
      const A = Q(),
        n = A.stat.tokens || 0;
      return {
        login: A.login.claimed ? 0 : 1,
        lvms: fi().length,
        chest: Math.floor(A.fd / ZA),
        event: R5.filter(([t]) => n >= t).length,
      };
    },
    Ed = function () {
      if (!r || !r.fac) return !1;
      const A = Q();
      return Object.values(Od()).some((n) => n > 0);
    },
    Nn = function () {
      const A = u("#giftBtn");
      A && A.classList.toggle("on", Ed());
    },
    m2 = function () {
      (!u("#modal").classList.contains("hidden") && u("#giftTabs") && Wt(),
        Nn());
    },
    qD = function () {
      const A = Fe("grant") < 1 ? Fe("grant") * Ud : 1,
        n = C(Math.floor(r.lvl / 15) + 1, 1, DA);
      return A >= 1
        ? "1 đồ Hoàng Kim"
        : `2 Huyền Tinh cấp ${n} (${Math.round(A * 1e3) / 10}% thay bằng 1 đồ Hoàng Kim)`;
    },
    u2 = function (A) {
      const n = [];
      if ((A.gold && n.push(`${j(A.gold * (1 + r.lvl / 10))} lượng`), A.pot)) {
        const t = S.potions.find(
          (e) => e.kind === A.pot.kind && e.tier === jd(A.pot.tier),
        );
        n.push(`${A.pot.n} ${t ? t.n : "bình thuốc"}`);
      }
      if (
        (A.ht &&
          n.push(
            `${A.ht} Huyền Tinh cấp ${C(Math.floor(r.lvl / 15) + 1, 1, DA)}`,
          ),
        A.fd && n.push(`${A.fd} Phúc Duyên`),
        A.knb &&
          n.push(
            `<img src="img/ep/knb.png" alt="" style="height:13px;vertical-align:middle;image-rendering:pixelated"> ${A.knb * c4} Kim Nguyên Bảo`,
          ),
        A.item && n.push(`đồ ${A.item} dòng`),
        A.set &&
          n.push(
            A.common
              ? "1 đồ Hoàng Kim dùng chung (Kim Phong, An Bang, Định Quốc…)"
              : qD(),
          ),
        A.pts && n.push(`${A.pts} tiềm năng`),
        A.buff)
      )
        for (const t in A.buff)
          n.push(zd(t, A.buff[t][0], A.buff[t][1]).replace(" trong ", " "));
      if ((A.skp && n.push(`${A.skp} điểm kỹ năng`), A.misc))
        for (const t in A.misc) n.push(`${A.misc[t]} ${x2(t)}`);
      return n.join(", ");
    },
    jD = function (A) {
      if (g1 === "login") {
        const n = A.login,
          t = (((n.streak - 1) % 7) + 7) % 7;
        return `<p class="desc">Chuỗi ${n.streak} ngày · tổng ${n.total} ngày. Mốc 10 / 20 / 30 ngày có quà lớn (lặp lại mỗi 30 ngày).</p>
      <div class="days">${Qd.map((e, a) => `<div class="day${a < t || (a === t && n.claimed) ? " got" : ""}${a === t ? " cur" : ""}"><b>Ngày ${a + 1}</b><small>${u2(e)}</small></div>`).join("")}</div>
      <div class="btnrow"><button class="btn" id="gLogin" ${n.claimed ? "disabled" : ""}>${n.claimed ? "Đã nhận hôm nay" : "Nhận quà hôm nay"}</button></div>`;
      }
      if (g1 === "lvms") {
        const n = A.lvGot || {},
          t = D0();
        return `<p class="desc">${t ? `Mốc cấp vòng chuyển sinh ${t}: nhận lại mỗi lần chuyển sinh, chủ yếu hiệu ứng tăng kinh nghiệm / rơi đồ để lên lại cấp ${ht} nhanh hơn.` : "Quà mốc cấp: nhận một lần. Từ cấp 90 có thêm hiệu ứng tăng kinh nghiệm / tỉ lệ rơi đồ trong một số phút."} Hiệu ứng nhận thêm khi đang còn sẽ cộng dồn thời gian.</p>${fi().length > 1 ? `<div class="btnrow"><button class="btn on" id="gLvAll">Nhận tất cả (${fi().length})</button></div>` : ""}${ft() ? `<div class="card">${ft()}</div>` : ""}${z5()
          .map(
            ([e, a, i]) =>
              `<div class="qrow${r.lvl >= e ? "" : " lock"}"><span><b>Cấp ${e}</b><small>${u2(a)}${i ? " · " + i : ""}</small></span><small></small><button class="btn sm" data-lv="${e}" ${r.lvl >= e && !n[La(e)] ? "" : "disabled"}>${n[La(e)] ? "Đã nhận" : "Nhận"}</button></div>`,
          )
          .join("")}`;
      }
      if (g1 === "ach")
        return `<p class="desc">Đạt <b>${mi.filter((n) => A.ach[n[0]]).length}/${mi.length}</b> · thưởng tự nhận khi hoàn thành. Danh hiệu: thẻ Nhân vật → 🎖 Danh hiệu.</p>${[
          ...mi,
        ]
          .sort((n, t) => !!A.ach[t[0]] - !!A.ach[n[0]])
          .map(
            ([n, t, , e, a]) =>
              `<div class="qrow${A.ach[n] ? "" : " lock"}"><span><b>${t}</b><small>${u2(e)}</small></span><small>${A.ach[n] ? "✓" : ""}</small></div>`,
          )
          .join("")}`;
      if (g1 === "chest")
        return `<p class="desc">Điểm Phúc Duyên: <b>${A.fd}</b> (điểm danh, nhiệm vụ, thành tựu, trùm). Mỗi lần mở: ${ZA} điểm.</p>
      <div class="chips">${(() => {
        const n = ui(),
          t = n.reduce((e, a) => e + a[0], 0) || 1;
        return n
          .map(
            ([e, a]) =>
              `<span class="chip2">${u2(a)} · ${Math.round((e / t) * 1e3) / 10}%</span>`,
          )
          .join("");
      })()}</div>${ui().length < Xd.length ? '<p class="dim small">Đã đủ giới hạn Võ Lâm Mật Tịch / Tẩy Tủy Kinh nên rương không ra hai món này (tỉ lệ đã tính lại).</p>' : ""}
      <div class="btnrow"><button class="btn" id="gChest" ${A.fd >= ZA ? "" : "disabled"}>Mở ×1</button><button class="btn" data-ch="10" ${A.fd >= ZA * 10 ? "" : "disabled"}>Mở ×10</button><button class="btn" data-ch="100" ${A.fd >= ZA * 100 ? "" : "disabled"}>Mở ×100</button><button class="btn" data-ch="999999" ${A.fd >= ZA * 2 ? "" : "disabled"}>Mở hết (${Math.floor(A.fd / ZA)})</button></div>`;
      if (g1 === "event") {
        const n = Sa();
        return `<p class="desc">Sự kiện: <b style="color:${n.col}">${n.n}</b>. Quái rơi ${n.token} (5%). Đang có: <b>${A.stat.tokens}</b>.</p>${R5.map(([t, e], a) => `<div class="qrow"><span>${u2(e)}</span><small>${t} ${n.token}</small><button class="btn sm" data-e="${a}" ${A.stat.tokens >= t ? "" : "disabled"}>Đổi</button></div>`).join("")}`;
      }
      return "";
    },
    Id = function (A = Q()) {
      return `<p class="desc">Mỗi tầng một đợt tinh anh; lần đầu qua: tầng thường 1 Huyền Tinh + 2 Phúc Duyên; tầng chia hết cho 5 là trùm: 1 Mảnh HK Môn Phái + 1 món Hoàng Kim + 10 Phúc Duyên + 1 / 2 / 5 Thần Bí Khoáng Thạch (qua lại tầng trùm vẫn nhận). Quái cấp 10 + 4 × tầng (tối đa 200); từ tầng 49 mỗi tầng quái thêm 0,05% máu và sát thương. Gục ngã ở chế độ Leo Tháp: tự chuyển về Luyện Công. Gục ngã là rời tháp.</p>
      <p>Kỷ lục: <b>tầng ${A.stat.towerBest}</b>${c.tower ? ` · đang ở tầng ${c.tower.floor}` : ""}</p>
      <div class="btnrow">${c.tower ? '<button class="btn red" id="gTowerOut">Rời tháp</button>' : gi(p2) ? `<button class="btn" id="gTower">Vào tháp (từ tầng ${Math.max(1, A.stat.towerBest - 4)})</button>` : `<button class="btn" disabled>Cần cấp ${p2}</button>`}</div>`;
    },
    Sd = function (A = Q()) {
      const n = A.pet;
      return gi(Kd)
        ? `<p class="desc">Đồng hành đi theo và cùng đánh quái, lên cấp theo số quái hạ. Chọn trong các loài ở vùng đã tới (đổi loài vẫn giữ cấp).</p>${n && r0[n.tid] ? `<p>Đang dẫn: <b>${D(r0[n.tid].n)}</b> · cấp ${n.lvl} · sát thương ${X(Td(n))}/đòn</p>` : ""}
      <div class="petpick">${CD()
        .map(
          (t) =>
            `<button data-p="${t}" class="${n && n.tid === t ? "on" : ""}">${r0[t].img ? `<img src="${D(r0[t].img)}" alt="">` : ""}<b>${D(r0[t].n)}</b></button>`,
        )
        .join("")}</div>`
        : `<p class="desc">Đồng hành mở khóa ở cấp ${Kd}.</p>`;
    },
    zD = function (A = Q()) {
      const n = hi(),
        t = A.stat.reborn >= w2;
      return `<p class="desc">Đạt cấp ${ht}: về cấp 1, giữ trang bị; <b>mỗi lần chuyển sinh +${M3} cấp khi xét yêu cầu trang bị</b> (vd cấp 10 chuyển sinh 1 = cấp ${10 + M3}: mặc được mọi trang bị); võ công 90 học không cần Bí Kíp 90; mỗi lần +10% tỉ lệ rơi đồ; mốc cấp nhận lại mỗi vòng; tẩy toàn bộ điểm tiềm năng và kỹ năng cũ, nhận cố định <b>${G5} điểm tiềm năng + ${K5} điểm kỹ năng</b>; mỗi lần quái mạnh thêm (+25% máu, +15% sát thương), +10% sát thương nhưng <b>kinh nghiệm nhận được −10%</b> mỗi lần (tối đa ${w2} lần).</p>
      <p>Đã chuyển sinh: <b>${A.stat.reborn}</b> lần · hiện ${Math.round(n.xp * 100)}% kinh nghiệm, +${Math.round(n.dmg * 100)}% sát thương, kháng tất cả +${C8 * A.stat.reborn}%, kháng tối đa ${$8 + T8 * A.stat.reborn}% (mỗi lần +${C8}% kháng tất cả, +${T8}% kháng tối đa) · độ khó: quái ×${j5().hp.toFixed(2)} máu, ×${j5().dmg.toFixed(2)} sát thương.</p>
      <div class="btnrow"><button class="btn red" id="gReborn" ${r.lvl >= ht && !t ? "" : "disabled"}>${t ? "Đã chuyển sinh tối đa" : r.lvl >= ht ? "Chuyển sinh" : `Cần cấp ${ht}`}</button></div>`;
    },
    Wt = function s(A) {
      if (!r.fac) return;
      const n = Q(),
        t = Od();
      if ((Y5.some(([e]) => e === g1) || (g1 = "login"), A && !t[g1])) {
        const e = Y5.find(([a]) => t[a] > 0);
        e && (g1 = e[0]);
      }
      J(
        `<h3>🎁 Phần thưởng <small>Phúc Duyên ${n.fd}${n.stat.tokens ? ` · ${Sa().token} ${n.stat.tokens}` : ""}</small></h3><div class="dtabs" id="giftTabs">${Y5.map(([e, a]) => `<button data-g="${e}" class="${e === g1 ? "on" : ""}">${a}${t[e] ? ` <b class="gdot">${t[e] > 99 ? "99+" : t[e]}</b>` : ""}</button>`).join("")}</div>${jD(n)}`,
        () => {
          document.querySelectorAll("#mBody #giftTabs button").forEach(
            (a) =>
              (a.onclick = () => {
                ((g1 = a.dataset.g), s());
              }),
          );
          const e = (a, i) => {
            const o = u(a);
            o && (o.onclick = i);
          };
          (e("#gLogin", () => {
            (kD(), m2());
          }),
            e("#gChest", Cd),
            document
              .querySelectorAll("#mBody [data-ch]")
              .forEach((a) => (a.onclick = () => ND(+a.dataset.ch))),
            document
              .querySelectorAll("#mBody [data-lv]")
              .forEach((a) => (a.onclick = () => Bd(+a.dataset.lv))),
            e("#gLvAll", () => {
              for (const [a] of fi()) Bd(a);
              B();
            }),
            document.querySelectorAll("#mBody [data-t]").forEach(
              (a) =>
                (a.onclick = () => {
                  ((n.title = n.title === a.dataset.t ? "" : a.dataset.t),
                    (c.dirty = !0),
                    B(),
                    m2());
                }),
            ),
            document
              .querySelectorAll("#mBody [data-e]")
              .forEach((a) => (a.onclick = () => SD(+a.dataset.e))));
        },
      );
    },
    Nd = function () {
      r.fac &&
        J(
          `<h3>Chuyển sinh <small>${Q().stat.reborn}/${w2} lần</small></h3>${zD()}`,
          () => {
            const A = u("#gReborn");
            A && (A.onclick = TD);
          },
        );
    },
    Na = (s) => `${s.getFullYear()}-${s.getMonth() + 1}-${s.getDate()}`,
    Zt = () => Na(new Date()),
    Ld = 1800,
    qd = 300,
    ht = 200,
    w2 = 10,
    ZA = 10,
    QD = {
      kills: 0,
      bosses: 0,
      goldBoss: 0,
      picked: 0,
      towerBest: 0,
      reborn: 0,
      chests: 0,
      tokens: 0,
    },
    jd = (s) => {
      let A = s || 1;
      for (let n = 1; n < Kt.length; n++)
        r.lvl >= Kt[n] && (A = Math.max(A, n));
      return A;
    },
    zd = (s, A, n) =>
      s === "luck"
        ? `Quế Hoa Tửu +${A} may mắn trong ${n} phút`
        : `${qa[s]} +${Math.round(A * 100)}% trong ${n} phút`,
    GD =
      /^(An Bang|Định Quốc|Hiệp Cốt|Nhu Tình|Kim Phong|Thiên Hoàng|Động Sát)/i,
    Qd = [
      { ht: 2, knb: 1, buff: { xp: [0.3, 30] } },
      { fd: 5, ht: 2 },
      { fd: 10, knb: 1, misc: { ldt: 1 } },
      { ht: 3, knb: 1 },
      { item: 5, ht: 2, buff: { luck: [20, 30] } },
      { fd: 15, knb: 2, buff: { tt: [0.5, 30] } },
      { set: 1, fd: 30, knb: 5, misc: { rngua: 1 } },
    ],
    KD = {
      10: { ht: 5, pts: 10, knb: 10, misc: { lb: 1 } },
      20: { set: 1, pts: 20, knb: 15, misc: { rngua: 1 } },
      30: { set: 1, fd: 80, pts: 30, knb: 25, misc: { dtbk: 1 } },
    },
    RD = (s) => {
      const A = ((s - 1) % 30) + 1,
        n = KD[A];
      if (!n) return null;
      if (s <= 30) return n;
      const t = Object.assign({}, n);
      return (t.pts && ((t.fd = (t.fd || 0) + t.pts * 2), delete t.pts), t);
    },
    Gd = [
      [
        10,
        { ht: 2, pot: { kind: "life", tier: 1, n: 20 }, knb: 2 },
        "Mở khóa: tháp thử thách",
      ],
      [
        20,
        {
          buff: { xp: [0.3, 30] },
          pot: { kind: "mana", tier: 1, n: 20 },
          fd: 10,
          knb: 2,
          misc: { ldt: 1 },
        },
        "Mở khóa: đồng hành",
      ],
      [30, { item: 5, fd: 10, ht: 2, knb: 3 }, ""],
      [
        40,
        {
          buff: { luck: [20, 30] },
          pot: { kind: "life", tier: 1, n: 20 },
          pts: 3,
          ht: 2,
          knb: 3,
        },
        "",
      ],
      [50, { item: 6, fd: 15, ht: 3, knb: 5 }, "Danh hiệu «Thiếu hiệp»"],
      [
        60,
        {
          buff: { xp: [0.3, 30] },
          pot: { kind: "mana", tier: 1, n: 20 },
          pts: 3,
          ht: 3,
          knb: 5,
          misc: { lb: 1 },
        },
        "",
      ],
      [70, { set: 1, fd: 20, ht: 3, knb: 5 }, ""],
      [
        80,
        {
          misc: { rngua: 1 },
          pot: { kind: "life", tier: 1, n: 20 },
          pts: 4,
          ht: 4,
          knb: 6,
        },
        "",
      ],
      [90, { item: 6, fd: 20, ht: 4, knb: 10, buff: { xp: [0.3, 30] } }, ""],
      [95, { set: 1, fd: 25, pts: 5, ht: 4, knb: 6 }, "Danh hiệu «Đại hiệp»"],
      [
        97,
        {
          buff: { tt: [0.5, 30] },
          pot: { kind: "both", tier: 1, n: 20 },
          fd: 20,
          knb: 6,
        },
        "",
      ],
      [99, { set: 1, fd: 30, pts: 5, ht: 5, knb: 8 }, "Danh hiệu «Tông sư»"],
      [110, { fd: 30, ht: 5, knb: 8, buff: { xp: [0.5, 30] } }, ""],
      [
        120,
        { set: 1, fd: 30, pts: 5, ht: 5, knb: 8, buff: { drop: [0.5, 30] } },
        "",
      ],
      [135, { item: 6, fd: 40, ht: 6, knb: 10, buff: { xp: [0.5, 45] } }, ""],
      [
        150,
        { set: 1, fd: 50, pts: 8, ht: 6, knb: 12, buff: { xp: [1, 30] } },
        "",
      ],
      [165, { fd: 50, ht: 6, knb: 10, buff: { drop: [1, 30] } }, ""],
      [
        180,
        { set: 1, fd: 60, pts: 10, ht: 8, knb: 12, buff: { xp: [1, 45] } },
        "",
      ],
      [190, { set: 1, fd: 60, ht: 8, knb: 12, buff: { drop: [1, 45] } }, ""],
      [
        200,
        {
          set: 1,
          fd: 100,
          pts: 15,
          ht: 10,
          knb: 25,
          buff: { xp: [1, 60], drop: [1, 60] },
        },
        "Cấp tối đa · mở khóa chuyển sinh",
      ],
    ],
    YD = [
      [10, { fd: 15, knb: 3, buff: { xp: [0.5, 30] } }, ""],
      [30, { item: 6, fd: 15, ht: 3, knb: 4, buff: { drop: [0.5, 30] } }, ""],
      [50, { set: 1, fd: 20, ht: 4, knb: 6, buff: { xp: [0.5, 45] } }, ""],
      [80, { fd: 25, ht: 5, knb: 6, buff: { xp: [1, 30] } }, ""],
      [100, { set: 1, pts: 5, ht: 6, knb: 8, buff: { drop: [1, 30] } }, ""],
      [130, { set: 1, fd: 40, ht: 6, knb: 8, buff: { xp: [1, 45] } }, ""],
      [
        160,
        {
          set: 1,
          fd: 50,
          pts: 8,
          ht: 8,
          knb: 10,
          buff: { xp: [1, 45], drop: [1, 45] },
        },
        "",
      ],
      [
        200,
        {
          set: 1,
          fd: 100,
          pts: 15,
          ht: 10,
          knb: 20,
          buff: { xp: [1.5, 60], drop: [1, 60] },
        },
        "Mở khóa chuyển sinh lần sau",
      ],
    ],
    z5 = () => (D0() ? YD : Gd),
    La = (s) => (D0() ? D0() + ":" + s : s),
    p2 = 10,
    Kd = 20,
    gi = (s) => r.lvl >= s || Q().stat.reborn > 0,
    qa = {
      xp: "Kinh nghiệm",
      drop: "Tỉ lệ rơi đồ",
      tt: "Tiên Thảo Lộ",
      luck: "May mắn",
    },
    FD = { xp: "⏫", drop: "🎲", tt: "🌿", luck: "🍶" },
    VD = () => r.buf || (r.buf = {}),
    mi = [
      [
        "lv30",
        "Xuất sơn",
        () => r.lvl >= 30 || Q().stat.reborn > 0,
        { ht: 2, knb: 2 },
        ["lifemax_p", 3],
      ],
      [
        "lv50",
        "Thiếu hiệp",
        () => (Q().lvGot || {})[50],
        { fd: 10, knb: 3 },
        ["lifemax_p", 4],
      ],
      [
        "lv80",
        "Danh chấn giang hồ",
        () => r.lvl >= 80 || Q().stat.reborn > 0,
        { fd: 10, pts: 10, knb: 5 },
        ["attackspeed_v", 3],
      ],
      [
        "lv100",
        "Đại hiệp",
        () => (Q().lvGot || {})[95] || (Q().lvGot || {})[100],
        { fd: 20, knb: 5 },
        ["allres_p", 4],
      ],
      [
        "lv150",
        "Tông sư",
        () => (Q().lvGot || {})[99] || (Q().lvGot || {})[150],
        { fd: 30, knb: 8 },
        ["allres_p", 6],
      ],
      [
        "k1000",
        "Sát thủ",
        () => Q().stat.kills >= 1e3,
        { fd: 10, knb: 2 },
        ["manamax_p", 4],
      ],
      [
        "k10000",
        "Vạn nhân địch",
        () => Q().stat.kills >= 1e4,
        { set: 1, knb: 5 },
        ["attackspeed_v", 5],
      ],
      [
        "b50",
        "Diệt trùm",
        () => Q().stat.bosses >= 50,
        { fd: 20, ht: 3, knb: 3 },
        ["allres_p", 3],
      ],
      [
        "zone8",
        "Nửa giang sơn",
        () => r.maxStage >= l0 / 2,
        { fd: 15, ht: 3, knb: 3 },
        ["fastwalkrun_p", 5],
      ],
      [
        "zone16",
        "Trường Bạch sơn chủ",
        () => r.maxStage > l0,
        { set: 1, pts: 20, knb: 10 },
        ["lifemax_p", 6],
      ],
      [
        "setfull",
        "Hoàng Kim đủ bộ",
        () => o1(r.eq),
        { fd: 30, knb: 10 },
        ["allres_p", 5],
      ],
      [
        "tower20",
        "Leo tháp tầng 20",
        () => Q().stat.towerBest >= 20,
        { set: 1, knb: 5 },
        ["attackspeed_v", 6],
      ],
      [
        "reborn1",
        "Chuyển sinh",
        () => Q().stat.reborn >= 1,
        { fd: 50, knb: 20 },
        ["lifemax_p", 8],
      ],
      [
        "gold5",
        "Săn trùm Hoàng Kim",
        () => Q().stat.goldBoss >= 5,
        { fd: 20, ht: 4, knb: 8 },
        ["lucky_v", 10],
      ],
      [
        "login30",
        "Giang hồ lão luyện",
        () => Q().login.total >= 30,
        { set: 1, knb: 10 },
        ["manamax_p", 6],
      ],
    ],
    on = { id: 397, mus: 50, n: "Thông Thiên Tháp" },
    Rd = (s) => Math.min(Y2(), 10 + s * 4),
    XD = (s) => Math.max(0, s | 0),
    UD = 0.001,
    JD = 5,
    Q5 = (s) => Math.floor(XD(s) / JD) * UD,
    WD = (s) => {
      const A = Q5(s);
      return { hp: 1 + A, dmg: 1 + A };
    },
    Yd = 0.25,
    Fd = 0.15,
    G5 = 5,
    K5 = 1,
    Vd = 400,
    R5 = [
      [10, { buff: { xp: [0.3, 30] } }],
      [15, { knb: 2 }],
      [20, { pot: { kind: "both", tier: 1, n: 20 } }],
      [25, { ht: 3 }],
      [30, { item: 6 }],
      [35, { misc: { ldt: 1 } }],
      [40, { fd: 30 }],
      [50, { knb: 8 }],
      [60, { set: 1, common: 1 }],
      [80, { misc: { rngua: 1 } }],
    ],
    Xd = [
      [32, { knb: 1 }],
      [16, { buff: { tt: [0.5, 30] } }],
      [16, { buff: { luck: [20, 30] } }],
      [12, { misc: { ldt: 1 } }],
      [9, { misc: { vlmt: 1 } }],
      [9, { misc: { ttk: 1 } }],
      [3, { misc: { rngua: 1 } }],
      [3, { set: 1, common: 1 }],
    ],
    ui = () =>
      Xd.filter(
        ([, s]) =>
          !(
            s.misc &&
            ((s.misc.vlmt && !O6("vlmt")) || (s.misc.ttk && !O6("ttk")))
          ),
      ),
    Ud = 0.35,
    g1 = "login",
    Y5 = [
      ["login", "Điểm danh"],
      ["lvms", "Mốc cấp"],
      ["chest", "Phúc Duyên"],
      ["event", "Sự kiện"],
      ["ach", "Thành tựu"],
    ],
    F5 = function (A) {
      if (!r || !r.fac) return 0;
      const n = V5();
      let t = 0;
      for (const e of v2)
        !n[e[0]] &&
          e[4]() &&
          ((n[e[0]] = 1),
          t++,
          !A &&
            !c.quiet &&
            (M(
              `🎖 Đạt danh hiệu <b style="color:${P2[e[3]].c}">«${D(ja(e))}»</b> (${P2[e[3]].n}) — đeo ở thẻ Nhân vật.`,
            ),
            y("Danh hiệu mới: " + ja(e))));
      return t;
    },
    ZD = function (A) {
      const n = Di();
      n && Fn(A, n[6][0], [n[6][1], 0, 0]);
    },
    Jd = function s() {
      F5();
      const A = V5(),
        n = Di(),
        t = [...new Set(v2.map((i) => i[2]))],
        e = v2.filter((i) => A[i[0]]).length,
        a = Wd[Zd(r.fac)];
      J(
        `<h3>🎖 Danh hiệu <small>${e}/${v2.length}</small></h3>
    <p class="desc">Phe: <b style="color:${a.c}">${a.n}</b> (màu tên nhân vật). Đeo 1 danh hiệu: hiện phía trên tên và cộng 1 chỉ số. ${n ? `Đang đeo: <b style="color:${P2[n[3]].c}">«${D(ja(n))}»</b>` : "Chưa đeo danh hiệu."}</p>
    ${t
      .map(
        (i) =>
          `<h3>${i}</h3>` +
          v2
            .filter((o) => o[2] === i)
            .map((o) => {
              const l = !!A[o[0]],
                d = n === o;
              return `<div class="qrow${l ? "" : " lock"}"><span><b style="color:${l ? P2[o[3]].c : "#777"}">«${D(ja(o))}»</b> <small class="dim">${P2[o[3]].n}</small><small>${D(o[5])} · ${D(RA(o[6][0], [o[6][1], 0, 0]))}</small></span><small></small>
        <button class="btn sm${d ? " on" : ""}" data-tt="${o[0]}" ${l ? "" : "disabled"}>${d ? "Tháo" : l ? "Đeo" : "Chưa đạt"}</button></div>`;
            })
            .join(""),
      )
      .join("")}`,
        () => {
          document.querySelectorAll("#mBody [data-tt]").forEach(
            (i) =>
              (i.onclick = () => {
                const o = Q();
                ((o.title = o.title === i.dataset.tt ? "" : i.dataset.tt),
                  (c.dirty = !0),
                  B(),
                  F(),
                  s());
              }),
          );
        },
      );
    },
    AP = {
      shaolin: "chinh",
      wudang: "chinh",
      emei: "chinh",
      gaibang: "chinh",
      tianwang: "trung",
      tangmen: "trung",
      cuiyan: "trung",
      kunlun: "trung",
      wudu: "ta",
      tianren: "ta",
    },
    Wd = {
      chinh: { n: "Chính phái", c: "#ffb347" },
      trung: { n: "Trung lập", c: "#7ee07e" },
      ta: { n: "Tà phái", c: "#c77bff" },
      tan: { n: "Tân thủ", c: "#ececec" },
    },
    Zd = (s) => AP[s] || "tan",
    nP = (s) => Wd[Zd(s)].c,
    tP = ["nov"],
    eP = "#ff3b3b",
    wi = (s) =>
      tP.includes(
        String(s || "")
          .trim()
          .toLowerCase(),
      ),
    D2 = (s, A) => (wi(s) ? eP : nP(A)),
    P2 = [
      null,
      { n: "Thường", c: "#e8e0d0" },
      { n: "Hiếm", c: "#6aa8ff" },
      { n: "Quý", c: "#c77bff" },
      { n: "Truyền kỳ", c: "#ffb52e" },
      { n: "Chí tôn", c: "#ff5a3c" },
    ],
    aP = {
      shaolin: "Thiếu Lâm",
      tianwang: "Thiên Vương",
      tangmen: "Đường Môn",
      wudu: "Ngũ Độc",
      emei: "Nga My",
      cuiyan: "Thúy Yên",
      gaibang: "Cái Bang",
      tianren: "Thiên Nhẫn",
      wudang: "Võ Đang",
      kunlun: "Côn Lôn",
    },
    pi = () => aP[r.fac] || "",
    ln = () => (Q().stat.reborn > 0 ? 200 : r.lvl),
    A7 = (s = 1) =>
      Object.keys(r.sk || {}).some(
        (A) => T[A] && T[A].tier === 90 && r.sk[A] >= s,
      ),
    n7 = () => (r.dt && r.dt.n) || 0,
    v2 = [
      [
        "xuatson",
        "Sơ Nhập Giang Hồ",
        "Cấp bậc",
        1,
        () => ln() >= 10 && !I[r.fac].novice,
        "Gia nhập môn phái",
        ["lifemax_p", 2],
      ],
      [
        "lv30",
        "Xuất Sơn",
        "Cấp bậc",
        1,
        () => ln() >= 30,
        "Đạt cấp 30",
        ["lifemax_p", 3],
      ],
      [
        "lv50",
        "Thiếu Hiệp",
        "Cấp bậc",
        2,
        () => ln() >= 50,
        "Đạt cấp 50",
        ["lifemax_p", 4],
      ],
      [
        "lv80",
        "Danh Chấn Giang Hồ",
        "Cấp bậc",
        2,
        () => ln() >= 80,
        "Đạt cấp 80",
        ["attackspeed_v", 3],
      ],
      [
        "lv100",
        "Đại Hiệp",
        "Cấp bậc",
        3,
        () => ln() >= 100,
        "Đạt cấp 100",
        ["allres_p", 4],
      ],
      [
        "lv150",
        "Tông Sư",
        "Cấp bậc",
        4,
        () => ln() >= 150,
        "Đạt cấp 150",
        ["allres_p", 6],
      ],
      [
        "lv200",
        "Võ Lâm Chí Tôn",
        "Cấp bậc",
        5,
        () => ln() >= 200,
        "Đạt cấp 200",
        ["allres_p", 8],
      ],
      [
        "cs1",
        "Nhất Trùng Sinh",
        "Chuyển sinh",
        3,
        () => Q().stat.reborn >= 1,
        "Chuyển sinh 1 lần",
        ["lifemax_p", 8],
      ],
      [
        "cs3",
        "Tam Trùng Sinh",
        "Chuyển sinh",
        4,
        () => Q().stat.reborn >= 3,
        "Chuyển sinh 3 lần",
        ["lifemax_p", 10],
      ],
      [
        "cs5",
        "Ngũ Trùng Tuyệt Đỉnh",
        "Chuyển sinh",
        5,
        () => Q().stat.reborn >= 5,
        "Chuyển sinh 5 lần",
        ["lifemax_p", 14],
      ],
      [
        "cs10",
        "Thập Trùng Chí Tôn",
        "Chuyển sinh",
        5,
        () => Q().stat.reborn >= 10,
        "Chuyển sinh 10 lần",
        ["lifemax_p", 18],
      ],
      [
        "mp1",
        () => pi() + " Đệ Tử",
        "Môn phái",
        1,
        () => !I[r.fac].novice,
        "Gia nhập môn phái",
        ["manamax_p", 3],
      ],
      [
        "mp2",
        () => pi() + " Hộ Pháp",
        "Môn phái",
        2,
        () => !I[r.fac].novice && ln() >= 60,
        "Cấp 60 trong môn phái",
        ["manamax_p", 5],
      ],
      [
        "mp3",
        () => pi() + " Trưởng Lão",
        "Môn phái",
        3,
        () => !I[r.fac].novice && ln() >= 90 && A7(),
        "Cấp 90 + lĩnh ngộ võ công 90",
        ["manamax_p", 7],
      ],
      [
        "mp4",
        () => pi() + " Chưởng Môn",
        "Môn phái",
        4,
        () => !I[r.fac].novice && ln() >= 150 && A7(20),
        "Cấp 150 + một võ công 90 cấp 20",
        ["allres_p", 6],
      ],
      [
        "k1000",
        "Sát Thủ",
        "Chiến công",
        1,
        () => Q().stat.kills >= 1e3,
        "Hạ 1.000 quái",
        ["manamax_p", 4],
      ],
      [
        "k10000",
        "Vạn Nhân Địch",
        "Chiến công",
        2,
        () => Q().stat.kills >= 1e4,
        "Hạ 10.000 quái",
        ["attackspeed_v", 5],
      ],
      [
        "k100000",
        "Huyết Sát Thiên Hạ",
        "Chiến công",
        4,
        () => Q().stat.kills >= 1e5,
        "Hạ 100.000 quái",
        ["attackspeed_v", 8],
      ],
      [
        "b50",
        "Diệt Trùm",
        "Chiến công",
        2,
        () => Q().stat.bosses >= 50,
        "Hạ 50 Trùm",
        ["allres_p", 3],
      ],
      [
        "b500",
        "Đồ Long Hiệp Sĩ",
        "Chiến công",
        4,
        () => Q().stat.bosses >= 500,
        "Hạ 500 Trùm",
        ["allres_p", 6],
      ],
      [
        "gold5",
        "Săn Trùm Hoàng Kim",
        "Chiến công",
        3,
        () => Q().stat.goldBoss >= 5,
        "Hạ 5 Trùm Hoàng Kim",
        ["lucky_v", 10],
      ],
      [
        "tower20",
        "Phá Tháp Giả",
        "Chiến công",
        3,
        () => Q().stat.towerBest >= 20,
        "Leo tháp tầng 20",
        ["attackspeed_v", 6],
      ],
      [
        "tower50",
        "Thông Thiên Tháp Chủ",
        "Chiến công",
        5,
        () => Q().stat.towerBest >= 50,
        "Leo tháp tầng 50",
        ["attackspeed_v", 10],
      ],
      [
        "dt100",
        "Hành Hiệp Trượng Nghĩa",
        "Hành hiệp",
        2,
        () => n7() >= 100,
        "Hoàn thành 100 nhiệm vụ Dã Tẩu",
        ["lucky_v", 8],
      ],
      [
        "dt1000",
        "Nghĩa Hiệp Thiên Hạ",
        "Hành hiệp",
        4,
        () => n7() >= 1e3,
        "Hoàn thành 1.000 nhiệm vụ Dã Tẩu",
        ["lucky_v", 15],
      ],
      [
        "zone8",
        "Nửa Giang Sơn",
        "Hành hiệp",
        2,
        () => r.maxStage >= l0 / 2,
        "Mở nửa số bản đồ",
        ["fastwalkrun_p", 5],
      ],
      [
        "zone16",
        "Trường Bạch Sơn Chủ",
        "Hành hiệp",
        3,
        () => r.maxStage > l0,
        "Mở hết bản đồ",
        ["lifemax_p", 6],
      ],
      [
        "login30",
        "Giang Hồ Lão Luyện",
        "Giang hồ",
        2,
        () => Q().login.total >= 30,
        "Đăng nhập 30 ngày",
        ["manamax_p", 6],
      ],
      [
        "setfull",
        "Hoàng Kim Gia Thân",
        "Giang hồ",
        4,
        () => typeof o1 == "function" && o1(r.eq),
        "Mặc đủ 1 bộ Hoàng Kim",
        ["allres_p", 5],
      ],
      [
        "vio6",
        "Huyền Tinh Thần Tượng",
        "Giang hồ",
        3,
        () =>
          Object.values(r.eq || {}).some(
            (s) => s && s.vio && (s.mag || []).length >= 6,
          ),
        "Mặc 1 món Tím đủ 6 dòng",
        ["allres_p", 4],
      ],
      [
        "rich",
        "Phú Giáp Nhất Phương",
        "Giang hồ",
        3,
        () => r.gold >= 1e7,
        "Có 10 triệu lượng",
        ["lucky_v", 12],
      ],
    ],
    t7 = Object.fromEntries(v2.map((s) => [s[0], s])),
    ja = (s) => (typeof s[1] == "function" ? s[1]() : s[1]),
    V5 = () => {
      const s = Q();
      s.titles = s.titles || {};
      for (const A in s.ach || {}) t7[A] && (s.titles[A] = 1);
      return s.titles;
    },
    Di = () => {
      const s = r && r.rw && r.rw.title,
        A = s && t7[s];
      return A && V5()[s] ? A : null;
    },
    m1 = function () {
      const A = r.rec || (r.rec = {});
      for (const n of [
        "maxHit",
        "maxDps",
        "fastBoss",
        "bestItem",
        "maxEnh",
        "bestStreak",
        "maxGoldKill",
        "wbBest",
        "horseLv",
      ])
        A[n] && typeof A[n] != "object" && delete A[n];
      return (
        (A.deaths = A.deaths | 0),
        (A.play = +A.play || 0),
        (A.goldKill = +A.goldKill || 0),
        (A.streak = A.streak | 0),
        (A.dgClear = A.dgClear || {}),
        (A.dgBest = A.dgBest || {}),
        (A.dgRank = A.dgRank || {}),
        (A.wbTries = A.wbTries | 0),
        (A.horses = A.horses | 0),
        A
      );
    },
    gt = function (A, n, t, e = !0) {
      if (!r || !r.fac || !Number.isFinite(n)) return !1;
      const a = m1(),
        i = a[A];
      return i && (e ? n <= i.v : n >= i.v)
        ? !1
        : ((a[A] = Object.assign({ v: n, t: U5() }, t || {})), !0);
    },
    Pi = function (A, n) {
      c.quiet ||
        !(A > 0) ||
        ((c.dpsAcc = (c.dpsAcc || 0) + A),
        gt("maxHit", Math.round(A), { n: n ? n.n : "", L: r.lvl }) &&
          !(c.recToastT > 0) &&
          m1().maxHit.v > 1e3 &&
          (EA(b.x, b.y - 64, "Kỷ lục đòn đánh!", "#ffd24a", 12),
          (c.recToastT = 20)));
    },
    sP = function (A) {
      if (((c.clock = (c.clock || 0) + A), c.quiet)) return;
      const n = m1();
      if (
        ((n.play += A),
        (c.recToastT = (c.recToastT || 0) - A),
        (c.dpsT = (c.dpsT || 0) + A),
        c.dpsT >= 1)
      ) {
        c.dpsT -= 1;
        const t = c.dpsWin || (c.dpsWin = []);
        (t.push(c.dpsAcc || 0),
          (c.dpsAcc = 0),
          t.length > X5 && t.shift(),
          t.length === X5 &&
            t.every((e) => e > 0) &&
            gt("maxDps", Math.round(t.reduce((e, a) => e + a, 0) / X5), {
              L: r.lvl,
              n: c.P && c.P.main ? c.P.main.n : "",
            }));
      }
    },
    iP = function (A, n) {
      if (c.quiet || !r.fac) return;
      const t = m1();
      if (
        ((t.goldKill += n || 0),
        t.streak++,
        t.streak > ((t.bestStreak && t.bestStreak.v) || 0) &&
          (t.bestStreak = { v: t.streak, t: U5() }),
        n && gt("maxGoldKill", n, { n: A.n }),
        A.cls === "boss" && A.born != null && !A.wb)
      ) {
        const e = (c.clock || 0) - A.born;
        e > 0.5 &&
          gt("fastBoss", Math.round(e * 10) / 10, { n: A.n, L: A.L }, !1);
      }
    },
    rP = function () {
      if (!r.fac || c.quiet) return;
      const A = m1();
      (A.deaths++, (A.streak = 0));
    },
    vi = function (A) {
      if (!A || c.quiet || !r.fac) return;
      const n = m1(),
        t = n.bestItem,
        e = A.r * 1e3 + A.lvl * 10 + (A.mag || []).length;
      (!t || e > t.v) && (n.bestItem = { v: e, n: A.n, r: A.r, t: U5() });
    },
    oP = function (A) {
      A && A.enh && gt("maxEnh", A.enh, { n: A.n });
    },
    lP = function () {
      const A = m1(),
        n = Q().stat,
        t = (i, o) => (i ? o(i) : '<span class="dim">chưa có</span>'),
        e = (i) => (i && i.t ? `<small class="dim">${cP(i.t)}</small>` : ""),
        a = typeof b2 < "u" ? b2 : [];
      return [
        [
          "Chiến đấu",
          [
            [
              "Đòn đánh mạnh nhất",
              t(
                A.maxHit,
                (i) => `<b>${X(i.v)}</b> ${i.n ? "· " + D(i.n) : ""}`,
              ),
              e(A.maxHit),
            ],
            [
              "DPS cao nhất (5 giây)",
              t(A.maxDps, (i) => `<b>${X(i.v)}</b>/giây`),
              e(A.maxDps),
            ],
            [
              "Hạ trùm nhanh nhất",
              t(A.fastBoss, (i) => `<b>${i.v} giây</b> · ${D(i.n)} Lv${i.L}`),
              e(A.fastBoss),
            ],
            [
              "Chuỗi hạ quái không gục",
              t(
                A.bestStreak,
                (i) => `<b>${X(i.v)}</b> quái (hiện ${X(A.streak)})`,
              ),
              e(A.bestStreak),
            ],
            [
              "Ngân lượng 1 quái",
              t(A.maxGoldKill, (i) => `<b>${X(i.v)}</b> · ${D(i.n)}`),
              e(A.maxGoldKill),
            ],
            ["Số lần trọng thương", `<b>${X(A.deaths)}</b>`, ""],
          ],
        ],
        [
          "Tiến trình",
          [
            [
              "Bản đồ cao nhất",
              `<b>${D(V0(Math.min(r.maxStage, l0)).n)}</b>`,
              "",
            ],
            [
              "Tổng quái đã hạ",
              `<b>${X(r.totalKills || 0)}</b> · trùm ${X(n.bosses)} · Hoàng Kim ${X(n.goldBoss)}`,
              "",
            ],
            ["Tháp thử thách", `<b>tầng ${n.towerBest}</b>`, ""],
            ["Chuyển sinh", `<b>${n.reborn}</b> lần`, ""],
            ["Thời gian chơi", `<b>${dP(A.play)}</b>`, ""],
            ["Ngân lượng từ quái", `<b>${j(A.goldKill)}</b>`, ""],
          ],
        ],
        [
          "Trang bị",
          [
            [
              "Món quý nhất từng có",
              t(A.bestItem, (i) => `<b style="color:${b0[i.r]}">${D(i.n)}</b>`),
              e(A.bestItem),
            ],
            [
              "Cường hóa cao nhất",
              t(A.maxEnh, (i) => `<b>+${i.v}</b> · ${D(i.n)}`),
              e(A.maxEnh),
            ],
            [
              "Ngựa thuần dưỡng cao nhất",
              t(A.horseLv, (i) => `<b>cấp ${i.v}</b> · ${D(i.n)}`),
              e(A.horseLv),
            ],
            [
              "Sổ ngựa",
              `<b>${typeof p7 == "function" ? p7() : 0}</b> loài đã cưỡi`,
              "",
            ],
          ],
        ],
        [
          "Phó bản & Boss tuần",
          a
            .map((i) => [
              i.n,
              A.dgClear[i.id]
                ? `<b>${A.dgClear[i.id]}</b> lần · nhanh nhất ${A.dgBest[i.id]} giây · hạng ${A.dgRank[i.id] || "—"}`
                : '<span class="dim">chưa qua</span>',
              "",
            ])
            .concat([
              [
                "Boss tuần: sát thương cao nhất",
                t(
                  A.wbBest,
                  (i) =>
                    `<b>${X(i.v)}</b> · ${D(i.n || "")} · hạng ${i.rank || "—"}`,
                ),
                e(A.wbBest),
              ],
              ["Boss tuần: số lượt đã đánh", `<b>${A.wbTries}</b>`, ""],
            ]),
        ],
      ];
    },
    e7 = function () {
      return `<p class="desc">Kỷ lục riêng của nhân vật này (lưu trong file lưu). Đòn đánh và DPS chỉ tính khi đang chơi, không tính tiến trình vắng mặt.</p>
    ${lP()
      .map(
        ([A, n]) =>
          `<h4 class="rech">${A}</h4><div class="card rect">${n.map(([t, e, a]) => `<span>${t}</span><span>${e} ${a}</span>`).join("")}</div>`,
      )
      .join("")}`;
    },
    X5 = 5,
    U5 = () => Date.now(),
    cP = (s) => {
      if (!s) return "";
      const A = new Date(s),
        n = (t) => String(t).padStart(2, "0");
      return `${n(A.getDate())}/${n(A.getMonth() + 1)}/${A.getFullYear()}`;
    },
    dP = (s) => {
      s = Math.round(s);
      const A = Math.floor(s / 3600),
        n = Math.floor((s % 3600) / 60);
      return A ? `${A} giờ ${n} phút` : `${n} phút ${s % 60} giây`;
    },
    bi = function (A, n) {
      if (!O0(A)) return n;
      const t = R0(A);
      return n >= 0 ? n * (1 + xi * t) : n * Math.max(0, 1 - Bi * t);
    },
    Ln = function (A) {
      return O0(A)
        ? A.k <= 4
          ? A.lvl <= 4
            ? 0
            : A.lvl <= 8
              ? 1
              : 2
          : (yP[A.k] ?? -1)
        : -1;
    },
    a7 = function () {
      if (Ar) return Ar;
      const A = S.items[10],
        n = new Map();
      for (const t of A ? A.list : []) {
        const e = Ln(Object.assign({}, t, { d: 10 })),
          a = cn(t);
        e >= 0 && !n.has(a) && n.set(a, [t.n.replace(/\s+\d+$/, ""), e]);
      }
      return (Ar = n);
    },
    Ae = function () {
      const A = new Map();
      for (const n of Y0().concat(O0(r.eq.horse) ? [r.eq.horse] : [])) {
        const t = Ln(n);
        t >= 0 && A.set(cn(n), t);
      }
      return A;
    },
    s7 = function () {
      const A = Ae();
      let n = 0;
      for (const t of A.values()) n += _i[t][2];
      return { n: A.size, hp: A.size, xp: n };
    },
    J5 = function (A) {
      if (!O0(A) || A.thanma || nr[A.k] == null) return;
      const n = nr[A.k],
        t = S.items[10] ? S.items[10].list.filter((a) => a.k === n) : [],
        e =
          t.find((a) => a.lvl === A.lvl) || t.sort((a, i) => i.lvl - a.lvl)[0];
      e &&
        ((A.k = n),
        (A.n = e.n),
        (A.lvl = e.lvl),
        (A.base = e.base.map((a) => a.slice())),
        (A.req = e.req.map((a) => a.slice())),
        e.ic && (A.ic = e.ic),
        e.p != null && (A.p = e.p),
        (Y = !0));
    },
    i7 = function (A) {
      if ((J5(A), !O0(A) || !A.req)) return;
      const n = A.req.find((e) => e[0] === 36);
      if (!n) return;
      let t = null;
      if (A.thanma) {
        const e = typeof Ti == "function" && Ti(A.thanma);
        e && (t = e[4]);
      } else {
        const e =
            S.items[10] &&
            S.items[10].list.find((i) => i.k === A.k && i.lvl === A.lvl),
          a = e && e.req.find((i) => i[0] === 36);
        a && (t = a[1]);
      }
      t != null && n[1] !== t && (n[1] = t);
    },
    fP = function (A) {
      for (const t of Y0().concat(
        r.inv.filter(O0),
        O0(r.eq.horse) ? [r.eq.horse] : [],
      ))
        i7(t);
      const n = s7();
      (n.hp && Fn(A, "lifemax_p", [n.hp, 0, 0]),
        n.xp && Fn(A, "expenhance_p", [n.xp, 0, 0]));
    },
    sx = function (A) {
      const n = Z5()[A];
      if (typeof n == "string") return n;
      if (isNaN(+A)) return A;
      const t = S.items[10],
        e = t && t.list.find((a) => a.k === +A);
      return e ? e.n.replace(/\s+\d+$/, "") : "Ngựa";
    },
    r7 = function (A, n) {
      const t = r.eq.horse;
      if (!O0(t)) return !1;
      const e = Z5(),
        a = t.n.replace(/\s+\d+$/, "");
      if ((e[a] || (e[t.k] === a && delete e[t.k], (e[a] = a)), R0(t) >= N1))
        return !1;
      t.hxp = (t.hxp || 0) + A;
      let i = !1;
      for (; R0(t) < N1 && t.hxp >= W5(R0(t));)
        ((t.hxp -= W5(R0(t))), (t.hlv = R0(t) + 1), (i = !0));
      return (
        R0(t) >= N1 && (t.hxp = 0),
        i &&
          ((c.dirty = !0),
          (Y = !0),
          c.quiet ||
            (M(`<b class="up">${D(t.n)}</b> thuần dưỡng lên cấp ${t.hlv}`),
            n || EA(b.x, b.y - 70, `Ngựa cấp ${t.hlv}`, "#ffd24a", 12)),
          typeof gt == "function" && gt("horseLv", t.hlv, { n: t.n })),
        i
      );
    },
    o7 = function (A = 1) {
      const n = r.eq.horse;
      if (!O0(n)) return { ok: !1, msg: "Chưa cưỡi ngựa" };
      let t = 0,
        e = 0;
      for (; t < A && R0(n) < N1; t++) {
        const a = Mi(n);
        if ((r.knb | 0) < a) break;
        ((r.knb = (r.knb | 0) - a), (e += a), r7(u7, !0));
      }
      return t
        ? (B(), { ok: !0, msg: `Cho ăn ${t} lần (−${e} KNB) · cấp ${R0(n)}` })
        : {
            ok: !1,
            msg:
              R0(n) >= N1
                ? "Ngựa đã thuần dưỡng tối đa"
                : "Không đủ Kim Nguyên Bảo",
          };
    },
    hP = function (A) {
      const n = r.eq.horse;
      if (
        !O0(n) ||
        !O0(A) ||
        n === A ||
        !(r.inv.includes(A) || Y0().includes(A))
      )
        return { ok: !1, msg: "Chọn một ngựa trong hành trang" };
      const t = Math.floor(R0(n) * w7);
      return t <= R0(A)
        ? { ok: !1, msg: "Ngựa nhận đã có cấp cao hơn hoặc bằng" }
        : F7(D7())
          ? ((A.hlv = t),
            (A.hxp = 0),
            (n.hlv = 0),
            (n.hxp = 0),
            (c.dirty = !0),
            (Y = !0),
            B(),
            { ok: !0, msg: `Chuyển thuần dưỡng: ${A.n} cấp ${t}` })
          : { ok: !1, msg: "Không đủ ngân lượng" };
    },
    gP = function s(A) {
      const n = S.items[10];
      if (!n) return null;
      const t = (d) => (d.req.find((h) => h[0] === 36) || [0, 0])[1],
        a = (A ? vP : [0, 1, 2, 3, 4])
          .map((d) =>
            n.list.filter((h) => h.k === d && i1(h.req) && t(h) <= TA()),
          )
          .filter((d) => d.length);
      if (!a.length) return A ? s(!1) : null;
      const i = _0(a),
        o = i.reduce((d, h) => (h.lvl > d.lvl ? h : d)),
        l = pA(10, o.k, o.lvl, 0);
      return l ? (A && ((l.r = 2), (l.rareH = 1)), l) : null;
    },
    za = function (A, n) {
      (V("misc", "rngua", A),
        (Y = !0),
        n &&
          !c.quiet &&
          M(
            `🎁 ${n}: nhận <b style="color:#ffd24a">${A} Rương Ngựa</b> (Kỳ Trân Các › Thú cưỡi › Dùng)`,
          ));
    },
    mP = function () {
      const A = S.items[10];
      if (!A) return "Rương trống";
      let n = Math.random(),
        t = Qa.length - 1;
      for (let g = 0; g < Qa.length; g++) {
        if (n < Qa[g][1]) {
          t = g;
          break;
        }
        n -= Qa[g][1];
      }
      const [e, , a, i] = Qa[t],
        o = A.list.filter(
          (g) =>
            nr[g.k] == null &&
            Ln(Object.assign({}, g, { d: 10 })) === i &&
            i1(g.req),
        );
      if (!o.length) return "Rương trống";
      const l = {};
      for (const g of o)
        (l[g.n.replace(/\s+\d+$/, "").toLowerCase()] ||= []).push(g);
      const d = _0(_0(Object.values(l))),
        h = pA(10, d.k, d.lvl, 0);
      return h
        ? ((h.r = a),
          t >= 2 && ((h.rareH = 1), (h.lock = 1)),
          (h.hbt = t),
          i7(h),
          tn(h, !0, !0, !0),
          t >= 2 &&
            M(
              `🐎 <b style="color:#ffd24a">Rương Ngựa: ngựa ${e}!</b> Nhận <b style="color:${b0[h.r]}">${D(h.n)}</b> (tự khóa 🔒)`,
            ),
          `Rương Ngựa (${e}): ${h.n}`)
        : "Rương trống";
    },
    qn = function (A = 1) {
      const n = [];
      let t = 0;
      for (; t < A && !($i() < 1); t++) {
        if (r.inv.length >= INV_MAX) {
          n.push("Hành trang đầy");
          break;
        }
        (V("misc", "rngua", -1), n.push(mP()));
      }
      if (!t) {
        y($i() < 1 ? "Không có Rương Ngựa" : "Hành trang đầy");
        return;
      }
      (M(
        `🎁 Mở ${t} Rương Ngựa: ${D(
          n
            .filter((e) => e !== "Hành trang đầy")
            .map((e) => e.replace(/^Rương Ngựa /, ""))
            .join(" · "),
        )}`,
      ),
        y(t > 1 ? `Mở ${t} Rương Ngựa` : n[0]),
        i0("learn"),
        (c.dirty = !0),
        (Y = !0),
        B(),
        F());
    },
    uP = function (A) {
      (r7((A.cls === "boss" ? 10 : A.cls === "elite" ? 3 : 1) * bP),
        !(A.cls !== "boss" && !A.goldBoss) &&
          Math.random() < (A.goldBoss ? Hi.gb : Hi.boss) &&
          za(1, A.goldBoss ? "Trùm Hoàng Kim" : "Hạ trùm"));
    },
    wP = function (A, n) {
      if (!r.eq.horse || !c.mounted || r.lowFx) {
        c.dust = null;
        return;
      }
      const t = c.dust || (c.dust = []);
      b.moving &&
        c.deadT <= 0 &&
        ((c.dustT = (c.dustT || 0) - n),
        c.dustT <= 0 &&
          ((c.dustT = 0.07),
          t.push({ x: b.x + A0(-8, 8), y: b.y + A0(-2, 3), life: 0.55 })));
      const e = Us() && c.look,
        a = (e && e.dust) || "#b89c6c",
        i = (e && e.hlv) || 0,
        o = c.clock || performance.now() / 1e3;
      if (i >= 2 && c.deadT <= 0) {
        const l = 0.5 + 0.5 * Math.sin(o * 3),
          d = A.createRadialGradient(b.x, b.y, 2, b.x, b.y, 34);
        (d.addColorStop(0, a),
          d.addColorStop(1, "rgba(0,0,0,0)"),
          (A.globalAlpha = 0.22 + 0.16 * l),
          (A.fillStyle = d),
          A.beginPath(),
          A.ellipse(b.x, b.y + 1, 34, 13, 0, 0, 7),
          A.fill(),
          i >= 3 &&
            ((c.hsT = (c.hsT || 0) - n),
            c.hsT <= 0 &&
              ((c.hsT = 0.12),
              t.push({
                x: b.x + A0(-22, 22),
                y: b.y + A0(-4, 4),
                life: 0.9,
                up: !0,
              }))));
      }
      for (const l of t) {
        if (((l.life -= n), l.up)) {
          const h = C(l.life / 0.9, 0, 1);
          ((A.globalAlpha = h * 0.85),
            (A.fillStyle = a),
            A.beginPath(),
            A.arc(l.x, l.y - (1 - h) * 46, 1.6 + h * 1.4, 0, 7),
            A.fill());
          continue;
        }
        const d = C(l.life / 0.55, 0, 1);
        ((A.globalAlpha = d * (i ? 0.6 : 0.45)),
          (A.fillStyle = a),
          A.beginPath(),
          A.ellipse(l.x, l.y, 4 + (1 - d) * 9, 2 + (1 - d) * 3, 0, 0, 7),
          A.fill());
      }
      ((A.globalAlpha = 1), (c.dust = t.filter((l) => l.life > 0)));
    },
    l7 = function (A) {
      return !O0(A) || !r.inv.includes(A)
        ? { ok: !1, msg: "Chọn ngựa trong hành trang" }
        : Y0().length >= mt
          ? { ok: !1, msg: `Mã Trường đầy (${mt})` }
          : ((r.inv = r.inv.filter((n) => n !== A)),
            Y0().push(A),
            (Y = !0),
            (c.dirty = !0),
            B(),
            { ok: !0, msg: "Đã đưa " + A.n + " vào Mã Trường" });
    },
    c7 = function (A, n) {
      return !O0(A) || Ln(A) < 0 || Y0().length >= mt || Ae().has(cn(A))
        ? !1
        : (Y0().push(A),
          (c.dirty = !0),
          !n &&
            !c.quiet &&
            M(
              `🐎 <b style="color:${b0[A.r] || "#ffd24a"}">${D(A.n)}</b>: loài mới → tự cất vào Mã Trường (bộ sưu tập ${Ae().size}/${a7().size})`,
            ),
          !0);
    },
    d7 = function () {
      let A = 0;
      for (const n of r.inv.filter(O0))
        Y0().length < mt &&
          Ln(n) >= 0 &&
          !Ae().has(cn(n)) &&
          ((r.inv = r.inv.filter((t) => t !== n)), Y0().push(n), A++);
      return (A && ((Y = !0), (c.dirty = !0)), A);
    },
    pP = function (A) {
      const n = Y0();
      return n.includes(A)
        ? r.inv.length >= INV_MAX
          ? { ok: !1, msg: "Hành trang đầy" }
          : ((r.stable = n.filter((t) => t !== A)),
            r.inv.unshift(A),
            (Y = !0),
            (c.dirty = !0),
            B(),
            { ok: !0, msg: "Lấy " + A.n + " ra hành trang" })
        : { ok: !1, msg: "Không có trong Mã Trường" };
    },
    f7 = function (A) {
      if (!O0(A)) return { ok: !1, msg: "Không phải ngựa" };
      if (!f0(A))
        return { ok: !1, msg: "Chưa đủ điều kiện: " + Un(A).join("; ") };
      const n = r.eq.horse;
      return (
        (r.stable = Y0().filter((t) => t !== A)),
        (r.inv = r.inv.filter((t) => t !== A)),
        (r.eq.horse = A),
        n && n !== A && (Y0().length < mt ? Y0().push(n) : r.inv.unshift(n)),
        (c.dirty = !0),
        (Y = !0),
        (c.rideCd = 0),
        typeof s2 == "function" && s2(!0, !0),
        B(),
        { ok: !0, msg: "Cưỡi " + A.n }
      );
    },
    yi = function s() {
      const A = r.eq.horse,
        n = Y0()
          .map((e) => [e, "st"])
          .concat(r.inv.filter(O0).map((e) => [e, "inv"])),
        t = ([
          e,
          a,
        ]) => `<div class="qrow"><span><b style="color:${b0[e.r]}">${D(e.n)}</b><small>${a === "st" ? "Mã Trường" : "Hành trang"} · cấp yêu cầu ${(e.req.find((i) => i[0] === 36) || [0, 0])[1]} · thuần dưỡng ${R0(e)} · ${D(ki(e))}</small></span>
    <span class="btnrow"><button class="btn sm" data-hr="${e.uid}" ${f0(e) ? "" : "disabled"}>Cưỡi</button></span></div>`;
      J(
        `<h3>Chọn ngựa <small>${Y0().length}/${mt} trong Mã Trường</small></h3>
    ${
      A
        ? `<div class="card"><b style="color:${b0[A.r]}">${D(A.n)}</b> <small class="dim">đang dùng · thuần dưỡng ${R0(A)}</small><p class="small">${D(ki(A))}</p>
      <div class="btnrow"><button class="btn" id="hpInfo">Chi tiết</button><button class="btn" id="hpBack" ${Y0().length < mt ? "" : "disabled"}>Cất vào Mã Trường</button></div></div>`
        : ""
    }
    ${n.length ? n.map(t).join("") : '<p class="dim small">Chưa có ngựa nào khác. Ngựa nhặt được nằm trong hành trang, bấm vào ngựa → "Cất vào Mã Trường".</p>'}
    <div class="btnrow"><button class="btn" id="hpStable">Mở Mã Trường</button></div>`,
        () => {
          document.querySelectorAll("#mBody [data-hr]").forEach(
            (o) =>
              (o.onclick = () => {
                const l = n
                    .map((h) => h[0])
                    .find((h) => h.uid === +o.dataset.hr),
                  d = f7(l);
                (y(d.msg), d.ok && (i0("equipCloth"), F()), s());
              }),
          );
          const e = u("#hpInfo");
          e && (e.onclick = () => Ut(A, "horse"));
          const a = u("#hpBack");
          a &&
            (a.onclick = () => {
              (delete r.eq.horse,
                Y0().push(A),
                (c.mounted = !1),
                (c.dirty = !0),
                (Y = !0),
                B(),
                F(),
                s());
            });
          const i = u("#hpStable");
          i &&
            (i.onclick = () => {
              typeof w1 == "function" && w1("horse");
            });
        },
      );
    },
    ki = function (A) {
      const n = [];
      for (const [t, e, a] of A.base) {
        const i = W0(t);
        if (i === "staminamax_v") continue;
        const o = Math.round(bi(A, ((e + a) / 2) * He(A)));
        n.push(RA(i, [o, 0, o]));
      }
      return n.join(" · ");
    },
    DP = function (A) {
      if (!O0(A) || A === r.eq.horse)
        return { ok: !1, msg: "Không bán ngựa đang cưỡi" };
      if (A.lock) return { ok: !1, msg: "Ngựa đã khóa: mở khóa trước khi bán" };
      const n = Y0().includes(A);
      if (!n && !r.inv.includes(A))
        return { ok: !1, msg: "Không tìm thấy ngựa" };
      n
        ? (r.stable = Y0().filter((e) => e !== A))
        : (r.inv = r.inv.filter((e) => e !== A));
      const t = y0(A);
      return (
        (r.gold += t),
        (Y = !0),
        (c.dirty = !0),
        B(),
        { ok: !0, msg: `Bán ${A.n}: +${j(t)} lượng` }
      );
    },
    ne = function (A) {
      const n = Y0().concat(r.inv.filter(O0)),
        t = new Map(),
        e = O0(r.eq.horse) ? r.eq.horse : null,
        a = (i) => (i === e ? 1e9 : 0) + R0(i) * 1e3 + (i.lvl || 0);
      for (const i of n.concat(e ? [e] : [])) {
        const o = cn(i),
          l = t.get(o);
        (!l || a(i) > a(l)) && t.set(o, i);
      }
      return n.filter((i) => t.get(cn(i)) !== i && i !== e && (A || !i.lock));
    },
    PP = function () {
      const A = O0(r.eq.horse) ? r.eq.horse : null,
        n = Y0()
          .concat(r.inv.filter(O0))
          .concat(A ? [A] : []),
        t = new Map();
      for (const i of n) {
        const o = cn(i);
        (t.get(o) || t.set(o, []).get(o)).push(i);
      }
      const e = new Set(),
        a = new Set(ne(!0));
      for (const i of t.values()) if (i.length > 1) for (const o of i) e.add(o);
      return { inDup: e, sell: a };
    },
    h7 = function (A) {
      const n = ne(A);
      if (!n.length) return { ok: !1, msg: "Không có ngựa trùng loài" };
      let t = 0;
      for (const e of n)
        ((t += y0(e)),
          (r.stable = Y0().filter((a) => a !== e)),
          (r.inv = r.inv.filter((a) => a !== e)));
      return (
        (r.gold += t),
        (Y = !0),
        (c.dirty = !0),
        B(),
        { ok: !0, msg: `Bán ${n.length} ngựa trùng loài: +${j(t)} lượng` }
      );
    },
    g7 = function () {
      const A = r.eq.horse,
        n = r.inv.filter(O0),
        t = Y0(),
        e = O0(A)
          ? (() => {
              const v = R0(A),
                H = W5(v),
                _ = v >= N1 ? 100 : Math.round(((A.hxp || 0) / H) * 100);
              return `<div class="card"><div class="idet"><div class="pic r${A.r}">${A.ic ? `<img src="${D(A.ic)}" alt="">` : ""}</div><div><h4 style="color:${b0[A.r]}">${D(A.n)}</h4>
      <small class="dim">Thuần dưỡng cấp <b>${v}/${N1}</b> · chỉ số +${Math.round(v * xi * 100)}% · phạt né tránh −${Math.min(100, Math.round(v * Bi * 100))}%</small></div></div>
      <div class="bar xpb"><i style="width:${_}%"></i><span>${v >= N1 ? "Tối đa" : `${Math.floor(A.hxp || 0)} / ${H}`}</span></div>
      <p class="small">${D(ki(A))}</p>
      <div class="btnrow"><button class="btn" id="hFeed" ${v < N1 && (r.knb | 0) >= Mi(A) ? "" : "disabled"}>Cho ăn (${Mi(A)} KNB, +${u7})</button><button class="btn" id="hFeed10" ${v < N1 && (r.knb | 0) >= Mi(A) ? "" : "disabled"}>Cho ăn ×10</button></div></div>`;
            })()
          : '<div class="card"><p class="desc">Chưa cưỡi ngựa. Ngựa chỉ có từ <b>Rương Ngựa</b> (Kỳ Trân Các › Thú cưỡi 20 KNB, hoặc rơi từ trùm / phó bản): Thường 56% · Tốt 31,5% · Quý 6% · Thần 3% · Danh mã 2% · Bảo mã 1% · Chí tôn 0,5%.</p></div>',
        a = (
          v,
          H,
        ) => `<div class="qrow"><span><b style="color:${b0[v.r]}">${D(v.n)}</b>${i.inDup.has(v) ? (i.sell.has(v) ? (v.lock ? ' <small class="bad">· trùng (đang khóa)</small>' : ' <small class="bad">· trùng</small>') : ' <small class="cp">· trùng, giữ lại (tốt nhất)</small>') : ""}<small>cấp yêu cầu ${(v.req.find((_) => _[0] === 36) || [0, 0])[1]} · thuần dưỡng ${R0(v)} · ${D(ki(v))}</small></span><small></small>
    <span class="btnrow"><button class="btn sm" data-ride="${v.uid}" ${f0(v) ? "" : "disabled"}>Cưỡi</button>${O0(A) && Math.floor(R0(A) * w7) > R0(v) ? `<button class="btn sm" data-mv="${v.uid}">Chuyển cấp (${j(D7())})</button>` : ""}${H === "st" ? `<button class="btn sm" data-sout="${v.uid}">Lấy ra</button>` : `<button class="btn sm" data-sin="${v.uid}">Cất vào Mã Trường</button>`}<button class="btn sm" data-hsell="${v.uid}" title="Bán lấy ${j(y0(v))} lượng">Bán</button></span></div>`,
        i = PP(),
        o = i.sell,
        l = (v, H) =>
          L1.w !== "all" && L1.w !== H ? [] : v.filter((_) => kP(_, i)),
        d = l(n, "inv")
          .map((v) => a(v, "inv"))
          .join(""),
        h = l(t, "st")
          .map((v) => a(v, "st"))
          .join(""),
        g = (v, H, _) =>
          `<button class="chip2${L1[v] === H ? " on" : ""}" data-hf="${v}" data-hv="${H}">${_}</button>`,
        f = `<div class="chips" style="margin:6px 0">${g("t", -1, "Mọi bậc")}${_i.map(([v, H], _) => g("t", _, `<span style="color:${H}">${v}</span>`)).join("")}</div>
    <div class="chips" style="margin:0 0 6px">${g("w", "all", "Tất cả")}${g("w", "st", "Trong Mã Trường")}${g("w", "inv", "Hành trang")}${g("dup", !L1.dup, L1.dup ? "✓ Chỉ ngựa trùng" : "Chỉ ngựa trùng")}
    <button class="btn sm" id="hSellDup" ${ne().length ? "" : "disabled"}>Bán ngựa trùng (${ne().length})</button>${o.size > ne().length ? `<button class="btn sm red" id="hSellDupL">Bán cả ngựa trùng đang khóa (${o.size})</button>` : ""}</div>`,
        m = Ae(),
        w = a7(),
        p = s7(),
        P = _i
          .map(([v, H, _], E) => {
            const $ = [...w].filter(([, z]) => z[1] === E),
              O = $.filter(([z]) => m.has(z)).length;
            return `<div class="hct"><b style="color:${H}">${v}</b> <small class="dim">${O}/${$.length} · mỗi loài +1% sinh lực, +${_}% EXP</small><div class="chips">${$.map(([z, R]) => `<span class="chip2${m.has(z) ? " hc-on" : ""}" title="${m.has(z) ? "Đã có" : "Chưa có"}">${m.has(z) ? "✓ " : ""}${D(R[0])}</span>`).join("")}</div></div>`;
          })
          .join("");
      return `<p class="desc">Ngựa đang cưỡi lên cấp khi hạ quái (thường 1, tinh anh 3, trùm 10) hoặc cho ăn. Mỗi cấp +${xi * 100}% chỉ số ngựa, giảm ${Bi * 100}% phạt né tránh. Tốc độ chạy của ngựa chỉ tính khi đang cưỡi (phím M / Auto tự lên ngựa khi di chuyển).</p>
    ${e}
    <h4 class="rech">Lọc ngựa</h4>${f}
    ${L1.w !== "inv" ? `<h4 class="rech">Ngựa trong Mã Trường <small class="dim">${t.length}/${mt}</small></h4>${h || `<p class="dim small">${t.length ? "Không có ngựa hợp bộ lọc." : 'Trống. Ngựa nhặt được nằm trong hành trang: bấm "Cất vào Mã Trường".'}</p>`}` : ""}
    ${L1.w !== "st" ? `<h4 class="rech">Ngựa trong hành trang</h4>${d || `<p class="dim small">${n.length ? "Không có ngựa hợp bộ lọc." : "Không có ngựa nào khác. Chuyển thuần dưỡng sang ngựa mới giữ 80% cấp."}</p>`}` : ""}
    <h4 class="rech">Bộ sưu tập Mã Trường <small class="dim">${p.n}/${w.size} loài · <b class="gold">+${p.hp}% sinh lực · +${p.xp}% EXP</b></small></h4>
    <p class="dim small">Mỗi loài ngựa nằm trong Mã Trường (hoặc đang cưỡi) được cộng 1 lần. Ngựa trùng loài không cộng thêm.</p>${P}`;
    },
    m7 = function (A) {
      const n = (a, i) => {
          const o = u(a);
          o && (o.onclick = i);
        },
        t = (a) => {
          (y(a.msg), a.ok && i0("learn"), A());
        };
      (n("#hFeed", () => t(o7(1))), n("#hFeed10", () => t(o7(10))));
      const e = (a) => r.inv.concat(Y0()).find((i) => i.uid === +a);
      (document.querySelectorAll("#mBody [data-ride]").forEach(
        (a) =>
          (a.onclick = () => {
            const i = e(a.dataset.ride);
            if (i) {
              const o = f7(i);
              (y(o.msg), F());
            }
            A();
          }),
      ),
        document
          .querySelectorAll("#mBody [data-mv]")
          .forEach((a) => (a.onclick = () => t(hP(e(a.dataset.mv))))),
        document
          .querySelectorAll("#mBody [data-sin]")
          .forEach((a) => (a.onclick = () => t(l7(e(a.dataset.sin))))),
        document
          .querySelectorAll("#mBody [data-sout]")
          .forEach((a) => (a.onclick = () => t(pP(e(a.dataset.sout))))),
        document.querySelectorAll("#mBody [data-hf]").forEach(
          (a) =>
            (a.onclick = () => {
              const i = a.dataset.hf,
                o = a.dataset.hv;
              ((L1[i] = i === "t" ? +o : i === "dup" ? o === "true" : o), A());
            }),
        ),
        document.querySelectorAll("#mBody [data-hsell]").forEach(
          (a) =>
            (a.onclick = async () => {
              const i = e(a.dataset.hsell);
              i &&
                ((Ln(i) >= 3 &&
                  !(await ct(
                    `Bán ${i.n} (${_i[Ln(i)][0]}) lấy ${j(y0(i))} lượng?`,
                  ))) ||
                  t(DP(i)));
            }),
        ),
        n("#hSellDup", async () => {
          const a = ne();
          a.length &&
            (await ct(
              `Bán ${a.length} ngựa trùng loài (giữ con tốt nhất mỗi loài) lấy ${j(a.reduce((i, o) => i + y0(o), 0))} lượng?`,
            )) &&
            t(h7());
        }),
        n("#hSellDupL", async () => {
          const a = ne(!0);
          a.length &&
            (await ct(
              `Bán ${a.length} ngựa trùng loài (kể cả ngựa đang khóa) (giữ con tốt nhất mỗi loài) lấy ${j(a.reduce((i, o) => i + y0(o), 0))} lượng?`,
            )) &&
            t(h7(!0));
        }));
    },
    N1 = 20,
    xi = 0.04,
    Bi = 0.05,
    u7 = 100,
    w7 = 0.8,
    ix = 10,
    rx = { boss: 0.003, gb: 0.02, dg: 0.4, wbS: 0.15 },
    vP = [5, 6, 7, 8, 9, 11, 13, 19, 20, 21],
    O0 = (s) => !!s && s.d === 10,
    R0 = (s) => (s && s.hlv) | 0,
    W5 = (s) => 40 + s * 35,
    bP = 1 / 3,
    Z5 = () => r.hbook || (r.hbook = {}),
    p7 = () => Object.keys(Z5()).length,
    _i = [
      ["Thường", "#b08a5a", 1],
      ["Tốt", "#5fd46a", 1],
      ["Quý", "#5fb8ff", 2],
      ["Thần", "#c77dff", 3],
      ["Danh mã", "#ff9a3c", 4],
      ["Bảo mã", "#ff5a5a", 5],
      ["Chí tôn", "#ffd24a", 6],
    ],
    yP = {
      5: 3,
      14: 3,
      15: 3,
      17: 3,
      22: 3,
      23: 3,
      24: 3,
      25: 3,
      6: 4,
      8: 4,
      9: 5,
      11: 5,
      13: 5,
      31: 5,
      32: 5,
      7: 6,
      16: 6,
      18: 6,
      19: 6,
      20: 6,
      21: 6,
      30: 6,
    },
    cn = (s) => (s.n || "").replace(/\s+\d+$/, "").toLowerCase(),
    Ar = null,
    nr = { 30: 7, 31: 9, 32: 13 },
    Mi = (s) => 3 + Math.floor(R0(s) / 2),
    D7 = () => Math.round(2e3 * (1 + r.lvl / 10)),
    Qa = [
      ["Thường", 0.56, 0, 0],
      ["Tốt", 0.315, 1, 1],
      ["Quý", 0.06, 2, 2],
      ["Thần", 0.03, 3, 3],
      ["Danh mã", 0.02, 3, 4],
      ["Bảo mã", 0.01, 4, 5],
      ["Chí tôn", 0.005, 4, 6],
    ],
    Hi = { boss: 0.02, gb: 0.25, dg: 0.5 },
    $i = () => N("misc", "rngua"),
    P7 = () => C(c.P ? c.P.speed : 1, 1, 1.8),
    mt = 60,
    Y0 = () => r.stable || (r.stable = []),
    L1 = { t: -1, w: "all", dup: !1 },
    kP = (s, A) =>
      (L1.t < 0 || Ln(s) === L1.t) &&
      (!L1.dup || (A.inDup ? A.inDup.has(s) : A.has(s))),
    v7 = function (A) {
      const n = Ti(A),
        t = S.items[10];
      if (!n || !t) return null;
      const e = t.list.filter((l) => l.k === n[1] && (!n[2] || l.n === n[2]));
      if (!e.length) return null;
      const a = e.reduce((l, d) => (d.lvl > l.lvl ? d : l)),
        i = [];
      for (const [l, d, h] of a.base) {
        if (TP.has(l)) continue;
        const g = $P[l] || l,
          f = W0(g) === "adddefense_v" ? Math.abs(d) : d,
          m = W0(g) === "adddefense_v" ? Math.abs(h) : h,
          w = i.find((p) => p[0] === g);
        w ? ((w[1] += f), (w[2] += m)) : i.push([g, f, m]);
      }
      return {
        uid: r.uid++,
        d: 10,
        k: n[1],
        p: a.p,
        n: n[3],
        ic: a.ic || "",
        lvl: 10,
        s: -1,
        price: a.price,
        base: i,
        req: [[36, n[4]]],
        r: 4,
        thanma: n[0],
        lock: !0,
        mag: n[6]
          .filter(([l]) => Me[l] !== void 0)
          .map(([l, d]) => ({ a: Me[l], p: [d, 0, 0], n: "", pre: 1 })),
      };
    },
    xP = function () {
      const A = tr.filter(
        (e) => e[4] <= r.lvl || (Q().stat.reborn > 0 && e[5] <= 2),
      );
      if (!A.length) return null;
      const n = Math.max(...A.map((e) => e[5])),
        t = A.filter((e) => e[5] >= n - 1);
      return v7(_e(t, (e) => (e[5] === n ? 1 : 2))[0]);
    },
    ox = function () {
      return xP() || gP(!1);
    },
    BP = function (A) {
      const n = Ti(A);
      if (!n) return { ok: !1, msg: "Không có ngựa này" };
      if (r.lvl < n[4] && !Q().stat.reborn)
        return { ok: !1, msg: `Cần cấp ${n[4]}` };
      const t = k7(n),
        e = Q();
      if (e.fd < t.fd)
        return { ok: !1, msg: `Cần ${t.fd} Phúc Duyên (có ${e.fd})` };
      if (r.gold < t.gold) return { ok: !1, msg: "Không đủ ngân lượng" };
      if (r.inv.length >= INV_MAX) return { ok: !1, msg: "Hành trang đầy" };
      const a = v7(A);
      return a
        ? ((e.fd -= t.fd),
          (r.gold -= t.gold),
          r.inv.unshift(a),
          (Y = !0),
          vi(a),
          M(`🐎 Đổi được thần mã <b style="color:${b0[4]}">${D(a.n)}</b>`),
          B(),
          { ok: !0, msg: "Nhận " + a.n, it: a })
        : { ok: !1, msg: "Lỗi dữ liệu ngựa" };
    },
    _P = function (A) {
      return A[6]
        .map(([n, t]) =>
          RA(n, [t, 0, t])
            .split("<enter>")[0]
            .replace(/\.\s*$/, ""),
        )
        .join(" · ");
    },
    b7 = function () {
      const A = Q(),
        n = new Set(
          r.inv
            .concat(Object.values(r.eq))
            .filter(CP)
            .map((e) => e.thanma),
        );
      let t = 0;
      return `<p class="desc">không phạt né tránh, có 2–4 dòng thần lực luôn hiệu lực, tự khóa 🔒. Rơi ở phó bản, rương Boss tuần hạng S, Trùm Hoàng Kim; hoặc đổi tại đây bằng Phúc Duyên (đang có <b>${A.fd}</b>) + ngân lượng. Thuần dưỡng như ngựa thường.</p>
    ${tr
      .map((e) => {
        const a =
            e[5] !== t
              ? `<h4 class="rech">${MP[(t = e[5])]} <small class="dim">cấp ${e[4]}+</small></h4>`
              : "",
          i = k7(e),
          o = r.lvl >= e[4] || Q().stat.reborn > 0,
          l = S.items[10].list.find(
            (d) => d.k === e[1] && (!e[2] || d.n === e[2]),
          );
        return `${a}<div class="qrow tmrow${o ? "" : " lock"}">${l && l.ic ? `<img src="${D(l.ic)}" alt="">` : ""}<span><b style="color:${b0[4]}">${D(e[3])}</b>${n.has(e[0]) ? ' <small class="cp">✔ đã có</small>' : ""}<small>${D(e[7])}<br>${D(_P(e))}</small></span>
        <button class="btn sm" data-tm="${e[0]}" ${o && A.fd >= i.fd && r.gold >= i.gold ? "" : "disabled"}>${o ? `${i.fd} PD<br>${j(i.gold)}` : `Cấp ${e[4]}`}</button></div>`;
      })
      .join("")}`;
    },
    y7 = function (A) {
      document.querySelectorAll("#mBody [data-tm]").forEach(
        (n) =>
          (n.onclick = () => {
            const t = BP(n.dataset.tm);
            (y(t.msg), t.ok && i0("learn"), A());
          }),
      );
    },
    tr = [
      [
        "ovan",
        5,
        "Ô Vân Đạp Tuyết",
        "Ô Vân Đạp Tuyết",
        60,
        1,
        [
          ["coldres_p", 15],
          ["lifemax_p", 5],
          ["five_elements_resist_v", 10],
        ],
        "Ngựa đen bốn vó trắng như tuyết, hệ Thủy",
      ],
      [
        "xtho",
        5,
        "Xích Thố",
        "Xích Thố",
        60,
        1,
        [
          ["fireres_p", 15],
          ["attackspeed_v", 6],
          ["deadlystrikeenhance_p", 4],
        ],
        "Ngày đi nghìn dặm, hệ Hỏa",
      ],
      [
        "tanh",
        5,
        "Tuyệt ảnh",
        "Tuyệt Ảnh",
        60,
        1,
        [
          ["physicsres_p", 10],
          ["attackratingenhance_p", 15],
          ["ignoredefense_p", 6],
        ],
        "Nhanh tới mức không thấy bóng, hệ Kim",
      ],
      [
        "dlo",
        5,
        "Đích Lô",
        "Đích Lô",
        60,
        1,
        [
          ["poisonres_p", 15],
          ["steallifeenhance_p", 3],
          ["lifereplenish_v", 25],
        ],
        "Từng cứu chủ nhảy qua suối Đàn Khê, hệ Mộc",
      ],
      [
        "cdsu",
        5,
        "Chiếu Dạ Ngọc Sư Tử",
        "Chiếu Dạ Ngọc Sư Tử",
        60,
        1,
        [
          ["lightingres_p", 15],
          ["lucky_v", 15],
          ["meleedamagereturn_p", 6],
        ],
        "Sáng rực trong đêm, hệ Thổ",
      ],
      [
        "pvan",
        8,
        null,
        "Phi Vân",
        70,
        2,
        [
          ["allres_p", 6],
          ["attackspeed_v", 6],
          ["lifemax_p", 6],
        ],
        "Lướt như mây bay",
      ],
      [
        "btieu",
        6,
        null,
        "Bôn Tiêu",
        70,
        2,
        [
          ["lifemax_p", 8],
          ["steallifeenhance_p", 4],
          ["manamax_p", 6],
        ],
        "Phi nước đại trong đêm",
      ],
      [
        "xlc",
        9,
        null,
        "Xích Long Câu",
        80,
        3,
        [
          ["deadlystrikeenhance_p", 8],
          ["attackspeed_v", 8],
          ["five_elements_enhance_v", 15],
        ],
        "Long câu đỏ rực, chuyên xung trận",
      ],
      [
        "duhuy",
        11,
        null,
        "Du Huy",
        80,
        3,
        [
          ["lifemax_p", 10],
          ["meleedamagereturn_p", 10],
          ["lifereplenish_v", 40],
        ],
        "Ánh sáng lấp lánh trên bờm",
      ],
      [
        "squang",
        13,
        null,
        "Siêu Quang",
        85,
        3,
        [
          ["attackspeed_v", 10],
          ["deadlystrikeenhance_p", 6],
          ["lifemax_p", 6],
        ],
        "Nhanh hơn cả ánh sáng",
      ],
      [
        "pvu",
        7,
        null,
        "Phiên Vũ",
        90,
        4,
        [
          ["allres_p", 8],
          ["steallifeenhance_p", 5],
          ["attackspeed_v", 8],
          ["lifemax_p", 6],
        ],
        "Bay lượn như chim",
      ],
      [
        "hhlc",
        18,
        null,
        "Hãn Huyết Long Câu",
        92,
        4,
        [
          ["lifemax_p", 12],
          ["deadlystrikeenhance_p", 8],
          ["five_elements_enhance_v", 20],
          ["steallifeenhance_p", 4],
        ],
        "Mồ hôi đỏ như máu",
      ],
      [
        "bhv",
        16,
        null,
        "Kim Tinh Bạch Hổ Vương",
        95,
        4,
        [
          ["allres_p", 10],
          ["meleedamagereturn_p", 12],
          ["lifemax_p", 10],
          ["attackspeed_v", 8],
        ],
        "Chúa sơn lâm lông trắng",
      ],
      [
        "pvtm",
        21,
        null,
        "Phong Vân Thần Mã",
        97,
        4,
        [
          ["allres_p", 12],
          ["attackspeed_v", 10],
          ["deadlystrikeenhance_p", 8],
          ["lifemax_p", 10],
        ],
        "Thần mã của Phong Vân hội",
      ],
    ],
    MP = ["", "Ngũ đại thần mã", "Danh mã", "Bảo mã", "Thần mã tối thượng"],
    HP = { 1: [120, 6e4], 2: [200, 12e4], 3: [320, 25e4], 4: [500, 5e5] },
    $P = { 233: 85, 241: 114 },
    TP = new Set([93, 243]),
    Ti = (s) => tr.find((A) => A[0] === s),
    CP = (s) => !!(s && s.d === 10 && s.thanma),
    k7 = (s) => {
      const [A, n] = HP[s[5]];
      return { fd: A, gold: Math.round(n * (1 + r.lvl / 10)) };
    },
    er = function (A = new Date()) {
      const n = new Date(A);
      return (
        n.setHours(0, 0, 0, 0),
        n.setDate(n.getDate() - ((n.getDay() + 6) % 7)),
        n
      );
    },
    u1 = function () {
      const A = r.dg || (r.dg = {});
      return (
        A.day !== Zt() && ((A.day = Zt()), (A.runs = {})),
        A.week !== q7() &&
          ((A.week = q7()),
          (A.wbTries = 0),
          (A.wbBest = 0),
          (A.wbRank = ""),
          (A.wbClaimed = !1)),
        (A.runs = A.runs || {}),
        A
      );
    },
    x7 = function () {
      const A = [...new Set(B0.map((t) => t.boss))].filter((t) => r0[t]),
        n = Math.floor(er().getTime() / 6048e5);
      return A[((n % A.length) + A.length) % A.length];
    },
    OP = function (A) {
      const n =
        A && A.map && window.JMO && window.JMO[String(A.map)] ? A.map : null;
      n &&
        ((c.zoneShown = "dg"),
        Te(n),
        ([b.x, b.y] = K0(M0.w / 2, M0.h / 2)),
        nn(),
        (c.bgImg = PA(`img/z/${n}.jpg`)),
        Vt(n));
    },
    ar = function () {
      (c.town && E1(),
        (c.enemies = []),
        (c.corpses = []),
        (c.pickTarget = null),
        (c.moveTo = null),
        (c.spawnT = 0.8),
        (c.stall = 0),
        (c.deadT = 0),
        (c.life = c.P.life),
        (c.mana = c.P.mana),
        t0(!0));
    },
    sr = function (A) {
      const n = b2.find((t) => t.id === A);
      if (n) {
        if (y2()) {
          y(
            c.deadT > 0
              ? "Đang trọng thương, chờ hồi phục"
              : "Đang ở tháp / phó bản",
          );
          return;
        }
        if (!Ei(n)) {
          y(`Cần cấp ${n.lv}`);
          return;
        }
        if (!Oi(n)) {
          y("Hết lượt hôm nay");
          return;
        }
        (ar(),
          (c.dg = {
            kind: "dg",
            id: A,
            d: n,
            room: 1,
            t: 0,
            limit: n.limit,
            L: Math.min(200, n.lv + Ii),
          }),
          (c.banner = {
            t: 2.4,
            text: n.n,
            sub: `${n.rooms} phòng · ${n.limit >= 120 && n.limit % 60 === 0 ? n.limit / 60 + " phút" : n.limit + " giây"} · gục ngã là thất bại`,
          }),
          OP(n),
          M(`🏯 Dịch chuyển vào phó bản <b>${D(n.n)}</b>.`));
      }
    },
    B7 = function () {
      const A = u1();
      if (y2()) {
        y(
          c.deadT > 0
            ? "Đang trọng thương, chờ hồi phục"
            : "Đang ở tháp / phó bản",
        );
        return;
      }
      if (r.lvl < 20 && !Q().stat.reborn) {
        y("Cần cấp 20");
        return;
      }
      if (A.wbTries >= ee) {
        y("Hết lượt tuần này");
        return;
      }
      (A.wbTries++,
        m1().wbTries++,
        ar(),
        (c.dg = { kind: "wb", t: 0, limit: rr, L: Si(3), tid: x7(), dmg: 0 }),
        (c.banner = {
          t: 2.4,
          text: "Boss tuần: " + r0[c.dg.tid].n,
          sub: `${rr} giây · gây càng nhiều sát thương càng tốt`,
        }),
        B());
    },
    ut = function () {
      const A = c.dg && c.dg.kind === "boat",
        n = c.dg && c.dg.kind === "dg" && c.zoneShown === "dg";
      ((c.dg = null),
        (c.dgPilotT = 3),
        (c.enemies = []),
        (c.corpses = []),
        (r.wave = 1),
        (c.spawnT = 0.8),
        (c.zoneShown = null),
        (c.stall = 0),
        A && typeof Yi == "function"
          ? Yi(!1)
          : n && ((c.zoneShown = null), vn(V0(Math.min(r.stage, l0)))),
        vA === "log" && F());
    },
    EP = function () {
      const A = c.dg;
      if (((c.enemies = []), (c.stall = 0), A.kind === "boat")) {
        Cv();
        return;
      }
      const n = (i, o) => {
        const l = A0(0, Math.PI * 2),
          d = A0(i, o);
        return K0(b.x + Math.cos(l) * d, b.y + Math.sin(l) * d);
      };
      if (A.kind === "wb") {
        const [i, o] = n(200, 240),
          l = zA(A.tid, A.L, "boss", i, o);
        ((l.hp = l.max = l.max * S7),
          (l.dmg *= 1.1),
          (l.wb = !0),
          (l.n = "Boss tuần · " + l.n),
          (A.boss = l),
          c.enemies.push(l));
        return;
      }
      const t = A.kind === "dg" ? j7(A) : A.L,
        e = QP(t);
      if (A.room >= A.d.rooms) {
        const [i, o] = n(220, 260),
          l = zA(e.boss, t, "boss", i, o);
        ((l.hp = l.max = (l.max * A.d.bossMul) / 2),
          (l.dmg *= 1.25),
          (l.n = "Trấn thủ · " + $e(e.boss, e.n)),
          c.enemies.push(l));
        for (let d = 0; d < 2; d++) {
          const [h, g] = n(140, 240),
            f = zA(_0(e.m), t, "elite", h, g);
          ((f.dmg *= E7), (f.hp = f.max = f.max * I7), c.enemies.push(f));
        }
      } else {
        const i = 3 + Math.floor(A.room / 3);
        for (let o = 0; o < i; o++) {
          const [l, d] = n(140, 260),
            h = zA(_0(e.m), t, "elite", l, d);
          ((h.dmg *= E7), (h.hp = h.max = h.max * I7), c.enemies.push(h));
        }
      }
    },
    IP = function (A) {
      const n = c.dg;
      n &&
        ((n.t += A),
        (c.stall = 0),
        n.kind === "wb" &&
          n.boss &&
          (n.dmg = Math.max(n.dmg, n.boss.max - Math.max(0, n.boss.hp))),
        n.t >= n.limit && (n.kind === "wb" ? Ga(!1) : _7("Hết thời gian")));
    },
    SP = function () {
      const A = c.dg;
      if (A.kind === "boat") {
        Ov();
        return;
      }
      if (A.kind === "wb") {
        if (!A.boss || A.boss.hp > 0) {
          c.spawnT = 0.5;
          return;
        }
        ((A.dmg = A.boss.max), Ga(!0));
        return;
      }
      if (A.room >= A.d.rooms) {
        NP();
        return;
      }
      if ((A.room++, A.kind === "dg" && A.d.islands && c.zoneShown === "dg")) {
        const n = fg(A.room - 1);
        if (n) {
          (([b.x, b.y] = n), (c.moveTo = null), (c.pickTarget = null));
          for (const t of c.ground) [t.x, t.y] = K0(t.x, t.y);
          typeof nn == "function" && nn();
        }
      }
      (t2(c.P.life * 0.25, !0),
        (c.mana = Math.min(c.P.mana, c.mana + c.P.mana * 0.3)),
        (c.spawnT = 1.5),
        (c.banner = {
          t: 1.4,
          text: `Phòng ${A.room}/${A.d.rooms} · quái cấp ${j7(A)}`,
          sub:
            A.room >= A.d.rooms
              ? "Trùm trấn thủ!"
              : `Còn ${Math.ceil(A.limit - A.t)} giây`,
        }));
    },
    _7 = function (A) {
      const n = c.dg;
      if (n) {
        if (n.kind === "wb") {
          Ga(!1);
          return;
        }
        if (n.kind === "boat") {
          (M(
            `<span class="bad">Phong Lăng Độ thất bại: ${D(A)}.</span> Không mất lượt.`,
          ),
            (c.banner = {
              t: 2.2,
              text: "Thuyền bị cướp",
              sub: A + " · không mất lượt",
            }),
            ut(),
            vA === "quest" && F());
          return;
        }
        (M(
          `<span class="bad">Phó bản ${D(n.d.n)} thất bại: ${D(A)}.</span> Không mất lượt.`,
        ),
          ((c.dgSkip || (c.dgSkip = {}))[n.d.id] = !0),
          (c.banner = {
            t: 2.2,
            text: "Thất bại",
            sub: A + " · không mất lượt",
          }),
          ut());
      }
    },
    te = function (A) {
      const n = Ot(0, x1 - 1),
        t = Object.values(r.eq).filter((h) => h && h.d <= 9),
        e = t.length ? _0(t) : null,
        a = e
          ? S.affixLevel
              .filter(
                (h) =>
                  h.lvl === 1 &&
                  h.pre === (n % 2 === 0 ? 1 : 0) &&
                  It(h.a, e.s) &&
                  da(h.a, e.d, e.k),
              )
              .map((h) => h.a)
          : [],
        i = a.length ? _0([...new Set(a)]) : _0(zl(n)),
        o = C(Math.floor(A / 12) + Ot(0, 1), 1, Ue),
        l = Object.values(r.eq).filter((h) => h && h.d <= 9),
        d = Je(n, i, o, n % 2 ? (l.length ? _0(l).s : C0(0, 4)) : -1);
      return (V("ore", d), `${nt(d)} cấp ${o}`);
    },
    M7 = function (A, n) {
      const t = [],
        e = C(Math.floor(A / 15) + 1, 1, DA);
      (V("ht", e, n), t.push(`${n} Huyền Tinh cấp ${e}`));
      for (let a = 0; a < n; a++) t.push(te(A));
      return t;
    },
    NP = function () {
      const A = c.dg,
        n = A.d,
        t = Math.round(A.t),
        e = t <= n.limit * 0.5 ? "S" : t <= n.limit * 0.75 ? "A" : "B",
        a = zP[e];
      u1().runs[n.id] = (u1().runs[n.id] || 0) + 1;
      const i = m1();
      ((i.dgClear[n.id] = (i.dgClear[n.id] || 0) + 1),
        (!i.dgBest[n.id] || t < i.dgBest[n.id]) && (i.dgBest[n.id] = t),
        (!i.dgRank[n.id] || "SAB".indexOf(e) < "SAB".indexOf(i.dgRank[n.id])) &&
          (i.dgRank[n.id] = e));
      const o = Q0(
          {
            fd: Math.round(n.fd * a),
            knb: Math.round((n.knb || 0) * a),
            buff: { tt: [0.5, e === "S" ? 30 : e === "A" ? 20 : 10] },
          },
          `Phó bản ${n.n} · hạng ${e}`,
        ),
        l = M7(A.L, e === "S" ? 3 : e === "A" ? 2 : 1);
      if ((M(`🎁 ${l.join(", ")}`), Math.random() < n.set * N7 * a)) {
        const d = Oa(!1);
        d &&
          (tn(d, !0, !0, !0),
          M(`🎁 Phó bản ${D(n.n)}: <b style="color:${b0[d.r]}">${D(d.n)}</b>`));
      }
      (typeof za == "function" &&
        Math.random() < n.horse * Hi.dg * a &&
        za(1, "Phó bản " + n.n),
        sn("dungeon"),
        (c.banner = {
          t: 3,
          text: `Qua ${n.n} · hạng ${e}`,
          sub: `${t} giây · ${o.join(", ").replace(/<[^>]+>/g, "")}`.slice(
            0,
            70,
          ),
        }),
        i0("levelup"),
        rn(),
        ut(),
        B());
    },
    LP = function (A, n) {
      for (const [t, e] of Ci) if (A >= n * e - 0.5) return t;
      return "";
    },
    Ga = function (A) {
      const n = c.dg,
        t = u1(),
        e = n.boss ? n.boss.max : 1,
        a = n.boss ? Math.round(A ? e : n.dmg) : 0,
        i = n.boss ? LP(a, e) : "";
      (a > (t.wbBest || 0) && ((t.wbBest = a), (t.wbHp = e)),
        i &&
          (!t.wbRank || "SABC".indexOf(i) < "SABC".indexOf(t.wbRank)) &&
          (t.wbRank = i),
        gt("wbBest", a, {
          n: r0[n.tid].n,
          rank: i || "—",
          pct: Math.round((a / e) * 100),
        }),
        M(
          `Boss tuần ${D(r0[n.tid].n)}: gây <b>${X(a)}</b> sát thương (${Math.round((a / e) * 100)}% máu) · hạng ${i || "chưa đạt"}`,
        ),
        (c.banner = {
          t: 3,
          text: A ? "Hạ Boss tuần!" : "Hết giờ",
          sub: `${X(a)} sát thương · hạng ${i || "—"}`,
        }),
        ut(),
        Nn(),
        B());
    },
    H7 = function () {
      const A = u1();
      if (A.wbClaimed || !A.wbRank) return;
      ((A.wbClaimed = !0),
        Q0(L7[A.wbRank], `Rương Boss tuần hạng ${A.wbRank}`));
      const n = M7(Si(3), { S: 3, A: 2, B: 1, C: 1 }[A.wbRank]);
      (M(`🎁 ${n.join(", ")}`), rn(), B());
    },
    qP = function (A) {
      const n = c.dg;
      if (!n) return;
      const t = Math.max(0, n.limit - n.t),
        e = Math.floor(t / 60),
        a = String(Math.floor(t % 60)).padStart(2, "0"),
        i =
          n.kind === "wb"
            ? `Boss tuần · ${X(n.dmg)} (${(() => {
                const l = (n.dmg / Math.max(1, n.boss ? n.boss.max : 1)) * 100;
                return l < 10 ? l.toFixed(1) : Math.round(l);
              })()}%) · ${e}:${a}`
            : n.kind === "boat"
              ? `⛵ Phong Lăng Độ · đoạn ${n.room}/${de} · ${e}:${a}`
              : `${n.d.n} · phòng ${n.room}/${n.d.rooms} · ${e}:${a}`;
      ((A.font = '12px "IBM Plex Mono", monospace'), (A.textAlign = "center"));
      const o = A.measureText(i).width + 18;
      ((A.fillStyle = "#000b"),
        A.fillRect(k0.w / 2 - o / 2, 34, o, 20),
        (A.fillStyle = t < 20 ? "#ff7a6a" : "#f3d88a"),
        A.fillText(i, k0.w / 2, 48));
    },
    $7 = function () {
      const A = c.dg
          ? `<div class="card"><b>Đang trong ${c.dg.kind === "wb" ? "Boss tuần" : D(c.dg.d.n)}</b><div class="btnrow"><button class="btn red" id="dgOut">Rời đi${c.dg.kind === "wb" ? " (giữ sát thương đã gây)" : " (không mất lượt)"}</button></div></div>`
          : "",
        n = m1();
      return `<p class="desc">Phó bản: quái tinh anh cấp cố định theo phó bản (phòng 1 = cấp phó bản, mỗi phòng mạnh dần, phòng cuối +10 là trùm trấn thủ), không mạnh lên theo cấp nhân vật. ${ir} lượt / ngày cho mỗi phó bản, chỉ trừ lượt khi vượt qua. Hạng theo thời gian: S ≤ 50% giới hạn (thưởng ×1.5), A ≤ 75% (×1.2), B.</p>${A}
    ${b2
      .map((t) => {
        const e = Ei(t),
          a = Oi(t);
        return `<div class="card dgc${e ? "" : " lock"}"><b>${D(t.n)}</b> <small class="dim">từ cấp ${t.lv} · quái cấp ${t.lv} → ${Math.min(200, t.lv + Ii)} · ${t.rooms} phòng · ${t.limit >= 120 && t.limit % 60 === 0 ? t.limit / 60 + " phút" : t.limit + " giây"}</small><br><small>${D(t.d)}</small><br>
      <small class="dim">Thưởng: ${t.fd} Phúc Duyên, <b style="color:#ffd24a">${t.knb || 0} KNB</b>, Tiên Thảo Lộ 10–30 phút, Huyền Tinh + khoáng · Hoàng Kim ${(t.set * N7 * 100).toFixed(1)}% · Rương Ngựa ${(t.horse * Hi.dg * 100).toFixed(1)}%${n.dgClear[t.id] ? ` · kỷ lục ${n.dgBest[t.id]} giây (hạng ${n.dgRank[t.id]})` : ""}</small>
      <div class="btnrow"><button class="btn" data-dg="${t.id}" ${e && a && !y2() ? "" : "disabled"}>${e ? (a ? `Vào (còn ${a}/${ir} lượt)` : "Hết lượt hôm nay") : `Cần cấp ${t.lv}`}</button></div></div>`;
      })
      .join("")}`;
    },
    T7 = function () {
      const A = u1(),
        n = x7(),
        t = r0[n],
        e = Si(3),
        a = r.lvl >= 20 || Q().stat.reborn > 0,
        i = er();
      i.setDate(i.getDate() + 7);
      const o = Math.max(0, Math.round((i - Date.now()) / 36e5)),
        l = A.wbBest && A.wbHp ? Math.round((A.wbBest / A.wbHp) * 100) : 0;
      return `<p class="desc">Mỗi tuần một trùm cực trâu (máu ×${S7} trùm thường). ${ee} lượt / tuần, mỗi lượt ${rr} giây. Hạng theo % máu trùm đã đánh mất: C ${Ci[3][1] * 100}% · B ${Ci[2][1] * 100}% · A ${Ci[1][1] * 100}% · S hạ gục. Nhận rương tuần theo hạng tốt nhất.</p>
    <div class="card"><div class="idet">${t.img ? `<div class="pic"><img src="${D(t.img)}" alt=""></div>` : ""}<div><h4 class="boss">${D(t.n)}</h4><small class="dim">Cấp ${e} · đổi trùm sau ${o} giờ</small></div></div>
      <div class="stats"><span>Lượt còn</span><span>${ee - A.wbTries}/${ee}</span><span>Sát thương tốt nhất</span><span>${X(A.wbBest || 0)}${l ? ` (${l}%)` : ""}</span><span>Hạng tuần</span><span>${A.wbRank || "—"}</span></div>
      <div class="chips">${["S", "A", "B", "C"].map((d) => `<span class="chip2${A.wbRank === d ? " on" : ""}">${d}: ${u2(L7[d])}${d === "S" ? ", 35% thần mã" : ""}</span>`).join("")}</div>
      <div class="btnrow"><button class="btn" id="wbGo" ${a && A.wbTries < ee && !y2() ? "" : "disabled"}>${a ? (A.wbTries < ee ? "Khiêu chiến" : "Hết lượt tuần này") : "Cần cấp 20"}</button>
      <button class="btn" id="wbClaim" ${A.wbRank && !A.wbClaimed ? "" : "disabled"}>${A.wbClaimed ? "Đã nhận rương tuần" : "Nhận rương tuần"}</button></div></div>`;
    },
    w1 = function s(A) {
      if (!r.fac) return;
      if (A === "dt" || A === "st") {
        Ja(A);
        return;
      }
      (A && (gA = A), gA === "rec" && (gA = "dg"));
      const n = [
          ["dg", "Phó bản"],
          ["tower", "Tháp"],
          ["wb", "Boss tuần"],
          ["horse", "Mã trường"],
          ["pet", "Đồng hành"],
        ],
        t =
          gA === "tower"
            ? Id()
            : gA === "pet"
              ? Sd()
              : gA === "dg"
                ? $7()
                : gA === "wb"
                  ? T7()
                  : gA === "horse"
                    ? g7()
                    : gA === "tm"
                      ? b7()
                      : e7();
      J(
        `<h3>Hoạt động <small>${j(r.gold)} lượng</small></h3><div class="dtabs" id="actTabs">${n.map(([e, a]) => `<button data-a="${e}" class="${e === gA ? "on" : ""}">${a}</button>`).join("")}</div>${t}`,
        () => {
          (document
            .querySelectorAll("#actTabs button")
            .forEach((a) => (a.onclick = () => s(a.dataset.a))),
            document
              .querySelectorAll("#mBody [data-dg]")
              .forEach((a) => (a.onclick = () => sr(a.dataset.dg))));
          const e = (a, i) => {
            const o = u(a);
            o && (o.onclick = i);
          };
          (e("#wbGo", B7),
            e("#wbClaim", () => {
              (H7(), s());
            }),
            e("#dgOut", () => {
              (c.dg.kind === "wb" ? Ga(!1) : (M("Rời phó bản."), ut()), s());
            }),
            gA === "horse" && m7(() => s()),
            gA === "tm" && y7(() => s()),
            e("#gTower", g2),
            e("#gTowerOut", () => {
              (Ia(!1), s());
            }),
            document
              .querySelectorAll("#mBody .petpick [data-p]")
              .forEach((a) => (a.onclick = () => $d(+a.dataset.p))));
        },
      );
    },
    C7 = function () {
      const A = u("#actBtn");
      if (!A || !r.fac) return;
      const n =
        b2.some((t) => Ei(t) && Oi(t)) ||
        ((r.lvl >= 20 || Q().stat.reborn) && u1().wbTries < ee) ||
        or();
      A.classList.toggle("on", !!n);
    },
    O7 = function (A) {
      if (
        r.mode !== "dg" ||
        !r.fac ||
        c.dg ||
        c.tower ||
        c.deadT > 0 ||
        c.sat ||
        ((c.dgPilotT = (c.dgPilotT || 0) - A), c.dgPilotT > 0)
      )
        return;
      c.dgPilotT = 1.5;
      const n = Ni();
      if (n) {
        (c.town && E1(), sr(n.id));
        return;
      }
      if (!c.town) {
        const t = he();
        r.autoMap !== !1 &&
          dA(Math.min(r.stage, l0)) !== t &&
          fn(t, "Hết lượt phó bản, luyện công");
      }
    },
    b2 = [
      {
        id: "dvc",
        map: 140,
        n: "Dược Vương Cốc",
        lv: 20,
        add: -2,
        rooms: 5,
        limit: 120,
        bossMul: 5,
        set: 0.2,
        horse: 0.08,
        fd: 8,
        item: 5,
        gold: 2500,
        knb: 2,
        pot: 5,
        d: "Hang dược thảo bị độc nhân chiếm giữ. 4 phòng tinh anh, phòng 5 là trùm.",
      },
      {
        id: "tbk",
        map: 50,
        n: "Thiên Bảo Khố",
        lv: 50,
        add: 0,
        rooms: 6,
        limit: 150,
        bossMul: 6,
        set: 0.35,
        horse: 0.12,
        fd: 12,
        item: 6,
        gold: 6e3,
        knb: 3,
        pot: 8,
        d: "Kho báu triều đình, lính canh tinh nhuệ. 5 phòng tinh anh, phòng 6 là trùm.",
      },
      {
        id: "lal",
        map: 8,
        n: "Lâm An Hoàng Lăng",
        lv: 80,
        add: 2,
        rooms: 7,
        limit: 210,
        bossMul: 7,
        set: 0.5,
        horse: 0.18,
        fd: 18,
        item: 6,
        gold: 12e3,
        knb: 4,
        pot: 10,
        d: "Lăng mộ hoàng tộc, cơ quan trùng trùng. 6 phòng tinh anh, phòng 7 là trùm.",
      },
      {
        id: "pdq",
        map: 206,
        n: "Phong Đô Quỷ Thành",
        lv: 110,
        rooms: 7,
        limit: 240,
        bossMul: 7,
        set: 0.55,
        horse: 0.2,
        fd: 22,
        item: 6,
        gold: 2e4,
        knb: 5,
        pot: 12,
        d: "Thành ma nơi âm khí ngút trời. 6 phòng tinh anh, phòng 7 là trùm.",
      },
      {
        id: "kct",
        map: 4,
        n: "Kiếm Các Thục Đạo",
        lv: 140,
        rooms: 8,
        limit: 270,
        bossMul: 8,
        set: 0.6,
        horse: 0.22,
        fd: 26,
        item: 6,
        gold: 3e4,
        knb: 6,
        pot: 14,
        d: "Đường Thục hiểm trở, sơn tặc trấn ải. 7 phòng tinh anh, phòng 8 là trùm.",
      },
      {
        id: "mcb",
        map: 225,
        n: "Mạc Cao Bí Cảnh",
        lv: 170,
        rooms: 8,
        limit: 300,
        bossMul: 7,
        set: 0.65,
        horse: 0.25,
        fd: 30,
        item: 6,
        gold: 45e3,
        knb: 7,
        pot: 16,
        d: "Hang động cổ giữa sa mạc, cao thủ ẩn tu. 7 phòng tinh anh, phòng 8 là trùm.",
      },
      {
        id: "hsl",
        map: 212,
        n: "Hoa Sơn Luận Kiếm",
        lv: 190,
        rooms: 9,
        limit: 330,
        bossMul: 7,
        set: 0.7,
        horse: 0.28,
        fd: 35,
        item: 6,
        gold: 6e4,
        knb: 8,
        pot: 20,
        d: "Đỉnh Hoa Sơn, quần hùng tranh phong. 8 phòng tinh anh, phòng 9 là trùm.",
      },
    ],
    E7 = 0.55,
    I7 = 0.6,
    jP = 10,
    ir = 2,
    ee = 3,
    rr = 75,
    S7 = 60,
    Ci = [
      ["S", 1],
      ["A", 0.5],
      ["B", 0.2],
      ["C", 0.05],
    ],
    N7 = 0.03,
    lx = 0.04,
    L7 = {
      S: { gold: 1e4, fd: 50, set: 1, knb: 15, pts: 3 },
      A: { gold: 6e3, fd: 30, set: 1, knb: 10 },
      B: { gold: 3e3, fd: 20, item: 6, knb: 6 },
      C: { gold: 1500, fd: 10, item: 5, knb: 3 },
    },
    zP = { S: 1.5, A: 1.2, B: 1 },
    q7 = () => Na(er()),
    Oi = (s) => Math.max(0, ir - (u1().runs[s.id] || 0)),
    Ei = (s) => r.lvl >= s.lv || Q().stat.reborn > 0,
    Ii = 10,
    j7 = (s) =>
      C(
        Math.round(s.d.lv + (Ii * (s.room - 1)) / Math.max(1, s.d.rooms - 1)),
        1,
        200,
      ),
    cx = (s) => (1 + Math.min(r.lvl, s.lv + Ii) / 10) / (1 + r.lvl / 10),
    Si = (s) =>
      C(Math.max(r.lvl, zt(Math.max(1, r.maxStage - jP))) + s, 1, Y2()),
    QP = (s) => B0.find((A) => s <= A.hi) || B0[B0.length - 1],
    y2 = () => c.dg || c.tower || c.deadT > 0,
    or = () => r && r.fac && ((u1().wbRank && !u1().wbClaimed) || !1),
    gA = "dg",
    Ni = () =>
      b2
        .filter((s) => Ei(s) && Oi(s) > 0 && !(c.dgSkip || {})[s.id])
        .sort((s, A) => A.lv - s.lv)[0] || null,
    X0 = function s() {
      const A = r.dt || (r.dt = {});
      return (
        A.n == null &&
          Object.assign(A, {
            n: 0,
            chain: 0,
            best: 0,
            day: "",
            today: 0,
            task: null,
            auto: !0,
          }),
        A.day !== Zt() && ((A.day = Zt()), (A.today = 0), (A.extra = 0)),
        A.task &&
          (A.task.t === "item" || A.task.t === "mat") &&
          ((A.task = null),
          setTimeout(() => {
            s().task || ae();
          }, 0)),
        A
      );
    },
    k2 = function (A) {
      const n = X0();
      return N("misc", "ldt") < 1
        ? (A || y("Chưa có Lệnh Bài Dã Tẩu (mua ở Kỳ Trân Các)"), !1)
        : (V("misc", "ldt", -1),
          (n.extra = (n.extra || 0) + B2),
          n.task || ae(),
          M(
            `📜 Dùng Lệnh Bài Dã Tẩu: +${B2} lượt nhiệm vụ hôm nay (${n.today}/${ie()}).`,
          ),
          A || y(`+${B2} lượt Dã Tẩu`),
          (c.dirty = !0),
          B(),
          typeof F == "function" && F(),
          !0);
    },
    GP = function () {
      const A = typeof he == "function" ? he() : dA(Math.min(r.stage, l0)),
        n = Math.max(0, A - C0(0, 1)),
        t = [B0[n]].concat(Hn[n] || []),
        e = C0(0, t.length - 1);
      return { zi: n, za: e, zn: t[e].n, z: t[e] };
    },
    KP = function () {
      const A = _0(sv),
        n = wA
          .map((i, o) => (i === A ? o : -1))
          .filter((i) => i >= 0 && i <= 9),
        t = C(Math.ceil(r.lvl / 12), 1, 10),
        e = Ke.map(() => 0);
      for (let i = 0; i < 40; i++) {
        const o = _0(n),
          l = pA(o, Qe(o, C0(0, 5)), t, 2);
        l &&
          (r.uid--,
          Ke.forEach((d, h) => {
            (l.mag || []).some((g) => d[1].includes(H3(W0(g.a)))) && e[h]++;
          }));
      }
      const a = e.map((i, o) => [o, i]).filter((i) => i[1] >= 10);
      return { slot: A, grp: a.length ? _0(a)[0] : -1 };
    },
    ae = function () {
      const A = X0();
      if (A.today >= ie()) {
        A.task = null;
        return;
      }
      const n = Object.entries(rv).filter(
          ([a]) => (a !== "boss" || r.lvl >= 30) && (a !== "mat" || w0()),
        ),
        t = _e(n, (a) => a[1])[0],
        e = { t, have: 0 };
      if (t === "killm" || t === "elite" || t === "boss") {
        const a = GP();
        if (
          (Object.assign(e, { zi: a.zi, za: a.za, zn: a.zn }), t === "killm")
        ) {
          const i = a.z.m.filter((o) => r0[o]);
          Object.assign(e, {
            tid: _0(i.length ? i : V0(r.stage).m),
            need: 25 + C0(0, 15),
          });
        }
        (t === "elite" && (e.need = 5 + C0(0, 3)),
          t === "boss" && Object.assign(e, { tid: a.z.boss, need: 1 }));
      }
      (t === "mat" && Object.assign(e, { lv: dv(), cnt: 2 + C0(0, 2) }),
        t === "gold" && (e.cost = Math.round((300 + r.lvl * r.lvl * 6) * 4)),
        t === "item" && Object.assign(e, KP(), { minR: r.lvl >= 40 ? 2 : 1 }),
        (A.task = e));
    },
    se = function (A) {
      if (!A) return "—";
      const n = A.zn ? ` ở ${A.zn}` : "";
      switch (A.t) {
        case "kill":
          return `Hạ ${A.need} quái (cấp ≥ ${A.minL})`;
        case "killm":
          return `Săn ${A.need} ${r0[A.tid] ? r0[A.tid].n : "quái"}${n}`;
        case "elite":
          return `Diệt ${A.need} quái tinh anh${n}`;
        case "boss":
          return `Hạ trùm ${$e(A.tid, A.zn)}${n}`;
        case "mat":
          return `Thu thập ${A.cnt} Huyền Tinh Khoáng Thạch cấp ${A.lv} (có ${Math.min(A.cnt, N("ht", A.lv))})`;
        case "gold":
          return `Nộp ${j(A.cost)} lượng`;
        case "item":
          return `Tìm ${iv(A.slot)} ${N8[A.minR]} trở lên${A.grp >= 0 ? ` có dòng ${Ke[A.grp][0]}` : ""}`;
      }
      return "?";
    },
    U0 = function (A) {
      const n = r.dt && r.dt.task;
      if (
        !n ||
        n.t !== "item" ||
        !r.fac ||
        r.lvl < mA ||
        !A ||
        !Va(A, n) ||
        Object.values(r.eq).includes(A)
      )
        return !1;
      const t = re(n);
      return !t || t === A;
    },
    z7 = function (A) {
      const n = r.dt,
        t = n && n.task;
      !t ||
        t.t !== "item" ||
        !n.auto ||
        !Va(A, t) ||
        !r.inv.includes(A) ||
        (M(`📜 Dã Tẩu: nhặt được <b>${D(A.n)}</b> để nộp.`), Ra(!0));
    },
    jn = function (A) {
      return A
        ? A.t === "gold"
          ? r.gold >= A.cost
          : A.t === "item"
            ? !!A.bought || !!re(A)
            : A.t === "mat"
              ? !!A.bought || N("ht", A.lv) >= A.cnt
              : A.have >= A.need
        : !1;
    },
    Ka = function (A) {
      if (A && (A.sat || A.satG)) return !0;
      const n = r.dt && r.dt.task;
      return !n || !n.need || n.have >= n.need || !A || !R7(n)
        ? !1
        : n.t === "killm"
          ? A.tid === n.tid
          : n.t === "elite"
            ? A.cls === "elite"
            : n.t === "boss"
              ? A.cls === "boss" && A.tid === n.tid
              : !1;
    },
    RP = function (A) {
      if (!r.fac || r.lvl < mA) return;
      const n = X0(),
        t = n.task;
      if (
        t &&
        t.t === "item" &&
        !re(t) &&
        !c.ground.some((a) => Va(a.it, t)) &&
        Math.random() < lv
      ) {
        const a = wA
            .map((o, l) => (o === t.slot ? l : -1))
            .filter((o) => o >= 0 && o <= 9),
          i = C(Math.ceil(Math.min(A.L, r.lvl) / 12), 1, 10);
        for (let o = 0; o < 40; o++) {
          const l = _0(a),
            d = pA(l, Qe(l, C0(0, 5)), i, 2);
          if (d && Va(d, t)) {
            (D4(d, A),
              M(`📜 Dã Tẩu: <b>${D(d.n)}</b> rơi ra (vật phẩm cần tìm).`));
            break;
          }
        }
      }
      if (t && t.t === "mat" && n.auto && jn(t)) {
        Ra(!0);
        return;
      }
      !t ||
        !t.need ||
        t.have >= t.need ||
        !Ka(A) ||
        (t.have++,
        t.have >= t.need &&
          (n.auto
            ? Ra(!0)
            : (y("Dã Tẩu: nhiệm vụ hoàn thành, về trả!"),
              M(
                "📜 Dã Tẩu: <b>hoàn thành</b> " +
                  D(se(t)) +
                  " — về trả nhiệm vụ.",
              ))));
    },
    Ra = function s(A) {
      const n = X0(),
        t = n.task;
      if (!jn(t)) return !1;
      if ((t.t === "gold" && (r.gold -= t.cost), t.t === "item" && !t.bought)) {
        const i = re(t);
        (r.inv.splice(r.inv.indexOf(i), 1), (Y = !0));
      }
      (t.t === "mat" && !t.bought && V("ht", t.lv, -t.cnt),
        n.n++,
        n.chain++,
        n.today++,
        (n.best = Math.max(n.best, n.chain)));
      const e = n.chain,
        a = _2[t.t] || 1;
      if (
        (Q0(
          {
            gold: Math.round(120 * a),
            xp: Math.min(0.05, 0.02 + e * 6e-4) * a,
            fd: a > 1 ? 2 : 1,
            knb: Math.random() < 0.08 * a ? 1 : 0,
          },
          `Dã Tẩu #${e}`,
        ),
        w0() && (Math.random() < 0.35 || e % 50 === 0))
      ) {
        const i = C(Math.floor(r.lvl / 15) + (e % 50 === 0 ? 1 : 0), 1, DA),
          o = e % 50 === 0 ? 3 : 1;
        (V("ht", i, o), M(`📜 Dã Tẩu: nhận ${o} Huyền Tinh cấp ${i}`));
      }
      return (
        e % 20 === 0 &&
          (Q0({ misc: { lb: 1 } }, `Dã Tẩu chuỗi ${e}`),
          w0() && M(`📜 Dã Tẩu chuỗi ${e}: ${te(r.lvl)}`)),
        e % 500 === 0 && typeof za == "function" && za(1, `Mốc Dã Tẩu ${e}`),
        sn("dt"),
        e % 50 === 0 && Q0({ item: 5, fd: 5 }, `Rương Dã Tẩu ${e}`),
        YP(e, n.n),
        ae(),
        A
          ? ((n.task && n.task.t === "gold" && r.gold >= n.task.cost * 20) ||
              (n.task &&
                ((n.task.t === "item" && re(n.task)) ||
                  (n.task.t === "mat" && jn(n.task))))) &&
            s(!0)
          : lr(),
        !0
      );
    },
    YP = function (A, n) {
      const t = (e, a) => {
        e &&
          (tn(e, !0, !0, !0),
          M(`📜 ${a}: <b style="color:${b0[e.r]}">${D(e.n)}</b>`));
      };
      (A % 200 === 0 &&
        (r.lvl >= 75
          ? Q0({ misc: { bk90: 1 } }, `Mốc Dã Tẩu ${A}`)
          : Q0({ buff: { tt: [0.5, 60] } }, `Mốc Dã Tẩu ${A}`)),
        A % 100 === 0 &&
          (Q0({ knb: 3, fd: 10 }, `Mốc Dã Tẩu ${A}`),
          typeof Ea == "function" &&
            (Ea("luck", 20, 60),
            M(`📜 Mốc Dã Tẩu ${A}: Quế Hoa Tửu +20 may mắn 60 phút`))),
        A % 500 === 0 &&
          Q0({ knb: 5, fd: 20, item: 6, misc: { wc: 1 } }, `Mốc Dã Tẩu ${A}`),
        n % Fa === 0
          ? t(Oa(!1, !0), `Dã Tẩu ${n} nhiệm vụ — Hoàng Kim Môn Phái`)
          : n % 1e3 === 0
            ? t(Oa(!0), `Dã Tẩu ${n} nhiệm vụ — Hoàng Kim`)
            : n % 500 === 0 &&
              Q0({ misc: { dtbk: 1 } }, `Dã Tẩu ${n} nhiệm vụ`));
    },
    FP = function () {
      const A = X0();
      return N("misc", "ldt") < 1
        ? !1
        : (V("misc", "ldt", -1),
          ae(),
          M("📜 Dùng Lệnh Bài Dã Tẩu đổi nhiệm vụ (giữ chuỗi)."),
          lr(),
          B(),
          !0);
    },
    VP = function () {
      if (FP()) return;
      const A = X0();
      ((A.chain = 0),
        ae(),
        M("📜 Hủy nhiệm vụ Dã Tẩu, chuỗi liên tiếp về 0."),
        lr(),
        B());
    },
    lr = function () {
      F();
    },
    XP = function () {
      if (r.lvl < mA)
        return `<p class="desc">Dã Tẩu giao nhiệm vụ từ cấp ${mA}.</p>`;
      const A = X0();
      !A.task && A.today < ie() && ae();
      const n = A.task,
        t = jn(n),
        e = G7.map((o) => o[0] - (A.chain % o[0])).sort((o, l) => o - l)[0],
        [a, i] = fv(A.n);
      return `<p class="desc">Mốc chuỗi liên tiếp: ${G7.map(([o, l]) => `<b>${o}</b>: ${l}`).join(" · ")}. Mốc tổng nhiệm vụ: <b>500</b>: Đại Thành Bí Kíp · <b>1000</b>: Hoàng Kim dùng chung · <b class="gold">${Fa} / ${Fa * 2} / ${Fa * 3}…</b>: <b style="color:#ffd24a">Hoàng Kim Môn Phái</b> (chắc chắn). Đổi nhiệm vụ: tốn 1 Lệnh Bài Dã Tẩu (giữ chuỗi); không có lệnh bài thì hủy = mất chuỗi. ${cr} nhiệm vụ / ngày + ${B2} mỗi lệnh bài (mua tối đa ${f4} / ngày).</p>
    <div class="card"><div class="stats"><span>Chuỗi liên tiếp</span><span><b>${A.chain}</b> (kỷ lục ${A.best})</span><span>Hôm nay</span><span>${A.today}/${ie()}${A.extra ? ` <small class="cp">(+${A.extra} lệnh bài)</small>` : ""}</span><span>Mốc chuỗi kế</span><span>còn ${e}</span><span>Tổng</span><span>${A.n}</span><span>Mốc tổng kế</span><span>${a}: ${i} <small class="dim">(còn ${a - A.n})</small></span></div></div>
    <div class="card"><b>📜 ${n ? D(se(n)) : "Hết nhiệm vụ hôm nay"}</b> <small class="dim">${n ? Li(n) : ""}</small>
      ${n && n.t === "item" ? `<div class="dim small">${re(n) ? "Sẽ nộp: " + D(re(n).n) + " (đang giữ 📜)" : `Chưa có món phù hợp: món rơi phù hợp sẽ được tự nhặt và giữ lại. Tự trả: sau ${ov} quái chưa có thì mua ở tiệm (${j(cv())} lượng) · đã hạ ${n.kw || 0}`}</div>` : ""}
      <div class="dim small">${n && n.zn && !R7(n) ? `Auto sẽ dịch chuyển tới ${D(n.zn)}. ` : ""}Thưởng${n && _2[n.t] ? " ×1,5" : ""}: ${Math.round(Math.min(0.05, 0.02 + (A.chain + 1) * 6e-4) * ((n && _2[n.t]) || 1) * 1e3) / 10}% kinh nghiệm cấp, ${j(120 * ((n && _2[n.t]) || 1) * (1 + r.lvl / 10))} lượng, ${n && _2[n.t] ? 2 : 1} Phúc Duyên, <b style="color:#ffd24a">${n && _2[n.t] ? 12 : 8}% 1 KNB</b>${w0() ? ", 35% Huyền Tinh (mỗi 10 nhiệm vụ: 3 viên)" : ""}</div>
      <div class="btnrow"><button class="btn" id="dtDo" ${t ? "" : "disabled"}>${n && (n.t === "gold" || n.t === "item" || n.t === "mat") ? "Nộp" : "Trả nhiệm vụ"}</button><button class="btn red" id="dtCancel" ${n ? "" : "disabled"}>${N("misc", "ldt") ? "Đổi (1 Lệnh Bài)" : "Hủy (mất chuỗi)"}</button>
      <label class="chk"><input type="checkbox" id="dtAuto" ${A.auto ? "checked" : ""}> Tự trả / nhận</label></div></div>
    <div class="card small"><img src="img/ep/ldt.png" alt="" style="height:20px;vertical-align:middle;image-rendering:pixelated"> <b>Lệnh Bài Dã Tẩu</b>: có ${N("misc", "ldt")} · mỗi lệnh bài +${B2} lượt hôm nay (mua ở Kỳ Trân Các)
      <div class="btnrow"><button class="btn sm${A.today >= ie() ? " on" : ""}" id="dtLdt" ${N("misc", "ldt") ? "" : "disabled"}>Dùng Lệnh Bài (+${B2} lượt)</button>
      <label class="chk"><input type="checkbox" id="dtLdtAuto" ${r.autoLdt === !1 ? "" : "checked"}> Tự dùng khi hết lượt (chế độ Làm nhiệm vụ)</label></div></div>`;
    },
    UP = function () {
      const A = (e, a) => {
        const i = u(e);
        i && (i.onclick = a);
      };
      (A("#dtDo", () => {
        (Ra(!1), B());
      }),
        A("#dtCancel", VP));
      const n = u("#dtAuto");
      (n &&
        (n.onchange = () => {
          ((X0().auto = n.checked), B());
        }),
        A("#dtLdt", () => k2(!1)));
      const t = u("#dtLdtAuto");
      t &&
        (t.onchange = () => {
          ((r.autoLdt = t.checked), B());
        });
    },
    Ya = function () {
      const A = r.st || (r.st = { day: "", kills: 0, fails: 0, best: 0 });
      return (
        A.day !== Zt() &&
          ((A.day = Zt()), V("misc", "lb", Math.max(0, Y7 - N("misc", "lb")))),
        A
      );
    },
    JP = function (A) {
      const n = [...new Set(B0.map((t) => t.boss))].filter(
        (t) => r0[t] && _3(t) === A && !/boss/i.test(r0[t].n),
      );
      return n.length ? n : [...new Set(B0.map((t) => t.boss))];
    },
    Q7 = function (A) {
      if ((Ya(), c.sat)) {
        y("Đang có Sát Thủ trên bản đồ");
        return;
      }
      if (c.dg || c.tower || c.town) {
        y("Ra bãi luyện công để gọi Sát Thủ");
        return;
      }
      if (A > fr()) return;
      if (N("misc", "lb") < 1) {
        y("Cần Lệnh Bài Sát Thủ");
        return;
      }
      V("misc", "lb", -1);
      const n = C0(0, 4),
        t = _0(JP(n)),
        e = A + 5;
      if (typeof fn == "function") {
        const d = Lv(e);
        dA(Math.min(r.stage, l0)) !== d && fn(d, `Sát Thủ cấp ${A} xuất hiện`);
      }
      const a = V0(Math.min(r.stage, l0)),
        i = (d, h) => {
          const g = A0(0, Math.PI * 2),
            f = A0(d, h);
          return K0(b.x + Math.cos(g) * f, b.y + Math.sin(g) * f);
        },
        o = i(200, 240),
        l = zA(t, e, "boss", o[0], o[1]);
      ((l.hp = l.max = l.max * 2.2),
        (l.dmg *= 1.2),
        (l.sat = A),
        (l.series = n),
        (l.n = `${d0[n]} Sát Thủ · ${r0[t].n}`),
        c.enemies.push(l));
      for (let d = 0; d < 2; d++) {
        const h = i(150, 220),
          g = zA(_0(a.m), e, "elite", h[0], h[1]);
        ((g.satG = 1), (g.n = "Hộ vệ · " + g.n), c.enemies.push(g));
      }
      ((c.sat = { t: dr, tier: A, id: l.id }),
        t0(!0),
        (c.banner = {
          t: 2.6,
          text: `${d0[n]} Sát Thủ cấp ${A}`,
          sub: `Hạ trong ${dr} giây`,
        }),
        M(`🗡 <b style="color:${m0[n]}">${D(l.n)}</b> (cấp ${e}) xuất hiện!`),
        B());
    },
    WP = function (A) {
      const n = c.sat;
      if (!n) return;
      n.t -= A;
      const t = c.enemies.find((e) => e.id === n.id && !e.dead);
      if (n.done) {
        c.sat = null;
        return;
      }
      (!t || n.t <= 0) &&
        ((c.enemies = c.enemies.filter((e) => !(e.sat || e.satG) || e.dead)),
        Ya().fails++,
        (c.sat = null),
        M('<span class="bad">🗡 Sát Thủ đã trốn thoát.</span>'),
        (c.banner = { t: 2, text: "Sát Thủ trốn thoát", sub: "" }));
    },
    ZP = function (A) {
      if (!A.sat) return;
      const n = A.sat,
        t = Ya();
      (t.kills++,
        (t.best = Math.max(t.best, n)),
        c.sat && c.sat.id === A.id && (c.sat.done = !0));
      const e = { wc: n >= 40 && Math.random() < 0.1 ? 1 : 0, mys: 0 };
      n >= 90 && Math.random() < 0.08 && (e.bk90 = 1);
      for (const i in e) e[i] || delete e[i];
      Q0(
        { gold: n * 25, xp: 0.01 + (n / 90) * 0.03, item: 5, misc: e },
        `Hạ Sát Thủ cấp ${n}`,
      );
      const a = C(Math.floor(n / 10) - 1, 1, 10);
      (V("ht", a),
        M(`🗡 Nhận Huyền Tinh cấp ${a}${w0() && n >= 50 ? ", " + te(n) : ""}`),
        c.enemies.forEach((i) => {
          i.satG && (i.satG = 0);
        }));
    },
    Av = function () {
      const A = Ya(),
        n = fr(),
        t = N("misc", "lb");
      return `<p class="desc">Sát Thủ Đường: dùng 1 Lệnh Bài gọi Sát Thủ (5 hệ) kèm 2 hộ vệ ngay tại bãi luyện công, hạ trong ${dr} giây. Mỗi ngày nhận ${Y7} lệnh bài miễn phí; thêm từ Dã Tẩu (mỗi 5 nhiệm vụ) và trùm. Thưởng: kinh nghiệm, Thủy Tinh Trắng, Thần Bí Khoáng Thạch, Huyền Tinh (Sát Thủ cấp 50+: thêm 1 đá thuộc tính), đồ 5 dòng; Sát Thủ 90 có cơ hội rơi Bí Kíp 90.</p>
    <div class="card stats"><span>Lệnh Bài Sát Thủ</span><span><b>${t}</b></span><span>Đã hạ</span><span>${A.kills} (cao nhất cấp ${A.best || "—"})</span><span>Trốn thoát</span><span>${A.fails}</span></div>
    ${c.sat ? `<div class="card"><b>🗡 Đang truy sát Sát Thủ cấp ${c.sat.tier}</b> <small class="dim">còn ${Math.ceil(c.sat.t)} giây</small></div>` : ""}
    <div class="stgrid">${hv.map((e) => `<button class="btn" data-st="${e}" ${e <= n && t && !c.sat ? "" : "disabled"}>Cấp ${e}${e > n ? ` <small>(cần cấp ${e})</small>` : ""}</button>`).join("")}</div>`;
    },
    nv = function (A) {
      if (r.fac) {
        if ((RP(A), ZP(A), A.cls === "boss")) {
          const n = A.goldBoss || A.wb;
          if (Math.random() < (n ? 0.5 : 0.1)) {
            const t = n ? C0(1, 2) : 1;
            ((r.knb = (r.knb || 0) + t),
              M(
                `💰 Nhặt được <b style="color:#ffd700">${t} Kim Nguyên Bảo</b>`,
              ));
          }
        }
        if (A.cls === "boss") {
          const n = A.L,
            t = (A.goldBoss || A.wb ? 4 : 1) * ra(),
            e = [];
          (n >= 75 && Math.random() < 0.03 * t && e.push("bk90"),
            !A.sat && Math.random() < 0.06 && e.push("lb"));
          for (const a of e)
            (V("misc", a, 1),
              M(`Nhặt được <b style="color:#ffd24a">${x2(a)}</b>`));
        }
      }
    },
    tv = function (A) {
      (WP(A),
        typeof pf == "function" && pf(A),
        typeof O7 == "function" && O7(A),
        typeof Hd == "function" && Hd(A));
    },
    ev = function (A) {
      if (!r.fac || r.lvl < mA) return;
      Ya();
      const n = X0(),
        t = n.task;
      (t && jn(t) && !n.auto
        ? A.push({ k: "dt", t: "📜 Trả nhiệm vụ Dã Tẩu", go: () => Ja("dt") })
        : t &&
          t.need &&
          A.push({ k: "dtp", t: `📜 ${se(t)} ${Li(t)}`, go: () => Ja("dt") }),
        N("misc", "lb") > 0 &&
          !c.sat &&
          r.lvl >= 20 &&
          r.st &&
          r.st.kills < 1 &&
          A.push({ k: "st", t: "🗡 Có Lệnh Bài Sát Thủ", go: () => Ja("st") }));
    },
    av = Object.assign(
      {
        wc: "Thủy Tinh Trắng",
        mys: "Thần Bí Khoáng Thạch",
        lb: "Lệnh Bài Sát Thủ",
        dtbk: "Đại Thành Bí Kíp",
        ldp: "Lệnh Bài Đổi Phái",
        ldt: "Lệnh Bài Dã Tẩu",
        dgt: "Thẻ Đổi Giới Tính",
        rngua: "Rương Ngựa",
        vlmt: "Võ Lâm Mật Tịch",
        ttk: "Tẩy Tủy Kinh",
      },
      Y3,
    ),
    x2 = (s) => av[s] || s,
    mA = 20,
    cr = 40,
    B2 = 20,
    Fa = 2e3,
    G7 = [
      [20, "Lệnh Bài Sát Thủ + 1 đá thuộc tính"],
      [50, "rương đồ 5 dòng + 3 Huyền Tinh + 5 Phúc Duyên"],
      [100, "Quế Hoa Tửu 60 phút + 3 KNB + 10 Phúc Duyên"],
      [200, "Bí Kíp 90 (chưa đủ cấp 75: Tiên Thảo Lộ 60 phút)"],
      [
        500,
        "1 Rương Ngựa + Thủy Tinh Trắng + Thần Bí Khoáng Thạch + đồ 6 dòng + 5 KNB + 20 Phúc Duyên",
      ],
    ],
    K7 = [
      [Fa, "Hoàng Kim Môn Phái"],
      [1e3, "Hoàng Kim dùng chung (Kim Phong, An Bang, Định Quốc…)"],
      [500, "Đại Thành Bí Kíp"],
    ],
    ie = () => cr + (X0().extra || 0),
    sv = [
      "weapon",
      "armor",
      "helm",
      "belt",
      "boot",
      "cuff",
      "amulet",
      "ring",
      "pendant",
    ],
    iv = (s) => (s === "ring" ? "Nhẫn" : S8[s]),
    rv = { killm: 50, elite: 25, boss: 15, gold: 10 },
    _2 = { boss: 1.5, item: 1.5 },
    ov = 80,
    lv = 0.06,
    cv = () => Math.round((300 + r.lvl * r.lvl * 6) * 3),
    dv = () => C(Math.floor(r.lvl / 15), 1, DA),
    R7 = (s) =>
      s.zi == null ||
      (dA(Math.min(r.stage, l0)) === s.zi &&
        ((r.zalt || {})[s.zi] || 0) === (s.za || 0)),
    Li = (s) => (s && s.need ? `${Math.min(s.have, s.need)}/${s.need}` : ""),
    Va = (s, A) =>
      s &&
      !s.set &&
      !s.vio &&
      !s.plv &&
      !s.lock &&
      !s.thanma &&
      (s.r || 0) >= A.minR &&
      wA[s.d] === A.slot &&
      (A.grp == null ||
        A.grp < 0 ||
        (s.mag || []).some((n) => Ke[A.grp][1].includes(H3(W0(n.a))))),
    re = (s) => r.inv.filter((A) => Va(A, s)).sort((A, n) => L0(A) - L0(n))[0],
    fv = (s) => {
      const A = K7.map(([e, a]) => [Math.ceil((s + 1) / e) * e, a]).sort(
          (e, a) => e[0] - a[0] || 0,
        ),
        n = A[0][0],
        t = K7.find(([e]) => n % e === 0);
      return [n, t ? t[1] : A[0][1]];
    },
    hv = [20, 30, 40, 50, 60, 70, 80, 90],
    dr = 150,
    Y7 = 3,
    fr = () => Math.max(20, Math.min(90, Math.floor(r.lvl / 10) * 10)),
    gv = function s(A, n) {
      const t = U7(n),
        e = X7(A, n);
      return ur(n) ? (e + (1 - t) * s(A, n - 1)) / t : e / t;
    },
    qi = function (A, n) {
      let t = 0;
      for (let e = A.enh || 0; e < n; e++) t += gv(A, e);
      return Math.round(t);
    },
    F7 = function (A) {
      return r.gold < A ? (y("Không đủ ngân lượng"), !1) : ((r.gold -= A), !0);
    },
    hr = function (A) {
      return !wr(A) || (A.enh || 0) >= K1 || (r.knb | 0) < p1(A)
        ? null
        : ((r.knb = (r.knb | 0) - p1(A)),
          Math.random() < J7(A)
            ? ((A.enh = (A.enh || 0) + 1), oP(A), !0)
            : (ur(A.enh || 0) && (A.enh--, A.enh || delete A.enh), !1));
    },
    mv = function (A) {
      if (!at(A)) {
        t0();
        return;
      }
      if (!wr(A)) return y("Ngựa không cường hóa được");
      if ((A.enh || 0) >= K1) return;
      if ((r.knb | 0) < p1(A)) return y("Không đủ Kim Nguyên Bảo");
      const n = A.enh || 0,
        t = hr(A);
      (t
        ? (i0(A.enh >= 7 ? "levelup" : "learn"),
          M(`Cường hóa <b>${D(A.n)}</b> lên +${A.enh}`))
        : (i0("use"),
          (A.enh || 0) < n &&
            M(
              `<span class="bad">Cường hóa <b>${D(A.n)}</b> thất bại, tụt về +${A.enh || 0}</span>`,
            )),
        (c.dirty = !0),
        (Y = !0),
        B(),
        M2(A),
        V7(t, A.enh || 0, !t && (A.enh || 0) < n));
    },
    V7 = function (A, n, t) {
      if (!document.getElementById("enhFxCss")) {
        const i = document.createElement("style");
        ((i.id = "enhFxCss"),
          (i.textContent = `
.enhfx{position:absolute;inset:0;pointer-events:none;z-index:50;display:flex;align-items:center;justify-content:center;overflow:hidden}
.enhfx b{font:900 34px/1 serif;letter-spacing:2px;text-shadow:0 0 8px #000,0 2px 0 #000;animation:enhTxt 1.3s ease-out forwards}
.enhfx.ok{background:radial-gradient(circle,rgba(255,214,90,.55) 0,rgba(255,170,0,.18) 35%,transparent 70%);animation:enhFlash 1.3s ease-out forwards}
.enhfx.ok b{color:#ffe27a}
.enhfx.ok i{position:absolute;left:50%;top:50%;width:4px;height:120px;margin:-60px 0 0 -2px;background:linear-gradient(#fff6c0,transparent);transform-origin:50% 100%;animation:enhRay 1s ease-out forwards}
.enhfx.fail{background:radial-gradient(circle,rgba(120,120,120,.45) 0,rgba(60,0,0,.25) 45%,transparent 75%);animation:enhFlash 1.2s ease-out forwards}
.enhfx.fail b{color:#ff6a5a;animation:enhShake .45s linear 2,enhTxt 1.2s ease-out forwards}
.modal-shake{animation:enhShake .4s linear 1}
@keyframes enhFlash{0%{opacity:0}12%{opacity:1}100%{opacity:0}}
@keyframes enhTxt{0%{transform:scale(.4);opacity:0}20%{transform:scale(1.15);opacity:1}35%{transform:scale(1)}80%{opacity:1}100%{transform:translateY(-30px);opacity:0}}
@keyframes enhRay{0%{opacity:0;transform:rotate(var(--r)) scaleY(.2)}25%{opacity:1}100%{opacity:0;transform:rotate(var(--r)) scaleY(1.6)}}
@keyframes enhShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}`),
          document.head.appendChild(i));
      }
      const e =
        (document.getElementById("mBody") || {}).parentElement ||
        document.querySelector(".modal");
      if (!e) return;
      getComputedStyle(e).position === "static" &&
        (e.style.position = "relative");
      const a = document.createElement("div");
      ((a.className = "enhfx " + (A ? "ok" : "fail")),
        (a.innerHTML =
          (A
            ? Array.from(
                { length: n >= 7 ? 16 : 10 },
                (i, o) =>
                  `<i style="--r:${o * (360 / (n >= 7 ? 16 : 10))}deg"></i>`,
              ).join("")
            : "") +
          `<b>${A ? `+${n} THÀNH CÔNG` : "THẤT BẠI"}${t ? `<br><small style="font-size:18px">tụt về +${n}</small>` : ""}</b>`),
        e.appendChild(a),
        A ||
          (e.classList.remove("modal-shake"),
          e.offsetWidth,
          e.classList.add("modal-shake")),
        setTimeout(() => a.remove(), 1400));
    },
    uv = function (A, n, t) {
      const e = { tries: 0, ok: 0, fail: 0, spent: 0, from: A.enh || 0 };
      for (; (A.enh || 0) < n && e.tries < 200;) {
        const a = p1(A);
        if (a > (r.knb | 0) || e.spent + a > t) break;
        const i = hr(A);
        if (i === null) break;
        (e.tries++, (e.spent += a), i ? e.ok++ : e.fail++);
      }
      return (
        e.tries &&
          ((c.dirty = !0),
          (Y = !0),
          M(
            `Cường hóa <b>${D(A.n)}</b>: +${e.from} → +${A.enh || 0} (${e.tries} lần, ${e.fail} thất bại, −${e.spent} KNB)`,
          ),
          B()),
        e
      );
    },
    wv = function (A) {
      if (!Object.values(r.eq).includes(A) || (A.enh || 0) >= K1) return null;
      const n = N0(I0());
      A.enh = (A.enh || 0) + 1;
      const t = N0(I0());
      return (A.enh--, A.enh || delete A.enh, t / Math.max(1, n) - 1);
    },
    pv = function (A, n) {
      const t = new Set(A.mag.filter((a, i) => n.has(i)).map((a) => a.a)),
        e = c.P ? c.P.lucky : 0;
      return A.mag.map((a, i) =>
        n.has(i) ? a : N6(A, i, C(A.lvl + C0(-1, 0), 1, 10), t, e) || a,
      );
    },
    gr = function (A) {
      return (
        pr.uid !== A.uid && (pr = { uid: A.uid, keep: new Set(), cand: null }),
        pr
      );
    },
    Dv = function (A) {
      if (!at(A) || !nf(A)) return;
      const n = gr(A),
        t = Af(A, n.keep.size);
      if (n.keep.size >= A.mag.length) {
        y("Phải để ít nhất 1 dòng tẩy luyện");
        return;
      }
      F7(t) && ((n.cand = pv(A, n.keep)), i0("learn"), B(), M2(A));
    },
    Pv = function (A) {
      const n = gr(A);
      !n.cand ||
        !at(A) ||
        ((A.mag = n.cand),
        delete A.leg,
        (n.cand = null),
        (c.dirty = !0),
        (Y = !0),
        y("Đã nhận dòng mới"),
        B(),
        M2(A));
    },
    mr = function (A, n) {
      const t = Object.assign({}, A, { mag: n }),
        e = X2(A, r.eq);
      if (e) {
        const a = Object.assign({}, r.eq);
        return ((a[e] = t), N0(I0(a)) / Math.max(1, N0(I0())) - 1);
      }
      return L0(t) / Math.max(1, L0(A)) - 1;
    },
    ji = function (A, n) {
      (y(A.msg),
        i0(A.ok ? "learn" : "use"),
        M(D(A.msg)),
        (c.dirty = !0),
        (Y = !0),
        B(),
        n());
    },
    vv = function (A) {
      if (!A.set || A.set.kind !== "platina") return "";
      const n = A.plv || 0;
      if (n >= ga)
        return '<div class="card"><b>Thăng cấp Bạch Kim</b> <small class="dim">Đã tối đa +10</small></div>';
      const t = j4(A),
        e = N("misc", "mys"),
        a = Xa[A.uid] ?? Math.min(t, e),
        i = Kl(A, a);
      return `<div class="card"><b>Thăng cấp Bạch Kim</b> <small class="dim">+${n} → +${n + 1} · ${A.pv3 ? `6 dòng tăng theo cấp${n + 1 >= 5 && n + 1 <= 9 ? ' · <b class="cp">tung lại 2 dòng Bạch Kim</b>' : n + 1 < 5 ? " · +5 mở 2 dòng Bạch Kim" : ""}` : `mỗi cấp +${Math.round(L8 * 100)}% thuộc tính gốc`} · phí ${j(c1)} lượng</small>
    <div class="bttrow"><label><img src="img/ep/mys.png" alt=""> Thần Bí Khoáng Thạch <small class="dim">(cần ${t} viên cho 100% · có ${e})</small> <input type="number" min="0" max="${e}" value="${a}" id="fMys" style="width:52px"></label></div>
    <div class="btnrow"><b class="${i >= 1 ? "cp" : i >= 0.5 ? "" : "cn"}">Tỉ lệ thành công ${Math.round(i * 100)}%</b><button class="btn sm" id="fMysAll">Đủ 100%</button><button class="btn" id="fPlat" ${i > 0 && r.gold >= c1 ? "" : "disabled"}>Thăng cấp</button></div>
    <small class="dim">Thất bại mất số đá đã bỏ + phí, giữ cấp cũ. Thần Bí Khoáng Thạch rơi từ Trùm Hoàng Kim và tầng trùm Thông Thiên Tháp.</small></div>`;
    },
    M2 = function s(A) {
      const n = A.enh || 0,
        t = n >= K1,
        e = wv(A),
        a = gr(A),
        i = t
          ? ""
          : `<select id="fTgt">${Array.from(
              { length: K1 - n },
              (g, f) => n + 1 + f,
            )
              .map(
                (g) =>
                  `<option value="${g}" ${g === Math.min(K1, n + 3) ? "selected" : ""}>+${g} (≈${X(qi(A, g))})</option>`,
              )
              .join("")}</select>`,
        o = a.keep.size,
        l = Af(A, o),
        d = (g) =>
          g
            .map(
              (f, m) =>
                `<div class="${m % 2 ? "h" : "m"}">${D(
                  RA(
                    W0(f.a),
                    f.p.map((w) => (w === -1 ? 0 : w)),
                  ),
                )}${m % 2 ? " (ẩn)" : ""}</div>`,
            )
            .join(""),
        h = nf(A)
          ? a.cand
            ? (() => {
                const g = mr(A, a.cand),
                  f = g > 5e-4 ? "cp" : g < -5e-4 ? "cn" : "dim";
                return `<div class="forgecmp"><div class="sl"><b>Dòng cũ</b>${d(A.mag)}</div><div class="sl"><b>Dòng mới</b>${d(a.cand)}</div></div>
      <p class="small">${Object.values(r.eq).includes(A) ? "Sức mạnh nhân vật" : "Chỉ số món"} nếu nhận: <b class="${f}">${Z2(g)}</b></p>
      <div class="btnrow"><button class="btn" id="fRrOk">Nhận dòng mới</button><button class="btn" id="fRrNo">Giữ dòng cũ</button></div>`;
              })()
            : `<small>Đánh dấu dòng muốn <b>giữ lại</b> (mỗi dòng +${Z7 * 100}% giá). Kết quả hiện để so sánh trước khi nhận.</small>
      ${A.mag
        .map(
          (g, f) =>
            `<label class="keepl"><input type="checkbox" data-keep="${f}" ${a.keep.has(f) ? "checked" : ""}><span class="${f % 2 ? "h" : "m"}">${D(
              RA(
                W0(g.a),
                g.p.map((m) => (m === -1 ? 0 : m)),
              ),
            )}${f % 2 ? " (ẩn)" : ""}</span></label>`,
        )
        .join("")}
      <div class="btnrow"><button class="btn red" id="fRe" ${r.gold >= l && o < A.mag.length ? "" : "disabled"}>Tẩy luyện (${j(l)} lượng${o ? `, giữ ${o} dòng` : ""})</button></div>`
          : '<small class="dim">Đồ trắng / đồ bộ / đồ Tím không tẩy luyện được</small>';
      J(
        `<h3>Rèn đồ <small>${r.knb | 0} KNB · ${j(r.gold)} lượng</small></h3>${en(A)}
    ${
      wr(A)
        ? `    <div class="card"><b>Cường hóa</b> <small class="dim">+${n} / +${K1} · mỗi cấp +${Math.round(C3 * 100)}% thuộc tính gốc, +${Math.round(O3 * 100)}% các dòng thuộc tính</small><br>
      ${t ? '<small class="dim">Đã cường hóa tối đa</small>' : `<small>Giá ${p1(A)} KNB (có ${r.knb | 0}) · thành công ${Math.round(J7(A) * 100)}% · ${ur(n) ? '<b class="cn">thất bại tụt về +' + (n - 1) + "</b>" : "thất bại chỉ mất KNB"}${e != null ? ` · sức mạnh <b class="cp">${Z2(e)}</b>` : ""}</small>`}
      <div class="btnrow"><button class="btn" id="fEnh" ${t || (r.knb | 0) < p1(A) ? "disabled" : ""}>Cường hóa lên +${n + 1}</button></div>
      ${t ? "" : `<div class="btnrow"><small>Liên tục tới</small>${i}<button class="btn" id="fEnhTo" ${(r.knb | 0) < p1(A) ? "disabled" : ""}>Cường hóa liên tục</button></div><small class="dim">≈ KNB kỳ vọng. Từ +${W7} trở lên thất bại tụt 1 cấp. Dừng khi đạt mức hoặc hết KNB.</small>`}</div>`
        : '<div class="card"><b>Cường hóa</b><br><small class="dim">Ngựa không cường hóa được</small></div>'
    }
    <div class="card"><b>Tẩy luyện</b> <small class="dim">gieo lại ${(A.mag || []).length} dòng thuộc tính</small><br>${h}</div>
    ${w0() && !A.set && A.d >= 0 && A.d <= 9 && (br(A) || A.vio) ? `<div class="card"><b>💎 Lò Ép Đồ</b> <small class="dim">${A.vio ? "khảm đá thuộc tính vào phôi Huyền Tinh này" : "lấy thuộc tính thành đá, hoặc chế tạo thành phôi Huyền Tinh"}</small><div class="btnrow"><button class="btn" id="fEp">Mở Lò Ép Đồ</button></div></div>` : ""}${vv(A)}`,
        () => {
          const g = u("#fEnh");
          g && (g.onclick = () => mv(A));
          const f = u("#fEnhTo");
          f &&
            (f.onclick = () => {
              if (!at(A)) return t0();
              const _ = uv(A, +u("#fTgt").value, r.knb | 0);
              (y(
                _.tries
                  ? `+${_.from} → +${A.enh || 0}: ${_.tries} lần, ${_.fail} thất bại, −${_.spent} KNB`
                  : "Không đủ Kim Nguyên Bảo",
              ),
                i0(_.ok ? "learn" : "use"),
                s(A),
                _.tries &&
                  V7((A.enh || 0) > _.from, A.enh || 0, (A.enh || 0) < _.from));
            });
          const m = u("#fRe");
          m && (m.onclick = () => Dv(A));
          const w = u("#fRrOk"),
            p = u("#fRrNo");
          (w && (w.onclick = () => Pv(A)),
            p &&
              (p.onclick = () => {
                ((a.cand = null), y("Giữ dòng cũ"), s(A));
              }),
            document.querySelectorAll("#mBody [data-keep]").forEach(
              (_) =>
                (_.onchange = () => {
                  const E = +_.dataset.keep;
                  (_.checked ? a.keep.add(E) : a.keep.delete(E), s(A));
                }),
            ));
          const P = u("#fHtLo");
          P && (P.onclick = () => zi());
          const v = u("#fEp");
          v &&
            (v.onclick = () =>
              oe(A.vio ? "kham" : lf(A) ? "hut" : "phoi", A.uid));
          const H = u("#fPlat");
          H &&
            (H.onclick = () => {
              const _ = nw(A, Xa[A.uid]);
              (delete Xa[A.uid], ji(_, () => s(A)));
            });
          {
            const _ = u("#fMys");
            _ &&
              (_.onchange = () => {
                ((Xa[A.uid] = C(+_.value | 0, 0, N("misc", "mys"))), s(A));
              });
            const E = u("#fMysAll");
            E &&
              (E.onclick = () => {
                (delete Xa[A.uid], s(A));
              });
          }
        },
      );
    },
    bv = function (A, n) {
      const t = { tries: 0, ok: 0, spent: 0, items: new Set() };
      for (let e = 0; e < 600; e++) {
        const a = tf()
          .filter((l) => (l.enh || 0) < A)
          .sort((l, d) => p1(l) - p1(d))[0];
        if (!a || p1(a) > (r.knb | 0) || t.spent + p1(a) > n) break;
        const i = p1(a),
          o = hr(a);
        if (o === null) break;
        (t.tries++, (t.spent += i), o && (t.ok++, t.items.add(a)));
      }
      return (
        t.tries &&
          ((c.dirty = !0),
          (Y = !0),
          M(
            `Cường hóa hàng loạt: ${t.tries} lần, ${t.ok} thành công, −${t.spent} KNB`,
          ),
          B()),
        t
      );
    },
    yv = function s() {
      const A = tf(),
        n = A.reduce((e, a) => e + qi(a, Math.max(dn.tgt, a.enh || 0)), 0),
        t = Math.floor(((r.knb | 0) * dn.pct) / 100);
      J(
        `<h3>Cường hóa hàng loạt <small>${r.knb | 0} KNB</small></h3>
    <p class="desc">Nâng mọi món đang mặc (trừ ngựa) lên mức mục tiêu, mỗi bước chọn món rẻ nhất trước. Từ +6 trở lên thất bại tụt 1 cấp.</p>
    <div class="card lootf"><div class="row">Mục tiêu <select id="bfT">${Array.from(
      { length: K1 },
      (e, a) => a + 1,
    )
      .map(
        (e) =>
          `<option value="${e}" ${e === dn.tgt ? "selected" : ""}>+${e}</option>`,
      )
      .join("")}</select>
      · ngân sách <select id="bfP">${[25, 50, 75, 100].map((e) => `<option value="${e}" ${e === dn.pct ? "selected" : ""}>${e}%</option>`).join("")}</select> (${t} KNB)</div>
      <div class="stats">${A.map((e) => `<span>${D(e.n)}</span><span>+${e.enh || 0}${(e.enh || 0) < dn.tgt ? ` → +${dn.tgt} ≈${X(qi(e, dn.tgt))}` : " ✔"}</span>`).join("") || '<span class="dim">Chưa mặc trang bị</span><span></span>'}</div>
      <p class="small">KNB kỳ vọng tổng: <b>${n}</b> KNB${n > t ? " (vượt ngân sách: sẽ dừng giữa chừng)" : ""}</p>
      <div class="btnrow"><button class="btn" id="bfGo" ${n > 0 && t > 0 ? "" : "disabled"}>Bắt đầu</button></div></div>`,
        () => {
          ((u("#bfT").onchange = (e) => {
            ((dn.tgt = +e.target.value), s());
          }),
            (u("#bfP").onchange = (e) => {
              ((dn.pct = +e.target.value), s());
            }),
            (u("#bfGo").onclick = () => {
              const e = bv(dn.tgt, t);
              (y(
                e.tries
                  ? `${e.tries} lần, ${e.ok} thành công, −${e.spent} KNB`
                  : "Không đủ Kim Nguyên Bảo",
              ),
                i0(e.ok ? "learn" : "use"),
                F(),
                s());
            }));
        },
      );
    },
    zi = function s() {
      const A = Object.keys(T0().shard),
        n = Object.values(r.eq)
          .filter((i) => i && qt(i))
          .concat(r.inv.filter(qt))
          .sort((i, o) => !Xe(o) - !Xe(i)),
        t = (i) => {
          const o =
            S.sets.gold.find((l) => l.n === i) ||
            S.sets.gold.find(
              (l) => l.ic && (l.n.endsWith(" " + i) || l.n.includes(i)),
            );
          return o && o.ic ? o.ic : "img/ep/box3.png";
        },
        e = (i, o, l) =>
          `<span class="hkc ${i ? "ok" : "no"}">${o ? `<img src="${o}" alt="">` : ""}${l}</span>`,
        a = TA() >= Ms;
      J(
        `<h3>Lò Hoàng Kim <small>${j(r.gold)} lượng</small></h3><div class="hkx">
    ${w0() ? '<div class="hkbar"><img src="img/ep/ht.png" alt=""><span><b>Huyền Tinh · đá thuộc tính · đồ Tím</b><small>luyện, thăng cấp Huyền Tinh, lấy thuộc tính, chế phôi, khảm nạm</small></span><button class="u2buy" id="htEp">Lò Ép Đồ</button></div>' : ""}
    <div class="hksec">Mảnh Hoàng Kim <small>rơi từ trùm · đủ mảnh ghép thành món</small></div>
    ${
      A.length
        ? `<div class="u2cards hkcards">${A.map((i) => {
            const o = N("shard", i),
              l = _A[i],
              d = o >= l;
            return `<div class="u2card${d ? " hkok" : ""}"><div class="u2ct" title="${D(i)}">${D(i)}</div><div class="u2cb"><img src="${t(i)}" alt=""><div class="hkp"><div class="hkpb"><i style="width:${Math.min(100, (o / l) * 100)}%"></i></div><small><b class="${d ? "cp" : ""}">${o}</b> / ${l} mảnh${d && o >= l * 2 ? ` · ghép được ${Math.floor(o / l)}` : ""}</small></div></div>
        <div class="u2cf"><button class="u2buy" data-sh="${D(i)}" ${d ? "" : "disabled"}>Ghép</button><input type="number" class="hkn" data-shpn="${D(i)}" min="1" max="${o}" value="${o}" title="Số mảnh đóng gói"><button class="u2buy x" data-shp="${D(i)}" title="Đóng gói số mảnh đã chọn thành 1 món trong hành trang để gửi thư / bán Chợ">📦 Gói</button></div></div>`;
          }).join("")}</div>`
        : '<p class="dim small hkempty">Chưa có mảnh Hoàng Kim.</p>'
    }
${
  cs()
    ? `    <div class="hksec">Chế Bạch Kim <small>thành công 100% · nhận Bạch Kim +0 (không giữ cường hóa)</small></div>
    <div class="hkreq">${e(!0, "", `Hoàng Kim +${ma}`)}${e(N("misc", "mys") >= A2, "img/ep/mys.png", `Thần Bí ${N("misc", "mys")}/${A2}`)}${e(N("ht", jt) >= 1, "img/ep/ht.png", `Huyền Tinh c${jt} ${N("ht", jt)}/1`)}${e(r.gold >= c1, "", j(c1))}${e(a, "", `Mặc: cấp ${Ms}${a ? "" : ` (hiện ${TA()})`}`)}</div>
    ${
      n
        .map((i) => {
          const o = gs(i.n),
            l = Xe(i),
            d = Object.values(r.eq).includes(i),
            h = i.enh || 0;
          return `<div class="hkrow${l ? "" : " ready"}"><img class="hki" src="${i.ic || t(i.n)}" alt=""><div class="hkm"><div><b style="color:${b0[4]}">${D(i.n)}</b> <span class="hke ${h >= ma ? "ok" : ""}">+${h}</span>${d ? ' <span class="hkw">đang mặc</span>' : ""}</div>
        <div class="hkto">➜ <span style="color:${b0[5]}">${D(o ? o.n : "?")}</span></div>${l ? `<small class="cn">${D(l)}</small>` : ""}</div><button class="u2buy" data-pm="${i.uid}" ${l ? `disabled title="${D(l)}"` : ""}>Chế</button></div>`;
        })
        .join("") ||
      '<p class="dim small hkempty">Chưa có món Hoàng Kim nào chế được Bạch Kim (41 món theo VNG).</p>'
    }
    <p class="dim small hknote">Món đang mặc chế xong tự mặc lại. Thăng cấp +1 → +10: bấm vào món Bạch Kim ở Rèn đồ.</p>`
    : ""
}</div>`,
        () => {
          const i = u("#htEp");
          (i && (i.onclick = () => oe("tl")),
            document
              .querySelectorAll("#mBody [data-sh]")
              .forEach((o) => (o.onclick = () => ji(yl(o.dataset.sh), s))),
            document
              .querySelectorAll("#mBody [data-shp]")
              .forEach(
                (o) =>
                  (o.onclick = () =>
                    ji(
                      Wu(
                        o.dataset.shp,
                        +(
                          (
                            document.querySelector(
                              `#mBody [data-shpn="${CSS.escape(o.dataset.shp)}"]`,
                            ) || {}
                          ).value || 0
                        ),
                      ),
                      s,
                    )),
              ),
            document.querySelectorAll("#mBody [data-pm]").forEach(
              (o) =>
                (o.onclick = () => {
                  const l = n.find((d) => d.uid === +o.dataset.pm);
                  l && ji(xl(l), s);
                }),
            ));
        },
      );
    },
    X7 = (s, A) => 1 + A,
    U7 = (s) => Math.max(0.1, 1 - 0.1 * s),
    p1 = (s) => X7(s, s.enh || 0),
    J7 = (s) => U7(s.enh || 0),
    W7 = 6,
    ur = (s) => s >= W7,
    kv = (s) =>
      Math.round(
        (500 + s.lvl * 400) *
          (1 + (s.mag || []).length * 0.5) *
          (1 + r.lvl / 15),
      ),
    Z7 = 0.75,
    Af = (s, A) => Math.round(kv(s) * (1 + Z7 * A)),
    nf = (s) => !s.set && !s.vio && !s.thanma && (s.mag || []).length > 0,
    wr = (s) => !!s && s.d !== 10,
    pr = { uid: 0, keep: new Set(), cand: null },
    Xa = {},
    dn = { tgt: 5, pct: 50 },
    tf = () => G1.map(([s]) => r.eq[s]).filter((s) => s && s.d !== 10),
    ef = function (A) {
      const n = BA(A),
        t =
          n.lvl < Ue
            ? ` · chạm: 3 viên → c${n.lvl + 1} (${et(Nt(n.lvl))}, ${j(lA.up)} lượng)`
            : "";
      return `<button class="it ep-st" data-st="${A}" title="${D(nt(A) + " · " + $v(n.a) + " · cấp " + n.lvl + t)}"><img src="${vr(n.place)}" alt=""><i>c${n.lvl}</i><em class="ep-pl"${n.s >= 0 ? ` style="color:${m0[n.s]}"` : ""}>${n.place + 1}</em><b class="ep-n">×${N("ore", A)}</b></button>`;
    },
    Dr = function () {
      const A = df();
      A.includes(n0.ht) || (n0.ht = A[A.length - 1] || 0);
    },
    Qi = function (A) {
      const n = df();
      return (
        A && Dr(),
        `<div class="ep-ht">${n.map((t) => (A ? `<button class="ep-htc${n0.ht === t ? " ep-on" : ""}" data-ht="${t}" title="Huyền Tinh Khoáng Thạch cấp ${t} · giá trị ${j(cA[t])}"><img src="img/ep/ht.png" alt=""><i>c${t}</i><b>×${N("ht", t)}</b></button>` : `<span class="ep-htc" title="Huyền Tinh Khoáng Thạch cấp ${t}"><img src="img/ep/ht.png" alt=""><i>c${t}</i><b>×${N("ht", t)}</b></span>`)).join("") || '<small class="dim">Chưa có Huyền Tinh (hạ tinh anh / trùm, Dã Tẩu, hoặc luyện ở thẻ Tinh luyện)</small>'}</div>`
      );
    },
    af = function () {
      const A = (n, t) => {
        const e = Math.min(9, ys(n));
        return `<label class="small" style="display:inline-flex;align-items:center;gap:4px;margin-right:10px;white-space:nowrap">${t} <select data-aux="${n}" style="width:auto;min-width:44px;display:inline-block" ${St.on && e ? "" : "disabled"}>${Array.from({ length: e + 1 }, (a, i) => `<option value="${i}" ${(St[n] | 0) === i ? "selected" : ""}>${i}</option>`).join("")}</select> <span class="dim">/ ${ys(n)}</span></label>`;
      };
      return `<div class="small" style="margin:4px 0"><label><input type="checkbox" id="epAux" ${St.on ? "checked" : ""} ${hw() ? "" : "disabled"}> Phụ liệu</label> <span class="dim">(cộng giá trị: Thủy Tinh ${j(We.wc)} · Thần Bí K.T ${j(We.mys)} · Phúc Duyên Lộ = ${bs} Phúc Duyên ${j(We.fd)}; giảm dần khi vượt giá trị nguyên liệu chính)</span><br>
    ${A("wc", "Thủy Tinh")}${A("mys", "Thần Bí K.T")}${A("fd", "Phúc Duyên Lộ")}</div>`;
    },
    xv = function () {
      return `<div class="dtabs">${[
        ["tl", "Tinh luyện"],
        ["hut", "Lấy thuộc tính"],
        ["phoi", "Chế tạo phôi"],
        ["kham", "Khảm nạm"],
        ["box", `Kho Rèn (${s0().length})`],
      ]
        .map(
          ([n, t]) =>
            `<button data-et="${n}" class="${n0.tab === n ? "on" : ""}">${t}</button>`,
        )
        .join("")}</div>`;
    },
    Pr = function (A) {
      return `<div class="idet"><div class="pic r${A.r}">${A.ic ? `<img src="${D(A.ic)}" alt="">` : ""}</div><div><h4 style="color:${b0[A.r]}">${D(A.n)}${A.vio ? ` <small class="vtag">Tím ${A.mag.length}/${B1(A)}</small>` : ""}</h4><small class="dim">${D(S.items[A.d].n)} · cấp ${A.lvl}${A.s >= 0 && A.s < 5 ? ` · <span style="color:${m0[A.s]}">hệ ${d0[A.s]}</span>` : ""}${s0().includes(A) ? " · trong Kho Rèn" : Object.values(r.eq).includes(A) ? " · đang mặc" : ""}</small></div></div>`;
    },
    Bv = function () {
      const A = Ki(N4),
        n = Object.keys(T0().ht)
          .map(Number)
          .sort((o, l) => o - l);
      n0.fuse = n0.fuse.filter((o) => A.some((l) => l.uid === o));
      const t = A.filter((o) => n0.fuse.includes(o.uid)),
        a = (t.length === 3 ? wl(t) : "x") ? null : mw(t),
        i = U1.filter((o) => !t.some((l) => l.d === o)).map((o) => gw[o]);
      return `<div class="card"><b>Luyện Huyền Tinh Khoáng Thạch</b> <small class="dim">1 nhẫn + 1 dây chuyền + 1 ngọc bội thường + ${j(XA())} lượng → Huyền Tinh cấp theo giá trị (số dòng mỗi món: 0 dòng ${j(E4[0])} … 6 dòng ${j(E4[6])}; c1 ${j(cA[1])}, c2 ${j(cA[2])}, c3 ${j(cA[3])}, c4 ${j(cA[4])}, c5 ${j(cA[5])})</small>
      <div class="invgrid ep-grid" id="epFuseG">${A.map((o) => T1(o).replace('class="it', `class="it${n0.fuse.includes(o.uid) ? " ep-on" : ""}`)).join("")}</div>${A.length ? "" : '<small class="dim">Không có nhẫn / dây chuyền / ngọc bội chưa mặc, chưa khóa</small>'}
      <div class="small">${a ? `Giá trị ${j(a.src)} → ${vs(a.probs, (o) => "c" + (o + 1))}${Ri(1 - a.sum)}` : `<span class="dim">Chọn thêm: ${i.join(", ") || "—"}</span>`}</div>
      <div class="btnrow"><button class="btn" id="epFuse" ${a && r.gold >= XA() ? "" : "disabled"}>Luyện (${t.length}/3)</button><button class="btn" id="epFuseAuto" ${Ve(wt()).length === 3 && r.gold >= XA() ? "" : "disabled"}>Tự chọn 3 món thừa</button></div></div>
    <div class="card"><b>Thăng cấp Huyền Tinh</b> <small class="dim">3 viên cùng cấp + ${j(lA.up)} lượng → 1 viên cấp +1 · thất bại mất 1 viên</small>
      ${n.map((o) => `<div class="ep-row"><span class="ep-htc"><img src="img/ep/ht.png" alt=""><i>c${o}</i><b>×${N("ht", o)}</b></span><button class="btn sm" data-up="${o}" ${N("ht", o) >= 3 && o < DA && r.gold >= lA.up ? "" : "disabled"}>${o < DA ? `Thăng lên cấp ${o + 1} · ${et(Nt(o))}` : "Tối đa"}</button></div>`).join("") || '<small class="dim">Chưa có Huyền Tinh</small>'}</div>
    <div class="card"><b>Thăng cấp đá thuộc tính</b> <small class="dim">ở thẻ Kho Rèn: chạm viên đá (3 viên cùng loại, cùng cấp + ${j(lA.up)} → +1 cấp; ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((o) => `c${o}→${o + 1} ${et(Nt(o))}`).join(", ")}; thất bại mất 1 viên)</small></div>`;
    },
    sf = function () {
      const A = Ir(),
        n = (t, e, a, i = (o) => o) =>
          `<select id="${t}">${e.map((o) => `<option value="${o}" ${a === o ? "selected" : ""}>${i(o)}</option>`).join("")}</select>`;
      return `<div class="card"><label><input type="checkbox" id="ahOn" ${A.on ? "checked" : ""}> <b>⚗ Tự rút thông minh</b></label> <button class="btn sm" id="ahNow" ${A.on ? "" : "disabled"}>Rút ngay</button>
    <div class="row small">Dòng từ cấp ${n("ahLv", [1, 2, 3, 4, 5, 6, 7], A.minLv)} · Huyền Tinh tối đa c${n("ahHt", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], A.htMax)} · tối đa ${n("ahCap", [1, 2, 3, 5, 10], A.cap)} viên / loại · giữ ${n("ahRes", [0, 1e4, 5e4, 2e5, 1e6], A.reserve, X)} lượng</div>
    <div class="dim small">Rút đồ xanh không được bộ lọc giữ: ưu tiên dòng phôi Tím đang cần, rồi dòng cấp cao. Không dùng phụ liệu. Không đụng đồ khóa / bộ / Tím / đang mặc / nâng cấp (▲ △).</div></div>`;
    },
    _v = function () {
      const A = Ki(lf).sort((l, d) => d.r - l.r || d.lvl - l.lvl);
      let n = ce(n0.sel);
      if (((!n || !A.includes(n)) && (n = A[0]), !n))
        return (
          sf() +
          '<p class="dim">Không có đồ xanh trong hành trang hoặc Kho Rèn.</p>'
        );
      n0.sel = n.uid;
      const t = n0.ht,
        e = fs(),
        a = ks(n),
        i = n.lock
          ? "Món đang khóa 🔒 — mở khóa ở chi tiết món"
          : t
            ? ""
            : "Cần Huyền Tinh",
        o = n.mag
          .map((l, d) => {
            const h = L4(n, d),
              g = h && t ? Dl(n, d, t, e) : null,
              f = Math.min(d, x1 - 1);
            return `<div class="ep-opt">${h ? `<span class="it ep-st"><img src="${vr(f)}" alt=""><i>c${xs(l)}</i></span>` : '<span class="it ep-st"></span>'}<span class="${d % 2 ? "h" : "m"}">${ff(l)}<br><small class="dim">${h ? `dòng cấp ${xs(l)} (${j(z0[ps(l)].base)}) → ${Et[f]}${f % 2 ? ` hệ ${d0[n.s] || "—"}` : ""}${g ? `: ${vs(g.probs, (m) => "c" + (m + 1))}${Ri(1 - g.sum)}` : ""}` : "không lấy được"}</small></span>
      <span></span><span class="btnrow">${h && !i ? `<button class="btn sm" data-hut="${d}:${f}" ${r.gold >= a ? "" : "disabled"} title="${D(Et[f])}">Lấy</button>` : ""}</span></div>`;
          })
          .join("");
      return (
        sf() +
        `<div class="card">${Pr(n)}<small class="dim">Lấy 1 dòng → 1 viên đá đúng vị trí dòng (dòng ẩn: đá mang hệ ${d0[n.s] || "—"}) · món mất · ${j(a)} lượng + 1 Huyền Tinh · cấp đá theo giá trị dòng + Huyền Tinh${El(e) ? " + phụ liệu" : ""}</small>
      <div class="dim small">Chọn Huyền Tinh (cấp cao: đá cấp cao hơn):</div>${Qi(!0)}${af()}${i ? `<div class="cn small">${i}</div>` : ""}${o}</div>
    <h3>Đồ có thể lấy thuộc tính <small>${A.length} món</small></h3>${yr(A, n)}`
      );
    },
    Mv = function () {
      const A = Ki(br).sort((o, l) => l.lvl - o.lvl || o.r - l.r);
      let n = ce(n0.sel);
      (!n || !A.includes(n)) && (n = A[0]);
      const t = (o) => {
          const l = uw(o);
          return l.length ? `${l[0][0]} dòng · ${l[0][1]}%` : "thất bại";
        },
        e = (o) => {
          const l = Ll(o);
          return (vs(l.probs, (d) => `${d + 1} dòng`) || "") + Ri(1 - l.sum);
        },
        a = `<p class="desc">Trang bị trắng / xanh (không gồm trang sức) + 1 Huyền Tinh + ${j(lA.phoi)} lượng → phôi Tím 1–6 khung (trang bị thường không tính giá trị; Huyền Tinh c1 không đủ → thất bại, mất cả trang bị).</p>
    <div class="chips">${[1, 2, 3, 4, 5].map((o) => `<span class="chip2${n0.ht && Math.min(n0.ht, 5) === o ? " on" : ""}"><span class="dim">c${o}${o === 5 ? "+" : ""}</span>&nbsp;<b>${t(o)}</b></span>`).join("")}</div>`;
      if (!n) return a + '<p class="dim">Không có đồ trắng / xanh phù hợp.</p>';
      n0.sel = n.uid;
      const i = n.lock
        ? "Món đang khóa 🔒"
        : n0.ht
          ? r.gold < lA.phoi
            ? "Không đủ ngân lượng"
            : ""
          : "Cần Huyền Tinh";
      return `${a}<div class="card">${Pr(n)}${Qi(!0)}${n0.ht ? `<div class="small">Huyền Tinh c${n0.ht}: ${e(n0.ht)}</div>` : ""}
      <div class="btnrow"><button class="btn" id="epPhoi" ${i ? "disabled" : ""}>Chế tạo phôi${n0.ht ? ` · c${n0.ht} → ${t(n0.ht)}` : ""}</button></div>${i ? `<div class="cn small">${i}</div>` : ""}</div>
    <h3>Chọn trang bị <small>${A.length} món</small></h3>${yr(A, n)}`;
    },
    rf = function () {
      const A = Ki(le)
        .concat(Object.values(r.eq).filter(le))
        .sort(
          (d, h) =>
            (h.mag || []).length - (d.mag || []).length || h.lvl - d.lvl,
        );
      let n = ce(n0.sel);
      (!n || !n.vio) && (n = A[0]);
      const t =
        yr(A, n) +
        (A.length
          ? ""
          : '<p class="dim small">Chưa có phôi Huyền Tinh: sang thẻ <b>Chế tạo phôi</b>.</p>');
      if (!n) return `<h3>Chọn phôi</h3>${t}`;
      ((n0.sel = n.uid), Dr());
      const e = (n.mag || []).length,
        a = B1(n),
        i = n0.ht ? O4(n, n0.ht) : [],
        o = Array.from({ length: a }, (d, h) => {
          const g = `<b class="ep-no">${h + 1}</b><small class="dim">${h % 2 ? "ẩn" : "hiện"}</small>`;
          if (h < e) {
            const f = n.mag[h];
            return `<div class="ep-slot done">${g}<img src="${vr(h)}" alt=""><span class="vio">${ff(f)}</span><small class="dim">${S4(f) ? "c" + S4(f) : ""}</small></div>`;
          }
          return h === e
            ? `<div class="ep-slot next">${g}<span class="cp">◀ cần ${D(Et[h] || "đá")}${h % 2 ? ` hệ ${d0[n.s]}` : ""}</span></div>`
            : `<div class="ep-slot">${g}<span class="dim">${D(Et[h] || "đá")} · trống</span></div>`;
        }).join(""),
        l = i.length
          ? i
              .map(
                (d, h) =>
                  `<div class="ep-opt">${ef(d.key)}<span><b>${D(d.txt)}</b><br><small class="dim">${D(nt(d.key))} c${BA(d.key).lvl} + Huyền Tinh c${d.ht} → ${vs(d.probs, (g) => "c" + z0[d.js[g]].lvl)}${Ri(d.fail)}</small></span><small class="${d.gain > 5e-4 ? "cp" : "dim"}">${Z2(d.gain)}</small><button class="btn sm" data-ep="${h}">Khảm</button></div>`,
              )
              .join("")
          : `<p class="dim small">Không có ${D(Et[Math.min(e, x1 - 1)])} hợp món này (đúng vị trí dòng ${e + 1}, thuộc tính gắn được vào ${D(S.items[n.d].n)}, hợp hệ ${d0[n.s] || "—"}, chưa trùng thuộc tính đã có), thiếu Huyền Tinh hoặc ngân lượng. Lấy thuộc tính từ đồ xanh để có đá.</p>`;
      return `<div class="card ep-main">${Pr(n)}<div class="ep-slots">${o}</div>
      <div class="dim small">Huyền Tinh dùng khi khảm (cấp cao: dòng cấp cao hơn, ít thất bại hơn):</div>${Qi(!0)}${af()}
      <div class="btnrow">${e ? "" : `<button class="btn red" id="epSell" ${jl(n) ? "" : "disabled"}>Bán (+${j(y0(n))} lượng)</button>`}</div>
      <div class="dim small">Mỗi lần khảm: 1 đá đúng dòng + 1 Huyền Tinh + ${j(lA.kham)} lượng · giá trị phôi ${j(Math.round(fw(n)))} + Huyền Tinh + đá (+ phụ liệu) → cấp dòng · thất bại mất đá, Huyền Tinh, phụ liệu (giữ phôi) · khảm lần lượt từng dòng.</div></div>
    <h3>Đá cho dòng ${Math.min(e + 1, a)}</h3>${e < a ? l : '<p class="dim">Đã đủ dòng</p>'}
    <h3>Chọn phôi <small>${A.length} món</small></h3>${t}`;
    },
    Hv = function () {
      const A = Object.keys(T0().ore).sort(
          (i, o) => BA(i).place - BA(o).place || BA(o).lvl - BA(i).lvl,
        ),
        n = Array.from({ length: x1 }, (i, o) =>
          A.filter((l) => BA(l).place === o),
        ),
        t = s0(),
        e = r.inv.filter(cf),
        a = t.filter((i) => U1.includes(i.d)).length;
      return `<div class="card"><b>Đá thuộc tính</b> <small class="dim">${A.reduce((i, o) => i + N("ore", o), 0)} viên · chạm đá để thăng cấp (3 viên cùng loại → +1 cấp, ${j(lA.up)} lượng, thất bại mất 1 viên) · số màu = hệ của đá dòng ẩn</small>
      <button class="btn sm" id="epOreAll" style="margin-left:6px">${Gi().length ? "Ẩn tất cả" : "Hiện tất cả"}</button>
      ${n
        .map((i, o) => {
          const l = Gi().includes(o),
            d = i.reduce((g, f) => g + N("ore", f), 0),
            h = i.length ? Math.max(...i.map((g) => BA(g).lvl)) : 0;
          return `<div class="ep-row"><button class="ep-no ep-otg" data-otg="${o}" style="min-width:150px">${l ? "▾" : "▸"} ${o + 1}. ${D(Et[o])}<br><small class="dim">${d} viên${h ? " · cao nhất c" + h : ""}</small></button><div class="ep-stones${l ? "" : " ep-hide"}">${i.map((g) => ef(g)).join("") || '<small class="dim">—</small>'}</div></div>`;
        })
        .join("")}</div>
    <div class="card"><b>Huyền Tinh</b>${Qi(!1)}<div class="ep-ht"><span class="ep-htc" title="Thủy Tinh"><img src="img/ep/wc.png" alt=""><b>×${N("misc", "wc")}</b></span><span class="ep-htc" title="Phúc Duyên"><img src="img/ep/fd.png" alt=""><b>${Q().fd || 0}</b></span><span class="ep-htc" title="Thần Bí Khoáng Thạch"><img src="img/ep/mys.png" alt=""><b>×${N("misc", "mys")}</b></span></div><small class="dim">Phụ liệu (Lấy thuộc tính / Khảm nạm): Thủy Tinh · Phúc Duyên (${bs} điểm = 1 Phúc Duyên Lộ) · Thần Bí Khoáng Thạch</small></div>
    <div class="card"><b>Phôi · đồ lấy thuộc tính · trang sức luyện Huyền Tinh</b> <small class="dim">${t.length}/${A1} · không chiếm hành trang · chạm món để lấy ra</small>
      <div class="btnrow"><button class="btn sm" id="epIn" ${e.length && t.length < A1 ? "" : "disabled"}>Cất ${e.length} món từ hành trang</button><button class="btn sm" id="epOutAll" ${t.length ? "" : "disabled"}>Lấy hết ra</button></div>
      <div class="dim small">Cất: phôi Huyền Tinh chưa đủ dòng · nhẫn / dây chuyền / ngọc bội không tốt hơn đồ đang mặc (${a} trong rương, dùng ở thẻ Tinh luyện) · đồ trắng · đồ xanh không khớp bộ lọc. Món khóa 🔒 không cất.</div>
      <div class="invgrid ep-grid" id="epBoxG">${t.map(T1).join("")}</div>
      <div class="btnrow"><button class="btn sm" id="epToStash" ${t.length ? "" : "disabled"}>Gửi hết sang Kho chung</button><button class="btn sm" id="epDon">🧹 Dọn kho</button><button class="btn sm" id="epLootCfg">⚙ Nhặt đồ để ép (bộ lọc)</button></div>
      <div class="dim small">Tự nhặt đồ để ép: ${(() => {
        const i = qA().ep;
        return (
          [
            i.white && "đồ trắng",
            i.jew && "nhẫn / dây chuyền / ngọc bội",
            i.blue && `đồ xanh có dòng cấp ≥ ${i.blueLv}`,
          ]
            .filter(Boolean)
            .join(", ") || "tắt"
        );
      })()} → ${{ box: "Kho Rèn", stash: "Kho chung", inv: "Hành trang" }[qA().ep.dest]}</div></div>`;
    },
    oe = function s(A, n) {
      if (
        (u("#modal").classList.contains("hidden") && (n0.oreOpen = []),
        A && (n0.tab = A),
        ["tl", "hut", "phoi", "kham", "box"].includes(n0.tab) ||
          (n0.tab = "kham"),
        n && (n0.sel = n),
        Dr(),
        !w0())
      )
        return J('<h3>Lò Ép Đồ</h3><p class="desc">Chưa mở.</p>');
      const t = { tl: Bv, hut: _v, phoi: Mv, kham: rf, box: Hv },
        e = (t[n0.tab] || rf)();
      J(
        `<h3>Lò Ép Đồ · Thợ Rèn <small>${j(r.gold)} lượng</small></h3>${xv()}${e}`,
        () => {
          (document
            .querySelectorAll("#mBody [data-et]")
            .forEach((d) => (d.onclick = () => s(d.dataset.et))),
            document.querySelectorAll("#mBody [data-ht]").forEach(
              (d) =>
                (d.onclick = () => {
                  ((n0.ht = +d.dataset.ht), s());
                }),
            ));
          const a = u("#epAux");
          (a &&
            (a.onchange = (d) => {
              ((St.on = d.target.checked), s());
            }),
            document.querySelectorAll("#mBody [data-aux]").forEach(
              (d) =>
                (d.onchange = () => {
                  ((St[d.dataset.aux] = +d.value), s());
                }),
            ),
            document
              .querySelectorAll("#mBody .ep-grid [data-uid]")
              .forEach((d) => {
                n0.tab !== "box" &&
                  n0.tab !== "tl" &&
                  (d.onclick = () => s(n0.tab, +d.dataset.uid));
              }));
          const i = () => s(),
            o = (d) => {
              (y(d.msg),
                i0(d.ok ? "learn" : "use"),
                M(D(d.msg)),
                (c.dirty = !0),
                (Y = !0),
                B(),
                i());
            },
            l = ce(n0.sel);
          if (n0.tab === "tl")
            ((u("#epFuseAuto").onclick = () => {
              ((n0.fuse = Ve(wt()).map((d) => d.uid)), i());
            }),
              document.querySelectorAll("#mBody #epFuseG [data-uid]").forEach(
                (d) =>
                  (d.onclick = () => {
                    const h = +d.dataset.uid,
                      g = n0.fuse.indexOf(h),
                      f = ce(h);
                    (g >= 0
                      ? n0.fuse.splice(g, 1)
                      : f &&
                        ((n0.fuse = n0.fuse.filter((m) => {
                          const w = ce(m);
                          return w && w.d !== f.d;
                        })),
                        n0.fuse.push(h)),
                      i());
                  }),
              ),
              (u("#epFuse").onclick = () => {
                const d = n0.fuse.map((h) => ce(h)).filter(Boolean);
                ((n0.fuse = []), o(hs(d)));
              }),
              document
                .querySelectorAll("#mBody [data-up]")
                .forEach((d) => (d.onclick = () => o(pl(+d.dataset.up)))));
          else if (n0.tab === "kham") {
            const d = l ? O4(l, n0.ht) : [];
            document.querySelectorAll("#mBody [data-ep]").forEach(
              (m) =>
                (m.onclick = () => {
                  const w = d[+m.dataset.ep];
                  w && o(C4(l, w.ht, w.key));
                }),
            );
            const h = u("#epAll");
            h && (h.onclick = () => o(Gu(l)));
            const g = u("#epTake");
            g && (g.onclick = () => o(Ku(l)));
            const f = u("#epSell");
            f &&
              (f.onclick = () => {
                const m = Ru(l);
                (m.ok && (n0.sel = 0), o(m));
              });
          } else if (n0.tab === "hut") {
            const d = Ir(),
              h = () => {
                (B(), i());
              };
            ((u("#ahOn").onchange = (g) => {
              ((d.on = g.target.checked), h());
            }),
              (u("#ahLv").onchange = (g) => {
                ((d.minLv = +g.target.value), h());
              }),
              (u("#ahHt").onchange = (g) => {
                ((d.htMax = +g.target.value), h());
              }),
              (u("#ahCap").onchange = (g) => {
                ((d.cap = +g.target.value), h());
              }),
              (u("#ahRes").onchange = (g) => {
                ((d.reserve = +g.target.value), h());
              }),
              (u("#ahNow").onclick = () => {
                const g = Wa(20);
                (y(
                  g
                    ? `Tự rút ${g} món (xem nhật ký)`
                    : "Không có món nào để rút",
                ),
                  i());
              }),
              document.querySelectorAll("#mBody [data-hut]").forEach(
                (g) =>
                  (g.onclick = () => {
                    const [f, m] = g.dataset.hut.split(":").map(Number);
                    ((n0.sel = 0), o(Pl(l, f, m, n0.ht)));
                  }),
              ));
          } else if (n0.tab === "phoi") {
            const d = u("#epPhoi");
            d &&
              (d.onclick = () => {
                const h = vl(l, n0.ht);
                (h.ok && (n0.tab = "kham"), o(h));
              });
          } else {
            (document
              .querySelectorAll("#mBody [data-st]")
              .forEach((d) => (d.onclick = () => o(qu(d.dataset.st)))),
              document.querySelectorAll("#mBody [data-otg]").forEach(
                (d) =>
                  (d.onclick = () => {
                    const h = +d.dataset.otg,
                      g = Gi(),
                      f = g.indexOf(h);
                    f >= 0 ? g.splice(f, 1) : g.push(h);
                    const m = f < 0;
                    (d.nextElementSibling.classList.toggle("ep-hide", !m),
                      (d.firstChild.textContent =
                        (m ? "▾" : "▸") + d.firstChild.textContent.slice(1)));
                    const w = u("#epOreAll");
                    w &&
                      (w.textContent = g.length ? "Ẩn tất cả" : "Hiện tất cả");
                  }),
              ));
            {
              const d = u("#epOreAll");
              d &&
                (d.onclick = () => {
                  ((n0.oreOpen = Gi().length
                    ? []
                    : Array.from({ length: x1 }, (h, g) => g)),
                    i());
                });
            }
            (document.querySelectorAll("#mBody #epBoxG [data-uid]").forEach(
              (d) =>
                (d.onclick = () => {
                  const h = s0().find((g) => g.uid === +d.dataset.uid);
                  if (h) {
                    if (r.inv.length >= INV_MAX) return y("Hành trang đầy");
                    (l1(h), r.inv.push(h), (Y = !0), B(), i());
                  }
                }),
            ),
              (u("#epIn").onclick = () => {
                let d = 0;
                for (const h of r.inv.filter(cf)) {
                  if (s0().length >= A1) break;
                  (l1(h), s0().push(h), d++);
                }
                (y(`Cất ${d} món vào Kho Rèn`), (Y = !0), B(), i());
              }),
              (u("#epOutAll").onclick = () => {
                let d = 0;
                for (; s0().length && r.inv.length < INV_MAX;)
                  (r.inv.push(s0().shift()), d++);
                (y(`Lấy ra ${d} món`), (Y = !0), B(), i());
              }),
              (u("#epLootCfg").onclick = () => {
                (t0(),
                  iA("inv"),
                  setTimeout(() => {
                    const d = u("#epLoot");
                    d && d.scrollIntoView({ block: "center" });
                  }, 50));
              }),
              (u("#epDon").onclick = () => n3()),
              (u("#epToStash").onclick = () => {
                let d = 0;
                for (const h of s0().slice()) {
                  if (r.inv.length >= INV_MAX) break;
                  (l1(h), r.inv.push(h));
                  const g = A3(h);
                  if (g && g.ok) d++;
                  else {
                    (l1(h), s0().push(h));
                    break;
                  }
                }
                (y(`Gửi ${d} món sang Kho chung`), (Y = !0), B(), i());
              }));
          }
        },
      );
    },
    of = function (A) {
      const n = As(A);
      if (
        !n ||
        (typeof U0 == "function" && U0(A)) ||
        (n === "blue" && hA(A) && r.inv.length < INV_MAX)
      )
        return !1;
      const t = qA().ep.dest;
      if (t === "box" && s0().length < A1) return (s0().push(A), !0);
      if (t === "stash" && typeof A3 == "function" && r.inv.length < INV_MAX) {
        r.inv.push(A);
        const e = A3(A);
        if (e && e.ok) return !0;
        const a = r.inv.indexOf(A);
        a >= 0 && r.inv.splice(a, 1);
      }
      return s0().length < A1 ? (s0().push(A), !0) : !1;
    },
    A1 = 120,
    n0 = { tab: "kham", sel: 0, ht: 0, fuse: [] },
    Gi = () => n0.oreOpen || (n0.oreOpen = []),
    vr = (s) => `img/ep/da${(s | 0) + 1}.png`,
    $v = (s) => (Lt(s)[0] || {}).n || W0(s),
    le = (s) =>
      !!s &&
      !s.set &&
      s.d >= 0 &&
      s.d <= 9 &&
      !!s.vio &&
      (s.mag || []).length < B1(s),
    lf = (s) =>
      !!s &&
      !s.set &&
      !s.vio &&
      !s.thanma &&
      s.d >= 0 &&
      s.d <= 9 &&
      (s.mag || []).length > 0,
    Tv = (s) =>
      !!s &&
      U1.includes(s.d) &&
      !s.set &&
      !s.vio &&
      !s.lock &&
      !Object.values(r.eq).includes(s) &&
      !(typeof IA == "function" && r.inv.includes(s) && IA(s)),
    cf = (s) =>
      !s.lock && !U0(s) && (le(s) || Tv(s) || (br(s) && (s.r === 0 || !hA(s)))),
    br = (s) =>
      !!s &&
      !s.set &&
      !s.vio &&
      !s.thanma &&
      Bs.includes(s.d) &&
      (s.r || 0) <= 2,
    Ki = (s) => r.inv.concat(s0()).filter(s),
    ce = (s) =>
      r.inv.concat(s0(), Object.values(r.eq)).find((A) => A && A.uid === s),
    df = () =>
      Object.keys(T0().ht)
        .map(Number)
        .filter((s) => N("ht", s) > 0)
        .sort((s, A) => s - A),
    ff = (s) =>
      D(
        RA(
          W0(s.a),
          s.p.map((A) => (A === -1 ? 0 : A)),
        ),
      ),
    yr = (s, A) =>
      `<div class="invgrid ep-grid">${s.map((n) => T1(n).replace('class="it', `class="it${A === n ? " ep-on" : ""}`)).join("")}</div>`,
    Ri = (s) =>
      s >= 5e-4 ? ` · <span class="bad">thất bại ${et(s)}</span>` : "",
    dx = 0,
    Yi = function (A) {
      if (A) {
        const n = Object.assign({}, _r, {
          bg: window.JMO && window.JMO[337] ? _r.bg : _r.bgFb,
        });
        ((c.zoneShown = "boat"),
          Te(window.JMO && window.JMO[337] ? 337 : 336),
          ([b.x, b.y] = K0(
            window.JMO && window.JMO[337] ? 2150 : M0.w / 2,
            window.JMO && window.JMO[337] ? 1130 : M0.h / 2,
          )),
          nn(),
          (c.bgImg = PA(n.bg)),
          Vt(336));
      } else ((c.zoneShown = null), vn(V0(Math.min(r.stage, l0))));
    },
    kr = function () {
      if (y2()) {
        y(
          c.deadT > 0
            ? "Đang trọng thương, chờ hồi phục"
            : "Đang ở tháp / phó bản",
        );
        return;
      }
      if (!Vi()) {
        y(`Cần cấp ${Fi}`);
        return;
      }
      if (!fe()) {
        y("Hết chuyến đò hôm nay");
        return;
      }
      (ar(),
        (c.dg = {
          kind: "boat",
          d: { n: "Phong Lăng Độ" },
          room: 1,
          t: 0,
          limit: mf,
          L: Si(1),
        }),
        Yi(!0),
        (c.banner = {
          t: 2.6,
          text: "Phong Lăng Độ",
          sub: `Lên thuyền qua sông · ${de} đoạn · Thủy Tặc chặn đường`,
        }),
        M(
          "⛵ Lên thuyền <b>Phong Lăng Độ</b>: Huyền Tinh và đá thuộc tính rơi ×" +
            Mr +
            " trên thuyền.",
        ),
        vA === "quest" && F());
    },
    Cv = function () {
      const A = c.dg,
        n = A.room >= de,
        t = (e, a) => {
          const i = A0(0, Math.PI * 2),
            o = A0(e, a);
          return K0(b.x + Math.cos(i) * o, b.y + Math.sin(i) * o);
        };
      if (n) {
        const [e, a] = t(200, 250),
          i = zA(Hr, A.L + 2, "boss", e, a);
        ((i.hp = i.max = i.max * 3),
          (i.dmg *= 1.2),
          (i.n = "Thủy Tặc Đầu Lĩnh"),
          c.enemies.push(i));
        for (let o = 0; o < 3; o++) {
          const [l, d] = t(120, 240),
            h = zA(Hr, A.L, "elite", l, d);
          ((h.n = "Thủy Tặc"), c.enemies.push(h));
        }
      } else {
        const e = 5 + A.room;
        for (let a = 0; a < e; a++) {
          const [i, o] = t(120, 280),
            l = zA(Hr, A.L, a < A.room ? "elite" : "normal", i, o);
          ((l.n = "Thủy Tặc"), c.enemies.push(l));
        }
      }
    },
    Ov = function () {
      const A = c.dg;
      if (A.room >= de) {
        Ev();
        return;
      }
      (A.room++,
        t2(c.P.life * 0.3, !0),
        (c.mana = Math.min(c.P.mana, c.mana + c.P.mana * 0.3)),
        (c.spawnT = 1.6),
        (c.banner = {
          t: 1.4,
          text: `Đoạn sông ${A.room}/${de}`,
          sub:
            A.room >= de
              ? "Thủy Tặc Đầu Lĩnh chặn thuyền!"
              : "Thủy Tặc nhảy lên thuyền!",
        }));
    },
    Ev = function () {
      const A = c.dg,
        n = u1();
      n.boat = (n.boat || 0) + 1;
      const t = m1();
      if (
        ((t.boatN = (t.boatN || 0) + 1),
        Q0({ gold: 3e3, fd: 10, item: 5, xp: 0.02 }, "Qua sông Phong Lăng Độ"),
        w0())
      ) {
        const e = C(Math.floor(A.L / 15) + 1, 1, DA);
        V("ht", e, 3);
        const a = [te(A.L), te(A.L)];
        M(`⛵ Thưởng qua sông: 3 Huyền Tinh cấp ${e}, ${a.join(", ")}`);
      }
      (Math.random() < 0.03 &&
        (V("misc", "wc", 1), M("⛵ Nhận 1 Thủy Tinh Trắng")),
        sn("boat"),
        (c.banner = {
          t: 3,
          text: "Qua sông thành công!",
          sub: `${Math.round(A.t)} giây · còn ${fe()} chuyến hôm nay`,
        }),
        i0("levelup"),
        rn(),
        hf(),
        B());
    },
    hf = function () {
      (ut(), Yi(!1), vA === "quest" && F());
    },
    xr = function () {
      const A = Ua();
      return `<p class="desc">Lên thuyền Phong Lăng Độ qua sông, Thủy Tặc đánh lên thuyền ${de - 1} đợt, đợt cuối là <b>Thủy Tặc Đầu Lĩnh</b>. Nhận nhiệm vụ là <b>tự chuyển lên bản đồ Thuyền</b>.</p>
    <div class="card"><div class="stats"><span>Chuyến còn hôm nay</span><span>${fe()}/${gf}</span><span>Yêu cầu</span><span>cấp ${Fi}</span><span>Thời gian</span><span>${mf / 60} phút</span><span>Đã qua sông</span><span>${m1().boatN || 0} lần</span></div>
      <div class="small">Trên thuyền: <b class="cp">Huyền Tinh và đá thuộc tính rơi ×${Mr}</b>. Qua sông: ${j(3e3 * (1 + r.lvl / 10))} lượng, 10 Phúc Duyên, đồ 5 dòng, 3 Huyền Tinh + 2 đá thuộc tính, 30% Thủy Tinh Trắng. Gục ngã / hết giờ: thất bại, không mất lượt.</div>
      <div class="btnrow">${A ? '<button class="btn red" id="boatOut">Rời thuyền (không mất lượt)</button>' : `<button class="btn" id="boatGo" ${Vi() && fe() && !y2() ? "" : "disabled"}>${Vi() ? (fe() ? "⛵ Lên thuyền" : "Hết chuyến hôm nay") : `Cần cấp ${Fi}`}</button>`}</div></div>`;
    },
    Br = function (A) {
      const n = A.querySelector("#boatGo");
      n &&
        (n.onclick = () => {
          (t0(!0), kr());
        });
      const t = A.querySelector("#boatOut");
      t &&
        (t.onclick = () => {
          (M("Rời thuyền Phong Lăng Độ."), hf());
        });
    },
    _r = {
      id: 337,
      n: "Phong Lăng Độ · Thuyền",
      bg: "img/z/337.jpg",
      bgFb: "img/z/336.jpg",
      lo: 1,
      hi: 200,
      m: [674],
      sw: [20, 20, 20, 20, 20],
    },
    gf = 3,
    de = 4,
    mf = 240,
    Fi = 30,
    Mr = 5,
    Hr = 674,
    fe = () => Math.max(0, gf - (u1().boat || 0)),
    Vi = () => r.lvl >= Fi || Q().stat.reborn > 0,
    Ua = () => !!(c.dg && c.dg.kind === "boat"),
    uf = () => (Ua() ? Mr : 1),
    he = function (A = r.lvl) {
      let n = 0;
      return (
        B0.forEach((t, e) => {
          t.lo <= A && Ui(e) && (n = e);
        }),
        n
      );
    },
    $r = function (A) {
      const n = Tr(A);
      let t = n,
        e = 1e9;
      for (let a = 0; a < bn; a++) {
        const i = n + a;
        if (i > l0) break;
        const o = Math.abs(zt(i) - r.lvl);
        o < e && ((e = o), (t = i));
      }
      return t;
    },
    wf = function () {
      for (let A = 0; A < B0.length; A++)
        Ui(A) &&
          (r.maxStage = Math.max(
            r.maxStage || 1,
            Math.min(l0, Tr(A) + bn - 1),
          ));
    },
    Xi = function () {
      if (c.ground.length) {
        const A = qA();
        for (const n of c.ground.slice())
          (A.pickAll || hA(n.it) || As(n.it)) && V6(n, !0);
        c.ground = [];
      }
      ((c.pickTarget = null),
        (c.moveTo = null),
        (c.tgt = null),
        (c.manTgt = null),
        c.tgtBan && c.tgtBan.clear(),
        typeof K < "u" && ((K.target = null), (K.tmp = !1)));
    },
    fn = function (A, n, t) {
      if (!B0[A] || c.dg || c.tower) return !1;
      const wasTown = !!c.town;
      c.town && E1();
      c.town = !1;
      const e = $r(A),
        a = dA(Math.min(r.stage, l0)) === A;
      r.stage = e;
      r.wave = 1;
      const curTarget = V0(e);
      const isDifferentZone = !a || wasTown || (c.curZone && curTarget && c.curZone.id !== curTarget.id);
      if (isDifferentZone) {
        (t || ((c.enemies = []), (c.corpses = []), (c.spawnT = 0.6)), Xi());
        ((c.zoneShown = curTarget.id),
          vn(curTarget),
          (c.banner = { t: 2.2, text: curTarget.n, sub: n || `Cấp ${curTarget.lo}–${curTarget.hi}` }),
          n && M(`🗺 ${D(n)}: tới <b>${D(curTarget.n)}</b>`));
      }
      typeof Bh === "function" && Bh();
      return !0;
    },
    ge = function () {
      if ((wf(), c.dg || c.tower || c.town || c.sat)) return;
      if (r.mode === "quest" || r.autoMap === !1) {
        const t = $r(dA(Math.min(r.stage, l0)));
        t !== r.stage && (r.stage = t);
        return;
      }
      const A = he(),
        n = dA(Math.min(r.stage, l0));
      if (A !== n) fn(A, "Đủ cấp, đổi bãi luyện công");
      else {
        const t = $r(A);
        t !== r.stage && (r.stage = t);
      }
    },
    pf = function (A) {
      if (
        ((Ji -= A),
        Ji > 0 ||
          ((Ji = 1.5),
          r.mode !== "quest" ||
            !r.fac ||
            Kn() ||
            c.dg ||
            c.tower ||
            c.deadT > 0) ||
          c.sat)
      )
        return;
      c.town && E1();
      const n = X0();
      if (
        (r.lvl >= mA &&
          n.today >= ie() &&
          r.autoLdt !== !1 &&
          N("misc", "ldt") > 0 &&
          k2(!0),
        r.lvl >= mA && n.today < ie())
      ) {
        ((n.auto = !0), n.task || ae());
        const e = n.task;
        if (e) {
          if (jn(e)) {
            Ra(!0);
            return;
          }
          if (
            (e.t === "killm" || e.t === "elite" || e.t === "boss") &&
            e.zi != null
          ) {
            {
              const o = B0[e.zi] ? [B0[e.zi]].concat(Hn[e.zi] || []) : null,
                l = o && o[e.za || 0];
              l
                ? ((e.zn = l.n),
                  e.t === "killm" &&
                    !l.m.includes(e.tid) &&
                    (e.tid = _0(
                      l.m.filter((d) => r0[d]).length
                        ? l.m.filter((d) => r0[d])
                        : l.m,
                    )),
                  e.t === "boss" && e.tid !== l.boss && (e.tid = l.boss))
                : ((e.zi = null), (e.t = "elite"));
            }
            const i = (r.zalt || {})[e.zi] || 0;
            dA(Math.min(r.stage, l0)) !== e.zi
              ? (((r.zalt || (r.zalt = {}))[e.zi] = e.za || 0),
                fn(e.zi, `Dã Tẩu: ${se(e)}`))
              : i !== (e.za || 0) &&
                ((r.zalt[e.zi] = e.za || 0),
                Xi(),
                (c.enemies = []),
                (c.corpses = []),
                (c.field = null),
                (c.zoneShown = null),
                M(`🗺 Dã Tẩu: tới <b>${D(e.zn)}</b>`));
            return;
          }
          const a = he();
          dA(Math.min(r.stage, l0)) !== a && fn(a, `Dã Tẩu: ${se(e)}`);
          return;
        }
      }
      if (N("misc", "lb") > 0 && r.lvl >= 20) {
        Q7(fr());
        return;
      }
      if (typeof fe == "function" && Vi() && fe() > 0 && w0()) {
        kr();
        return;
      }
      const t = he();
      dA(Math.min(r.stage, l0)) !== t && fn(t, "Hết nhiệm vụ, luyện công");
    },
    Df = function (A) {
      if ((r.mode || "farm") !== A) {
        if (
          ((r.mode = A),
          (c.dgSkip = {}),
          B(),
          c.dg && c.dg.kind !== "wb" && ut(),
          c.tower && A !== "tower" && Ia(!1),
          c.town && E1(),
          (c.dgPilotT = 0),
          (Ji = 0),
          (c.towerPilotT = 0),
          A === "quest")
        )
          M("📜 Chế độ <b>Nhiệm Vụ</b>: dịch chuyển tới bản đồ nhiệm vụ.");
        else if (A === "tower")
          gi(p2)
            ? (M(
                "🗼 Chế độ <b>Leo Tháp</b>: tự vào Thông Thiên Tháp, gục ngã thì chuyển về Luyện Công.",
              ),
              !c.tower && !c.dg && g2())
            : ((r.mode = "farm"), y(`Leo Tháp cần cấp ${p2}`));
        else if (A === "dg")
          (M("🏯 Chế độ <b>Phó Bản</b>: tự vào phó bản còn lượt."),
            Ni() || y("Hết lượt phó bản hôm nay: luyện công"));
        else if (A === "pk") {
          M("🔥 Chế độ <b>Chiến Đấu PK</b>: Tự động tìm kiếm, truy sát và tấn công người chơi khác!");
          if (typeof y === "function") y("Chế độ PK: Ưu tiên tấn công người chơi!");
          if (typeof window.__volamidleOnline?.onPkModeActivated === "function") {
            window.__volamidleOnline.onPkModeActivated();
          }
        } else {
          M("⚔ Chế độ <b>Luyện Công</b>.");
          const n = r.autoMap === !1 ? dA(Math.min(r.stage, l0)) : he();
          fn(n, "Luyện công");
        }
        F();
      }
    },
    Iv = function (A) {
      const n = r.mode === "quest",
        t = r.mode === "dg",
        p = r.mode === "pk",
        e = X0(),
        a = e.task,
        i = c.dg
          ? c.dg.kind === "boat"
            ? "⛵ Đang đi thuyền Phong Lăng Độ"
            : `Trong ${c.dg.kind === "wb" ? "Boss tuần" : D(c.dg.d.n)}`
          : c.sat
            ? `🗡 Truy sát Sát Thủ cấp ${c.sat.tier}`
            : n
              ? r.lvl >= mA && e.today < cr && a
                ? `📜 Dã Tẩu: ${D(se(a))} ${Li(a)}`
                : "Hết nhiệm vụ: luyện công"
              : t
                ? Ni()
                  ? `🏯 Sắp vào ${D(Ni().n)}`
                  : "🏯 Hết lượt phó bản: luyện công"
                : p
                  ? "🔥 Chế độ PK: Ưu tiên tìm kiếm và tấn công người chơi"
                  : "";
      return `<div class="card modec">
    <div><b>${D(A.n)}</b> <small class="dim">bản đồ cấp ${A.lo}–${A.hi} · quái cấp ~${zt(r.stage)} · trùm hồi sinh ${oc / 60} phút</small></div>
    ${i ? `<div class="small cp">${i}</div>` : ""}
    ${n ? "" : `<label class="small"><input type="checkbox" id="cAutoMap" ${r.autoMap === !1 ? "" : "checked"}> Tự đổi bãi luyện công khi lên cấp</label>`}</div>`;
    },
    Pf = function () {
      let A = u("#modeSw");
      (A ||
        ((A = document.createElement("div")),
        (A.id = "modeSw"),
        (A.innerHTML = `<button id="mswBtn"></button><div id="mswMenu" class="hidden">${Cr.map((t) => `<button data-msw="${t[0]}" title="${t[3]}">${t[1]} ${t[2]}</button>`).join("")}</div>`),
        u("#battle").appendChild(A),
        (u("#mswBtn").onclick = (t) => {
          (t.stopPropagation(), u("#mswMenu").classList.toggle("hidden"));
        }),
        A.querySelectorAll("[data-msw]").forEach(
          (t) =>
            (t.onclick = (e) => {
              (e.stopPropagation(),
                u("#mswMenu").classList.add("hidden"),
                Df(t.dataset.msw));
            }),
        ),
        document.addEventListener("pointerdown", (t) => {
          A.contains(t.target) || u("#mswMenu").classList.add("hidden");
        })),
        A.classList.toggle("hidden", !r.fac));
      const n = bf();
      ((u("#mswBtn").innerHTML = `Chế Độ: <b>${n[1]} ${n[2]}</b> ▴`),
        A.querySelectorAll("[data-msw]").forEach((t) =>
          t.classList.toggle("on", t.dataset.msw === n[0]),
        ));
    },
    Sv = function () {
      document
        .querySelectorAll("[data-mode]")
        .forEach((n) => (n.onclick = () => Df(n.dataset.mode)));
      const A = u("#cAutoMap");
      A &&
        (A.onchange = () => {
          ((r.autoMap = A.checked), A.checked && ge(), B(), F());
        });
    },
    vf = 3,
    Tr = (s) => s * bn + 1,
    Nv = () => (D0() ? R2 : r.lvl),
    Ui = (s) => !!B0[s] && (B0[s].lo <= Nv() + 3 || r.maxStage >= Tr(s)),
    Lv = (s) => {
      const A = B0.findIndex((n) => s <= n.hi);
      return A < 0 ? B0.length - 1 : A;
    },
    qv = () => (c.round || 0) % vf === vf - 1,
    Ji = 0,
    Cr = [
      ["farm", "⚔", "Luyện Công", "Dịch chuyển tới bãi luyện công hợp cấp"],
      [
        "dg",
        "🏯",
        "Phó Bản",
        "Dịch chuyển vào phó bản cao nhất còn lượt, lần lượt đi hết; hết lượt thì luyện công",
      ],
      [
        "quest",
        "📜",
        "Nhiệm Vụ",
        "Dịch chuyển tới bản đồ nhiệm vụ: Dã Tẩu, Sát Thủ, đi thuyền; xong thì luyện công",
      ],
      [
        "tower",
        "🗼",
        "Leo Tháp",
        "Vào Thông Thiên Tháp leo liên tục từ tầng (kỷ lục − 4); gục ngã thì tự chuyển về Luyện Công",
      ],
      [
        "pk",
        "🔥",
        "Chiến Đấu PK",
        "Chế độ PK: Tự động tìm kiếm, truy sát và tấn công người chơi khác trên bản đồ",
      ],
    ],
    bf = () => Cr.find((s) => s[0] === (r.mode || "farm")) || Cr[0],
    Or = function s() {
      const A = Wi(),
        n = Object.keys(T0().ore).reduce((l, d) => l + N("ore", d), 0),
        t = Object.keys(T0().ht).reduce((l, d) => l + N("ht", d), 0),
        e = r.inv
          .concat(s0(), Object.values(r.eq))
          .filter((l) => l && typeof le == "function" && le(l)).length,
        a = Object.keys(T0().shard).filter(
          (l) => _A[l] && N("shard", l) >= _A[l],
        ).length,
        i = Object.values(r.eq)
          .filter((l) => l && qt(l))
          .concat(r.inv.filter(qt))
          .filter((l) => !Xe(l)).length,
        o = G1.map(([l]) => r.eq[l]).filter(Boolean);
      ((u("#t-forge").innerHTML = `
    <div class="card fcard"><div class="fic"><img src="img/ep/ht.png" alt=""></div><div><b>💎 Lò Ép Đồ</b> <small class="dim">tinh luyện Huyền Tinh · lấy thuộc tính · chế tạo phôi · khảm nạm đồ Tím</small>
      ${
        w0()
          ? `<div class="small">Huyền Tinh <b>${t}</b> · đá thuộc tính <b>${n}</b> · phôi <b>${e}</b> · Kho Rèn <b>${s0().length}</b>/${A1}${A.ench ? ' · <span class="cp">có thể khảm</span>' : ""}${A.up ? ' · <span class="cp">thăng cấp được</span>' : ""}</div>
      <div class="btnrow"><button class="btn sm" data-ep="kham">Khảm nạm</button><button class="btn sm" data-ep="hut">Lấy thuộc tính</button><button class="btn sm" data-ep="phoi">Chế phôi</button><button class="btn sm" data-ep="tl">Tinh luyện</button><button class="btn sm" data-ep="box">Kho Rèn</button></div>`
          : ""
      }</div></div>
    <div class="card fcard"><div class="fic"><img src="img/ep/mys.png" alt=""></div><div><b>🔥 Lò Hoàng Kim</b> <small class="dim">ghép mảnh Hoàng Kim (Bộ chung · Môn phái)</small>
      <div class="small">Mảnh đủ ghép <b>${a}</b> · Thủy Tinh Trắng ${N("misc", "wc")} · Thần Bí Khoáng Thạch ${N("misc", "mys")}</div>
      <div class="btnrow"><button class="btn" id="fgHt">Mở Lò Hoàng Kim</button></div></div></div>
    <div class="card"><b>⚒ Cường hóa</b> <small class="dim">+1…+${K1}, mỗi cấp +${Math.round(C3 * 100)}% thuộc tính gốc, +${Math.round(O3 * 100)}% các dòng thuộc tính · chạm món đang mặc để rèn riêng (cường hóa, tẩy luyện)</small>
      <div class="invgrid">${o.map((l) => T1(l).replace("</button>", `${l.enh ? `<em class="fenh">+${l.enh}</em>` : ""}</button>`)).join("")}</div></div>
    <div class="card"><label><input type="checkbox" id="fgFuse" ${r.autoFuse === !1 ? "" : "checked"}> 💎 Tự hợp Huyền Tinh từ nhẫn / dây chuyền / ngọc bội thừa (3 món → 1 Huyền Tinh, ${j(XA())} lượng; mỗi 30 giây)</label>
      <div class="dim small">Trang sức thừa có ${wt().length} món. Không dùng đồ đang mặc, đồ khóa 🔒, đồ tốt hơn đồ đang mặc.</div>
      <label><input type="checkbox" id="fgAuto" ${r.autoForge ? "checked" : ""}> Tự động rèn đồ (ghép mảnh Hoàng Kim, khảm Tím, thăng cấp Huyền Tinh; mỗi 30 giây)</label></div>`),
        document
          .querySelectorAll("#t-forge [data-ep]")
          .forEach((l) => (l.onclick = () => oe(l.dataset.ep))),
        (u("#fgHt").onclick = () => zi()),
        (u("#fgFuse").onchange = (l) => {
          ((r.autoFuse = l.target.checked), r.autoFuse && (T2(), s()), B());
        }),
        (u("#fgAuto").onchange = (l) => {
          ((r.autoForge = l.target.checked), r.autoForge && Er(), B());
        }),
        document.querySelectorAll("#t-forge .invgrid [data-uid]").forEach(
          (l) =>
            (l.onclick = () => {
              const d = Object.values(r.eq).find(
                (h) => h && h.uid === +l.dataset.uid,
              );
              d && M2(d);
            }),
        ));
    },
    Ja = function (A) {
      r.fac && (A && (J0 = A), t0(!0), iA("quest"));
    },
    H2 = function s() {
      const A = [
        ["dt", "📜 Dã Tẩu"],
        ["boat", `⛵ Đi thuyền${Ua() ? " ●" : ""}`],
        ["st", "🗡 Sát Thủ"],
        ["act", "Hoạt động"],
      ];
      let n = "";
      (J0 === "dt"
        ? (n = XP())
        : J0 === "st"
          ? (n = Av())
          : J0 === "boat"
            ? (n = xr())
            : (n = `<div class="card"><div class="btnrow">${[
                ["dg", "Phó bản"],
                ["tower", "Tháp thử thách"],
                ["wb", "Boss tuần"],
                ["horse", "Mã trường"],
                ["pet", "Đồng hành"],
              ]
                .map(
                  ([e, a]) =>
                    `<button class="btn" data-act="${e}">${a}</button>`,
                )
                .join("")}</div>
      <div class="btnrow"><button class="btn" id="qGift">🎁 Phần thưởng: điểm danh · mốc cấp · Phúc Duyên · sự kiện · thành tựu</button></div></div>`),
        (u("#t-quest").innerHTML =
          `<div class="dtabs">${A.map(([e, a]) => `<button data-qt="${e}" class="${J0 === e ? "on" : ""}">${a}</button>`).join("")}</div>${n}`),
        document.querySelectorAll("#t-quest [data-qt]").forEach(
          (e) =>
            (e.onclick = () => {
              ((J0 = e.dataset.qt), s());
            }),
        ),
        J0 === "dt" && UP(),
        J0 === "boat" && Br(u("#t-quest")),
        J0 === "st" &&
          document.querySelectorAll("#t-quest [data-st]").forEach(
            (e) =>
              (e.onclick = () => {
                (Q7(+e.dataset.st), s());
              }),
          ),
        document
          .querySelectorAll("#t-quest [data-act]")
          .forEach((e) => (e.onclick = () => w1(e.dataset.act))));
      const t = u("#qGift");
      t && (t.onclick = () => Wt(!0));
    },
    J0 = "dt",
    jv = () =>
      !!r.fac &&
      !Kn() &&
      typeof X0 == "function" &&
      X0().task &&
      jn(X0().task) &&
      !X0().auto,
    zv = () => {
      if (!r.fac) return !1;
      const s = Wi();
      return !r.autoForge && s.shard + s.ench + s.up > 0;
    },
    $2 = function () {
      const A = Object.values(r.eq).filter(Boolean),
        n = A.concat(r.inv, s0()),
        t = (e) => {
          const a = A.find((i) => i.d === e.d);
          return !a || (!a.set && e.lvl >= a.lvl) ? 1 : 0;
        };
      return n
        .filter(
          (e) =>
            !e.set &&
            e.d >= 0 &&
            e.d <= 9 &&
            e.vio &&
            (e.mag || []).length < B1(e) &&
            (A.includes(e) || f0(e)),
        )
        .sort(
          (e, a) =>
            A.includes(a) - A.includes(e) ||
            t(a) - t(e) ||
            a.mag.length - e.mag.length ||
            a.lvl - e.lvl,
        );
    },
    yf = function () {
      const A = Object.keys(T0().ht)
          .map(Number)
          .sort((t, e) => e - t),
        n = Object.keys(T0().ore);
      if (!A.length || !n.length) return null;
      for (const t of $2()) {
        const e = t.mag.length;
        for (const a of n)
          if (BA(a).place === e) {
            for (const i of A)
              if (typeof zu(t, i, a) != "string")
                return { it: t, ht: i, key: a };
          }
      }
      return null;
    },
    T2 = function (A) {
      if (!r || !r.fac || r.autoFuse === !1 || !w0()) return 0;
      let n = 0;
      const t = {};
      for (let e = 0; e < Fv; e++) {
        const a = Ve(wt());
        if (a.length < 3 || r.gold < XA() * 2) break;
        const i = hs(a);
        if (!i.ok) break;
        (n++, (t[i.lvl] = (t[i.lvl] || 0) + 1));
      }
      return (
        n &&
          ((c.dirty = !0),
          (Y = !0),
          A ||
            M(
              `<span class="dim">💎 Tự hợp ${n} Huyền Tinh từ trang sức (${Object.entries(
                t,
              )
                .map(([e, a]) => `${a} viên cấp ${e}`)
                .join(", ")}).</span>`,
            )),
        n
      );
    },
    wt = function () {
      return r.inv
        .concat(typeof s0 == "function" ? s0() : [])
        .filter(N4)
        .filter((A) => !IA(A) && !U0(A))
        .sort((A, n) => L0(A) - L0(n));
    },
    Qv = function () {
      if ($2().length || r.gold < lA.phoi * 3) return !1;
      const A = Object.keys(T0().ht)
        .map(Number)
        .filter((t) => N("ht", t) > 0)
        .sort((t, e) => e - t);
      if (!A.length) return !1;
      const n = I[r.fac];
      for (const t of Object.values(r.eq)
        .filter((e) => e && !e.vio && !e.set && e.d >= 0 && e.d <= 9)
        .sort((e, a) => L0(e) - L0(a))) {
        const e = r.inv
          .concat(s0())
          .filter(
            (i) =>
              i.d === t.d &&
              (i.d > 1 || i.k === t.k) &&
              i.lvl >= t.lvl &&
              !i.set &&
              !i.vio &&
              !i.lock &&
              !i.thanma &&
              (i.r || 0) <= 2 &&
              !U0(i) &&
              f0(i) &&
              !(wA[i.d] === "weapon" && !YA(i)),
          )
          .sort((i, o) => o.lvl - i.lvl)[0];
        if (!e) continue;
        if (!r.inv.includes(e)) {
          if (r.inv.length >= INV_MAX) continue;
          (l1(e), r.inv.push(e));
        }
        if (vl(e, A[0]).ok) return ((Y = !0), !0);
      }
      return !1;
    },
    Er = function () {
      return null;
    },
    Gv = function () {
      const A = I[r.fac];
      let n = 0;
      for (const t of r.inv.concat(r.eq.weapon ? [r.eq.weapon] : []))
        t.d <= 1 &&
          F1(t) &&
          (t.req || []).every(([e, a]) => e !== 36 || r.lvl >= a) &&
          YA(t) &&
          (n = Math.max(n, Ie(t)));
      return n;
    },
    kf = function () {
      const A = I[r.fac];
      if (
        !A ||
        r.autoBuy === !1 ||
        A.wcode < 0 ||
        !S.shops.weapon ||
        r.inv.length >= INV_MAX
      )
        return null;
      const n = Gv();
      let t = null;
      for (const a of S.shops.weapon.items) {
        if (a.g === 1) continue;
        const i = E5(a);
        if (!i || i.d > 1 || !YA(i) || !F1(i)) continue;
        const o = ri(a),
          l = Ie(i);
        if (
          o > r.gold * Xv ||
          l < n * Vv ||
          (i.req.find((g) => g[0] === 36) || [0, 0])[1] > TA() ||
          (i.req || []).some(
            ([g, f]) => (g === 37 || g === 39) && f >= 0 && !f0(i),
          )
        )
          continue;
        const h = Object.values(Jn(i)).reduce((g, f) => g + f, 0);
        (h > 0 && !(r.autoPts === !0 && h <= r.attrPts + K2 * g6)) ||
          ((!t || l > t.dmg) && (t = { g: a, dmg: l, price: o, need: h }));
      }
      if (!t) return null;
      const e = pA(t.g.d, t.g.k, t.g.lvl, 0);
      return e
        ? ((e.s = I5(t.g, e)),
          (r.gold -= t.price),
          tn(e, !0, !0, !0),
          M(
            `<span class="dim">Tự mua <b>${D(e.n)}</b> ở Biện Kinh (${j(t.price)} lượng).</span>`,
          ),
          r.autoPts === !0 && Oe(),
          an(),
          (c.dirty = !0),
          (Y = !0),
          e)
        : null;
    },
    Ir = function () {
      const A = r.autoHut || (r.autoHut = xf()),
        n = xf();
      for (const t in n) A[t] === void 0 && (A[t] = n[t]);
      return A;
    },
    Kv = function () {
      return (typeof $2 == "function" ? $2() : [])
        .slice(0, 3)
        .map((A) => ({
          place: (A.mag || []).length,
          s: A.s,
          d: A.d,
          k: A.k,
          attrs: new Set((A.mag || []).map((n) => n.a)),
        }));
    },
    Rv = function (A, n, t) {
      let e = null;
      for (let a = 0; a < (A.mag || []).length; a++) {
        const i = A.mag[a];
        if (!L4(A, a)) continue;
        const o = Nl(A, a)[0],
          l = xs(i),
          d = o % 2 ? A.s : -1,
          h = t.some(
            (f) =>
              f.place === o &&
              (d < 0 || d === f.s) &&
              !f.attrs.has(i.a) &&
              da(i.a, f.d, f.k) &&
              It(i.a, f.s),
          );
        if ((!h && l < n.minLv) || (N("ore", Je(o, i.a, l, d)) >= n.cap && !h))
          continue;
        const g = (h ? 1e3 : 0) + l * 10 + (o % 2 ? 1 : 0);
        (!e || g > e.score) &&
          (e = { i: a, place: o, need: h, lvl: l, score: g });
      }
      return e;
    },
    Yv = function (A, n) {
      const t = Object.keys(T0().ht)
        .map(Number)
        .filter((e) => e <= n.htMax && N("ht", e) > 0)
        .sort((e, a) => e - a);
      if (!t.length) return 0;
      if (A) {
        const e = t.filter((a) => a >= 5);
        if (e.length) return e[0];
      }
      return t[0];
    },
    Wa = function (A = 10) {
      if (!w0() || c.dg) return 0;
      const n = Ir();
      if (!n.on) return 0;
      const t = Kv(),
        e = s0()
          .concat(r.inv)
          .filter(
            (f) =>
              Sl(f) && !f.lock && !(typeof U0 == "function" && U0(f)) && !hA(f),
          );
      let a = 0,
        i = 0,
        o = 0,
        l = 0,
        d = 0;
      const h = [],
        g = {};
      for (const f of e) {
        if (a >= A || r.gold < n.reserve + ks(f)) break;
        const m = Rv(f, n, t);
        if (!m) {
          if (s0().includes(f) && (f.r === 1 || f.r === 2)) {
            const P = y0(f);
            (l1(f), (r.gold += P), (d += P), l++);
          }
          continue;
        }
        const w = Yv(m.need, n);
        if (!w) break;
        const p = Pl(f, m.i, m.place, w, { wc: 0, mys: 0, fd: 0 });
        if ((a++, (g[w] = (g[w] || 0) + 1), p.ok))
          (i++,
            h.push(
              p.msg.replace(/^Lấy thuộc tính: /, "") + ` (dòng ${m.place + 1})`,
            ));
        else if (p.lost) o++;
        else break;
      }
      if (a || l) {
        const f = Object.entries(g)
          .map(([m, w]) => `${w} Huyền Tinh c${m}`)
          .join(", ");
        (M(
          `⚗ Tự rút ${a} món: ${i} đá${h.length ? ` (${h.slice(0, 4).join("; ")}${h.length > 4 ? "…" : ""})` : ""}${o ? `, ${o} thất bại` : ""}${f ? ` · −${f}` : ""}${l ? ` · bán ${l} món không có dòng tốt (+${j(d)} lượng)` : ""}`,
        ),
          (Y = !0),
          (c.dirty = !0),
          B());
      }
      return a;
    },
    Sr = { fuse: 5, ench: 6, up: 8 },
    Wi = () => ({
      shard: Object.keys(T0().shard).filter(
        (s) => _A[s] && N("shard", s) >= _A[s],
      ).length,
      up: Object.keys(T0().ht)
        .map(Number)
        .filter((s) => s < DA && N("ht", s) >= 3).length,
      ench: yf() ? 1 : 0,
      fuse: Ve(wt()).length === 3 && r.gold >= XA() * 2 ? 1 : 0,
    }),
    Fv = 10,
    Vv = 1.25,
    Xv = 0.6,
    xf = () => ({ on: !1, minLv: 3, htMax: 4, cap: 3, reserve: 5e4 }),
    Bf = function s(A = 0) {
      const n = Nr[A];
      if (!n) {
        ((r.tut = 1), t0(!0), B());
        return;
      }
      (n[2] && vA !== n[2] && r.fac && iA(n[2]),
        J(
          `<h3>${D(n[0])} <small>${A + 1}/${Nr.length}</small></h3><p class="desc">${D(n[1]).replace(/\n/g, "<br>")}</p>
    <div class="btnrow">${A > 0 ? '<button class="btn" id="tPrev">Trước</button>' : ""}<button class="btn" id="tNext">${A === Nr.length - 1 ? "Bắt đầu chơi" : "Tiếp"}</button><button class="btn" id="tSkip">Bỏ qua</button></div>`,
          () => {
            const t = u("#tPrev");
            (t && (t.onclick = () => s(A - 1)),
              (u("#tNext").onclick = () => s(A + 1)),
              (u("#tSkip").onclick = () => {
                ((r.tut = 1), t0(!0), B());
              }));
          },
        ),
        (r.tut = 1));
    },
    Zi = function (A) {
      if (!r || !r.fac || c.quiet) return;
      const n = r.hints || (r.hints = {});
      n[A] ||
        !Lr[A] ||
        ((n[A] = 1),
        y(Lr[A]),
        M(`<span class="dim">Gợi ý: ${D(Lr[A])}</span>`));
    },
    _f = function () {
      !r ||
        !r.fac ||
        (r.attrPts > 0 && r.lvl >= 2
          ? Zi("pts")
          : r.skPts > 0 && I[r.fac].skills.some((A) => b1(T[A]))
            ? Zi("skill")
            : Object.keys(T0().ht).length || Object.keys(T0().ore).length
              ? Zi("forge")
              : r.inv.length >= INV_MAX - 5 && Zi("full"));
    },
    Mf = function () {
      const A = [];
      if (!r || !r.fac) return A;
      (Kn() &&
        A.push({
          k: "join",
          t:
            r.lvl >= CA
              ? "⚑ Gia nhập môn phái"
              : `Cấp ${CA}: gia nhập môn phái`,
          go: () => B5(),
        }),
        r.attrPts > 0 &&
          A.push({
            k: "attr",
            t: `${r.attrPts} điểm tiềm năng`,
            go: () => iA("char"),
          }),
        r.skPts > 0 &&
          I[r.fac].skills.some((a) => b1(T[a])) &&
          A.push({
            k: "skill",
            t: `${r.skPts} điểm kỹ năng`,
            go: () => iA("skill"),
          }));
      const n = r.inv.filter((a) => IA(a)).length;
      (n &&
        A.push({
          k: "gear",
          t: `${n} món mạnh hơn đồ đang mặc`,
          go: () => iA("inv"),
        }),
        typeof or == "function" &&
          or() &&
          A.push({
            k: "wb",
            t: "Rương Boss tuần chờ nhận",
            go: () => w1("wb"),
          }),
        ev(A),
        r.fac &&
          typeof HA == "function" &&
          !HA() &&
          A.push({ k: "name", t: "✏ Đặt tên nhân vật", go: () => E2() }),
        Ed() && A.push({ k: "gift", t: "Có quà chờ nhận", go: () => Wt(!0) }));
      const t = Wi();
      return (
        t.shard + t.up + t.ench + t.fuse &&
          !r.autoForge &&
          A.push({
            k: "forge",
            t: `Rèn đồ: ${[t.shard && "ghép mảnh", t.ench && "khảm", t.fuse && "hợp Huyền Tinh", t.up && "thăng cấp"].filter(Boolean).join(", ")}`,
            go: () =>
              t.ench || t.fuse || t.up ? oe(t.ench ? "kham" : "tl") : zi(),
          }),
        r.inv.length >= INV_MAX - 3 &&
          A.push({ k: "full", t: "Hành trang gần đầy", go: () => iA("inv") }),
        r.lvl >= 5 &&
          !(typeof g0 == "function" && g0()) &&
          Date.now() - (r.bakAt || 0) > 7 * 864e5 &&
          A.push({ k: "bak", t: "Nên tải file sao lưu", go: () => iA("more") }),
        A
      );
    },
    Uv = function () {
      const A = Mf();
      return A.length
        ? `<div class="todo" id="todoBox"><b>Việc cần làm</b>${A.map((n, t) => `<button class="chip2 todochip" data-i="${t}">${D(n.t)}</button>`).join("")}</div>`
        : "";
    },
    Jv = function () {
      const A = Mf();
      document.querySelectorAll("#todoBox .todochip").forEach(
        (n) =>
          (n.onclick = () => {
            const t = A[+n.dataset.i];
            t && t.go();
          }),
      );
    },
    Wv = function () {
      const A = c.P,
        n = r.lvl,
        t = 8 + 3.2 * n,
        e = 30 + 9 * n,
        a = A.main,
        i = a.useAR ? Qt(A.ar, t, a.ignore) / 100 : 1,
        o = 1 - Qt(e, A.def) / 100,
        l = q0.reduce((m, w) => m + A.res[w], 0) / q0.length,
        d = {
          power: N0(A),
          dps: a.dps * i,
          hit: i,
          dodge: o,
          avgRes: l,
          ehp: A.life / Math.max(0.2, 1 - l / 100) / Math.max(0.3, 1 - o),
          main: a.n,
        },
        h = N0(I0(r.eq)),
        g = [];
      for (const [m, w] of G1) {
        const p = r.eq[m];
        if (!p) continue;
        const P = Object.assign({}, r.eq);
        (delete P[m],
          g.push({ n: w, name: p.n, v: h / Math.max(1, N0(I0(P))) - 1 }));
      }
      const f = [];
      for (const m of Object.keys(C1)) {
        const w = r.attr[m];
        if (!w) continue;
        r.attr[m] = 0;
        let p;
        try {
          p = N0(I0(r.eq));
        } finally {
          r.attr[m] = w;
        }
        f.push({ n: C1[m], pts: w, v: h / Math.max(1, p) - 1 });
      }
      return {
        info: d,
        slots: g.sort((m, w) => w.v - m.v),
        attrs: f.sort((m, w) => w.v - m.v),
      };
    },
    fx = function () {
      const A = Wv(),
        n = A.info,
        t = (a) => (a * 100).toFixed(1) + "%",
        e = (a, i, o) =>
          `<span>${D(a)}${o ? ` <small class="dim">${D(o)}</small>` : ""}</span><span class="${i > 5e-4 ? "cp" : "dim"}">${i > 0 ? "+" : ""}${t(i)}</span>`;
      J(`<h3>Lực chiến ${X(c.power)}</h3>
    <p class="desc">Lực chiến = DPS thực tế<sup>0,7</sup> × máu hiệu dụng<sup>0,3</sup>, tính so với quái cùng cấp (${r.lvl}), rồi quy đổi theo môn phái để cùng cấp, chưa mặc đồ thì các phái ngang nhau. Mỗi dòng dưới đây là mức lực chiến sẽ <b>mất</b> nếu bỏ đi thành phần đó.</p>
    <div class="card stats"><span>Chiêu chính</span><span>${D(n.main)}</span><span>DPS thực tế</span><span>${X(n.dps)}</span><span>Tỉ lệ trúng quái cùng cấp</span><span>${Math.round(n.hit * 100)}%</span>
      <span>Máu hiệu dụng</span><span>${X(n.ehp)}</span><span>Kháng trung bình</span><span>${Math.round(n.avgRes)}%</span><span>Quái bị né</span><span>${Math.round(n.dodge * 100)}%</span></div>
    <h3>Từ trang bị</h3><div class="card stats">${A.slots.map((a) => e(a.n, a.v, a.name)).join("") || '<span class="dim">Chưa mặc gì</span>'}</div>
    <h3>Từ điểm tiềm năng đã cộng</h3><div class="card stats">${A.attrs.map((a) => e(a.n, a.v, a.pts + " điểm")).join("") || '<span class="dim">Chưa cộng điểm</span>'}</div>`);
    },
    Zv = function () {
      return {
        sk: Object.assign({}, r.sk),
        skPts: r.skPts,
        attr: Object.assign({}, r.attr),
        attrPts: r.attrPts,
        main: r.main,
        mainLock: r.mainLock,
      };
    },
    Hf = function (A) {
      ((r.sk = Object.assign({}, A.sk)),
        (r.skPts = A.skPts),
        (r.attr = Object.assign({}, A.attr)),
        (r.attrPts = A.attrPts),
        (r.main = A.main),
        (r.mainLock = A.mainLock),
        (c.dirty = !0),
        u0());
    },
    $f = function () {
      let A = e6();
      for (; r.attrPts > 0;) {
        const n = N0(I0());
        let t = "vit",
          e = -1 / 0;
        for (const a of ["str", "dex", "vit", "eng"]) {
          r.attr[a]++;
          const i = N0(I0()) - n;
          (r.attr[a]--, i > e && ((e = i), (t = a)));
        }
        (r.attr[t]++, r.attrPts--, A++);
      }
      return (A && (c.dirty = !0), A);
    },
    Ab = function () {
      const A = Zv(),
        n = N0(I0()),
        t = { skills: [], attrs: [], gainSk: 0, gainAt: 0 },
        e = JSON.stringify(r.skL || {});
      ((c.sim = 1), (c.buffAssume = !0));
      try {
        if (r.skPts > 0) {
          const a = Object.assign({}, r.sk);
          Xn();
          for (const i in r.sk) {
            const o = r.sk[i] - (a[i] || 0);
            o > 0 &&
              t.skills.push({
                id: +i,
                n: T[i].n,
                d: o,
                to: r.sk[i],
                max: T[i].max,
              });
          }
          t.gainSk = N0(I0()) / Math.max(1, n) - 1;
        }
        if ((Hf(A), r.attrPts > 0)) {
          const a = Object.assign({}, r.attr);
          $f();
          for (const i of Object.keys(C1)) {
            const o = r.attr[i] - a[i];
            o > 0 && t.attrs.push({ k: i, n: C1[i], d: o });
          }
          t.gainAt = N0(I0()) / Math.max(1, n) - 1;
        }
      } finally {
        ((c.buffAssume = !1), Hf(A), (c.sim = 0), (r.skL = JSON.parse(e)));
      }
      return t;
    },
    C2 = function s() {
      const A = Ab(),
        n = (o) => (o >= 0 ? "+" : "") + (o * 100).toFixed(1) + "%",
        t = A.skills.length
          ? `<div class="card"><b>Võ công</b> <small class="cp">sức mạnh ${n(A.gainSk)}</small>${A.skills.map((o) => `<div>${D(o.n)}: +${o.d} → ${o.to}/${o.max}</div>`).join("")}<div class="btnrow"><button class="btn" id="sgSk">Áp dụng</button></div></div>`
          : "",
        e = z8(),
        a = e.total
          ? `<div class="card"><b>Đủ điểm cho đồ đang mặc</b> <small class="dim">cần ${e.total} điểm · đang có ${r.attrPts}${e.total > r.attrPts ? ` · thiếu ${e.total - r.attrPts} (≈ ${Math.ceil((e.total - r.attrPts) / K2)} cấp nữa)` : ""}</small>${e.list
              .map(
                (o) =>
                  `<div class="small">${D(o.it.n)} <span class="dim">(cấp ${o.lv})</span>: ${Object.entries(
                    o.d,
                  )
                    .map(([l, d]) => `${C1[l]} +${d}`)
                    .join(", ")}</div>`,
              )
              .join(
                "",
              )}<div class="dim small">Gợi ý tiềm năng bên dưới cộng phần này trước, phần còn lại theo lực chiến.</div></div>`
          : "",
        i = A.attrs.length
          ? `<div class="card"><b>Tiềm năng</b> <small class="cp">sức mạnh ${n(A.gainAt)}</small>${A.attrs.map((o) => `<div>${o.n}: +${o.d}</div>`).join("")}<div class="btnrow"><button class="btn" id="sgAt">Áp dụng</button></div></div>`
          : "";
      J(
        `<h3>Gợi ý cộng điểm</h3><p class="desc">Xem trước, chưa cộng gì. Gợi ý chọn cách tăng sức mạnh nhiều nhất với trang bị hiện tại. Bạn vẫn rút điểm được bằng nút −.</p>${t}${a}${i}${!t && !i ? '<p class="dim">Bạn không có điểm nào để cộng.</p>' : ""}`,
        () => {
          const o = u("#sgSk");
          o &&
            (o.onclick = () => {
              (Xn(), u0(), B(), F(), s());
            });
          const l = u("#sgAt");
          l &&
            (l.onclick = () => {
              ($f(), u0(), B(), F(), s());
            });
        },
      );
    },
    nb = function s(A) {
      A && (Za = A);
      const n = [
        ["zone", "Vùng và quái"],
        ["set", "Bộ Hoàng Kim"],
        ["plat", "Bạch Kim"],
        ["mat", "Nguyên liệu rèn"],
      ];
      let t = "";
      if (Za === "zone")
        t = B0.map((e, a) => {
          const i = r.maxStage >= a * bn + 1,
            o = e.m
              .filter((l) => r0[l])
              .map((l) => D(r0[l].n))
              .join(", ");
          return `<div class="card${i ? "" : " lock"}"><b>${D(e.n)}</b> <small class="dim">cấp ${e.lo}–${e.hi}${i ? "" : " · chưa tới"}</small><br><small>Trùm: <b class="boss">${D((r0[e.boss] || {}).n || "?")}</b></small><br><small class="dim">Quái: ${o}</small><br><small>Ngũ hành: ${
            e.sw
              .map((l, d) =>
                l ? `<span style="color:${m0[d]}">${d0[d]}</span>` : "",
              )
              .filter(Boolean)
              .join(" ") || "—"
          }</small></div>`;
        }).join("");
      else if (Za === "set") {
        const e = I[r.fac] ? I[r.fac].id : -1,
          a = new Map();
        for (const o of S.sets.gold) {
          if (!i1(o.req) || !tA(o)) continue;
          const l = OA(o, 39);
          (l !== e && l !== -1) ||
            (a.get(o.grp) || a.set(o.grp, []).get(o.grp)).push(o);
        }
        const i = [...a.values()].sort((o, l) => OA(o[0], 36) - OA(l[0], 36));
        t =
          `<p class="desc">Bộ Hoàng Kim của phái bạn (${i.length} bộ). Mặc đủ số món của một bộ sẽ mở hết dòng ẩn của mọi trang bị.</p>` +
            i
              .map((o) => {
                const l = o[0],
                  d = l.n2 || 99;
                return `<div class="card"><b>${D(l.n.split(" ").slice(0, 2).join(" "))}…</b> <small class="dim">cấp ${OA(l, 36)} · ${o.length} món · đủ ${d} món mở dòng ẩn</small><br><small class="dim">${o.map((h) => D(h.n)).join(" · ")}</small></div>`;
              })
              .join("") || '<p class="dim">Không có.</p>';
      } else if (Za === "plat") {
        const e = I[r.fac] ? I[r.fac].id : -1,
          a = new Set(
            Object.values(r.eq)
              .concat(r.inv)
              .filter((d) => d && d.set && d.set.kind === "gold")
              .map((d) => d.n),
          ),
          i = new Map();
        for (const d of S.sets.gold) {
          if (d.fixed || !i1(d.req) || !tA(d)) continue;
          const h = OA(d, 39);
          (h !== e && h !== -1) ||
            (i.get(d.grp) || i.set(d.grp, []).get(d.grp)).push(d);
        }
        const o = [...i.values()]
          .filter((d) => d.some((h) => _1.has(h.n)))
          .sort(
            (d, h) =>
              (OA(h[0], 39) >= 0) - (OA(d[0], 39) >= 0) ||
              OA(d[0], 36) - OA(h[0], 36),
          );
        t =
          `<div class="card"><small>Món Hoàng Kim chế được Bạch Kim của môn phái bạn (${o.reduce((d, h) => d + h.filter((g) => _1.has(g.n)).length, 0)} món). Điều kiện: Hoàng Kim cường hóa +${ma}, ${A2} Thần Bí Khoáng Thạch, 1 Huyền Tinh cấp ${jt}, ${j(c1)} lượng · Bạch Kim cần cấp ${Ms} · Lò rèn → Hoàng Kim → Chế Bạch Kim.${cs() ? "" : ' <b class="bad">Chưa mở ở phiên bản này.</b>'}</small></div>` +
            o
              .map((d) => {
                const h = d[0],
                  g = OA(h, 39) >= 0;
                return (
                  `<div class="card"><b>${D(h.n.split(" ").slice(0, 2).join(" "))}…</b> <small class="dim">${g ? "Hoàng Kim Môn Phái" : "Bộ chung"} · cấp ${OA(h, 36)}</small><br>` +
                  d
                    .map((f) => {
                      const m = _1.has(f.n) ? gs(f.n) : null,
                        w = a.has(f.n)
                          ? ' <small style="color:#7dff7d">(đang có)</small>'
                          : "";
                      return m
                        ? `<small>✓ ${D(f.n)} → <b style="color:${b0[5] || "#e0e0ff"}">${D(dl(m.n))}</b>${w}</small>`
                        : "";
                    })
                    .filter(Boolean)
                    .join("<br>") +
                  "</div>"
                );
              })
              .join("") ||
          (e < 0
            ? '<p class="dim">Gia nhập môn phái để xem.</p>'
            : '<p class="dim">Không có món nào.</p>');
      } else {
        const e = (a) =>
          `${Math.round(fa[a].boss * 1e3) / 10}% trùm · ${Math.round(fa[a].elite * 1e3) / 10}% tinh anh · ${Math.round(fa[a].normal * 1e4) / 100}% quái thường`;
        t = `<div class="card"><b>Chuỗi rèn</b><br><small>Tím (Lò rèn → Lò Ép Đồ): tinh luyện Huyền Tinh (3 trang sức + ${j(XA())}; 3 viên cùng cấp → 1, thất bại mất 1 viên) → lấy thuộc tính từ đồ xanh thành đá (5.000) → chế tạo phôi Tím trống (10.000, số dòng theo cấp Huyền Tinh) → khảm nạm lần lượt từng dòng (10.000; dòng ẩn đúng hệ; không trùng thuộc tính).<br>Hoàng Kim: gom mảnh từ trùm (9 / 6 / 4 mảnh) ghép thành món bộ.</small></div>
      <div class="card"><b>Huyền Tinh Khoáng Thạch</b> <small class="dim">đang có ${Object.values(T0().ht).reduce((a, i) => a + i, 0)}</small><br><small>Rơi: ${e("ht")} · Dã Tẩu (35% mỗi nhiệm vụ, mỗi 10 nhiệm vụ 3 viên) · Sát Thủ · phó bản · luyện 3 nhẫn / dây chuyền / ngọc bội (Lò rèn → Tinh luyện)</small></div>
      <div class="card"><b>Đá thuộc tính (dòng 1–6)</b> <small class="dim">đang có ${Object.values(T0().ore).reduce((a, i) => a + i, 0)}</small><br><small>Dòng 1/3/5: Huyền Thiết · Mật Ngân · Chu Sa Nguyên Khoáng (không phân hệ) · dòng 2/4/6: Khổng Tước · Phù Dung · Chung Nhũ Nguyên Thạch (đúng hệ món)</small><br>
        <small>Nguồn: <b>Lấy thuộc tính</b> từ đồ xanh (Lò rèn → Lò Ép Đồ, chọn được thuộc tính) · quái rơi: ${e("ore")} · phần thưởng phó bản · tách dòng đồ Tím</small></div>
      <div class="card"><b>Mảnh Hoàng Kim</b> <small class="dim">đang gom ${Object.keys(T0().shard).length} loại</small><br><small>Rơi: ${e("shard")}</small></div>
      <div class="card"><b>Thủy Tinh Trắng / Thần Bí Khoáng Thạch</b> <small class="dim">${N("misc", "wc")} / ${N("misc", "mys")}</small><br><small>Thủy Tinh Trắng: quái cấp ≥ 60 hoặc trùm, rơi ${e("wc")}. Thần Bí Khoáng Thạch: chỉ Trùm Hoàng Kim (1–3 viên) và tầng trùm Thông Thiên Tháp (1 / 2 / 5 viên).</small></div>`;
      }
      J(
        `<h3>Bách khoa</h3><div class="dtabs">${n.map(([e, a]) => `<button data-c="${e}" class="${e === Za ? "on" : ""}">${a}</button>`).join("")}</div><div class="codex">${t}</div>`,
        () => {
          document
            .querySelectorAll("#mBody .dtabs [data-c]")
            .forEach((e) => (e.onclick = () => s(e.dataset.c)));
        },
      );
    },
    Nr = [
      [
        "Hành tẩu tự động",
        "Nhân vật tự đánh quái, nhặt đồ, uống thuốc. Ở thẻ Giang hồ chọn ⚔ Luyện công (đánh ở bãi hợp cấp, tự đổi bãi khi lên cấp) hoặc 📜 Làm nhiệm vụ (tự làm Dã Tẩu, Sát Thủ, đi thuyền, tự chuyển bản đồ). Bạn không cần bấm gì để chơi. Kéo joystick bên trái để tự điều khiển khi muốn; bấm ⚙ Tự động để quay lại.",
        "log",
      ],
      [
        "Trang bị và nhặt đồ",
        "Đồ rơi trên đất, nhân vật tự nhặt món khớp bộ lọc (thẻ Hành trang). Món mạnh hơn được tự mặc (có thể tắt ở thẻ Khác). Bấm vào một món để xem so sánh và lý do thay đổi sức mạnh.",
        "inv",
      ],
      [
        "Điểm tiềm năng và võ công",
        'Mỗi cấp bạn nhận điểm tiềm năng (thẻ Nhân vật) và điểm kỹ năng (thẻ Võ công). Dùng nút + để cộng, − để rút lại, i để xem kỹ năng làm gì, và "Gợi ý" để xem trước cách cộng hiệu quả.',
        "skill",
      ],
      [
        "Rèn đồ",
        'Thẻ Lò rèn, ba chặng: Tím (luyện Huyền Tinh, lấy thuộc tính, chế phôi, khảm nạm), Hoàng Kim Bộ chung / Môn phái (gom mảnh từ trùm). Bật "Tự động rèn đồ" ở thẻ Khác nếu không muốn bấm tay.',
        "forge",
      ],
      [
        "Ép đồ Tím",
        `Thẻ Lò rèn → 💎 Lò Ép Đồ:
1. Tinh luyện: 3 nhẫn / dây chuyền / ngọc bội + 1.000 lượng → 1 Huyền Tinh; 3 viên cùng cấp → 1 viên cấp +1.
2. Lấy thuộc tính: đồ xanh + 1 Huyền Tinh + 5.000 → 1 đá thuộc tính đúng dòng bạn chọn (món nguồn mất).
3. Chế tạo phôi: đồ trắng / xanh + 1 Huyền Tinh + 10.000 → đồ Tím trống, số dòng theo cấp Huyền Tinh (cấp 3 ≈ 5 dòng).
4. Khảm nạm: khảm lần lượt dòng 1 → 6, mỗi dòng 1 đá + 1 Huyền Tinh + 10.000.
Dòng 1/3/5 hiện (Nguyên Khoáng, không phân hệ) · dòng 2/4/6 ẩn (Nguyên Thạch, phải đúng hệ món). Mỗi thuộc tính chỉ 1 lần trên 1 món. Phụ liệu (Thủy Tinh hoặc 5 Phúc Duyên): +15% thành công.`,
        "forge",
      ],
      [
        "Đá thuộc tính và Huyền Tinh ở đâu",
        `ĐÁ THUỘC TÍNH:
• Lấy thuộc tính từ đồ xanh (nguồn chính, chọn được thuộc tính).
• Quái rơi: trùm 20%, tinh anh 3%, quái thường 0,3% (thường hợp hệ / loại đồ đang mặc).
• Phần thưởng phó bản.
HUYỀN TINH:
• Quái rơi: trùm 45%, tinh anh 8%, quái thường 1%.
• Dã Tẩu: 35% mỗi nhiệm vụ, mỗi 10 nhiệm vụ 3 viên. Sát Thủ: mỗi lần hạ 1 viên. Phó bản.
• Luyện từ 3 trang sức thừa.
MẸO: Hành trang → 💎 Đồ để ép Tím: bật tự nhặt đồ trắng, trang sức thừa, đồ xanh có dòng cấp cao; tự cất vào Kho Rèn hoặc Kho chung.`,
        "forge",
      ],
      [
        "Quà và sao lưu",
        "Nút 🎁: điểm danh, mốc cấp, thành tựu, rương Phúc Duyên, sự kiện. Tháp thử thách và Đồng hành ở thẻ Nhiệm vụ › Hoạt động; Chuyển sinh ở thẻ Nhân vật. Game chạy trên máy bạn: hãy vào thẻ Khác → Tải file lưu để sao lưu và chơi trên thiết bị khác.",
        "more",
      ],
    ],
    Lr = {
      pts: 'Bạn có điểm tiềm năng chưa cộng: mở thẻ Nhân vật (nút "Gợi ý" cho cách cộng hiệu quả).',
      skill: "Có điểm kỹ năng: mở thẻ Võ công, bấm i để xem kỹ năng làm gì.",
      forge:
        'Bạn vừa nhặt nguyên liệu rèn (Huyền Tinh / khoáng). thẻ Lò rèn → 💎 Lò Ép Đồ (Huyền Tinh, đá thuộc tính, đồ Tím), hoặc bật "Tự động rèn đồ" ở thẻ Khác.',
      gift: "Có quà chờ nhận ở nút 🎁.",
      full: "Hành trang gần đầy: chỉnh bộ lọc nhặt đồ ở thẻ Hành trang để bớt đồ thừa.",
    },
    Za = "zone",
    qr = function (A) {
      const n = n8();
      if (!A || typeof A != "object") return n;
      ((n.id = typeof A.id == "string" ? A.id : n.id),
        (n.rev = Math.max(0, +A.rev || 0)),
        (n.at = Math.max(0, +A.at || 0)),
        (n.gold = Number.isFinite(+A.gold)
          ? Math.max(0, Math.floor(+A.gold))
          : 0),
        (n.items = (Array.isArray(A.items) ? A.items : [])
          .filter(
            (t) =>
              t &&
              typeof t == "object" &&
              Array.isArray(t.base) &&
              Array.isArray(t.mag),
          )
          .slice(0, O2)));
      for (const t of n.items)
        (t.set && /[\u3400-\u9fff]/.test(t.n) && (t.n = setNameVi(t.n)), Gn(t));
      if (
        ((n.items = n.items.filter(
          (t) => !y3(t) && !(typeof SA == "function" && SA(t)),
        )),
        typeof jA == "function")
      ) {
        let t = 0;
        ((n.items = n.items.filter((e) =>
          jA(e) ? ((t += typeof y0 == "function" ? y0(e) : 0), !1) : !0,
        )),
          (n.gold += Math.min(2e8, Math.round(t))));
      }
      for (const t of n.items)
        (t.set && /[\u3400-\u9fff]/.test(t.n) && (t.n = setNameVi(t.n)),
          Gn(t),
          typeof J5 == "function" && J5(t));
      for (const t of ["ht", "ore", "shard", "misc"])
        for (const e in (A.mats || {})[t] || {}) {
          const a = Math.floor(+A.mats[t][e]);
          a > 0 && (n.mats[t][e] = a);
        }
      return n;
    },
    q1 = function () {
      let A = null;
      try {
        A = localStorage.getItem(n1);
      } catch {
        return { st: n8(), err: "storage" };
      }
      if (!A) return { st: n8() };
      const n = (i) => {
          try {
            const o = QA(i);
            return o.ok ? qr(o.state) : null;
          } catch {
            return null;
          }
        },
        t = n(A);
      if (t) return { st: t };
      let e = null;
      try {
        e = localStorage.getItem(n1 + "_bak");
      } catch {}
      const a = e && n(e);
      return a ? { st: a, restored: !0 } : { st: n8(), err: "tampered" };
    },
    jr = function (A) {
      (A.rev++, (A.at = Math.max(Date.now(), (A.at || 0) + 1)));
      const n = localStorage.getItem(n1);
      if (n)
        try {
          QA(n).ok && localStorage.setItem(n1 + "_bak", n);
        } catch {}
      localStorage.setItem(n1, J1(A));
    },
    me = function (A) {
      const { st: n, err: t } = q1();
      if (t === "tampered")
        return {
          ok: !1,
          msg: "Kho đã bị chỉnh sửa ngoài game (sai chữ ký), không dùng được",
        };
      if (t) return { ok: !1, msg: "Không đọc được bộ nhớ trình duyệt" };
      let e;
      try {
        e = A(n);
      } catch (i) {
        return { ok: !1, msg: i.message || "Lỗi kho" };
      }
      if (!e || !e.ok) return e || { ok: !1, msg: "" };
      const a = () => (
        e.undo && e.undo(),
        B(),
        { ok: !1, msg: "Không ghi được kho (bộ nhớ đầy hoặc bị chặn)" }
      );
      if (e.from === "char") {
        B();
        try {
          jr(n);
        } catch {
          return a();
        }
      } else {
        try {
          jr(n);
        } catch {
          return (
            e.undo && e.undo(),
            { ok: !1, msg: "Không ghi được kho (bộ nhớ đầy hoặc bị chặn)" }
          );
        }
        B();
      }
      return (tb(), e);
    },
    tb = function () {
      typeof g0 != "function" ||
        !g0() ||
        typeof k > "u" ||
        !k.user ||
        !r ||
        !r.fac ||
        typeof rA != "function" ||
        (clearTimeout(Ef),
        (Ef = setTimeout(() => {
          rA().catch(() => y("Chưa tải được kho lên máy chủ, sẽ thử lại"));
        }, 1500)));
    },
    eb = async function (A) {
      if (
        typeof g0 != "function" ||
        !g0() ||
        typeof k > "u" ||
        !k.user ||
        typeof v0 != "function" ||
        (!A && Date.now() - zr < 2e4)
      )
        return !1;
      zr = Date.now();
      try {
        const n = await v0((e) =>
          e.from("saves").select("data").eq("owner", k.user.id),
        );
        let t = !1;
        for (const e of n.data || []) Ur(i3(e.data).k) && (t = !0);
        return t;
      } catch {
        return !1;
      }
    },
    A3 = function (A) {
      return r.inv.includes(A)
        ? me((n) => {
            if (n.items.length >= O2)
              return { ok: !1, msg: `Kho đầy (${O2} món)` };
            const t = db(A),
              e = r.inv.indexOf(A);
            return (
              r.inv.splice(e, 1),
              n.items.push(t),
              (Y = !0),
              {
                ok: !0,
                from: "char",
                msg: `Gửi vào kho: ${A.n}`,
                undo: () => {
                  (r.inv.splice(e, 0, A), (Y = !0));
                },
              }
            );
          })
        : {
            ok: !1,
            msg: "Chỉ gửi được món trong hành trang (không phải đồ đang mặc)",
          };
    },
    ab = function (A) {
      return r.inv.length >= INV_MAX
        ? { ok: !1, msg: "Hành trang đầy" }
        : me((n) => {
            const t = n.items[A];
            return t
              ? (n.items.splice(A, 1),
                (t.uid = r.uid++),
                r.inv.unshift(t),
                (Y = !0),
                (c.dirty = !0),
                {
                  ok: !0,
                  msg: `Lấy ra: ${t.n}`,
                  undo: () => {
                    r.inv.shift();
                  },
                })
              : { ok: !1, msg: "Món không còn trong kho" };
          });
    },
    A8 = function (A, n) {
      return (
        (n = Math.floor(+n)),
        n > 0
          ? me((t) =>
              A === "in"
                ? n > r.gold
                  ? { ok: !1, msg: "Không đủ ngân lượng" }
                  : ((r.gold -= n),
                    (t.gold += n),
                    {
                      ok: !0,
                      from: "char",
                      msg: `Gửi ${j(n)} lượng`,
                      undo: () => {
                        r.gold += n;
                      },
                    })
                : n > t.gold
                  ? { ok: !1, msg: "Kho không đủ ngân lượng" }
                  : ((t.gold -= n),
                    (r.gold += n),
                    {
                      ok: !0,
                      msg: `Rút ${j(n)} lượng`,
                      undo: () => {
                        r.gold -= n;
                      },
                    }),
            )
          : { ok: !1, msg: "Nhập số ngân lượng" }
      );
    },
    Tf = function (A, n, t, e) {
      return me((a) => {
        const i = A === "in" ? N(n, t) : a.mats[n][t] || 0;
        return (
          (e = e == null ? i : Math.min(i, Math.floor(+e))),
          e > 0
            ? (A === "in"
                ? (V(n, t, -e), (a.mats[n][t] = (a.mats[n][t] || 0) + e))
                : ((a.mats[n][t] -= e),
                  a.mats[n][t] <= 0 && delete a.mats[n][t],
                  V(n, t, e)),
              {
                ok: !0,
                from: A === "in" ? "char" : "stash",
                msg: `${A === "in" ? "Gửi" : "Rút"} ${e} ${Cf(n, t)}`,
                undo: () => V(n, t, A === "in" ? e : -e),
              })
            : { ok: !1, msg: "Không có gì để chuyển" }
        );
      });
    },
    Cf = function (A, n) {
      if (A === "ht") return `Huyền Tinh cấp ${n}`;
      if (A === "shard") return `Mảnh ${n}`;
      if (A === "misc") return x2(n);
      const t = BA(n),
        e = Lt(t.a)[0];
      return `Khoáng dòng ${t.place + 1} · ${e ? e.n : W0(t.a)} · cấp ${t.lvl}`;
    },
    sb = function () {
      const { st: A } = q1();
      return JSON.stringify({
        game: "jxidle-stash",
        v: Of,
        exported: Date.now(),
        data: J1(A),
      });
    },
    ib = function (A) {
      if (
        ((A = String(A || "")
          .trim()
          .replace(/^﻿/, "")),
        !A)
      )
        throw new Error("File rỗng");
      const n = JSON.parse(A);
      if (!n || n.game !== "jxidle-stash" || typeof n.data != "string")
        throw new Error("Không phải file kho của game");
      const t = QA(n.data);
      if (!t.ok) throw new Error("File đã bị chỉnh sửa (sai chữ ký)");
      return qr(t.state);
    },
    rb = function (A) {
      const n = q1(),
        t = qr(A);
      t.rev = Math.max(n.st.rev, t.rev);
      try {
        jr(t);
      } catch {
        return { ok: !1, msg: "Không ghi được kho" };
      }
      return { ok: !0, msg: "Đã nạp kho từ file" };
    },
    ob = function (A, n) {
      return `<button class="it r${A.r}${f0(A) ? "" : " bad"}" data-si="${n}" title="${D(A.n)}">${A.ic ? `<img src="${D(A.ic)}" alt="">` : ""}<i>${A.lvl}</i>${A.s >= 0 && A.s < 5 ? `<b class="s5" style="background:${m0[A.s]}"></b>` : ""}${A.enh ? `<em>+${A.enh}</em>` : ""}</button>`;
    },
    pt = function (A, n) {
      (y(A.msg || (A.ok ? "Xong" : "Không thực hiện được")),
        A.ok && i0("use"),
        n !== !1 && Dt(),
        F());
    },
    Dt = function s(A) {
      if (
        (A && (ue = A),
        typeof g0 == "function" &&
          g0() &&
          typeof k < "u" &&
          k.user &&
          Date.now() - zr >= 2e4)
      ) {
        (J(
          '<h3>Kho chung</h3><p class="desc">Đang đồng bộ kho với máy chủ…</p>',
        ),
          eb(!0).finally(() => s(A)));
        return;
      }
      const { st: n, err: t } = q1(),
        e = [
          ["item", "Đồ"],
          ["mat", "Nguyên liệu"],
          ["gold", "Ngân lượng"],
        ].concat(typeof g0 == "function" && g0() ? [] : [["file", "File kho"]]);
      ue === "file" && e.length < 4 && (ue = "item");
      let a = "";
      if (
        (t &&
          (a = `<p class="reqbad">${t === "tampered" ? "Kho đã bị chỉnh sửa ngoài game (sai chữ ký) và không có bản sao lưu hợp lệ. Có thể nạp lại từ file kho." : "Không đọc được bộ nhớ trình duyệt."}</p>`),
        ue === "item")
      )
        a += `<p class="desc">Bấm món trong <b>hành trang</b> để gửi vào kho. Bấm món trong <b>kho</b> để xem và lấy ra. Kho dùng chung cho cả 3 slot (${n.items.length}/${O2} món).</p>
      <h3>Hành trang <small>${r.inv.length}/${INV_MAX}</small></h3><div class="invgrid" id="stInv">${r.inv.map(T1).join("") || '<small class="dim">Trống</small>'}</div>
      <h3>Kho chung <small>${n.items.length}/${O2}</small></h3><div class="invgrid" id="stBox">${n.items.map(ob).join("") || '<small class="dim">Kho trống</small>'}</div>`;
      else if (ue === "mat") {
        const i = [];
        for (const o of ["ht", "ore", "shard", "misc"])
          for (const l of new Set([
            ...Object.keys(T0()[o]),
            ...Object.keys(n.mats[o]),
          ]))
            i.push([o, l]);
        a +=
          '<p class="desc">Nguyên liệu rèn đang có / trong kho.</p>' +
          (i
            .map(
              ([o, l]) =>
                `<div class="qrow"><span>${D(Cf(o, l))}<small>có ${N(o, l)} · kho ${n.mats[o][l] || 0}</small></span><span></span><span class="pm"><button class="btn sm" data-mi="${o}|${l}" ${N(o, l) ? "" : "disabled"}>Gửi hết</button><button class="btn sm" data-mo="${o}|${l}" ${n.mats[o][l] ? "" : "disabled"}>Rút hết</button></span></div>`,
            )
            .join("") || '<small class="dim">Chưa có nguyên liệu</small>');
      } else
        ue === "gold"
          ? (a += `<p class="desc">Ngân lượng: bạn <b>${j(r.gold)}</b> · kho <b>${j(n.gold)}</b>.</p><div class="row"><input type="number" id="stGold" min="1" placeholder="Số lượng"></div>
      <div class="btnrow"><button class="btn" id="stIn">Gửi vào kho</button><button class="btn" id="stOut">Rút ra</button><button class="btn" id="stInAll">Gửi hết</button><button class="btn" id="stOutAll">Rút hết</button></div>`)
          : (a += `<p class="desc">Chuyển kho sang thiết bị khác: tải file kho (.jxkho) ở đây, nạp ở thiết bị kia. Nạp file sẽ <b>thay thế</b> kho hiện tại. File có chữ ký, sửa tay sẽ bị từ chối.</p>
      <div class="btnrow"><button class="btn" id="stDl">Tải file kho</button><button class="btn red" id="stUp">Nạp file kho</button></div>`);
      J(
        `<h3>Kho chung <small>${j(n.gold)} lượng · ${n.items.length} món</small></h3><div class="btnrow"><button class="btn sm" id="stDon">🧹 Dọn kho (bán / luyện đồ thừa)</button></div><div class="dtabs" id="stTabs">${e.map(([i, o]) => `<button data-st="${i}" class="${i === ue ? "on" : ""}">${o}</button>`).join("")}</div>${a}`,
        () => {
          const i = (h) => document.querySelectorAll("#mBody " + h);
          (((h, g) => {
            const f = u(h);
            f && (f.onclick = g);
          })("#stDon", () => n3()),
            i("#stTabs [data-st]").forEach(
              (h) => (h.onclick = () => s(h.dataset.st)),
            ),
            i("#stInv .it").forEach(
              (h) =>
                (h.onclick = () => {
                  const g = r.inv.find((f) => f.uid === +h.dataset.uid);
                  g && pt(A3(g));
                }),
            ),
            i("#stBox .it").forEach(
              (h) => (h.onclick = () => lb(+h.dataset.si)),
            ),
            i("[data-mi]").forEach(
              (h) =>
                (h.onclick = () => {
                  const [g, f] = h.dataset.mi.split("|");
                  pt(Tf("in", g, f));
                }),
            ),
            i("[data-mo]").forEach(
              (h) =>
                (h.onclick = () => {
                  const [g, f] = h.dataset.mo.split("|");
                  pt(Tf("out", g, f));
                }),
            ));
          const l = () => u("#stGold").value,
            d = (h, g) => {
              const f = u(h);
              f && (f.onclick = g);
            };
          (d("#stIn", () => pt(A8("in", l()))),
            d("#stOut", () => pt(A8("out", l()))),
            d("#stInAll", () => pt(A8("in", r.gold))),
            d("#stOutAll", () => pt(A8("out", q1().st.gold))),
            d("#stDl", () => {
              const h = new Blob([sb()], { type: "application/json" }),
                g = document.createElement("a");
              ((g.href = URL.createObjectURL(h)),
                (g.download = `jxidle_kho_${new Date().toISOString().slice(0, 10)}.jxkho`),
                document.body.appendChild(g),
                g.click(),
                setTimeout(() => {
                  (URL.revokeObjectURL(g.href), g.remove());
                }, 1500),
                y("Đã tải file kho"));
            }),
            d("#stUp", () => {
              const h = document.createElement("input");
              ((h.type = "file"),
                (h.accept = ".jxkho,.json"),
                (h.style.display = "none"),
                (h.onchange = () => {
                  const g = h.files && h.files[0];
                  if ((h.remove(), !g)) return;
                  const f = new FileReader();
                  ((f.onload = () => cb(String(f.result))), f.readAsText(g));
                }),
                document.body.appendChild(h),
                h.click());
            }));
        },
      );
    },
    lb = function (A) {
      const n = q1().st.items[A];
      if (!n) {
        Dt();
        return;
      }
      J(
        `${en(n)}<div class="btnrow"><button class="btn" id="stTake">Lấy ra</button><button class="btn" id="stBack">Quay lại</button></div>`,
        () => {
          ((u("#stTake").onclick = () => pt(ab(A))),
            (u("#stBack").onclick = () => Dt()));
        },
      );
    },
    cb = function (A) {
      let n;
      try {
        n = ib(A);
      } catch (e) {
        y(e.message || "File không hợp lệ");
        return;
      }
      const t = q1().st;
      J(
        `<h3>Nạp file kho</h3><p class="desc">File: <b>${n.items.length}</b> món, <b>${j(n.gold)}</b> lượng. Kho hiện tại: ${t.items.length} món, ${j(t.gold)} lượng. Nạp sẽ <b>thay thế</b> kho hiện tại.</p>
    <div class="btnrow"><button class="btn red" id="stOk">Thay thế kho</button><button class="btn" id="stNo">Hủy</button></div>`,
        () => {
          ((u("#stOk").onclick = () => {
            const e = rb(n);
            (y(e.msg), Dt());
          }),
            (u("#stNo").onclick = () => Dt("file")));
        },
      );
    },
    n1 = "jxidle_stash",
    O2 = 60,
    Of = 1,
    n8 = () => ({
      v: Of,
      id: Math.random().toString(36).slice(2, 10),
      rev: 0,
      gold: 0,
      items: [],
      mats: { ht: {}, ore: {}, shard: {}, misc: {} },
    }),
    db = (s) => JSON.parse(JSON.stringify(s)),
    Ef = 0,
    zr = 0,
    ue = "item",
    t8 = function (A, n) {
      return !mb(A) ||
        (A.lvl || 1) > x0.lv ||
        (n && !A.set && typeof IA == "function" && IA(A))
        ? ""
        : A.vio
          ? x0.vio && !A.enh
            ? "vio"
            : ""
          : x0.jew && ub(A)
            ? "jew"
            : A.set
              ? x0.gold && !Ge(A) && !A.enh
                ? "gold"
                : ""
              : hA(A)
                ? ""
                : (A.r || 0) === 0
                  ? x0.white
                    ? "white"
                    : ""
                  : x0.blue
                    ? "blue"
                    : "";
    },
    If = function () {
      const A = { inv: [], box: [], st: [], jew: 0, stJew: [], gold: 0 },
        n = (t, e, a) => {
          const i = t8(e, a);
          if (i) {
            if (i === "jew") {
              t === "st" ? A.stJew.push(e) : A.jew++;
              return;
            }
            (A[t].push(e), (A.gold += y0(e)));
          }
        };
      if (x0.inv) for (const t of r.inv) n("inv", t, !0);
      if (x0.box) for (const t of s0()) n("box", t, !0);
      if (x0.st) {
        const { st: t, err: e } = q1();
        if (!e) for (const a of t.items) n("st", a, !1);
      }
      return A;
    },
    fb = function () {
      const A = { moved: 0, fused: 0, sold: 0, gold: 0, msg: [] };
      if (x0.st && x0.jew && w0()) {
        const t = me((e) => {
          const a = e.items
            .filter((i) => t8(i, !1) === "jew")
            .slice(0, Math.max(0, A1 - s0().length));
          if (!a.length) return { ok: !1 };
          e.items = e.items.filter((i) => !a.includes(i));
          for (const i of a) s0().push(i);
          return {
            ok: !0,
            from: "stash",
            n: a.length,
            undo: () => {
              for (const i of a) {
                const o = s0().indexOf(i);
                o >= 0 && s0().splice(o, 1);
              }
            },
          };
        });
        t && t.ok && (A.moved = t.n);
      }
      if (x0.jew && w0()) {
        const t = {};
        for (let e = 0; e < 200; e++) {
          const a = Ve(
            wt().filter(
              (o) =>
                (o.lvl || 1) <= x0.lv &&
                (x0.inv || !r.inv.includes(o)) &&
                (x0.box || x0.st || !s0().includes(o)),
            ),
          );
          if (a.length < 3 || r.gold < XA()) break;
          const i = hs(a);
          if (!i.ok) break;
          (A.fused++, (t[i.lvl] = (t[i.lvl] || 0) + 1));
        }
        A.fused &&
          A.msg.push(
            `luyện ${A.fused} Huyền Tinh (${Object.entries(t)
              .map(([e, a]) => `${a}×c${e}`)
              .join(", ")})`,
          );
      }
      const n = If();
      for (const [t, e] of [
        ["inv", n.inv],
        ["box", n.box],
      ])
        for (const a of e) {
          const i = t === "inv" ? r.inv : s0(),
            o = i.indexOf(a);
          if (o < 0) continue;
          i.splice(o, 1);
          const l = y0(a);
          ((r.gold += l), (A.gold += l), A.sold++);
        }
      if (x0.st && n.st.length) {
        const t = me((e) => {
          const a = [],
            i = [];
          for (const l of e.items)
            (t8(l, !1) && t8(l, !1) !== "jew" ? i : a).push(l);
          if (!i.length) return { ok: !1 };
          const o = i.reduce((l, d) => l + y0(d), 0);
          return (
            (e.items = a),
            (r.gold += o),
            {
              ok: !0,
              from: "stash",
              n: i.length,
              v: o,
              undo: () => {
                r.gold -= o;
              },
            }
          );
        });
        t && t.ok && ((A.sold += t.n), (A.gold += t.v));
      }
      return (
        A.moved &&
          A.msg.unshift(
            `chuyển ${A.moved} trang sức từ Kho chung sang Kho Rèn`,
          ),
        A.sold && A.msg.push(`bán ${A.sold} món (+${j(A.gold)} lượng)`),
        (Y = !0),
        (c.dirty = !0),
        B(),
        A
      );
    },
    Sf = function () {
      const A = { inv: [], box: [], st: [], gold: 0, kind: {} },
        n = (t, e) => {
          if (!Nf(e)) return;
          (A[t].push(e), (A.gold += y0(e)));
          const a =
            e.thanma || (typeof O0 == "function" && O0(e))
              ? "Ngựa"
              : e.vio
                ? "Tím"
                : N8[e.r || 0] || "Thường";
          A.kind[a] = (A.kind[a] || 0) + 1;
        };
      if (x0.inv) for (const t of r.inv) n("inv", t);
      if (x0.box) for (const t of s0()) n("box", t);
      if (x0.st) {
        const { st: t, err: e } = q1();
        if (!e) for (const a of t.items) n("st", a);
      }
      return A;
    },
    hb = function () {
      const A = Sf();
      let n = 0,
        t = 0;
      for (const [e, a] of [
        [r.inv, A.inv],
        [s0(), A.box],
      ])
        for (const i of a) {
          const o = e.indexOf(i);
          if (o < 0) continue;
          e.splice(o, 1);
          const l = y0(i);
          ((r.gold += l), (t += l), n++);
        }
      if (x0.st && A.st.length) {
        const e = me((a) => {
          const i = [],
            o = [];
          for (const d of a.items) (Nf(d) ? o : i).push(d);
          if (!o.length) return { ok: !1 };
          const l = o.reduce((d, h) => d + y0(h), 0);
          return (
            (a.items = i),
            (r.gold += l),
            {
              ok: !0,
              from: "stash",
              n: o.length,
              v: l,
              undo: () => {
                r.gold -= l;
              },
            }
          );
        });
        e && e.ok && ((n += e.n), (t += e.v));
      }
      return ((Y = !0), (c.dirty = !0), B(), { n, g: t });
    },
    gb = function () {
      const A = Sf(),
        n = A.inv.length + A.box.length + A.st.length,
        t = [
          x0.inv && `Hành trang ${A.inv.length}`,
          x0.box && `Kho Rèn ${A.box.length}`,
          x0.st && `Kho chung ${A.st.length}`,
        ]
          .filter(Boolean)
          .join(" · "),
        e = ["Tím", "Hoàng Kim", "Bạch Kim", "Ngựa"].filter((a) => A.kind[a]);
      J(
        `<h3>⚠ Dọn hết</h3>
    <div class="card warnc"><b class="bad">Lưu ý: bán TOÀN BỘ ${n} món, không lấy lại được.</b>
      <div class="small">Không xét bộ lọc, cấp, độ hiếm: bán cả đồ Tím / phôi, Hoàng Kim, ngựa, trang sức.</div>
      <div class="small">Chỉ giữ: món khóa 🔒, đồ đang mặc, đồ cần cho Dã Tẩu.</div></div>
    <table class="dktbl small"><tr><th>Nơi</th><td>${t || "—"}</td></tr>
      <tr><th>Loại</th><td>${
        Object.entries(A.kind)
          .map(([a, i]) => `${a} ${i}`)
          .join(" · ") || "—"
      }</td></tr>
      <tr><th>Nhận</th><td><b>+${j(A.gold)} lượng</b></td></tr></table>
    ${e.length ? `<p class="small bad">Có ${e.map((a) => `${A.kind[a]} ${a}`).join(", ")}: hãy khóa 🔒 món muốn giữ trước khi dọn.</p>` : ""}
    <div class="btnrow"><button class="btn red" id="dhGo" ${n ? "" : "disabled"}>Xác nhận dọn hết ${n} món</button><button class="btn" id="dhNo">Quay lại</button></div>`,
        () => {
          ((u("#dhNo").onclick = () => n3()),
            (u("#dhGo").onclick = () => {
              const a = hb(),
                i = a.n
                  ? `Dọn hết: bán ${a.n} món (+${j(a.g)} lượng)`
                  : "Không có gì để dọn";
              (y(i), M(`<span class="dim">🧹 ${i}.</span>`), F(), n3());
            }));
        },
      );
    },
    n3 = function s() {
      const { st: A, err: n } = q1(),
        t = If(),
        e = t.stJew.length,
        a = t.jew + e,
        i = Math.floor(a / 3),
        o = (d, h) =>
          `<label class="small" style="display:block"><input type="checkbox" data-dk="${d}" ${x0[d] ? "checked" : ""}> ${h}</label>`,
        l = (d, h, g) => `<tr><td>${d}</td><td>${h}</td><td>${g}</td></tr>`;
      J(
        `<h3>🧹 Dọn kho</h3>
    <div class="card"><b>Dọn ở đâu</b>
      ${o("inv", `Hành trang <small class="dim">${r.inv.length}/${INV_MAX}</small>`)}
      ${o("box", `Kho Rèn <small class="dim">${s0().length}/${A1}</small>`)}
      ${o("st", `Kho chung <small class="dim">${n ? "không đọc được" : `${A.items.length}/${O2}`} · dùng chung 3 nhân vật, xét theo bộ lọc của nhân vật này</small>`)}</div>
    <div class="card"><b>Dọn gì</b>
      ${w0() ? o("jew", "Nhẫn / dây chuyền / ngọc bội thừa → luyện Huyền Tinh") : ""}
      ${o("white", "Bán đồ trắng")}
      ${o("blue", "Bán đồ xanh không khớp bộ lọc nhặt đồ")}
      ${w0() ? o("vio", "Bán đồ Tím / phôi Tím (không tốt hơn đồ đang mặc, chưa cường hóa)") : ""}
      ${o("gold", "Bán Hoàng Kim không thuộc bộ đang giữ (bộ phái khác / ngoài danh sách giữ, chưa cường hóa)")}
      <div class="row small">Chỉ dọn món cấp ≤ <select id="dkLv">${Array.from({ length: 10 }, (d, h) => `<option value="${h + 1}" ${x0.lv === h + 1 ? "selected" : ""}>${h + 1}</option>`).join("")}</select></div></div>
    <table class="dktbl small"><tr><th>Nơi</th><th>Bán</th><th>Trang sức luyện</th></tr>
      ${l("Hành trang", x0.inv ? t.inv.length : "—", "")}${l("Kho Rèn", x0.box ? t.box.length : "—", "")}${l("Kho chung", x0.st ? t.st.length : "—", x0.st ? e : "—")}
      ${l("<b>Tổng</b>", `<b>${t.inv.length + t.box.length + t.st.length}</b> (+${j(t.gold)} lượng)`, x0.jew && w0() ? `<b>${a}</b> → ~${i} Huyền Tinh (${j(XA())}/lần)` : "—")}</table>
    <p class="dim small">Luôn giữ: món khóa 🔒, ${x0.vio ? "" : "đồ Tím / phôi, "}Thần Mã, đồ đang mặc hoặc tốt hơn đồ đang mặc, đồ cần cho Dã Tẩu.</p>
    <div class="btnrow"><button class="btn red" id="dkGo">Dọn ngay</button><button class="btn red" id="dkAll" title="Bán toàn bộ, chỉ giữ món khóa">⚠ Dọn hết</button><button class="btn" id="dkNo">Đóng</button></div>`,
        () => {
          (document.querySelectorAll("#mBody [data-dk]").forEach(
            (d) =>
              (d.onchange = () => {
                ((x0[d.dataset.dk] = d.checked), s());
              }),
          ),
            (u("#dkLv").onchange = (d) => {
              ((x0.lv = +d.target.value), s());
            }),
            (u("#dkNo").onclick = () => t0()),
            (u("#dkAll").onclick = () => gb()),
            (u("#dkGo").onclick = () => {
              const d = fb(),
                h = d.msg.length
                  ? "Dọn kho: " + d.msg.join(", ")
                  : "Không có gì để dọn";
              (y(h), M(`<span class="dim">🧹 ${h}.</span>`), F(), s());
            }));
        },
      );
    },
    x0 = {
      inv: !0,
      box: !0,
      st: !1,
      jew: !0,
      white: !0,
      blue: !0,
      gold: !1,
      vio: !1,
      lv: 10,
    },
    mb = (s) =>
      !!s &&
      !s.lock &&
      !s.plv &&
      !s.thanma &&
      !(typeof U0 == "function" && U0(s)) &&
      !Object.values(r.eq).includes(s),
    ub = (s) => w0() && U1.includes(s.d) && !s.set,
    Nf = (s) =>
      !!s &&
      !s.lock &&
      !Object.values(r.eq).includes(s) &&
      !(typeof U0 == "function" && U0(s)),
    wb = function (A) {
      return (
        (A = String(A || "")
          .replace(/\s+/g, " ")
          .trim()),
        A.length < Qr
          ? { ok: !1, msg: `Tên cần ít nhất ${Qr} ký tự` }
          : A.length > e8
            ? { ok: !1, msg: `Tên tối đa ${e8} ký tự` }
            : uA.some((n) => n.n.toLowerCase() === A.toLowerCase()) ||
                /^tân thủ$/i.test(A)
              ? { ok: !1, msg: "Không dùng tên môn phái" }
              : /[\[\]【】()]|^\s*(bot|gm|admin|hệ thống|he thong)(\s|$)/i.test(
                    A,
                  )
                ? { ok: !1, msg: "Tên không được giả AI / hệ thống" }
                : /[<>"'`\\]/.test(A)
                  ? { ok: !1, msg: "Tên có ký tự không hợp lệ" }
                  : { ok: !0, n: A }
      );
    },
    E2 = function (A) {
      const n = HA() ? r.name : "";
      if (n && !s8()) {
        J(
          `<h3>Đổi Tên</h3><p class="desc">Nhân vật <b>${D(n)}</b> đã dùng hết lượt Đổi Tên. Mỗi nhân vật được Đổi Tên ${a8} lần.</p><div class="btnrow"><button class="btn" id="nmNo">Đóng</button></div>`,
          () => {
            u("#nmNo").onclick = () => t0();
          },
        );
        return;
      }
      J(
        `<h3>${n ? "Đổi Tên" : "Đặt tên nhân vật"}</h3>
    <p class="desc">${n ? "" : "Nhân vật này tạo từ bản cũ nên chưa có tên riêng. "}Tên hiện trên đầu nhân vật, và trong chat thế giới.${n ? ` <b class="cn">Mỗi nhân vật được Đổi Tên ${a8} lần, còn ${s8()} lượt.</b>` : ""}</p>
    <div class="row">Tên <input id="nmIn" maxlength="${e8}" placeholder="${Qr}–${e8} ký tự" value="${D(n)}"></div>
    <div class="btnrow"><button class="btn" id="nmOk">Lưu tên</button><button class="btn" id="nmNo">Để sau</button></div>`,
        () => {
          const t = u("#nmIn");
          setTimeout(() => t.focus(), 0);
          let e = !1;
          const a = async () => {
            if (e) return;
            const i = wb(t.value);
            if (!i.ok) return y(i.msg);
            if (n && i.n === n) return y("Tên mới trùng tên cũ");
            const o = typeof k < "u" && k.user && typeof v0 == "function";
            ((e = !0), (u("#nmOk").disabled = !0));
            try {
              if (o) {
                const h = await v0((f) =>
                    f
                      .from("chars")
                      .select("owner,slot")
                      .ilike(
                        "name",
                        i.n.replace(/[\\%_]/g, (m) => "\\" + m),
                      )
                      .limit(1),
                  ),
                  g = h && h.data && h.data[0];
                if (g && !(g.owner === k.user.id && +g.slot == +nA)) {
                  y(
                    `Tên "${i.n}" đã có người dùng — chọn tên khác (không mất lượt)`,
                  );
                  return;
                }
              }
              const l = r.name,
                d = r.renamed | 0;
              if (
                (n && (r.renamed = d + 1),
                (r.name = i.n),
                o && typeof hn == "function")
              ) {
                k.lastChar = 0;
                try {
                  await hn(!0);
                } catch (h) {
                  if (
                    /duplicate|unique|chars_name|23505/i.test(
                      String(h && (h.message || h)),
                    )
                  ) {
                    ((r.name = l),
                      (r.renamed = d),
                      y(
                        `Tên "${i.n}" vừa có người dùng — chọn tên khác (không mất lượt)`,
                      ));
                    return;
                  }
                }
              }
              (B(),
                M(`${n ? "Đổi Tên" : "Đặt tên nhân vật"}: <b>${D(i.n)}</b>`),
                t0(!0),
                F(),
                A && A());
            } catch (l) {
              y("Không kiểm tra được tên: " + (l.message || l) + " — thử lại");
            } finally {
              e = !1;
              const l = u("#nmOk");
              l && (l.disabled = !1);
            }
          };
          ((u("#nmOk").onclick = a),
            (t.onkeydown = (i) => {
              i.key === "Enter" && a();
            }),
            (u("#nmNo").onclick = () => t0()));
        },
      );
    },
    Qr = 2,
    e8 = 14,
    HA = () =>
      !!(
        r &&
        r.name &&
        r.name !== "Tân thủ" &&
        !uA.some((s) => s.n === r.name)
      ),
    a8 = 5,
    s8 = () => Math.max(0, a8 - (r.renamed | 0)),
    pb = () => !HA() || s8() > 0;
  window.CHAT_CFG = {
    internal: true,
    url: "",
  };
