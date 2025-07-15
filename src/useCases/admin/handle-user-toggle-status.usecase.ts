import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IuserToggleStatusUseCase } from "@entities/useCaseInterfaces/admin/handle-user-toggle-status.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";



@injectable()
export class UserToggleStatusUseCase implements IuserToggleStatusUseCase{
    constructor(
        @inject("IClientRepository") private clientRepository : IClientRepository
    ){} 

    async execute(userId: string, status: string): Promise<void> {
        console.log(userId)
        if(!userId){
            throw new CustomError(
                ERROR_MESSAGES.USER_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        await this.clientRepository.findByIdAndUpdateStatus(userId,status);
        

    }
}