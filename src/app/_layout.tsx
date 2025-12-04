import { useEffect } from 'react';
import { Platform, StatusBar, Text, View } from 'react-native';

import { useNetworkState } from 'expo-network';
import type { ErrorBoundaryProps } from 'expo-router';
import { Slot, SplashScreen } from 'expo-router';

import { useReactQueryDevTools } from '@dev-plugins/react-query';
import initI18n from '@i18n/index';
import { queryClient } from '@lib/query-client';
import { initSentry } from '@lib/sentry';
import * as Sentry from '@sentry/react-native';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Button } from '@/components/ui';
import { useAppState } from '@/hooks';
import { ThemeProvider, useTheme } from '@/providers';

import '../../global.css';

// Prevent splash auto-hide
void SplashScreen.preventAutoHideAsync();
// Initialize Sentry
initSentry();
// Initialize i18n
const _i18n = initI18n();

function RootLayoutContent() {
  const _network = useNetworkState();
  const { colorScheme } = useTheme();

  // Apply dark class to root element for NativeWind
  useEffect(() => {
    if (Platform.OS === 'web') {
      const root = document.documentElement;
      if (colorScheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [colorScheme]);

  return (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Slot />
      {__DEV__ && Platform.OS === 'web' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  );
}

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
    <View className="flex-1 justify-center items-center">
      <Text>Global Error: {error.message}</Text>
      <Button onPress={retry}>Retry</Button>
    </View>
  );
}

function RootLayout() {
  const appState = useAppState();
  useReactQueryDevTools(queryClient);

  useEffect(() => {
    if (appState === 'active') {
      void SplashScreen.hideAsync();
    }
  }, [appState]);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider>
          <RootLayoutContent />
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default Sentry.wrap(RootLayout);
