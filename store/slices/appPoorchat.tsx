import { HYDRATE } from 'next-redux-wrapper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PoorchatUser, PoorchatSubscription } from 'types/poorchat';

type AppPoorchatStateType = {
  user: PoorchatUser | null;
  subscription: PoorchatSubscription | null;
};

const appPoorchatInitialState: AppPoorchatStateType = {
  user: null,
  subscription: null,
};

const appPoorchatSlice = createSlice({
  name: 'appPoorchat',
  initialState: appPoorchatInitialState,
  reducers: {
    setPoorchatUser(
      state,
      {
        payload,
      }: PayloadAction<{
        user: PoorchatUser;
        subscription: PoorchatSubscription;
      }>
    ) {
      state.user = payload.user;
      state.subscription = payload.subscription;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.user = action.payload.appPoorchat.user;
      state.subscription = action.payload.appPoorchat.subscription;
    },
  },
});

export const { setPoorchatUser } = appPoorchatSlice.actions;

export default appPoorchatSlice.reducer;
