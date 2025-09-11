import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { IUpdateEventStatusUseCase } from "@entities/useCaseInterfaces/vendor/event/update-event-status.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { EventStatus, validateEventStatus } from "interfaceAdpaters/validations/event-status-validation";
import { inject, injectable } from "tsyringe";


@injectable()
export class UpdateEventStatusUseCase implements IUpdateEventStatusUseCase{
    constructor(
        @inject("IEventRepository") private _eventRepo : IEventRepository
    ){}

    async execute(eventId: string, eventStatus: string): Promise<void> {
        
        const isEventExist = await this._eventRepo.findById(eventId)

        if(!isEventExist){
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        validateEventStatus(isEventExist.status as EventStatus,eventStatus as EventStatus)

        await this._eventRepo.updateEventStatus(eventId,eventStatus)
    }
}