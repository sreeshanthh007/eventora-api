import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { IGetVendorWalletDetailsUseCase } from "@entities/useCaseInterfaces/vendor/get-vendor-wallet-details.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { mapWalletDetailstoDTO } from "@mappers/WalletMapper";
import { ERROR_MESSAGES, HTTP_STATUS, PAGINATION } from "@shared/constants";
import { PaginatedWalletDetails } from "interfaceAdapters/models/paginatedWalletDetails";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetVendorWalletDetailsUseCase implements IGetVendorWalletDetailsUseCase{

    constructor(
        @inject("IWalletRepository") private _walletRepo : IWalletRepository
    ){}


    async execute(vendorId: string,type:string,page:number,limit:number): Promise<PaginatedWalletDetails> {
        
        const walletdetails = await this._walletRepo.findWallet(vendorId)


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


        const {wallet,total} = await this._walletRepo.findWalletDetailsByUserId(vendorId,type,skip,limit);

        if(!wallet){
            throw new CustomError(ERROR_MESSAGES.WALLET_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }
        const mappedData = mapWalletDetailstoDTO(wallet)
        return {
            total: Math.ceil(total/limit),
            walletDetails:mappedData
        }


    }
}