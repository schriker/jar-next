import { HYDRATE } from 'next-redux-wrapper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  PoorchatUser,
  PoorchatSubscription,
  PoorchatBlockedUser,
} from 'types/poorchat';
import { AppThunk } from 'store/store';
import Cookies from 'js-cookie';

type AppPoorchatStateType = {
  user: PoorchatUser | null;
  subscription: PoorchatSubscription | null;
  blockedUsers: PoorchatBlockedUser[] | null;
};

const appPoorchatInitialState: AppPoorchatStateType = {
  user: null,
  subscription: null,
  blockedUsers: null,
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
        blockedUsers: PoorchatBlockedUser[];
      }>
    ) {
      state.user = payload.user;
      state.subscription = payload.subscription;
    },
    removePoorchatUser(state) {
      state.user = null;
      state.subscription = null;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.user = action.payload.appPoorchat.user;
      state.subscription = action.payload.appPoorchat.subscription;
      state.blockedUsers = action.payload.appPoorchat.blockedUsers;
    },
  },
});

export const { setPoorchatUser, removePoorchatUser } = appPoorchatSlice.actions;

export default appPoorchatSlice.reducer;

export const logoutPoorchatUser = (): AppThunk => async (dispatch) => {
  Cookies.remove('payload_cookie', {
    domain: '.jarchiwum.pl',
  });
  dispatch(removePoorchatUser());
};
