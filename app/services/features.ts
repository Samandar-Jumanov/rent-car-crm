import apiClient from "@/utils/axios";

export async function getAllFeatures(currentPage : number , pageSize : number) {
         const response = await apiClient.get(`/features` , {
             params : {
                  pageSize ,
                  currentPage
             }
         });
         return response.data;
}


export const createFeature = async  ( data : { title  : string , icon : File } ) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('icon', data.icon);
    const response = await apiClient.post(`/features`, formData);
    return response.data;
}


export const updateFeature = async  (id : string , data : { title : string  }  ) => {
    const response = await apiClient.put(`/features/${id}`, data);
    return response.data;
}


export const deleteFeature = async (id : string) => {
    const response = await apiClient.delete(`/features/${id}`,);
    return response.data;
}