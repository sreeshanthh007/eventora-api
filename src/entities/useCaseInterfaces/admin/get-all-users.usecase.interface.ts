
import { PaginatedUsers } from "interfaceAdapters/models/paginatedUsers"

export interface IGetAllUsersUseCase {
    execute(limit:number,searchTerm: string,current:number) :Promise<PaginatedUsers>
}