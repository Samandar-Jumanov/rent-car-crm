
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
      const formData = new FormData();
      formData.append("brendName", data.brendName)
      formData.append("ownerNumber", data.ownerNumber)
      formData.append("password", data.password)
      formData.append("logo", data.logo )
      formData.append("cityId", data.cityId)
    const response = await apiClient.post('/brends/new', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;

  };

  interface UpdateBrandData {
    id: string;
    brendName: string;
    ownerNumber: string;
  }
  
  export const updateBrand = async (data : UpdateBrandData ): Promise<IServiceResponse<IRentCar>> => {
    const response = await apiClient.put(`/brends/${data.id}`, data);
    return response.data;
  };

  export const deleteBrand = async (id: string): Promise<IServiceResponse<void>> => {
    const response = await apiClient.delete(`/brends/${id}`);
    return response.data;
  };