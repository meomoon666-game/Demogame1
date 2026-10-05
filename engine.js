// ========================================================
// FILE: engine.js
// GAME ENGINE: LOGIC CHƠI, TRẠNG THÁI PLAYER, UI, MODAL, VÒNG ĐỜI
// ========================================================

import {
  estatesDB,
  mountsDB,
  jobsDB,
  weaponsDB,
  originsPool,
  perksPool,
  eventsPool
} from './database.js';

// ==========================================
// AUDIO / VFX SYNTHESIZER
// ==========================================
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx && typeof window !== "undefined") {
    const AudioClass = window.AudioContext || window.webkitAudioContext;
    if (AudioClass) audioCtx = new AudioClass();
  }
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playSynthSound(freqStart, freqEnd, type = "sine", duration = 0.25, volume = 0.2) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freqStart, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(Math.max(10, freqEnd), ctx.currentTime + duration);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

export function playEffect(type) {
  const container = document.getElementById("gameContainer") || document.body;
  const overlay = document.getElementById("vfxOverlay");

  switch (type) {
    case "shake":
      container.classList.remove("animate-shake");
      void container.offsetWidth;
      container.classList.add("animate-shake");
      setTimeout(() => container.classList.remove("animate-shake"), 450);
      playSynthSound(90, 30, "sawtooth", 0.4, 0.3);
      break;

    case "blood":
      if (overlay) {
        overlay.style.backgroundColor = "rgba(220, 20, 60, 0.65)";
        overlay.style.opacity = "1";
        setTimeout(() => { overlay.style.opacity = "0"; }, 250);
      }
      playSynthSound(120, 40, "square", 0.35, 0.4);
      break;

    case "lightning":
      if (overlay) {
        overlay.style.backgroundColor = "rgba(235, 248, 255, 0.9)";
        overlay.style.opacity = "1";
        setTimeout(() => { overlay.style.opacity = "0"; }, 200);
      }
      playSynthSound(850, 100, "sawtooth", 0.5, 0.45);
      break;

    case "gold":
      if (overlay) {
        overlay.style.backgroundColor = "rgba(251, 191, 36, 0.4)";
        overlay.style.opacity = "1";
        setTimeout(() => { overlay.style.opacity = "0"; }, 250);
      }
      playSynthSound(523.25, 1046.5, "triangle", 0.3, 0.3);
      break;

    case "heal":
      if (overlay) {
        overlay.style.backgroundColor = "rgba(16, 185, 129, 0.4)";
        overlay.style.opacity = "1";
        setTimeout(() => { overlay.style.opacity = "0"; }, 250);
      }
      playSynthSound(440, 880, "sine", 0.3, 0.25);
      break;
  }
}

// ==========================================
// LOG SYSTEM (CUỘN BITLIFE)
// ==========================================
export function addLog(htmlContent, customClass = "") {
  const container = document.getElementById("logContainer");
  if (!container) return;
  const item = document.createElement("div");
  item.className = `p-3 rounded-xl border text-xs leading-relaxed transition-all shadow-sm ${customClass || 'bg-[#16213e]/70 border-slate-700/60 text-slate-200'}`;
  
  const timeSpan = `<div class="text-[10px] text-slate-400 font-mono mb-1 flex items-center gap-1"><span>⏳</span> Năm ${player.age} tuổi • [${player.realm}]:</div>`;
  item.innerHTML = timeSpan + htmlContent;

  container.appendChild(item);
  requestAnimationFrame(() => {
    if (typeof container.scrollTo === "function") {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    } else {
      container.scrollTop = container.scrollHeight;
    }
  });
}

// ==========================================
// TRẠNG THÁI NHÂN VẬT & GIA TỘC (PLAYER OBJECT)
// ==========================================
let storedKarma = localStorage.getItem("tu_tien_karma");
export let accumulatedKarma = 10;
if (storedKarma !== null) {
  let parsed = parseInt(storedKarma, 10);
  if (!isNaN(parsed)) {
    accumulatedKarma = Math.min(parsed, 50);
    localStorage.setItem("tu_tien_karma", accumulatedKarma);
  }
} else {
  localStorage.setItem("tu_tien_karma", accumulatedKarma);
}

export function resetKarmaToDefault() {
  accumulatedKarma = 10;
  localStorage.setItem("tu_tien_karma", 10);
  const el = document.getElementById("uiKarmaPoints");
  if (el) el.textContent = accumulatedKarma;
  playEffect("gold");
  renderOriginSelection();
}
window.resetKarmaToDefault = resetKarmaToDefault;

export const defaultStartingOrigin = originsPool.find(o => o.id === "origin_phe_vat") || originsPool[14] || originsPool[0];
export let selectedOrigin = defaultStartingOrigin; // Default: Thiếu Gia Phế Vật Gia Tộc (Rank C)
export let activePerks = new Set();
export let generationCount = 1;

export let player = {
  name: "Lâm Huyền Cơ",
  gen: 1,
  age: 0,
  maxAge: 80,
  health: 100,
  root: 25,
  intell: 50,
  luck: 65,
  money: 60,
  realmIndex: 0, // 0: Phàm Nhân, 1: Luyện Khí, 2: Trúc Cơ, 3: Kim Đan, 4: Nguyên Anh, 5: Hóa Thần
  realm: "Phàm Nhân",
  exp: 0,
  maxExp: 100,
  faction: null, // "Chính Đạo Tông Môn", "Ma Đạo Tà Giáo", "Tán Tu Bươn Chải"
  estate: estatesDB[0],
  mount: mountsDB[0],
  job: null,
  tags: ["xuat_than_phe_vat"],
  spouse: null, // Đạo lữ { name, affection, realm }
  children: [], // [{ name, age, root, intell }]
  grudges: [],  // Sổ thù vặt [{ id, name, reason, powerLevel }]
  weapons: [],  // Kho thần binh đã thu thập
  hiddenFlags: {}, // Cờ ẩn hiệu ứng cánh bướm
  bossKills: [], // Danh hiệu đại ma vương / boss đã tiêu diệt
  isHumanoid: true, // Đã có dạng người hoàn chỉnh
  seenEvents: new Set(), // Hệ thống chống lặp sự kiện
  toxicity: 0 // Điểm Tạp Chất ô nhiễm ma lực (0 - 100)
};

// ==========================================
// CƠ CHẾ SINH DANH XƯNG CẢNH GIỚI HỖN MANG
// ==========================================
export function generateRealmName(baseRealm) {
  const prefixes = [
    "Hắc Ám", "Tử Linh", "Huyết Ma", "Luyện Ngục", "Bán Cơ Khí", 
    "Yêu Tinh", "Hư Không", "Ma Đạo", "Cuồng Bạo", "Thánh Quang Tà Dị"
  ];
  const mutationSuffixes = [
    "Thối Rữa", "Xúc Tu", "Cuồng Nộ", "Đa Nhãn", "Gai Nhọn", "Ma Hóa", "Biến Dị"
  ];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  let realmName = `${prefix} ${baseRealm}`;
  if ((player.toxicity || 0) > 50) {
    const suffix = mutationSuffixes[Math.floor(Math.random() * mutationSuffixes.length)];
    realmName += ` ${suffix}`;
  }
  return realmName;
}

// ==========================================
// NÚT TẨY TỦY (CLEANSE TOXICITY)
// ==========================================
export function cleanseToxicity() {
  if (!player.toxicity || player.toxicity <= 0) {
    addLog("✨ Kinh mạch thanh tịnh thuần khiết, không có tạp chất ma lực cần tẩy tủy!", "text-cyan-300");
    return;
  }

  if (player.money >= 30) {
    player.money -= 30;
    const reduced = Math.min(player.toxicity, 35);
    player.toxicity = Math.max(0, player.toxicity - 35);
    playEffect("heal");
    addLog(`🧪 <strong>TẨY TỦY ĐAN DƯỢC:</strong> Chi 30 Linh Thạch luyện dịch đan điền, tống xuất độc khí ma lực (-${reduced} Tạp Chất)! Hiện còn ${player.toxicity}/100 Tạp chất.`, "bg-purple-950/70 border-purple-500 text-purple-200 font-bold");
  } else if (player.health > 20) {
    player.health -= 15;
    const reduced = Math.min(player.toxicity, 25);
    player.toxicity = Math.max(0, player.toxicity - 25);
    playEffect("blood");
    addLog(`🩸 <strong>BỨC HUYẾT TẨY TỦY:</strong> Không đủ Linh Thạch, bạn cắn răng rạch tay phóng huyết ép độc ma lực (-15% Máu, -${reduced} Tạp Chất)! Hiện còn ${player.toxicity}/100 Tạp chất.`, "bg-rose-950/70 border-rose-500 text-rose-200 font-bold");
  } else {
    playEffect("shake");
    alert("Cần ít nhất 30 Linh Thạch hoặc hơn 20% Máu để tiến hành Tẩy Tủy!");
    return;
  }

  updateUI();
}

export const realmsList = [
  { name: "Phàm Nhân", maxExp: 100, ageBonus: 0, rootBonus: 0 },
  { name: "Luyện Khí", maxExp: 250, ageBonus: 30, rootBonus: 15 },
  { name: "Trúc Cơ", maxExp: 600, ageBonus: 80, rootBonus: 25 },
  { name: "Kim Đan", maxExp: 1500, ageBonus: 150, rootBonus: 40 },
  { name: "Nguyên Anh", maxExp: 4000, ageBonus: 300, rootBonus: 60 },
  { name: "Hóa Thần", maxExp: 10000, ageBonus: 800, rootBonus: 100 }
];

// Đồng bộ đối tượng vào window cho các hàm action và inline handlers
window.player = player;
window.playEffect = playEffect;
window.addLog = addLog;
window.weaponsDB = weaponsDB;

// ==========================================
// KHỞI ĐỘNG VÀ CHỌN THÂN XÁC / BÀN TAY VÀNG
// ==========================================
export function updateSelectedVesselBanner() {
  if (!selectedOrigin) return;
  const iconEl = document.getElementById("bannerIcon");
  const titleEl = document.getElementById("bannerTitle");
  const badgeEl = document.getElementById("bannerTierBadge");
  const loreEl = document.getElementById("bannerLore");
  const statsEl = document.getElementById("bannerStats");
  if (iconEl) iconEl.textContent = selectedOrigin.icon;
  if (titleEl) titleEl.textContent = selectedOrigin.title;
  if (badgeEl) {
    badgeEl.textContent = "Rank " + selectedOrigin.tier;
    if (selectedOrigin.tier === "SSR") {
      badgeEl.className = "px-1.5 py-0.5 text-[8px] font-black rounded bg-gradient-to-r from-amber-500 to-rose-600 text-yellow-100 shadow animate-pulse";
    } else if (selectedOrigin.tier === "S" || selectedOrigin.tier === "A") {
      badgeEl.className = "px-1.5 py-0.5 text-[8px] font-black rounded bg-purple-700 text-purple-100";
    } else if (selectedOrigin.tier === "B" || selectedOrigin.tier === "C") {
      badgeEl.className = "px-1.5 py-0.5 text-[8px] font-black rounded bg-slate-700 text-slate-200";
    } else {
      badgeEl.className = "px-1.5 py-0.5 text-[8px] font-black rounded bg-stone-800 text-stone-300 border border-stone-600";
    }
  }
  if (loreEl) loreEl.textContent = selectedOrigin.lore;
  if (statsEl && selectedOrigin.baseStats) {
    statsEl.innerHTML = `
      <div class="bg-rose-950/40 border border-rose-800/40 rounded px-1 py-0.5"><span class="text-rose-300">❤️ ${selectedOrigin.baseStats.health}%</span></div>
      <div class="bg-emerald-950/40 border border-emerald-800/40 rounded px-1 py-0.5"><span class="text-emerald-300">🥋 ${selectedOrigin.baseStats.root}</span></div>
      <div class="bg-cyan-950/40 border border-cyan-800/40 rounded px-1 py-0.5"><span class="text-cyan-300">🧠 ${selectedOrigin.baseStats.intell}</span></div>
      <div class="bg-amber-950/40 border border-amber-800/40 rounded px-1 py-0.5"><span class="text-amber-300">🍀 ${selectedOrigin.baseStats.luck}</span></div>
      <div class="bg-yellow-950/40 border border-yellow-800/40 rounded px-1 py-0.5"><span class="text-yellow-300">🪙 ${selectedOrigin.baseStats.money}</span></div>
    `;
  }
}

export function rollReincarnationGacha(type) {
  let pool = [];
  if (type === 'free') {
    // Miễn phí: Ra toàn các thân xác phế bựa hài hước (Rank D 75%, Rank C/B 25%)
    const roll = Math.random();
    if (roll < 0.75) {
      pool = originsPool.filter(o => o.tier === 'D');
    } else {
      pool = originsPool.filter(o => o.tier === 'C' || o.tier === 'B');
    }
    if (pool.length === 0) pool = originsPool;
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    selectedOrigin = chosen;
    playEffect("shake");
    addLog(`🎲 <strong>GACHA TAY TRẮNG:</strong> Số phận an bài! Bạn quay trúng thân xác <strong class="text-stone-300">[${chosen.title}]</strong> (Rank ${chosen.tier})!`, "bg-stone-900 border-stone-600 text-stone-300");
  } else if (type === 'karma') {
    // Dùng 20 Karma: Vòng Quay Thiên Mệnh Chi Tử (SSR 10%, S 20%, A 35%, B 35%)
    if (accumulatedKarma < 20) {
      playEffect("shake");
      alert("Không đủ điểm Karma! Cần ít nhất 20 ☯ để kích hoạt Vòng Quay Thiên Mệnh Chi Tử!");
      return;
    }
    accumulatedKarma -= 20;
    localStorage.setItem("tu_tien_karma", accumulatedKarma);
    document.getElementById("uiKarmaPoints").textContent = accumulatedKarma;

    const roll = Math.random();
    if (roll < 0.10) {
      pool = originsPool.filter(o => o.tier === 'SSR');
    } else if (roll < 0.30) {
      pool = originsPool.filter(o => o.tier === 'S');
    } else if (roll < 0.65) {
      pool = originsPool.filter(o => o.tier === 'A');
    } else {
      pool = originsPool.filter(o => o.tier === 'B');
    }
    if (pool.length === 0) pool = originsPool.filter(o => o.tier === 'A');
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    selectedOrigin = chosen;

    if (chosen.tier === 'SSR') {
      playEffect("gold");
      playEffect("lightning");
      addLog(`⚡ <strong>NỔ HŨ THIÊN MỆNH CHI TỬ (SSR)!</strong> Bạn quay trúng Siêu Phẩm Thần Thoại <strong class="text-yellow-300">[${chosen.title}]</strong>!`, "bg-gradient-to-r from-amber-950 to-rose-950 border-amber-400 text-yellow-200 font-black");
    } else {
      playEffect("gold");
      addLog(`✨ <strong>GACHA THIÊN MỆNH:</strong> Vòng quay dừng lại ở thân xác Ưu Tú <strong class="text-cyan-300">[${chosen.title}]</strong> (Rank ${chosen.tier})!`, "bg-[#0f3460] border-cyan-400 text-cyan-200 font-bold");
    }
  }

  renderOriginSelection();
}

