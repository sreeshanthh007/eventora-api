import { Request, Response } from "express";


export interface IServiceController {
    addService(req:Request,res:Response) :Promise<void>
    editService(req:Request,res:Response) : Promise<void>
    getAllService(req:Request,res:Response) : Promise<void>
    getServiceById(req:Request,res:Response) : Promise<void>
    toggleServiceStatus(req:Request,res:Response) : Promise<void>
}

