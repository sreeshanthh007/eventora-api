
import { IOtpModel } from "@frameworks/database/mongodb/models/otp.model";


export interface IOtpRepository{
    saveOtp(email:string,otp:string,expiresAt:Date):Promise<void>
    findOtp({email} : {email:string}) : Promise<IOtpModel | null>
    deleteOtp(email:string,otp:string) : Promise<void>
}

