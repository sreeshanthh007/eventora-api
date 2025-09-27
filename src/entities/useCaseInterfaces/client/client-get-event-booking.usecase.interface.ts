import { paginatedBookedEvents } from "interfaceAdpaters/models/paginatedBookedEvents";

export interface IClientGetEventBookingUseCase{
    execute(clientId:string,page:number,limit:number,search:string) : Promise<paginatedBookedEvents>
}