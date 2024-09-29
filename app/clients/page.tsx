"use client"
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback} from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Ban } from "lucide-react";
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

const data = Array(10).fill(null).map((_, index) => ({
  id: index + 1,
  name: "Sirojiddin Xolxodjayev",
  phone: "+998974481512",
  date: "6.09.2024, 11:34"
}));

// TO DO  Add clien info and history later 

const Client = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const { toggleBar } = useBar();
  const [userToBlock, setUserToBlock] = useState<number | null>(null);




  const toggleUserSelection = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBlockUser = (userId: number) => {
    console.log(`Blocking user ${userId}  ${userToBlock}`);
    setUserToBlock(null);
  };

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
                    {data.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={() => toggleUserSelection(user.id)}
                          />
                        </TableCell>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <span>{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.date}</TableCell>
                        <TableCell className="text-right">
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
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing 20 results
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">&lt;</Button>
                  <Button variant="outline" size="sm">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">4</Button>
                  <Button variant="outline" size="sm">5</Button>
                  <Button variant="outline" size="sm">&gt;</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="bloklangan">
              {/* Content for blocked users */}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <RightSidebar onSubmit={() => {}} title="Sms jo'natish">
        <SendMessage />
      </RightSidebar>
    </div>
  );
};

export default Client;