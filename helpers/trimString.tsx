const trimString = (string: string, length: number) => {
  if (string.length > length) {
    return `${string.substring(0, length).trim()}...`;
  } else {
    return string;
  }
};

export default trimString;
