import { ObjectId } from "mongoose";

export type TpaymentType = "refund" | "ticketBooking" | "top-up" | "bookingPayment" | "adminCommission"
export type TPaymentstatus = "debit" | "credit"
export interface ITransactionEntity {
    _id?:ObjectId
    walletId:string
    currency:string
    paymentStatus:TPaymentstatus
    amount:number
    date?:Date
    paymentType:TpaymentType
        paymentFor: {
        resourceType: "event" | "service"
        resourceId: ObjectId;
    };
}