import { Request, Response } from "express";


export interface IRequestedVendors {
    handle(req:Request,res:Response) : Promise<void>
}
