import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';

const SENTRY_DSN = process.env.EXPO_PUBLIC_SENTRY_DSN;
const ENV = process.env.EXPO_PUBLIC_ENV || 'development';
const VERSION = Constants.expoConfig?.version || '1.0.0';

const isProduction = ENV === 'production';

export const initSentry = () => {
  if (!SENTRY_DSN) {
    console.warn('Sentry DSN not configured. Skipping Sentry initialization.');
    return;
  }

  const integrations: Parameters<typeof Sentry.init>[0]['integrations'] = [
    // React Native specific integrations
    Sentry.reactNativeTracingIntegration({
      routingInstrumentation:
        new Sentry.ReactNavigationInstrumentation(),
      enableNativeFramesTracking: true,
    }),

    // Network tracking
    Sentry.httpClientIntegration({
      failedRequestStatusCodes: [400, 417, [500, 599]],
    }),
  ];

  // Add replay integration only in production
  if (isProduction) {
    integrations.push(
      Sentry.mobileReplayIntegration({
        maskAllText: false,
        maskAllImages: false,
        maskAllVectors: false,
      })
    );
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    debug: !isProduction,
    environment: ENV,
    release: `${ENV}@${VERSION}`,
    dist: VERSION,

    // Performance Monitoring
    tracesSampleRate: isProduction ? 0.3 : 1.0,
    tracePropagationTargets: ['localhost', /^https:\/\/api\.yourapp\.com/],

    // Session Replay
    replaysSessionSampleRate: isProduction ? 0.25 : 0,
    replaysOnErrorSampleRate: isProduction ? 1.0 : 0,

    // Enable automatic breadcrumbs
    enableAutoSessionTracking: true,
    sessionTrackingIntervalMillis: 30000,

    integrations,

    // Capture console logs
    beforeBreadcrumb(breadcrumb, hint) {
      if (breadcrumb.category === 'console') {
        return breadcrumb;
      }
      return breadcrumb;
    },

    beforeSend(event, hint) {
      // Filter out development errors if needed
      if (!isProduction && event.exception) {
        console.log('Sentry Event:', event);
      }
      return event;
    },
  });
};

// Helper functions for manual error tracking
export const captureException = Sentry.captureException;
export const captureMessage = Sentry.captureMessage;
export const setUser = Sentry.setUser;
export const addBreadcrumb = Sentry.addBreadcrumb;

// Create a scope for additional context
export const configureScope = (callback: (scope: Sentry.Scope) => void) => {
  Sentry.configureScope(callback);
};

// Wrap async operations with Sentry context
export const withSentry = <T extends (...args: any[]) => any>(
  fn: T
): ((...args: Parameters<T>) => ReturnType<T>) => {
  return (...args: Parameters<T>): ReturnType<T> => {
    try {
      const result = fn(...args);
      if (result instanceof Promise) {
        return result.catch((error: Error) => {
          captureException(error);
          throw error;
        }) as ReturnType<T>;
      }
      return result;
    } catch (error) {
      captureException(error);
      throw error;
    }
  };
};
