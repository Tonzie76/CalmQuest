/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { 
          50: "#eef7f0", 100: "#d5ecda", 200: "#aed9b8", 300: "#7bc292", 
          400: "#4ea86e", 500: "#2d8a4e", 600: "#1f6e3d", 700: "#1a5832", 
          800: "#17472a", 900: "#133a23", 950: "#0a2013" 
        },
        secondary: { 
          50: "#eef4ff", 100: "#d9e6ff", 200: "#bcd3ff", 300: "#8eb6ff", 
          400: "#5990ff", 500: "#336bff", 600: "#1a49e8", 700: "#1337c4", 
          800: "#1630a0", 900: "#182d7e", 950: "#111d4d" 
        },
        accent: { 
          50: "#fcf4e8", 100: "#f8e5c7", 200: "#f1ca8c", 300: "#e9ab4f", 
          400: "#e39223", 500: "#d47918", 600: "#bb5e12", 700: "#9b4413", 
          800: "#7e3617", 900: "#692e17", 950: "#3c1609" 
        },
        "calm-mist": "#d6e8e8",
        "calm-foam": "#b8d4d4",
        "calm-sage": "#9caea9",
        "calm-stone": "#8b8174",
        "calm-sand": "#d4c9b8",
        "calm-dawn": "#f5ebe0",
        "calm-dusk": "#7b8b8f",
        "calm-sky": "#c9dbe9",
        "calm-ocean": "#7a9eb3",
        "calm-forest": "#5c7a6a"
      },
      fontFamily: {
        heading: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "SF Pro Text", "system-ui", "sans-serif"]
      },
      borderRadius: {
        "4xl": "2rem"
      },
      boxShadow: {
        glow: "0 0 20px rgba(45, 138, 78, 0.15)",
        "glow-warm": "0 0 20px rgba(233, 171, 79, 0.15)"
      }
    },
  },
  plugins: [],
};
