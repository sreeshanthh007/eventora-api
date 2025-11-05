import { IRatingRepository } from "@entities/repositoryInterfaces/rating/rating.repository.interface";
import { IRemoveReviewUseCase } from "@entities/useCaseInterfaces/client/rating/remove-review.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";


@injectable()
export class RemoveReviewUseCase implements IRemoveReviewUseCase{

    constructor(
        @inject("IRatingRepository") private _ratingRepo : IRatingRepository
    ){}


    async execute(reviewId: string): Promise<void> {
        
        const review = await this._ratingRepo.findbyId(reviewId)

        if(!review){
            throw new CustomError(ERROR_MESSAGES.RATING_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        await this._ratingRepo.findRatingByIdAndRemove(reviewId)
    }
}
