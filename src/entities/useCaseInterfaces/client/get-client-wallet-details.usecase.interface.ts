
import { PaginatedWalletDetails } from "interfaceAdapters/models/paginatedWalletDetails";



export interface IGetClientWalletDetailsUseCase{
    execute(clientId:string,type:string,page:number,limit:number) : Promise<PaginatedWalletDetails>
}