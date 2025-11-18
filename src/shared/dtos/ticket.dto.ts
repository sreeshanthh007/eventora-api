


export interface TicketDTO{
    clientId:string,
    ticketId:string
    title:string
    email:string,
    name:string,
    eventId:string
    qrCodeLink:string,
    ticketStatus:'used' | 'unused' | 'refunded'
    amount:number
    ticketType:string
    paymentStatus:"pending" | "successfull" | "failed";
    paymentTransactionId?:string,
    quantity:number
}

export interface ITicketPurchaseDTO {
  ticketType: string;
  quantity: number;
  pricePerTicket: number;
}

export interface paginatedTicketDTO{

    ticketId:string,
    email:string,
    title:string,
    eventId:string
    eventSchedule: {
    date: Date;
    startTime: string;
    endTime: string;
  }[];

    Images:string[]
    qrCodeLink:string,
    ticketStatus:'used' | 'unused' | 'refunded',
    amount:number,
    ticketType:string,
    paymentStatus:"pending" | "successfull" | "failed",
    quantity:number
}

export interface IPaginatedTicketDetailsDTO{
    name:string
    email:string
    ticketId:string
    qrCode:string
    ticketType:string
    isCheckedIn:boolean
    paymentStatus:"pending" | "successfull" | "failed",
}




