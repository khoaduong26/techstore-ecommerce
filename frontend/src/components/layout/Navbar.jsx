import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import {
  Search,
  ShoppingCart,
  ArrowLeftRight,
  Heart,
  User,
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
          ? 'bg-[#0F172A]/98 shadow-xl shadow-slate-950/20 border-b border-slate-800 backdrop-blur-md'
          : 'bg-[#0F172A] border-b border-slate-800/90'
      }`}
    >
      {/* Main Header Bar */}
      <div
        className={`max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between gap-4 lg:gap-8 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-3.5 sm:py-4'
        }`}
      >
        {/* Brand Logo */}
        <button
          onClick={() => navigateTo('home')}
          className="flex items-center gap-3.5 shrink-0 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Laptop className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
              <span>K-TECH</span>
              <span className="px-2 py-0.5 text-xs font-black bg-blue-500/25 text-blue-300 border border-blue-400/30 rounded-lg">STORE</span>
            </div>
            <p className="text-xs text-slate-400 font-semibold tracking-wide">
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
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm laptop, phụ kiện công nghệ (VD: Asus ROG, Legion 5, MacBook, Keychron...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-28 py-2.5 sm:py-3 bg-white text-slate-900 placeholder:text-slate-400 border border-transparent rounded-2xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
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
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Tìm kiếm
            </button>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Compare Button */}
          <button
            onClick={() => navigateTo('compare')}
            className="relative p-2 sm:p-2.5 text-slate-300 hover:text-blue-400 hover:bg-slate-800/80 rounded-2xl transition-colors flex flex-col items-center cursor-pointer"
            title="So sánh sản phẩm"
          >
            <ArrowLeftRight className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-[11px] font-bold mt-0.5 hidden sm:block">So sánh</span>
            {compareList.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs font-extrabold rounded-full flex items-center justify-center shadow-xs">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => navigateTo('wishlist')}
            className="relative p-2 sm:p-2.5 text-slate-300 hover:text-rose-400 hover:bg-slate-800/80 rounded-2xl transition-colors flex flex-col items-center cursor-pointer"
            title="Yêu thích"
          >
            <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-[11px] font-bold mt-0.5 hidden sm:block">Yêu thích</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs font-extrabold rounded-full flex items-center justify-center shadow-xs">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => navigateTo('cart')}
            className="relative flex items-center gap-3 p-2 sm:px-3.5 sm:py-2 bg-blue-950/70 hover:bg-blue-900/80 text-blue-200 rounded-2xl border border-blue-800/70 transition-all cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              {totalCartQty > 0 && (
                <span className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-red-500 text-white text-xs font-extrabold rounded-full flex items-center justify-center shadow-xs animate-pulse">
                  {totalCartQty}
                </span>
              )}
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-[11px] text-slate-400 font-medium leading-none">Giỏ hàng</span>
              <span className="text-sm sm:text-base font-extrabold text-blue-300 leading-tight mt-0.5 tabular-nums">
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
                  className="flex items-center gap-2 p-1.5 sm:p-2 rounded-2xl hover:bg-slate-800/80 transition-colors cursor-pointer border border-transparent hover:border-slate-700"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden xl:flex flex-col text-left">
                    <span className="text-[11px] text-slate-400 font-medium leading-none">Xin chào,</span>
                    <span className="text-sm font-bold text-white leading-tight mt-0.5 flex items-center gap-1">
                      {user.name.split(' ')[0]}
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </span>
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 py-2.5 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-5 py-3 border-b border-slate-800">
                      <p className="text-sm font-bold text-white truncate">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{user.email}</p>
                      <span className="inline-block mt-2 px-2.5 py-0.5 text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg">
                        {user.role === 'ADMIN' ? 'Quản trị viên' : 'Thành viên K-Tech'}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        navigateTo('profile');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-3 transition-colors text-left cursor-pointer"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Thông tin tài khoản</span>
                    </button>

                    <button
                      onClick={() => {
                        navigateTo('my-orders');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-3 transition-colors text-left cursor-pointer"
                    >
                      <PackageCheck className="w-4 h-4 text-slate-400" />
                      <span>Đơn hàng của tôi</span>
                    </button>

                    <div className="my-1.5 border-t border-slate-800"></div>

                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-5 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-3 transition-colors text-left font-bold cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('login')}
                  className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold rounded-xl border border-slate-700 transition-colors cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Đăng nhập</span>
                </button>
                <button
                  onClick={() => navigateTo('register')}
                  className="hidden sm:flex items-center gap-1 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <span>Đăng ký</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Submenu Bar (Categories & Quick Links) */}
      <div className="bg-[#0B1120] border-t border-slate-800/90 hidden lg:block">
        <div className="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between h-11 text-sm">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <button
              onClick={() => navigateTo('home')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-2 cursor-pointer ${
                currentView === 'home'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <span>Trang chủ</span>
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="px-3.5 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer"
              >
                {cat.name}
              </button>
            ))}

            <button
              onClick={() => navigateTo('compare')}
              className={`px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                currentView === 'compare'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
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
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-extrabold text-xs rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
              <span>Deal Sốc Hôm Nay</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0F172A] border-t border-slate-800 p-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 rounded-xl text-sm"
            />
          </form>

          <div className="space-y-1 text-sm">
            <button
              onClick={() => {
                navigateTo('home');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 font-bold text-white rounded-xl hover:bg-slate-800"
            >
              Trang chủ
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="w-full text-left px-3.5 py-2.5 font-medium text-slate-300 rounded-xl hover:bg-slate-800"
              >
                {cat.name}
              </button>
            ))}
            <button
              onClick={() => {
                navigateTo('compare');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 font-medium text-slate-300 rounded-xl hover:bg-slate-800"
            >
              So sánh Laptop ({compareList.length})
            </button>
            <button
              onClick={() => {
                navigateTo('wishlist');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 font-medium text-slate-300 rounded-xl hover:bg-slate-800 flex items-center justify-between"
            >
              <span>Yêu thích ({wishlist.length})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
