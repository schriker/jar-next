import React, { useEffect } from 'react';
import { updateViews } from 'helpers/api';
import dynamic from 'next/dynamic';
import { Video } from 'types/video';
import { Streamer } from 'types/streamer';
import styles from 'components/Player/Player.module.css';
const PlayerYoutube = dynamic(() => import('components/Player/PlayerYoutube'), {
  ssr: false,
});
const PlayerTwitch = dynamic(() => import('components/Player/PlayerTwitch'), {
  ssr: false,
});
import PlayerContent from 'components/Player/PlayerContent';

type PlayerPropsType = {
  video: Video;
  streamer: Streamer;
};

const Player = ({ video, streamer }: PlayerPropsType) => {
  useEffect(() => {
    updateViews(streamer.login, video.id);
  }, []);

  const youtube = video.source?.filter((source) => source.name === 'youtube');
  const twitch = video.source?.filter((source) => source.name === 'twitch');
  return (
    <div className={styles.wrapper}>
      <div>
        {youtube?.length ? (
          <PlayerYoutube source={youtube} />
        ) : twitch?.length ? (
          <PlayerTwitch source={twitch} />
        ) : (
          <PlayerTwitch source={[{ id: video.id, name: 'twitch' }]} />
        )}
      </div>
      <PlayerContent streamer={streamer} video={video} />
    </div>
  );
};

export default Player;
