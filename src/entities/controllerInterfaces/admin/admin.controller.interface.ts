import { Request, Response } from "express";


export interface IAdminController {
    editCategory(req:Request,res:Response) : Promise<void>
    getAllCategory(req:Request,res:Response) : Promise<void>
    getAdminWalletDetails(req:Request,res:Response) : Promise<void>
    getAdminNotifications(req:Request,res:Response) : Promise<void>
}