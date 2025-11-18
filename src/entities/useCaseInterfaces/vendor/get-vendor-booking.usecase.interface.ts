import { PaginatedVendorBookingsDTO } from "interfaceAdapters/models/paginatedBooking";


export interface IGetVendorBookingUseCase{
    execute(vendorId:string,page:number,limit:number,search?:string) : Promise<PaginatedVendorBookingsDTO>
}