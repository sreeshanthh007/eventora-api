import { EventTableDTO } from "@shared/dtos/event.dto";


export interface PaginatedEvents {
    events : EventTableDTO[]
    total:number
}