
export interface IVerifyOtpUsecase {
    execute(key:string,otp:string) : Promise<void>
}
