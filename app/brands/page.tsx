"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import PageContainer from '@/components/shared/PageContainer';  
import RightSidebar from '@/components/shared/RightSidebar';
import { CreateBrand } from '@/components/forms/brand';
import { useBar } from '@/lib/hooks/useRightSide';

export default function Brend() {
  const [ name , setName ] = useState("")
  const { toggleBar} = useBar()

  const submit = ( ) => {
       console.log({ name })
  }

  return (
    <PageContainer
      title="Brend"
      action={<Button className="w-full sm:w-auto" onClick={toggleBar}>+ Brand yaratish</Button>}
    >
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">№</TableHead>
              <TableHead>Nomi</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Chevrolet</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>Mercedes Benz</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* Pagination component */}
      <div className="mt-4 flex justify-end">
        {/* Add your pagination component here */}
      </div>
        <RightSidebar onSubmit={submit}  title='Brand yaratish'>
              <CreateBrand  setName={setName}/>
        </RightSidebar>
    </PageContainer>
  );
}