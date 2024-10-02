"use client"
import React from 'react';
import { IErrorDisplayProps } from "@/types/error"
import { Alert , AlertDescription  , AlertTitle} from '../ui/alert';
import { AlertCircle } from 'lucide-react';

export const ErrorDisplay: React.FC<IErrorDisplayProps> = ({ error }) => (
    <div className="flex flex-col min-h-screen bg-gray-100 lg:ml-64">
      <main className="flex-grow p-4 lg:p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error instanceof Error ? error.message : 'An unknown error occurred'}
            </AlertDescription>
          </Alert>
        </div>
      </main>
    </div>
  );
  