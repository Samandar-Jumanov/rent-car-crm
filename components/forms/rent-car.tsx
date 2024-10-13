import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Eye, EyeOff, Upload } from 'lucide-react';
import { getAllRegions } from '@/app/services/regions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IServiceResponse } from '@/types/server.response';

interface Region {
  id: string;
  name: string;
  cities: City[];
}

type City = {
  id: string,
  name: string 
}

interface FormData {
  name: string;
  phone: string;
  password: string;
  logo: File | null;
  regionId: string;
  cityId: string;
}

interface RentCarFormProps {
  formData: FormData;
  handleInputChange: (name: string, value: string | File ) => void;
  isEditing: boolean;
}

const RentCarForm: React.FC<RentCarFormProps> = ({ formData, handleInputChange, isEditing }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [previewLogo, setPreviewLogo] = useState<string>('');

  const { data: regionsResponse, isLoading: isLoadingRegions, error: regionsError } = useQuery<IServiceResponse<Region[]>>({
    queryKey: ['regions'],
    queryFn: getAllRegions,
  });

  const regions = useMemo(() => regionsResponse?.responseObject || [], [regionsResponse]);

  const selectedRegion = useMemo(() => 
    regions.find((region: Region) => region.id === formData.regionId),
    [regions, formData.regionId]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewLogo(objectUrl);
      const reader = new FileReader();
      reader.onloadend = () => {
        // You can add additional logic here if needed
      };
      reader.readAsDataURL(file);
      handleInputChange("logo", file);
    }
  };

  if (isLoadingRegions) return <div className="flex justify-center items-center h-64">Loading regions...</div>;
  if (regionsError) return <div className="text-red-500 text-center">Error loading regions: {(regionsError as Error).message}</div>;

  return (
    <form className="max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {isEditing ? 'Edit Rent Car' : 'Rent Car Registration'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Name input */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-lg font-semibold">Company Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter rent car company name"
            required
            className="w-full"
          />
        </div>

        {/* Phone input */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-lg font-semibold">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Enter phone number"
            required
            className="w-full"
          />
        </div>
        
        {!isEditing && (
          <>
            {/* Logo upload */}
            <div className="space-y-2">
              <Label htmlFor="logo" className="text-lg font-semibold">Company Logo</Label>
              <div className="mt-1 flex items-center space-x-4">
                {previewLogo ? (
                  <div className="relative h-24 w-24">
                    <img 
                      src={previewLogo}
                      alt="Logo preview"
                      className="rounded-lg object-cover h-full w-full border-2 border-gray-200 shadow-sm"
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 rounded-full bg-red-100 p-1 text-red-600 hover:bg-red-200 transition-colors duration-200"
                      onClick={() => {
                        setPreviewLogo("");
                        handleInputChange('logo', "");
                      }}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="h-24 w-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                    <Upload size={24} />
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    id="logo"
                    name="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Label htmlFor="logo" className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Choose file
                  </Label>
                  <p className="mt-1 text-sm text-gray-500">
                    Recommended: Square image, at least 200x200 pixels
                  </p>
                </div>
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg font-semibold">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>

            {/* Region select */}
            <div className="space-y-2">
              <Label htmlFor="region" className="text-lg font-semibold">Region</Label>
              <Select 
                onValueChange={(value) => {
                  handleInputChange('regionId', value);
                  handleInputChange('cityId', '');
                }} 
                value={formData.regionId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region: Region) => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* City select */}
            {formData.regionId && (
              <div className="space-y-2">
                <Label htmlFor="city" className="text-lg font-semibold">City</Label>
                <Select onValueChange={(value) => handleInputChange('cityId', value)} value={formData.cityId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedRegion?.cities.length === 0 ? (
                      <SelectItem value="no-cities">No cities available</SelectItem>
                    ) : (
                      selectedRegion?.cities.map((city: City) => (
                        <SelectItem key={city.id} value={city.id}>
                          {city.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
          </>
        )}
      </CardContent>
    </form>
  );
};

export default RentCarForm;