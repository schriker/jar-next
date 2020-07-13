import { combineReducers } from '@reduxjs/toolkit';
import appDataReducer from './slices/appData';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

const rootReducer = combineReducers({
  appData: appDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
