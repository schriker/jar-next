import React from 'react';
import { useTypedSelector } from '../../store/rootReducer';

const Videos = () => {
  const state = useTypedSelector((state) => state.appVideos);
  return <div></div>;
};

export default Videos;
