const {fontFamily} = require('tailwindcss/defaultTheme');
const colorStyles = require('./color-styles');

/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: colorStyles,
    extend: {
      fontFamily: {
        sans: [...fontFamily.sans],
        serif: [...fontFamily.serif],
        mono: [...fontFamily.mono],
      },
    },
  },
  plugins: [],
};
