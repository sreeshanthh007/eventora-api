import { paginatedBookedEvents } from "interfaceAdapters/models/paginatedBookedEvents";

export interface IClientGetEventBookingUseCase{
    execute(clientId:string,page:number,limit:number,search:string) : Promise<paginatedBookedEvents>
}