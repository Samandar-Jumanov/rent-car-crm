import axios from 'axios';
import Cookies from 'js-cookie';
import { AUTH_COOKIE_NAME } from '@/lib/hooks/useAuth';

export const API_BASE_URL = 'https://rent-car-95i2.onrender.com';
export const local = "http://localhost:8080"

const apiClient = axios.create({
  baseURL: API_BASE_URL, 
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get(AUTH_COOKIE_NAME);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;


