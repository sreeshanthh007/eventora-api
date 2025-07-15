import { inject , injectable } from "tsyringe";
import { IGenerateTokenUseCase } from "@entities/useCaseInterfaces/auth/generate-token.interface";
import { IRefreshTokenRepository } from "@entities/repositoryInterfaces/auth/refresh-token-repository.interface";
import { ITokenService } from "./auth/interfaces/token-service-interface";
import { TRole } from "@shared/constants";
import { ObjectId } from "mongoose";

@injectable()

export class GenerataTokenUseCase implements IGenerateTokenUseCase {
    constructor(
        @inject("ITokenService") private tokenService : ITokenService,
        @inject("IRefreshTokenRepository") private refreshTokenRepository : IRefreshTokenRepository
    ){}

    async execute(id: string, email: string, role: string): Promise<{ accessToken: string; refreshToken: string; }> {
        const payload = {id,email,role}

        const accessToken = this.tokenService.generateAccessToken(payload)
        const refreshToken = this.tokenService.generateRefreshToken(payload)
       
        await this.refreshTokenRepository.save({
            token:refreshToken,
            userType: role as TRole, 
            user : id as unknown as ObjectId,
              expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return {
            accessToken,
            refreshToken
        }
    }
}

