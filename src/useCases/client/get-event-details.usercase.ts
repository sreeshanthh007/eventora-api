import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { IGetEventDetailsUseCase } from "@entities/useCaseInterfaces/client/get-event-details.interface.usecase";
import { CustomError } from "@entities/utils/custom.error";
import { mapEventsToEventDetailPage } from "@mappers/EventMapper";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { eventDetailsDTO } from "@shared/dtos/event.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetEventDetailsUseCase implements IGetEventDetailsUseCase{
    constructor(
        @inject("IEventRepository") private _eventRepo : IEventRepository
    ){}

    async execute(eventId: string): Promise<eventDetailsDTO | null> {
        
        const eventExist = await this._eventRepo.findEventByIdForDetailsPage(eventId)
        if(!eventExist){
            throw new CustomError(ERROR_MESSAGES.ID_NOT_FOUND,HTTP_STATUS.BAD_REQUEST)
        }

        const mappedEvent  = mapEventsToEventDetailPage(eventExist)
        
      
        return mappedEvent
    }
}