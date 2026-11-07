import React from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/products';
import ProductCard from '../common/ProductCard';
import { Heart, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function WishlistView() {
  const { wishlist, clearWishlist, navigateTo } = useShop();

  const favoritedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (favoritedProducts.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/90 p-16 text-center max-w-2xl mx-auto space-y-6 my-10 shadow-xs">
        <div className="w-24 h-24 rounded-3xl bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
          <Heart className="w-12 h-12 fill-rose-100" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">
            Danh sách yêu thích của bạn đang trống
          </h2>
        </div>
        <button
          onClick={() => navigateTo('catalog')}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Khám phá sản phẩm ngay</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <button
            onClick={() => navigateTo('catalog')}
            className="text-sm text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1.5 mb-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại danh mục sản phẩm</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
            <span>Danh Sách Yêu Thích Của Bạn ({favoritedProducts.length} sản phẩm)</span>
          </h1>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={clearWishlist}
            className="px-4 py-2.5 bg-white hover:bg-red-50 text-red-600 text-sm font-bold rounded-2xl border border-slate-200 hover:border-red-200 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Xóa tất cả</span>
          </button>

          <button
            onClick={() => navigateTo('catalog')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-2xl shadow-xs transition-colors cursor-pointer"
          >
            Mua sắm thêm
          </button>
        </div>
      </div>

      {/* Grid of Favorited Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {favoritedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

