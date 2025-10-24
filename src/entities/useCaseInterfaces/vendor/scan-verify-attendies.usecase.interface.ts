import { IEventVerifyAttendiesDTO } from "@shared/dtos/event.dto";


export interface IScanAndVerifyAttendiesUseCase{
    execute(vendorId:string) : Promise<IEventVerifyAttendiesDTO>
}