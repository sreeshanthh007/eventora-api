import { IBookingRepository } from "@entities/repositoryInterfaces/booking/booking.repository.interface";
import { IRatingRepository } from "@entities/repositoryInterfaces/rating/rating.repository.interface";
import { IAddRatingUseCase } from "@entities/useCaseInterfaces/client/rating/add-rating.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { RatingRequestDTO } from "@shared/dtos/rating.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class AddRatingUseCase implements IAddRatingUseCase{

    constructor(
        @inject("IRatingRepository") private _ratingRepo :IRatingRepository,
        @inject("IBookingRepository") private _bookingRepo : IBookingRepository
    ){}

    async execute(clientId: string, serviceId: string, data: RatingRequestDTO): Promise<void> {
        
        const isAlreadyAdded = await this._ratingRepo.getRatingsByClientId(clientId)

        if(isAlreadyAdded){
            throw new CustomError(ERROR_MESSAGES.RATING_ALREDY_ADDED,HTTP_STATUS.CONFLICT)
        }

        const isBooked = await this._bookingRepo.findAlreadyBookedServiceByClients(clientId)

        if(!isBooked){
            throw new CustomError(ERROR_MESSAGES.RATING_BEFORE_BOOKING,HTTP_STATUS.BAD_REQUEST)
        }

        if(isBooked.status!=="ongoing" &&  isBooked.status!=="pending"){
            throw new CustomError(ERROR_MESSAGES.RATING_AFTER_COMPLETED,HTTP_STATUS.BAD_REQUEST)
        }
        
        
        await this._ratingRepo.addRating(clientId,serviceId,data);
    }
}