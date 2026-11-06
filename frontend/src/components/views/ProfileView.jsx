import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  User,
  PackageCheck,
  Lock,
  Save,
  LogOut,
  Award
} from 'lucide-react';

export default function ProfileView() {
  const { user, updateProfile, logout, navigateTo, orders } = useShop();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState(user?.city || 'TP. Hồ Chí Minh');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  if (!user) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/90 p-16 text-center max-w-md mx-auto space-y-5 my-10 shadow-xs">
        <User className="w-16 h-16 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Bạn chưa đăng nhập</h2>
        <p className="text-sm text-slate-500">Vui lòng đăng nhập để xem và quản lý thông tin tài khoản cá nhân.</p>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-3 bg-blue-600 text-white font-bold text-sm rounded-2xl cursor-pointer"
        >
          Trở về trang chủ
        </button>
      </div>
    );
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ name, email, phone, address, city });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    alert('Đổi mật khẩu thành công!');
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 w-full">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl font-black text-white shadow-inner">
            {user.name.charAt(0)}
          </div>
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-black">{user.name}</h1>
            <p className="text-sm text-blue-200 font-medium">{user.email} • Thành viên từ {user.memberSince}</p>
            <div className="flex items-center gap-3 pt-1">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                HẠNG VÀNG K-TECH
              </span>
              <span className="text-sm text-blue-100 font-semibold">
                {user.loyaltyPoints} điểm K-Point tích lũy
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-bold rounded-2xl transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Đăng xuất</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Sidebar */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-4 shadow-sm space-y-2 self-start">
          <button
            onClick={() => navigateTo('profile')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold bg-blue-50 text-blue-700 text-left cursor-pointer"
          >
            <User className="w-5 h-5 text-blue-600" />
            <span>Thông tin cá nhân</span>
          </button>

          <button
            onClick={() => navigateTo('my-orders')}
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-slate-50 text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <PackageCheck className="w-5 h-5 text-slate-400" />
              <span>Đơn hàng của tôi</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
              {orders.length}
            </span>
          </button>
        </div>

        {/* Main Form Body */}
        <div className="md:col-span-2 space-y-8">
          {/* Personal Info */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-900 pb-4 border-b border-slate-100 flex items-center gap-2.5">
              <User className="w-5 h-5 text-blue-600" />
              <span>Cập nhật hồ sơ tài khoản</span>
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                    Địa chỉ Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                    Địa chỉ nhận hàng mặc định
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                    Tỉnh / Thành phố
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Lưu thay đổi</span>
              </button>
            </form>
          </div>

          {/* Security / Password */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-900 pb-4 border-b border-slate-100 flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-blue-600" />
              <span>Đổi mật khẩu bảo mật</span>
            </h3>

            <form onSubmit={handleChangePassword} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                    Mật khẩu hiện tại
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl shadow-xs transition-colors cursor-pointer"
              >
                Cập nhật mật khẩu
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
