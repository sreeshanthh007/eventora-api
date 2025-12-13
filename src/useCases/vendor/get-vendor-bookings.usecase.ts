import { IBookingRepository } from "@entities/repositoryInterfaces/booking/booking.repository.interface";
import { IGetVendorBookingUseCase } from "@entities/useCaseInterfaces/vendor/get-vendor-booking.usecase.interface";
import { mapBookingstoVendorBookedServices } from "@mappers/BookingMapper";
import { PAGINATION } from "@shared/constants";

import { PaginatedVendorBookingsDTO } from "interfaceAdapters/models/paginatedBooking";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetVendorBookingsUseCase implements IGetVendorBookingUseCase{
    constructor(
        @inject("IBookingRepository") private _bookingRepo : IBookingRepository
    ){}

    async execute(vendorId:string,page: number, limit: number, search?: string): Promise<PaginatedVendorBookingsDTO> {
        
        
      const safePage = Math.max(
        PAGINATION.PAGE,
        page || PAGINATION.PAGE
      )
      
      const safeLimit = Math.min(
        PAGINATION.MAX_LIMIT,
        Math.max(1, limit || PAGINATION.LIMIT)
      );
      
      
        

        const skip = (safePage - 1)*safeLimit

        
        const {bookings,total} = await this._bookingRepo.findBookedServices(vendorId,skip,limit,search)


        const mappedBookings = bookings.map(mapBookingstoVendorBookedServices)
      

       const data = {
        bookings:mappedBookings,
        total:Math.ceil(total/limit)
       }

       return data
    }
}