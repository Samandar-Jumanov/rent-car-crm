import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './slices/sidebar';
import rightSideBar from './slices/rightSideBar';
import  pagination from './slices/pagination';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    rightSideBar,
    pagination
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;