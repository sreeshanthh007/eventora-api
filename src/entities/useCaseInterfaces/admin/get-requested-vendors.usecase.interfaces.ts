import { PaginatedVendors } from "interfaceAdapters/models/PaginatedVendors";


export interface IGetRequestedVendorsUseCase {
    execute(limit:number,searchTerm:string,current:number) :  Promise<PaginatedVendors>
}
