import { IRatingRepository } from "@entities/repositoryInterfaces/rating/rating.repository.interface";
import { IEditRatingUseCase } from "@entities/useCaseInterfaces/client/rating/edit-rating.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { IEditRatingDTO } from "@shared/dtos/rating.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class EditRatingUseCase implements IEditRatingUseCase{

    constructor(
        @inject("IRatingRepository") private _ratingRepo : IRatingRepository
    ){}


    async execute(clientId: string, ratingId: string, data: IEditRatingDTO): Promise<void> {
        
        const ratingExist = await this._ratingRepo.findbyId(ratingId)

        if(!ratingExist){
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.BAD_REQUEST)
        }

        const isClientProvidedRating = await this._ratingRepo.getRatingByClientId(clientId)

        if(!isClientProvidedRating){
            throw new CustomError(ERROR_MESSAGES.INVALID_RATING_EDITING,HTTP_STATUS.FORBIDDEN)
        }

        await this._ratingRepo.findRatingByIdAndEditRating(ratingId,data)

    }
}