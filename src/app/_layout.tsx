import '../global.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import initI18n from '@i18n';
import { queryClient } from '@lib/query-client';
import { initSentry } from '@lib/sentry';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Initialize Sentry
initSentry();

// Initialize i18n
const i18n = initI18n();

export default function RootLayout() {
  useEffect(() => {
    // Wait for i18n to be ready
    i18n.on('initialized', () => {
      SplashScreen.hideAsync();
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
