import { IOtpCacheRepository } from "@entities/repositoryInterfaces/redis/redis-otp-cache-repository";
import { IOTPService } from "@entities/serviceInterfaces/otp-service.interface";
import { IBcrypt } from "@frameworks/security/bcrypt.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class OtpCacheService implements IOTPService{
    constructor(
        @inject("IOTPRepository") private OTPrepo : IOtpCacheRepository,
        @inject("IOTPBcrypt") private otpBcrypt : IBcrypt
    ){}

     generateOTP(): string {
        return Math.floor(100000 + Math.random()*9000).toString()
    }



    async storeOTP(key: string, otp: string, ttlSec: number): Promise<void> {
        await this.OTPrepo.saveOtp(key,otp,ttlSec)
    }

    async verifyOTP(key: string, enteredOtp: string): Promise<boolean> {
        const storedOTP : string | null =   await this.OTPrepo.getOtp(key)
        if(!storedOTP) return false

       return  await this.otpBcrypt.compare(enteredOtp,storedOTP)
    }
}