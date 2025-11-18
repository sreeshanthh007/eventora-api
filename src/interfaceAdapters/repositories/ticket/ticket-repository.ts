import { IEventEntity } from "@entities/models/event.entity";
import { TTicketEntityWithEventPopulated } from "@entities/models/populated-types/ticket-populated.type";
import { ITicketEntity } from "@entities/models/ticket.entity";
import { ITicketRepository } from "@entities/repositoryInterfaces/ticket/ticket-repository-interface";
import { ticketModel } from "@frameworks/database/Mongodb/models/ticket.model";
import { FilterQuery } from "mongoose";




export class TicketRepository implements ITicketRepository{

    async createTicket(ticket: ITicketEntity[]): Promise<void> {
        await ticketModel.insertMany(ticket)
    }


    async findTicketById(ticketId: string): Promise<ITicketEntity | null> {
        return await ticketModel.findOne({ticketId:ticketId});
    }

    async findTicketsByClientId(filter: FilterQuery<TTicketEntityWithEventPopulated>, clientId: string, skip: number, limit: number): Promise<{ tickets: TTicketEntityWithEventPopulated[] | []; total: number; }> {
      filter.paymentStatus = { $in: ["failed", "successfull"] };

       const [bookedEvents, total] = await Promise.all([
    ticketModel
      .find({ ...filter, clientId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate<{ eventId: Pick<IEventEntity, "Images" | "eventSchedule" | "_id"> }>({
        path: "eventId",
        select: "Images eventSchedule",
      })
      .lean(),
    ticketModel.countDocuments({ ...filter, clientId }),
  ]);

    return {    
        total,
        tickets: bookedEvents
    }
    }


  async findTicketsByEventId(eventId: string): Promise<ITicketEntity[]> {
      
    return await ticketModel.find({eventId:eventId})
  }

  async findPaginatedTicketDetails(eventId: string, skip: number, limit: number,search:string): Promise<{ tickets: ITicketEntity[] | []; total: number; }> {
      
      const filter : FilterQuery<ITicketEntity> = {eventId:eventId,paymentStatus:"successfull"}

      if(search){
        filter.$or = [
          {name:{$regex:search}},
          {email:{$regex:search}}
        ];
      }

      const [tickets,total] = await Promise.all([
        await ticketModel.find(filter).sort({createdAt:-1}).skip(skip).limit(limit),
        await ticketModel.countDocuments(filter)
      ]);


      return {
        tickets,
        total
      }
  }


  async findTicketsByIdAndVerifyTicket(ticketId: string): Promise<void> {
      
    await ticketModel.updateOne({ticketId:ticketId},{isCheckedIn:true,ticketStatus:"used"});
  }


  async findTicketByIdAndCancel(ticketId: string): Promise<void> {
      
    await ticketModel.findOneAndUpdate(
      {ticketId:ticketId},
      {ticketStatus:"refunded"},
       {new:true}
    )
  }
}