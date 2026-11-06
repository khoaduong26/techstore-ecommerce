export const CATEGORIES = [
  { id: 'all', name: 'Tất cả sản phẩm', icon: 'LayoutGrid' },
  { id: 'laptop', name: 'Laptop & MacBook', icon: 'Laptop', count: 8 },
  { id: 'keyboard', name: 'Bàn phím cơ', icon: 'Keyboard', count: 3 },
  { id: 'mouse', name: 'Chuột & Lót chuột', icon: 'Mouse', count: 3 },
  { id: 'audio', name: 'Tai nghe & Loa', icon: 'Headphones', count: 3 },
  { id: 'accessory', name: 'Phụ kiện & Hub', icon: 'Cpu', count: 3 },
];

export const BRANDS = [
  'Apple',
  'ASUS',
  'Lenovo',
  'Dell',
  'Acer',
  'HP',
  'Logitech',
  'Razer',
  'Keychron',
  'Sony',
  'HyperX',
  'Ugreen',
];

export const PRODUCTS = [
  {
    id: 'lap-01',
    name: 'Laptop Gaming ASUS ROG Strix G16 G614JVR',
    brand: 'ASUS',
    category: 'laptop',
    price: 43990000,
    originalPrice: 47990000,
    discountPercent: 8,
    rating: 4.9,
    reviewsCount: 42,
    stock: 12,
    isFlashSale: true,
    isHot: true,
    isNew: true,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 24 tháng chính hãng Asus VN',
    badge: 'Deal Sốc',
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      cpu: 'Intel Core i7-14650HX (16 nhân, 24 luồng, up to 5.2GHz)',
      ram: '16GB DDR5 5600MHz (2 khe, nâng cấp tối đa 64GB)',
      storage: '1TB SSD M.2 NVMe PCIe 4.0',
      gpu: 'NVIDIA GeForce RTX 4060 8GB GDDR6 (140W TGP)',
      screen: '16.0" QHD+ (2560x1600) 240Hz, 100% DCI-P3, IPS 500 nits',
      battery: '4-cell 90WHrs',
      weight: '2.50 kg',
      os: 'Windows 11 Home Bản Quyền'
    },
    highlights: [
      'Hệ thống tản nhiệt thông minh ROG Intelligent Cooling 3 quạt với kim loại lỏng Conductonaut Extreme',
      'Màn hình Nebula Display 2.5K 240Hz/3ms rực rỡ và mượt mà',
      'Thiết kế khung kim loại Eclipse Gray hầm hố chuẩn Gaming eSports',
      'Đầy đủ cổng kết nối cao cấp: Thunderbolt 4, HDMI 2.1 FRL, RJ45 2.5G'
    ],
    gifts: [
      'Balo Gaming ROG Backpack chính hãng trị giá 990.000₫',
      'Chuột Gaming Asus TUF M3 Gen II',
      'Gói bảo vệ toàn diện rơi vỡ Perfect Warranty 1 năm'
    ]
  },
  {
    id: 'lap-02',
    name: 'Laptop Lenovo Legion Pro 5 16IRX9 2024',
    brand: 'Lenovo',
    category: 'laptop',
    price: 49490000,
    originalPrice: 53990000,
    discountPercent: 8,
    rating: 5.0,
    reviewsCount: 38,
    stock: 7,
    isFlashSale: true,
    isHot: true,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 36 tháng Lenovo Premium Care',
    badge: 'Bán chạy nhất',
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      cpu: 'Intel Core i9-14900HX (24 nhân, 32 luồng, up to 5.8GHz)',
      ram: '32GB (2x16GB) DDR5 5600MHz',
      storage: '1TB SSD PCIe NVMe M.2 Gen 4',
      gpu: 'NVIDIA GeForce RTX 4070 8GB GDDR6 (140W)',
      screen: '16" WQXGA (2560x1600) IPS 500nits 240Hz, 100% sRGB, HDR400',
      battery: '80Wh, hỗ trợ sạc siêu tốc Super Rapid Charge Pro',
      weight: '2.55 kg',
      os: 'Windows 11 Home SL'
    },
    highlights: [
      'Bộ vi xử lý flagship Intel Core i9 Gen 14 cực mạnh cho lập trình và render 3D',
      'Chip AI Lenovo LA1 tối ưu hóa hiệu năng theo thời gian thực',
      'Bàn phím Legion TrueStrike hành trình phím 1.5mm cực êm và chuẩn xác',
      'Bảo hành tận nơi 3 năm Lenovo Premium Care độc quyền'
    ],
    gifts: [
      'Balo Legion Gaming Shield chính hãng',
      'Chuột Legion M300s RGB',
      'Voucher giảm 500.000₫ mua RAM nâng cấp'
    ]
  },
  {
    id: 'lap-03',
    name: 'Apple MacBook Pro 14 inch M3 Pro (18GB / 512GB)',
    brand: 'Apple',
    category: 'laptop',
    price: 47890000,
    originalPrice: 49990000,
    discountPercent: 4,
    rating: 4.9,
    reviewsCount: 56,
    stock: 15,
    isFlashSale: false,
    isHot: true,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 12 tháng Apple Care chính hãng toàn cầu',
    badge: 'Pro Choice',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      cpu: 'Apple M3 Pro (11-core CPU, 14-core GPU, 16-core Neural Engine)',
      ram: '18GB Unified Memory tốc độ cao 150GB/s',
      storage: '512GB SSD siêu tốc 5000MB/s',
      gpu: 'Apple 14-Core GPU với Dynamic Caching và Hardware Ray Tracing',
      screen: '14.2" Liquid Retina XDR (3024x1964), 120Hz ProMotion, 1600 nits',
      battery: '70Wh Li-Po, thời lượng pin ấn tượng lên tới 18 giờ',
      weight: '1.61 kg',
      os: 'macOS Sonoma'
    },
    highlights: [
      'Thời lượng pin vượt trội 18 giờ liên tục, máy luôn mát lạnh và êm ái',
      'Màn hình Liquid Retina XDR chuẩn màu hàng đầu thế giới cho dân đồ họa và lập trình',
      'Vỏ nhôm nguyên khối Space Black phủ lớp anodized chống bám vân tay đỉnh cao',
      'Hệ thống 6 loa stereo hỗ trợ Spatial Audio Dolby Atmos rạp hát mini'
    ],
    gifts: [
      'Túi chống sốc cao cấp Tomtoc 360 Defender',
      'Cổng chuyển đổi HyperDrive 4K HDMI 60Hz',
      'Miễn phí cài đặt phần mềm đồ họa trọn đời'
    ]
  },
  {
    id: 'lap-04',
    name: 'Dell XPS 14 9440 (Intel Core Ultra 7 155H)',
    brand: 'Dell',
    category: 'laptop',
    price: 52990000,
    originalPrice: 58990000,
    discountPercent: 10,
    rating: 4.8,
    reviewsCount: 23,
    stock: 5,
    isFlashSale: false,
    isHot: false,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 24 tháng Dell ProSupport tận nơi',
    badge: 'Doanh nhân VIP',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      cpu: 'Intel Core Ultra 7 155H (16 nhân, 22 luồng, NPU Intel AI Boost)',
      ram: '16GB LPDDR5x 7467MHz Dual Channel',
      storage: '512GB PCIe 4.0 NVMe M.2 SSD',
      gpu: 'NVIDIA GeForce RTX 4050 6GB GDDR6 (30W)',
      screen: '14.5" 3.2K (3200 x 2000) OLED Touch 120Hz, 100% DCI-P3, 400 nits',
      battery: '69.5Wh, hỗ trợ ExpressCharge 80% trong 60 phút',
      weight: '1.68 kg',
      os: 'Windows 11 Pro'
    },
    highlights: [
      'Kiệt tác thiết kế nhôm nguyên khối CNC tinh xảo và kính cường lực Gorilla Glass 3',
      'Bàn di chuột haptic ẩn liền mạch dưới kính cực kỳ sang trọng',
      'Tích hợp chip NPU tăng tốc xử lý tác vụ trí tuệ nhân tạo AI cục bộ',
      'Màn hình cảm ứng OLED 3.2K viền siêu mỏng InfinityEdge mãn nhãn'
    ],
    gifts: [
      'Bao da Dell Premier chính hãng',
      'Adapter Dell USB-C sang HDMI/USB-A đa năng',
      'Chuột không dây Bluetooth Dell Premier Rechargeable'
    ]
  },
  {
    id: 'lap-05',
    name: 'Acer Predator Helios Neo 16 PHN16-72',
    brand: 'Acer',
    category: 'laptop',
    price: 36990000,
    originalPrice: 40990000,
    discountPercent: 10,
    rating: 4.7,
    reviewsCount: 31,
    stock: 14,
    isFlashSale: true,
    isHot: false,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 3S1 siêu tốc trong 72 giờ của Acer',
    badge: 'Giá cực tốt',
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      cpu: 'Intel Core i7-14700HX (20 nhân, 28 luồng, up to 5.5GHz)',
      ram: '16GB DDR5 5600MHz (Nâng cấp tối đa 32GB)',
      storage: '512GB PCIe Gen4 NVMe M.2 SSD',
      gpu: 'NVIDIA GeForce RTX 4060 8GB GDDR6 (140W)',
      screen: '16" WQXGA (2560x1600) 165Hz IPS, 100% sRGB, 500 nits G-Sync',
      battery: '90Wh Li-ion',
      weight: '2.6 kg',
      os: 'Windows 11 Home'
    },
    highlights: [
      'Chính sách bảo hành 3S1 VIP độc quyền: kiểm tra & bảo hành nhanh trong 3 ngày kể cả thứ 7, CN',
      'Quạt tản nhiệt kim loại 3D AeroBlade thế hệ thứ 5 độc quyền của Acer',
      'Khắc laser mật mã Cyberpunk trên nắp máy đậm chất Gaming tương lai',
      'Phím tắt PredatorSense kiểm soát tốc độ quạt và ép xung trong tích tắc'
    ],
    gifts: [
      'Balo Acer Predator SUV cao cấp',
      'Chuột Gaming Predator Cestus 310'
    ]
  },
  {
    id: 'lap-06',
    name: 'Laptop HP Omen 16 Transcend 2024',
    brand: 'HP',
    category: 'laptop',
    price: 46990000,
    originalPrice: 51990000,
    discountPercent: 10,
    rating: 4.8,
    reviewsCount: 19,
    stock: 6,
    isFlashSale: false,
    isHot: false,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 24 tháng HP Onsite tận nhà',
    badge: 'Mỏng nhẹ Gaming',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      cpu: 'Intel Core i7-14700HX (20 nhân, 28 luồng, up to 5.5GHz)',
      ram: '16GB DDR5 5600MHz',
      storage: '1TB PCIe Gen4 NVMe TLC M.2 SSD',
      gpu: 'NVIDIA GeForce RTX 4070 8GB GDDR6 (130W)',
      screen: '16" 2.5K WQXGA (2560x1600) 240Hz OLED 0.2ms, 100% DCI-P3',
      battery: '6-cell 97Wh, sạc nhanh HP Fast Charge 50% trong 30 phút',
      weight: '2.09 kg',
      os: 'Windows 11 Home'
    },
    highlights: [
      'Thân máy hợp kim Magie - Nhôm siêu mỏng chỉ 19.9mm và nhẹ 2.09kg',
      'Màn hình OLED 240Hz thời gian phản hồi siêu tốc 0.2ms chuẩn eSports',
      'Âm thanh tinh chỉnh bởi hãng danh tiếng HyperX Audio',
      'Tản nhiệt Omen Tempest Cooling duy trì độ mát tối đa'
    ],
    gifts: [
      'Tai nghe HyperX Cloud Stinger 2',
      'Balo Omen Transceptor 16'
    ]
  },
  {
    id: 'lap-07',
    name: 'Lenovo ThinkPad T14s Gen 5 (Intel Core Ultra 7)',
    brand: 'Lenovo',
    category: 'laptop',
    price: 38990000,
    originalPrice: 42990000,
    discountPercent: 9,
    rating: 4.9,
    reviewsCount: 28,
    stock: 10,
    isFlashSale: false,
    isHot: false,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 36 tháng Premier Support',
    badge: 'Độ bền Quân đội',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      cpu: 'Intel Core Ultra 7 155U (12 nhân, 14 luồng, NPU Intel AI Boost)',
      ram: '16GB LPDDR5x 7467MHz Dual Channel',
      storage: '512GB SSD M.2 2280 PCIe 4.0x4 Performance NVMe Opal 2.0',
      gpu: 'Intel Graphics tích hợp',
      screen: '14.0" WUXGA (1920x1200) IPS 400nits Anti-glare, 100% sRGB',
      battery: '58Wh, thời lượng dùng liên tục đến 14 giờ',
      weight: '1.24 kg',
      os: 'Windows 11 Pro'
    },
    highlights: [
      'Trọng lượng siêu nhẹ chỉ 1.24kg, đạt chuẩn độ bền khắt khe quân đội Mỹ MIL-STD-810H',
      'Bàn phím ThinkPad huyền thoại cho trải nghiệm gõ văn bản và code sướng nhất phân khúc',
      'Bảo mật phần cứng toàn diện ThinkShield, cảm biến vân tay tích hợp nút nguồn',
      'Camera 5.0MP IR hồng ngoại nhận diện khuôn mặt và nắp che Privacy Shutter'
    ],
    gifts: [
      'Chuột không dây Lenovo ThinkPad Silent',
      'Túi xách ThinkPad Professional 14"'
    ]
  },
  {
    id: 'lap-08',
    name: 'Apple MacBook Air 13 inch M3 (16GB / 512GB)',
    brand: 'Apple',
    category: 'laptop',
    price: 32490000,
    originalPrice: 34990000,
    discountPercent: 7,
    rating: 5.0,
    reviewsCount: 88,
    stock: 22,
    isFlashSale: true,
    isHot: true,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 12 tháng Apple Care chính hãng',
    badge: 'Best Seller',
    images: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      cpu: 'Apple M3 (8-core CPU, 10-core GPU, 16-core Neural Engine)',
      ram: '16GB Unified Memory',
      storage: '512GB SSD siêu nhanh',
      gpu: 'Apple 10-Core GPU',
      screen: '13.6" Liquid Retina (2560x1664) 500 nits, dải màu rộng P3, True Tone',
      battery: '52.6Wh Li-Po, thời lượng pin cả ngày lên tới 18 giờ',
      weight: '1.24 kg',
      os: 'macOS Sequoia'
    },
    highlights: [
      'Hỗ trợ xuất đồng thời 2 màn hình ngoài khi gập nắp máy',
      'Hiệu năng đột phá chip M3, chạy mượt mọi tác vụ văn phòng, photoshop, lập trình web',
      'Thiết kế không quạt hoàn toàn yên tĩnh, mỏng chỉ 11.3mm',
      'Cổng sạc từ tính MagSafe 3 tiện lợi và an toàn'
    ],
    gifts: [
      'Túi chống sốc cao cấp K-Tech Fabric',
      'Voucher dán màn hình JCPAL giảm 30%'
    ]
  },
  // Keyboards
  {
    id: 'kb-01',
    name: 'Bàn phím cơ Keychron Q1 Pro Wireless Custom Mechanical',
    brand: 'Keychron',
    category: 'keyboard',
    price: 4390000,
    originalPrice: 4890000,
    discountPercent: 10,
    rating: 4.9,
    reviewsCount: 26,
    stock: 18,
    isFlashSale: false,
    isHot: true,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 12 tháng 1 đổi 1',
    badge: 'Custom Phím',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      connection: 'Bluetooth 5.1 & Type-C có dây',
      switch: 'Keychron K Pro Red / Banana / Brown (Hotswap 5 pin)',
      keycap: 'KSA Profile Double-shot PBT xuyên LED',
      battery: '4000mAh (Dùng đến 300 giờ)',
      structure: 'Full Nhôm CNC 6063, Double Gasket Mount tiêu âm'
    },
    highlights: [
      'Vỏ kim loại nhôm CNC nguyên khối cực đầm, chống rung tuyệt đối',
      'Kết nối đa thiết bị, tương thích hoàn hảo cả Mac và Windows',
      'Hỗ trợ tùy biến macro và keymap chuyên sâu qua QMK/VIA'
    ],
    gifts: ['Kê tay gỗ óc chó Keychron chính hãng']
  },
  {
    id: 'kb-02',
    name: 'Bàn phím cơ Logitech G Pro X TKL Lightspeed Wireless',
    brand: 'Logitech',
    category: 'keyboard',
    price: 4290000,
    originalPrice: 4690000,
    discountPercent: 9,
    rating: 4.8,
    reviewsCount: 34,
    stock: 15,
    isFlashSale: true,
    isHot: true,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 24 tháng chính hãng Digiworld',
    badge: 'Esports Pro',
    images: [
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      connection: 'Lightspeed 2.4GHz không độ trễ, Bluetooth, Type-C',
      switch: 'GX Brown Tactile / GX Red Linear',
      keycap: 'Dual-shot PBT cao cấp',
      battery: '50 giờ sử dụng liên tục khi bật RGB',
      structure: 'Tenkeyless gọn gàng cho game thủ eSports'
    },
    highlights: [
      'Công nghệ không dây Lightspeed được kiểm chứng bởi các vận động viên eSports hàng đầu thế giới',
      'Con lăn điều chỉnh âm lượng chuyên dụng và cụm phím media tiện ích',
      'Hộp đựng bảo vệ cao cấp chống sốc đi kèm tiện mang thi đấu'
    ],
    gifts: ['Hộp bảo vệ chống va đập Travel Case']
  },
  {
    id: 'kb-03',
    name: 'Bàn phím Gaming ASUS ROG Azoth 75% OLED Custom',
    brand: 'ASUS',
    category: 'keyboard',
    price: 5990000,
    originalPrice: 6590000,
    discountPercent: 9,
    rating: 5.0,
    reviewsCount: 15,
    stock: 8,
    isFlashSale: false,
    isHot: true,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 24 tháng Asus VN',
    badge: 'Màn hình OLED',
    images: [
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      connection: 'ROG SpeedNova 2.4G, Bluetooth 5.1, Type-C',
      switch: 'ROG NX Snow Linear pre-lubed từ nhà máy',
      keycap: 'ROG PBT Doubleshot',
      battery: 'Lên tới 2000 giờ sử dụng (khi tắt màn hình OLED và LED)',
      screen: 'Màn hình OLED 2 inch hiển thị thông số và GIF động cá nhân hóa'
    },
    highlights: [
      'Màn hình hiển thị OLED 2 inch trực quan hiển thị thông số CPU, pin, hiệu ứng âm thanh',
      'Cấu trúc Gasket mount với 3 lớp đệm Poron triệt tiêu tiếng vang',
      'Đi kèm bộ lube switch DIY chuyên nghiệp và mỡ bôi trơn Krytox'
    ],
    gifts: ['Bộ kit mở switch và mỡ Krytox GPL 205g0']
  },
  // Mice
  {
    id: 'ms-01',
    name: 'Chuột không dây công thái học Logitech MX Master 3S',
    brand: 'Logitech',
    category: 'mouse',
    price: 2190000,
    originalPrice: 2490000,
    discountPercent: 12,
    rating: 4.9,
    reviewsCount: 112,
    stock: 25,
    isFlashSale: true,
    isHot: true,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 12 tháng chính hãng',
    badge: 'Best For Coder',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      sensor: 'Darkfield 8000 DPI (lướt mượt cả trên mặt kính trong suốt)',
      connection: 'Bluetooth Low Energy & Đầu thu Logi Bolt USB',
      battery: 'Pin sạc USB-C dùng tới 70 ngày, sạc 1 phút dùng 3 giờ',
      clicks: 'Quiet Clicks giảm 90% tiếng ồn bấm phím',
      scroll: 'Con lăn điện từ MagSpeed cuộn 1000 dòng/giây'
    },
    highlights: [
      'Con lăn kim loại điện từ cuộn siêu tốc 1000 dòng trong 1 giây',
      'Thiết kế công thái học ôm sát lòng bàn tay, chống mỏi cổ tay tuyệt đối',
      'Tính năng Logitech Flow sao chép văn bản, file giữa 3 máy tính cùng lúc'
    ],
    gifts: ['Túi đựng chuột EVA chống sốc']
  },
  {
    id: 'ms-02',
    name: 'Chuột Gaming Siêu Nhẹ Razer Viper V3 Pro Wireless',
    brand: 'Razer',
    category: 'mouse',
    price: 3890000,
    originalPrice: 4290000,
    discountPercent: 9,
    rating: 4.9,
    reviewsCount: 30,
    stock: 11,
    isFlashSale: false,
    isHot: true,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 24 tháng Razer VN',
    badge: 'Polling 8000Hz',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      sensor: 'Razer Focus Pro 35K Gen 2 Optical Sensor (35.000 DPI)',
      weight: 'Chỉ 54 gram (siêu nhẹ)',
      polling: 'True 8000Hz Wireless Polling Rate siêu nhạy',
      switches: 'Razer Optical Mouse Switches Gen-3 độ bền 90 triệu lần bấm',
      battery: 'Lên tới 95 giờ ở tần số 1000Hz'
    },
    highlights: [
      'Trọng lượng lông vũ 54g tối ưu hoàn hảo cho các pha flick ngắm bắn trong FPS',
      'Tần số phản hồi 8000Hz gửi tín hiệu gấp 8 lần chuột chơi game thông thường',
      'Cảm biến quang học Focus Pro thế hệ mới độ chuẩn xác 99.8%'
    ],
    gifts: ['Grip Tape chống trượt Razer chính hãng']
  },
  {
    id: 'ms-03',
    name: 'Chuột Gaming ASUS ROG Harpe Ace Aim Lab Edition',
    brand: 'ASUS',
    category: 'mouse',
    price: 2890000,
    originalPrice: 3290000,
    discountPercent: 12,
    rating: 4.8,
    reviewsCount: 18,
    stock: 14,
    isFlashSale: false,
    isHot: false,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 24 tháng',
    badge: 'Aim Lab Tuned',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      sensor: 'ROG AimPoint 36.000 DPI',
      weight: '54 gram cấu tạo từ vật liệu sinh học nylon',
      connection: 'ROG SpeedNova Wireless 2.4G, Bluetooth, Type-C',
      battery: 'Lên tới 90 giờ hoạt động'
    },
    highlights: [
      'Hợp tác thiết kế cùng phần mềm luyện ngắm Aim Lab danh tiếng thế giới',
      'Vỏ máy làm từ nhựa sinh học nylon thân thiện môi trường và siêu bền',
      'Tính năng phân tích thao tác Aim Lab Settings Optimizer gợi ý độ nhạy chuẩn cho bạn'
    ],
    gifts: ['Sticker chân chuột PTFE nguyên chất dự phòng']
  },
  // Audio
  {
    id: 'aud-01',
    name: 'Tai nghe Gaming Không dây HyperX Cloud III Wireless',
    brand: 'HyperX',
    category: 'audio',
    price: 3490000,
    originalPrice: 3990000,
    discountPercent: 13,
    rating: 4.9,
    reviewsCount: 64,
    stock: 19,
    isFlashSale: true,
    isHot: true,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 24 tháng chính hãng',
    badge: 'Pin 120 Giờ',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      driver: 'Củ loa góc 53mm màng kép tinh chỉnh',
      battery: 'Pin siêu khủng lên tới 120 giờ chỉ với 1 lần sạc',
      spatial: 'Âm thanh không gian DTS Headphone:X Spatial Audio vĩnh viễn',
      mic: 'Micro 10mm khử ồn có đèn LED báo tắt tiếng'
    },
    highlights: [
      'Thời lượng pin lên đến 120 tiếng chơi game cả tháng không lo hết pin',
      'Đệm mút hoạt tính bọc da cao cấp êm ái trứ danh của dòng HyperX Cloud',
      'Khung nhôm nguyên khối bền chắc chịu lực va đập tuyệt đối'
    ],
    gifts: ['Giá treo tai nghe kim loại để bàn K-Tech']
  },
  {
    id: 'aud-02',
    name: 'Tai nghe chống ồn Sony WH-1000XM5 Flagship',
    brand: 'Sony',
    category: 'audio',
    price: 7990000,
    originalPrice: 8990000,
    discountPercent: 11,
    rating: 5.0,
    reviewsCount: 82,
    stock: 9,
    isFlashSale: false,
    isHot: true,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 12 tháng Sony VN',
    badge: 'Chống ồn đỉnh cao',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      anc: '2 bộ xử lý và 8 micro triệt tiêu tiếng ồn chủ động thông minh',
      codec: 'LDAC hỗ trợ chuẩn âm thanh Hi-Res Audio Wireless không dây',
      battery: '30 giờ nghe nhạc liên tục, sạc 3 phút nghe được 3 giờ',
      weight: '250g siêu nhẹ thiết kế không tiếng kẽo kẹt'
    },
    highlights: [
      'Khả năng chống ồn chủ động dẫn đầu thị trường giúp tập trung làm việc tối đa',
      'Chất âm Hi-Res chi tiết với củ loa sợi carbon 30mm tinh khiết',
      'Tính năng Speak-to-Chat tự động dừng nhạc khi bạn bắt đầu nói chuyện'
    ],
    gifts: ['Hộp đựng tai nghe cứng cáp và cáp âm thanh 3.5mm mạ vàng']
  },
  {
    id: 'aud-03',
    name: 'Tai nghe Gaming SteelSeries Arctis Nova Pro Wireless',
    brand: 'Sony',
    category: 'audio',
    price: 8990000,
    originalPrice: 9990000,
    discountPercent: 10,
    rating: 4.8,
    reviewsCount: 21,
    stock: 6,
    isFlashSale: false,
    isHot: false,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 12 tháng',
    badge: 'Trạm Base Station',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      dac: 'Trạm điều khiển DAC rời GameDAC Gen 2 màn hình OLED',
      battery: 'Hệ thống 2 viên pin tháo rời thay nóng (Infinity Power System)',
      connection: 'Kết nối đồng thời 2.4GHz và Bluetooth cùng lúc',
      mic: 'Micro ClearCast Gen 2 dùng AI khử tiếng ồn phím cơ'
    },
    highlights: [
      'Hệ sinh thái âm thanh Almighty Audio với phần mềm Sonar Audio Software Suite',
      'Thay nóng pin trực tiếp tại trạm điều khiển mà không cần tắt tai nghe',
      'Kết nối cùng lúc PC và điện thoại, vừa chơi game vừa nhận cuộc gọi'
    ],
    gifts: ['Đệm tai thay thế chất liệu vải tản nhiệt']
  },
  // Accessories
  {
    id: 'acc-01',
    name: 'Hub chuyển đổi Ugreen Revodok Pro 109 9-in-1 Dual 4K HDMI',
    brand: 'Ugreen',
    category: 'accessory',
    price: 1390000,
    originalPrice: 1690000,
    discountPercent: 18,
    rating: 4.8,
    reviewsCount: 45,
    stock: 30,
    isFlashSale: true,
    isHot: true,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 18 tháng 1 đổi 1',
    badge: 'Top Bán Chạy',
    images: [
      'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      ports: '2x HDMI (4K@60Hz), 1x PD 100W, 2x USB-A 3.2 (10Gbps), 1x USB-C (10Gbps), LAN RJ45 Gigabit, SD/TF Card',
      material: 'Vỏ hợp kim nhôm tản nhiệt cao cấp',
      compatibility: 'Tương thích tuyệt đối MacBook M1/M2/M3, Windows laptop, iPad'
    },
    highlights: [
      'Xuất đồng thời 2 màn hình 4K sắc nét không giật lag',
      'Tốc độ truyền dữ liệu 10Gbps chuyển file 20GB chỉ trong vài giây',
      'Hỗ trợ sạc nhanh chuẩn Power Delivery 100W'
    ],
    gifts: ['Túi nỉ đựng hub chống trầy xước']
  },
  {
    id: 'acc-02',
    name: 'Đế tản nhiệt Laptop Gaming IETS GT500 V2 có màng lọc bụi',
    brand: 'ASUS',
    category: 'accessory',
    price: 1590000,
    originalPrice: 1890000,
    discountPercent: 16,
    rating: 4.9,
    reviewsCount: 52,
    stock: 20,
    isFlashSale: false,
    isHot: true,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 12 tháng',
    badge: 'Giảm 20°C',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      fan: 'Quạt tua-bin công nghiệp 5000 vòng/phút kèm núm vặn vô cấp',
      seal: 'Vành đệm mút cao su kín khí ép hơi lạnh trực tiếp vào đáy máy',
      filter: 'Màng lọc bụi tháo rời vệ sinh dễ dàng ngăn bụi vào quạt laptop'
    },
    highlights: [
      'Hạ nhiệt độ CPU và GPU từ 15°C đến 25°C ngay lập tức khi chơi game nặng',
      'Màng lọc siêu mịn bảo vệ laptop khỏi bụi bẩn, kéo dài tuổi thọ quạt máy',
      'Núm xoay điều chỉnh tốc độ linh hoạt theo nhu cầu sử dụng'
    ],
    gifts: ['Tặng kèm 2 màng lọc bụi dự phòng']
  },
  {
    id: 'acc-03',
    name: 'Webcam Elgato Facecam MK.2 Full HD 60FPS HDR Chuyên Nghiệp',
    brand: 'Logitech',
    category: 'accessory',
    price: 3990000,
    originalPrice: 4490000,
    discountPercent: 11,
    rating: 4.9,
    reviewsCount: 16,
    stock: 12,
    isFlashSale: false,
    isHot: false,
    installment: 'Trả góp 0%',
    warranty: 'Bảo hành 24 tháng',
    badge: 'Pro Streamer',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80'
    ],
    specs: {
      resolution: '1080p60 Full HD chuẩn Studio không nén với màu sắc chân thực',
      sensor: 'Cảm biến Sony STARVIS CMOS đỉnh cao ánh sáng yếu',
      lens: 'Thấu kính Elgato Prime Lens tiêu cự 24mm f/2.4 toàn kính quang học'
    },
    highlights: [
      'Hỗ trợ HDR chân thực, tái tạo màu da tự nhiên ngay cả trong phòng tối',
      'Phần mềm Camera Hub chuyên nghiệp chỉnh ISO, Shutter, Color Temperature',
      'Nắp trượt bảo mật vật lý tích hợp gọn gàng'
    ],
    gifts: ['Chân Tripod để bàn mini điều chỉnh độ cao']
  }
];

export const VOUCHERS = [
  {
    code: 'KTECH500',
    title: 'Giảm 500.000₫ cho đơn từ 20 triệu',
    discount: 500000,
    minSpend: 20000000,
    desc: 'Áp dụng cho mọi dòng Laptop & PC'
  },
  {
    code: 'SINHVIEN2025',
    title: 'Đặc quyền K-Tech Campus: Giảm 1.000.000₫',
    discount: 1000000,
    minSpend: 25000000,
    desc: 'Dành riêng cho Học sinh - Sinh viên'
  },
  {
    code: 'FREESHIP',
    title: 'Miễn phí vận chuyển hỏa tốc 2H',
    discount: 50000,
    minSpend: 500000,
    desc: 'Áp dụng toàn quốc cho đơn từ 500k'
  }
];

export function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(amount);
}

