// import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
// import { EventFilters, IGetAllEventsWithFilterUseCase } from "@entities/useCaseInterfaces/client/get-all-events-with-filters.usercase.interface";
// import { paginatedEventsForClient } from "interfaceAdpaters/models/paginatedEvents";
// import { inject, injectable } from "tsyringe";



// @injectable()
// export class GetAllEventsWithFilterUseCase implements IGetAllEventsWithFilterUseCase{
//     constructor(
//         @inject("IEventRepository") private _eventRepo : IEventRepository
//     ){}

//     async execute(EventFilters: EventFilters): Promise<paginatedEventsForClient> {
        
//         const {limit,page,lat,lng,location,search,sort} = EventFilters


//         const validPageNumber = Math.max(1,page || 1)

//         const skip = (validPageNumber -1)*limit



//     }
// }