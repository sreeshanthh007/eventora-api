import { IEventEntity } from "@entities/models/event.entity";
import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { EventModel } from "@frameworks/database/Mongodb/models/event.model";

export class EventRepository implements IEventRepository{
    async save(data: IEventEntity): Promise<void> {
        await EventModel.create(data)
    }
}