import { ObjectId } from "mongoose";

export interface IPaymentEntity {
    _id?:ObjectId
    userId:ObjectId | string
    receiverId:ObjectId | string
    ticketId?:ObjectId | string
    bookingId:ObjectId | string
    amount:number
    currency:string
    purpose:"ticketBooking" | "serviceBooking"
    status:"pending" | "success" | "failed"
    paymentId:string
}