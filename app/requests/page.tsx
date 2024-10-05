"use client"

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageContainer from "@/components/shared/PageContainer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllRequests } from '@/app/services/requests';
import { RequestsTableSkeleton } from '@/components/skeletons/requests.skeleton';
import { EmptyState } from '@/components/empty/requests.empty';
import { IRequest } from '@/types/request.type';
import RightSidebar from '@/components/shared/RightSidebar';
import { useBar } from '@/lib/hooks/useRightSide';

export default function Requests() {
  const { toggleBar } = useBar();
  const [selectedRequest, setSelectedRequest] = useState<IRequest | null >(null);

  // Query
  const { data: requestsData, isLoading, error } = useQuery({
    queryKey: ['requests'],
    queryFn: getAllRequests,
  });

  console.log({ requestsData })

  if (isLoading) return <RequestsTableSkeleton />;
  if (error) return <div>Error loading data</div>;

  const requests = requestsData?.responseObject || [];
  const isEmpty = requests.length === 0;

  const handleRequestClick = (request : IRequest) => {
    setSelectedRequest(request);
    toggleBar();
  };

  return (
    <PageContainer title='Talab va takliflar'>
      {isEmpty ? (
        <EmptyState />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>№</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request: IRequest, index: number) => (
              <TableRow key={request.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell 
                  className='text-blue-600 hover:text-blue-800 cursor-pointer' 
                  onClick={() => handleRequestClick(request)}
                >
                  {request.content}
                </TableCell>
                <TableCell>
                  <span className='text-green-600 hover:text-green-800 cursor-pointer'>
                    {request.type || 'N/A'}
                  </span>
                </TableCell>
                <TableCell>{request.createdAt ? new Date(request.createdAt).toLocaleString() : 'N/A'}</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <RightSidebar onSubmit={() => {}} noBtn={true} title='Talab va takliflar'>
        {selectedRequest && (
          <>
            <div className="mb-4">
            </div>
            <div className="mb-4">
              <p className="font-semibold">Fikr turi:</p>
              <p>{selectedRequest.type == "DEMAND" ? "Talab" : "Taklif" }</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Rent car nomi:</p>
              <p>{selectedRequest.user.name || 'N/A'}</p>
            </div>

            <div className="mb-4">
            <p className="font-semibold">Izoh:</p>
            <p>{selectedRequest.content}</p>
            </div>
          </>
        )}
      </RightSidebar>
    </PageContainer>
  );
}