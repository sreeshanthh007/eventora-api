import { Request, Response } from "express";


export interface IVendorController { 
    updatePersonalInformation(req:Request,res:Response) : Promise<void>
   getAllNotifications(req:Request,res:Response) : Promise<void>
}