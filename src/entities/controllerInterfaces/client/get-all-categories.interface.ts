import { Request, Response } from "express";


export interface IGetAllCategoryController{
    handle(req:Request,res:Response) :Promise<void>
}

