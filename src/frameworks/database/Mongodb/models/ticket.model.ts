import { ITicketEntity } from "@entities/models/ticket.entity";
import { model, ObjectId } from "mongoose";



export interface ITicketModel extends Omit<ITicketEntity,"_id">,Document{
    _id:ObjectId
}

export const ticketModel = model<ITicketModel>("Ticket")