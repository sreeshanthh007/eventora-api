
export interface IVerifyOtpUsecase {
    execute({email,otp}:{email:string,otp:string}) : Promise<void>
}
