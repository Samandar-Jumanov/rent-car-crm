import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface IBrandFormProps {
  setName: (value: string) => void;
  setPhone: (value: string) => void;
  setAddress: (value: string) => void;
  setPassword: (value: string) => void;
  setLogo: (value: string) => void;
  initialValues?: {
    name?: string;
    phone?: string;
    address?: string;
    logo?: string;
  };
}

export const RentCarForm: React.FC<IBrandFormProps> = ({
  setName,
  setPhone,
  setAddress,
  setPassword,
  setLogo,
  initialValues
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [previewLogo, setPreviewLogo] = useState<string>(initialValues?.logo || "");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Show preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewLogo(objectUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLogo(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
          Logo
        </label>
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
                  setLogo("");
                }}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          <div className="flex-1">
            <input
              id="logo"
              name="logo"
              type="file"
              accept="image/*"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 hover:border-indigo-400"
              onChange={handleFileChange}
            />
            <p className="mt-1 text-sm text-gray-500">
              Recommended: Square image, at least 200x200 pixels
            </p>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <div className="mt-1">
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={initialValues?.name}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 hover:border-indigo-400"
            placeholder="Enter rent car  name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <div className="mt-1">
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            defaultValue={initialValues?.phone}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 hover:border-indigo-400"
            placeholder="Enter phone number"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <div className="mt-1">
          <input
            id="address"
            name="address"
            type="text"
            required
            defaultValue={initialValues?.address}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 hover:border-indigo-400"
            placeholder="Enter address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 hover:border-indigo-400 pr-10"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
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

      {/* Form Hints */}
      <div className="rounded-md bg-blue-50 p-4">
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
      </div>
    </div>
  );
};
