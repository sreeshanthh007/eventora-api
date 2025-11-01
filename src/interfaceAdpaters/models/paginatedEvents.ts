import { EventTableDTO, PaginatedEventDetailsDTO } from "@shared/dtos/event.dto";


export interface PaginatedEvents {
    events : EventTableDTO[]
    total:number
}

    export interface paginatedEventsForClient{
        events:PaginatedEventDetailsDTO[],
        total:number
    }


    