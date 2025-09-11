import { IUpdateEventDTO } from "@shared/dtos/event.dto";


export interface IUpdateEventUseCase{
    execute(eventId:string,updateData:IUpdateEventDTO) : Promise<void>
}