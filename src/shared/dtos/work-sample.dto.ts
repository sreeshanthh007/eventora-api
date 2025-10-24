import { ObjectId } from "mongoose"



export interface IWorksampleDTO{
    title:string,
    description:string,
    images:string[]
    vendorId?:ObjectId
}


export interface IWorkSampleResponseToVendorDTO {
    _id:string
    title:string
    description:string
    images:string[]
}


type EditableFields = Pick<
IWorksampleDTO,
"title" |
"description" |
"images"
>

export type TeditWorkSampleDTO = Partial<EditableFields>

export interface WorkSampleResponseDTO{
    title:string
    description:string
    images:string[]
}