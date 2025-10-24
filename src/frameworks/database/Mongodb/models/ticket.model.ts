import { ITicketEntity } from "@entities/models/ticket.entity";
import { model, ObjectId } from "mongoose";
import { ticketSchema } from "../schemas/ticket.schema";



export interface ITicketModel extends Omit<ITicketEntity, "_id"> {
  _id: ObjectId;
}

export const ticketModel = model<ITicketModel>("Ticket",ticketSchema)