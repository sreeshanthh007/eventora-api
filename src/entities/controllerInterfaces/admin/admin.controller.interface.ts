import { Request, Response } from "express";


export interface IAdminController {
    editCategory(req:Request,res:Response) : Promise<void>
    getAllCategory(req:Request,res:Response) : Promise<void>
}