import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 950: "#071a33", 900: "#0b2545", 800: "#13315c", 700: "#1d4373" },
        teal: { 400: "#3cc0c9", 500: "#12a3ae", 600: "#0b7c86", 700: "#086169" },
        ivory: "#fbf8f1",
        mint: { 50: "#f1faf8", 100: "#e6f6f3", 200: "#cdeee8" },
        ash: { 100: "#f2f4f6", 200: "#e3e7eb", 500: "#667085", 700: "#3d4651" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(11,37,69,.18)",
        lift: "0 18px 40px -16px rgba(11,37,69,.28)",
      },
      borderRadius: { xl2: "1.25rem" },
    },
  },
  plugins: [],
};
export default config;
