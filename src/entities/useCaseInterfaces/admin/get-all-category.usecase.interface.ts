import { PaginatedCategory } from "interfaceAdapters/models/paginatedCategory";


export interface IGetAllCatgoryUseCase {
    execute(limit:number,searchTerm:string,current:number) : Promise<PaginatedCategory>
}