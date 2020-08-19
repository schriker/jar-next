import React, { useState, useEffect, useRef } from 'react';
import useWatched from 'hooks/useWatched';
import Tooltip from '@material-ui/core/Tooltip';
import { useRouter } from 'next/router';
import VideoImagePlaceholder from 'components/Videos/VideoImagePlaceholder';
import Spinner from 'components/Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHeart } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import moment from 'moment';
import { Video } from 'types/video';
import styles from 'components/Videos/VideosItem.module.css';
import trimString from 'helpers/trimString';
import parseDuration from 'helpers/parseDuration';

type VideosItemPropsType = {
  video: Video;
};

const VideosItem = ({ video }: VideosItemPropsType) => {
  const router = useRouter();
  const { isWatched, isBookmarked, addToWatched, addToBookmark } = useWatched(
    video.id
  );
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
  return (
    <div className={styles.container}>
      <Link
        href="/[streamer]/video/[video]"
        as={`/${router.query.streamer}/video/${video.id}`}
      >
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
              {router.query.streamer === 'wonziu' && (
                <Tooltip title="Ulubiony" placement="top" arrow>
                  <div
                    onClick={(event) => addToBookmark(event)}
                    className={styles.bookmark}
                    style={{ color: isBookmarked ? '#f00' : '#fff' }}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </Tooltip>
              )}
              <div className={styles.duration}>{parseDuration(video.duration)}</div>
              <div className={styles.views}>{video.views}</div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.title}>{trimString(video.title, 25)}</div>
            <div className={styles.date}>
              {moment(video.started).format('DD-MM-YYYY • HH:mm:ss')}
            </div>
            {router.query.streamer === 'wonziu' && (
              <Tooltip title="Obejrzany" placement="top" arrow>
                <div
                  onClick={(event) => addToWatched(event)}
                  className={styles.check}
                  style={{ color: isWatched ? '#f00' : '#fff' }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </Tooltip>
            )}
          </div>
        </a>
      </Link>
    </div>
  );
};

export default VideosItem;
