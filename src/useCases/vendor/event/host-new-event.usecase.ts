import { IEventEntity } from "@entities/models/event.entity";
import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IQrCodeService } from "@entities/serviceInterfaces/qr-code-service.interface";
import { IHostNewEventUseCase } from "@entities/useCaseInterfaces/vendor/event/host-new-event.usecase";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";



@injectable()
export class HostNewEventUseCase implements IHostNewEventUseCase{
    constructor(
        @inject("IEventRepository") private _eventRepo : IEventRepository,
        @inject("IVendorRepository") private _vendorRepo : IVendorRepository,
        @inject("IQRCodeService") private _qrCodeService : IQrCodeService
    ){}

    async execute(data: IEventEntity,userId:string): Promise<void> {

        const vendor = await this._vendorRepo.findById(userId)

       if(!vendor){
        throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
       }

       if(vendor.vendorStatus=="pending" || vendor.vendorStatus=="rejected"){
            throw new CustomError(
            `Cannot add event because vendor status is: ${vendor.vendorStatus}`,
             HTTP_STATUS.BAD_REQUEST
         );
       }

        const qrCodeString = `${vendor._id}`;
        const qrCode = await this._qrCodeService.generateQrCode(qrCodeString);


        const dataWithQr = {
            ...data,
            qrCode,
        }

        await this._eventRepo.save(dataWithQr)
    }
}