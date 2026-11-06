// API Service for K-TechStore
// Base URL pointing to Spring Boot backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

/**
 * Generic fetch wrapper with JWT authentication header support
 */
async function fetchClient(endpoint, options = {}) {
  const token = localStorage.getItem('ktech_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Lỗi HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // If backend is unavailable, throw to allow fallback
    throw error;
  }
}

export const apiService = {
  // Auth
  login: async (email, password) => {
    return fetchClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  register: async (userData) => {
    return fetchClient('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  getProfile: async () => {
    return fetchClient('/auth/me');
  },
  updateProfile: async (profileData) => {
    return fetchClient('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Products
  getProducts: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchClient(`/products${query ? `?${query}` : ''}`);
  },
  getProductById: async (id) => {
    return fetchClient(`/products/${id}`);
  },
  getCategories: async () => {
    return fetchClient('/categories');
  },
  getBrands: async () => {
    return fetchClient('/brands');
  },

  // Orders
  createOrder: async (orderPayload) => {
    return fetchClient('/orders', {
      method: 'POST',
      body: JSON.stringify(orderPayload),
    });
  },
  getMyOrders: async () => {
    return fetchClient('/orders/my-orders');
  },
  getOrderById: async (orderId) => {
    return fetchClient(`/orders/${orderId}`);
  },
  cancelOrder: async (orderId) => {
    return fetchClient(`/orders/${orderId}/cancel`, {
      method: 'PUT',
    });
  },

  // Vouchers
  validateVoucher: async (code) => {
    return fetchClient(`/vouchers/validate?code=${encodeURIComponent(code)}`);
  },
};

