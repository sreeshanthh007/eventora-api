import { IBookingRepository } from "@entities/repositoryInterfaces/booking/booking.repository.interface";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IGetClientBookedServicesUseCase } from "@entities/useCaseInterfaces/client/service/client-get-booked-service.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { mapBookingstoClientBookedService } from "@mappers/BookingMapper";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { PaginatedClientBookingDTO } from "interfaceAdapters/models/paginatedBooking";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetClientBookedServicesUseCase implements IGetClientBookedServicesUseCase{

    constructor(
        @inject("IBookingRepository") private _bookingRepo : IBookingRepository,
        @inject("IClientRepository") private  _clientRepo : IClientRepository
    ){}


    async execute(clientId: string, page: number, limit: number, search: string): Promise<PaginatedClientBookingDTO> {
        

        const clientExist = await this._clientRepo.findById(clientId)

        if(!clientExist){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }


        const validPageNumber = Math.max(1,page || 1)

        const skip  = (validPageNumber-1)*limit

        const {bookings,total} = await this._bookingRepo.findBookedServicesForClient(clientId,skip,limit,search);

        const mappedBookings = bookings.map(mapBookingstoClientBookedService)

        const data = {
            bookings:mappedBookings,
            total:Math.ceil(total/limit)
        }

        return data
    }
}