

export interface INotificationService {
    sendNotification(
        userId:string,
        fcmToken:string,
        payload:{title:string,body:string},

    ) : Promise<void>
}