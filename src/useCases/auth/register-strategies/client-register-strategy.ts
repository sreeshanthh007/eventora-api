
import { inject , injectable } from "tsyringe";
import { IRegisterStrategy } from "./register-strategy.interface";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { ClientDTO , UserDTO } from "@shared/dtos/user.dto";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES , HTTP_STATUS } from "@shared/constants";
import { IUserEntity } from "@entities/models/user.entity";
import { generateRandomUUID } from "@frameworks/security/randomid.bcrypt";
import { IWalletRepository } from "@entities/repositoryInterfaces/wallet/wallet.repository.interface";
import { WalletDTO } from "@shared/dtos/wallet.dto";
import { IBcryptService } from "@entities/serviceInterfaces/bcrypt-service.interface";
@injectable()
export class CLientRegisterStrategy implements IRegisterStrategy {
    constructor(
        @inject("IPasswordBcryptService") private _passwordBcryptService : IBcryptService,
        @inject("IClientRepository") private _clientRepository : IClientRepository,
        @inject("IWalletRepository") private _walletRepository : IWalletRepository
    ){}

    async register(user: UserDTO): Promise<IUserEntity| void > {

        console.log("userr in register",user)
        if(user.role=="client"){
            const existingCLient = await this._clientRepository.findByEmail(user.email);
            if(existingCLient){
             throw new CustomError(
                 ERROR_MESSAGES.EMAIL_EXISTS,
                HTTP_STATUS.CONFLICT,
             )
            }

            const {name,email,phone,password} = user as ClientDTO

            let  hashedPassword = null
            if(password){
                
                hashedPassword = await this._passwordBcryptService.hash(password)
        
            }

            const clientId = generateRandomUUID()

            const client = await this._clientRepository.save({
                name:name,
                email,
                phone,
                password:hashedPassword || "",
                clientId,
                role:"client"
            });

            const walletId = generateRandomUUID()

            const walletDetails : WalletDTO ={

                balance:0,
                userId:client._id.toString(),
                userType:"client",
                walletId:walletId
            }

            await this._walletRepository.createWallet(walletDetails)

            return client
        }else{
            throw new CustomError(
                "invalid role for client registeration",
                HTTP_STATUS.BAD_REQUEST
            )
        }
    }
}