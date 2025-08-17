import { inject , injectable } from "tsyringe";
import { ISendOtpUsecase } from "@entities/useCaseInterfaces/auth/sendOtp-usecase.interface";
import { IOTPService } from "@entities/serviceInterfaces/otp-service.interface";
import { IBcrypt } from "@frameworks/security/bcrypt.interface";
import { IEmailService } from "@entities/serviceInterfaces/email-service-interface";


@injectable()
export class sendForgotPasswordOtp implements ISendOtpUsecase {
    constructor(
        @inject("IOTPService") private otpService : IOTPService,
       @inject("IOTPBcrypt") private otpBcrypt :IBcrypt,
       @inject("IEmailService") private emailService : IEmailService
       
    ){}

    async execute(email: string): Promise<void> {
        
        const otp = this.otpService.generateOTP()

        console.log("otp sent for forgot password",otp)

        const hashedOTP = await this.otpBcrypt.hash(otp)

        await this.otpService.storeOTP(email,hashedOTP,300)

        await this.emailService.sendEmail(
            email,
            'EVENTORA - Verification for changing password',
            otp
        )
    }
}