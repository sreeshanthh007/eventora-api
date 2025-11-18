
import { PaginatedServicesForClient } from "interfaceAdapters/models/paginatedService";



export interface ServiceFilters {
  page: number;
  limit: number;
  search?: string;
  location?: string;
  sort?: string;
  categoryId?:string;
  lat?: number;
  lng?: number;
}

export interface IGetAllServiceWithFilterUseCase {
    execute(serviceFilters:ServiceFilters) : Promise<PaginatedServicesForClient>
}