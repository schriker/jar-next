import React from 'react';
import VideosItem from './VideosItem';
import { Video } from '../../types/video';
import styles from './VideosRow.module.css';

type VideosRowType = {
  videos: Video[];
  title: string;
};

const VideosRow = ({ videos, title }: VideosRowType) => {
  return videos.length ? (
    <div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.videos}>
        {videos.map((video) => (
          <VideosItem key={video._id} video={video} />
        ))}
      </div>
    </div>
  ) : null;
};

export default VideosRow;
