import axios from 'axios';
import { env } from '@config/env';

const apiClient = axios.create({
  baseURL: env.EXPO_PUBLIC_API_URL,
  timeout: 12000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  async config => {
    // Placeholder per auth token, puoi sostituire con SecureStore/getToken()
    const token = undefined; // await secureStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

apiClient.interceptors.response.use(
  response => response,
  error => {
    // Hook per gestione errori globali
    return Promise.reject(error);
  }
);

export { apiClient };
