
export interface IForgotUpdatePasswordUseCase{
    update(email:string,password:string,role:string) : Promise<void>
}  