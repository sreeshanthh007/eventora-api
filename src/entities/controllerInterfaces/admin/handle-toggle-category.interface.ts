import { Request, Response } from "express";


export interface IHandleToggleCategoryController {
    handle(req:Request,res:Response) : Promise<void>
}