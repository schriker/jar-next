import rootReducer from 'store/rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

function initStore() {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  });
}

export const wrapper = createWrapper(initStore);
