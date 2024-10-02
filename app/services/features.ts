import apiClient from "@/utils/axios";

export async function getAllFeatures() {
         const response = await apiClient.get(`/features`);
         return response.data;
}




