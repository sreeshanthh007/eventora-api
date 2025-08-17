import { Request, Response } from "express";


export interface IRejectVendorController {

    handle(req:Request,res:Response) : Promise<void>
}

