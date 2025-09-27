
import { TRole } from "@shared/constants"
import { ObjectId } from "mongoose"

export interface IUserEntity{
    _id:ObjectId,
    name:string,
    email:string,
    phone:string,
    role?:TRole,
    idProof?:string,
    password:string,
    googleId?:string,
    profileImage?:string,
    about?:string,  
    place?:string,
    status?:string,
    vendorStatus?:string,
    rejectionReason?:string
    vendorId?:string
    createdAt?:Date,
    updatedAt?:Date
}