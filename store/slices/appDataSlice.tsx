import { createSlice } from '@reduxjs/toolkit';

type appData = {
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

export const initialAppDataState: appData = {
  hideWatched: false,
  streamers: ['wonziu'],
  watched: [],
  bookmarksId: [],
  bookmarks: [],
  lastVisited: {},
  version: 3,
};

const appDataSlice = createSlice({
  name: 'appData',
  initialState: initialAppDataState,
  reducers: {
    toggleHideWatched(state) {
      state.hideWatched = !state.hideWatched;
    },
  },
});

export const { toggleHideWatched } = appDataSlice.actions;

export default appDataSlice.reducer;
