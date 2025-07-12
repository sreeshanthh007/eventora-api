
export interface ISendOtpUsecase{
    execute(email:string) : Promise<void>
}
