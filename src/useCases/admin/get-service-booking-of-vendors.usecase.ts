import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IGetSeviceBookingsOfVendorsUseCase } from "@entities/useCaseInterfaces/admin/get-service-bookings-of-vendors.usecase.interface";
import { mapBookingDetailsofVendorsForAdminDTO } from "@mappers/BookingMapper";
import { PaginatedServiceBookingofVendorDTO } from "interfaceAdapters/models/paginatedBooking";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetServiceBookingsofVendorsUseCase implements IGetSeviceBookingsOfVendorsUseCase{

    constructor(
        @inject("IServiceRepository") private _serviceRepo : IServiceRepository
    ){}



    async execute(page: number, limit: number, search: string, filterType: string): Promise<PaginatedServiceBookingofVendorDTO> {
        
        const validatePageNumber = Math.max(1,page || 1)

        const skip = (validatePageNumber - 1)*limit


        const {bookings,total} = await this._serviceRepo.getServiceBookingsofVendors(skip,limit,search,filterType)


        const mappedData = bookings.map(booking=>mapBookingDetailsofVendorsForAdminDTO(booking))

        return {
            bookings:mappedData,
            total:Math.ceil(total/limit)
        }

    }
}