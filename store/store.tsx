import rootReducer, { RootState } from 'store/rootReducer';
import { ThunkAction } from 'redux-thunk';
import { configureStore, Action, Store } from '@reduxjs/toolkit';
import { syncDataMiddleware } from 'store/middlewares/syncDataMiddleware';
import { createWrapper } from 'next-redux-wrapper';

function initStore() {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === 'development' ? true : false,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(syncDataMiddleware),
  });
}

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

const makeStore = () => initStore();

export const wrapper = createWrapper<Store<RootState>>(makeStore);
