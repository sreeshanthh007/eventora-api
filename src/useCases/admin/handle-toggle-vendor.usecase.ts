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


    async execute(vendorId: string): Promise<void> {
        
        if(!vendorId){
            throw new CustomError(
                ERROR_MESSAGES.USER_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        const vendor = await this.vendorRepository.findById(vendorId)

        if(!vendor){
            throw new CustomError(
                ERROR_MESSAGES.USER_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        const newStatus = vendor.status=="active" ? "blocked" : "active"

        await this.vendorRepository.findByIdAndUpdateStatus(vendorId,newStatus)

         await RedisClient.set(`user_status:vendor:${vendorId}`, newStatus,{EX:3600});

    }
}