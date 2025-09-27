import { ITicketEntity } from "@entities/models/ticket.entity";
import { FilterQuery } from "mongoose";


export interface ITicketRepository {
    createTicket(ticket:ITicketEntity) : Promise<void>
    findTicketsByClientId(filter:FilterQuery<ITicketEntity>,clientId:string,skip:number,limit:number) : Promise<{tickets:ITicketEntity[] | []; total:number}>
}