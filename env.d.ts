/* eslint-disable @typescript-eslint/consistent-type-definitions */
/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly EXPO_PUBLIC_API_URL?: string;
    readonly EXPO_PUBLIC_ENV?: 'development' | 'production' | 'staging';
    readonly EXPO_PUBLIC_SENTRY_DSN?: string;
  }
}