export function switchStartTab(tab) {
  const vTabBtn = document.getElementById("tabVesselBtn");
  const pTabBtn = document.getElementById("tabPerkBtn");
  const vSec = document.getElementById("vesselSection");
  const pSec = document.getElementById("perkSection");

  if (!vTabBtn || !pTabBtn || !vSec || !pSec) {
    renderPerksSelection();
    return;
  }

  if (tab === 'vessels') {
    vTabBtn.className = "flex-1 py-1.5 font-bold text-amber-300 border-b-2 border-amber-500";
    pTabBtn.className = "flex-1 py-1.5 font-bold text-slate-400 hover:text-amber-300";
    vSec.classList.remove("hidden");
    pSec.classList.add("hidden");
  } else {
    pTabBtn.className = "flex-1 py-1.5 font-bold text-amber-300 border-b-2 border-amber-500";
    vTabBtn.className = "flex-1 py-1.5 font-bold text-slate-400 hover:text-amber-300";
    pSec.classList.remove("hidden");
    vSec.classList.add("hidden");
    renderPerksSelection();
  }
}

export function renderOriginSelection() {
  const karmaEl = document.getElementById("uiKarmaPoints");
  if (karmaEl) karmaEl.textContent = accumulatedKarma;
  updateSelectedVesselBanner();
  renderPerksSelection();
}

