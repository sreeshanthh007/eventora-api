
import { IOTPService } from "@entities/serviceInterfaces/otp-service.interface";



export class OtpService implements IOTPService{

     generateOTP(): string {
        return Math.floor(100000 + Math.random()*9000).toString()
    }
}