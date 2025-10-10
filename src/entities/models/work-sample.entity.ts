import { ObjectId } from "mongoose";


export interface IWorkSampleEntity{
    _id?:ObjectId
    title:string
    description:string
    vendorId?:ObjectId
    images:string[]
}