export function renderPerksSelection() {
  const container = document.getElementById("perksCardsContainer");
  if (!container) return;
  container.innerHTML = "";

  perksPool.forEach(perk => {
    const isBought = activePerks.has(perk.id);
    const card = document.createElement("div");
    card.className = `p-2 rounded-xl border transition cursor-pointer text-xs flex justify-between items-center ${
      isBought ? 'bg-emerald-950/60 border-emerald-400 ring-1 ring-emerald-400' : 'bg-[#16213e]/80 border-slate-700/80 hover:border-slate-500'
    }`;

    card.onclick = () => {
      if (isBought) {
        activePerks.delete(perk.id);
        accumulatedKarma += perk.cost;
      } else {
        if (accumulatedKarma >= perk.cost) {
          activePerks.add(perk.id);
          accumulatedKarma -= perk.cost;
          playEffect("gold");
        } else {
          playEffect("shake");
          alert("Không đủ điểm Karma để mua Bàn Tay Vàng này!");
          return;
        }
      }
      localStorage.setItem("tu_tien_karma", accumulatedKarma);
      document.getElementById("uiKarmaPoints").textContent = accumulatedKarma;
      renderPerksSelection();
      renderOriginSelection();
    };

    card.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-lg">${perk.icon}</span>
        <div>
          <strong class="text-slate-100 text-xs">${perk.name}</strong>
          <div class="text-[10px] text-slate-400">${perk.desc}</div>
        </div>
      </div>
      <div class="text-right shrink-0 ml-2">
        <span class="px-2 py-0.5 rounded text-[10px] font-bold ${isBought ? 'bg-emerald-500 text-slate-900' : 'bg-amber-500/20 text-amber-300'}">
          ${isBought ? 'Đã kích hoạt' : perk.cost + ' ☯'}
        </span>
      </div>
    `;
    container.appendChild(card);
  });
}

export function startGameWithOrigin() {
  if (!selectedOrigin) {
    selectedOrigin = originsPool.find(o => o.id === "origin_phe_vat") || originsPool[14] || originsPool[0];
  }
  document.getElementById("startScreen").classList.add("hidden");
  initPlayerFromOrigin(selectedOrigin);
  updateUI();
  playEffect("lightning");
  addLog(`✨ <strong>ĐOẠT XÁ THÀNH CÔNG!</strong> Bạn đã nhập hồn vào thân xác <strong class="text-amber-300">[${selectedOrigin.title}]</strong>! Khởi đầu một kiếp hồng trần mới.`, "bg-[#0f3460]/40 border-amber-500/40 text-amber-200");
  
  if (activePerks.size > 0) {
    const perkNames = Array.from(activePerks).map(id => perksPool.find(p => p.id === id)?.name).join(", ");
    addLog(`⚡ <strong>BÀN TAY VÀNG THỨC TỈNH:</strong> Kích hoạt [${perkNames}] gia trì linh hồn!`, "bg-emerald-950/60 border-emerald-500/50 text-emerald-200");
  }

  // Thức tỉnh Di Sản Luân Hồi tiền kiếp nếu có
  const savedLegacy = JSON.parse(localStorage.getItem("tu_tien_legacy") || "null");
  if (savedLegacy) {
    addLog(`
      <div class="font-bold text-purple-300 text-xs font-cinzel">
        🌌 DI SẢN LUÂN HỒI THỨC TỈNH: ${savedLegacy.name.toUpperCase()}!
      </div>
      <p class="text-slate-300 text-[11px] leading-relaxed">
        Linh hồn mang theo ký ức tiền kiếp cùng <strong class="text-amber-300">${savedLegacy.name}</strong> (${savedLegacy.type === 'weapon' ? '⚔️ Thần Binh bảo mệnh' : '☣️ Tag Đột Biến ma dị'}) kế thừa vào tân sinh mệnh!
      </p>
    `, "bg-purple-950/80 border-purple-400 text-purple-200 font-bold");
  }

  renderNextYearButton();
}

export function initPlayerFromOrigin(org) {
  player.weapons = []; // Reset kho vũ khí kiếp trước
  if (org.id === "origin_chua_te_bong_toi") {
    player.name = "Cid Kagenou";
    const sword = weaponsDB.find(w => w.id === "wp_diet_than_kiem");
    if (sword && !player.weapons.some(w => w.id === sword.id)) player.weapons.push(sword);
  } else if (org.id === "origin_mecha_paladin") {
    player.name = "RX-Thánh Cơ Giáp";
    const ak = weaponsDB.find(w => w.id === "wp_ak47_phong_hoa");
    if (ak && !player.weapons.some(w => w.id === ak.id)) player.weapons.push(ak);
  } else if (org.id === "origin_ma_hoang_trong_sinh") {
    player.name = "Trác Nhất Phàm";
    const laser = weaponsDB.find(w => w.id === "wp_kiem_laser");
    if (laser && !player.weapons.some(w => w.id === laser.id)) player.weapons.push(laser);
  } else if (org.id === "origin_long_vuong_di_gioi") {
    player.name = "Thái Cổ Long Vương";
  } else if (org.id === "origin_phap_su_toi_thuong") {
    player.name = "Merlin Dị Giới";
    const wand = weaponsDB.find(w => w.id === "wp_gay_hogwarts");
    if (wand && !player.weapons.some(w => w.id === wand.id)) player.weapons.push(wand);
  } else if (org.id === "origin_sat_thu_cyber") {
    player.name = "Genji Thần Đao";
  } else if (org.id === "origin_slime") player.name = "Rimuru Lam Ma";
  else if (org.id === "origin_dai_thu") player.name = "Mộc Linh Tiên";
  else if (org.id === "origin_pin_du_phong" || org.id === "origin_pin_chai") player.name = "Lôi Thần Pin";
  else if (org.id === "origin_truck_driver") player.name = "Trần Bát Vĩ";
  else if (org.id === "origin_dev_trit") player.name = "Nguyễn Dev Bug";
  else if (org.id === "origin_paladin_tay") player.name = "Artoria Pendragon";
  else if (org.id === "origin_tho_ren") player.name = "Thiết Luyện Tâm";
  else if (org.id === "origin_cho_vang") player.name = "Hoàng Khuyển Đại Thánh";
  else if (org.id === "origin_phe_vat_no") player.name = "Vương Bại Gia";
  else if (org.id === "origin_cay_chuoi") player.name = "Chuối Tiên Nhân";
  else player.name = "Lâm Huyền Cơ";

  player.gen = generationCount;
  player.age = 0;
  player.maxAge = org.baseStats.maxAge;
  player.health = org.baseStats.health;
  player.root = org.baseStats.root;
  player.intell = org.baseStats.intell;
  player.luck = org.baseStats.luck;
  player.money = org.baseStats.money;
  player.realmIndex = 0;
  player.realm = "Phàm Nhân";
  player.exp = 0;
  player.maxExp = 100;
  player.faction = null;
  player.estate = estatesDB[0];
  player.mount = mountsDB[0];
  player.job = null;
  player.tags = [org.tag, ...(org.extraTags || [])];
  player.spouse = null;
  player.children = [];
  player.grudges = [];
  if (!player.weapons) player.weapons = [];
  player.hiddenFlags = {};
  player.bossKills = [];
  player.seenEvents = new Set();
  player.isHumanoid = !(org.id === "origin_slime" || org.id === "origin_dai_thu" || org.id === "origin_pin_du_phong" || org.id === "origin_pin_chai" || org.id === "origin_cay_chuoi" || org.id === "origin_cho_vang");
  player.toxicity = 0;

  // Áp dụng perks
  activePerks.forEach(pId => {
    const perk = perksPool.find(p => p.id === pId);
    if (perk) {
      player.tags.push(perk.tag);
      if (typeof perk.apply === "function") perk.apply(player);
    }
  });

  // Tự động nhúng Di Sản Luân Hồi (Legacy) từ kiếp trước vào nhân vật mới
  const savedLegacy = JSON.parse(localStorage.getItem("tu_tien_legacy") || "null");
  if (savedLegacy) {
    if (savedLegacy.type === "weapon") {
      const fullWp = weaponsDB.find(w => w.id === savedLegacy.id) || {
        id: savedLegacy.id,
        name: savedLegacy.name,
        power: savedLegacy.power || 35,
        cost: savedLegacy.cost || 100,
        rarity: savedLegacy.rarity || "Thần Binh"
      };
      if (!player.weapons.some(w => w.id === fullWp.id)) {
        player.weapons.push(fullWp);
      }
    } else if (savedLegacy.type === "tag") {
      if (!player.tags.includes(savedLegacy.tag)) {
        player.tags.push(savedLegacy.tag);
      }
    }
  }

  window.player = player;
}

// ==========================================
// ENGINE: NÂNG TUỔI & MILESTONES THEO TRỤC CUỘC ĐỜI
// ==========================================
export function advanceYear() {
  player.age += 1;

  // 1. MỐC 500 TUỔI (MAX CAP): THIÊN KIẾP XE TẢI (TRUCK-KUN) GIÁNG THẾ!
  if (player.age >= 500) {
    playEffect("lightning");
    playEffect("shake");
    accumulatedKarma += 50;
    localStorage.setItem("tu_tien_karma", accumulatedKarma);
    addLog(`
      <div class="font-black text-rose-400 text-sm font-cinzel tracking-wider">
        🚛 THIÊN KIẾP XE TẢI (TRUCK-KUN) GIÁNG THẾ!
      </div>
      <p class="text-slate-100 text-xs mt-1 leading-relaxed">
        Hư không nứt toác! Một chiếc <strong>Xe Tải 18 Bánh Hư Không</strong> giáng lâm từ Dị Giới lao thẳng vào bạn với vận tốc ánh sáng! Còi xe inh ỏi: <em>"BÉP BÉP!!"</em>. Đạt đại hạn 500 năm, thiên đạo ép buộc chuyển sinh! Bạn nhận được <strong class="text-yellow-300">+50 ĐIỂM KARMA</strong> Thần Cấp!
      </p>
    `, "bg-gradient-to-r from-red-950 via-purple-950 to-slate-950 border-rose-500 text-rose-200 font-bold shadow-2xl");
    updateUI();
    die("Bị Thiên Kiếp Xe Tải (Truck-kun) đâm tan xác chuyển sinh Dị Giới");
    return;
  }

  // 2. Hiệu ứng ăn mòn của Huyết Nhục Mục Nát (nếu có Tag)
  if (player.tags && player.tags.includes("huyet_nhuc_muc_nat")) {
    const rotDmg = Math.max(1, Math.ceil(player.health * 0.05));
    player.health = Math.max(0, player.health - rotDmg);
    addLog(`☣️ <strong>[Huyết Nhục Mục Nát]</strong> Thể xác trăm năm chưa kết Kim Đan thối rữa, ăn mòn <strong>-${rotDmg}% Sức Khỏe</strong>!`, "text-purple-400 text-xs");
    if (player.health <= 0) {
      die("Nhục thân thối rữa hoàn toàn do không kết Kim Đan kịp đại hạn");
      return;
    }
  }

  // Kiểm tra thọ mệnh
  if (player.age >= player.maxAge || player.health <= 0) {
    die(player.health <= 0 ? "Thân thể suy kiệt, nội thương bộc phát tử vong" : "Đại hạn đã tới, thọ mệnh tự nhiên viên tịch");
    return;
  }

  // Hấp thụ linh khí tu vi từ Động Phủ & Bàn tay vàng
  let expGained = player.estate.expPerYear + Math.floor(player.root / 4);
  if (player.tags.includes("perk_hack_exp")) {
    expGained = Math.floor(expGained * 1.35);
  }
  player.exp += expGained;

  // Tích lũy Tạp Chất (Toxicity) ngẫu nhiên 2 - 8 điểm do ô nhiễm ma lực
  const toxGain = Math.floor(Math.random() * 7) + 2;
  player.toxicity = Math.min(100, (player.toxicity || 0) + toxGain);
  if (player.toxicity >= 70 && Math.random() < 0.35) {
    playEffect("shake");
    addLog(`☣️ <strong>CẢNH BÁO TẠP CHẤT MA LỰC:</strong> Tạp chất trong kinh mạch đã đạt mức nguy cấp (${player.toxicity}/100)! Nguy cơ bạo phát biến dị khi đột phá cực cao! Hãy dùng [Tẩy Tủy] ngay!`, "bg-red-950/80 border-red-500 text-red-200 font-bold");
  }

  if (player.exp >= player.maxExp) {
    player.exp = player.maxExp;
    document.getElementById("btnBreakthrough").classList.remove("hidden");
  }

  // Lương và rủi ro nghề nghiệp nếu từ 18 tuổi và có nghề
  if (player.job && player.age >= 18) {
    let earned = player.job.salary;
    if (player.tags.includes("perk_noi_com")) earned += 25;
    player.money += earned;
    addLog(`💼 Làm việc chăm chỉ cả năm vị trí <strong>${player.job.title}</strong>: nhận <strong>+${earned} Linh Thạch</strong>.`, "text-cyan-200");
    
    // Rủi ro
    if (Math.random() < player.job.risk) {
      playEffect("shake");
      const dmg = Math.floor(Math.random() * 20) + 10;
      player.health = Math.max(1, player.health - dmg);
      addLog(`⚠️ Tai nạn nghề nghiệp! Bạn bị thương mất <strong>-${dmg}% Sức Khỏe</strong>.`, "text-red-400 font-semibold");
    }
  }

  // Con cái lớn thêm 1 tuổi
  player.children.forEach(child => child.age += 1);

  updateUI();

  // 3. MỐC DEADLINE 30 TUỔI: Nếu chưa đạt Trúc Cơ (cảnh giới cấp 2, realmIndex < 2)
  if (player.age === 30 && player.realmIndex < 2) {
    playEffect("shake");
    playEffect("blood");
    const lostMoney = Math.floor(player.money * 0.5);
    player.money -= lostMoney;
    player.health = Math.max(0, player.health - 60);
    addLog(`
      <div class="font-bold text-rose-400 text-sm font-cinzel">
        ⚡ CỘT MỐC 30 TUỔI: PHẾ VẬT MÃN HẠN!
      </div>
      <p class="text-slate-200 text-xs leading-relaxed">
        Bạn đã tròn 30 tuổi nhưng vẫn chưa chạm tới cảnh giới <strong>[Trúc Cơ]</strong>! Khí huyết suy bại, kinh mạch tắc nghẽn, thọ nguyên hao tổn trầm trọng, bị trục xuất khỏi môn phái!
      </p>
      <p class="text-rose-300 font-bold mt-1 text-xs">
        Bị trọng thương nội tạng (-60% Sức Khỏe), gia tài tiêu tán một nửa (-${lostMoney} Linh Thạch)!
      </p>
    `, "bg-rose-950/90 border-rose-500 text-rose-200 font-bold");

    if (player.health <= 0) {
      die("30 tuổi chưa đạt Trúc Cơ, khí huyết khô kiệt phế vật mãn hạn");
      return;
    }
    updateUI();
    renderNextYearButton();
    return;
  }

  // 4. MỐC DEADLINE 100 TUỔI: Nếu chưa đạt Kim Đan (cảnh giới cấp 3, realmIndex < 3)
  if (player.age === 100 && player.realmIndex < 3) {
    playEffect("shake");
    playEffect("blood");
    if (!player.tags.includes("huyet_nhuc_muc_nat")) {
      player.tags.push("huyet_nhuc_muc_nat");
    }
    addLog(`
      <div class="font-bold text-purple-400 text-sm font-cinzel">
        ☣️ CỘT MỐC 100 TUỔI: HUYẾT NHỤC MỤC NÁT!
      </div>
      <p class="text-slate-200 text-xs leading-relaxed">
        Trăm năm chớp mắt trôi qua mà chưa kết thành <strong>[Kim Đan]</strong>! Nhục thân người phàm bắt đầu suy thoái, tế bào hoại tử, tỏa ra tử khí nồng nặc!
      </p>
      <p class="text-purple-300 font-bold mt-1 text-xs">
        Bị gán vĩnh viễn Tag: <strong class="text-rose-400">[Huyết Nhục Mục Nát]</strong>! Kể từ nay mỗi năm tự động ăn mòn 5% Sức Khỏe!
      </p>
    `, "bg-purple-950/90 border-purple-500 text-purple-200 font-bold");

    updateUI();
    renderNextYearButton();
    return;
  }

  // Kiểm tra Hóa Hình Thành Dạng Người (Metamorphosis) cho Slime / Cây Đại Thụ
  if (!player.isHumanoid && player.age >= 2) {
    triggerMetamorphosisEvent();
    return;
  }

  // Kiểm tra Milestone đặc biệt
  if (player.age === 6) {
    triggerMilestoneAge6(); // Đo Linh Căn
    return;
  }
  if (player.age === 12) {
    triggerMilestoneAge12(); // Thức Tỉnh & Bái Sư
    return;
  }
  if (player.age === 18) {
    triggerMilestoneAge18(); // Xuống Núi / Độc Lập
    return;
  }

  // 5. SỔ THÙ VẶT & NPC TRUY SÁT: 15% tỷ lệ ngắt sự kiện thông thường ép chạy sự kiện
  if (player.grudges && player.grudges.length > 0 && Math.random() < 0.15) {
    triggerGrudgeRevengeEvent();
    return;
  }

  // Lọc sự kiện thường niên theo lứa tuổi
  triggerAnnualEvent();
}

// ==========================================
// CỘT MỐC ĐỘT PHÁ: HÓA HÌNH DẠNG NGƯỜI (SLIME & CÂY ĐẠI THỤ)
// ==========================================
export function triggerMetamorphosisEvent() {
  if (player.tags.includes("vessel_slime")) {
    addLog(`
      <div class="font-bold text-cyan-300 text-sm font-cinzel">
        ✨ BÙNG NỔ HÓA HÌNH: ĐỘ KIẾP TIỂU THÀNH!
      </div>
      <p class="text-slate-200">Nuốt chửng linh đan rơi xuống từ người tu tiên sẩy chân ngã vực, toàn thân Slime sôi sục, dòng chảy ma lực ngưng tụ thành khung xương và làn da trắng ngần! Bạn chính thức <strong class="text-yellow-300">HÓA HÌNH THÀNH MỸ THIẾU NIÊN / THIẾU NỮ DẠNG NGƯỜI</strong> cực ngầu! Từ nay có thể cầm kiếm, mặc giáp, bước vào xã hội nhân gian, cưới vợ sinh con và tung hoành thiên hạ!</p>
    `, "bg-gradient-to-r from-blue-950 to-indigo-950 border-cyan-400 text-cyan-100 font-bold");

    const btnAgeUp = document.getElementById("btnAgeUp");
  if (btnAgeUp) btnAgeUp.classList.add("hidden");
  const statusInd = document.getElementById("statusIndicator");
  if (statusInd) {
    statusInd.textContent = "⚡ Hãy đưa ra quyết định ở bảng lựa chọn bên trên!";
    statusInd.className = "text-[10px] text-amber-300 font-mono text-center animate-pulse";
  }
  const container = document.getElementById("optionsContainer");
  if (container) container.classList.remove("hidden");
    container.innerHTML = "";

    const opts = [
      {
        text: "⚔️ Hóa thân thành Kiếm Khách Tóc Xanh lạnh lùng (+20 Căn Cốt, nhận Thiết Kiếm)",
        action: () => {
          playEffect("lightning");
          player.root += 20;
          player.weapons.push(weaponsDB[0]);
          addLog("Biến hóa thành kiếm khách ngầu lòi, tay cầm sẵn Chảo Hợp Kim Bất Hoại!", "text-cyan-300 font-bold");
        }
      },
      {
        text: "🏹 Hóa thân thành Xạ Thủ Nỏ Thần lém lỉnh (+20 Ngộ Tính, nhận Nỏ Ma Thuật)",
        action: () => {
          playEffect("gold");
          player.intell += 20;
          player.weapons.push(weaponsDB[1]);
          addLog("Biến hóa thành xạ thủ tay cầm Nỏ Ma Thuật 6 Nòng cực chất!", "text-yellow-300 font-bold");
        }
      },
      {
        text: "🌸 Hóa thân thành Mỹ Nhân Vạn Người Mê (+25 Khí Vận, ai thấy cũng mến)",
        action: () => {
          playEffect("heal");
          player.luck += 25;
          addLog("Nhan sắc khuynh thành khiến vạn người mê đắm! Khí vận +25!", "text-pink-300 font-bold");
        }
      }
    ];

    opts.forEach(o => {
      const btn = document.createElement("button");
      btn.className = "w-full py-2.5 px-3 text-left text-xs bg-[#0f3460]/90 hover:bg-[#154680] text-white rounded-xl border border-blue-400/30 flex justify-between items-center shadow";
      btn.innerHTML = `<span>${o.text}</span><span class="text-amber-400 ml-1">➔</span>`;
      btn.onclick = () => {
        container.innerHTML = "";
        player.isHumanoid = true;
        player.tags.push("da_hoa_hinh_nguoi");
        o.action();
        updateUI();
        renderNextYearButton();
      };
      container.appendChild(btn);
    });
  } else if (player.tags.includes("vessel_dai_thu")) {
    addLog(`
      <div class="font-bold text-emerald-300 text-sm font-cinzel">
        🌲 BÙNG NỔ HÓA HÌNH: MỘC LINH XUẤT THẾ!
      </div>
      <p class="text-slate-200">Một tia sấm sét ấu niên đánh toác vỏ cây ngàn năm! Từ hốc cây xanh biếc, một đứa trẻ Mộc Linh bụ bẫm mắt sáng nhảy phắt ra ngoài! Rễ cây hóa thành đôi chân thoăn thoắt, cành lá hóa thành mái tóc xanh! Bạn chính thức <strong class="text-yellow-300">HÓA THÀNH NGƯỜI</strong>, tự do đi lại và khám phá hồng trần!</p>
    `, "bg-gradient-to-r from-emerald-950 to-teal-950 border-emerald-400 text-emerald-100 font-bold");

    const container = document.getElementById("optionsContainer");
    container.innerHTML = "";

    const opts = [
      {
        text: "🌿 Hóa thân thành Dược Sĩ Rừng Già (+25 Ngộ Tính, nhận Gạch Hoàng Kim)",
        action: () => {
          playEffect("gold");
          player.intell += 25;
          player.weapons.push(weaponsDB[2]);
          addLog("Nhận được Gạch Hoàng Kim 9999 làm bảo vật trấn thân!", "text-yellow-300 font-bold");
        }
      },
      {
        text: "🥋 Hóa thân thành Mộc Tiên Cuồng Chiến (+25 Căn Cốt, da đồng xương sắt)",
        action: () => {
          playEffect("lightning");
          player.root += 25;
          player.health = 120;
          addLog("Khung xương mộc linh cứng cáp vô địch! Căn cốt +25, Máu tối đa tăng vọt!", "text-emerald-300 font-bold");
        }
      },
      {
        text: "✨ Hóa thân thành Tiên Đồng May Mắn (+30 Khí Vận, nhận 100 Linh Thạch)",
        action: () => {
          playEffect("heal");
          player.luck += 30;
          player.money += 100;
          addLog("Tiên đồng giáng thế mang theo tài lộc! Khí vận +30, Linh thạch +100!", "text-amber-300 font-bold");
        }
      }
    ];

    opts.forEach(o => {
      const btn = document.createElement("button");
      btn.className = "w-full py-2.5 px-3 text-left text-xs bg-[#0f3460]/90 hover:bg-[#154680] text-white rounded-xl border border-blue-400/30 flex justify-between items-center shadow";
      btn.innerHTML = `<span>${o.text}</span><span class="text-amber-400 ml-1">➔</span>`;
      btn.onclick = () => {
        container.innerHTML = "";
        player.isHumanoid = true;
        player.tags.push("da_hoa_hinh_nguoi");
        o.action();
        updateUI();
        renderNextYearButton();
      };
      container.appendChild(btn);
    });
  } else if (player.tags.includes("vessel_pin_du_phong")) {
    addLog(`
      <div class="font-bold text-amber-300 text-sm font-cinzel">
        ⚡ BÙNG NỔ NẠP XẢ: LÔI LINH HÓA THẦN!
      </div>
      <p class="text-slate-200">Dòng điện cao thế 20.000mAh tích lũy quá tải bốc khói nghi ngút! Tia sét ngũ sắc giáng xuống biến cục pin thành một <strong class="text-yellow-300">THIẾU NIÊN LÔI ĐIỆN DẠNG NGƯỜI</strong> tóc dựng ngược phát sáng cực ngầu! Toàn thân tỏa ra điện quang lách tách, sẵn sàng cầm vũ khí xông pha giang hồ!</p>
    `, "bg-gradient-to-r from-amber-950 to-indigo-950 border-amber-400 text-amber-100 font-bold");

    const container = document.getElementById("optionsContainer");
    container.innerHTML = "";

    const opts = [
      {
        text: "⚡ Hóa thân thành Lôi Kiếm Sát Thủ (+30 Căn Cốt, nhận Kiếm Laser)",
        action: () => {
          playEffect("lightning");
          player.root += 30;
          const laser = weaponsDB.find(w => w.id === "wp_kiem_laser");
          if (laser) player.weapons.push(laser);
          addLog("Biến hóa thành Lôi Kiếm Sát Thủ, tay cầm Kiếm Laser phù chú chém nát hư không!", "text-cyan-300 font-bold");
        }
      },
      {
        text: "🔫 Hóa thân thành Xạ Thủ Pháo Binh (+25 Ngộ Tính, nhận AK-47 Phong Hỏa)",
        action: () => {
          playEffect("gold");
          player.intell += 25;
          const ak = weaponsDB.find(w => w.id === "wp_ak47_phong_hoa");
          if (ak) player.weapons.push(ak);
          addLog("Biến hóa thành Xạ thủ công nghệ mang súng AK-47 Phong Hỏa Luân!", "text-yellow-300 font-bold");
        }
      },
      {
        text: "💰 Mở Trạm Sạc Siêu Tốc Bán Điện (+35 Khí Vận, nhận 200 Linh Thạch)",
        action: () => {
          playEffect("gold");
          player.luck += 35;
          player.money += 200;
          addLog("Mở dịch vụ sạc pin lôi khí cho pháp bảo các tu sĩ! Hốt trọn 200 Linh Thạch!", "text-amber-300 font-bold");
        }
      }
    ];

    opts.forEach(o => {
      const btn = document.createElement("button");
      btn.className = "w-full py-2.5 px-3 text-left text-xs bg-[#0f3460]/90 hover:bg-[#154680] text-white rounded-xl border border-blue-400/30 flex justify-between items-center shadow";
      btn.innerHTML = `<span>${o.text}</span><span class="text-amber-400 ml-1">➔</span>`;
      btn.onclick = () => {
        container.innerHTML = "";
        player.isHumanoid = true;
        player.tags.push("da_hoa_hinh_nguoi");
        o.action();
        updateUI();
        renderNextYearButton();
      };
      container.appendChild(btn);
    });
  } else {
    // Hóa hình phổ thông cho các thân xác phế / dị vật khác (Chó cỏ, chuối, v.v.)
    addLog(`
      <div class="font-bold text-yellow-300 text-sm font-cinzel">
        ✨ CƠ DUYÊN ĐỘT BIẾN: LỘT XÁC HÓA THÀNH DẠNG NGƯỜI!
      </div>
      <p class="text-slate-200">Hấp thu linh khí nhật nguyệt suốt hai năm ròng, thân xác phát ra bạch quang chói lọi, đột phá gông cùm <strong class="text-yellow-300">HÓA THÀNH THIẾU NIÊN DẠNG NGƯỜI</strong> khôi ngô tuấn tú! Từ nay tự do cầm thần binh, cưới vợ lập gia tộc và tung hoành thiên hạ!</p>
    `, "bg-[#0f3460] border-amber-400 text-yellow-200 font-bold");

    const container = document.getElementById("optionsContainer");
    container.innerHTML = "";
    const btn = document.createElement("button");
    btn.className = "w-full py-2.5 px-3 bg-gradient-to-r from-amber-600 to-cyan-600 text-white font-bold rounded-xl text-xs shadow";
    btn.innerHTML = "✨ Tiếp nhận thân hình người, bước vào hồng trần (+15 Căn Cốt, +15 Ngộ Tính)";
    btn.onclick = () => {
      container.innerHTML = "";
      player.isHumanoid = true;
      player.root += 15;
      player.intell += 15;
      player.tags.push("da_hoa_hinh_nguoi");
      updateUI();
      renderNextYearButton();
    };
    container.appendChild(btn);
  }
}

// ==========================================
// CỘT MỐC 1: 6 TUỔI - ĐO LINH CĂN
// ==========================================
export function triggerMilestoneAge6() {
  addLog(`🔮 <strong>CỘT MỐC 6 TUỔI: ĐẠI HỘI KIỂM TRA LINH CĂN!</strong><br/>Trước quảng trường, Trưởng Lão đặt viên Linh Thạch Khởi Nguyên lên đỉnh đầu bạn để xem xét thiên phú tu hành!`, "bg-[#0f3460] border-cyan-500/50 text-cyan-200 font-bold");

  const btnAgeUp = document.getElementById("btnAgeUp");
  if (btnAgeUp) btnAgeUp.classList.add("hidden");
  const statusInd = document.getElementById("statusIndicator");
  if (statusInd) {
    statusInd.textContent = "⚡ Hãy đưa ra quyết định ở bảng lựa chọn bên trên!";
    statusInd.className = "text-[10px] text-amber-300 font-mono text-center animate-pulse";
  }
  const container = document.getElementById("optionsContainer");
  if (container) container.classList.remove("hidden");
  container.innerHTML = "";
  
  const opt = document.createElement("button");
  opt.className = "w-full py-3 px-3 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-bold rounded-xl shadow text-xs";
  opt.innerHTML = "✨ Đặt tay lên Linh Thạch thử Thiên Mệnh";
  opt.onclick = () => {
    container.innerHTML = "";
    playEffect("lightning");
    const roll = Math.random();
    if (roll < 0.25) {
      player.root += 30;
      player.tags.push("thien_linh_can");
      addLog("🌈 KIM QUANG RỰC RỠ! Viên đá chiếu thấu tầng mây! Bạn sở hữu [Thiên Linh Căn] vạn người có một! Căn cốt tăng vọt +30!", "text-yellow-300 font-black");
    } else if (roll < 0.7) {
      player.root += 15;
      player.tags.push("song_linh_can");
      addLog("🟢 Ánh sáng xanh ngọc tỏa ra ổn định. Bạn đạt phẩm chất [Song Linh Căn] khá tốt. Căn cốt +15.", "text-emerald-300 font-semibold");
    } else {
      player.tags.push("tap_linh_can");
      addLog("💨 Viên đá chỉ nhấp nháy vài đốm mờ nhạt. Bạn là [Tạp Linh Căn] ngũ hành hỗn tạp, con đường tu tiên sẽ vô cùng gian nan.", "text-slate-300");
    }
    updateUI();
    renderNextYearButton();
  };
  container.appendChild(opt);
}

// ==========================================
// CỘT MỐC 2: 12 TUỔI - THỨC TỈNH & BÁI SƯ CHỌN PHE
// ==========================================
export function triggerMilestoneAge12() {
  addLog(`⚡ <strong>CỘT MỐC 12 TUỔI: BÁI SƯ GIA NHẬP PHE PHÁI!</strong><br/>Đây là ngã rẽ định đoạt cả cuộc đời! Ba đại thế lực mở cửa thu nạp đồ đệ, bạn chọn nương tựa phe nào?`, "bg-purple-950/80 border-purple-500 text-purple-200 font-bold");

  const btnAgeUp = document.getElementById("btnAgeUp");
  if (btnAgeUp) btnAgeUp.classList.add("hidden");
  const statusInd = document.getElementById("statusIndicator");
  if (statusInd) {
    statusInd.textContent = "⚡ Hãy đưa ra quyết định ở bảng lựa chọn bên trên!";
    statusInd.className = "text-[10px] text-amber-300 font-mono text-center animate-pulse";
  }
  const container = document.getElementById("optionsContainer");
  if (container) container.classList.remove("hidden");
  container.innerHTML = "";

  const factions = [
    {
      title: "⚔️ Thanh Vân Kiếm Tông (Chính Đạo)",
      desc: "Môn quy nghiêm ngặt, tài nguyên ổn định, danh môn chính phái (+20 Căn Cốt, cấp lương 30 Linh Thạch/năm).",
      action: () => {
        player.faction = "Chính Đạo Tông Môn";
        player.root += 20;
        player.money += 50;
        player.tags.push("chinh_dao_mon_nhan");
        playEffect("gold");
        addLog("Trở thành đệ tử Thanh Vân Tông! Được cấp thanh Mộc Kiếm và đan dược tu luyện.", "text-cyan-300 font-bold");
      }
    },
    {
      title: "🩸 Huyết Sát Ma Tông (Ma Đạo Tà Giáo)",
      desc: "Tự do sát phạt, thăng tiến cực nhanh nhưng đầy hiểm họa tàn sát lẫn nhau (+30 Ngộ Tính, Khí Vận bấp bênh).",
      action: () => {
        player.faction = "Ma Đạo Tà Giáo";
        player.intell += 30;
        player.root += 15;
        player.tags.push("ma_dao_tu_si");
        playEffect("blood");
        addLog("Bước chân vào Ma Đạo! Học được Huyết Ma Tâm Pháp, sẵn sàng đạp lên xác kẻ khác để tiến thân.", "text-rose-400 font-bold");
      }
    },
    {
      title: "🏕️ Khước Từ Tông Môn: Quyết Làm Tán Tu Tự Do",
      desc: "Tự do tuyệt đối, không quy củ, bươn chải chợ đen và tự mở sơn trang riêng (+25 Khí Vận, nhận 100 Linh Thạch).",
      action: () => {
        player.faction = "Tán Tu Bươn Chải";
        player.luck += 25;
        player.money += 100;
        player.tags.push("tan_tu_doc_hanh");
        playEffect("heal");
        addLog("Tự do tự tại! Vác túi vải bước vào giang hồ bươn chải, làm chủ vận mệnh của mình.", "text-amber-300 font-bold");
      }
    }
  ];

  factions.forEach(f => {
    const btn = document.createElement("button");
    btn.className = "w-full py-2.5 px-3 text-left bg-[#0f3460]/90 hover:bg-[#154680] text-white rounded-xl border border-blue-400/30 text-xs shadow";
    btn.innerHTML = `<div><strong>${f.title}</strong></div><div class="text-[10px] text-slate-300 mt-0.5">${f.desc}</div>`;
    btn.onclick = () => {
      container.innerHTML = "";
      f.action();
      updateUI();
      renderNextYearButton();
    };
    container.appendChild(btn);
  });
}

// ==========================================
// CỘT MỐC 3: 18 TUỔI - ĐỘC LẬP & MỞ KHÓA THẾ GIỚI
// ==========================================
export function triggerMilestoneAge18() {
  addLog(`🎉 <strong>CỘT MỐC 18 TUỔI: TRƯỞNG THÀNH XUỐNG NÚI!</strong><br/>Chính thức độc lập! Toàn bộ tính năng <strong>Động Phủ (Nhà Cửa)</strong>, <strong>Tọa Kỵ (Xe Cộ)</strong>, <strong>Kho Thần Binh (Vũ Khí)</strong>, <strong>Nghề Nghiệp</strong> và <strong>Kết Duyên Gia Tộc</strong> đã được mở khóa! Hãy bắt đầu gây dựng cơ nghiệp!`, "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold");

  playEffect("gold");

  // Mở khóa các nút UI
  ["btnEstate", "btnMount", "btnWeapon", "btnJob", "btnFamily"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove("opacity-50", "cursor-not-allowed");
      el.classList.add("cursor-pointer");
    }
  });

  const btnAgeUp = document.getElementById("btnAgeUp");
  if (btnAgeUp) btnAgeUp.classList.add("hidden");
  const statusInd = document.getElementById("statusIndicator");
  if (statusInd) {
    statusInd.textContent = "⚡ Hãy đưa ra quyết định ở bảng lựa chọn bên trên!";
    statusInd.className = "text-[10px] text-amber-300 font-mono text-center animate-pulse";
  }
  const container = document.getElementById("optionsContainer");
  if (container) container.classList.remove("hidden");
  container.innerHTML = "";
  const btn = document.createElement("button");
  btn.className = "w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl text-xs";
  btn.innerHTML = "🚀 Xuống núi lập nghiệp, bước vào đời!";
  btn.onclick = () => {
    container.innerHTML = "";
    renderNextYearButton();
  };
  container.appendChild(btn);
}

// ==========================================
// SỰ KIỆN THƯỜNG NIÊN THEO LỨA TUỔI VÀ TAGS (CHỐNG LẶP SỰ KIỆN)
// ==========================================
export function triggerAnnualEvent() {
  if (!player.seenEvents) player.seenEvents = new Set();

  // Lọc các sự kiện đủ điều kiện (tuổi, requireTags, excludeTags, requireFlags, và CHƯA TỪNG XUẤT HIỆN)
  let eligible = eventsPool.filter(evt => {
    if (evt.minAge !== undefined && player.age < evt.minAge) return false;
    if (evt.maxAge !== undefined && player.age > evt.maxAge) return false;
    if (evt.requireTags && !evt.requireTags.every(t => player.tags.includes(t))) return false;
    if (evt.excludeTags && evt.excludeTags.some(t => player.tags.includes(t))) return false;
    if (evt.requireFlags && !evt.requireFlags.every(f => player.hiddenFlags && player.hiddenFlags[f])) return false;
    if (player.seenEvents.has(evt.id)) return false;
    return true;
  });

  // Nếu đã trải qua hết sự kiện của độ tuổi này, tái sử dụng các sự kiện chung
  if (eligible.length === 0) {
    eligible = eventsPool.filter(evt => {
      if (evt.minAge !== undefined && player.age < evt.minAge) return false;
      if (evt.maxAge !== undefined && player.age > evt.maxAge) return false;
      if (evt.requireTags && !evt.requireTags.every(t => player.tags.includes(t))) return false;
      if (evt.excludeTags && evt.excludeTags.some(t => player.tags.includes(t))) return false;
      if (evt.requireFlags && !evt.requireFlags.every(f => player.hiddenFlags && player.hiddenFlags[f])) return false;
      return true;
    });
  }

  if (eligible.length > 0) {
    const selectedEvt = eligible[Math.floor(Math.random() * eligible.length)];
    player.seenEvents.add(selectedEvt.id);
    renderEventCard(selectedEvt);
  } else {
    // Fallback: Một năm an tĩnh ngộ đạo
    playEffect("heal");
    const expAdd = 20 + Math.floor(player.root / 4);
    player.exp += expAdd;
    player.luck += 1;
    addLog(`🧘 Một năm thanh tĩnh ngộ đạo. Bạn chuyên tâm đả tọa hấp thu thiên địa linh khí, Tu vi EXP +${expAdd}, Khí vận +1.`, "text-slate-300");
    renderNextYearButton();
  }
}

export function renderEventCard(evt) {
  addLog(`
    <div class="font-bold text-amber-300 mb-1 text-sm font-cinzel">
      ${evt.title}
    </div>
    <p class="text-slate-200 leading-relaxed">${evt.desc}</p>
  `, "bg-[#16213e] border-amber-500/40 text-slate-200 shadow-md");

  const btnAgeUp = document.getElementById("btnAgeUp");
  if (btnAgeUp) btnAgeUp.classList.add("hidden");

  const statusInd = document.getElementById("statusIndicator");
  if (statusInd) {
    statusInd.textContent = "⚡ Hãy đưa ra quyết định ở bảng lựa chọn bên trên!";
    statusInd.className = "text-[10px] text-amber-300 font-mono text-center animate-pulse";
  }

  const container = document.getElementById("optionsContainer");
  if (container) container.classList.remove("hidden");
  container.innerHTML = "";

  evt.options.forEach((opt, idx) => {
    // 1. Kiểm tra điều kiện reqItem
    let hasReqItem = true;
    if (opt.reqItem) {
      const needle = String(opt.reqItem).toLowerCase().trim();
      const hasWp = (player.weapons || []).some(w => 
        (w.id && w.id.toLowerCase() === needle) || 
        (w.name && w.name.toLowerCase().includes(needle))
      );
      const hasTag = (player.tags || []).some(t => t.toLowerCase() === needle);
      const hasFlag = player.hiddenFlags && player.hiddenFlags[opt.reqItem];
      hasReqItem = hasWp || hasTag || !!hasFlag;
    }

    // 2. Kiểm tra điều kiện reqTags
    let hasReqTags = true;
    if (opt.reqTags && Array.isArray(opt.reqTags)) {
      hasReqTags = opt.reqTags.every(t => (player.tags || []).includes(t));
    }

    const isAvailable = hasReqItem && hasReqTags;

    const btn = document.createElement("button");

    // Hiển thị tỷ lệ thành công nếu có
    let rateBadge = "";
    if (opt.successRate !== undefined && opt.successRate !== null) {
      const pct = Math.round(opt.successRate * 100);
      rateBadge = ` <span class="text-amber-300 font-bold ml-1 font-mono">[Tỷ lệ thành công: ${pct}%]</span>`;
    }

    if (!isAvailable) {
      // Người chơi không thỏa mãn: đổi màu xám, disabled, ghi rõ điều kiện
      let reasons = [];
      if (!hasReqItem) reasons.push(`Cần có: ${opt.reqItem}`);
      if (!hasReqTags) {
        const missing = opt.reqTags.filter(t => !(player.tags || []).includes(t));
        reasons.push(`Cần Tag: ${missing.join(", ")}`);
      }
      const lockText = reasons.join(" • ");

      btn.disabled = true;
      btn.className = "w-full py-2.5 px-3 text-left text-xs bg-slate-800/60 text-slate-400 rounded-xl border border-slate-700/60 flex justify-between items-center opacity-50 cursor-not-allowed select-none shadow-none";
      btn.innerHTML = `
        <span class="flex items-center gap-1.5 flex-1 truncate">
          <span class="text-slate-500">🔒</span>
          <span>#${idx+1}. ${opt.text}${rateBadge}</span>
        </span>
        <span class="text-rose-400 font-bold text-[10px] ml-2 shrink-0 bg-rose-950/70 px-2 py-0.5 rounded border border-rose-800/40">
          [${lockText}]
        </span>
      `;
    } else {
      // Đủ điều kiện bấm chọn
      btn.className = "w-full py-2.5 px-3 text-left text-xs bg-[#0f3460]/90 hover:bg-[#154680] text-white rounded-xl border border-blue-400/30 flex justify-between items-center shadow active:scale-[0.99] transition";
      btn.innerHTML = `
        <span class="flex-1">#${idx+1}. ${opt.text}${rateBadge}</span>
        <span class="text-amber-400 ml-1 shrink-0">➔</span>
      `;
      btn.onclick = () => {
        container.innerHTML = "";

        // Kiểm tra tỷ lệ thành công successRate
        if (opt.successRate !== undefined && opt.successRate !== null) {
          const roll = Math.random();
          if (roll <= opt.successRate) {
            opt.action();
          } else {
            // Thất bại
            playEffect("shake");
            playEffect("blood");
            const failDmg = Math.floor(Math.random() * 20) + 15;
            player.health = Math.max(0, player.health - failDmg);
            addLog(`💥 <strong>LỰA CHỌN THẤT BẠI:</strong> Cơ hội vuột mất trong gang tấc! Bạn bị phản phệ mất <strong>-${failDmg}% Sức Khỏe</strong>!`, "bg-red-950/80 border-red-500 text-red-300 font-bold");
            if (player.health <= 0) {
              die("Hành động mạo hiểm thất bại, bị phản phệ tử vong");
              return;
            }
          }
        } else {
          opt.action();
        }

        updateUI();
        renderNextYearButton();
      };
    }

    container.appendChild(btn);
  });
}

// ==========================================
// ÂN OÁN GIANG HỒ: KẺ THÙ TRẢ THÙ
// ==========================================
export function triggerGrudgeRevengeEvent() {
  const enemy = player.grudges[Math.floor(Math.random() * player.grudges.length)];
  playEffect("blood");

  const weaponPower = player.weapons.reduce((acc, w) => acc + w.power, 0);
  const totalCombatPower = player.root + player.realmIndex * 25 + weaponPower;
  const bestWeapon = player.weapons.length > 0 ? player.weapons[player.weapons.length - 1].name : "Nắm Đấm";

  addLog(`
    <div class="font-bold text-red-400 text-sm font-cinzel">
      ⚔️ ÂN OÁN GIANG HỒ: KẺ THÙ TÌM ĐẾN PHỤC KÍCH!
    </div>
    <p class="text-slate-200"><strong>${enemy.name}</strong> dẫn theo đồng bọn bao vây Động Phủ của bạn! Mối thù xưa: <em>"${enemy.reason}"</em> hôm nay phải thanh toán bằng máu!</p>
  `, "bg-red-950/80 border-red-500 text-red-200 font-bold");

  const btnAgeUp = document.getElementById("btnAgeUp");
  if (btnAgeUp) btnAgeUp.classList.add("hidden");
  const statusInd = document.getElementById("statusIndicator");
  if (statusInd) {
    statusInd.textContent = "⚡ Hãy đưa ra quyết định ở bảng lựa chọn bên trên!";
    statusInd.className = "text-[10px] text-amber-300 font-mono text-center animate-pulse";
  }
  const container = document.getElementById("optionsContainer");
  if (container) container.classList.remove("hidden");
  container.innerHTML = "";

  // Option 1: Nghênh chiến dùng Thần Binh
  const btnFight = document.createElement("button");
  btnFight.className = "w-full py-2.5 px-3 bg-red-700 hover:bg-red-600 text-white font-bold rounded-xl text-xs";
  btnFight.innerHTML = `⚔️ Rút [${bestWeapon}] tử chiến (Chiến Lực: ${totalCombatPower} vs ${enemy.powerLevel})`;
  btnFight.onclick = () => {
    container.innerHTML = "";

    // Kiểm tra hiệu ứng cánh bướm Lão Ăn Mày / Tiên Đế
    if (player.hiddenFlags.an_may_tien_de && totalCombatPower <= enemy.powerLevel) {
      playEffect("gold");
      player.hiddenFlags.an_may_tien_de = false;
      player.grudges = player.grudges.filter(g => g.id !== enemy.id);
      player.weapons.push(weaponsDB[weaponsDB.length - 1]); // Tặng Diệt Thần Kiếm
      addLog("⚡ <strong>CỬU KIẾP TIÊN ĐẾ HỘ GIÁ!</strong> Khi bạn sắp bị chém trúng, Lão Ăn Mày năm xưa xé rách hư không bước ra, giáng một bạt tai đánh bay kẻ thù thành tro bụi: <em>'Tiểu tử, ơn chiếc bánh bao năm ấy, hôm nay ta trả đủ!'</em>. Lão để lại cho bạn một thanh <strong>Thái Cổ Diệt Thần Kiếm</strong> rồi biến mất!", "bg-gradient-to-r from-amber-950 to-purple-950 border-amber-400 text-yellow-200 font-black");
      updateUI();
      renderNextYearButton();
      return;
    }

    if (totalCombatPower > enemy.powerLevel) {
      playEffect("gold");
      player.grudges = player.grudges.filter(g => g.id !== enemy.id);
      player.money += 120;
      addLog(`Bạn vung [${bestWeapon}] chém rụng đầu ${enemy.name}, xóa sạch mối thù trong Sổ Thù Vặt! Thu được 120 Linh Thạch từ thi thể!`, "text-emerald-300 font-bold");
    } else {
      playEffect("blood");
      player.health -= 35;
      if (player.health <= 0) {
        die(`Bị kẻ thù ${enemy.name} chém chết báo thù`);
        return;
      }
      addLog(`Bị đánh trọng thương đứt gãy kinh mạch! Sức Khỏe -35%. May mắn ôm vết thương tẩu thoát được.`, "text-red-400 font-bold");
    }
    updateUI();
    renderNextYearButton();
  };
  container.appendChild(btnFight);

  // Option 2: Dùng Tọa Kỵ trốn chạy
  const btnFlee = document.createElement("button");
  btnFlee.className = "w-full py-2.5 px-3 bg-cyan-700 hover:bg-cyan-600 text-white font-bold rounded-xl text-xs mt-1.5";
  btnFlee.innerHTML = `💨 Cưỡi [${player.mount.name}] phóng chạy (${Math.round(player.mount.escapeRate * 100)}% thoát)`;
  btnFlee.onclick = () => {
    container.innerHTML = "";
    if (Math.random() < player.mount.escapeRate) {
      playEffect("lightning");
      addLog(`Bạn vít ga cưỡi [${player.mount.name}] xé gió tẩu thoát trong tiếng chửi bới bất lực của kẻ thù!`, "text-cyan-300 font-bold");
    } else {
      playEffect("blood");
      player.health -= 30;
      addLog(`Bị trúng tên bắn tỉa khi đang trốn! Mất 30% Sức Khỏe.`, "text-red-400");
    }
    updateUI();
    renderNextYearButton();
  };
  container.appendChild(btnFlee);

  // Option 3: Dùng tiền mua chuộc hóa giải
  const btnBribe = document.createElement("button");
  btnBribe.className = "w-full py-2 px-3 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-xl text-xs mt-1.5";
  btnBribe.innerHTML = `💰 Ném 80 Linh Thạch mua chuộc hòa giải`;
  btnBribe.onclick = () => {
    container.innerHTML = "";
    if (player.money >= 80) {
      player.money -= 80;
      player.grudges = player.grudges.filter(g => g.id !== enemy.id);
      playEffect("gold");
      addLog(`Đồng tiền đi trước là đồng tiền khôn! ${enemy.name} cầm túi 80 Linh Thạch cười hỉ hả xóa bỏ mối thù!`, "text-yellow-300 font-bold");
    } else {
      addLog("Không đủ tiền mua chuộc, bị kẻ thù tát cho một cái sưng má!", "text-red-400");
    }
    updateUI();
    renderNextYearButton();
  };
  container.appendChild(btnBribe);
}

// ==========================================
// HỆ THỐNG KẾT DUYÊN & SINH CON
// ==========================================
export function triggerDatingEvent() {
  const names = ["Tô Diễm Nương", "Lý Nguyệt Dao", "Hàn Thục Trinh", "Bạch Thiển"];
  const spouseName = names[Math.floor(Math.random() * names.length)];

  addLog(`🌸 Tại tửu quán, bạn trò chuyện tâm đầu ý hợp với Nữ Tán Tu <strong class="text-pink-300">${spouseName}</strong>. Nàng mỉm cười gật đầu ưng thuận kết thành Đạo Lữ trăm năm!`, "bg-pink-950/60 border-pink-500/60 text-pink-200");
  
  player.spouse = { name: spouseName, affection: 80, realm: "Luyện Khí" };
  playEffect("heal");

  // Cơ hội sinh con
  if (player.children.length < 3 && Math.random() < 0.7) {
    const childName = (player.name.split(" ")[0] || "Lâm") + " " + (Math.random() < 0.5 ? "Thiên Thần" : "Ngọc Nhi");
    const child = {
      name: childName,
      age: 0,
      root: Math.floor(player.root * 0.8) + Math.floor(Math.random() * 15),
      intell: Math.floor(player.intell * 0.8) + Math.floor(Math.random() * 15)
    };
    player.children.push(child);
    addLog(`👶 <strong>TIN VUI ĐẾN:</strong> Năm sau đó, đạo lữ hạ sinh hài nhi đặt tên là <strong class="text-amber-300">${child.name}</strong> (Căn cốt: ${child.root}, Ngộ tính: ${child.intell})! Huyết mạch gia tộc đã có người kế thừa!`, "text-yellow-300 font-bold");
  }
}
window.triggerDatingEvent = triggerDatingEvent;

// ==========================================
// ĐỘT PHÁ THIÊN KIẾP HỖN MANG (MUTATED BREAKTHROUGH)
// ==========================================
export function triggerBreakthrough() {
  if (player.realmIndex >= realmsList.length - 1) return;
  const targetRealm = realmsList[player.realmIndex + 1];
  const baseRate = Math.min(95, Math.max(30, 50 + Math.floor(player.root / 3) + Math.floor(player.luck / 5)));
  const penalty = player.toxicity || 0;
  const finalRate = Math.max(5, baseRate - penalty);

  document.getElementById("breakthroughTargetText").innerHTML = `Đang chuẩn bị vượt Thiên Kiếp đột phá lên cảnh giới <strong class="text-amber-300">[${targetRealm.name}]</strong>!`;
  const baseEl = document.getElementById("btBaseRate");
  if (baseEl) baseEl.textContent = `${baseRate}%`;
  const penEl = document.getElementById("btToxicityPenalty");
  if (penEl) penEl.textContent = `-${penalty}%`;
  const successEl = document.getElementById("btSuccessRate");
  if (successEl) successEl.textContent = `${finalRate}%`;
  document.getElementById("btRewardText").textContent = `+${targetRealm.ageBonus} Tuổi Thọ, Căn Cốt +${targetRealm.rootBonus}`;
  
  const warnEl = document.getElementById("btMutationWarning");
  if (warnEl) {
    if (player.toxicity > 70) warnEl.classList.remove("hidden");
    else warnEl.classList.add("hidden");
  }

  document.getElementById("breakthroughModal").classList.remove("hidden");
}

export function executeBreakthrough() {
  closeModal("breakthroughModal");
  const targetRealm = realmsList[player.realmIndex + 1];
  const baseRate = Math.min(95, Math.max(30, 50 + Math.floor(player.root / 3) + Math.floor(player.luck / 5)));
  const penalty = player.toxicity || 0;
  const finalRatePct = Math.max(5, baseRate - penalty);

  // 2. Rủi ro Đột Biến: Nếu bấm Đột phá khi Tạp Chất đang ở mức báo động (> 70/100),
  // bất kể thành công hay thất bại, BẮT BUỘC bị gán một Tag Đột Biến ngẫu nhiên
  if (player.toxicity > 70) {
    const mutationPool = [
      { tag: "dot_bien_xuc_tu", name: "Xúc Tu Hỗn Mang", desc: "Sau lưng mọc xúc tu tà ác, cuồng bạo nhưng hình hài ma quái" },
      { tag: "huyet_nhuc_muc_nat", name: "Huyết Nhục Mục Nát", desc: "Da thịt phân hủy bốc khói đen, miễn nhiễm đau đớn" },
      { tag: "da_nhan_ma_dong", name: "Đa Nhãn Ma Đồng", desc: "Trán mọc thêm ba con mắt tà thần nhìn thấu tử huyệt" },
      { tag: "hai_cot_gai_nhon", name: "Hài Cốt Gai Nhọn", desc: "Khung xương biến dị đâm chồi gai nhọn phản chấn sát thương" }
    ];
    const mut = mutationPool[Math.floor(Math.random() * mutationPool.length)];
    if (!player.tags.includes(mut.tag)) {
      player.tags.push(mut.tag);
    }
    playEffect("lightning");
    playEffect("blood");
    addLog(`☣️ <strong>ĐỘT BIẾN HỖN MANG BỘC PHÁ!</strong> Đột phá khi Tạp Chất vượt ngưỡng nguy cấp (${player.toxicity}/100)! Thân thể bạn bị ma lực ô nhiễm biến dị vĩnh viễn: Nhận Tag Đột Biến <strong class="text-purple-300">[${mut.name}]</strong> (${mut.desc})!`, "bg-purple-950 border-purple-400 text-purple-200 font-black");
  }

  if (Math.random() * 100 < finalRatePct) {
    // Thành công
    playEffect("lightning");
    playEffect("gold");
    player.realmIndex += 1;
    // 3. Danh xưng lắp ghép ngẫu nhiên (Procedural Tiers)
    const newRealmTitle = generateRealmName(targetRealm.name);
    player.realm = newRealmTitle;
    player.exp = 0;
    player.maxExp = targetRealm.maxExp;
    player.maxAge += targetRealm.ageBonus;
    player.root += targetRealm.rootBonus;
    player.health = 100;

    // Giảm bớt tạp chất sau khi hoán cốt thành công
    player.toxicity = Math.floor(player.toxicity * 0.4);

    addLog(`🌈 <strong>ẦM ẦM!! ĐỘ LÔI KIẾP THÀNH CÔNG!</strong> Bạn ngạo nghễ đạp lôi phạt dưới chân, đúc thành cảnh giới dị thường <strong class="text-yellow-300">[${player.realm}]</strong>! Thọ mệnh tối đa tăng thêm <strong>+${targetRealm.ageBonus} năm</strong>!`, "bg-gradient-to-r from-amber-950 to-purple-950 border-amber-400 text-yellow-200 font-bold text-sm");
    document.getElementById("btnBreakthrough").classList.add("hidden");
  } else {
    // Thất bại: Tạp chất càng cao, tỷ lệ nổ tung chết càng lớn
    playEffect("blood");
    playEffect("shake");
    const fatalChance = 0.25 + (player.toxicity / 180);
    if (Math.random() < fatalChance) {
      die(`Đột phá thất bại, Tạp chất ma lực (${player.toxicity} điểm) bạo tẩu nổ tan đan điền`);
      return;
    } else {
      player.health -= 50;
      player.exp = Math.floor(player.maxExp * 0.4);
      player.toxicity = Math.min(100, player.toxicity + 15);
      addLog(`⚡ Lôi kiếp quá mạnh kết hợp Tạp chất bạo động! Đột phá thất bại, đan điền rạn nứt! Mất 50% Máu, Tu vi tụt giảm và Tạp Chất tăng thêm!`, "text-red-400 font-bold");
    }
  }
  updateUI();
}

// ==========================================
// TỬ VONG & HỆ THỐNG KẾ THỪA THẾ HỆ (LEGACY)
// ==========================================
export function die(reason) {
  if (player.tags.includes("perk_mien_tu")) {
    player.tags = player.tags.filter(t => t !== "perk_mien_tu");
    player.health = 50;
    playEffect("heal");
    addLog(`🛡️ <strong>BẢO MỆNH THẦN PHÙ PHÁT ĐỘNG!</strong> Thần thú hộ thân xé rách hư không đỡ thay bạn một đòn tử mạng! Bạn may mắn thoát chết, hồi sinh 50% sinh lực!`, "bg-emerald-950 border-emerald-400 text-emerald-200 font-bold");
    updateUI();
    renderNextYearButton();
    return;
  }

  // 1. Cảnh giới tu vi (Thành tựu chính):
  // Phàm Nhân: 1 | Luyện Khí: 4 | Trúc Cơ: 9 | Kim Đan: 16 | Nguyên Anh: 26 | Hóa Thần: 40
  const realmKarmaMap = [1, 4, 9, 16, 26, 40];
  const realmKarma = realmKarmaMap[player.realmIndex] || 1;

  // 2. Thọ mệnh (Tuổi thọ rèn luyện): 1 điểm mỗi 15 năm tuổi
  const ageKarma = Math.floor(player.age / 15);

  // 3. Tài phú (Linh thạch chuyển hóa): 1 điểm mỗi 250 Linh Thạch, tối đa 8 điểm (tránh lạm phát tiền chợ)
  const moneyKarma = Math.min(8, Math.floor(player.money / 250));

  // 4. Chiến tích Diệt Boss / Ma Vương: 4 điểm mỗi Boss
  const bossKarma = (player.bossKills || []).length * 4;

  // 5. Thần Binh thu thập: 1 điểm mỗi vũ khí, tối đa 5 điểm
  const weaponKarma = Math.min(5, (player.weapons || []).length);

  // 6. Thế hệ huyết mạch gia tộc: 1 điểm mỗi con, tối đa 3 điểm
  const childrenKarma = Math.min(3, (player.children || []).length);

  const earnedKarma = Math.max(2, realmKarma + ageKarma + moneyKarma + bossKarma + weaponKarma + childrenKarma);
  accumulatedKarma += earnedKarma;
  localStorage.setItem("tu_tien_karma", accumulatedKarma);

  document.getElementById("deathCause").textContent = reason;
  document.getElementById("modalGen").textContent = `Đời thứ ${player.gen}`;
  document.getElementById("modalFinalAge").textContent = `${player.age} tuổi`;
  document.getElementById("modalFinalRealm").textContent = player.realm;
  document.getElementById("modalFinalWealth").textContent = `${player.money} Linh Thạch`;
  document.getElementById("modalEarnedKarma").textContent = `+${earnedKarma} ☯`;

  const inheritBtn = document.getElementById("btnInheritChild");
  if (player.children.length > 0) {
    const heir = player.children[0];
    document.getElementById("modalHeirText").textContent = `${heir.name} (${heir.age} tuổi)`;
    inheritBtn.classList.remove("hidden");
  } else {
    document.getElementById("modalHeirText").textContent = "Không có con (Tuyệt tự)";
    inheritBtn.classList.add("hidden");
  }

  // Nút Chọn Di Sản Luân Hồi: hiển thị nếu có Vũ Khí hoặc Tag Đột Biến
  const legacyBtn = document.getElementById("btnSelectLegacy");
  const hasWeapons = player.weapons && player.weapons.length > 0;
  const hasMutationTags = (player.tags || []).some(t => 
    t.startsWith("dot_bien_") || 
    t.includes("huyet_nhuc") || 
    t.includes("xuc_tu") || 
    t.includes("cuong_no") || 
    t.includes("da_nhan") ||
    t.includes("gai_nhon") ||
    t.includes("ma_hoa") ||
    t.includes("bien_di")
  );
  if (legacyBtn) {
    if (hasWeapons || hasMutationTags) {
      legacyBtn.classList.remove("hidden");
    } else {
      legacyBtn.classList.add("hidden");
    }
  }

  document.getElementById("deathModal").classList.remove("hidden");
}

// Chơi tiếp cuộc đời đứa con
export function inheritChildLife() {
  document.getElementById("deathModal").classList.add("hidden");
  const heir = player.children[0];
  generationCount += 1;

  const inheritedMoney = player.money;
  const inheritedEstate = player.estate;
  const inheritedMount = player.mount;
  const inheritedWeapons = [...player.weapons];
  const inheritedGrudges = [...player.grudges];

  // Khởi tạo đời con
  player.name = heir.name;
  player.gen = generationCount;
  player.age = heir.age;
  player.maxAge = 80;
  player.health = 100;
  player.root = heir.root;
  player.intell = heir.intell;
  player.luck = 60;
  player.money = inheritedMoney;
  player.realmIndex = 0;
  player.realm = "Phàm Nhân";
  player.exp = 0;
  player.maxExp = 100;
  player.faction = null;
  player.estate = inheritedEstate;
  player.mount = inheritedMount;
  player.job = null;
  player.tags = ["the_he_ke_thua"];
  player.spouse = null;
  player.children = [];
  player.weapons = inheritedWeapons;
  player.grudges = inheritedGrudges; // Thừa kế cả sổ thù vặt của cha!
  player.hiddenFlags = {};
  player.bossKills = [];
  player.seenEvents = new Set();
  player.isHumanoid = true;
  player.toxicity = 0;

  window.player = player;

  const container = document.getElementById("logContainer");
  container.innerHTML = "";

  updateUI();
  playEffect("gold");

  addLog(`✨ <strong>KẾ THỪA GIA TỘC ĐỜI THỨ ${generationCount}!</strong><br/>Bạn nhập hồn tiếp quản thân xác người con <strong class="text-amber-300">${player.name}</strong> (${player.age} tuổi)! Thừa kế nguyên vẹn <strong>${player.money} Linh Thạch</strong>, Động phủ <strong>[${player.estate.name}]</strong>, Tọa kỵ <strong>[${player.mount.name}]</strong>, <strong>${player.weapons.length} Thần Binh</strong> và toàn bộ sổ thù vặt gia tộc!`, "bg-[#0f3460] border-amber-400 text-amber-100 font-bold");

  renderNextYearButton();
}

export function reincarnateNewLife() {
  document.getElementById("deathModal").classList.add("hidden");
  generationCount = 1;
  activePerks.clear();
  selectedOrigin = originsPool.find(o => o.id === "origin_phe_vat") || originsPool[14] || originsPool[0];
  player.weapons = [];
  document.getElementById("startScreen").classList.remove("hidden");
  switchStartTab('vessels');
  renderOriginSelection();
  updateLegacyBannerUI();
  playEffect("gold");
}

// ==========================================
// HỆ THỐNG DI SẢN LUÂN HỒI (LEGACY SYSTEM)
// ==========================================
export function openLegacyModal() {
  const modal = document.getElementById("legacyModal");
  if (!modal) return;

  const currentLegacy = JSON.parse(localStorage.getItem("tu_tien_legacy") || "null");
  const statusEl = document.getElementById("legacyActiveStatus");
  if (statusEl) {
    if (currentLegacy) {
      statusEl.innerHTML = `🌟 Đang mang Di Sản: <strong class="text-amber-300">${currentLegacy.name}</strong> (${currentLegacy.type === 'weapon' ? '⚔️ Thần Binh' : '☣️ Tag Đột Biến'})`;
    } else {
      statusEl.innerHTML = `<span class="text-slate-400">Chưa chọn di sản nào</span>`;
    }
  }

  // Render Weapons
  const wpContainer = document.getElementById("legacyWeaponList");
  wpContainer.innerHTML = "";
  if (!player.weapons || player.weapons.length === 0) {
    wpContainer.innerHTML = `<div class="text-[11px] text-slate-500 italic p-1">Không có vũ khí nào trong kho đồ.</div>`;
  } else {
    player.weapons.forEach(w => {
      const isSelected = currentLegacy && currentLegacy.type === 'weapon' && currentLegacy.id === w.id;
      const btn = document.createElement("div");
      btn.className = `p-2 rounded-xl border text-left text-xs flex justify-between items-center transition ${isSelected ? 'bg-amber-950/60 border-amber-400 text-amber-200' : 'bg-[#0f3460]/40 border-slate-700 text-slate-300'}`;
      btn.innerHTML = `
        <div>
          <div class="font-bold ${isSelected ? 'text-amber-300' : 'text-slate-200'}">⚔️ ${w.name} ${isSelected ? '✅ (Đã chọn)' : ''}</div>
          <div class="text-[10px] text-slate-400">Sát thương: +${w.power}</div>
        </div>
        <button onclick="selectLegacyWeapon('${w.id}')" class="text-[10px] px-2.5 py-1 ${isSelected ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-amber-600 hover:bg-amber-500'} text-white rounded font-bold transition">
          ${isSelected ? 'Đang Chọn' : 'Lưu Di Sản'}
        </button>
      `;
      wpContainer.appendChild(btn);
    });
  }

  // Render Mutation Tags
  const tagContainer = document.getElementById("legacyTagList");
  tagContainer.innerHTML = "";
  const mutationTags = (player.tags || []).filter(t => 
    t.startsWith("dot_bien_") || 
    t.includes("huyet_nhuc") || 
    t.includes("xuc_tu") || 
    t.includes("cuong_no") || 
    t.includes("da_nhan") ||
    t.includes("gai_nhon") ||
    t.includes("ma_hoa") ||
    t.includes("bien_di")
  );

  if (mutationTags.length === 0) {
    tagContainer.innerHTML = `<div class="text-[11px] text-slate-500 italic p-1">Không sở hữu Tag đột biến ma dị nào.</div>`;
  } else {
    mutationTags.forEach(t => {
      const isSelected = currentLegacy && currentLegacy.type === 'tag' && currentLegacy.tag === t;
      const tagNameMap = {
        "dot_bien_xuc_tu": "🐙 Xúc Tu Ma Dị",
        "huyet_nhuc_muc_nat": "🩸 Huyết Nhục Mục Nát",
        "dot_bien_cuong_no": "🔥 Cuồng Nộ Ma Huyết",
        "dot_bien_da_nhan": "👁️ Vạn Nhãn Ma Thần",
        "dot_bien_gai_nhon": "🦔 Giáp Gai Thâm Uyên",
        "dot_bien_canh_doi": "🦇 Cánh Dơi Huyết Tộc",
        "dot_bien_sung_ma": "😈 Ma Sừng Hỗn Mang"
      };
      const displayName = tagNameMap[t] || t;
      const btn = document.createElement("div");
      btn.className = `p-2 rounded-xl border text-left text-xs flex justify-between items-center transition ${isSelected ? 'bg-purple-950/60 border-purple-400 text-purple-200' : 'bg-[#0f3460]/40 border-slate-700 text-slate-300'}`;
      btn.innerHTML = `
        <div>
          <div class="font-bold ${isSelected ? 'text-purple-300' : 'text-slate-200'}">☣️ ${displayName} ${isSelected ? '✅ (Đã chọn)' : ''}</div>
          <div class="text-[10px] text-slate-400">Tag: ${t}</div>
        </div>
        <button onclick="selectLegacyTag('${t}')" class="text-[10px] px-2.5 py-1 ${isSelected ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-purple-600 hover:bg-purple-500'} text-white rounded font-bold transition">
          ${isSelected ? 'Đang Chọn' : 'Lưu Di Sản'}
        </button>
      `;
      tagContainer.appendChild(btn);
    });
  }

  modal.classList.remove("hidden");
}

export function selectLegacyWeapon(weaponId) {
  const w = (player.weapons || []).find(item => item.id === weaponId) || weaponsDB.find(item => item.id === weaponId);
  if (!w) return;
  const legacyObj = {
    type: "weapon",
    id: w.id,
    name: w.name,
    power: w.power || 35,
    cost: w.cost || 100,
    rarity: w.rarity || "Thần Binh"
  };
  localStorage.setItem("tu_tien_legacy", JSON.stringify(legacyObj));
  playEffect("gold");
  openLegacyModal();
  updateLegacyBannerUI();
}

export function selectLegacyTag(tagId) {
  const tagNameMap = {
    "dot_bien_xuc_tu": "🐙 Xúc Tu Ma Dị",
    "huyet_nhuc_muc_nat": "🩸 Huyết Nhục Mục Nát",
    "dot_bien_cuong_no": "🔥 Cuồng Nộ Ma Huyết",
    "dot_bien_da_nhan": "👁️ Vạn Nhãn Ma Thần",
    "dot_bien_gai_nhon": "🦔 Giáp Gai Thâm Uyên",
    "dot_bien_canh_doi": "🦇 Cánh Dơi Huyết Tộc",
    "dot_bien_sung_ma": "😈 Ma Sừng Hỗn Mang"
  };
  const legacyObj = {
    type: "tag",
    tag: tagId,
    name: tagNameMap[tagId] || tagId
  };
  localStorage.setItem("tu_tien_legacy", JSON.stringify(legacyObj));
  playEffect("lightning");
  openLegacyModal();
  updateLegacyBannerUI();
}

export function clearLegacyItem() {
  localStorage.removeItem("tu_tien_legacy");
  updateLegacyBannerUI();
  const statusEl = document.getElementById("legacyActiveStatus");
  if (statusEl) statusEl.innerHTML = `<span class="text-slate-400">Đã gỡ bỏ di sản</span>`;
}

export function updateLegacyBannerUI() {
  const legacy = JSON.parse(localStorage.getItem("tu_tien_legacy") || "null");
  const banner = document.getElementById("startLegacyBanner");
  const nameEl = document.getElementById("startLegacyName");
  if (banner && nameEl) {
    if (legacy) {
      nameEl.textContent = `${legacy.name} (${legacy.type === 'weapon' ? '⚔️ Thần Binh' : '☣️ Tag Đột Biến'})`;
      banner.classList.remove("hidden");
    } else {
      banner.classList.add("hidden");
    }
  }
}

// ==========================================
// UI MODAL HANDLERS
// ==========================================
export function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
}

export function openEstateModal() {
  if (player.age < 18) return;
  const list = document.getElementById("estateList");
  list.innerHTML = "";
  estatesDB.forEach(est => {
    const isOwned = player.estate.id === est.id;
    const div = document.createElement("div");
    div.className = `p-2.5 rounded-xl border flex justify-between items-center ${isOwned ? 'bg-amber-950/40 border-amber-400' : 'bg-[#0f3460]/40 border-slate-700'}`;
    div.innerHTML = `
      <div>
        <div class="font-bold text-amber-300">${est.name} ${isOwned ? '✅ (Đang ở)' : ''}</div>
        <div class="text-[10px] text-slate-300">${est.desc}</div>
      </div>
      <div class="text-right">
        <div class="font-mono text-yellow-300 font-bold text-xs">${est.cost > 0 ? est.cost + ' 🪙' : 'Miễn phí'}</div>
        ${!isOwned ? `<button onclick="buyEstate('${est.id}')" class="mt-1 px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-[10px] rounded">Mua</button>` : ''}
      </div>
    `;
    list.appendChild(div);
  });
  document.getElementById("estateModal").classList.remove("hidden");
}

export function buyEstate(id) {
  const est = estatesDB.find(e => e.id === id);
  if (player.money >= est.cost) {
    player.money -= est.cost;
    player.estate = est;
    playEffect("gold");
    addLog(`🏡 Bạn đã mua thành công Động Phủ: <strong>[${est.name}]</strong>! Tốc độ tu luyện tăng vọt!`, "text-amber-300 font-bold");
    updateUI();
    openEstateModal();
  } else {
    alert("Không đủ Linh Thạch!");
  }
}

export function cultivateInEstate() {
  if (player.money < 20) {
    alert("Cần ít nhất 20 Linh Thạch để mua tụ linh phù bế quan!");
    return;
  }
  player.money -= 20;
  player.exp += 60;
  playEffect("gold");
  if (player.exp >= player.maxExp) {
    player.exp = player.maxExp;
    document.getElementById("btnBreakthrough").classList.remove("hidden");
  }
  addLog(`🧘 <strong>BẾ QUAN TỊNH TU!</strong> Đóng cửa động phủ một năm chuyên tâm ngưng tụ chân khí: Nhận <strong>+60 EXP Tu Vi</strong> (Tốn 20 Linh Thạch)!`, "text-amber-300 font-bold");
  updateUI();
  closeModal("estateModal");
}

export function openMountModal() {
  if (player.age < 18) return;
  const list = document.getElementById("mountList");
  list.innerHTML = "";
  mountsDB.forEach(m => {
    const isOwned = player.mount.id === m.id;
    const div = document.createElement("div");
    div.className = `p-2.5 rounded-xl border flex justify-between items-center ${isOwned ? 'bg-cyan-950/40 border-cyan-400' : 'bg-[#0f3460]/40 border-slate-700'}`;
    div.innerHTML = `
      <div>
        <div class="font-bold text-cyan-300">${m.name} ${isOwned ? '✅ (Đang cưỡi)' : ''}</div>
        <div class="text-[10px] text-slate-300">${m.desc}</div>
      </div>
      <div class="text-right">
        <div class="font-mono text-yellow-300 font-bold text-xs">${m.cost > 0 ? m.cost + ' 🪙' : 'Miễn phí'}</div>
        ${!isOwned ? `<button onclick="buyMount('${m.id}')" class="mt-1 px-2.5 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-[10px] rounded">Mua</button>` : ''}
      </div>
    `;
    list.appendChild(div);
  });
  document.getElementById("mountModal").classList.remove("hidden");
}

export function buyMount(id) {
  const m = mountsDB.find(e => e.id === id);
  if (player.money >= m.cost) {
    player.money -= m.cost;
    player.mount = m;
    playEffect("gold");
    addLog(`🐎 Bạn đã tậu thành công Tọa Kỵ: <strong>[${m.name}]</strong>! Khả năng tẩu thoát nâng lên ${Math.round(m.escapeRate * 100)}%!`, "text-cyan-300 font-bold");
    updateUI();
    openMountModal();
  } else {
    alert("Không đủ Linh Thạch!");
  }
}

export function raceMount() {
  if (player.money < 30) {
    alert("Cần 30 Linh Thạch tiền vé cược giải đua xe phù chú!");
    return;
  }
  player.money -= 30;
  const winRate = 0.45 + (player.mount.escapeRate * 0.3);
  if (Math.random() < winRate) {
    player.money += 90;
    playEffect("lightning");
    addLog(`🏁 <strong>VÔ ĐỊCH TỐC ĐỘ!</strong> Cưỡi <strong>[${player.mount.name}]</strong> drift khét lẹt bỏ xa đối thủ, ẵm trọn giải thưởng <strong>+90 Linh Thạch</strong>!`, "text-yellow-300 font-black");
  } else {
    player.health = Math.max(1, player.health - 12);
    playEffect("shake");
    addLog(`💥 <strong>TAI NẠN ĐUA XE!</strong> Xe bị trượt bánh lật nhào vào bụi gai! Mất 30 Linh Thạch cược và tổn thất 12% Sức Khỏe!`, "text-red-400 font-bold");
  }
  updateUI();
  closeModal("mountModal");
}

// ==========================================
// UI HANDLERS: KHO THẦN BINH & VŨ KHÍ DỊ GIỚI
// ==========================================
let currentWeaponTab = 'owned';
export function openWeaponModal() {
  if (player.age < 18) return;
  switchWeaponTab(currentWeaponTab);
  document.getElementById("weaponModal").classList.remove("hidden");
}

export function switchWeaponTab(tab) {
  currentWeaponTab = tab;
  const ownedBtn = document.getElementById("tabOwnedWeaponBtn");
  const marketBtn = document.getElementById("tabMarketWeaponBtn");
  const content = document.getElementById("weaponListContent");
  document.getElementById("ownedWeaponCountBadge").textContent = player.weapons.length;
  content.innerHTML = "";

  if (tab === 'owned') {
    ownedBtn.className = "flex-1 py-1.5 font-bold text-red-400 border-b-2 border-red-500";
    marketBtn.className = "flex-1 py-1.5 font-bold text-slate-400 hover:text-yellow-300";

    if (player.weapons.length === 0) {
      content.innerHTML = `<div class="text-slate-400 text-center py-6 text-xs">Chưa sở hữu thần binh nào. Hãy ghé tab Chợ Đen Thần Binh hoặc thám hiểm Bí Cảnh săn Ma Vương để thu thập!</div>`;
    } else {
      player.weapons.forEach((wp, idx) => {
        const div = document.createElement("div");
        div.className = "p-2.5 rounded-xl border border-red-500/50 bg-red-950/30 flex justify-between items-center";
        div.innerHTML = `
          <div class="flex items-center gap-2">
            <span class="text-2xl">${wp.icon}</span>
            <div>
              <div class="font-bold text-amber-300 text-xs">${wp.name}</div>
              <div class="text-[10px] text-slate-300">${wp.desc}</div>
            </div>
          </div>
          <div class="text-right shrink-0 ml-2">
            <span class="text-rose-400 font-mono font-bold text-xs block">+${wp.power} Lực</span>
            <button onclick="upgradeWeapon(${idx})" class="mt-1 px-2 py-0.5 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold text-[10px] rounded shadow">Rèn +1 (50 🪙)</button>
          </div>
        `;
        content.appendChild(div);
      });
    }
  } else {
    marketBtn.className = "flex-1 py-1.5 font-bold text-yellow-300 border-b-2 border-yellow-500";
    ownedBtn.className = "flex-1 py-1.5 font-bold text-slate-400 hover:text-red-400";

    weaponsDB.forEach(wp => {
      const isOwned = player.weapons.some(w => w.id === wp.id);
      const div = document.createElement("div");
      div.className = `p-2.5 rounded-xl border flex justify-between items-center ${isOwned ? 'bg-amber-950/40 border-amber-400' : 'bg-[#0f3460]/40 border-slate-700'}`;
      div.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="text-2xl">${wp.icon}</span>
          <div>
            <div class="font-bold text-slate-100 text-xs">${wp.name} ${isOwned ? '✅ (Đã mua)' : ''}</div>
            <div class="text-[10px] text-slate-300">${wp.desc}</div>
          </div>
        </div>
        <div class="text-right shrink-0 ml-2">
          <div class="font-mono text-yellow-300 font-bold text-xs">${wp.cost} 🪙</div>
          ${!isOwned ? `<button onclick="buyWeapon('${wp.id}')" class="mt-1 px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white font-bold text-[10px] rounded shadow">Mua</button>` : ''}
        </div>
      `;
      content.appendChild(div);
    });
  }
}

