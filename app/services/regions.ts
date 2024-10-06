import apiClient from "@/utils/axios";

export async function getAllRegions() {
         const response = await apiClient.get(`/regions/all`);
         return response.data;
}


export const getOneRegion = async ( regionId : string ) => {
    const response = await apiClient.get(`/regions/${regionId}` );
    return response.data;
}



// export async function createRegion (userId : string ){
//     const response = await apiClient.post(`/users/admin/block/${userId}`);
//     return response.data;
// }


// export async function unblockUser  (userId : string ){
//     const response = await apiClient.delete(`/users/admin/block/${userId}`);
//     return response.data;
// }


// export const getBlockedUsers = async() =>  {}
