import { Request, Response } from "express";


export interface IClientRatingController{
    getReviews(req:Request,res:Response) : Promise<void>
    addReview(req:Request,res:Response) : Promise<void>
    editReview(req:Request,res:Response) : Promise<void>
}