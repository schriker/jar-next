import { Middleware } from '@reduxjs/toolkit';
import getObjectByString from 'helpers/getObjectByString';

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
];

export const localStorageMiddleware: Middleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    const [actionToSave] = persistStore.filter(
      (item) => item.action === result.type
    );
    if (actionToSave) {
      localStorage.setItem(
        actionToSave.key,
        JSON.stringify(getObjectByString(getState(), actionToSave.stateName))
      );
    }
    return result;
  };
};
