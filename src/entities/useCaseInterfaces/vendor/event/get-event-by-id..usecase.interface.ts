
import { IEventReponse } from "interfaceAdpaters/mappers/EventMapper";


export interface IGetEventByIdUseCase{
    execute(eventId:string) : Promise<IEventReponse | null>
}