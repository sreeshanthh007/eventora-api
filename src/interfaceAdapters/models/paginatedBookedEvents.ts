import { paginatedTicketDTO } from "@shared/dtos/ticket.dto";


export interface paginatedBookedEvents{
    bookedEvents: paginatedTicketDTO[] | [],
    total:number    
}