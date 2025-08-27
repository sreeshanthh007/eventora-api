import { IServiceEntity } from "@entities/models/service.entity";
import { IServiceRepository } from "@entities/repositoryInterfaces/vendor/service/service.repository.interface";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IEditServiceUseCase } from "@entities/useCaseInterfaces/vendor/service/edit-service.interface.usecase";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";



@injectable()
export class EditServiceUseCase implements IEditServiceUseCase{
    constructor(
        @inject("IServiceRepository") private _serviceRepo : IServiceRepository,
        @inject("IVendorRepository")  private _vendorRepo : IVendorRepository
    ){}


    async execute(vendorId:string,serviceId: string, data: Partial<Pick<IServiceEntity, "additionalHourPrice" | "cancellationPolicies" | "serviceDescription" | "serviceDuration" | "servicePrice" | "categoryId" | "serviceTitle" | "termsAndConditions" | "yearsOfExperience">>): Promise<void> {
        
        const service = await this._serviceRepo.findById(serviceId)
        const vendor  = await this._vendorRepo.findById(vendorId)

        if(!service){
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }else if(vendor?.vendorStatus=="pending" || vendor?.vendorStatus=="rejected"){
            throw new CustomError(`cannot perform action due to vendor status : ${vendor.vendorStatus}`,HTTP_STATUS.BAD_REQUEST)
        }

        await this._serviceRepo.findByIdAndUpdate(serviceId,data)
        
    }
}