import React from 'react';
import VideosRow from './VideosRow';
import styles from './Videos.module.css';
import { useTypedSelector } from '../../store/rootReducer';

const Videos = () => {
  const state = useTypedSelector((state) => state.appVideos);
  const last24h = state.videos.filter(
    (video) => Date.now() - new Date(video.started).getTime() < 86400000
  );
  const last48h = state.videos.filter(
    (video) =>
      Date.now() - new Date(video.started).getTime() < 172800000 &&
      Date.now() - new Date(video.started).getTime() >= 86400000
  );
  const older = state.videos.filter(
    (video) => Date.now() - new Date(video.started).getTime() >= 172800000
  );
  return (
    <div className={styles.videos}>
      <VideosRow title="Ostatnie 24h" videos={last24h}/>
      <VideosRow title="Ostatnie 48h" videos={last48h}/>
      <VideosRow title="Starsze" videos={older}/>
    </div>
  );
};

export default Videos;
