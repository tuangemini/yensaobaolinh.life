/**
 * Dữ liệu sản phẩm Yến Sào Bảo Linh
 * Nguồn tài liệu & hình ảnh từ folder Yến Sào Bảo Linh
 */
const PRODUCTS_DATA = [
  {
    id: "yen-tinh-che-thuong-hang",
    title: "Yến Tinh Chế Thượng Hạng Bảo Linh",
    category: "tinh-che",
    categoryName: "Yến Tinh Chế",
    image: "Tổ Yến Sào Bảo Linh 01.jpg",
    gallery: [
      "Tổ Yến Sào Bảo Linh 01.jpg",
      "Bên trong Hộp Yến Sào Bảo Linh.jpg",
      "Đóng hộp Yến Sào Bảo Linh 01.jpg"
    ],
    price50g: 2200000,
    price100g: 4200000,
    unit: "Hộp 100g / 50g",
    badge: "Bán Chạy Nhất",
    rating: 5.0,
    reviewsCount: 168,
    summary: "Nhặt sạch lông thủ công 100% bằng nước tinh khiết, sấy lạnh tiệt trùng khép kín, sợi yến dày nở phồng nhiều.",
    description: "Tổ yến tinh chế thượng hạng Bảo Linh được tuyển chọn từ những tổ yến dày dặn nhất thu hoạch từ nhà yến Cam Ranh - Khánh Hòa. Thợ lành nghề tỉ mỉ làm sạch từng sợi lông tơ và tạp chất dưới kính lúp. Giữ nguyên vi chất, mùi tanh ngai ngái nhẹ đặc trưng của yến biển tự nhiên.",
    specifications: {
      "Xuất xứ": "Nhà yến Bảo Linh - Cam Ranh, Khánh Hòa (từ 2017)",
      "Quy cách": "Hộp định hình 50g (5 - 6 tai) hoặc 100g (10 - 12 tai)",
      "Độ ẩm": "Dưới 10% (Sấy khô giòn, bảo quản lâu dài)",
      "Tỷ lệ nở": "Nở gấp 4 - 6 lần so với thể tích ban đầu",
      "Bảo quản": "Nơi khô ráo, thoáng mát hoặc ngăn mát tủ lạnh"
    },
    gifts: [
      "Tặng 01 hộp táo đỏ Tân Cương thượng hạng",
      "Tặng 01 hộp đường phèn kết tinh tinh khiết",
      "Tặng 01 hộp hạt sen Đồng Tháp",
      "Túi xách & Hộp quà thương hiệu Bảo Linh sang trọng"
    ]
  },
  {
    id: "yen-tho-nguyen-to-gia",
    title: "Tổ Yến Thô Nguyên Tổ Khánh Hòa",
    category: "yen-tho",
    categoryName: "Yến Thô Tự Nhiên",
    image: "Tổ Yến Sào Bảo Linh 02.jpg",
    gallery: [
      "Tổ Yến Sào Bảo Linh 02.jpg",
      "Thu Hoạch Tổ Yến Sào Bảo Linh 01.jpg",
      "Khai thác Yến Sào Bảo Linh.jpg"
    ],
    price50g: 1750000,
    price100g: 3300000,
    unit: "Hộp 100g / 50g",
    badge: "100% Thuần Khiết",
    rating: 4.9,
    reviewsCount: 142,
    summary: "Hái trực tiếp từ vách gỗ nhà yến, nguyên vẹn lông và mùi thơm đặc trưng của yến biển, sợi giòn dai đượm vị.",
    description: "Tổ yến thô được người thợ hái cẩn thận khi chim non đã lớn bay đi. Đây là sản phẩm dành riêng cho khách hàng muốn tự tay làm sạch tổ yến để đảm bảo độ tin cậy tuyệt đối. Tổ già, sợi gân nổi rõ, ít lông, rất dễ nhặt.",
    specifications: {
      "Xuất xứ": "Cam Ranh, Khánh Hòa - Nhà yến Bảo Linh",
      "Đặc điểm": "Tai yến hình chén vòm cung khum dày, màu trắng ngà tự nhiên",
      "Trọng lượng": "Hộp 50g (5-6 tổ) hoặc 100g (10-12 tổ)",
      "Hạn dùng": "2 - 3 năm trong môi trường khô thoáng"
    },
    gifts: [
      "Tặng nhíp chuyên dụng gắp lông yến thép không gỉ",
      "Tặng đường phèn hoa cúc thanh mát",
      "Tặng táo đỏ hữu cơ",
      "Cẩm nang hướng dẫn mẹo nhặt lông yến sạch bong trong 20 phút"
    ]
  },
  {
    id: "hop-qua-bieu-hoang-kim",
    title: "Hộp Quà Biếu Cao Cấp Yến Sào Bảo Linh",
    category: "qua-bieu",
    categoryName: "Hộp Quà Biếu",
    image: "Bao bì đóng gói Yến Sào Bảo Linh.jpg",
    gallery: [
      "Bao bì đóng gói Yến Sào Bảo Linh.jpg",
      "Yến Sào Bảo Linh.jpg",
      "Đóng hộp Yến Sào Bảo Linh 01.jpg",
      "Bên trong Hộp Yến Sào Bảo Linh.jpg"
    ],
    price50g: 2600000,
    price100g: 4850000,
    unit: "Set Quà Biếu VIP",
    badge: "Quà Tặng Thượng Hạng",
    rating: 5.0,
    reviewsCount: 215,
    summary: "Thiết kế hoàng gia tông đỏ ruby & viền vàng kim, trọn bộ sản phẩm sang trọng thể hiện sự tri ân và đẳng cấp.",
    description: "Hộp quà biếu cao cấp Bảo Linh mang ý nghĩa 'Phú Quý Bình An - Trường Thọ An Khang'. Được chế tác từ chất liệu hộp cứng cáp, hoa văn ép kim sắc sảo mang màu sắc nhận diện thương hiệu Bảo Linh. Thích hợp làm quà tặng đối tác, quà biếu cha mẹ, sếp và các dịp lễ tết quan trọng.",
    specifications: {
      "Bộ quà gồm": "100g Yến thượng hạng + Thố sứ cao cấp + Táo đỏ + Hạt sen + Long nhãn + Đường phèn",
      "Quy cách hộp": "Hộp cứng cao cấp phủ nhung & ép kim nhũ vàng",
      "Túi xách": "Túi giấy quai lụa đỏ vàng đồng bộ"
    },
    gifts: [
      "Tặng thố chưng yến bằng gốm sứ cao cấp tráng men ngọc",
      "Tặng bộ gia vị chưng bát vị dưỡng nhan",
      "Thiệp chúc mừng sang trọng và hướng dẫn bồi bổ"
    ]
  },
  {
    id: "yen-rut-long-kho-vip",
    title: "Yến Rút Lông Định Hình Xuất Khẩu",
    category: "cao-cap",
    categoryName: "Yến Rút Lông VIP",
    image: "Tổ Yến Sào Bảo Linh 03.jpg",
    gallery: [
      "Tổ Yến Sào Bảo Linh 03.jpg",
      "Tổ Yến Sào Bảo Linh 05.jpg",
      "Tổ Yến Sào Bảo Linh 06.jpg"
    ],
    price50g: 2700000,
    price100g: 5200000,
    unit: "Hộp 100g / 50g",
    badge: "Chuẩn Xuất Khẩu",
    rating: 5.0,
    reviewsCount: 98,
    summary: "Được rút lông từ tổ thô nguyên khối ít ẩm, giữ nguyên đôi cánh yến và chân yến dày chắc.",
    description: "Đỉnh cao của nghệ thuật làm sạch yến sào. Chỉ những người thợ có thâm niên trên 5 năm tại xưởng Bảo Linh mới được thực hiện công đoạn rút lông khô này. Tổ yến giữ được 99% dáng tổ tự nhiên nguyên bản từ vách đá, hàm lượng dinh dưỡng và mùi hương trọn vẹn nhất.",
    specifications: {
      "Phân hạng": "Loại 1 đặc biệt xuất khẩu",
      "Độ nở": "Gấp 5 - 7 lần, sợi dai dòn ngập miệng",
      "Hàm lượng Protein": "> 55% kiểm nghiệm độc lập"
    },
    gifts: [
      "Tặng đông trùng hạ thảo sinh khối loại 1",
      "Tặng táo đỏ, hạt sen, đường phèn Quảng Ngãi",
      "Hộp quà bảo vệ chống ẩm cao cấp"
    ]
  },
  {
    id: "chan-yen-tinh-che-giau-dinh-duong",
    title: "Chân Tổ Yến Sạch Sợi Giòn Giàu Dưỡng Chất",
    category: "tinh-che",
    categoryName: "Chân Yến Tinh Chế",
    image: "Tổ Yến Sào Bảo Linh 04.jpg",
    gallery: [
      "Tổ Yến Sào Bảo Linh 04.jpg",
      "Tổ Yến Sào Bảo Linh 05.jpg"
    ],
    price50g: 1900000,
    price100g: 3600000,
    unit: "Hộp 100g / 50g",
    badge: "Ăn Thật Đã Miệng",
    rating: 4.8,
    reviewsCount: 130,
    summary: "Phần chân tổ yến chắc nịch nhất, chưng lên nở to, sần sật giòn tan, bổ dưỡng tối ưu.",
    description: "Chân yến là điểm tựa mà chim yến phải nhả nhiều dịch nước bọt đặc quánh nhất để neo tổ bám chắc vào giá gỗ nhà yến. Do đó, phần này chứa hàm lượng vi chất rất cô đặc, khi chưng thơm nức, ăn sực sực rất thú vị.",
    specifications: {
      "Nguồn gốc": "Chân tổ yến thu hái tại hệ thống nhà yến Cam Ranh",
      "Quy cách": "50g hoặc 100g đã nhặt sạch sấy khô giòn",
      "Thời gian chưng": "Chưng từ 35 - 45 phút để chân nở mềm ngon"
    },
    gifts: [
      "Đường phèn kết tinh tự nhiên",
      "Táo đỏ khô Tân Cương ngọt thơm"
    ]
  },
  {
    id: "to-yen-rut-long-tinh-che-06",
    title: "Tổ Yến Tinh Chế Sợi Dài Cánh Sen",
    category: "tinh-che",
    categoryName: "Yến Tinh Chế",
    image: "Tổ Yến Sào Bảo Linh 06.jpg",
    gallery: [
      "Tổ Yến Sào Bảo Linh 06.jpg",
      "Tổ Yến Sào Bảo Linh 05.jpg",
      "Bên trong Hộp Yến Sào Bảo Linh.jpg"
    ],
    price50g: 2100000,
    price100g: 4000000,
    unit: "Hộp 100g / 50g",
    badge: "Phù Hợp Cho Mọi Nhà",
    rating: 4.9,
    reviewsCount: 156,
    summary: "Đan sợi cánh sen thanh thoát, màu ngà trong suốt tự nhiên, giàu acid amin bồi bổ cơ thể.",
    description: "Sản phẩm được ép khuôn tạo hình cánh sen tỉ mỉ, sợi yến phủ đều mặt tổ. Thích hợp sử dụng định kỳ hàng tuần cho gia đình có người cao tuổi, trẻ nhỏ gầy yếu và phụ nữ sau sinh.",
    specifications: {
      "Quy cách": "Hộp hoa mai tròn hoặc hộp lục giác cao cấp",
      "Hàm lượng": "100% yến nguyên chất không đường, không độn phụ gia",
      "Đóng gói": "Kèm tem niêm phong chống hàng giả Bảo Linh"
    },
    gifts: [
      "Táo đỏ, hạt sen, đường phèn",
      "Túi đựng quà tặng lịch sự"
    ]
  }
];

