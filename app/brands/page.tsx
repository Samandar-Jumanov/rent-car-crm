"use client"

import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageContainer from '@/components/shared/PageContainer';
import RightSidebar from '@/components/shared/RightSidebar';
import { useBar } from '@/lib/hooks/useRightSide';
import { getAllCarBrands, createCarBrand, deleteCarBrand } from '@/app/services/carBrend';
import { CarBrandTableSkeleton } from '@/components/skeletons/car-brand.skeleton';
import { CarBrandForm } from '@/components/forms/brand';
import { EmptyState } from '@/components/empty/car-brand';
import { ICarBrand } from '@/types/car.brand';
import { IServiceResponse } from '@/types/server.response';
import toast from 'react-hot-toast';
import Pagination from '@/components/Pagination';
import { usePaginate } from '@/lib/hooks/usePagination';

interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
}

function CarBrands() {
  const queryClient = useQueryClient();
  const { toggleBar } = useBar();
  const [editingBrand, setEditingBrand] = useState<ICarBrand | null>(null);
  const [brandName, setBrandName] = useState('');

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
  const { data: brandsResponse, isLoading: brandsLoading, error: brandsError } = useQuery<IServiceResponse<PaginatedResponse<ICarBrand>>>({
    queryKey: ['car-brands', currentPage, pageSize],
    queryFn: () => getAllCarBrands(currentPage, pageSize),
  });

  useEffect(() => {
    if (brandsResponse?.responseObject?.totalCount) {
      setTotalItems(brandsResponse.responseObject.totalCount);
    }
  }, [brandsResponse?.responseObject?.totalCount, setTotalItems]);

  const createMutation = useMutation({
    mutationFn: createCarBrand,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['car-brands'] });
        toast.success('Brand created successfully');
        toggleBar();
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCarBrand,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['car-brands'] });
        toast.success('Brand deleted successfully');
      }
    },
    onError: () => {
      toast.error('Failed to delete brand');
    }
  });

  const handleCreateClick = () => {
    setEditingBrand(null);
    setBrandName('');
    toggleBar();
  };

  const handleSubmit = () => {
    if (!brandName.trim()) {
      toast.error('Brand name is required');
      return;
    }
    createMutation.mutate({ brandName });
  };

  if (brandsLoading) return <CarBrandTableSkeleton />;
  if (brandsError) return <div className="text-center text-red-600 py-10">Error loading data</div>;

  const {  carBrands, totalCount } = brandsResponse?.responseObject || { items: [], totalCount: 0 };
  const isEmpty = carBrands.length === 0;

  return (
    <PageContainer 
      title="Car Brands"
      action={!isEmpty && (
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleCreateClick}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Brand
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
                    <TableHead>№</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {carBrands.map((brand: ICarBrand, index: number) => (
                    <TableRow key={brand.id}>
                      <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                      <TableCell>{brand.carBrend}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingBrand(brand);
                              setBrandName(brand.carBrend);
                              toggleBar();
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteMutation.mutate(brand.id)}
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
                  Showing {currentDisplayStart} to {currentDisplayEnd} of {totalCount} brands
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
        title={editingBrand ? 'Edit Brand' : 'Create Brand'}
        onSubmit={handleSubmit}
        loadingState={createMutation.isPending}
      >
        <CarBrandForm 
          brandName={brandName}
          onBrandNameChange={setBrandName}
        />
      </RightSidebar>
    </PageContainer>
  );
}

export default CarBrands;