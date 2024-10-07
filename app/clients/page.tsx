"use client"
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RightSidebar from '@/components/shared/RightSidebar';
import { useBar } from '@/lib/hooks/useRightSide';
import { SendMessage } from '@/components/forms/send-message';
import { getAllUsers, blockUser, unblockUser } from '@/app/services/clients';
import { UserListSkeleton } from '@/components/skeletons/user.skeleton';
import { ErrorDisplay } from '@/components/shared/ErrorDisplay';
import { IUser } from '@/types/user';
import { UserTable } from '@/components/tables/user.table';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { IServiceResponse } from '@/types/server.response';
import Pagination from '@/components/Pagination';
import { usePaginate } from '@/lib/hooks/usePagination';

const Client: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { toggleBar } = useBar();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'aktivlar' | 'bloklanganlar'>('aktivlar');
  const queryClient = useQueryClient();

  const { 
    currentPage, 
    pageSize, 
    totalPages, 
    setCurrentPage, 
    setTotalItems,
    currentDisplayStart, 
    currentDisplayEnd 
  } = usePaginate();

  const { data, isLoading, error } = useQuery<IServiceResponse<{
    activeUsers: IUser[],
    blockedUsers: IUser[],
    totalCount: number,
    activeCount: number,
    blockedCount: number
  }>>({
    queryKey: ['users', currentPage, pageSize],
    queryFn: () => getAllUsers(currentPage, pageSize),
  });

  useEffect(() => {
    if (data?.responseObject?.totalCount) {
      setTotalItems(data.responseObject.totalCount);
    }
  }, [data?.responseObject?.totalCount, setTotalItems]);

  const blockUserMutation = useMutation({
    mutationFn: blockUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User blocked');
    },
    onError: (error) => {
      console.error('Error blocking user:', error);
      toast.error('Could not block user');
    }
  });

  const unblockUserMutation = useMutation({
    mutationFn: unblockUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User unblocked');
    },
    onError: (error) => {
      console.error('Error unblocking user:', error);
      toast.error('Could not unblock user');
    }
  });

  const routeClient = (id: string) => {
    router.push(`/clients/${id}`);
  };

  const toggleUserSelection = (userId: string): void => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBlockUser = async (userId: string): Promise<void> => {
    blockUserMutation.mutate(userId);
  };

  const handleUnblockUser = async (blockId: string): Promise<void> => {
    unblockUserMutation.mutate(blockId);
  };

  if (isLoading) return <UserListSkeleton />;
  if (error) return (
    <div className="flex flex-col bg-gray-100 lg:ml-64">
      <ErrorDisplay error={error} />
    </div>
  );

  const { activeUsers, blockedUsers, activeCount, blockedCount } = data?.responseObject || { 
    activeUsers: [], 
    blockedUsers: [], 
    totalCount: 0, 
    activeCount: 0, 
    blockedCount: 0 
  };

  const displayedUsers = activeTab === 'aktivlar' ? activeUsers : blockedUsers;
  const displayedCount = activeTab === 'aktivlar' ? activeCount : blockedCount;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 lg:ml-64">
      <main className="flex-grow p-4 lg:p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold">Mijozlar</h1>
            {selectedUsers.length > 0 && (
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={toggleBar}>
                Sms jo&apos;natish
              </Button>
            )}
          </div>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'aktivlar' | 'bloklanganlar')} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="aktivlar">Aktivlar ({activeCount})</TabsTrigger>
              <TabsTrigger value="bloklanganlar">Bloklanganlar ({blockedCount})</TabsTrigger>
            </TabsList>
            <TabsContent value="aktivlar">
              <UserTable 
                users={displayedUsers} 
                selectedUsers={selectedUsers} 
                toggleUserSelection={toggleUserSelection}
                handleBlockUser={handleBlockUser}
                currentPage={currentPage}
                pageSize={pageSize}
                isBlockedList={false}
                routeClient={routeClient}
              />
            </TabsContent>
            <TabsContent value="bloklanganlar">
              <UserTable 
                users={displayedUsers} 
                selectedUsers={selectedUsers} 
                toggleUserSelection={toggleUserSelection}
                handleBlockUser={handleUnblockUser}
                currentPage={currentPage}
                pageSize={pageSize}
                isBlockedList={true}
                routeClient={routeClient}
              />
            </TabsContent>
          </Tabs>
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-gray-600 mb-4 sm:mb-0">
              Showing {currentDisplayStart} to {currentDisplayEnd} of {displayedCount} users
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
      
      <RightSidebar onSubmit={() => {}} title="Sms jo'natish" >
        <SendMessage />
      </RightSidebar>
    </div>
  );
};

export default Client;