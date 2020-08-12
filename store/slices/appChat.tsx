import { HYDRATE } from 'next-redux-wrapper';
import { createSlice } from '@reduxjs/toolkit';

type AppChatStateType = {
  showImg: boolean;
  showTime: boolean;
  showOptions: boolean;
  selectedAuthor: string;
};

const appChatInitialState: AppChatStateType = {
  showImg: true,
  showTime: true,
  showOptions: false,
  selectedAuthor: '',
};

const appChatSlice = createSlice({
  name: 'appChat',
  initialState: appChatInitialState,
  reducers: {
    setChatOptions(
      state,
      action: { type: string; payload: { showImg: boolean; showTime: boolean } }
    ) {
      state.showImg = action.payload.showImg;
      state.showTime = action.payload.showTime;
    },
    setSelectedAuthor(state, action: { type: string; payload: string }) {
      state.selectedAuthor = action.payload;
    },
    toggleOptions(state) {
      state.showOptions = !state.showOptions;
    },
    toggleTime(state) {
      state.showTime = !state.showTime;
    },
    toggleImage(state) {
      state.showImg = !state.showImg;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state = { ...action.payload.appChat };
    },
  },
});

export const {
  setChatOptions,
  setSelectedAuthor,
  toggleImage,
  toggleTime,
  toggleOptions,
} = appChatSlice.actions;

export default appChatSlice.reducer;
