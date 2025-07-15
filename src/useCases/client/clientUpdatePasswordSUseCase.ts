import { inject , injectable } from "tsyringe";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IForgotUpdatePasswordUseCase } from "../../entities/useCaseInterfaces/client/clientupdatePassword.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { HTTP_STATUS , ERROR_MESSAGES } from "@shared/constants";
import { IBcrypt } from "@frameworks/security/bcrypt.interface";


@injectable()
export class ForgotClientUpdatePasswordUseCase implements IForgotUpdatePasswordUseCase {
    constructor(
        @inject("IClientRepository") private clientRepository : IClientRepository,
        @inject("IPasswordBcrypt") private passwordBcrypt : IBcrypt
    ){}

    async update(email: string, password: string): Promise<void> {
        const isClientExist = await this.clientRepository.findByEmail(email)

        if(!isClientExist){
            throw new CustomError(
                ERROR_MESSAGES.EMAIL_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        const hashedPassword = await this.passwordBcrypt.hash(password)
        await this.clientRepository.findByIdAndUpdatePassword(
            isClientExist._id,
            hashedPassword
        )
    }
}