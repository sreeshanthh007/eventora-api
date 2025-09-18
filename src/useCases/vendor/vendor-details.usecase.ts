import { IVendorEntity } from "@entities/models/vendor.entity";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IGetVendorDetailsUseCase } from "@entities/useCaseInterfaces/vendor/get-vendor-details.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetVendorDetailsUseCase implements IGetVendorDetailsUseCase{

    constructor(
        @inject("IVendorRepository") private _vendorRepo : IVendorRepository
    ){}


    async execute(vendorId: string): Promise<Partial<IVendorEntity>> {
        
        const vendorExist = await this._vendorRepo.findById(vendorId)


        if(!vendorExist){
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.BAD_REQUEST)
        }

        return vendorExist
    }
}