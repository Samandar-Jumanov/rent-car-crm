
import { IServiceResponse } from "@/types/server.response";

import { IRentCar, IRentCarFormData } from "@/types/rent-car";
import apiClient from "@/utils/axios";

export async function getAllBrands( currentPage : number , pageSize : number) {
         const response = await apiClient.get(`/brends/some` , {
            params: {
              currentPage,
              pageSize,
            },
          }
         );

         return response.data;
}
export async function getBrands ( ) {
  const response = await apiClient.get(`/brends/all`);
  return response.data;
}



export const createBrand = async (data: IRentCarFormData): Promise<IServiceResponse<IRentCar>> => {
    const { regionId , ...rest } = data
    String(regionId)
    const response = await apiClient.post('/brends/new', rest);
    return response.data;
  };

  interface UpdateBrandData {
    id: string;
    brendName: string;
    ownerNumber: string;
    password?: string;
    logo?: string;
    regionId: string;
    cityId: string;
  }
  
  export const updateBrand = async (data: UpdateBrandData): Promise<IServiceResponse<IRentCar>> => {
    const { regionId, ...updateData } = data;
    String(regionId)
    const response = await apiClient.put(`/brends/${data.id}`, updateData);
    return response.data;
  };

  export const deleteBrand = async (id: string): Promise<IServiceResponse<void>> => {
    const response = await apiClient.delete(`/brends/${id}`);
    return response.data;
  };