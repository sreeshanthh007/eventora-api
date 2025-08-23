import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IUpdateProfileImageUseCase } from "@entities/useCaseInterfaces/client/updateProfileImage.usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS, TRole } from "@shared/constants";
import { inject, injectable } from "tsyringe";



@injectable()
export class UpdateProfileImageUseCase implements IUpdateProfileImageUseCase{
    constructor(
        @inject("IClientRepository") private _clientRepo : IClientRepository,
        @inject("IVendorRepository")  private _vendorRepo : IVendorRepository
    ){}

    async execute(userId: string, imgUrl: string,role:TRole): Promise<void> {
         
        let repository = null

        if(role=="vendor"){
            repository = this._vendorRepo
        }else if(role=="client"){
            repository = this._clientRepo
        }else{
            throw new CustomError(ERROR_MESSAGES.INVALID_ROLE,HTTP_STATUS.NOT_FOUND)
        }
        

        await repository.findByIdAndUpdateProfileImage(userId,imgUrl)
        
        
    }
}