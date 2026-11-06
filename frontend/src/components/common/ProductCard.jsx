import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ShoppingCart, ArrowLeftRight, Heart, Star, Check } from 'lucide-react';
import { formatVND } from '../../data/products';

export default function ProductCard({ product }) {
  const {
    openProductDetail,
    addToCart,
    addToCompare,
    removeFromCompare,
    isInCompare,
    toggleWishlist,
    isInWishlist
  } = useShop();

  const isCompared = isInCompare(product.id);
  const isWished = isInWishlist(product.id);

  const handleCompareClick = (e) => {
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => openProductDetail(product.id)}
      className="group relative bg-white rounded-3xl border border-slate-200/90 hover:border-blue-400/80 p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    >
      {/* Top Badges & Wishlist */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 text-xs font-extrabold uppercase tracking-wider bg-slate-100 text-slate-800 rounded-lg">
            {product.brand}
          </span>
          {product.installment && (
            <span className="px-2.5 py-1 text-xs font-bold bg-blue-50 text-blue-700 rounded-lg">
              {product.installment}
            </span>
          )}
          {product.badge && (
            <span className="hidden sm:inline px-2.5 py-1 text-xs font-bold bg-amber-50 text-amber-800 rounded-lg">
              {product.badge}
            </span>
          )}
        </div>

        <button
          onClick={handleWishlist}
          className={`p-2 rounded-full transition-colors ${
            isWished
              ? 'text-rose-500 bg-rose-50'
              : 'text-slate-300 hover:text-rose-500 hover:bg-slate-50'
          }`}
          title="Thêm vào yêu thích"
        >
          <Heart className={`w-5 h-5 ${isWished ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Image */}
      <div className="relative w-full aspect-[4/3] rounded-2xl bg-slate-50 overflow-hidden mb-3.5 flex items-center justify-center p-3">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {product.discountPercent > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-full shadow-xs">
            -{product.discountPercent}%
          </div>
        )}
      </div>

      {/* Main Info */}
      <div className="flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2 transition-colors leading-snug mb-2.5 min-h-[44px]">
          {product.name}
        </h3>

        {/* Quick Specs (Laptop or Accessory) */}
        {product.specs && (
          <div className="bg-slate-50/90 rounded-xl p-2.5 mb-3 text-xs sm:text-[13px] text-slate-700 space-y-1.5 border border-slate-100">
            {product.category === 'laptop' ? (
              <>
                <p className="truncate font-semibold text-slate-900">
                  <span className="text-slate-400 mr-1.5">• CPU:</span>
                  {product.specs.cpu?.split('(')[0]}
                </p>
                <p className="truncate">
                  <span className="text-slate-400 mr-1.5">• RAM:</span>
                  {product.specs.ram?.split('(')[0]} | {product.specs.storage?.split(' ')[0]} {product.specs.storage?.split(' ')[1]}
                </p>
                <p className="truncate text-blue-700 font-bold">
                  <span className="text-slate-400 mr-1.5">• GPU:</span>
                  {product.specs.gpu?.split('(')[0]}
                </p>
              </>
            ) : (
              <p className="line-clamp-2 text-slate-600 font-medium">
                {product.highlights?.[0] || 'Phân phối chính hãng 100%'}
              </p>
            )}
          </div>
        )}

        {/* Rating & Stock */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 mb-2.5">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-800">{product.rating}</span>
            <span className="text-slate-400">({product.reviewsCount})</span>
          </div>
          <span className="text-emerald-600 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            Còn {product.stock} máy
          </span>
        </div>

        {/* Pricing */}
        <div className="pt-2.5 border-t border-slate-100 mt-auto">
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <span className="text-lg sm:text-2xl font-black text-blue-600 tabular-nums">
              {formatVND(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs sm:text-sm text-slate-400 line-through tabular-nums">
                {formatVND(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-2.5 flex items-center gap-2.5">
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Thêm vào giỏ</span>
        </button>

        <button
          onClick={handleCompareClick}
          className={`p-3 rounded-2xl border transition-colors shrink-0 cursor-pointer ${
            isCompared
              ? 'bg-blue-50 border-blue-400 text-blue-700'
              : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
          }`}
          title={isCompared ? 'Đã thêm so sánh' : 'Thêm vào so sánh'}
        >
          {isCompared ? <Check className="w-5 h-5 text-blue-600" /> : <ArrowLeftRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
