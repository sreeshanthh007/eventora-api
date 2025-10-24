import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { IGetVendorWalletDetailsUseCase } from "@entities/useCaseInterfaces/vendor/get-vendor-wallet-details.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { mapWalletDetailstoDTO } from "@mappers/WalletMapper";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { IWalletResponseDTO } from "@shared/dtos/wallet.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetVendorWalletDetailsUseCase implements IGetVendorWalletDetailsUseCase{

    constructor(
        @inject("IWalletRepository") private _walletRepo : IWalletRepository
    ){}


    async execute(vendorId: string): Promise<IWalletResponseDTO> {
        
        const walletdetails = await this._walletRepo.findWalletDetailsByUserId(vendorId)


        if(!walletdetails){
            throw new CustomError(ERROR_MESSAGES.WALLET_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        const mappedWalletDetails = mapWalletDetailstoDTO(walletdetails)

        return mappedWalletDetails
    }
}