import React, { useEffect } from 'react';
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
  const { data: brandsResponse, isLoading, error } = useQuery<IServiceResponse<IBrend[]>>({
    queryKey: ['allBrands'],
    queryFn: getBrands,
  });

  useEffect(() => {
    if (isEditing && currentBanner) {
      setTitle(currentBanner.title);
      setBrandId(currentBanner.car.brendId);
      setCarId(currentBanner.carId);
      // Note: We don't set the image here as it's not typically sent back from the server
      // You might want to display the current image URL instead
    }
  }, [isEditing, currentBanner, setTitle, setBrandId, setCarId]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
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

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input
          id="image"
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
        />
        {image && <p className="text-sm text-gray-500">Selected file: {image.name}</p>}
        {isEditing && currentBanner && !image && (
          <div className="mt-2">
            <p className="text-sm text-gray-500">Current image:</p>
            <img src={currentBanner.choosenImage} alt={currentBanner.title} className="mt-1 max-w-xs rounded" />
          </div>
        )}
      </div>

      {isEditing && (
        <p className="text-sm text-gray-500 mt-4">
          Note: Leave the image field empty if you don&apos;t want to change the current image.
        </p>
      )}
    </div>
  );
};