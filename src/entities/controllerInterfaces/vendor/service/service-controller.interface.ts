import { Request, Response } from "express";


export interface IServiceController {
    addService(req:Request,res:Response) :Promise<void>
}

