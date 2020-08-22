import {
  Middleware,
  Action,
  ThunkAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import getObjectByString from 'helpers/getObjectByString';
import { RootState } from 'store/rootReducer';
import { appFirebaseSaveData } from 'store/slices/appFirebase';

const persistStore = [
  {
    action: 'appChat/toggleTime',
    key: 'chatOptions',
    stateName: 'appChat',
  },
  {
    action: 'appChat/toggleImage',
    key: 'chatOptions',
    stateName: 'appChat',
  },
  {
    action: 'appData/addWatched',
    key: 'jarchiwumData',
    stateName: 'appData.client',
  },
  {
    action: 'appData/removeWatched',
    key: 'jarchiwumData',
    stateName: 'appData.client',
  },
  {
    action: 'appData/addBookmarked',
    key: 'jarchiwumData',
    stateName: 'appData.client',
  },
  {
    action: 'appData/removeBookmarked',
    key: 'jarchiwumData',
    stateName: 'appData.client',
  },
  {
    action: 'appData/addClientStreamer',
    key: 'jarchiwumData',
    stateName: 'appData.client',
  },
  {
    action: 'appData/removeClientStreamer',
    key: 'jarchiwumData',
    stateName: 'appData.client',
  },
];

export const syncDataMiddleware: Middleware<
  {},
  RootState,
  ThunkDispatch<RootState, unknown, Action>
> = ({ getState, dispatch }) => {
  return (next) => (action) => {
    const result = next(action);
    const state: RootState = getState();

    const [actionToSave] = persistStore.filter(
      (item) => item.action === result.type
    );
    if (actionToSave && !state.appFirebase.uid) {
      localStorage.setItem(
        actionToSave.key,
        JSON.stringify(getObjectByString(state, actionToSave.stateName))
      );
    } else if (actionToSave) {
      dispatch(appFirebaseSaveData());
    }
    return result;
  };
};
