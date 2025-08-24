import { Request, Response } from "express";


export interface IClientController{
    refreshSession(req:Request,res:Response) : Promise<void>
    updateProfileImage(req:Request,res:Response) : Promise<void>
    updateProfileInformation(req:Request,res:Response) : Promise<void>
}