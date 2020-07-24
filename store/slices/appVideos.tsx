import { Video } from 'types/video';
import { HYDRATE } from 'next-redux-wrapper';
import { createSlice } from '@reduxjs/toolkit';

type AppVideosStateType = {
  videos: Video[];
  count: number;
  paginationCursor: string;
};

const appVideosInitialState: AppVideosStateType = {
  videos: [],
  count: 0,
  paginationCursor: '',
};

const videosSlice = createSlice({
  name: 'appVideos',
  initialState: appVideosInitialState,
  reducers: {
    setVideos(state, action: { type: string; payload: AppVideosStateType }) {
      state.videos = action.payload.videos;
      state.count = action.payload.count;
      state.paginationCursor = action.payload.paginationCursor;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.videos = action.payload.appVideos.videos;
      state.count = action.payload.appVideos.count;
      state.paginationCursor = action.payload.appVideos.paginationCursor;
    },
  },
});

export const { setVideos } = videosSlice.actions;

export default videosSlice.reducer;
