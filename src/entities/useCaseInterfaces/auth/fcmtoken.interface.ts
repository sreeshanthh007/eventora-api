

export interface IFcmTokenUseCase{
    execute(userId:string,fcmToken:string,role:string) : Promise<void>
}