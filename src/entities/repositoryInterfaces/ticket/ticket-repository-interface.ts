import { ITicketEntity } from "@entities/models/ticket.entity";


export interface ITicketRepository {
    createTicket(ticket:ITicketEntity) : Promise<void>
}