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
    streamers: ['wonziu'],
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
    addClientStreamer(state, { payload }: PayloadAction<string>) {
      state.client.streamers.push(payload);
    },
    removeClientStreamer(state, { payload }: PayloadAction<string>) {
      state.client.streamers = state.client.streamers.filter(
        (streamer) => streamer !== payload
      );
      state.client.streamersData = state.client.streamersData.filter(
        (streamer) => streamer.login !== payload
      );
    },
    addServerStreamer(state, { payload }: PayloadAction<string>) {
      state.server.streamers.push(payload);
    },
    setAppData(state, action) {
      state.client = action.payload;
    },
    addWatched(state, { payload }: PayloadAction<string>) {
      state.client.watched.push(payload);
    },
    removeWatched(state, { payload }: PayloadAction<string>) {
      state.client.watched = state.client.watched.filter(
        (id) => id !== payload
      );
    },
    addBookmarked(state, { payload }: PayloadAction<string>) {
      state.client.bookmarksId.push(payload);
    },
    removeBookmarked(state, { payload }: PayloadAction<string>) {
      state.client.bookmarksId = state.client.bookmarksId.filter(
        (id) => id !== payload
      );
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
  addClientStreamer,
  removeClientStreamer,
  addServerStreamer,
  addWatched,
  removeWatched,
  addBookmarked,
  removeBookmarked,
} = appDataSlice.actions;

export default appDataSlice.reducer;
