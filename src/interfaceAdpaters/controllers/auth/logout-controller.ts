import { ILogoutUserController } from "@entities/controllerInterfaces/auth/logout-controller.interface";
import { IBlacklistTokenUseCase } from "@entities/useCaseInterfaces/auth/blackList-token-interface";
import { IRevokeRefreshTokenUseCase } from "@entities/useCaseInterfaces/auth/revoke-refresh-token-usecase";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";
import { clearAuthCookie } from "@shared/utils/cookie-helper";
import { Request, Response } from "express";
import { CustomRequest } from "interfaceAdpaters/middlewares/auth.middleware";
import { inject, injectable } from "tsyringe";


@injectable()
export class LogoutController implements ILogoutUserController{
    constructor(
        @inject("IRevokeRefreshTokenUseCase") private revokeRefreshTokenUseCase : IRevokeRefreshTokenUseCase,
        @inject("IBlacklistTokenUseCase") private blackListTokenUseCase : IBlacklistTokenUseCase
    ){}

    async handle(req: Request, res: Response): Promise<void> {
        console.log((req as CustomRequest).user)
        await this.blackListTokenUseCase.execute((req as CustomRequest).user.access_token)

        await this.revokeRefreshTokenUseCase.execute((req as CustomRequest).user.refresh_token);

        const user = (req as CustomRequest).user

        const accessTokenName = `${user.role}_access_token`
        const refreshTokenName = `${user.role}_refresh_token`


        clearAuthCookie(res,accessTokenName,refreshTokenName)

        res.status(HTTP_STATUS.OK).json({success:true,message:SUCCESS_MESSAGES.USER_LOGOUT_SUCCESS})
        return
    }
}