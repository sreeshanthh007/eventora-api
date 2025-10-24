import { IWalletResponseDTO } from "@shared/dtos/wallet.dto";


export interface PaginatedWalletDetails{
    walletDetails:IWalletResponseDTO
    total:number
}