import { HYDRATE } from 'next-redux-wrapper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
      { payload }: PayloadAction<{ showImg: boolean; showTime: boolean }>
    ) {
      state.showImg = payload.showImg;
      state.showTime = payload.showTime;
    },
    setSelectedAuthor(state, { payload }: PayloadAction<string>) {
      state.selectedAuthor = payload;
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
