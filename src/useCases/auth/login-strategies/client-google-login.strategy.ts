import { inject, injectable } from "tsyringe";
import { ILoginStrategy } from "./login-strategy.interface";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { LoginResponseDTO, LoginUserDTO } from "@shared/dtos/user.dto";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { CustomError } from "@entities/utils/custom.error";
import { mapClientDetailsViaGoogleLogin } from "@mappers/ClientMapper";
import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { WalletDTO } from "@shared/dtos/wallet.dto";
import { IUUIDGeneratorService } from "@entities/serviceInterfaces/generate-random-uuid.interface";




@injectable()
export class ClientGoogleLoginStrategy  implements ILoginStrategy {
    constructor(
        @inject("IClientRepository") private clientRepo : IClientRepository,
        @inject("IWalletRepository") private _walletRepository : IWalletRepository,
        @inject("IUUIDGeneratorService") private _generateUUID : IUUIDGeneratorService
    ){}

    async login(user: LoginUserDTO): Promise<LoginResponseDTO | null> {
          const client  = await this.clientRepo.findByEmail(user.email)

          if (!client) {
          return null
          
      }

    if (client.status !== "active") {
      throw new CustomError(
        ERROR_MESSAGES.BLOCKED,
        HTTP_STATUS.FORBIDDEN
      );
    }


    const isClientWalletExist = await this._walletRepository.findWallet(client._id.toString())

    if(!isClientWalletExist){
      const walletId = this._generateUUID.generate()
      const walletDetails : WalletDTO = {
        balance:0,
        userId:client._id.toString(),
        userType:"client",
        walletId:walletId
      }

      await this._walletRepository.createWallet(walletDetails)
    }
        return mapClientDetailsViaGoogleLogin(client)
    }
}  