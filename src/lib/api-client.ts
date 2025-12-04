import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';

import { secureStorage } from './secure-storage';

/**
 * API Client Configuration
 */
const API_TIMEOUT = 30000; // 30 seconds

/**
 * Create API client for specific base URL
 */
export const createApiClient = (baseURL: string) => {
  const apiClient = axios.create({
    baseURL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * Request Interceptor
   * Add auth tokens, logging, etc.
   */
  apiClient.interceptors.request.use(
    async (config) => {
      // You can add auth tokens here
      // const token = getAuthToken();
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }

      const token = await secureStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (__DEV__) {
        console.log('[API Request]', config.method?.toUpperCase(), config.url);
      }

      return config;
    },
    (error: AxiosError) => {
      if (__DEV__) {
        console.error('[API Request Error]', error);
      }
      return Promise.reject(error);
    }
  );

  /**
   * Response Interceptor
   * Handle common errors, logging, etc.
   */
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      if (__DEV__) {
        console.log(
          '[API Response]',
          response.config.method?.toUpperCase(),
          response.config.url,
          response.status
        );
      }
      return response;
    },
    (error: AxiosError) => {
      if (__DEV__) {
        console.error(
          '[API Response Error]',
          error.config?.method?.toUpperCase(),
          error.config?.url,
          error.response?.status,
          error.message
        );
      }

      // Handle common HTTP errors
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // Handle unauthorized - redirect to login
            if (__DEV__) {
              console.warn(
                '[API] Unauthorized - consider redirecting to login'
              );
            }
            break;
          case 403:
            // Handle forbidden
            if (__DEV__) {
              console.warn('[API] Forbidden - insufficient permissions');
            }
            break;
          case 404:
            // Handle not found
            if (__DEV__) {
              console.warn('[API] Resource not found');
            }
            break;
          case 500:
          case 502:
          case 503:
            // Handle server errors
            if (__DEV__) {
              console.error('[API] Server error - consider retry');
            }
            break;
          default:
            break;
        }
      } else if (error.request) {
        // Network error - no response received
        if (__DEV__) {
          console.error('[API] Network error - no response received');
        }
      }

      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default createApiClient;
