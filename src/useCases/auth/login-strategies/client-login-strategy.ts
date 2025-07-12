import { inject , injectable } from "tsyringe";
import { ILoginStrategy } from "./login-strategy.interface";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IBcrypt } from "@frameworks/security/bcrypt.interface";
import { CustomError } from "@entities/utils/custom.error";
import { LoginUserDTO } from "@shared/dtos/user.dto";
import { IUserEntity } from "@entities/models/user.entity";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";


@injectable()
export class ClientLoginStrategy implements ILoginStrategy {
    constructor(
        @inject("IClientRepository") private clientRepository : IClientRepository,
        @inject("IPasswordBcrypt") private passwordBcrypt : IBcrypt
    ){}


    async login(user: LoginUserDTO): Promise<Partial<IUserEntity>> {
        const client = await this.clientRepository.findByEmail(user.email)

        if(!client){
            throw new CustomError(
                ERROR_MESSAGES.EMAIL_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            );  
        }

        if(client.status!=="active"){
            throw new CustomError(
                ERROR_MESSAGES.BLOCKED,
                HTTP_STATUS.FORBIDDEN
            )
        }

        if(user.password){
            const passwordIsMatch = await this.passwordBcrypt.compare(user.password,client.password)
            console.log(passwordIsMatch)
            if(!passwordIsMatch){
                throw new CustomError(
                    ERROR_MESSAGES.INVALID_CREDENTIALS ,
                    HTTP_STATUS.BAD_REQUEST
                );
            }
        }
        return client
    }
}