import { IForgotPasswordController } from "@entities/controllerInterfaces/auth/forgotPassword-controller.interface";
import { sendForgotPasswordOtp } from "@usecases/auth/sent-forgot.password-otp.usecase";
import { IVendorExistService } from "@entities/serviceInterfaces/vendor-exist.service.interface";
import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";


@injectable()
export class ForgotVendorOTPController implements IForgotPasswordController {
    constructor(
        @inject("ISendOTPForPasswordUseCase") private sentOTPForPassword : sendForgotPasswordOtp,
        @inject("IVendorExistService") private vendorExistService : IVendorExistService
    ){}

    async handle(req: Request, res: Response): Promise<void> {
        
        const {email} = req.body
        console.log("email inf forgotvendorotpcntroller",email)
        const exist = await this.vendorExistService.emailExist(email)

        if(!exist){
            throw new CustomError(
                ERROR_MESSAGES.EMAIL_NOT_FOUND,
                HTTP_STATUS.NOT_FOUND
            )
        }

        await this.sentOTPForPassword.execute(email)

    res.status(HTTP_STATUS.OK).json({success:true,message:SUCCESS_MESSAGES.OTP_SEND_SUCCESS})
    }
}