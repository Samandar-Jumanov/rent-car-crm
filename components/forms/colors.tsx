import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateColorProps {
  colorName: string;
  setColor: (value: string) => void;
}

export const CreateColor: React.FC<CreateColorProps> = ({ colorName, setColor }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="colorName">Color Name</Label>
        <Input
          id="colorName"
          placeholder="Enter color name"
          value={colorName}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
    </div>
  );
};