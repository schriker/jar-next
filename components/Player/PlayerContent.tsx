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
        <Tooltip />
        <div className={styles.info}>
          <div data-tip="Czas trwania" className={styles.infoBlock}>
            {video.duration}
          </div>
          <div data-tip="Wyświetleń" className={styles.infoBlock}>
            {video.views}
          </div>
          <div data-tip="Najciekawsze momenty" className={styles.moments}>
            <div>
              <FontAwesomeIcon icon={faFire} />
            </div>
            Momenty
          </div>
          <div data-tip="Obejrzany" className={styles.button}>
            <div>
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </div>
          <div data-tip="Ulubiony" className={styles.button}>
            <div>
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </div>
          <div data-tip="Tryb kinowy" className={styles.button}>
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
