import { PaginatedServicesofVendorsForAdmin } from "interfaceAdapters/models/paginatedService";

export interface IGetAllServicesofVendorsForAdminUseCase{
  execute(page:number,limit:number,search:string,filterBy:string) : Promise<PaginatedServicesofVendorsForAdmin>
}