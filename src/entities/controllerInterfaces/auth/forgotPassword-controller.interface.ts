
import { Request , Response } from "express";

export interface IForgotPasswordController {
    handle(req:Request,res:Response):Promise<void>
}