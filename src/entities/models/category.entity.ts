import { ObjectId } from "mongoose";

export interface ICategoryEnity {
    _id?:ObjectId,
    categoryId:string,
    title:string,
    status:string,
    image:string,
    createdAt?:Date,
    updatedAt?:Date
}