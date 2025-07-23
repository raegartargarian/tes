/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require("tailwindcss/plugin");

const COLORS = require("./src/styles/configs/tailwind-theme.js").COLORS;
const BORDER_RADIUS =
  require("./src/styles/configs/tailwind-theme.js").BORDER_RADIUS;
const BOX_SHADOW = require("./src/styles/configs/tailwind-theme.js").BOX_SHADOW;
const BREAKPOINTS =
  require("./src/styles/configs/tailwind-theme.js").BREAKPOINTS;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Godfather Color Palette
        godfather: {
          gold: "#D4AF37",
          "dark-gold": "#B8941F",
          "light-gold": "#F4E4BC",
          cream: "#F5F5DC",
          dark: "#1A0F0A",
          brown: "#2D1B0E",
          "deep-red": "#8B0000",
          wine: "#722F37",
          shadow: "#0D0907",
          accent: "#CD853F",
        },
        primary: {
          yellow: "#D4AF37", // Changed to Godfather gold
          amber: "#B8941F", // Changed to Godfather dark gold
          black: "#1A0F0A", // Changed to Godfather dark
          dark: "#0D0907", // Changed to Godfather shadow
        },
        yellow: {
          50: "#FEF9E7",
          100: "#FEF3C7",
          200: "#F4E4BC",
          300: "#D4AF37",
          400: "#B8941F",
          500: "#A67C00",
          600: "#8B6914",
          700: "#705E17",
          800: "#5C4E17",
          900: "#4F4419",
        },
        amber: {
          50: "#FEF9E7",
          100: "#F4E4BC",
          200: "#D4AF37",
          300: "#B8941F",
          400: "#A67C00",
          500: "#8B6914",
          600: "#705E17",
          700: "#5C4E17",
          800: "#4F4419",
          900: "#42391A",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        crimson: ["Crimson Text", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in": "slide-in 0.8s ease-out",
      },
      backgroundImage: {
        "godfather-gradient":
          "linear-gradient(135deg, #1A0F0A 0%, #2D1B0E 50%, #0D0907 100%)",
        "gold-gradient": "linear-gradient(45deg, #D4AF37, #B8941F)",
        "wine-gradient": "linear-gradient(135deg, #8B0000 0%, #722F37 100%)",
      },
      fontSize: {
        "10xl": "10rem",
        "11xl": "12rem",
        "12xl": "14rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
