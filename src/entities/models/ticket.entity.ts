import { ObjectId } from "mongoose";


export interface ITicketEntity {
    _id?: ObjectId | string
    ticketId: string;
    title?:string
    amount: number
    name: string;
    quantity:number;
    email: string;
    paymentStatus: 'pending' | 'successfull' | 'failed';
    qrCodeLink: string;
    eventId: ObjectId | string
    clientId: ObjectId | string;
    ticketStatus: 'used' | 'refunded' | 'unused'
    eventName?: string
    eventDate?: Date[]
    Images?:string[]    
    // paymentTransactionId?: string
    checkInHistory?: Date[]
    isCheckedIn?: boolean
    ticketType: string
}