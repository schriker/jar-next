import rootReducer, { RootState } from 'store/rootReducer';
import { ThunkAction } from 'redux-thunk';
import { configureStore, getDefaultMiddleware, Action } from '@reduxjs/toolkit';
import { localStorageMiddleware } from 'store/middlewares/localStorageMiddleware';
import { createWrapper } from 'next-redux-wrapper';

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

function initStore() {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [...getDefaultMiddleware(), localStorageMiddleware],
  });
}

export const wrapper = createWrapper(initStore);
