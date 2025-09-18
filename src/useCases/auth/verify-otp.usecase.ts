import { inject , injectable } from "tsyringe";
import { IVerifyOtpUsecase } from "@entities/useCaseInterfaces/auth/verifyOtp-usecase.interface";
import { CustomError } from "@entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@shared/constants";
import { RedisClient } from "@frameworks/cache/redis.client";
import { IBcrypt } from "@frameworks/security/bcrypt.interface";

@injectable()
export class VerifyOTPUseCase implements IVerifyOtpUsecase{
    constructor(
         @inject("IOTPBcrypt") private otpBcrypt : IBcrypt
    ){}
    async execute(key:string,otp:string): Promise<void> {
        const prevOTP : string | null = await RedisClient.get(key);
      


        if(!prevOTP) throw new CustomError(ERROR_MESSAGES.OTP_EXPIRED,HTTP_STATUS.NOT_FOUND)


        const isOTPValid = await this.otpBcrypt.compare(otp,prevOTP)

       

        if(!isOTPValid){
            throw new CustomError("Invalid OTP",HTTP_STATUS.BAD_REQUEST)
        }
        
        await RedisClient.del(key)
    }
    
}