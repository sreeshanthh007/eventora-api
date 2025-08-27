import { IOtpCacheRepository } from "@entities/repositoryInterfaces/redis/redis-otp-cache-repository";
import { RedisClient } from "@frameworks/cache/redis.client";



export class OtpCacheRepository implements IOtpCacheRepository{

    async getOtp(key: string): Promise<string | null> {
        return await RedisClient.get(key)
    }

    async saveOtp(key: string, otp: string, ttlSec: number): Promise<void> {
        await RedisClient.set(key,otp,{EX:ttlSec})
    }

    async deleteOtp(key: string): Promise<void> {
        await RedisClient.del(key)
    }
}