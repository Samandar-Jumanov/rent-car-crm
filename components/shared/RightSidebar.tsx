import React from 'react';
import { useBar } from '@/lib/hooks/useRightSide';


const RightSidebar = ({ children } : { children : React.ReactNode}) => {
    const { isOpen } = useBar()

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex">
      <div
        className={`transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full">
         
          <div className="w-64 md:w-80 bg-background border-l border-input shadow-lg overflow-y-auto">
            <div className="p-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;