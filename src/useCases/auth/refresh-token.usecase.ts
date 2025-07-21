import { inject, injectable } from "tsyringe";
import { ITokenService } from "./interfaces/token-service-interface";
import { IRefreshTokenUseCase } from "@entities/useCaseInterfaces/auth/generate-refresh-token.interface";
import { CustomError } from "@entities/utils/custom.error";
import { HTTP_STATUS } from "@shared/constants";
import { JwtPayload } from "jsonwebtoken";


@injectable()
export class refreshTokenUsesCase implements IRefreshTokenUseCase{
    constructor(
        @inject("ITokenService") private tokenService : ITokenService
    ){}

    execute(refreshToken: string): {
    role: string;
    accessToken: string;
  } {
    const payload = this.tokenService.verifyRefreshToken(refreshToken);
    console.log("the payload is ",payload)
    if (!payload)
      throw new CustomError("Invalid refresh token", HTTP_STATUS.BAD_REQUEST);

    return {
      role: (payload as JwtPayload).role,
      accessToken: this.tokenService.generateAccessToken({
        id: (payload as JwtPayload).id,
        email: (payload as JwtPayload).email,
        role: (payload as JwtPayload).role,
      }),
    };
  }
}