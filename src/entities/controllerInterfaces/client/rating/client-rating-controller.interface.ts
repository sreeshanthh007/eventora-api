import { Request, Response } from "express";


export interface IClientRatingController{
    getAllRatingsWithAverage(req:Request,res:Response) : Promise<void>
    addReview(req:Request,res:Response) : Promise<void>
    editReview(req:Request,res:Response) : Promise<void>
    removeReview(req:Request,res:Response) : Promise<void>
}