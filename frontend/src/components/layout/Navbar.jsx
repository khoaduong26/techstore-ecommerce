import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  Search,
  ShoppingCart,
  ArrowLeftRight,
  Heart,
  User,
  ShieldCheck,
  Truck,
  PhoneCall,
  Flame,
  Menu,
  X,
  ChevronDown,
  LogOut,
  PackageCheck,
  Laptop
} from 'lucide-react';
import { formatVND, CATEGORIES } from '../../data/products';

export default function Navbar() {
  const {
    currentView,
    navigateTo,
    cart,
    cartTotal,
    compareList,
    wishlist,
    user,
    logout,
    setIsAuthModalOpen,
    setAuthTab,
    searchQuery,
    setSearchQuery,
    setSelectedCategory
  } = useShop();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('catalog');
    }
  };

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    navigateTo('catalog');
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 shadow-md shadow-slate-900/8 border-b border-slate-200 backdrop-blur-md'
          : 'bg-white/95 border-b border-slate-200/90 backdrop-blur-md'
      }`}
    >
      {/* 1. Top Announcement Bar - smoothly collapses on scroll to maximize screen space */}
      <div
        className={`bg-slate-900 text-slate-200 text-xs sm:text-sm px-4 sm:px-6 lg:px-8 xl:px-12 border-b border-slate-800 transition-all duration-300 overflow-hidden ${
          isScrolled ? 'max-h-0 py-0 opacity-0 pointer-events-none' : 'max-h-12 py-2.5 opacity-100'
        }`}
      >
        <div className="max-w-[1650px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2 text-blue-400 font-semibold">
              <Truck className="w-4 h-4" />
              <span>Freeship toàn quốc đơn từ 500.000₫</span>
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:flex items-center gap-2 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Phân Phối Chính Hãng • Bảo Hành 24 Tháng</span>
            </span>
          </div>

          <div className="flex items-center gap-5 text-slate-300">
            <span className="hidden md:flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
              <span>Hotline tư vấn: <strong className="text-white font-bold">1800 6868</strong></span>
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <button
              onClick={() => navigateTo('my-orders')}
              className="hover:text-blue-400 font-medium transition-colors cursor-pointer"
            >
              Tra cứu đơn hàng
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => {
                setSelectedCategory('all');
                navigateTo('catalog');
              }}
              className="hover:text-amber-200 transition-colors text-amber-300 font-bold"
            >
              Đặc quyền K-Tech Campus 2025
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <div
        className={`max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between gap-4 lg:gap-8 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-4'
        }`}
      >
        {/* Brand Logo */}
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-3.5 shrink-0 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Laptop className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
              <span>K-TECH</span>
              <span className="px-2 py-0.5 text-xs font-black bg-blue-100 text-blue-700 rounded-lg">STORE</span>
            </div>
            <p className="text-xs text-slate-500 font-semibold tracking-wide">
              Thế Giới Laptop &amp; Phụ Kiện Chính Hãng
            </p>
          </div>
        </button>

        {/* Global Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-2xl relative items-center"
        >
          <div className="relative w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm laptop, phụ kiện công nghệ (VD: Asus ROG, Legion 5, MacBook, Keychron...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-28 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm sm:text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-24 top-1/2 -translate-y-1/2 text-sm text-slate-400 hover:text-slate-600 px-1.5 py-0.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Tìm kiếm
            </button>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Compare Button */}
          <button
            onClick={() => navigateTo('compare')}
            className="relative p-2.5 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-2xl transition-colors flex flex-col items-center cursor-pointer"
            title="So sánh sản phẩm"
          >
            <ArrowLeftRight className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-xs font-bold mt-1 hidden sm:block">So sánh</span>
            {compareList.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs font-extrabold rounded-full flex items-center justify-center shadow-xs">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => {
              setSelectedCategory('all');
              navigateTo('catalog');
            }}
            className="relative p-2.5 text-slate-700 hover:text-rose-600 hover:bg-slate-50 rounded-2xl transition-colors flex flex-col items-center cursor-pointer"
            title="Yêu thích"
          >
            <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-xs font-bold mt-1 hidden sm:block">Yêu thích</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs font-extrabold rounded-full flex items-center justify-center shadow-xs">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => navigateTo('cart')}
            className="relative flex items-center gap-3 p-2.5 sm:px-4 sm:py-2.5 bg-blue-50/80 hover:bg-blue-100 text-blue-700 rounded-2xl border border-blue-200/80 transition-all cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
              {totalCartQty > 0 && (
                <span className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-red-600 text-white text-xs font-extrabold rounded-full flex items-center justify-center shadow-xs animate-pulse">
                  {totalCartQty}
                </span>
              )}
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs text-slate-500 font-semibold leading-none">Giỏ hàng</span>
              <span className="text-sm sm:text-base font-extrabold text-blue-700 leading-tight mt-1 tabular-nums">
                {totalCartQty > 0 ? formatVND(cartTotal) : '0₫'}
              </span>
            </div>
          </button>

          {/* User Account / Auth */}
          <div className="relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2.5 p-2 rounded-2xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden xl:flex flex-col text-left">
                    <span className="text-xs text-slate-400 font-medium leading-none">Xin chào,</span>
                    <span className="text-sm font-bold text-slate-800 leading-tight mt-1 flex items-center gap-1">
                      {user.name.split(' ')[0]}
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </span>
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-3xl shadow-2xl border border-slate-100 py-2.5 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-5 py-3 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                      <span className="inline-block mt-2 px-2.5 py-0.5 text-xs font-bold bg-blue-50 text-blue-700 rounded-lg">
                        {user.role === 'ADMIN' ? 'Quản trị viên' : 'Thành viên K-Tech'}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        navigateTo('profile');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors text-left cursor-pointer"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Thông tin tài khoản</span>
                    </button>

                    <button
                      onClick={() => {
                        navigateTo('my-orders');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors text-left cursor-pointer"
                    >
                      <PackageCheck className="w-4 h-4 text-slate-400" />
                      <span>Đơn hàng của tôi</span>
                    </button>

                    <div className="my-1.5 border-t border-slate-100"></div>

                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors text-left font-bold cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthTab('login');
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-2xl shadow-xs transition-colors cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Đăng nhập</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. Category & Navigation Submenu */}
      <div className="bg-slate-50/90 border-t border-slate-200/80 hidden lg:block">
        <div className="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between h-12 text-sm">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <button
              onClick={() => navigateTo('home')}
              className={`px-4 py-1.5 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
                currentView === 'home'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-white'
              }`}
            >
              <span>Trang chủ</span>
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="px-4 py-1.5 text-slate-700 hover:text-blue-600 hover:bg-white rounded-xl font-semibold transition-all whitespace-nowrap cursor-pointer"
              >
                {cat.name}
              </button>
            ))}

            <button
              onClick={() => navigateTo('compare')}
              className={`px-4 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                currentView === 'compare'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-white'
              }`}
            >
              So sánh Laptop
            </button>
          </div>

          <div className="flex items-center shrink-0">
            <button
              onClick={() => {
                setSelectedCategory('all');
                navigateTo('catalog');
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-amber-300 animate-bounce" />
              <span>Deal Sốc Hôm Nay</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 p-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
            />
          </form>

          <div className="space-y-1 text-sm">
            <button
              onClick={() => {
                navigateTo('home');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 font-bold text-slate-800 rounded-xl hover:bg-slate-50"
            >
              Trang chủ
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="w-full text-left px-3.5 py-2.5 font-medium text-slate-700 rounded-xl hover:bg-slate-50"
              >
                {cat.name}
              </button>
            ))}
            <button
              onClick={() => {
                navigateTo('compare');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 font-medium text-slate-700 rounded-xl hover:bg-slate-50"
            >
              So sánh Laptop ({compareList.length})
            </button>
            <button
              onClick={() => {
                navigateTo('my-orders');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 font-medium text-slate-700 rounded-xl hover:bg-slate-50"
            >
              Đơn hàng của tôi
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
