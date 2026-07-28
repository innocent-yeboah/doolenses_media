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
          ink: "#232323",
          gold: "#D4AF37",
          "gold-light": "#FFC107",
          white: "#FFFFFF",
          muted: "#F5F5F5",
          slate: "#8A9BB0",
          surface: "#122C48",
          paper: "#FFFFFF",
          mist: "#F6F6F6",
          body: "#777777",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        "section-glow":
          "radial-gradient(ellipse at top, rgba(212,175,55,0.08) 0%, transparent 55%)",
      },
      boxShadow: {
        elevate: "0 20px 50px rgba(0,0,0,0.35)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "hero-kenburns": "heroKenburns 7s ease-out forwards",
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
        heroKenburns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
