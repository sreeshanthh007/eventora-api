import { ISlotGenerationData, ISlotGeneratorService } from "@entities/serviceInterfaces/slot-generator.service.interface";
import { SlotGenerationResponse } from "@shared/dtos/slot-generator.dto";
import { ILockService } from "@entities/serviceInterfaces/lock-service.interface";
import { CustomError } from "@entities/utils/custom.error";
import {  ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { RRule, Weekday } from "rrule";
import { inject, injectable } from "tsyringe";


@injectable()

export class SlotGeneratorService implements ISlotGeneratorService{

    constructor(
        @inject("IRedisLockService") private _lockService : ILockService
    ){}

    private getRRuleFrequency(freq:string) :  number{
        switch(freq){
            case "DAILY" : 
                return RRule.DAILY
            case "WEEKLY" :
                return RRule.WEEKLY
            case "MONTHLY" :
                return RRule.MONTHLY
            case "YEARLY" :
                return RRule.YEARLY
            case "ONCE" :
                return RRule.DAILY
            default: throw new CustomError(ERROR_MESSAGES.INVALID_FREQUENCY,HTTP_STATUS.BAD_REQUEST);
        }
    }

     private mapWorkingDays(workingDays?: number[]): Weekday[] | undefined {
    if (!workingDays?.length) return undefined;

    const uniqueDays = Array.from(new Set(workingDays));
    return uniqueDays.map(d => {
        switch (d) {
            case 0: return RRule.SU;
            case 1: return RRule.MO;
            case 2: return RRule.TU;
            case 3: return RRule.WE;
            case 4: return RRule.TH;
            case 5: return RRule.FR;
            case 6: return RRule.SA;
            default: throw new CustomError(ERROR_MESSAGES.INVALID_WEEKDAY, HTTP_STATUS.BAD_REQUEST);
        }
    })
}

    private generateSlotsPerDay(date:Date,startTIme:string,endTime:string,duration:number) : string[]{
        
        const today = new Date()

        today.setHours(0,0,0,0)

        const givenDate = new Date(date)

        givenDate.setHours(0,0,0,0)

        if(givenDate < today){
            return []
        }

        const slots : string[] = []


        const [startHour,startMinute] = startTIme.split(":").map(Number)
        const [endHour,endMinute] = endTime.split(":").map(Number)

        const current = new Date(date)

        current.setHours(startHour,startMinute,0,0)

        const end  = new Date(date)

        end.setHours(endHour,endMinute,0,0)

        while(current<end){
            const next = new Date(current)
            next.setMinutes(next.getMinutes() + duration);
            
            if(next<=end){
                slots.push(`${current.toTimeString().slice(0, 5)} - ${next.toTimeString().slice(0, 5)}`)
            }
            current.setMinutes(current.getMinutes()+duration)
        }

        const now = new Date()
        if(givenDate.toDateString() === now.toDateString()){
            return slots.filter(slot => {
                const [starStr] = slot.split(" - ")
                const [h,m] = starStr.split(":").map(Number)

                const slotStart = new Date(date)

                slotStart.setHours(h,m,0,0)
                return slotStart > now
            }
        )}
        return slots
    }






  async generateSlots(options: ISlotGenerationData): Promise<SlotGenerationResponse[]> {
        
            const cacheKey = `lock:service:${options.serviceId}:${options.startDate.toISOString()}:${options.endDate.toISOString()}`;
          const cached = await this._lockService.getLock(cacheKey)
      
          if(cached=="OK"){
            return JSON.parse(cached)
          }

          const weekDays = this.mapWorkingDays(options.workingDays)
          const holiDay: Date[] = options.holidays?.map(h => new Date(h)) || [];

          const rule = new RRule({
            freq:this.getRRuleFrequency(options.frequency),
            dtstart:options.startDate,
            until:options.endDate,
            byweekday:weekDays
          });

          let dates = rule.all()

          const holidays = holiDay.map((h)=>h.getTime())
          dates = dates.filter(d=>!holidays.includes(d.getTime()));

        const response: SlotGenerationResponse[] = dates.map(date => ({
        date: date.toISOString().split("T")[0],
        slots: this.generateSlotsPerDay(date,options.startTime, options.endTime, options.duration),
        }));

           await this._lockService.acquireServiceSlotLock(options.serviceId,options.startDate.toISOString(),options.endDate.toISOString(),60)
          return response
  }
}