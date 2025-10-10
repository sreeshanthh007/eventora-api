

import { RedisClientType } from "redis";
import { ILockService } from "@entities/serviceInterfaces/ticket-lock-service.interface";


export class RedisLockService implements ILockService{
    private readonly _prefix = `lock:event:`
    constructor(
        private _redisType : RedisClientType
    ){}

    async acquireLock(eventId: string, ticketType: string, userId: string, ttl: number): Promise<boolean> {
        
        const key = `${this._prefix}${eventId}:ticketType:${ticketType}`

        const result = await this._redisType.set(
            key,
            userId,
            {NX:true,EX:ttl}
        );

        return result === 'OK';
    }


    async releaseLock(eventId: string, ticketType: string, userId: string): Promise<void> {
        
        const key = `${this._prefix}${eventId}:ticketType:${ticketType}`

        const currentValue = await this._redisType.get(key);

        if(currentValue == userId){
            await this._redisType.del(key);
        }
    }
}