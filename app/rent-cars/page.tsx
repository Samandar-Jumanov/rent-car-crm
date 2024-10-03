"use client"

import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import PageContainer from '@/components/shared/PageContainer';
import RightSidebar from '@/components/shared/RightSidebar';
import { useBar } from '@/lib/hooks/useRightSide';
import { getAllBrands, createBrand , deleteBrand } from '../services/rent-cars';
import { RentCarTableSkeleton } from '@/components/skeletons/rent-car.skeleton';
import { RentCarForm } from '@/components/forms/rent-car';
import { EmptyState } from '@/components/empty/rent-car.empty';
import { RentCarTable } from '@/components/tables/rent-car.table';
import { IRentCar } from '@/types/rent-car';
import { IServiceResponse } from '@/types/server.response';
import toast from 'react-hot-toast';


function RentCars() {
  const queryClient = useQueryClient();
  const { toggleBar } = useBar();
  const [editingBrand, setEditingBrand] = useState<IRentCar | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    password: '',
    logo: '',
  });

  // Queries
  const { data: brandsResponse, isLoading: brandsLoading, error: brandsError } = useQuery<IServiceResponse<IRentCar[]>>({
    queryKey: ['brands'],
    queryFn: getAllBrands,
  });

  const createMutation = useMutation({
    mutationFn: createBrand,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['brands'] });
        toast.success('Brand created successfully');
      }
     
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });
 
  const deleteMutation = useMutation({
    mutationFn: deleteBrand,
    onSuccess: (response) => {
      console.log({ response });
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['brands'] });
        toast.success('Brand deleted successfully');
      }

      if( typeof response === 'string') {
        toast.error("404 not found");
}

    },
    onError: () => {
      toast.error('Failed to delete brand');
    }
  });

  const handleCreateClick = () => {
    setEditingBrand(null);
    setFormData({
      name: '',
      phone: '',
      address: '',
      password: '',
      logo: '',
    });
    toggleBar();
  };

  const handleSubmit = () => {
    const data = {
      brendName: formData.name,
      ownerNumber: formData.phone,
      address: formData.address,
      password: formData.password,
      logo: formData.logo,
    };

    createMutation.mutate(data);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (brandsLoading) return <RentCarTableSkeleton />;
  if (brandsError) return <div className="text-center text-red-600 py-10">Error loading data</div>;

  const brands = brandsResponse?.responseObject || [];
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
            <RentCarTable 
              brands={brands}
              onEdit={(brand) => {
                setEditingBrand(brand);
                setFormData({
                  name: brand.brendName,
                  phone: brand.ownerNumber,
                  address: brand.address,
                  password: '',
                  logo: brand.logo,
                });
                toggleBar();
              }}
              onDelete={(id) => deleteMutation.mutate(id)}
              loading={deleteMutation.isPending}
              setLoading={(value) => {console.log(value)}} 
            />
          )}
        </div>
      </div>

      <RightSidebar 
        title={editingBrand ? 'Rent carni tahrirlash' : 'Yangi yaratish'}
        onSubmit={handleSubmit}
        loadingState={createMutation.isPending}
      >
        <RentCarForm 
          formData={formData}
          onInputChange={handleInputChange}
        />
      </RightSidebar>
    </PageContainer>
  );
}

export default RentCars;