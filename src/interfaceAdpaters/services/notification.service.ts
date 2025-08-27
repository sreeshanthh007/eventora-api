import { INotificationRepository } from "@entities/repositoryInterfaces/notification/notification.repository.interface";
import { IFirebaseService } from "@entities/serviceInterfaces/firebase.service.interface";
import { INotificationService } from "@entities/serviceInterfaces/notification.service.interface";
import { generateRandomUUID } from "@frameworks/security/randomid.bcrypt";
import { inject, injectable } from "tsyringe";


@injectable()
export class NotificationService implements INotificationService{
        constructor(
            @inject("IFirebaseService") private _firebaseService : IFirebaseService,
            @inject("INotificationRepository") private _notificationRepo : INotificationRepository
        ){}

        async sendNotification(userId: string, fcmToken: string, payload: { title: string; body: string; }): Promise<void> {
            
            await this._firebaseService.send(fcmToken,payload)

            const notificationId = generateRandomUUID()
            await this._notificationRepo.saveNotification({
                notificationId:notificationId,
                userId,
                title:payload.title,
                message:payload.body
            });
        }
}