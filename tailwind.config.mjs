/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#161925",
        primary: "#1D4ED8",
        secondary: "#1D4ED8",
        bgLight: "#FFFFFF",
        bgDark: "#161925",
        textLight: "#161925",
        textDark: "#FFFFFF",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
