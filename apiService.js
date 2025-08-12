const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.csrfToken = null;
    this.sessionId = null;
    this.initializeCSRF();
  }

  async initializeCSRF() {
    try {
      const response = await fetch(`${this.baseURL}/csrf-token`);
      if (response.ok) {
        const data = await response.json();
        this.csrfToken = data.csrfToken;
        this.sessionId = data.sessionId;
      }
    } catch (error) {
      console.warn('Failed to initialize CSRF token:', error);
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = sessionStorage.getItem('token');

    // Ensure CSRF token is available for state-changing requests
    if (!this.csrfToken && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(options.method)) {
      await this.initializeCSRF();
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(this.csrfToken && { 'X-CSRF-Token': this.csrfToken }),
        ...(this.sessionId && { 'X-Session-ID': this.sessionId }),
        ...options.headers,
      },
      ...options,
    };

    // Debug log for outgoing API requests
    console.log('[API REQUEST]', url, config);

    try {
      const response = await fetch(url, config);

      // Handle response based on content type
      let data;
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = { message: await response.text() };
      }

      if (!response.ok) {
        // Handle CSRF token refresh
        if (response.status === 403 && data.message?.includes('CSRF')) {
          await this.initializeCSRF();
          throw new Error('CSRF token expired. Please try again.');
        }
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error, url, config);
      throw error;
    }
  }

  // Auth methods
  async register(userData) {
    // Registration should not set token in localStorage
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return response;
  }

  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.token) {
      sessionStorage.setItem('token', response.token);
    }

    return response;
  }

  async logout() {
    sessionStorage.removeItem('token');
    this.csrfToken = null;
    this.sessionId = null;
    return { success: true };
  }

  async getProfile() {
    return this.request('/auth/profile');
  }

  async updateProfile(userData) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Product methods
  async getProducts(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null) {
          queryParams.append(key, filters[key]);
        }
      });
      const queryString = queryParams.toString();
      const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
      return await this.request(endpoint);
    } catch (error) {
      return { success: false, message: error.message || 'Failed to fetch products' };
    }
  }

  async getProductById(id) {
    return this.request(`/products/${id}`);
  }

  async getProductsByCategory(category, filters = {}) {
    const queryParams = new URLSearchParams();

    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        queryParams.append(key, filters[key]);
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/products/category/${category}${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint);
  }

  async searchProducts(query, filters = {}) {
    const queryParams = new URLSearchParams({ q: query });

    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        queryParams.append(key, filters[key]);
      }
    });

    return this.request(`/products/search?${queryParams.toString()}`);
  }

  // Cart methods
  async getCart() {
    return this.request('/cart');
  }

  async addToCart(productData) {
    return this.request('/cart/add', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateCartItem(itemId, quantity) {
    return this.request(`/cart/item/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(itemId) {
    return this.request(`/cart/item/${itemId}`, {
      method: 'DELETE',
    });
  }

  async clearCart() {
    return this.request('/cart/clear', {
      method: 'DELETE',
    });
  }

  // Order methods
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrders(page = 1, limit = 10) {
    return this.request(`/orders?page=${page}&limit=${limit}`);
  }

  async getOrderById(id) {
    return this.request(`/orders/${id}`);
  }

  async updateOrderStatus(id, status) {
    return this.request(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }
}

const
  apiService = new ApiService();
export default apiService;