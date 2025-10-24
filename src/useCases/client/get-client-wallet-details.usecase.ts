import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { IGetClientWalletDetailsUseCase } from "@entities/useCaseInterfaces/client/get-client-wallet-details.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { mapWalletDetailstoDTO } from "@mappers/WalletMapper";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { IWalletResponseDTO } from "@shared/dtos/wallet.dto";
import { inject, injectable } from "tsyringe";



@injectable()
export class GetClientWalletDetailsUseCase implements IGetClientWalletDetailsUseCase{

    constructor(
        @inject("IWalletRepository") private _walletRepo : IWalletRepository
    ){}
    
   async execute(clientId: string): Promise<IWalletResponseDTO> {
       
        const walletdetails = await this._walletRepo.findWalletDetailsByUserId(clientId)

        if(!walletdetails){
            throw new CustomError(ERROR_MESSAGES.WALLET_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }
        
        const mappedWalletDetails = mapWalletDetailstoDTO(walletdetails)

        return mappedWalletDetails
   }
    
}

