import { useEffect } from 'react';
import { Slot, SplashScreen } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@lib/query-client';
import { initSentry } from '@lib/sentry';
import initI18n from '@i18n/index';
import { ErrorBoundary } from '@components/error-boundary';
import { useNetworkStatus } from '@hooks/use-network-status';
import '../../global.css';

// Prevent splash auto-hide
void SplashScreen.preventAutoHideAsync();
// Initialize Sentry
i nitSentry();
// Initialize i18n
const i18n = initI18n();

function RootLayoutContent() {
  useNetworkStatus();
  return (
    <>
      <Slot />
      {__DEV__ && <ReactQueryDevtools initialIsOpen={false} />}
    </>
  );
}

export default function RootLayout() {
  useEffect(() => {
    i18n.on('initialized', () => {
      void SplashScreen.hideAsync();
    });
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <RootLayoutContent />
        </SafeAreaProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
