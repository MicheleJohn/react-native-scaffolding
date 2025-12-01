/**
 * Design System Colors
 * Based on Figma design tokens
 */

export const colors = {
  // Primary colors
  primary: {
    cyan: '#009FE3',
    blue: '#28529C',
    teal: '#0074A5',
    red: '#CC1A1A',
  },

  // Neutral colors
  neutral: {
    white: '#FFFFFF',
    gray50: '#F2F4F7',
    gray400: '#98A2B3',
    gray700: '#344054',
    gray800: '#1D2939',
    gray900: '#0F172A',
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
    error: '#CC1A1A',
    warning: '#F2C94C',
    info: '#009FE3',
  },

  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F2F4F7',
    tertiary: '#E6F4FA',
  },

  // Text colors
  text: {
    primary: '#0F172A',
    secondary: '#344054',
    tertiary: '#98A2B3',
    inverse: '#FFFFFF',
  },

  // Border colors
  border: {
    light: '#F2F4F7',
    default: '#98A2B3',
    dark: '#344054',
  },
} as const;

export type ColorPalette = typeof colors;

// Helper function to get color value
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let value: any = colors;
  
  for (const key of keys) {
    value = value[key];
    if (!value) return '#000000'; // fallback
  }
  
  return value;
};
