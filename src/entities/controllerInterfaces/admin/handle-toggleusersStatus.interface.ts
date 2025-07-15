import { Response , Request } from "express";


export interface IToggleUserStatus {
    handle(req:Request,res:Response) : Promise<void>
}