
import { PaginatedWalletDetails } from "interfaceAdapters/models/paginatedWalletDetails";


export interface IGetAdminWalletDetailsUseCase{
    execute(adminId:string,type:string,page:number,limit:number) : Promise<PaginatedWalletDetails>
}