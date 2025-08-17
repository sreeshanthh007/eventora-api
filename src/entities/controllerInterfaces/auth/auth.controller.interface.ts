import { Request, Response } from "express";


export interface IAuthController {
    register(req:Request,res:Response) : Promise<void>
    login(req:Request,res:Response) : Promise<void>
    authenticatedWithGoogle(req:Request,res:Response) : Promise<void>
    logout(req:Request,res:Response) : Promise<void>
    handleTokenRefresh(req:Request,res:Response) : Promise<void>
    sentOtpEmail(req:Request,res:Response) : Promise<void>
    verifyOtp(req:Request,res:Response) : Promise<void>
    getUploadSignature(req:Request,res:Response) : Promise<void>
}