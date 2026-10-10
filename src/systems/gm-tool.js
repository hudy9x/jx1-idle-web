var x8 = 1 / 60,
    zh = 10,
    wk = 120,
    Q2 = 0,
    b3 = 0,
    Qh = "";
  (hk(),
    "serviceWorker" in navigator &&
      location.protocol.startsWith("http") &&
      navigator.serviceWorker.register("sw.js").catch(() => {}));
  var GMApply = function (A) {
      if (!r || !r.fac) {
        M("Cần có nhân vật trước khi dùng GM Tool.");
        return;
      }
      switch (A) {
        case "gold":
          (r.gold = (r.gold || 0) + 1e7), (r.last = Date.now()), B();
          M("<b>GM:</b> +10.000.000 lượng");
          break;
        case "knb":
          (r.knb = (r.knb || 0) + 500), (r.last = Date.now()), B();
          M("<b>GM:</b> +500 Kim Nguyên Bảo");
          break;
        case "xp":
          (r.xp = (r.xp || 0) + 500000000000), (r.last = Date.now()), B();
          M("<b>GM:</b> +500.000.000.000 XP");
          break;
        case "full":
          if (c && c.P) {
            (c.P.life = c.P.maxLife || c.P.life || 1),
              (c.P.mana = c.P.maxMana || c.P.mana || 1);
          }
          B();
          M("<b>GM:</b> hồi full HP / MP");
          break;
        default:
          return;
      }
    },
    GMOpenDialog = function () {
      const n = r && r.fac
        ? `Nhân vật: <b>${D(r.name || "Vô danh")}</b> · Cấp <b>${r.lvl || 1}</b> · Lượng <b>${j(r.gold || 0)}</b> · KNB <b>${X(r.knb || 0)}</b>`
        : "Chưa có nhân vật đang chạy";
      J(
        `<div class="gm-tool-wrap"><h3 style="margin:0 0 12px;color:#f3d27a">GM Tool</h3><div class="gm-tool-status">${n}</div><div class="gm-tool-grid"><button class="btn" data-gm="gold">+10M lượng</button><button class="btn" data-gm="knb">+500 KNB</button><button class="btn" data-gm="xp">+500.000.000.000 XP</button><button class="btn" data-gm="full">Full HP/MP</button><button class="btn" data-gm-close>Đóng</button></div></div>`,
        () => {
          const t = u("#modal");
          if (!t) return;
          t.querySelectorAll("[data-gm]").forEach((e) => {
            e.onclick = () => GMApply(e.dataset.gm);
          });
          const a = t.querySelector("[data-gm-close]");
          a && (a.onclick = () => t0());
        },
        !1,
      );
    },
    GMToolInit = function () {
      if (document.getElementById("gmToolBtn")) return;
      const A = document.createElement("button");
      (A.id = "gmToolBtn"),
        (A.type = "button"),
        (A.textContent = "GM"),
        (A.onclick = GMOpenDialog),
        (A.title = "GM Tool"),
        document.body.appendChild(A);
      const n = document.createElement("style");
      (n.id = "gmToolCss"),
        (n.textContent = `#gmToolBtn{position:fixed;left:18px;top:18px;z-index:99999;padding:8px 12px;border:1px solid #f7d77d;border-radius:999px;background:linear-gradient(#3d1d13,#120b09);color:#ffebaf;font-weight:700;cursor:pointer;box-shadow:0 10px 20px rgba(0,0,0,.35);font-size:13px;transition:transform .15s ease}#gmToolBtn:hover{transform:translateY(-1px)}.gm-tool-wrap{display:flex;flex-direction:column;gap:8px}.gm-tool-status{padding:8px 10px;border:1px solid #6a512d;border-radius:6px;background:#120d08;color:#f0dca9;font-size:13px;line-height:1.5}.gm-tool-grid{display:grid;grid-template-columns:repeat(2,minmax(120px,1fr));gap:8px;margin-top:6px}.gm-tool-grid .btn{width:100%}.gm-tool-grid [data-gm-close]{background:linear-gradient(#4a2d29,#1c120d);border-color:#a16552}@media (max-width:520px){#gmToolBtn{left:12px;top:12px;padding:7px 10px;font-size:12px}.gm-tool-grid{grid-template-columns:1fr}}`),
        document.head.appendChild(n);
      const t = () => {
        try {
          window.player = r;
        } catch {}
        try {
          window.user = typeof k < "u" && k.user ? k.user : null;
        } catch {}
        try {
          window.heroPos = b;
        } catch {}
        try {
          window.lookupZoneById = (idOrBg) => {
            if (idOrBg == null) return null;
            const targetStr = String(idOrBg).trim();
            const targetNum = Number(targetStr);
            const allZones = [];
            if (typeof JW !== "undefined") {
              if (Array.isArray(JW.zones)) allZones.push(...JW.zones);
              if (JW.zalt) {
                Object.values(JW.zalt).forEach((arr) => {
                  if (Array.isArray(arr)) allZones.push(...arr);
                });
              }
            }
            if (typeof H0 !== "undefined") {
              if (Array.isArray(H0.zones)) allZones.push(...H0.zones);
              if (H0.zalt) {
                Object.values(H0.zalt).forEach((arr) => {
                  if (Array.isArray(arr)) allZones.push(...arr);
                });
              }
            }
            if (typeof B0 !== "undefined" && Array.isArray(B0)) {
              allZones.push(...B0);
            }
            return allZones.find(
              (z) =>
                z &&
                (String(z.id) === targetStr ||
                  (Number.isFinite(targetNum) && z.id === targetNum) ||
                  (z.bg && (z.bg === targetStr || z.bg.includes(`/${targetStr}.jpg`))))
            );
          };

          window.getHeroCurrentMap = () => {
            try {
              if (typeof c !== "undefined" && c) {
                const isActuallyTown = c.town && (!c.curZone || c.curZone.id === "town" || c.curZone.id === 37 || (typeof H0 !== "undefined" && H0.town && c.curZone.id === H0.town.id));
                if (isActuallyTown) {
                  const townId = (typeof H0 !== "undefined" && H0.town && H0.town.id) ? `town_${H0.town.id}` : "town";
                  const townName = (typeof H0 !== "undefined" && H0.town && H0.town.n) ? H0.town.n : "Thành thị";
                  return { mapId: String(townId), mapName: townName };
                }
                if (c.tower) {
                  const floor = c.tower.floor || 1;
                  const towerName = (typeof on !== "undefined" && on && on.n) ? on.n : "Thiên Tầng Tháp";
                  return { mapId: `tower_${floor}`, mapName: `${towerName} · tầng ${floor}` };
                }
                if (c.dg) {
                  if (c.dg.kind === "boat") {
                    return { mapId: "boat", mapName: "Phong Lăng Độ" };
                  }
                  const dgName = (c.dg.d && c.dg.d.n) || "Phó bản";
                  const dgId = (c.dg.d && c.dg.d.id) ? `dg_${c.dg.d.id}` : (c.dg.kind ? `dg_${c.dg.kind}` : "dg");
                  return { mapId: String(dgId), mapName: dgName };
                }

                // 1. Kiểm tra c.curZone được gán trực tiếp khi gọi vn(A)
                if (c.curZone && (c.curZone.id != null || c.curZone.n)) {
                  const zid = c.curZone.id != null ? String(c.curZone.id) : (c.curZone.n || "field");
                  let zname = c.curZone.n;
                  if (!zname && window.lookupZoneById) {
                    const found = window.lookupZoneById(zid);
                    if (found && found.n) zname = found.n;
                  }
                  return {
                    mapId: zid,
                    mapName: zname || `Bản đồ ${zid}`,
                  };
                }

                // 2. Tra cứu từ ảnh nền c.bgImg (nền canvas đang vẽ)
                if (c.bgImg && c.bgImg.src) {
                  const match = String(c.bgImg.src).match(/\/(\d+)\.jpg/);
                  if (match) {
                    const bgId = match[1];
                    const found = window.lookupZoneById ? window.lookupZoneById(bgId) : null;
                    if (found) {
                      return {
                        mapId: String(found.id != null ? found.id : bgId),
                        mapName: found.n || `Bản đồ ${bgId}`,
                      };
                    }
                    return { mapId: String(bgId), mapName: `Bản đồ ${bgId}` };
                  }
                }

                // 3. Tra cứu từ c.zoneShown
                if (c.zoneShown != null) {
                  const found = window.lookupZoneById ? window.lookupZoneById(c.zoneShown) : null;
                  if (found) {
                    return {
                      mapId: String(found.id),
                      mapName: found.n || String(found.id),
                    };
                  }
                }
              }

              // 4. Tra cứu từ V0(r.stage)
              if (typeof V0 === "function" && typeof r !== "undefined" && r && typeof l0 !== "undefined") {
                const z = V0(Math.min(r.stage || 1, l0));
                if (z) {
                  return {
                    mapId: String(z.id != null ? z.id : (z.n || "field")),
                    mapName: z.n || String(z.id || "Dã Ngoại"),
                  };
                }
              }
            } catch (err) {}

            const el = document.getElementById("u20zn");
            if (el && el.textContent && el.textContent.trim()) {
              const t = el.textContent.trim();
              return { mapId: t, mapName: t };
            }

            return { mapId: "default", mapName: "Tân Thủ Thôn" };
          };
        } catch {}
        try {
          window.getHeroLookData = () => {
            let look = null;
            if (typeof u5 == "function") {
              const jx = u5();
              if (jx) {
                look = {
                  sx: jx.sx,
                  r: Object.assign({}, jx.rows, {
                    horse: r && r.eq && r.eq.horse && typeof m5 == "function" ? m5(r.eq.horse) : -1,
                  }),
                  ride: r && r.eq && r.eq.horse && typeof c < "u" && c.mounted ? 1 : 0,
                };
              }
            }
            let auras = [];
            if (typeof D0 == "function") {
              const rb = Math.min(5, D0());
              if (rb > 0) auras.push({ kind: "rb", lvl: rb });
            }
            if (typeof xp == "function") {
              const skAuras = xp();
              if (Array.isArray(skAuras)) {
                skAuras.slice(0, 3).forEach((a) => {
                  if (a && a.f) {
                    auras.push({
                      f: a.f,
                      n: a.n,
                      w: a.w,
                      h: a.h,
                      ax: a.ax,
                      ay: a.ay,
                      ms: a.ms,
                      pos: a.pos,
                    });
                  }
                });
              }
            }
            return { look, auras };
          };
        } catch {}
        try {
          window.renderMultiplayerPlayer = (ctx, oth, dt) => {
            if (!ctx || !oth) return;
            const x = Number.isFinite(oth.x) ? oth.x : 160;
            const y = Number.isFinite(oth.y) ? oth.y : 180;
            const dir = (oth.dir != null ? oth.dir : 0) % 8;
            const isMoving = !!oth.moving;
            const act = oth.act === "at" ? "at" : (isMoving ? "run" : "st");
            const nowSec = performance.now() / 1000;
            const clockSec = typeof c < "u" && c.clock ? c.clock : nowSec;

            // 1. Shadow
            ctx.fillStyle = "#0007";
            ctx.beginPath();
            ctx.ellipse(x, y, 16, 6, 0, 0, 7);
            ctx.fill();

            // 2. Auras / Vòng sáng chân
            // 2.1. Vòng Hào Quang Môn Phái Ngũ Hành (Luôn tỏa sáng lung linh dưới chân)
            const facKey = String(oth.fac || "wudang").toLowerCase();
            const factionSeriesMap = {
              shaolin: "#ffd32a",
              tianwang: "#ffd32a",
              tangmen: "#2ed573",
              wudu: "#2ed573",
              emei: "#1e90ff",
              cuiyan: "#1e90ff",
              gaibang: "#ff4757",
              tianren: "#ff4757",
              wudang: "#ffa502",
              kunlun: "#ffa502",
            };
            const auraColor = factionSeriesMap[facKey] || (typeof I < "u" && I[oth.fac] && typeof m0 < "u" && m0[I[oth.fac].series]) || "#2ed573";
            const auraWave = 0.5 + 0.5 * Math.sin(clockSec * 3.5);

            ctx.save();
            ctx.globalAlpha = 0.52 + 0.28 * auraWave;
            ctx.strokeStyle = auraColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(x, y, 22 + auraWave * 4, 8 + auraWave * 1.5, 0, 0, Math.PI * 2);
            ctx.stroke();

            // Gợn sóng hào quang thứ hai lan tỏa
            ctx.globalAlpha = 0.25 * (1 - auraWave);
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.ellipse(x, y, 26 + auraWave * 6, 9.5 + auraWave * 2, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            // 2.2. Auras Chuyển Sinh & Vòng sáng kỹ năng đặc biệt
            if (Array.isArray(oth.auras) && typeof Xs == "function") {
              for (const a of oth.auras) {
                if (a.kind === "rb" && typeof Ec < "u" && Ec[a.lvl]) {
                  Xs(ctx, Ec[a.lvl], x, y, 0, clockSec, Cn, 0.95);
                } else if (a.f) {
                  Xs(ctx, a, x, y, 0, clockSec, Cn, a.pos === "foot" ? 0.85 : 0.9);
                }
              }
            }

            // 3. Render JXLOOK (VŨ KHÍ, ÁO GIÁP, MŨ, NGỰA, GIỚI TÍNH)
            let drawn = false;
            let heroHeight = 60;
            const heroInfo = typeof yt == "function" ? yt(oth.fac, oth.sex) : null;
            const animKey = heroInfo && heroInfo.anim;

            const animTime = act === "at" ? (oth.actT || 0) : clockSec;
            if (oth.look && typeof my == "function" && typeof lt == "function") {
              const J = my(oth.look);
              if (J) {
                drawn = lt(act, dir, animTime, x, y, Cn, 1, animKey, J);
                if (!drawn && act !== "st") {
                  drawn = lt(isMoving ? "run" : "st", dir, clockSec, x, y, Cn, 1, animKey, J);
                }
              }
            }

            // 4. Fallback faction base animated sprite
            if (!drawn && animKey && typeof o2 == "function") {
              drawn = o2(animKey, act, dir, animTime, x, y, Cn) || o2(animKey, "st", dir, clockSec, x, y, Cn);
            }

            // 5. Fallback static portrait
            if (!drawn && heroInfo && heroInfo.img && typeof o5 == "function" && typeof PA == "function") {
              const imgEl = PA(heroInfo.img);
              drawn = o5(imgEl, heroInfo.sz, x, y, Cn, dir > 4);
            }

            if (drawn && typeof drawn === "number") {
              heroHeight = Math.min(drawn, 90);
            }

            // 6. Nameplate & HP Bar
            const pY = y - heroHeight * 0.9 - 6;
            const isSelected = window.__volamidleOnline && window.__volamidleOnline.state && window.__volamidleOnline.state.selectedTargetId === oth.userId;
            const nameColor = isSelected ? "#ff6b81" : oth.fac ? (typeof m0 < "u" && typeof I < "u" && I[oth.fac] && m0[I[oth.fac].series]) || "#7fe36a" : "#7fe36a";

            // 6.1. HIỆU ỨNG VÒNG TRÒN TARGET VÕ LÂM DƯỚI CHÂN & MŨI TÊN MỤC TIÊU TRÊN ĐẦU
            if (isSelected) {
              ctx.save();
              const nowSec = performance.now() / 1000;
              const pulse = 0.5 + 0.5 * Math.sin(nowSec * 5.5);

              // 1. Vòng tròn hào quang đỏ rực nhấp nháy phát sáng
              const rx = 24 + pulse * 4;
              const ry = 9 + pulse * 1.5;
              ctx.strokeStyle = "#ff3838";
              ctx.lineWidth = 2.5;
              ctx.shadowColor = "#ff3838";
              ctx.shadowBlur = 14;
              ctx.beginPath();
              ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
              ctx.stroke();

              // 2. Trận pháp Bát Quái xoay tròn theo thời gian
              ctx.save();
              ctx.translate(x, y);
              ctx.scale(1, 0.4);
              ctx.rotate(nowSec * 2.2);
              ctx.strokeStyle = "rgba(255, 71, 87, 0.85)";
              ctx.lineWidth = 2;
              ctx.setLineDash([8, 6]);
              ctx.beginPath();
              ctx.arc(0, 0, 28, 0, Math.PI * 2);
              ctx.stroke();
              ctx.restore();

              // 3. 4 Góc hồng tâm nhắm mục tiêu [ ] co giãn
              const bDist = 26 - pulse * 3;
              const bLen = 8;
              ctx.strokeStyle = "#ffeaa7";
              ctx.lineWidth = 2.2;
              ctx.shadowColor = "#ffd32a";
              ctx.shadowBlur = 9;

              // Trên-trái
              ctx.beginPath();
              ctx.moveTo(x - bDist, y - 8 + bLen);
              ctx.lineTo(x - bDist, y - 8);
              ctx.lineTo(x - bDist + bLen, y - 8);
              ctx.stroke();
              // Trên-phải
              ctx.beginPath();
              ctx.moveTo(x + bDist - bLen, y - 8);
              ctx.lineTo(x + bDist, y - 8);
              ctx.lineTo(x + bDist, y - 8 + bLen);
              ctx.stroke();
              // Dưới-trái
              ctx.beginPath();
              ctx.moveTo(x - bDist, y + 8 - bLen);
              ctx.lineTo(x - bDist, y + 8);
              ctx.lineTo(x - bDist + bLen, y + 8);
              ctx.stroke();
              // Dưới-phải
              ctx.beginPath();
              ctx.moveTo(x + bDist - bLen, y + 8);
              ctx.lineTo(x + bDist, y + 8);
              ctx.lineTo(x + bDist, y + 8 - bLen);
              ctx.stroke();

              // 4. Mũi tên đỏ chỉ từ trên đầu đối thủ xuống
              const arrowY = pY - 26 + Math.sin(nowSec * 6) * 4;
              ctx.fillStyle = "#ff4757";
              ctx.strokeStyle = "#ffffff";
              ctx.lineWidth = 1.5;
              ctx.shadowColor = "#ff4757";
              ctx.shadowBlur = 10;
              ctx.beginPath();
              ctx.moveTo(x, arrowY + 9);
              ctx.lineTo(x - 7, arrowY - 3);
              ctx.lineTo(x - 2.5, arrowY - 3);
              ctx.lineTo(x - 2.5, arrowY - 11);
              ctx.lineTo(x + 2.5, arrowY - 11);
              ctx.lineTo(x + 2.5, arrowY - 3);
              ctx.lineTo(x + 7, arrowY - 3);
              ctx.closePath();
              ctx.fill();
              ctx.stroke();
              ctx.restore();
            }

            if (typeof zs == "function") {
              zs(
                x,
                pY,
                `${oth.name || "Hiệp Khách"} · Lv${oth.level || 1}`,
                nameColor,
                11,
                (oth.hp || 100) / Math.max(1, oth.maxHp || 100),
                "#5fd35a",
                isSelected ? "«Mục tiêu PK»" : "",
                isSelected ? "#ff4757" : ""
              );
            }

            return true;
          };
        } catch {}
        try {
          window.triggerGameSkillFx = (attackerPos, targetPos, skillId) => {
            if (typeof Rs != "function") return false;
            const skId = skillId || (c && c.P && c.P.main && c.P.main.id) || 10;
            const ax = Number.isFinite(attackerPos.x) ? attackerPos.x : 160;
            const ay = Number.isFinite(attackerPos.y) ? attackerPos.y : 180;
            const tx = Number.isFinite(targetPos.x) ? targetPos.x : 200;
            const ty = Number.isFinite(targetPos.y) ? targetPos.y : 180;
            const src = { x: ax, y: ay, ox: ax, oy: ay };
            const tgt = { x: tx, y: ty };

            let skillDef = null;
            if (typeof a0 < "u" && a0.f && a0.f[skId]) {
              skillDef = { id: skId, ox: ax, oy: ay };
            } else if (c && c.P && c.P.main) {
              skillDef = Object.assign({}, c.P.main, { ox: ax, oy: ay });
            } else {
              skillDef = { id: skId, ox: ax, oy: ay };
            }

            try {
              Rs(src, tgt, skillDef);
              if (typeof Rc == "function" && skId) {
                try { Rc(skId); } catch {}
              }
              return true;
            } catch (err) {
              return false;
            }
          };
          window.getCurrentHeroSkillId = () => {
            if (c && c.P && c.P.main) {
              return c.P.main.id || 10;
            }
            return 10;
          };
        } catch {}
      };
      t(), setInterval(t, 1e3);
    };
  GMToolInit();
  var Mo = 544;
  setInterval(gk, 300 * 1e3);
