import { PaginatedServices } from "interfaceAdpaters/models/paginatedService";



export interface IGetAllServiceUseCase{
    execute(limit:number,searchTerm:string,current:number,vendorId:string) : Promise<PaginatedServices>
}