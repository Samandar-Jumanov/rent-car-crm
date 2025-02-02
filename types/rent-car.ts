import { z } from "zod";

export const PaymentType = z.enum(["CARD", "TERMINAL", "CASH"]);
export const CarDelivery  = z.enum(['TAKE_AWAY' , "DELIVER"])
export const MirrorType  = z.enum(['STANDARD' , "TINTED" , "ANTI_GLARE" , "HEATED" , "AUTO_DIMMING"])
export const FuelType  = z.enum(['PETROL' , "DIESEL" , "ELECTRIC" , "HYBRID"])



export interface IBrend {
  id: string;
  userId: string;
  logo: string;
  brendName: string;
  ownerNumber: string;
  cityId : string;
  password: string;
  carDelivery : z.infer<typeof CarDelivery>
  payment: z.infer<typeof PaymentType>;
  ratings : number[];
  averageRating: number
  createdAt: Date;
  updatedAt: Date;
}


export interface ICity {
  id: string;
  name: string;
  regionId: string;
  region : IRegion
} 

export interface IRegion {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
  
export interface IRentCar {
  id: string;
  userId: string;
  logo: string;
  brendName: string;
  ownerNumber: string;
  password: string;
  carDelivery: any;
  topBrendId: string | null;
  payment: any;
  ratings: number[];
  averageRating: number;
  city  : ICity
  createdAt: Date;
  updatedAt: Date;
}





  
 export  interface IRentCarFormData {
    brendName: string;
    ownerNumber: string;
    logo : File;
    carDelivery?: any;
    payment?: any;
    password : string
    cityId : string 
  }