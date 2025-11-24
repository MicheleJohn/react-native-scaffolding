import Constants from 'expo-constants';
import { z } from 'zod';

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url().default('https://placeholder-api.io'),
  EXPO_PUBLIC_ENV: z.enum(['development', 'production', 'staging']).default('development'),
  EXPO_PUBLIC_SENTRY_DSN: z.string().optional().default(''),
});

const envVars = {
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL || Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL || 'https://placeholder-api.io',
  EXPO_PUBLIC_ENV: process.env.EXPO_PUBLIC_ENV || Constants.expoConfig?.extra?.EXPO_PUBLIC_ENV || 'development',
  EXPO_PUBLIC_SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN || Constants.expoConfig?.extra?.EXPO_PUBLIC_SENTRY_DSN || '',
};

const parsed = envSchema.safeParse(envVars);
if (!parsed.success) {
  throw new Error(`Invalid environment variables: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`);
}

export const env = parsed.data;
