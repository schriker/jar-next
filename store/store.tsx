import rootReducer, { RootState } from 'store/rootReducer';
import { ThunkAction } from 'redux-thunk';
import { configureStore, Action } from '@reduxjs/toolkit';
import { syncDataMiddleware } from 'store/middlewares/syncDataMiddleware';
import { createWrapper } from 'next-redux-wrapper';

function initStore() {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(syncDataMiddleware),
  });
}

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const wrapper = createWrapper(initStore);
