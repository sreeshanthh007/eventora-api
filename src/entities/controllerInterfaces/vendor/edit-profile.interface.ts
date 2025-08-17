import { Request, Response } from "express";


export interface IEditVendorProfileController {
    handle(req:Request,res:Response) :Promise<void>
}

