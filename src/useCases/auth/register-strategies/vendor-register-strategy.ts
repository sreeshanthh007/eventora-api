import { inject , injectable } from "tsyringe";
import { IRegisterStrategy } from "./register-strategy.interface";
import { IVendorRepository } from "@entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { UserDTO , VendorDTO } from "@shared/dtos/user.dto";
import { CustomError } from "@entities/utils/custom.error";
import { generateRandomUUID } from "@frameworks/security/randomid.bcrypt";
import { IUserEntity } from "@entities/models/user.entity";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { WalletDTO } from "@shared/dtos/wallet.dto";
import { IBcryptService } from "@entities/serviceInterfaces/bcrypt-service.interface";


@injectable()
export class VendorRegisterStrategy implements IRegisterStrategy {
    constructor(
        @inject("IVendorRepository") private _vendorRepository : IVendorRepository,
        @inject("IPasswordBcryptService") private _passwordBcryptService : IBcryptService,
        @inject("IWalletRepository") private _walletRepository : IWalletRepository
    ){}
    
    async register(user: UserDTO): Promise<IUserEntity | void> {
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

            const vendorId = generateRandomUUID()

            const vendor = await this._vendorRepository.save({
                name,
                email,
                phone,
                password:hashedPassword ?? "",
                vendorId,
                idProof:idProof,
                role:"vendor" 
            });

            const walletId = generateRandomUUID()

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