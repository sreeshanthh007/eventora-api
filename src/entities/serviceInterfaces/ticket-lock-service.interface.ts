

export interface ILockService {
  acquireLock(eventId: string, ticketType:string, ttl: number): Promise<boolean>;
  releaseLock(key: string): Promise<void>;
}