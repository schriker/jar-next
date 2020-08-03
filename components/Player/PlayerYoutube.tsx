import React, { useEffect } from 'react';
import { VideoSource } from 'types/video';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const PlayerYoutube = ({ source }: { source: VideoSource[] }) => {
  const loadVideo = () => {
    var player;
    player = new window.YT.Player('player', {
      height: '100%',
      width: '100%',
      playerVars: {
        enablejsapi: 1,
        origin: 'https://jarchiwum.pl',
      },
      videoId: source[0].id,
      events: {
        onReady: () => console.log('ready'),
        onStateChange: () => console.log('stateChanged'),
        onPlaybackRateChange: () => console.log('rate change'),
        onError: () => console.log('error'),
      },
    });
  };

  useEffect(() => {
    console.log('mount');
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = loadVideo;
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    } else {
      loadVideo();
    }
  }, []);
  return <div id="player"></div>;
};

export default PlayerYoutube;
