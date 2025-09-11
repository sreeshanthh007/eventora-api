
import { inject , injectable } from "tsyringe";
import { IRegisterUseCase } from "@entities/useCaseInterfaces/auth/register-usecase.interface";
import { UserDTO } from "@shared/dtos/user.dto";
import { IRegisterStrategy } from "./register-strategies/register-strategy.interface";
import { CustomError } from "@entities/utils/custom.error";
import { HTTP_STATUS } from "@shared/constants";

@injectable()

export class RegisterUseCase implements IRegisterUseCase {
    private strategies : Record<string , IRegisterStrategy>

    constructor(
        @inject("clientRegisterStrategy") private clientRegister : IRegisterStrategy,
        @inject("VendorRegisterStrategy") private vendorRegister : IRegisterStrategy

    ){
        this.strategies = {
            client:this.clientRegister,
            vendor:this.vendorRegister
        }
    }

    async execute(user:UserDTO) : Promise<void>  {
        const strategies = this.strategies[user.role]
        console.log("user in register",user)
        if(!strategies){
            throw new CustomError(
                "Invalid user role",
                HTTP_STATUS.FORBIDDEN
            )
        }
        await strategies.register(user)
    }
}