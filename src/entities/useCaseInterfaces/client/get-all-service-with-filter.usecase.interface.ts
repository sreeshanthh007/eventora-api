import { paginatedEventsForClient } from "interfaceAdpaters/models/paginatedEvents";
import { PaginatedServicesForClient } from "interfaceAdpaters/models/paginatedService";



export interface ServiceFilters {
  page: number;
  limit: number;
  search?: string;
  location?: string;
  sort?: string;
  lat?: number;
  lng?: number;
}

export interface IGetAllServiceWithFilterUseCase {
    execute(serviceFilters:ServiceFilters) : Promise<PaginatedServicesForClient>
}