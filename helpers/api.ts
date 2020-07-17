import { API } from './axios';
import qs from 'qs';
import mergeStreamersData from './mergeStreamersData';
import { Streamer } from '../types/streamer';
import { Video } from '../types/video';
import { TwitchGame, TwitchStreamer, TwitchStream } from '../types/twitch';
import { resolve } from 'path';
import { rejects } from 'assert';

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

export const fetchServerVideos = (streamer: string, page: number) => {
  return new Promise<Video[]>(async (resolve, reject) => {
    try {
      const videoPerPage = 20;
      const videos = await API.get(
        `/videos_api?streamer=${streamer}&per_page=${videoPerPage}&page=${page}`
      );
      resolve(
        videos.data.map(
          (video: any): Video => {
            return {
              _id: video._id,
              duration: video.duration,
              started: video.started,
              thumbnail: video.thumbnail,
              title: video.title,
              views: video.views,
              screenShots: video.screenShots ? video.screenShots : [],
            };
          }
        )
      );
    } catch (err) {
      console.log('Fetching server videos error:', err.response);
      reject();
    }
  });
};

export const fetchTwitchVideos = (streamerId: string) => {
  return new Promise<Video[]>(async (resolve, reject) => {
    try {
      const queryString = qs.stringify({
        user_id: streamerId,
        first: 20,
      });
      const videos = await API.get(`/videos_twitch?${queryString}`);
      resolve(
        videos.data.data.map((video: any): Video => {
          return {
            _id: video.id,
            duration: video.duration,
            started: video.created_at,
            thumbnail: video.thumbnail_url,
            title: video.title,
            views: video.view_count,
          }
        })
      )
    } catch (err) {
      console.log('Fetching twitch videos error:', err);
      reject();
    }
  });
};
