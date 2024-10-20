import { ILoginFormData } from "@/lib/schemas/acc";
import { API_BASE_URL, local } from "@/utils/axios";
import axios from "axios"



export const loginUser = async (  data : ILoginFormData) => {
   const response = await axios.post(`${local}/users/admin/login` , {
     phoneNumber : data.phoneNumber,
     password : data.password,
   });
   return response.data;
}

