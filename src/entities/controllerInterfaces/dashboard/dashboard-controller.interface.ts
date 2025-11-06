import { Request, Response } from "express";


export interface IAnalyticsDashboardController{
    getAdminDashboard(req:Request,res:Response) : Promise<void>
    getVendorDashboard(req:Request,res:Response) : Promise<void>
}