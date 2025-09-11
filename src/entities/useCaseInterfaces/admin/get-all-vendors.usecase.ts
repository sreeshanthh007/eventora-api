
import { PaginatedUsers } from "interfaceAdpaters/models/paginatedUsers";

export interface IGetAllVendorsUseCase {
    execute(limit:number,searchTerm: string,current:number) :Promise<PaginatedUsers>
}