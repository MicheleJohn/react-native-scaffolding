import { tokens } from './tokens';

/**
 * Theme Definitions
 *
 * Using NativeWind's VariableContextProvider approach.
 * Each theme is an object with CSS variable names and values.
 */

export const lightTheme = {
  // Background colors
  '--color-background': '#ffffff',
  '--color-surface': tokens.colors.neutral['50'],
  '--color-card': '#ffffff',
  '--color-overlay': 'rgba(0, 0, 0, 0.5)',

  // Text colors
  '--color-primary-text': tokens.colors.neutral['900'],
  '--color-secondary-text': tokens.colors.neutral['700'],
  '--color-tertiary-text': tokens.colors.neutral['400'],
  '--color-inverse-text': '#ffffff',
  '--color-link': tokens.colors.primary.cyan,
  '--color-disabled': tokens.colors.neutral['400'],

  // Semantic colors
  '--color-success': tokens.colors.semantic.success,
  '--color-success-light': tokens.colors.semantic.successLight,
  '--color-error': tokens.colors.semantic.error,
  '--color-error-light': tokens.colors.semantic.errorLight,
  '--color-warning': tokens.colors.semantic.warning,
  '--color-warning-light': tokens.colors.semantic.warningLight,
  '--color-info': tokens.colors.primary.cyan,
  '--color-info-light': tokens.colors.secondary.lightBlue,

  // Border colors
  '--color-border': tokens.colors.neutral['200'],
  '--color-border-light': tokens.colors.neutral['50'],
  '--color-border-dark': tokens.colors.neutral['700'],
  '--color-border-focus': tokens.colors.primary.cyan,
  '--color-divider': tokens.colors.neutral['200'],

  // Input colors
  '--color-input-bg': '#ffffff',
  '--color-input-border': tokens.colors.neutral['300'],
  '--color-input-text': tokens.colors.neutral['900'],
  '--color-input-placeholder': tokens.colors.neutral['400'],
  '--color-input-disabled': tokens.colors.neutral['100'],

  // Button colors
  '--color-button-primary-bg': tokens.colors.primary.cyan,
  '--color-button-primary-text': '#ffffff',
  '--color-button-secondary-bg': tokens.colors.neutral['50'],
  '--color-button-secondary-text': tokens.colors.neutral['700'],
  '--color-button-ghost-text': tokens.colors.primary.cyan,

  // Shadows
  '--color-shadow': 'rgba(0, 0, 0, 0.1)',
  '--color-shadow-lg': 'rgba(0, 0, 0, 0.2)',
} as const;

export const darkTheme = {
  // Background colors
  '--color-background': tokens.colors.neutral['900'],
  '--color-surface': tokens.colors.neutral['800'],
  '--color-card': tokens.colors.neutral['800'],
  '--color-overlay': 'rgba(0, 0, 0, 0.7)',

  // Text colors
  '--color-primary-text': tokens.colors.neutral['100'],
  '--color-secondary-text': tokens.colors.neutral['300'],
  '--color-tertiary-text': tokens.colors.neutral['400'],
  '--color-inverse-text': tokens.colors.neutral['900'],
  '--color-link': '#60a5fa',
  '--color-disabled': tokens.colors.neutral['500'],

  // Semantic colors
  '--color-success': tokens.colors.semantic.successDark,
  '--color-success-light': '#3f5437',
  '--color-error': tokens.colors.semantic.errorDark,
  '--color-error-light': '#7f1d1d',
  '--color-warning': tokens.colors.semantic.warningDark,
  '--color-warning-light': '#78350f',
  '--color-info': '#3b82f6',
  '--color-info-light': '#1e3a8a',

  // Border colors
  '--color-border': tokens.colors.neutral['600'],
  '--color-border-light': tokens.colors.neutral['800'],
  '--color-border-dark': tokens.colors.neutral['300'],
  '--color-border-focus': '#60a5fa',
  '--color-divider': tokens.colors.neutral['600'],

  // Input colors
  '--color-input-bg': tokens.colors.neutral['800'],
  '--color-input-border': tokens.colors.neutral['600'],
  '--color-input-text': tokens.colors.neutral['100'],
  '--color-input-placeholder': tokens.colors.neutral['500'],
  '--color-input-disabled': tokens.colors.neutral['900'],

  // Button colors
  '--color-button-primary-bg': '#3b82f6',
  '--color-button-primary-text': '#ffffff',
  '--color-button-secondary-bg': tokens.colors.neutral['600'],
  '--color-button-secondary-text': tokens.colors.neutral['100'],
  '--color-button-ghost-text': '#60a5fa',

  // Shadows
  '--color-shadow': 'rgba(0, 0, 0, 0.3)',
  '--color-shadow-lg': 'rgba(0, 0, 0, 0.5)',
} as const;

export type Theme = typeof lightTheme;
