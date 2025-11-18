import { PaginatedServiceBookingofVendorDTO } from "interfaceAdapters/models/paginatedBooking";


export interface IGetSeviceBookingsOfVendorsUseCase{
    execute(page:number,limit:number,search:string,filterType:string) : Promise<PaginatedServiceBookingofVendorDTO>
}