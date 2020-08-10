import React, { useEffect, useState } from 'react';
import {
  end,
  pause,
  play,
  startPlayer,
  setReady,
  setPlayerPosition,
} from 'store/slices/appPlayer';
import { useTypedSelector } from 'store/rootReducer';
import { useDispatch } from 'react-redux';
import { VideoSource } from 'types/video';

type PlayerType = {
  play: () => void;
  seek: (seconds: number) => void;
  pause: () => void;
  getCurrentTime: () => number;
  getQualities: () => { name: string }[];
  setQuality: (name: string) => void;
  addEventListener: (event: string, cb: () => void) => void;
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
    Twitch: any;
  }
}

const PlayerTwitch = ({ source }: { source: VideoSource[] }) => {
  const [playerRef, setPlayerRef] = useState<PlayerType | null>(null);
  const dispatch = useDispatch();
  const state = useTypedSelector((state) => state.appPlayer);

  var player: PlayerType | null = null;

  const onPlayerReady = () => {
    dispatch(startPlayer(false));
    dispatch(setReady(true));
    setPlayerRef(player);
  };

  const onPlayerStateChange = (event: { data: PlayerState }) => {
    if (player) {
      dispatch(startPlayer(true));
      switch (event.data) {
        case PlayerState.Ended:
          dispatch(end());
          break;
        case PlayerState.Paused:
          dispatch(pause());
          break;
        case PlayerState.Playing:
          dispatch(play(player.getCurrentTime()));
          break;
      }
    }
  };
  const loadVideo = () => {
    player = new window.Twitch.Player('player', {
      video: source[0].id,
      parent: ['jarchiwum.pl'],
      height: '100%',
      width: '100%',
      autoplay: false,
    });
    if (player) {
      player.addEventListener(window.Twitch.Player.READY, onPlayerReady);
      player.addEventListener(window.Twitch.Player.PLAYING, () => {
        setTimeout(() => {
          onPlayerStateChange({ data: PlayerState.Playing });
        }, 1000);
      });
      player.addEventListener(window.Twitch.Player.PLAY, () => {
        setTimeout(() => {
          onPlayerStateChange({ data: PlayerState.Playing });
        }, 1000);
      });
      player.addEventListener(window.Twitch.Player.PAUSE, () =>
        onPlayerStateChange({ data: PlayerState.Paused })
      );
      player.addEventListener(window.Twitch.Player.ENDED, () =>
        onPlayerStateChange({ data: PlayerState.Ended })
      );
    }
  };

  useEffect(() => {
    if (playerRef) {
      if (state.startPlayer) {
        playerRef.play();
      }
    }
  }, [state.startPlayer]);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://player.twitch.tv/js/embed/v1.js';
      tag.addEventListener('load', loadVideo);
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    } else {
      loadVideo();
    }
    return () => {
      dispatch(startPlayer(false));
      dispatch(setReady(false));
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

export default PlayerTwitch;
