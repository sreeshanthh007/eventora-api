import { Request, Response } from "express";


export interface IVendorController { 
    updatePersonalInformation(req:Request,res:Response) : Promise<void>
    getVendorNotification(req:Request,res:Response) : Promise<void>
    changePassword(req:Request,res:Response) : Promise<void>
    addWorkSample(req:Request,res:Response) : Promise<void>
    getWorkSampleData(req:Request,res:Response) : Promise<void>
    editWorkSample(req:Request,res:Response) : Promise<void>
    scanAndVerifyAttendies(req:Request,res:Response) : Promise<void>
    getTicketDetails(req:Request,res:Response) : Promise<void>
    scanAndVerifyTickets(req:Request,res:Response) : Promise<void>
    getVendorwalletDetails(req:Request,res:Response) : Promise<void>
    getBookedServices(req:Request,res:Response) : Promise<void>
    startBookedService(req:Request,res:Response) : Promise<void>
    stopBookedService(req:Request,res:Response) : Promise<void>
}