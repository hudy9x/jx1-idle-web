var Ws = {
      头部: 0,
      发型: 1,
      肩膀: 4,
      躯体: 5,
      左手: 6,
      右手: 7,
      左手武器: 8,
      右手武器: 9,
      马前: 12,
      马中: 13,
      马后: 14,
    },
    jp = Object.fromEntries(Object.entries(Ws).map(([s, A]) => [A, s])),
    jc = {
      头部: "helm",
      发型: "helm",
      肩膀: "armor",
      躯体: "armor",
      左手: "armor",
      右手: "armor",
      左手武器: "weapon",
      右手武器: "weapon",
      马前: "horse",
      马中: "horse",
      马后: "horse",
    },
    w5 = (s, A) => (A.startsWith("m:") ? "m/" + A.slice(2) : s + "/" + A),
    Zs = () => !!h0 && r && r.jxLook !== !1,
    zc = {
      ovan: 5,
      xtho: 13,
      tanh: 3,
      dlo: 2,
      cdsu: 11,
      pvan: 1,
      btieu: 6,
      xlc: 9,
      duhuy: 4,
      tdia: 0,
      dvu: 8,
      squang: 10,
      pvu: 7,
      hhlc: 15,
      bhv: 11,
      pvtm: 10,
    },
    Qc = {
      "Bôn Tiêu": 6,
      "Phiên Vũ": 7,
      "Phi Vân": 1,
      "Xích Long Câu": 9,
      "Tuyệt Địa": 0,
      "Du Huy": 4,
      "Đằng Vụ": 8,
      "Siêu Quang": 10,
      "Kim Tinh Hổ Vương": 10,
      "Hỏa Tinh Kim Hổ Vương": 13,
      "Kim Tinh Bạch Hổ Vương": 11,
      "Long Tinh Hắc Hổ Vương": 3,
      "Hãn Huyết Long Câu": 15,
      "Phong Vân Bạch Mã": 11,
      "Phong Vân Chiến Mã": 2,
      "Phong Vân Thần Mã": 10,
      "Sư tử": 10,
      "Lạc đà": 9,
      "Dương Đà": 0,
      "Hươu đốm": 9,
      "Dương Sa": 7,
      "Ngự Phong": 8,
      "Truy điện": 4,
      "Lưu Tinh": 1,
    },
    zp = {
      6: 10,
      7: 11,
      8: 12,
      9: 13,
      11: 15,
      13: 17,
      14: 18,
      15: 19,
      16: 20,
      17: 21,
      18: 22,
      19: 11,
      20: 11,
      21: 11,
      22: 23,
      23: 24,
      24: 25,
      25: 26,
      30: 11,
      31: 13,
      32: 17,
    },
    Qp = {
      "Ô Vân Đạp Tuyết": 5,
      "Xích Thố": 0,
      "Tuyệt Ảnh": 9,
      "Tuyệt ảnh": 9,
      "Đích Lô": 2,
      "Chiếu Dạ Ngọc Sư Tử": 1,
    },
    Gc = { helm: "头部", armor: "躯体", melee: "右手武器", range: "右手武器" },
    p5 = new Map(),
    Gp = { st: 120, run: 85 },
    WA = function () {
      return r.snd || (r.snd = { on: !0, vol: 0.7, music: !0, mvol: 0.4 });
    },
    D5 = function () {
      if (o0.ctx) {
        o0.ctx.state === "suspended" && o0.ctx.resume();
        return;
      }
      const A = window.AudioContext || window.webkitAudioContext;
      A &&
        ((o0.ctx = new A()),
        (o0.gain = o0.ctx.createGain()),
        o0.gain.connect(o0.ctx.destination),
        xa());
    },
    xa = function () {
      const A = WA();
      (o0.gain && (o0.gain.gain.value = A.on ? A.vol : 0),
        o0.music &&
          ((o0.music.volume = A.music ? A.mvol : 0),
          A.music
            ? o0.music.paused && o0.music.play().catch(() => {})
            : o0.music.pause()));
    },
    P5 = function (A) {
      o0.buf[A] ||
        o0.loading[A] ||
        !o0.ctx ||
        ((o0.loading[A] = !0),
        fetch(A)
          .then((n) => n.arrayBuffer())
          .then((n) => o0.ctx.decodeAudioData(n))
          .then((n) => {
            o0.buf[A] = n;
          })
          .catch(() => {
            o0.buf[A] = null;
          }));
    },
    v5 = function (A, n = 1, t = 1) {
      if (!A || c.quiet || !o0.ctx || !WA().on) return;
      const e = o0.ctx.currentTime;
      if (o0.last[A] && e - o0.last[A] < Kp) return;
      const a = o0.buf[A];
      if (!a) {
        P5(A);
        return;
      }
      if (o0.voices >= Rp) return;
      ((o0.last[A] = e), o0.voices++);
      const i = o0.ctx.createBufferSource(),
        o = o0.ctx.createGain();
      ((i.buffer = a),
        (i.playbackRate.value = t),
        (o.gain.value = n),
        i.connect(o),
        o.connect(o0.gain),
        (i.onended = () => o0.voices--),
        i.start());
    },
    Vt = function (A) {
      const n = Object.values(Xt.music);
      if (!n.length) return;
      const t = Xt.music[A] || n[Math.abs(A) % n.length];
      if (o0.musicSrc === t) return;
      (o0.music && o0.music.pause(),
        (o0.musicSrc = t),
        (o0.music = new Audio(t)),
        (o0.music.loop = !0));
      const e = WA();
      ((o0.music.volume = e.music ? e.mvol : 0),
        e.music && o0.music.play().catch(() => {}));
    },
    Kc = function (A) {
      if (o0.ctx) {
        for (const n of A.m.concat([A.boss])) {
          const t = Xt.npc[r0[n] && r0[n].anim];
          t && Object.values(t).forEach((e) => e && P5(e));
        }
        Object.values(Xt.ui).forEach((n) => n && P5(n));
      }
    },
    Xt = window.JS || { music: {}, npc: {}, skill: {}, ui: {} },
    o0 = {
      ctx: null,
      gain: null,
      buf: {},
      loading: {},
      last: {},
      voices: 0,
      music: null,
      musicSrc: "",
    },
    Kp = 0.07,
    Rp = 10,
    Ai = (s, A, n = 0.6) => {
      const t = Xt.npc[s];
      t && v5(t[A], n, A0(0.93, 1.07));
    },
    Rc = (s) => v5(Xt.skill[s], 0.5),
    i0 = (s) => v5(Xt.ui[s], 0.6),
    M = function (A) {
      c.quiet ||
        (c.logs.unshift(A),
        (c.logT || (c.logT = [])).unshift(Date.now()),
        c.logs.length > 150 && c.logs.pop(),
        c.logT.length > 150 && (c.logT.length = 150),
        (c.logDirty = !0));
    },
    y = function (A) {
      const n = u("#toast");
      ((n.textContent = A),
        n.classList.add("on"),
        clearTimeout(id),
        (id = setTimeout(() => n.classList.remove("on"), 1800)));
    },
    ct = function (A, n = "Đồng ý", t = "Hủy") {
      return new Promise((e) => {
        const a = document.getElementById("askBox");
        a && a.remove();
        const i = document.createElement("div");
        ((i.id = "askBox"),
          (i.style.cssText =
            "position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);padding:16px"),
          (i.innerHTML = `<div style="max-width:420px;width:100%;background:#1b1712;border:1px solid #8a6a2c;border-radius:8px;padding:16px;color:#f0e2c0;font:inherit;box-shadow:0 8px 30px rgba(0,0,0,.6)"><p style="margin:0 0 14px;line-height:1.5;white-space:pre-line">${D(A)}</p><div style="display:flex;gap:8px;justify-content:flex-end"><button class="btn" data-a="0">${D(t)}</button><button class="btn red" data-a="1">${D(n)}</button></div></div>`));
        const o = (d) => {
          (i.remove(), e(d));
        };
        (i.addEventListener("click", (d) => {
          const h = d.target.closest("[data-a]");
          h ? o(h.dataset.a === "1") : d.target === i && o(!1);
        }),
          document.body.appendChild(i));
        const l = i.querySelector('[data-a="1"]');
        l && l.focus();
      });
    },
    J = function (A, n, t) {
      ((u("#mBody").innerHTML = A),
        u("#modal").classList.remove("hidden"),
        (u("#modal").dataset.locked = t ? "1" : ""),
        n && n());
      try {
        u("#modal .mbox").focus({ preventScroll: !0 });
      } catch {}
    },
    t0 = function (A) {
      (u("#modal").dataset.locked && !A) || u("#modal").classList.add("hidden");
    },
    Yc = function (A) {
      if (
        (typeof U0 == "function" && U0(A)) ||
        (r.lootF && r.lootF.pickAll && hA(A)) ||
        (A.set && !A.lock && !A.plv && Ge(A),
        A.set || A.vio || A.plv || A.lock || A.thanma || A.pack || A.ktc)
      )
        return !1;
      if (!F1(A)) return !0;
      const n = I[r.fac];
      if (wA[A.d] === "weapon" && n && !YA(A)) return !0;
      const t = r.eq[LA(A)];
      return !(
        !t ||
        IA(A) ||
        L0(A) > L0(t) * 0.85 ||
        (U1.includes(A.d) &&
          r.inv.filter((e) => U1.includes(e.d) && !e.set && !e.vio).length < aD)
      );
    },
    Fc = function () {
      if (r.autoJunk === !1) return 0;
      let A = 0;
      for (let n = 0; n < INV_MAX; n++) {
        const t = r.inv.filter(Yc).sort((e, a) => L0(e) - L0(a))[0];
        if (!t) break;
        (r.inv.splice(r.inv.indexOf(t), 1), (r.gold += y0(t)), A++);
      }
      return (A && (Y = !0), A);
    },
    tn = function (A, n, t, e) {
      if (typeof SA == "function" && SA(A))
        return (
          n || M(`<span class="dim">${D(A.n)}: đồ đã xóa khỏi game</span>`),
          !1
        );
      if (typeof jA == "function" && jA(A)) {
        const i = y0(A);
        return (
          (r.gold += i),
          n ||
            M(
              `<span class="dim">${D(A.n)} (đồ đã bỏ khỏi game) đổi thành ${j(i)} lượng</span>`,
            ),
          !1
        );
      }
      const a = (i) => {
        t &&
          !c.quiet &&
          ei() >= 0 &&
          (A.r || 0) >= ei() &&
          M(
            `Nhặt được <span style="color:${b0[A.r || 0]}">${D(A.n)}</span>${i ? ` <span class="dim">${i}</span>` : ""}`,
          );
      };
      return typeof of == "function" && of(A)
        ? ((Y = !0), a("→ Rương ép"), !0)
        : typeof c7 == "function" && c7(A, n)
          ? ((Y = !0), a("→ Mã Trường"), !0)
          : !t && !hA(A)
            ? ((r.gold += y0(A)), !1)
            : (r.inv.length >= INV_MAX &&
                (A.set || A.vio || A.plv) &&
                F6(A, !0),
              r.inv.length >= INV_MAX
                ? ((r.gold += y0(A)),
                  n ||
                    M(
                      '<span class="dim">Túi đầy, tự bán ' + D(A.n) + "</span>",
                    ),
                  !1)
                : !e && r.autoJunk !== !1 && Yc(A)
                  ? ((r.gold += y0(A)),
                    a(`(đồ thừa, tự bán +${j(y0(A))} lượng)`),
                    !1)
                  : (r.inv.unshift(A),
                    (Y = !0),
                    vi(A),
                    typeof z7 == "function" && z7(A),
                    t
                      ? a("")
                      : !n &&
                        ei() >= 0 &&
                        (A.r || 0) >= ei() &&
                        M(
                          `Nhặt được <span style="color:${b0[A.r]}">${D(A.n)}</span>`,
                        ),
                    r.autoEquip && IA(A) && $1(A, !0),
                    !0));
    },
    ni = function (A) {
      if (!f0(A)) return -1;
      const n = Object.assign({}, r.eq);
      return ((n[LA(A)] = A), N0(I0(n)) / Math.max(1, N0(I0(r.eq))) - 1);
    },
    Yp = function (A) {
      if (A.pack || A.ktc || typeof _n != "function") return "";
      if (IA(A))
        return '<u class="up" title="Mạnh hơn đồ đang mặc: bấm Mặc đồ tốt">▲</u>';
      if (_n(A)) {
        const n = f0(A) ? ["mạnh hơn rất ít (dưới 1%)"] : Un(A);
        return `<u class="up soon" title="${D("Chưa tự mặc: " + n.join("; "))}">▲</u>`;
      }
      return k4(A)
        ? `<u class="up pot" title="Cường hóa lên +${ns(A).enh} thì mạnh hơn đồ đang mặc">△</u>`
        : "";
    },
    IA = function (A) {
      if (A.pack || A.ktc) return !1;
      const n = I[r.fac];
      return wA[A.d] === "weapon" && n && !YA(A) ? !1 : ni(A) > 0.01;
    },
    $1 = function (A, n) {
      if (!f0(A)) {
        n || y("Chưa mặc được: " + Un(A).join("; "));
        return;
      }
      const t = LA(A),
        e = r.eq[t];
      ((r.inv = r.inv.filter((a) => a !== A)),
        e && r.inv.unshift(e),
        (r.eq[t] = A),
        (c.dirty = !0),
        (Y = !0),
        n || i0(A.d <= 1 ? "equipWeapon" : "equipCloth"),
        n || (t0(), F()));
    },
    Fp = function (A) {
      const n = r.eq[A];
      if (n) {
        if (r.inv.length >= INV_MAX) {
          y("Túi đầy");
          return;
        }
        (delete r.eq[A], r.inv.unshift(n), (c.dirty = !0), (Y = !0), t0(), F());
      }
    },
    b5 = function () {
      const A = r.inv.filter((t) => !hA(t) && !Ha(t));
      let n = 0;
      for (const t of A) n += y0(t);
      return (
        (r.gold += n),
        (r.inv = r.inv.filter((t) => !A.includes(t))),
        (Y = !0),
        { n: A.length, gold: n, kept: r.inv.filter((t) => !hA(t)).length }
      );
    },
    Vc = function (A) {
      if (!r.inv.includes(A)) {
        t0();
        return;
      }
      if (A.lock) {
        y("Món đã khóa: mở khóa trước khi bán");
        return;
      }
      ((r.inv = r.inv.filter((n) => n !== A)),
        (r.gold += y0(A)),
        (Y = !0),
        t0(),
        F());
    },
    Ba = function (A) {
      return (
        (A = +A),
        r.inv.find((n) => n.uid === A) ||
          (r.stable || []).find((n) => n.uid === A) ||
          Object.values(r.eq).find((n) => n && n.uid === A) ||
          (c.ground.find((n) => n.it.uid === A) || {}).it
      );
    },
    T1 = function (A) {
      return A
        ? `<button class="it r${A.r}${f0(A) ? "" : " bad"}" data-uid="${A.uid}"${f0(A) ? "" : ` title="${D("Chưa mặc được: " + Un(A).join("; "))}"`}>${A.ic ? `<img src="${D(A.ic)}" alt="">` : ""}<i>${A.ktc ? A.ktc.c : A.pack ? A.pack.c : A.lvl}</i>${r.inv.includes(A) ? Yp(A) : ""}${A.s >= 0 && A.s < 5 ? `<b class="s5" style="background:${m0[A.s]}"></b>` : ""}${A.lock ? '<u class="lk">🔒</u>' : typeof U0 == "function" && r.inv.includes(A) && U0(A) ? '<u class="lk" title="Giữ để trả Dã Tẩu">📜</u>' : ""}${A.enh ? `<u class="en">+${A.enh}</u>` : ""}</button>`
        : "";
    },
    en = function (A) {
      if (A && A.ktc) {
        const n = (typeof r1 < "u" && r1.find((t) => t.k === A.ktc.k)) || {
          d: "",
        };
        return `<div class="idet"><div class="pic r${A.r}">${A.ic ? `<img src="${D(A.ic)}" alt="">` : ""}</div><div><h4 style="color:${b0[A.r]}">${D(A.n)}</h4><small class="dim">Vật phẩm Kỳ Trân Các · số lượng ${A.ktc.c}</small></div></div><div class="sl"><div class="m">${D(n.d || "")}</div></div>`;
      }
      return `<div class="idet"><div class="pic r${A.r}">${A.ic ? `<img src="${D(A.ic)}" alt="">` : ""}</div><div><h4 style="color:${b0[A.r]}">${D(A.n)}${A.enh ? ` <span class="enh">+${A.enh}</span>` : ""}${A.vio ? ` <small class="vtag">Tím ${(A.mag || []).length}/${x1}</small>` : ""}</h4>
  <small class="dim">${D((S.items[A.d] || { n: A.pack ? "Gói mảnh" : "Vật phẩm" }).n)} · cấp ${A.lvl}${A.s >= 0 && A.s < 5 ? ` · <span style="color:${m0[A.s]}">hệ ${d0[A.s]}</span>` : ""}</small></div></div>
  <div class="sl">${jm(A)
    .map(
      ([n, t, e]) =>
        `<div class="${n}"${e ? ` style="color:${e}"` : ""}>${D(t)
          .replace(/\u0001/g, '<span class="rng">')
          .replace(/\u0002/g, "</span>")}</div>`,
    )
    .join("")}</div>`;
    },
    Vp = function (A) {
      const n = Jn(A),
        t = Object.values(n).reduce((e, a) => e + a, 0);
      if (!t) return !1;
      if (r.attrPts < t)
        return (y(`Cần ${t} điểm tiềm năng, đang có ${r.attrPts}`), !1);
      for (const e in n) ((r.attr[e] += n[e]), (r.attrPts -= n[e]));
      return ((c.dirty = !0), u0(), y("Đã cộng điểm để đủ điều kiện"), !0);
    },
    Xp = function (A, n) {
      if (n) return "";
      const t = f0(A),
        e = xg(A, !t),
        a = (f) => (f > 5e-4 ? "cp" : f < -5e-4 ? "cn" : "dim"),
        i = (f, m, w) => `<span class="${a(m)}">${f} ${w}</span>`,
        o = t ? "So với đang mặc" : "Nếu đủ điều kiện, so với đang mặc",
        l = t ? [] : Un(A),
        d = wA[A.d] === "weapon" && I[r.fac] && !YA(A),
        h = Object.values(Jn(A)).reduce((f, m) => f + m, 0),
        g = l.length > 0 && l.length === Object.keys(Jn(A)).length;
      return `<div class="cmp2"><small class="dim">${o}:</small><div class="cmpv">${i("Sức mạnh", e.gain, Z2(e.gain))} ${i("DPS", e.dps, Z2(e.dps))} ${i("Sinh lực", e.life, U8(e.life))} ${i("Né", e.def, U8(e.def))} ${i("Kháng TB", e.res, U8(e.res) + "%")}</div>
    ${l.length ? `<div class="reqbad"><b>Chưa mặc được, thiếu:</b><br>${l.map(D).join("<br>")}${g ? `<br><small>Cần ${h} điểm tiềm năng${r.attrPts >= h ? ` (đang có ${r.attrPts}): bấm "Cộng điểm" để đủ điều kiện` : `, đang có ${r.attrPts}: lên cấp thêm`}.</small>` : ""}</div>` : ""}
    <div class="reqnote"><b>Vì sao:</b><br>${e.why.map(D).join("<br>")}</div>
    ${d ? '<div class="reqnote">Sai loại vũ khí của môn phái: tự mặc sẽ bỏ qua, bạn vẫn mặc tay được.</div>' : ""}</div>`;
    },
    an = function () {
      if (!r.autoEquip) return 0;
      let A = 0;
      for (let n = 0; n < 14; n++) {
        let t = null,
          e = 0.01;
        for (const i of r.inv.concat(
          typeof s0 == "function"
            ? s0().filter((o) => o.vio && (o.mag || []).length)
            : [],
        )) {
          if (!f0(i)) continue;
          const o = I[r.fac];
          if (wA[i.d] === "weapon" && o && !YA(i)) continue;
          const l = ni(i);
          l > e && ((e = l), (t = i));
        }
        if (!t) break;
        r.inv.includes(t) || (l1(t), r.inv.push(t));
        const a = r.eq[LA(t)];
        ($1(t, !0),
          A++,
          a &&
            a.lock &&
            !c.quiet &&
            M(
              `<span class="dim">Tự mặc đồ tốt hơn: thay <b>${D(a.n)}</b> bằng <b>${D(t.n)}</b> (món cũ đã khóa 🔒, ở hành trang)</span>`,
            ),
          r.inv.length > INV_MAX &&
            typeof s0 == "function" &&
            s0().push(r.inv.shift()));
      }
      return (A && ((Y = !0), (c.dirty = !0)), A);
    },
    Ut = function s(A, n) {
      if (A && A.pack && typeof bl == "function") return bl(A);
      if (A && A.ktc && typeof T6 == "function") return T6(A);
      const t = !n && r.eq[LA(A)],
        e = !n && typeof ns == "function" && !_n(A) && ns(A);
      J(
        `${en(A)}${Xp(A, n)}${e ? `<div class="cp small">△ Cường hóa lên +${e.enh}: mạnh hơn đồ đang mặc ${(e.gain * 100).toFixed(1)}% · ước tính ${qi(A, e.enh)} KNB</div>` : ""}${t ? `<div class="cmp"><small class="dim">Đang mặc:</small>${en(t)}</div>` : ""}
    <div class="btnrow">${n ? '<button class="btn" id="bUn">Tháo</button>' : `<button class="btn" id="bEq" ${f0(A) ? "" : "disabled"}>Trang bị</button>${!f0(A) && Object.keys(Jn(A)).length && Un(A).length === Object.keys(Jn(A)).length ? '<button class="btn" id="bReqPts">Cộng điểm</button>' : ""}<button class="btn red" id="bSell" ${A.lock ? "disabled" : ""}>Bán (${X(y0(A))})</button>${r.inv.includes(A) ? '<button class="btn" id="bStashIt">Gửi kho</button>' : ""}${r.inv.includes(A) && A.d === 10 ? '<button class="btn" id="bStable">Cất vào Mã Trường</button>' : ""}`}${Ba(A.uid) && A.d <= 10 ? '<button class="btn" id="bForge">Rèn đồ</button>' : ""}${at(A) ? `<button class="btn" id="bLock">${A.lock ? "🔓 Mở khóa" : "🔒 Khóa"}</button>` : ""}</div>`,
        () => {
          const a = u("#bEq"),
            i = u("#bSell"),
            o = u("#bUn"),
            l = u("#bForge"),
            d = u("#bStable");
          d &&
            (d.onclick = () => {
              const m = l7(A);
              (y(m.msg), m.ok && (t0(), F()));
            });
          const h = u("#bStashIt");
          h &&
            (h.onclick = () => {
              const m = A3(A);
              (y(m.msg), m.ok && (t0(), F()));
            });
          const g = u("#bReqPts");
          g &&
            (g.onclick = () => {
              Vp(A) && (f0(A) ? $1(A) : s(A, n));
            });
          const f = u("#bLock");
          (f &&
            (f.onclick = () => {
              ((A.lock = !A.lock),
                A.lock || delete A.lock,
                (Y = !0),
                B(),
                y(
                  A.lock
                    ? "Đã khóa: không tự bán, không hợp Huyền Tinh"
                    : "Đã mở khóa",
                ),
                s(A, n));
            }),
            a && (a.onclick = () => $1(A)),
            i && (i.onclick = () => Vc(A)),
            o && (o.onclick = () => Fp(n)),
            l && (l.onclick = () => M2(A)));
        },
      );
    },
    Xc = function (A) {
      return Eo(A)
        .map((t, e) =>
          t ? `<span style="color:${m0[e]}">${d0[e]} ${t}</span>` : "",
        )
        .filter(Boolean)
        .join(" · ");
    },
    Uc = function (A) {
      return Eo(A)
        .map((t, e) =>
          ('<i class="sdot" style="background:' + m0[e] + '"></i>').repeat(t),
        )
        .join("");
    },
    Up = function () {
      const A = V0(Math.min(r.stage, l0)),
        n = B0.map((e, a) => {
          const i = Ui(a),
            o = dA(Math.min(r.stage, l0)) === a,
            l = Hn[a],
            d = (r.zalt || {})[a] || 0,
            h = (l && d && l[d - 1]) || e,
            g =
              l && i
                ? `<div class="zalt">${[e]
                    .concat(l)
                    .map(
                      (f, m) =>
                        `<button class="chip2${m === d ? " on" : ""}" data-za="${a}:${m}">${D(f.n)}</button>`,
                    )
                    .join("")}</div>`
                : "";
          return `<button class="zrow${o ? " cur" : ""}${i ? "" : " lock"}" data-z="${a}" ${i ? "" : "disabled"}><b>${D(h.n)}</b><span>${Uc(h)} Cấp ${e.lo}–${e.hi}${l ? ` · ${l.length + 1} bản đồ` : ""}</span></button>${g}`;
        }).join("");
      ((u("#t-log").innerHTML =
        `${Uv()}${Iv(A)}<div class="card"><div><small class="dim">Quái hệ: ${Xc(A)}${I[r.fac] ? ` · bạn hệ <span style="color:${m0[j0()]}">${d0[j0()]}</span>: khắc <span style="color:${m0[kt[j0()]]}">${d0[kt[j0()]]}</span> (+10%), bị <span style="color:${m0[+Object.keys(kt).find((e) => kt[e] === j0())]}">${d0[+Object.keys(kt).find((e) => kt[e] === j0())]}</span> khắc (−10%)` : ""}</small></div>
    ${ft() ? `<div class="small">${ft()}</div>` : ""}</div>
    <div class="log" id="logBox">${c.logs.map((e) => `<div>${e}</div>`).join("")}</div>
    <h3>Bản đồ luyện công <small>chạm để chọn bãi (tắt tự đổi theo cấp)</small></h3><div class="zlist">${n}</div>`),
        Jv(),
        Sv());
      const t = (e) => {
        ((r.mode === "quest" || r.mode === "dg") &&
          ((r.mode = "farm"),
          M("⚔ Chọn bãi luyện công: chuyển sang chế độ Luyện công.")),
          (r.autoMap = !1),
          fn(e, "Chọn bãi luyện công"),
          B(),
          F());
      };
      (document
        .querySelectorAll(".zrow")
        .forEach((e) => (e.onclick = () => t(+e.dataset.z))),
        document.querySelectorAll("[data-za]").forEach(
          (e) =>
            (e.onclick = () => {
              const [a, i] = e.dataset.za.split(":").map(Number);
              (((r.zalt || (r.zalt = {}))[a] = i),
                dA(Math.min(r.stage, l0)) === a
                  ? ((r.wave = 1),
                    (c.enemies = []),
                    (c.spawnT = 0.3),
                    (c.zoneShown = null))
                  : t(a),
                B(),
                F());
            }),
        ));
    },
    Jp = function () {
      const A = u("#logBox");
      A && (A.innerHTML = c.logs.map((n) => `<div>${n}</div>`).join(""));
    },
    _a = function () {
      const A = c.P,
        n = I[r.fac],
        t = Object.values(r.eq).filter((g) => g && !f0(g)),
        e = I0({}),
        a = {
          life: Math.round(A.life - e.life),
          mana: Math.round(A.mana - e.mana),
        },
        i = G1.map(
          ([g, f]) =>
            `<div class="slot" data-slot="${g}">${r.eq[g] ? T1(r.eq[g]) : `<span>${f}</span>`}</div>`,
        ).join(""),
        o = Object.keys(C1)
          .map(
            (g) =>
              `<div class="attr"><span>${C1[g]}</span><b>${Math.round(A[g])}</b><span class="pm"><button class="plus" data-a="${g}" ${r.attrPts ? "" : "disabled"}>+</button><button class="minus" data-a="${g}" title="Rút lại 1 điểm" ${r.attr[g] > 0 ? "" : "disabled"}>−</button></span></div>`,
          )
          .join(""),
        l = q0
          .map(
            (g) =>
              `<span>Kháng ${Io[g]}</span><span>${Math.round(A.res[g])}%</span>`,
          )
          .join("");
      ((u("#t-char").innerHTML =
        `<div class="card"><b style="color:${m0[n.series]}">${D(n.n)}</b> · hệ ${d0[n.series]} · Cấp ${r.lvl}${D0() ? ` <small class="cp">chuyển sinh ${D0()} · mặc đồ như cấp ${TA()}</small>` : ""}<br><small class="dim">Lực tay trái ${G3(A.basic)} · Lực tay phải ${G3(A.main)}</small> <button class="btn sm" id="bTitle">🎖 Danh hiệu</button> <button class="btn sm${HA() ? "" : " on"}" id="bName">${HA() ? "✏ Đổi Tên" : "✏ Đặt tên"}</button> <button class="btn sm${r.lvl >= ht && Q().stat.reborn < w2 ? " on" : ""}" id="bReb">Chuyển sinh</button>${N("misc", "ldp") > 0 ? ` <button class="btn sm on" id="bDoiPhai">Đổi phái (${N("misc", "ldp")})</button>` : ""}</div>
    <div class="eqgrid">${i}</div>${t.length ? `<div class="reqbad"><b>⚠ ${t.length} món đang mặc chưa đủ điều kiện, không được cộng chỉ số:</b><br>${t.map((g) => `${D(g.n)}: ${D(Un(g).join("; "))}`).join("<br>")}</div>` : ""}
    <p class="dim small">Dòng ẩn (2, 4, 6) của mỗi món mở khi hệ nhân vật hoặc 2 món liên kết <b>tương sinh</b> với hệ món đó (Kim→Thủy→Mộc→Hỏa→Thổ→Kim). Đang mở: ${
      G1.filter(([g]) => r.eq[g] && r.eq[g].mag.length > 1)
        .map(
          ([g, f]) =>
            `${f} ${Vn(r.eq[g])}/${Math.floor(r.eq[g].mag.length / 2)}`,
        )
        .join(" · ") || "—"
    }</p>
    <h3>Tiềm năng <small>${r.attrPts} điểm</small> <button class="btn sm" id="bSugAt">Gợi ý</button> <button class="btn sm" id="bTTa">Tẩy Tủy</button></h3><div class="card">${o}</div>
    <h3>Chỉ số</h3><div class="card stats">
      <span>Sinh lực</span><span>${X(A.life)}${a.life ? ` <small class="cp">(trang bị +${X(a.life)})</small>` : ""}</span><span>Nội lực</span><span>${X(A.mana)}${a.mana ? ` <small class="cp">(+${X(a.mana)})</small>` : ""}</span>
      ${
        A.plusSkill || Object.keys(A.skAdd || {}).length
          ? `<span>Kỹ năng từ trang bị</span><span class="cp">${A.plusSkill ? `Tất cả +${A.plusSkill}` : ""}${Object.entries(
              A.skAdd || {},
            )
              .map(([g, f]) => ` · ${T[g] ? D(T[g].n) : g} +${f}`)
              .join("")}</span>`
          : ""
      }
      <span>Sát thương vũ khí</span><span>${Math.round(A.wmin)}–${Math.round(A.wmax)}</span>
      <span>Chiêu chính</span><span>${D(A.main.n)} (${X(A.main.tot)})</span>
      <span>Chính xác</span><span>${Math.round(A.ar)}</span><span>Né tránh</span><span>${Math.round(A.def)}</span>
      <span>Chí mạng</span><span>${Math.round(A.main.crit)}%</span><span>Tốc độ đánh</span><span>${A.aspd.toFixed(2)}</span>${l}</div>`),
        (u("#bTTa").onclick = K3),
        document
          .querySelectorAll("#t-char .plus")
          .forEach((g) => (g.onclick = () => Wc(g.dataset.a))),
        (u("#bTitle").onclick = () => Jd()),
        (u("#bName").onclick = () => E2()),
        (u("#bReb").onclick = Nd));
      const d = u("#bDoiPhai");
      (d && (d.onclick = ta),
        (u("#bSugAt").onclick = C2),
        document
          .querySelectorAll("#t-char .minus")
          .forEach((g) => (g.onclick = () => Zc(g.dataset.a))),
        document
          .querySelectorAll("#t-char .slot .it")
          .forEach(
            (g) =>
              (g.onclick = () =>
                g.parentNode.dataset.slot === "horse"
                  ? yi()
                  : Ut(Ba(g.dataset.uid), g.parentNode.dataset.slot)),
          ));
      const h = document.querySelector('#t-char .slot[data-slot="horse"]');
      h && !r.eq.horse && (h.onclick = () => yi());
    },
    Jc = function (A) {
      const n = r.sk[A] || 0;
      if (!n) return !1;
      const t = T[A].tier === 90 && !xA(A);
      return (
        n <= 1 || t ? delete r.sk[A] : (r.sk[A] = n - 1),
        t || r.skPts++,
        !r.sk[A] && r.main === A && (r.mainLock = !1),
        (c.dirty = !0),
        u0(),
        O1(),
        In(),
        MA(),
        Ma(),
        B(),
        y(`Rút 1 điểm: ${T[A].n} ${r.sk[A] || 0}/${T[A].max}`),
        !0
      );
    },
    Wc = function (A) {
      if (!r.attrPts) return;
      const n = r.attrPts;
      J(
        `<h3>Cộng tiềm năng: ${D(C1[A])}</h3><div class="small">Còn <span style="color:#ffd24a;font-weight:bold">${n}</span> điểm · hiện ${Math.round(c.P[A])}</div>
    <div class="btnrow"><input type="number" id="apN" min="1" max="${n}" value="${n}" style="width:110px;font-size:16px;padding:4px 6px"></div>
    <div class="btnrow">${[1, 10, 50, 100]
      .filter((t) => t < n)
      .map((t) => `<button class="btn sm" data-apq="${t}">${t}</button>`)
      .join(
        "",
      )}<button class="btn sm" data-apq="${n}">Tất cả (${n})</button></div>
    <div class="btnrow"><button class="btn on" id="apOk">Cộng</button><button class="btn" id="apNo">Hủy</button></div>`,
        () => {
          const t = u("#apN"),
            e = () => {
              const a = C(Math.floor(+t.value || 0), 0, r.attrPts);
              (a > 0 &&
                ((r.attrPts -= a),
                (r.attr[A] += a),
                (c.dirty = !0),
                u0(),
                Ma(),
                B(),
                y(`+${a} ${C1[A]}`)),
                t0(!0),
                _a());
            };
          (t.focus(),
            t.select(),
            (t.onkeydown = (a) => {
              a.key === "Enter" && e();
            }),
            document.querySelectorAll("#mBody [data-apq]").forEach(
              (a) =>
                (a.onclick = () => {
                  ((t.value = a.dataset.apq), t.focus());
                }),
            ),
            (u("#apOk").onclick = e),
            (u("#apNo").onclick = () => t0(!0)));
        },
      );
    },
    Zc = function (A) {
      return r.attr[A] > 0
        ? (r.attr[A]--, r.attrPts++, (c.dirty = !0), u0(), _a(), Ma(), B(), !0)
        : !1;
    },
    Wp = function (A, n) {
      const t = [];
      for (const a in A.attr) {
        if (sD.test(a) || _5.test(a) || !S.attrDesc[a]) continue;
        const i = P0(A, a, n);
        if (!i || (!i[0] && !i[2])) continue;
        const o =
          RA(a, i) +
          (a === "dynamicmagicshield_v"
            ? ` (tối đa ${Math.round(I8 * 100)}% mỗi đòn)`
            : "");
        o && !/^\s*$/.test(o) && t.push(o);
      }
      const e = new Set();
      for (const a in A.attr)
        if (a.startsWith("addskilldamage")) {
          const i = P0(A, a, n);
          if (!i || !i[2]) continue;
          const o = Ad(+i[0], A);
          if (!o || e.has(o)) continue;
          (e.add(o), t.push(`Tăng sát thương ${o}: +${i[2]}%`));
        }
      return t;
    },
    Ad = function (A, n) {
      const t = rd[A];
      if (t && T[t[1]]) return `${t[0]} (tầng ${t[2]} ${T[t[1]].n})`;
      if (A >= 1e3) return null;
      const e = T[A];
      if (!e || /\(##\)/.test(e.n) || (n.f && e.f && e.f !== n.f)) return null;
      const a = Object.values(T).find(
        (i) => i.child === A && i.f === n.f && i.id !== A,
      );
      return a ? a.n : e.req > 0 || e.f ? e.n : null;
    },
    Zp = function (A) {
      const n = [];
      for (const t in T) {
        const e = T[t];
        if (!(!e.attr || (e.f && e.f !== T[A].f))) {
          for (const a in e.attr)
            if (a.startsWith("addskilldamage")) {
              const i = r.sk[t] ? r.sk[t] + yn(+t) : 0,
                o = P0(e, a, Math.max(1, i));
              if (!o || !o[2] || /\(##\)/.test(e.n) || e.req <= 0) continue;
              const l = rd[+o[0]];
              +o[0] == +A
                ? n.push([e.n, i, i ? o[2] : 0, o[2]])
                : l &&
                  l[1] === +A &&
                  n.push([
                    e.n + ` → ${l[0]} (tầng ${l[2]})`,
                    i,
                    i ? o[2] : 0,
                    o[2],
                    !0,
                  ]);
            }
        }
      }
      return n;
    },
    nd = function s(A, n, t, e = 0) {
      const a = window.SK_EV || {},
        i = [],
        o = (h, g, f) =>
          h.attr
            ? P0(h, g, f)
            : h.a && h.a[g]
              ? h.a[g][Math.min(h.a[g].length, Math.max(1, f)) - 1]
              : null;
      if (e > 2 || !A) return i;
      if (!t) {
        const h = o(A, "skill_showevent", n);
        if (!h || !h[0]) return i;
      }
      const l = (o(A, "skill_eventskilllevel", n) || [n])[0] || n;
      let d = 0;
      for (const h of Object.keys(A.attr || A.a || {})) {
        if (!oD.includes(h)) continue;
        const g = o(A, h, n);
        if (!g || !g[0]) continue;
        const f = a[g[2]];
        if (f) {
          (i.push(["ev", `${t ? "Tầng phụ" : "Tầng"} ${d + 2}: ${f.n}`]), d++);
          for (const m in f.a) {
            if (lD.test(m) || !S.attrDesc[m] || (typeof _5 < "u" && _5.test(m)))
              continue;
            const w = f.a[m][Math.min(f.a[m].length, l) - 1];
            if (!w || (!w[0] && !w[2])) continue;
            const p = RA(m, w);
            p && i.push(["m", p]);
          }
          for (const m of s(f, l, !0, e + 1)) i.push(m);
        }
      }
      return i;
    },
    AD = function (A, n, t, e, a, i) {
      const o = T[A],
        l = NA(o),
        d = I[o.f],
        h = l ? "Tấn công" : cm[V1(o)] || "—",
        g = (P) => {
          const v = Wp(o, P).filter(
              (E) => !/^Tăng sát thương (?!đối với hệ)/.test(E),
            ),
            H = P0(o, "skill_cost_v", P),
            _ = P0(o, "skill_attackradius", P);
          (H &&
            H[0] &&
            v.push(`Tiêu hao ${K8(o) ? "sinh lực" : "nội lực"}: ${H[0]}`),
            l && v.push(`Phạm vi tấn công: ${_ ? _[0] : o.radius || 60}`));
          {
            const E = typeof V1 == "function" ? V1(o) : "",
              $ =
                (E === "buff" || E === "curse") && typeof $t == "function"
                  ? $t(o, P)
                  : 0;
            $ >= 5 &&
              v.push(
                `Thời gian duy trì: ${Math.round(E === "curse" ? Math.min(60, $) : $)} giây`,
              );
          }
          return v;
        },
        f = [
          [
            "b",
            `Môn phái: ${d ? d.n : "—"}${o.series >= 0 ? ` · Ngũ hành: ${d0[o.series]}` : ""}`,
          ],
        ];
      (o.d && f.push(["b in", o.d]),
        f.push([
          v1(o) !== null && !$3(o) ? "rq" : "b",
          `Loại: ${h}${v1(o) !== null ? ` · Vũ khí: ${Go[v1(o)]}` : ""}`,
        ]),
        f.push([
          r.lvl >= o.req || (o.tier === 90 && D0() > 0) ? "b" : "rq",
          `Cấp yêu cầu: ${o.req}${o.tier === 90 && D0() > 0 ? " (đã chuyển sinh: không cần)" : ""}`,
        ]),
        f.push([
          "b",
          `Cấp kỹ năng: ${n}/${o.max}${t ? ` (+${t} từ trang bị → ${e})` : ""}`,
        ]),
        o.tier === 90 && f.push(["g", tm(A)]),
        f.push(["sep"]),
        f.push(["tt", e ? `Cấp hiện tại: ${e}` : "Cấp 1 (chưa học)"]));
      for (const P of g(a)) f.push(["m", P]);
      const m = nd(o, a);
      if (m.length) for (const P of m) f.push(P);
      else {
        const P = typeof Y1 < "u" && Y1[A],
          v = typeof F8 == "function" ? F8(o) : 0;
        (P && v && f.push([e >= v ? "m" : "h", `Tầng 2 (từ cấp ${v}): ${P.n}`]),
          P &&
            P.at16 &&
            f.push([e >= 16 ? "m" : "h", `Tầng 3 (từ cấp 16): ${P.at16.n}`]));
      }
      if (i && e) {
        f.push(["tt", `Cấp kế tiếp: ${i}`]);
        for (const P of g(i)) f.push(["h", P]);
        for (const P of nd(o, i)) f.push([P[0] === "ev" ? "ev" : "h", P[1]]);
      }
      const w = [],
        p = new Set();
      for (const P in o.attr)
        if (P.startsWith("addskilldamage")) {
          const v = P0(o, P, a);
          if (!v || !v[2]) continue;
          const H = Ad(+v[0], o);
          H && !p.has(H) && (p.add(H), w.push(`${H}: +${v[2]}%`));
        }
      if (w.length) {
        f.push(["tt", "Hỗ trợ sát thương cho:"]);
        for (const P of w) f.push(["g", P]);
      }
      if (l) {
        const P = Zp(A);
        if (P.length) {
          f.push([
            "tt",
            `Được hỗ trợ (+${P.filter((v) => !v[4]).reduce((v, H) => v + H[2], 0)}%):`,
          ]);
          for (const v of P)
            f.push([
              v[1] ? "g" : "h",
              v[1]
                ? `${v[0]} cấp ${v[1]}: +${v[2]}%`
                : `${v[0]} (chưa học, cấp 1: +${v[3]}%)`,
            ]);
        }
      }
      return `<div class="idet"><div class="pic"><img src="${D(o.ic || "")}" alt="" style="image-rendering:pixelated"></div><div><h4 style="color:#ffd76a">${D(o.n)}</h4>${l ? "" : im(o)}</div></div>
    <div class="sl jxsk">${f.map(([P, v]) => (P === "sep" ? '<div class="sep"></div>' : `<div class="${P}">${rD(D(v))}</div>`)).join("")}</div>`;
    },
    y5 = function s(A) {
      const n = T[A];
      if (!n) return;
      const t = r.sk[A] || 0,
        e = t ? yn(A) : 0,
        a = t + e,
        i = NA(n),
        o = Math.max(1, a),
        l = t < n.max ? a + 1 : 0;
      J(
        AD(A, t, e, a, o, l) +
          `
    <div class="btnrow">${i && a ? '<button class="btn" id="skMain">Chọn làm chiêu chính</button>' : ""}<button class="btn" id="skPlus" ${b1(n) ? "" : "disabled"}>+ Cộng điểm</button><button class="btn red" id="skMinus" ${a ? "" : "disabled"}>− Rút điểm</button></div>`,
        () => {
          P6(u("#mBody"));
          const d = u("#skMain");
          (d &&
            (d.onclick = () => {
              ((r.main = n.id),
                (r.mainLock = !0),
                (c.dirty = !0),
                u0(),
                In(),
                y("Chiêu chính: " + n.n),
                s(A));
            }),
            (u("#skPlus").onclick = () => {
              b1(n) &&
                (R3(A), i0("learn"), (c.dirty = !0), u0(), In(), B(), s(A));
            }),
            (u("#skMinus").onclick = () => {
              Jc(A) && s(A);
            }));
        },
      );
    },
    Ax = function () {
      const A = c.P && c.P.basic;
      if (!A) return "";
      const n = r.eq.weapon,
        t = r.mainLock && r.main === "basic",
        e = c.P.main === A,
        a = n
          ? c.P.ranged
            ? "Ám khí / tầm xa"
            : "Binh khí cận chiến"
          : "Quyền cước (tay không)";
      return `<div class="skl${e ? " main" : ""}" id="basicSk"><img class="sic" src="img/s/8.png" alt=""><div class="info"><b>Đánh thường</b> <span class="tag attack">Tấn công</span>
    <small>${a} · ~${X(Math.round(A.tot))} sát thương / đòn · ${A.rate.toFixed(2)} đòn/giây · tầm ${A.rad} · 0 nội lực</small></div>
    <span class="pm"><button class="btn sm${t ? " on" : ""}" id="bBasic">${t ? "Đang khóa" : "Dùng làm chiêu chính"}</button></span></div>`;
    },
    In = function s() {
      const A = I[r.fac];
      if (A.novice) {
        const a = uA.filter((i) => i.series === A.series);
        ((u("#t-skill").innerHTML =
          `<h3>Vô Môn Phái <small>${r.skPts} điểm kỹ năng</small></h3><div class="card"><p class="desc">Chưa có võ công. Đạt <b>cấp ${CA}</b> để gia nhập môn phái hệ <b style="color:${m0[A.series]}">${d0[A.series]}</b>: ${a.map((i) => (Q1(i, r.sex) ? D(i.n) : `<s>${D(i.n)}</s>`)).join(", ")}. Điểm kỹ năng nhận được trước đó được giữ lại.</p><div class="btnrow"><button class="btn" id="bJoin" ${r.lvl >= CA ? "" : "disabled"}>Gia nhập môn phái${r.lvl >= CA ? "" : ` (cấp ${r.lvl}/${CA})`}</button></div></div>`),
          (u("#bJoin").onclick = B5));
        return;
      }
      const n = A.skills
        .map((a) => {
          const i = T[a],
            o = r.sk[a] || 0,
            l = NA(i),
            d = o ? yn(a) : 0,
            h = l && o ? U2(c.P, i, o + d) : null;
          return `<div class="skl${Aa(i) ? "" : " lock"}${c.P.main.id === +a ? " main" : ""}" data-id="${a}">
      <img class="sic" src="${D(i.ic || "")}" alt=""><div class="info"><b>${D(i.n)}</b>${i.book && !n4(i) ? ' <small class="reqbad">cần Bí Kíp 90</small>' : ""}${i.tier === 90 && o && o < i.max && N("misc", "dtbk") > 0 && o4(a) ? ` <button class="btn sm" data-dt="${a}">📕</button>` : ""}</div>
      <span class="lvl">${d ? `<b class="skb" title="Cấp hiệu lực = ${o} + ${d} từ trang bị">${o + d}</b><small>/${i.max} (${o}+${d})</small>` : `${o}/${i.max}`}</span><span class="pm"><button class="plus" data-id="${a}" title="Cộng 1 điểm" ${b1(i) ? "" : "disabled"}>+</button><button class="minus" data-id="${a}" title="Rút lại 1 điểm" ${o > 0 ? "" : "disabled"}>−</button><button class="skinfo" data-id="${a}" title="Thông tin kỹ năng">i</button></span>
      </div>`;
        })
        .join("");
      ((u("#t-skill").innerHTML =
        `<h3>${D(A.n)} <small>${r.skPts} điểm kỹ năng</small> <button class="btn sm" id="bSugSk">Gợi ý</button> <button class="btn sm" id="bTT">Tẩy Tủy</button></h3><div class="dim small">Bí Kíp: ${Object.keys(
          Y3,
        )
          .map((a) => `${Y3[a].replace("Bí Kíp ", "")} ×${N("misc", a)}`)
          .join(
            " · ",
          )} <span class="dim">(hạ trùm cấp cao, Dã Tẩu, Sát Thủ, Kỳ Trân Các)</span> · Đại Thành Bí Kíp ×${N("misc", "dtbk")} · Kim Nguyên Bảo ${r.knb || 0}</div><div class="card"><label><input type="checkbox" id="cRot" ${r.rot === !1 ? "" : "checked"}> Xoay chiêu tự động khi farm: luân phiên các chiêu gán ở ô 1 đến 4 (phím R), luôn có 2 chiêu mạnh nhất, bỏ chiêu hết nội lực</label>${v6()}</div><p class="dim small">Chạm vào chiêu tấn công đã học để khóa làm chiêu chính${r.mainLock ? ' (<a id="bAutoMain">bỏ khóa</a>)' : " (đang tự chọn chiêu mạnh nhất)"}.</p>${n}`),
        document.querySelectorAll("#t-skill .plus").forEach(
          (a) =>
            (a.onclick = (i) => {
              i.stopPropagation();
              const o = T[a.dataset.id];
              b1(o) && (R3(o.id), i0("learn"), (c.dirty = !0), u0(), s(), B());
            }),
        ),
        document.querySelectorAll("#t-skill .minus").forEach(
          (a) =>
            (a.onclick = (i) => {
              (i.stopPropagation(), Jc(+a.dataset.id));
            }),
        ),
        document.querySelectorAll("#t-skill .skinfo").forEach(
          (a) =>
            (a.onclick = (i) => {
              (i.stopPropagation(), y5(+a.dataset.id));
            }),
        ),
        document.querySelectorAll("#t-skill .slots button").forEach(
          (a) =>
            (a.onclick = (i) => {
              (i.stopPropagation(), hd(+a.dataset.slot, +a.dataset.sid), s());
            }),
        ),
        (u("#bSugSk").onclick = C2),
        (u("#bTT").onclick = K3),
        (u("#cRot").onchange = () => M5()),
        document.querySelectorAll("#t-skill [data-dt]").forEach(
          (a) =>
            (a.onclick = (i) => {
              (i.stopPropagation(), C6(+a.dataset.dt));
            }),
        ),
        b6(),
        P6(u("#t-skill")));
      const t = u("#bAutoMain");
      t &&
        (t.onclick = () => {
          ((r.mainLock = !1), (c.dirty = !0), u0(), s());
        });
      const e = u("#bBasic");
      (e &&
        (e.onclick = (a) => {
          (a.stopPropagation(),
            r.mainLock && r.main === "basic"
              ? (r.mainLock = !1)
              : ((r.main = "basic"), (r.mainLock = !0)),
            (c.dirty = !0),
            u0(),
            s(),
            MA(),
            B(),
            y(
              r.mainLock && r.main === "basic"
                ? "Chiêu chính: Đánh thường"
                : "Bỏ khóa đánh thường",
            ));
        }),
        document.querySelectorAll("#t-skill .skl[data-id]").forEach(
          (a) =>
            (a.onclick = () => {
              const i = T[a.dataset.id];
              NA(i) && r.sk[i.id]
                ? ((r.main = i.id),
                  (r.mainLock = !0),
                  (c.dirty = !0),
                  u0(),
                  s(),
                  y("Chiêu chính: " + i.n))
                : y5(i.id);
            }),
        ));
    },
    nD = function () {
      const A = r.invSort || "new",
        n = r.inv.slice();
      return (
        A === "rar"
          ? n.sort((t, e) => e.r - t.r || e.lvl - t.lvl)
          : A === "lvl"
            ? n.sort((t, e) => e.lvl - t.lvl || e.r - t.r)
            : A === "slot"
              ? n.sort(
                  (t, e) =>
                    (od[wA[t.d]] ?? 99) - (od[wA[e.d]] ?? 99) || e.lvl - t.lvl,
                )
              : A === "pow" && n.sort((t, e) => L0(e) - L0(t)),
        n
      );
    },
    Jt = function s() {
      Y = !1;
      const A = qA(),
        n = N8.map(
          (p, P) =>
            `<option value="${P}" ${A.minRar === P ? "selected" : ""}>${p}</option>`,
        ).join(""),
        t = Array.from(
          { length: 10 },
          (p, P) =>
            `<option value="${P + 1}" ${A.minLvl === P + 1 ? "selected" : ""}>${P + 1}</option>`,
        ).join(""),
        e = Array.from(
          { length: 7 },
          (p, P) =>
            `<option value="${P}" ${(A.minMag || 0) === P ? "selected" : ""}>${P}</option>`,
        ).join(""),
        a = Ke.map(
          ([p], P) =>
            `<label class="chip2"><input type="checkbox" data-g="${P}" ${A.groups.includes(P) ? "checked" : ""}>${p}</label>`,
        ).join(""),
        i = d0
          .map(
            (p, P) =>
              `<label class="chip2" style="color:${m0[P]}"><input type="checkbox" data-s="${P}" ${A.series.includes(P) ? "checked" : ""}>${p}</label>`,
          )
          .join(""),
        o = ou
          .map(
            ([p, P]) =>
              `<label class="chip2"><input type="checkbox" data-sl="${p}" ${A.slots.includes(p) ? "checked" : ""}>${P}</label>`,
          )
          .join(""),
        l = c.ground.length,
        d = c.ground.filter((p) => hA(p.it)).length,
        h = r.inv.filter((p) => !hA(p) && !Ha(p)),
        g = r.inv.filter((p) => p.lock).length,
        f = p4();
      u("#t-inv").innerHTML =
        `<div class="invbar"><span>${r.inv.length}/${INV_MAX}</span><select id="iSort" title="Sắp xếp hiển thị">${cD.map(([p, P]) => `<option value="${p}" ${(r.invSort || "new") === p ? "selected" : ""}>${P}</option>`).join("")}</select><span class="sp"></span>
    <button class="btn sm" id="bStash">Kho chung</button><button class="btn sm" id="bDonKho">🧹 Dọn kho</button><button class="btn sm" id="bBest">Mặc đồ tốt</button><button class="btn sm red" id="bSellAll" ${h.length ? "" : "disabled"}>${h.length ? `Bán ${h.length} món không khớp lọc` : "Không có đồ để bán"}</button></div>
    <div class="invgrid">${nD().map(T1).join("")}</div>
    <p class="dim small">${g ? `${g} món đã khóa 🔒 (không tự bán, không bán hàng loạt, không hợp Huyền Tinh). ` : ""}Mở chi tiết món đồ để khóa / mở khóa.</p>
    <div class="btnrow"><button class="btn sm" id="bKtcI">🏮 Kỳ Trân Các</button></div>
    ${
      w0()
        ? (() => {
            const p = A.ep;
            return `<div class="card lootf" id="epLoot"><b>💎 Đồ để ép Tím</b> <small class="dim">nhặt riêng cả khi không khớp bộ lọc bên dưới, không chiếm hành trang</small>
      <label><input type="checkbox" id="eWhite" ${p.white ? "checked" : ""}> Đồ trắng (phôi để chế tạo đồ Tím)</label>
      <label><input type="checkbox" id="eJew" ${p.jew ? "checked" : ""}> Nhẫn / dây chuyền / ngọc bội không tốt hơn đồ đang mặc (luyện Huyền Tinh)</label>
      <label><input type="checkbox" id="eBlue" ${p.blue ? "checked" : ""}> Đồ xanh có dòng cấp ≥ <select id="eBlueLv">${Array.from({ length: 10 }, (P, v) => `<option value="${v + 1}" ${p.blueLv === v + 1 ? "selected" : ""}>${v + 1}</option>`).join("")}</select> (lấy thuộc tính ra đá)</label>
      <div class="row">Cất vào <select id="eDest">${[
        ["box", "Kho Rèn"],
        ["stash", "Kho chung"],
        ["inv", "Hành trang"],
      ]
        .map(
          ([P, v]) =>
            `<option value="${P}" ${p.dest === P ? "selected" : ""}>${v}</option>`,
        )
        .join(
          "",
        )}</select> <small class="dim">Kho Rèn ${s0().length}/${A1}</small></div></div>`;
          })()
        : ""
    }
    <h3>Bộ lọc đồ <small>${l} món trên đất · ${d} khớp</small></h3>
    <div class="card lootf${A.custom ? "" : " smart"}">
      <div class="lmodes">${Du.map(([p, P, v]) => `<button class="btn lmode${Pu(A) === p ? " on" : ""}" data-lm="${p}"><b>${P}</b><small>${v}</small></button>`).join("")}</div>
      <details class="lootadv"${r.lootAdv ? " open" : ""}><summary>Nâng cao (bộ lọc chi tiết, Hoàng Kim, bộ lọc lưu sẵn)</summary>
      <div class="desc small">Giữ đồ quý, đồ nộp Dã Tẩu và các mục được tick dưới đây; còn lại tự bán. Đồ để ép Tím nhặt riêng theo mục 💎 ở trên.</div>
      <div class="btnrow presets">${rl.map(([p], P) => `<button class="btn sm" data-q="${P}">${p}</button>`).join("")}</div>
      <div class="btnrow presets">${f.map((p, P) => `<span class="pslot"><button class="btn sm" data-pl="${P}" ${p ? "" : "disabled"}>Bộ ${P + 1}${p ? "" : " (trống)"}</button><button class="btn sm" data-ps="${P}" title="Lưu bộ lọc hiện tại vào bộ ${P + 1}">💾</button></span>`).join("")}</div>
      <label><input type="checkbox" id="fAuto" ${A.auto ? "checked" : ""}> Tự đi nhặt đồ khi hết quái</label>
      <label><input type="checkbox" id="fAll" ${A.pickAll ? "checked" : ""}> <b>Nhặt toàn bộ</b>, bán theo bộ lọc: nhặt mọi món rơi ra; khi hành trang đầy hoặc bấm Bán thì chỉ bán món không khớp bộ lọc (bỏ chọn: chỉ nhặt món khớp bộ lọc)</label>
      <label><input type="checkbox" id="fRare" ${A.keepRare ? "checked" : ""}> Luôn nhặt đồ quý (Hoàng Kim, Tím, ngựa hiếm)</label>
      <div class="small"><b>Hoàng Kim giữ lại</b> <small class="dim">(bỏ chọn: tự bán khi đầy / bấm Bán · món đã khóa 🔒 luôn giữ)</small></div>
      <div class="chips"><label class="chip2"><input type="checkbox" id="fHkBc" ${A.hkBc !== !1 ? "checked" : ""}> Hoàng Kim thường (Bộ chung)</label></div>
      <div class="small dim">HKMP của phái: <button class="btn sm" id="fHkAll">Tất cả</button><button class="btn sm" id="fHkMine">Phái mình</button><button class="btn sm" id="fHkNone">Không phái nào</button></div>
      <div class="chips">${uA.map((p) => `<label class="chip2"><input type="checkbox" data-hkf="${p.id}" ${!Array.isArray(A.hkMp) || A.hkMp.includes(p.id) ? "checked" : ""}> ${D(p.n.replace(/ phái$/i, ""))}${r.fac === p.key ? " ★" : ""}</label>`).join("")}</div>
      <label><input type="checkbox" id="fSmart" ${A.smartUp ? "checked" : ""}> ⭐ <b>Giữ đồ nâng cấp</b> (lọc thông minh): món làm nhân vật mạnh hơn đồ đang mặc (▲), kể cả món sắp mặc được (cấp yêu cầu ≤ cấp + 10, đúng giới tính / phái / loại vũ khí) và món cường hóa lên sẽ mạnh hơn (△) <small class="dim">· hành trang có ${r.inv.filter(_n).length} món</small></label>
      <label><input type="checkbox" id="fCustom" ${A.custom ? "checked" : ""}> ⚙ <b>Giữ thêm đồ khớp điều kiện tùy chỉnh</b> bên dưới</label>
      <div class="lc row">Độ hiếm từ <select id="fRar">${n}</select> · cấp đồ từ <select id="fLvl">${t}</select> · ít nhất <select id="fMag">${e}</select> dòng</div>
      <label class="lc"><input type="checkbox" id="fWear" ${A.wear ? "checked" : ""}> Chỉ đồ nhân vật mặc được (giới tính, hệ, môn phái; cấp yêu cầu ≤ cấp hiện tại + 5)</label>
      <label class="lc"><input type="checkbox" id="fFacW" ${A.facW ? "checked" : ""}> Vũ khí: chỉ đúng loại của môn phái</label>
      <label class="lc"><input type="checkbox" id="fAcc" ${A.accrue ? "checked" : ""}> Chỉ hệ được nhân vật tương sinh (${I[r.fac] ? d0[j0()] + " → " + d0[J2[j0()]] : ""}: tự mở 1 dòng ẩn)</label>
      <div class="lc dim small">Loại trang bị (bỏ trống = mọi loại):</div><div class="lc chips">${o}</div>
      <div class="lc dim small">Có ít nhất một thuộc tính (bỏ trống = mọi thuộc tính):</div><div class="lc chips">${a}</div>
      <div class="lc dim small">Hệ của món đồ (bỏ trống = mọi hệ):</div><div class="lc chips">${i}</div>
      </details>
      <div class="dim small">Hành trang: ${r.inv.length - h.length}/${r.inv.length} món khớp hoặc được bảo vệ. Chạm vào món đồ trên sân để đi nhặt tay. Trên 40 món thì món cũ nhất tự bán. Khi vắng mặt, đồ không khớp tự bán.</div>
    </div>`;
      const m = () => {
        ((es = null), B(), s());
      };
      ((u("#fSmart").onchange = (p) => {
        ((A.smartUp = p.target.checked), m());
      }),
        (u("#fCustom").onchange = (p) => {
          ((A.custom = p.target.checked), m());
        }),
        (u("#iSort").onchange = (p) => {
          ((r.invSort = p.target.value), s(), B());
        }),
        (u("#fAuto").onchange = (p) => {
          ((A.auto = p.target.checked), m());
        }),
        (u("#fAll").onchange = (p) => {
          ((A.pickAll = p.target.checked), m());
        }),
        (u("#fRare").onchange = (p) => {
          ((A.keepRare = p.target.checked), m());
        }));
      {
        const p = u("#fHkBc");
        p &&
          (p.onchange = (P) => {
            ((A.hkBc = P.target.checked), m());
          });
      }
      const w = (p) => {
        ((A.hkMp = p.length >= uA.length ? null : p), m());
      };
      (document.querySelectorAll("[data-hkf]").forEach(
        (p) =>
          (p.onchange = () => {
            const P = +p.dataset.hkf,
              v = Array.isArray(A.hkMp) ? A.hkMp : uA.map((H) => H.id);
            w(p.checked ? [...new Set(v.concat(P))] : v.filter((H) => H !== P));
          }),
      ),
        u("#fHkAll") && (u("#fHkAll").onclick = () => w(uA.map((p) => p.id))),
        u("#fHkMine") &&
          (u("#fHkMine").onclick = () => w(I[r.fac] ? [I[r.fac].id] : [])),
        u("#fHkNone") && (u("#fHkNone").onclick = () => w([])),
        (u("#fWear").onchange = (p) => {
          ((A.wear = p.target.checked), m());
        }),
        (u("#fFacW").onchange = (p) => {
          ((A.facW = p.target.checked), m());
        }),
        (u("#fAcc").onchange = (p) => {
          ((A.accrue = p.target.checked), m());
        }),
        (u("#fRar").onchange = (p) => {
          ((A.minRar = +p.target.value), m());
        }),
        (u("#fLvl").onchange = (p) => {
          ((A.minLvl = +p.target.value), m());
        }),
        (u("#fMag").onchange = (p) => {
          ((A.minMag = +p.target.value), m());
        }),
        document.querySelectorAll("#t-inv [data-lm]").forEach(
          (p) =>
            (p.onclick = () => {
              (Rm(A, p.dataset.lm),
                y("Chế độ lọc: " + p.querySelector("b").textContent),
                m());
            }),
        ));
      {
        const p = u("#fThrN");
        p &&
          (p.onchange = (P) => {
            ((A.thrN = +P.target.value), m());
          });
      }
      {
        const p = u("#fSpec");
        p &&
          (p.onchange = (P) => {
            ((A.keepSpecial = P.target.checked), m());
          });
      }
      {
        const p = u("#fVal");
        p &&
          (p.onchange = (P) => {
            ((A.keepVal = +P.target.value), m());
          });
      }
      {
        const p = document.querySelector("#t-inv .lootadv");
        p &&
          (p.ontoggle = () => {
            r.lootAdv = p.open;
          });
      }
      if (
        (document.querySelectorAll("#t-inv [data-g]").forEach(
          (p) =>
            (p.onchange = () => {
              const P = +p.dataset.g;
              ((A.groups = p.checked
                ? [...new Set(A.groups.concat(P))]
                : A.groups.filter((v) => v !== P)),
                m());
            }),
        ),
        document.querySelectorAll("#t-inv [data-s]").forEach(
          (p) =>
            (p.onchange = () => {
              const P = +p.dataset.s;
              ((A.series = p.checked
                ? [...new Set(A.series.concat(P))]
                : A.series.filter((v) => v !== P)),
                m());
            }),
        ),
        document.querySelectorAll("#t-inv [data-sl]").forEach(
          (p) =>
            (p.onchange = () => {
              const P = p.dataset.sl;
              ((A.slots = p.checked
                ? [...new Set(A.slots.concat(P))]
                : A.slots.filter((v) => v !== P)),
                m());
            }),
        ),
        document.querySelectorAll("#t-inv [data-q]").forEach(
          (p) =>
            (p.onclick = () => {
              const P = rl[+p.dataset.q];
              (Y6(Object.assign(oa(), P[1])), y("Bộ lọc: " + P[0]), m());
            }),
        ),
        document.querySelectorAll("#t-inv [data-pl]").forEach(
          (p) =>
            (p.onclick = () => {
              const P = p4()[+p.dataset.pl];
              P && (Y6(P), y(`Dùng bộ lọc ${+p.dataset.pl + 1}`), m());
            }),
        ),
        document.querySelectorAll("#t-inv [data-ps]").forEach(
          (p) =>
            (p.onclick = () => {
              (Ym(+p.dataset.ps), y(`Đã lưu bộ lọc ${+p.dataset.ps + 1}`), m());
            }),
        ),
        (u("#bStash").onclick = () => Dt()),
        (u("#bKtcI").onclick = () => AA()),
        u("#epLoot"))
      ) {
        const p = qA().ep,
          P = () => {
            (B(), (Y = !0));
          };
        ((u("#eWhite").onchange = (v) => {
          ((p.white = v.target.checked), P());
        }),
          (u("#eJew").onchange = (v) => {
            ((p.jew = v.target.checked), P());
          }),
          (u("#eBlue").onchange = (v) => {
            ((p.blue = v.target.checked), P());
          }),
          (u("#eBlueLv").onchange = (v) => {
            ((p.blueLv = +v.target.value), P());
          }),
          (u("#eDest").onchange = (v) => {
            ((p.dest = v.target.value), P());
          }));
      }
      ((u("#bBest").onclick = () => {
        let p = 0;
        for (let v = 0; v < 14; v++) {
          let H = null,
            _ = 0.01;
          for (const E of r.inv) {
            if (!IA(E)) continue;
            const $ = ni(E);
            $ > _ && ((_ = $), (H = E));
          }
          if (!H) break;
          ($1(H, !0), p++);
        }
        const P = r.inv.filter(
          (v) =>
            !v.pack &&
            !v.ktc &&
            !IA(v) &&
            typeof _n == "function" &&
            _n(v) &&
            !f0(v),
        ).length;
        (y(
          p
            ? `Đã mặc ${p} món tốt hơn`
            : P
              ? `Không có món mặc được ngay · ${P} món mạnh hơn nhưng chưa đủ điều kiện (▲ xám)`
              : "Đồ đang mặc đã tốt nhất",
        ),
          F());
      }),
        (u("#bDonKho").onclick = () => n3()),
        (u("#bSellAll").onclick = () => {
          const p = b5();
          (y(
            `Bán ${p.n} món (+${j(p.gold)} lượng)${p.kept ? `, giữ ${p.kept} món được bảo vệ` : ""}`,
          ),
            F());
        }),
        document
          .querySelectorAll("#t-inv .invgrid .it")
          .forEach((p) => (p.onclick = () => Ut(Ba(p.dataset.uid)))));
    },
    ti = function () {
      setTimeout(() => {
        const t = document.getElementById("bGcode");
        t && (t.onclick = () => zb());
      }, 0);
      const A = typeof g0 == "function" && g0() && !k.offline;
      u("#t-more").innerHTML =
        `<div class="btnrow"><button class="btn" id="bGcode">🎟 Nhập Giftcode</button></div>${
          A
            ? `<h3>Lưu game</h3><div class="card"><p class="dim small">Nhân vật tự lưu lên máy chủ khi đã đăng nhập (mỗi 2 phút và khi thoát game). Đăng nhập cùng tài khoản ở máy / điện thoại khác là chơi tiếp.</p><div class="btnrow"><button class="btn" id="bCloud">🌐 Tài khoản · Lưu đám mây</button></div></div>
    `
            : `<h3>Lưu game</h3><div class="card"><p class="dim small">Nhân vật lưu trong trình duyệt của từng thiết bị (3 slot). Để chơi trên thiết bị khác: bấm <b>Tải file lưu</b>, chuyển file <code>.jxsave</code> sang thiết bị kia (Zalo, Drive, cáp…), rồi mở game ở đó và bấm <b>Nạp từ file</b>. File có chữ ký, sửa tay sẽ bị từ chối. Nên tải file định kỳ để sao lưu.</p>
    <div class="btnrow"><button class="btn" id="bDl">Tải file lưu (.jxsave)</button><button class="btn" id="bFile">Nạp từ file</button></div>
    <p class="dim small">Hoặc dùng mã văn bản:</p><div class="btnrow"><button class="btn" id="bExp">Xuất mã</button><button class="btn" id="bImp">Nhập mã</button></div><textarea id="saveTxt" rows="4" placeholder="Mã lưu game"></textarea></div>`
        }
    <h3>Âm thanh</h3><div class="card lootf">
      <label><input type="checkbox" id="sOn" ${WA().on ? "checked" : ""}> Tiếng động (đòn đánh, chiêu, quái, rơi đồ)</label>
      <div class="row">Âm lượng <input type="range" id="sVol" min="0" max="1" step="0.05" value="${WA().vol}"></div>
      <label><input type="checkbox" id="mOn" ${WA().music ? "checked" : ""}> Nhạc nền theo bản đồ</label>
      <div class="row">Nhạc <input type="range" id="mVol" min="0" max="1" step="0.05" value="${WA().mvol}"></div></div>
    <h3>Tự động</h3><div class="card"><label><input type="checkbox" id="cAuto" ${r.autoEquip ? "checked" : ""}> Tự mặc đồ tốt hơn khi nhặt</label><br>
      <label><input type="checkbox" id="cPot" ${r.potOff ? "" : "checked"}> Tự dùng thuốc khi sinh lực / nội lực dưới 50% · đã dùng ${X(r.potUsed || 0)}</label><br>
      <label><input type="checkbox" id="cPotBuy" ${r.potBuy === !1 ? "" : "checked"}> Tự mua thuốc khi hết</label><br>
      <label><input type="checkbox" id="cRide" ${r.autoRide === !1 ? "" : "checked"}> Auto tự lên ngựa khi di chuyển, xuống ngựa khi đánh bằng chiêu không dùng được trên ngựa</label>
      <div class="row small">${[0, 1]
        .map((t) => {
          const e = typeof f2 == "function" ? f2(t) : { name: "" };
          return `<button class="btn sm" data-potsl="${t}">${t ? "Nội lực (ô 2)" : "Sinh lực (ô 1)"}: ${D(e.name || "Tự động")} ▾</button>`;
        })
        .join(" ")}</div>
      <label><input type="checkbox" id="cJunk" ${r.autoJunk === !1 ? "" : "checked"}> Tự bán đồ thừa (yếu hơn đồ đang mặc cùng ô, vũ khí sai loại của phái; giữ tối đa 6 nhẫn / dây chuyền / ngọc bội để hợp Huyền Tinh)</label><br>
      <label><input type="checkbox" id="cPts" ${r.autoPts === !0 ? "checked" : ""}> Tự cộng điểm tiềm năng và võ công (mặc định tắt: tự cộng ở thẻ Nhân vật và Võ công)</label></div>
    <h3>Tiện ích</h3><div class="card lootf">

      <label><input type="checkbox" id="cBuy" ${r.autoBuy === !1 ? "" : "checked"}> Tự mua vũ khí đúng loại ở Biện Kinh khi mạnh hơn ≥ 25% (tối đa 60% ngân lượng)</label>
      <div class="btnrow"><button class="btn" id="bKtc">🏮 Kỳ Trân Các</button><button class="btn" id="bStashM">Kho chung</button><button class="btn" id="bTut">Hướng dẫn</button><button class="btn" id="bCodex">Bách khoa</button><button class="btn" id="bSug">Gợi ý cộng điểm</button></div></div>
    <h3>Trợ năng</h3><div class="card lootf">
      <div class="row">Cỡ chữ <select id="uFs">${_o.map((t, e) => `<option value="${e}" ${D3().fs === e ? "selected" : ""}>${uk[e]}</option>`).join("")}</select> <small class="dim">áp dụng cho bảng thông tin, thẻ và hộp thoại</small></div>
      <label><input type="checkbox" id="uSaver" ${D3().saver ? "checked" : ""}> Tiết kiệm pin (vẽ 30 khung/giây, ngừng vẽ khi ẩn tab)</label>
      <small class="dim">Tay cầm: cần analog / D-pad để đi, A B X Y dùng chiêu 1–4, LB / RB uống thuốc HP / MP. Phím Esc đóng hộp thoại.</small></div>
    <h3>Điều khiển & Hiển thị</h3><div class="card">
      <label><input type="checkbox" id="cLowFx" ${r.lowFx ? "checked" : ""}> Giảm hiệu ứng (mượt hơn trên máy yếu / đông quái)</label></div>
    <h3>Nguồn dữ liệu</h3><div class="card small dim">Kỹ năng, quái, trang bị, thuộc tính và tỉ lệ rơi đồ trích từ dữ liệu Võ Lâm Truyền Kỳ 1 (bản fan chơi offline, phi thương mại).</div>
    <div class="btnrow"><button class="btn" id="bSwitch">Đổi nhân vật / slot</button><button class="btn red" id="bReset">Xóa nhân vật</button></div>`;
      const n = (t, e) => {
        const a = u(t);
        a && (a.onclick = e);
      };
      (n("#bCloud", () => $0("acc")),
        n("#bDl", () => {
          K9() && y("Đã tải file lưu: " + dc());
        }),
        n("#bFile", () => k5(null)),
        n("#bExp", () => {
          ((u("#saveTxt").value = R9()), y("Đã xuất mã"));
        }),
        n("#bImp", () => td(u("#saveTxt").value, null)),
        (u("#cAuto").onchange = (t) => {
          ((r.autoEquip = t.target.checked), B());
        }),
        (u("#cJunk").onchange = (t) => {
          ((r.autoJunk = t.target.checked), B());
        }),
        (u("#sOn").onchange = (t) => {
          (D5(), (WA().on = t.target.checked), xa(), B());
        }),
        (u("#mOn").onchange = (t) => {
          (D5(),
            (WA().music = t.target.checked),
            xa(),
            WA().music &&
              Vt(c.town ? H0.town.id : V0(Math.min(r.stage, l0)).id),
            B());
        }),
        (u("#sVol").oninput = (t) => {
          ((WA().vol = +t.target.value), xa());
        }),
        (u("#mVol").oninput = (t) => {
          ((WA().mvol = +t.target.value), xa());
        }),
        (u("#sVol").onchange = u("#mVol").onchange = () => B()),
        (u("#cPot").onchange = (t) => {
          ((r.potOff = !t.target.checked), B());
        }),
        (u("#cPotBuy").onchange = (t) => {
          ((r.potBuy = t.target.checked), B());
        }),
        (u("#cRide").onchange = (t) => {
          ((r.autoRide = t.target.checked), B());
        }),
        document
          .querySelectorAll("[data-potsl]")
          .forEach((t) => (t.onclick = () => oi(+t.dataset.potsl))),
        (u("#cPts").onchange = (t) => {
          ((r.autoPts = t.target.checked),
            r.autoPts && (Oe(), Xn(), u0()),
            B());
        }),
        (u("#cLowFx").onchange = (t) => {
          ((r.lowFx = t.target.checked), B());
        }),
        (u("#cBuy").onchange = (t) => {
          ((r.autoBuy = t.target.checked), B());
        }),
        (u("#bStashM").onclick = () => Dt()),
        (u("#bKtc").onclick = () => AA()),
        (u("#bTut").onclick = () => Bf(0)),
        (u("#bCodex").onclick = () => nb()),
        (u("#bSug").onclick = C2),
        (u("#uFs").onchange = (t) => {
          yo({ fs: +t.target.value });
        }),
        (u("#uSaver").onchange = (t) => yo({ saver: t.target.checked })),
        (u("#bSwitch").onclick = () => z9()),
        (u("#bReset").onclick = () =>
          J(
            `<h3>Xóa nhân vật?</h3><p class="desc">Xóa nhân vật ở slot ${nA + 1} (${D(I[r.fac] ? I[r.fac].n : "")} cấp ${r.lvl}). Toàn bộ tiến trình của slot này sẽ mất; các slot khác không ảnh hưởng.</p><div class="btnrow"><button class="btn red" id="bYes">Xóa</button></div>`,
            () => (u("#bYes").onclick = () => t5(nA)),
          )));
    },
    iA = function (A) {
      ((vA = A),
        document.body.classList.toggle("tablog", A === "log"),
        document.body.classList.contains("u2m") &&
          typeof rt == "function" &&
          typeof aA < "u" &&
          aA &&
          requestAnimationFrame(() => {
            (rt(), typeof pn == "function" && pn());
          }),
        document
          .querySelectorAll("#tabs button")
          .forEach((n) => n.classList.toggle("on", n.dataset.t === A)),
        document
          .querySelectorAll(".tab")
          .forEach((n) => n.classList.toggle("hidden", n.id !== "t-" + A)),
        F());
    },
    F = function () {
      (typeof Pf == "function" && Pf(),
        r.fac &&
          (c.dirty && u0(),
          {
            log: Up,
            char: _a,
            skill: In,
            inv: Jt,
            forge: Or,
            quest: H2,
            more: ti,
          }[vA](),
          MA(),
          Ma()));
    },
    Ma = function () {
      u("#dotChar").classList.toggle("on", r.attrPts > 0);
      const A = u("#dotForge"),
        n = u("#dotQuest");
      (A && A.classList.toggle("on", zv()),
        n && n.classList.toggle("on", jv()),
        u("#dotSkill").classList.toggle(
          "on",
          (r.skPts > 0 && I[r.fac] && I[r.fac].skills.some((t) => b1(T[t]))) ||
            (Kn() && r.lvl >= CA),
        ));
    },
    tD = function () {
      const A = c.P;
      if (!A) return;
      {
        const a = yt(),
          i = u(".lvbox");
        a && i && i.style.setProperty("--pl", `url('${a.img}')`);
      }
      ((u("#lv").textContent = r.lvl), (u("#gold").textContent = j(r.gold)));
      {
        const a = u("#knbTop");
        a && (a.textContent = X(r.knb || 0));
      }
      u("#heroName").textContent = I[r.fac] ? I[r.fac].n : "";
      {
        let a = u("#skBuffs");
        a ||
          ((a = document.createElement("div")),
          (a.id = "skBuffs"),
          u("#battle").appendChild(a));
        const o = (typeof y6 == "function" ? y6() : [])
          .map(
            (l) =>
              `<div class="sti" title="${D(l.n)}"><img src="${D(l.ic || "")}" alt=""><b>${hm(l.t)}</b></div>`,
          )
          .join("");
        a.innerHTML !== o && (a.innerHTML = o);
      }
      u("#stageLbl").textContent = c.dg
        ? c.dg.kind === "boat"
          ? "⛵ Phong Lăng Độ"
          : c.dg.kind === "wb"
            ? "Boss tuần"
            : c.dg.d.n
        : `${bf()[1]} ${V0(Math.min(r.stage, l0)).n} ${c.field && !c.town ? ` · hạ ${X(c.field.kills)}` : ""}`;
      const n = S.exp[r.lvl - 1] || 1;
      ((u("#xpBar").style.width = (r.xp / n) * 100 + "%"),
        (u("#xpTxt").textContent = `${((r.xp / n) * 100).toFixed(1)}%`),
        (u("#hpBar").style.width = (c.life / A.life) * 100 + "%"),
        (u("#hpTxt").textContent = `${X(c.life)} / ${X(A.life)}`),
        (u("#mpBar").style.width = (c.mana / A.mana) * 100 + "%"),
        (u("#mpTxt").textContent = `${X(c.mana)} / ${X(A.mana)}`),
        (u("#mainSk").textContent = A.main.n));
      const t = u("#lvS");
      t && (t.textContent = r.lvl);
      const e = u("#pwS");
      e && c.P && (e.textContent = X(Math.round(c.P.main.tot)));
    },
    k5 = function (A) {
      if (typeof g0 == "function" && g0()) {
        y("Bản online chỉ dùng lưu đám mây");
        return;
      }
      const n = document.createElement("input");
      ((n.type = "file"),
        (n.accept = ".jxsave,.json,.txt,application/json,text/plain"),
        (n.style.display = "none"),
        (n.onchange = () => {
          const t = n.files && n.files[0];
          if ((n.remove(), !t)) return;
          const e = new FileReader();
          ((e.onload = () => td(String(e.result), A)),
            (e.onerror = () => y("Không đọc được file")),
            e.readAsText(t));
        }),
        document.body.appendChild(n),
        n.click());
    },
    td = function (A, n, t) {
      if (typeof g0 == "function" && g0()) {
        y("Bản online chỉ dùng lưu đám mây");
        return;
      }
      let e;
      try {
        e = fc(A);
      } catch (l) {
        y(l.message || "File không hợp lệ");
        return;
      }
      const a = I[e.fac],
        i = `${D(a.n)} cấp ${Math.max(1, Math.min(R2, e.lvl | 0))}`,
        o = [...Array(W1).keys()]
          .map((l) => {
            const d = Ns(l),
              h = d && I[d.fac];
            return `<div class="slotrow ${d ? "" : "empty"}"><span><b>Slot ${l + 1}</b><small>${d && h ? D(h.n) + " cấp " + d.lvl + " (sẽ bị ghi đè)" : "Trống"}</small></span><button class="btn ${d ? "red" : ""}" data-into="${l}">${d ? "Ghi đè" : "Nạp vào"}</button></div>`;
          })
          .join("");
      J(
        `<h3>Nạp file lưu</h3><p class="desc">Nhân vật trong file: <b>${i}</b>. Chọn slot để nạp (slot đã có nhân vật sẽ giữ một bản sao lưu).</p><div class="slotlist">${o}</div>${n ? '<div class="btnrow"><button class="btn" id="impBack">Quay lại</button></div>' : ""}`,
        () => {
          document.querySelectorAll("#mBody [data-into]").forEach(
            (d) =>
              (d.onclick = () => {
                try {
                  (nA === +d.dataset.into && (Tn = !0), hc(+d.dataset.into, e));
                } catch (h) {
                  y(h.message);
                  return;
                }
                location.reload();
              }),
          );
          const l = u("#impBack");
          l && (l.onclick = n);
        },
        !!n && !r.fac,
      );
    },
    k8 = function s(A) {
      const n = [...Array(W1).keys()]
        .map((t) => {
          const e = Ns(t),
            a = e && I[e.fac];
          if (!e || !a)
            return `<div class="slotrow empty"><span><b>Slot ${t + 1}</b><small>Trống</small></span><button class="btn" data-play="${t}">Tạo nhân vật</button></div>`;
          const i = e.last ? new Date(e.last).toLocaleString("vi-VN") : "";
          return A === t
            ? `<div class="slotrow del"><span><b>Xóa slot ${t + 1}?</b><small>${D(a.n)} cấp ${e.lvl} sẽ mất vĩnh viễn</small></span><button class="btn red" data-del-yes="${t}">Xóa</button><button class="btn" data-del-no="1">Hủy</button></div>`
            : `<div class="slotrow"><img src="${D((yt(e.fac, e.sex) || {}).img || "")}" alt=""><span><b style="color:${m0[a.series]}">${D(e.name && e.name !== a.n ? e.name + " · " : "")}${D(a.n)}</b><small>Cấp ${e.lvl} · ải ${e.stage}${i ? " · " + D(i) : ""}</small></span><button class="btn" data-play="${t}">Chơi</button><button class="btn red" data-del="${t}">Xóa</button></div>`;
        })
        .join("");
      J(
        `<h3>Chọn nhân vật</h3><p class="desc">Mỗi slot là một nhân vật riêng, lưu độc lập.</p><div class="slotlist">${n}</div>${typeof g0 == "function" && g0() ? "" : '<div class="btnrow"><button class="btn" id="slotImp">Nạp từ file lưu (.jxsave)</button></div>'}`,
        () => {
          const t = u("#slotCloud");
          t && (t.onclick = () => $0("acc"));
          const e = u("#slotImp");
          (e && (e.onclick = () => k5(() => s())),
            document.querySelectorAll("#mBody [data-play]").forEach(
              (a) =>
                (a.onclick = () => {
                  try {
                    localStorage.setItem(Z1, a.dataset.play);
                  } catch {}
                  ((Tn = !0), location.reload());
                }),
            ),
            document
              .querySelectorAll("#mBody [data-del]")
              .forEach((a) => (a.onclick = () => s(+a.dataset.del))),
            document
              .querySelectorAll("#mBody [data-del-no]")
              .forEach((a) => (a.onclick = () => s())),
            document
              .querySelectorAll("#mBody [data-del-yes]")
              .forEach((a) => (a.onclick = () => t5(+a.dataset.delYes))));
        },
        !0,
      );
    },
    ed = function s() {
      const A = (a) => uA.filter((i) => i.series === a),
        n = (a, i) =>
          A(a)
            .map((o) => (Q1(o, i) ? D(o.n) : `<s>${D(o.n)}</s>`))
            .join(" · "),
        t = S.start[bA.s * 2 + bA.sex] || {},
        e = A(bA.s).some((a) => Q1(a, bA.sex));
      J(
        `<h3>Tạo nhân vật</h3><p class="desc">Như Võ Lâm Truyền Kỳ: chọn tên, giới tính và hệ ngũ hành. Đến <b>cấp ${CA}</b> mới gia nhập môn phái cùng hệ.</p>
    <div class="card lootf newc"><div class="row">Tên <input id="ncName" maxlength="14" placeholder="Tên nhân vật" value="${D(bA.name)}"></div>
      <div class="row">Giới tính <span class="seg">${["Nam", "Nữ"].map((a, i) => `<button class="btn sm${bA.sex === i ? " on" : ""}" data-sx="${i}">${a}</button>`).join("")}</span></div>
      <div class="dim small">Hệ ngũ hành (Kim khắc Mộc, Mộc khắc Thổ, Thổ khắc Thủy, Thủy khắc Hỏa, Hỏa khắc Kim):</div>
      <div class="serpick">${[0, 1, 2, 3, 4].map((a) => `<button data-se="${a}" class="${bA.s === a ? "on" : ""}" style="--c:${m0[a]}"><b>${d0[a]}</b><small>${dD[a]}</small><small>Phái: ${n(a, bA.sex)}</small></button>`).join("")}</div>
      <div class="stats"><span>Sức mạnh</span><span>${t.str ?? "-"}</span><span>Thân pháp</span><span>${t.dex ?? "-"}</span><span>Sinh khí</span><span>${t.vit ?? "-"}</span><span>Nội công</span><span>${t.eng ?? "-"}</span></div>
      ${e ? "" : `<p class="reqbad">Hệ ${d0[bA.s]} không có môn phái nhận ${bA.sex ? "nữ" : "nam"}.</p>`}
      <div class="btnrow"><button class="btn" id="ncGo" ${e ? "" : "disabled"}>Vào giang hồ</button></div></div>`,
        () => {
          const a = u("#ncName");
          ((a.oninput = () => {
            bA.name = a.value;
          }),
            document.querySelectorAll("#mBody [data-sx]").forEach(
              (i) =>
                (i.onclick = () => {
                  ((bA.name = a.value), (bA.sex = +i.dataset.sx), s());
                }),
            ),
            document.querySelectorAll("#mBody [data-se]").forEach(
              (i) =>
                (i.onclick = () => {
                  ((bA.name = a.value), (bA.s = +i.dataset.se), s());
                }),
            ),
            (u("#ncGo").onclick = () => {
              const i = a.value.trim().replace(/\s+/g, " ");
              if (i.length < 2) {
                y("Tên cần ít nhất 2 ký tự");
                return;
              }
              x5(i.slice(0, 14), bA.sex, bA.s);
            }));
        },
        !0,
      );
    },
    x5 = function (A, n, t) {
      ((r.fac = "vo" + t),
        (r.sex = n),
        (r.sexSet = 1),
        (r.name = A),
        typeof k < "u" && k.user && (r.netOwner = k.user.id),
        sd(),
        (c.dirty = !0),
        u0(),
        (c.life = c.P.life),
        (c.mana = c.P.mana),
        di(),
        Nn(),
        t0(!0),
        B(),
        iA("log"),
        ad(),
        M(
          `<b>${D(A)}</b> (${n ? "nữ" : "nam"}, hệ <span style="color:${m0[t]}">${d0[t]}</span>) bước vào giang hồ. Đạt cấp ${CA} để gia nhập môn phái.`,
        ),
        M(
          `🌱 Nhận <b>Hỗ Trợ Tân Thủ</b>: vòng sáng hồi ${Wn.life * 100}% sinh lực + ${Wn.mana * 100}% nội lực mỗi giây, <b>+${N3 * 100}% kinh nghiệm</b> luyện cấp đến cấp ${Ee}.`,
        ));
      try {
        if (typeof wf === "function") wf();
        if (typeof fn === "function") {
          fn(0, "Khởi đầu giang hồ");
        } else if (typeof vn === "function" && typeof V0 === "function") {
          vn(V0(Math.min((r && r.stage) || 1, typeof l0 !== "undefined" ? l0 : 1)));
        }
      } catch (err) {
        console.error("Error setting initial zone in x5:", err);
      }
    },
    B5 = function () {
      if (!Kn()) return;
      const A = j0(),
        n = uA.filter((e) => e.series === A);
      if (r.lvl < CA) {
        J(
          `<h3>Gia nhập môn phái</h3><p class="desc">Cần đạt cấp ${CA} (hiện cấp ${r.lvl}). Các phái hệ ${d0[A]}: ${n.map((e) => D(e.n)).join(", ")}.</p>`,
        );
        return;
      }
      const t = n
        .map((e) => {
          const a = Q1(e, r.sex),
            i = e.starter && T[e.starter];
          return `<button data-j="${e.key}" ${a ? "" : "disabled"} style="--c:${m0[e.series]}"><img src="${(H0.hero[e.key] || {}).img || ""}" alt=""><b>${D(e.n)}</b><small>${a ? `Chiêu nhập môn: ${i ? D(i.n) : "—"} · ${ld(e)}` : `Chỉ nhận ${xt[e.key] ? "nữ" : "nam"}`}</small></button>`;
        })
        .join("");
      J(
        `<h3>Gia nhập môn phái <small>hệ ${d0[A]}</small></h3><p class="desc">Đã đạt cấp ${CA}. Chọn môn phái cùng hệ ${d0[A]}: nhận chiêu nhập môn và vũ khí của phái. Điểm kỹ năng tích lũy từ trước vẫn giữ.</p><div class="facpick">${t}</div>`,
        () => {
          document
            .querySelectorAll("#mBody [data-j]")
            .forEach((e) => (e.onclick = () => eD(e.dataset.j)));
        },
      );
    },
    eD = function (A) {
      const n = I[A];
      if (!n || n.novice || !Kn() || n.series !== j0() || !Q1(n, r.sex)) return;
      ((r.fac = A),
        n.starter &&
          !r.sk[n.starter] &&
          ((r.sk[n.starter] = 1),
          (r.skPts = Math.max(0, r.skPts - 1)),
          (r.main = n.starter)));
      const t = C(Math.round(r.lvl / 12) + 1, 1, 10),
        e = H8(n),
        a = pA(e[0], e[1], t, 0);
      if ((a && (r.inv.unshift(a), (Y = !0)), r.autoPts === !0)) {
        let i = 0;
        for (const o in r.attr)
          ((i += r.attr[o]), (r.attrPts += r.attr[o]), (r.attr[o] = 0));
        if (a) {
          const o = Jn(a);
          for (const l in o) {
            const d = Math.min(o[l], r.attrPts);
            ((r.attr[l] += d), (r.attrPts -= d));
          }
        }
        ((c.dirty = !0),
          u0(),
          a && f0(a) && $1(a, !0),
          (c.dirty = !0),
          u0(),
          Xn(),
          Oe(),
          typeof an == "function" && an(),
          i &&
            M(
              `🌊 Vào phái: phân phối lại ${i} điểm tiềm năng theo võ công / vũ khí ${D(n.n)}.`,
            ));
      } else a && f0(a) && $1(a, !0);
      (O1(),
        (c.dirty = !0),
        u0(),
        t0(!0),
        F(),
        MA(),
        B(),
        (c.banner = {
          t: 2.6,
          text: "Gia nhập " + n.n,
          sub: "Học võ công ở thẻ Võ công",
        }),
        M(
          `<b class="up">Gia nhập <span style="color:${m0[n.series]}">${D(n.n)}</span>!</b>`,
        ),
        i0("levelup"));
    },
    ad = function () {
      (J(
        `<h3>JxOffline</h3><p class="desc notice">${D(cd)}</p><div class="btnrow"><button class="btn" id="bNotice">Đã hiểu</button></div>`,
        () => {
          u("#bNotice").onclick = () => {
            (t0(!0), r.tut || Bf(0));
          };
        },
      ),
        M(`<span class="dim">${D(cd)}</span>`));
    },
    nx = function (A) {
      const n = I[A];
      ((r.fac = A),
        (r.sex = ["emei", "cuiyan"].includes(A) ? 1 : 0),
        (r.sexSet = 1),
        (r.name = r.name && r.name !== "Tân thủ" ? r.name : n.n),
        n.starter &&
          ((r.sk[n.starter] = 1),
          (r.skPts = Math.max(0, r.skPts - 1)),
          (r.main = n.starter)),
        sd(),
        (c.dirty = !0),
        u0(),
        (c.life = c.P.life),
        (c.mana = c.P.mana),
        di(),
        Nn(),
        t0(!0),
        B(),
        iA("log"),
        ad(),
        M(
          `Gia nhập <b style="color:${m0[n.series]}">${D(n.n)}</b>. Bắt đầu hành tẩu giang hồ!`,
        ),
        M(
          `🌱 Nhận <b>Hỗ Trợ Tân Thủ</b>: vòng sáng hồi ${Wn.life * 100}% sinh lực + ${Wn.mana * 100}% nội lực mỗi giây, <b>+${N3 * 100}% kinh nghiệm</b> luyện cấp đến cấp ${Ee}.`,
        ));
    },
    sd = function () {
      if (r.eq.weapon) return;
      const A = I[r.fac],
        n =
          A && !A.novice
            ? H8(A)
            : [0, A && A.wcode >= 0 && A.wcode !== 9 ? A.wcode : 6],
        t = pA(n[0], n[1], 1, 0);
      t && (r.eq.weapon = t);
      const e = pA(2, Qe(2, 0), 1, 0);
      e && F1(e) && (r.eq.armor = e);
    },
    vA = "log",
    Y = !0,
    ei = () => 0,
    id,
    aD = 6,
    Ha = (s) =>
      !!(
        (s.set && Ge(s)) ||
        s.vio ||
        s.plv ||
        s.lock ||
        s.thanma ||
        s.pack ||
        s.ktc ||
        (typeof U0 == "function" && U0(s))
      ),
    C1 = {
      str: "Sức mạnh",
      dex: "Thân pháp",
      vit: "Sinh khí",
      eng: "Nội công",
    },
    sD =
      /^(skill_attackradius|missle_|skill_cost_v|skill_eventskilllevel|addskilldamage|skill_)/,
    _5 =
      /^(me2(metal|wood|water|fire|earth)damage_p|(metal|wood|water|fire|earth)2medamage_p|melee_returnres_p|range_returnres_p|[a-z_]+_yan_[pv])$/,
    tx = {
      1055: "Kim Cang Chưởng",
      1056: "Vi Đà Hiến Chử",
      1057: "Tam Giới Quy Thiền",
      1058: "Hào Hùng Trảm",
      1059: "Tung Hoành Bát Hoang",
      1060: "Bá Vương Tạm Kim",
      1061: "Kiếm Hoa Vãn Tinh",
      1062: "Băng Vũ Lạc Tinh",
      1063: "Băng Tước Việt Chi",
      1065: "Thủy Ánh Mạn Tú",
      1066: "Hình Tiêu Cốt Lập",
      1067: "U Hồn Phệ Ảnh",
      1069: "Vô Ảnh Xuyên",
      1070: "Thiết Liên Tứ Sát",
      1071: "Càn Khôn Nhất Trịch",
      1073: "Thời Thừa Lục Long",
      1074: "Bổng Huýnh Lược Địa",
      1075: "Giang Hải Nộ Lan",
      1076: "Tật Hỏa Liêu Nguyên",
      1078: "Tạo Hóa Thái Thanh",
      1079: "Kiếm Thùy Tinh Hà",
      1080: "Cửu Thiên Cương Phong",
      1083: "Long Thừa Bát Nhã Thủ",
      1091: "Lưu Phong Hồi Tuyết Băng Trụ",
      1108: "Phong Minh Ngọc Toái",
      1109: "Lôi Động Càn Khôn",
    },
    ex = {
      1084: 1058,
      1086: 1058,
      1087: 1059,
      1088: 1060,
      1094: 1066,
      1096: 1066,
      1099: 1071,
      1100: 1071,
      1101: 1073,
    },
    ax = {
      1064: ["Băng Ngưng Hàn Yên", 1063],
      1085: ["Vạn Vật Đế Quy Nhất", 1057],
      1093: ["Khinh Sa Phù Thủy", 1065],
      1095: ["Hồn Ảnh Tùng Sinh", 1067],
      1097: ["Truy Tâm Tỏa Mệnh", 1069],
      1107: ["Kiếm Minh Thương Khung", 1079],
    },
    rd = (() => {
      const s = {};
      for (const A in Y1) {
        const n = Y1[A];
        (n.sid && (s[n.sid] = [n.n, +A, 2]),
          n.at16 && n.at16.sid && (s[n.at16.sid] = [n.at16.n, +A, 3]));
      }
      return s;
    })(),
    iD = {
      orange: "#ff9a3c",
      yellow: "#ffe066",
      red: "#ff6b5b",
      green: "#7dff7d",
      blue: "#6aa8ff",
      white: "#ffffff",
      gold: "#ffd76a",
      purple: "#c77bff",
      water: "#8fd8ff",
      metal: "#ffe8a3",
    },
    rD = (s) =>
      String(s)
        .replace(
          /&lt;color=([a-zA-Z]+)&gt;([\s\S]*?)(?:&lt;color&gt;|$)/g,
          (A, n, t) =>
            `<span style="color:${iD[n.toLowerCase()] || "inherit"}">${t}</span>`,
        )
        .replace(/&lt;color&gt;/g, ""),
    oD = [
      "skill_collideevent",
      "skill_vanishedevent",
      "skill_startevent",
      "skill_flyevent",
    ],
    lD =
      /^(skill_|missle_|addskill|seriesdamage_p|ignoredefense_p|attackrating_[vp]|magicdamage_v)/,
    cD = [
      ["new", "Mới nhặt"],
      ["rar", "Độ hiếm"],
      ["lvl", "Cấp đồ"],
      ["slot", "Loại"],
      ["pow", "Sức mạnh"],
    ],
    od = Object.fromEntries(G1.map(([s], A) => [s, A]).concat([["ring", 7]])),
    dD = [
      "Cương mãnh, ngoại công mạnh",
      "Độc dược, ám khí",
      "Mềm dẻo, nội công băng",
      "Hỏa công, lực đánh lớn",
      "Lôi, kiếm khí, bền bỉ",
    ],
    bA = { name: "", sex: 0, s: 0 },
    fD = {
      0: "kiếm",
      1: "đao",
      2: "côn",
      3: "thương",
      4: "chùy",
      5: "song đao",
      7: "ám khí",
      9: "quyền chưởng",
    },
    ld = (s) => fD[s.wcode] || "vũ khí",
    cd =
      "JxOffline - Phi thương mại, ưu tiên giải trí trên chính thiết bị của mình",
    ai = function () {
      const A = u("#rotBtn");
      if (!A) return;
      const n = r.rot !== !1;
      ((A.innerHTML = 'Xoay chiêu: <i class="ck"></i>'),
        (A.title = n
          ? "Xoay chiêu: luân phiên chiêu ở ô F1–F4 khi tự đánh"
          : "Chỉ đánh chiêu chính"),
        A.classList.toggle("on", n));
    },
    M5 = function () {
      ((r.rot = r.rot === !1),
        ai(),
        (c.dirty = !0),
        B(),
        y(
          r.rot !== !1
            ? "Xoay chiêu: luân phiên các chiêu ở ô F1 đến F4 khi tự đánh"
            : "Xoay chiêu tắt: chỉ đánh chiêu chính",
        ));
    },
    H5 = function () {
      const A = ii();
      document.body.classList.toggle("deskland", A);
      const n = u("#inBtn");
      n && (n.textContent = Ta() ? "🖱 Chuột" : "👆 Chạm");
    },
    hD = function () {
      const A = performance.now();
      if (Ca && A - pd < 500 && Ca.h === k0.h && Ca.w === k0.w) return Ca;
      pd = A;
      const n = I1 + 14;
      let t = k0.h - I1 - 14;
      const e = document.getElementById("battle"),
        a = e && e.getBoundingClientRect();
      if (a && a.width) {
        let i = a.bottom;
        for (const o of [
          "u20log",
          "chatBox",
          "mswBtn",
          "pad",
          "u20lt",
          "u20ct",
        ]) {
          const l = document.getElementById(o);
          if (!l || getComputedStyle(l).visibility === "hidden") continue;
          const d = l.getBoundingClientRect();
          !d.width ||
            !d.height ||
            d.left > a.left + n + I1 + 8 ||
            d.right < a.left + n - I1 - 8 ||
            d.bottom < a.top + k0.h * 0.45 ||
            d.top > a.bottom ||
            (i = Math.min(i, d.top));
        }
        t = Math.max(k0.h * 0.42, i - a.top - I1 - 14);
      }
      return (Ca = { x: n, y: t, w: k0.w, h: k0.h });
    },
    gD = function () {
      const A = navigator.getGamepads
          ? Array.from(navigator.getGamepads())
          : [],
        n = A.find((o) => o && o.connected);
      if (!n) {
        ((f1.v = [0, 0]), (f1.prev = []));
        return;
      }
      const t = (o) => !!(n.buttons[o] && n.buttons[o].pressed);
      let e = n.axes[0] || 0,
        a = n.axes[1] || 0;
      (Math.hypot(e, a) < 0.25 && ((e = 0), (a = 0)),
        t(14) && (e = -1),
        t(15) && (e = 1),
        t(12) && (a = -1),
        t(13) && (a = 1),
        (f1.v = [e, a]),
        (e || a) && r.fac && !c.town && !S1() && d2("manual", !0));
      const i = (o) => t(o) && !f1.prev[o];
      if (r.fac) {
        for (let o = 0; o < 4; o++) i(o) && T5(o);
        (i(4) && $a("life"),
          i(5) && $a("mana"),
          i(8) && (c.town ? E1() : C5()));
      }
      f1.prev = n.buttons.map((o) => !!o.pressed);
    },
    mD = function () {
      if (K.active && K.moved) {
        const a = K.x - K.ox,
          i = K.y - K.oy,
          o = Math.hypot(a, i);
        if (o < 6) return [0, 0];
        const l = Math.min(1, o / I1) / o;
        return [a * l, i * l];
      }
      if (f1.v[0] || f1.v[1]) {
        K.target = null;
        const a = Math.hypot(f1.v[0], f1.v[1]);
        return a > 1 ? [f1.v[0] / a, f1.v[1] / a] : f1.v.slice();
      }
      const A = K.keys;
      let n = 0,
        t = 0;
      ((A.ArrowLeft || A.a) && (n -= 1),
        (A.ArrowRight || A.d) && (n += 1),
        (A.ArrowUp || A.w) && (t -= 1),
        (A.ArrowDown || A.s) && (t += 1));
      const e = Math.hypot(n, t);
      if (e) return ((K.target = null), [n / e, t / e]);
      if (K.target) {
        const a = K.target.x - b.x,
          i = K.target.y - b.y,
          o = Math.hypot(a, i);
        return o < 6 ? ((K.target = null), [0, 0]) : [a / o, i / o];
      }
      return [0, 0];
    },
    dd = function (A) {
      const [n, t] = mD();
      if (!n && !t) return (K.tmp && !K.active && (K.tmp = !1), !1);
      const e = 150 * i2(),
        [a, i] = Yo(b.x + n * e * A, b.y + t * e * A);
      return (
        !Rn(b, a, i) && K.target && (K.target = null),
        (c.pickTarget = null),
        !0
      );
    },
    d2 = function (A, n) {
      ((r.ctrl = A),
        (K.target = null),
        (K.tmp = !1),
        MA(),
        n ||
          y(
            A === "manual"
              ? "Tự điều khiển: kéo trên sân để đi, nhân vật tự đánh quái trong tầm"
              : "Tự động: nhân vật tự đi đánh và nhặt đồ",
          ));
    },
    fd = function () {
      return Object.keys(r.sk)
        .map(Number)
        .filter((A) => r.sk[A] && NA(T[A]));
    },
    O1 = function () {
      r.slots = (r.slots || [0, 0, 0, 0]).map((A) =>
        A === -1 ? -1 : A && r.sk[A] ? A : 0,
      );
      for (const A of fd().sort((n, t) => T[t].req - T[n].req)) {
        if (r.slots.includes(A)) continue;
        const n = r.slots.indexOf(0);
        if (n < 0) break;
        r.slots[n] = A;
      }
    },
    hd = function (A, n) {
      if ((O1(), n === -1)) {
        ((r.slots[A] = -1), MA(), B());
        return;
      }
      const t = r.slots.indexOf(n);
      (t >= 0 && (r.slots[t] = r.slots[A]), (r.slots[A] = n), MA(), B());
    },
    $5 = function (A) {
      O1();
      let n = u("#skPick");
      if (n && n.dataset.i === String(A)) {
        n.remove();
        return;
      }
      n && n.remove();
      const t = r.slots[A],
        e = fd().sort((m, w) => T[m].req - T[w].req),
        a = u("#battle");
      ((n = document.createElement("div")),
        (n.id = "skPick"),
        (n.dataset.i = A));
      const i = (m) => {
        const w = T[m],
          p = r.slots.indexOf(m);
        return `<b>${D(w.n)}</b> <small>cấp ${r.sk[m] || 0}${p >= 0 && p !== A ? ` · đang ở F${p + 1}` : ""}</small>`;
      };
      ((n.innerHTML =
        `<div class="nm">F${A + 1} · ${t > 0 ? i(t) : "<small>trống</small>"}</div>` +
        (t > 0
          ? '<button class="spk spk0" data-ss="-1" title="Bỏ chiêu khỏi ô này">✕</button>'
          : "") +
        (e
          .map((m) => {
            const w = r.slots.indexOf(m);
            return `<button class="spk${m === t ? " on" : ""}" data-ss="${m}" style="background-image:url('${D(T[m].ic || "")}')">${w >= 0 ? `<i>F${w + 1}</i>` : ""}<u>${r.sk[m] || 0}</u></button>`;
          })
          .join("") || '<small class="dim">Chưa học chiêu tấn công</small>')),
        a.appendChild(n));
      const o = c5(),
        l = a.getBoundingClientRect(),
        d = u(`#pad .sk[data-i="${A}"]`).getBoundingClientRect(),
        h = u("#pad").getBoundingClientRect(),
        g = n.offsetWidth,
        f = C(
          (d.left + d.width / 2 - l.left) / o - g / 2,
          4,
          l.width / o - g - 4,
        );
      ((n.style.left = f + "px"),
        (n.style.bottom = (l.bottom - h.top) / o + 6 + "px"),
        n.querySelectorAll("[data-ss]").forEach((m) => {
          ((m.onpointerenter = () => {
            n.querySelector(".nm").innerHTML =
              `F${A + 1} · ${+m.dataset.ss == -1 ? "<b>Bỏ trống ô này</b>" : i(+m.dataset.ss)}`;
          }),
            (m.onclick = (w) => {
              (w.stopPropagation(),
                hd(A, +m.dataset.ss),
                n.remove(),
                vA === "skill" && F());
            }));
        }),
        setTimeout(
          () =>
            document.addEventListener(
              "pointerdown",
              function m(w) {
                n.contains(w.target) ||
                  (n.remove(),
                  document.removeEventListener("pointerdown", m, !0));
              },
              !0,
            ),
          0,
        ));
    },
    gd = function (A, n) {
      let t = null,
        e = 40;
      for (const a of typeof M1 == "function" ? M1() : []) {
        const i = Math.hypot(a.x - A, a.y - 20 - n);
        i < e + (a.r || 17) && ((e = i - (a.r || 17)), (t = a));
      }
      return t;
    },
    T5 = function (A) {
      O1();
      const n = r.slots[A];
      if (!(n > 0)) {
        $5(A);
        return;
      }
      if (fA() && typeof M1 == "function") {
        const t = M1();
        t.length && (c.manTgt = G4(t));
      }
      ((r.main = n),
        (r.mainLock = !0),
        (c.dirty = !0),
        u0(),
        MA(),
        y("Chiêu chính: " + T[n].n));
    },
    $a = function (A) {
      if (((c.potCd = c.potCd || { life: 0, mana: 0 }), c.potCd[A] > 0)) return;
      const n = N5(A === "mana" ? 1 : 0);
      if (!n) {
        y("Không đủ ngân lượng mua thuốc");
        return;
      }
      const t = n.p;
      (Vl(A, t, n.free),
        (c.potCd[A] = si),
        y(
          n.free
            ? `${t.n} (còn ${h1(t.kind)[t.tier] || 0})`
            : `${t.n} (-${j(Rt(t))} lượng)`,
        ));
    },
    returnToTown = function (force = false, bannerSub = "Hồi phục · bán đồ · trở lại bãi") {
      if (c.dg && !force) {
        y("Đang trong phó bản / boss tuần");
        return;
      }
      if (!force && (c.tpCd || 0) > 0) {
        y(`Thổ Địa Phù hồi sau ${Math.ceil(c.tpCd)} giây`);
        return;
      }
      const townInfo = (typeof H0 !== 'undefined' && H0.town) ? H0.town : { id: 37, n: "Biện Kinh", bg: "img/z/town.jpg" };
      c.town = true;
      c.curZone = { id: townInfo.id || "town", n: townInfo.n || "Biện Kinh", bg: townInfo.bg };
      c.enemies = [];
      c.corpses = [];
      c.pickTarget = null;
      c.moveTo = null;
      if (typeof K !== 'undefined') K.target = null;
      if (typeof Te === 'function') Te("town");
      if (typeof K0 === 'function' && typeof M0 !== 'undefined') {
        [b.x, b.y] = K0(M0.w / 2, M0.h / 2);
      }
      if (typeof nn === 'function') nn();
      if (townInfo.bg && typeof PA === 'function') c.bgImg = PA(townInfo.bg);
      if (typeof i0 === 'function') i0("use");
      if (typeof Vt === 'function' && townInfo.id) Vt(townInfo.id);
      const tnEl = document.getElementById("townName");
      if (tnEl) tnEl.textContent = townInfo.n || "Biện Kinh";
      const tbEl = document.getElementById("townBar");
      if (tbEl) tbEl.classList.remove("hidden");
      c.banner = {
        t: 2.5,
        text: townInfo.n || "Biện Kinh",
        sub: bannerSub,
      };
      if (typeof M === 'function') {
        M(`Đã trở về thành dưỡng sức tại <b>${D(townInfo.n || "Biện Kinh")}</b>.`);
      }
      if (window.heroPos) {
        window.heroPos.x = b.x;
        window.heroPos.y = b.y;
      }
      if (typeof window.__volamidleOnline?.updateUi === 'function') {
        window.__volamidleOnline.updateUi();
      }
    },
    C5 = function () {
      if (!c.town) {
        returnToTown(false);
      }
    },
    E1 = function () {
      if (c.town) {
        c.town = !1;
        {
          const A = V0(Math.min(r.stage, l0));
          (Te(A.id), ([b.x, b.y] = K0(b.x, b.y)), nn());
        }
        ((c.tpCd = wd),
          (r.wave = 1),
          (c.spawnT = 0.5),
          (c.zoneShown = null),
          u("#townBar").classList.add("hidden"),
          vn(V0(Math.min(r.stage, l0))));
        typeof Bh === "function" && Bh();
      }
    },
    uD = function (A) {
      ((c.life = Math.min(c.P.life, c.life + c.P.life * 0.25 * A)),
        (c.mana = Math.min(c.P.mana, c.mana + c.P.mana * 0.25 * A)),
        dd(A));
    },
    MA = function () {
      if (!r || !r.fac) return;
      (O1(),
        document.querySelectorAll("#pad .sk").forEach((e) => {
          const a = r.slots[+e.dataset.i],
            i = T[a];
          (e.classList.toggle("empty", !i),
            e.classList.toggle("nowp", !!i && !$3(i)),
            e.classList.toggle("cur", !!(i && c.P && c.P.main.id === a)),
            (e.querySelector("i").style.backgroundImage =
              i && i.ic ? `url('${i.ic}')` : ""));
          const o = i
              ? (r.sk[a] || 0) + (typeof yn == "function" ? yn(a) : 0)
              : 0,
            l = i && typeof yn == "function" ? yn(a) : 0;
          e.title = i
            ? `${i.n} · cấp ${o}${l ? ` (${r.sk[a]}+${l})` : ""}${$3(i) ? "" : " · cần " + Go[v1(i)]}`
            : "Ô trống";
          let d = e.querySelector(".sklv");
          (d ||
            ((d = document.createElement("u")),
            (d.className = "sklv"),
            e.appendChild(d)),
            (d.textContent = i ? o : ""),
            d.classList.toggle("up", !!l));
        }));
      const A = c.P && c.P.main,
        n = u("#bMain");
      if (n) {
        const e = r.eq && r.eq.weapon,
          a = A && c.P.basic === A,
          i = a ? "img/s/8.png" : A && T[A.id] && T[A.id].ic;
        ((n.querySelector("i").style.backgroundImage = i ? `url('${i}')` : ""),
          (n.title =
            "Chiêu chính: " +
            (a ? "Đánh thường" : A && T[A.id] ? T[A.id].n : "—")));
      }
      const t = u("#ctrlBtn");
      ((t.innerHTML = 'Auto: <i class="ck"></i>'),
        t.classList.toggle("on", !fA()),
        (t.title = fA() ? "Tự điều khiển (F)" : "Tự động đánh (F)"));
    },
    wD = function () {
      const A = c.potCd || {},
        n = (t, e, a) =>
          t &&
          t
            .querySelector(".cd")
            .style.setProperty("--p", `${C(e / a, 0, 1) * 100}%`);
      (n(u("#bHp"), A.life || 0, si),
        n(u("#bMp"), A.mana || 0, si),
        n(u("#bTp"), c.tpCd || 0, wd));
      for (const [t, e] of [
        ["#bHp", 0],
        ["#bMp", 1],
      ]) {
        const a = u(t);
        if (!a || typeof f2 != "function") continue;
        const i = f2(e),
          o = i.ic + "|" + i.n + "|" + i.name;
        a._k !== o &&
          ((a._k = o),
          (a.querySelector("i").style.backgroundImage = i.ic
            ? `url('${i.ic}')`
            : ""),
          (a.querySelector("em").textContent = i.n || ""),
          (a.title = `${i.name} (phím ${e + 1}) · chuột phải / ▾ để chọn thuốc`));
      }
    },
    pD = function () {
      const A = (e) => {
        const a = aA.getBoundingClientRect(),
          i = c5();
        return [(e.clientX - a.left) / i, (e.clientY - a.top) / i];
      };
      (aA.addEventListener("pointerdown", (e) => {
        if (K.active) return;
        const [o, l] = A(e);
        const worldX = o + p0.x, worldY = l + p0.y;

        // Ưu tiên cao nhất: Click vào Hiệp Khách đối phương (PvP Player Targeting)
        if (typeof window.__volamidleOnline?.findPlayerAt === "function") {
          const pvpTgt = window.__volamidleOnline.findPlayerAt(worldX, worldY, 68);
          if (pvpTgt) {
            window.__volamidleOnline.selectTargetPlayer(pvpTgt, true);
            Object.assign(K, {
              active: false,
              id: null,
              fromJoy: false,
              mouse: false,
              moved: false,
              target: null,
              tmp: false,
            });
            c.pickTarget = null;
            return;
          }
        }

        if (Ta() && e.pointerType !== "touch") {
          const d = X6(worldX, worldY);
          if (
            (Object.assign(K, {
              active: !0,
              id: e.pointerId,
              fromJoy: !1,
              mouse: !0,
              moved: !1,
              x: o,
              y: l,
            }),
            aA.setPointerCapture && aA.setPointerCapture(e.pointerId),
            d)
          ) {
            ((c.pickTarget = c.pickTarget === d ? null : d),
              c.pickTarget && y(`Đi nhặt: ${d.it.n}`),
              (K.mouse = !1));
            return;
          }

          if (fA()) {
            const f = gd(worldX, worldY);
            if (f) {
              ((c.manTgt = f),
                (K.mouse = !1),
                (K.target = null),
                y("Tấn công: " + f.n));
              return;
            }
          }
          fA() || (K.tmp = !0);
          const [h, g] = K0(worldX, worldY);
          ((K.target = { x: h, y: g }), (c.pickTarget = null));
          return;
        }
        const [a, i] = [o, l];
        (Object.assign(K, {
          active: !0,
          id: e.pointerId,
          fromJoy: !1,
          ox: a,
          oy: i,
          x: a,
          y: i,
          moved: !1,
        }),
          aA.setPointerCapture && aA.setPointerCapture(e.pointerId));
      }),
        aA.addEventListener("pointermove", (e) => {
          if (!K.active || e.pointerId !== K.id) return;
          const [a, i] = A(e);
          if (((K.x = a), (K.y = i), K.mouse)) {
            const [o, l] = K0(a + p0.x, i + p0.y);
            K.target = { x: o, y: l };
            return;
          }
          if (!K.fromJoy) {
            if (K.moved || Math.hypot(a - K.ox, i - K.oy) > ud) {
              ((K.moved = !0), fA() || (K.tmp = !0));
              const [o, l] = K0(a + p0.x, i + p0.y);
              K.target = { x: o, y: l };
            }
            return;
          }
          !K.moved &&
            Math.hypot(a - K.ox, i - K.oy) > ud &&
            ((K.moved = !0), (K.target = null), fA() || (K.tmp = !0));
        }));
      const n = (e) => {
        if (e.pointerId !== K.id) return;
        const [a, i] = A(e);
        const worldX = a + p0.x, worldY = i + p0.y;

        // Ưu tiên cao nhất khi nhấc chuột / kết thúc thao tác: Chọn người chơi PvP
        if (typeof window.__volamidleOnline?.findPlayerAt === "function") {
          const pvpTgt = window.__volamidleOnline.findPlayerAt(worldX, worldY, 68);
          if (pvpTgt) {
            window.__volamidleOnline.selectTargetPlayer(pvpTgt, true);
            Object.assign(K, {
              active: false,
              id: null,
              fromJoy: false,
              mouse: false,
              moved: false,
              target: null,
              tmp: false,
            });
            c.pickTarget = null;
            return;
          }
        }

        const o = !K.moved && !K.mouse;
        if (
          ((K.mouse = !1), (K.active = !1), (K.id = null), (K.moved = !1), !o)
        )
          return;

        if (fA()) {
          const d = gd(worldX, worldY);
          if (d) {
            ((c.manTgt = d), (K.target = null), y("Tấn công: " + d.n));
            return;
          }
        }
        const l = X6(worldX, worldY);
        if (l) {
          ((c.pickTarget = c.pickTarget === l ? null : l),
            c.pickTarget && y(`Đi nhặt: ${l.it.n}`));
          return;
        }
        {
          fA() || (K.tmp = !0);
          const [d, h] = K0(worldX, worldY);
          K.target = { x: d, y: h };
        }
      };
      (aA.addEventListener("pointerup", n),
        aA.addEventListener("pointercancel", (e) => {
          e.pointerId === K.id &&
            ((K.active = !1), (K.id = null), (K.moved = !1));
        }),
        window.addEventListener("keydown", (e) => {
          if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
          const a = e.key.length === 1 ? e.key.toLowerCase() : e.key;
          ((K.keys[a] = !0),
            [
              "w",
              "a",
              "s",
              "d",
              "ArrowUp",
              "ArrowDown",
              "ArrowLeft",
              "ArrowRight",
            ].includes(a) &&
              !S1() &&
              d2("manual"),
            !e.repeat &&
              (/^F[1-4]$/.test(a) && (e.preventDefault(), T5(+a[1] - 1)),
              (a === "1" || a === "q") && $a("life"),
              (a === "2" || a === "e") && $a("mana"),
              (a === "3" || a === "t") && (c.town ? E1() : C5()),
              a === "f" && d2(fA() ? "auto" : "manual"),
              a === "r" && M5(),
              a === "m" && Z4(),
              a === " " && (e.preventDefault(), Vm())));
        }),
        window.addEventListener("keyup", (e) => {
          K.keys[e.key.length === 1 ? e.key.toLowerCase() : e.key] = !1;
        }));
      const t = (e, a) =>
        e.addEventListener("pointerdown", (i) => {
          (i.preventDefault(), i.stopPropagation(), a());
        });
      document.querySelectorAll("#pad .sk").forEach((e) => {
        (e.addEventListener("pointerdown", (a) => {
          if ((a.preventDefault(), a.stopPropagation(), a.button === 2)) return;
          const i = +e.dataset.i;
          (O1(), a.target.closest(".pk") || !(r.slots[i] > 0) ? $5(i) : T5(i));
        }),
          e.addEventListener("contextmenu", (a) => {
            (a.preventDefault(), $5(+e.dataset.i));
          }));
      });
      for (const [e, a, i] of [
        ["#bHp", 0, "life"],
        ["#bMp", 1, "mana"],
      ]) {
        const o = u(e);
        (o.addEventListener("pointerdown", (l) => {
          (l.preventDefault(),
            l.stopPropagation(),
            l.button !== 2 && (l.target.closest(".pk") ? oi(a) : $a(i)));
        }),
          o.addEventListener("contextmenu", (l) => {
            (l.preventDefault(), oi(a));
          }));
      }
      (t(u("#bTp"), () => (c.town ? E1() : C5())),
        (u("#bMain").onclick = () => typeof iA == "function" && iA("skill")),
        (u("#ctrlBtn").onclick = () => d2(fA() ? "auto" : "manual")),
        (u("#inBtn").onclick = () => {
          ((r.inputMode = Ta() ? "joy" : "mouse"),
            (K.target = null),
            H5(),
            B(),
            y(
              Ta()
                ? "Điều khiển bằng chuột: bấm hoặc giữ chuột để đi"
                : "Điều khiển bằng joystick: kéo ở góc trái dưới",
            ));
        }),
        H5(),
        window.addEventListener("resize", H5),
        (u("#rotBtn").onclick = () => M5()),
        (u("#rideBtn").onclick = () => Z4()),
        Os(),
        ai(),
        (u("#bBack").onclick = E1));
      {
        const e = u("#ktcBtn");
        e && (e.onclick = () => AA());
      }
      ((u("#bShop").onclick = () => vd()),
        (u("#bKtcT").onclick = () => AA()),
        (u("#bStashT").onclick = () => Dt()),
        (u("#bSellTown").onclick = () => {
          const e = b5();
          (y(`Bán ${e.n} món`), F());
        }));
    },
    md = function (A) {},
    K = {
      active: !1,
      id: null,
      fromJoy: !1,
      ox: 0,
      oy: 0,
      x: 0,
      y: 0,
      moved: !1,
      keys: {},
      target: null,
    },
    I1 = 45,
    ud = 8,
    wd = 20,
    si = 1.5,
    S1 = () => r.ctrl === "manual" || !!K.tmp,
    fA = () => r.ctrl === "manual",
    DD = () => r.joy !== "float",
    ii = () =>
      !!(
        window.matchMedia &&
        window.matchMedia(
          "(orientation: landscape) and (min-width: 900px) and (hover: hover) and (pointer: fine)",
        ).matches
      ),
    PD = () => (ii() ? "mouse" : "joy"),
    Ta = () => PD() === "mouse",
    Ca = null,
    pd = 0,
    f1 = { v: [0, 0], prev: [] },
    ri = function (A) {
      if (A.g === 1) {
        const t = O5(A);
        return Math.round((A.price || (t ? t.price : 50)) * (1 + r.lvl / 25));
      }
      const n = ia(A.d, A.k, A.lvl);
      return A.price || (n ? n.price : 100);
    },
    O5 = function (A) {
      return S.potions.find(
        (n) =>
          n.kind === (A.d === 2 ? "both" : A.d === 1 ? "mana" : "life") &&
          n.tier === A.lvl,
      );
    },
    E5 = function (A) {
      const n = pA(A.d, A.k, A.lvl, 0);
      return n ? (r.uid--, (n.uid = -1), (n.s = I5(A, n)), n) : null;
    },
    h1 = function (A) {
      return (
        (r.potStock = r.potStock || { life: {}, mana: {} }),
        r.potStock[A] || (r.potStock[A] = {})
      );
    },
    Dd = function (A) {
      return Object.values(h1(A)).reduce((n, t) => n + t, 0);
    },
    Pd = function (A) {
      const n = h1(A),
        t = Object.keys(n)
          .map(Number)
          .filter((a) => n[a] > 0)
          .sort((a, i) => i - a);
      if (!t.length) return null;
      const e = S.potions.find((a) => a.kind === A && a.tier === t[0]);
      return e ? (n[t[0]]--, e) : null;
    },
    vD = function (A) {
      const n = ri(A) * (A.g === 1 ? Sn : 1);
      if (r.gold < n) {
        y("Không đủ ngân lượng");
        return;
      }
      if (A.g === 1) {
        const t = O5(A);
        if (!t) return;
        r.gold -= n;
        const e = h1(t.kind);
        ((e[t.tier] = (e[t.tier] || 0) + Sn), y(`Mua ${Sn} ${t.n}`), i0("use"));
      } else {
        if (r.inv.length >= INV_MAX) {
          y("Hành trang đầy");
          return;
        }
        const t = pA(A.d, A.k, A.lvl, 0);
        if (!t) return;
        ((t.s = I5(A, t)),
          (r.gold -= n),
          tn(t, !0, !0, !0),
          y(`Mua ${t.n}`),
          i0("dropOther"));
      }
      (B(), vd());
    },
    vd = function s() {
      const A = I[r.fac],
        n = bD.filter(
          ([e]) => e === "sell" || (S.shops[e] && S.shops[e].items.length),
        );
      n.find((e) => e[0] === dt) || (dt = n[0][0]);
      let t = "";
      if (dt === "sell") {
        const e = r.inv.filter((a) => !hA(a) && !Ha(a));
        t = `<p class="desc">Bán món trong hành trang. Món không khớp bộ lọc: ${e.length} (${j(e.reduce((a, i) => a + y0(i), 0))} lượng). Đồ bộ / Tím không bị bán hàng loạt.</p>
      <div class="btnrow"><button class="btn red" id="bSellBad">Bán đồ không khớp lọc</button></div>
      <div class="invgrid">${r.inv.map(T1).join("")}</div>`;
      } else {
        const e = S.shops[dt].items
          .filter((a) => {
            if (a.g === 1) return !0;
            const i = E5(a);
            return !i || F1(i);
          })
          .slice()
          .sort((a, i) => a.d - i.d || a.k - i.k || a.lvl - i.lvl);
        ((t = `<div class="shoplist">${e
          .map((a, i) => {
            if (a.g === 1) {
              const d = O5(a);
              return d
                ? `<button class="shoprow" data-i="${i}"><img src="${D(d.ic || "")}" alt=""><span><b>${D(d.n)}</b><small>Hồi ${X(d.total)} ${d.kind === "mana" ? "nội lực" : "sinh lực"}${d.kind === "both" ? ` + ${X(d.mtotal)} nội lực` : ""} trong ${d.dur}s · còn ${h1(d.kind)[d.tier] || 0}</small></span><em>${X(ri(a) * Sn)} / ${Sn}</em></button>`
                : "";
            }
            const o = E5(a);
            if (!o) return "";
            const l = dt === "weapon" && A && YA(o);
            return `<button class="shoprow${f0(o) ? "" : " bad"}${l ? " own" : ""}" data-i="${i}"><img src="${D(o.ic)}" alt=""><span><b>${D(o.n)}</b><small>Cấp ${o.lvl}${o.s >= 0 ? " · hệ " + d0[o.s] : ""}${l ? " · đúng loại vũ khí môn phái" : ""}</small></span><em>${X(ri(a))}</em></button>`;
          })
          .join("")}</div>`),
          (c.shopList = e));
      }
      J(
        `<h3>Cửa hàng ${D(H0.town.n)} <small>${j(r.gold)} lượng</small></h3>
    <div class="dtabs">${n.map(([e, a]) => `<button data-t="${e}" class="${e === dt ? "on" : ""}">${a}</button>`).join("")}</div>${t}`,
        () => {
          (document.querySelectorAll("#mBody .dtabs button").forEach(
            (a) =>
              (a.onclick = () => {
                ((dt = a.dataset.t), s());
              }),
          ),
            document
              .querySelectorAll("#mBody .shoprow")
              .forEach(
                (a) => (a.onclick = () => vD(c.shopList[+a.dataset.i])),
              ));
          const e = u("#bSellBad");
          (e &&
            (e.onclick = () => {
              (b5(), B(), s());
            }),
            document.querySelectorAll(".mbox .invgrid .it").forEach(
              (a) =>
                (a.onclick = () => {
                  const i = Ba(a.dataset.uid);
                  i && (Vc(i), (dt = "sell"), s());
                }),
            ));
        },
      );
    },
    bD = [
      ["weapon", "Vũ khí"],
      ["cloth", "Trang phục"],
      ["jewel", "Trang sức"],
      ["med", "Dược phẩm"],
      ["sell", "Bán đồ"],
    ],
    Sn = 10,
    dt = "weapon",
    bd = {
      1: 1e5,
      2: 1e5,
      3: 3e5,
      4: 3e5,
      5: 4e5,
      6: 4e5,
      7: 7e5,
      8: 7e5,
      9: 1e6,
      10: 2e6,
    };
  if (S.shops && S.shops.horse)
    for (const s of S.shops.horse.items)
      s.g !== 1 && bd[s.lvl] && (s.price = bd[s.lvl]);

  window.returnToTown = returnToTown;
  window.C5 = C5;
  window.E1 = E1;
