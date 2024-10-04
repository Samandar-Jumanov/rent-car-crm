import React from 'react';
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  icon: z.string().min(1, "Icon is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateTemplateProps {
  onSubmit: (data: FormValues) => void;
  initialData?: Partial<FormValues>;
}

export function CreateTemplate({ onSubmit, initialData }: CreateTemplateProps): JSX.Element {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { title: "", icon: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Template Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter template title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Template Icon</FormLabel>
              <FormControl>
                <Input placeholder="Enter template icon" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}