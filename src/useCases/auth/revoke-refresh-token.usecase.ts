
import { IRevokeRefreshTokenUseCase } from "@entities/useCaseInterfaces/auth/revoke-refresh-token-usecase";
import { RedisClient } from "@frameworks/cache/redis.client";
import {  injectable } from "tsyringe";

@injectable()
export class RevokeRefreshTokenUseCase implements IRevokeRefreshTokenUseCase{
    constructor(
        
    ){}
    async execute(token: string): Promise<void> {
        await RedisClient.del(`refresh:${token}`)
    }
}