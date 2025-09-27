
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IFcmTokenUseCase } from "@entities/useCaseInterfaces/auth/fcmtoken.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";


@injectable()
export class FcmTokenUseCase implements IFcmTokenUseCase{
    constructor(
        @inject("IVendorRepository") private vendorRepo : IVendorRepository
    ){}

    async execute(userId: string, fcmToken: string): Promise<void> {
        
        const user = await this.vendorRepo.findById(userId)

      
        if(!user){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

         await  this.vendorRepo.findByIdandSaveFcmToken(userId,fcmToken)
    }   
}