import { IEventEntity } from "@entities/models/event.entity";
import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { EventModel } from "@frameworks/database/Mongodb/models/event.model";
import { IUpdateEventDTO } from "@shared/dtos/event.dto";
import { FilterQuery } from "mongoose";

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


    async findfilteredEvents(filter: FilterQuery<IEventEntity>, skip: number, limit: number, sort: Record<string, 1 | -1>): Promise<{ events: IEventEntity[] | []; total: number; }> {
        
        const [events,total] = await Promise.all([
            EventModel.find(filter).sort(sort).skip(skip).limit(limit),
            EventModel.countDocuments(filter)
        ]);

        return {events,total}
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
}