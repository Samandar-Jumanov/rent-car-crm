import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CreateFeatureProps {
  featureTitle: string;
  setFeatureTitle: (title: string) => void;
  featureIcon: File | null;
  setFeatureIcon: (image: File | null) => void;
}

export function CreateFeature({
  featureTitle,
  setFeatureTitle,
  featureIcon,
  setFeatureIcon
}: CreateFeatureProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (featureIcon) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(featureIcon);
    } else {
      setImagePreview(null);
    }
  }, [featureIcon]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFeatureIcon(e.target.files[0]);
    }
  };

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
        <Label htmlFor="image">Feature Image</Label>
        <Input
          id="image"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      {imagePreview && (
        <div className="mt-4">
          <Label>Image Preview</Label>
          <div className="mt-2 relative w-40 h-40 rounded-lg overflow-hidden">
            <img
              src={imagePreview}
              alt="Feature preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
      {featureIcon && (
        <Button
          variant="outline"
          onClick={() => {
            setFeatureIcon(null);
            setImagePreview(null);
          }}
        >
          Remove Image
        </Button>
      )}
    </div>
  );
}