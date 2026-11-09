import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Laptop } from 'lucide-react';

export default function Footer() {
  const { setSelectedCategory, navigateTo, addToast } = useShop();

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    navigateTo('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInfoClick = (title, message) => {
    addToast(message || `${title} - K-TechStore Việt Nam`, 'info');
  };

  return (
    <footer className="w-full bg-[#0F172A] border-t border-slate-800 mt-16 text-slate-400">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-14">
          {/* Brand Info */}
          <div className="space-y-3">
            <div
              onClick={() => {
                navigateTo('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 cursor-pointer group w-fit"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Laptop className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight group-hover:text-blue-400 transition-colors">
                K-Tech
              </span>
            </div>

            <p className="text-sm text-slate-300">
              Email:{' '}
              <a
                href="mailto:ktechstore.vn@gmail.com"
                className="text-slate-200 font-medium hover:text-blue-400 transition-colors"
              >
                ktechstore.vn@gmail.com
              </a>
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://www.facebook.com/khoa.duong.261125"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-full border border-slate-700 text-xs font-medium text-slate-300 hover:border-blue-400 hover:text-white hover:bg-slate-800 transition-all bg-slate-800/60 shadow-2xs"
              >
                Facebook
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-full border border-slate-700 text-xs font-medium text-slate-300 hover:border-blue-400 hover:text-white hover:bg-slate-800 transition-all bg-slate-800/60 shadow-2xs"
              >
                Zalo
              </a>
              <a
                href="https://www.instagram.com/ka.dwg/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-full border border-slate-700 text-xs font-medium text-slate-300 hover:border-blue-400 hover:text-white hover:bg-slate-800 transition-all bg-slate-800/60 shadow-2xs"
            >
              Instagram
              </a>
            </div>
          </div>

          {/* Cột 2: Sản phẩm */}
          <div>
            <h4 className="text-base font-bold text-white mb-3.5 tracking-tight">Sản phẩm</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleCategoryClick('keyboard')}
                  className="text-slate-400 hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Bàn phím cơ
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('mouse')}
                  className="text-slate-400 hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Chuột
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('accessory')}
                  className="text-slate-400 hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Keycap
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('accessory')}
                  className="text-slate-400 hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Switch
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('accessory')}
                  className="text-slate-400 hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Phụ kiện
                </button>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ */}
          <div>
            <h4 className="text-base font-bold text-white mb-3.5 tracking-tight">Hỗ trợ</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleInfoClick('Tải driver', 'Trung tâm tải Driver & Phần mềm K-Tech')}
                  className="text-slate-400 hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Tải driver
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleInfoClick('Kiểm tra bảo hành', 'Tra cứu thời hạn bảo hành điện tử chính hãng theo Serial/IMEI')}
                  className="text-slate-400 hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Kiểm tra bảo hành
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleInfoClick('Hướng dẫn bảo hành', 'Chính sách bảo hành 24 tháng, 1 đổi 1 trong 30 ngày')}
                  className="text-slate-400 hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Hướng dẫn bảo hành
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateTo('my-orders');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-slate-400 hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Tra cứu đơn hàng
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleInfoClick('Câu hỏi thường gặp', 'Giải đáp thắc mắc về đơn hàng, vận chuyển & thanh toán')}
                  className="text-slate-400 hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Câu hỏi thường gặp
                </button>
              </li>
            </ul>
          </div>

          {/* Cột 4: Về K-Tech */}
          <div>
            <h4 className="text-base font-bold text-white mb-3.5 tracking-tight">Về K-Tech</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleInfoClick('Giới thiệu', 'K-TechStore - Hệ thống Laptop & Phụ kiện công nghệ chính hãng')}
                  className="text-slate-400 hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Giới thiệu
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleInfoClick('Liên hệ', 'Tổng đài hỗ trợ: 1800 6868 (8:00 - 21:30)')}
                  className="text-slate-400 hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Liên hệ
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleInfoClick('Tin tức', 'Bản tin công nghệ và mẹo sử dụng phần cứng')}
                  className="text-slate-400 hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Tin tức
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bản quyền ở giữa đáy */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500 font-medium">
            &copy; 2026 K-Tech Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}
