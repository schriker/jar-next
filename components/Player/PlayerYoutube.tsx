import React, { useEffect, useState } from 'react';
import {
  error,
  playbackRateChange,
  playbackRate,
  end,
  pause,
  buffer,
  play,
  startPlayer,
  setReady,
} from 'store/slices/appPlayer';
import { useTypedSelector } from 'store/rootReducer';
import { useDispatch } from 'react-redux';
import { VideoSource } from 'types/video';

type PlayerType = {
  playVideo: () => void;
  getPlaybackRate: () => number;
  seekTo: (seconds: number) => void;
  pauseVideo: () => void;
  getCurrentTime: () => number;
};

enum PlayerState {
  Unstarted = -1,
  Ended = 0,
  Playing = 1,
  Paused = 2,
  Buffering = 3,
  Cued = 5,
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const PlayerYoutube = ({ source }: { source: VideoSource[] }) => {
  const [playerRef, setPlayerRef] = useState<PlayerType | null>(null);
  const dispatch = useDispatch();
  const state = useTypedSelector((state) => state.appPlayer);

  const onPlayerReady = (event: any) => {
    dispatch(startPlayer(false));
    dispatch(setReady(true));
    setPlayerRef(event.target);
  };

  const onPlayerPlabackRateChange = () => {
    if (playerRef) {
      dispatch(
        playbackRateChange({
          playbackRate: playerRef.getPlaybackRate(),
          playerPosition: playerRef.getCurrentTime(),
        })
      );
    }
  };

  const onPlayerStateChange = (event: { data: PlayerState }) => {
    if (playerRef) {
      dispatch(startPlayer(true));
      dispatch(playbackRate(playerRef.getPlaybackRate()));
      switch (event.data) {
        case PlayerState.Ended:
          playerRef.seekTo(0);
          playerRef.pauseVideo();
          dispatch(end());
          break;
        case PlayerState.Paused:
          dispatch(pause());
          break;
        case PlayerState.Buffering:
          dispatch(buffer());
          break;
        case PlayerState.Playing:
          dispatch(play(playerRef.getCurrentTime()));
          break;
      }
    }
  };
  const loadVideo = () => {
    new window.YT.Player('player', {
      height: '100%',
      width: '100%',
      playerVars: {
        enablejsapi: 1,
        origin: 'https://jarchiwum.pl',
      },
      videoId: source[0].id,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        onPlaybackRateChange: onPlayerPlabackRateChange,
        onError: () => dispatch(error()),
      },
    });
  };

  useEffect(() => {
    if (state.startPlayer && playerRef) {
      playerRef.playVideo();
    }
  }, [state.startPlayer]);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = loadVideo;
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    } else {
      loadVideo();
    }
  });

  useEffect(() => {
    return () => {
      dispatch(startPlayer(false));
      dispatch(setReady(false));
    };
  }, []);
  return <div id="player"></div>;
};

export default PlayerYoutube;
