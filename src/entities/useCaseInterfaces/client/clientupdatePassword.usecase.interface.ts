
export interface IForgotUpdatePasswordUseCase{
    update(email:string,password:string) : Promise<void>
}