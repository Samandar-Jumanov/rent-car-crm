"use client"
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Star, PlusCircle, Building2 } from "lucide-react";
import PageContainer from '@/components/shared/PageContainer';
import RightSidebar from '@/components/shared/RightSidebar';
import { CreateBrand } from '@/components/forms/brand';
import { useBar } from '@/lib/hooks/useRightSide';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import apiClient from "@/utils/axios";
import { getAllBrands } from '../services/rent-cars';
import { cn } from "@/lib/utils";

// Keep your existing interfaces
interface ServiceResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}

interface IBrend {
  id: string;
  userId: string;
  logo: string;
  brendName: string;
  ownerNumber: string;
  address: string;
  password: string;
  carDelivery: any;
  topBrendId: string | null;
  payment: any;
  ratings: number[];
  averageRating: number;
  createdAt: Date;
  updatedAt: Date;
}

interface BrandFormData {
  brendName: string;
  ownerNumber: string;
  address: string;
  logo?: string;
  carDelivery?: any;
  payment?: any;
}

// Keep your existing API functions
const createBrand = async (data: BrandFormData): Promise<ServiceResponse<IBrend>> => {
  const response = await apiClient.post('/brands', data);
  return response.data;
};

const updateBrand = async ({ id, data }: { id: string; data: BrandFormData }): Promise<ServiceResponse<IBrend>> => {
  const response = await apiClient.put(`/brands/${id}`, data);
  return response.data;
};

const deleteBrand = async (id: string): Promise<ServiceResponse<void>> => {
  const response = await apiClient.delete(`/brands/${id}`);
  return response.data;
};

const LoadingSkeleton = () => (
  <div className="space-y-4 p-6">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
    ))}
  </div>
);

const EmptyState = ({ onCreateClick }: { onCreateClick: () => void }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-white rounded-lg shadow-sm">
    <Building2 className="h-16 w-16 text-blue-600 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Brands Yet</h3>
    <p className="text-gray-500 mb-4 max-w-md">
      Get started by creating your first brand. You can add details about your rental car business.
    </p>
    <Button 
      onClick={onCreateClick} 
      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
    >
      <PlusCircle className="h-4 w-4" />
      Create Your First Brand
    </Button>
  </div>
);

const BrandTable: React.FC<{
  brands: IBrend[];
  onEdit: (brand: IBrend) => void;
  onDelete: (id: string) => void;
  isDeletePending: boolean;
}> = ({ brands, onEdit, onDelete, isDeletePending }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="w-[80px]">№</TableHead>
          <TableHead>Logo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead className="w-[120px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brands.map((brand, index) => (
          <TableRow key={brand.id} className="hover:bg-gray-50">
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>
              <div className="relative h-10 w-10">
                <img 
                  src={brand.logo || '/placeholder-brand.png'} 
                  alt={brand.brendName}
                  className="rounded-full object-cover h-full w-full border border-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-brand.png';
                  }}
                />
              </div>
            </TableCell>
            <TableCell className="font-medium">{brand.brendName}</TableCell>
            <TableCell>{brand.ownerNumber}</TableCell>
            <TableCell>{brand.address}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Star className={cn(
                  "w-4 h-4 mr-1",
                  brand.averageRating > 0 ? "text-yellow-400" : "text-gray-300"
                )} />
                {brand.averageRating > 0 ? brand.averageRating.toFixed(1) : 'No ratings'}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => onEdit(brand)}
                  className="hover:bg-blue-50"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      size="icon"
                      disabled={isDeletePending}
                      className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Brand</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{brand.brendName}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(brand.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default function RentCars() {
  const queryClient = useQueryClient();
  const { toggleBar } = useBar();
  const [editingBrand, setEditingBrand] = useState<IBrend | null>(null);
  const [name, setName] = useState("");

  const { data: brandsResponse, isLoading, error } = useQuery<ServiceResponse<IBrend[]>, Error>({
    queryKey: ['brands'],
    queryFn: getAllBrands,
  });

  const createMutation = useMutation({
    mutationFn: createBrand,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['brands'] });
        toggleBar();
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateBrand,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['brands'] });
        setEditingBrand(null);
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

  const handleCreateClick = () => {
    setEditingBrand(null);
    toggleBar();
  };

  const handleSubmit = (formData: BrandFormData) => {
    if (editingBrand) {
      updateMutation.mutate({ id: editingBrand.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  if (isLoading) return <LoadingSkeleton />;
  if (error) return null;

  const brands = brandsResponse?.data || [];
  const isEmpty = brands.length === 0;

  console.log({ brands})

  return (
    <PageContainer
      title="Brands"
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
            <BrandTable 
              brands={brands}
              onEdit={(brand) => {
                setEditingBrand(brand);
                toggleBar();
              }}
              onDelete={(id) => deleteMutation.mutate(id)}
              isDeletePending={deleteMutation.isPending}
            />
          )}
        </div>
      </div>

      <RightSidebar 
        onSubmit={() => {}}
        title={editingBrand ? 'Edit Brand' : 'Create Brand'}
      >
        <CreateBrand 
          setName={setName}
        />
      </RightSidebar>
    </PageContainer>
  );
}