/**
 * Design System Theme Tokens
 *
 * These tokens are shared between:
 * - tailwind.config.js (for Tailwind classes)
 * - Your code (for runtime access)
 *
 * Following NativeWind v5 approach:
 * https://www.nativewind.dev/v5/guides/themes#retrieving-theme-values
 */

export const tokens = {
  colors: {
    // Primary brand colors
    primary: {
      cyan: '#009FE3',
      blue: '#28529C',
      teal: '#0074A5',
      red: '#CC1A1A',
    },

    // Neutral colors
    neutral: {
      white: '#FFFFFF',
      50: '#F2F4F7',
      100: '#F9FAFB',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#98A2B3',
      500: '#6B7280',
      600: '#4B5563',
      700: '#344054',
      800: '#1D2939',
      900: '#0F172A',
    },

    // Secondary colors
    secondary: {
      lightBlue: '#E6F4FA',
      green: '#A6C48A',
      yellow: '#F2C94C',
      darkNavy: '#0F172A',
    },

    // Semantic colors
    semantic: {
      success: '#A6C48A',
      successLight: '#D4E4C4',
      successDark: '#86B967',
      error: '#CC1A1A',
      errorLight: '#FECACA',
      errorDark: '#EF4444',
      warning: '#F2C94C',
      warningLight: '#FEF3C7',
      warningDark: '#F59E0B',
      info: '#009FE3',
      infoLight: '#DBEAFE',
      infoDark: '#3B82F6',
    },
  },
} as const;

export type Tokens = typeof tokens;

/**
 * Helper function to get color value at runtime
 * Usage: getTokenColor('primary.cyan') => '#009FE3'
 */
export const getTokenColor = (path: string): string => {
  const keys = path.split('.');
  let value: any = tokens.colors;

  for (const key of keys) {
    value = value[key];
    if (!value) return '#000000'; // fallback
  }

  return value as string;
};
