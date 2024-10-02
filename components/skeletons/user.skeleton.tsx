"use client"
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs,  TabsList } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export const UserListSkeleton: React.FC = () => (
    <div className="flex flex-col min-h-screen bg-gray-100 lg:ml-64">
      <main className="flex-grow p-4 lg:p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-40" /> {/* Title skeleton */}
          </div>
          <Tabs defaultValue="aktivlar" className="w-full">
            <TabsList className="mb-4">
              <Skeleton className="h-10 w-24 mr-2" /> {/* Tab skeleton */}
              <Skeleton className="h-10 w-24" /> {/* Tab skeleton */}
            </TabsList>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {['', '№', 'Nomi', 'Telefon raqam', "Ro'yxatda o'tgan sana", 'Amallar'].map((header, index) => (
                      <TableHead key={index}>
                        <Skeleton className="h-4 w-full" />
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(5)].map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {[...Array(6)].map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          {cellIndex === 2 ? (
                            <div className="flex items-center space-x-2">
                              <Skeleton className="h-8 w-8 rounded-full" />
                              <Skeleton className="h-4 w-24" />
                            </div>
                          ) : (
                            <Skeleton className="h-4 w-full" />
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Tabs>
          <div className="mt-4 flex items-center justify-between">
            <Skeleton className="h-4 w-16" /> {/* Page number skeleton */}
            <div className="space-x-2">
              <Skeleton className="h-8 w-8 inline-block" /> {/* Pagination button skeleton */}
              <Skeleton className="h-8 w-8 inline-block" />
              <Skeleton className="h-8 w-8 inline-block" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );