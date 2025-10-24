import { IWalletResponseDTO } from "@shared/dtos/wallet.dto";


export interface IGetVendorWalletDetailsUseCase{
    execute(vendorId:string) : Promise<IWalletResponseDTO>
}