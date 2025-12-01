/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          cyan: '#009FE3',
          blue: '#28529C',
          teal: '#0074A5',
          red: '#CC1A1A',
          DEFAULT: '#009FE3', // cyan as default
        },
        // Neutral colors
        neutral: {
          50: '#F2F4F7',
          400: '#98A2B3',
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
          DEFAULT: '#E6F4FA',
        },
        // Semantic colors
        success: '#A6C48A',
        error: '#CC1A1A',
        warning: '#F2C94C',
        info: '#009FE3',
        // Background
        background: {
          primary: '#FFFFFF',
          secondary: '#F2F4F7',
          tertiary: '#E6F4FA',
        },
        // Text
        text: {
          primary: '#0F172A',
          secondary: '#344054',
          tertiary: '#98A2B3',
          inverse: '#FFFFFF',
        },
        // Border
        border: {
          light: '#F2F4F7',
          DEFAULT: '#98A2B3',
          dark: '#344054',
        },
      },
      spacing: {
        safe: 'var(--safe-area-inset-left)',
      },
      fontFamily: {
        // Add custom fonts here if needed
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
