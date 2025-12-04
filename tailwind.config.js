/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable class-based dark mode
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // No need to define colors here - using @theme in global.css (Tailwind v4)
      spacing: {
        safe: 'var(--safe-area-inset-left)',
      },
    },
  },
  plugins: [],
};
