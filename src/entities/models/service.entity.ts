import { ObjectId } from "mongoose";




export interface IServiceEntity  {
    _id?: string | ObjectId,
    vendorId?:string,
    serviceTitle:string,
    yearsOfExperience:number,
    serviceDescription:string,
    servicePrice:number,
    serviceDuration:number,
    additionalHourPrice:number,
    cancellationPolicies:string[],
    termsAndConditions:string[],
    categoryId:string,
    status?:string
    categoryName?:string
    slots?: {
    date?: Date;
    startDateTime?: Date;
    endDateTime?: Date;
    capacity?: number;
    bookedCount?: number;
  }[];
}


