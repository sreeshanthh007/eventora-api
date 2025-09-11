import { IEventEntity } from "@entities/models/event.entity";
import { IUpdateEventDTO } from "@shared/dtos/event.dto";
import { FilterQuery } from "mongoose";


export interface IEventRepository {
    save(data:IEventEntity) : Promise<void>
    findEvents() : Promise<IEventEntity[]>
    findById(eventId:string) : Promise<IEventEntity | null>
    findEventByIdForDetailsPage(eventId:string) : Promise<IEventEntity | null>
    findPaginatedEvents(filter:FilterQuery<IEventEntity>,skip:number,limit:number) : Promise<{events:IEventEntity[] | []; total:number}>
    findfilteredEvents(filter:FilterQuery<IEventEntity>,skip:number,limit:number,sort:Record<string, 1 | -1>) : Promise<{events:IEventEntity[] | []; total:number}>
    updateEvent(eventId:string,updateData:IUpdateEventDTO) : Promise<void>
    updateEventStatus(eventId:string,eventStatus:string) : Promise<void>
    findByIdAndToggleStatus(evendId:string,isActive:boolean) : Promise<void>    
}