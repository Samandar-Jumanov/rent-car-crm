import { ILoginFormData } from "@/lib/schemas/acc";
import { API_BASE_URL  } from "@/utils/axios";
import axios from "axios"



export const loginUser = async (  data : ILoginFormData) => {
   const response = await axios.post(`${API_BASE_URL}/users/admin/login` , {
     phoneNumber : data.phoneNumber,
     password : data.password,
   });
   return response.data;
}

