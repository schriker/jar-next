import { HYDRATE } from 'next-redux-wrapper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppNotificationStateType = {
  isOpen: boolean;
  message: string;
};

const appNotificationInitialState: AppNotificationStateType = {
  isOpen: false,
  message: '',
};

const appNotificationSlice = createSlice({
  name: 'appNotification',
  initialState: appNotificationInitialState,
  reducers: {
    setNotification(state, { payload }: PayloadAction<string>) {
      state.isOpen = true;
      state.message = payload;
    },
    clearNotification(state) {
      state.isOpen = false;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.isOpen = action.payload.appNotification.isOpen;
      state.message = action.payload.appNotification.message;
    },
  },
});

export const {
  setNotification,
  clearNotification,
} = appNotificationSlice.actions;

export default appNotificationSlice.reducer;
