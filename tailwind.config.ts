import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          dusty: "#E8B4B8",
          blush: "#F5D5DA",
          deep: "#C8868E",
        },
        lavender: {
          soft: "#C8A4D4",
          light: "#E8D5F0",
          deep: "#9B6DB5",
        },
        sage: {
          DEFAULT: "#8FAF8F",
          light: "#C4D9C4",
          dark: "#5C7A5C",
        },
        cream: {
          DEFAULT: "#FAF6F0",
          warm: "#F5EDE0",
          dark: "#E8DDD0",
        },
        mauve: {
          DEFAULT: "#6B4C55",
          dark: "#2D2020",
          light: "#9B7A85",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #FAF6F0 0%, #F5D5DA 40%, #E8D5F0 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(232,180,184,0.15) 0%, rgba(200,164,212,0.15) 100%)",
        "footer-gradient":
          "linear-gradient(135deg, #2D2020 0%, #6B4C55 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        rose: "0 8px 30px rgba(232,180,184,0.4)",
        lavender: "0 8px 30px rgba(200,164,212,0.4)",
        sage: "0 8px 30px rgba(143,175,143,0.4)",
        card: "0 4px 24px rgba(107,76,85,0.12)",
        "card-hover": "0 12px 48px rgba(107,76,85,0.22)",
      },
    },
  },
  plugins: [],
};
export default config;
