import { IServiceEntity } from "@entities/models/service.entity";
import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IGetServiceByIdUseCase } from "@entities/useCaseInterfaces/vendor/service/get-service-by-id.interface.usecase";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { mapServiceForEditService } from "interfaceAdpaters/mappers/serviceMapper";
import { inject, injectable } from "tsyringe";





@injectable()
export class GetServiceByIdUseCase implements IGetServiceByIdUseCase{
    constructor(
        @inject("IServiceRepository") private _serviceRepo : IServiceRepository
    ){}


    async execute(serviceId: string): Promise<IServiceEntity | null> {
        
        const service = await this._serviceRepo.findById(serviceId)

        if(!service){
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        return mapServiceForEditService(service)
    }
}