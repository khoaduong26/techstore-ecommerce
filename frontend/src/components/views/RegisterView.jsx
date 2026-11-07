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
  User,
  Phone,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Gift
} from 'lucide-react';

export default function RegisterView() {
  const { register, navigateTo, addToast } = useShop();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Password strength helper
  const getPasswordStrength = () => {
    if (!password) return { text: 'Tối thiểu 6 ký tự', color: 'text-slate-400', level: 0 };
    if (password.length < 6) return { text: 'Quá yếu', color: 'text-rose-500', level: 1 };
    if (password.length < 8) return { text: 'Trung bình', color: 'text-amber-500', level: 2 };
    return { text: 'Mạnh & An toàn', color: 'text-emerald-500', level: 3 };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !phone.trim() || !password) {
      setErrorMessage('Vui lòng điền đầy đủ các thông tin bắt buộc (*).');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Mật khẩu phải chứa ít nhất 6 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không trùng khớp.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Vui lòng đồng ý với Điều khoản dịch vụ và Chính sách bảo mật.');
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password: password,
      };

      // 1. Attempt to call real Spring Boot Backend API
      try {
        const response = await apiService.register(payload);
        if (response && response.token) {
          localStorage.setItem('ktech_token', response.token);
        }
      } catch (apiErr) {
        console.warn('Backend API chưa sẵn sàng hoặc gặp lỗi, sử dụng chế độ mô phỏng:', apiErr.message);
      }

      // 2. Perform context register
      register(payload);
      addToast('Đăng ký tài khoản thành công! Tặng bạn Voucher 500.000₫ cho thành viên mới.');
      navigateTo('home');
    } catch (err) {
      setErrorMessage(err.message || 'Đăng ký không thành công. Vui lòng thử lại với email khác.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-6 sm:py-10 flex items-center justify-center w-full">
      <div className="w-full max-w-5xl bg-white rounded-[32px] border border-slate-200/90 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Cột trái: Hero Banner Thành Viên K-Tech */}
        <div className="lg:col-span-5 relative bg-[#00174B] text-white p-8 sm:p-10 flex flex-col justify-between overflow-hidden min-h-[420px] lg:min-h-[700px]">
          {/* Lớp nền ảnh + gradient ánh sáng xanh */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-indigo-950/60 to-slate-950 z-10 pointer-events-none"></div>
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
            alt="K-Tech Community"
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

          {/* Phần chân banner: Slogan & Quyền lợi thành viên */}
          <div className="relative z-20 pt-12 text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              <Gift className="w-4 h-4 text-amber-300" />
              <span>VOUCHER 500K CHO BẠN MỚI</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
              Gia Nhập Hệ Sinh Thái <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-300">
                K-Tech Member
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-sm">
              Đặc quyền thành viên: Tích lũy điểm K-Points đổi quà, bảo hành điện tử chính hãng 24 tháng và hỗ trợ kỹ thuật trọn đời.
            </p>

            <div className="flex items-center justify-center lg:justify-start gap-2 pt-2">
              <span className="w-4 h-1.5 rounded-full bg-blue-400/40"></span>
              <span className="w-7 h-1.5 rounded-full bg-white"></span>
              <span className="w-4 h-1.5 rounded-full bg-blue-400/40"></span>
            </div>
          </div>
        </div>

        {/* Cột phải: Form Đăng Ký Tài Khoản K-Tech Store */}
        <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Tạo tài khoản mới
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Đã có tài khoản K-Tech?{' '}
              <button
                type="button"
                onClick={() => navigateTo('login')}
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors ml-1 cursor-pointer"
              >
                Đăng nhập ngay
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
            {/* Trường 1: Họ và tên */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Họ và tên <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Nhóm 2 cột: Email & Số điện thoại */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Địa chỉ Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Số điện thoại <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    placeholder="0988 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Trường 3: Mật khẩu */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Mật khẩu <span className="text-rose-500">*</span>
                </label>
                <span className={`text-xs font-bold ${strength.color}`}>
                  Độ mạnh: {strength.text}
                </span>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Tối thiểu 6 ký tự bảo mật"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
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

            {/* Trường 4: Xác nhận mật khẩu */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Xác nhận mật khẩu <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder="Nhập lại mật khẩu phía trên"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Điều khoản */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 mt-1"
                />
                <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Tôi đồng ý với{' '}
                  <a href="#terms" className="text-blue-600 hover:underline font-semibold">Điều khoản dịch vụ</a> và{' '}
                  <a href="#privacy" className="text-blue-600 hover:underline font-semibold">Chính sách bảo mật</a> của K-Tech Store.
                </span>
              </label>
            </div>

            {/* Nút Đăng ký CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-sm sm:text-base transition-all duration-150 shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 mt-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Đang khởi tạo tài khoản...</span>
                </>
              ) : (
                <>
                  <span>Đăng ký tài khoản ngay</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

