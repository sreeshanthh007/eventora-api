import { Request , Response } from "express";
import { IVerifyOtpUsecase } from "@entities/useCaseInterfaces/auth/verifyOtp-usecase.interface";
import { IVerifyOtpController } from "@entities/controllerInterfaces/auth/verifyOtp-controller.interface";
import { emailVerifySchema } from "./validations/email.validation.schema";
import { inject , injectable } from "tsyringe";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "@shared/constants";


@injectable()
export class VerifyOTPController implements IVerifyOtpController{
    constructor(
        @inject("IVerifyOTPUseCase") private VerifyOTPUseCase : IVerifyOtpUsecase
    ){}

    async handle(req: Request, res: Response): Promise<void> {
        const {email,otp} = req.body
        console.log(email,otp)
        const validatedData = emailVerifySchema.parse({email,otp})
     
        await this.VerifyOTPUseCase.execute(validatedData)

        res.status(HTTP_STATUS.OK).json({
            success:true,
            message:SUCCESS_MESSAGES.VERIFICATION_SUCCESS
        })

    }

}