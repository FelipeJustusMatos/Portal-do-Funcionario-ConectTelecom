/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        sidebar: "300px",
      },
      fontFamily: {
        mont: ["var(--font-mont)"],
      },
      colors: {
        dark: "#1b1b1b",
        light: "#f5f5f5",
        primary: "#B63E96", // 240,86,199
        primaryDark: "#58E6D9", // 80,230,217
      },
      daisyui: {
        themes: ["dark"],
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }
      lg: { max: "1120px" },
      // => @media (max-width: 1023px) { ... }
      dm: { min: "1010px" },
      // => @media (max-width: 1010px) { ... }
      md: { max: "1010px" },
      // => @media (max-width: 1010px) { ... }
      ms: { min: "639px" },
      // => @media (min-width: 639px) { ... }
      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      xs: { max: "479px" },
      // => @media (max-width: 479px) { ... }
    },
  },

  plugins: [require("daisyui")],
};
