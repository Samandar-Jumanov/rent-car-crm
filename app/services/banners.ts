import apiClient from "@/utils/axios";
import { IServiceResponse } from "@/types/server.response";
import { IBanner } from "@/types/banner";

export const getAllBanners = async (currentPage : number , pageSize : number): Promise<IServiceResponse<IBanner[]>> => {
  const response = await apiClient.get('/banners', {
    params: {
      currentPage,
      pageSize,
    },
  });
  return response.data;
};

export const createNewBanner  = async (data: {
  title : string,
  choosenImage : string,
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
  bannerId: string,
  data: { title: string }
): Promise<IServiceResponse<IBanner>> => {
  const response = await apiClient.put(`/banners/${bannerId}`, data);
  return response.data;
};