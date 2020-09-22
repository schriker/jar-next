import React, { useEffect } from 'react';
import { updateViews } from 'helpers/api';
import { useDispatch } from 'react-redux';
import { setSource } from 'store/slices/appPlayer';
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
import { useTypedSelector } from 'store/rootReducer';

type PlayerPropsType = {
  video: Video;
  streamer: Streamer;
  fullscreen: FullScreenHandle;
};

const Player = ({ video, streamer, fullscreen }: PlayerPropsType) => {
  let duration = 0;
  const dispatch = useDispatch();
  const player = useTypedSelector((state) => state.appPlayer);
  const youtube = video.source?.filter((source) => source.name === 'youtube');
  const twitch = video.source?.filter((source) => source.name === 'twitch');

  useEffect(() => {
    updateViews(streamer.login, video.id);
    if (youtube?.length) {
      dispatch(setSource('YOUTUBE'));
    } else if (twitch?.length) {
      dispatch(setSource('TWITCH'));
    }
  }, []);

  if (video.createdAt) {
    duration =
      new Date(video.createdAt).getTime() - new Date(video.started).getTime();
  }

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
        {player.source === 'YOUTUBE' && youtube?.length ? (
          <PlayerYoutube source={youtube} />
        ) : player.source === 'TWITCH' && twitch?.length ? (
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
