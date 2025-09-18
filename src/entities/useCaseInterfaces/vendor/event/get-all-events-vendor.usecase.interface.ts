
import { PaginatedEvents } from "interfaceAdpaters/models/paginatedEvents";


export interface IGetAllEventsUseCase {
    execute(limit:number,searchTerm: string,current:number) :Promise<PaginatedEvents>
}