import axios from 'axios';
import { useAuth } from '../store/useAuth';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-storage');
  if (token) {
    const parsed = JSON.parse(token);
    config.headers.Authorization = `Bearer ${parsed.state.token}`;
  }else{
    delete config.headers.Authorization;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error('Cuenta creada con éxito');
      useAuth.getState().logout();
      window.location.href = '/login';
    }
    if (error.response?.status === 403) {
      toast.error('Sesión expirada');
      useAuth.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
