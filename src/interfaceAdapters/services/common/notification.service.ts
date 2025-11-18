import { INotificationRepository } from "@entities/repositoryInterfaces/notification/notification.repository.interface";
import { IFirebaseService } from "@entities/serviceInterfaces/firebase.service.interface";
import { IUUIDGeneratorService } from "@entities/serviceInterfaces/generate-random-uuid.interface";
import { INotificationService } from "@entities/serviceInterfaces/notification.service.interface";
import { inject, injectable } from "tsyringe";


@injectable()
export class NotificationService implements INotificationService{
        constructor(
            @inject("IFirebaseService") private _firebaseService : IFirebaseService,
            @inject("INotificationRepository") private _notificationRepo : INotificationRepository,
            @inject("IUUIDGeneratorService") private _generateUUID : IUUIDGeneratorService
        ){}

        async sendNotification(userId: string, fcmToken: string, payload: { title: string; body: string; }): Promise<void> {
            
            await this._firebaseService.send(fcmToken,payload)

            const notificationId = this._generateUUID.generate()
            await this._notificationRepo.saveNotification({
                notificationId:notificationId,
                userId,
                title:payload.title,
                message:payload.body
            });
        }
}