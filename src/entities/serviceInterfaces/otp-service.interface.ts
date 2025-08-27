export interface IOTPService {
    generateOTP():string
    storeOTP(key:string,otp:string,ttlSec:number) : Promise<void>
    verifyOTP(key:string,enteredOtp:string):Promise<boolean>
}