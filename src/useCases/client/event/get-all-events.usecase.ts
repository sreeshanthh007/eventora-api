import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { IGetAllEventsForClientsUseCase } from "@entities/useCaseInterfaces/client/event/get-all-events-clients.usecase.interface";
import { EventDTO } from "@shared/dtos/user.dto";
import { toClientLandingPage } from "@mappers/EventMapper";
import { inject, injectable } from "tsyringe";



@injectable()
export class GetAllEventsForClientsUseCase implements IGetAllEventsForClientsUseCase{
    constructor(
        @inject("IEventRepository") private _eventRepo :IEventRepository
    ){}


    async execute(): Promise<EventDTO[]> {
        
       const events = await this._eventRepo.findEvents()

       const mappedEvents = toClientLandingPage(events)
        console.log("mapped",mappedEvents)
       return mappedEvents
    }
}