import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { EventFilters, IGetAllEventsWithFilterUseCase } from "@entities/useCaseInterfaces/client/event/get-all-events-with-filters.usercase.interface";
import { mapEventsToClientEventPage } from "@mappers/EventMapper";
import { PAGINATION } from "@shared/constants";
import { paginatedEventsForClient } from "interfaceAdapters/models/paginatedEvents";
import { inject, injectable } from "tsyringe";



@injectable()
export class GetAllEventsWithFilterUseCase implements IGetAllEventsWithFilterUseCase{
    constructor(
        @inject("IEventRepository") private _eventRepo : IEventRepository
    ){}

    async execute(EventFilters: EventFilters): Promise<paginatedEventsForClient> {
        
        const {limit,page,search,location,sort,lat,lng} = EventFilters
        
        const safePage = Math.max(
          PAGINATION.PAGE,
          page || PAGINATION.PAGE
        )
        
        const safeLimit = Math.min(
          PAGINATION.MAX_LIMIT,
          Math.max(1, limit || PAGINATION.LIMIT)
        );
       

        const skip = (safePage-1)*safeLimit

        const {events,total} = await this._eventRepo.findfilteredEvents(
            {search,location,sort,lat,lng},
            skip,
            limit
        )
    
        const mappedEvents = events.map(mapEventsToClientEventPage)

        return {
            events:mappedEvents,
            total:Math.ceil(total/limit)
        }
    }
}