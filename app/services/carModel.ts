import apiClient from "@/utils/axios";

export const getAllModels = async ( currentPage : number , pageSize : number  ) => {
       const response = await apiClient.get(`/models` , {
                params : {
                         currentPage,
                         pageSize,
                }
       });
       return response.data;
}

export const createModel = async (modelName : string ) => {
       const response = await apiClient.post(`/models`, { modelName });
       return response.data;
}

export const deleteModel = async ( modelId : string ) => {
       const response = await apiClient.delete(`/models/${modelId}`);
       return response.data;
}

export const updateModel = async (modelId : string , brandName : string ) => {
       const response = await apiClient.put(`/models/${modelId}`, { brandName });
       return response.data;
}