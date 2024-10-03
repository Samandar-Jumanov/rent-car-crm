import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface EmptyStateProps {
  onCreateClick: () => void;
}

export function EmptyState({ onCreateClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <div className="text-center space-y-3">
        <h3 className="text-2xl font-semibold text-gray-900">No brands yet</h3>
        <p className="text-gray-500">Get started by creating a new car brand.</p>
        <Button 
          onClick={onCreateClick}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add First Brand
        </Button>
      </div>
    </div>
  );
}