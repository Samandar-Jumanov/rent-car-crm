import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export const BannerTableSkeleton = () => {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                <TableCell><Skeleton className="h-4 w-full max-w-[200px]" /></TableCell>
                <TableCell><Skeleton className="h-16 w-16 rounded" /></TableCell>
                <TableCell><Skeleton className="h-4 w-full max-w-[100px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};