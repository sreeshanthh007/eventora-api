import { inject , injectable } from "tsyringe";
import { IEmailService } from "@entities/serviceInterfaces/email-service-interface";
import { IOTPService } from "@entities/serviceInterfaces/otp-service.interface";
import { ISendEmailUseCase } from "@entities/useCaseInterfaces/auth/send-email-usercase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { HTTP_STATUS , ERROR_MESSAGES, OTP_EMAIL_SUBJECT } from "@shared/constants";
import { IUserExistenceService } from "@entities/serviceInterfaces/user-existence-service.interface";
import { IOtpCacheService } from "@entities/serviceInterfaces/otp-cache-service.interface";
import { IBcryptService } from "@entities/serviceInterfaces/bcrypt-service.interface";


@injectable()

export class SendEmailUseCase implements ISendEmailUseCase {
    constructor(
        @inject("IEmailService") private _emailService : IEmailService,
        @inject("IOTPService") private _OTPService : IOTPService,
        @inject("IUserExistenceService") private _UserExistsenceService : IUserExistenceService,
        @inject("IOTPBcryptService") private _otpBcryptService : IBcryptService,
        @inject("IOtpCacheService") private _otpCacheService : IOtpCacheService
    ){}

    async execute(email: string): Promise<void> {
        const emailExists = await this._UserExistsenceService.emailExists(email)
        if(emailExists){
            throw new CustomError(
                ERROR_MESSAGES.EMAIL_EXISTS,
                HTTP_STATUS.CONFLICT
            )
            
        }
        const otp = this._OTPService.generateOTP()
        
      
        
        const hashedOTP = await this._otpBcryptService.hash(otp);

        await this._otpCacheService.set(email,hashedOTP,300)
        
      
        
        await this._emailService.sendEmail(
            email,
            OTP_EMAIL_SUBJECT,
            otp
        );
    }
}