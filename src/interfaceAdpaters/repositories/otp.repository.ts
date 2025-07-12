    import { injectable } from "tsyringe";
    import { IOtpRepository } from "@entities/repositoryInterfaces/auth/otp-repository.interface";
    import { IOtpModel , OtpModel } from "@frameworks/database/Mongodb/models/otp.model";

    @injectable()
    export class OTPRepository implements IOtpRepository {
        async saveOtp(email: string, otp: string, expiresAt: Date): Promise<void> {
            await OtpModel.create({email,otp,expiresAt})
        }

        async findOtp({ email }: { email: string; }): Promise<IOtpModel | null> {
            const otpEntry = await OtpModel.find({email})
            .sort({createdAt:-1})
            .limit(1)
         
            return otpEntry.length > 0 ? otpEntry[0] : null
        }

        async deleteOtp(email: string, otp: string): Promise<void> {
            await OtpModel.deleteOne({email,otp})
        }
    }