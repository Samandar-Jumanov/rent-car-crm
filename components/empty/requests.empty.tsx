import React from 'react';
import { FileText } from 'lucide-react';

interface EmptyStateProps {}

export function EmptyState({}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4">
      <FileText className="h-12 w-12 text-gray-400" />
      <h3 className="text-lg font-semibold text-gray-800">No requests available</h3>
      <p className="text-sm text-gray-500 max-w-xs text-center">
        There are currently no requests to display. Once new requests are created, they will show up here.
      </p>
    </div>
  );
}
