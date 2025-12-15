import { TTicketEntityWithEventPopulated } from "@entities/models/populated-types/ticket-populated.type";
import { ITicketEntity } from "@entities/models/ticket.entity";


export interface ITicketRepository {
    createTicket(ticket:ITicketEntity[]) : Promise<void>
    findTicketsByClientId(search:string,clientId:string,skip:number,limit:number) : Promise<{tickets:TTicketEntityWithEventPopulated[] | []; total:number}>
    findTicketById(ticketId:string) : Promise<ITicketEntity | null>
    findTicketsByEventId(eventId:string) : Promise<ITicketEntity[]>
    findPaginatedTicketDetails(eventId:string,skip:number,limit:number,search:string) : Promise<{tickets:ITicketEntity[] | []; total:number}>
    findTicketsByIdAndVerifyTicket(ticketId:string) : Promise<void>
    findTicketByIdAndCancel(ticketId:string) : Promise<void>
    
}