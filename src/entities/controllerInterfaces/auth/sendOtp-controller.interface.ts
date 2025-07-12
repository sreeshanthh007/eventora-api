
import { Request,Response } from "express";

export interface ISendOtpController{
    handle(req:Request,res:Response):Promise<void>
}
