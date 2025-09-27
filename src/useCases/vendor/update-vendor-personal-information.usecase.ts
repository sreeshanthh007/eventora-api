
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IUpdateVendorPersonalInformationUseCase } from "@entities/useCaseInterfaces/vendor/update-vendor-personal.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { UpdateVendorProfileDTO } from "@shared/dtos/user.dto";
import { inject, injectable } from "tsyringe";




@injectable()
export class UpdateVendorPersonalInformationUseCase implements IUpdateVendorPersonalInformationUseCase{
    constructor(
        @inject("IVendorRepository") private _vendorRepo : IVendorRepository
     ){}

     async execute(vendorId: string, updateData: UpdateVendorProfileDTO): Promise<void> {
         

         const vendor = await this._vendorRepo.findById(vendorId)

        if(!vendor){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        await this._vendorRepo.updatePersonalInformation(vendorId,updateData)
     }
}