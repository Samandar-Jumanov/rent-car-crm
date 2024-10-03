import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ModelFormProps {
  modelName: string;
  setModelName: (value: string) => void;
}

export const ModelForm: React.FC<ModelFormProps> = ({ modelName, setModelName }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="modelName">Model Name</Label>
        <Input
          id="modelName"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          placeholder="Enter model name"
        />
      </div>
    </div>
  );
};