import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

// LocalStorage wrapper
const storage = {
  getItem: async (key) => localStorage.getItem(key),
  setItem: async (key, value) => localStorage.setItem(key, value),
  removeItem: async (key) => localStorage.removeItem(key),
  multiRemove: async (keys) => keys.forEach(k => localStorage.removeItem(k)),
};

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(async (config) => {
  const publicEndpoints = [
    '/health',
    '/user/login',
    '/user/register',
    '/user/verify-login',
    '/user/resend-verification-code',
    '/user/forgot-password',
    '/user/verify-reset-code',
    '/user/reset-password',    
  ];


  if (publicEndpoints.includes(config.url)) {
    return config;
  }

  const token = await storage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
  }
  
  // GET request'leri için dil parametresi ekle
  if (config.method === 'get' || config.method === 'GET') {
    const language = localStorage.getItem('i18nextLng') || 'tr';
    const lang = language === 'en' ? 'en' : 'tr';
    
    if (!config.params) {
      config.params = {};
    }
    config.params.lang = lang;
  }
  
  return config;
});

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await storage.getItem('refreshToken');

        if (!refreshToken) throw new Error('No refresh token found');


        const res = await axios.post(`${API_CONFIG.BASE_URL}/user/refresh-token`, { refreshToken });

        if (res.data.success) {
          const { token: newAccessToken, refreshToken: newRefreshToken } = res.data.data;

          await storage.setItem('userToken', newAccessToken);
          await storage.setItem('refreshToken', newRefreshToken);


          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } else {
          throw new Error(res.data.message || 'Token refresh failed');
        }
      } catch (refreshError) {
        console.error('Refresh error:', refreshError.response?.data || refreshError.message);

        await storage.multiRemove(['userToken', 'refreshToken']);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Helper functions
export const refreshAuthToken = async () => {
  try {
    const refreshToken = await storage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token found');


    const response = await axios.post(`${API_CONFIG.BASE_URL}/user/refresh-token`, { refreshToken });

    if (response.data.success) {
      const { token: newAccessToken, refreshToken: newRefreshToken } = response.data.data;

      await storage.setItem('userToken', newAccessToken);
      await storage.setItem('refreshToken', newRefreshToken);

      return {
        success: true,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } else {
      throw new Error(response.data.message || 'Token refresh failed');
    }
  } catch (error) {
    console.error('❌ Manual token refresh failed:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

export const logout = async () => {
  try {
    await storage.multiRemove(['userToken', 'refreshToken']);
    return true;
  } catch (error) {
    console.error('❌ Logout error:', error);
    return false;
  }
};

export const isAuthenticated = async () => {
  try {
    const accessToken = await storage.getItem('userToken');
    const refreshToken = await storage.getItem('refreshToken');
    return !!(accessToken || refreshToken);
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
};

export default api;
