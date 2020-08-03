import { HYDRATE } from 'next-redux-wrapper';
import { createSlice } from '@reduxjs/toolkit';

type AppPlayerStateType = {
  player: any;
  finished: boolean;
  isPlaying: boolean;
  playerPosition: number;
  playbackRate: number;
  seekTo: number;
};

const appPlayerInitialState: AppPlayerStateType = {
  player: null,
  finished: false,
  isPlaying: false,
  playerPosition: 0,
  playbackRate: 1,
  seekTo: 0,
};

const appPlayerSlice = createSlice({
  name: 'appNotification',
  initialState: appPlayerInitialState,
  reducers: {
    setPlayer(state, action: { type: string; payload: any }) {
      state.player = action.payload;
    },
    play(state, action: { type: string; payload: number }) {
      if (!state.isPlaying) {
        state.playerPosition = action.payload;
        state.isPlaying = true;
        state.finished = false;
        state.seekTo = 0;
      }
    },
    pause(state, action: { type: string; payload: number }) {
      if (action.payload) {
        state.playerPosition = action.payload;
      }
      state.isPlaying = false;
    },
    buffer(state) {
      state.isPlaying = false;
    },
    end(state) {
      state.finished = true;
      state.isPlaying = false;
    },
    playbackRate(state, action: { type: string; payload: number }) {
      state.playbackRate = action.payload;
    },
    error(state) {
      state.isPlaying = false;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state = { ...action.payload.appPlayer };
    },
  },
});

export const {
  play,
  playbackRate,
  end,
  buffer,
  pause,
  error,
  setPlayer,
} = appPlayerSlice.actions;

export default appPlayerSlice.reducer;
