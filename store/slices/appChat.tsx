import { HYDRATE } from 'next-redux-wrapper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NoteType } from 'types/notes';
import { Video } from 'types/video';
import { AppThunk } from 'store/store';
import { fetchMessagesAuthors } from 'helpers/api';
import moment from 'moment';

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
    setChatUsers(state, { payload }: PayloadAction<string[]>) {
      state.chatUsers = payload;
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
  setChatUsers,
} = appChatSlice.actions;

export default appChatSlice.reducer;

export const getMessagesAuthors = (video: Video): AppThunk => async (
  dispatch
) => {
  try {
    const response = await fetchMessagesAuthors({
      streamer: 'wonziu',
      gt: video.started,
      lt: video.createdAt
        ? video.createdAt
        : moment(video.started).add(48, 'hours').toISOString(),
    });

    dispatch(setChatUsers(response));
  } catch (error) {
    console.log(error);
  }
};
