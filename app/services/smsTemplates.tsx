import apiClient from "@/utils/axios";

export async function getAllSmsTemplates(currentPage : number , pageSize : number) {
         const response = await apiClient.get(`/sms-templates` , {
              params : {
                         currentPage,
                         pageSize,
                }
         });
         return response.data;
}


export const createNewSmsTemplate = async  ( data : { title  : string , content : string} ) => {
    const response = await apiClient.post(`/sms-templates`, data);
    return response.data;
}


export const updateSmsTemplate = async  ( id : string , data : { title  : string , content : string}  ) => {
    const response = await apiClient.put(`/sms-templates/${id}`, data);
    return response.data;
}



export const deleteSmsTemplate = async  (id : string ) => {
    const response = await apiClient.delete(`/sms-templates/${id}`);
    return response.data;
}



