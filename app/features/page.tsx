"use client"

import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2, ImageOff } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageContainer from '@/components/shared/PageContainer';
import RightSidebar from '@/components/shared/RightSidebar';
import { useBar } from '@/lib/hooks/useRightSide';
import { getAllFeatures, createFeature, updateFeature, deleteFeature } from '@/app/services/features';
import { FeatureTableSkeleton } from '@/components/skeletons/feature.skeleton';
import { CreateFeature } from '@/components/forms/features';
import { EmptyState } from '@/components/empty/feature.empty';
import {  IFeature } from '@/types/feature.type';
import { IServiceResponse } from '@/types/server.response';
import toast from 'react-hot-toast';
import Pagination from '@/components/Pagination';
import { usePaginate } from '@/lib/hooks/usePagination';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function Features() {
  const queryClient = useQueryClient();
  const { toggleBar } = useBar();
  const [editingFeature, setEditingFeature] = useState<IFeature | null>(null);
  const [featureTitle, setFeatureTitle] = useState('');
  const [featureIcon, setFeatureIcon] = useState<File | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [featureToDelete, setFeatureToDelete] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});



  const { 
    currentPage, 
    pageSize, 
    totalPages, 
    setCurrentPage, 
    setTotalItems,
    currentDisplayStart, 
    currentDisplayEnd 
  } = usePaginate();

  const { data: featuresResponse, isLoading: featuresLoading, error: featuresError } = useQuery<IServiceResponse<{
    features: IFeature[],
    totalCount: number
  }>>({
    queryKey: ['features', currentPage, pageSize],
    queryFn: () => getAllFeatures(currentPage, pageSize),
  });

  useEffect(() => {
    if (featuresResponse?.responseObject?.totalCount) {
      setTotalItems(featuresResponse.responseObject.totalCount);
    }
  }, [featuresResponse?.responseObject?.totalCount, setTotalItems]);

  const createMutation = useMutation({
    mutationFn: createFeature,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['features'] });
        toast.success('Feature created successfully');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message)
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) => updateFeature(id, { title }),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['features'] });
        toast.success('Feature updated successfully');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message)
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFeature,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['features'] });
        toast.success('Feature deleted successfully');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message)
    }
  });

  const handleImageError = (featureId: string) => {
    setImageErrors(prev => ({ ...prev, [featureId]: true }));
  };

  const handleCreateClick = () => {
    setEditingFeature(null);
    setFeatureTitle('');
    setFeatureIcon(null);
    toggleBar();
  };

  const handleSubmit = () => {
    if (!featureTitle.trim()) {
      toast.error('Feature title is required');
      return;
    }

    if (!editingFeature && !featureIcon) {
      toast.error('Feature icon is required');
      return;
    }

    if (editingFeature) {
      updateMutation.mutate({ id: editingFeature.id, title: featureTitle });
    } else {
      const formData = new FormData;
      formData.append('title', featureTitle);
      if (featureIcon) {
        formData.append('icon', featureIcon);
      }

      createMutation.mutate(formData);
    }
  };

  const handleDeleteClick = (id: string) => {
    setFeatureToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (featureToDelete) {
      deleteMutation.mutate(featureToDelete);
    }
    setIsDeleteDialogOpen(false);
    setFeatureToDelete(null);
  };

  if (featuresLoading) return <FeatureTableSkeleton />;
  if (featuresError) return <div className="text-center text-red-600 py-10">Error loading data</div>;

  const { features, totalCount } = featuresResponse?.responseObject || { features: [], totalCount: 0 };
  const isEmpty = features.length === 0;

  return (
    <PageContainer 
      title="Xususiyatlar"
      action={!isEmpty && (
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleCreateClick}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Xususiyat yaratish
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
                    <TableHead>Nomi</TableHead>
                    <TableHead>Icon</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {features.map((feature: IFeature, index: number) => (
                    <TableRow key={feature.id}>
                      <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                      <TableCell>{feature.title}</TableCell>
                      <TableCell>
                        {imageErrors[feature.id] ? (
                          <div className="flex items-center text-gray-400">
                            <ImageOff className="h-6 w-6" />
                          </div>
                        ) : (
                          <img
                            src={feature.icon}
                            alt={feature.title}
                            className="h-8 w-8 object-cover rounded"
                            onError={() => handleImageError(feature.id)}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingFeature(feature);
                              setFeatureTitle(feature.title);
                              setFeatureIcon(null);
                              toggleBar();
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(feature.id)}
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
                  Showing {currentDisplayStart} to {currentDisplayEnd} of {totalCount} features
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
        title={editingFeature ? 'Edit Feature' : 'Create Feature'}
        onSubmit={handleSubmit}
        loadingState={createMutation.isPending || updateMutation.isPending}
      >
        <CreateFeature 
          featureTitle={featureTitle}
          setFeatureTitle={setFeatureTitle}
          featureIcon={featureIcon}
          setFeatureIcon={setFeatureIcon}
          isEditing={!!editingFeature}
        />
      </RightSidebar>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this feature?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the feature.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageContainer>
  );
}

export default Features;