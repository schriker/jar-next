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
import Notes from 'components/Notes/Notes';
import Highlights from 'components/Highlights/Highlights';
import { FullScreenHandle } from 'react-full-screen';

type PlayerPropsType = {
  video: Video;
  streamer: Streamer;
  fullscreen: FullScreenHandle;
};

const Player = ({ video, streamer, fullscreen }: PlayerPropsType) => {
  useEffect(() => {
    updateViews(streamer.login, video.id);
  }, []);
  let duration = 0;
  if (video.createdAt) {
    duration =
      new Date(video.createdAt).getTime() - new Date(video.started).getTime();
  }
  const youtube = video.source?.filter((source) => source.name === 'youtube');
  const twitch = video.source?.filter((source) => source.name === 'twitch');
  return (
    <div className={styles.wrapper}>
      <div className={styles.player}>
        {video.highLights && (
          <Highlights
            started={video.started}
            duration={duration}
            highlights={video.highLights}
          />
        )}
        <Notes video={video} />
        {youtube?.length ? (
          <PlayerYoutube source={youtube} />
        ) : twitch?.length ? (
          <PlayerTwitch source={twitch} />
        ) : (
          <PlayerTwitch source={[{ id: video.id, name: 'twitch' }]} />
        )}
      </div>
      <PlayerContent
        streamer={streamer}
        video={video}
        fullscreen={fullscreen}
      />
    </div>
  );
};

export default Player;
