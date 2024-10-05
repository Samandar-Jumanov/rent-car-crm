import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Eye, EyeOff } from 'lucide-react';
import { getAllRegions } from '@/app/services/regions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IServiceResponse } from '@/types/server.response';

interface Region {
  id: string;
  name: string;
  cities: City[];
}
type City = {
    id : string ,
    name : string 
}

interface FormData {
  name: string;
  phone: string;
  password: string;
  logo: string;
  regionId: string;
  cityId: string;
}

interface RentCarFormProps {
  formData: FormData;
  handleInputChange: (name: string, value: string) => void;
  handleSubmit: () => void;
  isLoading: boolean;
}

const RentCarForm: React.FC<RentCarFormProps> = ({ formData, handleInputChange, handleSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [previewLogo, setPreviewLogo] = useState<string>('');

  const { data: regionsResponse, isLoading: isLoadingRegions, error: regionsError } = useQuery<IServiceResponse<Region[]>>({
    queryKey: ['regions'],
    queryFn: getAllRegions,
  });

  const regions = useMemo(() => regionsResponse?.responseObject || [], [regionsResponse]);

  const selectedRegion = useMemo(() => 
    regions.find(( region : Region) => region.id === formData.regionId),
    [regions, formData.regionId]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewLogo(objectUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleInputChange('logo', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoadingRegions) return <div>Loading regions...</div>;
  if (regionsError) return <div>Error loading regions: {(regionsError as Error).message}</div>;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Rent Car Registration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo upload section */}
          <div>
            <Label htmlFor="logo">Logo</Label>
            <div className="mt-1 flex items-center space-x-4">
              {previewLogo && (
                <div className="relative h-20 w-20">
                  <img 
                    src={previewLogo}
                    alt="Logo preview"
                    className="rounded-lg object-cover h-full w-full border border-gray-200"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 rounded-full bg-red-100 p-1 text-red-600 hover:bg-red-200"
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
              )}
              <div className="flex-1">
                <Input
                  id="logo"
                  name="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Recommended: Square image, at least 200x200 pixels
                </p>
              </div>
            </div>
          </div>

          {/* Name input */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter rent car name"
              required
            />
          </div>

          {/* Phone input */}
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* Password input */}
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Eye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Password must be at least 8 characters long
            </p>
          </div>

          {/* Region select */}
          <div>
            <Label htmlFor="region">Region</Label>
            <Select 
              onValueChange={(value) => {
                handleInputChange('regionId', value);
                handleInputChange('cityId', ''); // Reset city when region changes
              }} 
              value={formData.regionId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region : Region ) => (
                  <SelectItem key={region.id} value={region.id}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City select */}
          {formData.regionId && (
            <div>
              <Label htmlFor="city">City</Label>
              <Select onValueChange={(value) => handleInputChange('cityId', value)} value={formData.cityId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  {selectedRegion?.cities.length === 0 ? (
                    <SelectItem value="no-cities">No cities available</SelectItem>
                  ) : (
                    selectedRegion?.cities.map((city : City) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Submit button */}
          <Button onClick={handleSubmit} disabled={!formData.cityId || isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </CardContent>
      </Card>

      {/* Form Hints */}
      <Card className="bg-blue-50">
        <CardContent className="p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm text-blue-700">
                Hamma inputlar to&apos;ldirishi shart 
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RentCarForm;