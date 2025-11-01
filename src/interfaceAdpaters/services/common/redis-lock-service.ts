


import { ILockService } from "@entities/serviceInterfaces/ticket-lock-service.interface";
import { injectable } from "tsyringe";
import { RedisClient } from "@frameworks/cache/redis.client";

@injectable()
export class RedisLockService implements ILockService{
    private readonly _prefix = `lock:event:`
    private readonly _sevicePrefix = `lock:service:`

    
    async acquireLock(eventId: string, ticketType: string, userId: string, ttl: number): Promise<boolean> {
        
        const key = `${this._prefix}${eventId}:ticketType:${ticketType}`

        const result = await RedisClient.set(
            key,
            userId,
            {NX:true,EX:ttl}
        );

        return result === 'OK';
    }


    async getLock(key:string) : Promise<string | null>{

        return await RedisClient.get(key)
    }


    async acquireServiceLock(serviceId:string,startDate:string,endDate:string,ttl:number) : Promise<boolean>{

        const key =  `${this._sevicePrefix}${serviceId}:${startDate}:${endDate}`;

        const result = await RedisClient.set(
            key,
            serviceId,
            {NX:true,EX:ttl}

        );

        return result =="OK"
    }


    async releaseLock(eventId: string, ticketType: string, userId: string): Promise<void> {
        
        const key = `${this._prefix}${eventId}:ticketType:${ticketType}`

        const currentValue = await RedisClient.get(key);

        if(currentValue == userId){
            await RedisClient.del(key);
        }
    }
}