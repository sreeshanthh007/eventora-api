
import { ObjectId } from "mongoose";
import { IUserEntity } from "./user.entity";

export type  status = 'pending' | 'verified' | 'rejected';

export interface IVendorEntity extends IUserEntity{
    vendorId:string,
    category?:ObjectId,
    bio:string,
    place:string,
    rejectionReason:string,
    vendorStatus:string,
    profilePicture:string
}