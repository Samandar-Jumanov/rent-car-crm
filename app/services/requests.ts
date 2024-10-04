import apiClient from "@/utils/axios";

export async function getAllRequests() {
         const response = await apiClient.get(`/requests`);
         return response.data;
}