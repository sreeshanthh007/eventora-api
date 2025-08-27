import { Request, Response } from "express";


export interface IFetchCategoryController{
    getAllCategories(req:Request,res:Response) :Promise<void>
}

