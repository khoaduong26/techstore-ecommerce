import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { formatVND, VOUCHERS } from '../../data/products';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  Check,
  X
} from 'lucide-react';

export default function CartView() {
  const {
    cart,
    updateCartQty,
    removeFromCart,
    clearCart,
    appliedVoucher,
    applyVoucher,
    removeVoucher,
    cartSubtotal,
    cartDiscount,
    shippingFee,
    cartTotal,
    navigateTo,
    openProductDetail
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyVoucher(couponInput);
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/90 p-16 text-center max-w-2xl mx-auto space-y-6 my-10 shadow-xs">
        <div className="w-24 h-24 rounded-3xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">Giỏ hàng của bạn đang trống</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Hãy khám phá hàng ngàn sản phẩm laptop, phụ kiện công nghệ chất lượng cao với ưu đãi hấp dẫn.
          </p>
        </div>
        <button
          onClick={() => navigateTo('catalog')}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all cursor-pointer"
        >
          Tiếp tục mua sắm ngay
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 w-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Giỏ Hàng Của Bạn ({cart.reduce((s, i) => s + i.quantity, 0)} sản phẩm)
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kiểm tra thông tin chi tiết và áp dụng mã ưu đãi trước khi thanh toán
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-slate-500 hover:text-red-600 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Xóa toàn bộ giỏ</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 divide-y divide-slate-100 shadow-sm overflow-hidden">
            {cart.map((item) => {
              const { product, quantity } = item;
              const lineTotal = product.price * quantity;

              return (
                <div key={product.id} className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  {/* Product Info */}
                  <div className="flex items-center gap-5 flex-1">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      onClick={() => openProductDetail(product.id)}
                      className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-2xl bg-slate-50 p-2.5 shrink-0 border border-slate-100 cursor-pointer hover:scale-105 transition-transform"
                    />
                    <div className="space-y-1.5">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                        {product.brand}
                      </span>
                      <h3
                        onClick={() => openProductDetail(product.id)}
                        className="text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 line-clamp-2 cursor-pointer transition-colors leading-snug"
                      >
                        {product.name}
                      </h3>
                      <p className="text-sm sm:text-base font-extrabold text-blue-600 tabular-nums">
                        {formatVND(product.price)}
                      </p>
                      <span className="text-xs sm:text-sm text-emerald-600 font-semibold block">
                        ✓ Còn hàng trong kho sẵn sàng giao
                      </span>
                    </div>
                  </div>

                  {/* Qty & Line Total */}
                  <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-slate-200 rounded-2xl bg-slate-50/80 p-1.5">
                      <button
                        onClick={() => updateCartQty(product.id, quantity - 1)}
                        className="p-2 hover:bg-white text-slate-700 rounded-xl transition-colors cursor-pointer"
                        title="Giảm số lượng"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center text-sm font-black text-slate-900 tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateCartQty(product.id, quantity + 1)}
                        className="p-2 hover:bg-white text-slate-700 rounded-xl transition-colors cursor-pointer"
                        title="Tăng số lượng"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-[130px]">
                      <span className="text-base sm:text-lg font-black text-slate-900 tabular-nums block">
                        {formatVND(lineTotal)}
                      </span>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-bold transition-colors mt-1 cursor-pointer"
                      >
                        Xóa sản phẩm
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Notice */}
          <div className="p-5 bg-blue-50/80 border border-blue-200 rounded-3xl flex items-center gap-4 text-sm text-blue-900">
            <Truck className="w-6 h-6 text-blue-600 shrink-0" />
            <span>
              <strong>Ưu đãi vận chuyển:</strong> Miễn phí giao hàng hỏa tốc 2H cho toàn bộ đơn hàng từ 500.000₫!
            </span>
          </div>
        </div>

        {/* Right: Summary & Checkout */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 pb-4 border-b border-slate-100">
              Tóm Tắt Đơn Hàng
            </h3>

            {/* Voucher Code Form */}
            <div className="space-y-3">
              <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                Mã giảm giá / Ưu đãi K-Tech:
              </label>
              <form onSubmit={handleApplyCoupon} className="flex gap-2.5">
                <input
                  type="text"
                  placeholder="Nhập mã voucher (VD: KTECH500)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold uppercase placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-xs transition-colors cursor-pointer"
                >
                  Áp dụng
                </button>
              </form>

              {/* Suggested Vouchers */}
              <div className="pt-2 flex flex-wrap gap-2">
                {VOUCHERS.map((v) => (
                  <button
                    key={v.code}
                    onClick={() => applyVoucher(v.code)}
                    className="text-xs font-bold px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-xl transition-colors cursor-pointer"
                  >
                    {v.code} (-{v.discount / 1000}k)
                  </button>
                ))}
              </div>

              {appliedVoucher && (
                <div className="mt-3 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-sm text-emerald-900">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span>Mã: <strong>{appliedVoucher.code}</strong> (-{formatVND(appliedVoucher.discount)})</span>
                  </div>
                  <button
                    onClick={removeVoucher}
                    className="p-1.5 hover:bg-emerald-100 rounded-xl text-emerald-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Tạm tính hàng hóa:</span>
                <span className="font-bold text-slate-900 tabular-nums">{formatVND(cartSubtotal)}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Giảm giá voucher:</span>
                  <span className="tabular-nums">-{formatVND(cartDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Phí vận chuyển:</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-600 font-extrabold">MIỄN PHÍ</span>
                  ) : (
                    formatVND(shippingFee)
                  )}
                </span>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-between items-baseline">
                <div>
                  <span className="text-base font-extrabold text-slate-900 block">Tổng thanh toán:</span>
                  <span className="text-xs text-slate-400 font-medium">(Đã bao gồm thuế GTGT 10%)</span>
                </div>
                <span className="text-2xl sm:text-3xl font-black text-blue-600 tabular-nums">
                  {formatVND(cartTotal)}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base rounded-2xl shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Tiến hành đặt hàng</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigateTo('catalog')}
              className="w-full py-3 text-sm text-blue-600 hover:text-blue-700 font-bold text-center cursor-pointer block"
            >
              ← Tiếp tục mua sắm thêm sản phẩm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
