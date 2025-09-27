import { Request, Response } from "express";


export interface IClientController{
    refreshSession(req:Request,res:Response) : Promise<void>
    updateProfileImage(req:Request,res:Response) : Promise<void>
    updateProfileInformation(req:Request,res:Response) : Promise<void>
    getAllEvents(req:Request,res:Response) : Promise<void>
    getAllCategories(req:Request,res:Response) : Promise<void>
    getAllEventsWithFilters(req:Request,res:Response) : Promise<void>
    getAllServiceWithFilters(req:Request,res:Response) : Promise<void>
    getEventDetails(req:Request,res:Response) : Promise<void>
    getEventBooking(req:Request,res:Response) : Promise<void>
    getServiceDetails(req:Request,res:Response) : Promise<void>
}