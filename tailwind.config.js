/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        gray: "#99A2A4",
        white: "#FFFFFF",
        pink: "#FEE3C5",
        red: "#9E0B0E",
        green: "#01A755",
        orange: "#F5812A"
      }
    }
  },
  plugins: [],
}
