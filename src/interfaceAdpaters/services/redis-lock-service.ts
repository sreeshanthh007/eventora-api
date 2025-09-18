

import { RedisClientType } from "redis";

import { ILockService } from "@entities/serviceInterfaces/ticket-lock-service.interface";


export class RedisLockService implements ILockService{
    private _prefix = `lock:event`
    constructor(
        private _redisType : RedisClientType
    ){}

    async acquireLock(key: string, ticketType:string,ttl: number): Promise<boolean> {

        const result = await this._redisType.set(`${this._prefix}${key}`,"locked",{
            NX:true,
            EX:ttl
        });

        return result ==="OK"
    }


    async releaseLock(key: string): Promise<void> {
        
        await this._redisType.del(`lock${key}`)
    }
}