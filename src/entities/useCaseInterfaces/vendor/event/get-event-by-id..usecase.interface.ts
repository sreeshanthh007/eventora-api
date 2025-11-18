
import { IEventReponse } from "@mappers/EventMapper";


export interface IGetEventByIdUseCase{
    execute(eventId:string) : Promise<IEventReponse | null>
}