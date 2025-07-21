import { inject , injectable } from "tsyringe";
import { IOTPService } from "@entities/serviceInterfaces/otp-service.interface";
import { IVerifyOtpUsecase } from "@entities/useCaseInterfaces/auth/verifyOtp-usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { HTTP_STATUS } from "@shared/constants";

@injectable()
export class VerifyOTPUseCase implements IVerifyOtpUsecase{
    constructor(
        @inject("IOTPService") private otpService:IOTPService
    ){}
    async execute({ email, otp }: { email: string; otp: string; }): Promise<void> {
        const isOTPValid = await this.otpService.verifyOTP({email,otp})

        console.log(isOTPValid)

        if(!isOTPValid){
            throw new CustomError("Invalid OTP",HTTP_STATUS.BAD_REQUEST)
        }
        
    }
    
}