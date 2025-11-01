
import { eventDetailsDTO } from "@shared/dtos/event.dto";


export interface IGetEventDetailsUseCase{
    execute(eventId:string) : Promise<eventDetailsDTO | null>
}