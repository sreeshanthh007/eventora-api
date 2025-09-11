"use strict";
// import { inject , injectable } from "tsyringe";
// import { IOtpRepository } from "@entities/repositoryInterfaces/auth/otp-repository.interface";
// import { IOTPService } from "@entities/serviceInterfaces/otp-service.interface";
// import { IBcrypt } from "@frameworks/security/bcrypt.interface";
// @injectable()
// export class OTPService implements IOTPService{
//     constructor(
//         @inject("IOTPRepository") private otpRepository : IOtpRepository,
//         @inject("IOTPBcrypt") private otpBcrypt : IBcrypt
//     ){}
//     generateOTP(): string {
//         return Math.floor(100000  + Math.random() * 90000).toString()
//     } 
//     async storeOTP(email: string, otp: string): Promise<void> {
//         const expiresAt = new Date(Date.now() + 1*60*1000)
//         await this.otpRepository.saveOtp(email,otp,expiresAt)
//     }
//     async verifyOTP({ email, otp }: { email: string; otp: string; }): Promise<boolean> {
//       console.log(email,otp)
//         const otpEntry = await this.otpRepository.findOtp({email})
//       if(!otpEntry){
//         return false
//       }
//     const isExpired = new Date() > otpEntry.expiresAt
//     const isValidOtp = await this.otpBcrypt.compare(otp,otpEntry.otp)
//     if(isExpired || !isValidOtp){
//       await this.otpRepository.deleteOtp(email,otp)
//       return false
//     }
//       await this.otpRepository.deleteOtp(email,otp)
//       return true
//     }
// }
