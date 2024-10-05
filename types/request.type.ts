import { IUser } from "./user";

export interface IRequest {
    id: string;
    content: string;
    type : "DEMAND" | "PROPOSAL";
    icon: string;
    user : IUser
    createdAt : Date
    updatedAt : Date;
  }