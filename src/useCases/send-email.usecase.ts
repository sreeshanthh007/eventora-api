import { inject , injectable } from "tsyringe";
import { IEmailService } from "@entities/serviceInterfaces/email-service-interface";
import { IOTPService } from "@entities/serviceInterfaces/otp-service.interface";
import { ISendEmailUseCase } from "@entities/useCaseInterfaces/auth/send-email-usercase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { HTTP_STATUS , ERROR_MESSAGES } from "@shared/constants";
import { IUserExistenceService } from "@entities/serviceInterfaces/user-existence-service.interface";
import { IBcrypt } from "@frameworks/security/bcrypt.interface";


@injectable()

export class SendEmailUseCase implements ISendEmailUseCase {
    constructor(
        @inject("IEmailService") private emailService : IEmailService,
        @inject("IOTPService") private OTPService : IOTPService,
        @inject("IUserExistenceService") private UserExistsenceService : IUserExistenceService,
        @inject("IOTPBcrypt") private otpBcrypt : IBcrypt
    ){}

    async execute(email: string): Promise<void> {
        const emailExists = await this.UserExistsenceService.emailExists(email)
        if(emailExists){
            throw new CustomError(
                ERROR_MESSAGES.EMAIL_EXISTS,
                HTTP_STATUS.CONFLICT
            )
            
        }
        const otp = this.OTPService.generateOTP()
        
        console.log("otp sent",otp)
        
        const hashedOTP = await this.otpBcrypt.hash(otp);

        await this.OTPService.storeOTP(email,hashedOTP)
        await this.emailService.sendEmail(
            email,
            "EVENTORA - verify your Email",
            otp
        );
    }
}