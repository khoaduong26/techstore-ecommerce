import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Mail, Lock, User, Phone, ShieldCheck, ArrowRight } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, authTab, setAuthTab, login, register } = useShop();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authTab === 'login') {
      login(email || 'khachhang@ktech.vn', password || '123456');
    } else {
      register({
        fullName: fullName || 'Nguyễn Thành Nam',
        email: email || 'nam@example.com',
        phone: phone || '0912 345 678',
      });
    }
  };

  const handleQuickDemo = (role) => {
    if (role === 'admin') {
      login('admin@ktech.vn', 'admin123');
    } else {
      login('khachhang@ktech.vn', '123456');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 text-white text-center">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex p-3.5 bg-white/15 rounded-2xl mb-3 backdrop-blur-md">
            <ShieldCheck className="w-9 h-9 text-blue-200" />
          </div>
          <h2 className="text-2xl font-black">K-TECH STORE</h2>
          <p className="text-blue-100 text-sm mt-1">
            {authTab === 'login'
              ? 'Đăng nhập để theo dõi đơn hàng & tích lũy điểm thưởng'
              : 'Tạo tài khoản nhận ngay Voucher 500.000₫ cho thành viên mới'}
          </p>

          {/* Tab Switcher */}
          <div className="flex bg-blue-950/40 p-1.5 rounded-2xl mt-6">
            <button
              onClick={() => setAuthTab('login')}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                authTab === 'login'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setAuthTab('register')}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                authTab === 'register'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              Đăng ký thành viên
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {authTab === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                    Họ và tên
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="0988 123 456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                Địa chỉ Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">Mật khẩu</label>
                {authTab === 'login' && (
                  <button
                    type="button"
                    className="text-xs text-blue-600 hover:text-blue-700 font-bold"
                  >
                    Quên mật khẩu?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl text-sm sm:text-base shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2.5 mt-4 cursor-pointer"
            >
              <span>{authTab === 'login' ? 'Đăng nhập ngay' : 'Đăng ký tài khoản'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Quick Demo Login Buttons */}
          <div className="mt-7 pt-6 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 text-center mb-3.5 uppercase tracking-wider">
              Trải nghiệm nhanh không cần nhập:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleQuickDemo('customer')}
                className="py-3 px-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-700 transition-colors cursor-pointer"
              >
                Khách hàng mẫu
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="py-3 px-4 bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 hover:text-purple-700 transition-colors cursor-pointer"
              >
                Quản trị viên (Admin)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
