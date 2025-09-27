import { injectable , inject } from "tsyringe";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IForgotUpdatePasswordUseCase } from "@entities/useCaseInterfaces/client/clientupdatePassword.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { IBcryptService } from "@entities/serviceInterfaces/bcrypt-service.interface";

@injectable()
export class ForgotVendorUpdatePasswordUseCase implements IForgotUpdatePasswordUseCase{
    constructor(
        @inject("IVendorRepository") private _vendorRepository : IVendorRepository,
        @inject("IPasswordBcryptService") private _passwordBcryptService : IBcryptService
    ){}

    async update(email: string, password: string): Promise<void> {
        const isVendorExist = await this._vendorRepository.findByEmail(email)

        if(!isVendorExist){
            throw new CustomError(
                ERROR_MESSAGES.EMAIL_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        const hashedPassword = await this._passwordBcryptService.hash(password)
        await this._vendorRepository.findByIdAndUpdatePassword(
            isVendorExist._id,
            hashedPassword
        );
        
    }
}