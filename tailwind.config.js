const { tokens } = require('./src/theme/tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Still needed for dark: prefix support
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Static brand colors from tokens
      colors: {
        // Primary brand colors (don't change with theme)
        primary: tokens.colors.primary.cyan,
        'primary-dark': tokens.colors.primary.blue,
        'mid-blue': tokens.colors.primary.teal,
        danger: tokens.colors.primary.red,

        // Neutral palette (don't change with theme)
        neutral: tokens.colors.neutral,

        // Secondary colors (don't change with theme)
        'secondary-light-blue': tokens.colors.secondary.lightBlue,
        'secondary-green': tokens.colors.secondary.green,
        'secondary-yellow': tokens.colors.secondary.yellow,
        'secondary-navy': tokens.colors.secondary.darkNavy,

        // Semantic colors using CSS variables (injected by VariableContextProvider)
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        card: 'var(--color-card)',
        overlay: 'var(--color-overlay)',

        'primary-text': 'var(--color-primary-text)',
        'secondary-text': 'var(--color-secondary-text)',
        'tertiary-text': 'var(--color-tertiary-text)',
        'inverse-text': 'var(--color-inverse-text)',
        link: 'var(--color-link)',
        disabled: 'var(--color-disabled)',

        success: 'var(--color-success)',
        'success-light': 'var(--color-success-light)',
        error: 'var(--color-error)',
        'error-light': 'var(--color-error-light)',
        warning: 'var(--color-warning)',
        'warning-light': 'var(--color-warning-light)',
        info: 'var(--color-info)',
        'info-light': 'var(--color-info-light)',

        border: 'var(--color-border)',
        'border-light': 'var(--color-border-light)',
        'border-dark': 'var(--color-border-dark)',
        'border-focus': 'var(--color-border-focus)',
        divider: 'var(--color-divider)',

        'input-bg': 'var(--color-input-bg)',
        'input-border': 'var(--color-input-border)',
        'input-text': 'var(--color-input-text)',
        'input-placeholder': 'var(--color-input-placeholder)',
        'input-disabled': 'var(--color-input-disabled)',

        'button-primary-bg': 'var(--color-button-primary-bg)',
        'button-primary-text': 'var(--color-button-primary-text)',
        'button-secondary-bg': 'var(--color-button-secondary-bg)',
        'button-secondary-text': 'var(--color-button-secondary-text)',
        'button-ghost-text': 'var(--color-button-ghost-text)',
      },
      spacing: {
        safe: 'var(--safe-area-inset-left)',
      },
    },
  },
  plugins: [],
};
