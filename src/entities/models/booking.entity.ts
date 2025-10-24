export type TServiceBookingStatus = "pending" | "ongoing" | "completed" | "cancelled";
export type TPaymentStatus = "pending" | "successfull" | "failed" | "refunded";

export interface IBookingEntity{
    bookingId:string
    clientId?:string;
    serviceId?:string
    vendorId?:string
    email:string
    name:string
    phone:string
    currency:string
    bookingSlot:{
        startDateTime:Date
        endDateTime:Date
    }
    status:TServiceBookingStatus
    paymentStatus:TPaymentStatus
    paymentId:string
    amount:number
    createdAt?:Date
    updatedAt?:Date
}