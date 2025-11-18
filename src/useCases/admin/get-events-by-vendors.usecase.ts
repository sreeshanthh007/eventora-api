import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { IGetEventsByVendorsUseCase } from "@entities/useCaseInterfaces/admin/get-events-by-vendors.usecase.interface";
import { mapEventsByVendorsToDTO } from "@mappers/EventMapper";
import { PaginatedEventsByVendors } from "interfaceAdapters/models/paginatedEvents";
import { inject, injectable } from "tsyringe";



@injectable()
export class GetEventsByVendorsUseCase implements IGetEventsByVendorsUseCase{

    constructor(
        @inject("IEventRepository") private _eventRepo : IEventRepository
    ){}


    async execute(page: number, limit: number, search: string,filterBy:string): Promise<PaginatedEventsByVendors> {
           
            const validPageNumber = Math.max(1,page || 1)

            const skip = (validPageNumber-1)*limit

            const {events,total} = await this._eventRepo.findEventsHostedByVendorsForAdmin(skip,limit,search,filterBy)

            const mappedEvents = events.map(event => mapEventsByVendorsToDTO(event));


            return {
            eventDetails:mappedEvents,
            total:Math.ceil(total/limit)
            }
    }
}