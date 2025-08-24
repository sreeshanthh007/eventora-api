import { IEventEntity } from "@entities/models/event.entity";
import { IEventRepository } from "@entities/repositoryInterfaces/vendor/event/event.repository.interface";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IHostNewEventUseCase } from "@entities/useCaseInterfaces/vendor/event/host-new-event.usecase";
import { CustomError } from "@entities/utils/custom.error";
import { HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";



@injectable()
export class HostNewEventUseCase implements IHostNewEventUseCase{
    constructor(
        @inject("IEventRepository") private _eventRepo : IEventRepository,
        @inject("IVendorRepository") private _vendorRepo : IVendorRepository
    ){}

    async execute(data: IEventEntity,userId:string): Promise<void> {

        const vendor = await this._vendorRepo.findById(userId)

        if(vendor?.vendorStatus=="pending" || vendor?.vendorStatus=="rejected"){
            throw new CustomError(`cannot add event due to vendor status : ${vendor.vendorStatus}`,HTTP_STATUS.BAD_REQUEST)
        }

        await this._eventRepo.save(data)
    }
}