/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // This ensures Tailwind doesn't conflict with Material-UI
  important: true,
  corePlugins: {
    preflight: false,
  },
} 