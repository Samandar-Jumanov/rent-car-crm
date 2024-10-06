import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormValues {
  title: string;
  content: string;
}

interface CreateTemplateProps {
  initialData?: Partial<FormValues>;
}

export const   CreateTemplate = ({ initialData }: CreateTemplateProps)=> {
  const [formData, setFormData] = useState<FormValues>({
    title: initialData?.title || "",
    content: initialData?.content || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Template Title
        </label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter template title"
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Template Content
        </label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Enter template content"
          className="mt-1"
        />
      </div>
    </div>
  );
}