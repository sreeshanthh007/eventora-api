import { EventTableDTO, IEventsByVendorsDTO, PaginatedEventDetailsDTO } from "@shared/dtos/event.dto";


export interface PaginatedEvents {
    events : EventTableDTO[]
    total:number
}

    export interface paginatedEventsForClient{
        events:PaginatedEventDetailsDTO[],
        total:number
    }


    export interface PaginatedEventsByVendors{
        eventDetails:IEventsByVendorsDTO[]
        total:number
    }
    