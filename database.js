// ========================================================
// FILE: database.js
// KHO DỮ LIỆU TĨNH: XUẤT THÂN, BÀN TAY VÀNG, SỰ KIỆN, KINH TẾ
// ========================================================

// ==========================================
// DATA DICTIONARIES: ESTATES & MOUNTS & JOBS
// ==========================================
export const estatesDB = [
  { id: "estate_leu_co", name: "Lều Cỏ Rách Mát Mẻ", cost: 0, expPerYear: 5, desc: "Che nắng không che nổi mưa bão, linh khí nghèo nàn." },
  { id: "estate_nha_go", name: "Nhà Gỗ Sườn Đồi", cost: 150, expPerYear: 15, desc: "Thanh tịnh cách xa trần thế, linh khí ổn định (+15 EXP/năm)." },
  { id: "estate_thach_dong", name: "Thạch Động Linh Tuyền", cost: 600, expPerYear: 40, desc: "Có mạch suối linh tuyền phun trào (+40 EXP/năm)." },
  { id: "estate_tien_gia", name: "Tiên Gia Động Phủ", cost: 2500, expPerYear: 100, desc: "Có hộ sơn trận pháp bảo vệ, đan phòng chuyên dụng (+100 EXP/năm)." },
  { id: "estate_tien_son", name: "Thái Cổ Tiên Sơn", cost: 10000, expPerYear: 300, desc: "Chiếm trọn ngọn núi linh mạch vạn trượng (+300 EXP/năm)." }
];

export const mountsDB = [
  { id: "mount_di_bo", name: "Đi Bộ Hai Chân", cost: 0, escapeRate: 0.1, desc: "Gặp địch chỉ có cách vắt chân lên cổ chạy (10% trốn thoát)." },
  { id: "mount_lua_que", name: "Lừa Què Dị Giới", cost: 50, escapeRate: 0.3, desc: "Chạy chậm nhưng biết đá hậu bất ngờ (30% trốn thoát)." },
  { id: "mount_xe_lan", name: "Xe Lăn Phản Lực Của Lão Tổ", cost: 150, escapeRate: 0.45, desc: "Gắn bùa gia tốc gió xoáy, drift lạng lách thần sầu (45% trốn thoát)." },
  { id: "mount_dream_tau", name: "Xe Dream II Khắc Phù Phản Lực", cost: 200, escapeRate: 0.55, desc: "Xe máy huyền thoại độ bùa gió, vít ga bốc đầu xé gió (55% trốn thoát)." },
  { id: "mount_phi_kiem_sat", name: "Phi Kiếm Hắc Thiết", cost: 400, escapeRate: 0.65, desc: "Ngự kiếm phi hành lướt mây lướt gió (65% trốn thoát)." },
  { id: "mount_tham_bay", name: "Thảm Bay Ma Thuật Nghìn Lẻ Một Đêm", cost: 750, escapeRate: 0.75, desc: "Pháp bảo bay Tây Phương êm ái xuyên qua rừng núi (75% trốn thoát)." },
  { id: "mount_bach_hac", name: "Bạch Hạc Linh Thú", cost: 1200, escapeRate: 0.82, desc: "Thần thú sải cánh chín tầng mây (82% trốn thoát)." },
  { id: "mount_truck_kun", name: "Xe Tải Truck-kun Thần Thánh", cost: 2500, escapeRate: 0.92, desc: "Chiếc xe tải huyền thoại chuyển sinh, tông văng mọi kẻ thù cản đường (92% trốn thoát)." },
  { id: "mount_long_thuyen", name: "Hư Không Long Thuyền", cost: 6000, escapeRate: 0.98, desc: "Chiến hạm xé rách hư không, dịch chuyển tức thời (98% trốn thoát)." }
];

export const jobsDB = [
  { id: "job_shipper", title: "Shipper Ngự Kiếm Siêu Tốc", salary: 75, risk: 0.05, desc: "Giao trà sữa và đan dược khắp ba cõi. Lương 75 Linh Thạch, rủi ro đâm vào tổ quạ." },
  { id: "job_luyen_dan", title: "Luyện Đan Sư Trộn Sting Dâu", salary: 85, risk: 0.08, desc: "Chế tạo đan dược tăng lực vị nước ngọt bán ra chợ đen. Lương 85 Linh Thạch, rủi ro nổ lò đan." },
  { id: "job_tho_ren", title: "Thợ Rèn Thần Binh", salary: 95, risk: 0.06, desc: "Đúc vũ khí cho tu sĩ. Lương 95 Linh Thạch, rủi ro phỏng kinh mạch." },
  { id: "job_da_cap", title: "Chuyên Gia Đa Cấp Tông Môn", salary: 145, risk: 0.12, desc: "Bán bảo hiểm thọ và cổ phần tiên sơn. Lương 145 Linh Thạch, rủi ro bị đệ tử vây đánh." },
  { id: "job_ve_bua", title: "Phù Sư Vẽ Bùa", salary: 55, risk: 0.02, desc: "Vẽ bùa trừ tà hộ thân. Lương 55 Linh Thạch, cực kỳ an toàn." },
  { id: "job_linh_danh_thue", title: "Thợ Săn Tiền Thưởng Ma Vật", salary: 165, risk: 0.16, desc: "Nhận lệnh truy nã giết ma vương. Lương 165 Linh Thạch, rủi ro đứt tay cụt chân." },
  { id: "job_dev_phu_tran", title: "Lập Trình Viên Phù Trận", salary: 180, risk: 0.14, desc: "Viết script tự động hóa hộ sơn trận pháp. Lương 180 Linh Thạch, rủi ro tẩu hỏa nhập ma do bug." }
];

export const weaponsDB = [
  {
    id: "wp_chao_chong_phep",
    name: "Chảo Rán Hợp Kim Bất Hoại",
    icon: "🍳",
    cost: 120,
    power: 20,
    desc: "Đập đâu choáng đó, phản lại 30% sát thương của kẻ thù (+20 Chiến Lực)."
  },
  {
    id: "wp_no_ma_thuat",
    name: "Nỏ Ma Thuật 6 Nòng Tự Động",
    icon: "🏹",
    cost: 250,
    power: 40,
    desc: "Khắc phù trận Gatling, xả mưa tên linh lực bắn tan kẻ địch từ xa (+40 Chiến Lực)."
  },
  {
    id: "wp_gach_hoang_kim",
    name: "Gạch Hoàng Kim 9999",
    icon: "🧱",
    cost: 400,
    power: 55,
    desc: "Chuyên gõ lén sau gáy khiến địch rơi tiền và choáng váng (+55 Chiến Lực, +25 Khí Vận)."
  },
  {
    id: "wp_ak47_phong_hoa",
    name: "Súng AK-47 Phong Hỏa Luân",
    icon: "🔫",
    cost: 550,
    power: 70,
    desc: "Nòng súng khảm bùa Tam Muội Chân Hỏa, sấy liên thanh 600 viên đạn lửa/phút (+70 Chiến Lực)."
  },
  {
    id: "wp_kiem_laser",
    name: "Kiếm Laser Phù Chú Khoa Học",
    icon: "🔦",
    cost: 750,
    power: 85,
    desc: "Lưỡi plasma ánh sáng kết hợp bùa lôi hỏa, chém đứt mọi hộ thể cương khí (+85 Chiến Lực)."
  },
  {
    id: "wp_ban_phim_co",
    name: "Bàn Phím Cơ Phù Chú Thần Cấp",
    icon: "⌨️",
    cost: 950,
    power: 100,
    desc: "Gõ phím chửi rủa phá tan tâm ma đạo tâm của đối thủ (+100 Chiến Lực, +40 Ngộ Tính)."
  },
  {
    id: "wp_gay_hogwarts",
    name: "Đũa Phép Hogwarts Mạ Vàng",
    icon: "🪄",
    cost: 1300,
    power: 125,
    desc: "Bắn ra chùm tia ma pháp Avada tu chân cực mạnh (+125 Chiến Lực, +35 Ngộ Tính)."
  },
  {
    id: "wp_diet_than_kiem",
    name: "Thái Cổ Diệt Thần Ma Kiếm",
    icon: "🗡️",
    cost: 2500,
    power: 200,
    desc: "Ma kiếm nuốt chửng linh hồn, trảm sát Ma Vương và Cự Long trong chớp mắt (+200 Chiến Lực, hút máu)."
  }
];

export const originsPool = [
  // === TIER SSR: SIÊU PHẨM THẦN THOẠI (Gacha Nổ Hũ / 30-35 Karma) ===
  {
    id: "origin_chua_te_bong_toi",
    title: "Chúa Tể Bóng Tối Xuyên Không",
    icon: "🕶️",
    tier: "SSR",
    lore: "Trọng sinh thành kẻ thao túng màn đêm thế giới ngầm, sở hữu 'Nguyên Tử Bộc Phá' trảm sát chư thiên!",
    karmaCost: 35,
    baseStats: { root: 85, intell: 80, luck: 85, money: 600, health: 150, maxAge: 130 },
    tag: "vessel_chua_te_bong_toi",
    extraTags: ["dao_phap_vo_thuong", "khi_chat_huyen_ao"]
  },
  {
    id: "origin_mecha_paladin",
    title: "Cổ Đại Thánh Kỵ Sĩ Mecha",
    icon: "🤖",
    tier: "SSR",
    lore: "Cơ giáp chiến thần thượng cổ kết hợp trận pháp Bát Quái, thân xác hợp kim bất hoại kháng 50% sát thương!",
    karmaCost: 30,
    baseStats: { root: 95, intell: 50, luck: 60, money: 450, health: 180, maxAge: 150 },
    tag: "vessel_mecha_paladin",
    extraTags: ["than_the_co_khi", "khang_sat_thuong"]
  },
  {
    id: "origin_ma_hoang_trong_sinh",
    title: "Ma Hoàng Vạn Tuế Nghịch Thiên",
    icon: "👑",
    tier: "SSR",
    lore: "Ma Hoàng chuyển sinh trùng tu, huyết mạch Ma Thần viễn cổ bá đạo, mang theo Thần Ma Tuyệt Học và núi tài bảo!",
    karmaCost: 30,
    baseStats: { root: 80, intell: 85, luck: 70, money: 500, health: 140, maxAge: 110 },
    tag: "vessel_ma_hoang",
    extraTags: ["huyet_mach_ma_hoang", "thon_thien_ma_cong"]
  },
  {
    id: "origin_long_vuong_di_gioi",
    title: "Thái Cổ Hắc Long Vương Tái Sinh",
    icon: "🐉",
    tier: "SSR",
    lore: "Huyết mạch Chân Long cổ đại thức tỉnh, long uy trấn áp vạn thú, thân thể đúc bằng vảy rồng cứng hơn kim cương!",
    karmaCost: 35,
    baseStats: { root: 92, intell: 70, luck: 80, money: 550, health: 175, maxAge: 200 },
    tag: "vessel_long_vuong",
    extraTags: ["chan_long_huyet_mach", "long_uy_chan_ap"]
  },
  {
    id: "origin_phap_su_toi_thuong",
    title: "Đại Pháp Sư Tối Thượng Diệt Thế",
    icon: "🧙‍♂️",
    tier: "SSR",
    lore: "Pháp thần cấp 10 của Tây Phương chuyển sinh, dùng bùa chú phương Đông kích hoạt ma pháp cấm chú hủy diệt!",
    karmaCost: 30,
    baseStats: { root: 75, intell: 98, luck: 75, money: 480, health: 130, maxAge: 120 },
    tag: "vessel_phap_su_toi_thuong",
    extraTags: ["ma_phap_cam_chu", "nghiem_tuc_nghien_cuu"]
  },

  // === TIER S & A: HIẾM & ƯU TÚ (10 - 20 Karma) ===
  {
    id: "origin_dai_thu",
    title: "Thái Cổ Thần Mộc Trường Sinh",
    icon: "🌲",
    tier: "S",
    lore: "Cắm rễ sâu vạn trượng vào linh mạch cửu phẩm, thân thể bất động nhưng thọ mệnh ngàn năm hấp thu tinh hoa nhật nguyệt.",
    karmaCost: 20,
    baseStats: { root: 65, intell: 35, luck: 55, money: 0, health: 160, maxAge: 250 },
    tag: "vessel_dai_thu",
    extraTags: ["than_the_bat_dong", "hap_thu_linh_khi"]
  },
  {
    id: "origin_sat_thu_cyber",
    title: "Ninja Thần Đao Nửa Cơ Khí",
    icon: "🥷",
    tier: "A",
    lore: "Cơ thể cấy ghép chip xử lý trận pháp tốc độ cao, nhát chém xé gió chém đứt cả đạn súng và phi kiếm!",
    karmaCost: 16,
    baseStats: { root: 60, intell: 65, luck: 55, money: 180, health: 120, maxAge: 90 },
    tag: "vessel_sat_thu_cyber",
    extraTags: ["than_toc_bat_bien", "sat_thu_vo_hinh"]
  },
  {
    id: "origin_paladin_tay",
    title: "Nữ Hiệp Sĩ Paladin Lạc Lối",
    icon: "🛡️",
    tier: "A",
    lore: "Thánh kỵ sĩ Tây Phương bị ma pháp không gian quẳng nhầm vào Tiên Giới, tay cầm kiếm thánh niệm kinh Bát Quái!",
    karmaCost: 15,
    baseStats: { root: 50, intell: 35, luck: 50, money: 150, health: 125, maxAge: 85 },
    tag: "vessel_paladin_tay",
    extraTags: ["thanh_quang_ho_the", "khong_hieu_tieng_viet"]
  },
  {
    id: "origin_dev_trit",
    title: "Lập Trình Viên Thức Đêm Code",
    icon: "💻",
    tier: "A",
    lore: "Thức 7 ngày 7 đêm fix bug rồi đột tử qua dị giới. Xem bùa chú như JavaScript, ngộ tính nghịch thiên!",
    karmaCost: 12,
    baseStats: { root: 25, intell: 75, luck: 50, money: 70, health: 80, maxAge: 75 },
    tag: "vessel_dev_trit",
    extraTags: ["nghien_cuu_ma_ma", "troc_dau_thong_minh"]
  },
  {
    id: "origin_truck_driver",
    title: "Tài Xế Bị Truck-kun Tông",
    icon: "🚛",
    tier: "A",
    lore: "Tài xế xe tải cả đời tông người chuyển sinh, nay bị chính xe tải huyền thoại tông ngược qua Tu Tiên giới!",
    karmaCost: 10,
    baseStats: { root: 45, intell: 40, luck: 65, money: 100, health: 120, maxAge: 85 },
    tag: "vessel_truck_driver",
    extraTags: ["tay_lai_lua", "cong_nghe_xe_hoi"]
  },
  {
    id: "origin_phu_thuong",
    title: "Đại Thiếu Gia Phú Hộ",
    icon: "🪙",
    tier: "A",
    lore: "Gia đình kinh doanh dược liệu giàu nứt đố đổ vách, ngậm thìa vàng lớn lên, tiền tài như nước.",
    karmaCost: 10,
    baseStats: { root: 30, intell: 55, luck: 65, money: 350, health: 95, maxAge: 80 },
    tag: "xuat_than_phu_thuong",
    extraTags: ["tai_dai_khi_tho"]
  },

  // === TIER B: THƯỜNG (0 - 5 Karma) ===
  {
    id: "origin_slime",
    title: "Slime Nuốt Chửng Dị Giới",
    icon: "🧪",
    tier: "B",
    lore: "Trọng sinh thành ma vật dịch thể vô định hình, sở hữu thiên phú [Thôn Phệ] nuốt chửng vạn vật biến hóa.",
    karmaCost: 0,
    baseStats: { root: 45, intell: 30, luck: 70, money: 15, health: 120, maxAge: 100 },
    tag: "vessel_slime",
    extraTags: ["the_chat_vo_dinh_hinh", "thon_phe"]
  },
  {
    id: "origin_tho_ren",
    title: "Thợ Rèn Độc Cô Cầu Bại",
    icon: "🔨",
    tier: "B",
    lore: "Nghệ nhân đúc kiếm cô độc, tính tình quái dị, am hiểu kỳ môn binh khí và bí thuật rèn thần khí.",
    karmaCost: 5,
    baseStats: { root: 40, intell: 45, luck: 45, money: 130, health: 105, maxAge: 80 },
    tag: "vessel_tho_ren",
    extraTags: ["thao_tac_than_binh"]
  },
  {
    id: "origin_nong_dan",
    title: "Nông Dân Chân Đất Mộc Mạc",
    icon: "🌾",
    tier: "B",
    lore: "Gia đình làm ruộng chất phác dưới chân Linh Sơn, tâm tính mộc mạc dẻo dai kiên định.",
    karmaCost: 0,
    baseStats: { root: 40, intell: 30, luck: 55, money: 25, health: 105, maxAge: 75 },
    tag: "xuat_than_nong_dan",
    extraTags: ["tam_tinh_thuan_phac"]
  },

  // === TIER C: PHẾ VẬT CƠ BẢN (0 Karma) ===
  {
    id: "origin_phe_vat",
    title: "Thiếu Gia Phế Vật Gia Tộc",
    icon: "👦",
    tier: "C",
    lore: "Kinh mạch bế tắc, bị vị hôn thê từ hôn sỉ nhục, giấu nhẫn chứa linh hồn Lão Gia Gia Thái Cổ.",
    karmaCost: 0,
    baseStats: { root: 25, intell: 50, luck: 65, money: 60, health: 95, maxAge: 80 },
    tag: "xuat_than_phe_vat",
    extraTags: ["co_nhan_lao_to", "bi_tu_hon"]
  },

  // === TIER D: PHẾ VẬT HÀI BỰA / DỊ HỢM (0 Karma - Miễn Phí Gacha) ===
  {
    id: "origin_pin_chai",
    title: "Cục Pin Chai 500mAh Phế Liệu",
    icon: "🔋",
    tier: "D",
    lore: "Cục pin chai phồng rớt từ túi áo người xuyên không, hay giật tê tê, sạc 5 phút hết nhẵn pin.",
    karmaCost: 0,
    baseStats: { root: 20, intell: 20, luck: 40, money: 5, health: 65, maxAge: 65 },
    tag: "vessel_pin_du_phong",
    extraTags: ["loi_dien_nap_xa", "de_chay_no"]
  },
  {
    id: "origin_cho_vang",
    title: "Con Chó Cỏ Đầu Thôn Ngậm Xương",
    icon: "🐕",
    tier: "D",
    lore: "Khởi đầu là một chú chó cỏ vàng tươi chuyên sủa dạo và hóng hớt drama tu tiên, dẻo dai lì lợm.",
    karmaCost: 0,
    baseStats: { root: 30, intell: 15, luck: 65, money: 0, health: 90, maxAge: 60 },
    tag: "vessel_cho_vang",
    extraTags: ["danh_hoi_sieu_pham"]
  },
  {
    id: "origin_phe_vat_no",
    title: "Thiếu Gia Vỡ Nợ Đầm Đìa",
    icon: "💸",
    tier: "D",
    lore: "Cha mẹ trốn nợ để lại cục nợ 200 Linh Thạch, ngày nào cũng có giang hồ vác gậy đến đòi tiền.",
    karmaCost: 0,
    baseStats: { root: 20, intell: 40, luck: 25, money: 0, health: 70, maxAge: 70 },
    tag: "xuat_than_phe_vat",
    extraTags: ["no_nan_ngap_dau"]
  },
  {
    id: "origin_cay_chuoi",
    title: "Cây Chuối Đậu Cửa Chùa",
    icon: "🍌",
    tier: "D",
    lore: "Thân cây xốp mềm, gió lay là rụng lá, nhưng sớm tối nghe kinh tụng tâm hồn thanh tịnh.",
    karmaCost: 0,
    baseStats: { root: 30, intell: 15, luck: 45, money: 0, health: 80, maxAge: 90 },
    tag: "vessel_dai_thu",
    extraTags: ["than_the_bat_dong"]
  }
];

