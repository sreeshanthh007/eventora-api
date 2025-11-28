import { IAdminController } from "@entities/controllerInterfaces/admin/admin.controller.interface";
import { IEditCategoryUseCase } from "@entities/useCaseInterfaces/admin/edit-category.usecase.interface";
import { IGetAdminWalletDetailsUseCase } from "@entities/useCaseInterfaces/admin/get-admin-wallet-details.usecase.interface";
import { IGetAllCatgoryUseCase } from "@entities/useCaseInterfaces/admin/get-all-category.usecase.interface";
import { IGetEventsByVendorsUseCase } from "@entities/useCaseInterfaces/admin/get-events-by-vendors.usecase.interface";
import { IGetSeviceBookingsOfVendorsUseCase } from "@entities/useCaseInterfaces/admin/get-service-bookings-of-vendors.usecase.interface";
import { IGetAllNotificationUseCase } from "@entities/useCaseInterfaces/get-all-notification.usecase.interface";
import { CustomRequest } from "@middlewares/auth.middleware";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";
import { Request, Response } from "express";
import { categorySchema } from "interfaceAdapters/validations/category-validation";
import { inject, injectable } from "tsyringe";




@injectable()
export class AdminController implements IAdminController{
    constructor(
        @inject("IEditCategoryUseCase") private _editCategoryUseCase : IEditCategoryUseCase,
        @inject("IGetAllCategoryUseCase") private _getAllCategoryUseCase : IGetAllCatgoryUseCase,
        @inject("IGetAdminWalletDetailsUseCase") private _getAdminWalletDetailsUseCase : IGetAdminWalletDetailsUseCase,
        @inject("IGetEventsByVendorsUseCase") private _getEventsByVendorsUseCase : IGetEventsByVendorsUseCase,
        @inject("IGetServiceBookingsofVendorsUseCase") private _getServiceBookingsofVendorsUseCase : IGetSeviceBookingsOfVendorsUseCase,
        @inject("IGetAllNotificationUseCase") private _getAdminNotificationUseCase : IGetAllNotificationUseCase,
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
        .json({success:true,message:SUCCESS_MESSAGES.CATEGORY_FETCHED_SUCCESS,categories:response.categories,total:response.total})
    }


    async getAdminWalletDetails(req: Request, res: Response): Promise<void> {
        
        const {id} = (req as CustomRequest).user

        if(!id){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
        }


        const {
            type="all"
            ,page="1",
            limit="5"
        } = req.query as {
            type:string,
            page:string,
            limit:string
        }

        const walletDetails = await this._getAdminWalletDetailsUseCase.execute(id,type,Number(page),Number(limit))

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


    async getEventsByVendors(req: Request, res: Response): Promise<void> {
        
        const {
            page="1",
            limit="6",
            search,
            filterBy
        } = req.query as {
            page:string,
            limit:string,
            search:string,
            filterBy:string
        }


        const response = await this._getEventsByVendorsUseCase.execute(Number(page),Number(limit),search,filterBy);

        res.status(HTTP_STATUS.OK)
        .json({success:true,response})
    }


    async getBookedServicesofVendors(req: Request, res: Response): Promise<void> {
        
        const {
            page="1",
            limit="6",
            search,
            filterType
        } = req.query as {
            page:string,
            limit:string,
            search:string,
            filterType:string
        }

        const response = await this._getServiceBookingsofVendorsUseCase.execute(Number(page),Number(limit),search,filterType);

        res.status(HTTP_STATUS.OK)
        .json({success:true,response})
    }
   
}