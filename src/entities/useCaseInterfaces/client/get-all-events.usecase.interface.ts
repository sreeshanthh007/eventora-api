import { EventDTO } from "@shared/dtos/user.dto";


export interface IGetAllEventsForClientsUseCase {
    execute() : Promise<EventDTO[]>
}