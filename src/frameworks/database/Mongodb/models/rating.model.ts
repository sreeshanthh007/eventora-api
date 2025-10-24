import { IRatingEntity } from "@entities/models/rating.entity";
import { model, ObjectId } from "mongoose";
import { RatingSchema } from "../schemas/rating.schema";


export interface IRatingModel extends Omit<IRatingEntity,"serviceId" | "clientId" | "_id">,Document{
    serviceId:ObjectId,
    clientId:ObjectId,
    _id:ObjectId
}

export const ratingModel = model<IRatingModel>("Rating",RatingSchema)