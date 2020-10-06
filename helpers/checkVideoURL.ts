const checkVideoURL = (
  url: string
): {
  name: 'youtube' | 'twitch' | null;
  id: string | null;
} => {
  const youTubeRegEx = /youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/;
  const twitchRegEx = /twitch\.tv\/videos\/(\S+)/i;

  const youTubeId = url.match(youTubeRegEx);
  const twitchId = url.match(twitchRegEx);

  return {
    name: youTubeId ? 'youtube' : twitchId ? 'twitch' : null,
    id: youTubeId ? youTubeId[1] : twitchId ? twitchId[1] : null,
  };
};

export default checkVideoURL;
