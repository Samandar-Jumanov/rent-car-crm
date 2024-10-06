import apiClient from "@/utils/axios";
import { IServiceResponse } from "@/types/server.response";
import { ICarBrand } from "@/types/car.brand";

interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
}

export const getAllCarBrands = async (
  currentPage: number,
  pageSize: number
): Promise<IServiceResponse<PaginatedResponse<ICarBrand>>> => {
  const response = await apiClient.get<IServiceResponse<PaginatedResponse<ICarBrand>>>(`/car-brands`, {
    params: {
      currentPage,
      pageSize,
    },
  });
  return response.data;
};

export const createCarBrand = async (data: {
  brandName: string;
}): Promise<IServiceResponse<ICarBrand>> => {
  const response = await apiClient.post<IServiceResponse<ICarBrand>>(`/car-brands`, {
    carBrend: data.brandName
  });
  return response.data;
};

export const deleteCarBrand = async (brandId: string): Promise<IServiceResponse<void>> => {
  const response = await apiClient.delete<IServiceResponse<void>>(`/car-brands/${brandId}`);
  return response.data;
};

export const updateCarBrand = async (
  brandId: string,
  data: { brandName: string }
): Promise<IServiceResponse<ICarBrand>> => {
  const response = await apiClient.put<IServiceResponse<ICarBrand>>(`/car-brands/${brandId}`, data);
  return response.data;
};