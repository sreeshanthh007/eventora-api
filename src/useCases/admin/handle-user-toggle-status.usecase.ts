import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IuserToggleStatusUseCase } from "@entities/useCaseInterfaces/admin/handle-user-toggle-status.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";
import { RedisClient  } from "@frameworks/cache/redis.client";


@injectable()
    export class UserToggleStatusUseCase implements IuserToggleStatusUseCase{
        constructor(
            @inject("IClientRepository") private clientRepository : IClientRepository
        ){} 

        async execute(userId: string): Promise<void> {
          
            if(!userId){
                throw new CustomError(
                    ERROR_MESSAGES.USER_NOT_FOUND,
                    HTTP_STATUS.NOT_FOUND
                )
            }
            
            const client = await this.clientRepository.findById(userId)

            if(!client){
                throw new CustomError(
                    ERROR_MESSAGES.USER_NOT_FOUND,
                    HTTP_STATUS.NOT_FOUND
                )
            }

            const newsStatus = client.status=="active" ? "blocked" : "active"

            await this.clientRepository.findByIdAndUpdateStatus(userId,newsStatus);

            if(newsStatus=="blocked"){
                await RedisClient.set(`user_status:client:${userId}`,newsStatus,{
                    EX:3600
                });
            }else if(newsStatus=="active"){
            await RedisClient.del(`user_status:client:${userId}`)
            }
        }
    }