import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IBcryptService } from "@entities/serviceInterfaces/bcrypt-service.interface";
import { IChangeVendorPasswordUseCase } from "@entities/useCaseInterfaces/vendor/change-password-vendor.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";



@injectable()
export class ChangeVendorPasswordUseCase implements IChangeVendorPasswordUseCase{

    constructor(
        @inject("IVendorRepository") private _vendorRepository : IVendorRepository,
        @inject("IPasswordBcryptService") private _passwordBcryptService : IBcryptService
    ){}


    async execute(vendorId: string, currentPassword: string, newPassword: string): Promise<void> {
        

        const vendor = await this._vendorRepository.findById(vendorId)


        if(!vendor){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }


        const passwordIsMatch = await this._passwordBcryptService.compare(currentPassword,vendor.password)

        if(!passwordIsMatch){
            throw new CustomError(ERROR_MESSAGES.INVALID_PASSWORD,HTTP_STATUS.BAD_REQUEST)
        }

        const newPasswordIsSameAsCurrent = await this._passwordBcryptService.compare(newPassword,vendor.password)

        if(newPasswordIsSameAsCurrent){
            throw new CustomError(ERROR_MESSAGES.SAME_PASSWORD,HTTP_STATUS.BAD_REQUEST)
        }



        const hashedPassword = await this._passwordBcryptService.hash(newPassword)

        await this._vendorRepository.changePassword(vendorId,hashedPassword)
    }
}