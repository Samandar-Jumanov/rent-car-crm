"use client"

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { updatePassword } from '../services/settings';
import type { IServiceResponse } from "@/types/server.response";
import type { IRentCar } from "@/types/rent-car";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from 'react-hot-toast';

// Define the schema for password update data
const PasswordUpdateSchema = z.object({
  adminPassword: z.string().min(1, "Admin password is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type PasswordUpdateData = z.infer<typeof PasswordUpdateSchema>;

const PasswordUpdatePage: React.FC = () => {
  const [formData, setFormData] = useState<PasswordUpdateData>({
    adminPassword: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation<IServiceResponse<IRentCar>, Error, PasswordUpdateData>({
    mutationFn: updatePassword,
    onSuccess: (data) => {
        console.log({ data })
      if (data.success) {
        toast.success(data.message || 'Password updated successfully');
        setFormData({ adminPassword: '', password: '' });
        setConfirmPassword('');
        queryClient.invalidateQueries({ queryKey: ['user'] }); 
      } else {
        toast.error(data.message || 'Failed to update password');
      }
    },
    onError: (error) => {
      console.error('Error updating password:', error);
      toast.error('Could not update password');
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitting")
    if (formData.password !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      const validatedData = PasswordUpdateSchema.parse(formData);
      mutation.mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 lg:ml-64">
      <main className="flex-grow p-4 lg:p-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <h1 className="text-2xl font-bold text-blue-800">Update Password</h1>
          </CardHeader>
          <CardContent>
            <div  className="space-y-4">
              <div>
                <label htmlFor="adminPassword" className="block text-sm font-medium text-gray-700">
                  Current Admin Password
                </label>
                <Input
                  id="adminPassword"
                  name="adminPassword"
                  type="password"
                  value={formData.adminPassword}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full"
              onClick={handleSubmit}
            >
              {mutation.isPending ? 'Updating...' : 'Update Password'}
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default PasswordUpdatePage;