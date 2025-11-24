import { QueryClient } from '@tanstack/react-query';
import { captureException } from './sentry';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Retry logic
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Stale time
      staleTime: 1000 * 60 * 5, // 5 minutes

      // Cache time
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)

      // Refetch behavior
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      retry: false,
      onError: (error) => {
        // Send mutation errors to Sentry
        captureException(error);
      },
    },
  },
});

// Global error handler for queries
export const onQueryError = (error: Error) => {
  console.error('Query error:', error);
  captureException(error);
};
