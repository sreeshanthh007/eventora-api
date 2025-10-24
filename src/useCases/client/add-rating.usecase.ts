import { IRatingRepository } from "@entities/repositoryInterfaces/rating/rating.repository.interface";
import { IAddRatingUseCase } from "@entities/useCaseInterfaces/client/add-rating.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { RatingRequestDTO } from "@shared/dtos/rating.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class AddRatingUseCase implements IAddRatingUseCase{

    constructor(
        @inject("IRatingRepository") private _ratingRepo :IRatingRepository
    ){}

    async execute(clientId: string, serviceId: string, data: RatingRequestDTO): Promise<void> {
        
        const isAlreadyAdded = await this._ratingRepo.getRatingByClientId(clientId)

        if(isAlreadyAdded){
            throw new CustomError(ERROR_MESSAGES.RATING_ALREDY_ADDED,HTTP_STATUS.CONFLICT)
        }
        
        await this._ratingRepo.addRating(clientId,serviceId,data);
    }
}