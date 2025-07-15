import { Request , Response, response } from "express";
import { IRefreshTokenUseCase } from "@entities/useCaseInterfaces/auth/generate-refresh-token.interface";
import { inject , injectable } from "tsyringe";
import { IRefreshtokencontroller } from "@entities/controllerInterfaces/auth/refresh-token-controller";
import { clearAuthCookie,updateCookieWithAccessToken } from "@shared/utils/cookie-helper";
import { HTTP_STATUS , SUCCESS_MESSAGES , ERROR_MESSAGES } from "@shared/constants";

import { CustomRequest } from "interfaceAdpaters/middlewares/auth.middleware";


@injectable()
export class   RefreshTokenController implements IRefreshtokencontroller {
    constructor(
        @inject("IRefreshTokenUseCase") private refreshTokenUseCase : IRefreshTokenUseCase
    ){}


   async handle(req: Request, res: Response): Promise<void> {
       try {
        const token = (req as CustomRequest).user.refresh_token
        
        const new_token = await this.refreshTokenUseCase.execute(token)

        const access_token_name = `${new_token.role}_access_token`

        updateCookieWithAccessToken(res,new_token.accessToken,access_token_name)

        res.status(HTTP_STATUS.OK).json({success:true,message:"Token refreshed successfully",token:new_token.accessToken})



       } catch (error) {
        clearAuthCookie(
            res,
              `${(req as CustomRequest).user.role}_access_token`,
            `${(req as CustomRequest).user.role}_refresh_token`
        );

        res.status(HTTP_STATUS.UNAUTHORIZED).json({message:"Invalid token"})
       }
   }
}   