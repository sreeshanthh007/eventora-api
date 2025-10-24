import { PaginatedClientBookingDTO } from "interfaceAdpaters/models/paginatedBooking";

export interface IGetClientBookedServicesUseCase{
    execute(clientId:string,page:number,limit:number,search:string)  : Promise<PaginatedClientBookingDTO>
}