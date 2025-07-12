
import { ObjectId } from "mongoose"
import { status } from "./vendor.entity";


export interface IVendorVerificationEntity {
    _id:ObjectId,
    vendorId:ObjectId,
    businessName:string,
    name:string,
    email:string,
    place:string,
    contactNumber:string,
    category:{
        categoryName:string,
        yearOfExperience:number
    }[];

    idProof:string,
    status:status,
    rejectionReason?:string,
    verifiedAt?:string,
    createdAt:Date,
    updatedAt:Date

}