export function buyWeapon(id) {
  const wp = weaponsDB.find(w => w.id === id);
  if (player.money >= wp.cost) {
    player.money -= wp.cost;
    player.weapons.push(wp);
    player.root += Math.floor(wp.power / 4);
    playEffect("gold");
    addLog(`🗡️ Bạn đã mua thành công Thần Binh: <strong>[${wp.name}]</strong>! Căn cốt và chiến lực tăng mạnh!`, "text-yellow-300 font-bold");
    updateUI();
    switchWeaponTab('market');
  } else {
    alert("Không đủ Linh Thạch!");
  }
}

export function upgradeWeapon(idx) {
  if (player.money < 50) {
    alert("Cần 50 Linh Thạch để mua khoáng thạch nâng cấp!");
    return;
  }
  player.money -= 50;
  const wp = player.weapons[idx];
  wp.power += 15;
  player.root += 3;
  wp.name = wp.name.includes("+") ? wp.name.replace(/\+(\d+)/, (m, c) => `+${parseInt(c)+1}`) : `${wp.name} +1`;
  playEffect("lightning");
  addLog(`🔨 <strong>CƯỜNG HÓA THÀNH CÔNG!</strong> Đập đá rèn lại <strong>[${wp.name}]</strong>: Chiến lực tăng vọt lên +${wp.power}! Căn cốt +3!`, "text-amber-300 font-bold");
  updateUI();
  switchWeaponTab('owned');
}

