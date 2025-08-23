import { IEventEntity } from "@entities/models/event.entity";
import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { IHostNewEventUseCase } from "@entities/useCaseInterfaces/vendor/event/host-new-event.usecase";
import { inject, injectable } from "tsyringe";


console.log("hostneweventusecase")
@injectable()
export class HostNewEventUseCase implements IHostNewEventUseCase{
    constructor(
        @inject("IEventRepository") private eventRepo : IEventRepository
    ){}

    async execute(data: IEventEntity): Promise<void> {
        await this.eventRepo.save(data)
    }
}