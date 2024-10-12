import apiClient from "@/utils/axios";
import { IServiceResponse } from "@/types/server.response";
import { IBanner } from "@/types/banner";

export const getAllBanners = async (currentPage : number , pageSize : number): Promise<IServiceResponse<IBanner[]>> => {
  const response = await apiClient.get('/banners/all', {
    params: {
      currentPage,
      pageSize,
    },
  });
  return response.data;
};

export const createNewBanner  = async (data: {
  title : string,
  choosenImage : File,
  carId : string 
}): Promise<IServiceResponse<IBanner>> => {
  const response = await apiClient.post(`/banners/${data.carId}`, data);
  return response.data;
};

export const deleteBanner = async (brandId: string): Promise<IServiceResponse<void>> => {
  const response = await apiClient.delete(`/banners/${brandId}`);
  return response.data;
};

export const updateBanner = async (
   data : {
       bannerId : string ,
       data : { title ? : string; choosenImage ? : File; carId ?: string } 
   }
): Promise<IServiceResponse<IBanner>> => {
  const response = await apiClient.put(`/banners/${data.bannerId}`, data.data);
  return response.data;
};