import { Request, Response } from "express";


export interface IVendorController { 
    updatePersonalInformation(req:Request,res:Response) : Promise<void>
    changePassword(req:Request,res:Response) : Promise<void>
    addWorkSample(req:Request,res:Response) : Promise<void>

}