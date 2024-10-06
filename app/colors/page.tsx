"use client"

import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageContainer from '@/components/shared/PageContainer';
import RightSidebar from '@/components/shared/RightSidebar';
import { useBar } from '@/lib/hooks/useRightSide';
import { getAllColors, createColor, deleteColor } from '@/app/services/color';
import { ColorTableSkeleton } from '@/components/skeletons/color.skeleton';
import { CreateColor } from '@/components/forms/colors';
import { EmptyState } from '@/components/empty/color.empty';
import { IColor } from '@/types/color';
import { IServiceResponse } from '@/types/server.response';
import toast from 'react-hot-toast';
import Pagination from '@/components/Pagination';
import { usePaginate } from '@/lib/hooks/usePagination';

function Color() {
  const queryClient = useQueryClient();
  const { toggleBar } = useBar();
  const [editingColor, setEditingColor] = useState<IColor | null>(null);
  const [colorName, setColorName] = useState('');

  const { 
    currentPage, 
    pageSize, 
    totalPages, 
    setCurrentPage, 
    setTotalItems,
    currentDisplayStart, 
    currentDisplayEnd 
  } = usePaginate();

  // Queries
  const { data: colorsResponse, isLoading: colorsLoading, error: colorsError } = useQuery<IServiceResponse<{
    colors: IColor[],
    totalCount: number
  }>>({
    queryKey: ['colors', currentPage, pageSize],
    queryFn: () => getAllColors(currentPage, pageSize),
  });

  useEffect(() => {
    if (colorsResponse?.responseObject?.totalCount) {
      setTotalItems(colorsResponse.responseObject.totalCount);
    }
  }, [colorsResponse?.responseObject?.totalCount, setTotalItems]);

  const createMutation = useMutation({
    mutationFn: createColor,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['colors'] });
        toast.success('Color created successfully');
        toggleBar();
      }
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteColor,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['colors'] });
        toast.success('Color deleted successfully');
      }
    },
    onError: () => {
      toast.error('Failed to delete color');
    }
  });

  const handleCreateClick = () => {
    setEditingColor(null);
    setColorName('');
    toggleBar();
  };

  const handleSubmit = () => {
    if (!colorName.trim()) {
      toast.error('Color name is required');
      return;
    }
    createMutation.mutate({ color : colorName });
  };

  if (colorsLoading) return <ColorTableSkeleton />;
  if (colorsError) return <div className="text-center text-red-600 py-10">Error loading data</div>;

  const { carColors, totalCount } = colorsResponse?.responseObject || { colors: [], totalCount: 0 };
  const isEmpty = carColors.length === 0;

  return (
    <PageContainer 
      title="Ranglar"
      action={!isEmpty && (
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleCreateClick}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Rang yaratish
        </Button>
      )}
    >
      <div className="p-6 max-w-[1200px] mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {isEmpty ? (
            <EmptyState onCreateClick={handleCreateClick} />
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">№</TableHead>
                    <TableHead>Rang nomi</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {carColors.map((color: IColor, index: number) => (
                    <TableRow key={color.id}>
                      <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                      <TableCell>{color.color}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingColor(color);
                              setColorName(color.color);
                              toggleBar();
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteMutation.mutate(color.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center p-4">
                <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                  Showing {currentDisplayStart} to {currentDisplayEnd} of {totalCount} colors
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <RightSidebar 
        title={editingColor ? 'Edit Color' : 'Create Color'}
        onSubmit={handleSubmit}
        loadingState={createMutation.isPending}
      >
        <CreateColor 
          colorName={colorName}
          setColor={setColorName}
        />
      </RightSidebar>
    </PageContainer>
  );
}

export default Color;