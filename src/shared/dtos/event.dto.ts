


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
    location : {
        type:"Point";
        coordinates:number[]
    };
    Images:string[];
    createdAt?:Date,
    updatedAt?:Date
}


type EditableFields = Pick<
  IAddEventDTO,
  | "title"
  | "description"
  | "date"
  | "startTime"
  | "endTime"
  | "pricePerTicket"
  | "totalTicket"
  | "ticketLimit"
  | "eventLocation"
  | "location"
  | "Images"
>;


export type IUpdateEventDTO = Partial<EditableFields>;

export interface EventTableDTO{
    _id?:string,
    title:string,
    image:string,
    status:string,
    isActive?:boolean
    pricePerTicket:number
    totalTicket:number,
    startTime:string;
    endTime:string;
    date:Date
}


// export interface IUpdateEventStatusDTO {
//     eventId: string;
//     isActive: boolean;
// }   