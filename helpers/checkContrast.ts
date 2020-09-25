import getRGB from 'helpers/getRGB';

const checkContrast = (color: string) => {
  const rgb = getRGB(color);
  // http://www.w3.org/TR/AERT#color-contrast
  if (rgb) {
    const brightness = Math.round(
      (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
    );
    return brightness >= 28;
  } else {
    return false;
  }
};

export default checkContrast;
