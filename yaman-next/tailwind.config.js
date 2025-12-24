/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",        
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",      
    "./components/**/*.{js,ts,jsx,tsx,mdx}", 
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