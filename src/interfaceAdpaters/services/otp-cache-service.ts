import { IOtpCacheService } from "@entities/serviceInterfaces/otp-cache-service.interface";
import { RedisClient } from "@frameworks/cache/redis.client";



export class OtpCacheService  implements IOtpCacheService{

    async get(key: string): Promise<string | null> {
        return await RedisClient.get(key)
    }

    async set(key: string, value: string, ttl?: number): Promise<void> {
        
        await RedisClient.set(key,value,{EX:ttl})
    }

    async del(key: string): Promise<void> {
        await RedisClient.del(key)
    }
}