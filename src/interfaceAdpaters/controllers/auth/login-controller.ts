
import { Response , Request } from "express";
import { inject , injectable } from "tsyringe";
import { LoginUserDTO, UserDTO } from "@shared/dtos/user.dto";
import { ILoginUserController } from "@entities/controllerInterfaces/auth/login-controller.interface";
import { ILoginUserCase } from "@entities/useCaseInterfaces/auth/login-usecase.interface";
import { IGenerateTokenUseCase } from "@entities/useCaseInterfaces/auth/generate-token.interface";
import { HTTP_STATUS , ERROR_MESSAGES , SUCCESS_MESSAGES } from "@shared/constants";
import { loginSchema } from "./validations/user-login-validation.schema";
import { setAuthCookies } from "@shared/utils/cookie-helper";


@injectable()
export class loginUserController implements ILoginUserController {
    constructor(
        @inject("ILoginUserUseCase")  private loginUseCases : ILoginUserCase,
        @inject("IGenerateTokenUseCase")
        private generateTokenUseCase : IGenerateTokenUseCase
       
    ){}

    async handle(req: Request, res: Response): Promise<void> {
        const data = req.body as LoginUserDTO


        const validatedData = loginSchema.parse(data)

        if(!validatedData){
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success:false,
                message:ERROR_MESSAGES.INVALID_CREDENTIALS
            });
            return
        }

        const user = await this.loginUseCases.execute(validatedData)

        if(!user._id || !user.role || !user.email){
            throw new Error("User ID , Role or Email is missing")
        }

        const userId = user._id.toString()

        const token =  await this.generateTokenUseCase.execute(userId,user.email,user.role)

        const accessTokenName = `${user.role}_access_token`
        console.log("this is the ")
        const refreshTokenName = `${user.role}_refresh_token`

        setAuthCookies(
            res,
            token.accessToken,
            token.refreshToken,
            accessTokenName,
            refreshTokenName
        );

        
       

        res.status(HTTP_STATUS.OK).json({
            success:true,
            message:SUCCESS_MESSAGES.LOGIN_SUCCESS,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            },
            accessToken:token.accessToken,
            refreshToken:token.refreshToken
        });
    }
}