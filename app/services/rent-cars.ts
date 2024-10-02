


import apiClient from "@/utils/axios";

export async function getAllBrands() {
         const response = await apiClient.get(`/brands`);
         return response.data;
}



