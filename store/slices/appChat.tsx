import { HYDRATE } from 'next-redux-wrapper';
import { createSlice } from '@reduxjs/toolkit';

type AppChatStateType = {
  showImg: boolean;
  showTime: boolean;
  selectedAuthor: string;
};

const appChatInitialState: AppChatStateType = {
  showImg: true,
  showTime: true,
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
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state = { ...action.payload.appChat };
    },
  },
});

export const { setChatOptions, setSelectedAuthor } = appChatSlice.actions;

export default appChatSlice.reducer;
