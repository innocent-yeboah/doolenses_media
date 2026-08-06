import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          /** Editorial monochrome */
          black: "#1A1A1A",
          white: "#FFFFFF",
          soft: "#F5F5F5",
          muted: "#6B6B6B",
          line: "#E5E5E5",
          /** Legacy aliases used by admin + older components */
          navy: "#0A2540",
          dark: "#111111",
          ink: "#1A1A1A",
          gold: "#D4AF37",
          "gold-light": "#FFC107",
          slate: "#6B6B6B",
          surface: "#122C48",
          paper: "#FFFFFF",
          mist: "#F5F5F5",
          body: "#6B6B6B",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        elevate: "0 20px 50px rgba(0,0,0,0.12)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
