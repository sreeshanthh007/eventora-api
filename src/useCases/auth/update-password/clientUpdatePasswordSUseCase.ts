import { inject , injectable } from "tsyringe";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IForgotUpdatePasswordUseCase } from "../../../entities/useCaseInterfaces/client/clientupdatePassword.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { HTTP_STATUS , ERROR_MESSAGES } from "@shared/constants";
import { IBcrypt } from "@frameworks/security/bcrypt.interface";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";


@injectable()
export class ForgotClientUpdatePasswordUseCase implements IForgotUpdatePasswordUseCase {
    constructor(
        @inject("IClientRepository") private clientRepository : IClientRepository,
        @inject("IVendorRepository") private vendorRepository : IVendorRepository,
        @inject("IPasswordBcrypt") private passwordBcrypt : IBcrypt
    ){}

    async update(email: string, password: string,role:string): Promise<void> {
        let repository;

        if(role=="client"){
            repository = this.clientRepository
        }else if(role=="vendor"){
            repository = this.vendorRepository
        }else{
            throw new CustomError(
                ERROR_MESSAGES.INVALID_ROLE,
                HTTP_STATUS.NOT_FOUND
            )
        }



        const isClientExist = await repository.findByEmail(email)

        if(!isClientExist){
            throw new CustomError(
                ERROR_MESSAGES.EMAIL_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        const hashedPassword = await this.passwordBcrypt.hash(password)
        await repository.findByIdAndUpdatePassword(
            isClientExist._id,
            hashedPassword
        )
    }
}