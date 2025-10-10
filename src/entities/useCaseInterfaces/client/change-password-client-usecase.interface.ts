

export interface IChangeClientPasswordUseCase {
    execute(clientId:string,currentPassword:string,newPassword:string) : Promise<void>
}