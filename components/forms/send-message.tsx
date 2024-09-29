import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const SendMessage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="template" className="block text-sm font-medium text-gray-700">
          Shablonni tanlang
        </label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Shablonni tanlang" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="shablon1">Shablon 1</SelectItem>
            <SelectItem value="shablon2">Shablon 2</SelectItem>
            <SelectItem value="shablon3">Shablon 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Xabar
        </label>
        <Textarea
          placeholder="Xabaringizni kiriting"
          className="mt-1"
        />
      </div>
    </div>
  );
};