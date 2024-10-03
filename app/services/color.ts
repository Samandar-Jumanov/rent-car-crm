import { IColor } from '@/types/color';
import { IServiceResponse } from '@/types/server.response';
import apiClient from '@/utils/axios';

export const getAllColors = async (): Promise<IServiceResponse<IColor[]>> => {
  const response = await apiClient.get(`/car-colors`);
  return response.data;
};

export const createColor = async (colorData: { color: string }): Promise<IServiceResponse<IColor>> => {
  const response = await apiClient.post(`/car-colors`, { color : colorData.color });
  return response.data;
};

export const deleteColor = async (id: string): Promise<IServiceResponse<void>> => {
  const response = await apiClient.delete(`/car-colors/${id}`);
  return response.data;
};