export function openJobModal() {
  if (player.age < 18) return;
  const list = document.getElementById("jobList");
  list.innerHTML = "";
  jobsDB.forEach(j => {
    const isCurrent = player.job && player.job.id === j.id;
    const div = document.createElement("div");
    div.className = `p-2.5 rounded-xl border flex justify-between items-center ${isCurrent ? 'bg-emerald-950/40 border-emerald-400' : 'bg-[#0f3460]/40 border-slate-700'}`;
    div.innerHTML = `
      <div>
        <div class="font-bold text-emerald-300">${j.title} ${isCurrent ? '✅ (Nghề hiện tại)' : ''}</div>
        <div class="text-[10px] text-slate-300">${j.desc}</div>
      </div>
      <div class="text-right">
        ${!isCurrent ? `<button onclick="applyJob('${j.id}')" class="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-[10px] rounded">Hành Nghề</button>` : ''}
      </div>
    `;
    list.appendChild(div);
  });
  document.getElementById("jobModal").classList.remove("hidden");
}

export function applyJob(id) {
  const j = jobsDB.find(e => e.id === id);
  player.job = j;
  playEffect("gold");
  addLog(`💼 Bạn chính thức bắt đầu hành nghề: <strong>[${j.title}]</strong>! Lương hàng năm: +${j.salary} Linh Thạch.`, "text-emerald-300 font-bold");
  updateUI();
  closeModal("jobModal");
}

