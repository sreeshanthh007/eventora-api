import { ObjectId } from "mongoose";


export interface ITicketEntity {
    _id?: ObjectId | string
    ticketId: string;
    amount: number
    name: string;
    quantity:number;
    email: string;
    paymentStatus: 'pending' | 'successful' | 'failed';
    qrCodeLink: string;
    eventId: ObjectId | string;
    clientId: ObjectId | string;
    ticketStatus: 'used' | 'refunded' | 'unused'
    // paymentTransactionId?: string
    // checkInHistory?: Date[]
    ticketType: string
}