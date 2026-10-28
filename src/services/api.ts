import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
    const isLoginRequest = error.config?.url?.includes('/auth/login');

    if (error.response?.status === 401 && !isLoginRequest) {
      localStorage.removeItem('@auction:token');
      localStorage.removeItem('@auction:user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);