
import { IBlacklistTokenUseCase } from "@entities/useCaseInterfaces/auth/blackList-token-interface";
import { inject, injectable } from "tsyringe";
import { ITokenService } from "./interfaces/token-service-interface";
import { JwtPayload } from "jsonwebtoken";
import { RedisClient } from "@frameworks/cache/redis.client";

@injectable()
export class BlacklistTokenUseCase implements IBlacklistTokenUseCase{
    constructor(
        @inject("ITokenService") private tokenService : ITokenService

    ){}

    async execute(token: string): Promise<void> {

          const decoded = this.tokenService.verifyAccessToken(token) as JwtPayload | null;

        
       
            if (!decoded || typeof decoded !== 'object' || !('exp' in decoded)) {
            throw new Error("Invalid token: Missing or malformed payload");
            }

            const expiresIn = Math.floor(Date.now()/1000)


        if(expiresIn > 0){
            await RedisClient.set(token,"blacklisted",{EX:expiresIn})
        }
    }
}