const parseDuaration = (duration: string): string => {
  const duration_array = duration.split(/[hms]+/);

  if (duration_array.length === 1) {
    return duration_array[0];
  }

  const parsed = duration_array
    .filter((number) => number !== '')
    .map((number) => {
      if (number.length === 1) {
        return `0${number}`;
      } else {
        return number;
      }
    });
  while (parsed.length < 3) {
    parsed.unshift('00');
  }
  return parsed.join(':');
};

export default parseDuaration;
