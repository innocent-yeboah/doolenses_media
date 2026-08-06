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
          /** Munson-faithful tokens */
          accent: "#505cfd",
          ink: "#232323",
          body: "#777777",
          paper: "#FFFFFF",
          mist: "#F6F6F6",
          soft: "#F3F3F3",
          line: "#E5E5E5",
          black: "#1A1A1A",
          white: "#FFFFFF",
          muted: "#848484",
          /** Aliases */
          navy: "#0A2540",
          dark: "#232323",
          gold: "#505cfd",
          "gold-light": "#6b75ff",
          slate: "#777777",
          surface: "#122C48",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        elevate: "0 20px 50px rgba(0,0,0,0.18)",
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
