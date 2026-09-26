/**
 * ==============================================================================
 * A&H IMPEX - CENTRAL DJANGO REST API CLIENT
 * ==============================================================================
 */

const LIVE_RENDER_API = 'https://ah-implex-website.onrender.com/api';
const LOCAL_DEV_API = 'http://127.0.0.1:8000/api';

const isLocalhost = typeof window !== 'undefined' && (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
);

const API_BASE_URL = import.meta.env.VITE_API_URL || (isLocalhost ? LOCAL_DEV_API : LIVE_RENDER_API);

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  getAuthToken() {
    try {
      return localStorage.getItem('ah_impex_access_token');
    } catch {
      return null;
    }
  }

  setAuthToken(token) {
    if (token) {
      localStorage.setItem('ah_impex_access_token', token);
    } else {
      localStorage.removeItem('ah_impex_access_token');
    }
  }

  getHeaders(isFormData = false) {
    const headers = {};
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const isFormData = options.body instanceof FormData;
    const config = {
      ...options,
      headers: {
        ...this.getHeaders(isFormData),
        ...(options.headers || {})
      }
    };

    try {
      const response = await fetch(url, config);
      
      // If token expired, try to clear and throw
      if (response.status === 401) {
        // Token invalid
      }

      if (response.status === 204) {
        return null;
      }

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const error = new Error(data.detail || data.message || 'API request failed');
        error.status = response.status;
        error.data = data;
        throw error;
      }
      return data;
    } catch (err) {
      console.warn(`[A&H API Warning] Endpoint: ${endpoint}`, err.message);
      throw err;
    }
  }

  // --- AUTHENTICATION APIS ---
  async login(username, password) {
    const data = await this.request('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    if (data.access) {
      this.setAuthToken(data.access);
      if (data.refresh) {
        localStorage.setItem('ah_impex_refresh_token', data.refresh);
      }
      localStorage.setItem('ah_impex_user', JSON.stringify(data.user));
    }
    return data;
  }

  async register(userData) {
    return await this.request('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async getCurrentUser() {
    return await this.request('/auth/me/');
  }

  logout() {
    this.setAuthToken(null);
    localStorage.removeItem('ah_impex_refresh_token');
    localStorage.removeItem('ah_impex_user');
  }

  // --- SUPERADMIN USER MANAGEMENT APIS ---
  async getUsers(params = {}) {
    const query = new URLSearchParams(params).toString();
    return await this.request(`/users/${query ? `?${query}` : ''}`);
  }

  async createAdminUser(userData) {
    return await this.request('/users/', {
      method: 'POST',
      body: JSON.stringify({ ...userData, role: 'ADMIN' })
    });
  }

  async setUserRole(userId, role) {
    return await this.request(`/users/${userId}/set-role/`, {
      method: 'POST',
      body: JSON.stringify({ role })
    });
  }

  async deleteUser(userId) {
    return await this.request(`/users/${userId}/`, {
      method: 'DELETE'
    });
  }

  // --- PRODUCTS APIS ---
  async getProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return await this.request(`/products/${query ? `?${query}` : ''}`);
  }

  async getProduct(id) {
    return await this.request(`/products/${id}/`);
  }

  async createProduct(productData, imageFile = null) {
    if (imageFile) {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        if (key === 'specs' || key === 'features') {
          formData.append(key, JSON.stringify(productData[key]));
        } else if (productData[key] !== undefined && productData[key] !== null) {
          formData.append(key, productData[key]);
        }
      });
      formData.append('featured_image', imageFile);
      return await this.request('/products/', {
        method: 'POST',
        body: formData
      });
    }

    return await this.request('/products/', {
      method: 'POST',
      body: JSON.stringify(productData)
    });
  }

  async updateProduct(id, productData, imageFile = null) {
    if (imageFile) {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        if (key === 'specs' || key === 'features') {
          formData.append(key, JSON.stringify(productData[key]));
        } else if (productData[key] !== undefined && productData[key] !== null) {
          formData.append(key, productData[key]);
        }
      });
      formData.append('featured_image', imageFile);
      return await this.request(`/products/${id}/`, {
        method: 'PATCH',
        body: formData
      });
    }

    return await this.request(`/products/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(productData)
    });
  }

  async deleteProduct(id) {
    return await this.request(`/products/${id}/`, {
      method: 'DELETE'
    });
  }

  async uploadProductGalleryImage(productId, imageFile, altText = '') {
    const formData = new FormData();
    formData.append('image', imageFile);
    if (altText) formData.append('alt_text', altText);
    return await this.request(`/products/${productId}/upload-image/`, {
      method: 'POST',
      body: formData
    });
  }

  // --- CATEGORIES APIS ---
  async getCategories() {
    return await this.request('/categories/');
  }

  async createCategory(catData) {
    return await this.request('/categories/', {
      method: 'POST',
      body: JSON.stringify(catData)
    });
  }

  async updateCategory(slug, catData) {
    return await this.request(`/categories/${slug}/`, {
      method: 'PATCH',
      body: JSON.stringify(catData)
    });
  }

  async deleteCategory(slug) {
    return await this.request(`/categories/${slug}/`, {
      method: 'DELETE'
    });
  }

  // --- INQUIRIES & RFQ APIS (Triggers Email Sending) ---
  async getInquiries() {
    return await this.request('/inquiries/');
  }

  async submitInquiry(inquiryData) {
    try {
      return await this.request('/inquiries/', {
        method: 'POST',
        body: JSON.stringify(inquiryData)
      });
    } catch (err) {
      console.warn("[Submit Inquiry Request Failed, trying clean fallback]", err.message);
      const res = await fetch(`${this.baseUrl}/inquiries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData)
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || `Inquiry submission failed (${res.status})`);
      }
      return await res.json();
    }
  }

  async updateInquiryStatus(id, status, internalNotes = '') {
    return await this.request(`/inquiries/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify({ status, internal_notes: internalNotes })
    });
  }

  async deleteInquiry(id) {
    return await this.request(`/inquiries/${id}/`, {
      method: 'DELETE'
    });
  }

  // --- COMPANY CMS & DASHBOARD APIS ---
  async getCompanyInfo() {
    return await this.request('/company/');
  }

  async updateCompanyInfo(companyData) {
    return await this.request('/company/', {
      method: 'PATCH',
      body: JSON.stringify(companyData)
    });
  }

  async getDashboardSummary() {
    return await this.request('/dashboard/summary/');
  }
}

export const api = new ApiClient();
export default api;
