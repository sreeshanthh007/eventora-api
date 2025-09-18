import { ObjectId } from "mongoose"


export interface TicketDTO{
    clientId:string,
    ticketId:string
    email:string,
    name:string,
    eventId:string,
    qrCodeLink:string,
    ticketStatus:'used' | 'unused' | 'refunded'
    amount:number
    ticketType:string
    paymentStatus:"pending" | "successful" | "failed";
    paymentTransactionId:string,
    quantity:number
}