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
          black: "#1A1A1A",
          white: "#FFFFFF",
          soft: "#F5F5F5",
          gold: "#D4AF37",
          "gold-light": "#E4C65A",
          muted: "#6B6B6B",
          line: "#E8E8E8",
          /** Aliases for admin + legacy */
          navy: "#0A2540",
          dark: "#111111",
          ink: "#1A1A1A",
          slate: "#6B6B6B",
          surface: "#122C48",
          paper: "#FFFFFF",
          mist: "#F5F5F5",
          body: "#6B6B6B",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        elevate: "0 18px 40px rgba(0,0,0,0.12)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "hero-kenburns": "heroKenburns 8s ease-out forwards",
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
          "100%": { transform: "scale(1.06)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