// Thư viện hình ảnh thực tế từ folder Yến Sào Bảo Linh
const GALLERY_ITEMS = [
  {
    src: "Nhà Yến Sào Bảo Linh.jpg",
    title: "Toàn Cảnh Hệ Thống Nhà Yến Bảo Linh",
    tag: "Nhà Yến",
    caption: "Hệ thống nhà yến được xây dựng kiên cố tại vùng biển Cam Ranh - Khánh Hòa từ năm 2017."
  },
  {
    src: "Anh Hùng Huvatra Chủ Nhà Yến Sào Bảo  Linh.jpg",
    title: "Anh Hùng - Chủ Nhà Yến Sào Bảo Linh",
    tag: "Chủ Nhà Yến",
    caption: "Anh Hùng trực tiếp phụ trách kỹ thuật âm thanh, vi khí hậu và thu hoạch nhân đạo từ năm 2017."
  },
  {
    src: "Kiểm Tra Nhà Yến Sào Bảo Linh.jpg",
    title: "Kiểm Tra Nhiệt Độ & Độ Ẩm Nhà Yến",
    tag: "Quy Trình",
    caption: "Duy trì môi trường nhiệt độ 27-29°C và độ ẩm 80-85% chuẩn lý tưởng cho chim yến làm tổ."
  },
  {
    src: "Kiểm Tra Nhà Yến Sào Bảo Linh 02.jpg",
    title: "Theo Dõi Tổ Yến Bám Trên Giá Gỗ",
    tag: "Quy Trình",
    caption: "Sử dụng gỗ Bạch Tùng nhập khẩu cao cấp, sạch khuẩn và an toàn cho đàn chim yến phát triển."
  },
  {
    src: "Khai thác Yến Sào Bảo Linh.jpg",
    title: "Khai Thác Tổ Yến Đúng Chu Kỳ",
    tag: "Khai Thác",
    caption: "Chỉ thu hoạch khi chim con đã tự bay tìm kiếm mồi, tôn trọng tự nhiên và phát triển bền vững."
  },
  {
    src: "Thu Hoạch Tổ Yến Sào Bảo Linh 01.jpg",
    title: "Tổ Yến Thu Hoạch Già Tai Dày Sợi",
    tag: "Khai Thác",
    caption: "Từng tai yến già chắc nịch, màu trắng ngà tự nhiên được cẩn thận hái về phòng sơ chế."
  },
  {
    src: "Đóng hộp Yến Sào Bảo Linh 01.jpg",
    title: "Quy Trình Đóng Hộp Thành Phẩm",
    tag: "Đóng Hộp",
    caption: "Sản phẩm được tiệt trùng tia UV, sấy lạnh chân không và đóng gói trong phòng sạch tiêu chuẩn."
  },
  {
    src: "Bao bì đóng gói Yến Sào Bảo Linh.jpg",
    title: "Bao Bì Hộp Quà Biếu Sang Trọng",
    tag: "Bao Bì",
    caption: "Bộ nhận diện thương hiệu đỏ nhung hoàng kim ấn tượng, trọn vẹn đẳng cấp quà tặng sức khỏe."
  },
  {
    src: "Bên trong Hộp Yến Sào Bảo Linh.jpg",
    title: "Bên Trong Hộp Yến Sào Bảo Linh",
    tag: "Thành Phẩm",
    caption: "Tổ yến xếp ngay ngắn, kèm đầy đủ nguyên liệu chưng cao cấp và tem mác nguồn gốc xuất xứ rõ ràng."
  }
];

