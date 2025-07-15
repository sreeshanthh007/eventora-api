import { injectable , inject } from "tsyringe";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IBcrypt } from "@frameworks/security/bcrypt.interface";
import { IForgotUpdatePasswordUseCase } from "@entities/useCaseInterfaces/client/clientupdatePassword.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";

@injectable()
export class ForgotVendorUpdatePasswordUseCase implements IForgotUpdatePasswordUseCase{
    constructor(
        @inject("IVendorRepository") private vendorRepository : IVendorRepository,
        @inject("IPasswordBcrypt") private passwordBcrypt : IBcrypt
    ){}

    async update(email: string, password: string): Promise<void> {
        const isVendorExist = await this.vendorRepository.findByEmail(email)

        if(!isVendorExist){
            throw new CustomError(
                ERROR_MESSAGES.EMAIL_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        const hashedPassword = await this.passwordBcrypt.hash(password)
        await this.vendorRepository.findByIdAndUpdatePassword(
            isVendorExist._id,
            hashedPassword
        );
        
    }
}