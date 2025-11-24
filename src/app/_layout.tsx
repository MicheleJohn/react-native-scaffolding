import { useEffect } from 'react';

import { Slot, SplashScreen } from 'expo-router';

import initI18n from '@i18n/index';
import { queryClient } from '@lib/query-client';
import { initSentry } from '@lib/sentry';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import '../../global.css';

// Prevent the splash screen from auto-hiding
void SplashScreen.preventAutoHideAsync();

// Initialize Sentry
initSentry();

// Initialize i18n
const i18n = initI18n();

export default function RootLayout() {
  useEffect(() => {
    // Wait for i18n to be ready
    i18n.on('initialized', () => {
      void SplashScreen.hideAsync();
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider className="h-100">
        <Slot />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
