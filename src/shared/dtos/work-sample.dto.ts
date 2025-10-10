import { ObjectId } from "mongoose"



export interface IWorksampleDTO{
    title:string,
    description:string,
    images:string[]
    vendorId?:ObjectId
}


export interface IWorkSampleResponseDTO {
    // _id:string
    title:string
    description:string
    images:string[]
}