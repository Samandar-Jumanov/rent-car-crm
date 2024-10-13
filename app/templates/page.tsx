"use client"

import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import PageContainer from '@/components/shared/PageContainer';
import RightSidebar from '@/components/shared/RightSidebar';
import { useBar } from '@/lib/hooks/useRightSide';
import { getAllSmsTemplates, createNewSmsTemplate, updateSmsTemplate, deleteSmsTemplate } from '@/app/services/smsTemplates';
import { TemplateTableSkeleton } from '@/components/skeletons/template.skeleton';
import { CreateTemplate } from '@/components/forms/template';
import { EmptyState } from '@/components/empty/template.empty';
import { ITemplate } from '@/types/template.type';
import { IServiceResponse } from '@/types/server.response';
import Pagination from '@/components/Pagination';
import { usePaginate } from '@/lib/hooks/usePagination';
import toast from 'react-hot-toast';

function Templates() {
  const queryClient = useQueryClient();
  const { toggleBar } = useBar();
  const [editingTemplate, setEditingTemplate] = useState<ITemplate | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; templateId: string | null }>({
    isOpen: false,
    templateId: null,
  });

  const { 
    currentPage, 
    pageSize, 
    totalPages, 
    setCurrentPage, 
    setTotalItems,
    currentDisplayStart, 
    currentDisplayEnd 
  } = usePaginate();

  const { data: templatesResponse, isLoading: templatesLoading, error: templatesError } = useQuery<IServiceResponse<{
    templates: ITemplate[],
    totalCount: number
  }>>({
    queryKey: ['templates', currentPage, pageSize],
    queryFn: () => getAllSmsTemplates(currentPage, pageSize),
  });

  useEffect(() => {
    if (templatesResponse?.responseObject?.totalCount) {
      setTotalItems(templatesResponse.responseObject.totalCount);
    }
  }, [templatesResponse?.responseObject?.totalCount, setTotalItems]);

  const createMutation = useMutation({
    mutationFn: createNewSmsTemplate,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['templates'] });
        toast.success("Template created successfully");
        resetForm();
      }
    },
    onError: () => {
      toast.error("Could not create template");
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { title: string, content: string } }) => updateSmsTemplate(id, data),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['templates'] });
        toast.success("Template updated successfully");
        resetForm();
      }
    },
    onError: () => {
      toast.error("Something went wrong while updating");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSmsTemplate,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['templates'] });
        toast.success("Template deleted successfully");
      }
    },
    onError: () => {
      toast.error("Could not delete template");
    }
  });

  const resetForm = () => {
    setEditingTemplate(null);
    setFormData({ title: '', content: '' });
  };

  const handleCreateClick = () => {
    resetForm();
    toggleBar();
  };

  const handleEditClick = (template: ITemplate) => {
    setEditingTemplate(template);
    setFormData({
      title: template.title,
      content: template.content
    });
    toggleBar();
  };

  const handleSubmit = () => {
    const data = {
      title: formData.title,
      content: formData.content
    };
    if (editingTemplate) {
      updateMutation.mutate({ id: editingTemplate.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmation({ isOpen: true, templateId: id });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation.templateId) {
      deleteMutation.mutate(deleteConfirmation.templateId);
    }
    setDeleteConfirmation({ isOpen: false, templateId: null });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, templateId: null });
  };

  const handleFormChange = (newData: { title: string; content: string }) => {
    setFormData(newData);
  };

  if (templatesLoading) return <TemplateTableSkeleton />;
  if (templatesError) return <div className="text-center text-red-600 py-10">Error loading data</div>;

  const { templates, totalCount } = templatesResponse?.responseObject || { templates: [], totalCount: 0 };
  const isEmpty = templates.length === 0;

  return (
    <PageContainer 
      title="Shablonlar"
      action={
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleCreateClick}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Shablon yaratish
        </Button>
      }
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
                    <TableHead>Content</TableHead>
                    <TableHead>Icon</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template: ITemplate, index: number) => (
                    <TableRow key={template.id}>
                      <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                      <TableCell>{template.title}</TableCell>
                      <TableCell>{template.content}</TableCell>
                      <TableCell>{template.icon}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditClick(template)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(template.id)}
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
                  Showing {currentDisplayStart} to {currentDisplayEnd} of {totalCount} templates
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
        title={editingTemplate ? 'Edit Template' : 'Create Template'}
        onSubmit={handleSubmit}
        loadingState={createMutation.isPending || updateMutation.isPending}
      >
        <CreateTemplate 
          initialData={formData}
          onChange={handleFormChange}
        />
      </RightSidebar>

      <AlertDialog open={deleteConfirmation.isOpen} onOpenChange={handleCancelDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this template?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the template.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageContainer>
  );
}

export default Templates;