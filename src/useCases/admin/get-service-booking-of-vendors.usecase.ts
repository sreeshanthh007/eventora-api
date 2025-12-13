import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IGetSeviceBookingsOfVendorsUseCase } from "@entities/useCaseInterfaces/admin/get-service-bookings-of-vendors.usecase.interface";
import { mapBookingDetailsofVendorsForAdminDTO } from "@mappers/BookingMapper";
import { PAGINATION } from "@shared/constants";
import { PaginatedServiceBookingofVendorDTO } from "interfaceAdapters/models/paginatedBooking";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetServiceBookingsofVendorsUseCase implements IGetSeviceBookingsOfVendorsUseCase{

    constructor(
        @inject("IServiceRepository") private _serviceRepo : IServiceRepository
    ){}



    async execute(page: number, limit: number, search: string, filterType: string): Promise<PaginatedServiceBookingofVendorDTO> {
        
        const safePage = Math.max(
          PAGINATION.PAGE,
          page || PAGINATION.PAGE
        )
        
        const safeLimit = Math.min(
          PAGINATION.MAX_LIMIT,
          Math.max(1, limit || PAGINATION.LIMIT)
        );
       

        const skip = (safePage - 1)*safeLimit


        const {bookings,total} = await this._serviceRepo.getServiceBookingsofVendors(skip,limit,search,filterType)


        const mappedData = bookings.map(booking=>mapBookingDetailsofVendorsForAdminDTO(booking))

        return {
            bookings:mappedData,
            total:Math.ceil(total/limit)
        }

    }
}