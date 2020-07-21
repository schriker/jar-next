import { combineReducers } from '@reduxjs/toolkit';
import appVideosReducer from './slices/appVideos';
import appDataReducer from './slices/appData';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

const rootReducer = combineReducers({
  appData: appDataReducer,
  appVideos: appVideosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
