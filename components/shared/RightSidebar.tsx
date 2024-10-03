"use client"

import React from 'react';
import { useBar } from '@/lib/hooks/useRightSide';
import { Button } from "@/components/ui/button";




interface RightSidebarProps {
  children: React.ReactNode;
  onSubmit: ( ) => void;
  title?: string;
  loadingState?: boolean;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ children, onSubmit, title = "Sidebar" , loadingState=false }) => {
  const { isOpen, toggleBar } = useBar();

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } flex flex-col`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <div className="flex-grow overflow-y-auto p-6">
        {children}
      </div>

      <div className="border-t p-4 flex  space-x-4 justify-between">
        <Button variant="outline" onClick={toggleBar}>
          Ortga
        </Button>
        <Button onClick={() => {
          onSubmit();
          if(!loadingState) {
            toggleBar();
          }
        }}>
          { loadingState ? "Loading..." : "  Yaratish"}
        </Button>
      </div>
    </div>
  );
};

export default RightSidebar;