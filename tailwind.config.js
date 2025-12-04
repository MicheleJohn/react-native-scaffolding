/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable class-based dark mode (required for NativeWind v5)
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // All colors defined as CSS variables in global.css
      // This is the NativeWind v5 recommended approach
      colors: {
        // Semantic colors (auto-adapt via CSS variables in global.css)
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        card: 'var(--color-card)',
        overlay: 'var(--color-overlay)',

        // Text colors
        'primary-text': 'var(--color-primary-text)',
        'secondary-text': 'var(--color-secondary-text)',
        'tertiary-text': 'var(--color-tertiary-text)',
        'inverse-text': 'var(--color-inverse-text)',
        link: 'var(--color-link)',
        disabled: 'var(--color-disabled)',

        // Brand colors
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        'mid-blue': 'var(--color-mid-blue)',
        danger: 'var(--color-danger)',

        // Semantic status colors
        success: 'var(--color-success)',
        'success-light': 'var(--color-success-light)',
        error: 'var(--color-error)',
        'error-light': 'var(--color-error-light)',
        warning: 'var(--color-warning)',
        'warning-light': 'var(--color-warning-light)',
        info: 'var(--color-info)',
        'info-light': 'var(--color-info-light)',

        // Border colors
        border: 'var(--color-border)',
        'border-light': 'var(--color-border-light)',
        'border-dark': 'var(--color-border-dark)',
        'border-focus': 'var(--color-border-focus)',
        divider: 'var(--color-divider)',

        // Input colors
        'input-bg': 'var(--color-input-bg)',
        'input-border': 'var(--color-input-border)',
        'input-text': 'var(--color-input-text)',
        'input-placeholder': 'var(--color-input-placeholder)',
        'input-disabled': 'var(--color-input-disabled)',

        // Button colors
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
