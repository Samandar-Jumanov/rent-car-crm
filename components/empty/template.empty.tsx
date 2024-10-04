import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface EmptyStateProps {
  onCreateClick: () => void;
}

export function EmptyState({ onCreateClick }: EmptyStateProps): JSX.Element {
  return (
    <div className="text-center py-10">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No templates</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by creating a new template.</p>
      <div className="mt-6">
        <Button
          onClick={onCreateClick}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>
    </div>
  );
}