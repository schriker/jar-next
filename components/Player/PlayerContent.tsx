import React, { useRef } from 'react';
import Link from 'next/link';
import { Video } from 'types/video';
import useWatched from 'hooks/useWatched';
import { useDispatch } from 'react-redux';
import { showHighlights, setSource } from 'store/slices/appPlayer';
import { useTypedSelector } from 'store/rootReducer';
import trimString from 'helpers/trimString';
import { Streamer } from 'types/streamer';
import styles from 'components/Player/PlayerContent.module.css';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';
import ControllButton from 'components/ControllButton/ControllButton';
import parseDuration from 'helpers/parseDuration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFire,
  faCheck,
  faHeart,
  faExpand,
  faExchangeAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FullScreenHandle } from 'react-full-screen';

type PlayerContentPropsType = {
  video: Video;
  streamer: Streamer;
  fullscreen: FullScreenHandle;
};

type InfoBlockPropsType = {
  tooltip: string;
  content: string;
  withSpacer?: boolean;
  tooltipContainer: HTMLDivElement | null;
};

const InfoBlock = ({
  tooltip,
  content,
  withSpacer,
  tooltipContainer,
}: InfoBlockPropsType) => {
  return (
    <>
      <Tooltip
        title={tooltip}
        placement="top"
        arrow
        PopperProps={{ container: tooltipContainer }}
      >
        <div className={styles.infoBlock}>{content}</div>
      </Tooltip>
      {withSpacer && <div className={styles.spacer}></div>}
    </>
  );
};

const PlayerContent = ({
  video,
  streamer,
  fullscreen,
}: PlayerContentPropsType) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement | null>(null);
  const player = useTypedSelector((state) => state.appPlayer);
  const { isWatched, isBookmarked, addToWatched, addToBookmark } = useWatched(
    video.id
  );

  const handleSourceChange = () => {
    if (player.source === 'TWITCH') {
      dispatch(setSource('YOUTUBE'));
    } else  {
      dispatch(setSource('TWITCH'));
    }
  }

  const handleFullscreen = () => {
    if (fullscreen.active) {
      fullscreen.exit();
    } else {
      fullscreen.enter();
    }
  };

  return (
    <div ref={ref} className={styles.wrapper}>
      <div className={styles.profileImage}>
        <img src={streamer.profileImage} alt="" />
      </div>
      <div>
        <div className={styles.title}>
          <span title={video.title}>{trimString(video.title, 55)}</span>
          <div className={styles.date}>
            {moment(video.started).format('DD-MM-YYYY • HH:mm:ss')}
          </div>
        </div>
        {video.keywords && (
          <div className={styles.keywords}>
            {video.keywords
              .split(',')
              .slice(0, 8)
              .map((keyword, index) => (
                <Link
                  key={index}
                  href={`/[streamer]?search=${keyword.trim()}`}
                  as={`/wonziu?search=${keyword.trim()}`}
                >
                  <a className={styles.keyword}>{keyword.trim()}</a>
                </Link>
              ))}
          </div>
        )}
      </div>
      <div className={styles.leftPanel}>
        <div className={styles.info}>
          <InfoBlock
            tooltipContainer={ref.current}
            content={parseDuration(video.duration)}
            tooltip="Czas trwania"
            withSpacer
          />
          <InfoBlock
            tooltipContainer={ref.current}
            content={video.views.toString()}
            tooltip="Wyświetleń"
            withSpacer
          />
          {video.highLights && (
            <ControllButton
              tooltipContainer={ref.current}
              onClick={() => dispatch(showHighlights(!player.showHighlights))}
              tooltip="Najciekawsze momenty"
              red={player.showHighlights}
            >
              <div>
                <FontAwesomeIcon icon={faFire} />
              </div>
              <span>Momenty</span>
            </ControllButton>
          )}
          {streamer.login === 'wonziu' && (
            <ControllButton
              tooltipContainer={ref.current}
              onClick={() => addToWatched()}
              tooltip="Obejrzany"
              red={isWatched}
            >
              <div>
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </ControllButton>
          )}
          {streamer.login === 'wonziu' && (
            <ControllButton
              tooltipContainer={ref.current}
              onClick={() => addToBookmark()}
              tooltip="Ulubiony"
              red={isBookmarked}
            >
              <div>
                <FontAwesomeIcon icon={faHeart} />
              </div>
            </ControllButton>
          )}
          <ControllButton
            tooltipContainer={ref.current}
            red={fullscreen.active}
            onClick={handleFullscreen}
            tooltip="Tryb kinowy"
          >
            <div>
              <FontAwesomeIcon icon={faExpand} />
            </div>
          </ControllButton>
          {video.source && video.source.length > 1 && (
            <ControllButton
              tooltipContainer={ref.current}
              onClick={handleSourceChange}
              tooltip="Zmień źródło"
            >
              <div>
                <FontAwesomeIcon icon={faExchangeAlt} />
              </div>
            </ControllButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
