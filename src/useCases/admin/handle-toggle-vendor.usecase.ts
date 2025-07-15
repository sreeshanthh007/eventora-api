import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IHandleToggleVendorUseCase } from "@entities/useCaseInterfaces/admin/handle-toggle.vendor.usecase";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class HandleToggleVendorStatusUseCase implements IHandleToggleVendorUseCase{
    constructor(

        @inject("IVendorRepository") private vendorRepository : IVendorRepository
    ){}


    async execute(vendorid: string, status: string): Promise<void> {
        
        if(!vendorid){
            throw new CustomError(
                ERROR_MESSAGES.USER_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        await this.vendorRepository.findByIdAndUpdateStatus(vendorid,status)

    }
}