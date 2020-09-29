import { HYDRATE } from 'next-redux-wrapper';
import { Streamer } from 'types/streamer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'store/store';
import { fetchStreamersData } from 'helpers/api';

type AppDataStateType = {
  server: {
    streamers: string[];
    streamersData: Streamer[];
    hideWatched: boolean;
  };
  client: {
    isFetching: boolean;
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

export const appDataInitialState: AppDataStateType = {
  server: {
    streamers: ['wonziu'],
    streamersData: [],
    hideWatched: false,
  },
  client: {
    isFetching: false,
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
    addClientStreamer(state, { payload }: PayloadAction<string[]>) {
      state.client.streamers = payload;
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
      state.client = { ...state.client, ...action.payload };
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
    setIsFetching(state, { payload }: PayloadAction<boolean>) {
      state.client.isFetching = payload;
    },
    removeBookmarked(state, { payload }: PayloadAction<string>) {
      state.client.bookmarksId = state.client.bookmarksId.filter(
        (id) => id !== payload
      );
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.server.streamers = action.payload.appData.server.streamers;
      state.server.streamersData = action.payload.appData.server.streamersData;
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
  setIsFetching,
} = appDataSlice.actions;

export default appDataSlice.reducer;

export const addStreamer = (streamer: string[]): AppThunk => async (dispatch) => {
  try {
    if (streamer.length && streamer.length < 100) {
      const response = await fetchStreamersData(streamer);
      dispatch(setClientStreamers(response));
      dispatch(addClientStreamer(streamer.filter(streamer => {
        return response.some(value => value.login === streamer)
      })));
      dispatch(setIsFetching(false));
    }
  } catch (error) {
    dispatch(setIsFetching(false));
  }
}
