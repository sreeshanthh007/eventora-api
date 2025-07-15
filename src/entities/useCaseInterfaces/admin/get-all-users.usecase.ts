// import { IClientEntity } from "@entities/models/client.entity";
import { PaginatedUsers } from "@entities/models/paginatedUsers.entity";

export interface IGetAllUsersUseCase {
    execute(limit:number,searchTerm: string,current:number) :Promise<PaginatedUsers>
}