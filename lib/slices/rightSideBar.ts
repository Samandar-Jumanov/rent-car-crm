import { createSlice  } from '@reduxjs/toolkit';

interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleBar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleBar, } = sidebarSlice.actions;
export default sidebarSlice.reducer;