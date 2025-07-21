import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IHandleToggleVendorUseCase } from "@entities/useCaseInterfaces/admin/handle-toggle.vendor.usecase";
import { CustomError } from "@entities/utils/custom.error";
import { RedisClient } from "@frameworks/cache/redis.client";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class HandleToggleVendorStatusUseCase implements IHandleToggleVendorUseCase{
    constructor(

        @inject("IVendorRepository") private vendorRepository : IVendorRepository
    ){}


    async execute(vendorid: string): Promise<void> {
        
        if(!vendorid){
            throw new CustomError(
                ERROR_MESSAGES.USER_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        const vendor = await this.vendorRepository.findById(vendorid)

        if(!vendor){
            throw new CustomError(
                ERROR_MESSAGES.USER_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        const newStatus = vendor.status=="active" ? "blocked" : "active"

        await this.vendorRepository.findByIdAndUpdateStatus(vendorid,newStatus)

        if(newStatus=="blocked"){
            await RedisClient.set(`vendor_status:vendor${vendorid}`,newStatus,{
                EX:3600
            });
        }else if(newStatus=="active"){
            await RedisClient.del(`vendor_status:vendor${vendorid}`)
        }

    }
}