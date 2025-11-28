/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary-500)',
        secondary: 'var(--color-secondary-500)',
      },
      spacing: {
        safe: 'var(--safe-area-inset-left)',
      },
    },
  },
  plugins: [],
};
