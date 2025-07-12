import { inject , injectable } from "tsyringe";
import { ILoginStrategy } from "./auth/login-strategies/login-strategy.interface";
import { ILoginUserCase } from "@entities/useCaseInterfaces/auth/login-usecase.interface";
import { LoginUserDTO, UserDTO } from "@shared/dtos/user.dto";
import { CustomError } from "@entities/utils/custom.error";
import { HTTP_STATUS } from "@shared/constants";
import { IUserEntity } from "@entities/models/user.entity";


@injectable()
export class LoginUseCase implements ILoginUserCase{
    private _strategies : Record<string,ILoginStrategy>

    constructor(
        @inject("ClientLoginStrategy") private clientLogin : ILoginStrategy,
        @inject("VendorLoginStrategy") private vendorLogin : ILoginStrategy
    ){
        this._strategies ={
            client:clientLogin,
            vendor:vendorLogin
        }
    }

    async execute(user: LoginUserDTO): Promise<Partial<IUserEntity>> {
        const strategy = this._strategies[user.role]

        if(!strategy){
            throw new CustomError(
                "Invalid user role",HTTP_STATUS.FORBIDDEN
            )
        }
        return await strategy.login(user)
    }
}