import { Response , Request } from "express";


export interface IGetAllUsers {
    handle(req:Request,res:Response) : Promise<void
}

