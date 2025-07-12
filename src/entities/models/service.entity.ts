import { ObjectId } from "mongoose";


 interface TImeSlot {
    startTime:string,
    endTIme:string,
    capacity:number,
    count:number
}

interface DateSlot {
    date:string,
    timeslots:TImeSlot
}

export interface IServiceEntity  {
    _id?: string | ObjectId,
    vendorId:string| ObjectId,
    serviceTitle:string,
    yearsOfExperience:number,
    availableDates:DateSlot[],
    serviceDescription:string,
    servicePrice:number,
    serviceDuration:number,
    additionalHourPrice:number,
    cancellationPolies:string[],
    termsAndConditions:string[]
}

