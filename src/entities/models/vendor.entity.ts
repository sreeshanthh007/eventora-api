
import { IUserEntity } from "./user.entity";

export type  status = 'pending' | 'verified' | 'rejected';

export interface IVendorEntity extends IUserEntity{
    vendorId:string,
    about:string,
    place:string,
    rejectionReason:string,
    vendorStatus:"pending" | "approved" | "rejected",
    profilePicture:string,
    idProof:string,
    // businessName:string
}