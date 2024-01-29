import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#41547b",
          700: "#222a40",
        },
        secondary: {
          500: "#b62026",
        },
      },
      fontFamily: {
        sans: ["ARAHAMAH1982", ...defaultTheme.fontFamily.sans],
        notoSansArabic: ["Noto Sans Arabic", ...defaultTheme.fontFamily.sans],
        amiri: ["Amiri", ...defaultTheme.fontFamily.sans],
        cairo: ["Cairo", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "hero-background": 'url("/images/banner-empty-01.png")',
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
      animation: {
        "slide-down": "slide-down 500ms ease-in-out",
      },
      keyframes: {
        "slide-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
    plugins: [require("@tailwindcss/forms")],
  },
};
