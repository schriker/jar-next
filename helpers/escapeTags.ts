const replaceTag = (tag: string) => {
  const escapeTags: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return escapeTags[tag] || tag;
};

export default replaceTag;
