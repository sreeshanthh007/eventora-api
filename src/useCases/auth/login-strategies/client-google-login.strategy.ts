import { inject, injectable } from "tsyringe";
import { ILoginStrategy } from "./login-strategy.interface";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IUserEntity } from "@entities/models/user.entity";
import { LoginUserDTO } from "@shared/dtos/user.dto";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { CustomError } from "@entities/utils/custom.error";




@injectable()
export class ClientGoogleLoginStrategy  implements ILoginStrategy {
    constructor(
        @inject("IClientRepository") private clientRepo : IClientRepository
    ){}

    async login(user: LoginUserDTO): Promise<Partial<IUserEntity>> {
        const client  = await this.clientRepo.findByEmail(user.email)

        if(client){
            if(client.status!=="active"){
                throw new CustomError(ERROR_MESSAGES.BLOCKED,HTTP_STATUS.FORBIDDEN)
            }
        }

        return client as Partial<IUserEntity>
    }
}