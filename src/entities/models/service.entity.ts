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
      schedule: {
    frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "ONCE";
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    duration: number;
    capacity: number;
    bookedCount?: number;
    workingDays?: number[];
  };
    holidays?:Date[]
    slots?: {
    date?: Date;
    startDateTime?: Date;
    endDateTime?: Date;
    capacity?: number;
    bookedCount?: number;
  }[];
}


