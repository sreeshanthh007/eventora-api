import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { IGetAdminWalletDetailsUseCase } from "@entities/useCaseInterfaces/admin/get-admin-wallet-details.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { mapWalletDetailstoDTO } from "@mappers/WalletMapper";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { IWalletResponseDTO } from "@shared/dtos/wallet.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetAdminWalletDetailsUseCase implements IGetAdminWalletDetailsUseCase{

    constructor(
        @inject("IWalletRepository") private _walletRepository : IWalletRepository
    ){}

    async execute(adminId: string): Promise<IWalletResponseDTO> {
        
        const walletDetails = await this._walletRepository.findWalletDetailsByUserId(adminId)

        if(!walletDetails){
            throw new CustomError(ERROR_MESSAGES.WALLET_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        const mappedWalletDetails = mapWalletDetailstoDTO(walletDetails)

        return mappedWalletDetails
    }
}