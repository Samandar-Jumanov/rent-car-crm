import React from 'react';
import { Textarea } from "@/components/ui/textarea";


type ITemplateProps = {
        setName : ( value : string) => void;
        setMessage : ( value : string) => void;
}
export const CreateTemplate: React.FC<ITemplateProps> = ( { setMessage , setName}) => {
  return (
    <div className="space-y-6">
      <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nomi
        </label>
        <div className="mt-1">
          <input
            id="name"
            name="name"
            type="text"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 hover:border-indigo-400 text-gray-900 bg-white"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Xabar
        </label>
        <Textarea
          placeholder="Xabaringizni kiriting"
          className="mt-1"
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
    </div>
  );
};