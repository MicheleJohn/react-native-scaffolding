import { useNetworkState } from 'expo-network';
import { Slot, SplashScreen } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@lib/query-client';
import { initSentry } from '@lib/sentry';
import initI18n from '@i18n/index';
import '../../global.css';

// Prevent splash auto-hide
void SplashScreen.preventAutoHideAsync();
// Initialize Sentry
initSentry();
// Initialize i18n
const i18n = initI18n();

function RootLayoutContent() {
  const network = useNetworkState();
  // Esempio di warning connessione
  // if (!network.isConnected) {/* render warning banner */}
  return (
    <>
      <Slot />
      {__DEV__ && <ReactQueryDevtools initialIsOpen={false} />}
    </>
  );
}

export default function RootLayout() {
  // Expo Router error boundary già attivo, non serve custom
  // Puoi gestire errori route-specific nei file [...]error.tsx
  // Docs: https://docs.expo.dev/router/error-handling/
  //
  // Puoi comunque esportare l'ErrorBoundary ufficiale se vuoi
  // export { ErrorBoundary } from 'expo-router';

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <RootLayoutContent />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
