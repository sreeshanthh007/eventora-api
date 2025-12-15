import { Request, Response } from "express";


export interface IAdminController {
    editCategory(req:Request,res:Response) : Promise<void>
    getAllCategory(req:Request,res:Response) : Promise<void>
    getAdminWalletDetails(req:Request,res:Response) : Promise<void>
    getEventsByVendors(req:Request,res:Response) : Promise<void>
    getBookedServicesofVendors(req:Request,res:Response) : Promise<void>
    getAdminNotifications(req:Request,res:Response) : Promise<void>
    handleToggleEvent(req:Request,res:Response) : Promise<void>
}