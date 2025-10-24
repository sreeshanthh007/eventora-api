import { IPaginatedTicketDetailsDTO } from "@shared/dtos/ticket.dto";

export interface PaginatedTicketDetails{
    tickets:IPaginatedTicketDetailsDTO[]
    total:number
}