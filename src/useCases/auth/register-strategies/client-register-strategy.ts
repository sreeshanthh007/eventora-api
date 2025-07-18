
import { inject , injectable } from "tsyringe";
import { IRegisterStrategy } from "./register-strategy.interface";
import { IClientRepository } from "@entities/repositoryInterfaces/client/client-repository.interface";
import { ClientDTO , UserDTO } from "@shared/dtos/user.dto";
import { IBcrypt } from "@frameworks/security/bcrypt.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES , HTTP_STATUS } from "@shared/constants";
import { IUserEntity } from "@entities/models/user.entity";
import { generateRandomUUID } from "@frameworks/security/randomid.bcrypt";
@injectable()
export class CLientRegisterStrategy implements IRegisterStrategy {
    constructor(
        @inject("IPasswordBcrypt") private passwordBcrypt : IBcrypt,
        @inject("IClientRepository") private clientRepository : IClientRepository
    ){}

    async register(user: UserDTO): Promise<IUserEntity| void > {

        console.log("userr in register",user)
        if(user.role=="client"){
            const existingCLient = await this.clientRepository.findByEmail(user.email);
            if(existingCLient){
             throw new CustomError(
                 ERROR_MESSAGES.EMAIL_EXISTS,
                HTTP_STATUS.CONFLICT,
             )
            }

            const {name,email,phone,password} = user as ClientDTO

            let  hashedPassword = null
            if(password){
                
                hashedPassword = await this.passwordBcrypt.hash(password)
        
            }

            const clientId = generateRandomUUID()

            const client = await this.clientRepository.save({
                name,
                email,
                phone,
                password:hashedPassword || "",
                clientId,
                role:"client"
            });

            return client
        }else{
            throw new CustomError(
                "invalid role for client registeration",
                HTTP_STATUS.BAD_REQUEST
            )
        }
    }
}