
import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IAddServiceUseCase } from "@entities/useCaseInterfaces/vendor/service/add-service.interface.usecase";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, ERROR_MESSAGES_WITH_REASONS, HTTP_STATUS } from "@shared/constants";
import { CreateServiceDTO } from "@shared/dtos/service.dto";
import { inject, injectable } from "tsyringe";



@injectable()
export class AddServiceUseCase implements IAddServiceUseCase{
    constructor(
        @inject("IServiceRepository") private _serviceRepo :IServiceRepository,
        @inject("IVendorRepository") private _vendorRepo : IVendorRepository
    ){}


    async execute(vendorId: string, data: CreateServiceDTO): Promise<void> {
        const vendor = await this._vendorRepo.findById(vendorId)

        if(vendor?.vendorStatus=="pending" || vendor?.vendorStatus=="rejected"){
            throw new CustomError(ERROR_MESSAGES_WITH_REASONS.CANNOT_ADD_SERVICE(vendor.vendorStatus),HTTP_STATUS.BAD_REQUEST)
        }
        
        const dataWithId = {...data,vendorId}
        await this._serviceRepo.save(dataWithId)
    } 
}