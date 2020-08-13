import { HYDRATE } from 'next-redux-wrapper';
import { Streamer } from 'types/streamer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppDataStateType = {
  server: {
    streamers: string[];
    streamersData: Streamer[];
    hideWatched: boolean;
  };
  client: {
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
    streamers: ['wonziu', 'nvidiageforcepl', 'bonkol'],
    streamersData: [],
    hideWatched: false,
  },
  client: {
    streamers: [],
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
    toggleHideWatched({ server }) {
      server.hideWatched = !server.hideWatched;
    },
    setServerStreamers(state, { payload }: PayloadAction<Streamer[]>) {
      state.server.streamersData = payload;
    },
    setClientStreamers(state, { payload }: PayloadAction<Streamer[]>) {
      state.client.streamersData = payload;
    },
    addServerStreamer(state, { payload }: PayloadAction<string>) {
      state.server.streamers.push(payload);
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
  addServerStreamer,
} = appDataSlice.actions;

export default appDataSlice.reducer;
