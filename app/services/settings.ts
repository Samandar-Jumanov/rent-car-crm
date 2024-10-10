import apiClient from "@/utils/axios";

export const updatePassword = async (data: { adminPassword : string , password : string } ) => {
    const response = await apiClient.post('/users/admin/settings/password', data);
    return response.data;
  };