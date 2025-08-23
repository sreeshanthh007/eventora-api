import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { IToggleStatusUseCase } from "@entities/useCaseInterfaces/vendor/event/toggleStatus.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";


console.log("toglestatus usecase")
@injectable()
export class ToggleStatusUseCase implements IToggleStatusUseCase{
    constructor(
        @inject("IEventRepository") private _eventRepo : IEventRepository
    ){}


    async execute(eventId: string,isActive:boolean): Promise<void> {
        
        const isEventExist = await this._eventRepo.findById(eventId)

        if(!isEventExist){
            throw new CustomError(
                ERROR_MESSAGES.ID_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        await this._eventRepo.findByIdAndToggleStatus(eventId,isActive)
    }
}