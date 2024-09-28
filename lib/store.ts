import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './slices/sidebar';
import rightSideBar from './slices/rightSideBar';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    rightSideBar
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;