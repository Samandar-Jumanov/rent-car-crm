"use client"

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleBar } from '../slices/rightSideBar';

export const useBar = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.rightSideBar);

  return {
    isOpen,
    toggleBar: () => dispatch(toggleBar()),
  };
};