import { Request, Response } from "express";


export interface IApproveVendorController {
    handle(req:Request,res:Response) : Promise<void>
}