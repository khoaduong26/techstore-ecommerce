import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, CATEGORIES, formatVND } from '../../data/products';
import ProductCard from '../common/ProductCard';
import {
  Flame,
  Clock,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  ChevronRight,
  Laptop,
  Truck,
  RotateCcw
} from 'lucide-react';

export default function HomeView() {
  const { navigateTo, setSelectedCategory, setSelectedBrand } = useShop();

  // Flash sale countdown timer simulation
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashSaleProducts = PRODUCTS.filter((p) => p.isFlashSale);
  const hotLaptops = PRODUCTS.filter((p) => p.category === 'laptop').slice(0, 4);
  const hotAccessories = PRODUCTS.filter((p) => p.category !== 'laptop').slice(0, 4);

  return (
    <div className="space-y-12 pb-16 w-full">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-slate-800">
        {/* Glow ambient background */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs sm:text-sm font-bold">
              <GraduationCap className="w-5 h-5 text-amber-300" />
              <span>ĐẶC QUYỀN K-TECH CAMPUS 2025</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              Laptop Đỉnh Cao, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-300">
                Hiệu Năng Vượt Trội
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Giảm trực tiếp đến <strong className="text-amber-300 font-extrabold">1.500.000₫</strong> cho Học sinh - Sinh viên &amp; Tân cử nhân. Tặng kèm combo Balo Gaming + Chuột không dây trị giá 1.200.000₫. Hỗ trợ trả góp 0% duyệt hồ sơ trong 5 phút!
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('laptop');
                  navigateTo('catalog');
                }}
                className="px-7 py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-blue-600/35 hover:shadow-blue-500/50 transition-all flex items-center gap-3 cursor-pointer"
              >
                <span>Khám phá ngay</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('all');
                  navigateTo('catalog');
                }}
                className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base rounded-2xl border border-white/20 transition-all cursor-pointer"
              >
                Nhận Voucher Tân Sinh Viên
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 flex flex-wrap items-center gap-8 text-xs sm:text-sm text-slate-300 border-t border-slate-800">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-medium">100% Phân Phối Chính Hãng</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-5 h-5 text-sky-400" />
                <span className="font-medium">Giao hỏa tốc 2H toàn quốc</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-5 h-5 text-amber-400" />
                <span className="font-medium">Đổi mới 30 ngày nếu lỗi</span>
              </div>
            </div>
          </div>

          {/* Hero Featured Laptop Visual */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative group w-full max-w-lg">
              <div className="absolute inset-0 bg-blue-500/25 rounded-3xl blur-2xl group-hover:bg-blue-500/35 transition-all"></div>
              <div className="relative bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-700/80 p-6 shadow-2xl">
                <div className="flex items-center justify-between text-xs sm:text-sm text-slate-400 pb-3 border-b border-slate-800">
                  <span className="font-bold text-blue-400">🔥 SẢN PHẨM NỔI BẬT NHẤT</span>
                  <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-black">GIẢM 4.000.000₫</span>
                </div>

                <img
                  src={PRODUCTS[0].images[0]}
                  alt="ASUS ROG Strix G16"
                  className="w-full aspect-4/3 object-contain my-4 group-hover:scale-105 transition-transform duration-500"
                />

                <div className="space-y-2 text-left">
                  <h4 className="text-base sm:text-lg font-bold text-white truncate">{PRODUCTS[0].name}</h4>
                  <p className="text-xs sm:text-sm text-slate-400">Core i7-14650HX • RTX 4060 • 16GB • 1TB • 240Hz 2.5K</p>
                  <div className="flex items-baseline justify-between pt-2">
                    <div>
                      <span className="text-xl sm:text-2xl font-black text-blue-400 tabular-nums">
                        {formatVND(PRODUCTS[0].price)}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-500 line-through ml-2.5">
                        {formatVND(PRODUCTS[0].originalPrice)}
                      </span>
                    </div>
                    <button
                      onClick={() => navigateTo('product-detail', PRODUCTS[0].id)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Fast Categories Showcase */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Danh mục sản phẩm
          </h2>
          <button
            onClick={() => {
              setSelectedCategory('all');
              navigateTo('catalog');
            }}
            className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Xem tất cả danh mục</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                navigateTo('catalog');
              }}
              className="p-5 bg-white rounded-3xl border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all text-center flex flex-col items-center gap-3 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center text-slate-700 group-hover:text-blue-600 transition-colors">
                <Laptop className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </p>
                {cat.count && (
                  <p className="text-xs text-slate-400 mt-0.5">{cat.count} sản phẩm</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Flash Sale Deal Sốc */}
      <section className="bg-linear-to-r from-red-600 via-rose-600 to-amber-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <Flame className="w-8 h-8 text-amber-300 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
                  Flash Sale Deal Sốc
                </h2>
                <span className="hidden sm:inline px-3 py-1 text-xs font-black bg-amber-400 text-slate-900 rounded-full">
                  HOTTEST
                </span>
              </div>
              <p className="text-sm text-rose-100 mt-1">Số lượng có hạn • Giá cam kết tốt nhất thị trường hôm nay</p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 bg-black/35 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/10">
            <Clock className="w-5 h-5 text-amber-300" />
            <span className="text-sm text-white/90 font-semibold mr-1.5">Kết thúc sau:</span>
            <span className="px-2.5 py-1.5 bg-white text-slate-900 font-black text-sm sm:text-base rounded-xl tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="font-bold text-lg">:</span>
            <span className="px-2.5 py-1.5 bg-white text-slate-900 font-black text-sm sm:text-base rounded-xl tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="font-bold text-lg">:</span>
            <span className="px-2.5 py-1.5 bg-white text-slate-900 font-black text-sm sm:text-base rounded-xl tabular-nums">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Flash Sale Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {flashSaleProducts.slice(0, 4).map((product) => (
            <div key={product.id} className="text-slate-900">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Best-selling Laptops Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Laptop Gaming &amp; Đồ Họa Tuyển Chọn
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Top cấu hình mạnh mẽ nhất dành cho game thủ, lập trình viên và đồ họa chuyên nghiệp
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('laptop');
              navigateTo('catalog');
            }}
            className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>Xem tất cả Laptop</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {hotLaptops.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Accessories Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Bàn Phím Cơ, Chuột &amp; Tai Nghe Chuyên Nghiệp
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Nâng tầm góc làm việc công nghệ đỉnh cao với thiết bị ngoại vi chính hãng cao cấp
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('keyboard');
              navigateTo('catalog');
            }}
            className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>Xem phụ kiện</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {hotAccessories.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Popular Brands Showcase */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 space-y-5">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            Thương Hiệu Đồng Hành Cùng K-Tech
          </h3>
          <p className="text-sm text-slate-500">
            Cam kết 100% sản phẩm có hóa đơn VAT điện tử &amp; bảo hành chính hãng từ nhà sản xuất
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
          {['Apple', 'ASUS', 'Lenovo', 'Dell', 'Acer', 'HP', 'Logitech', 'Razer', 'Keychron', 'Sony'].map((brand) => (
            <button
              key={brand}
              onClick={() => {
                setSelectedBrand(brand);
                navigateTo('catalog');
              }}
              className="px-6 py-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-700 transition-all cursor-pointer"
            >
              {brand}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
