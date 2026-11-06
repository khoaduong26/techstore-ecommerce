import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { formatVND } from '../../data/products';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  ShoppingCart,
  Zap,
  ArrowLeftRight,
  Heart,
  Gift,
  CheckCircle2,
  ChevronRight,
  Share2
} from 'lucide-react';

export default function ProductDetailView() {
  const {
    activeProduct,
    addToCart,
    addToCompare,
    isInCompare,
    removeFromCompare,
    toggleWishlist,
    isInWishlist,
    navigateTo
  } = useShop();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedRam, setSelectedRam] = useState('16GB');
  const [selectedStorage, setSelectedStorage] = useState('1TB SSD');
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'highlights' | 'reviews'

  const isCompared = isInCompare(activeProduct.id);
  const isWished = isInWishlist(activeProduct.id);

  const handleBuyNow = () => {
    addToCart(activeProduct, 1);
    navigateTo('checkout');
  };

  const handleCompare = () => {
    if (isCompared) {
      removeFromCompare(activeProduct.id);
    } else {
      addToCompare(activeProduct);
    }
  };

  return (
    <div className="space-y-8 pb-16 w-full">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <button onClick={() => navigateTo('home')} className="hover:text-blue-600">
          Trang chủ
        </button>
        <ChevronRight className="w-4 h-4 text-slate-400" />
        <button onClick={() => navigateTo('catalog')} className="hover:text-blue-600">
          {activeProduct.category === 'laptop' ? 'Laptop & MacBook' : 'Phụ kiện công nghệ'}
        </button>
        <ChevronRight className="w-4 h-4 text-slate-400" />
        <span className="text-slate-900 font-bold truncate max-w-sm sm:max-w-md">
          {activeProduct.name}
        </span>
      </nav>

      {/* 2. Top Product Hero (Gallery + Purchase Info) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
        {/* Left: Gallery */}
        <div className="lg:col-span-6 space-y-5">
          <div className="relative aspect-[4/3] rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center p-6">
            <img
              src={activeProduct.images[selectedImageIndex] || activeProduct.images[0]}
              alt={activeProduct.name}
              className="w-full h-full object-contain mix-blend-multiply transition-all duration-300"
            />

            {activeProduct.discountPercent > 0 && (
              <span className="absolute top-5 left-5 bg-red-600 text-white text-xs sm:text-sm font-black px-3 py-1.5 rounded-full shadow-sm">
                -{activeProduct.discountPercent}% GIẢM
              </span>
            )}

            <button
              onClick={() => toggleWishlist(activeProduct.id)}
              className={`absolute top-5 right-5 p-3 rounded-full backdrop-blur-md transition-colors ${
                isWished
                  ? 'bg-rose-50 text-rose-600'
                  : 'bg-white/90 hover:bg-white text-slate-400 hover:text-rose-500 shadow-sm'
              }`}
            >
              <Heart className={`w-6 h-6 ${isWished ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnails */}
          {activeProduct.images.length > 1 && (
            <div className="flex items-center gap-3.5 overflow-x-auto pb-1">
              {activeProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl border-2 overflow-hidden p-1.5 bg-slate-50 shrink-0 transition-all cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-blue-600 ring-2 ring-blue-500/25'
                      : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                </button>
              ))}
            </div>
          )}

          {/* Trust Policies in Left Col */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-sm space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-2 text-blue-700">
                <ShieldCheck className="w-5 h-5" />
                Chính hãng 100%
              </span>
              <p className="text-xs sm:text-sm text-slate-500">{activeProduct.warranty}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-sm space-y-1">
              <span className="font-bold text-slate-900 flex items-center gap-2 text-emerald-700">
                <RotateCcw className="w-5 h-5" />
                Lỗi 1 đổi 1 trong 30 ngày
              </span>
              <p className="text-xs sm:text-sm text-slate-500">Đổi ngay máy mới nếu lỗi kỹ thuật</p>
            </div>
          </div>
        </div>

        {/* Right: Product Purchase Info */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header & Badges */}
          <div>
            <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
              <span className="px-3 py-1 text-xs font-black uppercase tracking-wider bg-slate-100 text-slate-800 rounded-lg">
                {activeProduct.brand}
              </span>
              <span className="px-3 py-1 text-xs font-bold bg-blue-50 text-blue-700 rounded-lg">
                {activeProduct.installment}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">Mã SKU: {activeProduct.id.toUpperCase()}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {activeProduct.name}
            </h1>

            {/* Rating & Stock */}
            <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-900">{activeProduct.rating}</span>
                <span className="underline ml-0.5">({activeProduct.reviewsCount} đánh giá xác thực)</span>
              </div>
              <span>•</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Còn {activeProduct.stock} máy sẵn sàng giao
              </span>
            </div>
          </div>

          {/* Pricing Block */}
          <div className="p-5 bg-slate-50 rounded-3xl border border-slate-200/90 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-blue-600 tabular-nums">
                  {formatVND(activeProduct.price)}
                </span>
                {activeProduct.originalPrice > activeProduct.price && (
                  <span className="text-base text-slate-400 line-through tabular-nums">
                    {formatVND(activeProduct.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Đã bao gồm thuế GTGT 10% • Miễn phí vận chuyển hỏa tốc toàn quốc
              </p>
            </div>

            <div className="text-xs sm:text-sm text-blue-700 font-semibold sm:text-right">
              <span>Trả góp 0% chỉ từ </span>
              <strong className="text-base font-black tabular-nums">
                {formatVND(Math.round(activeProduct.price / 12))}/tháng
              </strong>
            </div>
          </div>

          {/* Options: Variant Selectors (For Laptops) */}
          {activeProduct.category === 'laptop' && (
            <div className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                  Dung lượng RAM:
                </label>
                <div className="flex gap-2.5">
                  {['16GB DDR5', '32GB DDR5'].map((ram) => (
                    <button
                      key={ram}
                      onClick={() => setSelectedRam(ram)}
                      className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                        selectedRam === ram
                          ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {ram}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                  Ổ cứng lưu trữ:
                </label>
                <div className="flex gap-2.5">
                  {['512GB PCIe 4.0', '1TB PCIe 4.0'].map((ssd) => (
                    <button
                      key={ssd}
                      onClick={() => setSelectedStorage(ssd)}
                      className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                        selectedStorage === ssd
                          ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {ssd}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Promotion / Gifts Box */}
          {activeProduct.gifts && activeProduct.gifts.length > 0 && (
            <div className="p-5 bg-amber-50/80 border border-amber-200 rounded-3xl space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
                <Gift className="w-5 h-5 text-amber-600" />
                <span>Quà tặng &amp; Ưu đãi đặc quyền K-Tech:</span>
              </div>
              <ul className="text-xs sm:text-sm text-amber-900 space-y-1.5 pl-1">
                {activeProduct.gifts.map((gift, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{gift}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Zap className="w-5 h-5 text-amber-300" />
                <span>MUA NGAY (Giao siêu tốc 2h)</span>
              </button>

              <button
                onClick={() => addToCart(activeProduct, 1)}
                className="flex-1 py-4 px-6 bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-sm sm:text-base rounded-2xl border border-blue-200 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Thêm vào giỏ hàng</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCompare}
                className={`flex-1 py-3 px-4 rounded-2xl border text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isCompared
                    ? 'bg-blue-50 border-blue-400 text-blue-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <ArrowLeftRight className="w-4 h-4" />
                <span>{isCompared ? 'Đã thêm vào bảng so sánh' : 'So sánh với sản phẩm khác'}</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Đã sao chép liên kết sản phẩm!');
                }}
                className="py-3 px-5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-slate-400" />
                <span>Chia sẻ</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Detailed Specifications & Overview Tabs */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-7">
        <div className="flex items-center gap-6 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-4 text-base font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'specs'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Thông số kỹ thuật chi tiết
          </button>
          <button
            onClick={() => setActiveTab('highlights')}
            className={`pb-4 text-base font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'highlights'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Đặc điểm nổi bật
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 text-base font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Đánh giá từ khách hàng ({activeProduct.reviewsCount})
          </button>
        </div>

        {/* Tab 1: Specs Table */}
        {activeTab === 'specs' && activeProduct.specs && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <tbody className="divide-y divide-slate-100">
                {Object.entries(activeProduct.specs).map(([key, val], idx) => {
                  const labels = {
                    cpu: 'Vi xử lý (CPU)',
                    ram: 'Bộ nhớ trong (RAM)',
                    storage: 'Ổ cứng lưu trữ SSD',
                    gpu: 'Card đồ họa (GPU)',
                    screen: 'Màn hình hiển thị',
                    battery: 'Dung lượng Pin',
                    weight: 'Trọng lượng máy',
                    os: 'Hệ điều hành',
                    connection: 'Kết nối không dây & có dây',
                    switch: 'Loại Switch cơ học',
                    keycap: 'Chất liệu Keycap',
                    structure: 'Cấu trúc bàn phím',
                    sensor: 'Cảm biến (Sensor)',
                    polling: 'Tần số phản hồi',
                    driver: 'Kích thước củ loa',
                    ports: 'Cổng kết nối hỗ trợ',
                  };

                  return (
                    <tr
                      key={key}
                      className={idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'}
                    >
                      <td className="py-3.5 px-5 font-bold text-slate-700 w-1/3">
                        {labels[key] || key.toUpperCase()}
                      </td>
                      <td className="py-3.5 px-5 text-slate-900 font-semibold">
                        {val}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Highlights */}
        {activeTab === 'highlights' && (
          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl">
            <h3 className="text-lg font-bold text-slate-900">
              Tổng quan về {activeProduct.name}
            </h3>
            <div className="space-y-3">
              {activeProduct.highlights?.map((hl, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-800">{hl}</span>
                </div>
              ))}
            </div>
            <p className="text-slate-500 pt-3">
              Sản phẩm được phân phối chính hãng bởi K-Tech Store với đầy đủ tem nhập khẩu, phiếu bảo hành và hóa đơn VAT. Hỗ trợ cài đặt phần mềm và vệ sinh tra keo tản nhiệt miễn phí trọn đời sản phẩm.
            </p>
          </div>
        )}

        {/* Tab 3: Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center gap-6 p-5 bg-slate-50 rounded-3xl border border-slate-200/90">
              <div className="text-center">
                <span className="text-4xl font-black text-blue-600">
                  {activeProduct.rating}
                </span>
                <div className="flex items-center justify-center gap-1 mt-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-1 font-semibold">{activeProduct.reviewsCount} nhận xét</p>
              </div>

              <div className="h-16 w-px bg-slate-200"></div>

              <div className="text-sm text-slate-600 space-y-1">
                <p className="font-bold text-slate-900">100% Khách hàng hài lòng về chất lượng đóng gói và giao hàng.</p>
                <p className="text-slate-500">Đánh giá thực tế từ khách hàng đã mua và trải nghiệm sản phẩm tại K-Tech Store.</p>
              </div>
            </div>

            {/* Mock Reviews List */}
            <div className="space-y-4">
              <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">Trần Hoàng Long</span>
                  <span className="text-xs text-slate-400">3 ngày trước</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs text-emerald-600 font-bold ml-2">Đã mua tại K-Tech Store</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Máy dùng cực kỳ mượt mà, tản nhiệt rất mát khi render video 4K. Nhân viên giao hàng hỏa tốc trong 1 tiếng đúng cam kết. Đóng gói 3 lớp chống sốc cẩn thận.
                </p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">Phạm Quỳnh Anh</span>
                  <span className="text-xs text-slate-400">1 tuần trước</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs text-emerald-600 font-bold ml-2">Đã mua tại K-Tech Store</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Màn hình đẹp xuất sắc chuẩn màu, bàn phím gõ êm. Nhận được đầy đủ quà balo và chuột xịn, rất hài lòng với dịch vụ hỗ trợ của shop!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
