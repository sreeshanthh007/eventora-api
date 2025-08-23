import { IEventEntity } from "@entities/models/event.entity";
import { FilterQuery } from "mongoose";


export interface IEventRepository {
    save(data:IEventEntity) : Promise<void>
    findById(eventId:string) : Promise<IEventEntity | null>
    findPaginatedEvents(filter:FilterQuery<IEventEntity>,skip:number,limit:number) : Promise<{events:IEventEntity[] | []; total:number}>
    findByIdAndToggleStatus(evendId:string,isActive:boolean) : Promise<void>    
}