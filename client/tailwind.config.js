/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        // Global body font
        sans: ['Lato', 'sans-serif'],

        // Headings
        heading: ['Cinzel', 'serif'],

        // Hero/quotes/branding
        accent: ['Italiana', 'serif'],
      },
    },
  },

  plugins: [],
};
