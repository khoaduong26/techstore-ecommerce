import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { ArrowLeftRight, X, ChevronUp, ChevronDown } from 'lucide-react';
import { formatVND } from '../../data/products';

export default function CompareFloatingBar() {
  const { compareList, removeFromCompare, clearCompare, navigateTo } = useShop();
  const [isMinimized, setIsMinimized] = useState(false);

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-200/80 p-3 transition-all duration-300">
        <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <ArrowLeftRight className="w-4 h-4" />
            </span>
            <span className="text-sm font-semibold text-slate-800">
              So sánh sản phẩm ({compareList.length}/3)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1 p-1"
            >
              {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <button
              onClick={clearCompare}
              className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-0.5 rounded hover:bg-red-50 transition-colors"
            >
              Xóa tất cả
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-x-auto py-1">
              {compareList.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1.5 pr-2.5 shrink-0 max-w-[220px]"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-lg bg-white shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">
                      {product.name}
                    </p>
                    <p className="text-[11px] font-bold text-blue-600">
                      {formatVND(product.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="p-1 text-slate-400 hover:text-slate-600 ml-1 rounded-full hover:bg-slate-200 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
                <div
                  key={`empty-${idx}`}
                  className="border border-dashed border-slate-300 rounded-xl p-2 px-4 flex items-center justify-center text-xs text-slate-400 shrink-0 h-12"
                >
                  + Thêm sản phẩm
                </div>
              ))}
            </div>

            <button
              onClick={() => navigateTo('compare')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all shrink-0 flex items-center gap-1.5"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              So sánh ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

