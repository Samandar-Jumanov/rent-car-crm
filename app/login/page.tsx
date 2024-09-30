"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { ILoginFormData } from '@/lib/schemas/acc';
import { loginUser } from '@/app/services/auth';
import { loginSchema } from '@/lib/schemas/acc';
import { useAuthSession } from '@/lib/hooks/useAuth';

export default function Login() {
  const initialFormData: ILoginFormData = {
    phoneNumber: '',
    password: '',
  };

  const [formData, setFormData] = useState<ILoginFormData>(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setUserAuth } = useAuthSession()

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data ) => {
      toast.success('Login successful!');
      setUserAuth( data.responseObject.token)
      router.push('/');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = loginSchema.parse(formData);
      mutation.mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          toast.error(issue.message);
        });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Login</title>
        <meta name="description" content="Login to access your account" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl sm:text-4xl font-extrabold text-gray-900 drop-shadow-md">
          AVTORIZATSIYA
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          Please sign in to your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 transition-all duration-300 hover:shadow-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Telefon raqam
              </label>
              <div className="mt-1">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 hover:border-indigo-400 text-gray-900 bg-white"
                  placeholder="Enter your phone number"
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
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-300 hover:border-indigo-400 text-gray-900 bg-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-500" /> : <FaEye className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {mutation.isPending ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}