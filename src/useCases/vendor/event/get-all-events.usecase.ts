import { IEventEntity } from "@entities/models/event.entity";
import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { IGetAllEventsUseCase } from "@entities/useCaseInterfaces/vendor/event/get-all-events-vendor.usecase.interface";
import { mapEventEntityToTable } from "interfaceAdpaters/mappers/EventMapper";
import { PaginatedEvents } from "interfaceAdpaters/models/paginatedEvents";
import { FilterQuery } from "mongoose";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetAllEventsUseCase implements IGetAllEventsUseCase{
    constructor(
        @inject("IEventRepository") private _eventRepo:IEventRepository
    ){}

async execute(limit: number, searchTerm: string, current: number, vendorId: string): Promise<PaginatedEvents> {
    
            const filter : FilterQuery<IEventEntity> = {_id:vendorId}

        if(searchTerm){
            filter.$or = [
            {title:{$regex:searchTerm,$options:"i"}},
        ];
    }

    const validPageNumber = Math.max(1,current || 1)
    const skip = (validPageNumber - 1)*limit

    const {events,total} = await this._eventRepo.findPaginatedEvents(filter,skip,limit)

    const mappedEvents = events.map(mapEventEntityToTable)

    const response : PaginatedEvents ={
        events:mappedEvents,
        total:Math.ceil(total/limit)
    }

    return response
}
}