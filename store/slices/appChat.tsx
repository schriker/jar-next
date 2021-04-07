import { HYDRATE } from 'next-redux-wrapper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NoteType } from 'types/notes';

type AppChatStateType = {
  userNote: NoteType | null;
  showImg: boolean;
  showTime: boolean;
  showOptions: boolean;
  selectedAuthor: string;
  chatUsers: string[];
};

const appChatInitialState: AppChatStateType = {
  userNote: null,
  showImg: true,
  showTime: true,
  showOptions: false,
  selectedAuthor: '',
  chatUsers: [],
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
    addChatUser(state, { payload }: PayloadAction<string>) {
      state.chatUsers = [...new Set([...state.chatUsers, payload])];
    },
    setUserNote(state, { payload }: PayloadAction<NoteType | null>) {
      state.userNote = payload;
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
  setUserNote,
  addChatUser,
} = appChatSlice.actions;

export default appChatSlice.reducer;
