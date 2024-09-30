import { ILoginFormData } from "@/lib/schemas/acc";
import axios from "axios"


export const loginUser = async (  data : ILoginFormData) => {
   const response = await axios.post(`http://localhost:8080/users/admin/login` , {
     phoneNumber : data.phoneNumber,
     password : data.password,
   });
   return response.data;
}

