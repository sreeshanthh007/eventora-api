import { ObjectId } from "mongoose";



export interface IEventEntity {
    _id?:string | ObjectId,
    title:string,
    description:string;
    status:string,
    pricePerTicket:number,
    totalTicket : number,
    attendiesCount:number
    bookedTickets?:number,
    maxTicketPerUser?:number
     tickets?: {
    ticketType: string;           // e.g. Silver, Gold, Platinum
    pricePerTicket: number;
    totalTickets: number;
    bookedTickets?: number;
    maxTicketsPerUser: number;
  }[];
    isActive?:boolean;
    eventLocation:string;
     eventSchedule: {
    date: Date;
    startTime: string;
    endTime: string;
  }[];
    location : {
        type:"Point";
        coordinates:number[]
    };
    Images:string[];
    hostId:string | ObjectId;
    createdAt?:Date,
    updatedAt?:Date
}