
import { PaginatedWalletDetails } from "interfaceAdapters/models/paginatedWalletDetails";


export interface IGetVendorWalletDetailsUseCase{
    execute(vendorId:string,type:string,page:number,limit:number) : Promise<PaginatedWalletDetails>
}