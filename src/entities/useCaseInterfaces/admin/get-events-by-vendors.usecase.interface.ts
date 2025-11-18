import { PaginatedEventsByVendors } from "interfaceAdapters/models/paginatedEvents";


export interface IGetEventsByVendorsUseCase{
    execute(page:number,limit:number,search:string,filterBy:string) : Promise<PaginatedEventsByVendors>
}