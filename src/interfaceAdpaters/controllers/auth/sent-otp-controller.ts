import { ISendOtpController } from "@entities/controllerInterfaces/auth/sendOtp-controller.interface";
import { ISendEmailUseCase } from "@entities/useCaseInterfaces/auth/send-email-usercase.interface";
import { Request , Response } from "express";

import { HTTP_STATUS , SUCCESS_MESSAGES } from "@shared/constants";
import { injectable , inject } from "tsyringe";


@injectable()
export class SendOTPController implements ISendOtpController{
    
    constructor(
        @inject("ISendEmailUseCase") private sendEmailUseCase : ISendEmailUseCase
    ){}

    async handle(req: Request, res: Response): Promise<void> {
       
        const {email} = req.body
        await this.sendEmailUseCase.execute(email)

        res.status(HTTP_STATUS.OK).json({
            message:SUCCESS_MESSAGES.OTP_SEND_SUCCESS
        })
    }
}