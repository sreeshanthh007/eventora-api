import { IClientRatingController } from "@entities/controllerInterfaces/client/rating/client-rating-controller.interface";
import { IAddRatingUseCase } from "@entities/useCaseInterfaces/client/rating/add-rating.usecase.interface";
import { IEditRatingUseCase } from "@entities/useCaseInterfaces/client/rating/edit-rating.usecase.interface";
import { CustomRequest } from "@middlewares/auth.middleware";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";
import { Request, Response } from "express";
import { EditratingValidateSchema, ratingValidateSchema } from "interfaceAdpaters/validations/rating.validator";
import { inject, injectable } from "tsyringe";



@injectable()
export class ClientRatingCOntroller implements IClientRatingController{

    constructor(
        @inject("IAddRatingUseCase") private _addRatingUseCase : IAddRatingUseCase,
        @inject("IEditRatingUseCase") private _editRatingUseCase : IEditRatingUseCase
    ){}



    async getReviews(req: Request, res: Response): Promise<void> {
        
        const {id} = (req as CustomRequest).user

        if(!id){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
        }


        
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

        const data = req.body

        const validatedData = EditratingValidateSchema.parse(data)

        await this._editRatingUseCase.execute(id,ratingId,validatedData)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.UPDATE_SUCCESS})

    }
}