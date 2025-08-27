
import { Request, Response } from "express";

export interface IEventController {
    addEvent(req:Request,res:Response) : Promise<void>
    getAllEvents(req:Request,res:Response) : Promise<void>
    toggeleStatus(req:Request,res:Response) : Promise<void>
    updateEvent(req:Request,res:Response) : Promise<void>
    getEventById(req:Request,res:Response) : Promise<void>
}