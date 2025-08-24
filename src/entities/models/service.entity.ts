import { ObjectId } from "mongoose";




export interface IServiceEntity  {
    _id?: string | ObjectId,
    vendorId:string| ObjectId,
    serviceTitle:string,
    yearsOfExperience:number,
    serviceDescription:string,
    servicePrice:number,
    serviceDuration:number,
    additionalHourPrice:number,
    cancellationPolicies:string[],
    termsAndConditions:string[],
    categoryId:string | ObjectId,
    status?:string
}

