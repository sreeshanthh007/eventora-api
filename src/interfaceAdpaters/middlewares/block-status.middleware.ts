import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IRevokeRefreshTokenUseCase } from "@entities/useCaseInterfaces/auth/revoke-refresh-token-usecase";
import { inject, injectable } from "tsyringe";
import { CustomRequest } from "./auth.middleware";
import { NextFunction, Response } from "express";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { RedisClient } from "@frameworks/cache/redis.client";
import { clearAuthCookie } from "@shared/utils/cookie-helper";
import { IBlacklistTokenUseCase } from "@entities/useCaseInterfaces/auth/blackList-token-interface";


@injectable()
export class  BlockedStatusMiddleware {
    constructor(
        @inject("IClientRepository") private  readonly clientRepository : IClientRepository,
        @inject("IVendorRepository") private readonly vendorRepository : IVendorRepository,
        @inject("IRevokeRefreshTokenUseCase") private readonly revokeRefreshTokenUseCase : IRevokeRefreshTokenUseCase,
        @inject("IBlacklistTokenUseCase") private readonly blackListTokenUseCase : IBlacklistTokenUseCase
    ){}


    checkBlockedStatus = async(req:CustomRequest,res:Response,next:NextFunction)=>{
        try {
            if(!req.user){
                res.status(HTTP_STATUS.UNAUTHORIZED).json({
                    success:false,
                    message:ERROR_MESSAGES.UNAUTH_NO_USER_FOUND
                })
                return;
            }


            const {id,role} = req.user
            

            const cacheKey = `user_status:${role}:${id}`
            let status : string | null | undefined  = await RedisClient.get(cacheKey)
            console.log("what user tate",status);
            
            if(!status){
                if(role=="client"){
                    const client = await this.clientRepository.findById(id)

                    if(!client){
                        res.status(HTTP_STATUS.NOT_FOUND)
                        .json({success:false,message:ERROR_MESSAGES.USER_NOT_FOUND})
                        return;
                    }
                    status = client.status
                }else if(role=="vendor"){
                    const vendor = await this.vendorRepository.findById(id)


                    if(!vendor){
                        res.status(HTTP_STATUS.NOT_FOUND)
                        .json({success:false,message:ERROR_MESSAGES.USER_NOT_FOUND});
                        return
                    }

                    status = vendor.status
                }else{
                    res.status(HTTP_STATUS.NOT_FOUND)
                    .json({success:false,message:ERROR_MESSAGES.INVALID_ROLE})
                    return;
                }

                await RedisClient.set(cacheKey,status ?? "null",{
                    EX:3600
                });
            }

            if(status!=="active"){
                await this.blackListTokenUseCase.execute(req.user.access_token)
                await this.revokeRefreshTokenUseCase.execute(req.user.refresh_token)

                const accessTokenName = `${role}_access_token`
                const refreshTokenName = `${role}_refresh_token`

                clearAuthCookie(res,accessTokenName,refreshTokenName);

                res.status(HTTP_STATUS.FORBIDDEN)
                .json({success:false,message:ERROR_MESSAGES.BLOCKED});
                return
            }
            next()
        } catch (error) {
            console.log("error in block status middleware",error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({success:false,message:ERROR_MESSAGES.SERVER_ERROR});
            return
        }
    }
}