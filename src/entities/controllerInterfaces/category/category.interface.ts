import { Request, Response } from "express";


export interface ICategoryController {
    addCategory(req:Request,res:Response) : Promise<void>
    toogleCategory(req:Request,res:Response) : Promise<void>
    getAllCategory(req:Request,res:Response) : Promise<void>
    editCategory(req:Request,res:Response) : Promise<void>
}