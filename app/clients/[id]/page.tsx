"use client";

import React, { useState } from 'react';
import { useParams } from "next/navigation";
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { UserCircle, BadgeCheck, Car, Phone, User,  Calendar } from 'lucide-react';
import { getOneUser } from '@/app/services/clients';
import { ErrorDisplay } from '@/components/shared/ErrorDisplay';
import { UserListSkeleton } from '@/components/skeletons/user.skeleton';
import { Card, CardContent } from '@/components/ui/card';

const Client = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('info');

  const { data: userResponse, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getOneUser(String(id)),
    enabled: !!id,
  });

  if (!id) return <ErrorDisplay error="User ID not provided" />;
  if (isLoading) return <UserListSkeleton />;
  if (error) return <ErrorDisplay error={error} />;
  if (!userResponse || !userResponse.responseObject) return <ErrorDisplay error="User not found" />;

  const user = userResponse.responseObject;

  const UserAvatar = () => {
    console.log({ user : user.image })
    if (user.image) {
      return (
        <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-50">
          <Image
            src={user.image}
            alt={`${user.name} ${user.surname}`}
            fill
            className="object-cover"
          />
        </div>
      );
    }

    return <UserCircle className="w-24 h-24 text-gray-400" />;
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="relative">
              <UserAvatar />
              <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                <div className="bg-yellow-50 rounded-full p-1">
                  <span className="text-yellow-600 font-semibold text-sm">5</span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {user.name} {user.surname}
              </h1>
              {user.isVerified && (
                <div className="flex items-center text-blue-600 bg-blue-50 w-fit px-3 py-1.5 rounded-full">
                  <BadgeCheck className="w-4 h-4 mr-1.5" />
                  <span className="text-sm font-medium">Verified Customer</span>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'info' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('info')}
            >
              Customer Info
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'tarix' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('tarix')}
            >
              History
            </button>
          </div>

          {/* Content */}
          {activeTab === 'info' && (
            <div className="grid gap-4">
              <InfoRow icon={<User className="w-4 h-4" />} label="First Name" value={user.name} />
              <InfoRow icon={<User className="w-4 h-4" />} label="Last Name" value={user.surname} />
              <InfoRow icon={<User className="w-4 h-4" />} label="Father's Name" value={user.fatherName} />
              <InfoRow icon={<Phone className="w-4 h-4" />} label="Phone Number" value={user.phoneNumber} />
            </div>
          )}

          {activeTab === 'tarix' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      №
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Rentcar Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {user.rentals && user.rentals.length > 0 ? (
                    user.rentals.map((rental: { car: { brand: { name: string } }, createdAt: string, id: string }, index: number) => (
                      <tr key={rental.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Car className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-900">{rental.car.brand.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-500">
                              {new Date(rental.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-sm text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <Car className="w-8 h-8 mb-2" />
                          <p>No rental history available</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | null }) => (
  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
    <div className="text-gray-400 mr-3">{icon}</div>
    <div className="flex-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-sm font-medium">{value || 'N/A'}</p>
    </div>
  </div>
);

export default Client;