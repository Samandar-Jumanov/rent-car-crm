"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import PageContainer from '@/components/shared/PageContainer';
import RightSidebar from '@/components/shared/RightSidebar';
import { useBar } from '@/lib/hooks/useRightSide';
import { getAllBrands, createBrand, deleteBrand, updateBrand } from '../services/rent-cars';
import { RentCarTableSkeleton } from '@/components/skeletons/rent-car.skeleton';
import RentCarForm from '@/components/forms/rent-car';
import { EmptyState } from '@/components/empty/rent-car.empty';
import { RentCarTable } from '@/components/tables/rent-car.table';
import { IRentCar } from '@/types/rent-car';
import { IServiceResponse } from '@/types/server.response';
import toast from 'react-hot-toast';
import Pagination from '@/components/Pagination';
import { usePaginate } from '@/lib/hooks/usePagination';

const initialFormData = {
  name: '',
  phone: '',
  password: '',
  logo: '',
  regionId: '',
  cityId: '',
};

function RentCars() {
  const queryClient = useQueryClient();
  const { isOpen, toggleBar } = useBar();
  const [editingBrand, setEditingBrand] = useState<IRentCar | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  const { 
    currentPage, 
    pageSize, 
    totalPages, 
    setCurrentPage, 
    setTotalItems,
    currentDisplayStart, 
    currentDisplayEnd 
  } = usePaginate();

  const { data: brandsResponse, isLoading: brandsLoading, error: brandsError } = useQuery<IServiceResponse<{
    brands: IRentCar[],
    totalCount: number
  }>>({
    queryKey: ['brands', currentPage, pageSize],
    queryFn: () => getAllBrands(currentPage, pageSize),
  });

  useEffect(() => {
    if (brandsResponse?.responseObject?.totalCount) {
      setTotalItems(brandsResponse.responseObject.totalCount);
    }
  }, [brandsResponse?.responseObject?.totalCount, setTotalItems]);

  const createMutation = useMutation({
    mutationFn: createBrand,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['brands'] });
        toast.success('Brand created successfully');
        toggleBar();
        setFormData(initialFormData);
      }
    },

    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const updateMutation = useMutation({
  mutationFn: updateBrand,
  onSuccess: (response) => {
    if (response.success) {
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast.success('Brand updated successfully');
      toggleBar();
      setEditingBrand(null);
      setFormData(initialFormData);
    }
  },
  onError: (error: Error) => {
    toast.error(error.message);
  }
});

  const deleteMutation = useMutation({
    mutationFn: deleteBrand,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['brands'] });
        toast.success('Brand deleted successfully');
      } else if (typeof response === 'string') {
        toast.error("404 not found");
      }
    },
    onError: () => {
      toast.error('Failed to delete brand');
    }
  });

  const handleCreateClick = useCallback(() => {
    setEditingBrand(null);
    setFormData(initialFormData);
    toggleBar();
  }, [toggleBar]);

  const handleEditClick = useCallback((brand: IRentCar) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.brendName,
      phone: brand.ownerNumber,
      password: '', // Assuming we don't want to pre-fill the password
      logo: brand.logo,
      regionId: brand.city.regionId,
      cityId: brand.city.id,
    });
    toggleBar();
  }, [toggleBar]);

  const handleSubmit = useCallback(() => {
    const data = {
      id: editingBrand ? editingBrand.id : '', 
      brendName: formData.name,
      ownerNumber: formData.phone,
      password: formData.password,
      logo: formData.logo,
      regionId: formData.regionId,
      cityId: formData.cityId,
    };
    
    if (editingBrand) {
      updateMutation.mutate( data );
    } else {
      createMutation.mutate(data);
    }
  }, [formData, createMutation, updateMutation, editingBrand]);

  const handleInputChange = useCallback((name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  if (brandsLoading) return <RentCarTableSkeleton />;
  if (brandsError) return <div className="text-center text-red-600 py-10">Error loading data</div>;

  const { brands, totalCount } = brandsResponse?.responseObject || { brands: [], totalCount: 0 };
  const isEmpty = brands.length === 0;

  return (
    <PageContainer 
      title="Rent carlar"
      action={!isEmpty && (
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleCreateClick}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          + Rent car 
        </Button>
      )}
    >
      <div className="p-6 max-w-[1200px] mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {isEmpty ? (
            <EmptyState onCreateClick={handleCreateClick} />
          ) : (
            <>
              <RentCarTable 
                brands={brands}
                onDelete={(id) => deleteMutation.mutate(id)}
                onEdit={handleEditClick}
                loading={deleteMutation.isPending}
                setLoading={() => {}}
              />
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

      {isOpen && (
        <RightSidebar 
          title={editingBrand ? 'Rent carni tahrirlash' : 'Yangi yaratish'}
          onSubmit={handleSubmit}
          loadingState={createMutation.isPending || updateMutation.isPending}
        >
          <RentCarForm 
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </RightSidebar>
      )}
    </PageContainer>
  );
}

export default RentCars;