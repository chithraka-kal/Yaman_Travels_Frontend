/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",      // Covers anything in src/
    "./app/**/*.{js,ts,jsx,tsx,mdx}",      // Covers app/ (if at root)
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",    // Covers pages/ (if at root)
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Covers components/ (if at root)
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      transitionDuration: {
        5000: '5000ms',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
});