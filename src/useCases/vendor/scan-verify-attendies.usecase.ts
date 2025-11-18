import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IScanAndVerifyAttendiesUseCase } from "@entities/useCaseInterfaces/vendor/scan-verify-attendies.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { mapEventForverifyAttendiestoDTO } from "@mappers/EventMapper";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { IEventVerifyAttendiesDTO } from "@shared/dtos/event.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class ScanAndVerifyAttendiesUseCase implements IScanAndVerifyAttendiesUseCase{

    constructor(
        @inject("IVendorRepository") private _vendorRepo : IVendorRepository,
        @inject("IEventRepository") private _eventRepo : IEventRepository
    ){}

        async execute(vendorId: string,eventId:string): Promise<IEventVerifyAttendiesDTO> {

                   
        const vendor = await this._vendorRepo.findById(vendorId)

        if(!vendor){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        const event = await this._eventRepo.findEventsHostedByVendors(vendorId,eventId)

        if(!event){
            throw new CustomError(ERROR_MESSAGES.EVENT_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

        if(event.eventId!==eventId){
            throw new CustomError(ERROR_MESSAGES.INVALID_QR_CODE,HTTP_STATUS.BAD_REQUEST)
        }
     

        
        const mappedEvent = mapEventForverifyAttendiestoDTO(event)
        console.log("mapped events from scanning",mappedEvent)
        return mappedEvent
       
    }
}