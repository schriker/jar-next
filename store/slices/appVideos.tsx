import { Video } from '../../types/video';
import { HYDRATE } from 'next-redux-wrapper';
import { createSlice } from '@reduxjs/toolkit';

type AppVideosStateType = {
  videos: Video[];
};

const appVideosInitialState: AppVideosStateType = {
  videos: [],
};

const videosSlice = createSlice({
  name: 'appVideos',
  initialState: appVideosInitialState,
  reducers: {
    setVideos(state, action: { type: string; payload: Video[] }) {
      state.videos = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.videos = action.payload.appVideos.videos;
    },
  },
});

export const { setVideos } = videosSlice.actions;

export default videosSlice.reducer;
