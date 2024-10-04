import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateFeatureProps {
  featureTitle: string;
  setFeatureTitle: (title: string) => void;
  featureIcon: string;
  setFeatureIcon: (icon: string) => void;
}

export function CreateFeature({ 
  featureTitle, 
  setFeatureTitle, 
  featureIcon, 
  setFeatureIcon 
}: CreateFeatureProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Feature Title</Label>
        <Input
          id="title"
          value={featureTitle}
          onChange={(e) => setFeatureTitle(e.target.value)}
          placeholder="Enter feature title"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="icon">Feature Icon</Label>
        <Input
          id="icon"
          value={featureIcon}
          onChange={(e) => setFeatureIcon(e.target.value)}
          placeholder="Enter feature icon (e.g., 'car', 'house')"
        />
      </div>
    </div>
  );
}