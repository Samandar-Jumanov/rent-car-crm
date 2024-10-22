import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getBrands } from '@/app/services/rent-cars';
import { IServiceResponse } from '@/types/server.response';
import { ICar, IBanner } from '@/types/banner';
import { IBrend } from '@/types/rent-car';

interface CreateBannerProps {
  title: string;
  brandId: string;
  carId: string;
  image: File | null;
  setTitle: (value: string) => void;
  setBrandId: (value: string) => void;
  setCarId: (value: string) => void;
  setImage: (file: File | null) => void;
  isEditing: boolean;
  currentBanner?: IBanner;
}

export const CreateBanner: React.FC<CreateBannerProps> = ({
  title,
  brandId,
  carId,
  image,
  setTitle,
  setBrandId,
  setCarId,
  setImage,
  isEditing,
  currentBanner
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data: brandsResponse, isLoading, error } = useQuery<IServiceResponse<IBrend[]>>({
    queryKey: ['allBrands'],
    queryFn: getBrands,
  });

  useEffect(() => {
    if (isEditing && currentBanner) {
      setTitle(currentBanner.title);
      setBrandId(currentBanner.id || '');
      setCarId(currentBanner.carId || '');
      // Set preview URL for existing banner image
      if (currentBanner.choosenImage) {
        setPreviewUrl(currentBanner.choosenImage);
      }
    }
  }, [isEditing, currentBanner, setTitle, setBrandId, setCarId]);

  // Clean up object URL when component unmounts or when new image is selected
  useEffect(() => {
    return () => {
      if (previewUrl && !previewUrl.startsWith('http')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Clean up previous preview URL if it exists
      if (previewUrl && !previewUrl.startsWith('http')) {
        URL.revokeObjectURL(previewUrl);
      }
      
      // Create new preview URL
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (previewUrl && !previewUrl.startsWith('http')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  const brands = brandsResponse?.responseObject || [];
  const selectedBrand = brands.find((brand: IBrend) => brand.id === brandId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? 'Banner tahrirlash' : 'Banner yaratish'}
      </h2>

      <div className="space-y-2">
        <Label htmlFor="nomi">Nomi</Label>
        <Input
          id="nomi"
          placeholder="Enter banner name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {!isEditing && (
        <>
          <div className="space-y-2">
            <Label htmlFor="brandId">Rent car</Label>
            <Select value={brandId} onValueChange={setBrandId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand: IBrend) => (
                  <SelectItem key={brand.id} value={brand.id}>{brand.brendName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="carId">Avtomobil</Label>
            <Select value={carId} onValueChange={setCarId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a car" />
              </SelectTrigger>
              <SelectContent>
                {selectedBrand?.cars.map((car: ICar) => (
                  <SelectItem key={car.id} value={car.id}>{car.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <div className="space-y-4">
          {previewUrl && (
            <div className="relative w-full max-w-md">
              <img
                src={previewUrl}
                alt="Banner preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
          <Input
            id="image"
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            className="w-full"
          />
          {image && <p className="text-sm text-gray-500">Selected file: {image.name}</p>}
        </div>
      </div>
    </div>
  );
};