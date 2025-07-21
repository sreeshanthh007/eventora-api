import { IRefreshTokenRepository } from "@entities/repositoryInterfaces/auth/refresh-token-repository.interface";
import { IRevokeRefreshTokenUseCase } from "@entities/useCaseInterfaces/auth/revoke-refresh-token-usecase";
import { inject, injectable } from "tsyringe";

@injectable()
export class RevokeRefreshTokenUseCase implements IRevokeRefreshTokenUseCase{
    constructor(
        @inject("IRefreshTokenRepository") private refreshTokenRepo : IRefreshTokenRepository,
    ){}
    async execute(token: string): Promise<void> {
        await this.refreshTokenRepo.revokeRefreshToken(token)
    }
}