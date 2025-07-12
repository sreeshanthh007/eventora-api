
import { Request , Response } from "express";

export interface  IRefreshtokencontroller {
    handle(req:Request,res:Response) : Promise<void>

}