import { Request, Response } from "express";


export interface IGetAllCatgory{
    handle(req:Request,res:Response) : Promise<void>
}