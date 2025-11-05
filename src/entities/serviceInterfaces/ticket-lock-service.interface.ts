

export interface ILockService {
  acquireEventLock(eventId:string,ticketType:string,userId:string,ttl:number): Promise<boolean>;
  releaseEventLock(eventId:string,ticketType:string,userId:string): Promise<void>;
  acquireServiceLock(serviceId:string,selectedDate:string,selectedSlotTime:string,clientId:string,ttl:number) : Promise<boolean>
  releaseServiceLock(serviceId:string,selectedDate:string,selectedSlotTime:string,clientId:string) : Promise<void>
   getLock(key:string) : Promise<string | null>
  acquireServiceSlotLock(serviceId:string,startDate:string,endDate:string,ttl:number) : Promise<boolean>
}