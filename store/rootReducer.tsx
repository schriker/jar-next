import { combineReducers } from '@reduxjs/toolkit';
import appDataReducer from './slices/appData';
import appVideosReducer from './slices/appVideos';
import appNotificationReducer from './slices/appNotification';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

const rootReducer = combineReducers({
  appData: appDataReducer,
  appVideos: appVideosReducer,
  appNotification: appNotificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
