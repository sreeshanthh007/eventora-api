import { inject , injectable } from "tsyringe";
import { IGenerateTokenUseCase } from "@entities/useCaseInterfaces/auth/generate-token.interface";
import { ITokenService } from "./interfaces/token-service-interface";
import { TRole } from "@shared/constants";
import { RedisClient } from "@frameworks/cache/redis.client";

@injectable()

export class GenerataTokenUseCase implements IGenerateTokenUseCase {
    constructor(
        @inject("ITokenService") private _tokenService : ITokenService,
    ){}

    async execute(id: string, email: string, role: string): Promise<{ accessToken: string; refreshToken: string; }> {
        const payload = {id,email,role}

        const accessToken = this._tokenService.generateAccessToken(payload)
        const refreshToken = this._tokenService.generateRefreshToken(payload)
        
      
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        
        const ttl = Math.floor((expiresAt.getTime() - Date.now()) / 1000)

        await RedisClient.hSet(`refresh:${refreshToken}`,{
            userType: role as  TRole,
            user:id.toString()
        });

        await RedisClient.expire(`refresh:${refreshToken}`,ttl)


        return {
            accessToken,
            refreshToken
        }
    }
}

