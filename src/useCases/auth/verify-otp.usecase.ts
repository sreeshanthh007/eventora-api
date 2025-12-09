import { inject , injectable } from "tsyringe";
import { IVerifyOtpUsecase } from "@entities/useCaseInterfaces/auth/verifyOtp-usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { IOtpCacheService } from "@entities/serviceInterfaces/otp-cache-service.interface";
import { IBcryptService } from "@entities/serviceInterfaces/bcrypt-service.interface";

@injectable()
export class VerifyOTPUseCase implements IVerifyOtpUsecase{
    constructor(
         @inject("IOTPBcryptService") private _otpBcryptService : IBcryptService,
         @inject("IOtpCacheService") private _otpCacheService: IOtpCacheService
    ){}
    async execute(key:string,otp:string): Promise<void> {
        const prevOTP : string | null = await this._otpCacheService.get(key)
      


        if(!prevOTP) throw new CustomError(ERROR_MESSAGES.OTP_EXPIRED,HTTP_STATUS.NOT_FOUND)


        const isOTPValid = await this._otpBcryptService.compare(otp,prevOTP)

       

        if(!isOTPValid){
            throw new CustomError(ERROR_MESSAGES.INVALID_OTP,HTTP_STATUS.BAD_REQUEST)
        }
        
       await this._otpCacheService.del(key)
    }
    
}