

export interface IMarkAsReadNotificationUseCase{
    execute(userId:string,notificationId:string):Promise<void>
}