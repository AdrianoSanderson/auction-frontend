import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

// Interceptor para injetar o token JWT automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@auction:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar respostas e erros de autorização
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('@auction:token');
      localStorage.removeItem('@auction:user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);