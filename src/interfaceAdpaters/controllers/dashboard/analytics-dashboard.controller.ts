import { IAnalyticsDashboardController } from "@entities/controllerInterfaces/dashboard/dashboard-controller.interface";
import { IGetAdminAnalyticsDashboardUseCase } from "@entities/useCaseInterfaces/dashboard/get-admin-analytics-dashboard.usecase.interface";
import { IGetVendorAnalyticsDashboardUseCase } from "@entities/useCaseInterfaces/dashboard/get-vendor-analytics-dashboard.usecase.interface";
import { CustomRequest } from "@middlewares/auth.middleware";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";



@injectable()
export class AnalyticsDashboardController implements IAnalyticsDashboardController{

    constructor(
        @inject("IGetAdminAnalyticsDashboardUseCase") private _getAdminAnalyticsDashboardUseCase : IGetAdminAnalyticsDashboardUseCase,
        @inject("IGetVendorAnalyticsDashboardUseCase") private _getVendorAnalyticsDashboardUseCase : IGetVendorAnalyticsDashboardUseCase
    ){}


    async getAdminDashboard(req: Request, res: Response): Promise<void> {
        
        const {
            period="month",
            startDate,
            endDate
        } = req.query as {
            period:string,
            startDate?:string
            endDate?:string
        }

        const {id} = (req as CustomRequest).user

        if(!id){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
        }


        const start = startDate ? new Date(startDate) : new Date()
        const end = endDate ? new Date(endDate) : new Date()


        const analyticsData = await this._getAdminAnalyticsDashboardUseCase.execute(period,start,end);


        res.status(HTTP_STATUS.OK)
        .json({success:true,analyticsData});
    }


    async getVendorDashboard(req: Request, res: Response): Promise<void> {
        
        const {
            period="month",
            startDate,
            endDate
        } = req.query as {
            period:string
            startDate?:string
            endDate?:string
        }

        const {id} = (req as CustomRequest).user

        if(!id){
            res.status(HTTP_STATUS.BAD_REQUEST)
            .json({success:false,message:ERROR_MESSAGES.MISSING_PARAMETERS})
        }

        const start = startDate ? new Date(startDate) : new Date()
        const end = endDate ? new Date(endDate) : new Date()

        const analytics = await this._getVendorAnalyticsDashboardUseCase.execute(id,period,start,end)

        res.status(HTTP_STATUS.OK)
        .json({success:true,analytics})
    }
}