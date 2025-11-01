import { IBookingRepository } from "@entities/repositoryInterfaces/booking/booking.repository.interface";
import { IGetVendorBookingUseCase } from "@entities/useCaseInterfaces/vendor/get-vendor-booking.usecase.interface";
import { mapBookingstoVendorBookedServices } from "@mappers/BookingMapper";

import { PaginatedVendorBookingsDTO } from "interfaceAdpaters/models/paginatedBooking";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetVendorBookingsUseCase implements IGetVendorBookingUseCase{
    constructor(
        @inject("IBookingRepository") private _bookingRepo : IBookingRepository
    ){}

    async execute(vendorId:string,page: number, limit: number, search?: string): Promise<PaginatedVendorBookingsDTO> {
        
        
        const validPageNumber = Math.max(1,page || 1)

        const skip = (validPageNumber - 1)*limit

        
        const {bookings,total} = await this._bookingRepo.findBookedServices(vendorId,skip,limit,search)


        const mappedBookings = bookings.map(mapBookingstoVendorBookedServices)
      

       const data = {
        bookings:mappedBookings,
        total:Math.ceil(total/limit)
       }

       return data
    }
}