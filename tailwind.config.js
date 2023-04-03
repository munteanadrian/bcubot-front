/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        orangeGradient: "url('../public/bg.svg')",
      },
      fontFamily: {
        inter: "Inter",
      },
    },
  },
  plugins: [],
};
