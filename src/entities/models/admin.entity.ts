
import { ObjectId } from "mongoose";
import { TRole } from "@shared/constants";

export interface IAdminEntity{
        _id:ObjectId,
        name:string,
        email:string,
        role?:TRole,
        password:string,
        profileImage?:string,
}