import { API } from 'helpers/axios';
import qs from 'qs';
import mergeStreamersData from 'helpers/mergeStreamersData';
import { Streamer } from 'types/streamer';
import { Video } from 'types/video';
import {
  PoorchatUser,
  PoorchatSubscription,
  PoorchatBlockedUser,
} from 'types/poorchat';
import { ChatMessageType } from 'types/message';
import { ServerVideoQuery, TwitchVideoQuery } from 'types/api';
import { TwitchGame, TwitchStreamer, TwitchStream } from 'types/twitch';
import { NoteType } from 'types/notes';
import { v4 as uuidv4 } from 'uuid';

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
      if (!streamersData.some((streamer) => streamer.login === 'wonziu')) {
        streamersData.push({
          displayName: 'Wonziu',
          id: '0',
          isLive: false,
          login: 'wonziu',
          profileImage: '',
        });
      }
      resolve(streamersData);
    } catch (err) {
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
        video: {
          id: response.data.videos[0].videoId,
          ...response.data.videos[0],
        },
      });
    } catch (err) {
      reject();
    }
  });
};

export const fetchServerVideos = (
  query: ServerVideoQuery,
  body?: { watched: string[]; favourite: string[] }
) => {
  return new Promise<{ videos: Video[]; count: number }>(
    async (resolve, reject) => {
      try {
        const queryString = qs.stringify(query);
        const response = await API.post(`/videos_api?${queryString}`, {
          watched: body?.watched,
          favourite: body?.favourite,
        });
        resolve({
          videos: response.data.videos.map((video: any): Video => {
            return {
              id: video.videoId,
              duration: video.duration,
              started: video.started,
              thumbnail: video.thumbnail,
              title: video.title,
              views: video.views,
              screenshots: video.screenshots ? video.screenshots : [],
            };
          }),
          count: response.data.count,
        });
      } catch (err) {
        reject();
      }
    }
  );
};

export const fetchYouTubeVideo = (id: string) => {
  return new Promise<Video>(async (resolve, reject) => {
    try {
      const response = await API.get(`/video_youtube?id=${id}`);
      resolve({
        ...response.data,
      });
    } catch (error) {
      reject();
    }
  });
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
          videos: response.data.data.map((video: any): Video => {
            return {
              id: video.id,
              duration: video.duration,
              started: video.created_at,
              thumbnail: video.thumbnail_url,
              title: video.title,
              views: video.view_count,
            };
          }),
          paginationCursor: response.data.pagination.cursor,
        });
      } catch (err) {
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
      reject();
    }
  });
};

export const updateViews = (streamer: string, id: string) => {
  const queryString = qs.stringify({
    streamer: streamer,
    id: id,
  });
  if (streamer === 'wonziu') {
    API.get(`/updateviews?${queryString}`);
  }
};

export const fetchMessagesAuthors = (body: {
  lt: string;
  gt: string;
  streamer: string;
}) => {
  return new Promise<string[]>(async (resolve, reject) => {
    try {
      const response = await API.post(`/message/authors`, body);
      resolve(response.data);
    } catch (err) {
      reject();
    }
  });
};

export const fetchMessages = (body: {
  lt: string;
  gt: string;
  streamer: string;
}) => {
  return new Promise<ChatMessageType[]>(async (resolve, reject) => {
    try {
      const response = await API.post(`/message`, body);
      resolve(
        response.data.map((message: ChatMessageType) => ({
          ...message,
          uuid: uuidv4(),
        }))
      );
    } catch (err) {
      reject();
    }
  });
};

export const authCallback = (code: string) => {
  return new Promise<{
    user: PoorchatUser;
    subscription: PoorchatSubscription;
    cookies: string[];
  }>(async (resolve, reject) => {
    try {
      const response = await API.post(
        '/auth/callback',
        {
          code,
        },
        {
          withCredentials: true,
        }
      );
      resolve({ ...response.data, cookies: response.headers['set-cookie'] });
    } catch (err) {
      reject();
    }
  });
};

export const auth = (cookies: string | undefined) => {
  return new Promise<{
    user: PoorchatUser;
    subscription: PoorchatSubscription;
    blockedUsers: PoorchatBlockedUser[];
  }>(async (resolve, reject) => {
    try {
      const response = await API.get('/auth', {
        headers: {
          cookie: cookies,
        },
      });
      resolve(response.data);
    } catch (err) {
      reject();
    }
  });
};

export const fetchNotes = (id: string, timestamp: number) => {
  return new Promise<NoteType[]>(async (resolve, reject) => {
    try {
      const queryString = qs.stringify({
        streamer: 'wonziu',
        timestamp,
        id,
      });
      const response = await API.get(`/note?${queryString}`);
      resolve(
        response.data.map((note: NoteType) => ({
          ...note,
          uuid: uuidv4(),
        }))
      );
    } catch (err) {
      reject(err);
    }
  });
};

export const postNote = (note: {
  body: string;
  streamer: string;
  timestamp: number;
  video: string;
}) => {
  return new Promise<NoteType>(async (resolve, reject) => {
    try {
      const response = await API.post('/note', note, {
        withCredentials: true,
      });
      resolve({
        ...response.data,
        uuid: uuidv4(),
      });
    } catch (err) {
      reject(err);
    }
  });
};
