import { PaginatedCategory } from "interfaceAdpaters/models/paginatedCategory";


export interface IGetAllCatgoryUseCase {
    execute(limit:number,searchTerm:string,current:number) : Promise<PaginatedCategory>
}