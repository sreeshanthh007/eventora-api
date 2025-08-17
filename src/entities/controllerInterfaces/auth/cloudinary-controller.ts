import { Request, Response } from "express";


export interface ICloudinaryController{
    getUploadSignature(req:Request,res:Response):Promise<void>
}