import { API } from './axios';
import qs from 'qs';

export const fetchStreamers = (streamers: string[]): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryString = qs.stringify({
        login: streamers,
      });
      const response = await API.get(`/users?${queryString}`);
      resolve(response.data);
    } catch(err) {
      console.log(err)
      reject()
    }
  });
};

export const fetchStreams = (streamers: string[]): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryString = qs.stringify({
        user_login: streamers,
      });
      const response = await API.get(`/streams?${queryString}`);
      resolve(response.data);
    } catch(err) {
      console.log(err)
      reject()
    }
  });
};

export const fetchGames = (games: string[]): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const queryString = qs.stringify({
        id: games,
      });
      const response = await API.get(`/games?${queryString}`);
      resolve(response.data);
    } catch(err) {
      console.log(err)
      reject()
    }
  });
};
