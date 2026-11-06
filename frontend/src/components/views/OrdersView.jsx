import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { formatVND } from '../../data/products';
import {
  PackageCheck,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  ShoppingBag
} from 'lucide-react';

export default function OrdersView() {
  const { orders, cancelOrder, addToCart, navigateTo, setActiveOrder } = useShop();
  const [selectedStatusTab, setSelectedStatusTab] = useState('ALL');

  const filteredOrders = orders.filter((order) => {
    if (selectedStatusTab === 'ALL') return true;
    return order.status === selectedStatusTab;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DELIVERING':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold bg-blue-50 text-blue-700">
            <Truck className="w-4 h-4" />
            Đang vận chuyển
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold bg-emerald-50 text-emerald-700">
            <CheckCircle2 className="w-4 h-4" />
            Giao hàng thành công
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold bg-red-50 text-red-700">
            <XCircle className="w-4 h-4" />
            Đã hủy đơn
          </span>
        );
      case 'CONFIRMED':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold bg-amber-50 text-amber-800">
            <Clock className="w-4 h-4" />
            Chờ xác nhận &amp; đóng gói
          </span>
        );
    }
  };

  const handleReorder = (order) => {
    order.items?.forEach((item) => {
      addToCart(item.product, item.quantity);
    });
    navigateTo('cart');
  };

  const handleViewDetail = (order) => {
    setActiveOrder(order);
    navigateTo('order-success');
  };

  return (
    <div className="space-y-8 pb-16 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
            <PackageCheck className="w-7 h-7 text-blue-600" />
            <span>Đơn Hàng Của Tôi</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi tình trạng đơn hàng, lộ trình vận chuyển và lịch sử mua sắm của bạn
          </p>
        </div>

        <button
          onClick={() => navigateTo('catalog')}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          Mua sắm thêm
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5">
        {[
          { id: 'ALL', label: 'Tất cả đơn hàng' },
          { id: 'CONFIRMED', label: 'Chờ xử lý' },
          { id: 'DELIVERING', label: 'Đang vận chuyển' },
          { id: 'COMPLETED', label: 'Đã hoàn thành' },
          { id: 'CANCELLED', label: 'Đã hủy' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedStatusTab(tab.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedStatusTab === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-16 text-center space-y-4">
          <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Không có đơn hàng nào trong mục này</h3>
          <p className="text-sm text-slate-500">Các đơn hàng bạn đặt sẽ xuất hiện tại đây.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-5 hover:border-blue-300 transition-colors"
            >
              {/* Order Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">Mã đơn:</span>
                  <strong className="text-sm sm:text-base text-slate-900 font-black tracking-wider">
                    #{order.id}
                  </strong>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs sm:text-sm text-slate-400 font-medium">{order.createdAt}</span>
                </div>
                <div>{getStatusBadge(order.status)}</div>
              </div>

              {/* Order Items */}
              <div className="divide-y divide-slate-100">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="py-4 flex items-center justify-between gap-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.images[0]}
                        alt=""
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain bg-slate-50 rounded-2xl p-2 shrink-0 border border-slate-100"
                      />
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                          Số lượng: {item.quantity} • Đơn giá: {formatVND(item.product.price)}
                        </p>
                      </div>
                    </div>

                    <span className="text-sm sm:text-base font-extrabold text-slate-900 tabular-nums">
                      {formatVND(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Card Footer */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-sm text-slate-600">
                  <span>Tổng tiền thanh toán: </span>
                  <strong className="text-base sm:text-lg font-black text-blue-600 tabular-nums ml-1">
                    {formatVND(order.total)}
                  </strong>
                  <span className="text-xs text-slate-400 ml-1.5 font-medium">({order.paymentMethod.split('-')[0]})</span>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  {order.status === 'CONFIRMED' && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="px-4 py-2 text-xs sm:text-sm font-bold text-red-600 hover:bg-red-50 rounded-2xl border border-red-200 transition-colors cursor-pointer"
                    >
                      Hủy đơn hàng
                    </button>
                  )}

                  <button
                    onClick={() => handleReorder(order)}
                    className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-100 rounded-2xl border border-slate-200 transition-colors cursor-pointer"
                  >
                    Mua lại
                  </button>

                  <button
                    onClick={() => handleViewDetail(order)}
                    className="px-5 py-2 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Chi tiết &amp; Lộ trình</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
