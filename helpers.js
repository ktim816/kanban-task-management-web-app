const path = require('path');

exports.pxToRem = (px) => {
  const rootFontSize = 16;
  return `${px / rootFontSize}rem`;
};

exports.bgImage = (src) => {
  return `url(${path.resolve(__dirname, `src/assets/images/${src}`)})`;
};
