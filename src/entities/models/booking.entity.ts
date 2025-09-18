import { ObjectId } from "mongoose";


export interface IBookingEntity {
    _id:ObjectId
    vendorId:ObjectId,
    serviceId:ObjectId,
    clientId:ObjectId,
    date: Date[],
    vendorApproval:"Pending" | "Approved" | "Rejected";
    email:string
    name:string
    phone:string
     rejectionReason?: string
    status: "Pending" | "Rejected" | "Completed" | "Cancelled"
     isComplete: boolean
}