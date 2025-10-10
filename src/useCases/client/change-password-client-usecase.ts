import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IBcryptService } from "@entities/serviceInterfaces/bcrypt-service.interface";
import { IChangeClientPasswordUseCase } from "@entities/useCaseInterfaces/client/change-password-client-usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";


@injectable()
export class ChangePasswordClientUseCase implements IChangeClientPasswordUseCase{

    constructor(
        @inject("IClientRepository") private _clientRepository : IClientRepository,
        @inject("IPasswordBcryptService") private _passwordBcryptService : IBcryptService
    ){}


    async execute(clientId: string, currentPassword: string, newPassword: string): Promise<void> {
        
        const client = await this._clientRepository.findById(clientId);


        if(!client){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        if(!client.password){
            throw new CustomError(ERROR_MESSAGES.GOOGLE_GOOGLE_USER_PASSWORD_NOT_FOUND,HTTP_STATUS.BAD_REQUEST)
        }
        const passwordIsMatch = await this._passwordBcryptService.compare(currentPassword,client.password);

        if(!passwordIsMatch){
            throw new CustomError(ERROR_MESSAGES.INVALID_PASSWORD,HTTP_STATUS.BAD_REQUEST)
        }

        const newPasswordIsSameAsCurrent = await this._passwordBcryptService.compare(newPassword,client.password);

        if(newPasswordIsSameAsCurrent){
            throw new CustomError(ERROR_MESSAGES.SAME_PASSWORD,HTTP_STATUS.BAD_REQUEST)
        }

        const hashedPassword = await this._passwordBcryptService.hash(newPassword)

        await this._clientRepository.findByIdAndChangePassword(clientId,hashedPassword)
    }
}