import React from 'react';
import Link from 'next/link';
import { Video } from 'types/video';
import trimString from 'helpers/trimString';
import { Streamer } from 'types/streamer';
import styles from 'components/Player/PlayerContent.module.css';
import moment from 'moment';
import Tooltip from 'components/Tooltip/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFire,
  faCheck,
  faHeart,
  faExpand,
} from '@fortawesome/free-solid-svg-icons';

type PlayerContentPropsType = {
  video: Video;
  streamer: Streamer;
};

const PlayerContent = ({ video, streamer }: PlayerContentPropsType) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.profileImage}>
        <img src={streamer.profileImage} alt="" />
      </div>
      <div>
        <div className={styles.title}>
          {trimString(video.title, 65)}
          <div className={styles.date}>
            {moment(video.started).format('DD-MM-YYYY • HH:mm:ss')}
          </div>
        </div>
        {video.keywords && (
          <div className={styles.keywords}>
            {video.keywords?.split(' ').map((keyword, index) => (
              <Link
                key={index}
                href={`/[streamer]?search=${keyword}`}
                as={`/wonziu?search=${keyword}`}
              >
                <a className={styles.keyword}>{keyword}</a>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className={styles.leftPanel}>
        <div className={styles.info}>
          <Tooltip id="duration" />
          <div
            data-tip="Czas trwania"
            data-for="duration"
            className={styles.infoBlock}
          >
            {video.duration}
          </div>
          <Tooltip id="views" />
          <div
            data-tip="Wyświetleń"
            data-for="views"
            className={styles.infoBlock}
          >
            {video.views}
          </div>
          <Tooltip id="moments" />
          <div
            data-tip="Najciekawsze momenty"
            data-for="moments"
            className={styles.moments}
          >
            <div>
              <FontAwesomeIcon icon={faFire} />
            </div>
            Momenty
          </div>
          <Tooltip id="watched" />
          <div
            data-tip="Obejrzany"
            data-for="watched"
            className={styles.button}
          >
            <div>
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </div>
          <Tooltip id="faved" />
          <div data-tip="Ulubiony" data-for="faved" className={styles.button}>
            <div>
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </div>
          <Tooltip id="theatre" />
          <div
            data-tip="Tryb kinowy"
            data-for="theatre"
            className={styles.button}
          >
            <div>
              <FontAwesomeIcon icon={faExpand} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
