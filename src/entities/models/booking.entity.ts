import { ObjectId } from "mongoose";


export interface IBookingEntity {
    vendorId:ObjectId,
    serviceId:ObjectId,
    clientId:ObjectId,
    date: Date,
    vendorApproval:string,
    
}