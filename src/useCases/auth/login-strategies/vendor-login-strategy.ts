    import { inject , injectable } from "tsyringe";
    import { ILoginStrategy } from "./login-strategy.interface";
    import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
    import { IBcrypt } from "@frameworks/security/bcrypt.interface";
    import { CustomError } from "@entities/utils/custom.error";
    import { HTTP_STATUS , ERROR_MESSAGES } from "@shared/constants";
    import { LoginUserDTO } from "@shared/dtos/user.dto";
    import { IUserEntity } from "@entities/models/user.entity";
    import { toVendorResponse } from "@mappers/VendorMapper";
    @injectable()
    export class VendorLoginStrategy implements ILoginStrategy{
        constructor(
            @inject("IPasswordBcrypt") private passwordBcrypt : IBcrypt,
            @inject("IVendorRepository") private vendorRepository : IVendorRepository
        ){}

        async login(user: LoginUserDTO): Promise<Partial<IUserEntity>> {
            const vendor = await this.vendorRepository.findByEmail(user.email)
            
            if(!vendor){
                throw new CustomError(
                  ERROR_MESSAGES.EMAIL_NOT_FOUND,
                    HTTP_STATUS.NOT_FOUND
                );
            }

        

            if(vendor.status!=="active"){
                throw new CustomError(ERROR_MESSAGES.BLOCKED,HTTP_STATUS.FORBIDDEN)
            }

            if(user.password){
                const isPasswordMatch = await this.passwordBcrypt.compare(user.password,vendor.password)

                if(!isPasswordMatch){
                    throw new CustomError(ERROR_MESSAGES.INVALID_CREDENTIALS,HTTP_STATUS.BAD_REQUEST)
                }
            }

            

            return toVendorResponse(vendor)
            
        }
    }