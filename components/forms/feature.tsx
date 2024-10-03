import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface CreateBannerProps {
  title: string;
  active: boolean;
  choosenImage: string;
  carId: string;
  setTitle: (value: string) => void;
  setActive: (value: boolean) => void;
  setChoosenImage: (value: string) => void;
  setCarId: (value: string) => void;
}

export const CreateBanner: React.FC<CreateBannerProps> = ({
  title,
  active,
  choosenImage,
  carId,
  setTitle,
  setActive,
  setChoosenImage,
  setCarId
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Banner Title</Label>
        <Input
          id="title"
          placeholder="Enter banner title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="choosenImage">Image URL</Label>
        <Input
          id="choosenImage"
          placeholder="Enter image URL"
          value={choosenImage}
          onChange={(e) => setChoosenImage(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="carId">Car ID</Label>
        <Input
          id="carId"
          placeholder="Enter car ID"
          value={carId}
          onChange={(e) => setCarId(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="active"
          checked={active}
          onCheckedChange={setActive}
        />
        <Label htmlFor="active">Active</Label>
      </div>
    </div>
  );
};