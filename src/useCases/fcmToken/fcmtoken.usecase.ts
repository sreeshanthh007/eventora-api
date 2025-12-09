
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IFcmTokenUseCase } from "@entities/useCaseInterfaces/auth/fcmtoken.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { inject, injectable } from "tsyringe";


@injectable()
export class FcmTokenUseCase implements IFcmTokenUseCase{
    constructor(
        @inject("IVendorRepository") private _vendorRepo : IVendorRepository,
        @inject("IClientRepository") private _clientRepo : IClientRepository
    ){}

    async execute(userId: string, fcmToken: string,role:string): Promise<void> {

        let repository;
        

        if(role=="client"){
            repository = this._clientRepo
        }else if(role=="vendor"){
            repository = this._vendorRepo
        }

        const user = await repository?.findById(userId)

        if(!user){
            throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
        }

         await repository!.findByIdandSaveFcmToken(userId,fcmToken)
         
    }   
}