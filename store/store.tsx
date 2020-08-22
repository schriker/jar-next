import rootReducer, { RootState } from 'store/rootReducer';
import { ThunkAction } from 'redux-thunk';
import { configureStore, Action } from '@reduxjs/toolkit';
import { syncDataMiddleware } from 'store/middlewares/syncDataMiddleware';
import { createWrapper } from 'next-redux-wrapper';

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(syncDataMiddleware),
});

function initStore() {
  return store;
}

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const wrapper = createWrapper(initStore);
