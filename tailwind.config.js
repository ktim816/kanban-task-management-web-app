const {fontFamily} = require('tailwindcss/defaultTheme');
const colorStyles = require('./color-styles');
const {pxToRem} = require('./helpers');

/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: colorStyles,
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', ...fontFamily.sans],
        serif: [...fontFamily.serif],
        mono: [...fontFamily.mono],
      },
      fontSize: {
        'body-m': [pxToRem(12), pxToRem(15)],
        'body-l': [pxToRem(13), pxToRem(23)],

        'heading-s': [
          pxToRem(12),
          {
            lineHeight: pxToRem(15),
            letterSpacing: '2.4px',
          },
        ],

        'heading-m': [pxToRem(15), pxToRem(19)],
        'heading-l': [pxToRem(18), pxToRem(23)],
        'heading-xl': [pxToRem(24), pxToRem(30)],
      },
    },
  },
  plugins: [],
};
