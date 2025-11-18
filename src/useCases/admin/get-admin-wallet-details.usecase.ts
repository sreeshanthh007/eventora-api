import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { IGetAdminWalletDetailsUseCase } from "@entities/useCaseInterfaces/admin/get-admin-wallet-details.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { mapWalletDetailstoDTO } from "@mappers/WalletMapper";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { PaginatedWalletDetails } from "interfaceAdapters/models/paginatedWalletDetails";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetAdminWalletDetailsUseCase implements IGetAdminWalletDetailsUseCase{

    constructor(
        @inject("IWalletRepository") private _walletRepository : IWalletRepository
    ){}

    async execute(adminId: string,type:string,page:number,limit:number): Promise<PaginatedWalletDetails> {
        
        const walletDetails = await this._walletRepository.findWallet(adminId)

        if(!walletDetails){
            throw new CustomError(ERROR_MESSAGES.WALLET_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        const validPageNumber = Math.max(1,page || 1)

        const skip = (validPageNumber-1)*limit

        const {wallet,total} = await this._walletRepository.findWalletDetailsByUserId(adminId,type,skip,limit);

        if(!wallet){
            throw new CustomError(ERROR_MESSAGES.WALLET_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        const mappedWalletDetails = mapWalletDetailstoDTO(walletDetails)

        return {
            walletDetails:mappedWalletDetails,
            total
        }
    }
}