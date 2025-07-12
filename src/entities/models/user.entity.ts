
import { TRole } from "@shared/constants"
import { ObjectId } from "mongoose"

export interface IUserEntity{
    _id:ObjectId,
    name:string,
    email:string,
    phone:string,
    role?:TRole,
    password:string,
    status?:string,
    createdAt:Date,
    updatedAt:Date
}