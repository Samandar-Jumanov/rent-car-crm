"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { useBar } from '@/lib/hooks/useRightSide';
import RightSidebar from '@/components/shared/RightSidebar';
import { RenatCarCreate } from '@/components/forms/rent-car';
const CarRentalManagementPage = () => {
  const { toggleBar } = useBar();
  const [ name , setName ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ password , setPassword ] = useState("");
  const [ logo , setLogo ] = useState("")


  const submit = ( ) => {
       console.log({ name , phone , address , password ,  logo})
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div className="w-full lg:w-64 lg:flex-shrink-0">
      </div>
      <main className="flex-1 p-4 lg:p-8 overflow-x-auto">
        <div className="bg-white rounded-lg shadow p-4 lg:p-6 text-black">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <h1 className="text-2xl font-semibold">Rent carlar</h1>
            <div className="flex items-center space-x-2">
              <Button onClick={toggleBar}>+ Akkount yaratish</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">№</TableHead>
                  <TableHead>Nomi</TableHead>
                  <TableHead className="w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Umar Rent a car</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="default" size="icon"  >
                        <Pencil className="h-4 w-40 text-white" />
                      </Button>
                      <Button variant="destructive" size="icon" >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      
      <RightSidebar onSubmit={submit} title='Yangi yaratish'>
          < RenatCarCreate 
           setPhone={setPhone}
           setAddress={setAddress}
           setName={setName}
           setPassword={setPassword}
          setLogo={setLogo}
          />
      </RightSidebar>
    </div>
  );
};

export default CarRentalManagementPage;