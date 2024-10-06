import apiClient from "@/utils/axios";

export async function getAllRequests(currentPage : number , pageSize : number) {
         const response = await apiClient.get(`/requests` , {
              params : {
                   currentPage , pageSize
              }
         });
         return response.data;
}