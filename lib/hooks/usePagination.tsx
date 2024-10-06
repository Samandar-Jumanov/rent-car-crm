import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store'; // Adjust this import based on your store setup
import { setCurrentPage, setPageSize, setTotalItems } from '../slices/pagination';

export const usePaginate = () => {
  const dispatch = useDispatch();
  const { currentPage, pageSize, totalItems } = useSelector((state: RootState) => state.pagination);

  const totalPages = Math.ceil(totalItems / pageSize);
  const currentDisplayStart = (currentPage - 1) * pageSize + 1;
  const currentDisplayEnd = Math.min(currentPage * pageSize, totalItems);

  return {
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    currentDisplayStart,
    currentDisplayEnd,
    setCurrentPage: (page: number) => dispatch(setCurrentPage(page)),
    setPageSize: (size: number) => dispatch(setPageSize(size)),
    setTotalItems: (total: number) => dispatch(setTotalItems(total)),
  };
};