import { inject , injectable } from "tsyringe";
import { IRegisterStrategy } from "./register-strategy.interface";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { UserDTO , VendorDTO } from "@shared/dtos/user.dto";
import { CustomError } from "@entities/utils/custom.error";
import { IUserEntity } from "@entities/models/user.entity";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { WalletDTO } from "@shared/dtos/wallet.dto";
import { IBcryptService } from "@entities/serviceInterfaces/bcrypt-service.interface";
import { IUUIDGeneratorService } from "@entities/serviceInterfaces/generate-random-uuid.interface";


@injectable()
export class VendorRegisterStrategy implements IRegisterStrategy {
    constructor(
        @inject("IVendorRepository") private _vendorRepository : IVendorRepository,
        @inject("IPasswordBcryptService") private _passwordBcryptService : IBcryptService,
        @inject("IWalletRepository") private _walletRepository : IWalletRepository,
        @inject("IUUIDGeneratorService") private _generateUUID : IUUIDGeneratorService
    ){}
    
    async register(user: UserDTO): Promise<IUserEntity> {
        if(user.role=="vendor"){
            const existingVendor = await this._vendorRepository.findByEmail(user.email)

            if(existingVendor){
                throw new CustomError(
                    ERROR_MESSAGES.EMAIL_EXISTS,
                    HTTP_STATUS.CONFLICT    
                )
            }

            const {name,email,phone,password,idProof} = user as VendorDTO
       
            
            let hashedPassword = null

            if(password){
                hashedPassword = await this._passwordBcryptService.hash(password)

            }

            const vendorId = this._generateUUID.generate()

            const vendor = await this._vendorRepository.save({
                name,
                email,
                phone,
                password:hashedPassword ?? "",
                vendorId,
                idProof:idProof,
                role:"vendor" 
            });

            const walletId = this._generateUUID.generate()

            const walletDetails : WalletDTO = {
                balance:0,
                userId:vendor._id.toString(),
                userType:"vendor",
                walletId:walletId
            };

            await this._walletRepository.createWallet(walletDetails)

                 return vendor
        }else{
            throw new CustomError(
                "Invalid role for vendor request",
                HTTP_STATUS.BAD_REQUEST
            )
        }
    }
}