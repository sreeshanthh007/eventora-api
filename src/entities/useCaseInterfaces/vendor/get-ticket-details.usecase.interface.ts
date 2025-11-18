import { PaginatedTicketDetails } from "interfaceAdapters/models/PaginatedTicketDetails";


export interface IGetTicketDetailsUseCase{
    execute(eventId:string,page:number,limit:number,search:string) : Promise<PaginatedTicketDetails>
}