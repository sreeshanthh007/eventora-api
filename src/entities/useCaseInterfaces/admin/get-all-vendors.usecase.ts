
import { PaginatedUsers } from "@entities/models/paginatedUsers.entity";

export interface IGetAllVendorsUseCase {
    execute(limit:number,searchTerm: string,current:number) :Promise<PaginatedUsers>
}