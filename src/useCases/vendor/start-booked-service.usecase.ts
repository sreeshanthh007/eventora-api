import { IBookingRepository } from "@entities/repositoryInterfaces/booking/booking.repository.interface";
import { IStartBookedServiceUseCase } from "@entities/useCaseInterfaces/vendor/start-booked-service.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";



@injectable()
export class StartBookedServiceUseCase implements IStartBookedServiceUseCase{
    constructor(
        @inject("IBookingRepository") private _bookingRepo : IBookingRepository
    ){}


    async execute(bookingId: string,vendorId:string): Promise<void> {
        
        const booking = await this._bookingRepo.findBooking(bookingId)


        if(!booking){
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        if(vendorId!==booking.vendorId?.toString()){
            throw new CustomError(ERROR_MESSAGES.UNAUTHORIZED_ACCESS,HTTP_STATUS.UNAUTHORIZED)
        }

        if(booking.status!=="pending"){
            throw new CustomError(ERROR_MESSAGES.SERVICE_STARTED_COMPLETED_ERROR,HTTP_STATUS.BAD_REQUEST)
        }

        await this._bookingRepo.updateBookingStatus(bookingId,"ongoing")
    }
}