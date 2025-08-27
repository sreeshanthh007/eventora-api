import { Request, Response } from "express";


export interface IAdminClientController {
    getAllClients(req:Request,res:Response) : Promise<void>
    updateClientAccountStatus(req:Request,res:Response) : Promise<void>
}