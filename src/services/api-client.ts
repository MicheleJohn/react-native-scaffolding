import Constants from 'expo-constants';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://api.example.com';

export type ApiError = Error & {
  message: string;
  status: number;
  code?: string;
};

export class ApiClient {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor() {
    this.baseUrl = API_URL;
    this.headers = {
      'Content-Type': 'application/json',
      'X-App-Version': Constants.expoConfig?.version ?? '1.0.0',
    };
  }

  setAuthToken(token: string | null) {
    if (token) {
      this.headers = {
        // eslint-disable-next-line @typescript-eslint/no-misused-spread
        ...this.headers,
        Authorization: `Bearer ${token}`,
      };
    } else {
      const { Authorization, ...rest } = this.headers as Record<string, string>;
      this.headers = rest;
    }
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          // eslint-disable-next-line @typescript-eslint/no-misused-spread
          ...this.headers,
          // eslint-disable-next-line @typescript-eslint/no-misused-spread
          ...options?.headers,
        },
      });

      if (!response.ok) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const errorData: Record<string, string> = await response
          .json()
          .catch(() => ({
            message: 'An error occurred',
            code: 'Internal Server Error',
          }));
        const error: ApiError = {
          message: errorData.message,
          status: response.status,
          code: errorData.code,
          name: errorData.message,
        };
        throw error;
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return {} as T;
      }

      return (await response.json()) as T;
    } catch (error) {
      if ((error as ApiError).status) {
        throw error;
      }
      // Network error
      throw {
        message: 'Network error. Please check your connection.',
        status: 0,
      } as ApiError;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const queryString = params
      ? '?' + new URLSearchParams(params).toString()
      : '';
    return this.request<T>(`${endpoint}${queryString}`, {
      method: 'GET',
    });
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async patch<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestInit
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...options,
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      ...options,
    });
  }
}

export const apiClient = new ApiClient();
