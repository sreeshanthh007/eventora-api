import { Request , Response } from "express";

export interface IToggleVendorStatus {
    handle(req:Request,res:Response) : Promise<void
}
