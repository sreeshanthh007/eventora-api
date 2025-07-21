import { IRedisTokenRepository } from "@entities/repositoryInterfaces/redis/redis-token-repository.interface";
import { IBlacklistTokenUseCase } from "@entities/useCaseInterfaces/auth/blackList-token-interface";
import { inject, injectable } from "tsyringe";
import { ITokenService } from "./interfaces/token-service-interface";
import { JwtPayload } from "jsonwebtoken";

@injectable()
export class BlacklistTokenUseCase implements IBlacklistTokenUseCase{
    constructor(
        @inject("IRedisTokenRepository") private redisTokenRepository : IRedisTokenRepository,
        @inject("ITokenService") private tokenService : ITokenService

    ){}

    async execute(token: string): Promise<void> {

          const decoded = this.tokenService.verifyAccessToken(token) as JwtPayload | null;

        console.log("decoded",decoded)
       
            if (!decoded || typeof decoded !== 'object' || !('exp' in decoded)) {
            throw new Error("Invalid token: Missing or malformed payload");
            }

        const expiresIn = Math.floor(Date.now()/1000)

        if(expiresIn > 0){
            await this.redisTokenRepository.blackListToken(token,expiresIn)
        }
    }
}