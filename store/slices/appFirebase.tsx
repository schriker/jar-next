import { HYDRATE } from 'next-redux-wrapper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'store/store';
import {
  firebaseErrorHandler,
  firebaseSignIn,
  firebaseCreateUser,
  firebaseSignOut,
  firebaseAuthStateChange,
} from 'helpers/firebase';
import { FirebaseUserCredentials } from 'types/firebase';

type AppFirebaseStateType = {
  uid: string | null;
};

const appFirebaseInitialState: AppFirebaseStateType = {
  uid: null,
};

const appFirebaseSlice = createSlice({
  name: 'appFirebase',
  initialState: appFirebaseInitialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<string>) {
      state.uid = payload;
    },
    logOutUser(state) {
      state.uid = null;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.uid = action.payload.appFirebase.uid;
    },
  },
});

export const { setUser, logOutUser } = appFirebaseSlice.actions;

export default appFirebaseSlice.reducer;

export const appFirebaseSignIn = ({
  email,
  password,
}: FirebaseUserCredentials) =>
  new Promise(async (resolve, reject) => {
    try {
      await firebaseSignIn({ email, password });
      resolve();
    } catch (error) {
      const message = firebaseErrorHandler(error.code);
      reject(message);
    }
  });

export const appFirebaseCreateUser = ({
  email,
  password,
}: FirebaseUserCredentials) =>
  new Promise(async (resolve, reject) => {
    try {
      await firebaseCreateUser({ email, password });
      resolve();
    } catch (error) {
      const message = firebaseErrorHandler(error.code);
      reject(message);
    }
  });

export const appFirebaseAuthStateChanged = (): AppThunk => (dispatch) => {
  firebaseAuthStateChange((user) => {
    if (user) {
      dispatch(setUser(user.uid));
    } else {
      dispatch(logOutUser());
    }
  });
};

export const appFirebaseSignOut = (): AppThunk => async (dispatch) => {
  firebaseSignOut();
};
