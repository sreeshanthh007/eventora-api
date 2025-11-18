import { paginatedEventsForClient } from "interfaceAdapters/models/paginatedEvents";



export interface EventFilters {
  page: number;
  limit: number;
  search?: string;
  location?: string;
  sort?: string;
  lat?: number;
  lng?: number;
}


export interface IGetAllEventsWithFilterUseCase {
    execute(EventFilters:EventFilters) : Promise<paginatedEventsForClient>
}