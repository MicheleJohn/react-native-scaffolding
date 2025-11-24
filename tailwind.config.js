/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Platform-specific tweaks (if needed)
      spacing: {
        safe: 'var(--safe-area-inset-left)',
      },
    },
  },
  plugins: [],
};
