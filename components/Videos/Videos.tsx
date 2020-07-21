import React from 'react';
import VideosItem from './VideosItem';
import styles from './Videos.module.css';
import { useTypedSelector } from '../../store/rootReducer';

const Videos = () => {
  const state = useTypedSelector((state) => state.appVideos);
  return (
    <div className={styles.videos}>
      {state.videos.map(video => <VideosItem key={video._id} video={video} />)}
    </div>
  );
};

export default Videos;
