import { IEventEntity } from "@entities/models/event.entity";
import { TEventEntityWithVendorPopulated } from "@entities/models/populated-types/event-populated.type";
import { IUpdateEventDTO } from "@shared/dtos/event.dto";
import { FilterQuery, ObjectId } from "mongoose";


export interface IEventRepository {
    save(data:IEventEntity) : Promise<void>
    createManyTickets(tickets:IEventEntity[]) : Promise<IEventEntity[]>
    findEvents() : Promise<IEventEntity[]>
    findById(eventId:string) : Promise<IEventEntity | null>
    findEventByIdForDetailsPage(eventId:string) : Promise<TEventEntityWithVendorPopulated | null>
    findPaginatedEvents(filter:FilterQuery<IEventEntity>,skip:number,limit:number) : Promise<{events:IEventEntity[] | []; total:number}>
    findfilteredEvents(filters:{search?:string,location?:string,sort?:string,lat?:number,lng?:number},skip:number,limit:number) : Promise<{events:IEventEntity[] | []; total:number}>
    updateEvent(eventId:string,updateData:IUpdateEventDTO) : Promise<void>
    updateEventStatus(eventId:string,eventStatus:string) : Promise<void>
    updateAfterTicketBooking(eventId:string | ObjectId,quantity:number,ticketType?:string) : Promise<void>
    findByIdAndToggleStatus(evendId:string,isActive:boolean) : Promise<void>
    findEventsHostedByVendors(vendorId:string) : Promise<IEventEntity | null>
    findHostIdFromEvents(eventId:string) : Promise<TEventEntityWithVendorPopulated | null>
}