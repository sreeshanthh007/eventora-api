import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { IGetClientWalletDetailsUseCase } from "@entities/useCaseInterfaces/client/get-client-wallet-details.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { mapWalletDetailstoDTO } from "@mappers/WalletMapper";
import { ERROR_MESSAGES, HTTP_STATUS, PAGINATION } from "@shared/constants";
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

        
        const safePage = Math.max(
          PAGINATION.PAGE,
          page || PAGINATION.PAGE
        )
        
        const safeLimit = Math.min(
          PAGINATION.MAX_LIMIT,
          Math.max(1, limit || PAGINATION.LIMIT)
        );
       

        const skip = (safePage-1)*safeLimit

       
        const {wallet,total} = await this._walletRepo.findWalletDetailsByUserId(clientId,type,skip,limit)

  

        if(!wallet) {
            throw new CustomError(ERROR_MESSAGES.WALLET_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }
        const mappedData = mapWalletDetailstoDTO(wallet)
        return {
            total : Math.ceil(total/limit),
            walletDetails:mappedData
        }

   }
    
}

