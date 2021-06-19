import {combineReducers} from '@reduxjs/toolkit';
import photosReducer from './photoSlice';
const rootReducer = combineReducers({
  photos: photosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
