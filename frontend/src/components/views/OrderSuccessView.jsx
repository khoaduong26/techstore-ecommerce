import React from 'react';
import { useShop } from '../../context/ShopContext';
import { formatVND } from '../../data/products';
import {
  CheckCircle2,
  PackageCheck,
  Truck,
  MapPin,
  CreditCard,
  Building
} from 'lucide-react';

export default function OrderSuccessView() {
  const { activeOrder, navigateTo } = useShop();

  if (!activeOrder) {
    navigateTo('home');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 w-full">
      {/* 1. Success Hero Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 text-center shadow-sm space-y-5">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Đặt Hàng Thành Công!
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
            Cảm ơn bạn đã tin tưởng chọn mua sắm tại K-Tech Store. Chúng tôi đã gửi thông tin xác nhận và mã vận đơn vào email của bạn.
          </p>
        </div>

        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm">
          <span className="text-slate-500 font-medium">Mã đơn hàng:</span>
          <strong className="text-blue-600 font-black tracking-wider text-base">{activeOrder.id}</strong>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigateTo('my-orders')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <PackageCheck className="w-5 h-5" />
            <span>Theo dõi đơn hàng của tôi</span>
          </button>

          <button
            onClick={() => navigateTo('catalog')}
            className="px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm rounded-2xl transition-all cursor-pointer"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>

      {/* 2. Order Tracking Timeline */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-3 pb-4 border-b border-slate-100">
          <Truck className="w-6 h-6 text-blue-600" />
          <span>Tiến trình xử lý đơn hàng</span>
        </h3>

        <div className="relative pl-7 space-y-7 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
          {activeOrder.trackingTimeline?.map((step, idx) => (
            <div key={idx} className="relative flex items-start gap-4">
              <span className="absolute -left-7 top-1 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black ring-4 ring-white shadow-xs">
                ✓
              </span>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">{step.title}</h4>
                  <span className="text-xs sm:text-sm text-slate-400 font-medium">({step.time})</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Order Details Summary */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">
          Thông tin chi tiết đơn hàng
        </h3>

        {/* Recipient & Payment info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-600">
          <div className="p-5 bg-slate-50 rounded-2xl space-y-1.5 border border-slate-100">
            <span className="font-bold text-slate-900 flex items-center gap-2 text-blue-700 text-sm">
              <MapPin className="w-4 h-4" />
              Địa chỉ nhận hàng:
            </span>
            <p className="font-bold text-slate-900 text-base">{activeOrder.recipientName}</p>
            <p className="font-semibold text-slate-700">{activeOrder.recipientPhone}</p>
            <p className="text-slate-500 leading-relaxed">{activeOrder.shippingAddress}</p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl space-y-1.5 border border-slate-100">
            <span className="font-bold text-slate-900 flex items-center gap-2 text-blue-700 text-sm">
              <CreditCard className="w-4 h-4" />
              Phương thức thanh toán:
            </span>
            <p className="font-bold text-slate-900 text-base">{activeOrder.paymentMethod}</p>
            <p className="text-slate-500 font-medium">{activeOrder.paymentStatus}</p>
          </div>
        </div>

        {/* VAT invoice info if requested */}
        {activeOrder.vatInfo && (
          <div className="p-5 bg-slate-50 rounded-2xl text-sm space-y-1.5 border border-slate-100">
            <span className="font-bold text-slate-900 flex items-center gap-2 text-blue-700">
              <Building className="w-4 h-4" />
              Thông tin xuất hóa đơn GTGT:
            </span>
            <p><strong>Công ty:</strong> {activeOrder.vatInfo.companyName}</p>
            <p><strong>MST:</strong> {activeOrder.vatInfo.taxCode}</p>
            <p><strong>Địa chỉ:</strong> {activeOrder.vatInfo.companyAddress}</p>
          </div>
        )}

        {/* Items List */}
        <div className="divide-y divide-slate-100 pt-3">
          {activeOrder.items?.map((item, idx) => (
            <div key={idx} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.product.images[0]}
                  alt=""
                  className="w-16 h-16 object-contain bg-slate-50 rounded-2xl p-1.5 shrink-0 border border-slate-100"
                />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1">
                    {item.product.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Số lượng: {item.quantity} × {formatVND(item.product.price)}
                  </p>
                </div>
              </div>

              <span className="text-sm sm:text-base font-bold text-slate-900 tabular-nums">
                {formatVND(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Total Cost */}
        <div className="pt-4 border-t border-slate-200 flex justify-between items-baseline">
          <span className="text-base font-extrabold text-slate-900">Tổng thanh toán:</span>
          <span className="text-2xl sm:text-3xl font-black text-blue-600 tabular-nums">
            {formatVND(activeOrder.total)}
          </span>
        </div>
      </div>
    </div>
  );
}
