import React from 'react';
import dynamic from 'next/dynamic';
import { Video } from 'types/video';
import { Streamer } from 'types/streamer';
import styles from 'components/Player/Player.module.css';
const PlayerYoutube = dynamic(() => import('components/Player/PlayerYoutube'));
import PlayerContent from 'components/Player/PlayerContent';

type PlayerPropsType = {
  video: Video;
  streamer: Streamer;
};

const Player = ({ video, streamer }: PlayerPropsType) => {
  const youtube = video.source?.filter((source) => source.name === 'youtube');
  const twitch = video.source?.filter((source) => source.name === 'twitch');
  return (
    <div className={styles.wrapper}>
      {youtube?.length ? (
        <PlayerYoutube source={youtube} />
      ) : twitch?.length ? (
        <p>asd</p>
      ) : null}
      <PlayerContent streamer={streamer} video={video} />
    </div>
  );
};

export default Player;
