import { combineReducers } from '@reduxjs/toolkit';
import appDataReducer from './slices/appDataSlice';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

const rootReducer = combineReducers({
  appData: appDataReducer,
});

type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default rootReducer;
