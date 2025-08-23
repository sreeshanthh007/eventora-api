


export interface IAddEventDTO {
    title:string,
    description:string;
    date:Date,
    status:string,
    startTime:string,
    endTime:string,
    pricePerTicket:number,
    totalTicket : number,
    ticketLimit:number,
    eventLocation:string;
    coordinates : {
        type:"Point";
        coordinates:number[]
    };
    Images:string[];
    createdAt?:Date,
    updatedAt?:Date
}


export interface EventTableDTO{
    _id?:string,
    title:string,
    image:string,
    status:string,
    isActive?:boolean
    pricePerTicket:number
    totalTicket:number
}


export interface IUpdateEventStatusDTO {
    eventId: string;
    isActive: boolean;
}   