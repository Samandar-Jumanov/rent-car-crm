import { createSlice  } from '@reduxjs/toolkit';



// example slice 
interface SidebarState {
  isOpen: boolean;
  theme: 'light' | 'dark';
}

const initialState: SidebarState = {
  isOpen: false,
  theme: 'dark',
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleSidebar, toggleTheme, } = sidebarSlice.actions;
export default sidebarSlice.reducer;