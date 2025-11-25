import { env } from '@config/env';
import type { AxiosError } from 'axios';
import axios from 'axios';

import { secureStorage } from './secure-storage';

const apiClient = axios.create({
  baseURL: env.EXPO_PUBLIC_API_URL,
  timeout: 12000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  async (config) => {
    // Placeholder per auth token, puoi sostituire con SecureStore/getToken()
    const token = await secureStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Hook per gestione errori globali
    return Promise.reject(error);
  }
);

export { apiClient };
