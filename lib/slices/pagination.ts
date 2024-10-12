import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  pageSize: 10,
  totalItems: 0,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.currentPage = 1; // Reset to first page when changing page size
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
    resetPagination: () => {
      return initialState;
    },
  },
});

export const { setCurrentPage, setPageSize, setTotalItems, resetPagination } = paginationSlice.actions;
export default paginationSlice.reducer;