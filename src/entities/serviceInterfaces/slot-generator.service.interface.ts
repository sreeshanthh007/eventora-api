import { SlotGenerationResponse } from "@shared/dtos/slot-generator.dto"



export interface  ISlotGenerationData{
    serviceId:string
    startDate:Date
    endDate:Date
    frequency:"ONCE" | "YEARLY" | "MONTHLY" | "WEEKLY" | "DAILY"
    workingDays:number[]
    holidays?:Date[]
    startTime:string
    endTime:string
    duration:number
    capacity?:number
}


export interface ISlotGeneratorService{
    generateSlots(options:ISlotGenerationData) : Promise<SlotGenerationResponse[]>
}