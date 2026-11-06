import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, VOUCHERS } from '../data/products';

const ShopContext = createContext();

const INITIAL_USER = {
  id: 'usr-01',
  name: 'Nguyễn Văn A',
  email: 'nguyenvana@gmail.com',
  phone: '0988 123 456',
  address: 'Số 45, Đường Lê Duẩn, Phường Bến Nghé, Quận 1',
  city: 'TP. Hồ Chí Minh',
  role: 'CUSTOMER',
  memberSince: 'Tháng 3, 2024',
  loyaltyPoints: 450,
};

const INITIAL_ORDERS = [
  {
    id: 'KT-89421',
    createdAt: '05/11/2026 14:30',
    status: 'DELIVERING', // 'CONFIRMED' | 'DELIVERING' | 'COMPLETED' | 'CANCELLED'
    statusLabel: 'Đang vận chuyển',
    paymentMethod: 'COD - Thanh toán khi nhận hàng',
    paymentStatus: 'Chờ thanh toán',
    shippingAddress: 'Số 45, Đường Lê Duẩn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    recipientName: 'Nguyễn Văn A',
    recipientPhone: '0988 123 456',
    items: [
      {
        product: PRODUCTS[0],
        quantity: 1,
        price: PRODUCTS[0].price,
      },
      {
        product: PRODUCTS[9],
        quantity: 1,
        price: PRODUCTS[9].price,
      }
    ],
    subtotal: PRODUCTS[0].price + PRODUCTS[9].price,
    discount: 500000,
    shippingFee: 0,
    total: PRODUCTS[0].price + PRODUCTS[9].price - 500000,
    trackingTimeline: [
      { time: '05/11 14:30', title: 'Đặt hàng thành công', desc: 'Đơn hàng đã được tiếp nhận trên hệ thống K-Tech' },
      { time: '05/11 15:45', title: 'Xác nhận đơn hàng', desc: 'Nhân viên kinh doanh đã kiểm tra tồn kho và xác nhận' },
      { time: '06/11 08:30', title: 'Bàn giao cho đơn vị vận chuyển', desc: 'Kiện hàng đang trên đường giao tới bạn (GHN Express)' }
    ]
  },
  {
    id: 'KT-77102',
    createdAt: '20/10/2026 10:15',
    status: 'COMPLETED',
    statusLabel: 'Giao hàng thành công',
    paymentMethod: 'Chuyển khoản QR VNPay 24/7',
    paymentStatus: 'Đã thanh toán',
    shippingAddress: 'Số 45, Đường Lê Duẩn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    recipientName: 'Nguyễn Văn A',
    recipientPhone: '0988 123 456',
    items: [
      {
        product: PRODUCTS[2],
        quantity: 1,
        price: PRODUCTS[2].price,
      }
    ],
    subtotal: PRODUCTS[2].price,
    discount: 1000000,
    shippingFee: 0,
    total: PRODUCTS[2].price - 1000000,
    trackingTimeline: [
      { time: '20/10 10:15', title: 'Đặt hàng thành công', desc: 'Đã thanh toán qua QR VNPay' },
      { time: '21/10 14:00', title: 'Đã giao thành công', desc: 'Khách hàng đã nhận kiện hàng nguyên seal' }
    ]
  }
];

