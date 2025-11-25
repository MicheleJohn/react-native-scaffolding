import { useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { Slot, SplashScreen } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { useNetworkState } from 'expo-network';
import { useAppState } from '@/hooks/use-app-state';
import { queryClient } from '@lib/query-client';
import { initSentry } from '@lib/sentry';
import * as Sentry from '@sentry/react-native';
import initI18n from '@i18n/index';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import type { ErrorBoundaryProps } from 'expo-router';
import { Button } from '@/components/ui';

import '../../global.css';

// Prevent splash auto-hide (SAFE: only call once)
SplashScreen.preventAutoHideAsync();
// Initialize Sentry
initSentry();
// Initialize i18n
const _i18n = initI18n();

function RootLayoutContent() {
  const _network = useNetworkState();
  return (
    <>
      <Slot />
      {__DEV__ && Platform.OS === 'web' && (
        <></>
      )}
    </>
  );
}

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  useEffect(() => {
    if (Boolean(Sentry.getClient()) && error) {
      Sentry.captureException(error, {
        tags: {
          component: 'RootLayout',
          type: 'error_boundary',
        },
        contexts: {
          error_boundary: {
            step: 'RootLayout error',
            error_message:
              error instanceof Error ? error.message : String(error),
          },
        },
        level: 'fatal',
      });
    }
  }, [error]);
  return (
    <SafeAreaProvider>
      <Button onPress={retry}>Retry</Button>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  const appState = useAppState();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function prepare() {
      // simuliamo una async init (es: i18n, auth, resources...)
      await Promise.resolve();
      if (mounted) setAppIsReady(true);
    }
    prepare();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
    // Bonus: nascondi splash se torni in foreground
    if (appState === 'active') {
      SplashScreen.hideAsync();
    }
  }, [appIsReady, appState]);

  if (!appIsReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <RootLayoutContent />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
