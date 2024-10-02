"use client"
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import {PlusCircle } from "lucide-react";
import PageContainer from '@/components/shared/PageContainer';
import RightSidebar from '@/components/shared/RightSidebar';
import { useBar } from '@/lib/hooks/useRightSide';
import apiClient from "@/utils/axios";
import { getAllBrands } from '../services/rent-cars';
import { RentCarTableSkeleton } from '@/components/skeletons/rent-car.skeleton';
import { RentCarForm } from '@/components/forms/rent-car';
import { EmptyState } from '@/components/empty/rent-car.empty';
import { RentCarTable } from '@/components/tables/rent-car.table';
import { IRentCar, IRentCarFormData } from '@/types/rent-car';
import { IServiceResponse } from '@/types/server.response';


// Keep your existing API functions
const createBrand = async (data: IRentCarFormData): Promise<IServiceResponse<IRentCar>> => {
  const response = await apiClient.post('/brands', data);
  return response.data;
};

const updateBrand = async ({ id, data }: { id: string; data: IRentCarFormData }): Promise<IServiceResponse<IRentCar>> => {
  const response = await apiClient.put(`/brands/${id}`, data);
  return response.data;
};

const deleteBrand = async (id: string): Promise<IServiceResponse<void>> => {
  const response = await apiClient.delete(`/brands/${id}`);
  return response.data;
};



 function RentCars() {
  const queryClient = useQueryClient();
  const { toggleBar } = useBar();
  const [editingBrand, setEditingBrand] = useState<IRentCar | null>(null);
  
  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [logo, setLogo] = useState("");

  // Queries
  const { data: brandsResponse, isLoading, error } = useQuery<IServiceResponse<IRentCar[]>>({
    queryKey: ['brands'],
    queryFn: getAllBrands,
  });

  const createMutation = useMutation({
    mutationFn: createBrand,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['brands'] });
        resetForm();
        toggleBar();
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateBrand,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['brands'] });
        resetForm();
        toggleBar();
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBrand,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['brands'] });
      }
    },
  });

  const resetForm = () => {
    setName("");
    setPhone("");
    setAddress("");
    setPassword("");
    setLogo("");
    setEditingBrand(null);
  };

  const handleCreateClick = () => {
    resetForm();
    toggleBar();
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const formData = {
  //     brendName: name,
  //     ownerNumber: phone,
  //     address,
  //     password,
  //     logo,
  //   };

  //   if (editingBrand) {
  //     updateMutation.mutate({ id: editingBrand.id, data: formData });
  //   } else {
  //     createMutation.mutate(formData as any);
  //   }
  // };

  if (isLoading) return  RentCarTableSkeleton;
  if (error) return null;

  const brands = brandsResponse?.data || [];
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
          Add Brand
        </Button>
      )}
    >
      <div className="p-6 max-w-[1200px] mx-auto">
        <div className="overflow-x-auto">
          {isEmpty ? (
            <EmptyState onCreateClick={handleCreateClick} />
          ) : (
            <RentCarTable 
              brands={brands}
              onEdit={(brand) => {
                setEditingBrand(brand);
                setName(brand.brendName);
                setPhone(brand.ownerNumber);
                setAddress(brand.address);
                setLogo(brand.logo);
                toggleBar();
              }}
              onDelete={(id) => deleteMutation.mutate(id)}
              isDeletePending={deleteMutation.isPending}
            />
          )}
        </div>
      </div>

      <RightSidebar 
        title={editingBrand ? 'Rent carni tahrirlash' : 'Yangi yaratish'}
        onSubmit={( ) => {}}
      >
        <RentCarForm 
          setName={setName}
          setPhone={setPhone}
          setAddress={setAddress}
          setPassword={setPassword}
          setLogo={setLogo}
          initialValues={editingBrand ? {
            name: editingBrand.brendName,
            phone: editingBrand.ownerNumber,
            address: editingBrand.address,
            logo: editingBrand.logo,
          } : undefined}
        />
      </RightSidebar>
    </PageContainer>
  );
}


export default RentCars