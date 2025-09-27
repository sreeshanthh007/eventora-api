


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
    paymentTransactionId?:string,
    quantity:number
}

export interface paginatedTicketDTO{

    ticketId:string,
    email:string,
    name:string,
    title:string,
    eventSchedule:Date[],
    qrCodeLink:string,
    ticketStatus:'used' | 'unused' | 'refunded',
    amount:number,
    ticketType:string,
    paymentStatus:"pending" | "successful" | "failed",
    quantity:number
}


