import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type ICreateFeatureProps = {
  setName: (value: string) => void;
  setLogo: (value: string) => void;
  setActive: (value: boolean) => void;
}

export const CreateBanner: React.FC<ICreateFeatureProps> = ({
  setName,
  setLogo,
  setActive
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          Nomi
        </Label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                     focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                     disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none
                     invalid:border-pink-500 invalid:text-pink-600
                     focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="logo" className="text-sm font-medium text-gray-700">
          Logo
        </Label>
        <input
          id="logo"
          name="logo"
          type="file"
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-50 file:text-indigo-700
                     hover:file:bg-indigo-100"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="active" onCheckedChange={setActive} />
        <Label htmlFor="active" className="text-sm font-medium text-gray-700">
          Active
        </Label>
      </div>
    </div>
  );
};