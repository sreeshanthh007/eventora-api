import { IWalletResponseDTO } from "@shared/dtos/wallet.dto";


export interface IGetAdminWalletDetailsUseCase{
    execute(adminId:string) : Promise<IWalletResponseDTO>
}