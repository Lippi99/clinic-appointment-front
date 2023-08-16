
const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        "main-bg": "#353564",
        "main-bg-darker": "#2c2c54",
        "green-light": '#59EDAE',
        "green-darker": " #4eb68b",
        "red-light": "#ff5252",
        'border-light': "#4A4A8C",

        'box-shadow-login': " 0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      }

    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
  ],
}