export function overtimeJob() {
  if (!player.job) {
    alert("Bạn chưa nhận nghề nào! Hãy chọn một nghề trước khi tăng ca.");
    return;
  }
  player.money += 60;
  playEffect("gold");
  if (Math.random() < 0.22) {
    player.health = Math.max(1, player.health - 15);
    playEffect("shake");
    addLog(`⚠️ <strong>TĂNG CA BỊ THƯƠNG:</strong> Thức đêm tăng ca vị trí <strong>${player.job.title}</strong> nhận thêm <strong>+60 Linh Thạch</strong> nhưng cơ thể quá tải mất 15% Sức Khỏe!`, "text-yellow-300 font-bold");
  } else {
    addLog(`🔥 <strong>TĂNG CA THUẬN LỢI:</strong> Cày thêm cuốc đêm kiếm trọn <strong>+60 Linh Thạch</strong> ngon lành!`, "text-emerald-300 font-bold");
  }
  updateUI();
  closeModal("jobModal");
}

export function openFamilyModal() {
  if (player.age < 18) return;
  switchFamilyTab('kin');
  document.getElementById("familyModal").classList.remove("hidden");
}

export function switchFamilyTab(tab) {
  const kinBtn = document.getElementById("tabKinBtn");
  const grudgeBtn = document.getElementById("tabGrudgeBtn");
  const content = document.getElementById("familyTabContent");
  content.innerHTML = "";

  if (tab === 'kin') {
    kinBtn.className = "flex-1 py-1.5 font-bold text-pink-300 border-b-2 border-pink-500";
    grudgeBtn.className = "flex-1 py-1.5 font-bold text-slate-400 hover:text-red-400";
    
    // Render nút tương tác Đạo lữ
    if (!player.spouse) {
      const matchBtn = document.createElement("button");
      matchBtn.className = "w-full py-2 px-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 active:scale-[0.98] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow mb-3";
      matchBtn.innerHTML = `<span>🌸</span> ĐI XEM MẮT TÌM ĐẠO LỮ DỊ GIỚI (Tốn 30 🪙)`;
      matchBtn.onclick = goMatchmaking;
      content.appendChild(matchBtn);
    } else {
      const loveBtn = document.createElement("button");
      loveBtn.className = "w-full py-2 px-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 active:scale-[0.98] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow mb-3";
      loveBtn.innerHTML = `<span>💕</span> THÂN MẬT VỚI ĐẠO LỮ & SINH CON NỐI DÕI`;
      loveBtn.onclick = makeLoveWithSpouse;
      content.appendChild(loveBtn);
    }

    // Render Đạo lữ
    const spouseCard = document.createElement("div");
    spouseCard.className = "p-2.5 bg-[#0f3460]/50 rounded-xl border border-pink-500/40";
    if (player.spouse) {
      spouseCard.innerHTML = `
        <div class="font-bold text-pink-300 text-xs flex items-center gap-1"><span>👰</span> Đạo Lữ: ${player.spouse.name}</div>
        <div class="text-[10px] text-slate-300 mt-0.5">Cảnh giới: ${player.spouse.realm} • Thân mật: ${player.spouse.affection}/100</div>
      `;
    } else {
      spouseCard.innerHTML = `<div class="text-slate-400 text-center py-2 text-xs">Chưa kết duyên Đạo Lữ. Hãy bấm nút Xem Mắt ở trên!</div>`;
    }
    content.appendChild(spouseCard);

    // Render Con cái
    const childTitle = document.createElement("div");
    childTitle.className = "font-bold text-xs text-amber-300 mt-3 mb-1 flex items-center gap-1";
    childTitle.innerHTML = `<span>👶</span> Hậu Duệ Nối Dõi Tông Đường (${player.children.length}):`;
    content.appendChild(childTitle);

    if (player.children.length === 0) {
      content.innerHTML += `<div class="text-slate-400 text-[11px] text-center py-3 bg-[#0f3460]/20 rounded-xl border border-slate-700/50">Chưa có con cái nối dõi. Thân mật cùng đạo lữ để sinh con kế thừa di sản!</div>`;
    } else {
      player.children.forEach(c => {
        const cDiv = document.createElement("div");
        cDiv.className = "p-2 bg-[#0f3460]/30 rounded-lg border border-slate-700 flex justify-between items-center mb-1.5";
        cDiv.innerHTML = `
          <div>
            <strong class="text-slate-200 text-xs">${c.name}</strong>
            <div class="text-[10px] text-slate-400">Tuổi: ${c.age} | Căn cốt: ${c.root} | Ngộ tính: ${c.intell}</div>
          </div>
          <span class="text-[10px] text-emerald-400 font-bold self-center bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">Người thừa kế</span>
        `;
        content.appendChild(cDiv);
      });
    }
  } else {
    grudgeBtn.className = "flex-1 py-1.5 font-bold text-red-400 border-b-2 border-red-500";
    kinBtn.className = "flex-1 py-1.5 font-bold text-slate-400 hover:text-pink-300";

    if (player.grudges.length === 0) {
      content.innerHTML = `<div class="text-slate-400 text-center py-6 text-xs">Tâm cảnh quang minh, không có kẻ thù nào ghi trong sổ thù vặt!</div>`;
    } else {
      player.grudges.forEach(g => {
        const gDiv = document.createElement("div");
        gDiv.className = "p-2.5 bg-red-950/40 rounded-xl border border-red-700/60 flex justify-between items-center mb-1.5";
        gDiv.innerHTML = `
          <div>
            <strong class="text-red-300 text-xs">${g.name}</strong>
            <div class="text-[10px] text-slate-400">Oán hận: ${g.reason}</div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-[10px] text-red-400 font-mono font-bold">Lực: ${g.powerLevel}</span>
            <button onclick="challengeGrudge('${g.id}')" class="px-2 py-1 bg-red-700 hover:bg-red-600 text-white font-bold text-[10px] rounded shadow">Tử Chiến</button>
          </div>
        `;
        content.appendChild(gDiv);
      });
    }
  }
}

