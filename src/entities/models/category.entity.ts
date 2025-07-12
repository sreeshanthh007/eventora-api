import { ObjectId } from "mongoose";

export interface ICategoryEnity {
    _id?:ObjectId,
    categoryId:string,
    title:string,
    status:boolean,
    createdAt?:Date,
    updatedAt?:Date
}