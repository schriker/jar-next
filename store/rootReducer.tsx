import { combineReducers } from '@reduxjs/toolkit';
import appDataReducer from 'store/slices/appData';
import appVideosReducer from 'store/slices/appVideos';
import appPlayerReducer from 'store/slices/appPlayer';
import appChatReducer from 'store/slices/appChat';
import appNotificationReducer from 'store/slices/appNotification';
import appPoorchatReducer from 'store/slices/appPoorchat';
import appFirebaseReducer from 'store/slices/appFirebase';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

const rootReducer = combineReducers({
  appData: appDataReducer,
  appVideos: appVideosReducer,
  appPlayer: appPlayerReducer,
  appChat: appChatReducer,
  appPoorchat: appPoorchatReducer,
  appFirebase: appFirebaseReducer,
  appNotification: appNotificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
