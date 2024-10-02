import { Button } from "../ui/button";
import { Building2 , PlusCircle  } from "lucide-react";

export const EmptyState: React.FC<{ onCreateClick: () => void 
}> = ({ onCreateClick }) => (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-white rounded-lg shadow-sm">
      <Building2 className="h-16 w-16 text-blue-600 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Rent carlar hali mavjud emas </h3>
      <Button 
        onClick={onCreateClick} 
        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
      >
        <PlusCircle className="h-4 w-4" />
            Birinchi rent car ni yarating 
      </Button>
    </div>
  );