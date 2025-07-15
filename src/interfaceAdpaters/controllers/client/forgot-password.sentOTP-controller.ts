
import { inject , injectable } from "tsyringe";
import { IForgotPasswordController } from "@entities/controllerInterfaces/auth/forgotPassword-controller.interface";
import { Request, Response } from "express";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";
import { sendForgotPasswordOtp } from "@usecases/sent-forgot.password-otp.usecase";
import { ClientExistService } from "interfaceAdpaters/services/client/clientExist-service";

@injectable()
export class ForgotOtpController implements IForgotPasswordController {
    constructor(
        @inject("ISendOTPForPasswordUseCase") private sendOTPForPassword : sendForgotPasswordOtp,
        @inject("IClientExistService") private clientExistService : ClientExistService
    ){}


    async handle(req: Request, res: Response): Promise<void> {
        const {email} = req.body
        
        const exist = await this.clientExistService.emailExists(email)

        if(!exist){
            throw new CustomError(
                ERROR_MESSAGES.EMAIL_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        await this.sendOTPForPassword.execute(email)

        res.status(HTTP_STATUS.OK).json({success:true,message:SUCCESS_MESSAGES.OTP_SEND_SUCCESS})

    }
}