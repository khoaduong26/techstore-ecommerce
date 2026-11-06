import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, formatVND } from '../../data/products';
import {
  ArrowLeftRight,
  X,
  Plus,
  ShoppingCart
} from 'lucide-react';

export default function CompareView() {
  const {
    compareList,
    removeFromCompare,
    clearCompare,
    addToCompare,
    addToCart,
    openProductDetail,
    navigateTo
  } = useShop();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Available products not in compare list
  const availableToAdd = PRODUCTS.filter(
    (p) => !compareList.some((item) => item.id === p.id)
  );

  const specRows = [
    { key: 'price', label: 'Giá bán chính hãng', isPrice: true },
    { key: 'brand', label: 'Thương hiệu' },
    { key: 'cpu', label: 'Vi xử lý (CPU)', path: 'specs.cpu' },
    { key: 'gpu', label: 'Card đồ họa (GPU)', path: 'specs.gpu' },
    { key: 'ram', label: 'Bộ nhớ RAM', path: 'specs.ram' },
    { key: 'storage', label: 'Ổ cứng SSD', path: 'specs.storage' },
    { key: 'screen', label: 'Màn hình hiển thị', path: 'specs.screen' },
    { key: 'battery', label: 'Dung lượng Pin', path: 'specs.battery' },
    { key: 'weight', label: 'Trọng lượng', path: 'specs.weight' },
    { key: 'os', label: 'Hệ điều hành', path: 'specs.os' },
    { key: 'warranty', label: 'Chính sách bảo hành' }
  ];

  const getSpecValue = (product, row) => {
    if (row.isPrice) return formatVND(product.price);
    if (row.path) {
      const parts = row.path.split('.');
      return product[parts[0]]?.[parts[1]] || '—';
    }
    return product[row.key] || '—';
  };

  return (
    <div className="space-y-8 pb-16 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
            <ArrowLeftRight className="w-7 h-7 text-blue-600" />
            <span>So Sánh Chi Tiết Sản Phẩm</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Đặt các dòng máy lên bàn cân để chọn được thiết bị ưng ý và phù hợp nhất với nhu cầu của bạn
          </p>
        </div>

        {compareList.length > 0 && (
          <div className="flex items-center gap-3">
            {compareList.length < 3 && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-bold rounded-2xl border border-blue-200 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm sản phẩm</span>
              </button>
            )}
            <button
              onClick={clearCompare}
              className="px-4 py-2.5 bg-white hover:bg-red-50 text-red-600 text-sm font-bold rounded-2xl border border-slate-200 hover:border-red-200 transition-colors cursor-pointer"
            >
              Xóa tất cả
            </button>
          </div>
        )}
      </div>

      {compareList.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-200/90 p-16 text-center space-y-5">
          <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
            <ArrowLeftRight className="w-10 h-10" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-slate-900">
              Chưa có sản phẩm nào trong danh sách so sánh
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Nhấn nút icon "So sánh" trên các sản phẩm ở trang chủ hoặc danh mục để xem bảng đối chiếu chi tiết.
            </p>
          </div>
          <button
            onClick={() => navigateTo('catalog')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-xs transition-colors cursor-pointer"
          >
            Khám phá danh sách Laptop
          </button>
        </div>
      ) : (
        /* Comparison Table Container */
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="p-5 text-left text-sm font-bold text-slate-600 w-56 min-w-[200px]">
                    Thông số so sánh
                  </th>
                  {compareList.map((product) => (
                    <th key={product.id} className="p-6 text-center min-w-[280px] max-w-[320px] align-top">
                      <div className="relative group flex flex-col items-center">
                        <button
                          onClick={() => removeFromCompare(product.id)}
                          className="absolute -top-2 -right-2 p-1.5 bg-slate-200/90 hover:bg-red-500 hover:text-white text-slate-600 rounded-full transition-colors cursor-pointer"
                          title="Xóa khỏi so sánh"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <img
                          src={product.images[0]}
                          alt={product.name}
                          onClick={() => openProductDetail(product.id)}
                          className="w-40 h-32 object-contain mix-blend-multiply cursor-pointer hover:scale-105 transition-transform"
                        />

                        <h4
                          onClick={() => openProductDetail(product.id)}
                          className="text-sm font-bold text-slate-900 hover:text-blue-600 line-clamp-2 mt-3 leading-snug cursor-pointer"
                        >
                          {product.name}
                        </h4>

                        <span className="text-base sm:text-lg font-black text-blue-600 mt-2 tabular-nums">
                          {formatVND(product.price)}
                        </span>

                        <button
                          onClick={() => addToCart(product, 1)}
                          className="mt-4 w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Thêm vào giỏ</span>
                        </button>
                      </div>
                    </th>
                  ))}

                  {/* Empty Add Slot */}
                  {compareList.length < 3 && (
                    <th className="p-6 text-center min-w-[240px] align-middle border-l border-dashed border-slate-200">
                      <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="w-full py-12 border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-3xl flex flex-col items-center justify-center gap-3 text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 transition-all cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                          <Plus className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-bold">+ Thêm sản phẩm thứ {compareList.length + 1}</span>
                      </button>
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm">
                {specRows.map((row, idx) => (
                  <tr
                    key={row.key}
                    className={idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}
                  >
                    <td className="p-5 font-bold text-slate-700 bg-slate-50/90 border-r border-slate-100">
                      {row.label}
                    </td>
                    {compareList.map((product) => (
                      <td
                        key={`${product.id}-${row.key}`}
                        className={`p-5 text-center ${
                          row.isPrice ? 'font-black text-blue-600 text-base sm:text-lg' : 'text-slate-800 font-semibold'
                        }`}
                      >
                        {getSpecValue(product, row)}
                      </td>
                    ))}
                    {compareList.length < 3 && <td className="p-5 text-center text-slate-300 font-medium">—</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Quick Add to Compare */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Chọn sản phẩm thêm vào so sánh ({compareList.length}/3)
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto divide-y divide-slate-100 space-y-3">
              {availableToAdd.map((product) => (
                <div
                  key={product.id}
                  className="pt-3 flex items-center justify-between gap-4 hover:bg-slate-50 p-3 rounded-2xl transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-14 object-contain bg-slate-50 rounded-xl p-1.5"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{product.name}</h4>
                      <p className="text-sm font-extrabold text-blue-600">{formatVND(product.price)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      addToCompare(product);
                      setIsAddModalOpen(false);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shrink-0 cursor-pointer"
                  >
                    Thêm
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
