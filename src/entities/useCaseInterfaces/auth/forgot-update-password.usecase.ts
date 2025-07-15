
export interface IForgotUpdatePasswordUseCase {
    execute(email:string,role:string,password:string) : Promise<void>
}

