import apiClient from "@/utils/axios";

export async function getAllFeatures() {
         const response = await apiClient.get(`/features`);
         return response.data;
}


export const createFeature = async  ( data : { title  : string , icon : string} ) => {
    const response = await apiClient.post(`/features`, data);
    return response.data;
}


export const updateFeature = async  (data : { title  : string , link : string}  ) => {
    const response = await apiClient.put(`/features`, data);
    return response.data;
}


