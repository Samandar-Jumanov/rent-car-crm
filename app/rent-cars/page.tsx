"use client"


import React from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import {  Pencil, Trash2 } from "lucide-react";
import { useBar } from '@/lib/hooks/useRightSide';
import RightSidebar from '@/components/shared/RightSidebar';
const CarRentalManagementPage = () => {

    const { toggleBar  } = useBar();

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64">
      </div>

      <main className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow p-6 text-black">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Rent carlar</h1>
            <Button onClick={toggleBar}>+ Akkount yaratish</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>№</TableHead>
                <TableHead>Nomi</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Umar Rent a car</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>Show</span>
              <select className="border rounded p-1">
                <option>20</option>
              </select>
              <span>entries</span>
            </div>
            <Pagination />
          </div>
        </div>
      </main>
     
      <RightSidebar>
    <h1> Sidebarrrr </h1>
   </RightSidebar>   
    </div>
  );
};

export default CarRentalManagementPage;
