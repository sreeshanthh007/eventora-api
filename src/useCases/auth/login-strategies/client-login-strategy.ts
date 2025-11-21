import { inject , injectable } from "tsyringe";
import { ILoginStrategy } from "./login-strategy.interface";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { CustomError } from "@entities/utils/custom.error";
import { LoginResponseDTO, LoginUserDTO } from "@shared/dtos/user.dto";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { IBcryptService } from "@entities/serviceInterfaces/bcrypt-service.interface";


@injectable()
export class ClientLoginStrategy implements ILoginStrategy {
    constructor(
        @inject("IClientRepository") private _clientRepository : IClientRepository,
        @inject("IPasswordBcryptService") private _passwordBcryptService : IBcryptService
    ){}


    async login(user: LoginUserDTO): Promise<LoginResponseDTO> {
        
           const client = await this._clientRepository.findByEmail(user.email);

    if (!client) {
      throw new CustomError(ERROR_MESSAGES.EMAIL_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    if (client.status !== "active") {
      throw new CustomError(ERROR_MESSAGES.BLOCKED, HTTP_STATUS.FORBIDDEN);
    }

    if (user.password) {
      const passwordIsMatch = await this._passwordBcryptService.compare(user.password, client.password);
      if (!passwordIsMatch) {
        throw new CustomError(ERROR_MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.BAD_REQUEST);
      }
    }

    return {
      _id: client._id.toString(),
      name: client.name,
      email: client.email,
      phone: client.phone,
      role: "client",
      profileImage: client.profileImage,
      clientId: client.clientId!,
    };
  }
}
