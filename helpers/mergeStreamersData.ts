import { Streamer } from 'types/streamer';
import { TwitchStream, TwitchStreamer, TwitchGame } from 'types/twitch';

const mergeStreamersData = (
  streamers: TwitchStreamer[],
  streams: TwitchStream[],
  games: TwitchGame[]
): Streamer[] => {
  const streamersData: Streamer[] = streamers.map(
    (streamer): Streamer => {
      const data = {
        id: streamer.id,
        login: streamer.login,
        displayName: streamer.display_name,
        profileImage: streamer.profile_image_url,
      };

      const streamerStreams = streams.find(
        (stream) => stream.user_id === streamer.id
      );

      if (streamerStreams) {
        const game = games.find(game => game.id === streamerStreams.game_id);
        return {
          ...data,
          isLive: true,
          gameId: streamerStreams.game_id,
          title: streamerStreams.title,
          viewers: streamerStreams.viewer_count,
          startedAt: streamerStreams.started_at,
          game: game,
        };
      } else {
        return {
          ...data,
          isLive: false,
        };
      }
    }
  );

  return streamersData;
};

export default mergeStreamersData;
