import { IEventEntity } from "@entities/models/event.entity";
import { TEventEntityWithVendorPopulated } from "@entities/models/populated-types/event-populated.type";
import { IVendorEntity } from "@entities/models/vendor.entity";
import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { EventModel } from "@frameworks/database/mongodb/models/event.model";
import { IUpdateEventDTO } from "@shared/dtos/event.dto";
import mongoose, { FilterQuery, ObjectId, PipelineStage } from "mongoose";

export class EventRepository implements IEventRepository{
    async save(data: IEventEntity): Promise<void> {
        await EventModel.create(data)
 
    }


    async createManyTickets(tickets: IEventEntity[]): Promise<IEventEntity[]> {
        
      return await EventModel.insertMany(tickets)
    }

    async findEvents(): Promise<IEventEntity[]> {
        const today = new Date();
        today.setHours(0, 0, 0, 0)
        return await EventModel.find({
          isActive:true,
          "eventSchedule.date": { $gte: today }
        })
    }


    async findEventByIdForDetailsPage(eventId: string): Promise<TEventEntityWithVendorPopulated | null> {
        return await EventModel.findById(eventId) .populate<{ hostId: IVendorEntity }>("hostId", "name email profilePicture") 
      .lean();
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
        minDistance:10 * 1000,
        maxDistance:20*1000,
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
        
    if(ticketType !== undefined && ticketType !== ""){
        await EventModel.updateOne(
          {_id:eventId,"tickets.ticketType":ticketType},
          {
            $inc:{
              attendiesCount:quantity,
           "tickets.$.bookedTickets": quantity,
          "tickets.$.totalTickets": -quantity 
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


    async findEventsHostedByVendors(vendorId: string,eventId:string): Promise<IEventEntity | null> {
      const trimmedEventId = eventId.trim();
      return await EventModel.findOne({hostId: new mongoose.Types.ObjectId(vendorId),eventId:trimmedEventId}).lean()
    }

    async findHostIdFromEvents(eventId: string): Promise<TEventEntityWithVendorPopulated | null> {
        return await EventModel.findById(eventId).populate<{hostId:IVendorEntity}>("hostId").lean()
    }

    async findEventsHostedByVendorsForAdmin(skip: number, limit: number, search: string,filterBy:string): Promise<{ events: TEventEntityWithVendorPopulated[]; total: number }>{
        
      const filter : FilterQuery<IEventEntity> = {}

      if(filterBy){
        filter.status = filterBy
      }
      
      if(search){
        filter.title = {$regex:search,$options:"i"}
      }

      const [events,total] = await Promise.all([
        EventModel.find(filter)
        .populate<{ hostId: IVendorEntity }>({
          path: "hostId",
          select: "name profilePicture"
        })
         .sort({createdAt:-1})
        .skip(skip)
        .limit(limit)
        .lean(),
        EventModel.countDocuments(filter)
      ])
      

    
      return  {
        events:events,
        total
      }
    }
}