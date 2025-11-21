import { inject , injectable } from "tsyringe";
import { ISendOtpUsecase } from "@entities/useCaseInterfaces/auth/sendOtp-usecase.interface";
import { IOTPService } from "@entities/serviceInterfaces/otp-service.interface";
import { IEmailService } from "@entities/serviceInterfaces/email-service-interface";
import { IOtpCacheService } from "@entities/serviceInterfaces/otp-cache-service.interface";
import { IBcryptService } from "@entities/serviceInterfaces/bcrypt-service.interface";


@injectable()
export class sendForgotPasswordOtp implements ISendOtpUsecase {
    constructor(
        @inject("IOTPService") private _otpService : IOTPService,
       @inject("IOTPBcryptService") private _otpBcryptService :IBcryptService,
       @inject("IEmailService") private _emailService : IEmailService,
       @inject("IOtpCacheService") private _otpCacheService : IOtpCacheService
       
    ){}

    async execute(email: string): Promise<void> {
        
        const otp = this._otpService.generateOTP()

        

        const hashedOTP = await this._otpBcryptService.hash(otp)

        await this._otpCacheService.set(email,hashedOTP,300)
        
       

        await this._emailService.sendEmail(
            email,
            'EVENTORA - Verification for changing password',
            otp
        )
    }
}