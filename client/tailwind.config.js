/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eefdf5",
          100: "#d7f9e5",
          200: "#b2f0cd",
          300: "#7ee2ac",
          400: "#43cc85",
          500: "#1fb46b",
          600: "#128f56",
          700: "#0f7247",
          800: "#0f5b3b",
          900: "#0d4b32",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        popIn: {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-out",
        popIn: "popIn 0.15s ease-out",
      },
    },
  },
  plugins: [],
};
