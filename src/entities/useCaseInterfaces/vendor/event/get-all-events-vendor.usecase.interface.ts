
import { PaginatedEvents } from "interfaceAdapters/models/paginatedEvents";


export interface IGetAllEventsUseCase {
    execute(limit:number,searchTerm: string,current:number,vendorId:string) :Promise<PaginatedEvents>
}