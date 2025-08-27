import { IEventEntity } from "@entities/models/event.entity";


export interface IHostNewEventUseCase {
    execute(data:IEventEntity,userId:string) : Promise<void>
}

