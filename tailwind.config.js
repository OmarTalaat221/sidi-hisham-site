// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "420px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontFamily: {
        arabicMedium: "arabicMedium, Segoe UI, sans-serif",
        arabicLight: "arabicLight, Segoe UI, sans-serif",
        arabicLightItalic: "arabicLightItalic, Segoe UI, sans-serif",
        arabicBold: "arabicBold, Segoe UI, sans-serif",
        arabicUltraLight: "arabicUltraLight, Segoe UI, sans-serif",
      },
      colors: {
        primary: "#d40017",
        gold: "#FFD62D",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