export function ShopProvider({ children }) {
  // Navigation
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'catalog' | 'product-detail' | 'compare' | 'cart' | 'checkout' | 'order-success' | 'my-orders' | 'profile'
  const [activeProductId, setActiveProductId] = useState(PRODUCTS[0].id);
  const [activeOrder, setActiveOrder] = useState(INITIAL_ORDERS[0]);

  // Catalog filters
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'rating'

  // Cart
  const [cart, setCart] = useState([
    { product: PRODUCTS[0], quantity: 1 },
    { product: PRODUCTS[9], quantity: 1 }
  ]);
  const [appliedVoucher, setAppliedVoucher] = useState(VOUCHERS[0]);

  // Compare & Wishlist
  const [compareList, setCompareList] = useState([PRODUCTS[0], PRODUCTS[1]]);
  const [wishlist, setWishlist] = useState([PRODUCTS[2].id]);

  // Auth & Profile
  const [user, setUser] = useState(INITIAL_USER);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login'); // 'login' | 'register'

  // Orders
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // Notifications (Toasts)
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart functions
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const updateCartQty = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyVoucher = (code) => {
    const found = VOUCHERS.find((v) => v.code.toUpperCase() === code.trim().toUpperCase());
    if (found) {
      if (cartSubtotal >= found.minSpend) {
        setAppliedVoucher(found);
        addToast(`Áp dụng mã ${found.code} thành công: -${found.discount.toLocaleString('vi-VN')}₫`);
        return true;
      } else {
        addToast(`Đơn hàng tối thiểu ${found.minSpend.toLocaleString('vi-VN')}₫ để áp dụng mã này`, 'error');
        return false;
      }
    } else {
      addToast('Mã giảm giá không hợp lệ hoặc đã hết lượt sử dụng', 'error');
      return false;
    }
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
    addToast('Đã hủy áp dụng mã giảm giá', 'info');
  };

  // Calculations
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartDiscount = appliedVoucher && cartSubtotal >= appliedVoucher.minSpend ? appliedVoucher.discount : 0;
  const shippingFee = cartSubtotal >= 500000 || cartSubtotal === 0 ? 0 : 35000;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + shippingFee);

  // Compare functions
  const addToCompare = (product) => {
    if (compareList.find((item) => item.id === product.id)) {
      addToast('Sản phẩm đã có trong danh sách so sánh', 'info');
      return;
    }
    if (compareList.length >= 3) {
      addToast('Chỉ có thể so sánh tối đa 3 sản phẩm cùng lúc. Vui lòng xóa bớt.', 'error');
      return;
    }
    setCompareList((prev) => [...prev, product]);
    addToast(`Đã thêm ${product.name} vào danh sách so sánh!`);
  };

  const removeFromCompare = (productId) => {
    setCompareList((prev) => prev.filter((item) => item.id !== productId));
    addToast('Đã xóa khỏi danh sách so sánh', 'info');
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (productId) => {
    return compareList.some((item) => item.id === productId);
  };

  // Wishlist functions
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Đã bỏ thích sản phẩm', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Đã thêm sản phẩm vào danh sách yêu thích!');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  // Navigation helpers
  const navigateTo = (view, productId = null) => {
    if (productId) {
      setActiveProductId(productId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductDetail = (productId) => {
    setActiveProductId(productId);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Checkout & Order creation
  const placeOrder = (orderData) => {
    const newOrderId = `KT-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: newOrderId,
      createdAt: new Date().toLocaleString('vi-VN'),
      status: 'CONFIRMED',
      statusLabel: 'Chờ giao hàng',
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'COD' ? 'Chờ thanh toán khi nhận' : 'Đã thanh toán trực tuyến',
      shippingAddress: `${orderData.address}, ${orderData.district}, ${orderData.city}`,
      recipientName: orderData.fullName,
      recipientPhone: orderData.phone,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shippingFee: shippingFee,
      total: cartTotal,
      vatInfo: orderData.needVat ? orderData.vat : null,
      trackingTimeline: [
        {
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          title: 'Đặt hàng thành công',
          desc: 'Đơn hàng đã được lưu và gửi tới bộ phận kho vận K-Tech'
        },
        {
          time: 'Đang chờ xử lý',
          title: 'Đang chuẩn bị hàng & đóng gói',
          desc: 'Kỹ thuật viên K-Tech kiểm tra tem bảo hành và dán seal chống sốc'
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    setCurrentView('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addToast(`Đặt hàng thành công! Mã đơn: ${newOrderId}`);
  };

  const cancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          if (order.status === 'COMPLETED' || order.status === 'DELIVERING') {
            addToast('Không thể hủy đơn hàng đang giao hoặc đã hoàn tất', 'error');
            return order;
          }
          addToast(`Đã hủy thành công đơn hàng #${orderId}`, 'info');
          return {
            ...order,
            status: 'CANCELLED',
            statusLabel: 'Đã hủy',
            trackingTimeline: [
              ...order.trackingTimeline,
              {
                time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                title: 'Khách hàng yêu cầu hủy đơn',
                desc: 'Đơn hàng đã được hoàn tất thủ tục hủy'
              }
            ]
          };
        }
        return order;
      })
    );
  };

  // Auth functions
  const login = (email, password) => {
    setUser({
      id: 'usr-01',
      name: email.split('@')[0].toUpperCase() || 'Khách Hàng K-Tech',
      email: email,
      phone: '0988 123 456',
      address: 'Số 45, Đường Lê Duẩn, Phường Bến Nghé, Quận 1',
      city: 'TP. Hồ Chí Minh',
      role: email.includes('admin') ? 'ADMIN' : 'CUSTOMER',
      memberSince: 'Tháng 11, 2026',
      loyaltyPoints: 100,
    });
    setIsAuthModalOpen(false);
    addToast('Đăng nhập thành công! Chào mừng bạn quay trở lại.');
  };

  const logout = () => {
    setUser(null);
    addToast('Đã đăng xuất khỏi tài khoản', 'info');
  };

  const register = (data) => {
    setUser({
      id: `usr-${Date.now()}`,
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      address: data.address || 'Chưa cập nhật',
      city: 'TP. Hồ Chí Minh',
      role: 'CUSTOMER',
      memberSince: 'Hôm nay',
      loyaltyPoints: 50,
    });
    setIsAuthModalOpen(false);
    addToast('Đăng ký tài khoản thành công! Tặng bạn 50 điểm K-Point.');
  };

  const updateProfile = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
    addToast('Cập nhật hồ sơ thành công!');
  };

  const activeProduct = PRODUCTS.find((p) => p.id === activeProductId) || PRODUCTS[0];

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        navigateTo,
        activeProduct,
        openProductDetail,
        activeOrder,
        setActiveOrder,
        // catalog filter states
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand,
        priceRange,
        setPriceRange,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        // cart
        cart,
        addToCart,
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
        // compare
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        // wishlist
        wishlist,
        toggleWishlist,
        isInWishlist,
        // auth
        user,
        login,
        logout,
        register,
        updateProfile,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authTab,
        setAuthTab,
        // orders
        orders,
        placeOrder,
        cancelOrder,
        // toasts
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}

