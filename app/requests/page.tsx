"use client"

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import PageContainer from "@/components/shared/PageContainer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllRequests} from '@/app/services/requests';
import { RequestsTableSkeleton } from '@/components/skeletons/requests.skeleton';
import { EmptyState } from '@/components/empty/requests.empty';
import { IRequest } from '@/types/request.type';

export default function Requests() {
  // Query
  const { data: requestsData, isLoading, error } = useQuery({
    queryKey: ['requests'],
    queryFn: getAllRequests,
  });


  if (isLoading) return <RequestsTableSkeleton />;
  if (error) return <div className="text-center text-red-600 py-10">Error loading data</div>;

  const requests = requestsData?.response || [];
  const isEmpty = requests.length === 0;

  return (
    <PageContainer 
      title="Requests"
    >
      <div className="overflow-x-auto">
        {isEmpty ? (
          <EmptyState />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">№</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request: IRequest, index: number) => (
                <TableRow key={request.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{request.title}</TableCell>
                  <TableCell>{request.icon}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </PageContainer>
  );
}