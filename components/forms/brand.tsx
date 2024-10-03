import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CarBrandFormProps {
  brandName: string;
  onBrandNameChange: (value: string) => void;
}

export function CarBrandForm({ brandName, onBrandNameChange }: CarBrandFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="brandName">Brand Name</Label>
        <Input
          id="brandName"
          placeholder="Enter brand name"
          value={brandName}
          onChange={(e) => onBrandNameChange(e.target.value)}
        />
      </div>
      <p className="text-sm text-gray-500">
        Enter the name of the car brand. This will be displayed in the brands list and used for categorizing cars.
      </p>
    </div>
  );
}