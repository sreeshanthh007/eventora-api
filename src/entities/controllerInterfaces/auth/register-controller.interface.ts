
import { Response,Request } from "express";

export interface IRegisterController{
    handle(req:Request,res:Response):Promise<void>
}

