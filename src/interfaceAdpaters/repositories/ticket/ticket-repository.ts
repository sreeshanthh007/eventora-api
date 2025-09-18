import { ITicketEntity } from "@entities/models/ticket.entity";
import { ITicketRepository } from "@entities/repositoryInterfaces/ticket/ticket-repository-interface";
import { ticketModel } from "@frameworks/database/Mongodb/models/ticket.model";

console.log("ticket rreposirorot");

export class TicketRepository implements ITicketRepository{

    async createTicket(ticket: ITicketEntity): Promise<void> {
        await ticketModel.create(ticket)
    }
}