import { Middleware } from '@reduxjs/toolkit';

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
        JSON.stringify(getState()[actionToSave.stateName])
      );
    }
    return result;
  };
};
