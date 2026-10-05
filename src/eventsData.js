// ============================================================================
// KHO DỮ LIỆU 40+ SỰ KIỆN DARK FANTASY / ISEKAI (BITLIFE STYLE)
// Hỗ trợ lọc thông minh: minAge, maxAge, requireTags, excludeTags, isUnique
// ============================================================================

export const darkFantasyEvents = [
  // --------------------------------------------------------------------------
  // GIAI ĐOẠN 1: TUỔI THƠ (0 - 10 TUỔI) - 10 SỰ KIỆN
  // --------------------------------------------------------------------------
  {
    id: "df_01_sua_ma_thu",
    title: "🍼 Bú Trộm Sữa Linh Dương Ma Giới",
    minAge: 0, maxAge: 5,
    requireTags: [], excludeTags: [],
    desc: "Cơn đói cồn cào trong căn lều dột nát, bạn lén bò sang chuồng trại của gã đồ tể để bú trộm sữa Linh Dương hai đầu.",
    options: [
      {
        text: "Nuốt từng ngụm sữa béo ngậy nồng mùi ma thảo",
        action: (p, eff, log) => { p.root += 3; eff("heal"); log("Sữa ma thú kích hoạt tế bào huyết mạch non nớt! Căn cốt +3.", "text-emerald-300"); }
      },
      {
        text: "Bị Linh Dương phát hiện tung cước đá trúng hông",
        action: (p, eff, log) => { p.health -= 8; eff("shake"); log("Bị móng guốc đá văng vào vũng bùn, đau ê ẩm! Mất 8% Sức khỏe.", "text-red-400"); }
      },
      {
        text: "Lấy răng sữa cắn mạnh vào vú con thú",
        action: (p, eff, log) => { p.luck += 4; eff("shake"); log("Con thú giật mình kêu thét bỏ chạy làm đổ cả thùng gỗ! Khí vận +4.", "text-amber-300"); }
      }
    ]
  },
  {
    id: "df_02_tre_con_nem_da",
    title: "🪨 Bị Lũ Trẻ Khu Ổ Chuột Ném Đá",
    minAge: 4, maxAge: 9,
    requireTags: [], excludeTags: [],
    desc: "Lũ trẻ con mồ côi cầm sỏi đá và bùn nhão chặn đường, đòi bạn phải cống nạp mẩu bánh mì mốc.",
    options: [
      {
        text: "Nhặt một khúc gỗ gãy lao vào đấm đá liều mạng",
        action: (p, eff, log) => { p.root += 2; eff("shake"); log("Đánh nhau chảy máu mũi nhưng làm chúng khiếp sợ lùi bước! Căn cốt +2.", "text-cyan-300"); }
      },
      {
        text: "Ngoan ngoãn ném bánh mì cho chúng để bảo toàn tính mạng",
        action: (p, eff, log) => { p.luck -= 2; log("Bạn ôm bụng đói nằm co ro trong góc tối. Nhẫn nhục chờ thời.", "text-slate-400"); }
      },
      {
        text: "Khắc tên từng đứa vào vách đất, thề sau này báo thù",
        action: (p, eff, log) => {
          p.grudges.push({ id: "grudge_tre_xom", name: "Đầu Gấu Xóm Củi", reason: "Ném đá cướp bánh mì tuổi thơ", powerLevel: 10 });
          log("Ghi thù hận vào tâm khảm. Kẻ sinh tồn nơi hắc ám không bao giờ quên nợ máu!", "text-red-400 font-bold");
        }
      }
    ]
  },
  {
    id: "df_03_sach_cam_thuat",
    title: "📜 Mẩu Da Cừu Khắc Phù Văn Cấm Thuật",
    minAge: 5, maxAge: 10,
    requireTags: [], excludeTags: [],
    desc: "Đang bới rác sau nghĩa địa hoang phế, bạn moi được một mảnh da thú khắc ấn ký ma pháp phát ra ánh sáng tím mờ ảo.",
    options: [
      {
        text: "Tập trung tinh thần học cách vận hành dòng ma lực",
        action: (p, eff, log) => { p.intell += 6; eff("heal"); log("Thần thức sớm thức tỉnh! Ngộ tính tăng vọt +6.", "text-pink-300 font-semibold"); }
      },
      {
        text: "Mang ra tiệm cầm đồ đổi lấy 10 đồng bạc",
        action: (p, eff, log) => { p.money += 10; eff("gold"); log("Lão chủ tiệm mắt sáng rực thu mua ngay, trả cho bạn 10 đồng bạc!", "text-yellow-300"); }
      },
      {
        text: "Đốt cháy mảnh da để sưởi ấm qua đêm đông giá rét",
        action: (p, eff, log) => { p.health = Math.min(100, p.health + 10); log("Ngọn lửa ma thuật giữ ấm cơ thể bạn qua cơn bão tuyết cướp đi sinh mạng nhiều người.", "text-emerald-300"); }
      }
    ]
  },
  {
    id: "df_04_chuot_cong_dot_bien",
    title: "🐀 Chuột Cống Đột Biến Hầm Ngục",
    minAge: 3, maxAge: 8,
    requireTags: [], excludeTags: [],
    desc: "Một con chuột cống to bằng con chó săn với đôi mắt đỏ ngầu chui ra từ cống rãnh, nhe răng nanh nhắm vào bạn.",
    options: [
      {
        text: "Dùng cục gạch đập nát đầu nó",
        action: (p, eff, log) => {
          if (p.root >= 25) { p.root += 3; eff("blood"); log("Đập chết chuột đột biến, xẻ thịt nướng ăn chống đói! Căn cốt +3.", "text-emerald-300 font-bold"); }
          else { p.health -= 15; eff("blood"); log("Bị cắn rách bắp chân nhiễm trùng mưng mủ! Mất 15% Sức khỏe.", "text-red-400"); }
        }
      },
      {
        text: "Leo tót lên đống thùng gỗ kêu cứu",
        action: (p, eff, log) => { p.luck += 3; log("Một tay bảo an đi ngang đá văng con chuột. Bạn thoát chết trong gang tấc.", "text-slate-300"); }
      },
      {
        text: "Bắt chước tiếng kêu loài gặm nhấm kết bạn với nó",
        action: (p, eff, log) => { p.intell += 4; p.tags.push("ban_huu_loai_chuot"); log("Con thú cảm nhận linh cảm kỳ lạ, dụi đầu vào chân bạn. Nhận thẻ [ban_huu_loai_chuot]!", "text-cyan-300"); }
      }
    ]
  },
  {
    id: "df_05_doan_ky_si_di_ngang",
    title: "🐎 Đoàn Thiết Kỵ Đế Quốc Diễu Hành",
    minAge: 6, maxAge: 10,
    requireTags: [], excludeTags: [],
    desc: "Đoàn kỵ sĩ mặc giáp bạc sáng loáng cưỡi chiến mã dẫm đất rung chuyển ngang qua khu phố ổ chuột.",
    options: [
      {
        text: "Đứng sát lề đường giơ tay chào với ánh mắt ngưỡng mộ",
        action: (p, eff, log) => { p.luck += 5; log("Một kỵ sĩ mỉm cười ném cho bạn một đồng bạc sáng chói. Khí vận +5.", "text-emerald-300"); }
      },
      {
        text: "Lén thò tay móc túi da đeo bên hông ngựa",
        action: (p, eff, log) => {
          if (Math.random() < 0.4) { p.money += 25; eff("gold"); log("Móc trộm thành công 25 đồng vàng! Trở thành tay móc túi khét tiếng.", "text-yellow-300 font-bold"); }
          else { p.health -= 25; eff("shake"); log("Bị roi da quất trúng lưng bỏng rát gục xuống đất! Sức khỏe -25%.", "text-red-400"); }
        }
      },
      {
        text: "Ghi nhớ cấu tạo phù văn giáp trụ của họ",
        action: (p, eff, log) => { p.intell += 5; log("Quan sát học lỏm được ấn ký phòng ngự cơ bản. Ngộ tính +5.", "text-pink-300"); }
      }
    ]
  },
  {
    id: "df_06_dich_benh_hac_tu",
    title: "☠️ Đại Dịch Hắc Tử Càn Quét Khu Ổ Chuột",
    minAge: 5, maxAge: 10,
    requireTags: [], excludeTags: [],
    desc: "Sương mù độc từ Hầm Ngục trào ngược lên bề mặt, người già và trẻ nhỏ ho ra máu đen chết la liệt.",
    options: [
      {
        text: "Uống nước tro rễ cỏ ma thuật cầm cự",
        action: (p, eff, log) => {
          if (p.health > 70) { p.root += 8; p.tags.push("mien_nhiem_doc_to"); eff("heal"); log("Vượt qua cơn sốt thập tử nhất sinh! Tế bào sản sinh kháng thể [mien_nhiem_doc_to], Căn cốt +8!", "text-emerald-300 font-bold"); }
          else { p.health -= 35; eff("blood"); log("Nhiễm dịch phổi tổn thương nặng nề, ho ra từng búng máu...", "text-red-400 font-bold"); }
        }
      },
      {
        text: "Trốn biệt trong tầng hầm kín không tiếp xúc ai",
        action: (p, eff, log) => { log("Nhờ cách ly tuyệt đối, bạn bình an vô sự sống sót qua mùa dịch.", "text-slate-300"); }
      },
      {
        text: "Đi lột đồ của những xác chết ngoài ngõ",
        action: (p, eff, log) => { p.money += 40; p.karma -= 15; eff("gold"); log("Thu hoạch được 40 đồng bạc từ người chết. Tâm tính trở nên lạnh lùng tàn nhẫn.", "text-purple-300"); }
      }
    ]
  },
  {
    id: "df_07_ba_lao_boi_toan",
    title: "🔮 Mụ Phù Thủy Mù Coi Chỉ Tay",
    minAge: 7, maxAge: 10,
    requireTags: [], excludeTags: [],
    desc: "Một bà lão mù mắt quấn khăn đen túm lấy cổ tay bạn, sờ nắn các đường gân rồi thì thào điều rùng rợn.",
    options: [
      {
        text: "Lắng nghe lời sấm truyền về huyết mạch",
        action: (p, eff, log) => { p.intell += 5; p.tags.push("loi_sam_hac_am"); log("'Ngươi mang mầm mống kẻ hủy diệt vương quốc!' Ngộ tính +5, nhận thẻ [loi_sam_hac_am].", "text-purple-300"); }
      },
      {
        text: "Giật tay lại chửi mụ già lừa đảo",
        action: (p, eff, log) => { p.luck += 4; log("Bạn nhổ nước bọt rồi chạy mất, không tin vào thần thánh ma quỷ.", "text-slate-300"); }
      },
      {
        text: "Xin mụ dạy một bùa chú nhỏ",
        action: (p, eff, log) => { p.root += 4; eff("heal"); log("Mụ truyền cho bạn một câu chú ngưng tụ đốm lửa ma pháp. Căn cốt +4.", "text-cyan-300"); }
      }
    ]
  },
  {
    id: "df_08_lac_vao_me_cung",
    title: "🕳️ Trượt Chân Xuống Cửa Hầm Ngục Phế Tích",
    minAge: 8, maxAge: 10,
    requireTags: [], excludeTags: [],
    desc: "Đang chơi trốn tìm, nắp cống sụp đổ khiến bạn trôi tuột xuống tầng ngoài cùng của một Hầm Ngục cổ xưa.",
    options: [
      {
        text: "Lần theo luồng gió tìm lối thông lên mặt đất",
        action: (p, eff, log) => { p.intell += 5; log("Bằng trực giác nhạy bén, bạn tìm được đường bò lên an toàn. Ngộ tính +5.", "text-emerald-300"); }
      },
      {
        text: "Lục lọi bộ xương khô bên tường lượm được con dao găm",
        action: (p, eff, log) => { p.inventory.push({ id: "item_dao_gam_ri", name: "Dao Găm Cổ Rỉ Sét", type: "Vũ Khí", rarity: "Phàm Cấp" }); eff("gold"); log("Nhặt được [Dao Găm Cổ Rỉ Sét] phòng thân!", "text-yellow-300 font-bold"); }
      },
      {
        text: "Hoảng loạn gào khóc trong bóng tối",
        action: (p, eff, log) => { p.health -= 10; eff("shake"); log("Tiếng khóc thu hút dơi quỷ lao tới cắn rách tai! Sức khỏe -10%.", "text-red-400"); }
      }
    ]
  },
  {
    id: "df_09_nguoi_than_qua_doi",
    title: "⚰️ Người Nuôi Nấng Ra Đi Vĩnh Viễn",
    minAge: 6, maxAge: 10,
    requireTags: [], excludeTags: [],
    desc: "Mùa đông buốt giá cướp đi sinh mệnh người thân duy nhất của bạn trong căn chòi rách nát.",
    options: [
      {
        text: "Tự tay đào hố chôn cất, khắc bia gỗ thề phải sống sót",
        action: (p, eff, log) => { p.root += 6; p.intell += 4; log("Ý chí sinh tồn được trui rèn như thép nguội! Căn cốt +6, Ngộ tính +4.", "text-amber-300 font-bold"); }
      },
      {
        text: "Bán đồ đạc còn sót lại lấy 15 đồng bạc làm lộ phí",
        action: (p, eff, log) => { p.money += 15; eff("gold"); log("Thu dọn hành lý bước vào cuộc đời tự lập không nơi nương tựa.", "text-slate-300"); }
      },
      {
        text: "Tuyệt thực khóc ròng 3 ngày 3 đêm",
        action: (p, eff, log) => { p.health -= 20; eff("shake"); log("Cơ thể suy kiệt suýt chết theo người thân. Sức khỏe -20%.", "text-red-400"); }
      }
    ]
  },
  {
    id: "df_10_tro_thanh_dai_ca_nhom",
    title: "👑 Trở Thành Thủ Lĩnh Lũ Trẻ Đầu Đường",
    minAge: 8, maxAge: 10,
    requireTags: [], excludeTags: [],
    desc: "Sau nhiều trận ẩu đả giành địa bàn, lũ trẻ bụi đời bắt đầu tôn bạn làm thủ lĩnh xóm củi.",
    options: [
      {
        text: "Lập nên băng trộm vặt 'Chuột Bóng Đêm'",
        action: (p, eff, log) => { p.money += 30; p.tags.push("bang_chu_nhi_dong"); eff("gold"); log("Mỗi tuần thu phế được 30 đồng bạc từ đàn em! Nhận thẻ [bang_chu_nhi_dong].", "text-yellow-300 font-bold"); }
      },
      {
        text: "Dạy đàn em tập võ tự vệ không đi cướp bóc",
        action: (p, eff, log) => { p.karma += 20; p.root += 4; log("Được xóm giềng quý mến, tích đức hành thiện (+20 Karma).", "text-emerald-300 font-semibold"); }
      },
      {
        text: "Bắt đàn em làm bia thịt đỡ đòn mỗi khi đụng độ lính tuần",
        action: (p, eff, log) => { p.karma -= 20; p.luck += 8; eff("blood"); log("Bản tính lãnh khốc bộc lộ rõ rệt, chỉ coi kẻ khác là công cụ.", "text-purple-300"); }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // GIAI ĐOẠN 2: THIẾU NIÊN & BÁI SƯ (11 - 17 TUỔI) - 10 SỰ KIỆN
  // --------------------------------------------------------------------------
  {
    id: "df_11_khao_hach_ky_si",
    title: "🛡️ Kỳ Khảo Hạch Kỵ Sĩ Dự Bị",
    minAge: 13, maxAge: 17,
    requireTags: ["chinh_dao_mon_nhan"], excludeTags: [],
    desc: "Tổng đoàn kỵ sĩ tổ chức chạy vũ trang vượt rừng gai 30 cây số mang theo giáp nặng 20kg.",
    options: [
      {
        text: "Cắn răng cắm đầu chạy thục mạng cán đích tốp 1",
        action: (p, eff, log) => { p.root += 15; p.exp += 40; eff("lightning"); log("Cán đích đầu tiên! Tuyên dương toàn quân, Căn cốt +15, EXP +40!", "text-emerald-300 font-bold"); }
      },
      {
        text: "Chạy dưỡng sức ở tốp giữa vừa đủ tiêu chuẩn đạt",
        action: (p, eff, log) => { p.exp += 20; log("Đạt chuẩn kỵ sĩ bình ổn, không lộ tài năng.", "text-slate-300"); }
      },
      {
        text: "Cõng theo đồng đội bị trật chân cùng về đích",
        action: (p, eff, log) => { p.karma += 25; p.luck += 10; eff("heal"); log("Hành động hiệp nghĩa cảm động đoàn trưởng! Khí vận +10, Karma +25.", "text-cyan-300 font-bold"); }
      },
      {
        text: "Gục ngã giữa đường vì kiệt sức",
        action: (p, eff, log) => { p.health -= 25; eff("shake"); log("Say nắng xỉu giữa rừng gai, bị trừ điểm kỷ luật! Sức khỏe -25%.", "text-red-400"); }
      }
    ]
  },
  {
    id: "df_12_thi_nghiem_ma_phap",
    title: "🔮 Vụ Nổ Thí Nghiệm Nguyên Tố Lửa",
    minAge: 13, maxAge: 17,
    requireTags: ["ma_dao_tu_si"], excludeTags: [],
    desc: "Trong phòng thí nghiệm Hắc Hội, ống nghiệm chứa Axit Ma Quỷ bắt đầu sủi bọt đỏ sôi sùng sục.",
    options: [
      {
        text: "Dùng kết giới bóng tối áp chế vụ nổ",
        action: (p, eff, log) => {
          if (p.intell >= 45) { p.intell += 12; p.exp += 50; eff("lightning"); log("Hấp thụ thành công năng lượng nổ vào lõi ma lực! Ngộ tính +12, EXP +50!", "text-purple-300 font-bold"); }
          else { p.health -= 30; eff("blood"); log("Kết giới vỡ vụn, hóa chất bắn phỏng nửa khuôn mặt! Sức khỏe -30%.", "text-red-400 font-bold"); }
        }
      },
      {
        text: "Kéo tên bạn học cùng bàn ra làm bia chắn",
        action: (p, eff, log) => {
          p.karma -= 30;
          p.grudges.push({ id: "grudge_ban_hoc", name: "Đồng Môn Ma Viện", reason: "Bị bạn kéo làm bia chắn nổ hóa chất", powerLevel: 30 });
          eff("blood");
          log("Bạn lành lặn nhưng gieo vào lòng đồng môn mối thù truyền kiếp!", "text-red-400 font-bold");
        }
      },
      {
        text: "Ném ống nghiệm ra ngoài cửa sổ",
        action: (p, eff, log) => { p.money -= 50; eff("shake"); log("Vụ nổ thổi bay chuồng ngựa của viện trưởng, bạn bị phạt đền 50 đồng bạc.", "text-orange-300"); }
      }
    ]
  },
  {
    id: "df_13_tan_tu_san_trom",
    title: "🏹 Đi Săn Trộm Ở Rừng Cấm Lãnh Chúa",
    minAge: 13, maxAge: 17,
    requireTags: ["tan_tu_doc_hanh"], excludeTags: [],
    desc: "Lẻn vào khu rừng cấm của Lãnh chúa săn thú, bạn bắn hạ được một con Hươu Bạc sừng ngọc vô giá.",
    options: [
      {
        text: "Xẻ thịt lấy sừng đem ra Chợ Đen tẩu tán",
        action: (p, eff, log) => { p.money += 120; eff("gold"); log("Bán trót lọt thu về 120 đồng bạc! Làm giàu nhanh chóng.", "text-yellow-300 font-bold"); }
      },
      {
        text: "Bị đội kỵ sĩ tuần tra của Lãnh chúa bắt quả tang",
        action: (p, eff, log) => {
          p.money = Math.max(0, p.money - 60);
          p.health -= 20;
          eff("shake");
          log("Bị tịch thu chiến lợi phẩm và đánh 20 trượng! Mất tiền và 20% Sức khỏe.", "text-red-400");
        }
      },
      {
        text: "Ăn tim hươu sống ngay tại chỗ",
        action: (p, eff, log) => { p.root += 10; eff("heal"); log("Dòng máu thần thánh thanh lọc cơ thể! Căn cốt +10.", "text-emerald-300 font-semibold"); }
      }
    ]
  },
  {
    id: "df_14_thu_thach_duoc_thao",
    title: "🌿 Nếm Thử Thảo Dược Độc Biến Dị",
    minAge: 14, maxAge: 17,
    requireTags: [], excludeTags: [],
    desc: "Sư phụ bắt bạn nếm thử 5 loại cỏ độc để nhận biết dược tính trong bóng tối.",
    options: [
      {
        text: "Vận công thanh lọc độc tố qua đầu ngón tay",
        action: (p, eff, log) => { p.root += 8; p.intell += 8; eff("heal"); log("Hoàn thành thử thách xuất sắc! Căn cốt +8, Ngộ tính +8.", "text-emerald-300 font-bold"); }
      },
      {
        text: "Nuốt nhầm Cỏ Đoạt Hồn dẫn đến co giật sùi bọt mép",
        action: (p, eff, log) => { p.health -= 30; eff("blood"); log("Cứu chữa kịp thời nhưng lục phủ ngũ tạng tổn hại nặng. Mất 30% Sức khỏe.", "text-red-400"); }
      },
      {
        text: "Lén tráo thảo dược giả qua mắt sư phụ",
        action: (p, eff, log) => { p.luck += 6; log("Gian lận trót lọt, qua môn an toàn. Khí vận +6.", "text-slate-300"); }
      }
    ]
  },
  {
    id: "df_15_quyet_dau_sau_vien",
    title: "⚔️ Trận Quyết Đấu Rạng Sáng Sau Tu Viện",
    minAge: 15, maxAge: 17,
    requireTags: [], excludeTags: [],
    desc: "Tên thiếu gia ngông cuồng ném găng tay vào mặt bạn, thách đấu kiếm thuật phân chia địa vị lúc bình minh.",
    options: [
      {
        text: "Rút kiếm chém gãy vũ khí đối thủ",
        action: (p, eff, log) => {
          if (p.root >= 40) { p.root += 10; p.exp += 45; eff("lightning"); log("Hạ gục đối thủ sau 3 hiệp đấu! Nổi danh toàn học viện! EXP +45.", "text-cyan-300 font-bold"); }
          else { p.health -= 25; eff("blood"); log("Kiếm thuật non nớt bị đối thủ rạch rách ngực! Sức khỏe -25%.", "text-red-400 font-bold"); }
        }
      },
      {
        text: "Bôi mỡ trơn lên chuôi kiếm của hắn trước giờ đấu",
        action: (p, eff, log) => { p.intell += 8; eff("shake"); log("Vừa vung kiếm hắn đã tuột tay làm văng kiếm, thua nhục nhã! Ngộ tính +8.", "text-yellow-300 font-semibold"); }
      },
      {
        text: "Treo thưởng cho côn đồ đánh gãy chân hắn trước đêm đấu",
        action: (p, eff, log) => { p.money -= 30; p.karma -= 15; log("Hắn phải nằm viện bó bột, hủy bỏ trận đấu. Tốn 30 đồng bạc.", "text-purple-300"); }
      }
    ]
  },
  {
    id: "df_16_bi_kich_tinh_dau",
    title: "💔 Mối Tình Đầu Với Nữ Pháp Sư Trẻ",
    minAge: 15, maxAge: 17,
    requireTags: [], excludeTags: [],
    desc: "Nàng thiếu nữ học viên cùng lớp mỉm cười trao bạn lá thư hẹn gặp dưới bóng cây ngân hạnh đêm trăng.",
    options: [
      {
        text: "Đến hẹn trao nàng nụ hôn đầu lãng mạn",
        action: (p, eff, log) => { p.luck += 15; eff("heal"); log("Tâm hồn phơi phới niềm vui tuổi trẻ! Khí vận +15.", "text-pink-300 font-bold"); }
      },
      {
        text: "Lạnh lùng đốt thư: 'Phụ nữ chỉ làm chậm tốc độ rút kiếm của ta!'",
        action: (p, eff, log) => { p.root += 8; log("Đạo tâm sắc đá! Tập trung luyện kiếm thâu đêm suốt sáng. Căn cốt +8.", "text-cyan-300"); }
      },
      {
        text: "Bị bạn bè nàng giăng bẫy xô xuống hồ nước đá trêu chọc",
        action: (p, eff, log) => { p.health -= 15; eff("shake"); log("Hóa ra đó chỉ là trò đùa cá cược của đám tiểu thư nhà giàu! Nhục nhã ê chề.", "text-red-400"); }
      }
    ]
  },
  {
    id: "df_17_khe_uoc_quy_du",
    title: "👿 Khế Ước Quỷ Dữ Dưới Đáy Giếng Ma",
    minAge: 14, maxAge: 17,
    requireTags: ["ma_dao_tu_si"], excludeTags: [],
    desc: "Một bóng ma tà ác hiện lên từ làn khói đen: 'Hiến tế 10 năm thọ mệnh, ta cho ngươi sức mạnh xé toạc sắt thép!'",
    options: [
      {
        text: "Ký máu hiến tế 10 năm thọ mệnh",
        action: (p, eff, log) => { p.maxAge -= 10; p.root += 35; p.tags.push("khe_uoc_ac_quy"); eff("blood"); log("Ma lực đen ngòm tràn ngập tĩnh mạch! Căn cốt +35 nhưng thọ mệnh tối đa vĩnh viễn giảm 10 năm!", "text-rose-400 font-black"); }
      },
      {
        text: "Dùng bùa chú ánh sáng trục xuất con quỷ",
        action: (p, eff, log) => { p.karma += 25; p.intell += 8; eff("lightning"); log("Thần thánh giáng lâm xua tan bóng tối! Công đức +25, Ngộ tính +8.", "text-emerald-300 font-bold"); }
      },
      {
        text: "Lừa con quỷ chui vào lọ thủy tinh rồi đậy nắp niêm phong",
        action: (p, eff, log) => { p.inventory.push({ id: "item_binh_nhot_quy", name: "Bình Nhốt Quỷ Nhỏ", type: "Pháp Bảo", rarity: "Địa Cấp" }); eff("gold"); log("Thu phục được [Bình Nhốt Quỷ Nhỏ] vô giá!", "text-yellow-300 font-bold"); }
      }
    ]
  },
  {
    id: "df_18_trom_bi_kip_vien_truong",
    title: "📚 Đột Nhập Thư Viện Cấm Của Viện Trưởng",
    minAge: 15, maxAge: 17,
    requireTags: [], excludeTags: [],
    desc: "Nửa đêm canh ba, cánh cửa phong ấn Thư Viện Cấm vô tình hé mở để lộ hàng trăm cuốn cổ thư phát sáng.",
    options: [
      {
        text: "Lẻn vào đọc trộm bộ Thần Chú Băng Giá Cực Hạn",
        action: (p, eff, log) => {
          if (p.intell >= 50) { p.intell += 20; p.exp += 60; eff("lightning"); log("Lĩnh ngộ đại ma pháp thất truyền! Ngộ tính +20, EXP +60!", "text-cyan-300 font-black"); }
          else { p.health -= 35; eff("blood"); log("Bị bẫy ma pháp sét giật cháy khét quần áo! Sức khỏe -35%.", "text-red-400 font-bold"); }
        }
      },
      {
        text: "Trộm cuốn sách đắt tiền nhất nhét vào cạp quần tẩu thoát",
        action: (p, eff, log) => { p.money += 150; eff("gold"); log("Bán cho chợ đen thu về 150 đồng vàng! Trở thành tay buôn cấm thư.", "text-yellow-300 font-bold"); }
      },
      {
        text: "Khóa cửa lại và báo cho lính gác bảo an",
        action: (p, eff, log) => { p.karma += 15; p.money += 20; log("Được viện trưởng khen ngợi thưởng 20 đồng bạc trung thực.", "text-slate-300"); }
      }
    ]
  },
  {
    id: "df_19_cuoc_thanh_trung_tong_mon",
    title: "🗡️ Cuộc Thanh Trừng Phản Đồ Nội Bộ",
    minAge: 16, maxAge: 17,
    requireTags: [], excludeTags: [],
    desc: "Tiếng chuông báo động xé tan màn đêm, một phe cánh phản loạn nổi dậy đòi ám sát thủ lĩnh môn phái!",
    options: [
      {
        text: "Rút kiếm bảo vệ thủ lĩnh lập đại công",
        action: (p, eff, log) => {
          if (p.root > 45) { p.root += 15; p.money += 100; p.tags.push("than_tin_thu_linh"); eff("lightning"); log("Chém chết 3 tên phản tặc! Trở thành [than_tin_thu_linh], nhận 100 đồng vàng!", "text-yellow-300 font-bold"); }
          else { p.health -= 40; eff("blood"); log("Bị phản quân chém trọng thương suýt đứt lìa cánh tay! Mất 40% Sức khỏe.", "text-red-400 font-bold"); }
        }
      },
      {
        text: "Gia nhập phe phản quân lật đổ chế độ cũ",
        action: (p, eff, log) => { p.karma -= 40; p.money += 200; eff("blood"); log("Tắm máu tu viện, chia chác kho báu phản tặc! Nhận 200 đồng vàng nhưng mang danh phản đồ.", "text-purple-300 font-bold"); }
      },
      {
        text: "Chui xuống hầm rượu trốn qua đêm giông bão",
        action: (p, eff, log) => { log("Uống say mèm qua cơn biến loạn, sáng hôm sau bình yên bước ra.", "text-slate-300"); }
      }
    ]
  },
  {
    id: "df_20_ngay_tot_nghiep",
    title: "🎓 Lễ Trưởng Thành Trao Kiếm Rời Học Viện",
    minAge: 17, maxAge: 17,
    requireTags: [], excludeTags: [],
    desc: "Thời khắc thiếu niên khép lại, bạn đứng trên bục vinh dự đón nhận Huy Hiệu Mạo Hiểm Giả để bước vào giang hồ tự lập.",
    options: [
      {
        text: "Cầm kiếm gầm vang thề kiến tạo đế chế riêng",
        action: (p, eff, log) => { p.root += 10; p.luck += 10; eff("gold"); log("Khí phách hiên ngang! Sẵn sàng nghênh chiến thế giới người lớn.", "text-amber-300 font-bold"); }
      },
      {
        text: "Cúi đầu tạ ơn sư phụ dặn dò",
        action: (p, eff, log) => { p.karma += 20; eff("heal"); log("Được sư phụ ban tặng túi dược thảo và lời chúc phúc trường thọ.", "text-emerald-300"); }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // GIAI ĐOẠN 3: NGƯỜI LỚN & HẦM NGỤC DUNGEON (18+ TUỔI) - 20+ SỰ KIỆN
  // --------------------------------------------------------------------------
  {
    id: "df_21_dungeon_tang_1",
    title: "💀 Hầm Ngục Tầng 1: Động Yêu Tinh Goblin",
    minAge: 18, maxAge: 150,
    requireTags: [], excludeTags: [],
    desc: "Đoàn mạo hiểm giả tiến vào hang sâu tăm tối, hàng chục con Goblin cầm dao găm và cung tên phục kích!",
    options: [
      {
        text: "Vung đại kiếm xông pha chém giết mở đường máu",
        action: (p, eff, log) => {
          if (p.root >= 40) { p.exp += 50; p.money += 60; eff("lightning"); log("Chém bay đầu chúa tể Goblin! Thu hoạch 60 Linh thạch và 50 EXP!", "text-emerald-300 font-bold"); }
          else { p.health -= 25; eff("blood"); log("Bị trúng tên độc của Goblin! Mất 25% Sức khỏe.", "text-red-400"); }
        }
      },
      {
        text: "Ném bình dầu hỏa thiêu rụi cả hang ổ",
        action: (p, eff, log) => { p.money += 45; eff("shake"); log("Lửa thiêu nướng chín toàn bộ đàn quái vật. Nhặt nhạnh được 45 Linh thạch.", "text-orange-300"); }
      },
      {
        text: "Dùng Tọa Kỵ tháo chạy giữ mạng",
        action: (p, eff, log) => {
          if (Math.random() < p.mount.escapeRate) { eff("lightning"); log(`Cưỡi [${p.mount.name}] phóng vụt qua vòng vây an toàn!`, "text-cyan-300"); }
          else { p.health -= 35; eff("blood"); log("Bị kẹt lại hầm đá bị chém bầm dập! Mất 35% Sức khỏe.", "text-red-400 font-bold"); }
        }
      }
    ]
  },
  {
    id: "df_22_dungeon_tang_2",
    title: "🧟 Hầm Ngục Tầng 2: Mộ Thất Cổ Thi Hiệp Sĩ Xương",
    minAge: 18, maxAge: 150,
    requireTags: [], excludeTags: [],
    desc: "Tiếng kim loại rỉ sét va chạm rợn người, năm kỵ sĩ xương bọc giáp đen tay cầm kích dài từ cỗ quan tài cổ bước ra.",
    options: [
      {
        text: "Dùng thánh quang ma pháp đập nát linh hồn cốt tướng",
        action: (p, eff, log) => {
          if (p.intell >= 55) { p.exp += 80; p.money += 120; eff("lightning"); log("Cốt tướng tan biến thành cát bụi! Nhặt được 120 Linh thạch và 80 EXP!", "text-yellow-300 font-black"); }
          else { p.health -= 40; eff("blood"); log("Bị lưỡi kích chém xuyên giáp thủng ngực! Mất 40% Sức khỏe.", "text-red-400 font-bold"); }
        }
      },
      {
        text: "Cạy nắp quan tài vơ vét bảo vật rồi bỏ chạy",
        action: (p, eff, log) => { p.money += 90; eff("gold"); log("Vơ vét được chuỗi ngọc hoàng gia cổ! Kiếm lời 90 Linh thạch.", "text-yellow-300 font-bold"); }
      },
      {
        text: "Đứng sững sờ vì kinh hoàng",
        action: (p, eff, log) => { eff("blood"); die("Bị ngũ kích hiệp sĩ xương đâm xuyên tim ghim chặt lên tường đá"); }
      }
    ]
  },
  {
    id: "df_23_dungeon_boss_rong",
    title: "🐉 Đỉnh Hầm Ngục: Hắc Long Rực Lửa",
    minAge: 22, maxAge: 150,
    requireTags: [], excludeTags: [],
    desc: "Cự Long vảy đen khổng lồ cuộn mình trên đống kho báu vàng ngọc, hơi thở phì phò tỏa ra sức nóng nghìn độ!",
    options: [
      {
        text: "Nhắm thẳng mắt rồng phóng Đại Kiếm trảm long",
        action: (p, eff, log) => {
          if (p.root + p.realmIndex * 25 >= 110) {
            p.exp += 250; p.money += 800; p.tags.push("ke_diet_rong");
            eff("lightning");
            log("TRẢM LONG HUYỀN THOẠI! Máu rồng nhuộm đỏ giáp trụ! Nhận thẻ [ke_diet_rong], 800 Linh thạch và 250 EXP!", "text-yellow-300 font-black text-sm");
          } else {
            eff("blood"); die("Bị Hắc Long khạc ngọn lửa địa ngục nung chảy thành đống tro tàn");
          }
        }
      },
      {
        text: "Lén bốc một nắm kim cương rồi bò lùi ra ngoài",
        action: (p, eff, log) => { p.money += 350; eff("gold"); log("Trộm thành công 350 đồng vàng mà không đánh thức quái thú!", "text-emerald-300 font-bold"); }
      },
      {
        text: "Cưỡi Tọa Kỵ xông vào đánh lạc hướng cứu đồng đội",
        action: (p, eff, log) => { p.karma += 50; p.luck += 20; eff("heal"); log("Nghĩa cử anh hùng cảm động thiên hạ! Khí vận +20, Karma +50.", "text-cyan-300 font-bold"); }
      }
    ]
  },
  {
    id: "df_24_ruou_thanh_lau",
    title: "🍷 Đêm Say Mèm Tại Tửu Điếm Phù Hoa",
    minAge: 18, maxAge: 120,
    requireTags: [], excludeTags: [],
    desc: "Sau chuỗi ngày vào sinh ra tử trong hầm ngục, bạn thả mình vào chén rượu nồng cùng các vũ nữ kiều diễm.",
    options: [
      {
        text: "Vung 50 Linh thạch bao trọn phòng vip kết thân đồng đạo",
        action: (p, eff, log) => { if (p.money >= 50) { p.money -= 50; p.luck += 15; eff("gold"); log("Danh tiếng hào sảng vang dội, kết giao nhiều hiệp khách! Khí vận +15.", "text-emerald-300 font-bold"); } else { log("Móc túi rỗng tuếch đành lủi thủi uống rượu cỏ góc phòng.", "text-slate-400"); } }
      },
      {
        text: "Gặp gỡ và hẹn hò với một Nữ Pháp Sư lang bạt",
        action: (p, eff, log) => {
          p.spouse = { name: "Elena Huyết Đồng", affection: 85, realm: "C-Rank Mạo Hiểm Giả" };
          eff("heal");
          log("Tìm thấy tri kỷ trăm năm! [Elena Huyết Đồng] chính thức trở thành Đạo Lữ của bạn!", "text-pink-300 font-bold");
        }
      },
      {
        text: "Gây sự đánh nhau làm vỡ bàn ghế của bang bảo kê",
        action: (p, eff, log) => {
          p.health -= 15;
          p.grudges.push({ id: "grudge_bao_ke", name: "Trùm Bảo Kê Tửu Điếm", reason: "Đập vỡ quán rượu không đền", powerLevel: 45 });
          eff("shake");
          log("Đánh gãy mũi tên bảo kê! Kết thêm một kẻ thù giang hồ nguy hiểm!", "text-red-400 font-bold");
        }
      }
    ]
  },
  {
    id: "df_25_sinh_con_noi_doi",
    title: "👶 Đạo Lữ Hạ Sinh Trưởng Tử",
    minAge: 19, maxAge: 90,
    requireTags: [], excludeTags: [],
    desc: "Tiếng khóc trẻ thơ vang vọng trong Động phủ, người phối ngẫu trao đứa bé sơ sinh vào lòng bạn.",
    options: [
      {
        text: "Truyền 100 Linh thạch tẩy tủy kinh mạch cho con",
        action: (p, eff, log) => {
          const child = { name: p.name.split(" ")[0] + " Thiên Khôi", age: 0, root: Math.floor(p.root * 0.9) + 15, intell: Math.floor(p.intell * 0.9) + 15 };
          p.children.push(child);
          p.money = Math.max(0, p.money - 100);
          eff("heal");
          log(`Hài nhi [${child.name}] sinh ra mang thiên phú vượt trội (Căn cốt: ${child.root}, Ngộ tính: ${child.intell})! Có người kế thừa!`, "text-yellow-300 font-black");
        }
      },
      {
        text: "Ôm con vào lòng nguyện nuôi dạy giản dị bình an",
        action: (p, eff, log) => {
          const child = { name: p.name.split(" ")[0] + " An Nhi", age: 0, root: p.root, intell: p.intell };
          p.children.push(child);
          log(`Đón chào thành viên mới [${child.name}] gia nhập gia tộc!`, "text-emerald-300 font-bold");
        }
      }
    ]
  },
  {
    id: "df_26_ke_thu_vay_ham",
    title: "⚔️ Kẻ Thù Trong Sổ Thù Vặt Tấn Công Động Phủ!",
    minAge: 20, maxAge: 150,
    requireTags: [], excludeTags: [],
    desc: "Mối thù giang hồ năm xưa tìm đến! Kẻ thù dẫn theo đám sát thủ bao vây Động phủ đòi nợ máu!",
    options: [
      {
        text: "Rút vũ khí ra cửa quyết tử bảo vệ gia trang",
        action: (p, eff, log) => {
          if (p.root + p.realmIndex * 30 >= 80) {
            p.grudges.shift(); p.money += 150; p.exp += 60; eff("lightning");
            log("Chém rụng đầu kẻ thù báo thù thành công! Xóa bỏ mối thù trong Sổ Thù Vặt, thu được 150 Linh thạch!", "text-emerald-300 font-bold");
          } else {
            p.health -= 50; eff("blood");
            log("Bị đánh trọng thương đứt gãy gân cốt! Mất 50% Sức khỏe, may mắn thoát hiểm.", "text-red-400 font-bold");
          }
        }
      },
      {
        text: "Lên Tọa Kỵ xé rào trốn thoát",
        action: (p, eff, log) => {
          if (Math.random() < p.mount.escapeRate) { eff("lightning"); log(`Cưỡi [${p.mount.name}] bỏ xa đám truy sát trong gang tấc!`, "text-cyan-300 font-bold"); }
          else { p.health -= 35; eff("blood"); log("Tọa kỵ bị bắn gãy chân, bạn ngã lộn nhào mất 35% Sức khỏe.", "text-red-400"); }
        }
      },
      {
        text: "Chi trả 200 Linh thạch bồi thường giảng hòa",
        action: (p, eff, log) => {
          if (p.money >= 200) { p.money -= 200; p.grudges.shift(); log("Tiền bạc xóa tan ân oán. Kẻ thù nhận tiền rút lui.", "text-slate-300"); }
          else { eff("blood"); die("Không đủ tiền chuộc mạng, bị kẻ thù chém chết tại chỗ"); }
        }
      }
    ]
  },
  {
    id: "df_27_dungeon_bay_sap",
    title: "🪤 Bẫy Gai Nhọn Sụp Đổ Trong Hang Tối",
    minAge: 18, maxAge: 150,
    requireTags: [], excludeTags: [],
    desc: "Vừa bước chân qua ngách đá, sàn đất sụp xuống để lộ hố sâu cắm đầy chông sắt tẩm độc!",
    options: [
      {
        text: "Vận công bật nhảy bám vào mỏm đá phía trên",
        action: (p, eff, log) => {
          if (p.root >= 50) { p.root += 5; eff("heal"); log("Phản xạ phi thân tuyệt mỹ thoát chết trong tấc gang! Căn cốt +5.", "text-emerald-300 font-bold"); }
          else { p.health -= 40; eff("blood"); log("Chân cắm vào chông độc buốt nhói! Mất 40% Sức khỏe.", "text-red-400 font-bold"); }
        }
      },
      {
        text: "Dùng kiếm cắm vào vách đá giảm lực rơi",
        action: (p, eff, log) => { p.health -= 15; eff("shake"); log("Kiếm mẻ một mảng nhưng bảo toàn tính mạng. Mất 15% Sức khỏe.", "text-slate-300"); }
      },
      {
        text: "Bất cẩn rơi thẳng xuống đáy hố",
        action: (p, eff, log) => { eff("blood"); die("Bị vạn tiễn chông độc đâm xuyên người chết trong hố bẫy"); }
      }
    ]
  },
  {
    id: "df_28_dao_lu_phan_boi",
    title: "💔 Đạo Lữ Cuỗm Hết Tiền Bỏ Trốn Theo Kẻ Khác",
    minAge: 25, maxAge: 100,
    requireTags: [], excludeTags: [],
    desc: "Trở về sau chuyến thám hiểm hầm ngục, bạn thấy Động phủ trống trơn, két tiền bị cạy khóa cùng bức thư tuyệt tình!",
    options: [
      {
        text: "Ghi tên kẻ phản bội vào Sổ Thù Vặt, thề truy sát đến cùng trời cuối đất",
        action: (p, eff, log) => {
          p.grudges.push({ id: "grudge_dao_lu", name: p.spouse ? p.spouse.name : "Kẻ Phản Bội", reason: "Cuỗm sạch tiền bạc bỏ trốn", powerLevel: 60 });
          p.spouse = null;
          p.money = 0;
          eff("shake");
          log("Mất trắng gia sản! Hận thù khắc sâu vào xương tủy, đạo tâm biến đổi lạnh lùng!", "text-red-400 font-black");
        }
      },
      {
        text: "Cười lớn giải thoát: 'Của đi thay người, từ nay tự do!'",
        action: (p, eff, log) => { p.spouse = null; p.money = 0; p.intell += 15; log("Một đao chặt đứt hồng trần tơ vương! Ngộ tính +15.", "text-cyan-300 font-bold"); }
      }
    ]
  },
  {
    id: "df_29_thien_thach_roi",
    title: "☄️ Thiên Thạch Hắc Ám Rơi Xuống Vườn Động Phủ",
    minAge: 20, maxAge: 150,
    requireTags: [], excludeTags: [],
    desc: "Một vệt sáng tím xé toạc bầu trời đâm sầm xuống vườn nhà bạn, để lại khối quặng phát ra tiếng thì thầm quái dị.",
    options: [
      {
        text: "Dùng búa rèn đập nát để chế tác Thần Khí",
        action: (p, eff, log) => {
          p.inventory.push({ id: "item_thien_ngoai_than_binh", name: "Cổ Kiếm Thiên Thạch", type: "Vũ Khí", rarity: "Thần Cấp" });
          eff("gold");
          log("Đúc thành công [Cổ Kiếm Thiên Thạch] sắc bén vô song xé toạc vạn vật!", "text-yellow-300 font-black");
        }
      },
      {
        text: "Bán khối đá cho Hội Ma Pháp Viện",
        action: (p, eff, log) => { p.money += 500; eff("gold"); log("Thu về 500 đồng vàng tiền mặt từ các viện sĩ!", "text-emerald-300 font-bold"); }
      },
      {
        text: "Áp tai vào tảng đá nghe tiếng thì thầm",
        action: (p, eff, log) => { p.health -= 30; eff("shake"); log("Tiếng thì thầm của Cthulhu làm bạn chảy máu tai suýt phát điên! Mất 30% Sức khỏe.", "text-purple-300"); }
      }
    ]
  },
  {
    id: "df_30_am_sat_lanh_chua",
    title: "🎯 Hợp Đồng Ám Sát Lãnh Chúa Độc Tài",
    minAge: 25, maxAge: 120,
    requireTags: [], excludeTags: [],
    desc: "Hắc Hồi đưa ra mức thù lao kỷ lục 1,000 Linh Thạch để lấy đầu tên Lãnh Chúa bạo tàn chuyên bóc lột dân lành.",
    options: [
      {
        text: "Đột nhập pháo đài ám sát ban đêm",
        action: (p, eff, log) => {
          if (p.intell + p.root >= 120) {
            p.money += 1000; p.exp += 150; p.karma += 50; eff("lightning");
            log("Lãnh chúa đền tội trong giấc ngủ! Nhận đủ 1,000 Linh Thạch và danh xưng Anh Hùng Bóng Đêm!", "text-yellow-300 font-black");
          } else {
            eff("blood"); die("Bị hàng trăm kỵ sĩ hộ vệ bủa vây chém chết trong phòng ngủ lãnh chúa");
          }
        }
      },
      {
        text: "Bán thông tin vụ ám sát cho Lãnh chúa để kiếm tiền thưởng",
        action: (p, eff, log) => { p.money += 400; p.karma -= 40; eff("gold"); log("Lãnh chúa thưởng 400 đồng vàng, nhưng bạn bị toàn bộ Hắc Hội truy sát!", "text-purple-300 font-bold"); }
      },
      {
        text: "Từ chối nhiệm vụ vì quá nguy hiểm",
        action: (p, eff, log) => { log("Bảo toàn tính mạng sống những ngày bình yên.", "text-slate-300"); }
      }
    ]
  },
  {
    id: "df_31_than_thu_giao_khe_uoc",
    title: "🦁 Bạch Hổ Thánh Thú Bị Thương Cầu Cứu",
    minAge: 20, maxAge: 150,
    requireTags: [], excludeTags: [],
    desc: "Con hổ trắng khổng lồ mang vết thương chém sâu tới tận xương ngã gục trước cửa Động phủ của bạn.",
    options: [
      {
        text: "Dùng đan dược cứu chữa và ký Khế Ước Đồng Hành",
        action: (p, eff, log) => {
          p.mount = { id: "mount_bach_ho", name: "Bạch Hổ Thánh Thú", cost: 0, escapeRate: 0.9, desc: "Chúa sơn lâm hộ vệ uy dũng (90% trốn thoát)." };
          p.karma += 40; eff("heal");
          log("Thánh thú cảm phục ơn cứu mạng, nguyện trở thành Tọa Kỵ trung thành nhất của bạn!", "text-yellow-300 font-black");
        }
      },
      {
        text: "Giết hổ lột da lấy xương nấu cao bồi bổ",
        action: (p, eff, log) => { p.root += 30; p.karma -= 30; eff("blood"); log("Hấp thụ tủy hổ thần thánh, Căn cốt +30 nhưng mang nghiệp sát sinh thú linh.", "text-rose-400 font-bold"); }
      }
    ]
  },
  {
    id: "df_32_ruot_duoi_tren_khong",
    title: "🦅 Cuộc Rượt Đuổi Không Chiến Giữa Tầng Mây",
    minAge: 20, maxAge: 150,
    requireTags: [], excludeTags: [],
    desc: "Đang ngự Tọa Kỵ bay qua rặng núi, một toán phi tặc cưỡi Dực Long lao tới xả ma pháp truy sát!",
    options: [
      {
        text: "Vít hết tốc lực Tọa Kỵ xé gió lộn nhào né đạn",
        action: (p, eff, log) => {
          if (Math.random() < p.mount.escapeRate) { eff("lightning"); log(`[${p.mount.name}] lượn vòng xuyên qua khe núi cắt đuôi phi tặc ngoạn mục!`, "text-cyan-300 font-bold"); }
          else { p.health -= 35; eff("shake"); log("Tọa kỵ trúng đạn lộn nhào rơi xuống rừng! Mất 35% Sức khỏe.", "text-red-400"); }
        }
      },
      {
        text: "Nhảy sang lưng rồng của tên đầu sỏ chém giết",
        action: (p, eff, log) => {
          if (p.root >= 65) { p.money += 200; p.exp += 80; eff("blood"); log("Đoạt lấy rồng phi tặc, chém chết tên đầu sỏ! Thu về 200 Linh thạch!", "text-emerald-300 font-bold"); }
          else { eff("blood"); die("Trượt chân rơi từ độ cao 5,000 mét xuống vực sâu nát thịt"); }
        }
      }
    ]
  },
  {
    id: "df_33_dai_hoi_vo_thuat_de_quoc",
    title: "🏆 Đại Hội Võ Thuật Đấu Trường Đế Quốc",
    minAge: 20, maxAge: 80,
    requireTags: [], excludeTags: [],
    desc: "Đấu trường La Mã chật ních mười vạn khán giả reo hò, tiếng trống thúc giục các võ sĩ bước vào cát nóng.",
    options: [
      {
        text: "Đăng ký thi đấu tranh chức Quán Quân",
        action: (p, eff, log) => {
          if (p.root + p.realmIndex * 20 >= 90) {
            p.money += 500; p.exp += 120; p.luck += 25; eff("gold");
            log("VÔ ĐỊCH ĐẤU TRƯỜNG ĐẾ QUỐC! Hoàng đế đích thân trao vương miện và 500 đồng vàng!", "text-yellow-300 font-black text-sm");
          } else {
            p.health -= 45; eff("blood"); log("Bị Đấu Sĩ Khổng Lồ đập gãy xương sườn phải khiêng ra ngoài. Mất 45% Máu.", "text-red-400 font-bold");
          }
        }
      },
      {
        text: "Đặt cược 200 Linh thạch vào bản thân",
        action: (p, eff, log) => {
          if (p.money >= 200) {
            p.money += 400; eff("gold"); log("Thắng cược nhân đôi số tiền! Kiếm được 400 Linh thạch!", "text-emerald-300 font-bold");
          } else { log("Không đủ tiền cược đành ngồi xem cổ vũ.", "text-slate-400"); }
        }
      }
    ]
  },
  {
    id: "df_34_than_bi_di_gioi_chieu_hon",
    title: "🌀 Cổng Dịch Chuyển Isekai Bất Ngờ Xuất Hiện",
    minAge: 18, maxAge: 150,
    requireTags: [], excludeTags: [],
    desc: "Một lỗ sâu không gian mở ra giữa phòng ngủ của bạn, hút lấy đồ vật và phát ra tiếng nhạc xập xình từ thế giới hiện đại.",
    options: [
      {
        text: "Thò tay giật lấy chiếc điện thoại thông minh đang rơi",
        action: (p, eff, log) => {
          p.inventory.push({ id: "item_smartphone", name: "Điện Thoại Trái Đất Cũ", type: "Thần Vật", rarity: "Thần Cấp" });
          p.intell += 15; eff("gold");
          log("Nhặt được [Điện Thoại Trái Đất Cũ] chứa toàn bộ tri thức khoa học! Ngộ tính +15!", "text-cyan-300 font-bold");
        }
      },
      {
        text: "Niêm phong cổng không gian bảo vệ gia đình",
        action: (p, eff, log) => { p.karma += 20; eff("heal"); log("Ngăn chặn thảm họa không gian nứt vỡ xâm lấn tam giới.", "text-emerald-300"); }
      },
      {
        text: "Nhảy tọt vào cổng xem có về lại Trái Đất được không",
        action: (p, eff, log) => { eff("shake"); die("Bị áp suất không gian xé rách cơ thể tan thành cát bụi vũ trụ"); }
      }
    ]
  },
  {
    id: "df_35_kho_bau_bien_sau",
    title: "⚓ Thám Hiểm Xác Tàu Đắm Biển Đen",
    minAge: 20, maxAge: 150,
    requireTags: [], excludeTags: [],
    desc: "Lặn sâu xuống đáy Biển Đen nơi con tàu ma của Thuyền Trưởng Vong Hồn chìm đắm nghìn năm trước.",
    options: [
      {
        text: "Mở rương châu báu dưới buồng thuyền trưởng",
        action: (p, eff, log) => { p.money += 400; p.exp += 60; eff("gold"); log("Trúng mánh lớn! Vơ vét được 400 Linh thạch và hải đồ ma thuật!", "text-yellow-300 font-bold"); }
      },
      {
        text: "Bị quái vật xúc tu Kraken khổng lồ quấn chặt",
        action: (p, eff, log) => {
          if (p.root >= 60) { p.root += 10; eff("shake"); log("Chém đứt xúc tu trồi lên mặt nước an toàn! Căn cốt +10.", "text-cyan-300"); }
          else { p.health -= 45; eff("blood"); log("Bị quất gãy 3 khúc xương sườn suýt chết chìm! Mất 45% Máu.", "text-red-400 font-bold"); }
        }
      }
    ]
  },
  {
    id: "df_36_dich_benh_ma_tinh",
    title: "🧪 Thuốc Giải Độc Cứu Cả Tông Tộc",
    minAge: 20, maxAge: 150,
    requireTags: [], excludeTags: [],
    desc: "Gia tộc bị đầu độc bởi khí tức Ma Tinh hắc ám, vợ con và huynh đệ ngã bệnh nguy kịch.",
    options: [
      {
        text: "Rạch cổ tay dùng máu nguyên anh thanh lọc thuốc cho gia tộc",
        action: (p, eff, log) => { p.health -= 20; p.karma += 60; eff("heal"); log("Cứu sống trọn vẹn gia tộc! Công đức vô lượng tích lũy gia vận vinh quang!", "text-yellow-300 font-bold"); }
      },
      {
        text: "Bỏ tiền túi 300 Linh thạch mua thần dược cứu mạng",
        action: (p, eff, log) => { p.money = Math.max(0, p.money - 300); log("Tốn 300 Linh thạch cứu chữa cho gia quyến khỏi cơn hoạn nạn.", "text-slate-300"); }
      }
    ]
  },
  {
    id: "df_37_dao_chich_trom_nha",
    title: "🥷 Tên Trộm Lẻn Vào Động Phủ Đêm Trăng",
    minAge: 18, maxAge: 150,
    requireTags: [], excludeTags: [],
    desc: "Tiếng bước chân rón rén bên gian đan dược đánh thức bạn lúc nửa đêm.",
    options: [
      {
        text: "Bật đèn chém chết tên trộm tại chỗ",
        action: (p, eff, log) => { p.money += 50; eff("blood"); log("Tên trộm đền mạng! Lục túi hắn nhặt được 50 đồng bạc.", "text-emerald-300"); }
      },
      {
        text: "Tha mạng và thu nhận hắn làm thuộc hạ trông nhà",
        action: (p, eff, log) => { p.karma += 20; log("Hắn quỳ lạy cảm kích, từ nay trở thành người gác cổng trung thành.", "text-cyan-300"); }
      }
    ]
  },
  {
    id: "df_38_than_chien_cuoi_cung",
    title: "⚔️ Trận Thánh Chiến Bảo Vệ Vương Quốc",
    minAge: 25, maxAge: 150,
    requireTags: [], excludeTags: [],
    desc: "Binh đoàn quỷ dữ vạn trượng vượt qua tường thành, tiếng tù và thúc giục toàn thể mạo hiểm giả xung trận!",
    options: [
      {
        text: "Cầm cờ dẫn đầu đoàn quân tử chiến",
        action: (p, eff, log) => {
          if (p.root + p.realmIndex * 35 >= 140) {
            p.exp += 300; p.money += 1200; p.tags.push("anh_hung_cuu_the");
            eff("lightning");
            log("CHIẾN THẮNG HUYỀN THOẠI! Đẩy lùi quân đoàn quỷ dữ, phong tước Đại Tướng Quân Cứu Thế!", "text-yellow-300 font-black text-sm");
          } else {
            eff("blood"); die("Tử trận oanh liệt nơi sa trường dưới biển đao thương quỷ tộc");
          }
        }
      },
      {
        text: "Dựng kết giới phòng thủ bảo vệ hậu phương",
        action: (p, eff, log) => { p.karma += 80; p.intell += 20; eff("heal"); log("Bảo vệ vạn dân vô tội an toàn qua cơn binh lửa! Đại công đức viên mãn.", "text-emerald-300 font-bold"); }
      }
    ]
  },
  {
    id: "df_39_tu_tuan_gia_canh",
    title: "🍵 Bát Trà Dưỡng Lão Bên Hiên Động Phủ",
    minAge: 60, maxAge: 200,
    requireTags: [], excludeTags: [],
    desc: "Mái tóc đã hoa râm, bạn ngồi ngắm đàn con cháu nô đùa trước sân Tiên Gia Động Phủ thơm mùi hoa cúc.",
    options: [
      {
        text: "Truyền dạy bí kíp gia truyền cho trưởng tử",
        action: (p, eff, log) => {
          if (p.children.length > 0) { p.children[0].root += 20; p.children[0].intell += 20; log(`Trưởng tử [${p.children[0].name}] tiếp thu trọn vẹn võ học chân truyền! Căn cốt +20!`, "text-yellow-300 font-bold"); }
          else { log("Thở dài vì không có con cái nối dõi tông đường.", "text-slate-400"); }
        }
      },
      {
        text: "Nhấp ngụm trà ngon mỉm cười an lạc",
        action: (p, eff, log) => { p.health = Math.min(100, p.health + 10); p.luck += 10; log("Tâm cảnh đạt tới cảnh giới vô vi tự tại.", "text-emerald-300"); }
      }
    ]
  },
  {
    id: "df_40_phi_thang_than_gioi",
    title: "🌌 Cổng Thần Giới Mở Ra: Vĩnh Hằng Bất Diệt",
    minAge: 30, maxAge: 999,
    requireTags: [], excludeTags: [],
    desc: "Vượt qua muôn trùng thử thách ma luyện, vầng hào quang thần thánh chiếu rọi đón rước bạn bước vào hàng ngũ Vị Thần!",
    options: [
      {
        text: "Bước lên ngai vàng Vị Thần Tối Cao",
        action: (p, eff, log) => {
          if (p.realmIndex >= 4) {
            p.realm = "Thần Thoại"; p.maxAge += 1000;
            eff("lightning");
            log("BẤT TỬ BẤT DIỆT! Trở thành Vị Thần cai quản thế giới! Thọ mệnh trường tồn nghìn năm!", "text-yellow-300 font-black text-base");
          } else {
            p.health -= 50; eff("blood"); log("Tu vi chưa đủ bị áp lực Thần Giới đánh bật ngược trở lại mặt đất! Mất 50% Máu.", "text-red-400 font-bold");
          }
        }
      },
      {
        text: "Từ chối thần vị, ở lại nhân gian bên cạnh gia tộc",
        action: (p, eff, log) => { p.karma += 100; p.luck += 50; eff("heal"); log("Chọn ở lại che chở cháu con muôn đời! Gia tộc hưng thịnh ngàn năm!", "text-emerald-300 font-bold"); }
      }
    ]
  }
];
