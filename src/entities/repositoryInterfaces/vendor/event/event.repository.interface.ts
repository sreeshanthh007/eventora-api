import { IEventEntity } from "@entities/models/event.entity";


export interface IEventRepository {
    save(data:IEventEntity) : Promise<void>
}