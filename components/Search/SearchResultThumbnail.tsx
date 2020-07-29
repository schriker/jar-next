import React, { useState } from 'react';

const SearchResultThumbnail = ({ url }: {url: string}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const handleImageLoaded = () => {
    setLoaded(true);
  };

  return (
    <img
      style={{ opacity: loaded ? '1' : '0', zIndex: 992 }}
      src={url}
      alt=""
      onLoad={() => handleImageLoaded()}
    />
  );
};

export default SearchResultThumbnail;
