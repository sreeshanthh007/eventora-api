
import { IWalletResponseDTO } from "@shared/dtos/wallet.dto";



export interface IGetClientWalletDetailsUseCase{
    execute(clientId:string) : Promise<IWalletResponseDTO>
}