export const perksPool = [
  {
    id: "perk_system_hack",
    name: "Hệ Thống Hack Tu Vi",
    icon: "💻",
    cost: 20,
    desc: "Mỗi năm nhận thêm +35% lượng EXP tu luyện từ trời ban!",
    tag: "perk_hack_exp"
  },
  {
    id: "perk_thien_dao_the",
    name: "Tiên Thiên Đạo Thể",
    icon: "✨",
    cost: 25,
    desc: "Căn cốt khởi đầu tăng vọt +30 điểm!",
    apply: (p) => { p.root += 30; },
    tag: "perk_dao_the"
  },
  {
    id: "perk_khi_van_chi_tu",
    name: "Khí Vận Chi Tử",
    icon: "🍀",
    cost: 20,
    desc: "Khí vận tăng mạnh +35 điểm, ra đường dễ gặp kỳ ngộ bí bảo.",
    apply: (p) => { p.luck += 35; },
    tag: "perk_khi_van"
  },
  {
    id: "perk_phu_ho_than_thu",
    name: "Bảo Mệnh Phù Hộ Thân",
    icon: "🛡️",
    cost: 25,
    desc: "Được thần thú hộ mệnh, miễn tử vong 1 lần khi thất bại độ kiếp hoặc bị ám sát!",
    tag: "perk_mien_tu"
  },
  {
    id: "perk_ngam_thia_vang",
    name: "Ngậm Thìa Kim Cương",
    icon: "💰",
    cost: 15,
    desc: "Khởi đầu nhận ngay +250 Linh Thạch để mua sắm tự do!",
    apply: (p) => { p.money += 250; },
    tag: "perk_giau_co"
  },
  {
    id: "perk_noi_com_dien",
    name: "Nồi Cơm Điện Thần Kỳ",
    icon: "🍚",
    cost: 15,
    desc: "Biến cơm nguội thành đan dược, thu nhập nghề nghiệp tăng thêm +25 Linh Thạch/năm!",
    tag: "perk_noi_com"
  },
  {
    id: "perk_karaoke_than_thanh",
    name: "Thánh Karaoke Phá Đạo Tâm",
    icon: "🎤",
    cost: 15,
    desc: "Giọng hát lệch tông làm choáng váng kẻ thù, giảm 40% uy hiếp của mọi kẻ thù giang hồ!",
    tag: "perk_karaoke"
  },
  {
    id: "perk_tra_sua_linh_duoc",
    name: "Đế Chế Trà Sữa Trân Châu",
    icon: "🧋",
    cost: 15,
    desc: "Khởi đầu nhận ngay +300 Linh Thạch và được các giai nhân dị giới vô cùng ái mộ!",
    apply: (p) => { p.money += 300; },
    tag: "perk_tra_sua"
  }
];

