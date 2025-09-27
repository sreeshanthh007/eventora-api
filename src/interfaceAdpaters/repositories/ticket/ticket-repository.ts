import { ITicketEntity } from "@entities/models/ticket.entity";
import { ITicketRepository } from "@entities/repositoryInterfaces/ticket/ticket-repository-interface";
import { ticketModel } from "@frameworks/database/Mongodb/models/ticket.model";
import { FilterQuery } from "mongoose";




export class TicketRepository implements ITicketRepository{

    async createTicket(ticket: ITicketEntity): Promise<void> {
        await ticketModel.create(ticket)
    }

  async findTicketsByClientId(filter: FilterQuery<ITicketEntity>, clientId: string, skip: number, limit: number): Promise<{ tickets: ITicketEntity[] | []; total: number; }> {

       const [bookedEvents,total] = await Promise.all([
            await ticketModel.find({...filter,clientId:clientId}).populate("eventId","title eventSchedule").sort({createdAt:-1}).skip(skip).limit(limit),
            await ticketModel.countDocuments({...filter,clientId:clientId})
        ]);

        return {
            total,
            tickets:bookedEvents
        }
  }
}