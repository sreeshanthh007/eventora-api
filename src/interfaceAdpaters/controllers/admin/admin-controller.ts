import { IAdminController } from "@entities/controllerInterfaces/admin/admin.controller.interface";
import { IEditCategoryUseCase } from "@entities/useCaseInterfaces/admin/edit-category.usecase.interface";
import { IGetAdminWalletDetailsUseCase } from "@entities/useCaseInterfaces/admin/get-admin-wallet-details.usecase.interface";
import { IGetAllCatgoryUseCase } from "@entities/useCaseInterfaces/admin/get-all-category.usecase.interface";
import { IGetAllNotificationUseCase } from "@entities/useCaseInterfaces/get-all-notification.usecase.interface";
import { CustomRequest } from "@middlewares/auth.middleware";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";
import { Request, Response } from "express";
import { categorySchema } from "interfaceAdpaters/validations/category-validation";
import { inject, injectable } from "tsyringe";




@injectable()
export class AdminController implements IAdminController{
    constructor(
        @inject("IEditCategoryUseCase") private _editCategoryUseCase : IEditCategoryUseCase,
        @inject("IGetAllCategoryUseCase") private _getAllCategoryUseCase : IGetAllCatgoryUseCase,
        @inject("IGetAdminWalletDetailsUseCase") private _getAdminWalletDetailsUseCase : IGetAdminWalletDetailsUseCase,
        @inject("IGetAllNotificationUseCase") private _getAdminNotificationUseCase : IGetAllNotificationUseCase
    ){}

    async editCategory(req: Request, res: Response): Promise<void> {
          
        const {categoryId} = req.params
 
        const data = req.body

        const validatedData = categorySchema.parse(data)

        await this._editCategoryUseCase.execute(categoryId,validatedData)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.UPDATE_SUCCESS})
    }

    async getAllCategory(req: Request, res: Response): Promise<void> {
        
        const {
            page = "1",
            limit = "5",
            search=""
        }  = req.query as {
            page?:string,
            limit?:string,
            search?:string
        }


        const response = await this._getAllCategoryUseCase.execute(Number(limit),search,Number(page))

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:"categories fetched successfully",categories:response.categories,total:response.total})
    }


    async getAdminWalletDetails(req: Request, res: Response): Promise<void> {
        
        const {id} = (req as CustomRequest).user

        if(!id){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
        }


        const walletDetails = await this._getAdminWalletDetailsUseCase.execute(id)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.WALLET_FETCHED_SUCCESS,wallet:walletDetails})
    }


    async getAdminNotifications(req: Request, res: Response): Promise<void> {
        
        const {id} = (req as CustomRequest).user

        if(!id){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
        }

        const notification = await this._getAdminNotificationUseCase.execute(id)

        res.status(HTTP_STATUS.OK)
        .json({success:true,message:SUCCESS_MESSAGES.NOTIFICATION_FETCHED_SUCCESS,notification})
    }


   
}