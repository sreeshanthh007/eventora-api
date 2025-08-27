import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IToggleServiceStatusUseCase } from "@entities/useCaseInterfaces/vendor/service/toggle-service.interface.usecase";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";




@injectable()
export class toggleServiceStatusUseCase implements IToggleServiceStatusUseCase{
    constructor(
        @inject("IServiceRepository") private _serviceRepo : IServiceRepository
    ){}

    async execute(serviceId: string): Promise<void> {
        
        const service = await this._serviceRepo.findById(serviceId)

        if(!service){
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }
        
        const newStatus =  service.status=="active" ? "blocked" : "active"


        await this._serviceRepo.findByIdAndUpdateStatus(serviceId,newStatus)
    }
}