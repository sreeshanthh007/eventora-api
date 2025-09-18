// import { IClientEntity } from "@entities/models/client.entity";
import { PaginatedUsers } from "interfaceAdpaters/models/paginatedUsers";

export interface IGetAllUsersUseCase {
    execute(limit:number,searchTerm: string,current:number) :Promise<PaginatedUsers>
}