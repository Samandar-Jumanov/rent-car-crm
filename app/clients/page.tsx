"use client"
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RightSidebar from '@/components/shared/RightSidebar';
import { useBar } from '@/lib/hooks/useRightSide';
import { SendMessage } from '@/components/forms/send-message';
import { getAllUsers, blockUser } from '@/app/services/clients';
import { UserListSkeleton } from '@/components/skeletons/user.skeleton';
import { ErrorDisplay } from '@/components/shared/ErrorDisplay';
import { IUser } from '@/types/user';
import { UserPagination } from '@/components/pagination/user.pagination';
import { UserTable } from '@/components/tables/user.table';

const Client: React.FC = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { toggleBar } = useBar();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize: number = 20;

  const { data, isLoading, error, refetch } = useQuery<{ responseObject: IUser[] }>({
    queryKey: ['users', currentPage],
    queryFn: () => getAllUsers(),
  });

  const toggleUserSelection = (userId: string): void => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBlockUser = async (userId : string ): Promise<void> => {
    try {
     const response =   await blockUser(userId);
     console.log({ response })
      refetch();
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  if (isLoading) return (
      <UserListSkeleton />
  );
  if (error) return (
    <div className="flex flex-col  bg-gray-100 lg:ml-64">
      <ErrorDisplay error={error} />
    </div>
  );

  const users = data?.responseObject || [];
  const activeUsers = users.filter(user => !user.isBlocked);
  const blockedUsers = users.filter(user => user.isBlocked);

  console.log({
         users 
  })

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
          <Tabs defaultValue="aktivlar" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="aktivlar">Aktivlar</TabsTrigger>
              <TabsTrigger value="bloklangan">Bloklangan</TabsTrigger>
            </TabsList>
            <TabsContent value="aktivlar">
              <UserTable 
                users={activeUsers} 
                selectedUsers={selectedUsers} 
                toggleUserSelection={toggleUserSelection}
                handleBlockUser={handleBlockUser}
                currentPage={currentPage}
                pageSize={pageSize}
              />
            </TabsContent>
            <TabsContent value="bloklangan">
              <UserTable 
                users={blockedUsers} 
                selectedUsers={selectedUsers} 
                toggleUserSelection={toggleUserSelection}
                handleBlockUser={handleBlockUser}
                currentPage={currentPage}
                pageSize={pageSize}
                isBlockedList
              />
            </TabsContent>
          </Tabs>
          <UserPagination 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            hasMore={users.length === pageSize}
          />
        </div>
      </main>
      
      <RightSidebar onSubmit={() => {}} title="Sms jo'natish">
        <SendMessage />
      </RightSidebar>
    </div>
  );
};

export default Client;