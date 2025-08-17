import { Request, Response } from "express";


export interface IAddCategory{
    handle(req:Request,res:Response):Promise<void>
}