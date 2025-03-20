/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "vertical-flip": "flipY 4s linear infinite", // 4s for a full flip
        fadeIn: "fadeIn 0.3s ease-in-out",
      },
      keyframes: {
        flipY: {
          "0%": { transform: "rotateY(0deg)" },
          "50%": { transform: "rotateY(180deg)" }, // Midpoint flip
          "100%": { transform: "rotateY(360deg)" }, // Full rotation
        },
        fadeIn: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee", "emerald"], // Choose themes you want to use
    darkTheme: "dark", // Set default dark mode theme
  },
}
