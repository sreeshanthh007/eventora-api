import { IEventEntity } from "@entities/models/event.entity";
import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { EventModel } from "@frameworks/database/Mongodb/models/event.model";
import { IUpdateEventDTO } from "@shared/dtos/event.dto";
import { FilterQuery, ObjectId, PipelineStage } from "mongoose";

export class EventRepository implements IEventRepository{
    async save(data: IEventEntity): Promise<void> {
        await EventModel.create(data)
    }

    async findEvents(): Promise<IEventEntity[]> {
        return await EventModel.find({isActive:true})
    }


    async findEventByIdForDetailsPage(eventId: string): Promise<IEventEntity | null> {
        return await EventModel.findById(eventId)
    
    }

   async findPaginatedEvents(filter: FilterQuery<IEventEntity>, skip: number, limit: number): Promise<{ events: IEventEntity[] | []; total: number; }> {
        const [events,total] = await Promise.all([
           await EventModel.find(filter).sort({createdAt:-1}).skip(skip).limit(limit),
           await EventModel.countDocuments(filter)
        ]);
        return {events,total}
    }


    async findfilteredEvents(filters: { search?: string; location?: string; sort?: string; lat?: number; lng?: number; }, skip: number, limit: number): Promise<{ events: IEventEntity[] | []; total: number; }> {
        
        const {search,location,sort,lat,lng} = filters

        const filter : FilterQuery<IEventEntity> = {isActive:true}

        if(search){
            filter.$or=[
                {title:{$regex:search,$options:"i"}}
            ]
        }

        if (location && location !== "near-me" && location !== "all") {
        filter.eventLocation = { $regex: location, $options: "i" };
      }

        let sortStage: Record<string, 1 | -1> = {};

            switch (sort) {
                case "date-asc":
                sortStage = { "eventSchedule.date": 1 };
                break;
                case "date-desc":
                sortStage = { "eventSchedule.date": -1 };
                break;
                case "price-high":
                sortStage = { effectivePrice: -1 };
                break;
                case "price-low":
                sortStage = { effectivePrice: 1 };
                break;
                default:
                sortStage = { createdAt: -1 }; 
                break;
                case "name-asc" :
                sortStage = {"title":1}
                break;
                case "name-desc" :
                sortStage = {"title":-1}
                break;
            }

        const pipeline : PipelineStage[] = [];


  if (location === "near-me" && lat && lng) {
    pipeline.push({
      $geoNear: {
        near: { type: "Point", coordinates: [lng, lat] },
        distanceField: "distance",
        spherical: true,
        maxDistance:5000,
        query:filter
      },
    });
  } else if(location== "10-20km" && lat && lng) {

    pipeline.push({
      $geoNear: {
        near: { type: "Point", coordinates: [lng, lat] },
        distanceField: "distance",
        spherical: true,
        minDistance:0,
        maxDistance:10000,
        query:filter
      },
    });
  }else{
    pipeline.push({ $match: filter });

  }

  
  pipeline.push({
    $addFields: {
      effectivePrice: {
        $cond: [
          { $ifNull: ["$pricePerTicket", false] },
          "$pricePerTicket",
          { $max: "$tickets.pricePerTicket" },
        ],
      },
    },
  });

  pipeline.push({ $sort: sortStage });
  pipeline.push({ $skip: skip });
  pipeline.push({ $limit: limit });

  const events = await EventModel.aggregate(pipeline);


  const total =
    location === "near-me" && lat && lng
      ? events.length 
      : await EventModel.countDocuments(filter);

  return { events, total };
    }

    async findById(eventId: string): Promise<IEventEntity | null> {
        return  await EventModel.findById(eventId)
    }

    async findByIdAndToggleStatus(evendId: string,isActive:boolean): Promise<void> {
        await EventModel.findByIdAndUpdate(evendId,
            {isActive},
            {new:true}
        )
    }

    async updateEvent(eventId: string, updateData: IUpdateEventDTO): Promise<void> {
        await EventModel.findByIdAndUpdate(
            eventId,
            {$set:updateData},
            {new:true}
        )
    }


    async updateEventStatus(eventId: string, eventStatus: string): Promise<void> {
        await EventModel.findByIdAndUpdate(
            eventId,
            {
                $set:{
                    status:eventStatus
                },
                new:true
            }
        )
    }

    async updateAfterTicketBooking(eventId: string | ObjectId, quantity: number, ticketType?: string): Promise<void> {
        
      if(ticketType!==""){
        await EventModel.updateOne(
          {_id:eventId,"tickets.ticketType":ticketType},
          {
            $inc:{
              attendiesCount:quantity,
              "tickets.bookedTickets":quantity,
              "tickets.totalTickets":-quantity
            }
          }
        )
      }else{
        await EventModel.updateOne(
          {_id:eventId},
          {
            $inc:{
              bookedTickets:quantity,
              attendiesCount:quantity,
              totalTicket:-quantity
            }
          }
        )
      }
    }
}