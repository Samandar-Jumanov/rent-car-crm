"use client"

import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PageContainer from '@/components/shared/PageContainer';
import RightSidebar from '@/components/shared/RightSidebar';
import { useBar } from '@/lib/hooks/useRightSide';
import { getAllBanners, createNewBanner, deleteBanner } from '@/app/services/banners';
import { BannerTableSkeleton } from '@/components/skeletons/banner.skeleton';
import { CreateBanner } from '@/components/forms/feature';
import { EmptyState } from '@/components/empty/banner.empty';
import { IBanner } from '@/types/banner';
import { IServiceResponse } from '@/types/server.response';
import toast from 'react-hot-toast';
import Pagination from '@/components/Pagination';
import { usePaginate } from '@/lib/hooks/usePagination';

export default function Banner() {
  const queryClient = useQueryClient();
  const { toggleBar } = useBar();
  const [editingBanner, setEditingBanner] = useState<IBanner | null>(null);
  const [title, setTitle] = useState('');
  const [active, setActive] = useState(false);
  const [choosenImage, setChoosenImage] = useState('');
  const [carId, setCarId] = useState('');

  const { 
    currentPage, 
    pageSize, 
    totalPages, 
    setCurrentPage, 
    setTotalItems,
    currentDisplayStart, 
    currentDisplayEnd 
  } = usePaginate();

  const { data: bannersResponse, isLoading: bannersLoading, error: bannersError } = useQuery({
    queryKey: ['banners', currentPage, pageSize],
    queryFn: () => getAllBanners(currentPage, pageSize),
  });

  useEffect(() => {
    if (bannersResponse?.responseObject?.totalCount) {
      setTotalItems(bannersResponse.responseObject.totalCount);
    }
  }, [bannersResponse?.responseObject?.totalCount, setTotalItems]);

  const createMutation = useMutation<IServiceResponse<IBanner>, Error, { title: string; choosenImage: string; carId: string }>({
    mutationFn: createNewBanner,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['banners'] });
        toast.success('Banner created successfully');
        toggleBar();
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create banner');
    }
  });

  const deleteMutation = useMutation<IServiceResponse<void>, Error, string>({
    mutationFn: deleteBanner,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['banners'] });
        toast.success('Banner deleted successfully');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete banner');
    }
  });

  const handleCreateClick = () => {
    setEditingBanner(null);
    setTitle('');
    setActive(false);
    setChoosenImage('');
    setCarId('');
    toggleBar();
  };

  const handleSubmit = () => {
    if (!title.trim() || !choosenImage.trim() || !carId.trim()) {
      toast.error('All fields are required');
      return;
    }
    createMutation.mutate({ title, choosenImage, carId });
  };

  if (bannersLoading) return <BannerTableSkeleton />;
  if (bannersError) return <div className="text-center text-red-600 py-10">Error loading data: {bannersError.message}</div>;

  const banners = bannersResponse?.responseObject?.banners || [];
  const isEmpty = banners.length === 0;

  return (
    <PageContainer 
      title="Banner"
      action={
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleCreateClick}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Banner yaratish
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
                    <TableHead>Rasm</TableHead>
                    <TableHead>Avtomobil</TableHead>
                    <TableHead>Holat</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {banners.map((banner: IBanner, index: number) => (
                    <TableRow key={banner.id}>
                      <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                      <TableCell>{banner.title}</TableCell>
                      <TableCell>
                        <img src={banner.choosenImage} alt={banner.title} className="w-16 h-16 object-cover" />
                      </TableCell>
                      <TableCell>{banner.car.title}</TableCell>
                      <TableCell>{banner.active ? 'Active' : 'Inactive'}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setEditingBanner(banner);
                              setTitle(banner.title);
                              setActive(banner.active);
                              setChoosenImage(banner.choosenImage);
                              setCarId(banner.carId);
                              toggleBar();
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => deleteMutation.mutate(banner.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-between items-center px-4 py-2">
                <div className="text-sm text-gray-600">
                  Showing {currentDisplayStart} to {currentDisplayEnd} of {bannersResponse?.responseObject?.totalCount || 0} banners
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
        title={editingBanner ? 'Banner tahrirlash' : 'Banner yaratish'}
        onSubmit={handleSubmit}
        loadingState={createMutation.isPending}
      >
        <CreateBanner 
          setTitle={setTitle}
          setActive={setActive}
          setChoosenImage={setChoosenImage}
          setCarId={setCarId}
          title={title}
          active={active}
          choosenImage={choosenImage}
          carId={carId}
        />
      </RightSidebar>
    </PageContainer>
  );
}