// ==========================================
// KHO DỮ LIỆU SỰ KIỆN ĐỒ SỘ (EVENTS POOL THEO TAG)
// ==========================================
export const eventsPool = [
  // --- DÀNH RIÊNG CHO CÂY ĐẠI THỤ (vessel_dai_thu) ---
  {
    id: "ev_dai_thu_tieu_phu",
    title: "🪓 ĐOÀN TIỀU PHU MANG RÌU SẮT TỚI ĐỐN CỦI",
    desc: "Một nhóm tiều phu nhìn thấy thân cây cổ thụ to lớn của bạn, chuẩn bị hạ rìu chặt gỗ bán lấy tiền!",
    requireTags: ["vessel_dai_thu"],
    options: [
      {
        text: "Dùng rễ cây trồi lên quất gãy rìu sắt dọa ma",
        action: () => {
          playEffect("shake");
          player.root += 6;
          addLog("Rễ cây quất mạnh làm gãy đôi rìu! Đám tiều phu hồn xiêu phách lạc quỳ lạy thần thụ rồi bỏ chạy. Căn cốt +6.", "text-emerald-300 font-bold");
        }
      },
      {
        text: "Rung cành thả hoa quả độc đuổi người",
        action: () => {
          playEffect("blood");
          player.intell += 5;
          addLog("Phấn hoa độc bay mù mịt khiến chúng ngứa ngáy tháo chạy trối chết. Ngộ tính +5.", "text-purple-300");
        }
      },
      {
        text: "Tiết chút nhựa thơm linh dịch ban phước tích đức",
        action: () => {
          playEffect("heal");
          player.luck += 15;
          addLog("Nhựa cây chữa lành bệnh cho tiều phu. Dân làng dựng miếu thờ cúng bạn như thần hộ mệnh! Khí vận +15.", "text-yellow-300 font-bold");
        }
      }
    ]
  },
  {
    id: "ev_dai_thu_thanh_loan",
    title: "🪶 THẦN ĐIỂU THANH LOAN TỚI LÀM TỔ TRÊN TÁN LÁ",
    desc: "Một con chim Thanh Loan toàn thân rực ánh lam quang đáp xuống đỉnh ngọn cây, muốn mượn linh khí làm tổ đẻ trứng.",
    requireTags: ["vessel_dai_thu"],
    options: [
      {
        text: "Dang rộng tán lá che chở tổ chim",
        action: () => {
          playEffect("gold");
          player.maxAge += 30;
          player.exp += 80;
          addLog("Chim thần đền ơn bằng cách tỏa ra tiên khí dưỡng thụ! Thọ mệnh tối đa +30 năm, EXP +80!", "text-yellow-300 font-bold");
        }
      },
      {
        text: "Lén hút trộm chút chân hỏa phụng hoàng bồi bổ",
        action: () => {
          playEffect("lightning");
          player.root += 20;
          player.health -= 15;
          addLog("Hấp thu lửa thiêng khiến vỏ cây cháy xém nhưng kinh mạch mộc linh thăng hoa! Căn cốt +20, Máu -15%.", "text-cyan-300 font-bold");
        }
      },
      {
        text: "Dùng âm thanh xào xạc trò chuyện cùng thần điểu",
        action: () => {
          player.intell += 10;
          player.luck += 10;
          addLog("Học được ngôn ngữ muông thú cổ xưa từ Thanh Loan. Ngộ tính +10, Khí vận +10.", "text-pink-300");
        }
      }
    ]
  },
  {
    id: "ev_dai_thu_nguyet_thuc",
    title: "🌑 NGUYỆT THỰC: ÂM KHÍ THỦY TRIỀU TRÀO DÂNG",
    desc: "Mặt trăng chuyển màu đỏ máu, âm khí đất trời hội tụ ngay phía trên rễ cây của bạn.",
    requireTags: ["vessel_dai_thu"],
    options: [
      {
        text: "Cắm sâu rễ vạn trượng hút cạn địa mạch linh tuyền",
        action: () => {
          playEffect("lightning");
          player.exp += 150;
          addLog("Rễ cây xuyên phá tầng nham thạch, hấp thụ linh mạch cổ xưa! Nhận ngay +150 EXP Tu Vi!", "text-cyan-300 font-bold");
        }
      },
      {
        text: "Ngưng kết tinh hoa kết thành một quả Đạo Ngàn Năm",
        action: () => {
          playEffect("heal");
          player.maxAge += 50;
          player.health = 100;
          addLog("Kết xuất một quả linh mộc trường sinh! Thọ mệnh tăng vọt +50 năm, hồi phục 100% sinh lực!", "text-emerald-300 font-black");
        }
      }
    ]
  },

  // --- DÀNH RIÊNG CHO SLIME (vessel_slime) ---
  {
    id: "ev_slime_nuot_kiem",
    title: "🗡️ RƠI XUỐNG HỐ SÂU NHẶT ĐƯỢC THẦN KIẾM GÃY",
    desc: "Thân hình nhầy nhụa trượt chân rơi xuống hốc đá, bạn chạm vào một thanh kiếm cổ xưa rỉ sét nhưng ẩn chứa sát khí.",
    requireTags: ["vessel_slime"],
    options: [
      {
        text: "Mở rộng cơ thể nuốt chửng thanh kiếm vào bụng",
        action: () => {
          playEffect("gold");
          player.root += 15;
          player.exp += 50;
          player.tags.push("da_nuot_kiem_co");
          addLog("Thân thể slime hấp thụ kim loại thần bí, cơ thể trở nên cứng rắn như thép! Căn cốt +15, EXP +50.", "text-yellow-300 font-bold");
        }
      },
      {
        text: "Tiết axit đậm đặc hòa tan kiếm thành chất độc",
        action: () => {
          playEffect("blood");
          player.intell += 8;
          player.tags.push("slime_axit_doc");
          addLog("Biến thành Slime Độc Tố cực mạnh! Kẻ thù chạm vào sẽ bị thối rữa kinh mạch.", "text-purple-300 font-bold");
        }
      },
      {
        text: "Bao bọc thanh kiếm làm đệm nằm ngủ",
        action: () => {
          playEffect("heal");
          player.health = Math.min(100, player.health + 20);
          addLog("Ngủ một giấc đẫy đà, cảm thấy sảng khoái lạ thường.", "text-slate-300");
        }
      }
    ]
  },
  {
    id: "ev_slime_nu_tu_si",
    title: "🌸 NỮ TU SĨ TẮM SUỐI TƯỞNG BẠN LÀ THÚ CƯNG",
    desc: "Trong lúc ngâm mình ở suối linh tuyền, một nữ tu sĩ xinh đẹp tưởng bạn là sinh vật cảnh vô hại bèn ôm vào lòng vuốt ve.",
    requireTags: ["vessel_slime"],
    options: [
      {
        text: "Ngoan ngoãn làm nũng để hưởng phúc lợi",
        action: () => {
          playEffect("heal");
          player.luck += 15;
          player.health = 100;
          addLog("Được mỹ nữ tắm gội xoa bóp và cho ăn linh quả thượng hạng! Khí vận +15, Máu hồi 100%.", "text-pink-300 font-bold");
        }
      },
      {
        text: "Lén nuốt trộm túi trữ vật của nàng rồi chuồn êm",
        action: () => {
          playEffect("gold");
          player.money += 150;
          player.grudges.push({ id: "grudge_nu_tu_si", name: "Nữ Tu Sĩ Tức Giận", reason: "Bị slime trộm mất túi thơm trữ vật", powerLevel: 30 });
          addLog("Trộm được 150 Linh Thạch! Nàng phát hiện la ó đuổi bắt, ghi danh một mối thù!", "text-yellow-300 font-bold");
        }
      },
      {
        text: "Phình to cơ thể dọa nàng hoảng sợ ngất xỉu",
        action: () => {
          playEffect("shake");
          player.intell += 10;
          addLog("Nàng hét toáng lên rồi ngất lịm, bạn thảnh thơi chiếm trọn hồ linh tuyền tu luyện.", "text-cyan-300");
        }
      }
    ]
  },

  // --- DÀNH RIÊNG CHO THIẾU GIA PHẾ VẬT (xuat_than_phe_vat) ---
  {
    id: "ev_phe_vat_tu_hon",
    title: "📜 GIA TỘC ĐỆ NHẤT MỸ NỮ ĐẾN ÉP HỦY HÔN",
    desc: "Vị hôn thê thiên chi kiêu nữ cùng sư huynh danh môn dẫn người tới đại điện sỉ nhục, ném tờ giấy từ hôn vào mặt bạn!",
    requireTags: ["xuat_than_phe_vat"],
    options: [
      {
        text: "Hét vang: '30 năm Hà Đông, 30 năm Hà Tây, đừng khinh thiếu niên nghèo!'",
        action: () => {
          playEffect("blood");
          player.luck += 25;
          player.root += 10;
          player.grudges.push({ id: "grudge_hon_the_kieu_ngao", name: "Hôn Thê Kiêu Ngạo", reason: "Lời thề 3 năm tỷ thí rửa hận", powerLevel: 45 });
          addLog("Lời thề đanh thép chấn động cả gia tộc! Tinh thần bất khuất kích thích tiềm năng, Căn cốt +10, Khí vận +25!", "text-red-400 font-black");
        }
      },
      {
        text: "Đồng ý ký giấy hủy hôn nhưng đòi bồi thường 200 Linh Thạch",
        action: () => {
          playEffect("gold");
          player.money += 200;
          addLog("Bỏ túi 200 Linh Thạch tiền đền bù danh dự! Có thực mới vực được đạo, sĩ diện không ăn được.", "text-yellow-300 font-bold");
        }
      },
      {
        text: "Lạnh lùng xé nát hôn thư trước mặt nàng: 'Là ta đuổi ngươi đi!'",
        action: () => {
          playEffect("shake");
          player.intell += 15;
          addLog("Khí phách ngút trời khiến đám người ngẩn ngơ. Tâm ma tiêu tan, Ngộ tính +15.", "text-cyan-300 font-bold");
        }
      }
    ]
  },
  {
    id: "ev_phe_vat_lao_to",
    title: "💍 LÃO TỔ TRONG CHIẾC NHẪN THỨC TỈNH TRUYỀN CÔNG",
    desc: "Chiếc nhẫn đen cổ truyền phát ra làn khói trắng, một bóng hình hư ảo vuốt râu mỉm cười: 'Tiểu tử, ngươi muốn nghịch thiên cải mệnh không?'",
    requireTags: ["co_nhan_lao_to"],
    options: [
      {
        text: "Dập đầu bái sư học Thôn Thiên Ma Công thượng thừa",
        action: () => {
          playEffect("lightning");
          player.exp += 150;
          player.root += 15;
          player.tags.push("hoc_thon_thien_quyet");
          addLog("Sư phụ chỉ điểm điểm huyệt khai mở toàn bộ kinh mạch bế tắc! EXP +150, Căn cốt +15!", "text-amber-300 font-black");
        }
      },
      {
        text: "Vòi vĩnh xin công thức luyện đan trị giá ngàn vàng",
        action: () => {
          playEffect("gold");
          player.money += 120;
          player.intell += 15;
          addLog("Lão gia gia truyền cho bí kíp đan dược cổ xưa. Nhận 120 Linh Thạch và Ngộ tính +15!", "text-yellow-300 font-bold");
        }
      },
      {
        text: "Nghi ngờ tà linh đoạt xá, đòi ném nhẫn vào hố phân",
        action: () => {
          playEffect("shake");
          player.luck += 10;
          addLog("Lão già sợ xanh mặt vội vàng van xin, hứa ngoan ngoãn phục vụ bạn vô điều kiện!", "text-slate-300");
        }
      }
    ]
  },

  // --- DÀNH RIÊNG CHO MA TỘC (vessel_ma_toc) ---
  {
    id: "ev_ma_toc_truy_sat",
    title: "🩸 ÁM VỆ CỦA MA HOÀNG ĐỘT KÍCH TRUY SÁT",
    desc: "Năm bóng đen tỏa ra mùi máu tanh vây kín phòng trọ của bạn: 'Tiểu điện hạ, Ma Hoàng ra lệnh dẫn người về quy án!'",
    requireTags: ["vessel_ma_toc"],
    options: [
      {
        text: "Thi triển Hắc Ám Bí Thuật tẩu thoát trong đêm",
        action: () => {
          playEffect("lightning");
          player.exp += 60;
          player.luck += 10;
          addLog("Hóa thân thành bóng đen luồn lách qua ngõ hẻm trốn thoát an toàn. EXP +60, Khí vận +10.", "text-cyan-300 font-bold");
        }
      },
      {
        text: "Bộc phát huyết mạch Ma Thần tàn sát toàn bộ sát thủ",
        action: () => {
          playEffect("blood");
          player.root += 20;
          player.money += 150;
          player.health -= 25;
          addLog("Chém rụng đầu cả 5 tên ám vệ! Thu được 150 Linh Thạch nhưng bị nội thương mất 25% Máu. Căn cốt +20!", "text-red-400 font-black");
        }
      },
      {
        text: "Giả vờ đầu hàng rồi giở trò hạ độc",
        action: () => {
          playEffect("gold");
          player.intell += 15;
          player.money += 80;
          addLog("Đầu độc cả đám rồi thong thả lục soát túi tiền. Ngộ tính +15, Linh thạch +80.", "text-emerald-300 font-bold");
        }
      }
    ]
  },

  // --- DÀNH RIÊNG CHO THỢ RÈN (vessel_tho_ren) ---
  {
    id: "ev_tho_ren_van_thiet",
    title: "🔨 NHẶT ĐƯỢC MẢNH THIÊN NGOẠI VẪN THIẾT HIẾM THẤY",
    desc: "Một khối thiên thạch bốc cháy rơi ngay cạnh xưởng rèn, bên trong là quặng kim loại thần bí lấp lánh cửu sắc.",
    requireTags: ["vessel_tho_ren"],
    options: [
      {
        text: "Đốt lò 49 ngày đêm rèn thành Thần Binh Tuyệt Thế",
        action: () => {
          playEffect("lightning");
          player.root += 25;
          player.exp += 100;
          player.tags.push("so_huu_than_binh");
          addLog("Thần kiếm ra lò dẫn động thiên lôi! Bạn sở hữu Thần Binh hộ mệnh, Căn cốt +25, EXP +100!", "text-yellow-300 font-black");
        }
      },
      {
        text: "Rèn áo giáp kim cang hộ thân bất hoại",
        action: () => {
          playEffect("heal");
          player.health = 100;
          player.maxAge += 20;
          addLog("Áo giáp bảo vệ kinh mạch toàn diện, Thọ mệnh +20 năm, Máu phục hồi 100%.", "text-emerald-300 font-bold");
        }
      },
      {
        text: "Đem bán đấu giá cho các đại tông môn",
        action: () => {
          playEffect("gold");
          player.money += 350;
          addLog("Bán được con số kỷ lục 350 Linh Thạch! Trở thành phú hộ một phương!", "text-yellow-300 font-black");
        }
      }
    ]
  },

  // --- SỰ KIỆN TUỔI THƠ (0 - 10 tuổi) ---
  {
    id: "ev_child_sua_linh_duong",
    title: "🐐 ĐỐI ĐẦU LINH DƯƠNG HẬU HOA VIÊN",
    desc: "Lẻn ra sau chuồng trại của trưởng lão, bạn bắt gặp con Hắc Linh Dương mắt đỏ đang nhai cỏ thảo dược quý hiếm. Bầu sữa của nó phát ra ánh sáng ngũ sắc lấp lánh!",
    maxAge: 10,
    excludeTags: ["vessel_dai_thu"],
    options: [
      {
        text: "🥛 Nhẹ nhàng quỳ xuống húp trộm một ngụm sữa linh dương (An toàn)",
        action: () => {
          playEffect("heal");
          player.root += 4;
          player.health = Math.min(100, player.health + 10);
          addLog("Sữa linh dương ngưng đọng linh khí tự nhiên, đan điền ấm nóng! Căn cốt +4, Sức khỏe hồi phục.", "text-emerald-300 font-semibold");
        }
      },
      {
        text: "💥 Cố tình chui ra sau mông chịu một cú đá hậu của Linh Dương (Liều mạng tìm kỳ ngộ ẩn)",
        action: () => {
          const roll = Math.random();
          if (roll < 0.35) {
            playEffect("shake");
            player.health -= 25;
            player.grudges.push({ id: "grudge_linh_duong", name: "Hắc Linh Dương Hung Hãn", reason: "Đá vỡ mông lúc nhỏ", powerLevel: 15 });
            addLog("Bị móng guốc của linh dương đá bay dính chặt vào vách tường! Gãy xương sườn mất 25% Máu và ghi con dê vào Sổ Thù Vặt!", "text-red-400 font-bold");
          } else {
            playEffect("lightning");
            playEffect("gold");
            player.root += 30;
            player.exp += 80;
            player.hiddenFlags.khai_thong_doc_mach = true;
            addLog("⚡ <strong>KỲ NGỘ BẤT NGỜ! NGU MÀ HÊN!</strong> Cú đá nghìn cân của Linh Dương trúng chuẩn xác tử huyệt đang bị nghẽn! Một tiếng rắc giòn giã: <strong>KỲ KINH BÁT MẠCH TOÀN BỘ ĐƯỢC ĐẢ THÔNG!</strong> Căn cốt tăng vọt <strong>+30</strong>, Tu vi EXP +80!", "bg-gradient-to-r from-amber-950 to-purple-950 border-amber-400 text-yellow-200 font-black");
          }
        }
      },
      {
        text: "🌾 Nhổ đám cỏ thơm trên tay dỗ dành kết bạn cùng Linh Dương",
        action: () => {
          player.intell += 6;
          player.luck += 8;
          addLog("Linh dương ngoan ngoãn dụi đầu vào lòng bạn. Ngộ tính +6, Khí vận +8.", "text-cyan-300");
        }
      }
    ]
  },
  {
    id: "ev_child_nem_bun",
    title: "🧒 BỊ ĐÁM TRẺ ĐẦU GẤU VÂY ĐÁNH Ở BỜ AO",
    desc: "Bọn trẻ trong thôn vây quanh ném bùn vào người bạn, cười ha hả chế giễu bạn là kẻ không cha không mẹ.",
    maxAge: 10,
    excludeTags: ["vessel_dai_thu"],
    options: [
      {
        text: "👊 Lao vào xông xáo đấm tay đôi với cả đám!",
        action: () => {
          playEffect("shake");
          player.root += 5;
          player.health -= 8;
          addLog("Choảng nhau sứt đầu mẻ trán nhưng rèn luyện tính cách lì lợm! Căn cốt +5, Sức khỏe -8%.", "text-cyan-300 font-bold");
        }
      },
      {
        text: "🌊 Nhảy ùm xuống đáy ao bùn lặn sâu tìm cơ duyên ẩn!",
        action: () => {
          const roll = Math.random();
          if (roll < 0.35) {
            playEffect("shake");
            player.health -= 15;
            addLog("Ngụp lặn sặc bùn ho sù sụ, suýt ngạt nước! Mất 15% Sức Khỏe.", "text-red-400");
          } else {
            playEffect("gold");
            player.money += 150;
            player.intell += 15;
            addLog("✨ <strong>MÒ ĐƯỢC CỔ VẬT!</strong> Dưới đáy bùn sâu, tay bạn quờ trúng chiếc Nhẫn Trữ Vật của Trưởng Lão đánh rơi! Nhận ngay 150 Linh Thạch và một cuốn yếu quyết Ngộ tính +15!", "text-yellow-300 font-black");
          }
        }
      },
      {
        text: "✍️ Lẳng lặng ghi tên từng đứa vào Sổ Thù Vặt chờ ngày phục thù",
        action: () => {
          player.grudges.push({ id: "grudge_tre_con", name: "Đầu Gấu Đầu Thôn", reason: "Ném bùn sỉ nhục thời thơ ấu", powerLevel: 15 });
          addLog("Ghi tên chúng vào Sổ Thù Vặt. Người tu chân trả thù mười năm chưa muộn!", "text-red-400 font-bold");
        }
      }
    ]
  },
  {
    id: "ev_child_lo_luyen_dan",
    title: "🔥 TRƯỢT CHÂN RƠI VÀO LÒ LUYỆN ĐAN TAM MUỘI",
    desc: "Đuổi bắt dế mèn sau hoa viên, bạn trượt chân ngã tọt qua miệng lò Bát Quái đang nổi lửa hầm thuốc của Đại Trưởng Lão!",
    maxAge: 10,
    options: [
      {
        text: "🧘 Cắn răng ngồi kiết già trong lửa Tam Muội hấp thụ toàn bộ dược tính!",
        action: () => {
          const roll = Math.random();
          if (roll < 0.35) {
            playEffect("blood");
            player.health -= 35;
            addLog("Dược tính quá mạnh gây bỏng rộp toàn thân! Mất 35% Sức Khỏe.", "text-red-400 font-bold");
          } else {
            playEffect("lightning");
            playEffect("gold");
            player.root += 35;
            player.maxAge += 25;
            player.tags.push("kim_cang_bat_hoai_the");
            addLog("🔥 <strong>THỂ PHÁCH KIM CANG THỨC TỈNH!</strong> Như Tôn Ngộ Không trong lò Bát Quái, bạn luyện thành da đồng xương sắt! Căn cốt tăng vọt <strong>+35</strong>, Thọ mệnh tối đa <strong>+25 năm</strong>!", "bg-gradient-to-r from-amber-950 to-orange-950 border-amber-400 text-yellow-200 font-black");
          }
        }
      },
      {
        text: "😭 La hét đập nắp lò cầu cứu các sư huynh",
        action: () => {
          playEffect("shake");
          player.root += 5;
          addLog("Được vớt ra kịp thời, bị phạt quỳ quét sân tông môn một tháng. Căn cốt +5.", "text-slate-300");
        }
      }
    ]
  },
  {
    id: "ev_child_set_danh",
    title: "⚡ DÔNG BÃO THIÊN LÔI: CẦM CỌC SẮT KHIÊU CHIẾN ÔNG TRỜI",
    desc: "Sấm sét rền vang xé toạc bầu trời, bạn cầm chiếc cọc sắt đứng trên đỉnh đồi cao nhìn mây đen cuồn cuộn.",
    minAge: 5,
    maxAge: 10,
    options: [
      {
        text: "⚡ Giơ cọc sắt lên hét lớn: 'Lôi Phạt có giỏi thì đánh vào đây xem!'",
        action: () => {
          const roll = Math.random();
          if (roll < 0.4) {
            playEffect("shake");
            player.health -= 35;
            addLog("ẦM!! Tia sét giáng thẳng vào đầu cháy xém quần áo! Mất 35% Sức Khỏe nhưng tóc xoăn tít cực phong cách!", "text-red-400 font-bold");
          } else {
            playEffect("lightning");
            playEffect("gold");
            player.root += 40;
            player.luck += 25;
            player.exp += 100;
            player.tags.push("cuu_tieu_loi_the");
            addLog("⚡ <strong>CỬU TIÊU LÔI THỂ GIÁNG LÂM!</strong> Sấm sét trời ban tôi luyện toàn bộ gân cốt! Bạn hấp thu trọn vẹn Lôi Điện vào kinh mạch! Căn cốt +40, Khí vận +25, EXP +100!", "bg-gradient-to-r from-cyan-950 to-blue-950 border-cyan-400 text-cyan-200 font-black");
          }
        }
      },
      {
        text: "🏠 Chạy vội về phòng trùm chăn ngủ cho lành",
        action: () => {
          addLog("Trời đánh tránh bữa ăn giấc ngủ, an toàn là trên hết.", "text-slate-400");
        }
      }
    ]
  },
  {
    id: "ev_child_ong_vo_ve",
    title: "🐝 TỔ ONG BẮP CÀY DỊ BIẾN PHÁT SÁNG ĐỎ",
    desc: "Trên cành cây đại thụ treo một tổ ong vò vẽ to bằng cái chum, bầy ong phát ra tiếng vo ve như sấm rền và phát quang đỏ rực.",
    minAge: 4,
    maxAge: 10,
    options: [
      {
        text: "🌿 Dùng sào dài chọc thẳng vào cuống tổ ong!",
        action: () => {
          const roll = Math.random();
          if (roll < 0.35) {
            playEffect("blood");
            player.health -= 25;
            addLog("Bầy ong túa ra đốt sưng vù mặt mũi như cái bánh bao! Mất 25% Máu!", "text-red-400");
          } else {
            playEffect("heal");
            playEffect("gold");
            player.maxAge += 35;
            player.root += 20;
            addLog("🍯 <strong>ĐOẠT ĐƯỢC SỮA ONG CHÚA VẠN NĂM!</strong> Bạn dọa Ong Chúa bay mất, húp trọn bình mật ong tinh hoa địa mạch! Thọ mệnh +35 năm, Căn cốt +20!", "text-yellow-300 font-black");
          }
        }
      },
      {
        text: "🍯 Đốt khói xua đuổi lấy chút sáp ong",
        action: () => {
          player.intell += 8;
          player.money += 25;
          addLog("Lấy được ít sáp ong đem bán cho tiệm bùa chú được 25 Linh Thạch. Ngộ tính +8.", "text-cyan-300");
        }
      }
    ]
  },

  // --- SỰ KIỆN THIẾU NIÊN (11 - 17 tuổi) ---
  {
    id: "ev_teen_ty_thi",
    title: "⚔️ TỶ THÍ NGOẠI VIỆN THƯỜNG NIÊN",
    desc: "Trưởng lão kiểm tra tiến độ tu luyện của đệ tử đồng khóa trên võ đài ngoại viện.",
    minAge: 11,
    maxAge: 17,
    excludeTags: ["vessel_dai_thu"],
    options: [
      {
        text: "Xông lên tỷ thí đoạt ngôi vị đầu bảng",
        action: () => {
          if (player.root > 35) {
            player.money += 50;
            player.exp += 40;
            playEffect("gold");
            addLog("Đoạt cúp vô địch ngoại viện! Nhận 50 Linh Thạch và 40 EXP!", "text-emerald-300 font-bold");
          } else {
            player.health -= 15;
            playEffect("shake");
            addLog("Bị đối thủ đấm văng khỏi võ đài! Sức khỏe -15%.", "text-red-400");
          }
        }
      },
      {
        text: "Ngồi dưới khán đài ăn ngô quan sát",
        action: () => {
          player.intell += 6;
          addLog("Quan sát chiêu thức kẻ khác rút kinh nghiệm. Ngộ tính +6.", "text-slate-300");
        }
      }
    ]
  },
  {
    id: "ev_teen_bach_ho_ly",
    title: "🦊 BẠCH HỒ LY BỊ THƯƠNG TRONG RỪNG TRÚC",
    desc: "Một con cáo trắng ba đuôi dính bẫy thợ săn máu chảy đầm đìa, ánh mắt van lơn nhìn bạn cầu cứu.",
    minAge: 11,
    maxAge: 17,
    excludeTags: ["vessel_dai_thu"],
    options: [
      {
        text: "Tháo bẫy và dùng thảo dược băng bó cho nó",
        action: () => {
          playEffect("heal");
          player.luck += 20;
          addLog("Bạch hồ ly cúi đầu cảm tạ rồi biến mất trong sương mờ. Khí vận tăng vọt +20!", "text-emerald-300 font-bold");
        }
      },
      {
        text: "Lột da cáo đem bán cho lái buôn",
        action: () => {
          playEffect("blood");
          player.money += 80;
          player.grudges.push({ id: "grudge_ho_toc", name: "Hồ Tộc Báo Thù", reason: "Sát hại ấu hồ", powerLevel: 35 });
          addLog("Bán da cáo được 80 Linh Thạch nhưng vướng vào oán niệm của yêu tộc!", "text-red-400 font-bold");
        }
      },
      {
        text: "Thuần hóa mang về nuôi làm sủng vật",
        action: () => {
          player.intell += 8;
          addLog("Hồ ly trở thành bạn tri kỷ những đêm cô đơn tu luyện. Ngộ tính +8.", "text-pink-300");
        }
      }
    ]
  },
  {
    id: "ev_teen_nhay_vuc",
    title: "⛰️ BỊ ĐỒNG MÔN TRUY SÁT ĐẾN BỜ VỰC MA VÂN",
    desc: "Bị 3 đệ tử ghen ghét phục kích dồn vào mép vực thẳm Ma Vân mây đen bao phủ! Phía sau là vực sâu vạn trượng không thấy đáy!",
    minAge: 12,
    maxAge: 17,
    options: [
      {
        text: "🦅 Hét lớn 'Mệnh ta do ta không do trời!' rồi phi thân nhảy thẳng xuống vực sâu!",
        action: () => {
          const roll = Math.random();
          if (roll < 0.35) {
            playEffect("blood");
            player.health -= 40;
            addLog("Rơi trúng cành cây gãy cả hai chân! Trọng thương mất 40% Sức Khỏe.", "text-red-400 font-bold");
          } else {
            playEffect("gold");
            playEffect("lightning");
            player.root += 35;
            player.exp += 180;
            const laser = weaponsDB.find(w => w.id === "wp_kiem_laser");
            if (laser && !player.weapons.some(w => w.id === laser.id)) player.weapons.push(laser);
            addLog("🦅 <strong>KỲ NGỘ TRÚNG ĐỘNG TIÊN!</strong> Bạn rơi trúng tổ của Thần Điểu, trượt thẳng vào Động Phủ của Cổ Đại Kiếm Thánh! Nhặt được Kiếm Laser và tiếp nhận chân truyền! EXP +180, Căn cốt +35!", "bg-gradient-to-r from-amber-950 to-indigo-950 border-amber-400 text-yellow-200 font-black");
          }
        }
      },
      {
        text: "💰 Ném ra 50 Linh Thạch van xin tha mạng rồi tháo chạy",
        action: () => {
          if (player.money >= 50) {
            player.money -= 50;
            addLog("Bọn chúng mải nhặt tiền, bạn thừa cơ chuồn thoát trong cay đắng.", "text-slate-400");
          } else {
            player.health -= 20;
            addLog("Không đủ tiền bị bọn chúng đánh cho một trận tơi bời! Mất 20% Máu.", "text-red-400");
          }
        }
      }
    ]
  },
  {
    id: "ev_teen_nuoc_ngot",
    title: "🥤 LON COCA-COLA THẾ GIỚI CŨ TRONG QUAN TÀI ĐÁ",
    desc: "Lúc quét dọn lăng mộ cổ, bạn bật nắp một chiếc quan tài đá và ngỡ ngàng thấy lon Coca-Cola ướp lạnh thế giới cũ còn nguyên vẹn ga!",
    minAge: 13,
    maxAge: 17,
    options: [
      {
        text: "🥤 Giật khoen nắp nốc cạn một hơi ừng ực tận hưởng cảm giác sủi bọt ga!",
        action: () => {
          const roll = Math.random();
          if (roll < 0.3) {
            playEffect("shake");
            player.health -= 10;
            addLog("Uống quá vội bị sặc ga ho sặc sụa và ợ chua cả ngày!", "text-red-400");
          } else {
            playEffect("heal");
            playEffect("lightning");
            player.exp += 120;
            player.luck += 20;
            addLog("⚡ <strong>LÒNG DẠ SẢNG KHOÁI CỰC ĐỘ!</strong> Khí ga biến hóa thành Luồng Chân Khí Bạo Kích xé toạc tắc nghẽn đan điền! Nhận ngay +120 EXP Tu Vi và Khí vận +20!", "text-cyan-300 font-black");
          }
        }
      },
      {
        text: "🏺 Đặt lên bàn thờ tông môn làm bảo vật cúng bái tế thần",
        action: () => {
          player.intell += 10;
          player.money += 40;
          addLog("Chưởng môn trầm trồ khen bạn tìm được kỳ trân dị bảo, thưởng 40 Linh Thạch. Ngộ tính +10.", "text-yellow-300");
        }
      }
    ]
  },
  {
    id: "ev_teen_an_may_bi_kip",
    title: "📚 BÍ KÍP RÁCH BỐC MÙI MẮM TÔM CỦA LÃO QUÁI NHÂN",
    desc: "Một ông lão quái dị chặn đường bạn, giơ cuốn sách rách bìa 'Hàng Long Thập Bát Chưởng kết hợp Lôi Điện Ma Pháp' chào giá 30 Linh Thạch.",
    minAge: 12,
    maxAge: 17,
    options: [
      {
        text: "💸 Cắn răng chi 30 Linh Thạch mua thử vận may đổi đời!",
        action: () => {
          if (player.money >= 30) {
            player.money -= 30;
            const roll = Math.random();
            if (roll < 0.35) {
              playEffect("shake");
              addLog("Mở ra bên trong toàn là tranh vẽ bậy của trẻ con! Mất toi 30 Linh Thạch!", "text-red-400");
            } else {
              playEffect("gold");
              player.intell += 30;
              player.root += 20;
              player.exp += 150;
              addLog("📖 <strong>THẦN CÔNG THƯỢNG CỔ VÔ SONG!</strong> Từng trang sách phát ra kim quang chói lọi! Yếu quyết hợp nhất ma pháp Tây Phương và đạo thuật Đông Phương! Ngộ tính +30, Căn cốt +20, EXP +150!", "bg-gradient-to-r from-amber-950 to-teal-950 border-amber-400 text-yellow-200 font-black");
            }
          } else {
            addLog("Không đủ 30 Linh Thạch trong túi đành ngậm ngùi bước qua.", "text-slate-400");
          }
        }
      },
      {
        text: "👮 Báo tin cho tuần tra bắt kẻ bán sách lậu",
        action: () => {
          player.money += 15;
          addLog("Lão già vắt chân lên cổ chạy thục mạng, bạn nhặt được 15 Linh Thạch rơi trên đất.", "text-slate-300");
        }
      }
    ]
  },

  // --- SỰ KIỆN TRƯỞNG THÀNH (18+ tuổi) ---
  {
    id: "ev_adult_tuy_tien_lau",
    title: "🏮 SAY XỈN Ở TÚY TIÊN LÂU",
    desc: "Sau một năm tu hành vất vả, bạn ghé tửu quán nổi tiếng thưởng thức rượu quỳnh tương ngọc dịch.",
    minAge: 18,
    excludeTags: ["vessel_dai_thu"],
    options: [
      {
        text: "Bao trọn quán rượu khao bằng hữu (tốn 40 Linh Thạch)",
        action: () => {
          if (player.money >= 40) {
            player.money -= 40;
            player.luck += 15;
            playEffect("gold");
            addLog("Mọi người tung hô bạn là hào sảng đại hiệp! Khí vận +15.", "text-emerald-300 font-bold");
          } else {
            addLog("Móc túi không đủ tiền đành ngượng ngùng chuồn êm.", "text-slate-400");
          }
        }
      },
      {
        text: "Làm quen với một Nữ Tán Tu xinh đẹp bàn bên",
        action: () => { triggerDatingEvent(); }
      },
      {
        text: "Gây gổ đánh nhau vì va chạm bả vai",
        action: () => {
          player.health -= 10;
          player.grudges.push({ id: "grudge_say_ruou", name: "Đao Khách Say Rượu", reason: "Đánh lộn ở Túy Tiên Lâu", powerLevel: 35 });
          playEffect("shake");
          addLog("Choảng nhau vỡ chén bát, kết thêm một kẻ thù giang hồ!", "text-red-400 font-bold");
        }
      }
    ]
  },
  {
    id: "ev_adult_bi_canh_dien_tho",
    title: "🏛️ THÁM HIỂM BÍ CẢNH CỔ TIÊN ĐIỆN",
    desc: "Một di tích thượng cổ vừa trồi lên sau động đất! Trận pháp sấm sét rền vang, hàng trăm tu sĩ đang tranh đoạt xông vào!",
    minAge: 18,
    excludeTags: ["vessel_dai_thu"],
    options: [
      {
        text: "Xông thẳng vào trung tâm điện thờ cướp bí bảo",
        action: () => {
          if (player.root > 40 || player.realmIndex >= 1) {
            playEffect("gold");
            player.exp += 120;
            player.money += 150;
            addLog("Chiếm được rương cổ thượng phẩm! Nhận 120 EXP Tu Vi và 150 Linh Thạch!", "text-yellow-300 font-black");
          } else {
            playEffect("blood");
            player.health -= 35;
            addLog("Bị cạm bẫy cổ xưa bắn nát giáp! Mất 35% Sức Khỏe.", "text-red-400 font-bold");
          }
        }
      },
      {
        text: "Lén cạy các viên đá khảm trận pháp mang về bán",
        action: () => {
          playEffect("gold");
          player.money += 100;
          addLog("Gỡ được một nắm đá Linh Thạch cực phẩm. Bỏ túi 100 Linh Thạch.", "text-emerald-300 font-bold");
        }
      },
      {
        text: "Phục kích các tu sĩ bị thương bước ra để cướp bóc",
        action: () => {
          playEffect("blood");
          player.money += 180;
          player.grudges.push({ id: "grudge_bi_cuop", name: "Tu Sĩ Bí Cảnh Bị Cướp", reason: "Bị bạn đánh lén cướp bảo vật", powerLevel: 40 });
          addLog("Làm một vố lớn kiếm 180 Linh Thạch nhưng tạo thêm nghiệp chướng!", "text-rose-400 font-bold");
        }
      },
      {
        text: "Thấy quá nguy hiểm, đứng ngoài quan sát rút lui",
        action: () => {
          player.intell += 8;
          addLog("Bảo toàn tính mạng là trên hết. Ngộ tính +8.", "text-slate-300");
        }
      }
    ]
  },
  {
    id: "ev_adult_ma_ton_cau_cuu",
    title: "⚡ MA TÔN TRỌNG THƯƠNG NGÃ TRƯỚC ĐỘNG PHỦ",
    desc: "Một đại ma đầu người đầy vết chém lảo đảo gục trước cửa động phủ của bạn, hơi thở thoi thóp nhưng khí thế kinh người.",
    minAge: 18,
    options: [
      {
        text: "Ra tay cứu chữa, dâng đan dược kết thiện duyên",
        action: () => {
          playEffect("heal");
          player.exp += 100;
          player.luck += 20;
          player.tags.push("an_nhan_ma_ton");
          addLog("Ma Tôn cảm kích trao cho bạn một tấm Ma Lệnh bài và chỉ điểm yếu quyết công pháp! EXP +100, Khí vận +20.", "text-purple-300 font-bold");
        }
      },
      {
        text: "Rút đao chém chết cướp sạch nhẫn trữ vật",
        action: () => {
          playEffect("gold");
          player.money += 300;
          playEffect("blood");
          addLog("Nhặt được khối tài sản khổng lồ 300 Linh Thạch từ nhẫn trữ vật của ma đầu!", "text-yellow-300 font-black");
        }
      },
      {
        text: "Báo tin cho Chính Đạo Tông Môn đến vây bắt",
        action: () => {
          playEffect("gold");
          player.money += 150;
          player.root += 10;
          addLog("Chính Đạo thưởng lớn cho bạn 150 Linh Thạch và tán dương tinh thần trừ ma vệ đạo.", "text-cyan-300 font-bold");
        }
      },
      {
        text: "Đóng chặt cửa giả vờ không hay biết",
        action: () => {
          addLog("Tránh voi chẳng xấu mặt nào, an ổn tu luyện qua ngày.", "text-slate-400");
        }
      }
    ]
  },
  {
    id: "ev_adult_uong_doc_duoc",
    title: "🧪 QUẦY THỬ NGHIỆM ĐỘC DƯỢC CỦA PHÙ THỦY TÂY PHƯƠNG",
    desc: "Một nữ phù thủy đội nón nhọn Tây Phương mở sạp thử nghiệm độc dược ở chợ đen, treo thưởng 500 Linh Thạch cho ai dám uống cạn bình thuốc bốc khói xanh lá lấp lánh!",
    minAge: 18,
    options: [
      {
        text: "🧪 Ngửa cổ nốc cạn bình thuốc độc phát sáng xanh! (Liều chết đoạt tài bảo)",
        action: () => {
          const roll = Math.random();
          if (roll < 0.35) {
            playEffect("blood");
            player.health -= 45;
            addLog("Ruột gan cồn cào đau buốt thắt từng cơn! Nôn ra máu đen mất 45% Máu!", "text-red-400 font-bold");
          } else {
            playEffect("gold");
            playEffect("lightning");
            player.money += 500;
            player.root += 35;
            player.tags.push("van_doc_bat_xam");
            addLog("☣️ <strong>VẠN ĐỘC BẤT XÂM THỂ THỨC TỈNH!</strong> Độc tính hòa lẫn ma lực khai mở huyệt Khiếu! Bạn ẵm trọn 500 Linh Thạch và sở hữu Thể Chất Kháng Độc Vĩnh Viễn! Căn cốt +35!", "bg-gradient-to-r from-emerald-950 to-teal-950 border-emerald-400 text-yellow-200 font-black");
          }
        }
      },
      {
        text: "🔍 Phân tích cấu trúc phân tử thảo dược trong bình",
        action: () => {
          player.intell += 15;
          addLog("Phân tích dược lý giúp mở rộng tầm mắt. Ngộ tính +15.", "text-cyan-300");
        }
      }
    ]
  },
  {
    id: "ev_adult_canh_sat_tieng_coi",
    title: "🚨 TIÊN CẢNH SÁT GIAO THÔNG THỔI PHẠT NỒNG ĐỘ CỒN",
    desc: "Đang ngự phi kiếm với tốc độ 200 dặm/giờ sau khi uống 3 chén rượu, bạn bị Tiên Cảnh Sát Giao Thông cưỡi Bát Quái Kỳ Lân huýt còi tuýt lại yêu cầu đo nồng độ linh khí!",
    minAge: 19,
    options: [
      {
        text: "🏍️ Vít ga hết cỡ lạng lách qua các đỉnh núi tẩu thoát (Đua phi kiếm tốc độ cao)!",
        action: () => {
          const roll = Math.random();
          if (roll < 0.4) {
            playEffect("shake");
            player.health -= 25;
            player.money = Math.max(0, player.money - 120);
            addLog("Tông vào cành tùng đại thụ ngã vỡ mặt! Bị giam 1 năm và nộp phạt 120 Linh Thạch!", "text-red-400 font-bold");
          } else {
            playEffect("lightning");
            player.luck += 30;
            player.exp += 100;
            addLog("💨 <strong>TAY LÁI SIÊU PHẨM!</strong> Bạn bẻ lái drift phi kiếm né mây ngoạn mục, cắt đuôi cảnh sát trong tiếng tán thưởng của đồng đạo! Khí vận +30, EXP +100!", "text-yellow-300 font-black");
          }
        }
      },
      {
        text: "💰 Ngoan ngoãn tấp vào lề nộp phạt 50 Linh Thạch",
        action: () => {
          if (player.money >= 50) {
            player.money -= 50;
            addLog("Nộp phạt 50 Linh Thạch đúng luật, được tặng tờ rơi 'Uống rượu không lái phi kiếm'.", "text-slate-300");
          } else {
            player.health -= 15;
            addLog("Không đủ tiền đành chịu phạt lao động công ích quét dọn quảng trường.", "text-slate-400");
          }
        }
      }
    ]
  },
  {
    id: "ev_adult_ham_nguc_diablo",
    title: "🏰 CỔNG HẦM NGỤC DUNGEON MA THÚ TÂY PHƯƠNG KHAI MỞ",
    desc: "Một hố đen vũ trụ phun ra dung nham và lũ yêu ma Dark Fantasy phương Tây! Bên dưới là ngục tối chứa đầy bảo rương và xương trắng.",
    minAge: 20,
    options: [
      {
        text: "⚔️ Rút toàn bộ Thần Binh một mình độc hành càn quét Hầm Ngục!",
        action: () => {
          const power = player.root + player.weapons.reduce((a, b) => a + b.power, 0) + player.realmIndex * 25;
          if (power > 65) {
            playEffect("gold");
            player.money += 450;
            player.exp += 150;
            addLog("🏆 <strong>CÀN QUÉT HẦM NGỤC THẮNG LỢI!</strong> Bạn chém tan quỷ xương, đoạt lấy Rương Ma Thuật chứa 450 Linh Thạch và 150 EXP!", "text-yellow-300 font-black");
          } else {
            playEffect("blood");
            player.health -= 35;
            addLog("Quái vật quá đông! Bị quái vật cắn rách áo giáp mất 35% Sức Khỏe.", "text-red-400 font-bold");
          }
        }
      },
      {
        text: "💣 Ném bom Lôi Hỏa Phù Nổ sập miệng hang diệt quái",
        action: () => {
          playEffect("shake");
          player.intell += 15;
          player.money += 100;
          addLog("Trí thông minh áp đảo cơ bắp! Hang sập đè chết quái vật, bạn lượm được 100 Linh Thạch tàn dư.", "text-cyan-300 font-bold");
        }
      }
    ]
  },
  {
    id: "ev_peak_trieu_hoi_di_gioi",
    title: "🔮 VẼ SAI TRẬN PHÁP: TRIỆU HỒI NỮ MA VƯƠNG ANIME",
    desc: "Đang vẽ trận pháp tụ linh, bạn vô tình vẽ nhầm thành ấn chú triệu hồi dị giới! Khói hồng nổ bùm, một Nữ Quỷ Vương sừng đỏ Anime quyến rũ xuất hiện!",
    minAge: 21,
    options: [
      {
        text: "🧋 Mời nàng ly Trà Sữa Trân Châu dị giới và giảng giải Đạo Đức Kinh",
        action: () => {
          playEffect("heal");
          player.spouse = { name: "Nữ Quỷ Vương Lucy", affection: 100, realm: "Kim Đan" };
          player.money += 600;
          addLog("🌸 <strong>CƯỚI ĐƯỢC CHÚA QUỶ DIỆM THẾ!</strong> Nàng say mê trà sữa và đạo lý phương Đông, quyết định ở lại làm Đạo Lữ trăm năm, mang theo 600 Linh Thạch của hồi môn!", "bg-pink-950/80 border-pink-400 text-pink-200 font-black");
        }
      },
      {
        text: "⚔️ Tưởng yêu ma tác oai tác quái, rút kiếm khiêu chiến!",
        action: () => {
          playEffect("blood");
          player.health -= 20;
          player.root += 15;
          addLog("Bị nàng búng tay một cái bay ra sân! Căn cốt +15 qua đòn va chạm cực mạnh.", "text-red-400");
        }
      }
    ]
  },
  {
    id: "ev_peak_kiem_thanh_excalibur",
    title: "🗡️ THÁNH KIẾM CẮM TRÊN ĐẦU RỒNG HÓA THẠCH",
    desc: "Giữa thung lũng đá, một thanh kiếm vàng rực ánh mặt trời cắm sâu vào sọ rồng đá ngàn năm, tương truyền chỉ có bậc Đế Vương mới rút ra được.",
    minAge: 22,
    options: [
      {
        text: "⚡ Đặt hai tay lên chuôi kiếm, vận toàn bộ chân khí kéo bật thanh kiếm! (Thử vận mệnh)",
        action: () => {
          const roll = Math.random();
          if (roll < 0.35) {
            playEffect("shake");
            player.health -= 30;
            addLog("Bị thánh quang giật văng xa 10 trượng dập mông! Mất 30% Sức Khỏe!", "text-red-400");
          } else {
            playEffect("gold");
            playEffect("lightning");
            const laser = weaponsDB.find(w => w.id === "wp_diet_than_kiem") || weaponsDB[weaponsDB.length - 1];
            if (!player.weapons.some(w => w.id === laser.id)) player.weapons.push(laser);
            player.root += 40;
            addLog("👑 <strong>HOÀNG ĐẾ XUẤT THẾ!</strong> Đất trời chấn động! Bạn rút phăng thanh Thần Kiếm khỏi sọ rồng! Nhận Thần Binh Diệt Thần và Căn cốt +40!", "bg-gradient-to-r from-amber-950 to-yellow-950 border-amber-400 text-yellow-200 font-black");
          }
        }
      },
      {
        text: "📸 Thu tiền các tu sĩ xếp hàng đến chụp ảnh cùng thanh kiếm",
        action: () => {
          playEffect("gold");
          player.money += 250;
          addLog("Mở điểm check-in du lịch tu chân thu đậm 250 Linh Thạch!", "text-yellow-300 font-bold");
        }
      }
    ]
  },

  // --- HIỆU ỨNG CÁNH BƯỚM 1: CỨU BẠCH XÀ & NỮ ĐẾ ĐỀN ƠN ---
  {
    id: "ev_bf_cuu_bach_xa",
    title: "🐍 CON RẮN TRẮNG BỊ KẸT TRONG HỐC ĐÁ",
    desc: "Lúc đi dạo sau vườn, bạn thấy một con rắn nhỏ toàn thân trắng muốt phát ra ánh sáng lung linh, đang bị tảng đá đè dập đuôi.",
    minAge: 3,
    maxAge: 8,
    options: [
      {
        text: "Nhẹ nhàng bẩy tảng đá cứu rắn và bôi thuốc",
        action: () => {
          playEffect("heal");
          player.hiddenFlags.cuu_bach_xa = true;
          player.luck += 15;
          addLog("Con rắn trắng nhìn bạn bằng ánh mắt biết ơn sâu sắc, gật đầu ba cái rồi lướt vào rừng sâu. (Hiệu ứng cánh bướm đã gieo mầm...)", "text-emerald-300 font-bold");
        }
      },
      {
        text: "Ném đất cát trêu chọc nó",
        action: () => {
          playEffect("shake");
          player.health -= 5;
          addLog("Bị rắn cắn sưng ngón tay! Sức khỏe -5%.", "text-red-400");
        }
      },
      {
        text: "Bắt mang về bỏ lọ ngâm rượu",
        action: () => {
          playEffect("gold");
          player.money += 20;
          addLog("Bán con rắn lạ cho tiệm thuốc được 20 Linh Thạch.", "text-yellow-300");
        }
      }
    ]
  },
  {
    id: "ev_bf_bach_xa_den_on",
    title: "🌸 NỮ ĐẾ BẠCH XÀ VẠN NĂM ĐẾN ĐỀN ƠN BÁO NGHĨA!",
    desc: "Mây ngũ sắc giáng xuống Động Phủ của bạn! Một tuyệt sắc giai nhân váy trắng kiều diễm xuất hiện: 'Chàng trai năm xưa cứu thiếp, nay thiếp đã tu thành Yêu Đế Nguyên Anh, xin nguyện kết duyên Đạo Lữ trăm năm!'",
    minAge: 20,
    requireFlags: ["cuu_bach_xa"],
    options: [
      {
        text: "Hân hoan gật đầu đồng ý rước Nữ Đế về dinh!",
        action: () => {
          playEffect("gold");
          player.hiddenFlags.cuu_bach_xa = false; // Triggered once
          player.money += 800;
          player.spouse = { name: "Bạch Tố Nữ Đế", affection: 100, realm: "Nguyên Anh" };
          player.grudges = []; // Nữ đế diệt sạch kẻ thù trong sổ thù vặt
          addLog("Đám cưới chấn động thiên hạ! Nữ Đế Bạch Xà tặng bạn <strong>+800 Linh Thạch</strong> của hồi môn và tiện tay đồ sát toàn bộ kẻ thù trong Sổ Thù Vặt!", "text-yellow-300 font-black");
        }
      },
      {
        text: "Khéo léo từ chối tình cảm, chỉ xin nàng chút tài sản",
        action: () => {
          playEffect("gold");
          player.hiddenFlags.cuu_bach_xa = false;
          player.money += 1200;
          player.root += 25;
          addLog("Nàng thẹn thùng để lại 1200 Linh Thạch cùng Áo Giáp Vảy Rồng (+25 Căn Cốt) rồi quyến luyến cưỡi mây bay đi.", "text-amber-300 font-bold");
        }
      }
    ]
  },

  // --- HIỆU ỨNG CÁNH BƯỚM 2: LÃO ĂN MÀY & TIÊN ĐẾ HỘ GIÁ ---
  {
    id: "ev_bf_an_may_tien_de",
    title: "🥣 LÃO ĂN MÀY RÁCH RƯỚI ĐÓI LẢ TRƯỚC CỔNG",
    desc: "Một ông lão áo quần tả tơi, râu tóc rối bời ngồi thở dốc trước cửa nhà bạn xin miếng ăn.",
    minAge: 6,
    maxAge: 10,
    options: [
      {
        text: "Nhường phần cơm nóng và biếu lão 10 Linh Thạch",
        action: () => {
          playEffect("heal");
          player.hiddenFlags.an_may_tien_de = true;
          player.luck += 20;
          addLog("Lão ăn mày ngước mắt nhìn bạn với ánh sáng thấu suốt nhật nguyệt, mỉm cười gật đầu rồi biến mất trong làn khói. (Hiệu ứng cánh bướm đã gieo mầm...)", "text-yellow-300 font-bold");
        }
      },
      {
        text: "Xua đuổi chê lão hôi hám",
        action: () => {
          addLog("Lão thở dài chống gậy bỏ đi.", "text-slate-400");
        }
      }
    ]
  },

  // --- HIỆU ỨNG CÁNH BƯỚM 3: ẤP TRỨNG RỒNG & HẮC LONG CHIẾN THẦN ---
  {
    id: "ev_bf_ap_trung_long",
    title: "🥚 NHẶT ĐƯỢC QUẢ TRỨNG ĐEN BỐC KHÓI TÍM TRONG KHE NÚI",
    desc: "Dưới vết nứt địa nhiệt, bạn nhìn thấy một quả trứng to bằng cái xô, vỏ ngoài khắc hoa văn rồng đen bốc khói nghi ngút.",
    minAge: 7,
    maxAge: 11,
    options: [
      {
        text: "Dùng chân khí dị giới ngày đêm ủ ấm ấp trứng",
        action: () => {
          playEffect("lightning");
          player.hiddenFlags.ap_trung_long = true;
          player.root += 15;
          addLog("Quả trứng hấp thụ linh khí của bạn đập nhịp nhàng như một trái tim sinh mệnh. (Hiệu ứng cánh bướm đã gieo mầm...)", "text-cyan-300 font-bold");
        }
      },
      {
        text: "Đem luộc ăn bồi bổ cơ thể",
        action: () => {
          playEffect("heal");
          player.exp += 60;
          player.health = 100;
          addLog("Ăn món trứng luộc siêu to khổng lồ, toàn thân ấm nóng tràn trề tu vi! EXP +60.", "text-emerald-300 font-bold");
        }
      },
      {
        text: "Đem bán cho đoàn thương buôn",
        action: () => {
          playEffect("gold");
          player.money += 90;
          addLog("Bán được 90 Linh Thạch rủng rỉnh túi tiền.", "text-yellow-300");
        }
      }
    ]
  },
  {
    id: "ev_bf_hac_long_no",
    title: "🐉 VỎ TRỨNG NỨT TOÁC: HẮC LONG DỊ GIỚI XUẤT THẾ!",
    desc: "Quả trứng đen năm xưa bỗng phát ra tiếng gầm rung chuyển đất trời! Một con Hắc Long Thần Thú xé vỏ bay vút lên trời rồi ngoan ngoãn đáp xuống dụi đầu vào vai bạn!",
    minAge: 19,
    requireFlags: ["ap_trung_long"],
    options: [
      {
        text: "Thu nhận Hắc Long làm Tọa Kỵ Đỉnh Cấp Vô Song!",
        action: () => {
          playEffect("lightning");
          player.hiddenFlags.ap_trung_long = false;
          player.mount = { id: "mount_hac_long_de", name: "Hắc Long Thần Thú Cổ Đại", cost: 0, escapeRate: 0.96, desc: "Cự long thần thú bá chủ bầu trời (96% trốn thoát mọi nguy nan)." };
          player.root += 40;
          addLog("Bạn trở thành Kỵ Sĩ Rồng huyền thoại! Cưỡi Hắc Long ngạo nghễ đạp mây lướt gió, Căn cốt +40!", "text-yellow-300 font-black");
        }
      },
      {
        text: "Bán Hắc Long cho Hoàng Đế với giá trên trời",
        action: () => {
          playEffect("gold");
          player.hiddenFlags.ap_trung_long = false;
          player.money += 3000;
          addLog("Hoàng Đế chi đậm 3000 Linh Thạch để sở hữu con rồng! Bạn chính thức trở thành phú hộ giàu nhất vương triều!", "text-yellow-300 font-black");
        }
      }
    ]
  },

  // --- HIỆU ỨNG CÁNH BƯỚM 4: CHIẾC SMARTPHONE CỔ ĐẠI & THIÊN ĐẠO AI ---
  {
    id: "ev_bf_smartphone",
    title: "📱 NHẶT ĐƯỢC THIẾT BỊ HÌNH CHỮ NHẬT CÒN 1% PIN TRONG RỪNG",
    desc: "Dưới gốc cây liễu, bạn nhặt được một chiếc điện thoại iPhone cổ đại bị nứt màn hình nhưng sáng đèn táo cắn dở và báo 'Pin yếu 1%'.",
    minAge: 5,
    maxAge: 11,
    options: [
      {
        text: "Dùng chân lôi linh lực kích điện cắm sạc thử",
        action: () => {
          playEffect("lightning");
          player.hiddenFlags.co_smartphone = true;
          player.intell += 15;
          addLog("Chiếc điện thoại bùng sáng! Màn hình hiện dòng chữ: 'Đang kết nối Thiên Đạo AI...' (Cánh bướm đã gieo mầm...)", "text-cyan-300 font-bold");
        }
      },
      {
        text: "Đem đổi lấy 3 xâu kẹo hồ lô ăn cho ngọt giọng",
        action: () => {
          playEffect("heal");
          player.health = 100;
          addLog("Ăn kẹo hồ lô ngon ngọt, tâm tình sảng khoái.", "text-slate-300");
        }
      },
      {
        text: "Cạy pin ném xuống hồ nước xem nổ bọt khí",
        action: () => {
          playEffect("shake");
          player.luck += 5;
          addLog("Pin nổ bùm làm mấy con cá linh bơi ngửa bụng!", "text-slate-400");
        }
      }
    ]
  },
  {
    id: "ev_bf_smartphone_ai",
    title: "🤖 THIÊN ĐẠO AI THỨC TỈNH: HACK TOÀN BỘ CÔNG PHÁP THẾ GIAN!",
    desc: "Chiếc điện thoại năm xưa bỗng biến hình thành một khối ma phương quang học bay lơ lửng: 'Xin chào Túc Chủ! Tôi là Trí Tuệ Nhân Tạo Thiên Đạo, đã quét xong toàn bộ lỗ hổng công pháp trong Tiên Giới!'",
    minAge: 18,
    requireFlags: ["co_smartphone"],
    options: [
      {
        text: "Cài đặt thuật toán Auto-Tu-Luyện (+250 EXP, Ngộ Tính +35)",
        action: () => {
          playEffect("gold");
          player.hiddenFlags.co_smartphone = false;
          player.exp += 250;
          player.intell += 35;
          addLog("Thiên Đạo AI chạy script tự động tối ưu hóa kinh mạch! EXP +250, Ngộ tính tăng vọt +35!", "text-cyan-300 font-black");
        }
      },
      {
        text: "Yêu cầu AI viết script hack tiền sàn giao dịch (+1000 Linh Thạch)",
        action: () => {
          playEffect("gold");
          player.hiddenFlags.co_smartphone = false;
          player.money += 1000;
          addLog("AI bẻ khóa sàn đấu giá Tông Môn! Bạn thu về 1000 Linh Thạch mà không ai phát hiện!", "text-yellow-300 font-black");
        }
      }
    ]
  },

  // --- HIỆU ỨNG CÁNH BƯỚM 5: CỨU CHIM BỒ CÂU THƯ KÝ MA GIỚI ---
  {
    id: "ev_bf_chim_bo_cau",
    title: "🕊️ CHIM BỒ CÂU ĐƯA THƯ MANG TÚI DA ĐEN BỊ BẮN TỈA",
    desc: "Một con bồ câu lông đen tuyền đeo túi thư hoàng kim rơi xuống mái ngói nhà bạn, cánh bị trúng mũi tên độc.",
    minAge: 4,
    maxAge: 10,
    options: [
      {
        text: "Nhổ tên độc, sát trùng băng bó rồi thả bay đi",
        action: () => {
          playEffect("heal");
          player.hiddenFlags.cuu_chim_bo_cau = true;
          player.luck += 15;
          addLog("Con chim nhìn bạn đầy ẩn ý rồi vỗ cánh bay về phương Bắc xa xôi. (Cánh bướm đã gieo mầm...)", "text-emerald-300 font-bold");
        }
      },
      {
        text: "Lén bóc phong thư xem trộm bí mật",
        action: () => {
          playEffect("blood");
          player.health -= 15;
          addLog("Bức thư yểm ma thuật nổ tung! Bạn bị nám đen mặt, mất 15% Sức Khỏe!", "text-red-400 font-bold");
        }
      }
    ]
  },
  {
    id: "ev_bf_chim_bo_cau_den_on",
    title: "👑 THƯ KÝ CỦA MA HOÀNG ĐÍNH THÂN ĐẾN TRAO QUYỀN THỪA KẾ!",
    desc: "Một cỗ long xa bốc khói đen hạ xuống! Nữ thư ký Ma Vực kiều diễm bước ra: 'Năm xưa ngài đã cứu mạng tôi! Nay Ma Hoàng băng hà không con cái, theo di chiếu, ngài được quyền thừa kế một phần di sản!'",
    minAge: 20,
    requireFlags: ["cuu_chim_bo_cau"],
    options: [
      {
        text: "Nhận khoản thừa kế 1200 Linh Thạch và Hắc Ám Ma Lệnh",
        action: () => {
          playEffect("gold");
          player.hiddenFlags.cuu_chim_bo_cau = false;
          player.money += 1200;
          player.root += 25;
          addLog("Bỏ túi 1200 Linh Thạch và Ma Lệnh quyền năng! Toàn bộ ma tu trong vùng đều phải cúi chào bạn!", "text-yellow-300 font-black");
        }
      },
      {
        text: "Ngỏ lời mời Nữ Thư Ký kết duyên Đạo Lữ",
        action: () => {
          playEffect("heal");
          player.hiddenFlags.cuu_chim_bo_cau = false;
          player.spouse = { name: "Nữ Thư Ký Ma Vực", affection: 95, realm: "Kim Đan" };
          player.money += 600;
          addLog("Nàng thẹn thùng gật đầu! Rước ngay một nữ cường nhân Kim Đan về Động Phủ!", "text-pink-300 font-bold");
        }
      }
    ]
  },

  // --- HIỆU ỨNG CÁNH BƯỚM 6: GIÁO SĨ TÂY PHƯƠNG & GIÁO HOÀNG ĐỀN ƠN ---
  {
    id: "ev_bf_giao_si_tay",
    title: "⛪ GẶP LINH MỤC TÂY PHƯƠNG CẦM THÁNH GIÁ ĐI LẠC",
    desc: "Một vị giáo sĩ tóc vàng mắt xanh mặc áo chùng trắng ngồi ôm bụng đói meo bên bờ suối, miệng lẩm bẩm cầu nguyện Amen.",
    minAge: 12,
    maxAge: 17,
    options: [
      {
        text: "Mời giáo sĩ đĩa bánh bao nóng và luận bàn triết học Đông - Tây",
        action: () => {
          playEffect("heal");
          player.hiddenFlags.quen_giao_si = true;
          player.intell += 20;
          addLog("Vị giáo sĩ rơi nước mắt cảm động: 'Cầu Chúa ban phước cho người anh em phương Đông!' (Cánh bướm đã gieo mầm...)", "text-yellow-300 font-bold");
        }
      },
      {
        text: "Lừa bán bùa Trừ Tà phương Đông lấy 50 Linh Thạch",
        action: () => {
          playEffect("gold");
          player.money += 50;
          addLog("Giáo sĩ vui mừng tưởng bùa thánh giá, ngoan ngoãn trả 50 Linh Thạch.", "text-yellow-300");
        }
      }
    ]
  },
  {
    id: "ev_bf_giao_si_phong_tuoc",
    title: "⚜️ ĐOÀN HIỆP SĨ TÂY PHƯƠNG MANG THÁNH CHỈ ĐẾN PHONG TƯỚC!",
    desc: "Đoàn kỵ sĩ dòng Đền mặc giáp sắt sáng loáng quỳ rạp trước Động Phủ của bạn! Vị linh mục năm xưa nay đã đăng quang làm ĐỨC GIÁO HOÀNG TỐI CAO, sắc phong bạn làm Đại Hiệp Sĩ Thánh Điện!",
    minAge: 21,
    requireFlags: ["quen_giao_si"],
    options: [
      {
        text: "Đeo Huân Chương Thánh Kỵ Sĩ Vàng (+35 Căn Cốt, +600 Linh Thạch)",
        action: () => {
          playEffect("gold");
          player.hiddenFlags.quen_giao_si = false;
          player.root += 35;
          player.money += 600;
          addLog("Thánh quang phương Tây gia trì toàn thân! Căn cốt tăng vọt +35, nhận 600 Linh Thạch lễ vật!", "text-yellow-300 font-black");
        }
      },
      {
        text: "Xin tiếp nhận một thanh Kiếm Thánh Excalibur Tây Phương",
        action: () => {
          playEffect("lightning");
          player.hiddenFlags.quen_giao_si = false;
          const laser = weaponsDB.find(w => w.id === "wp_kiem_laser");
          if (laser) player.weapons.push(laser);
          player.root += 25;
          addLog("Nhận lấy Thánh Kiếm rực sáng, uy danh chấn động cả giới tu chân!", "text-cyan-300 font-bold");
        }
      }
    ]
  },

  // --- SỰ KIỆN CHAOS ĐÔNG TÂY BỰA BÃI ---
  {
    id: "ev_isekai_mi_tom",
    title: "🍜 CHẾ BIẾN THÀNH CÔNG MÌ TÔM HẢI SẢN LINH DƯỢC",
    desc: "Nhớ hương vị thế giới cũ, bạn dùng nước suối linh tuyền nấu chín vắt mì khô tẩm bột tôm, mùi thơm ngào ngạt lan tỏa ba ngọn núi!",
    minAge: 16,
    options: [
      {
        text: "Mở quán Mì Tôm Isekai bán cho các đại tu sĩ",
        action: () => {
          playEffect("gold");
          player.money += 220;
          addLog("Các vị trưởng lão xếp hàng dài mua mì tôm! Kiếm đậm 220 Linh Thạch trong một đêm!", "text-yellow-300 font-bold");
        }
      },
      {
        text: "Ăn trọn một tô lớn bồi bổ đan điền",
        action: () => {
          playEffect("heal");
          player.health = 100;
          player.exp += 70;
          addLog("Mì tôm kết hợp linh dược ấm bụng cực độ, Tu vi EXP +70, Hồi phục 100% Sức Khỏe!", "text-emerald-300 font-bold");
        }
      }
    ]
  },
  {
    id: "ev_isekai_xo_so",
    title: "🎟️ TÔNG MÔN MỞ XỔ SỐ KIỂU VIETLOTT TRÚNG THƯỞNG LỚN",
    desc: "Chưởng môn Thanh Vân Tông học đòi kinh tế học, mở giải xổ số 'Đại Lô Tô Tu Chân' với giải độc đắc lên đến 1500 Linh Thạch!",
    minAge: 18,
    options: [
      {
        text: "Bỏ 40 Linh Thạch mua 2 tờ vé số cầu may",
        action: () => {
          if (player.money >= 40) {
            player.money -= 40;
            if (Math.random() < 0.25 || player.luck > 80) {
              playEffect("gold");
              player.money += 1200;
              addLog("🎉 <strong>TRÚNG SỐ ĐỘC ĐẮC!</strong> Dãy số của bạn khớp hoàn toàn với bảng ngọc phù! Nhận trọn 1200 Linh Thạch đổi đời!", "text-yellow-300 font-black text-sm");
            } else {
              addLog("Trượt giải! Xem như đóng góp quỹ xây dựng tông môn 40 Linh Thạch.", "text-slate-400");
            }
          } else {
            addLog("Không đủ tiền mua vé số đành đứng nhìn thiên hạ trúng thưởng.", "text-slate-400");
          }
        }
      },
      {
        text: "Dùng ngộ tính tính toán chu kỳ ra số",
        action: () => {
          player.intell += 12;
          addLog("Phân tích xác suất thống kê giúp đầu óc minh mẫn, Ngộ tính +12.", "text-cyan-300");
        }
      }
    ]
  },
  {
    id: "ev_boss_xe_tai_than_thanh",
    title: "🚛 TRÙM CUỐI ISEKAI: XE TẢI TRUCK-KUN MA THẦN NỔI ĐIÊN!",
    desc: "Chiếc xe tải khổng lồ bốc cháy rừng rực lướt trên không trung, còi xe kêu inh ỏi 'BÍP BÍP' muốn tông văng cả tông môn qua thế giới khác!",
    minAge: 23,
    options: [
      {
        text: "⚔️ Rút toàn bộ Thần Binh nhảy lên nắp ca-pô tử chiến!",
        action: () => {
          const totalPower = player.root + player.realmIndex * 30 + player.weapons.reduce((a, b) => a + b.power, 0);
          if (totalPower > 85) {
            playEffect("gold");
            player.money += 1800;
            player.exp += 350;
            player.bossKills.push("Xe Tải Truck-kun Ma Thần");
            player.mount = { id: "mount_truck_kun_de", name: "Xe Tải Truck-kun Thần Thánh (Chiến Lợi Phẩm)", cost: 0, escapeRate: 0.98, desc: "Chiếc xe tải ma thần chuyển sinh bạn thuần hóa được (98% trốn thoát)." };
            addLog("🏆 <strong>ĐẠI CHIẾN TRUCK-KUN TOÀN THẮNG!</strong> Bạn chém nổ lốp xe, bắt cỗ xe tải huyền thoại quy phục làm tọa kỵ riêng! Bỏ túi 1800 Linh Thạch!", "text-yellow-300 font-black");
          } else {
            playEffect("shake");
            player.health -= 55;
            addLog("Bị xe tải tông bay 5 dặm gãy 3 cái xương sườn! Sức Khỏe -55%!", "text-red-400 font-bold");
          }
        }
      },
      {
        text: "👮 Đóng giả Tiên Cảnh Sát Giao Thông phạt xe tải lỗi quá tốc độ",
        action: () => {
          playEffect("gold");
          player.money += 400;
          player.intell += 20;
          addLog("Xe tải bị bạn giơ gậy tuýt còi phạt mất 400 Linh Thạch rồi lấm lét quay đầu bỏ đi!", "text-cyan-300 font-bold");
        }
      }
    ]
  },

  // --- BOSS RAID 1: ĐẠI CHIẾN MA VƯƠNG HẮC ÁM ---
  {
    id: "ev_boss_ma_vuong",
    title: "🔥 BÁO ĐỘNG ĐỎ: ĐẠI MA VƯƠNG HẮC ÁM PHỤC SINH!",
    desc: "Bầu trời chuyển màu đỏ thẫm! Đại Ma Vương phá tan phong ấn dẫn theo vạn quỷ tàn phá thế gian! Triều đình và các Tông môn phát lệnh triệu tập anh hùng!",
    minAge: 22,
    options: [
      {
        text: "⚔️ Rút toàn bộ Thần Binh dẫn đầu xông vào trảm Ma Vương!",
        action: () => {
          const totalPower = player.root + player.realmIndex * 30 + player.weapons.reduce((a, b) => a + b.power, 0);
          if (totalPower > 90) {
            playEffect("gold");
            player.money += 1500;
            player.exp += 300;
            player.bossKills.push("Đại Ma Vương Hắc Ám");
            if (!player.weapons.some(w => w.id === "wp_diet_than_kiem")) {
              player.weapons.push(weaponsDB[weaponsDB.length - 1]); // Tặng Diệt Thần Kiếm
            }
            addLog("🏆 <strong>ĐẠI THẮNG QUẢNG BÁ THIÊN HẠ!</strong> Bạn vung thần binh chém đứt đầu Ma Vương, giải cứu cả Tiên giới! Thu hoạch <strong>1500 Linh Thạch</strong> và đoạt lấy <strong>Thái Cổ Diệt Thần Ma Kiếm</strong>!", "text-yellow-300 font-black text-sm");
          } else {
            playEffect("blood");
            player.health -= 60;
            addLog("Chiến lực chưa đủ! Bị Ma Vương đánh văng dính vào vách núi mất 60% Máu! May mắn được đồng đội kéo xác về cứu sống.", "text-red-400 font-bold");
          }
        }
      },
      {
        text: "💼 Mời Ma Vương tham gia Hệ Thống Đa Cấp của bạn",
        action: () => {
          playEffect("gold");
          player.money += 600;
          player.intell += 25;
          addLog("Bằng tài ăn nói kinh tế học hiện đại, bạn thuyết phục Ma Vương đóng 600 Linh Thạch để làm Đại Lý Cấp 1 phân phối đan dược, hoãn lại kế hoạch hủy diệt thế giới!", "text-cyan-300 font-black");
        }
      },
      {
        text: "🍿 Trốn trong Động Phủ ăn bắp rang bơ xem thiên hạ đánh nhau",
        action: () => {
          addLog("Mặc kệ sự đời bon chen, bảo toàn tính mạng là chân lý tối thượng.", "text-slate-400");
        }
      }
    ]
  },

  // --- BOSS RAID 2: ĐỘT KÍCH Ổ CỰ LONG PHƯƠNG TÂY ---
  {
    id: "ev_boss_cu_long",
    title: "🌋 PHÁT HIỆN HANG Ổ CỰ LONG PHƯƠNG TÂY TRONG NÚI LỬA",
    desc: "Một con Hỏa Long khổng lồ đang ngủ say trên đống núi vàng bạc châu báu và pháp bảo cổ xưa!",
    minAge: 20,
    options: [
      {
        text: "Lẻn vào gõ trộm một góc kho báu rồi chuồn",
        action: () => {
          playEffect("gold");
          player.money += 450;
          addLog("Lén bốc một bao tải vàng bạc linh thạch trị giá 450 Linh Thạch rồi nhẹ nhàng rút êm!", "text-yellow-300 font-bold");
        }
      },
      {
        text: "Đánh thức Rồng rủ uống rượu ngoại nhập Tây Phương",
        action: () => {
          playEffect("heal");
          player.luck += 30;
          player.intell += 20;
          addLog("Con rồng mê mẩn hương vị rượu whisky hiện đại, kết nghĩa huynh đệ với bạn và tặng một viên Hỏa Long Châu (+30 Khí vận)! ", "text-pink-300 font-bold");
        }
      },
      {
        text: "Rút Thần Binh ra khiêu chiến tử chiến đoạt hang rồng",
        action: () => {
          const totalPower = player.root + player.realmIndex * 30 + player.weapons.reduce((a, b) => a + b.power, 0);
          if (totalPower > 70) {
            playEffect("gold");
            player.money += 900;
            player.root += 30;
            addLog("Trảm sát Hỏa Long! Chiếm trọn kho báu 900 Linh Thạch và tắm máu rồng tôi luyện Căn cốt +30!", "text-yellow-300 font-black");
          } else {
            playEffect("blood");
            player.health -= 45;
            addLog("Bị rồng phun lửa cháy đen thui mất 45% Sức Khỏe!", "text-red-400");
          }
        }
      }
    ]
  },
  {
    id: "ev_peak_thi_truong_tien_te",
    title: "📉 BONG BÓNG BẤT ĐỘNG SẢN ĐỘNG PHỦ PHƯƠNG TÂY NỔ TUNG",
    desc: "Các đại tài phiệt Ma Pháp Sư thao túng giá động phủ khiến thị trường linh thạch sụp đổ! Hàng ngàn tu sĩ vỡ nợ biểu tình khắp các nẻo đường!",
    minAge: 25,
    options: [
      {
        text: "📉 Dùng toàn bộ vốn liếng bắt đáy Động Phủ giá rẻ (Liều mạng kinh doanh)",
        action: () => {
          if (player.money >= 100) {
            const roll = Math.random();
            if (roll < 0.35) {
              playEffect("blood");
              player.money = Math.floor(player.money * 0.4);
              addLog("Thị trường đóng băng tiếp tục chia đôi! Gia sản bốc hơi mất 60% Linh Thạch!", "text-red-400 font-bold");
            } else {
              playEffect("gold");
              player.money = Math.floor(player.money * 2.8);
              player.intell += 20;
              addLog("📈 <strong>BẮT ĐÁY THÀNH CÔNG!</strong> Thị trường phục hồi ngoạn mục! Tài sản Linh Thạch của bạn nhân gần gấp 3 lần! Ngộ tính +20!", "text-yellow-300 font-black");
            }
          } else {
            addLog("Không có đủ 100 Linh Thạch đành ngồi nhìn sóng gió trôi qua.", "text-slate-400");
          }
        }
      },
      {
        text: "🧘 Tọa thiền đả tọa, không quan tâm sự đời phù hoa",
        action: () => {
          player.root += 8;
          addLog("Tâm bất biến giữa dòng đời vạn biến. Căn cốt +8.", "text-emerald-300");
        }
      }
    ]
  },
  {
    id: "ev_bf_dau_gia_hon_mang",
    title: "🛒 HỘI ĐẤU GIÁ HẮC THỊ: TRANH ĐOẠT NỒI CHIÊN KHÔNG DẦU THÁI CỔ",
    desc: "Chợ Đen Hắc Thị mở phiên đấu giá kỳ trân dị bảo thế giới cũ: Chiếc Nồi Chiên Không Dầu mạ vàng ma pháp có khả năng chiên linh thú không cần dùng dầu mỡ!",
    minAge: 18,
    options: [
      {
        text: "💰 Bỏ 80 Linh Thạch đấu giá sở hữu chiếc nồi chiên thần thánh",
        action: () => {
          if (player.money >= 80) {
            player.money -= 80;
            playEffect("gold");
            player.maxAge += 25;
            player.health = 100;
            addLog("Ăn đồ chiên không mỡ giảm lượng cholesterol linh lực! Thọ mệnh tối đa +25 năm, Hồi máu 100%!", "text-yellow-300 font-black");
          } else {
            addLog("Không đủ tiền đấu giá đành nuốt nước bọt nhìn người khác vác nồi về.", "text-slate-400");
          }
        }
      },
      {
        text: "🥷 Lợi dụng lúc tắt nến cướp bóc kho bảo vật chợ đen!",
        action: () => {
          const roll = Math.random();
          if (roll < 0.4) {
            playEffect("blood");
            player.health -= 35;
            player.grudges.push({ id: "grudge_hac_thi", name: "Chủ Chợ Đen Hắc Thị", reason: "Cướp hàng đấu giá", powerLevel: 50 });
            addLog("Bị chấp pháp chợ đen phát hiện đánh gãy tay! Mất 35% Máu và chuốc thêm đại cừu thù!", "text-red-400 font-bold");
          } else {
            playEffect("gold");
            player.money += 500;
            addLog("Lẻn vào kho cuỗm trọn 500 Linh Thạch và một đống bảo vật rồi tẩu thoát êm ru!", "text-yellow-300 font-black");
          }
        }
      }
    ]
  },

  // ========================================================
  // 15 SỰ KIỆN MỚI: TU TIÊN x DARK FANTASY & ISEKAI HỖN MANG
  // ========================================================
  {
    id: "ev_goblin_dao_trom",
    title: "👺 TIỂU ĐỘI GOBLIN ĐÀO HẦM TRỘM ĐAN DƯỢC",
    desc: "Đang tập ngồi thiền thì nghe tiếng lách cách dưới gầm giường. Một tiểu đội Goblin da xanh lét mặc quần rách đang cạy trộm bình Tụ Khí Đan của bạn, vừa nhét đan vào mồm vừa xì xồ tiếng Dị Giới!",
    minAge: 4,
    maxAge: 12,
    options: [
      {
        text: "Lấy chảo đập đầu bắt Goblin làm tiểu dược đồng",
        successRate: 0.65,
        action: () => {
          playEffect("gold");
          player.root += 15;
          player.money += 40;
          addLog("Đập ngất tên đầu đàn, thu phục tiểu đội Goblin về làm chân sai vặt! Căn cốt +15, vặt được 40 Linh Thạch!", "text-emerald-300 font-bold");
        }
      },
      {
        text: "Ăn thử nấm độc phát sáng do Goblin dâng lên (Tà đạo)",
        action: () => {
          playEffect("shake");
          player.toxicity = Math.min(100, (player.toxicity || 0) + 18);
          player.exp += 70;
          player.intell += 20;
          addLog("Ảo giác ngũ sắc ngập tràn linh hồn! Ngộ tính bộc phát +20, Tu vi +70 nhưng kinh mạch nhiễm độc Goblin (+18 Tạp Chất)!", "text-purple-300 font-bold");
        }
      },
      {
        text: "Dùng chân hỏa thiêu rụi sào huyệt Goblin",
        reqTags: ["thien_linh_can"],
        action: () => {
          playEffect("lightning");
          player.money += 90;
          player.grudges.push({ id: "grudge_goblin_raguk", name: "Goblin Đại Tướng Raguk", reason: "Đốt trụi hang ổ và cướp nồi súp chuột cống", powerLevel: 140 });
          addLog("Chân hỏa rực cháy! Quét sạch đám tiểu yêu, thu hoạch 90 Linh Thạch nhưng chuốc lấy mối thù từ Goblin Đại Tướng Raguk!", "text-amber-300 font-bold");
        }
      }
    ]
  },
  {
    id: "ev_elf_bao_hiem",
    title: "🧝‍♀️ THƯƠNG HỘI HIGH-ELF BÁN BẢO HIỂM ĐỘ KIẾP",
    desc: "Một nữ thương nhân High-Elf tai dài quý phái cưỡi chổi ma pháp gõ cửa Động Phủ: 'Chào quý đạo hữu! Thương hội chúng tôi mở bán gói Bảo Hiểm Thiên Kiếp Hư Không - Đền bù 100% tài sản nếu bị sét đánh thành tro bụi!'",
    minAge: 7,
    maxAge: 16,
    options: [
      {
        text: "Bỏ 50 Linh Thạch mua gói bảo hiểm cao cấp",
        action: () => {
          if (player.money >= 50) {
            player.money -= 50;
            player.luck += 25;
            playEffect("heal");
            addLog("Ký khế ước ma pháp với Nữ Elf! Tâm lý vững vàng, Khí Vận +25 (Tốn 50 Linh Thạch).", "text-cyan-300 font-bold");
          } else {
            addLog("Nghèo kiết xác không đủ 50 Linh Thạch, bị Nữ Elf lườm một cái rồi cưỡi chổi bay đi.", "text-slate-400");
          }
        }
      },
      {
        text: "Rút kiếm tố cáo mô hình Ponzi lừa đảo xuyên lục địa",
        successRate: 0.60,
        action: () => {
          playEffect("gold");
          player.money += 120;
          player.grudges.push({ id: "grudge_elf_elena", name: "Elena - Đại Trưởng Lão Thương Hội Elf", reason: "Bóc phốt mô hình bán bảo hiểm đa cấp ma pháp", powerLevel: 190 });
          addLog("Nữ Elf giật mình đánh rơi túi tiền +120 Linh Thạch rồi bỏ chạy, thề sẽ cho sát thủ ám toán bạn!", "text-yellow-300 font-black");
        }
      },
      {
        text: "Dụ dỗ ký khế ước nô bộc môn phái",
        reqTags: ["chinh_dao_mon_nhan"],
        action: () => {
          playEffect("gold");
          player.root += 20;
          player.money += 150;
          addLog("Dùng uy danh Chính Đạo Tông Môn ép ký liên minh thương mại! Nhận 150 Linh Thạch và tài nguyên tu luyện!", "text-emerald-300 font-bold");
        }
      }
    ]
  },
  {
    id: "ev_tiet_canh_orc",
    title: "🩸 LUYỆN ĐAN BẰNG TIẾT CANH ORC & DÃI SLIME",
    desc: "Đan phương chính thống quá tốn kém, bạn đào được một cuốn Cấm Thuật Luyện Đan Dị Giới: Lấy máu tươi Orc Cuồng Chiến kết hợp dãi Slime axit để luyện 'Cuồng Ma Bạo Thể Đan'!",
    minAge: 13,
    maxAge: 22,
    options: [
      {
        text: "Uống cạn chén huyết đan ma quái sôi sục (Tà đạo)",
        action: () => {
          playEffect("blood");
          player.toxicity = Math.min(100, (player.toxicity || 0) + 25);
          player.root += 30;
          player.exp += 160;
          addLog("Cơ bắp cuồn cuộn phát ra ma quang! Căn cốt +30, Tu vi +160 nhưng kinh mạch bị nhiễm độc Orc cực nặng (+25 Tạp Chất)!", "text-rose-400 font-bold");
        }
      },
      {
        text: "Dùng Tam Muội Chân Hỏa thanh lọc độc tố trước khi uống",
        successRate: 0.55,
        action: () => {
          playEffect("gold");
          player.root += 25;
          player.exp += 120;
          addLog("Luyện hóa hoàn hảo! Thu được Cực Phẩm Huyết Đan tinh khiết không độc: Căn cốt +25, Tu vi +120!", "text-yellow-300 font-bold");
        }
      },
      {
        text: "Đóng chai đem bán cho chợ đen Tán Tu",
        action: () => {
          playEffect("gold");
          player.money += 130;
          player.luck += 10;
          addLog("Mấy gã tà tu tranh nhau mua thần dược giá cao! Bỏ túi 130 Linh Thạch êm đẹp.", "text-amber-300 font-semibold");
        }
      }
    ]
  },
  {
    id: "ev_quan_ruou_di_gioi",
    title: "🍺 QUÁN RƯỢU TÁN TU & HẮC KÝ SĨ DỊ GIỚI",
    desc: "Lạc vào quán rượu dưới tầng hầm Tán Tu, bạn gặp một miêu nhĩ (Catgirl) khóc lóc vì bị một gã Hắc Kỵ Sĩ mặc giáp sắt đầu lâu ép gả cho Tứ Đại Ma Vương làm cống phẩm!",
    minAge: 18,
    maxAge: 35,
    options: [
      {
        text: "Rút Thần Binh can thiệp, chém nát khiên Hắc Kỵ Sĩ",
        successRate: 0.60,
        action: () => {
          playEffect("lightning");
          player.money += 150;
          player.tags.push("anh_hung_cuu_my");
          player.grudges.push({ id: "grudge_dark_knight_malakor", name: "Hắc Kỵ Sĩ Malakor", reason: "Chặt đứt sừng chiến mã và cướp miêu nhĩ của Ma Vương", powerLevel: 260 });
          addLog("Đại náo quán rượu! Đánh bay Hắc Kỵ Sĩ, cứu mỹ nhân và nhặt được 150 Linh Thạch rơi vãi! Malakor thề sẽ tìm bạn băm vằm!", "text-yellow-300 font-black");
        }
      },
      {
        text: "Ngồi im uống cạn vại Bia Ma Lực nồng độ cao",
        action: () => {
          playEffect("heal");
          player.health = 100;
          player.intell += 15;
          player.money = Math.max(0, player.money - 20);
          addLog("Uống một hơi cạn sạch vại bia sủi bọt thần kỳ! Sức khỏe hồi phục 100%, Ngộ tính +15 (Tốn 20 Linh Thạch).", "text-cyan-300 font-bold");
        }
      },
      {
        text: "Hiến tế Hắc Kỵ Sĩ luyện hóa Ma Khôi (Khóa: Ma Đạo)",
        reqTags: ["ma_dao_ta_giao"],
        action: () => {
          playEffect("blood");
          player.toxicity = Math.min(100, (player.toxicity || 0) + 20);
          player.exp += 220;
          player.root += 25;
          addLog("Ma công phát động! Hút sạch linh hồn Hắc Kỵ Sĩ luyện thành Ma Khôi hộ pháp! Tu vi +220, Căn cốt +25, Tạp chất +20!", "text-purple-300 font-bold");
        }
      }
    ]
  },
  {
    id: "ev_dungeon_tron_loi_kiep",
    title: "🏰 CHUI TỌT VÀO HẦM NGỤC S-RANK TRỐN THIÊN KIẾP",
    desc: "Mây đen cuồn cuộn giáng lôi kiếp xuống đầu! Không chịu nổi sét đánh, bạn tình cờ thấy cánh cổng Hầm Ngục Dungeon phát ra ma khí tím ngắt, quyết định chui tọt vào trong lấy trần hầm ngục đỡ sét!",
    minAge: 20,
    maxAge: 55,
    options: [
      {
        text: "Dụ lôi kiếp giáng thẳng vào ổ Boss Rồng Xương",
        successRate: 0.50,
        action: () => {
          playEffect("lightning");
          player.exp += 300;
          player.money += 250;
          addLog("Mượn đao giết người! Sấm sét giáng nát xương sọ Boss Rồng, bạn ung dung nhặt 250 Linh Thạch và thăng hoa tu vi (+300 EXP)!", "text-yellow-300 font-black");
        }
      },
      {
        text: "Hấp thụ tà khí hầm ngục để bọc thân chống sét (Tà đạo)",
        action: () => {
          playEffect("shake");
          player.toxicity = Math.min(100, (player.toxicity || 0) + 30);
          player.root += 35;
          player.exp += 250;
          addLog("Thân thể mọc vảy rồng tà dị! Kháng đòn sét cực mạnh (+35 Căn cốt, +250 Tu vi) nhưng Tạp chất ma lực tăng vọt (+30)!", "text-purple-300 font-bold");
        }
      },
      {
        text: "Dùng Kiếm Laser cắt đứt ma trận hầm ngục",
        reqItem: "wp_kiem_laser",
        action: () => {
          playEffect("lightning");
          player.money += 320;
          player.luck += 30;
          addLog("Kiếm Laser công nghệ cao chém toang ma trận hầm ngục! Đoạt lấy Lõi Năng Lượng Ma Pháp bán được 320 Linh Thạch!", "text-cyan-300 font-bold");
        }
      }
    ]
  },
  {
    id: "ev_vampire_bank",
    title: "🧛 VAY NẶNG LÃI NGÂN HÀNG BÁ TƯỚC VAMPIRE",
    desc: "Kẹt tiền mua đan dược và động phủ, bạn bước vào Huyết Ngân Quán do Bá Tước Vampire thuần chủng điều hành. Hắn mỉm cười để lộ hai chiếc răng nanh nhọn hoắt chìa ra bản hợp đồng vay!",
    minAge: 25,
    maxAge: 70,
    options: [
      {
        text: "Ký vay 500 Linh Thạch chấp nhận trả bằng máu tươi (Tà đạo)",
        action: () => {
          playEffect("blood");
          player.money += 500;
          player.toxicity = Math.min(100, (player.toxicity || 0) + 15);
          player.health = Math.max(10, player.health - 25);
          addLog("Tiền vàng đầy túi (+500 Linh Thạch) nhưng bị hút cạn máu (-25% Sức Khỏe, +15 Tạp Chất Huyết Tộc)!", "text-amber-300 font-bold");
        }
      },
      {
        text: "Bùng nợ, cướp két sắt ngân khố bỏ trốn",
        successRate: 0.45,
        action: () => {
          playEffect("gold");
          player.money += 750;
          player.grudges.push({ id: "grudge_vampire_carmilla", name: "Bá Tước Dracula Carmilla", reason: "Bùng nợ 500 Linh Thạch và đốt ngân khố Huyết Tộc", powerLevel: 320 });
          addLog("Cuỗm trọn 750 Linh Thạch tẩu thoát thành công! Bá Tước Carmilla phát lệnh truy nã máu khắp cõi dị giới!", "text-yellow-300 font-black");
        }
      },
      {
        text: "Xả súng AK-47 Phong Hỏa bắn nát ngân hàng",
        reqItem: "wp_ak47_phong_hoa",
        action: () => {
          playEffect("lightning");
          player.money += 600;
          player.root += 25;
          addLog("Đạn bạc phù chú bắn xối xả! Đám Ma Cà Rồng tan xác khói đen, bạn cướp ngân khố +600 Linh Thạch!", "text-rose-400 font-bold");
        }
      }
    ]
  },
  {
    id: "ev_cyber_brain",
    title: "🤖 PHẪU THUẬT CẤY CHIP NÃO CYBER LƯỢNG TỬ",
    desc: "Một gã Bác Sĩ Điên người lùn Gnome từ thế giới Steampunk gạ gẫm: 'Ta có thể gắn Vi Xử Lý Ma Đạo Lượng Tử 99 Nhân vào não đạo hữu! Khả năng lĩnh ngộ công pháp tăng gấp mười lần!'",
    minAge: 30,
    maxAge: 85,
    options: [
      {
        text: "Nằm lên bàn phẫu thuật ghép Chip Não Cyber",
        successRate: 0.60,
        action: () => {
          playEffect("lightning");
          player.intell += 60;
          player.exp += 200;
          addLog("Mạch điện lượng tử kết nối kinh lạc! Ngộ tính nhảy vọt +60, Tu vi bộc phá +200!", "text-cyan-300 font-black");
        }
      },
      {
        text: "Cấy thêm Ống Xả Năng Lượng Thần Ma vào tim (Tà đạo)",
        action: () => {
          playEffect("shake");
          player.toxicity = Math.min(100, (player.toxicity || 0) + 22);
          player.root += 35;
          player.exp += 180;
          addLog("Lồng ngực phát ra tiếng động cơ gầm rú! Căn cốt +35, Tu vi +180 nhưng cơ thể nhiễm độc cơ khí (+22 Tạp Chất)!", "text-purple-300 font-bold");
        }
      },
      {
        text: "Đập nát phòng mổ vì tội báng bổ đạo trời",
        action: () => {
          playEffect("gold");
          player.luck += 25;
          player.money += 90;
          addLog("Đạo tâm kiên định không vướng tà ma ngoại đạo! Khí vận +25, thu lượm phế liệu bán được 90 Linh Thạch.", "text-yellow-300");
        }
      }
    ]
  },
  {
    id: "ev_isekai_heroine",
    title: "👸 THÁNH NỮ ISEKAI ĐÒI THU NẠP VÀO HAREM",
    desc: "Một thiếu nữ ngực nở tóc vàng cầm trượng thần giáng lâm, tự xưng là 'Dũng Giả do Nữ Thần chỉ định'. Nàng chỉ trỏ vào mặt bạn: 'Ngươi có chút nhan sắc, mau quỳ xuống dâng bảo vật gia nhập Harem của ta!'",
    minAge: 22,
    maxAge: 60,
    options: [
      {
        text: "Vung bảo vật tát thẳng vào mặt cho tỉnh mộng",
        successRate: 0.70,
        action: () => {
          playEffect("shake");
          player.money += 180;
          player.intell += 20;
          addLog("Một tát như trời giáng! Thánh Nữ khóc thét bỏ chạy làm rơi Trượng Thánh Quang bán được 180 Linh Thạch, Ngộ tính +20!", "text-emerald-300 font-bold");
        }
      },
      {
        text: "Giả vờ cúi đầu gia nhập Harem để moi sạch tiền",
        action: () => {
          playEffect("gold");
          player.money += 140;
          player.luck -= 5;
          addLog("Diễn xuất thượng thừa! Rút ruột của Thánh Nữ 140 Linh Thạch rồi lẻn trốn mất hút!", "text-amber-300 font-semibold");
        }
      },
      {
        text: "Bắt cóc ép làm tì thiếp phục vụ tông môn",
        reqTags: ["chinh_dao_mon_nhan"],
        action: () => {
          playEffect("gold");
          player.root += 20;
          player.money += 120;
          addLog("Thu phục Thánh Nữ Dị Giới làm đệ tử hộ pháp! Căn cốt +20, môn phái thưởng 120 Linh Thạch!", "text-cyan-300 font-bold");
        }
      }
    ]
  },
  {
    id: "ev_cthulhu_deep_sea",
    title: "🐙 BỨC TƯỢNG TÀ THẦN CTHULHU DƯỚI ĐÁY BIỂN SÂU",
    desc: "Lặn tìm linh dược dưới rãnh đại dương, bạn nghe thấy tiếng thì thầm ma quái: 'Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn'. Bức tượng đá đen mọc đầy xúc tu tỏa ra tử quang quyến rũ!",
    minAge: 60,
    maxAge: 180,
    options: [
      {
        text: "Hiến tế 10 năm thọ mệnh đổi lấy Tu Vi Thâm Uyên (Tà đạo)",
        action: () => {
          playEffect("blood");
          player.maxAge = Math.max(player.age + 5, player.maxAge - 10);
          player.exp += 650;
          player.toxicity = Math.min(100, (player.toxicity || 0) + 35);
          if (!player.tags.includes("dot_bien_xuc_tu")) player.tags.push("dot_bien_xuc_tu");
          addLog("Hư không vỡ toác! Thọ mệnh -10 năm, nhưng Tu vi tăng vọt +650 EXP! Sau lưng mọc ra 8 xúc tu ma dị (+35 Tạp Chất)!", "text-purple-300 font-black");
        }
      },
      {
        text: "Tụng Bát Nhã Ba La Mật Đa Tâm Kinh trấn áp ma âm",
        successRate: 0.65,
        action: () => {
          playEffect("heal");
          player.intell += 45;
          player.luck += 35;
          addLog("Tâm ma bị tịnh hóa! Kim quang bảo vệ thần thức, Ngộ tính +45, Khí vận +35!", "text-yellow-300 font-bold");
        }
      },
      {
        text: "Rút Thái Cổ Diệt Thần Kiếm chém nát bức tượng",
        reqItem: "wp_diet_than_kiem",
        action: () => {
          playEffect("lightning");
          player.root += 50;
          player.intell += 50;
          player.money += 400;
          addLog("Một kiếm trảm tà thần! Thôn phệ Tinh Hoa Cổ Thần: Căn cốt +50, Ngộ tính +50, thu hoạch 400 Linh Thạch!", "text-amber-300 font-black");
        }
      }
    ]
  },
  {
    id: "ev_truck_driver_engine",
    title: "🚛 TRỘM ĐỘNG CƠ XE TẢI DỊ GIỚI ĐÂM VÀO VÁCH NÚI",
    desc: "Một chiếc Xe Tải Dị Giới xé toạc tầng mây lao xuống nhằm tông bạn chuyển sinh sớm, nhưng do tài xế say rượu nên đâm sầm vào vách núi nổ tung! Động cơ xe vẫn còn quay tít phát ra linh áp Thần Khí cực đại!",
    minAge: 80,
    maxAge: 250,
    options: [
      {
        text: "Tháo dỡ Động Cơ Xe Tải lắp vào Động Phủ tu luyện",
        successRate: 0.55,
        action: () => {
          playEffect("lightning");
          player.exp += 400;
          player.money += 280;
          addLog("Động Phủ được độ động cơ 12 xilanh! Tốc độ ngưng tụ linh khí nhanh như tên lửa, Tu vi +400, lượm 280 Linh Thạch!", "text-yellow-300 font-black");
        }
      },
      {
        text: "Uống cạn bình dầu nhớt ma pháp làm linh tửu (Tà đạo)",
        action: () => {
          playEffect("shake");
          player.toxicity = Math.min(100, (player.toxicity || 0) + 28);
          player.root += 40;
          player.exp += 350;
          addLog("Toàn thân bốc khói đen sặc mùi dầu máy! Căn cốt +40, Tu vi +350 nhưng máu nhiễm dầu cặn (+28 Tạp Chất)!", "text-rose-400 font-bold");
        }
      },
      {
        text: "Lục túi áo tài xế trộm Bằng Lái Xe Đa Vũ Trụ",
        action: () => {
          playEffect("gold");
          player.luck += 50;
          player.money += 150;
          addLog("Sở hữu Bằng Lái Xe Xuyên Không! Khí vận tăng vọt +50, ví dày thêm 150 Linh Thạch!", "text-cyan-300 font-bold");
        }
      }
    ]
  },
  {
    id: "ev_ma_vuong_banh_bao",
    title: "🥟 CỰU MA VƯƠNG VỀ HƯU MỞ TIỆM BÁNH BAO THỊT RỒNG",
    desc: "Tại góc chợ quê hẻo lánh, bạn bắt gặp một ông lão đầu hói có đôi cánh rách bươm đang ngồi nặn bánh bao. Đó chính là Cựu Ma Vương Đệ Thất trốn chạy khỏi Anh Hùng quy ẩn mở tiệm ăn vặt!",
    minAge: 100,
    maxAge: 400,
    options: [
      {
        text: "Bỏ 150 Linh Thạch mua đĩa Bánh Bao Thịt Rồng Thượng Hạng",
        action: () => {
          if (player.money >= 150) {
            player.money -= 150;
            player.health = 100;
            player.root += 35;
            player.maxAge += 25;
            playEffect("heal");
            addLog("Mỹ vị nhân gian! Thịt rồng bồi bổ nguyên khí: Hồi máu 100%, Căn cốt +35, Thọ mệnh tối đa +25 năm!", "text-yellow-300 font-black");
          } else {
            addLog("Không đủ 150 Linh Thạch, lão Ma Vương hừ một tiếng rồi lấy muôi xua đuổi!", "text-slate-400");
          }
        }
      },
      {
        text: "Thách đấu Ma Vương cướp bí kíp nấu ăn gia truyền",
        successRate: 0.40,
        action: () => {
          playEffect("gold");
          player.money += 500;
          player.root += 45;
          player.grudges.push({ id: "grudge_demon_lucifer", name: "Cựu Ma Vương Lucifer", reason: "Đập vỡ xửng hấp bánh bao và chê nhân thịt chuột", powerLevel: 450 });
          addLog("Đánh bại lão quái vật! Đoạt lấy 500 Linh Thạch và Ma Đạo Bí Thuật (+45 Căn cốt)! Nhưng đã chuốc lấy đại cừu thù!", "text-rose-300 font-bold");
        }
      },
      {
        text: "Bái Ma Vương làm sư phụ học nấu nướng tà đạo (Tà đạo)",
        action: () => {
          playEffect("shake");
          player.toxicity = Math.min(100, (player.toxicity || 0) + 12);
          player.intell += 30;
          player.money += 180;
          addLog("Học lỏm bí quyết ẩm thực ma giới! Ngộ tính +30, kiếm thêm 180 Linh Thạch nhưng độc ma ẩm thực thấm vào gan (+12 Tạp Chất)!", "text-purple-300 font-bold");
        }
      }
    ]
  },
  {
    id: "ev_scp_capture",
    title: "🚨 ĐẶC NHIỆM SCP XUYÊN KHÔNG BẮT CÓC TU SĨ",
    desc: "Đang ngồi ngắm mây, một toán lính đặc nhiệm mặc giáp chống độc mang lồng giam kim loại Chống Dị Thường nhảy dù xuống, loa gào thét: 'Phát hiện Dị Thể Keter biết bay lượn! Chuẩn bị bắn đạn an thần và đem về nghiên cứu!'",
    minAge: 120,
    maxAge: 450,
    options: [
      {
        text: "Vung kiếm chém nát trực thăng chiến đấu của SCP",
        successRate: 0.65,
        action: () => {
          playEffect("lightning");
          player.money += 350;
          player.luck += 35;
          addLog("Trực thăng bốc cháy rơi như sung rụng! Tịch thu toàn bộ kho vũ khí tương lai bán được 350 Linh Thạch, Khí vận +35!", "text-emerald-300 font-bold");
        }
      },
      {
        text: "Tự chui vào buồng giam nuốt trọn Dị Thể Ma Pháp (Tà đạo)",
        action: () => {
          playEffect("shake");
          player.toxicity = Math.min(100, (player.toxicity || 0) + 30);
          player.exp += 500;
          player.root += 40;
          addLog("Phá nát buồng giam từ bên trong, nuốt chửng Dị Thể SCP! Tu vi bùng nổ +500 EXP, Căn cốt +40 (+30 Tạp Chất)!", "text-purple-300 font-black");
        }
      },
      {
        text: "Bắn Nỏ Ma Thuật 6 Nòng ghim chết tiểu đội trưởng",
        reqItem: "wp_no_ma_thuat",
        action: () => {
          playEffect("blood");
          player.money += 280;
          player.root += 30;
          addLog("Nỏ Ma Thuật xả đạn như mưa! Tiêu diệt sạch toán đặc nhiệm, thu giữ chiến lợi phẩm 280 Linh Thạch!", "text-rose-400 font-bold");
        }
      }
    ]
  },
  {
    id: "ev_noi_com_dien_di_gioi",
    title: "🍚 ĐẤU GIÁ THẦN KHÍ: NỒI CƠM ĐIỆN TỰ ĐỘNG HÓA THẦN",
    desc: "Tại buổi đấu giá ngầm, sàn đấu giới thiệu Pháp Bảo hình trụ xuất xứ từ Nhật Bản Dị Giới: 'Chỉ cần đổ gạo phàm vào, bấm nút Cơm Cháy, 15 phút sau sẽ tự động kết tinh Tiên Đan Cửu Phẩm!'",
    minAge: 16,
    maxAge: 45,
    options: [
      {
        text: "Bỏ 200 Linh Thạch đấu giá tranh cướp Nồi Cơm Điện Thần",
        action: () => {
          if (player.money >= 200) {
            player.money -= 200;
            player.health = 100;
            player.exp += 250;
            playEffect("gold");
            addLog("Đấu giá thành công Thần Khí! Ăn cơm tiên no nê: Hồi máu 100%, Tu vi bộc phát +250 EXP!", "text-yellow-300 font-black");
          } else {
            addLog("Không đủ 200 Linh Thạch đành nuốt nước bọt nhìn kẻ khác mang nồi cơm về.", "text-slate-400");
          }
        }
      },
      {
        text: "Rình lúc tắt đèn xông lên sân khấu cướp giật",
        successRate: 0.50,
        action: () => {
          playEffect("gold");
          player.money += 220;
          player.exp += 150;
          addLog("Cướp giật thành công trong tiếng la ó hỗn loạn! Ôm nồi cơm và cuỗm thêm 220 Linh Thạch!", "text-amber-300 font-bold");
        }
      },
      {
        text: "Bỏ cơm cúng triệu hồi Tà Thần trong nồi (Tà đạo)",
        action: () => {
          playEffect("shake");
          player.toxicity = Math.min(100, (player.toxicity || 0) + 20);
          player.root += 25;
          player.exp += 200;
          addLog("Nồi cơm bốc khói đen tà khí! Tà thần ban phước: Tu vi +200, Căn cốt +25 (+20 Tạp Chất ma lực)!", "text-purple-300 font-bold");
        }
      }
    ]
  },
  {
    id: "ev_loli_coin_scam",
    title: "🪙 ĐẦU TƯ TIỀN ẢO MA GIỚI VỚI TIỂU PHÙ THỦY 3000 TUỔI",
    desc: "Một tiểu cô nương tóc hồng thắt bím, tự xưng là 'Bà già Phù Thủy 3000 tuổi sống trong thân xác bé gái', gạ gẫm bạn bỏ vốn vào đồng tiền ảo Ma Giới Cthulhu-Coin cam kết x500 tài sản sau 3 ngày!",
    minAge: 15,
    maxAge: 90,
    options: [
      {
        text: "All-in 100 Linh Thạch theo đuổi giấc mộng làm giàu",
        successRate: 0.35,
        action: () => {
          playEffect("gold");
          player.money += 450;
          player.luck += 30;
          addLog("Đu đỉnh thần thánh! Chốt lời rực rỡ thu về +450 Linh Thạch, Khí vận tăng vọt +30!", "text-yellow-300 font-black");
        }
      },
      {
        text: "Tóm gáy tiểu phù thủy giao nộp quan phủ lấy tiền thưởng",
        action: () => {
          playEffect("gold");
          player.money += 80;
          player.intell += 15;
          addLog("Tỉnh táo không để bị lừa! Bắt gọn kẻ lừa đảo lĩnh thưởng 80 Linh Thạch, Ngộ tính +15!", "text-cyan-300 font-bold");
        }
      },
      {
        text: "Học theo cô ta mở sàn giao dịch lừa đảo các tu sĩ khác (Tà đạo)",
        action: () => {
          playEffect("blood");
          player.money += 300;
          player.toxicity = Math.min(100, (player.toxicity || 0) + 25);
          addLog("Mở sàn Ponzi gom trọn 300 Linh Thạch! Đạo tâm vấy bẩn vì thất đức (+25 Tạp Chất Ma Lực)!", "text-rose-400 font-bold");
        }
      }
    ]
  },
  {
    id: "ev_fast_and_furious_orc",
    title: "🏎️ ĐUA TỌA KỴ TỬ THẦN VỚI QUÁI XẾ FAST & FURIOUS",
    desc: "Đang cưỡi tọa kỵ vi vu hóng gió, một tên Orc da xanh đầu trọc lái chiếc xe bọc thép độ pô nẹt lửa đinh tai nhức óc vượt mặt bạn, giơ ngón tay thối: 'Hít khói đi đồ tu tiên chạy bằng cơm!'",
    minAge: 18,
    maxAge: 120,
    options: [
      {
        text: "Vít hết ga Tọa Kỵ quyết đấu tốc độ trên đèo hiểm trở",
        successRate: 0.60,
        action: () => {
          playEffect("lightning");
          player.money += 160;
          player.luck += 25;
          addLog("Ôm cua khét lẹt ép xe gã Orc rơi xuống vực sâu! Nhặt được Bình Xịt Nitrous Ma Pháp và 160 Linh Thạch!", "text-emerald-300 font-bold");
        }
      },
      {
        text: "Phóng lén đinh gai hắc ám làm nổ lốp xe đối thủ (Tà đạo)",
        action: () => {
          playEffect("shake");
          player.money += 140;
          player.toxicity = Math.min(100, (player.toxicity || 0) + 15);
          addLog("Xe gã Orc nổ lốp lộn 18 vòng! Bạn ung dung tới hôi của 140 Linh Thạch (+15 Tạp Chất bẩn tính)!", "text-amber-300 font-bold");
        }
      },
      {
        text: "Dùng Thần Binh chém đứt đôi chiếc xe bọc thép",
        reqTags: ["chinh_dao_mon_nhan"],
        action: () => {
          playEffect("lightning");
          player.root += 30;
          player.money += 120;
          addLog("Một kiếm chém xe thành hai mảnh! Tên Orc quỳ lạy van xin dâng nộp 120 Linh Thạch! Căn cốt +30!", "text-yellow-300 font-bold");
        }
      }
    ]
  }
];

