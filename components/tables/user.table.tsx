"use client"
import React  from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Ban} from "lucide-react";

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
import { IUser } from '@/types/user';
import { IUserTableProps } from '@/types/user';

export const UserTable: React.FC<IUserTableProps> = ({ 
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
          {users.map((user : IUser, index : number ) => (
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