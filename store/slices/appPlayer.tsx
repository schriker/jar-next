import { HYDRATE } from 'next-redux-wrapper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppPlayerStateType = {
  isReady: boolean;
  startPlayer: boolean;
  finished: boolean;
  isPlaying: boolean;
  playerPosition: number;
  playbackRate: number;
  seekTo: number;
};

const appPlayerInitialState: AppPlayerStateType = {
  isReady: false,
  startPlayer: false,
  finished: false,
  isPlaying: false,
  playerPosition: 0,
  playbackRate: 1,
  seekTo: 0,
};

const appPlayerSlice = createSlice({
  name: 'appPlayer',
  initialState: appPlayerInitialState,
  reducers: {
    startPlayer(state, { payload }: PayloadAction<boolean>) {
      state.startPlayer = payload;
    },
    setReady(state, { payload }: PayloadAction<boolean>) {
      state.isReady = payload;
    },
    play(state, { payload }: PayloadAction<number>) {
      if (!state.isPlaying) {
        state.playerPosition = payload;
        state.isPlaying = true;
        state.finished = false;
        state.seekTo = 0;
      }
    },
    pause(state) {
      state.isPlaying = false;
    },
    buffer(state) {
      state.isPlaying = false;
    },
    end(state) {
      state.finished = true;
      state.isPlaying = false;
    },
    playbackRate(state, { payload }: PayloadAction<number>) {
      state.playbackRate = payload;
    },
    playbackRateChange(
      state,
      {
        payload,
      }: PayloadAction<{ playbackRate: number; playerPosition: number }>
    ) {
      state.playbackRate = payload.playbackRate;
      state.playerPosition = payload.playerPosition;
    },
    setPlayerPosition(state, { payload }: PayloadAction<number>) {
      state.playerPosition = payload;
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
  playbackRateChange,
  end,
  buffer,
  pause,
  error,
  startPlayer,
  setReady,
  setPlayerPosition,
} = appPlayerSlice.actions;

export default appPlayerSlice.reducer;
