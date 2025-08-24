import { Request, Response } from "express";




export interface IAdminVendorController {
    approveVendor(req:Request,res:Response) : Promise<void>
    rejectVendor(req:Request,res:Response) : Promise<void>
    udpateVendorAccountStatus(req:Request,res:Response) : Promise<void>
    getAllVendors(req:Request,res:Response) : Promise<void>
    resendVerification(req:Request,res:Response) : Promise<void>
    getRequestedVendors(req:Request,res:Response) : Promise<void>
}