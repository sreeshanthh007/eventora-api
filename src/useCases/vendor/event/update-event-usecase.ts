import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { IUpdateEventUseCase } from "@entities/useCaseInterfaces/vendor/event/update-event.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { IUpdateEventDTO } from "@shared/dtos/event.dto";
import { inject, injectable } from "tsyringe";



@injectable()
export class UpdateEventUseCase implements IUpdateEventUseCase{
    constructor(
        @inject("IEventRepository") private _eventRepo : IEventRepository
    ){}

    async execute(eventId: string, updateData: IUpdateEventDTO): Promise<void> {
        
        const event = await this._eventRepo.findById(eventId)

        if(!event){
            throw new CustomError(ERROR_MESSAGES.NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        await this._eventRepo.updateEvent(eventId,updateData);
        
    }
}