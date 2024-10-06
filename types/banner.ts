 import { z } from "zod";
 
const CarStatusEnum = z.enum(['FREE', "RENTED"]);


  
 export interface ICar {
  id: string;
  brendId: string; 
  modelId: string;
  colorId: string;
  carBrendId  : string 
  title: string;
  price: number;
  isDiscounted: boolean;
  discountedPrice?: number | null;
  images: string[];
  status: z.infer<typeof CarStatusEnum>;
  ratings: number[];
  averageRating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBanner {
    id: string;
    title: string;
    choosenImage: string;
    carId: string;
    active: boolean;
    car : ICar
  }