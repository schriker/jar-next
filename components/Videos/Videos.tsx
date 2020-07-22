import React, { useEffect, useState } from 'react';
import VideosRow from './VideosRow';
import styles from './Videos.module.css';
import { Video } from '../../types/video';

type VideosPropsType = {
  videos: Video[];
};

const Videos = ({ videos }: VideosPropsType) => {
  const last24h = videos.filter(
    (video) => Date.now() - new Date(video.started).getTime() < 86400000
  );
  const last48h = videos.filter(
    (video) =>
      Date.now() - new Date(video.started).getTime() < 172800000 &&
      Date.now() - new Date(video.started).getTime() >= 86400000
  );
  const older = videos.filter(
    (video) => Date.now() - new Date(video.started).getTime() >= 172800000
  );
  return (
    <div className={styles.videos}>
      <VideosRow title="Ostatnie 24h" videos={last24h} />
      <VideosRow title="Ostatnie 48h" videos={last48h} />
      <VideosRow title="Starsze" videos={older} />
    </div>
  );
};

export default Videos;
