
import apiClient from "@/utils/axios";

export async function getAllUsers() {
         const response = await apiClient.get(`/users?role=AGENT`);
         return response.data;
}




export async function blockUser (){}