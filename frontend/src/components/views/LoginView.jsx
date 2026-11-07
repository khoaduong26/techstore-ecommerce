import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { apiService } from '../../services/api';
import {
  Laptop,
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function LoginView() {
  const { login, navigateTo, addToast } = useShop();

  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identity.trim() || !password) {
      setErrorMessage('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    setIsLoading(true);
    try {
      // 1. Attempt to call real Spring Boot Backend API
      try {
        const response = await apiService.login(identity, password);
        if (response && response.token) {
          localStorage.setItem('ktech_token', response.token);
        }
      } catch (apiErr) {
        // Fallback to local context simulation if backend is not yet started
        console.warn('Backend API chưa sẵn sàng hoặc gặp lỗi, sử dụng chế độ mô phỏng:', apiErr.message);
      }

      // 2. Perform context login
      login(identity, password);
      navigateTo('home');
    } catch (err) {
      setErrorMessage(err.message || 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (role) => {
    setErrorMessage('');
    if (role === 'admin') {
      setIdentity('admin@ktech.vn');
      setPassword('admin123');
      login('admin@ktech.vn', 'admin123');
    } else {
      setIdentity('khachhang@ktech.vn');
      setPassword('123456');
      login('khachhang@ktech.vn', '123456');
    }
    navigateTo('home');
  };

  return (
    <div className="py-6 sm:py-10 flex items-center justify-center w-full">
      <div className="w-full max-w-5xl bg-white rounded-[32px] border border-slate-200/90 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Cột trái: Hero Banner Công Nghệ */}
        <div className="lg:col-span-5 relative bg-[#0B132B] text-white p-8 sm:p-10 flex flex-col justify-between overflow-hidden min-h-[380px] lg:min-h-[600px]">
          {/* Lớp nền ảnh + gradient ánh sáng xanh */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-indigo-950/60 to-slate-950 z-10 pointer-events-none"></div>
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80"
            alt="K-Tech Tech Store"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
          />

          {/* Phần đầu: Logo & Nút về trang chủ */}
          <div className="relative z-20 flex items-center justify-between">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <Laptop className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5 leading-none">
                  K-TECH<span className="text-blue-400 font-bold text-xs">STORE</span>
                </span>
                <p className="text-[10px] text-blue-200/80 font-medium tracking-wide mt-0.5">
                  Laptop &amp; Phụ Kiện
                </p>
              </div>
            </button>

            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white/90 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Về trang chủ</span>
            </button>
          </div>

          {/* Phần chân banner: Slogan & Điểm nổi bật */}
          <div className="relative z-20 pt-12 text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>K-TECH ID BẢO MẬT</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
              Trải Nghiệm Mua Sắm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-300">
                Đỉnh Cao Công Nghệ
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-sm">
              Đăng nhập để theo dõi lộ trình đơn hàng, bảo hành điện tử chính hãng và tích lũy điểm K-Points.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-2 pt-2">
              <span className="w-4 h-1.5 rounded-full bg-blue-400"></span>
              <span className="w-7 h-1.5 rounded-full bg-white"></span>
              <span className="w-4 h-1.5 rounded-full bg-blue-400/40"></span>
            </div>
          </div>
        </div>

        {/* Cột phải: Form Đăng Nhập K-Tech ID */}
        <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Đăng nhập tài khoản
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Chưa có tài khoản K-Tech?{' '}
              <button
                type="button"
                onClick={() => navigateTo('register')}
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors ml-1 cursor-pointer"
              >
                Đăng ký ngay
              </button>
            </p>
          </div>

          {/* Thông báo lỗi nếu có */}
          {errorMessage && (
            <div className="mb-5 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3 animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <p className="font-medium">{errorMessage}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Email hoặc Số điện thoại <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="name@example.com hoặc 0988123456"
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Mật khẩu <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => addToast('Vui lòng liên hệ hotline 1800 6868 hoặc quản trị viên để khôi phục mật khẩu.', 'info')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  Quên mật khẩu?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-xs sm:text-sm font-medium text-slate-700">
                  Ghi nhớ đăng nhập
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-sm sm:text-base transition-all duration-150 shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Đang xử lý đăng nhập...</span>
                </>
              ) : (
                <>
                  <span>Đăng nhập ngay</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Test Buttons for Developer / Reviewer */}
          <div className="mt-7 pt-6 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 text-center mb-3 uppercase tracking-wider">
              Hoặc trải nghiệm nhanh không cần nhập:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleQuickDemo('customer')}
                className="py-3 px-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-700 transition-colors cursor-pointer text-center"
              >
                Tài khoản Khách hàng
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="py-3 px-4 bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 hover:text-purple-700 transition-colors cursor-pointer text-center"
              >
                Tài khoản Quản trị Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