// Danh sách video thực tế từ folder Yến Sào Bảo Linh
const VIDEO_ITEMS = [
  {
    id: "video-1",
    src: "Video Ben trong Nhà yến Sào Bảo Linh.mp4",
    title: "Bên Trong Nhà Yến Bảo Linh - Đàn Yến Về Làm Tổ",
    desc: "Ghi lại chân thực không gian sống động bên trong nhà yến, tiếng chim yến ríu rít và những tổ yến dày đặc bám trên dàn gỗ Bạch Tùng.",
    badge: "Thực Tế 100%"
  },
  {
    id: "video-2",
    src: "Video Nhà Yến Sào Bảo Linh 01.mp4",
    title: "Toàn Cảnh Hệ Thống Nhà Yến Bảo Linh Tại Cam Ranh",
    desc: "Khám phá quy mô nhà yến cao tầng kiên cố, tọa lạc tại vị trí đắc địa gần biển đón gió lành và nguồn thức ăn dồi dào từ biển Khánh Hòa.",
    badge: "Hạ Tầng Hiện Đại"
  },
  {
    id: "video-3",
    src: "Video Nhà Yến Sào Bảo Linh 02.mp4",
    title: "Kiểm Tra Chất Lượng Tổ Yến Tại Nhà Nuôi",
    desc: "Hình ảnh cận cảnh quá trình chuyên gia kiểm tra sức khỏe đàn chim và đo lường độ già chuẩn của các tổ yến trước khi thu hái.",
    badge: "Quy Chuẩn Khắt Khe"
  }
];
