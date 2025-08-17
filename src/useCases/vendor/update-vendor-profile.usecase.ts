
import { IVendorEntity } from "@entities/models/vendor.entity";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IEditVendorProfileUseCase } from "@entities/useCaseInterfaces/vendor/edit-profile.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";


@injectable()

export class UpdateVendorProfileUseCase implements IEditVendorProfileUseCase{
    constructor(
        @inject("IVendorRepository") private vendorRepo :  IVendorRepository
    ){}

    async execute(vendorId: string, updateData: Partial<IVendorEntity>): Promise<void> {
      
        const vendorExist = await this.vendorRepo.findById(vendorId)

        if(!vendorExist){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        await this.vendorRepo.updateVendorProfileById(vendorId,updateData);


    }
}