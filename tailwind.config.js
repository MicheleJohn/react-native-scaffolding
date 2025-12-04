const { tokens } = require('./src/theme/tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable dark: prefix support
  darkMode: 'class',
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

        // Semantic colors using CSS variables (auto-adapt with theme)
        // IMPORTANT: Wrap with rgb() for NativeWind v5 compatibility
        background: 'rgb(var(--color-background))',
        surface: 'rgb(var(--color-surface))',
        card: 'rgb(var(--color-card))',
        overlay: 'var(--color-overlay)', // rgba already

        'primary-text': 'rgb(var(--color-primary-text))',
        'secondary-text': 'rgb(var(--color-secondary-text))',
        'tertiary-text': 'rgb(var(--color-tertiary-text))',
        'inverse-text': 'rgb(var(--color-inverse-text))',
        link: 'rgb(var(--color-link))',
        disabled: 'rgb(var(--color-disabled))',

        success: 'rgb(var(--color-success))',
        'success-light': 'rgb(var(--color-success-light))',
        error: 'rgb(var(--color-error))',
        'error-light': 'rgb(var(--color-error-light))',
        warning: 'rgb(var(--color-warning))',
        'warning-light': 'rgb(var(--color-warning-light))',
        info: 'rgb(var(--color-info))',
        'info-light': 'rgb(var(--color-info-light))',

        border: 'rgb(var(--color-border))',
        'border-light': 'rgb(var(--color-border-light))',
        'border-dark': 'rgb(var(--color-border-dark))',
        'border-focus': 'rgb(var(--color-border-focus))',
        divider: 'rgb(var(--color-divider))',

        'input-bg': 'rgb(var(--color-input-bg))',
        'input-border': 'rgb(var(--color-input-border))',
        'input-text': 'rgb(var(--color-input-text))',
        'input-placeholder': 'rgb(var(--color-input-placeholder))',
        'input-disabled': 'rgb(var(--color-input-disabled))',

        'button-primary-bg': 'rgb(var(--color-button-primary-bg))',
        'button-primary-text': 'rgb(var(--color-button-primary-text))',
        'button-secondary-bg': 'rgb(var(--color-button-secondary-bg))',
        'button-secondary-text': 'rgb(var(--color-button-secondary-text))',
        'button-ghost-text': 'rgb(var(--color-button-ghost-text))',
      },
      spacing: {
        safe: 'var(--safe-area-inset-left)',
      },
    },
  },
  plugins: [],
};
