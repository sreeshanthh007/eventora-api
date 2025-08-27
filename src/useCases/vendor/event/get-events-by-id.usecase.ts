
import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { IGetEventByIdUseCase } from "@entities/useCaseInterfaces/vendor/event/get-event-by-id..usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { IEventReponse, mapEventsForEditEvent } from "interfaceAdpaters/mappers/EventMapper";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetEventsByIdUseCase implements IGetEventByIdUseCase{
    constructor(
        @inject("IEventRepository") private _eventRepo : IEventRepository
    ){}

    async execute(eventId: string): Promise<IEventReponse | null> {

        const event = await this._eventRepo.findById(eventId)

        if(!event){
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }


        return mapEventsForEditEvent(event)
    }
}