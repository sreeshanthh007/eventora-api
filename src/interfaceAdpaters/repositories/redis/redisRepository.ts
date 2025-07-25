import { IRedisTokenRepository } from "@entities/repositoryInterfaces/redis/redis-token-repository.interface";
import { RedisClient } from "@frameworks/cache/redis.client";



export class RedisTokenRepository implements IRedisTokenRepository{

    async blackListToken(token: string, expiresIn: number): Promise<void> {
        console.log("this is thet token from blk",token)
        console.group("exp in ",expiresIn)
             await RedisClient.set(token, "blacklisted", {
                EX: expiresIn, // in seconds
            });
    }

    async isTokenBlacklisted(token: string): Promise<boolean> {
        
        const result = await RedisClient.get(token)

        return result==="blacklisted"
    }
}