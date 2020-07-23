import React, { useState, useEffect, useRef } from 'react';
import VideoImagePlaceholder from './VideoImagePlaceholder';
import Spinner from '../Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import moment from 'moment';
import { Video } from '../../types/video';
import styles from './VideosItem.module.css';
import trimString from '../../helpers/trimString';

type VideosItemPropsType = {
  video: Video;
};

const VideosItem = ({ video }: VideosItemPropsType) => {
  const isNew = Date.now() - new Date(video.started).getTime() < 86400000;
  const image = useRef<HTMLImageElement>(null!);
  const [loaded, setLoaded] = useState<boolean>(false);
  const handleImageLoaded = () => {
    setLoaded(true);
  };
  useEffect(() => {
    if (image.current?.complete) {
      handleImageLoaded();
    }
  }, [image]);
  const addToBookark = (event: React.MouseEvent) => {
    event.preventDefault();
  };
  const addToWatched = (event: React.MouseEvent) => {
    event.preventDefault();
  };
  return (
    <div className={styles.container}>
      <Link href="/video/[video]" as={`/video/${video._id}`}>
        <a className={styles.link}>
          <div className={styles.wrapper}>
            {loaded && <div className={styles.background}></div>}
            <div className={styles.thumbnail}>
              <Spinner />
              <VideoImagePlaceholder />
              <img
                style={{ opacity: loaded ? '1' : '0' }}
                className={styles.image}
                ref={image}
                src={
                  video.thumbnail.length
                    ? video.thumbnail
                        .replace('%{width}', '640')
                        .replace('%{height}', '360')
                    : '/img_placeholder.jpg'
                }
                onLoad={() => handleImageLoaded()}
                alt=""
              />
              {isNew && <div className={styles.new}>New</div>}
              <div
                onClick={(event) => addToBookark(event)}
                className={styles.bookmark}
              >
                <FontAwesomeIcon
                  className={styles.bookmarkIcon}
                  icon={faBookmark}
                />
              </div>
              <div className={styles.duration}>{video.duration}</div>
              <div className={styles.views}>{video.views}</div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>{trimString(video.title, 25)}</div>
            <div className={styles.date}>
              {moment(video.started).format('DD-MM-YYYY • HH:mm:ss')}
            </div>
            <div
              onClick={(event) => addToWatched(event)}
              className={styles.check}
            >
              <FontAwesomeIcon className={styles.checkIcon} icon={faCheck} />
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default VideosItem;
