import { HYDRATE } from 'next-redux-wrapper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'store/store';
import {
  firestore,
  firebaseErrorHandler,
  firebaseSignIn,
  firebaseCreateUser,
  firebaseSignOut,
  firebaseAuthStateChange,
} from 'helpers/firebase';
import { FirebaseUserCredentials } from 'types/firebase';
import { setChatOptions } from 'store/slices/appChat';
import {
  setAppData,
  appDataInitialState,
  addStreamer,
} from 'store/slices/appData';

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
  new Promise<void>(async (resolve, reject) => {
    try {
      await firebaseSignIn({ email, password });
      resolve();
    } catch (error: any) {
      const message = firebaseErrorHandler(error.code);
      reject(message);
    }
  });

export const appFirebaseCreateUser = ({
  email,
  password,
}: FirebaseUserCredentials) =>
  new Promise<void>(async (resolve, reject) => {
    try {
      await firebaseCreateUser({ email, password });
      resolve();
    } catch (error: any) {
      const message = firebaseErrorHandler(error.code);
      reject(message);
    }
  });

export const appFirebaseAuthStateChanged = (): AppThunk => (
  dispatch,
  getState
) => {
  firebaseAuthStateChange(async (user) => {
    const { appData } = getState();
    if (user) {
      dispatch(setUser(user.uid));
      const userRef = firestore.collection('users').doc(user.uid);
      userRef.get().then((user) => {
        if (user.exists) {
          const userData = user.data() || appDataInitialState.client;
          const payload = {
            streamers: userData.streamers
              ? userData.streamers.filter(
                  (streamer: string) =>
                    !appData.server.streamers.includes(streamer) ||
                    !appData.client.streamers.includes(streamer)
                )
              : [],
            watched: userData.watched || [],
            bookmarksId: userData.bookmarksId || [],
          };
          dispatch(setAppData(payload));
          dispatch(addStreamer(payload.streamers));
          if (userData.appChat) {
            dispatch(
              setChatOptions({
                showImg: userData.appChat.showImg,
                showTime: userData.appChat.showTime,
              })
            );
          }
        }
      });
    } else {
      const localUserData = localStorage.getItem('jarchiwumData');
      const localChatOptions = localStorage.getItem('chatOptions');
      if (localChatOptions) {
        const chatOptions = JSON.parse(localChatOptions);
        dispatch(setChatOptions(chatOptions));
      } else {
        dispatch(setChatOptions({ showImg: true, showTime: true }));
      }
      if (localUserData) {
        const userData = JSON.parse(localUserData);
        const payload = {
          ...userData,
          streamers: userData.streamers.filter(
            (streamer: string) =>
              !appData.server.streamers.includes(streamer) ||
              !appData.client.streamers.includes(streamer)
          ),
        };
        dispatch(setAppData(payload));
        dispatch(addStreamer(payload.streamers));
      } else {
        dispatch(setAppData(appDataInitialState.client));
        dispatch(addStreamer(appDataInitialState.client.streamers));
      }
      dispatch(logOutUser());
    }
  });
};

export const appFirebaseSaveData = (): AppThunk => async (_, getState) => {
  const state = getState();
  if (state.appFirebase.uid) {
    firestore
      .collection('users')
      .doc(state.appFirebase.uid)
      .set({ ...state.appData.client, appChat: { ...state.appChat } });
  }
};

export const appFirebaseSignOut = (): AppThunk => async () => {
  firebaseSignOut();
};
