import rootReducer from 'store/rootReducer';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { localStorageMiddleware } from 'store/middlewares/localStorageMiddleware';
import { createWrapper } from 'next-redux-wrapper';

function initStore() {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [...getDefaultMiddleware(), localStorageMiddleware],
  });
}

export const wrapper = createWrapper(initStore);
