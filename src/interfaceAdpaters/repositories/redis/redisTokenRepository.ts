import { IRedisTokenRepository } from "@entities/repositoryInterfaces/redis/redis-token-repository.interface";
import { RedisClient } from "@frameworks/cache/redis.client";



export class RedisTokenRepository implements IRedisTokenRepository{

    async blackListToken(token: string, expiresIn: number): Promise<void> {
    
             await RedisClient.set(token, "blacklisted", {
                EX: expiresIn,
            });
    }

    async isTokenBlacklisted(token: string): Promise<boolean> {
        
        const result = await RedisClient.get(token)
        console.log("is token blacklisted",result)
        return result==="blacklisted"
    }
}