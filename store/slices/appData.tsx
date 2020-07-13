import { HYDRATE } from 'next-redux-wrapper';
import { Streamer } from '../../types/streamer';
import { createSlice } from '@reduxjs/toolkit';

type appData = {
  server: {
    streamers: string[];
    streamersData: Streamer[];
  };
  client: {
    hideWatched: boolean;
    streamers: string[];
    watched: string[];
    bookmarksId: string[];
    bookmarks: [];
    lastVisited: {
      [key: string]: {
        date: string;
      };
    };
    version: number;
  };
};

export const initialAppDataState: appData = {
  server: {
    streamers: ['wonziu'],
    streamersData: [],
  },
  client: {
    hideWatched: false,
    streamers: [],
    watched: [],
    bookmarksId: [],
    bookmarks: [],
    lastVisited: {},
    version: 3,
  },
};

const appDataSlice = createSlice({
  name: 'appData',
  initialState: initialAppDataState,
  reducers: {
    toggleHideWatched({ client }) {
      client.hideWatched = !client.hideWatched;
    },
    setServerStreamers(state, action: { type: string; payload: Streamer[] }) {
      state.server.streamersData = action.payload;
    },
    setAppData(state, action) {
      state.client = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.server = action.payload.appData.server;
    },
  },
});

export const { toggleHideWatched, setServerStreamers, setAppData } = appDataSlice.actions;

export default appDataSlice.reducer;
