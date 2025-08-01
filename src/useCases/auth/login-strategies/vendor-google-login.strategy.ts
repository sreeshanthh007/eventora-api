import { inject, injectable } from "tsyringe";
import { ILoginStrategy } from "./login-strategy.interface";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IUserEntity } from "@entities/models/user.entity";
import { LoginUserDTO } from "@shared/dtos/user.dto";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";



@injectable()
export class VendorGoogleLoginStrategy implements ILoginStrategy{
    constructor(
        @inject("IVendorRepository") private vendorRepo : IVendorRepository
    ){}

    async login(user: LoginUserDTO): Promise<Partial<IUserEntity>> {
        const vendor = await this.vendorRepo.findByEmail(user.email)

        if(vendor){
            if(vendor.status!=="active"){
                throw new CustomError(ERROR_MESSAGES.BLOCKED,HTTP_STATUS.FORBIDDEN)
            }
        }
        return vendor as Partial<IUserEntity>
    }
}