"use client"
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Ban, AlertCircle } from "lucide-react";
import RightSidebar from '@/components/shared/RightSidebar';
import { useBar } from '@/lib/hooks/useRightSide';
import { SendMessage } from '@/components/forms/send-message';
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllUsers, blockUser } from '@/app/services/clients';

interface IUser {
  id: string;
  phoneNumber: string;
  name?: string;
  surname?: string;
  birthday?: string;
  createdAt: Date;
  updatedAt: Date;
  verificationCode?: string | null;
  isVerified: boolean;
  isBlocked: boolean;
}

interface UserTableProps {
  users: IUser[];
  selectedUsers: string[];
  toggleUserSelection: (userId: string) => void;
  handleBlockUser: (userId: string) => Promise<void>;
  currentPage: number;
  pageSize: number;
  isBlockedList?: boolean;
}

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  hasMore: boolean;
}

interface ErrorDisplayProps {
  error: unknown;
}

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

  const handleBlockUser = async (userId: string): Promise<void> => {
    try {
      await blockUser();
      refetch();
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  if (isLoading) return <UserListSkeleton />;
  if (error) return <ErrorDisplay error={error} />;

  const users = data?.responseObject || [];
  const activeUsers = users.filter(user => !user.isBlocked);
  const blockedUsers = users.filter(user => user.isBlocked);

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
          <Pagination 
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

const UserTable: React.FC<UserTableProps> = ({ 
  users, 
  selectedUsers, 
  toggleUserSelection, 
  handleBlockUser, 
  currentPage, 
  pageSize, 
  isBlockedList = false 
}) => (
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead>№</TableHead>
          <TableHead>Nomi</TableHead>
          <TableHead>Telefon raqam</TableHead>
          <TableHead>Ro&apos;yxatda o&apos;tgan sana</TableHead>
          <TableHead className="text-right">Amallar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={user.id}>
            <TableCell>
              <Checkbox 
                checked={selectedUsers.includes(user.id)}
                onCheckedChange={() => toggleUserSelection(user.id)}
              />
            </TableCell>
            <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user.name?.[0] || user.phoneNumber[0]}</AvatarFallback>
                </Avatar>
                <span>{user.name || 'N/A'}</span>
              </div>
            </TableCell>
            <TableCell>{user.phoneNumber}</TableCell>
            <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
            <TableCell className="text-right">
              {!isBlockedList && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-800">
                      <Ban className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Foydalanuvchini bloklash</AlertDialogTitle>
                      <AlertDialogDescription>
                        Haqiqatan ham bu foydalanuvchini bloklashni xohlaysizmi? Bu amalni bekor qilib bo&apos;lmaydi.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleBlockUser(user.id)}>Bloklash</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage, hasMore }) => (
  <div className="mt-4 flex items-center justify-between">
    <div className="text-sm text-gray-500">
      Page {currentPage}
    </div>
    <div className="space-x-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
      >
        &lt;
      </Button>
      <Button variant="outline" size="sm">{currentPage}</Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setCurrentPage(prev => prev + 1)}
        disabled={!hasMore}
      >
        &gt;
      </Button>
    </div>
  </div>
);

const UserListSkeleton: React.FC = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    ))}
  </div>
);

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      {error instanceof Error ? error.message : 'An unknown error occurred'}
    </AlertDescription>
  </Alert>
);

export default Client;