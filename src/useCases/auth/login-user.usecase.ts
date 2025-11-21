import { inject , injectable } from "tsyringe";
import { ILoginStrategy } from "./login-strategies/login-strategy.interface";
import { ILoginUserCase } from "@entities/useCaseInterfaces/auth/login-usecase.interface";
import { LoginResponseDTO, LoginUserDTO } from "@shared/dtos/user.dto";
import { CustomError } from "@entities/utils/custom.error";
import { HTTP_STATUS } from "@shared/constants";




@injectable()
export class LoginUseCase implements ILoginUserCase{
    private _strategies : Record<string,ILoginStrategy>

    constructor(
        @inject("ClientLoginStrategy") private clientLogin : ILoginStrategy,
        @inject("VendorLoginStrategy") private vendorLogin : ILoginStrategy,
        @inject("AdminLoginStrategy") private adminLogin : ILoginStrategy
    ){
        this._strategies ={
            client:clientLogin,
            vendor:vendorLogin,
            admin:adminLogin
        }
    }

    async execute(user: LoginUserDTO): Promise<LoginResponseDTO | null> {
        const strategy = this._strategies[user.role]

        if(!strategy){
            throw new CustomError(
                "Invalid user role",HTTP_STATUS.FORBIDDEN
            )
        }
        return await strategy.login(user)
    }
}