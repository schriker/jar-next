import { get } from 'react-hook-form';

const getRGB = (color: string) => {
  let c: string[] | string;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)) {
    c = color.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return [
      (parseInt(c) >> 16) & 255,
      (parseInt(c) >> 8) & 255,
      parseInt(c) & 255,
    ];
  }
};

export default getRGB;
