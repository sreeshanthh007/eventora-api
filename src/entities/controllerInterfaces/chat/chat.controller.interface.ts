import { Request, Response } from "express";



export interface IChatController{
    getAllChatsByUserId(req:Request,res:Response) : Promise<void>
    getChatbyChatId(req:Request,res:Response) : Promise<void>
}