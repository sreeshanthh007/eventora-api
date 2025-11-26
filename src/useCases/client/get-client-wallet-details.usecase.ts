import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { IGetClientWalletDetailsUseCase } from "@entities/useCaseInterfaces/client/get-client-wallet-details.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { mapWalletDetailstoDTO } from "@mappers/WalletMapper";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { PaginatedWalletDetails } from "interfaceAdapters/models/paginatedWalletDetails";
import { inject, injectable } from "tsyringe";



@injectable()
export class GetClientWalletDetailsUseCase implements IGetClientWalletDetailsUseCase{

    constructor(
        @inject("IWalletRepository") private _walletRepo : IWalletRepository
    ){}
    
   async execute(clientId: string, type: string, page: number, limit: number): Promise<PaginatedWalletDetails> {
       
        const walletdetails = await this._walletRepo.findWallet(clientId)
     

        if(!walletdetails){
            throw new CustomError(ERROR_MESSAGES.WALLET_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        
        const validPageNumber = Math.max(1,page || 1);

        const skip = (validPageNumber-1)*limit

       
        const {wallet,total} = await this._walletRepo.findWalletDetailsByUserId(clientId,type,skip,limit)

        console.log("wallet",wallet)

        if(!wallet) {
            throw new CustomError(ERROR_MESSAGES.WALLET_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }
        const mappedData = mapWalletDetailstoDTO(wallet)
        return {
            total,
            walletDetails:mappedData
        }

   }
    
}

