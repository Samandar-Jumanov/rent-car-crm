"use client"

import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageContainer from '@/components/shared/PageContainer';
import RightSidebar from '@/components/shared/RightSidebar';
import { useBar } from '@/lib/hooks/useRightSide';
import { getAllSmsTemplates, createNewSmsTemplate , updateSmsTemplate, deleteSmsTemplate } from '@/app/services/smsTemplates';
import { TemplateTableSkeleton } from '@/components/skeletons/template.skeleton';
import { CreateTemplate } from '@/components/forms/template';
import { EmptyState } from '@/components/empty/template.empty';
import { ITemplate } from '@/types/template.type';
import { IServiceResponse } from '@/types/server.response';
import toast from 'react-hot-toast';

function Templates() {
  const queryClient = useQueryClient();
  const { toggleBar } = useBar();
  const [editingTemplate, setEditingTemplate] = useState<ITemplate | null>(null);
  const [templateTitle, setTemplateTitle] = useState('');
  const [content, setContent] = useState('');

  const { data: templatesResponse, isLoading: templatesLoading, error: templatesError } = useQuery<IServiceResponse<ITemplate[]>>({
    queryKey: ['templates'],
    queryFn: getAllSmsTemplates,
  });

  const createMutation = useMutation({
    mutationFn: createNewSmsTemplate,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['templates'] });
        toast.success('Template created successfully');
        toggleBar();
      }
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateSmsTemplate,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['templates'] });
        toast.success('Template updated successfully');
        toggleBar();
      }
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSmsTemplate,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['templates'] });
        toast.success('Template deleted successfully');
      }
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });

  const handleCreateClick = () => {
    setEditingTemplate(null);
    setTemplateTitle('');
    setContent('');
    toggleBar();
  };

  const handleSubmit = () => {
    createMutation.mutate({ title: templateTitle, content: content });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      deleteMutation.mutate(id);
    }
  };

  if (templatesLoading) return <TemplateTableSkeleton />;
  if (templatesError) return <div className="text-center text-red-600 py-10">Error loading data</div>;

  const templates = templatesResponse?.responseObject || [];
  const isEmpty = templates.length === 0;

  return (
    <PageContainer 
      title="Shablonlar"
      action={!isEmpty && (
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleCreateClick}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Shablon yaratish
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
                {templates.map((template: ITemplate, index: number) => (
                  <TableRow key={template.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{template.title}</TableCell>
                    <TableCell>{template.content}</TableCell>
                    <TableCell>{template.icon}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingTemplate(template);
                            setTemplateTitle(template.title);
                            setContent(template.content);
                            toggleBar();
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(template.id)}
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
        title={editingTemplate ? 'Edit Template' : 'Create Template'}
        onSubmit={handleSubmit}
        loadingState={createMutation.isPending || updateMutation.isPending}
      >
        
<CreateTemplate 
 
  initialData={{ 
    title: templateTitle, 
    content: content 
  }}
  />
      </RightSidebar>
    </PageContainer>
  );
}

export default Templates;