import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, toggleTheme } from '../slices/sidebar';
import { RootState } from '../store'; 

export const useSidebar = () => {
  const dispatch = useDispatch();
  const { isOpen, theme } = useSelector((state: RootState) => state.sidebar);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return {
    isOpen,
    theme,
    toggleSidebar: handleToggleSidebar,
    toggleTheme: handleToggleTheme,
  };
};