import axios from 'axios';

// API Base URL Configuration
// In production, API will be served from same domain
// In development, use localhost backend
const BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : (process.env.REACT_APP_API_URL || 'http://localhost:5000/api');

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Applications API
export const applicationsAPI = {
  // Get all applications with optional filters
  getAll: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.append(key, value);
      }
    });
    return api.get(`/applications?${params.toString()}`);
  },

  // Get single application
  getById: (id) => api.get(`/applications/${id}`),

  // Create new application
  create: (data) => api.post('/applications', data),

  // Update application
  update: (id, data) => api.put(`/applications/${id}`, data),

  // Update application status (for drag and drop)
  updateStatus: (id, status) => api.patch(`/applications/${id}/status`, { status }),

  // Delete application
  delete: (id) => api.delete(`/applications/${id}`)
};

// Analytics API
export const analyticsAPI = {
  // Get all analytics data
  getAll: () => api.get('/analytics'),

  // Get analytics for specific period
  getPeriod: (period) => api.get(`/analytics/period/${period}`)
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;
