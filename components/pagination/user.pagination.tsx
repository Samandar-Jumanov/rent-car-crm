
"use client"
import React from 'react';
import { Button } from "@/components/ui/button";
import { IPaginationProps } from '@/types/user';

export const UserPagination: React.FC<IPaginationProps> = ({ currentPage, setCurrentPage, hasMore }) => (
    <div className="mt-4 flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Page {currentPage}
      </div>
      <div className="space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </Button>
        <Button variant="outline" size="sm">{currentPage}</Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={!hasMore}
        >
          &gt;
        </Button>
      </div>
    </div>
  );
  