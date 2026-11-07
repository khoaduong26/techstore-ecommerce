import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Laptop, Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCw, CreditCard } from 'lucide-react';
import { CATEGORIES } from '../../data/products';

export default function Footer() {
  const { setSelectedCategory, navigateTo } = useShop();

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    navigateTo('catalog');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 text-sm border-t border-slate-800 mt-20 w-full">
      {/* Trust Badges Bar */}
      <div className="border-b border-slate-800 py-10 bg-slate-950/60">
        <div className="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-500/15 text-blue-400 rounded-2xl shrink-0">
              <Truck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Giao hàng hỏa tốc</h4>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Nhận hàng trong 2h tại Hà Nội &amp; TP.HCM</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-4 bg-emerald-500/15 text-emerald-400 rounded-2xl shrink-0">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">100% Chính hãng</h4>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Đầy đủ tem niêm phong và hóa đơn VAT</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-4 bg-amber-500/15 text-amber-400 rounded-2xl shrink-0">
              <RefreshCw className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Đổi mới trong 30 ngày</h4>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Lỗi phần cứng đổi ngay máy mới tại chỗ</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-500/15 text-indigo-400 rounded-2xl shrink-0">
              <CreditCard className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Trả góp 0% lãi suất</h4>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Thủ tục online xét duyệt trong 5 phút</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand & Contact */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Laptop className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">K-TECH STORE</span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed max-w-md">
            Hệ thống phân phối Laptop Gaming, Ultrabook cao cấp và Phụ kiện công nghệ chính hãng hàng đầu Việt Nam. Tận tâm - Uy tín - Giá trị bền lâu cho sinh viên và kỹ sư công nghệ.
          </p>

          <div className="space-y-3 text-sm pt-2">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Showroom TP.HCM:</strong> Số 45 Lê Duẩn, P. Bến Nghé, Quận 1
              </span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Showroom Hà Nội:</strong> Số 128 Thái Hà, P. Trung Liệt, Q. Đống Đa
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-400 shrink-0" />
              <span>
                Tổng đài tư vấn: <strong className="text-white font-bold">1800 6868</strong> (8h00 - 21h30 miễn phí)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400 shrink-0" />
              <span>support@ktechstore.vn</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-bold text-base mb-4">Danh Mục Sản Phẩm</h4>
          <ul className="space-y-3 text-sm">
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => handleCategoryClick(cat.id)}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  {cat.name}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setSelectedCategory('laptop');
                  navigateTo('catalog');
                }}
                className="hover:text-blue-400 transition-colors text-left font-medium text-amber-300"
              >
                Laptop Sinh Viên 2025
              </button>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-white font-bold text-base mb-4">Chính Sách &amp; Hỗ Trợ</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#policy" className="hover:text-blue-400 transition-colors">Chính sách bảo hành 24 tháng chính hãng</a></li>
            <li><a href="#return" className="hover:text-blue-400 transition-colors">Chính sách đổi mới 1 đổi 1 trong 30 ngày</a></li>
            <li><a href="#shipping" className="hover:text-blue-400 transition-colors">Giao hàng hỏa tốc</a></li>
            <li><a href="#privacy" className="hover:text-blue-400 transition-colors">Bảo mật thông tin người dùng</a></li>
          </ul>
        </div>

        {/* Payment & Security */}
        <div>
          <h4 className="text-white font-bold text-base mb-4">Thanh Toán &amp; Chứng Nhận</h4>
          <p className="text-xs text-slate-400 mb-3">Hỗ trợ các phương thức thanh toán bảo mật:</p>
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-center text-xs font-bold text-white">
              VNPAY-QR
            </div>
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-center text-xs font-bold text-white">
              Ví MoMo
            </div>
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-center text-xs font-bold text-white">
              VISA / MC
            </div>
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-center text-xs font-bold text-white">
              Tiền mặt COD
            </div>
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-center text-xs font-bold text-white">
              VietQR
            </div>
            <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-2.5 text-center text-xs font-bold text-white">
              Trả góp 0%
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/70 space-y-1">
            <p className="text-xs text-emerald-400 font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              Đã Đăng Ký Bộ Công Thương
            </p>
            <p className="text-[11px] text-slate-400">Giấy phép ĐKKD số: 0318928392 do Sở KH&amp;ĐT TP.HCM cấp</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
