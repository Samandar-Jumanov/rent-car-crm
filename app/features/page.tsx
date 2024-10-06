"use client"

import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageContainer from '@/components/shared/PageContainer';
import RightSidebar from '@/components/shared/RightSidebar';
import { useBar } from '@/lib/hooks/useRightSide';
import { getAllFeatures, createFeature, updateFeature, deleteFeature } from '@/app/services/features';
import { FeatureTableSkeleton } from '@/components/skeletons/feature.skeleton';
import { CreateFeature } from '@/components/forms/features';
import { EmptyState } from '@/components/empty/feature.empty';
import { IFeature } from '@/types/feature.type';
import { IServiceResponse } from '@/types/server.response';
import toast from 'react-hot-toast';

function Features() {
  const queryClient = useQueryClient();
  const { toggleBar } = useBar();
  const [editingFeature, setEditingFeature] = useState<IFeature | null>(null);
  const [featureTitle, setFeatureTitle] = useState('');
  const [featureIcon, setFeatureIcon] = useState('');

  const { data: featuresResponse, isLoading: featuresLoading, error: featuresError } = useQuery<IServiceResponse<IFeature[]>>({
    queryKey: ['features'],
    queryFn: getAllFeatures,
  });

  const createMutation = useMutation({
    mutationFn: createFeature,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['features'] });
        toast.success('Feature created successfully');
        toggleBar();
      }
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateFeature,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['features'] });
        toast.success('Feature updated successfully');
        toggleBar();
      }
    },
    onError: (error) => {
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
    onError: (error) => {
      toast.error(error.message)
    }
  });

  const handleCreateClick = () => {
    setEditingFeature(null);
    setFeatureTitle('');
    setFeatureIcon('');
    toggleBar();
  };

  const handleSubmit = () => {
    if (!featureTitle.trim() || !featureIcon.trim()) {
      toast.error('Feature title and icon are required');
      return;
    }
    createMutation.mutate({ title: featureTitle, icon: featureIcon });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      deleteMutation.mutate(id);
    }
  };

  if (featuresLoading) return <FeatureTableSkeleton />;
  if (featuresError) return <div className="text-center text-red-600 py-10">Error loading data</div>;

  const features = featuresResponse?.responseObject || [];
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
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{feature.title}</TableCell>
                    <TableCell>{feature.icon}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingFeature(feature);
                            setFeatureTitle(feature.title);
                            setFeatureIcon(feature.icon);
                            toggleBar();
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(feature.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
        />
      </RightSidebar>
    </PageContainer>
  );
}

export default Features;