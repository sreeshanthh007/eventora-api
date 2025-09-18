import { Request, Response } from "express";


export interface IEventBookingController {
    createBooking(req:Request,res:Response) : Promise<void>
    handleWebHook(req:Request,res:Response) : Promise<void>
}