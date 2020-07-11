import rootReducer from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

function reducer(state, action) {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return rootReducer(state, action);
  }
}

function initStore() {
  return configureStore({
    reducer: reducer,
    devTools: true,
  });
}

export const wrapper = createWrapper(initStore);
