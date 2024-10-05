import apiClient from "@/utils/axios";
import { IServiceResponse } from "@/types/server.response";
import { ICarBrand } from "@/types/car.brand";

export const getAllCarBrands = async (): Promise<IServiceResponse<ICarBrand[]>> => {
  const response = await apiClient.get(`/car-brands`);
  return response.data;
};

export const createCarBrand = async (data: {
  brandName: string;
}): Promise<IServiceResponse<ICarBrand>> => {
  const response = await apiClient.post(`/car-brands`, {
    carBrend : data.brandName
  });
  return response.data;
};

export const deleteCarBrand = async (brandId: string): Promise<IServiceResponse<void>> => {
  const response = await apiClient.delete(`/car-brands/${brandId}`);
  return response.data;
};

export const updateCarBrand = async (
  brandId: string,
  data: { brandName: string }
): Promise<IServiceResponse<ICarBrand>> => {
  const response = await apiClient.put(`/car-brands/${brandId}`, data);
  return response.data;
};