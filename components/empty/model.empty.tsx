import React from 'react';
import { Button } from "@/components/ui/button";
import { Building2, PlusCircle } from "lucide-react";

interface EmptyStateProps {
  onCreateClick: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateClick }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
    <Building2 className="h-16 w-16 text-blue-600 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">No models available yet</h3>
    <p className="text-gray-500 mb-4">Create your first car model to get started</p>
    <Button
      onClick={onCreateClick}
      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
    >
      <PlusCircle className="h-4 w-4" />
      Create First Model
    </Button>
  </div>
);
