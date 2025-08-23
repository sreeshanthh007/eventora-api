import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IResendVerificationUseCase } from "@entities/useCaseInterfaces/admin/resend-verification.usecase";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";




@injectable()
export class resendVerificationUseCase implements IResendVerificationUseCase{
    constructor(
        @inject("IVendorRepository") private _vendorRepo : IVendorRepository
    ){}

    async execute(vendorId: string): Promise<void> {
        const vendorExist = await this._vendorRepo.findById(vendorId)

        if(!vendorExist){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        await this._vendorRepo.findByIdAndUpdateVendorStatus(vendorId,"pending")
        
    }
}