import { API } from 'helpers/axios';
import qs from 'qs';
import mergeStreamersData from 'helpers/mergeStreamersData';
import { Streamer } from 'types/streamer';
import { Video } from 'types/video';
import { ServerVideoQuery, TwitchVideoQuery } from 'types/api';
import { TwitchGame, TwitchStreamer, TwitchStream } from 'types/twitch';

const fetchStreamers = (streamers: string[]) => {
  return new Promise<TwitchStreamer[]>(async (resolve, reject) => {
    try {
      const queryString = qs.stringify({
        login: streamers,
      });
      const response = await API.get(`/users?${queryString}`);
      resolve(response.data.data);
    } catch (err) {
      reject(err);
    }
  });
};

const fetchStreams = (streamers: string[]) => {
  return new Promise<TwitchStream[]>(async (resolve, reject) => {
    try {
      const queryString = qs.stringify({
        user_login: streamers,
      });
      const response = await API.get(`/streams?${queryString}`);
      resolve(response.data.data);
    } catch (err) {
      reject(err);
    }
  });
};

const fetchGames = (games: string[]) => {
  return new Promise<TwitchGame[]>(async (resolve, reject) => {
    try {
      const queryString = qs.stringify({
        id: games,
      });
      const response = await API.get(`/games?${queryString}`);
      resolve(response.data.data);
    } catch (err) {
      reject(err);
    }
  });
};

export const fetchStreamersData = (streamers: string[]) => {
  return new Promise<Streamer[]>(async (resolve, reject) => {
    try {
      let serverGames: TwitchGame[] = [];

      const serverStreamersPromise = fetchStreamers(streamers);
      const serverStreamsPrmoise = fetchStreams(streamers);

      const [serverStreamers, serverStreams] = await Promise.all([
        serverStreamersPromise,
        serverStreamsPrmoise,
      ]);

      if (serverStreams.length) {
        const games = serverStreams.map((stream) => stream.game_id);
        const data: TwitchGame[] = await fetchGames(games);
        serverGames = data;
      }
      const streamersData = mergeStreamersData(
        serverStreamers,
        serverStreams,
        serverGames
      );
      resolve(streamersData);
    } catch (err) {
      console.log('Fetching server streamers error:', err.response);
      reject();
    }
  });
};

export const fetchServerVideoById = (query: {
  streamer: string;
  id: string;
}) => {
  return new Promise<{ video: Video }>(async (resolve, reject) => {
    try {
      const queryString = qs.stringify(query);
      const response = await API.post(`/videos_api?${queryString}`);
      resolve({
        video: { ...response.data.videos[0] },
      });
    } catch (err) {
      console.log('Fetching server videos error:', err.response);
      reject();
    }
  });
};

export const fetchServerVideos = (
  query: ServerVideoQuery,
  body?: { watched: string[] }
) => {
  return new Promise<{ videos: Video[]; count: number }>(
    async (resolve, reject) => {
      try {
        const queryString = qs.stringify(query);
        const response = await API.post(`/videos_api?${queryString}`, {
          watched: body?.watched,
        });
        resolve({
          videos: response.data.videos.map(
            (video: any): Video => {
              return {
                id: video.videoId,
                duration: video.duration,
                started: video.started,
                thumbnail: video.thumbnail,
                title: video.title,
                views: video.views,
                screenshots: video.screenshots ? video.screenshots : [],
              };
            }
          ),
          count: response.data.count,
        });
      } catch (err) {
        console.log('Fetching server videos error:', err.response);
        reject();
      }
    }
  );
};

export const fetchTwitchVideos = (query: TwitchVideoQuery) => {
  return new Promise<{ videos: Video[]; paginationCursor: string }>(
    async (resolve, reject) => {
      try {
        const queryString = qs.stringify(query);
        const response = await API.get(`/videos_twitch?${queryString}`);
        if (!response.data.data.length) {
          throw new Error('Videos array is empty.');
        }
        resolve({
          videos: response.data.data.map(
            (video: any): Video => {
              return {
                id: video.id,
                duration: video.duration,
                started: video.created_at,
                thumbnail: video.thumbnail_url,
                title: video.title,
                views: video.view_count,
              };
            }
          ),
          paginationCursor: response.data.pagination.cursor,
        });
      } catch (err) {
        console.log('Fetching twitch videos error:', err);
        reject();
      }
    }
  );
};

export const fetchDates = (streamer: string) => {
  return new Promise<{ [key: string]: number }>(async (resolve, reject) => {
    try {
      const queryString = qs.stringify({
        streamer: streamer,
      });
      const response = await API.get(`/dates?${queryString}`);
      if (!Object.keys(response.data).length) {
        throw new Error('Dates array is empty.');
      }
      resolve(response.data);
    } catch (err) {
      console.log('Fetching dates error:', err);
      reject();
    }
  });
};
