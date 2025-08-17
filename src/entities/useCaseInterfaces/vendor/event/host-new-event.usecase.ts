import { IEventEntity } from "@entities/models/event.entity";


export interface IHostNewEventUseCase {
    execute(data:IEventEntity) : Promise<void>
}

