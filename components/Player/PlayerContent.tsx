import React from 'react';
import Link from 'next/link';
import { Video } from 'types/video';
import trimString from 'helpers/trimString';
import { Streamer } from 'types/streamer';
import styles from 'components/Player/PlayerContent.module.css';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';
import ControllButton from 'components/ControllButton/ControllButton';
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

type InfoBlockPropsType = {
  tooltip: string;
  content: string;
  withSpacer?: boolean;
};

const InfoBlock = ({ tooltip, content, withSpacer }: InfoBlockPropsType) => {
  return (
    <>
      <Tooltip title={tooltip} placement="top" arrow>
        <div className={styles.infoBlock}>{content}</div>
      </Tooltip>
      {withSpacer && <div className={styles.spacer}></div>}
    </>
  );
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
          <InfoBlock
            content={video.duration}
            tooltip="Czas trwania"
            withSpacer
          />
          <InfoBlock
            content={video.views.toString()}
            tooltip="Wyświetleń"
            withSpacer
          />
          <ControllButton
            onClick={() => console.log('Click')}
            tooltip="Najciekawsze momenty"
          >
            <div>
              <FontAwesomeIcon icon={faFire} />
            </div>
            <span>Momenty</span>
          </ControllButton>
          <ControllButton
            onClick={() => console.log('Click')}
            tooltip="Obejrzany"
          >
            <div>
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </ControllButton>
          <ControllButton
            onClick={() => console.log('Click')}
            tooltip="Ulubiony"
          >
            <div>
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </ControllButton>
          <ControllButton
            onClick={() => console.log('Click')}
            tooltip="Tryb kinowy"
          >
            <div>
              <FontAwesomeIcon icon={faExpand} />
            </div>
          </ControllButton>
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
