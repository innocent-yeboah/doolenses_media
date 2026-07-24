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
          navy: "#0A2540",
          dark: "#1A1A1A",
          gold: "#D4AF37",
          "gold-light": "#FFC107",
          white: "#FFFFFF",
          muted: "#F5F5F5",
          slate: "#8A9BB0",
          surface: "#122C48",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(180deg, rgba(10,37,64,0.55) 0%, rgba(10,37,64,0.85) 55%, rgba(10,37,64,0.97) 100%)",
        "section-glow":
          "radial-gradient(ellipse at top, rgba(212,175,55,0.08) 0%, transparent 55%)",
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(212,175,55,0.35)",
        elevate: "0 20px 50px rgba(0,0,0,0.35)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
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
