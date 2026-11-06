import React, { useState, useMemo } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, CATEGORIES, BRANDS } from '../../data/products';
import ProductCard from '../common/ProductCard';
import {
  Filter,
  SlidersHorizontal,
  X,
  Search,
  Check,
  RotateCcw
} from 'lucide-react';

const PRICE_RANGES = [
  { label: 'Tất cả mức giá', min: 0, max: 200000000 },
  { label: 'Dưới 5 triệu', min: 0, max: 5000000 },
  { label: 'Từ 5 - 15 triệu', min: 5000000, max: 15000000 },
  { label: 'Từ 15 - 30 triệu', min: 15000000, max: 30000000 },
  { label: 'Từ 30 - 45 triệu', min: 30000000, max: 45000000 },
  { label: 'Trên 45 triệu', min: 45000000, max: 200000000 },
];

export default function CatalogView() {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy
  } = useShop();

  const [selectedPriceRangeIndex, setSelectedPriceRangeIndex] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'all' && product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }
      // Price range
      const activeRange = PRICE_RANGES[selectedPriceRangeIndex];
      if (product.price < activeRange.min || product.price > activeRange.max) {
        return false;
      }
      // Only in stock
      if (onlyInStock && product.stock <= 0) {
        return false;
      }
      // Search keyword
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesCpu = product.specs?.cpu?.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCategory && !matchesCpu) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return 0; // default featured
    });
  }, [selectedCategory, selectedBrand, selectedPriceRangeIndex, onlyInStock, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedPriceRangeIndex(0);
    setOnlyInStock(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    selectedPriceRangeIndex !== 0 ||
    onlyInStock ||
    searchQuery.trim().length > 0;

  return (
    <div className="space-y-8 pb-16 w-full">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {selectedCategory === 'all'
              ? 'Tất cả sản phẩm K-Tech Store'
              : CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Danh mục sản phẩm'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Hiển thị <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> sản phẩm công nghệ chính hãng
          </p>
        </div>

        {/* Mobile filter toggle */}
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 self-start"
        >
          <SlidersHorizontal className="w-5 h-5 text-blue-600" />
          <span>Bộ lọc ({hasActiveFilters ? 'Đang lọc' : 'Tất cả'})</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar */}
        <aside
          className={`lg:col-span-3 bg-white rounded-3xl border border-slate-200/90 p-6 space-y-7 shadow-xs ${
            isMobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2.5">
              <Filter className="w-5 h-5 text-blue-600" />
              <span>Bộ lọc tìm kiếm</span>
            </h3>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại</span>
              </button>
            )}
          </div>

          {/* 1. Category Filter */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              Danh mục
            </h4>
            <div className="space-y-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-colors cursor-pointer text-left ${
                    selectedCategory === cat.id
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  {selectedCategory === cat.id && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Brand Filter */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              Thương hiệu
            </h4>
            <div className="flex flex-wrap gap-2 max-h-56 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedBrand('all')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                  selectedBrand === 'all'
                    ? 'bg-blue-600 text-white font-extrabold shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Tất cả
              </button>
              {BRANDS.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    selectedBrand.toLowerCase() === brand.toLowerCase()
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Price Range Filter */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              Mức giá
            </h4>
            <div className="space-y-1.5">
              {PRICE_RANGES.map((range, idx) => (
                <button
                  key={range.label}
                  onClick={() => setSelectedPriceRangeIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm transition-colors cursor-pointer text-left ${
                    selectedPriceRangeIndex === idx
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{range.label}</span>
                  {selectedPriceRangeIndex === idx && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* 4. In Stock Only */}
          <div className="pt-3 border-t border-slate-100">
            <label className="flex items-center gap-3 cursor-pointer text-sm font-semibold text-slate-800 select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded-lg border-slate-300 focus:ring-blue-500"
              />
              <span>Chỉ hiển thị máy còn hàng</span>
            </label>
          </div>
        </aside>

        {/* Right Product Grid & Sorting Toolbar */}
        <div className="lg:col-span-9 space-y-6">
          {/* Active Filter Chips & Sort Dropdown */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
            {/* Active Chips */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-sm text-slate-500 font-medium">Lọc theo:</span>

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-xs sm:text-sm font-bold">
                  {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory('all')}>
                    <X className="w-4 h-4 hover:text-blue-900" />
                  </button>
                </span>
              )}

              {selectedBrand !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-xs sm:text-sm font-bold">
                  Hãng: {selectedBrand}
                  <button onClick={() => setSelectedBrand('all')}>
                    <X className="w-4 h-4 hover:text-blue-900" />
                  </button>
                </span>
              )}

              {selectedPriceRangeIndex !== 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-xs sm:text-sm font-bold">
                  {PRICE_RANGES[selectedPriceRangeIndex].label}
                  <button onClick={() => setSelectedPriceRangeIndex(0)}>
                    <X className="w-4 h-4 hover:text-blue-900" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-900 rounded-xl text-xs sm:text-sm font-bold">
                  Từ khóa: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-4 h-4 hover:text-amber-950" />
                  </button>
                </span>
              )}

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs sm:text-sm text-red-600 hover:underline font-bold ml-1.5 cursor-pointer"
                >
                  Xóa tất cả
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <span className="text-sm text-slate-500 font-medium">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="featured">Nổi bật nhất</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="rating">Đánh giá tốt nhất</option>
                <option value="discount">% Khuyến mãi lớn</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid: 3 columns on standard laptop / 4 columns on wide screens */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl border border-slate-200/90 p-16 text-center space-y-5">
              <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
                <Search className="w-10 h-10" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900">
                  Không tìm thấy sản phẩm phù hợp
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Hãy thử điều chỉnh lại bộ lọc hoặc nhập từ khóa tìm kiếm chung hơn để khám phá nhiều sản phẩm khác.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-xs transition-colors cursor-pointer"
              >
                Xóa bộ lọc &amp; Xem lại tất cả
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
