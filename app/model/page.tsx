"use client"

import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import PageContainer from '@/components/shared/PageContainer';
import RightSidebar from '@/components/shared/RightSidebar';
import { useBar } from '@/lib/hooks/useRightSide';
import { getAllModels, createModel, deleteModel, updateModel } from '@/app/services/carModel';
import { ModelTableSkeleton } from '@/components/skeletons/model.skeleton';
import { ModelForm } from '@/components/forms/model';
import { EmptyState } from '@/components/empty/model.empty';
import { ModelTable } from '@/components/tables/model.table';
import { IModel } from '@/types/model.type';
import toast from 'react-hot-toast';
import { IServiceResponse } from '@/types/server.response';
import Pagination from '@/components/Pagination';
import { usePaginate } from '@/lib/hooks/usePagination';

export default function ModelPage() {
  const queryClient = useQueryClient();
  const { toggleBar } = useBar();
  const [editingModel, setEditingModel] = useState<IModel | null>(null);
  const [modelName, setModelName] = useState("");

  const { 
    currentPage, 
    pageSize, 
    totalPages, 
    setCurrentPage, 
    setTotalItems,
    currentDisplayStart, 
    currentDisplayEnd 
  } = usePaginate();

  const { data: modelsResponse, isLoading, error } = useQuery<IServiceResponse<{
    models: IModel[],
    totalCount: number
  }>>({
    queryKey: ['models', currentPage, pageSize],
    queryFn: () => getAllModels(currentPage, pageSize),
  });

  useEffect(() => {
    if (modelsResponse?.responseObject?.totalCount) {
      setTotalItems(modelsResponse.responseObject.totalCount);
    }
  }, [modelsResponse?.responseObject?.totalCount, setTotalItems]);

  const createMutation = useMutation({
    mutationFn: createModel,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['models'] });
        toast.success('Model created successfully');
        toggleBar();
        setModelName("");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => 
      updateModel(id, name),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['models'] });
        toast.success('Model updated successfully');
        toggleBar();
        setEditingModel(null);
        setModelName("");
      }
    },
    onError: (error: Error) => {
       toast.error(error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteModel,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['models'] });
        toast.success('Model deleted successfully');
      }
    },
    onError: ( error  ) => {
      toast.error(error.message);
    }
  });

  const handleCreateClick = () => {
    setEditingModel(null);
    setModelName("");
    toggleBar();
  };

  const handleEditClick = (model: IModel) => {
    setEditingModel(model);
    setModelName(model.modelName);
    toggleBar();
  };

  const handleSubmit = () => {
    if (!modelName.trim()) {
      toast.error('Model name cannot be empty');
      return;
    }

    if (editingModel) {
      updateMutation.mutate({ id: editingModel.id, name: modelName });
    } else {
      createMutation.mutate(modelName);
    }
  };

  if (isLoading) return <ModelTableSkeleton />;
  if (error) return <div className="text-center text-red-600 py-10">Error loading data</div>;

  const { models, totalCount } = modelsResponse?.responseObject || { models: [], totalCount: 0 };
  const isEmpty = models.length === 0;

  return (
    <PageContainer 
      title="Models"
      action={!isEmpty && (
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleCreateClick}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Model
        </Button>
      )}
    >
      <div className="p-6 max-w-[1200px] mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {isEmpty ? (
            <EmptyState onCreateClick={handleCreateClick} />
          ) : (
            <>
              <ModelTable 
                models={models}
                onEdit={handleEditClick}
                onDelete={(id) => deleteMutation.mutate(id)}
                loading={deleteMutation.isPending}
              />
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center p-4">
                <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                  Showing {currentDisplayStart} to {currentDisplayEnd} of {totalCount} models
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
        title={editingModel ? 'Edit Model' : 'Create Model'}
        onSubmit={handleSubmit}
        loadingState={createMutation.isPending || updateMutation.isPending}
      >
        <ModelForm 
          setModelName={setModelName}
          modelName={modelName}
        />
      </RightSidebar>
    </PageContainer>
  );
}