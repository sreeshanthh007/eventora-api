

export interface ILockService {
  acquireLock(eventId:string,ticketType:string,userId:string,ttl:number): Promise<boolean>;
  releaseLock(eventId:string,ticketType:string,userId:string): Promise<void>;
}