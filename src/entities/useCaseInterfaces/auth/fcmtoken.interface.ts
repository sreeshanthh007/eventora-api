

export interface IFcmTokenUseCase{
    execute(userId:string,fcmToken:string) : Promise<void>
}