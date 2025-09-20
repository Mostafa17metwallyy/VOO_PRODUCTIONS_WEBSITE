/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"],
        heading: ["Cinzel", "serif"],
        accent: ["Italiana", "serif"],
      },
      // 👇 Override the entire blue scale with your brand lime
      colors: {
        blue: {
          50:  "#C6FC35",
          100: "#C6FC35",
          200: "#C6FC35",
          300: "#C6FC35",
          400: "#C6FC35",
          500: "#C6FC35", // commonly used (e.g., bg-blue-500)
          600: "#C6FC35", // hover:bg-blue-600 → same lime
          700: "#C6FC35",
          800: "#C6FC35",
          900: "#C6FC35",
          950: "#C6FC35",
        },
      },
    },
  },
  plugins: [],
};
