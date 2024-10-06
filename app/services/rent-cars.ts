
import { IServiceResponse } from "@/types/server.response";

import { IRentCar, IRentCarFormData } from "@/types/rent-car";
import apiClient from "@/utils/axios";

export async function getAllBrands( currentPage : number , pageSize : number) {
         const response = await apiClient.get(`/brends/all` , {
            params: {
              currentPage,
              pageSize,
            },
         }
         );
         return response.data;
}

export const createBrand = async (data: IRentCarFormData): Promise<IServiceResponse<IRentCar>> => {
    const { regionId , ...rest } = data
    console.log({ regionId})
    const response = await apiClient.post('/brends/new', rest);
    return response.data;
  };
  
 export  const updateBrand = async (  id: string, data: IRentCarFormData ): Promise<IServiceResponse<IRentCar>> => {
    const response = await apiClient.put(`/brends/${id}`, data);
    return response.data;
  };
  


  export const deleteBrand = async (id: string): Promise<IServiceResponse<void>> => {
    const response = await apiClient.delete(`/brends/${id}`);
    return response.data;
  };