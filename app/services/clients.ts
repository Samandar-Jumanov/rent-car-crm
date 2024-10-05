
import apiClient from "@/utils/axios";

export async function getAllUsers() {
         const response = await apiClient.get(`/users?role=AGENT?status=active`);
         return response.data;
}



export const getOneUser = async ( userId : string ) => {
    const response = await apiClient.get(`/users/${userId}`);
    console.log({ response });
    return response.data;
}

export async function blockUser (userId : string ){
    const response = await apiClient.post(`/users/admin/block/${userId}`);
    return response.data;
}


export async function unblockUser  (userId : string ){
    const response = await apiClient.delete(`/users/admin/block/${userId}`);
    return response.data;
}


export const getBlockedUsers = async() =>  {}