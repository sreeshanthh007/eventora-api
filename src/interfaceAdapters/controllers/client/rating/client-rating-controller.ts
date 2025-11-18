import { IClientRatingController } from "@entities/controllerInterfaces/client/rating/client-rating-controller.interface";
import { IAddRatingUseCase } from "@entities/useCaseInterfaces/client/rating/add-rating.usecase.interface";
import { IEditRatingUseCase } from "@entities/useCaseInterfaces/client/rating/edit-rating.usecase.interface";
import { IGetAllRatingsWithAverageUseCase } from "@entities/useCaseInterfaces/client/rating/get-rating.usecase.interface";
import { IRemoveReviewUseCase } from "@entities/useCaseInterfaces/client/rating/remove-review.usecase.interface";
import { CustomRequest } from "@middlewares/auth.middleware";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";
import { Request, Response } from "express";
import { EditratingValidateSchema, ratingValidateSchema } from "interfaceAdapters/validations/rating.validator";
import { inject, injectable } from "tsyringe";



@injectable()
export class ClientRatingCOntroller implements IClientRatingController{

    constructor(
        @inject("IAddRatingUseCase") private _addRatingUseCase : IAddRatingUseCase,
        @inject("IEditRatingUseCase") private _editRatingUseCase : IEditRatingUseCase,
        @inject("IGetAllRatingsWithAverageUseCase") private _getAllRatingsWithAverageUseCase : IGetAllRatingsWithAverageUseCase,
        @inject("IRemoveReviewUseCase") private _removeReviewUseCase : IRemoveReviewUseCase
    ){}



    async getAllRatingsWithAverage(req: Request, res: Response): Promise<void> {
        
        const {serviceId} = req.params

        if(!serviceId){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
        }

        const ratings = await this._getAllRatingsWithAverageUseCase.execute(serviceId)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.RATINGS_FETCHED_SUCCESS,ratings})
    }




    async addReview(req: Request, res: Response): Promise<void> {
        
        const {id} = (req as CustomRequest).user
        const {data} = req.body
        
        const validatedData = ratingValidateSchema.parse(data)

        const serviceId = validatedData.serviceId


        if(!id){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
        }

        await this._addRatingUseCase.execute(id,serviceId,validatedData)

        res.status(HTTP_STATUS.OK)
        .json({success:true,messsage:SUCCESS_MESSAGES.RATING_ADDED_SUCCESS})
        
    }




    async editReview(req: Request, res: Response): Promise<void> {
        
        const {id} = (req as CustomRequest).user
        const {ratingId} = req.params
        if(!id){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
        }

        const {data} = req.body

        console.log("req body is",data)

        const validatedData = EditratingValidateSchema.parse(data)
        console.log("validated data is",validatedData)
        await this._editRatingUseCase.execute(id,ratingId,validatedData)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.UPDATE_SUCCESS})

    }


    async removeReview(req: Request, res: Response): Promise<void> {
        
        const {id} = (req as CustomRequest).user
        const {reviewId} = req.params

        if(!id || !reviewId){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
        }

        await this._removeReviewUseCase.execute(reviewId)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.REVIEW_REMOVED_SUCCESS});

    }
}