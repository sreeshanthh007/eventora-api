import { TRole } from "@shared/constants";
import { ObjectId } from "mongoose";

export interface CreateAdminDTO {
  name: string;
  email: string;
  password: string;
  role?: TRole;
  profileImage?: string;
}





export interface AdminResponseDTO {
  _id: ObjectId;
  name: string;
  email: string;
  role?: TRole;
  profileImage?: string;
  
}