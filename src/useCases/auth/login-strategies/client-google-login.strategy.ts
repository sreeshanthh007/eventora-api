import { inject, injectable } from "tsyringe";
import { ILoginStrategy } from "./login-strategy.interface";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { LoginResponseDTO, LoginUserDTO } from "@shared/dtos/user.dto";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { CustomError } from "@entities/utils/custom.error";
import { mapClientDetailsViaGoogleLogin } from "@mappers/ClientMapper";




@injectable()
export class ClientGoogleLoginStrategy  implements ILoginStrategy {
    constructor(
        @inject("IClientRepository") private clientRepo : IClientRepository
    ){}

    async login(user: LoginUserDTO): Promise<LoginResponseDTO> {
          const client  = await this.clientRepo.findByEmail(user.email)

           if (!client) {
      throw new CustomError(
        ERROR_MESSAGES.EMAIL_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    if (client.status !== "active") {
      throw new CustomError(
        ERROR_MESSAGES.BLOCKED,
        HTTP_STATUS.FORBIDDEN
      );
    }
        return mapClientDetailsViaGoogleLogin(client)
    }
}