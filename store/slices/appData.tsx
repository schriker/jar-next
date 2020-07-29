import { HYDRATE } from 'next-redux-wrapper';
import { Streamer } from 'types/streamer';
import { createSlice } from '@reduxjs/toolkit';

type AppDataStateType = {
  server: {
    streamers: string[];
    streamersData: Streamer[];
  };
  client: {
    hideWatched: boolean;
    streamers: string[];
    streamersData: Streamer[];
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

const appDataInitialState: AppDataStateType = {
  server: {
    streamers: ['wonziu'],
    streamersData: [],
  },
  client: {
    hideWatched: false,
    streamers: ['nvidiageforcepl'],
    streamersData: [],
    watched: [],
    bookmarksId: [],
    bookmarks: [],
    lastVisited: {},
    version: 3,
  },
};

const appDataSlice = createSlice({
  name: 'appData',
  initialState: appDataInitialState,
  reducers: {
    toggleHideWatched({ client }) {
      client.hideWatched = !client.hideWatched;
    },
    setServerStreamers(state, action: { type: string; payload: Streamer[] }) {
      state.server.streamersData = action.payload;
    },
    setClientStreamers(state, action: { type: string; payload: Streamer[] }) {
      state.client.streamersData = action.payload;
    },
    addServerStreamer(state, action: { type: string; payload: string }) {
      state.server.streamers.push(action.payload);
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

export const {
  toggleHideWatched,
  setServerStreamers,
  setClientStreamers,
  setAppData,
  addServerStreamer
} = appDataSlice.actions;

export default appDataSlice.reducer;
