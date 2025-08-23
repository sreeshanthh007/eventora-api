import { IEventEntity } from "@entities/models/event.entity";
import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { EventModel } from "@frameworks/database/Mongodb/models/event.model";
import { FilterQuery } from "mongoose";


export class EventRepository implements IEventRepository{
    async save(data: IEventEntity): Promise<void> {
        await EventModel.create(data)
    }

   async findPaginatedEvents(filter: FilterQuery<IEventEntity>, skip: number, limit: number): Promise<{ events: IEventEntity[] | []; total: number; }> {
        const [events,total] = await Promise.all([
           await EventModel.find(filter).sort({createdAt:-1}).skip(skip).limit(limit),
           await EventModel.countDocuments(filter)
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
}