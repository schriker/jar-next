import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from 'react-spring';
import Link from 'next/link';
import moment from 'moment';
import { Video } from '../../types/video';
import styles from './VideosItem.module.css';
import trimString from '../../helpers/trimString';

type VideosItemPropsType = {
  video: Video;
};

const VideosItem = ({ video }: VideosItemPropsType) => {
  const image = useRef<HTMLImageElement>(null!);
  const [loaded, setLoaded] = useState<boolean>(false);
  const fadeIn = useSpring({ opacity: loaded ? 1 : 0 });
  useEffect(() => {
    if (image.current.complete) {
      setLoaded(true);
    }
  }, []);
  const isNew = Date.now() - new Date(video.started).getTime() < 86400000;
  return (
    <animated.div style={fadeIn}>
      <Link href="/video/[video]" as={`/video/${video._id}`}>
        <a className={styles.link}>
          <div className={styles.wrapper}>
            <div className={styles.background}></div>
            <div className={styles.thumbnail}>
              <img
                ref={image}
                src={video.thumbnail
                  .replace('%{width}', '640')
                  .replace('%{height}', '360')}
                onLoad={() => setLoaded(true)}
                alt=""
              />
              {isNew && <div className={styles.new}>New</div>}
              <div className={styles.bookmark}>
                <FontAwesomeIcon className={styles.bookmarkIcon} icon={faBookmark} />
              </div>
              <div className={styles.duration}>
                {video.duration}
              </div>
              <div className={styles.views}>{video.views}</div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>{trimString(video.title, 25)}</div>
            <div className={styles.date}>
              {moment(video.started).format('DD-MM-YYYY • HH:mm:ss')}
            </div>
          </div>
        </a>
      </Link>
    </animated.div>
  );
};

export default VideosItem;
