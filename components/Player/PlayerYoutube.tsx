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
  setPlayerPosition,
} from 'store/slices/appPlayer';
import { useTypedSelector } from 'store/rootReducer';
import { useDispatch } from 'react-redux';
import { VideoSource } from 'types/video';

type PlayerType = {
  playVideo: () => void;
  getPlaybackRate: () => number;
  seekTo: (seconds: number) => void;
  pauseVideo: () => void;
  destroy: () => void;
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

  var player: PlayerType | null = null;

  const onPlayerReady = (event: any) => {
    dispatch(startPlayer(false));
    dispatch(setReady(true));
    setPlayerRef(event.target);
  };

  const onPlayerPlabackRateChange = () => {
    if (player) {
      dispatch(
        playbackRateChange({
          playbackRate: player.getPlaybackRate(),
          playerPosition: player.getCurrentTime(),
        })
      );
    }
  };

  const onPlayerStateChange = (event: { data: PlayerState }) => {
    if (player) {
      dispatch(startPlayer(true));
      dispatch(playbackRate(player.getPlaybackRate()));
      switch (event.data) {
        case PlayerState.Ended:
          dispatch(end());
          break;
        case PlayerState.Paused:
          dispatch(pause());
          break;
        case PlayerState.Buffering:
          dispatch(buffer());
          break;
        case PlayerState.Playing:
          dispatch(play(player.getCurrentTime()));
          break;
      }
    }
  };
  const loadVideo = () => {
    player = new window.YT.Player('player', {
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
    if (playerRef) {
      if (state.startPlayer) {
        playerRef.playVideo();
      }
    }
  }, [state.startPlayer]);

  useEffect(() => {
    if (playerRef) {
      playerRef.seekTo(state.seekTo);
    }
  }, [state.seekTo]);

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
    return () => {
      dispatch(end());
      dispatch(startPlayer(false));
      dispatch(setReady(false));
      if (player) {
        player.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef && state.isPlaying) {
        dispatch(setPlayerPosition(playerRef.getCurrentTime()));
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [state.isPlaying]);

  return <div id="player"></div>;
};

export default PlayerYoutube;
