import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from '@tanstack/react-query';
import { getAllSmsTemplates } from '@/app/services/smsTemplates';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

interface SmsTemplate {
  id: string;
  title: string;
  content: string;
}

export const SmsTemplateSelector: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  const { data: templatesResponse, isLoading, error } = useQuery({
    queryKey: ['smsTemplates', 1, 10],
    queryFn: () => getAllSmsTemplates(1, 10),
  });

  const templates = templatesResponse?.responseObject?.templates || [];

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
    const template = templates.find((t: SmsTemplate) => t.id === value);
    if (template) {
      setMessage(template.content);
    }
  };

  console.log({ templatesResponse })

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="font-semibold">Xato</AlertTitle>
        <AlertDescription>
          Shablonlarni yuklashda xatolik yuz berdi: {(error as Error).message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div>
        <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-2">
          Shablonni tanlang
        </label>
        {isLoading ? (
          <Skeleton className="w-full h-10" />
        ) : templates.length > 0 ? (
          <Select onValueChange={handleTemplateChange} value={selectedTemplate}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Shablonni tanlang" />
            </SelectTrigger> 
            <SelectContent>
              {templates.map((template: SmsTemplate) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <div className="flex-1">
              <AlertTitle className="font-semibold text-yellow-800">Diqqat</AlertTitle>
              <AlertDescription className="text-yellow-700">
                Hozircha hech qanday shablon mavjud emas.
              </AlertDescription>
            </div>
            <Button 
              onClick={() => router.push("/templates")}
              className="ml-auto bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              Yangi yaratish
            </Button>
          </Alert>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Xabar
        </label>
        {isLoading ? (
          <Skeleton className="w-full h-32" />
        ) : (
          <Textarea
            placeholder="Xabaringizni kiriting"
            className="mt-1 w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};