export function goMatchmaking() {
  if (player.money < 30) {
    alert("Cần ít nhất 30 Linh Thạch tiền trà nước sính lễ để đi xem mắt!");
    return;
  }
  player.money -= 30;

  const suitors = [
    { name: "Tiêu Dao Nữ Kiếm Tiên", realm: "Trúc Cơ", desc: "Băng thanh ngọc khiết, kiếm pháp tuyệt trần, xuất thân danh môn." },
    { name: "Artoria - Nữ Hiệp Sĩ Paladin Tóc Vàng", realm: "Thánh Điện", desc: "Thánh kỵ sĩ Tây Phương, mê đồ ăn Tiên Giới, bảo vệ phu quân tuyệt đối." },
    { name: "Dạ Linh - Ma Tộc Tiểu Ma Nữ", realm: "Hắc Ám", desc: "Cực kỳ cá tính, thích uống trà sữa linh dược, tính tình bướng bỉnh đáng yêu." },
    { name: "Tiểu Kiều - Cô Bé Bán Đan Dược Đa Cấp", realm: "Luyện Khí", desc: "Khéo ăn khéo nói, tính toán làm ăn đại tài, mỗi năm phụ giúp 40 Linh Thạch." }
  ];

  const suitor = suitors[Math.floor(Math.random() * suitors.length)];
  player.spouse = { name: suitor.name, affection: 85, realm: suitor.realm };
  playEffect("heal");
  addLog(`🌸 <strong>HỶ SỰ LÂM MÔN:</strong> Đi xem mắt thành công! Bạn kết duyên Đạo Lữ với <strong class="text-pink-300">${suitor.name}</strong> (${suitor.desc})!`, "bg-pink-950/60 border-pink-500/60 text-pink-200 font-bold");
  updateUI();
  switchFamilyTab('kin');
}

