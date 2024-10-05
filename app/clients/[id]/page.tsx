"use client";

import React, { useState } from 'react';
import { useParams } from "next/navigation";
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { getOneUser } from '@/app/services/clients';
import { ErrorDisplay } from '@/components/shared/ErrorDisplay';
import { UserListSkeleton } from '@/components/skeletons/user.skeleton';

const Client = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('info');

  const { data: userResponse, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getOneUser(String(id)),
    enabled: !!id,
  });

  if (!id) {
    return <ErrorDisplay error="User ID not provided" />;
  }

  if (isLoading) return <UserListSkeleton />;
  if (error) return <ErrorDisplay error={error} />;
  if (!userResponse || !userResponse.responseObject) return <ErrorDisplay error="User not found" />;

  const user = userResponse.responseObject;

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">{user.name} {user.surname}</h1>
        
        <div className="flex mb-6">
          <div className="flex-shrink-0 mr-4 relative">
            {user.image ? (
              <Image
                src={user.image}
                alt={`${user.name} ${user.surname}`}
                width={80}
                height={80}
                className="rounded-full"
              />
            ) : (
              <FaUserCircle className="text-gray-400 w-20 h-20" />
            )}
            <div className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md">
              <span className="text-yellow-500 font-bold text-sm">5</span>
            </div>
          </div>
          
          {user.isVerified && (
            <div className="flex items-center text-blue-500">
              <MdVerified className="w-5 h-5 mr-1" />
              <span className="text-sm">Customer verified</span>
            </div>
          )}
        </div>

        <div className="flex space-x-2 mb-4">
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'info' ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-600'}`}
            onClick={() => setActiveTab('info')}
          >
            Mijoz ma&apos;lumotlari
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'tarix' ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-600'}`}
            onClick={() => setActiveTab('tarix')}
          >
            Tarix
          </button>
        </div>

        {activeTab === 'info' && (
          <div className="space-y-2">
            <div className="bg-gray-100 p-3 rounded-md flex">
              <p className="text-sm text-gray-500 w-1/3">Ism</p>
              <p className="text-sm font-medium w-2/3">{user.name || 'N/A'}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-md flex">
              <p className="text-sm text-gray-500 w-1/3">Familiya</p>
              <p className="text-sm font-medium w-2/3">{user.surname || 'N/A'}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-md flex">
              <p className="text-sm text-gray-500 w-1/3">Otasining ismi</p>
              <p className="text-sm font-medium w-2/3">{user.fatherName || 'N/A'}</
              p>
            </div>
            <div className="bg-gray-100 p-3 rounded-md flex">
              <p className="text-sm text-gray-500 w-1/3">Telefon raqam</p>
              <p className="text-sm font-medium w-2/3">{user.phoneNumber || 'N/A'}</p>
            </div>
          </div>
        )}

        {activeTab === 'tarix' && (
          <div className="bg-white rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    N°
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rentcar nomi
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sana
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {user.rentals && user.rentals.length > 0 ? (
                  user.rentals.map((rental : { car : { brand : { name : string }} , createdAt : string , id : string }, index : number ) => (
                    <tr key={rental.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {rental.car.brand.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(rental.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      No rentals available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Client;