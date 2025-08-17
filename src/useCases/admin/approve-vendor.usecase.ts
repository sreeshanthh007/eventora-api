import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IApproveVendorUseCase } from "@entities/useCaseInterfaces/admin/approve-vendor.usecase";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";



@injectable()
export class ApproveVendorUseCase implements IApproveVendorUseCase{
    constructor(
        @inject("IVendorRepository") private vendorRepo : IVendorRepository
     ){}

     async execute(vendorId: string): Promise<void> {

         const vendorExist = await this.vendorRepo.findById(vendorId)

         if(!vendorExist){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
         }


         await this.vendorRepo.findByIdAndUpdateVendorStatus(vendorId,"approved")
     }
}