export function makeLoveWithSpouse() {
  if (!player.spouse) return;
  player.spouse.affection = Math.min(100, player.spouse.affection + 10);
  playEffect("heal");
  addLog(`💕 Một đêm xuân tình nồng thắm cùng Đạo Lữ <strong>${player.spouse.name}</strong>! Tình cảm tăng lên ${player.spouse.affection}/100!`, "text-pink-300 font-bold");

  if (player.children.length < 5 && Math.random() < 0.75) {
    const surName = player.name.split(" ")[0] || "Lâm";
    const childNames = ["Vô Song", "Thiên Mệnh", "Tuyết Nhi", "Huyền Anh", "Nhất Đao", "Tiểu Linh"];
    const childName = `${surName} ${childNames[Math.floor(Math.random() * childNames.length)]}`;
    const newChild = {
      name: childName,
      age: 0,
      root: Math.floor(player.root * 0.8) + Math.floor(Math.random() * 20),
      intell: Math.floor(player.intell * 0.8) + Math.floor(Math.random() * 20)
    };
    player.children.push(newChild);
    playEffect("gold");
    addLog(`👶 <strong>HẠ SINH QUÝ TỬ:</strong> Đạo lữ đã hạ sinh cho bạn một hài nhi khôi ngô tuấn tú đặt tên là <strong class="text-amber-300">${newChild.name}</strong> (Căn cốt: ${newChild.root}, Ngộ tính: ${newChild.intell})! Gia tộc ngày càng hưng thịnh!`, "bg-amber-950/80 border-amber-400 text-yellow-200 font-black");
  }
  updateUI();
  switchFamilyTab('kin');
}

export function challengeGrudge(id) {
  closeModal("familyModal");
  const targetEnemy = player.grudges.find(g => g.id === id);
  if (targetEnemy) {
    triggerGrudgeRevengeEvent();
  }
}

// ==========================================
// CẬP NHẬT UI
// ==========================================
export function updateUI() {
  const iconEl = document.getElementById("uiOriginIcon");
  if (iconEl && selectedOrigin) iconEl.textContent = selectedOrigin.icon;
  const nameEl = document.getElementById("uiPlayerName");
  if (nameEl) nameEl.textContent = `${player.name} (Đời ${player.gen})`;
  const factionEl = document.getElementById("uiFactionBadge");
  if (factionEl) factionEl.textContent = player.faction || "Chưa gia nhập phe phái";
  const realmEl = document.getElementById("uiRealmBadge") || document.getElementById("uiRealm");
  if (realmEl) realmEl.textContent = player.realm;
  const ageEl = document.getElementById("uiAge");
  if (ageEl) ageEl.textContent = player.age;
  const maxAgeEl = document.getElementById("uiMaxAge");
  if (maxAgeEl) maxAgeEl.textContent = player.maxAge;

  const rootEl = document.getElementById("uiRoot");
  if (rootEl) rootEl.textContent = player.root;
  const intellEl = document.getElementById("uiIntell");
  if (intellEl) intellEl.textContent = player.intell;
  const luckEl = document.getElementById("uiLuck");
  if (luckEl) luckEl.textContent = player.luck;
  const healthEl = document.getElementById("uiHealth");
  if (healthEl) healthEl.textContent = `${player.health}%`;
  const moneyEl = document.getElementById("uiMoney");
  if (moneyEl) moneyEl.textContent = player.money;

  const estEl = document.getElementById("uiEstateName") || document.getElementById("uiEstateShort");
  if (estEl && player.estate) estEl.textContent = player.estate.name.split(" ")[0] || "Động Phủ";
  const mntEl = document.getElementById("uiMountName") || document.getElementById("uiMountShort");
  if (mntEl && player.mount) mntEl.textContent = player.mount.name.split(" ")[0] || "Tọa Kỵ";
  const jobEl = document.getElementById("uiJobName") || document.getElementById("uiJobShort");
  if (jobEl) jobEl.textContent = player.job ? player.job.title.split(" ")[0] : "Chưa có";
  
  const wpEl = document.getElementById("uiWeaponCountText") || document.getElementById("uiWeaponCount");
  if (wpEl) wpEl.textContent = `${player.weapons.length} Thần Binh`;
  const famEl = document.getElementById("uiFamilyCountText") || document.getElementById("uiFamilyShort");
  if (famEl) famEl.textContent = player.spouse ? (player.children.length > 0 ? `${player.children.length} Con` : "Có Đạo Lữ") : "Độc Thân";

  // EXP Bar
  document.getElementById("uiExpText").textContent = `${player.exp}/${player.maxExp}`;
  const pct = Math.min(100, Math.floor((player.exp / player.maxExp) * 100));
  document.getElementById("uiExpBar").style.width = `${pct}%`;

  // Toxicity Bar
  const toxText = document.getElementById("uiToxicityText");
  if (toxText) toxText.textContent = `${player.toxicity || 0}/100`;
  const toxBar = document.getElementById("uiToxicityBar");
  if (toxBar) {
    const toxPct = Math.min(100, Math.max(0, player.toxicity || 0));
    toxBar.style.width = `${toxPct}%`;
  }
  const toxWarn = document.getElementById("uiToxicityWarning");
  if (toxWarn) {
    if ((player.toxicity || 0) >= 70) toxWarn.classList.remove("hidden");
    else toxWarn.classList.add("hidden");
  }
}

export function renderNextYearButton() {
  const container = document.getElementById("optionsContainer");
  if (container) {
    container.innerHTML = "";
    container.classList.add("hidden");
  }

  const btnAgeUp = document.getElementById("btnAgeUp");
  if (btnAgeUp) {
    btnAgeUp.classList.remove("hidden");
    btnAgeUp.disabled = false;
  }

  const statusInd = document.getElementById("statusIndicator");
  if (statusInd) {
    statusInd.textContent = "Sẵn sàng tiến vào năm tiếp theo";
    statusInd.className = "text-[10px] text-emerald-400 font-mono text-center";
  }
}

// Gắn toàn bộ hàm cần dùng từ HTML inline event handlers vào window
window.updateUI = updateUI;
window.renderNextYearButton = renderNextYearButton;
window.advanceYear = advanceYear;
window.startGameWithOrigin = startGameWithOrigin;
window.switchStartTab = switchStartTab;
window.renderOriginSelection = renderOriginSelection;
window.renderPerksSelection = renderPerksSelection;
window.rollReincarnationGacha = rollReincarnationGacha;
window.updateSelectedVesselBanner = updateSelectedVesselBanner;
window.openModal = (id) => document.getElementById(id)?.classList.remove("hidden");
window.closeModal = closeModal;
window.openEstateModal = openEstateModal;
window.buyEstate = buyEstate;
window.cultivateInEstate = cultivateInEstate;
window.openMountModal = openMountModal;
window.buyMount = buyMount;
window.raceMount = raceMount;
window.openWeaponModal = openWeaponModal;
window.switchWeaponTab = switchWeaponTab;
window.buyWeapon = buyWeapon;
window.upgradeWeapon = upgradeWeapon;
window.openJobModal = openJobModal;
window.applyJob = applyJob;
window.overtimeJob = overtimeJob;
window.openFamilyModal = openFamilyModal;
window.switchFamilyTab = switchFamilyTab;
window.goMatchmaking = goMatchmaking;
window.makeLoveWithSpouse = makeLoveWithSpouse;
window.challengeGrudge = challengeGrudge;
window.triggerBreakthrough = triggerBreakthrough;
window.executeBreakthrough = executeBreakthrough;
window.die = die;
window.cleanseToxicity = cleanseToxicity;
window.generateRealmName = generateRealmName;
window.inheritChildLife = inheritChildLife;
window.reincarnateNewLife = reincarnateNewLife;
window.openLegacyModal = openLegacyModal;
window.selectLegacyWeapon = selectLegacyWeapon;
window.selectLegacyTag = selectLegacyTag;
window.clearLegacyItem = clearLegacyItem;
window.updateLegacyBannerUI = updateLegacyBannerUI;

// Khởi tạo màn hình đầu
renderOriginSelection();
updateLegacyBannerUI();
