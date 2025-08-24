import { ObjectId } from "mongoose";



export interface IEventEntity {
    _id?:string | ObjectId,
    title:string,
    description:string;
    date:Date,
    status:string,
    startTime:string,
    endTime:string,
    pricePerTicket:number,
    totalTicket : number,
    isActive?:boolean;
    // ticketLimit:number,
    eventLocation:string;
    coordinates : {
        type:"Point";
        coordinates:number[]
    };
    Images:string[];
    hostId:string | ObjectId;
    createdAt?:Date,
    updatedAt?:Date
}